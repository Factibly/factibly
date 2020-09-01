import React from "react";
import ParagraphedTextContainer from "../../../common/ParagraphedTextContainer";
import IconicText from "../../../common/IconicText";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import GavelIcon from "@material-ui/icons/Gavel";
import { LEGAL_COOKIE_POLICY_PATH } from "../../../static/paths";

const PrivacyPolicy = () => {
  return (
    <ParagraphedTextContainer>
      <Typography component="h2" variant="h3" gutterBottom>
        Privacy Policy
      </Typography>
      <Typography className="primary-text" variant="body1" paragraph>
        At Factibly ("We", "Us", "Site", "Website"), accessible from https://www.factibly.com, one of our main
        priorities is the privacy of our visitors ("You", "Your"). This Privacy Policy document contains types of
        information that is collected and recorded by Factibly and how we use it.
      </Typography>
      <Typography className="primary-text" variant="body1" paragraph>
        If you have additional questions or require more information about our Privacy Policy, do not hesitate to
        contact us.
      </Typography>
      <Typography className="primary-text" variant="body1" paragraph>
        This Privacy Policy applies only to our online activities and is valid for visitors to our website with regards
        to the information that they shared and/or collect in Factibly. This policy is not applicable to any information
        collected offline or via channels other than this website.
      </Typography>
      <div>
        <Typography component="h3" variant="h5">
          Consent
        </Typography>
        <Typography variant="body1" paragraph>
          By using our website, you hereby consent to our Privacy Policy and agree to its terms.
        </Typography>
      </div>
      <div>
        <Typography component="h3" variant="h5">
          Information we collect
        </Typography>
        <Typography variant="body1" paragraph>
          The personal information that you are asked to provide, and the reasons why you are asked to provide it, will
          be made clear to you at the point we ask you to provide your personal information.
        </Typography>
        <Typography variant="body1" paragraph>
          If you contact us directly, we may receive additional information about you such as your name, email address,
          phone number, the contents of the message and/or attachments you may send us, and any other information you
          may choose to provide.
        </Typography>
        <Typography variant="body1" paragraph>
          When you register for an Account, we may ask for your contact information, including items such as name,
          country, and email address.
        </Typography>
        <Typography variant="body1" paragraph>
          Your passwords are encrypted in our servers and CANNOT be decrypted by Factibly staff or anyone else.
        </Typography>
      </div>
      <div>
        <Typography component="h3" variant="h5">
          How we use your information
        </Typography>
        <Typography variant="body1" paragraph>
          We use the information we collect in various ways, including to:
        </Typography>
        <Typography component="ul" paragraph>
          <li>Provide, operate, and maintain our webste</li>
          <li>Improve, personalize, and expand our webste</li>
          <li>Understand and analyze how you use our webste</li>
          <li>Develop new products, services, features, and functionality</li>
          <li>
            Communicate with you, either directly or through one of our partners, including for customer service, to
            provide you with updates and other information relating to the webste, and for marketing and promotional
            purposes
          </li>
          <li>Send you emails</li>
          <li>Find and prevent fraud</li>
        </Typography>
        <Typography variant="body1" paragraph>
          We do NOT share or sell your personal information &mdash; including your email address and country &mdash; to
          any third-party services, individuals or organizations. Your personal information is only readable by the
          browser on which you are currently viewing this website, by Factibly services, and by Factibly developers
          within a password-protected and secured database.
        </Typography>
      </div>
      <div>
        <Typography component="h3" variant="h5">
          Log Files
        </Typography>
        <Typography variant="body1" paragraph>
          Factibly follows a standard procedure of using log files. These files log visitors when they visit websites.
          All hosting companies do this and a part of hosting services' analytics. The information collected by log
          files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time
          stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that
          is personally identifiable. The purpose of the information is for analyzing trends, administering the site,
          tracking users' movement on the website, and gathering demographic information. Our Privacy Policy was created
          with the help of the <Link href="https://www.privacypolicygenerator.info">Privacy Policy Generator</Link> and
          the{" "}
          <Link href="https://www.privacypolicyonline.com/privacy-policy-generator/">
            Online Privacy Policy Generator
          </Link>
          .
        </Typography>
      </div>
      <div>
        <Typography component="h3" variant="h5">
          Cookies and Web Beacons
        </Typography>
        <Typography variant="body1" paragraph>
          Like any other website, Factibly uses 'cookies'. These cookies are used to store information including the
          authentication token for a visitors' Factibly account, visitors' preferences, and the pages on the website
          that the visitor accessed or visited. The information is used to optimize the users' experience by customizing
          our web page content based on visitors' browser type and/or other information. You can choose to disable
          cookies for this website via your browser settings, but doing so may limit the features available to you,
          including but not limited to the ability to sign-in to a Factibly account.{" "}
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>
            We do NOT directly store any personal information in cookies. Your email is encrypted <em>within</em> the
            authentication and refresh tokens &mdash; which are used to identify and authenticate your Factibly account
            &mdash; when you sign-in to your Factibly account. Moreover, the cookies associated with your authentication
            and refresh tokens are secured and only readable by Factibly services, and no other service, individual or
            organization, through a network request.
          </strong>
        </Typography>
        <Typography variant="body1" paragraph>
          For more general information on cookies, please read{" "}
          <Link href="https://www.cookieconsent.com/what-are-cookies/">"What Are Cookies"</Link> and our{" "}
          <Link href={LEGAL_COOKIE_POLICY_PATH}>Cookie Policy</Link>.
        </Typography>
      </div>
      <div>
        <Typography component="h3" variant="h5">
          ReCAPTCHA
        </Typography>
        <Typography variant="body1" paragraph>
          This site is protected by reCAPTCHA and the Google{" "}
          <Link href="https://policies.google.com/privacy">Privacy Policy</Link> and{" "}
          <Link href="https://policies.google.com/terms">Terms of Service</Link> apply.
        </Typography>
      </div>
      <div>
        <Typography component="h3" variant="h5">
          Google DoubleClick DART Cookie
        </Typography>
        <Typography variant="body1" paragraph>
          Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads
          to our site visitors based upon their visit to www.website.com and other sites on the internet. However,
          visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy
          Policy at the following URL –{" "}
          <Link href="https://policies.google.com/technologies/ads">https://policies.google.com/technologies/ads</Link>
        </Typography>
      </div>
      <div>
        <Typography component="h3" variant="h5">
          Our Advertising Partners
        </Typography>
        <Typography variant="body1" paragraph>
          Some of advertisers on our site may use cookies and web beacons. Our advertising partners are listed below.
          Each of our advertising partners has their own Privacy Policy for their policies on user data. For easier
          access, we hyperlinked to their Privacy Policies below.
        </Typography>
        <Typography component="ul" paragraph>
          <li>
            Google:{" "}
            <Link href="https://policies.google.com/technologies/ads">
              https://policies.google.com/technologies/ads
            </Link>
          </li>
        </Typography>
      </div>
      <div>
        <Typography component="h3" variant="h5">
          Advertising Partners Privacy Policies
        </Typography>
        <Typography variant="body1" paragraph>
          You may consult this list to find the Privacy Policy for each of the advertising partners of Factibly.
        </Typography>
        <Typography variant="body1" paragraph>
          Third-party ad servers or ad networks uses technologies like cookies, JavaScript, or Web Beacons that are used
          in their respective advertisements and links that appear on Factibly, which are sent directly to users'
          browser. They automatically receive your IP address when this occurs. These technologies are used to measure
          the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on
          websites that you visit.
        </Typography>
        <Typography variant="body1" paragraph>
          Note that Factibly has no access to or control over these cookies that are used by third-party advertisers.
        </Typography>
      </div>
      <div>
        <Typography component="h3" variant="h5">
          Third Party Privacy Policies
        </Typography>
        <Typography variant="body1" paragraph>
          Factibly's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to
          consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may
          include their practices and instructions about how to opt-out of certain options.{" "}
        </Typography>
        <Typography variant="body1" paragraph>
          You can choose to disable cookies through your individual browser options. To know more detailed information
          about cookie management with specific web browsers, it can be found at the browsers' respective websites.
        </Typography>
      </div>
      <div>
        <Typography component="h3" variant="h5">
          CCPA Privacy Rights (Do Not Sell My Personal Information)
        </Typography>
        <Typography variant="body1" paragraph>
          Under the CCPA, among other rights, California consumers have the right to:
        </Typography>
        <Typography variant="body1" paragraph>
          Request that a business that collects a consumer's personal data disclose the categories and specific pieces
          of personal data that a business has collected about consumers.
        </Typography>
        <Typography variant="body1" paragraph>
          Request that a business delete any personal data about the consumer that a business has collected.
        </Typography>
        <Typography variant="body1" paragraph>
          Request that a business that sells a consumer's personal data, not sell the consumer's personal data.
        </Typography>
        <Typography variant="body1" paragraph>
          If you make a request, we have one month to respond to you. If you would like to exercise any of these rights,
          please contact us.
        </Typography>
      </div>
      <div>
        <Typography component="h3" variant="h5">
          GDPR Data Protection Rights
        </Typography>
        <Typography variant="body1" paragraph>
          We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled
          to the following:
        </Typography>
        <Typography variant="body1" paragraph>
          The right to access – You have the right to request copies of your personal data. We may charge you a small
          fee for this service.
        </Typography>
        <Typography variant="body1" paragraph>
          The right to rectification – You have the right to request that we correct any information you believe is
          inaccurate. You also have the right to request that we complete the information you believe is incomplete.
        </Typography>
        <Typography variant="body1" paragraph>
          The right to erasure – You have the right to request that we erase your personal data, under certain
          conditions.
        </Typography>
        <Typography variant="body1" paragraph>
          The right to restrict processing – You have the right to request that we restrict the processing of your
          personal data, under certain conditions.
        </Typography>
        <Typography variant="body1" paragraph>
          The right to object to processing – You have the right to object to our processing of your personal data,
          under certain conditions.
        </Typography>
        <Typography variant="body1" paragraph>
          The right to data portability – You have the right to request that we transfer the data that we have collected
          to another organization, or directly to you, under certain conditions.
        </Typography>
        <Typography variant="body1" paragraph>
          If you make a request, we have one month to respond to you. If you would like to exercise any of these rights,
          please contact us.
        </Typography>
      </div>
      <div>
        <Typography component="h3" variant="h5">
          Children's Information
        </Typography>
        <Typography variant="body1" paragraph>
          Another part of our priority is adding protection for children while using the internet. We encourage parents
          and guardians to observe, participate in, and/or monitor and guide their online activity.
        </Typography>
        <Typography variant="body1" paragraph>
          Factibly does not knowingly collect any Personal Identifiable Information from children under the age of 13.
          If you think that your child provided this kind of information on our website, we strongly encourage you to
          contact us immediately and we will do our best efforts to promptly remove such information from our records.
        </Typography>
      </div>
      <IconicText text="Privacy Policy (effective from August 23, 2020)" icon={<GavelIcon />} />
    </ParagraphedTextContainer>
  );
};

export default React.memo(PrivacyPolicy);
