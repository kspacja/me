enum LEVEL {
  L0,
  L1,
  L2,
  L3,
  L4,
}

export enum CONTACT_TYPE {
  TEL = "tel",
  EMAIL = "mailto",
  LINK = "link",
}

export const PROJECTS = [
  {
    name: "Strivee - gym management system",
    technology: "Typescript, React, Next.js",
    role: "Tech leader of front-end team",
    dateRange: "01.2024 - till now",
  },
  {
    name: "Shipping management system",
    technology: "Typescript, React, Next.js",
    role: "Member of front-end team.",
    dateRange: "05.2023 - 11.2023",
  },
  {
    name: "Zadd 910ths - business data raporting, analysis and visualization for Saudi Arabia",
    technology: "Typescript, React, Google Maps API",
    role: "Member of front-end team with leading responsiblities. Project required to work with Arabic language and right-to-left layout.",
    dateRange: "01.2023 - 04.2023",
  },
  {
    name: "Application for discounts",
    technology: "JavaScript, React, Web-Components, LitElement",
    role: "Member of front-end small team.",
    dateRange: "09.2022 - 12.2022",
  },
  {
    name: "Indigo App - parking application",
    technology: "JavaScript, React, Redux",
    role: "Single member of front-end team, working mostly with legacy code, kanban managed.",
    dateRange: "02.2022 - 06.2022",
  },
  {
    name: "EveryPay SDK",
    technology: "JavaScript, TypeScript",
    role: "One-man self-managed project, that required to maintain multihost development and production enviroments which communicate with each other on a cross-domain basis. Target was to create it as stand-alone library.",
    dateRange: "01.2020 - 02.2022",
  },
  {
    name: "Express Marketing polls application",
    technology: "JavaScript, TypeScript, React, GraphQL, NestJS (Node.js), PHP",
    role: "Scrum managed project with advanced architecture. I was member of front-end team, where I was developing back-end too (in PHP as well). From time to time I took responsiblity of team-leader. On daily basis I was helping juniors with developing.",
    dateRange: "10.2020 - 01.2022",
  },
  {
    name: "Notable - schools, courses supporting application",
    technology: "JavaScript, React",
    role: "Short-term member of front-end team.",
    dateRange: "08.2020 - 10.2020",
  },
  {
    name: "EAI CS/O&O - Automotive website with machine learning",
    technology: "JavaScript, React",
    role: "Single member of front-end team, where I was building video-centered application from scratch. Scrum managed.",
    dateRange: "01.2020 - 08.2020",
    printBreakPage: true,
  },
  {
    name: "Femtasy - website with erotic audio stories for woman",
    technology: "JavaScript, React",
    role: "Member of front-end small team. Project required to work with audio streams.",
    dateRange: "02.2019 - 01.2020",
    printMargin: true,
  },
  {
    name: "Alerabat - content management and website widget",
    technology: "JavaScript, React",
    role: "Single member of front-end team. Application was divided into two parts: widget, which have to work standalone and CMS to manage it.",
    dateRange: "08.2018 - 02.2019",
  },
  {
    name: "Alephpay - money transaction support application",
    technology: "JavaScript, React",
    role: "Short-term member of front-end team.",
    dateRange: "06.2018 - 08.2018",
  },
  {
    name: "Versa",
    technology: "JavaScript, React, Designing",
    role: "Mostly I designed map-drived UI. I helped to start the project for front-end developing.",
    dateRange: "05.2018 - 06.2018",
  },
  {
    name: "Bitbay",
    role: "Short-term member of front-end team.",
    technology: "JavaScript, React",
    dateRange: "04.2018 - 05.2018",
  },
  {
    name: "Bodychange",
    technology: "JavaScript, React",
    role: "Short-term member of front-end team.",
    dateRange: "02.2018 - 04.2018",
  },
  {
    name: "Murumusic",
    technology: "JavaScript, React",
    role: "Short-term member of front-end team. My resposibilty was to sort-up front-end code.",
    dateRange: "01.2018 - 02.2018",
  },
  {
    name: "My Therapy App",
    technology: "JavaScript, React",
    role: "Member of front-end team. Project required high-detailed implementing of designs.",
    dateRange: "03.2017 - 01.2018",
  },
  {
    name: "Testaviva - creating and storing legal documents",
    technology: "JavaScript, React",
    role: "Short-term member of front-end team.",
    dateRange: "02.2017 - 03.2017",
  },
  {
    name: "AmSpace for AmRest",
    technology: "JavaScript, React",
    role: "Short-term member of front-end team. In that time I built well-performed calendar with possibility to set and managed events.",
    dateRange: "01.2017 - 03.2017",
  },
  {
    name: "Sonel - manufacturer of measuring instruments",
    technology: "JavaScript, React",
    role: "Member of front-end team. On daily basis I was helping junior with developing.",
    dateRange: "02.2016 - 12.2016",
  },
  {
    name: "SympatiaPlus - top Polish dating website",
    technology: "JavaScript, React, Python, Django",
    role: "Member of front-end team. Project required developers to also design graphics and UX parts of the application.",
    dateRange: "09.2014 - 01.2016",
  },
];

