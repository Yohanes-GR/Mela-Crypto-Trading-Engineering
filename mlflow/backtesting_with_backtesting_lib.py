from backtesting import Backtest, Strategy
from backtesting.lib import crossover, resample_apply
from backtesting.test import GOOG

import mlflow

import matplotlib.pyplot as plt
from numpy import dtype
import pandas as pd
import seaborn as sns
import talib

import os

print(GOOG.tail())

class RsiOscillator(Strategy):
    params = {
        'upper_bound': 70,
        'lower_bound': 30,
        'rsi_window': 14
    }
    
    upper_bound = 70
    lower_bound = 30
    rsi_window = 14
  
    def init(self):
        self.daily_rsi = self.I(talib.RSI,self.data.Close,self.params['rsi_window'])
        self.weekly_rsi = resample_apply(
            "W-FRI",talib.RSI, self.data.Close, self.params['rsi_window'])
    def next(self):
        if crossover(self.daily_rsi, self.params['upper_bound']) and self.weekly_rsi[-1] > self.params['upper_bound']:
            self.position.close()
        elif crossover(self.params['lower_bound'], self.daily_rsi) and self.weekly_rsi[-1] < self.params['lower_bound']:
            self.buy()
            
if __name__ == '__main__':
        
    bt = Backtest(GOOG,RsiOscillator,cash=10_000)

    hyperparameters = {
        'upper_bound': range(55,85,5),
        'lower_bound': range(10, 45, 5),
        'rsi_window': range(14,28,7), 
        "Strategy": 'RsiOscillator',
    }
    stats, heatmap = bt.optimize(
        upper_bound = hyperparameters['upper_bound'],
        lower_bound = hyperparameters['lower_bound'],
        rsi_window = hyperparameters['rsi_window'],
        maximize = 'Sharpe Ratio',
        constraint = lambda param: param.upper_bound > param.lower_bound,
        return_heatmap=True)

    hm = heatmap.groupby(['upper_bound','lower_bound']).mean().unstack()
    heatmap_plot = sns.heatmap(hm,cmap='plasma')
    heatmap_fig = heatmap_plot.get_figure()
    heatmap_fig.savefig('outputs/heatmap_plot.png')
    plt.show()
    
    with mlflow.start_run(run_name="backtesting") as run:
    
        mlflow.log_params({
            "hyperparameters":hyperparameters,
            "strategy":hyperparameters['Strategy']})

        mlflow.log_metrics({'Sharpe Ratio':stats['Sharpe Ratio'],
                           'Equity Final':stats['Equity Final [$]'],
                           'Return':stats['Return [%]']})

        # Log an artifact (output file)
        if not os.path.exists("outputs"):
            os.makedirs("outputs")
        mlflow.log_artifacts("outputs")
