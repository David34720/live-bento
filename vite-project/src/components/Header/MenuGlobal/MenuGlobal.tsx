// MenuGlobal.tsx
import type { FC } from "react";

interface MenuGlobalProps {
	isAdmin: boolean;
	setCurrentMenu: (menu: string) => void;
}

const MenuGlobal: FC<MenuGlobalProps> = ({ setCurrentMenu, isAdmin }) => {
	return (
		<div>
			{/* Bouton pour Naviguer vers MenuAddGrid */}
			{isAdmin && (
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
			)}
			{/* Lien Administratif, visible seulement si l'utilisateur est admin */}
			{isAdmin && (
				<button type="button" className="dropdown-item">
					Admin
				</button>
			)}
			{/* Lien Administratif, visible seulement si l'utilisateur est USER */}
			{!isAdmin && (
				<button type="button" className="dropdown-item">
					Mon compte
				</button>
			)}

			{/* Lien Paramètres */}
			{isAdmin && (
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
					<span>Paramètres Home Page</span>
				</button>
			)}
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
