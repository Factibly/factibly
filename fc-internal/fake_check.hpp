#ifndef FAKE_CHECK_HPP
#define FAKE_CHECK_HPP

#include <string>
#include <map> // use over std::unordered_map to maintain consistent CSV structure

namespace fakecheck {
  std::string getFriendlyCppStandard() {
    std::string cppStandard;

    if (__cplusplus == 201703L) cppStandard = "C++17";
    else if (__cplusplus == 201402L) cppStandard = "C++14";
    else if (__cplusplus == 201103L) cppStandard = "C++11";
    else if (__cplusplus == 199711L) cppStandard = "C++98";
    else cppStandard = "pre-standard C++"; 

    return cppStandard;
  }

  namespace i18n {
    using locale = std::string;
    using message_id = std::string;
    using message_text = std::string;
    using locale_map = std::map<locale, message_text>;
    using message_map = std::map<message_id, locale_map>;

    void message_csv_to_json(std::string, std::string);
    void message_json_to_csv(std::string, std::string);
  }
}

#endif