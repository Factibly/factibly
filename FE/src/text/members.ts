export interface Member {
  name: string;
  role: string;
  website: string;
  linkedin: string;
  github: string;
}

const members: Member[] = [
  {
    name: "Jason Antao",
    role: "Project Manager",
    website: "http://www.jasonantao.com/",
    linkedin: "https://www.linkedin.com/in/antaojason/",
    github: "https://github.com/jasonantao"
  },
  {
    name: "Chandler Lei",
    role: "Lead Back-end Developer",
    website: "https://www.chandlerlei.dev/",
    linkedin: "https://www.linkedin.com/in/qian-chandler-l-486069137/",
    github: "https://github.com/chandlerlei2017"
  },
  {
    name: "Jadon Fan",
    role: "Lead Front-end Developer",
    website: "https://www.jadonfan.com/",
    linkedin: "https://www.linkedin.com/in/jadon-fan-414993141/",
    github: "https://github.com/JadonFan"
  },
  {
    name: "Solomon Kent Paul Joseph",
    role: "Product Manager",
    website: "",
    linkedin: "",
    github: ""
  }
];

export default members;
