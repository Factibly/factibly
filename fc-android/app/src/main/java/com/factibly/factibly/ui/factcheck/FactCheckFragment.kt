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
import androidx.viewpager2.widget.ViewPager2
import com.factibly.factibly.R
import com.factibly.factibly.databinding.FactCheckFragmentBinding
import com.factibly.factibly.viewmodels.FactCheckViewModel
import com.google.android.material.tabs.TabLayoutMediator
import dagger.hilt.android.AndroidEntryPoint

@AndroidEntryPoint
class FactCheckFragment : Fragment() {

    private val args: FactCheckFragmentArgs by navArgs()

    private lateinit var binding: FactCheckFragmentBinding
    private val viewModel: FactCheckViewModel by activityViewModels()

    private lateinit var viewPager: ViewPager2

    companion object {
        fun newInstance(contentId: String?): FactCheckFragment {
            val fragment = FactCheckFragment()
            fragment.arguments = bundleOf("content_id" to contentId)
            return fragment
        }
    }

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        return inflater.inflate(R.layout.fact_check_fragment, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        binding = FactCheckFragmentBinding.bind(view)

        viewPager = binding.factCheckPager

        val pagerAdapter = FactCheckPagerAdapter(requireActivity())
        viewPager.adapter = pagerAdapter

        val tabLayout = binding.factCheckTabs
        TabLayoutMediator(tabLayout, viewPager) { tab, position ->
            when (position) {
                0 -> {
                    tab.text = "Overview"
                }
                1 -> {
                    tab.text = "My Rating"
                }
                2 -> {
                    tab.text = "User Ratings"
                }
            }
        }.attach()

        viewModel.setContentId(args.contentId ?: arguments?.getString("content_id") ?: "")
    }

    private class FactCheckPagerAdapter(fa: FragmentActivity) : FragmentStateAdapter(fa) {

        private val fragments: Array<Fragment> = arrayOf(
            FactCheckOverviewFragment.newInstance(),
            FactCheckOverviewFragment.newInstance(),
            FactCheckRatingsFragment.newInstance()
        )

        override fun getItemCount(): Int = fragments.size

        override fun createFragment(position: Int): Fragment = fragments[position]
    }
}
