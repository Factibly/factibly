import React, { Component } from "react";
import { connect } from "react-redux";
import { RootState } from "../store/rootReducer";
import { injectIntl, WrappedComponentProps } from "react-intl";
import Box from "@material-ui/core/Box";
import { NAVIGATION_BLACK } from "../styles/colours";

interface FooterProps extends WrappedComponentProps<"intl"> {
  locale: string;
}

class Footer extends Component<FooterProps> {
  render() {
    return (
      <Box component="footer" className="simple-text" bgcolor={NAVIGATION_BLACK} color="primary.contrastText">
        {/* <div style={{ textAlign: "end" }}>
        </div> */}
        <div style={{ textAlign: "center" }}>
          <small
            dangerouslySetInnerHTML={{
              __html: this.props.intl.formatMessage(
                {
                  id: "app.recaptcha.branding",
                },
                {
                  pp: `
                    <a href="https://policies.google.com/privacy?hl=${
                      this.props.intl.locale
                    }">${this.props.intl.formatMessage({ id: "app.recaptcha.pp.name" })}</a>`,
                  tos: `
                    <a href="https://policies.google.com/terms?hl=${
                      this.props.locale
                    }">${this.props.intl.formatMessage({ id: "app.recaptcha.tos.name" })}</a>`,
                }
              ),
            }}
          />
          <br />
          <br />
          &copy; 2020 Sapphire Labs. All rights reserved.
        </div>
      </Box>
    );
  }
}

const mapStateToProps = (state: RootState) => ({ locale: state.settingsReducer.locale });

export default connect(mapStateToProps)(injectIntl(Footer));
