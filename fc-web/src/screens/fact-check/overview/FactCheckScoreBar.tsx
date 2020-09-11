import React from "react";
import { useIntl } from "react-intl";
import useTheme from "@material-ui/core/styles/useTheme";
import Typography from "@material-ui/core/Typography";
import Rating from "@material-ui/lab/Rating";

interface FactCheckScoreBarProps {
  ratings?: any[];
  overallScore?: number;
  ratingFontSize?: number;
}

const FactCheckScoreBar = ({ ratings, overallScore, ratingFontSize = 56 }: FactCheckScoreBarProps) => {
  const theme = useTheme();
  const intl = useIntl();

  const formatScore = (value: number) =>
    intl.formatNumber(value, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const scoreText: string = intl.formatMessage(
    { id: "general.info.outOf" },
    {
      actualValue: formatScore(overallScore ?? 0),
      maxValue: formatScore(5.0),
    }
  );

  return (
    <>
      {ratings?.length ? (
        <>
          <div className="grid--first-column-shrink">
            <Typography style={{ fontSize: "xxx-large" }}>{scoreText.substr(0, scoreText.indexOf(" "))}</Typography>
            <div>
              <Typography style={{ position: "relative", top: "20%", lineHeight: "normal" }}>
                {scoreText.substr(scoreText.indexOf(" ") + 1)}
                <br />
                {intl.formatMessage({ id: "factCheck.overview.rating.count" }, { ratingCount: ratings.length })}
              </Typography>
            </div>
          </div>
          <Rating
            key={`fact-check-score-${overallScore}`}
            defaultValue={overallScore ?? 0}
            precision={0.1}
            style={{ fontSize: theme.typography.pxToRem(ratingFontSize) }}
            readOnly
            aria-label={intl.formatMessage({ id: "factCheck.overview.rating.aria" })}
          />
        </>
      ) : (
        <Typography style={{ lineHeight: "normal" }}>
          <span style={{ fontSize: "xx-large" }}>{intl.formatMessage({ id: "factCheck.overview.rating.none" })}</span>
          <br />
          <span style={{ fontSize: "medium" }}>{intl.formatMessage({ id: "factCheck.overview.rating.prompt" })}</span>
        </Typography>
      )}
    </>
  );
};

export default FactCheckScoreBar;
