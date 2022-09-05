import { useEffect, useRef, useState } from "react";
import { Subtitle, Title, Text, Bar, Container } from "./styles";

export default function ListItem({
  Component = "li",
  title,
  subtitle,
  text,
  level,
  printMargin,
}: {
  Component?: React.ElementType;
  title: string;
  subtitle?: string;
  text?: string;
  level?: number;
  printMargin?: boolean;
}) {
  const [visible, setVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            if (container) {
              observer.unobserve(container);
            }
          }
        });
      },
      { threshold: 1 }
    );

    if (container) {
      setTimeout(() => {
        observer.observe(container);
      }, 200);
    }

    return () => {
      if (container) {
        observer.unobserve(container);
      }
    };
  }, []);

  return (
    <Component>
      {printMargin && <div className="print-page-margin-top" />}
      <Container ref={containerRef}>
        <Title>{title}</Title>
        {subtitle && <Subtitle>{subtitle}</Subtitle>}
        {text && <Text>{text}</Text>}
        {level !== undefined && <Bar visible={visible} level={level} />}
      </Container>
    </Component>
  );
}
