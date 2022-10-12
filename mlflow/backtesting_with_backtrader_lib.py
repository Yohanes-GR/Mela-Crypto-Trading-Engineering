from __future__ import (absolute_import, division, print_function,
                        unicode_literals)

import datetime  # For datetime objects
import os.path  # To manage paths
import sys  # To find out the script name (in argv[0])
import os

# Import the backtrader platform
import backtrader as bt

import matplotlib.pyplot as plt
import pandas as pd
from random import random, randint
import mlflow 

sys.path.append(os.path.abspath(os.path.join("./backtrader-testing")))
from  GoldenCross import GoldenCross

algo_prices = pd.read_csv('./data/ALGO-USD.csv', index_col='Date', parse_dates=True)

cerebro = bt.Cerebro()
cerebro.broker.setcash(1000000)
feed = bt.feeds.PandasData(dataname= algo_prices)
cerebro.adddata(feed)

cerebro.addstrategy(GoldenCross)
print('Starting Portfolio Value: %.2f' % cerebro.broker.getvalue())
mlflow.log_metrics({"Initial Portfolio Value":cerebro.broker.getvalue()})
cerebro.run()
print('Final Portfolio Value: %.2f' % cerebro.broker.getvalue())

with mlflow.start_run(run_name="backtrader") as run:

    mlflow.log_params({'Strategy':'God=ldenCross'})

    mlflow.log_metrics({"Final Portfolio Value":cerebro.broker.getvalue()})

    # Log an artifact (output file)
    if not os.path.exists("outputs"):
        os.makedirs("outputs")
    mlflow.log_artifacts("outputs")