package com.factibly.factibly.utils

import android.util.Patterns

object Validators {
    fun validateEmail(email: String) = Patterns.EMAIL_ADDRESS.matcher(email).matches()
}