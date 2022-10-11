
import vectorbt as vbt
import yfinance as yf
import numpy as np 
import pandas as pd 
import matplotlib.pyplot as plt 
import seaborn as sns
import plotly.graph_objects as go
from pandas.plotting import scatter_matrix


from datetime import datetime
sns.set(rc={'figure.figsize':(10,5)})
#acquire data through yfinance API
data = yf. download ("ALGO-USD", start="2021-10-11", end="2022-10-11")
data.head()


# Description of columns
# Date- Represents the dates of the year.
# Open- It is the price at which the financial security opens in the market when trading begins
# High- The high is the highest price at which a stock traded during a period.
# Low- Please enter a descriptLow is the minimum price of a stock in a period ion
# Close- Closing price generally refers to the last price at which a stock trades during a regular trading session
# Adj close- The adjusted closing price amends a stock's closing price to reflect that stock's value after accounting for any
# Volume- Volume measures the number of shares traded in a stock or contracts traded in futures or options.

# save data to csv
data.to_csv("algoyf.csv")
df= pd.read_csv("algoyf.csv")
#df['Date'] = pd.to_datetime(df['Date'])
#df = df.set_index('Date')
df.head()

#descriptive stats
df.dtypes
df.describe()

### Check data consistency if feasible for our ML model.
df.info()



# Plotting data distribution of the volume
sns.lineplot(x=df.index,y=df['Volume'],label='Volume')
sns.lineplot(x=df.index,y=df['Volume'].rolling(window=12).mean(),label='Averaged volume')
plt.title('Volume of stock versus time')

# This diagram shows the visualization of the stock price at high, close and open. We can see that most of the stock price opens at the lowest price, and closes lower than the highest price bidded. 
df.plot(y=['High','Close','Open'],title='Algorand stock price')


  # candlestick chart
candlestick=go.Candlestick(x=df['Date'], low=df['Low'], high=df['High'], close=df['Close'], open=df['Open'])
fig= go.Figure(data=[candlestick])
fig.show()
