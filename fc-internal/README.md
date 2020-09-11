# Factibly Internal Tools

## Overview

| Script/Program         | Description                                                                               |
| ---------------------- | ----------------------------------------------------------------------------------------- |
| [setup.sh](./setup.sh) | installs most dependencies and starts the local servers for fc-web and fc-api subprojects |
| [i18n.cpp](./i18n.cpp) | converts localized messages (\*-messages.\[jt\]) between a JSON and CSV file              |

## Usage Instructions

For further assistance on any particular script/program, you should specify the \[-h\] flag when running it in order to display a relevant and useful help text on the console.

FILENAME-WITH-EXTENSION --> replace with the filename in question and _include_ the file extension \
FILENAME-WITHOUT-EXTENSION --> replace with the filename in question and _exclude_ the file extension

### Bash

For files with a .sh extension,

1. Open any bash shell
2. Clone or download this repository
3. Run `chmod +x FILENAME-WITH-EXTENSION` to make the file executable
4. Run `./FILENAME-WITH-EXTENSION` with any available flags \
   Example: `./setup.sh -p -w "./fc-web" -a "./fc-api"`

### C++

For files with a .cpp extension,

1. Open [MingGW-64](https://sourceforge.net/projects/mingw-w64/) (Windows) or Terminal (macOS/Linux), or any equivalent command line interface
2. Clone or download this repository
3. Go to the root directory for this repository on your machine
4. Unzip the [dependencies.zip](dependencies.zip) file _within the same directory_
5. Install g++-9 or later as the C++ compiler
   - Windows: run `g++ --version` to check your g++ version and, if g++ is outdated, update MingGW-w64 accordingly
   - macOS/Linux: install [Homebrew](https://brew.sh/) and run `brew install gcc`
6. Run `make` to compile the C++ files
7. Run `./FILENAME-WITHOUT-EXTENSION` with any available flags \
   Example: `./i18n -i messages.json -o messages.csv`

## Code Styles

We follow Google's [C++ Style Guide](https://google.github.io/styleguide/cppguide.html) as well as the following naming conventions:

| Type         | Rule                 | Examples                                 |
| ------------ | -------------------- | ---------------------------------------- |
| macros       | SCREAMING_SNAKE_CASE | `#define PI_THREE_SIG_FIGS 3.14`         |
| globals      | SCREAMING_SNAKE_CASE | `const float PI_THREE_SIG_FIGS = 3.14`   |
| variables    | snake_case           | `std::string jadon_fan = "Jadon";`       |
| functions    | snake_case           | `void find_jadon() { }`                  |
| structures   | snake_case           | `struct jadon_fan { a: 21, b: 22 }`      |
| unions       | snake_case           | `union jadon_fan { c: 23, d: 24 }`       |
| classes      | PascalCase           | `class JadonFan: public WaterlooStudent` |
| enum types   | PascalCase           | `enum struct JadonMood { HAPPY, SAD }`   |
| enum members | PascalCase           | `enum class JadonMood { HaOp, SaPe };`   |
| namespaces   | lowercase            | `namespace factibly { }`                 |
| files        | snake_case           | `fake_check.hpp`                         |
| folders      | snake_case           | `fact_check` folder                      |

## Libraries

The source code for the third-party libraries can be found in the [dependencies](./dependencies/) folder. We currently do _not_ &mdash; but may in the future &mdash; use CMake (somewhat overkill) or any dependency manager such as Hunter.

We utilize the following libraries beyond the C++ STL:

- JSON for Modern C++ &ndash; parses and formats JSON objects
- CSV for C++ &ndash; parses and formats CSV files

## VSCode Extensions

When you open this project directly on VSCode, the IDE recommends some useful extensions for you based on the
[extensions.json](.vscode/extensions.json) file. You can install these extensions via the VSCode Marketplace. You can
add your own recommendations, but please update the list below if you do so.

The following VSCode extensions are recommended for this project:

- C/C++ &ndash; adds language support for C and C++
- Excel Viewer &ndash; shows CSV files as formatted tables
