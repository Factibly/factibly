package com.factibly.factibly.util

import androidx.lifecycle.MutableLiveData


class RefreshLiveData<T>(private val refreshAction: RefreshAction<T>) :
    MutableLiveData<T>() {

    interface RefreshAction<T> {
        interface Callback<T> {
            fun onDataLoaded(t: T)
        }

        fun loadData(callback: Callback<T>?)
    }

    private val callback: RefreshAction.Callback<T> = object : RefreshAction.Callback<T> {
        override fun onDataLoaded(t: T) {
            postValue(t)
        }
    }

    fun refresh() {
        refreshAction.loadData(callback)
    }
}