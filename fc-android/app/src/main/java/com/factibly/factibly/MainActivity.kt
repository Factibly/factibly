package com.factibly.factibly

import android.app.SearchManager
import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.view.Menu
import android.view.MenuItem
import android.view.View
import android.view.inputmethod.EditorInfo
import androidx.activity.viewModels
import androidx.appcompat.app.AppCompatActivity
import androidx.appcompat.widget.SearchView
import androidx.core.os.bundleOf
import androidx.navigation.findNavController
import androidx.navigation.fragment.NavHostFragment
import androidx.navigation.ui.AppBarConfiguration
import androidx.navigation.ui.NavigationUI
import androidx.navigation.ui.navigateUp
import androidx.navigation.ui.setupWithNavController
import com.factibly.factibly.databinding.MainActivityBinding
import com.factibly.factibly.ui.factcheck.FactCheckFragment.Companion.CONTENT_ID_KEY
import com.factibly.factibly.util.extension.getErrorString
import com.factibly.factibly.util.extension.observeOnce
import com.factibly.factibly.viewmodel.FactCheckViewModel
import com.google.android.material.snackbar.Snackbar
import com.google.firebase.ktx.Firebase
import com.google.firebase.remoteconfig.ktx.remoteConfig
import com.rollbar.android.Rollbar
import dagger.hilt.android.AndroidEntryPoint


@AndroidEntryPoint
class MainActivity : AppCompatActivity() {

    private lateinit var binding: MainActivityBinding
    private lateinit var appBarConfiguration: AppBarConfiguration

    private val viewModel: FactCheckViewModel by viewModels()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        binding = MainActivityBinding.inflate(layoutInflater)
        val view = binding.root
        setContentView(view)

        setSupportActionBar(binding.toolbar)
        supportActionBar?.setTitle(R.string.app_name)

        val navHostFragment = supportFragmentManager.findFragmentById(R.id.key_display) as NavHostFragment
        val navController = navHostFragment.navController

        appBarConfiguration = AppBarConfiguration(navController.graph)
        //  setupActionBarWithNavController(navController, appBarConfiguration)

        binding.bottomNavigationView.setupWithNavController(navController)

        handleIntent(intent)

        if (savedInstanceState == null) {
            Firebase.remoteConfig.fetchAndActivate().addOnSuccessListener(this) {
                binding.container.visibility = View.VISIBLE
            }

            if (BuildConfig.FLAVOR == "production") {
                Rollbar.init(applicationContext)
            }
        }
    }

    override fun onCreateOptionsMenu(menu: Menu?): Boolean {
        menuInflater.inflate(R.menu.main_options_menu, menu)

        val searchManager = getSystemService(Context.SEARCH_SERVICE) as SearchManager
        (menu?.findItem(R.id.menu_search)?.actionView as? SearchView)?.apply {
            setSearchableInfo(searchManager.getSearchableInfo(componentName))
            queryHint = getString(R.string.query_hint)
            imeOptions = EditorInfo.IME_ACTION_SEARCH
        }

        return super.onCreateOptionsMenu(menu)
    }

    override fun onOptionsItemSelected(item: MenuItem): Boolean {
        val navController = findNavController(R.id.key_display)
        return NavigationUI.onNavDestinationSelected(item, navController) ||
                super.onOptionsItemSelected(item)
    }

    override fun onSupportNavigateUp(): Boolean {
        val navController = findNavController(R.id.key_display)
        return navController.navigateUp(appBarConfiguration) || super.onSupportNavigateUp()
    }

    private fun handleIntent(intent: Intent) {
        if (intent.action == Intent.ACTION_SEARCH) {
            intent.getStringExtra(SearchManager.QUERY)?.let { searchQuery ->
                val navHostFragment = supportFragmentManager.findFragmentById(R.id.key_display) as NavHostFragment
                val navController = NavHostFragment.findNavController(navHostFragment)
                viewModel.searchContent.observeOnce(this) { searchRes ->
                    if (searchRes?.errors.isNullOrBlank()) {
                        navController.navigate(
                            R.id.factCheckFragment,
                            bundleOf(CONTENT_ID_KEY to searchRes?.content?.id)
                        )
                    } else if (searchRes != null) {
                        val msgRes = resources.getErrorString(searchRes.errors, packageName)
                        Snackbar.make(binding.keyDisplay, msgRes, Snackbar.LENGTH_SHORT)
                            .setAnchorView(binding.bottomNavigationView)
                            .setBackgroundTint(resources.getColor(R.color.colorAlertError, theme))
                            .show()
                    }
                }
                viewModel.searchFactCheck(searchQuery)
            }
        }
    }
}