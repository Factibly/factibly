package com.factibly.factibly.viewmodels

import androidx.hilt.lifecycle.ViewModelInject
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.apollographql.apollo.coroutines.toDeferred
import com.factibly.factibly.BookmarksListQuery
import com.factibly.factibly.repositories.BookmarksRepository
import kotlinx.coroutines.launch

class BookmarksViewModel @ViewModelInject constructor(
    private val repository: BookmarksRepository
) : ViewModel() {

    private val _bookmarks = MutableLiveData<List<BookmarksListQuery.Bookmark?>>()
    val bookmarks: LiveData<List<BookmarksListQuery.Bookmark?>> = _bookmarks

    fun getBookmarks() {
        viewModelScope.launch {
            _bookmarks.value = repository.getBookmarks().data?.currentUser?.bookmarks ?: emptyList()
        }
    }

    fun removeBookmarks(contentIds: List<String>) {
        viewModelScope.launch {
            repository.removeBookmarks(contentIds)
        }
        getBookmarks()
    }
}