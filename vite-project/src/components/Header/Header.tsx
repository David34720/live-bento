import React, {
	useState,
	useEffect,
	useRef,
	useCallback,
	type FC,
} from "react";
import "bulma/css/bulma.min.css";
import "./Header.scss";
import type { BackgroundSettings } from "../../@types";

interface HeaderProps {
	addItem: () => void;
	onChangeBackground: (background: BackgroundSettings) => void;
	isAdmin: boolean;
	setIsAdmin: (isAdmin: boolean) => void;
	currentBreakpoint: string;
	setCurrentBreakpoint: React.Dispatch<React.SetStateAction<string>>;
	visibleBreakpoints: string[];
	menuIsActive: boolean;
	setMenuIsActive: React.Dispatch<React.SetStateAction<boolean>>;
	setCurrentMenu: (menu: string) => void;
	currentMenu: string;
	renderMenuContent: () => JSX.Element;
}

const Header: FC<HeaderProps> = ({
	isAdmin,
	setIsAdmin,
	menuIsActive,
	setMenuIsActive,
	renderMenuContent,
}) => {
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
	}, [menuIsActive, setMenuIsActive]);

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

export default React.memo(Header);
