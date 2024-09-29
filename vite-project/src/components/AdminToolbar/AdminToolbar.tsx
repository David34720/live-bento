import { useState, type FC } from "react";

interface BackgroundSettings {
	imageUrl?: string;
	color?: string;
	opacity?: number;
}

interface AdminToolbarProps {
	onChangeBackground: (background: BackgroundSettings) => void;
}

const AdminToolbar: FC<AdminToolbarProps> = ({ onChangeBackground }) => {
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
		<div className="admin-toolbar">
			<div>
				<label>Couleur de fond :</label>
				<input
					type="color"
					value={color}
					onChange={(e) => setColor(e.target.value)}
				/>
			</div>
			<div>
				<label>URL de l'image de fond :</label>
				<input
					type="text"
					placeholder="Entrez l'URL"
					value={imageUrl}
					onChange={(e) => setImageUrl(e.target.value)}
				/>
			</div>
			<div>
				<label>Opacité :</label>
				<input
					type="range"
					min="0"
					max="1"
					step="0.01"
					value={opacity}
					onChange={(e) => setOpacity(parseFloat(e.target.value))}
				/>
				<span>{opacity}</span>
			</div>
			<button onClick={handleApply}>Appliquer</button>
		</div>
	);
};

export default AdminToolbar;
