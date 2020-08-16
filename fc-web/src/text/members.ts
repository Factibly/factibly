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
    role: "mission.team.role.projectManager.name",
    website: "http://www.jasonantao.com/",
    linkedin: "https://www.linkedin.com/in/antaojason/",
    github: "https://github.com/jasonantao",
  },
  {
    name: "Chandler Lei",
    role: "mission.team.role.leadBeDev.name",
    website: "https://www.chandlerlei.dev/",
    linkedin: "https://www.linkedin.com/in/qian-chandler-l-486069137/",
    github: "https://github.com/chandlerlei2017",
  },
  {
    name: "Jadon Fan",
    role: "mission.team.role.leadFeDev.name",
    website: "https://www.jadonfan.com/",
    linkedin: "https://www.linkedin.com/in/jadon-fan-414993141/",
    github: "https://github.com/JadonFan",
  },
  {
    name: "Solomon Kent Paul Joseph",
    role: "mission.team.role.productManager.name",
    website: "",
    linkedin: "",
    github: "",
  },
];

export default members;
