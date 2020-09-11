# Factibly Android

## Setup Procedures

1. Complete the setup procedures for the [fc-api](https://github.com/Sapphire-Labs/factibly/blob/master/fc-api/README.md) subproject
2. Clone or download this repository
3. Build the Android app on Android Studio

## GraphQL

IMPORTANT: The following instructions are only required for development, not for setup

In order to download the schema for our GraphQL queries and mutations,

1. Go to the root directory for this repository on your machine
2. Run `./gradlew downloadSchema` to download the GraphQL schema from our back-end

## Compatibility

The application is compatible with Android 5.1 (SDK 22) and newer.

## Configurations

The public configuration variables are stored in the factibly.properties file. The private configuration variables, such as API keys, are stored in the Firebase Remote Config service and are fetched and activated together in the `MainActivity.onCreate()` method. If a particular configuration variable has a name with a prefix of "DEV", "STAGE" or "PROD", then that variable is only applicable to the development, staging or production environment respectively; otherwise, that variable is applicable to all environments.

The factibly.properties file is ignored by git (see [.gitignore](.gitignore)). You can contact Jadon for a copy of that file.

## Architecture

The app has been created under a single-activity architecture where
[`MainActivity`](/app/src/main/java/com/factibly/factibly/MainActivity.kt) serves as the root activity.

## Design Pattern

The app follows the Model-View-View Model (MVVM) design pattern through the use of Jetpack Architecture Components as shown in the following diagram:
<img src="https://developer.android.com/topic/libraries/architecture/images/final-architecture.png" alt="mvvm skeleton diagram"> <br>
SOURCE: https://developer.android.com/topic/libraries/architecture/images/final-architecture.png

We use Hilt to perform dependency injections. The Dagger modules are defined in the
[modules](app/src/main/java/com/factibly/factibly/modules) package.

## Local Data Storage

We use Room (SQLite) to store large and/or complex datasets locally on an user's device. The local
database schemas are defined in the [app/db/schemas](/app/db/schemas) directory. The number in the
filename of each JSON-formatted schema represents the corresponding database version; e.g., 1.json
contains the schema for v1 of a particular database.

Otherwise, we use DataStore, except in the preferences fragment and in the persistent cookie jar
which continue to rely on SharedPreferences.

## Bindings

We use view binding over `findViewById(Int)` in most situations. However, we do _not_ use data binding.

## Navigation

We use the Jetpack navigation component, with the Safe Args plugin, to handle the in-app navigation.
The navigation graph is defined in [nav_graph.xml](/app/src/main/res/navigation/nav_graph.xml) file.
Consequently, there is little need for the following boilerplate code:

```kotlin
supportFragmentManager.beginTransaction()
    .replace(@IdRes Int, Fragment)
    .addToBackStack(String)
    .commit()
```

## Error Handling

You can use a `try {...} catch {...} finally {...}` statement to handle errors sent by the back-end.
Within a particular error message, you can likely find its ID between the `#@` and `@` symbols; if
such symbols do exist, you can call the `String.parseGqlErrorMsg()` **extension function** on the error message
to retrieve its ID _in a snake\_case format_ and then map that ID to its corresponding string resource
through the use of the `resources.getIdentifier(String, String, String)` function. This way, you can
obtain a localized and user-friendly version of the error message.

## User Interface (UI) Design

The app uses [material design](https://material.io/design/foundation-overview/) as its design language.
Many of the material components come from the [MDC-Android](https://material.io/develop/android) library.

You should be particularly aware of the following UI guidelines:

- Use, for most components, sizes and spacings &mdash; including the width, height, margin and padding properties
  &mdash; in increments of 4dp for tighter or smaller components, and of 8dp otherwise
- Use dialogs sparingly, and only when they contain critical information or tasks for the users, and consider the use of
  a snack bar, toast, tooltip or popover instead as dialogs are purposefully interruptive

## Code Styles

We follow the official Kotlin [coding conventions](https://kotlinlang.org/docs/reference/coding-conventions.html).

In Android Studio, Android Lint is enabled by default. You can use the "Inspect Code" tool
(Analyze > Inspect Tool) to get a more thorough and consolidated list of lint warnings and errors.
You can also use the "Reformat Code" (Code > Reformat Code) and "Optimize Imports"
(Code > Optimize Imports) tools so that you can leave some of the tedious refactoring work to
the IDE. However, we strongly do _not_ recommend that you use the "Remove Unused Resources" tool
because it does not play nice with view bindings and navigation components, and will most likely
incorrectly treat some resources as unused.

## Tests

We use JUnit and Espresso to create automated tests.

## Frameworks and Libraries

We utilize the following frameworks and libraries beyond the Jetpack libraries:

- MDC-Android &ndash; creates material design components and styles
- Apollo Android &ndash; handles GraphQL mutations and queries
- OKHttp3 &ndash; handles HTTP requests
- Persistent Cookie Jar &ndash; stores cookies persistently
- Hilt &ndash; handles dependency injection using Dagger
- Material Rating Bar &ndash; creates a material version of the standard rating bar view
- Timber &ndash; extends the default Android logger