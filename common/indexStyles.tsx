import styles from "./indexStyles.module.css";
import { LeftColumn, RightColumn } from "components/Columns";

export function LayoutLeftColumn({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <LeftColumn className={`${styles.layoutLeftColumn}${className ? ` ${className}` : ""}`}>
      {children}
    </LeftColumn>
  );
}

export function LayoutRightColumn({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <RightColumn className={`${styles.layoutRightColumn}${className ? ` ${className}` : ""}`}>
      {children}
    </RightColumn>
  );
}

export function Contact({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <LeftColumn className={`${styles.contact}${className ? ` ${className}` : ""}`}>
      {children}
    </LeftColumn>
  );
}

export function Head({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <RightColumn className={`${styles.head}${className ? ` ${className}` : ""}`}>
      {children}
    </RightColumn>
  );
}

export function ShortInformations({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <LeftColumn className={`${styles.shortInformations}${className ? ` ${className}` : ""}`}>
      {children}
    </LeftColumn>
  );
}

export function LongInformations({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <RightColumn className={`${styles.longInformations}${className ? ` ${className}` : ""}`}>
      {children}
    </RightColumn>
  );
}
