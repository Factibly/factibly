package com.factibly.factibly.util.extension

import android.content.res.Resources
import androidx.annotation.StringRes

fun Resources.getErrorString(errorMsg: String?, packageName: String): String {
    @StringRes val resId = this.getIdentifier(errorMsg?.parseGqlErrorMsg(), "string", packageName)
    return try {
        this.getString(resId)
    } catch (e: Resources.NotFoundException) {
        ""
    }
}