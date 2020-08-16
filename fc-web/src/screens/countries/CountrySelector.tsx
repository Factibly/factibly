import React from "react";
import ReactCountryFlag from "react-country-flag";

const CountrySelector = () => {
  return <ReactCountryFlag countryCode="CA" svg style={{ fontSize: 24 }} aria-label="Canada" />;
};

export default CountrySelector;
