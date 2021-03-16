package com.factibly.factibly.ui.bookmarks

import android.view.ActionMode
import android.view.Menu
import android.view.MenuItem
import android.view.View
import com.factibly.factibly.R

class BookmarksActionModeCallback : ActionMode.Callback {

    private var mode: ActionMode? = null
    private var onComplete: (() -> Unit)? = null

    var title = ""
        set(value) {
            field = value
            val mode = mode
            if (mode != null) {
                onPrepareActionMode(mode, mode.menu)
            }
        }

    var hasStarted = false

    override fun onCreateActionMode(mode: ActionMode, menu: Menu): Boolean {
        this.mode = mode
        mode.menuInflater.inflate(R.menu.bookmarks_action_menu, menu)
        mode.title = title
        return true
    }

    override fun onPrepareActionMode(mode: ActionMode, menu: Menu): Boolean {
        mode.title = title
        return true
    }

    override fun onActionItemClicked(mode: ActionMode, menu: MenuItem): Boolean {
        mode.finish()
        return true
    }

    override fun onDestroyActionMode(mode: ActionMode) {
        hasStarted = false
        onComplete?.invoke()
        return
    }

    fun startActionMode(view: View, title: String, onComplete: () -> Unit) {
        this.title = title
        this.onComplete = onComplete
        hasStarted = true
        view.startActionMode(this)
    }
}