// GridItemTitle.tsx
import React from "react";
import type { LayoutItem } from "../../../@types";

const GridItemTitle = React.memo(({ item }: { item: LayoutItem }) => {
  if (item.component !== "title") {
    return null;
  }

  const { text, styles } = item.componentProps!;

  return (
    <h1
      style={{
        backgroundColor: styles?.bgColor || "transparent",
        color: styles?.color || "#000",
        fontSize: styles?.fontSize || "16px",
        // Autres styles...
      }}
    >
      {text}
    </h1>
  );
});

export default GridItemTitle;
