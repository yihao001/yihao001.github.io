---
title: 'Confusion Matrices in sklearn'
date: 2020-05-22
permalink: /posts/2020/05/confusion-matrices/
tags:
  - ML
---

The confusion_matrix function in sklearn is useful but can be confusing - one'd think that True Positive will be on the top left corner, but it's on the diagonally opposite end instead.

The official documentation doesn't directly provide 2 critical pieces of information:

1. A figure would've helped, so here it is (for binary classification): 

    ![Illustration of sklearn confusion matrix](/images/confusion_matrix.png)

2. What is considered positive or negative by default? (i.e. without feeding the 'labels' param)

    0 is assumed to be negative (N), 1 is thus positive (P) 

All in all I think it'll still be the best practice to pass in 'labels' as a param for better clarity.
