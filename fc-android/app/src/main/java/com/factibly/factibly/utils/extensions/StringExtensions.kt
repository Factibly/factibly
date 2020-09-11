package com.factibly.factibly.utils.extensions

import java.util.*

private const val GQL_ERROR_MESSAGE_PATTERN = "^.*#@([.|\\d\\w]+)@$"
private const val GQL_FALLBACK_ERROR_MESSAGE = "app.alert.error.fallback"
private const val DEFAULT_DELIMITER = "-"

fun String.parseGqlErrorMsg(): String {
    val matched = GQL_ERROR_MESSAGE_PATTERN.toRegex(RegexOption.IGNORE_CASE).find(this)
    return if (matched == null) {
        GQL_FALLBACK_ERROR_MESSAGE
    } else {
        val (msgId) = matched.destructured
        msgId
    }.delimitedToSnake(".") // Ruby vibes...
}

fun String.delimitedToCamel(delimiter: String = DEFAULT_DELIMITER) =
    "$delimiter[a-zA-Z]".toRegex().replace(this) {
        it.value.replace(delimiter, "").toUpperCase(Locale.ROOT)
    }

fun String.delimitedToPascal(delimiter: String = DEFAULT_DELIMITER) =
    this.delimitedToCamel(delimiter).capitalize(Locale.ROOT)

fun String.delimitedToSnake(delimiter: String = DEFAULT_DELIMITER) =
    "$delimiter[a-zA-Z]".toRegex().replace(this) {
        it.value.replace(delimiter, "_")
    }
