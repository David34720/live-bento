// MenuAddGrid.tsx
import { type FC } from "react";

interface MenuAddGridProps {
	user: {
		name: string;
		isAdmin: boolean;
	};
	setCurrentMenu: (menu: string) => void;
	addItem: () => void;
}

const MenuAddGrid: FC<MenuAddGridProps> = ({
	user,
	setCurrentMenu,
	addItem,
}) => {
	return (
		<div>
			{/* Bouton pour Ajouter une Grille 1 */}
			<button
				type="button"
				className="dropdown-item"
				onClick={(e) => {
					e.preventDefault();
					addItem(); // Appelle la fonction addItem passée via les props
				}}
			>
				Ajouter Grille 1
			</button>

			{/* Bouton pour Ajouter une Grille 2 */}
			<button
				type="button"
				className="dropdown-item"
				onClick={(e) => {
					e.preventDefault();
					addItem(); // Appelle la fonction addItem passée via les props
				}}
			>
				Ajouter Grille 2
			</button>

			<hr className="dropdown-divider" />

			{/* Bouton pour Retourner au Menu Global */}
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

export default MenuAddGrid;
