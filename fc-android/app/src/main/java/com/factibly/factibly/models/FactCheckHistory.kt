package com.factibly.factibly.models

import androidx.room.ColumnInfo
import androidx.room.Entity
import androidx.room.Index
import androidx.room.PrimaryKey
import java.util.Date

@Entity(tableName = "fact_check_history", indices = [Index(value = ["content_id"], unique = true)])
data class FactCheckHistory(
    @PrimaryKey(autoGenerate = true) val id: Int,
    @ColumnInfo(name = "content_id") var contentId: String,
    @ColumnInfo(name = "source_title") var sourceTitle: String,
    @ColumnInfo(name = "source_author") var sourceAuthor: String,
    @ColumnInfo(name = "overall_score", defaultValue = "NULL") var overallScore: Float? = null,
    @ColumnInfo(name = "created_at", defaultValue = "CURRENT_TIMESTAMP") var createdAt: Date = Date()
)
