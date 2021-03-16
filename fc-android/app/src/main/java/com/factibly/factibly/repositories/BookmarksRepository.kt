package com.factibly.factibly.repositories

import com.apollographql.apollo.ApolloClient
import com.apollographql.apollo.api.Response
import com.apollographql.apollo.coroutines.toDeferred
import com.factibly.factibly.BookmarksListQuery
import com.factibly.factibly.RemoveBookmarksMutation
import com.factibly.factibly.type.RemoveBookmarksInput
import javax.inject.Inject

class BookmarksRepository @Inject constructor(private val client: ApolloClient) {

    suspend fun getBookmarks(): Response<BookmarksListQuery.Data> = client
        .query(BookmarksListQuery())
        .toDeferred()
        .await()

    suspend fun removeBookmarks(contentIds: List<String>) {
        client
            .mutate(RemoveBookmarksMutation(input = RemoveBookmarksInput(contentIds = contentIds)))
            .toDeferred()
            .await()
    }
}