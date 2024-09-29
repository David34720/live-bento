import { useState, type FC } from "react";
import "bulma/css/bulma.min.css";
import "./Header.scss";

const Header: FC = () => {
	const [menuIsActive, setMenuIsActive] = useState<boolean>(false);

	// Exemple d'utilisateur connecté
	const user = {
		name: "John Doe",
		isAdmin: true,
	};

	return (
		<div className="header">
			{/* Bouton burger */}
			<div className={`dropdown is-right ${menuIsActive ? "is-active" : ""}`}>
				<div className="dropdown-trigger">
					<button
						type="button"
						className="button"
						aria-haspopup="true"
						aria-controls="dropdown-menu"
						onClick={() => setMenuIsActive(!menuIsActive)}
					>
						<span className="icon is-small">
							<i className="fas fa-bars" aria-hidden="true"></i>
						</span>
					</button>
				</div>

				{/* Menu */}
				<div className="dropdown-menu" id="dropdown-menu" role="menu">
					<div className="dropdown-content">
						<a href="#" className="dropdown-item">
							Home
						</a>
						{user.isAdmin && (
							<a href="#" className="dropdown-item">
								Administration
							</a>
						)}
						<a href="#" className="dropdown-item">
							Settings
						</a>
						<hr className="dropdown-divider" />
						<a href="#" className="dropdown-item">
							Logout
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Header;
