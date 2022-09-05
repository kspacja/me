export function SpecialLink({ text, type }: { text: string; type: string }) {
  return <a href={`${type}:${text.replace(" ", "")}`}>{text}</a>;
}
