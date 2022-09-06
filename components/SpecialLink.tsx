import { CONTACT_TYPE } from "common/data";

export function SpecialLink({
  text,
  type,
  url = text.replace(" ", ""),
}: {
  text: string;
  type: CONTACT_TYPE;
  url?: string;
}) {
  switch (type) {
    case CONTACT_TYPE.EMAIL:
    case CONTACT_TYPE.TEL:
      return <a href={`${type}:${url}`}>{text}</a>;
    case CONTACT_TYPE.LINK:
      return (
        <a target="_blank" rel="noreferrer" href={url}>
          {text}
        </a>
      );
  }
}
