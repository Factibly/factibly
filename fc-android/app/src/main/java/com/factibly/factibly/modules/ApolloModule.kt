package com.factibly.factibly.modules

import android.content.Context
import com.apollographql.apollo.ApolloClient
import com.apollographql.apollo.api.CustomTypeAdapter
import com.apollographql.apollo.api.CustomTypeValue
import com.apollographql.apollo.cache.normalized.NormalizedCacheFactory
import com.apollographql.apollo.cache.normalized.lru.EvictionPolicy
import com.apollographql.apollo.cache.normalized.lru.LruNormalizedCache
import com.apollographql.apollo.cache.normalized.lru.LruNormalizedCacheFactory
import com.apollographql.apollo.cache.normalized.sql.SqlNormalizedCacheFactory
import com.factibly.factibly.BuildConfig
import com.factibly.factibly.type.CustomType
import com.franmontiel.persistentcookiejar.PersistentCookieJar
import com.franmontiel.persistentcookiejar.cache.SetCookieCache
import com.franmontiel.persistentcookiejar.persistence.SharedPrefsCookiePersistor
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.android.qualifiers.ApplicationContext
import dagger.hilt.components.SingletonComponent
import okhttp3.OkHttpClient
import okhttp3.logging.HttpLoggingInterceptor
import timber.log.Timber
import java.lang.RuntimeException
import java.text.ParseException
import java.text.SimpleDateFormat
import java.util.*
import javax.inject.Singleton

@Module
@InstallIn(SingletonComponent::class)
object ApolloModule {
    private const val ISO_8601_PATTERN = "yyyy-MM-dd'T'HH:mm:ss"
    private const val APOLLO_SQL_CACHE_DB = "apollo.db"

    @Singleton
    @Provides
    fun provideApolloClient(
        okHttpClient: OkHttpClient,
        cacheFactory: NormalizedCacheFactory<LruNormalizedCache>,
        dateTypeAdapter: CustomTypeAdapter<Date>
    ): ApolloClient =
        ApolloClient.builder()
            .okHttpClient(okHttpClient)
            .serverUrl(BuildConfig.graphql_base_url)
            .normalizedCache(cacheFactory)
            .addCustomTypeAdapter(CustomType.DATETIME, dateTypeAdapter)
            .build()

    @Provides
    fun provideOkHttpClient(
        httpLogInterceptor: HttpLoggingInterceptor,
        cookieJar: PersistentCookieJar
    ) = OkHttpClient.Builder()
        .cookieJar(cookieJar)
        .addInterceptor(httpLogInterceptor)
        .build()

    @Provides
    fun provideCookieJar(@ApplicationContext context: Context) =
        PersistentCookieJar(SetCookieCache(), SharedPrefsCookiePersistor(context))
        
    @Provides
    fun provideHttpLogInterceptor() =
        HttpLoggingInterceptor {
            message -> Timber.tag("OkHttp").i(message)
        }.apply {
            level = HttpLoggingInterceptor.Level.BASIC
        }

    @Provides
    fun provideCacheFactory(
        @ApplicationContext context: Context
    ): NormalizedCacheFactory<LruNormalizedCache> {
        val memoryCacheFactory =
            LruNormalizedCacheFactory(
                EvictionPolicy.builder()
                    .maxSizeBytes(10 * 1024 * 1024)
                    .build()
            )
        val sqlCacheFactory = SqlNormalizedCacheFactory(context, APOLLO_SQL_CACHE_DB)
        return memoryCacheFactory.chain(sqlCacheFactory)
    }

    @Provides
    fun provideDateTypeAdapter() = object : CustomTypeAdapter<Date> {
        override fun decode(value: CustomTypeValue<*>): Date = try {
            SimpleDateFormat(ISO_8601_PATTERN, Locale.US).parse(value.value.toString()) ?: Date()
        } catch (e: ParseException) {
            throw RuntimeException(e)
        }

        override fun encode(value: Date): CustomTypeValue<*> =
            CustomTypeValue.GraphQLString(SimpleDateFormat(ISO_8601_PATTERN, Locale.US).format(value))
    }
}