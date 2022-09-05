import type { NextPage } from "next";
import ListItem from "components/ListItem";
import NightSwitch from "components/NightSwitch/index";
import InlineListItem from "components/InlineListItem";
import { SpecialLink } from "components/SpecialLink";
import { Canvas, CanvasWrapper } from "components/Canvas";

import {
  FREELANCE,
  PROJECTS,
  SKILLS,
  CONTACTS,
  EDUCATIONS,
  LANGS,
  INTERESTS,
  JOBS,
  NON_PROGRAMMING_JOBS,
} from "common/data";
import { Contact, Head, LongInformations, ShortInformations } from "./_styles";

const Home: NextPage = () => {
  return (
    <CanvasWrapper>
      <NightSwitch />
      <Canvas>
        <Contact>
          <h2 className="only-mobile">Contact</h2>
          <ul>
            {CONTACTS.map(({ label, text, type }) => (
              <InlineListItem key={`${text}-${label}`} label={label}>
                {type ? <SpecialLink type={type} text={text} /> : text}
              </InlineListItem>
            ))}
          </ul>
        </Contact>
        <Head>
          <h1>
            Krzysztof
            <br />
            Ciach
          </h1>
          <h3>Web Developer</h3>
        </Head>
        <div className="clear" />
        <ShortInformations>
          <h2>Education</h2>
          <ul>
            {EDUCATIONS.map(({ name, place, dateRange }) => (
              <ListItem
                key={`${name}-${place}`}
                title={name}
                subtitle={place}
                text={dateRange}
              />
            ))}
          </ul>
          <h2>Languages</h2>
          <ul>
            {LANGS.map(({ name, level }) => (
              <ListItem key={name} title={name} subtitle={level} />
            ))}
          </ul>
          <h2>Skills</h2>
          <ul className="print-page-break">
            {SKILLS.map(({ name, level }) => (
              <ListItem key={name} title={name} level={level} />
            ))}
          </ul>
          <h2 className="print-page-margin-top-small">Interests</h2>
          <ul>
            {INTERESTS.map((name) => (
              <ListItem key={name} title={name} />
            ))}
          </ul>
        </ShortInformations>
        <LongInformations>
          <h2>Experience</h2>
          <h3>Work experience</h3>
          <ul>
            {JOBS.map(({ company, role, dateRange }) => (
              <ListItem
                key={`${company}-${dateRange}`}
                title={company}
                subtitle={role}
                text={dateRange}
              />
            ))}
          </ul>
          <h3>Non-programming work experience</h3>
          <ul>
            {NON_PROGRAMMING_JOBS.map(({ company, role, dateRange }) => (
              <ListItem
                key={`${company}-${dateRange}`}
                title={company}
                subtitle={role}
                text={dateRange}
              />
            ))}
          </ul>
          <h3>Freelance project experience</h3>
          <ul className="print-break">
            {FREELANCE.map(({ name, technology, dateRange }) => (
              <ListItem
                key={dateRange}
                title={name}
                subtitle={technology}
                text={dateRange}
              />
            ))}
          </ul>
          <h3>Project experience</h3>
          <ul>
            {PROJECTS.map(({ name, technology, dateRange, printMargin }) => (
              <ListItem
                key={dateRange}
                title={name}
                subtitle={technology}
                text={dateRange}
                printMargin={printMargin}
              />
            ))}
          </ul>
        </LongInformations>
        <div className="clear" />
      </Canvas>
    </CanvasWrapper>
  );
};

export default Home;
