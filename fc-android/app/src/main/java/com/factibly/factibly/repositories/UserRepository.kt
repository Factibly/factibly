package com.factibly.factibly.repositories

import androidx.lifecycle.MutableLiveData
import com.apollographql.apollo.ApolloClient
import com.apollographql.apollo.coroutines.toDeferred
import com.factibly.factibly.CurrentUserQuery
import com.factibly.factibly.LoginMutation
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.Job
import kotlinx.coroutines.launch
import javax.inject.Inject

class UserRepository @Inject constructor(private val client: ApolloClient) {

    private var job = Job()
    private val scope = CoroutineScope(job + Dispatchers.Main)

    fun login(email: String, password: String): MutableLiveData<Boolean> {
        val liveData = MutableLiveData<Boolean>()

        scope.launch {
            client.clearNormalizedCache()
            val res = client
                .mutate(LoginMutation(email = email, password = password))
                .toDeferred()
                .await()
            liveData.value = res.data?.login != null
            getCurrentUser()
        }

        return liveData
    }

    private fun getCurrentUser(): MutableLiveData<CurrentUserQuery.CurrentUser?> {
        val liveData = MutableLiveData<CurrentUserQuery.CurrentUser?>()

        scope.launch {
            val res = client
                .query(CurrentUserQuery())
                .toDeferred()
                .await()
            liveData.value = res.data?.currentUser
        }

        return liveData
    }
}