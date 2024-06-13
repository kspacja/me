import { Subtitle, Title, Text, Container } from "./styles";

export default function ListItem({
  Component = "li",
  title,
  subtitle,
  text,
  children,
  className,
}: {
  Component?: React.ElementType;
  title: string;
  subtitle?: string;
  text?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <Component className={className}>
      <Container>
        <Title>{title}</Title>
        {subtitle && <Subtitle>{subtitle}</Subtitle>}
        {text && <Text>{text}</Text>}
        {children}
      </Container>
    </Component>
  );
}
