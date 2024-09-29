import { useState, type CSSProperties } from "react";
import GridLayout from "./components/GridLayout/GridLayout";
import Header from "./components/Header/Header";
import AdminToolbar from "./components/AdminToolbar/AdminToolbar";
import "./App.scss";

interface BackgroundSettings {
	imageUrl?: string;
	color?: string;
	opacity?: number;
}

function App() {
	const [backgroundSettings, setBackgroundSettings] =
		useState<BackgroundSettings>({});

	const handleBackgroundChange = (newBackground: BackgroundSettings) => {
		setBackgroundSettings(newBackground);
	};

	return (
		<div
			className="app"
			style={
				{
					"--background-image": backgroundSettings.imageUrl
						? `url(${backgroundSettings.imageUrl})`
						: "none",
					"--background-color": backgroundSettings.color || "transparent",
					"--background-opacity": backgroundSettings.opacity ?? 1,
				} as CSSProperties
			}
		>
			<AdminToolbar onChangeBackground={handleBackgroundChange} />
			<Header />
			<div className="main-content">
				<GridLayout />
			</div>
		</div>
	);
}

export default App;
