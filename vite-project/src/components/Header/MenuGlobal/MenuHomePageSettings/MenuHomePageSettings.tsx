import { useState, type FC } from "react";
import { BackgroundSettings } from "../../../../@types";	

interface MenuHomePageSettingsProps {
	isAdmin: boolean;
	setCurrentMenu: (menu: string) => void;
	onChangeBackground: (background: BackgroundSettings) => void;
	backgroundSettings: BackgroundSettings;
}


const MenuHomePageSettings: FC<MenuHomePageSettingsProps> = ({
	isAdmin,
	setCurrentMenu,
	onChangeBackground,
	backgroundSettings,
}) => {
	const [color, setColor] = useState(backgroundSettings.color);
	const [imageUrl, setImageUrl] = useState(backgroundSettings.imageUrl);
	const [opacity, setOpacity] = useState<number>(backgroundSettings.opacity as number);
	const [fontColor, setFontColor] = useState(backgroundSettings.fontColor);
	const [fontSize, setFontSize] = useState<string>(backgroundSettings.fontSize as string);
	const [fontWeight, setFontWeight] = useState<string>(backgroundSettings.fontWeight as string);

	const handleApply = () => {
		const newBackgroundSettings: BackgroundSettings = {
			imageUrl: imageUrl || "",
			color: color || "#ffffff",
			opacity: opacity,
			fontColor: fontColor || "#000000",
			fontSize: fontSize || "16px",
			fontWeight: fontWeight || "normal",
		};

		onChangeBackground(newBackgroundSettings);
	};

	return (
		<>
			{isAdmin && (
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
						<div className="nav-element">
							<label>Taille texte : </label>
							<input
								type="text"
								placeholder="ex : 16px"
								value={fontSize}
								onChange={(e) => setFontSize(e.target.value)}
							/>
						</div>
						<div className="nav-element">
							<label>Couleur texte : </label>
							<input
								type="text"
								value={fontColor}
								onChange={(e) => setFontColor(e.target.value)}
							/>
							<input
								type="color"
								value={fontColor}
								onChange={(e) => setFontColor(e.target.value)}
							/>
						</div>
						<div className="nav-element">
							<label>Epaisseur texte : </label>
							<div className="select">
								<select
									value={fontWeight}
									onChange={(e) => setFontWeight(e.target.value)}
								>
									<option value="normal">normal</option>
									<option value="bold">gras</option>
									<option value="bolder">très gras</option>
									<option value="lighter">léger</option>
									<option value="100">100</option>
									<option value="200">200</option>
									<option value="300">300</option>
									<option value="400">400</option>
									<option value="500">500</option>
									<option value="600">600</option>
									<option value="700">700</option>
									<option value="800">800</option>
									<option value="900">900</option>
								</select>
							</div>
						</div>
						<button className="button is-primary" onClick={handleApply}>
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
