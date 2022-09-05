import { Label } from "./styles";

export default function InlineListItem({
  Component = "li",
  label,
  children,
}: {
  Component?: React.ElementType;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Component>
      <Label>{label}:</Label> {children}
    </Component>
  );
}
