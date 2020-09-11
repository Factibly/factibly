package com.factibly.factibly

import android.app.Application
import dagger.hilt.android.HiltAndroidApp
import timber.log.Timber

@HiltAndroidApp
class FactiblyApplication : Application() {

    override fun onCreate() {
        super.onCreate()
        Timber.plant()
    }
}