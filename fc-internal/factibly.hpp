#ifndef FACTIBLY_H_
#define FACTIBLY_H_

#include <getopt.h>

#include <fstream>
#include <iomanip>
#include <iostream>
#include <string>
// #include <sstream>
#include <map>  // use over std::unordered_map to maintain consistent CSV structure
#include <unordered_set>
#include <vector>

namespace factibly {
/* constexpr */ inline const std::string get_friendly_cpp_standard() {  // C++20 and its constexpr on std::string...
  std::string cpp_standard = "";

  if (__cplusplus == 202002L)
    cpp_standard = "C++20";
  else if (__cplusplus == 201703L)
    cpp_standard = "C++17";
  else if (__cplusplus == 201402L)
    cpp_standard = "C++14";
  else if (__cplusplus == 201103L)
    cpp_standard = "C++11";
  else if (__cplusplus == 199711L)
    cpp_standard = "C++98";
  else
    cpp_standard = "pre-standard C++";

  return cpp_standard;
}

namespace i18n {
using fc_locale_name = std::string;
using fc_message_id = std::string;
using fc_message_text = std::string;
using fc_locale_name_set = std::unordered_set<fc_locale_name>;
using fc_locale_map = std::map<fc_locale_name, fc_message_text>;
using fc_message_map = std::map<fc_message_id, fc_locale_map>;

extern const std::string program_help_text;

void messages_csv_to_json(std::string, std::string);
void messages_json_to_csv(std::string, std::string);
const bool inspect_locale_messages(fc_message_map, fc_locale_name_set);
}  // namespace i18n
}  // namespace factibly

#endif
