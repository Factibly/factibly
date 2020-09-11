import React from "react";
import { useIntl } from "react-intl";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { Line } from "react-chartjs-2";
import { STANDARD_ORANGE, STANDARD_CYAN, STANDARD_GREEN, STANDARD_PINK } from "../../../styles/colours";
import { useCustomQuery } from "../../../hooks/gql";
import { CONTENT_RATING_TEMPORAL_TRENDS_LIST } from "../../../gql/queries";
import {
  ContentRatingTemporalTrendsList,
  ContentRatingTemporalTrendsListVariables,
} from "../../../gql/__generated__/ContentRatingTemporalTrendsList";

interface FactCheckRatingsChartProps {
  contentId: string;
}

const colours = Object.freeze([STANDARD_ORANGE, STANDARD_CYAN, STANDARD_GREEN, STANDARD_PINK]);

const FactCheckRatingsChart = ({ contentId }: FactCheckRatingsChartProps) => {
  const theme = useTheme();
  const intl = useIntl();

  const mdUpWidth = useMediaQuery(theme.breakpoints.up("md"));
  const xsDownWidth = useMediaQuery(theme.breakpoints.down("xs"));

  const { data: trendsData } = useCustomQuery<
    ContentRatingTemporalTrendsList,
    ContentRatingTemporalTrendsListVariables
  >(CONTENT_RATING_TEMPORAL_TRENDS_LIST, {
    variables: { contentId },
  });
  const trends = trendsData?.content?.ratingTemporalTrendsSet;
  let breakdowns: (number | null | undefined)[][] = [...Array(4)];
  if (trends) {
    breakdowns = [
      [...trends.map(v => v?.score1Mean)],
      [...trends.map(v => v?.score2Mean)],
      [...trends.map(v => v?.score3Mean)],
      [...trends.map(v => v?.overallMean)],
    ];
  }

  const offset = xsDownWidth ? 2 : 11;
  const data = {
    labels: Array.from(Array(offset + 1), (_, i) => {
      const date = new Date();
      date.setMonth(date.getMonth() - (offset - i));
      return intl.formatDate(date, { year: "2-digit", month: "short" });
    }),
    datasets: breakdowns.map((v, i) => ({
      label: intl.formatMessage({ id: `factCheck.userRatings.criterion${i + 1}` }),
      fill: false,
      borderColor: colours[i],
      backgroundColor: colours[i],
      lineTension: 0,
      data: offset === 11 ? v : v?.slice(11 - offset),
    })),
  };

  return (
    <Line
      data={data}
      options={{
        title: {
          display: true,
          text: intl.formatMessage({ id: "factCheck.trends.rating" }),
          fontSize: 16,
        },
        legend: { display: true, position: mdUpWidth ? "right" : "bottom" },
        scales: {
          xAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: intl.formatMessage({ id: "general.unit.month" }),
              },
              // gridLines: {
              //   color: theme.palette.text.secondary,
              // },
            },
          ],
          yAxes: [
            {
              display: true,
              ticks: {
                min: 1,
                max: 5,
                stepSize: xsDownWidth ? 3 : 0.5,
                callback: (v: number) => intl.formatNumber(v, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
              },
              scaleLabel: {
                display: true,
                labelString: intl.formatMessage({ id: "factCheck.userRatings.averageRating" }),
              },
              // gridLines: {
              //   color: theme.palette.text.secondary,
              // },
            },
          ],
        },
        tooltips: {
          callbacks: {
            label: (tooltipItem: any, data: any) => {
              var label = data.datasets[tooltipItem.datasetIndex].label || "";
              if (label) {
                label += ": ";
              }
              label += intl.formatNumber(tooltipItem.yLabel, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
              return label;
            },
          },
        },
        // elements: {
        //   point: {
        //     radius: 0,
        //   },
        // },
      }}
    />
  );
};

export default FactCheckRatingsChart;
