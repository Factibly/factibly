package com.factibly.factibly.viewmodels

import androidx.hilt.lifecycle.ViewModelInject
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.factibly.factibly.BookmarksListQuery
import com.factibly.factibly.repositories.BookmarksRepository

class BookmarksViewModel @ViewModelInject constructor(private val repository: BookmarksRepository) :
    ViewModel() {

    var bookmarks: MutableLiveData<List<BookmarksListQuery.Bookmark?>> = repository.getBookmarks()

    fun removeBookmarks(contentIds: List<String>) {
        repository.removeBookmarks(contentIds)
        // TODO: first check that the mutation was successful
        bookmarks.value = bookmarks.value?.filter { it?.id !in contentIds }
    }
}