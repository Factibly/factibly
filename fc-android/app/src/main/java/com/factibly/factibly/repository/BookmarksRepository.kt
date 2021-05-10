package com.factibly.factibly.repository

import com.apollographql.apollo.ApolloClient
import com.apollographql.apollo.api.Response
import com.apollographql.apollo.coroutines.await
import com.factibly.factibly.BookmarksListQuery
import com.factibly.factibly.RemoveBookmarksMutation
import com.factibly.factibly.type.RemoveBookmarksInput
import javax.inject.Inject

class BookmarksRepository @Inject constructor(private val client: ApolloClient) {

    suspend fun getBookmarks(): Response<BookmarksListQuery.Data> = client
        .query(BookmarksListQuery())
        .await()

    suspend fun removeBookmarks(contentIds: List<String>): Response<RemoveBookmarksMutation.Data> = client
        .mutate(RemoveBookmarksMutation(input = RemoveBookmarksInput(contentIds = contentIds)))
        .await()
}