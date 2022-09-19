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
    name: "Indigo App - parking application",
    technology: "JavaScript, React, Redux",
    role: "Single member of front-end team, most working with legacy code, kanban managed.",
    dateRange: "02.2022 - till now",
  },
  {
    name: "EveryPay SDK",
    technology: "JavaScript, TypeScript",
    role: "Single-men self-managed project with a need to create 3 parts development enviroment to simulate 3-host system, which have to communicate cross-domain. Target was to create it as stand-alone library.",
    dateRange: "01.2020 - 02.2022",
  },
  {
    name: "Express Marketing polls application",
    technology: "JavaScript, TypeScript, React, GraphQL, NestJS (Node.js), PHP",
    role: "Scrum managed project advanced architecture. I was member of front-end team, where I had to develop back-end too (in PHP as well). From time to time I took responsiblity of team-leader. On daily basis I had help junior with developing.",
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
    role: "Single member of front-end team, where I had to build video-centered application from scratch. Scrum managed.",
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
    role: "Single member of front-end team. Application was devided to two parts: widget, which have to work standalone and CMS to manage it.",
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
    role: "Short-term member of front-end team. In that time I build well-performed calendar with possibility to set and managed events.",
    dateRange: "01.2017 - 03.2017",
  },
  {
    name: "Sonel - manufacturer of measuring instruments",
    technology: "JavaScript, React",
    role: "Member of front-end team. On daily basis I had help junior with developing.",
    dateRange: "02.2016 - 12.2016",
  },
  {
    name: "SympatiaPlus - top Polish dating website",
    technology: "JavaScript, React, Python, Django",
    role: "Member of front-end team. Project required a lot of developer-designed part of application.",
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
    text: "krzysztof.ciach@gmail",
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
    name: "WordPress",
    level: LEVEL.L2,
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
    company: "DOOK S.A.",
    role: "Senior front-end developer",
    dateRange: "08.2014 - till now",
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
