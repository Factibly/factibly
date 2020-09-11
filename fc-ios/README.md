# Factibly iOS

## Setup Procedures

*The following setup procedures can only be completed on a computer running on macOS 10.14.4 or later.*

1. Complete the setup procedures for the [fc-api](https://github.com/Sapphire-Labs/factibly/blob/master/fc-api/README.md) subproject
2. Install Xcode 11.0 or later on the Mac App Store
3. Open Terminal (macOS), or any equivalent command line interface
4. Clone or download this repository
5. Go to the root directory for this repository on your machine
6. Run `ruby --version` and check that Ruby 2.6 or later is installed on your machine; if not, install _either_ the newest version of the [Ruby](https://www.ruby-lang.org/en/documentation/installation/) programming language _or_ only the [Bundler](https://bundler.io/) dependency manager  \*
7. Run  `bundle install` to install the CocoaPods dependency manager and its plugins
8. Run `pod install` to install the project dependencies
9. Type in any random text when prompted for the `RollbarPostClientItemAccessToken` key
10. Open the Factibly.xcworkspace directory in Xcode \*\*

\* Bundler is included in Ruby 2.6 and above \
\*\* Do _not_ directly open the fc-ios directory on Xcode
