package com.factibly.factibly.ui.bookmarks

import android.content.Context
import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.factibly.factibly.BookmarksListQuery
import com.factibly.factibly.R
import com.factibly.factibly.databinding.BookmarkCardBinding
import com.google.android.material.card.MaterialCardView

class BookmarkCardsAdapter(
    private val bookmarks: List<BookmarksListQuery.Bookmark?>,
    private val context: Context,
    private val actionModeCallback: BookmarksActionModeCallback,
    private val onRemoveBookmarks: (contentIds: List<String>) -> Unit
) : RecyclerView.Adapter<BookmarkCardsAdapter.ViewHolder>() {

    private lateinit var binding: BookmarkCardBinding

    private var selectedCount = 0
    private var selectedBookmarks = hashSetOf<String>()

    inner class ViewHolder internal constructor() : RecyclerView.ViewHolder(binding.root) {

        fun bind(bookmark: BookmarksListQuery.Bookmark?) {
            if (bookmark == null) return

            binding.bookmarkCard.setOnClickListener {
                if (actionModeCallback.hasStarted) {
                    binding.bookmarkCard.isChecked = !binding.bookmarkCard.isChecked
                    if (binding.bookmarkCard.isChecked) {
                        selectedBookmarks.add(bookmark.id)
                        selectedCount += 1
                    } else {
                        selectedBookmarks.remove(bookmark.id)
                        selectedCount -= 1
                    }
                    actionModeCallback.title = context.getString(R.string.action_selected_count, selectedCount)
                }
            }
            binding.bookmarkCard.setOnLongClickListener {
                if (!actionModeCallback.hasStarted) {
                    selectedCount = 1
                    selectedBookmarks.add(bookmark.id)
                    actionModeCallback.startActionMode(
                        binding.root.rootView,
                        context.getString(R.string.action_selected_count, selectedCount)
                    ) {
                        selectedCount = 0
                        onRemoveBookmarks(selectedBookmarks.toList())
                    }
                    binding.bookmarkCard.isChecked = true
                }
                true
            }

            binding.bookmarkName.text = bookmark.title ?: ""
        }
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        binding = BookmarkCardBinding.inflate(LayoutInflater.from(parent.context), parent, false)
        return ViewHolder()
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        holder.bind(bookmarks[position])
    }

    override fun getItemCount() = bookmarks.size
}