//
//  ContentView.swift
//  Factibly
//
//  Created by Jadon Fan on 2020-09-10.
//  Copyright © 2020 Factibly. All rights reserved.
//

import SwiftUI

struct ContentView: View {
    @State private var selection = 0
    @State private var query : String = ""

    let items: [UITabBarItem] = [
        UITabBarItem(title: "Home", image: UIImage(named: "baseline_home_black_18pt"), tag: 0),
        UITabBarItem(title: "Fact Check", image: UIImage(named: "baseline_fact_check_black_18pt"), tag: 1),
        UITabBarItem(title: "Bookmarks", image: UIImage(named: "baseline_bookmarks_black_18pt"), tag: 2)
    ]
 
    var body: some View {
        VStack {
            SearchBar(text: $query)
            NavigationView {
               NavigationLink(destination: Text("dfadfa")) {
                    Text("Sfkfd")
                }
                .navigationBarTitle("Factibly")
            }
            GeometryReader { geometry in
                BottomNavigationBar(items: self.items)
                    .frame(width: geometry.size.width, height: 48, alignment: .bottom)
                    .offset(x: 0, y: geometry.size.height / 2 - 24)
            }
        }
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
