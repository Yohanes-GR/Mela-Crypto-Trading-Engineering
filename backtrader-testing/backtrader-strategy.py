from __future__ import (absolute_import, division, print_function,
                        unicode_literals)

import backtrader as bt 
import datetime
from strategies import TestStrategy



cerebro = bt.Cerebro()

cerebro.broker.set_cash(1000000)


datapath = '../data/ALGO-USD.csv'

    # Create a Data Feed
data = bt.feeds.YahooFinanceCSVData(
        dataname=datapath,
        # Do not pass values before this date
        fromdate=datetime.datetime(2021, 10, 2),
        # Do not pass values after this date
        todate=datetime.datetime(2021, 11, 2),
        reverse=False)


cerebro.adddata(data)
cerebro.addstrategy(TestStrategy)
cerebro.addanalyzer(bt.analyzers.PyFolio, _name='pyfolio')

cerebro.addsizer(bt.sizers.FixedSize, stake = 1000)

print('Starting Portfolio Value: %2f' %cerebro.broker.getvalue())

cerebro.run()

print('Final Portfolio Value: %2f' %cerebro.broker.getvalue())

cerebro.plot()

results = cerebro.run()
strat = results[0]
pyfoliozer = strat.analyzers.getbyname('pyfolio')
returns, positions, transactions, gross_lev = pyfoliozer.get_pf_items()

import pyfolio as pf
pf.create_full_tear_sheet(
    returns,
    positions=positions,
    transactions=transactions,
    gross_lev=gross_lev,
    live_start_date='2021-10-11',  # This date is sample specific
    round_trips=True)