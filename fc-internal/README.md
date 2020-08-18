# FactCheck Internal

## Overview

| Script/Program         | Description                                                                               |
| ---------------------- | ----------------------------------------------------------------------------------------- |
| [setup.sh](./setup.sh) | installs most dependencies and starts the local servers for fc-web and fc-api subprojects |
| [i18n.cpp](./i18n.cpp) | converts localized messages (*-messages.\[jt\]) between a JSON and CSV file               |

## Usage Instructions

For further assistance on any particular script/program, you can specify the \[-h\] flag when running it in order to display a relevant and useful help text on the console.

FILENAME_WITH_EXTENSION    --> replace with the filename in question and _include_ the file extension \
FILENAME_WITHOUT_EXTENSION --> replace with the filename in question and _exclude_ the file extension

### Bash

For files with a .sh extension,

1. Open any bash shell
2. Clone or download this repository
3. Run `chmod +x FILENAME_WITH_EXTENSION` to make the file executable
4. Run `./FILENAME_WITH_EXTENSION` with any available flags \
   Example: `./setup.sh -p -w "./fc-web"  -a "./fc-api"`

### C++

For files with a .cpp extension,

1. Open [MingGW-64](https://sourceforge.net/projects/mingw-w64/) (Windows) or Terminal (macOS/Linux), or any equivalent command line interface
2. Clone or download this repository
3. Go to the root directory for this repository on your machine
4. Install g++-9 or later as the C++ compiler
   - Windows: run `g++ --version` to check your g++ version and, if g++ is outdated, update MingGW-w64 accordingly
   - macOS/Linux: install [Homebrew](https://brew.sh/) and run `brew install gcc`
5. Run `make` to compile the C++ files
6. Run `./FILENAME_WITHOUT_EXTENSION` with any available flags \
   Example: `./i18n -i messages.json -i messages.csv`
