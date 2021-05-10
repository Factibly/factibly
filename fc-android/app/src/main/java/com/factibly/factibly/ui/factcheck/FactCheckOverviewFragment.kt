package com.factibly.factibly.ui.factcheck

import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.fragment.app.activityViewModels
import com.factibly.factibly.R
import com.factibly.factibly.databinding.FactCheckOverviewFragmentBinding
import com.factibly.factibly.viewmodel.FactCheckViewModel
import dagger.hilt.android.AndroidEntryPoint

@AndroidEntryPoint
class FactCheckOverviewFragment : Fragment() {

    private lateinit var binding: FactCheckOverviewFragmentBinding
    private val viewModel: FactCheckViewModel by activityViewModels()

    companion object {
        fun newInstance() = FactCheckOverviewFragment()
    }

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View = inflater.inflate(R.layout.fact_check_overview_fragment, container, false)

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        binding = FactCheckOverviewFragmentBinding.bind(view)

        viewModel.factCheck.observe(viewLifecycleOwner) {
            val overallScore = it?.overallScore
            val ratingCount = it?.ratingSet?.size ?: 0
            val url = it?.url
            val updatedAt = it?.updatedAt ?: ""

            binding.factCheckPrimaryStars.factCheckPrimaryRatingBar.rating =
                overallScore?.toFloat() ?: 1F
            if (overallScore == null || ratingCount == 0) {
                binding.ratingScore.text = getString(R.string.not_yet_rated)
                binding.maxScore.visibility = View.GONE
                binding.ratingCount.visibility = View.GONE
            } else {
                binding.ratingScore.text = getString(R.string.std_float, overallScore)
                binding.maxScore.visibility = View.VISIBLE
                binding.ratingCount.text =
                    resources.getQuantityString(R.plurals.rating_based_on, ratingCount, ratingCount)
                binding.ratingCount.visibility = View.VISIBLE
            }

            if (url == null) {
                binding.visitSourceButton.visibility = View.GONE
            } else {
                binding.visitSourceButton.setOnClickListener {
                    val uri = Uri.parse(url)
                    val intent = Intent(Intent.ACTION_VIEW, uri)
                    startActivity(intent)
                }
            }

            binding.lastUpdatedOn.text = getString(R.string.last_updated_on, updatedAt)
        }
    }
}