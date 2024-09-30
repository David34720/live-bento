import { useState, type FC } from "react";

interface MenuHomePageSettingsProps {
	user: {
		name: string;
		isAdmin: boolean;
	};
	setCurrentMenu: (menu: string) => void;
	onChangeBackground: (background: BackgroundSettings) => void;
}
interface BackgroundSettings {
	imageUrl?: string;
	color?: string;
	opacity?: number;
}

const MenuHomePageSettings: FC<MenuHomePageSettingsProps> = ({
	user,
	setCurrentMenu,
	onChangeBackground,
}) => {
	const [color, setColor] = useState("");
	const [imageUrl, setImageUrl] = useState("");
	const [opacity, setOpacity] = useState<number>(0.5);

	const handleApply = () => {
		const backgroundSettings: BackgroundSettings = {
			imageUrl: imageUrl || undefined,
			color: color || undefined,
			opacity: opacity,
		};

		onChangeBackground(backgroundSettings);
	};

	return (
		<>
			{user.isAdmin && (
				<div>
					<i className="fas fa-cog fa-2x" />
					<h2>Configuration de la page</h2>
					<hr className="dropdown-divider" />

					<div className="admin-toolbar">
						<div className="nav-element">
							<label>Couleur : </label>
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
						<div className="nav-element">
							<label>Image : </label>
							<input
								type="text"
								placeholder="Entrez l'URL"
								value={imageUrl}
								onChange={(e) => setImageUrl(e.target.value)}
							/>
						</div>
						<div className="nav-element">
							<label>Opacité : </label>
							<span>{opacity}</span>
							<input
								type="range"
								min="0"
								max="1"
								step="0.01"
								value={opacity}
								onChange={(e) => setOpacity(parseFloat(e.target.value))}
							/>
						</div>
						<button class="button is-primary" onClick={handleApply}>
							Appliquer
						</button>
					</div>

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
			)}
		</>
	);
};

export default MenuHomePageSettings;