export const CONTACTS = [
  {
    label: "phone",
    text: "+48 607 217 305",
    type: CONTACT_TYPE.TEL,
  },
  {
    label: "email",
    text: "krzysztof.ciach@gmail.com",
    type: CONTACT_TYPE.EMAIL,
  },
  {
    label: "city",
    text: "Wrocław",
  },
  {
    label: "podcasts",
    url: "https://www.mixcloud.com/krzysztof-ciach",
    text: "mixcloud",
    type: CONTACT_TYPE.LINK,
  },
];

export const FREELANCE = [
  {
    name: "Website for Academic Radio LUZ from Wrocław",
    technology: "JavaScript, Wordpress, PHP",
    dateRange: "09.2018 - 04.2019 and 04.2022 - till now",
  },
  {
    name: "Website for Herosi Fundation - with ecommerce and blog",
    technology: "JavaScript, NextJS, Strapi, MedusaJS",
    dateRange: "06.2023 - 04.2024",
  },
];

export const EDUCATIONS = [
  {
    name: "Computer Science",
    place: "Wrocław University of Technology",
    dateRange: "2008 - 2012",
  },
];

export const SKILLS = [
  {
    name: "JavaScript",
    level: LEVEL.L4,
  },
  {
    name: "React",
    level: LEVEL.L4,
  },
  {
    name: "TypeScript",
    level: LEVEL.L3,
  },
  {
    name: "Next.js",
    level: LEVEL.L3,
  },
  {
    name: "CSS3",
    level: LEVEL.L4,
  },
  {
    name: "CSS-in-JS",
    level: LEVEL.L4,
  },
  {
    name: "PHP",
    level: LEVEL.L1,
  },
  {
    name: "Node.js",
    level: LEVEL.L2,
  },
  {
    name: "HTML5",
    level: LEVEL.L4,
  },
  {
    name: "Webpack",
    level: LEVEL.L3,
  },
  {
    name: "Python",
    level: LEVEL.L0,
  },
  {
    name: "SQL",
    level: LEVEL.L1,
  },
  {
    name: "Web design",
    level: LEVEL.L2,
  },
  {
    name: "Photoshop",
    level: LEVEL.L3,
  },
];

export const LANGS = [
  { name: "Polish", level: "Native" },
  { name: "English", level: "Advanced" },
];

export const INTERESTS = ["Music", "Radio", "Cocktail making", "Pop culture"];

export const JOBS = [
  {
    company: "Boldare",
    role: "Senior front-end developer",
    dateRange: "01.2023 - till now",
  },
  {
    company: "DOOK S.A.",
    role: "Senior front-end developer",
    dateRange: "08.2014 - 12.2023",
  },
  {
    company: "IIZT",
    role: "Front-end developer",
    dateRange: "09.2012 - 08.2014",
  },
];

export const NON_PROGRAMMING_JOBS = [
  {
    company: "Academic Radio LUZ",
    role: "Speaker, member of music and culture department, author of Polonez show",
    dateRange: "10.2015 - till now",
  },
  {
    company: 'Early music festival "Muzyka w Raju"',
    role: "Organization team member",
    dateRange: "editions: 2019, 2021",
  },
];
