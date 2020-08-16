declare module "react-country-flag" {
  import * as React from "react";
  export interface ReactCountryFlagProps {
    countryCode: string;
    svg: boolean;
    style?: any;
  }
  export default class ReactCountryFlag extends React.Component<ReactCountryFlagProps, any> {}
}
