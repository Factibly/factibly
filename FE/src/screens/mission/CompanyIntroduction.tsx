import React from "react";
import { useIntl } from "react-intl";
import { Link, Typography } from "@material-ui/core";
import BounceDownArrow from "../../common/BounceDownArrow";

const CompanyIntroduction = () => {
  const intl = useIntl();

  return (
    <>
      <Typography gutterBottom variant="h4" component="h2">
        {intl.formatMessage({ id: "app.organization.name" })}
      </Typography>
      <Typography variant="body1" component="div">
        Founded in 2020, Sapphire Labs strives for excellence through innovation. With the current socio-political
        climate around the world, fake news &mdash; that is, unbalanced non-evidence-based news &mdash; has spread like
        a wildlife across the World Wide Web. Many people have been persuaded by these fake news, especially as fake
        news have become increasingly more difficult to discern from real news. Indeed, the United Nations has&nbsp;
        <Link href="https://www.un.org/en/un-coronavirus-communications-team/un-tackling-%E2%80%98infodemic%E2%80%99-misinformation-and-cybercrime-covid-19">
          acknowledged
        </Link>
        &nbsp;an "infodemic" of misinformation. These fake news have widespread implications for us all. They erode the
        public's trust in scientists and political leaders, which has been evident throughout the COVID-19 pandemic.
        They harm the reputation of individuals and businesses alike. They create echo chambers on social media. They
        divide communities and countries, and create an atmosphere of "us vs them". To this end, we created this service
        for
        <ul>
          <li>people who are not sure whether something they've read or heard is factual or fictious </li>
          <li>businesses that want to observe how their reputation may be affected by the presence of fake news</li>
        </ul>
      </Typography>
      <BounceDownArrow />
    </>
  );
};

export default CompanyIntroduction;
