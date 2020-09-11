package com.factibly.factibly.ui.factcheck

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.factibly.factibly.ContentQuery
import com.factibly.factibly.databinding.FactCheckRatingCardBinding
import java.lang.Double.NaN
import java.text.SimpleDateFormat
import java.util.*

class FactCheckRatingCardsAdapter(private val ratings: List<ContentQuery.RatingSet?>) :
    RecyclerView.Adapter<FactCheckRatingCardsAdapter.ViewHolder>() {

    private lateinit var binding: FactCheckRatingCardBinding
    private val outboundDateFormat by lazy {
        SimpleDateFormat("MMM dd, yyyy", Locale.getDefault())
    }

    inner class ViewHolder internal constructor(private val binding: FactCheckRatingCardBinding) :
        RecyclerView.ViewHolder(binding.root) {

        fun bind(rating: ContentQuery.RatingSet?) {
            val displayName = rating?.user?.displayName ?: ""
            val createdAt = rating?.createdAt ?: Date()
            val justification = rating?.justification ?: ""
            val upvoteCount = (rating?.upvoteCount ?: 0).toString()
            val downvoteCount = (rating?.downvoteCount ?: 0).toString()
            val score1: Double = rating?.score1 ?: NaN
            val score2: Double = rating?.score2 ?: NaN
            val score3: Double = rating?.score3 ?: NaN
            val overallScore = doubleArrayOf(score1, score2, score3).average()

            binding.apply {
                factCheckRatingDisplayName.text = displayName
                factCheckRatingDate.text = outboundDateFormat.format(createdAt)
                factCheckRatingJustification.text = justification
                factCheckRatingUpVoteButton.text = upvoteCount
                factCheckRatingDownVoteButton.text = downvoteCount
                factCheckSecondaryStars.factCheckSecondaryRatingBar.rating = overallScore.toFloat()
            }
        }
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        binding = FactCheckRatingCardBinding.inflate(LayoutInflater.from(parent.context), parent, false)
        return ViewHolder(binding)
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        holder.bind(ratings[position])
    }

    override fun getItemCount() = ratings.size
}

