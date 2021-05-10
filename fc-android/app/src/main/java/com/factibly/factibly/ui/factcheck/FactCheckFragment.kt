package com.factibly.factibly.ui.factcheck

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.core.os.bundleOf
import androidx.fragment.app.FragmentActivity
import androidx.fragment.app.activityViewModels
import androidx.navigation.fragment.navArgs
import androidx.viewpager2.adapter.FragmentStateAdapter
import com.factibly.factibly.R
import com.factibly.factibly.databinding.FactCheckFragmentBinding
import com.factibly.factibly.viewmodel.FactCheckViewModel
import com.google.android.material.tabs.TabLayoutMediator
import dagger.hilt.android.AndroidEntryPoint

@AndroidEntryPoint
class FactCheckFragment : Fragment() {

    private val args: FactCheckFragmentArgs by navArgs()

    private lateinit var binding: FactCheckFragmentBinding
    private val viewModel: FactCheckViewModel by activityViewModels()

    companion object {
        const val CONTENT_ID_KEY = "content_id"

        fun newInstance(contentId: String?) = FactCheckFragment().apply {
           arguments = bundleOf(CONTENT_ID_KEY to contentId)
        }
    }

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View = inflater.inflate(R.layout.fact_check_fragment, container, false)

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        binding = FactCheckFragmentBinding.bind(view)

        binding.factCheckPager.adapter = FactCheckPagerAdapter(requireActivity())

        TabLayoutMediator(binding.factCheckTabs, binding.factCheckPager) { tab, position ->
            tab.text = when (position) {
                0 -> getString(R.string.overview)
                1 -> getString(R.string.my_rating)
                2 -> getString(R.string.user_rating)
                else -> null
            }
        }.attach()

        viewModel.findFactCheck(args.contentId
            ?: requireArguments().getString(CONTENT_ID_KEY)
            ?: ""
        )
    }

    private class FactCheckPagerAdapter(fa: FragmentActivity) : FragmentStateAdapter(fa) {

        private val fragments = arrayOf(
            FactCheckOverviewFragment.newInstance(),
            FactCheckOverviewFragment.newInstance(),
            FactCheckRatingsFragment.newInstance()
        )

        override fun getItemCount() = fragments.size

        override fun createFragment(position: Int) = fragments[position]
    }
}
