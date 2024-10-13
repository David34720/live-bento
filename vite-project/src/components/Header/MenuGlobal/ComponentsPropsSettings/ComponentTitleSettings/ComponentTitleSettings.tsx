// ComponentTitleSettings.tsx
import React, { useState, FC } from "react";
import { Breakpoints, LayoutItem } from '../../../../../@types/index';

import ResponsiveViewComponent from "../../../../GridComponents/ResponsiveViewComponent/ResponsiveViewComponent";

type TitleLayoutItem = Extract<LayoutItem, { component: "title" }>;

interface ComponentTitleSettingsProps {
  item: TitleLayoutItem;
  updateItemProps: (updatedItem: LayoutItem) => void;
  setCurrentMenu: (menu: string) => void;
  breakpoints: Breakpoints;
}

const ComponentTitleSettings: FC<ComponentTitleSettingsProps> = ({
  item,
  updateItemProps,
  setCurrentMenu,
  breakpoints,
}) => {
  const [text, setText] = useState<string>(item.componentProps?.text || "");
  const [fontSize, setFontSize] = useState<string>(
    item.componentProps?.styles?.fontSize || "16px"
  );
  const [fontWeight, setFontWeight] = useState<string>(
    item.componentProps?.styles?.fontWeight || "normal"
  )
  const [color, setColor] = useState<string>(
    item.componentProps?.styles?.color || "#000000"
  );
  const [bgColor, setBgColor] = useState<string>(
    item.componentProps?.styles?.bgColor || "transparent"
  )
  const [borderColor, setBorderColor] = useState<string>(
    item.componentProps?.styles?.borderColor || "transparent"
  )
  const [borderSize, setBorderSize] = useState<number>(
    item.componentProps?.styles?.borderSize || 0
  )
  const [textAlign, setTextAlign] = useState<string>(
    item.componentProps?.styles?.textAlign || "left"
  )
  const [itemHiddenBreakpoints, setItemHiddenBreakpoints] = useState<string[]>(item.hidden || []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedItem: TitleLayoutItem = {
      ...item,

      hidden: itemHiddenBreakpoints,
      componentProps: {
        ...item.componentProps,
        text,
        styles: {
          ...item.componentProps?.styles,
          fontSize,
          fontWeight,
          color,
          bgColor,
          borderColor,
          borderSize,
          textAlign,
        },
      },
    };
    updateItemProps(updatedItem);
    setCurrentMenu("MenuGlobal");
  };

  return (
    <div className="component-title-settings">
       <span className="subtitle">Configuration de "Logo"</span>
      <hr className="dropdown-divider" />
      <ResponsiveViewComponent
        breakpoints={breakpoints}
        setItemHiddenBreakpoints={setItemHiddenBreakpoints}
        itemHiddenBreakpoints={itemHiddenBreakpoints}
      /> 
      <hr className="dropdown-divider" />
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label className="label">Texte du titre</label>
          <div className="control">
            <input
              className="input"
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Taille texte</label>
          <div className="control">
            <input
              className="input"
              type="text"
              value={fontSize}
              onChange={(e) => setFontSize(e.target.value)}
            />
          </div>
        </div>

        <div className="nav-element">
							<label>Epaisseur texte : </label>
							<div className="select">
								<select
									value={fontWeight}
									onChange={(e) => setFontWeight(e.target.value)}
								>
									<option value="normal">normal</option>
									<option value="bold">gras</option>
									<option value="bolder">très gras</option>
									<option value="lighter">léger</option>
									<option value="100">100</option>
									<option value="200">200</option>
									<option value="300">300</option>
									<option value="400">400</option>
									<option value="500">500</option>
									<option value="600">600</option>
									<option value="700">700</option>
									<option value="800">800</option>
									<option value="900">900</option>
								</select>
							</div>
						</div>

        <div className="field nav-element">
          <label className="label">Couleur texte</label>
          <div className="control">
            <input
								type="text"
								value={color}
								onChange={(e) => setColor(e.target.value)}
							/>
							<input
								type="color"
								value={color}
								onChange={(e) => setColor(e.target.value)}
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
            />
          </div>
        </div>

        <div className="field nav-element">
          <label className="label">Alignement texte</label>
          <div className="control">
            <div className="select">
              <select
                value={textAlign}
                onChange={(e) => setTextAlign(e.target.value)}
              >
                <option value="left">left</option>
                <option value="right">right</option>
                <option value="center">center</option>
                <option value="justify">justify</option>
                <option value="initial">initial</option>
              </select>
            </div>
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
      <hr className="dropdown-divider" />
          
					<button
						type="button"
						className="dropdown-item"
						onClick={(e) => {
							e.preventDefault();
							setCurrentMenu("MenuGlobal"); // Retourne au menu global sans fermer le dropdown
						}}
					>
						<span className="icon">
							<i className="fas fa-arrow-left" />
						</span>
						<span>Retour au Menu Global</span>
					</button>
    </div>
  );
};

export default ComponentTitleSettings;
