package com.factibly.factibly.repositories

import com.apollographql.apollo.ApolloClient
import com.apollographql.apollo.api.Response
import com.apollographql.apollo.coroutines.await
import com.factibly.factibly.ContentQuery
import com.factibly.factibly.SearchContentMutation
import com.factibly.factibly.type.SearchContentInput
import javax.inject.Inject

class FactCheckRepository @Inject constructor(private val client: ApolloClient) {

    suspend fun searchFactCheck(url: String): Response<SearchContentMutation.Data> = client
        .mutate(SearchContentMutation(input = SearchContentInput(url = url)))
        .await()

    suspend fun getFactCheck(contentId: String): Response<ContentQuery.Data> = client
        .query(ContentQuery(contentId = contentId))
        .await()
}