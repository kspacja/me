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
    dateRange: "02.2022 - till now",
  },
  {
    name: "EveryPay SDK",
    technology: "JavaScript, TypeScript",
    dateRange: "01.2020 - 02.2022",
  },
  {
    name: "Express Marketing polls application",
    technology: "JavaScript, TypeScript, React, NestJS (Node.js), PHP",
    dateRange: "10.2020 - 01.2022",
  },
  {
    name: "Notable - schools, courses supporting application",
    technology: "JavaScript, React",
    dateRange: "08.2020 - 10.2020",
  },
  {
    name: "EAI CS/O&O - Automotive website with ML",
    technology: "JavaScript, React",
    dateRange: "01.2020 - 08.2020",
  },
  {
    name: "Femtasy - website with erotic audio stories for woman",
    technology: "JavaScript, React",
    dateRange: "02.2019 - 01.2020",
  },
  {
    name: "Alerabat - content management and website widget",
    technology: "JavaScript, React",
    dateRange: "08.2018 - 02.2019",
  },
  {
    name: "Alephpay - money transaction support application",
    technology: "JavaScript, React",
    dateRange: "06.2018 - 08.2018",
    printBreakPage: true,
  },
  {
    name: "Versa",
    technology: "JavaScript, React, Designing",
    dateRange: "05.2018 - 06.2018",
    printMargin: true,
  },
  {
    name: "Bitbay",
    technology: "JavaScript, React",
    dateRange: "04.2018 - 05.2018",
  },
  {
    name: "Bodychange",
    technology: "JavaScript, React",
    dateRange: "02.2018 - 04.2018",
  },
  {
    name: "Murumusic",
    technology: "JavaScript, React",
    dateRange: "01.2018 - 02.2018",
  },
  {
    name: "My Therapy App",
    technology: "JavaScript, React",
    dateRange: "03.2017 - 01.2018",
  },
  {
    name: "Testaviva - creating and storing legal documents",
    technology: "JavaScript, React",
    dateRange: "02.2017 - 03.2017",
  },
  {
    name: "AmSpace for AmRest",
    technology: "JavaScript, React",
    dateRange: "01.2017 - 03.2017",
  },
  {
    name: "Sonel - manufacturer of measuring instruments",
    technology: "JavaScript, React",
    dateRange: "02.2016 - 12.2016",
  },
  {
    name: "SympatiaPlus - top Polish dating website",
    technology: "JavaScript, React, Python, Django",
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
  { name: "English", level: "Very good" },
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
