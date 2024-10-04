import React, { useCallback } from "react";
import type { FC } from "react";
import ResponsiveToggle from "./ResponsiveToggle/ResponsiveToggle";
import type { IVIsibleBreakPoints } from "../../../@types";

interface MenuGlobalProps {
	isAdmin: boolean;
	setCurrentMenu: (menu: string) => void;
	currentBreakpoint: string;
	setSelectedBreakpoint: React.Dispatch<React.SetStateAction<string>>;
	visibleBreakpoints: IVIsibleBreakPoints;
}

const MenuGlobal: FC<MenuGlobalProps> = ({
	setCurrentMenu,
	isAdmin,
	currentBreakpoint,
	setSelectedBreakpoint,
	visibleBreakpoints,
}) => {
	const handleMenuAddGrid = useCallback(
		(e: React.MouseEvent<HTMLButtonElement>) => {
			e.preventDefault();
			setCurrentMenu("MenuAddGrid"); // Change le menu sans fermer le dropdown
		},
		[setCurrentMenu],
	);

	const handleMenuHomePageSettings = useCallback(
		(e: React.MouseEvent<HTMLButtonElement>) => {
			e.preventDefault();
			setCurrentMenu("MenuHomePageSettings"); // Change le menu sans fermer le dropdown
		},
		[setCurrentMenu],
	);

	return (
		<div>
			{/* Bouton pour toggle responsive */}
			{isAdmin && (
				<ResponsiveToggle
					setCurrentBreakpoint={setSelectedBreakpoint}
					visibleBreakpoints={visibleBreakpoints}
					currentBreakpoint={currentBreakpoint}
				/>
			)}
			{/* Bouton pour Naviguer vers MenuAddGrid */}
			{isAdmin && (
				<button
					type="button"
					className="dropdown-item"
					onClick={handleMenuAddGrid}
				>
					Ajouter une Grille
				</button>
			)}
			{/* Lien Administratif, visible seulement si l'utilisateur est admin */}
			{isAdmin && (
				<button type="button" className="dropdown-item">
					<i className="fas fa-cog mr-2" />
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
					onClick={handleMenuHomePageSettings}
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

export default React.memo(MenuGlobal);
