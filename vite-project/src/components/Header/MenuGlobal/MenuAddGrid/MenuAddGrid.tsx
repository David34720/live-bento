// MenuAddGrid.tsx
import React, { FC } from "react";

interface MenuAddGridProps {
  isAdmin: boolean;
  setCurrentMenu: (menu: string) => void;
  addItem: (componentType: ComponentType) => void;
}

const MenuAddGrid: FC<MenuAddGridProps> = ({
  isAdmin,
  setCurrentMenu,
  addItem,
}) => {
  return (
    <div>
      {/* Bouton pour Ajouter un Logo */}
      <button
        type="button"
        className="dropdown-item"
        onClick={(e) => {
          e.preventDefault();
          addItem("logo"); // Passer "logo" comme type de composant
        }}
      >
        Ajouter un Logo
      </button>

      {/* Bouton pour Ajouter un Titre */}
      <button
        type="button"
        className="dropdown-item"
        onClick={(e) => {
          e.preventDefault();
          addItem("title"); // Passer "title" comme type de composant
        }}
      >
        Ajouter un Titre
      </button>

      <hr className="dropdown-divider" />

      {/* Bouton pour Retourner au Menu Global */}
      <button
        type="button"
        className="dropdown-item"
        onClick={(e) => {
          e.preventDefault();
          setCurrentMenu("MenuGlobal");
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

export default MenuAddGrid;
