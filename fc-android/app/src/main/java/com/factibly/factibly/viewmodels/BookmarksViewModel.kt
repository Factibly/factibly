package com.factibly.factibly.viewmodels

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.factibly.factibly.BookmarksListQuery
import com.factibly.factibly.repositories.BookmarksRepository
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class BookmarksViewModel @Inject constructor(
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
            val res = repository.removeBookmarks(contentIds)
            if (!res.hasErrors()) {
                getBookmarks()
            }
        }
    }
}