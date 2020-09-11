package com.factibly.factibly.ui.user

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.fragment.app.activityViewModels
import androidx.navigation.fragment.findNavController
import com.factibly.factibly.R
import com.factibly.factibly.databinding.LoginFragmentBinding
import com.factibly.factibly.utils.Validators.validateEmail
import com.factibly.factibly.viewmodels.UserViewModel
import dagger.hilt.android.AndroidEntryPoint

@AndroidEntryPoint
class LoginFragment : Fragment() {

    private lateinit var binding: LoginFragmentBinding
    private val viewModel: UserViewModel by activityViewModels()

    companion object {
        fun newInstance() = LoginFragment()
    }

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        return inflater.inflate(R.layout.login_fragment, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        binding = LoginFragmentBinding.bind(view)

        binding.registerButton.setOnClickListener {
            val action = LoginFragmentDirections.actionLoginFragmentToRegistrationFragment()
            findNavController().navigate(action)
        }

        binding.loginButton.setOnClickListener {
            val email = binding.emailEditText.text.toString()
            val password = binding.passwordEditText.text.toString()
            var invalidSubmission = false

            if (email.isEmpty()) {
                binding.emailInputLayout.error = getString(R.string.field_required)
                invalidSubmission = true
            } else if (!validateEmail(email)) {
                binding.emailInputLayout.error = getString(R.string.email_invalid_format)
                invalidSubmission = true
            } else {
                binding.emailInputLayout.error = null
            }

            if (password.isEmpty()) {
                binding.passwordInputLayout.error = getString(R.string.field_required)
                invalidSubmission = true
            } else {
                binding.passwordInputLayout.error = null
            }

            if (!invalidSubmission) {
                viewModel.login(email, password)
                findNavController().navigateUp()
            }
        }
    }
}