package com.factibly.factibly.databases

import androidx.room.Database
import androidx.room.RoomDatabase
import androidx.room.TypeConverters
import com.factibly.factibly.models.FactCheckHistory
import com.factibly.factibly.utils.room.DateTypeConverters

@Database(entities = [FactCheckHistory::class], version = 1)
@TypeConverters(DateTypeConverters::class)
abstract class FactiblyDatabase : RoomDatabase() {
    abstract fun factCheckHistoryDao(): FactCheckHistoryDao
}