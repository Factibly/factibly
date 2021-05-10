package com.factibly.factibly.repository

import com.apollographql.apollo.ApolloClient
import com.apollographql.apollo.api.Response
import com.apollographql.apollo.coroutines.await
import com.factibly.factibly.CurrentUserQuery
import com.factibly.factibly.LoginMutation
import javax.inject.Inject

class UserRepository @Inject constructor(private val client: ApolloClient) {

    suspend fun login(email: String, password: String): Response<LoginMutation.Data> = client
        .mutate(LoginMutation(email = email, password = password))
        .await()

    suspend fun getCurrentUser(): Response<CurrentUserQuery.Data> = client
        .query(CurrentUserQuery())
        .await()
}