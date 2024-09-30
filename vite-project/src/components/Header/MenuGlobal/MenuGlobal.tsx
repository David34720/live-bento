// MenuGlobal.tsx
import type { FC } from "react";

interface MenuGlobalProps {
	user: {
		name: string;
		isAdmin: boolean;
	};
	setCurrentMenu: (menu: string) => void;
}

const MenuGlobal: FC<MenuGlobalProps> = ({ user, setCurrentMenu }) => {
	return (
		<div>
			{/* Bouton pour Naviguer vers MenuAddGrid */}
			<button
				type="button"
				className="dropdown-item"
				onClick={(e) => {
					e.preventDefault();
					setCurrentMenu("MenuAddGrid"); // Change le menu sans fermer le dropdown
				}}
			>
				Ajouter une Grille
			</button>

			{/* Lien Administratif, visible seulement si l'utilisateur est admin */}
			{user.isAdmin && (
				<button type="button" className="dropdown-item">
					Administration
				</button>
			)}

			{/* Lien Paramètres */}
			<button
				type="button"
				className="dropdown-item"
				onClick={(e) => {
					e.preventDefault();
					setCurrentMenu("MenuHomePageSettings"); // Change le menu sans fermer le dropdown
				}}
			>
				<span className="icon">
					<i className="fas fa-cog" />
				</span>
				<span>Paramètres</span>
			</button>

			<hr className="dropdown-divider" />

			{/* Lien Déconnexion */}
			<button type="button" className="dropdown-item">
				<span className="icon">
					<i className="fas fa-sign-out-alt" />
				</span>
				<span>Déconnexion</span>
			</button>
		</div>
	);
};

export default MenuGlobal;
