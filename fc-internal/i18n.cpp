/*
  REQUIRES C++17 OR NEWER
  Created by Jadon 
  Last updated on August 16, 2020
*/

#include <iostream>
#include <iomanip>
#include <fstream>
#include <getopt.h>
#include <string>
// #include <sstream>
#include <vector>

#include "dependencies/nlohmann/json.hpp"
#include "dependencies/vincentlaucsb/csv.hpp"
#include "fake_check.hpp"

#define VERSION 1.0
#define AUTHOR "Jadon"

// using namespace std;
using json = nlohmann::json;


void fakecheck::i18n::message_csv_to_json(const std::string i_name, const std::string o_name) {
  // std::stringstream j_stream;
  json j;
  csv::CSVReader reader(i_name);

  std::vector<std::string> colNames = reader.get_col_names();

  for (csv::CSVRow& row : reader) {
    // j_stream << row.to_json() << std::endl;
    int i1 = 0;
    std::string id;
    for (csv::CSVField& field : row) {
      if (i1 == 0) {
        id = field.get<>();
      } else {
        j[colNames.at(i1 - 1)][id] = field.get<>();
      }
      ++i1;
    }
  }

  // j = json::parse(std::quoted(j_stream.str()));
  reader.close();

  std::ofstream o_file(o_name);
  o_file.clear();
  o_file << j.dump(2) << std::endl;
  o_file.close();
}


void fakecheck::i18n::message_json_to_csv(const std::string i_name, const std::string o_name) {
  std::ifstream i_file(i_name);
  json j;
  i_file >> j;
  i_file.close();

  fakecheck::i18n::message_map rows;  
  for (auto const& [locale, messages] : j.items()) {
    for (auto const& [id, text] : messages.items()) {
      // unlike Java, this is safe to do in C++ (and even if it wasn't, we could overload the [] operator :))
      rows[id][locale] = text;
    }
  } 

  std::ofstream o_file(o_name);
  o_file.clear();

  o_file << "id";
  for (auto const& column : (rows.begin()->second)) {
    o_file << "," << column.first;
  }
  o_file << "\n";

  for (auto const& [id, columns] : rows) {
    o_file << id;
    for (auto const& column : columns) {
      o_file << "," << "\"" << column.second << "\"";
    }
    o_file << "\n";
  } 

  o_file.close();
}


int main(int argc, char* argv[]) {
  if (__cplusplus < 201703L) {
    std::cerr << "requires C++17 (201703L) or newer, currently using " << fakecheck::getFriendlyCppStandard() << std::endl;
    return 1;
  }

  int f;
  bool as_csv = false;
  bool as_json = false;
  std::string i_name;
  std::string o_name;

  while ((f = getopt(argc, argv, "cji:o:h")) != -1) {
    switch (f) {
      case 'c':
        as_csv = true;
        break;
      case 'j':
        as_json = true;
        break;
        i_name = optarg;
        break;
      case 'o': 
        o_name = optarg;
        break;
      case 'h':
        std::cout << R"(
          USAGE: ./i18n [-h] [-c] [-j] [-i path] [-o path]
          ----------------------------------------------------------------------------------------------------------
          |  FLAG  |  DESCRIPTION                                               |  ARGUMENT             |  DEFAULT |
          |--------|------------------------------------------------------------|-----------------------|----------|
          |  -h    |  display the help message                                  |  N/A                  |  N/A     |  
          |  -c    |  convert input file to CSV format (in an output file)      |  N/A                  |  N/A     |  
          |  -j    |  convert input file to JSON format (in an output file)     |  N/A                  |  N/A     |  
          |  -i    |  set the absolute or relative path of the input file       |  input file path      |  N/A     |  
          |  -o    |  set the absolute or relative path of the output file      |  output file path     |  N/A     |  
          ----------------------------------------------------------------------------------------------------------
          
          IMPORTANT:
          1. If neither the '-c' or '-j' flag is specified, then the program attempts to determine which conversion 
             you want to perform by inspecting the extension of the filename specified under the '-i' flag. If such 
             determination cannot be made, then the program will display an error message and exit.
          2. The program automatically clears the output file before writing to it. ANY EXISTING DATA IN YOUR OUTPUT
             DATA WILL BE LOST IN THE PROCESS!
        )" << std::endl;
        return 0;
      case '?':
        if (optopt == 'i' || optopt == 'o') {
          // how it took until C++20 to get std::format in the STL beats me...
          std::cerr << "the " << std::to_string(optopt) << " flag requires an explicit argument" << std::endl;
        } else if (std::isprint(optopt)) {
          std::cerr << "unknown flag '" << std::to_string(optopt) << "'" << std::endl;
        } else {
          std::cerr << "unknown flag character '\\x" << std::hex << optopt << "'" << std::endl;
        }
        return 1;
      default:
        abort();
    }
  }

  if (!as_csv && !as_json) {
    as_csv = i_name.find(".csv") != std::string::npos;
    as_json = i_name.find(".json") != std::string::npos;
  }

  if (as_csv && as_json) {
    std::cerr << "flag conflict, cannot convert to csv and json at the same time" << std::endl;
    return 1;
  } else if (as_csv) {
    fakecheck::i18n::message_csv_to_json(i_name, o_name);
  } else if (as_json) {
    fakecheck::i18n::message_json_to_csv(i_name, o_name);
  }

  return 0;
}