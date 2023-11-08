import { Subtitle, Title, Text, Container } from "./styles";

export default function ListItem({
  Component = "li",
  title,
  subtitle,
  text,
  children,
}: {
  Component?: React.ElementType;
  title: string;
  subtitle?: string;
  text?: string;
  children?: React.ReactNode;
}) {
  return (
    <Component>
      <Container>
        <Title>{title}</Title>
        {subtitle && <Subtitle>{subtitle}</Subtitle>}
        {text && <Text>{text}</Text>}
        {children}
      </Container>
    </Component>
  );
}
