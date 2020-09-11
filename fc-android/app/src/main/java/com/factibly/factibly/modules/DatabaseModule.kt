package com.factibly.factibly.modules

import android.content.Context
import androidx.room.Room
import com.factibly.factibly.databases.FactiblyDatabase
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.android.qualifiers.ApplicationContext
import dagger.hilt.components.SingletonComponent
import javax.inject.Singleton

@Module
@InstallIn(SingletonComponent::class)
object DatabaseModule {
    @Singleton
    @Provides
    fun provideDatabase(@ApplicationContext context: Context) =
        Room.databaseBuilder(context, FactiblyDatabase::class.java, "factibly_db").build()

    @Singleton
    @Provides
    fun provideFactCheckHistoryDao(db: FactiblyDatabase) = db.factCheckHistoryDao()
}