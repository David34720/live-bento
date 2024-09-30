// Header.tsx
import { useState, useEffect, useRef, type FC } from "react";
import "bulma/css/bulma.min.css";
import "./Header.scss";

// Importation des différents menus
import MenuGlobal from "./MenuGlobal/MenuGlobal";
import MenuAddGrid from "./MenuAddGrid/MenuAddGrid";
import MenuHomePageSettings from "./MenuHomePageSettings/MenuHomePageSettings";
interface BackgroundSettings {
	imageUrl?: string;
	color?: string;
	opacity?: number;
}

interface HeaderProps {
	addItem: () => void;
	onChangeBackground: (background: BackgroundSettings) => void;
}

const Header: FC<HeaderProps> = ({ addItem, onChangeBackground }) => {
	const [menuIsActive, setMenuIsActive] = useState<boolean>(false);
	const [currentMenu, setCurrentMenu] = useState<string>("MenuGlobal");

	// Exemple d'utilisateur connecté
	const user = {
		name: "John Doe",
		isAdmin: true,
	};

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
				return <MenuGlobal user={user} setCurrentMenu={setCurrentMenu} />;
			case "MenuAddGrid":
				return (
					<MenuAddGrid
						user={user}
						addItem={addItem}
						setCurrentMenu={setCurrentMenu}
					/>
				);
			case "MenuHomePageSettings":
				return (
					<MenuHomePageSettings
						user={user}
						setCurrentMenu={setCurrentMenu}
						onChangeBackground={onChangeBackground}
					/>
				);
			// Ajoutez d'autres menus ici selon vos besoins
			default:
				return <MenuGlobal user={user} setCurrentMenu={setCurrentMenu} />;
		}
	};

	return (
		<div className="header">
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
					<div
						className="dropdown-content"
						// Empêche la fermeture du menu lors des clics internes
						// onClick={(e) => e.stopPropagation()} // Non nécessaire avec handleClickOutside basé sur ref
					>
						{renderMenuContent()}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Header;
