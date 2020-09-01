export interface Member {
  name: string;
  img: string;
  roleId: string;
  bio: string;
  website?: string;
  linkedin?: string;
  github?: string;
  instagram?: string;
}

const members: Member[] = [
  {
    name: "Jason Antao",
    img: "jason-antao.jpg",
    roleId: "mission.team.role.projectManager",
    bio: `
      A hard-working and creative innovator, he never settles for mediocracy in design and principle -
      observing the wrath of fake news and misinformation as a global challenge and one of the world's
      greatest technology-based hurdles. His studies as a Computer Engineering student at the University
      of Waterloo along with his work experience has inspired him to apply his talents in meaningful ways
      that enable individuals and businesses (aka: talented groups of people) to live their best lives no
      matter where they come from. As the founder and director of the talented team at Factibly, he is
      humbled and honoured to innovate, build, and guide the platform's vision.`,
    website: "http://www.jasonantao.com/",
    linkedin: "https://www.linkedin.com/in/antaojason/",
    github: "https://github.com/jasonantao",
  },
  {
    name: "Jadon Fan",
    img: "jadon-fan.jpg",
    roleId: "mission.team.role.leadFeDev",
    bio: `
      A determined and attentive engineer, he is always exploring new challenges and putting his critical thinking
      skills to the test. With the knowledge and skills that he has accumulated over his years of studies as a
      Computer Engineering student and 16+ months of co-op experience, he carries a huge arsenal of problem-solving
      tools. The next challenge on his list is, of course, fighting the ongoing infodemic. As the lead front-end developer
      at Factibly, he strives to build intuitive user interfaces and meaningful user experiences with minimal technical
      debt, and is always looking forward to getting his hands dirty with some amazing technologies.`,
    website: "https://www.jadonfan.com/",
    linkedin: "https://www.linkedin.com/in/jadon-fan-414993141/",
    github: "https://github.com/JadonFan",
  },
  {
    name: "Chandler Lei",
    img: "chandler-lei.jpg",
    roleId: "mission.team.role.leadBeDev",
    bio: `
      A compassionate engineer with a sharp mind, he gives his all in academics, career, and relationships.
      Being a seasoned startup veteran from numerous previous internships, he is cool under pressure and brings
      a breadth of skills ranging from design to development to deployment. He wears a lot of different hats and
      loves applying himself to causes that can drive societal impact in the world. As the lead back-end developer
      at Factibly, he is constantly considering the tradeoffs of different architectural design choices and pumping
      out features that are functional, performant, and scalable.`,
    website: "https://www.chandlerlei.dev/",
    linkedin: "https://www.linkedin.com/in/qian-chandler-l-486069137/",
    github: "https://github.com/chandlerlei2017",
  },
  {
    name: "Solomon Kent Paul Joseph",
    img: "solomon-kent.jpg",
    roleId: "mission.team.role.productManager",
    bio: `
      A chemical engineering student and a visual artist, his goal is to use his creativity
      and technical skills to bring about a positive change in the world. Some of Kent's
      accomplishments include his art installations in Toronto City Hall and Nuit Blanche to
      bring awareness about environmental issues and developing and implementing a tracking system
      to reduce waste as an intern at McCormick Canada. As the Product Manager of the Factibly team,
      he is continuously working to improve and add features that will enable this platform to achieve
      its mission, to offer better user experience and extend its reach.`,
    linkedin: "https://www.linkedin.com/in/kent-paul",
    github: "https://github.com/thekentpaul",
    instagram: "https://www.instagram.com/thekentpaul/",
  },
];

export default members;
