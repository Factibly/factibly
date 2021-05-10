package com.factibly.factibly.ui.bookmarks

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.fragment.app.activityViewModels
import androidx.recyclerview.widget.LinearLayoutManager
import com.factibly.factibly.R
import com.factibly.factibly.databinding.BookmarksFragmentBinding
import com.factibly.factibly.viewmodel.BookmarksViewModel
import dagger.hilt.android.AndroidEntryPoint

@AndroidEntryPoint
class BookmarksFragment : Fragment() {

    private lateinit var binding: BookmarksFragmentBinding
    private val viewModel: BookmarksViewModel by activityViewModels()

    private val actionModeCallback = BookmarksActionModeCallback()

    companion object {
        fun newInstance() = BookmarksFragment()
    }

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View = inflater.inflate(R.layout.bookmarks_fragment, container, false)

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        binding = BookmarksFragmentBinding.bind(view)
        val viewManager = LinearLayoutManager(context)

        viewModel.bookmarks.observe(viewLifecycleOwner) {
            val bookmarksSize = it.size

            binding.bookmarksCount.text =
                resources.getQuantityString(R.plurals.bookmarks_count, bookmarksSize, bookmarksSize)

            binding.bookmarkCards.apply {
                layoutManager = viewManager
                adapter = BookmarkCardsAdapter(it, context, actionModeCallback) { contentIds ->
                    viewModel.removeBookmarks(contentIds)
                }
            }
        }

        viewModel.getBookmarks()
    }
}