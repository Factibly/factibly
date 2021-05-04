package com.factibly.factibly.viewmodels

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.factibly.factibly.ContentQuery
import com.factibly.factibly.SearchContentMutation
import com.factibly.factibly.repositories.FactCheckRepository
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class FactCheckViewModel @Inject constructor(
    private val repository: FactCheckRepository
) : ViewModel() {

    private val _searchContent = MutableLiveData<SearchContentMutation.SearchContent?>()
    val searchContent: LiveData<SearchContentMutation.SearchContent?> = _searchContent

    private val _factCheck = MutableLiveData<ContentQuery.Content?>()
    val factCheck: LiveData<ContentQuery.Content?> = _factCheck

    fun searchFactCheck(url: String) {
        viewModelScope.launch {
            _searchContent.value = repository.searchFactCheck(url).data?.searchContent
        }
    }

    fun findFactCheck(contentId: String) {
        viewModelScope.launch {
            _factCheck.value = repository.getFactCheck(contentId).data?.content
        }
    }
}