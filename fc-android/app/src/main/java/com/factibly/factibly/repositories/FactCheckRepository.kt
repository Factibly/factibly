package com.factibly.factibly.repositories

import androidx.lifecycle.MutableLiveData
import com.apollographql.apollo.ApolloClient
import com.apollographql.apollo.coroutines.toDeferred
import com.factibly.factibly.ContentQuery
import com.factibly.factibly.SearchContentMutation
import com.factibly.factibly.type.SearchContentInput
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.Job
import kotlinx.coroutines.launch
import javax.inject.Inject

class FactCheckRepository @Inject constructor(private val client: ApolloClient) {

    private var job = Job()
    private val scope = CoroutineScope(job + Dispatchers.Main)

    fun searchFactCheck(url: String): MutableLiveData<SearchContentMutation.SearchContent?> {
        val liveData = MutableLiveData<SearchContentMutation.SearchContent?>()

        scope.launch {
            val res = client
                .mutate(SearchContentMutation(input = SearchContentInput(url = url)))
                .toDeferred()
                .await()
            liveData.value = res.data?.searchContent
        }

        return liveData
    }

    fun getFactCheck(contentId: String): MutableLiveData<ContentQuery.Content?> {
        val liveData = MutableLiveData<ContentQuery.Content?>()

        scope.launch {
            val res = client
                .query(ContentQuery(contentId = contentId))
                .toDeferred()
                .await()
            liveData.value = res.data?.content
        }

        return liveData
    }
}