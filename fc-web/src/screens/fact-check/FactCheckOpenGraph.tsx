import React, { Component } from "react";
import { Helmet } from "react-helmet";
import { injectIntl, WrappedComponentProps } from "react-intl";

interface FactCheckOpenGraphProps extends WrappedComponentProps<"intl"> {
  titlePrefix: string;
  sourceTitle: string;
  description: string;
}

class FactCheckOpenGraph extends Component<FactCheckOpenGraphProps> {
  render() {
    return (
      <Helmet>
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`${this.props.titlePrefix}: ${this.props.sourceTitle}`} />
        <meta property="og:description" content={this.props.description} />
        <meta property="og:locale" content={this.props.intl.locale} />
        <meta property="og:locale:alternate" content={this.props.intl.defaultLocale} />
        <meta property="og:locale:alternate" content="en_US" />
        <meta property="og:site_name" content="FakeCheck" />
      </Helmet>
    );
  }
}

export default injectIntl(FactCheckOpenGraph);
