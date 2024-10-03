// App.tsx
import React, {
	useCallback,
	useEffect,
	useState,
	useRef,
	type CSSProperties,
} from "react";
import GridLayout from "./components/GridLayout/GridLayout";
import Header from "./components/Header/Header";
import type { BackgroundSettings, Breakpoints } from "./@types";
import "./App.scss";
import type { Layouts } from "react-grid-layout";
import "react-grid-layout/css/styles.css"; // Styles par défaut de react-grid-layout
import "react-resizable/css/styles.css"; // Styles pour le redimensionnement
import "bulma/css/bulma.min.css"; // Styles de Bulma

function App() {
	const [isAdmin, setIsAdmin] = useState<boolean>(false);
	// Exemple d'utilisateur connecté
	const user = {
		name: "John Doe",
		isAdmin: true,
	};

	// Utilisation correcte de useCallback avec les dépendances appropriées
	const isAdminConnect = useCallback(() => {
		setIsAdmin(user.isAdmin);
	}, [user.isAdmin]);

	useEffect(() => {
		isAdminConnect();
	}, [isAdminConnect]);

	const [backgroundSettings, setBackgroundSettings] =
		useState<BackgroundSettings>({});

	const onChangeBackground = (newBackground: BackgroundSettings) => {
		setBackgroundSettings(newBackground);
	};

	// Créer une référence pour le conteneur principal
	const mainContentRef = useRef<HTMLDivElement>(null);

	const [currentBreakpoint, setCurrentBreakpoint] = useState<string>("lg");
	const [breakpoints, setBreakpoints] = useState<Breakpoints>({
		lg: 1200,
		md: 996,
		sm: 768,
		xs: 480,
		xxs: 0,
	});
	const [maxWidthBreakpoints, setMaxWidthBreakpoints] = useState<Breakpoints>({
		lg: 1900,
		md: 1119,
		sm: 995,
		xs: 767,
		xxs: 479,
	});

	const [visibleBreakpoints, setVisibleBreakpoints] = useState<string[]>([]);

	useEffect(() => {
		const handleResize = () => {
			const width = window.innerWidth;

			if (width >= breakpoints.lg) {
				setCurrentBreakpoint("lg");
			} else if (width >= breakpoints.md) {
				setCurrentBreakpoint("md");
			} else if (width >= breakpoints.sm) {
				setCurrentBreakpoint("sm");
			} else if (width >= breakpoints.xs) {
				setCurrentBreakpoint("xs");
			} else {
				setCurrentBreakpoint("xxs");
			}

			// Filtrer les breakpoints visibles en fonction de la taille de la fenêtre
			const newVisibleBreakpoints = Object.entries(breakpoints)
				.filter(([, breakpointWidth]) => breakpointWidth <= width)
				.map(([key]) => key);

			setVisibleBreakpoints(newVisibleBreakpoints);
		};

		// Écoute les changements de taille de la fenêtre
		window.addEventListener("resize", handleResize);

		// Exécute une fois pour ajuster le breakpoint et les boutons visibles à l'initialisation
		handleResize();

		// Nettoyage lors de la destruction du composant
		return () => window.removeEventListener("resize", handleResize);
	}, [breakpoints]);

	// Définir les layouts initiaux
	const initialLayouts: Layouts = {
		lg: [
			{ i: "1", x: 0, y: 0, w: 4, h: 2 },
			{ i: "2", x: 4, y: 0, w: 4, h: 2 },
			{ i: "3", x: 8, y: 0, w: 4, h: 2 },
		],
		md: [
			{ i: "1", x: 0, y: 0, w: 6, h: 2 },
			{ i: "2", x: 6, y: 0, w: 6, h: 2 },
			{ i: "3", x: 0, y: 2, w: 6, h: 2 },
		],
		sm: [
			{ i: "1", x: 0, y: 0, w: 12, h: 2 },
			{ i: "2", x: 0, y: 2, w: 12, h: 2 },
			{ i: "3", x: 0, y: 4, w: 12, h: 2 },
		],
		xs: [
			{ i: "1", x: 0, y: 0, w: 6, h: 2 },
			{ i: "2", x: 0, y: 2, w: 6, h: 2 },
			{ i: "3", x: 0, y: 4, w: 6, h: 2 },
		],
		xxs: [
			{ i: "1", x: 0, y: 0, w: 4, h: 2 },
			{ i: "2", x: 0, y: 2, w: 4, h: 2 },
			{ i: "3", x: 0, y: 4, w: 4, h: 2 },
		],
	};

	// États pour les layouts et le compteur d'éléments
	const [layouts, setLayouts] = useState<Layouts>(initialLayouts);
	const [counter, setCounter] = useState<number>(4); // Compteur pour les nouveaux éléments

	// Fonction appelée lorsque le layout change
	const onLayoutChange = (
		layout: ReactGridLayout.Layout[],
		allLayouts: Layouts,
	) => {
		setLayouts(allLayouts); // Mettre à jour les layouts avec les nouvelles dispositions
	};

	// Fonction pour ajouter un nouvel élément à la grille
	const addItem = () => {
		const newItemId = counter.toString(); // Nouvel identifiant basé sur le compteur
		setLayouts((prevLayouts) => {
			const newLayouts: Layouts = { ...prevLayouts }; // Copier les layouts existants
			for (const key of Object.keys(newLayouts)) {
				const breakpointLayouts = newLayouts[key]; // Récupérer le layout pour chaque breakpoint
				const newItem: ReactGridLayout.Layout = {
					i: newItemId, // Identifiant unique de l'élément
					x: 0, // Position X initiale
					y: Number.POSITIVE_INFINITY, // Position Y pour placer en bas
					w: breakpointLayouts[0]?.w || 4, // Largeur (utilise la largeur du premier élément ou 4 par défaut)
					h: breakpointLayouts[0]?.h || 2, // Hauteur (utilise la hauteur du premier élément ou 2 par défaut)
				};
				newLayouts[key] = [...breakpointLayouts, newItem]; // Ajouter le nouvel élément au layout
			}
			return newLayouts; // Retourner les nouveaux layouts mis à jour
		});
		setCounter(counter + 1); // Incrémenter le compteur pour le prochain élément
	};

	// Fonction pour supprimer un élément de la grille
	const removeItem = (i: string) => {
		setLayouts((prevLayouts) => {
			const newLayouts: Layouts = { ...prevLayouts }; // Copier les layouts existants
			for (const key of Object.keys(newLayouts)) {
				// Filtrer les éléments pour supprimer celui avec l'identifiant 'i'
				newLayouts[key] = newLayouts[key].filter((item) => item.i !== i);
			}
			return newLayouts; // Retourner les layouts mis à jour
		});
	};

	return (
		<div
			className="app"
			ref={mainContentRef}
			style={
				{
					margin: "0 auto",

					"--background-image": backgroundSettings.imageUrl
						? `url(${backgroundSettings.imageUrl})`
						: "none",
					"--background-color": backgroundSettings.color || "transparent",
					"--background-opacity": backgroundSettings.opacity ?? 1,
				} as CSSProperties
			}
		>
			<Header
				addItem={addItem}
				onChangeBackground={onChangeBackground}
				isAdmin={isAdmin}
				setIsAdmin={setIsAdmin}
				currentBreakpoint={currentBreakpoint}
				setCurrentBreakpoint={setCurrentBreakpoint} // Utiliser setCurrentBreakpoint
				visibleBreakpoints={visibleBreakpoints} // Passer changeSizeScreen comme prop
			/>
			<div className="main-content">
				<GridLayout
					layouts={layouts}
					onLayoutChange={onLayoutChange}
					breakpoints={breakpoints}
					cols={{ lg: 12, md: 12, sm: 12, xs: 6, xxs: 4 }}
					rowHeight={31}
					// onBreakpointChange={(newBreakpoint) => {
					// 	console.log(newBreakpoint);
					// 	setCurrentBreakpoint(newBreakpoint);
					// }}
					setCurrentBreakpoint={setCurrentBreakpoint}
					draggableHandle=".drag-handle"
					compactType="vertical"
					preventCollision={true}
					autoSize={true}
					style={{
						height: "calc(100vh - 60px)",
						maxWidth: `${maxWidthBreakpoints[currentBreakpoint]}px`,
						margin: "0 auto",
						transition: "max-width 0.3s ease",
					}}
					currentBreakpoint={currentBreakpoint}
					removeItem={removeItem} // Pass removeItem as prop
				/>
			</div>
		</div>
	);
}

export default App;
