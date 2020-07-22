import React, { useState } from "react";
import { useIntl } from "react-intl";
import { Helmet } from "react-helmet";
import FactCheckQuiz from "./FactCheckQuiz";

const RealUp = () => {
  const intl = useIntl();
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className="window-container">
      <Helmet>
        <title> {intl.formatMessage({ id: "nav.drawer.realUpCorner.name" })} </title>
      </Helmet>
      <section id="real-up-description">
        <figure style={{ float: "left" }}>
          <img
            src="/images/robot-lizard-jason-news.jpg"
            alt="A fake news article of Jason the Robot Lizard"
            width={250}
            height={300}
            style={{ marginRight: 24 }}
          />
          <figcaption>
            <i> Surely, robot lizards don't exist (yet) </i>
          </figcaption>
        </figure>
        <p>
          The RealUp Corner&trade; is designed to help you become very best <del>Pok&eacute;mon trainer</del>
          &nbsp;"fake news detective" like no one ever was. You can find some useful (and hopefully fun!) resources,
          including infographics and third-party websites, on how to detect fake news and convince your
          tin-foil-hat-wearing neighbour who is watching Alex Jones at 3am every night blabbering on about chemtrails
          that their conspiracy theories are not grounded on complete and credible evidence. Once you think you've got
          what it takes to challenge Kent Paul, the reigning Fact Checking Champion, you should&nbsp;
          <del>have your Mega Lucario spam close combat on his Slaking</del> complete some of the quizzes on the bottom
          of this page (a FakeCheck account is required). You should then share your quiz scores with your friends and
          family (unless your scores are embarrassingly terrible!) and, if you haven't done so already, contribute to
          the community by providing your own rating on this website. As a bonus, if you achieve some excellent scores,
          you will receive <del>a spot in Professor Oak's Hall of Fame</del> an exclusive "Fact Checking Expert"
          certificate from us. And who knows &mdash; perhaps you could upload that certificate onto your LinkedIn
          profile and remove the part where you claim to have "experience" in working with the Python programming
          language when, in fact, you only wrote a Python program that prints "Hello, World!".
        </p>
        <p>If you have any feedback on the RealUp Corner&trade;, please share it on our Support &amp; Feedback page.</p>
      </section>
      <section id="real-up-quizzes" style={{ clear: "both" }}>
        {["", ""].map((quiz, index) => {
          const panelId = `panel${index + 1}`;
          return (
            <FactCheckQuiz
              key={panelId}
              panelId={panelId}
              expanded={expanded}
              handleChange={handleChange}
              title="adskasldfla"
              subtitle="dsklaldklfsda"
              description="adsklkldkads"
            />
          );
        })}
      </section>
    </div>
  );
};

export default RealUp;
