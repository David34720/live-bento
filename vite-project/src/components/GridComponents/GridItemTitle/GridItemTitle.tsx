import React from "react";
import type { LayoutItem } from "../../../@types";
import type { CSSProperties } from 'react';

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
        fontWeight: styles?.fontWeight || "normal",
        borderColor: styles?.borderColor || "transparent",
        borderWidth: styles?.borderSize,
        justifyContent: styles?.textAlign as CSSProperties['justifyContent'] || "left"
        // Autres styles...
      }}
    >
      {text}
    </h1>
  );
});

export default GridItemTitle;
