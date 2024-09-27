import React, { useState } from "react";

interface AdminToolbarProps {
	onChangeBackground: (background: string) => void;
}

const AdminToolbar: React.FC<AdminToolbarProps> = ({ onChangeBackground }) => {
	const [color, setColor] = useState("");
	const [imageUrl, setImageUrl] = useState("");

	const handleApply = () => {
		if (imageUrl) {
			onChangeBackground(`url(${imageUrl})`);
		} else if (color) {
			onChangeBackground(color);
		}
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
			<button onClick={handleApply}>Appliquer</button>
		</div>
	);
};

export default AdminToolbar;
