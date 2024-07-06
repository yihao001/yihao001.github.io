---
layout: page
title: Class imbalance in bankruptcy prediction tasks
description: Are deep learning models able to perform better than Altman?
img: assets/img/project_preview/bc3409_cover.png
importance: 2
category: work
# related_publications: true
---

> This was done as a group project for BC3409 in AY18/19

## Key contributions

- Demonstrated that LSTM and GRU can do better than Altman's Z-score in predicting bankruptcy
- Proposed a technique to deal with the perennial problem of imbalanced classes in bankruptcy prediction tasks

<!-- ## Motivation

Alpha!  -->

## Existing work

The problem of bankruptcy prediction has been well studied, with several established approaches such as Altman Z-score (1968) and Ohlson O-score (1980). 

Altman Z-score is calculated as follows:

$$Z = 1.2 X_1 + 1.4 X_2 + 3.3 X_3 + 0.6 X_4 + 1 X_5$$

where 
- X_1 = working capital / total assets, 
- X_2 = retained earnings / total assets,
- X_3 = EBIT / total assets,
- X_4 = market cap / total liabilities,
- X_5 = sales / total assets.

The coefficients vary depends on the dataset used. For the above example, it was based on 66 companies (mainly in the manufacturing industry) with assets > $1 million (keep in mind that this was proposed in the 60s).  

In general, bankruptcy risk is higher if the z-score is low (< 1.8). However, it's more nuanced than a binary classification as a score above 3.0 suggests that bankruptcy is unlikely, while values between 1.8 and 3.0 are indeterminate.

On the other hand, Ohlson O-score is more recent and used data from 2,000 companies. However, it requires information outside of financial reports, such as the Gross National Product. Thus, we focus on comparing against Altman Z-score.

Would a deep learning model work better than such traditional approaches? Intuition suggests that it should (since they are quite dated), but let's find out! 🔍


## Methods

We obtained our dataset from the [SimFin API](https://www.simfin.com/en/fundamental-data-download/). This comprised fundamentals from 2165 companies listed in the US (2009 to 2019). Out of these companies, 44 went through Chapter 7 or 11 bankrupticies during this time period. 

Missing data limits the number of features we could use. This eventuated in 1362 companies being selected with complete data for the following 12 attributes:

1.	Equity / total assets
2.	(Total liabilities * 365) / (gross profit + depreciation)
3.	(Gross profit + depreciation) / total liabilities
4.	Total assets / total liabilities
5.	Total liabilities / total assets
6.	Log of total assets
7.	Working capital / total assets
8.	Total liabilities / ((profit on operating activities + depreciation) * (12/365))
9.	Current assets / total liabilities
10.	Working capital
11.	EBIT / total assets
12.	Book value of equity / total liabilities

In terms of modelling, we used the original coefficients for Altman Z-score. For deep learning models, we experimented with an model architecture comprising 4 LSTM/GRU layers followed by a dense layer with sigmoid  activation function to perform the classification. 

One key novelty is the approach used to address class imbalance. From preliminary explorations on the [Polish dataset](https://archive.ics.uci.edu/dataset/365/polish+companies+bankruptcy+data), we found that oversampling via SMOTE was not very effective. Thus, we created 2 sets of criteria as a proxy for bankruptcy:

1. Equity: Equity < 0, ROE < -50%
2. Debt: Solvency ratio < 0.2, Debt-to-Equity ratio > 2

Companies that fulfill either of these criteria were labelled as bankrupt for the purpose of training the deep learning model. Using this approach, 445 companies were labelled as bankrupt, thus reducing the class imbalance.

## Results

For Altman Z-score, only 31 companies had enough data to compute the score. On these subset, 20/31 were correctly classified as bankruptcy, giving an accuracy of 64%. Notably, the Altman Z-score approach led to many false positive for the rest of the dataset (i.e. non-bankrupt companies), producing a precision of 0.03. On the other hand, the LSTM model was able to achieve an accuracy of 75% and the GRU model obtained an accuracy of 83%. 

## Future work

Although the deep learning model performed better, it would have been fairer to re-fit the model used by Altman on more recent data that is representative of our SimFin dataset. 

While classification accuracies seem quite high, it would have been more useful to predict bankruptcy before it happens, rather than our simplified approach of using data from the entire time series. The use of weak labels in our approach does help allieviate this issue, but it remains to be seen if the model could do better than such simple proxies in predicting future bankruptcies.

## Learning points

Class imbalance is a problem that plagues many tasks (e.g. prediction of rare events like diseases). While several standard measures are often proposed (e.g. over/undersampling, setting class weights to give more emphasis to the minority class), these could still fail in situations with extreme class imbalance. The use of proxies / weak labels presents a viable alternative to tackle this problem.