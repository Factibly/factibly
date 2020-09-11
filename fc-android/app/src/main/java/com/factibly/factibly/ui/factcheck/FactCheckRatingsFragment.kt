package com.factibly.factibly.ui.factcheck

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.fragment.app.activityViewModels
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.factibly.factibly.R
import com.factibly.factibly.databinding.FactCheckRatingsFragmentBinding
import com.factibly.factibly.viewmodels.FactCheckViewModel
import dagger.hilt.android.AndroidEntryPoint

@AndroidEntryPoint
class FactCheckRatingsFragment : Fragment() {

    private lateinit var binding: FactCheckRatingsFragmentBinding
    private val viewModel: FactCheckViewModel by activityViewModels()

    private lateinit var recyclerView: RecyclerView
    private lateinit var viewAdapter: RecyclerView.Adapter<*>
    private lateinit var viewManager: RecyclerView.LayoutManager


    companion object {
        fun newInstance() = FactCheckRatingsFragment()
    }

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        return inflater.inflate(R.layout.fact_check_ratings_fragment, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        binding = FactCheckRatingsFragmentBinding.bind(view)
        viewManager = LinearLayoutManager(context)

        viewModel.content.observe(viewLifecycleOwner) {
            val ratings = it?.ratingSet ?: emptyList()

            viewAdapter = FactCheckRatingCardsAdapter(ratings)
            recyclerView = binding.factCheckRatingCards.apply {
                layoutManager = viewManager
                adapter = viewAdapter
            }
        }

        binding.factCheckRatingsSwipeRefresh.setOnRefreshListener {
            viewModel.refreshContent()
            binding.factCheckRatingsSwipeRefresh.isRefreshing = false
        }
    }
}