import React, { useState } from "react";
import ParagraphedTextContainer from "../../common/ParagraphedTextContainer";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Link,
} from "@material-ui/core";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      "& > fieldset": {
        width: "100%",
        marginTop: theme.spacing(1.5),
        marginBottom: theme.spacing(1.5),
        "& legend": {
          color: theme.palette.text.primary,
        },
      },
    },
    subtext: {
      color: theme.palette.text.secondary,
      padding: theme.spacing(0.5, 0),
    },
  })
);

const destrExplats = Object.freeze([
  "I do not trust your Privacy Policy",
  "I doubt that my data is safely secured",
  "I gave Factibly too much information",
  "I am not 16 years or older",
  "Prefer not to say",
  "Other reason",
]);

const LegalContact = () => {
  const classes = useStyles();

  const [alsoDeleteAccount, setAlsoDeleteAccount] = useState<boolean>(false);
  const handleAlsoDeleteAccountChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setAlsoDeleteAccount((event.target as HTMLInputElement).value === "true");

  const [destrExplat, setDestrExplat] = useState<number>(-1);
  const handleCountryChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setDestrExplat(parseInt((event.target as HTMLInputElement).value));

  return (
    <ParagraphedTextContainer>
      <Typography component="h2" variant="h3">
        Contact Factibly Legal
      </Typography>
      <Card>
        <CardContent>
          <Typography className="primary-text" component="div" variant="body1" paragraph>
            You can contact Factibly's legal team through any of the following means: <br />
            <Typography className="primary-text" component="ul">
              <li>
                EMAIL:{" "}
                <Link color="textPrimary" href="mailto:sapphire.fakecheck@gmail.com">
                  sapphire.fakecheck@gmail.com
                </Link>{" "}
              </li>
            </Typography>
          </Typography>
          <Typography className="primary-text" variant="body1">
            Receipt of correspondence by any of these means is for convenience only and does not waive any objections,
            including the lack of jurisdiction or proper service.
          </Typography>
        </CardContent>
      </Card>
      <section id="account-data-request">
        <Typography component="h3" variant="h5">
          Data Access Request
        </Typography>
        <Typography variant="body1" paragraph>
          If you have a Factibly account, you can download for a copy of all the data associated with your account that
          we currently have stored in our servers ("data access request"). In order to make this request, you must be
          signed in to your Factibly account and must not have made a data access request within the past 72 hours. If
          you have made more than 3 unique data access requests for your account within the past 365 days, we will
          charge you CA$5.00 per request for any subsequent requests.
        </Typography>
        <Button variant="contained" startIcon={<CloudDownloadIcon />} disabled>
          (COMING SOON) Download my account data
        </Button>
      </section>
      <section id="account-destruction-request">
        <Typography component="h3" variant="h5">
          Data Destruction Request
        </Typography>
        <Typography variant="body1" paragraph>
          If you have a Factibly account, you can request that we destroy personal data, including any back-up data, and
          completely anonymize any non-personal data associated with your account from our servers. You can also opt to
          delete the account itself, which would mean that you no longer have a Factibly account and that you are not
          permitted to register a new Factibly account for the next 90 days. In order to make this request, you must be
          signed in to your Factibly account and must not be under any legal investigation for any activity on a
          Factibly service. Your request will be processed in the 5 to 7 days following the time when you made a data
          destruction request. You will also receive a "notification email" within the 72 hours to remind you that your
          data destruction request will be processed soon. You can backtrack on your data destruction request any time
          before the request is processed by replying to the notification email. After your request has been processed,
          you will receive a confirmation email.{" "}
          <strong>
            You should save any data that you might want to keep before you make the request. Once the request has been
            proceesed, your personal data will NO LONGER be recoverable and any anonymized data can no longer be
            associated with your account in any capacity. Factibly is not liable for any data that is lost as a
            consequence of a data destruction request.
          </strong>{" "}
          Please do not directly send us an email for a data destruction request, and use the following form instead.
        </Typography>
        <form className={classes.form} id="legal-context-form" onSubmit={() => {}}>
          <FormControl component="fieldset">
            <FormLabel component="legend" required>
              Do you want us to also delete your Factibly account?
            </FormLabel>
            <Typography className={classes.subtext} variant="body2">
              If you select "yes", you'll no longer be able to sign back in with that account
            </Typography>
            <RadioGroup
              name="alsoDeleteAccount"
              value={alsoDeleteAccount}
              onChange={handleAlsoDeleteAccountChange}
              aria-label="choose whether to also delete your Factibly account"
              aria-required="true"
            >
              <FormControlLabel value={true} control={<Radio size="small" />} label="Yes" />
              <FormControlLabel value={false} control={<Radio size="small" />} label="No" />
            </RadioGroup>
          </FormControl>
          <FormControl component="fieldset">
            <FormLabel component="legend">Why do you want us to destroy your account data?</FormLabel>
            <Typography className={classes.subtext} variant="body2">
              Your response might help us improve our Privacy Policy
            </Typography>
            <RadioGroup
              name="destrExplat"
              value={destrExplat}
              onChange={handleCountryChange}
              aria-label="reason for making a data destruction request"
            >
              {destrExplats.map((v, i) => (
                <FormControlLabel key={`data-destroy-${i}`} value={i} control={<Radio size="small" />} label={v} />
              ))}
            </RadioGroup>
          </FormControl>
          <FormControl component="fieldset">
            <FormLabel component="legend" required>
              What email address should we send notification and confirmation emails to?
            </FormLabel>
            <div className={classes.subtext} />
            <TextField variant="outlined" name="email" autoComplete="email" margin="dense" aria-required="true" />
          </FormControl>
          <Button variant="contained" startIcon={<DeleteForeverIcon />} disabled>
            (COMING SOON) Destroy my account data
          </Button>
        </form>
      </section>
      <section id="copyrighted-material">
        <Typography component="h3" variant="h5">
          Copyrighted Material
        </Typography>
        <Typography variant="body1" paragraph>
          Factibly stores the URL and certain metadata, such as the title and author, of online sources in our
          databases. These sources, including but not limited to news articles, online books and so on, are what get
          fact checked by users who use Factibly services. We do not store the full data of an online source. Factibly
          strives to ensure that each fact check gives sufficient acknowledgement to the origin of their sources by
          displaying the name of the author/publisher in a predominant location and by displaying a button that clearly
          redirects the user to the source. Factibly only commericalizes the fact checks generated on and/or by Factibly
          services, including on factibly.com, and not the sources themselves.
        </Typography>
        <Typography variant="body1" paragraph>
          The usage of third-party sources for Factibly services is protected as a form of fair dealing for the purpose
          of "criticism or review" under section 29.1 of the{" "}
          <cite>
            <Link color="textPrimary" href="https://laws-lois.justice.gc.ca/eng/acts/c-42/FullText.html ">
              Copyright Act (R.S.C., 1985, c. C-42)
            </Link>
          </cite>{" "}
          in Canada, and as a form of fair use for the purposes of "criticism" and "comment" under section 107 of the{" "}
          <cite>
            <Link color="textPrimary" href="https://www.copyright.gov/title17/">
              Copyright Act of 1976 (Pub. L. No. 94-553)
            </Link>
          </cite>{" "}
          in the United States.
        </Typography>
        <Typography variant="body1" paragraph>
          If you are an author or publisher whose work is being used on any Factibly service and believe that such usage
          violates copyright laws in your jurisdiction, please email us with proof of your authorship or publication
          rights to that work, your explanation for how we might be in violation of copyright laws, the URL to the
          specific webpage where your work is referenced and any accompanying material.
        </Typography>
      </section>
    </ParagraphedTextContainer>
  );
};

export default LegalContact;
