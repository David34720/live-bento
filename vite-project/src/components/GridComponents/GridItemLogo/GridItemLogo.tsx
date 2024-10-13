// GridItemLogo.tsx
import React from "react";
import type { LayoutItem } from "../../../@types";
import "./gridItemLogo.scss";

const GridItemLogo = React.memo(
  ({ item }: { item: LayoutItem }) => {
    // Vérifier si l'élément est un logo
    if (item.component !== "logo") {
      return null;
    }

    // Accéder à componentProps directement depuis item
    const { imgUrl, altText, styles } = item.componentProps!;

    return (
      <div
        className="gridItemLogo"
        style={{
          backgroundImage: `url(/img/${imgUrl})`,
          backgroundColor: styles?.bgColor || "transparent",
          borderColor: styles?.borderColor || "black",
          borderWidth: styles?.borderSize
            ? `${styles.borderSize}px`
            : "0px",
          borderStyle: styles?.borderColor ? "solid" : "none",
        }}
        aria-label={altText || "Logo"}
      >
        {/* Optionnel : Ajout d'une balise img pour l'accessibilité */}
        {altText && (
          <img
            src={`/img/${imgUrl}`}
            alt={altText}
            style={{ display: "none" }}
          />
        )}
      </div>
    );
  }
);

export default GridItemLogo;
