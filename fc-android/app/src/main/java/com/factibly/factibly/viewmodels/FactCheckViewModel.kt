package com.factibly.factibly.viewmodels

import androidx.hilt.lifecycle.ViewModelInject
import androidx.lifecycle.*
import com.apollographql.apollo.coroutines.toDeferred
import com.factibly.factibly.ContentQuery
import com.factibly.factibly.SearchContentMutation
import com.factibly.factibly.repositories.FactCheckRepository
import com.factibly.factibly.type.SearchContentInput
import kotlinx.coroutines.launch


class FactCheckViewModel @ViewModelInject constructor(
    private val repository: FactCheckRepository
) : ViewModel() {

    private val _searchContent = MutableLiveData<SearchContentMutation.SearchContent?>()
    val searchContent: LiveData<SearchContentMutation.SearchContent?> = _searchContent

    private val _factCheck = MutableLiveData<ContentQuery.Content>()
    val factCheck: LiveData<ContentQuery.Content> = _factCheck

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