---
layout: post
title: Decomposing huge matrices
date: 2020-01-10 00:00:00+0800
description: 
tags: fmri networks
categories: acad
related_posts: false
---

In fMRI analyses, a common approach is to use a correlation matrix to study the relationships between various brain regions. Brain parcellations schemes seem to be getting finer over the years and that will increase with more detailed parcellation schemes proposed / better imaging resolution - that means there might be more and more regions. 

One such atlas is from Power et al., which gives 264 regions of interest. A 264 x 264 correlation matrix gives 34716 unique features (correlation between the time series of each pair of nodes). If you want to study the correlation between these edge features (across subjects) - that's going to become a 34716 x 34716 matrix!

Processing it is going to be a pain. There are some tricks mentioned below, but it is still a pain (in terms of time + memory consumption).

1. Store and load it using hdf5 via [h5py](http://docs.h5py.org/en/stable/quick.html).
2. If it's sparse, there are [many ways to speed it up](https://docs.scipy.org/doc/scipy/reference/sparse.linalg.html), e.g. `scipy.sparse.linalg.eigs(h)`
3. If it's approximately sparse (many very small values), make it sparse (e.g. set small correlation values to 0).
    You'll lose info, so you'd need to weigh the cost/benefits
4. Do you really need all the eigenvalues? 
    If not (e.g. only need the largest few or smallest few), Lanczos algorithm gives a [much faster approximation of the tails](https://scicomp.stackexchange.com/questions/23536/quality-of-eigenvalue-approximation-in-lanczos-method). 
