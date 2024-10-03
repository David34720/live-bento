// Header.tsx
import React, { useState, useEffect, useRef, type FC } from "react";
import "bulma/css/bulma.min.css";
import "./Header.scss";
import type { BackgroundSettings, IVIsibleBreakPoints } from "../../@types";
// Importation des différents menus
import MenuGlobal from "./MenuGlobal/MenuGlobal";
import MenuAddGrid from "./MenuGlobal/MenuAddGrid/MenuAddGrid";
import MenuHomePageSettings from "./MenuGlobal//MenuHomePageSettings/MenuHomePageSettings";

interface HeaderProps {
	addItem: () => void;
	onChangeBackground: (background: BackgroundSettings) => void;
	isAdmin: boolean;
	setIsAdmin: (isAdmin: boolean) => void;
	currentBreakpoint: string;
	setCurrentBreakpoint: React.Dispatch<React.SetStateAction<string>>;
	visibleBreakpoints: IVIsibleBreakPoints;
}

const Header: FC<HeaderProps> = ({
	addItem,
	onChangeBackground,
	isAdmin,
	setIsAdmin,
	currentBreakpoint,
	setCurrentBreakpoint,
	visibleBreakpoints,
}) => {
	const [menuIsActive, setMenuIsActive] = useState<boolean>(false);
	const [currentMenu, setCurrentMenu] = useState<string>("MenuGlobal");

	// Ref to the dropdown
	const dropdownRef = useRef<HTMLDivElement>(null);

	// Fermer le menu en cliquant en dehors
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				menuIsActive &&
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setMenuIsActive(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [menuIsActive]);

	// Choisir quel menu afficher
	const renderMenuContent = () => {
		switch (currentMenu) {
			case "MenuGlobal":
				return (
					<MenuGlobal
						isAdmin={isAdmin}
						setCurrentMenu={setCurrentMenu}
						currentBreakpoint={currentBreakpoint}
						setSelectedBreakpoint={setCurrentBreakpoint}
						visibleBreakpoints={visibleBreakpoints}
					/>
				);
			case "MenuAddGrid":
				return (
					<MenuAddGrid
						isAdmin={isAdmin}
						addItem={addItem}
						setCurrentMenu={setCurrentMenu}
					/>
				);
			case "MenuHomePageSettings":
				return (
					<MenuHomePageSettings
						isAdmin={isAdmin}
						setCurrentMenu={setCurrentMenu}
						onChangeBackground={onChangeBackground}
					/>
				);
			// Ajoutez d'autres menus ici selon vos besoins
			default:
				return (
					<MenuGlobal
						isAdmin={isAdmin}
						setCurrentMenu={setCurrentMenu}
						currentBreakpoint={currentBreakpoint}
						setSelectedBreakpoint={setCurrentBreakpoint}
						breakpoints={breakpoints}
					/>
				);
		}
	};

	return (
		<div className="header">
			<button
				type="button"
				className="isadmin-toggle mr-4"
				onClick={() => setIsAdmin(!isAdmin)}
			>
				{isAdmin ? <span>Admin</span> : <span>Utilisateur</span>}
			</button>
			{/* Bouton burger */}
			<div
				className={`dropdown is-right ${menuIsActive ? "is-active" : ""}`}
				ref={dropdownRef}
			>
				<div className="dropdown-trigger">
					<button
						type="button"
						className="button is-white"
						aria-haspopup="true"
						aria-controls="dropdown-menu"
						onClick={() => setMenuIsActive(!menuIsActive)}
						onKeyDown={(e) => {
							if (e.key === "Enter" || e.key === " ") {
								setMenuIsActive(!menuIsActive);
							}
						}}
					>
						<span className="icon is-small">
							<i className="fas fa-bars" />
						</span>
					</button>
				</div>

				{/* Menu Dropdown Dynamique */}
				<div className="dropdown-menu" id="dropdown-menu">
					<div className="dropdown-content">{renderMenuContent()}</div>
				</div>
			</div>
		</div>
	);
};

export default Header;
