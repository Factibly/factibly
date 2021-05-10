package com.factibly.factibly.ui.factcheck

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.fragment.app.activityViewModels
import androidx.recyclerview.widget.LinearLayoutManager
import com.factibly.factibly.R
import com.factibly.factibly.databinding.FactCheckRatingsFragmentBinding
import com.factibly.factibly.viewmodel.FactCheckViewModel
import dagger.hilt.android.AndroidEntryPoint

@AndroidEntryPoint
class FactCheckRatingsFragment : Fragment() {

    private lateinit var binding: FactCheckRatingsFragmentBinding
    private val viewModel: FactCheckViewModel by activityViewModels()
    
    companion object {
        fun newInstance() = FactCheckRatingsFragment()
    }

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View = inflater.inflate(R.layout.fact_check_ratings_fragment, container, false)

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        binding = FactCheckRatingsFragmentBinding.bind(view)
        val viewManager = LinearLayoutManager(context)

        viewModel.findFactCheck("-1")
        viewModel.factCheck.observe(viewLifecycleOwner) {
            val ratings = it?.ratingSet ?: emptyList()

            binding.factCheckRatingCards.apply {
                layoutManager = viewManager
                adapter = FactCheckRatingCardsAdapter(ratings)
            }
        }

        binding.factCheckRatingsSwipeRefresh.setOnRefreshListener {
            viewModel.findFactCheck("-1")
            binding.factCheckRatingsSwipeRefresh.isRefreshing = false
        }
    }
}