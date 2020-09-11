package com.factibly.factibly.ui.user

import android.annotation.SuppressLint
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import com.factibly.factibly.BuildConfig
import com.factibly.factibly.R
import com.factibly.factibly.databinding.RegistrationFragmentBinding

class RegistrationFragment : Fragment() {

    private lateinit var binding: RegistrationFragmentBinding

    companion object {
        fun newInstance() = RegistrationFragment()
    }

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        return inflater.inflate(R.layout.registration_fragment, container, false)
    }

    @SuppressLint("SetJavaScriptEnabled")
    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        binding = RegistrationFragmentBinding.bind(view)

        binding.registrationWebView.apply {
            settings.javaScriptEnabled = true
            settings.domStorageEnabled = true
            loadUrl("${BuildConfig.factibly_base_url}/account/register")
        }
    }
}