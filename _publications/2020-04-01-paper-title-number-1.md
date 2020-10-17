---
title: "Decoding brain functional connectivity for neurodegenerative and neuropsychiatric disorders"
collection: publications
permalink: /publication/2020-04-01-connectivity-decoding
excerpt: 'We propose a family of node removal methods which addresses the problem of deep learning models overfitting on high-dimensional connectivity data. Such leaner models are also interpretable, allowing for biomarker discovery.'
date: 2020-04-01
venue: 'MICCAI and Neurocomputing'
paperurl: 'https://www.biorxiv.org/content/10.1101/2020.04.22.056382v3'
citation: 'Gupta, S., Chan, Y. H., & Rajapakse, J. C. (2020). Obtaining leaner deep neural networks for decoding brain functional connectome in a single shot. bioRxiv.'
---

---

**tl;dr**

Many biomedical studies and analyses involve much more features (k > 10,000) than the number of samples available (n < 1000). While feature selection approaches have often been used along with traditional machine learning models for case-control classification, no such approaches have been done with deep learning models yet. We showed that deep learning models can perform such classification problems better than traditional machine learning models and proposed a node pruning algorithm that retains nodes with the highest saliency scores. Such leaner models can deliver similar or higher performance as compared to the original model and are general enough to work across multiple diseases. 

Our initial work in MICCAI involves an iterative algorithm that is able to lead to improved classification performance between healthy subjects and patients with disease, while retaining ~20% of features. However, this is done at the expense of higher computation cost. Thus, in our follow-up work (`LEAN + CLIP`) published in Neurocomputing, we have proposed a one-shot node removal approach that is able to perform at a level similar to the original (full) model. 

Code for `LEAN + CLIP` can be found [here](https://github.com/SCSE-Biomedical-Computing-Group/LEAN_CLIP).

---

Last Updated: 18 October 2020
