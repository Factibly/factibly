package com.factibly.factibly.database

import androidx.lifecycle.LiveData
import androidx.room.*
import com.factibly.factibly.model.FactCheckHistory

@Dao
interface FactCheckHistoryDao {
    @Query("SELECT * from fact_check_history LIMIT 10")
    fun getFirstTen(): LiveData<List<FactCheckHistory>>

    @Query("SELECT * FROM fact_check_history WHERE content_id IN (:contentIds)")
    fun getByContentIds(contentIds: IntArray): LiveData<List<FactCheckHistory>>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    fun insertAll(vararg history: FactCheckHistory)

    @Delete
    fun delete(history: FactCheckHistory)
}