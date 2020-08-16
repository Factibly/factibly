export interface Member {
  name: string;
  role: string;
  website: string;
  linkedin: string;
  github: string;
  instagram: string;
}

const members: Member[] = [
  {
    name: "Jason Antao",
    role: "mission.team.role.projectManager",
    website: "http://www.jasonantao.com/",
    linkedin: "https://www.linkedin.com/in/antaojason/",
    github: "https://github.com/jasonantao",
    instagram: "",
  },
  {
    name: "Chandler Lei",
    role: "mission.team.role.leadBeDev",
    website: "https://www.chandlerlei.dev/",
    linkedin: "https://www.linkedin.com/in/qian-chandler-l-486069137/",
    github: "https://github.com/chandlerlei2017",
    instagram: "",
  },
  {
    name: "Jadon Fan",
    role: "mission.team.role.leadFeDev",
    website: "https://www.jadonfan.com/",
    linkedin: "https://www.linkedin.com/in/jadon-fan-414993141/",
    github: "https://github.com/JadonFan",
    instagram: "",
  },
  {
    name: "Solomon Kent Paul Joseph",
    role: "mission.team.role.productManager",
    website: "",
    linkedin: "https://www.linkedin.com/in/kent-paul",
    github: "",
    instagram: "https://www.instagram.com/thekentpaul/",
  },
];

export default members;
