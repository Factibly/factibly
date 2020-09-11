import React, { PureComponent } from "react";
import { Link as RouterLink } from "react-router-dom";
import { injectIntl, WrappedComponentProps } from "react-intl";
import { Helmet } from "react-helmet";
import ParagraphedTextContainer from "../../../common/ParagraphedTextContainer";
import IconicText from "../../../common/IconicText";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import AccessibilityNewIcon from "@material-ui/icons/AccessibilityNew";
import { SUPPORT_PATH } from "../../../static/paths";

class AccessibilityStatement extends PureComponent<WrappedComponentProps<"intl">> {
  render() {
    return (
      <ParagraphedTextContainer>
        <Helmet>
          <title>{this.props.intl.formatMessage({ id: "legal.accessibility" })} - Factibly</title>
        </Helmet>
        <Typography component="h2" variant="h3" gutterBottom>
          Accessibility
        </Typography>
        <figure>
          <a href="https://www.w3.org/WAI/WCAG2AA-Conformance" title="Explanation of WCAG 2 Level AA conformance">
            <img
              height="32"
              width="88"
              src="https://www.w3.org/WAI/WCAG21/wcag2.1AA-v"
              alt="Level AA conformance, W3C WAI Web Content Accessibility Guidelines 2.1"
            />
          </a>
          <figcaption>
            This WCAG 2.1 AA conformance claim is applicable to all webpages on factibly.com, but excluding any of its
            subdomains, unless stated otherwise
          </figcaption>
        </figure>
        <Typography className="primary-text" variant="body1" paragraph>
          Factibly is committed to providing accessible services to all users. To this end, we strive to be compliant
          with the <abbr title="Web Content Accessibility Guidelines">WCAG</abbr> 2.1 AA standards. This page describes
          just some of the ways that make our website more accessible. Please feel free to submit a ticket on our{" "}
          <Link component={RouterLink} to={SUPPORT_PATH}>
            Support and Feedback
          </Link>{" "}
          page if you have any feedback or concerns.
        </Typography>
        <section id="glossary">
          <Typography component="h3" variant="h5">
            Glossary
          </Typography>
          <Typography variant="body1" paragraph>
            The words, acronyms and initialisms listed below shall take on the following meanings when referenced on
            this webpage.
          </Typography>
          <Typography component="dl">
            <dt id="dfn--aria">
              <dfn>
                <abbr title="Accessible Rich Internet Applications">ARIA</abbr>
              </dfn>
            </dt>
            <dd aria-labelledby="dfn--aria">
              The suite of accessibility standards for websites under the Web Accessibility Initiative (WAI) of the
              World Wide Web Consortium (W3C)
            </dd>
            <dt id="dfn--ascii">
              <dfn>
                <abbr title="American Standard Code for Information Interchange">ASCII</abbr>
              </dfn>
            </dt>
            <dd aria-labelledby="dfn--ascii">
              The 8-bit character encoding standard that includes the English alphanumeric characters and some special
              characters
            </dd>
            <dt id="dfn--css">
              <dfn>
                <abbr title="Cascading Style Sheet">CSS</abbr>
              </dfn>
            </dt>
            <dd aria-labelledby="dfn--css">
              The styling language that defines the visual styling of factibly.com when rendered inside a browser
            </dd>
            <dt id="dfn--factibly">
              <dfn>Factibly</dfn>
            </dt>
            <dd aria-labelledby="dfn--factibly">
              The company Factibly, as the developer of factibly.com and other Factibly services and tools, and its team
              members
            </dd>
            <dt id="dfn--factibly.com">
              <dfn>factibly.com</dfn>
            </dt>
            <dd aria-labelledby="dfn--factibly.com">
              The website and its webpages with the base <abbr title="Uniform Resource Locator">URL</abbr> of
              www.factibly.com including any subdomains; that is, the website that you are currently on
            </dd>
            <dt id="dfn--gif">
              <dfn>
                <abbr title="Graphics Interchange Format">GIF</abbr>
              </dfn>
            </dt>
            <dd aria-labelledby="dfn--gif">
              The common image format with the filename extension of ".gif" and internet media type of "image/gif"
            </dd>
            <dt id="dfn--html">
              <dfn>
                <abbr title="Hypertext Markup Language">HTML</abbr>
              </dfn>
            </dt>
            <dd aria-labelledby="dfn--html">
              The markup language that defines the structure of factibly.com when rendered inside a browser
            </dd>
          </Typography>
        </section>
        <section id="animations">
          <Typography component="h3" variant="h5">
            Animations and Transitions
          </Typography>
          <Typography variant="body1" paragraph>
            factibly.com automatically disables all transitions and animations for a particular user whenever that user
            enables "reduce motion" in their operating system settings. Internally, factibly.com uses the
            "prefers-reduce-motion" <abbr title="Cascading Style Sheet">CSS</abbr> media query to detect this setting.
          </Typography>
          <Typography variant="body1" paragraph>
            factibly.com also avoids the use of <abbr title="Graphics Interchange Format">GIFs</abbr> where possible and
            instead shows any animated clips as embedded YouTube videos with autoplay disabled. In the event that
            factibly.com uses a <abbr title="Graphics Interchange Format">GIF</abbr>, it is only triggered upon a cursor
            hover and is completely disabled whenever the "reduce motion" setting is enabled.
          </Typography>
        </section>
        <section id="landmarks">
          <Typography component="h3" variant="h5">
            Landmarks and Roles
          </Typography>
          <Typography variant="body1" paragraph>
            factibly.com injects <abbr title="Hypertext Markup Language">HTML</abbr> landmark elements and applies{" "}
            <abbr title="Accessible Rich Internet Applications">ARIA</abbr> roles to{" "}
            <abbr title="Hypertext Markup Language">HTML</abbr> elements where relevant. This way, your screen reader
            can better identify the purpose and significance of each part of a webpage, the location of headers and
            website navigation items, the essentiality of particular pieces of text, and so on. The Material-UI library
            &mdash; which factibly.com uses as the basis for its user interface &mdash; also automatically applies{" "}
            <abbr title="Accessible Rich Internet Applications">ARIA</abbr> roles to its components.
          </Typography>
        </section>
        <section id="labels">
          <Typography component="h3" variant="h5">
            Labels, Tooltips and Captions
          </Typography>
          <Typography variant="body1" paragraph>
            factibly.com assigns <abbr title="Accessible Rich Internet Applications">ARIA</abbr> labels to{" "}
            <abbr title="Hypertext Markup Language">HTML</abbr> elements where relevant. These labels only use{" "}
            <abbr title="American Standard Code for Information Interchange">ASCII</abbr> characters and avoids any
            special characters that may be too difficult for some screen readers to interpret.
          </Typography>
          <Typography variant="body1" paragraph>
            Wherever there is an ambigious icon without any corresponding text beside it, factibly.com also shows a
            context-specific textual tooltip to indicate the meaning of that icon. For example, rather than say "go to
            webpage", the tooltip would instead say "go to the fact check" since "webpage" is too generic of a word.
          </Typography>
          <Typography variant="body1" paragraph>
            For each audio and video file on factibly.com, a corresponding textual caption or summary can be downloaded
            as a .txt file. The download button can be found in the vincity of where the file is shown on the webpage.
          </Typography>
        </section>
        <section id="responsive-font">
          <Typography component="h3" variant="h5">
            Responsive Font Sizes
          </Typography>
          <Typography variant="body1" paragraph>
            factibly.com meaures the font sizes in units of <code>rem</code> so that the texts proportionally scale with
            whatever the user has set as their default font size in their browser or operating system settings.
            Regardless of what font size an user uses (up to 200% of the 'normal' font size), factibly.com will continue
            to look beautiful and be fully functional.
          </Typography>
        </section>
        <IconicText
          id="accessibility--stamp"
          text="Accessibility Statement (effective from August 27, 2020)"
          icon={<AccessibilityNewIcon />}
        />
      </ParagraphedTextContainer>
    );
  }
}

export default injectIntl(AccessibilityStatement);
