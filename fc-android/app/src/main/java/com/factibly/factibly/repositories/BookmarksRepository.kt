package com.factibly.factibly.repositories

import androidx.lifecycle.MutableLiveData
import com.apollographql.apollo.ApolloClient
import com.apollographql.apollo.coroutines.toDeferred
import com.factibly.factibly.BookmarksListQuery
import com.factibly.factibly.RemoveBookmarksMutation
import com.factibly.factibly.type.RemoveBookmarksInput
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.Job
import kotlinx.coroutines.launch
import javax.inject.Inject

class BookmarksRepository @Inject constructor(private val client: ApolloClient) {

    private var job = Job()
    private val scope = CoroutineScope(job + Dispatchers.Main)

    fun getBookmarks(): MutableLiveData<List<BookmarksListQuery.Bookmark?>> {
        val liveData = MutableLiveData<List<BookmarksListQuery.Bookmark?>>()

        scope.launch {
            val res = client
                .query(BookmarksListQuery())
                .toDeferred()
                .await()
            liveData.value = res.data?.currentUser?.bookmarks ?: emptyList()
        }

        return liveData
    }

    fun removeBookmarks(contentIds: List<String>) {
        scope.launch {
            client
                .mutate(RemoveBookmarksMutation(input = RemoveBookmarksInput(contentIds = contentIds)))
                .toDeferred()
                .await()
        }
    }
}