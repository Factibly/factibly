interface Application {
  marketingName: string;
  internalName: string;
  description?: string;
  points?: string[];
  techStack: string[];
  imgs?: string[];
  productionUrl?: string;
  sourceCodeUrl: string;
  wireframesUrl?: string;
}

const apps: Application[] = [
  {
    marketingName: "Factibly.com",
    internalName: "fc-web",
    description: `
      As our primary application with all the complete major features, factibly.com is the place to be for your
      fact checking needs.`,
    points: [
      "Optimized for both mobile and desktop",
      "Follows Google's material design",
      "Offers l10n support for 5 different locales",
      "Compliant with WCAG 2.1 (on light mode)",
      "Sanitizes potentially dangerous HTML",
      "Holds a valid SSL certification",
      "Hosted on Netlify",
      "Pre-rendered by prerender.io",
    ],
    techStack: ["TypeScript", "React", "Redux", "Apollo", "Material-UI", "React Router", "Format.JS", "Jest", "Enzyme"],
    productionUrl: "https://www.factibly.com",
    sourceCodeUrl: "https://github.com/Sapphire-Labs/factibly/tree/master/fc-web",
    wireframesUrl:
      "https://www.figma.com/file/5yWNhxAPTHPdrHd0U5X2QE/FakeCheck-High-Fidelity-Wireframes-v1?node-id=0%3A1",
  },
  {
    marketingName: "Factibly APIs and Services",
    internalName: "fc-api",
    description: `
      This app serves as the back-end -- which includes GraphQL mutations and queries, Graphene object types,
      and Django models -- for our client-facing apps.`,
    points: [
      "Uses PostgreSQL for its databases",
      "Protected against XSS and CSRF attacks",
      "Protected against spam through reCAPTCHA validations",
      "Relies on secure HTTP-only cookie-based authentication",
      "Hosted on Heroku",
    ],
    techStack: ["Python", "Django", "Graphene", "Relay", "PostgreSQL", "Boto3"],
    sourceCodeUrl: "https://github.com/Sapphire-Labs/factibly/tree/master/fc-api",
  },
  {
    marketingName: "Factibly Monday",
    internalName: "fc-monday",
    description: `
      This app compiles the fact checks for all the sources whose URLs are referenced in a Monday.com board. It is
      useful to anyone who uses Monday.com to plan, layout or schedule their research projects -- be it for work
      or academic purposes -- where credible sources and objective facts are especially important.`,
    points: [
      "Installable via the Monday.com marketplace",
      "Utilizes the Monday.com SDK",
      "Optimized for Monday.com use cases",
      "Provides quick access to factibly.com",
    ],
    techStack: ["JavaScript", "React", "Apollo", "Material-UI", "Monday SDK"],
    productionUrl:
      "https://auth.monday.com/oauth2/authorize?client_id=531eed8d176c2b24bfe94a21f9213f15&response_type=install",
    sourceCodeUrl: "https://github.com/Sapphire-Labs/factibly/tree/master/fc-monday",
  },
  {
    marketingName: "Factibly Internal Tools",
    internalName: "fc-internal",
    description: `
      This app consists of an arsenal of internal tools designed to aid the development and testing processes
      of other Factibly apps.`,
    points: ["Developed with modern C++", "Organized by namespaces"],
    techStack: ["C++", "Bash"],
    sourceCodeUrl: "https://github.com/Sapphire-Labs/factibly/tree/master/fc-internal",
  },
];

export default apps;
