import React, { Component } from "react";
import { injectIntl, WrappedComponentProps } from "react-intl";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import "../styles/universal.css";

interface FooterProps extends WrappedComponentProps<"intl"> {
  onLangChange: any;
}

class Footer extends Component<FooterProps> {
  render() {
    return (
      <footer>
        <div style={{ display: "inline-block", textAlign: "end" }}>
          <FormControl variant="filled">
            <InputLabel id="lang-select-label"> {this.props.intl.formatMessage({ id: "language" })} </InputLabel>
            <Select
              native
              disableUnderline
              labelId="lang-select-label"
              value={localStorage.getItem("site-lang") ?? "en"}
              onChange={event => this.props.onLangChange(event.target.value)}
            >
              <option value="en"> {this.props.intl.formatMessage({ id: "english" })} </option>
              <option value="zh-Hans"> {this.props.intl.formatMessage({ id: "chineseSimp" })} </option>
              <option value="zh-Hant"> {this.props.intl.formatMessage({ id: "chineseTrad" })} </option>
            </Select>
          </FormControl>
        </div>
        <div style={{ display: "inline-block", textAlign: "center" }}>
          &copy; 2020 Sapphire Labs. All rights reserved.
        </div>
      </footer>
    );
  }
}

export default injectIntl(Footer);
