//
//  BottomNavigationView.swift
//  Factibly
//
//  Created by Jadon Fan on 2020-09-10.
//  Copyright © 2020 Factibly. All rights reserved.
//

import SwiftUI
import UIKit
import MaterialComponents.MaterialBottomNavigation

struct BottomNavigationBar: UIViewRepresentable {
    let bottomNavBar = MDCBottomNavigationBar()
    var items: [UITabBarItem]

    func makeUIView(context: Context) -> MDCBottomNavigationBar {
        bottomNavBar.titleVisibility = MDCBottomNavigationBarTitleVisibility.selected
        bottomNavBar.alignment = MDCBottomNavigationBarAlignment.justifiedAdjacentTitles

        bottomNavBar.items = items
        bottomNavBar.selectedItem = items[0]
        
        return bottomNavBar
    }
    
    func updateUIView(_ uiView: MDCBottomNavigationBar, context: Context) {
        return
    }
}
