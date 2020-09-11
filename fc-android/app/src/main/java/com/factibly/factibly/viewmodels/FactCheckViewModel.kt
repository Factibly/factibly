package com.factibly.factibly.viewmodels

import androidx.hilt.lifecycle.ViewModelInject
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.Transformations
import androidx.lifecycle.ViewModel
import com.factibly.factibly.ContentQuery
import com.factibly.factibly.repositories.FactCheckRepository


class FactCheckViewModel @ViewModelInject constructor(private val repository: FactCheckRepository) :
    ViewModel() {

    val contentId = MutableLiveData<String?>()

    var content: LiveData<ContentQuery.Content?>

    init {
        content = Transformations.switchMap(contentId) {
            if (it == null) {
                MutableLiveData()
            } else {
                repository.getFactCheck(it)
            }
        }
    }

    fun searchFactCheck(url: String) = repository.searchFactCheck(url)

    fun setContentId(contentId: String) {
        this.contentId.value = contentId
    }

    fun refreshContent() {
        this.setContentId(this.contentId.value!!)
    }
}