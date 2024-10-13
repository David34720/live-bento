// ComponentLogoSettings.tsx
import React, { useState, useEffect, FC } from "react";
import { LayoutItem } from "../../../@types";

interface ComponentLogoSettingsProps {
  item: LayoutItem;
  updateItemProps: (updatedItem: LayoutItem) => void;
  setCurrentMenu: (menu: string) => void;
}

const ComponentLogoSettings: FC<ComponentLogoSettingsProps> = ({
  item,
  updateItemProps,
  setCurrentMenu,
}) => {
  const [imgUrl, setImgUrl] = useState<string>(item.componentProps?.imgUrl || "");
  const [altText, setAltText] = useState<string>(item.componentProps?.altText || "");
  const [bgColor, setBgColor] = useState<string>(item.componentProps?.styles?.bgColor || "");
  const [borderColor, setBorderColor] = useState<string>(item.componentProps?.styles?.borderColor || "");
  const [borderSize, setBorderSize] = useState<number>(item.componentProps?.styles?.borderSize || 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mettre à jour les componentProps de l'élément
    const updatedItem: LayoutItem = {
      ...item,
      componentProps: {
        ...item.componentProps,
        imgUrl,
        altText,
        styles: {
          ...item.componentProps?.styles,
          bgColor,
          borderColor,
          borderSize,
        },
      },
    };
    updateItemProps(updatedItem);
    // Retourner au menu précédent
    setCurrentMenu("MenuGlobal");
  };

  return (
    <div className="component-logo-settings">
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label className="label">URL de l'image</label>
          <div className="control">
            <input
              className="input"
              type="text"
              value={imgUrl}
              onChange={(e) => setImgUrl(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Texte alternatif</label>
          <div className="control">
            <input
              className="input"
              type="text"
              value={altText}
              onChange={(e) => setAltText(e.target.value)}
            />
          </div>
        </div>

        <div className="field nav-element">
          <label className="label">Couleur de fond</label>
          <div className="control">
            <input
								type="text"
								value={bgColor}
								onChange={(e) => setBgColor(e.target.value)}
							/>
            <input
              className="input"
              type="color"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
            />
          </div>
        </div>

        <div className="field nav-element">
          <label className="label">Couleur bordure</label>
          <div className="control">
            <input
								type="text"
								value={borderColor}
								onChange={(e) => setBorderColor(e.target.value)}
							/>
            <input
              className="input"
              type="color"
              value={borderColor}
              onChange={(e) => setBorderColor(e.target.value)}
            />
          </div>
        </div>

        <div className="field nav-element">
          <label className="label">Taille bordure</label>
          <div className="control">
            <input
              className="input"
              type="number"
              value={borderSize}
              onChange={(e) => setBorderSize(parseInt(e.target.value))}
              min={0}
            />
          </div>
        </div>

        <div className="buttons">
          <button type="submit" className="button is-primary">
            Enregistrer
          </button>
          <button
            type="button"
            className="button"
            onClick={() => setCurrentMenu("MenuGlobal")}
          >
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
};

export default ComponentLogoSettings;
