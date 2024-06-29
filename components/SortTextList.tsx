import React from "react";

export default function SortTextList({ list }: { list: string }) {
  const sortedList = list
    .split("\n")
    .map((item) => item.replace("- ", ""))
    .filter(Boolean)
    .sort();

  return (
    <ul>
      {sortedList.map((item, index) => {
        const [name, data] = item.split("(");

        return (
          <li key={index}>
            {name}
            <span style={{ opacity: 0.4 }}>
              {" ("}
              {data}{" "}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
