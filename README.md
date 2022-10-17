# Mela-Crypto-Trading-Engineering
A robust data-pipeline that can run various backtests and store various useful artefacts in a robust data warehouse system.

**Table of Content**
* [Project Overview](#project-overview)
* [Data](#data)
* [System Flow](#system-flow)
* [Installation Guide](#installation-guide)
* [Project Structure](#project-structure)
* [LICENCE](#licence)
* [Contributers](#contributors)

## Project Overview
The main objective of this project is to design and build a reliable, large-scale ,robust data-pipeline that can run various backtests and store various useful artifacts in a robust data warehouse system for Mela who wants to enter the world of cryptocurrencies to make simple trade for everyone.

![image](https://user-images.githubusercontent.com/59474650/196071974-6df86c64-2a93-4253-9243-d5ac847b1e88.png)

## Data

There are a number of data points that [yahoo finance](https://help.yahoo.com/kb/SLN2311.html) and [binance](https://www.binance.com/en/landing/data) provides and you can use, but for the purpose of testing the backend development, you can start of with the candlestick data.
You can read a brief description of what a K-line or candlestick data is [here](https://www.investopedia.com/terms/c/candlestick.asp).
The data used for the EDA of this project is Algorand USD financial dataset, from [Algorand USD (ALGO-USD) Price History & Historical Data - Yahoo Finance dates; from October 11, 2021 to October 11, 2022](https://finance.yahoo.com/quote/ALGO-USD/history?p=ALGO-USD). The data shows the historical prices on a daily basis.
## System Flow

![image](https://user-images.githubusercontent.com/59474650/195408248-8f696112-b8cd-4d61-9efb-5abfc75f3dfb.png)

## Installation Guide
### Pipline
```
git clone https://github.com/Hu-10xB6W7G5/Mela-Crypto-Trading-Engineering.git
cd Mela-Crypto-Trading-Engineering
pip install -r requirements.txt
```
### Frontend
```
cd Mela-Crypto-Trading-Engineering/frontend
npm install
npm start
```
### Backend
```
cd Mela-Crypto-Trading-Engineering/backend
npm install
touch .env #and write the environmental viriables there
npm start
```
## Project Structure

### LICENCE
 MIT
#### Contributors
* [Yohans Samuel](https://github.com/YohansSamuel)
* [Degaga Wolde](https://github.com/degagawolde)
* [Margaret Chepkirui](https://github.com/MegCheppy) 
* [Yohanes Gutema](https://github.com/Yohanes-GR)
* [Tibarek Mesfin](https://github.com/tibarekb)
* [Andenet Alexander](https://github.com/andyalex234)

