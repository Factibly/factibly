package com.factibly.factibly.ui.bookmarks

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.factibly.factibly.BookmarksListQuery
import com.factibly.factibly.R
import com.factibly.factibly.databinding.BookmarkCardBinding
import com.google.android.material.card.MaterialCardView

class BookmarkCardsAdapter(private val bookmarks: List<BookmarksListQuery.Bookmark?>,
                           private val actionModeCallback: BookmarksActionModeCallback,
                           private val onRemoveBookmarks: (contentIds: List<String>) -> Unit) :
    RecyclerView.Adapter<BookmarkCardsAdapter.ViewHolder>() {

    private lateinit var binding: BookmarkCardBinding

    private var selectedCount = 0
    private var selectedCards = hashMapOf<String, MaterialCardView>()
    private lateinit var titleTemplate: String

    inner class ViewHolder internal constructor() : RecyclerView.ViewHolder(binding.root) {

        fun bind(bookmark: BookmarksListQuery.Bookmark?) {
            if (bookmark == null) return

            binding.bookmarkCard.setOnClickListener {
                if (actionModeCallback.hasStarted) {
                    binding.bookmarkCard.isChecked = !binding.bookmarkCard.isChecked
                    if (binding.bookmarkCard.isChecked) {
                        selectedCards[bookmark.id] = binding.bookmarkCard
                        selectedCount += 1
                    } else {
                        selectedCards.remove(bookmark.id)
                        selectedCount -= 1
                    }
                    actionModeCallback.title = titleTemplate.format(selectedCount)
                }
            }
            binding.bookmarkCard.setOnLongClickListener {
                if (!actionModeCallback.hasStarted) {
                    selectedCount = 1
                    selectedCards[bookmark.id] = binding.bookmarkCard
                    actionModeCallback.startActionMode(
                        binding.root.rootView,
                        titleTemplate.format(selectedCount)
                    ) {
                        selectedCount = 0
                        val contentIds = selectedCards.map { c ->
                            c.value.isChecked = false
                            c.key
                        }
                        onRemoveBookmarks(contentIds)
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
        titleTemplate = binding.root.rootView.context.getString(R.string.action_selected_count)
        return ViewHolder()
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        holder.bind(bookmarks[position])
    }

    override fun getItemCount() = bookmarks.size
}