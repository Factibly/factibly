import React from "react";
import { useIntl } from "react-intl";
import { useTheme } from "@material-ui/core/styles";
import { Line } from "react-chartjs-2";
import { findMean } from "../../utils/number-utils";

interface RatingsChartProps {
  ratings: any[];
}

function breakdownMonthlyAverages(ratings: any[]): number[][] {
  if (!ratings) {
    return [];
  }

  const offset = 11;
  const currentDate = new Date();
  const accuracy: number[][] = [...Array(12)].map(() => []);
  const expertise: number[][] = [...Array(12)].map(() => []);
  const strength: number[][] = [...Array(12)].map(() => []);
  const overall: number[][] = [...Array(12)].map(() => []);

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

const RatingsChart = ({ ratings }: RatingsChartProps) => {
  const theme = useTheme();
  const intl = useIntl();

  const breakdowns = breakdownMonthlyAverages(ratings);
  const colours = Object.freeze(["#020887", "#04A777", "#F0F600", theme.palette.secondary.main]);
  const data = {
    labels: Array.from(Array(12), (_, i) => {
      const date = new Date();
      date.setMonth(date.getMonth() - (11 - i));
      return intl.formatDate(date, { year: "2-digit", month: "short" });
    }),
    datasets: Array.apply(null, Array(4)).map((_, i) => ({
      label: intl.formatMessage({ id: `factCheck.userRatings.criterion${i + 1}.title.name` }),
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
        title: {
          display: true,
          text: intl.formatMessage({ id: "factCheck.userRatings.ratingTrends.name" }),
          fontSize: 16,
        },
        legend: { display: true, position: "right" },
        scales: {
          xAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: intl.formatMessage({ id: "general.unit.month.name" }),
              },
            },
          ],
          yAxes: [
            {
              display: true,
              ticks: {
                min: 1,
                max: 5,
                callback: (v: number) => intl.formatNumber(v, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
              },
              scaleLabel: {
                display: true,
                labelString: intl.formatMessage({ id: "factCheck.userRatings.averageRating.name" }),
              },
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

export default RatingsChart;
