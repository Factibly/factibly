package com.factibly.factibly.viewmodels

import androidx.hilt.lifecycle.ViewModelInject
import androidx.lifecycle.ViewModel
import com.factibly.factibly.repositories.UserRepository

class UserViewModel @ViewModelInject constructor(private val repository: UserRepository) :
        ViewModel() {

        fun login(email: String, password: String) = repository.login(email, password)
}