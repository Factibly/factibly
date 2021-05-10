package com.factibly.factibly.database

import androidx.room.Database
import androidx.room.RoomDatabase
import androidx.room.TypeConverters
import com.factibly.factibly.model.FactCheckHistory
import com.factibly.factibly.util.converter.DateTypeConverters

@Database(entities = [FactCheckHistory::class], version = 1)
@TypeConverters(DateTypeConverters::class)
abstract class FactiblyDatabase : RoomDatabase() {
    abstract fun factCheckHistoryDao(): FactCheckHistoryDao
}