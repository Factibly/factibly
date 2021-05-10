package com.factibly.factibly.util.converter

import androidx.room.TypeConverter
import java.util.*

class DateTypeConverters {
    @TypeConverter
    fun fromTimestamp(value: Long) = Date(value)

    @TypeConverter
    fun dateToTimestamp(date: Date) = date.time
}