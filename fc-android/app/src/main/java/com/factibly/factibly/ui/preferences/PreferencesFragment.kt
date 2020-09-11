package com.factibly.factibly.ui.preferences

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.appcompat.app.AppCompatDelegate
import androidx.preference.DropDownPreference
import androidx.preference.PreferenceFragmentCompat
import com.factibly.factibly.R

class PreferencesFragment : PreferenceFragmentCompat() {

    companion object {
        fun newInstance() = PreferencesFragment()
    }

    override fun onCreatePreferences(savedInstanceState: Bundle?, rootKey: String?) {
        setPreferencesFromResource(R.xml.pref_settings, rootKey)

        val delegate = (requireActivity() as AppCompatActivity).delegate

        val themes = resources.getStringArray(R.array.themes)
        val themePreference = findPreference<DropDownPreference>("theme")

        themePreference?.summary = themes[themePreference?.value?.toInt() ?: 0]
        themePreference?.setOnPreferenceChangeListener { preference, newValue ->
            preference.summary = themes[newValue.toString().toInt()]
            when (newValue) {
                0 -> {
                    AppCompatDelegate.setDefaultNightMode(AppCompatDelegate.MODE_NIGHT_FOLLOW_SYSTEM)
                    delegate.localNightMode = AppCompatDelegate.MODE_NIGHT_FOLLOW_SYSTEM
                    true
                }
                1 -> {
                    AppCompatDelegate.setDefaultNightMode(AppCompatDelegate.MODE_NIGHT_NO)
                    delegate.localNightMode = AppCompatDelegate.MODE_NIGHT_NO
                    true
                }
                2 -> {
                    AppCompatDelegate.setDefaultNightMode(AppCompatDelegate.MODE_NIGHT_YES)
                    delegate.localNightMode = AppCompatDelegate.MODE_NIGHT_YES
                    true
                }
                else -> false
            }
        }
    }
}
