package com.factibly.factibly.ui.bookmarks

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.fragment.app.activityViewModels
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.factibly.factibly.R
import com.factibly.factibly.databinding.BookmarksFragmentBinding
import com.factibly.factibly.viewmodels.BookmarksViewModel
import dagger.hilt.android.AndroidEntryPoint

@AndroidEntryPoint
class BookmarksFragment : Fragment() {

    private lateinit var binding: BookmarksFragmentBinding
    private val viewModel: BookmarksViewModel by activityViewModels()

    private lateinit var recyclerView: RecyclerView
    private lateinit var viewAdapter: RecyclerView.Adapter<*>
    private lateinit var viewManager: RecyclerView.LayoutManager

    private val actionModeCallback = BookmarksActionModeCallback()

    companion object {
        fun newInstance() = BookmarksFragment()
    }

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        return inflater.inflate(R.layout.bookmarks_fragment, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        binding = BookmarksFragmentBinding.bind(view)
        viewManager = LinearLayoutManager(context)

        viewModel.bookmarks.observe(viewLifecycleOwner) {
            val bookmarksSize = it.size

            binding.bookmarksCount.text =
                resources.getQuantityString(R.plurals.bookmarks_count, bookmarksSize, bookmarksSize)

            viewAdapter = BookmarkCardsAdapter(it, actionModeCallback) { contentIds ->
                viewModel.removeBookmarks(contentIds)
            }

            recyclerView = binding.bookmarkCards.apply {
                layoutManager = viewManager
                adapter = viewAdapter
            }
        }
    }
}