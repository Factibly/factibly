import React from "react";

interface Milestone {
  icon?: React.Component;
  title: string;
  subtitle?: string;
  body: string;
  date: string;
}

const milestones: Milestone[] = [
  {
    title: "Sapphire Labs Launches Website",
    body: "Finally&#8230;",
    date: "???"
  },
  {
    title: "Jason Recovers from Food Poisoning",
    body: "Get back to work, Mr. Antao!",
    date: "June 27, 2020"
  },
  {
    title: "Kent Joins the Team",
    body: `
      Kent Paul has joined Sapphire Labs as the product manager. He simply ${"kent".italics()} resist the
      opportunity (nor can Jadon resist sharing terrible puns).`,
    date: "June 16, 2020"
  },
  {
    title: "The Three Musketeers Establish Sapphire Labs",
    body: "After some lengthy discussions, Sapphire Labs was founded by Jason, Chandler and Jadon.",
    date: "June 9, 2020"
  }
];

export default milestones;
