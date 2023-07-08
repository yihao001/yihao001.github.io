---
title: 'Confusion Matrices in sklearn'
date: 2020-05-22
permalink: /posts/2020/05/confusion-matrices/
tags:
  - ML
---

The confusion_matrix function in sklearn is useful but the documentation can be confusing.

Assuming that you're using integer labels (i.e. 0 or 1), one'd think that True Positive will be on the top left corner, but it's on the diagonally opposite end instead!

The official documentation doesn't directly provide 2 critical pieces of information:

1. A figure would've helped, so here it is (for binary classification):

    ![Illustration of sklearn confusion matrix](/images/confusion_matrix.png)

2. What is considered positive or negative by default? (i.e. without feeding in the 'labels' param)

    0 is assumed to be negative (N), 1 is thus positive (P)

If your labels are strings, the above **does not always apply**. Instead, sklearn will follow the **alphabetical order** of the labels: e.g. if the labels are 'Alice' and 'Bob', [0,0] is the number of instances where prediction == ground truth == 'Alice'. [0,1], i.e. top right cell, is the number of times 'Bob' was predicted but ground truth is 'Alice'.