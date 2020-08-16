import React from "react";
import { useIntl } from "react-intl";
import { isMobileOnly } from "react-device-detect";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { Line } from "react-chartjs-2";
import { STANDARD_ORANGE, STANDARD_CYAN, STANDARD_GREEN, STANDARD_PINK } from "../../../styles/colours";
import { findMean } from "../../../utils/number-utils";

interface FactCheckRatingsChartProps {
  ratings: any[];
}

const offset = isMobileOnly ? 2 : 11;

// TODO: move logic to back-end
function breakdownMonthlyAverages(ratings: any[]): number[][] {
  if (!ratings) {
    return [];
  }

  const currentDate = new Date();
  const accuracy: number[][] = [...Array(offset + 1)].map(() => []);
  const expertise: number[][] = [...Array(offset + 1)].map(() => []);
  const strength: number[][] = [...Array(offset + 1)].map(() => []);
  const overall: number[][] = [...Array(offset + 1)].map(() => []);

  for (const { updatedAt, score1, score2, score3 } of ratings) {
    const monthsAgo = Math.abs(currentDate.getMonth() - new Date(updatedAt).getMonth());
    accuracy[offset - monthsAgo].push(score1);
    expertise[offset - monthsAgo].push(score2);
    strength[offset - monthsAgo].push(score3);
    overall[offset - monthsAgo].push((score1 + score2 + score3) / 3);
  }

  const categories = [accuracy, expertise, strength, overall];
  const breakdowns: number[][] = [...Array(4)].map(() => []);
  for (const [index1, category] of categories.entries()) {
    for (const [index2, scores] of category.entries()) {
      breakdowns[index1][index2] = findMean(scores);
    }
  }

  return breakdowns;
}

const FactCheckRatingsChart = ({ ratings }: FactCheckRatingsChartProps) => {
  const theme = useTheme();
  const intl = useIntl();

  const mdUpWidth = useMediaQuery(theme.breakpoints.up("md"));

  const breakdowns = breakdownMonthlyAverages(ratings);
  const colours = Object.freeze([STANDARD_ORANGE, STANDARD_CYAN, STANDARD_GREEN, STANDARD_PINK]);
  const data = {
    labels: Array.from(Array(offset + 1), (_, i) => {
      const date = new Date();
      date.setMonth(date.getMonth() - (offset - i));
      return intl.formatDate(date, { year: "2-digit", month: "short" });
    }),
    datasets: Array.apply(null, Array(4)).map((_, i) => ({
      label: intl.formatMessage({ id: `factCheck.userRatings.criterion${i + 1}.title` }),
      fill: false,
      borderColor: colours[i],
      backgroundColor: colours[i],
      lineTension: 0,
      data: breakdowns[i],
    })),
  };

  return (
    <Line
      data={data}
      options={{
        maintainAspectRatio: !isMobileOnly,
        title: {
          display: true,
          text: intl.formatMessage({ id: "factCheck.trends.rating.title" }),
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
                stepSize: isMobileOnly ? 1 : 0.5,
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
