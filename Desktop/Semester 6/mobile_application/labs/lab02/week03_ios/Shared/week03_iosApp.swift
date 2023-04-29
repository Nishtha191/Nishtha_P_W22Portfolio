//
//  week03_iosApp.swift
//  Shared
//
//  Created by Nishtha Patel on 2022-01-27.
//

import SwiftUI

@main
struct week03_iosApp: App {
    let persistenceController = PersistenceController.shared

    var body: some Scene {
        WindowGroup {
            ContentView()
                .environment(\.managedObjectContext, persistenceController.container.viewContext)
        }
    }
}
