import os,sys,argparse
from GoldenCross import GoldenCross
import pandas as pd
import backtrader as bt

cerebro = bt.Cerebro()
cerebro.broker.setcash(1000000)

algo_prices = pd.read_csv('../data/ALGO-USD.csv', index_col='Date', parse_dates=True)

feed = bt.feeds.PandasData(dataname= algo_prices)
cerebro.adddata(feed)


cerebro.addstrategy(GoldenCross)
cerebro.run()
cerebro.plot()

