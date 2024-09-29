import { useState, type FC } from "react";
import { Responsive, WidthProvider, type Layouts } from "react-grid-layout";
import "react-grid-layout/css/styles.css"; // Importer les styles par défaut de react-grid-layout
import "react-resizable/css/styles.css"; // Importer les styles pour le redimensionnement
import "bulma/css/bulma.min.css"; // Importer les styles de Bulma
import "./GridLayout.scss"; // Importer nos propres styles

// Créer un composant ResponsiveGridLayout en enveloppant Responsive avec WidthProvider
const ResponsiveGridLayout = WidthProvider(Responsive);

const GridLayoutTest: FC = () => {
	// Définir les layouts initiaux d'exemple avant Seed ou DB pour chaque breakpoint
	const initialLayouts: Layouts = {
		lg: [
			// Pour les écrans larges
			{ i: "1", x: 0, y: 0, w: 4, h: 2 }, // Élément 1
			{ i: "2", x: 4, y: 0, w: 4, h: 2 }, // Élément 2
			{ i: "3", x: 8, y: 0, w: 4, h: 2 }, // Élément 3
		],
		md: [
			// Pour les écrans moyens
			{ i: "1", x: 0, y: 0, w: 6, h: 2 },
			{ i: "2", x: 6, y: 0, w: 6, h: 2 },
			{ i: "3", x: 0, y: 2, w: 6, h: 2 },
		],
		sm: [
			// Pour les petits écrans
			{ i: "1", x: 0, y: 0, w: 12, h: 2 },
			{ i: "2", x: 0, y: 2, w: 12, h: 2 },
			{ i: "3", x: 0, y: 4, w: 12, h: 2 },
		],
		xs: [
			// Pour les écrans très petits
			{ i: "1", x: 0, y: 0, w: 6, h: 2 },
			{ i: "2", x: 0, y: 2, w: 6, h: 2 },
			{ i: "3", x: 0, y: 4, w: 6, h: 2 },
		],
		xxs: [
			// Pour les écrans les plus petits
			{ i: "1", x: 0, y: 0, w: 4, h: 2 },
			{ i: "2", x: 0, y: 2, w: 4, h: 2 },
			{ i: "3", x: 0, y: 4, w: 4, h: 2 },
		],
	};

	// États pour les layouts, le compteur d'éléments et le breakpoint actuel
	const [layouts, setLayouts] = useState<Layouts>(initialLayouts);
	const [counter, setCounter] = useState<number>(4); // Compteur pour les nouveaux éléments
	const [currentBreakpoint, setCurrentBreakpoint] = useState<string>("lg");

	// Fonction appelée lorsque le layout change
	const onLayoutChange = (
		_layout: ReactGridLayout.Layout[],
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
		<div className="section">
			{/* <h1 className="title"></h1> */}
			{/* Bouton pour ajouter un nouvel élément */}
			<button
				type="button"
				className="button is-primary mb-4"
				onClick={addItem}
			>
				Ajouter un Élément
			</button>
			<div style={{ flex: 1, overflow: "hidden" }}>
				<ResponsiveGridLayout
					className="layout"
					layouts={layouts} // Les layouts pour tous les breakpoints
					breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }} // Définit les points de rupture
					cols={{ lg: 12, md: 12, sm: 12, xs: 6, xxs: 4 }} // Nombre de colonnes pour chaque breakpoint
					rowHeight={31} // Hauteur de chaque ligne en pixels
					onLayoutChange={onLayoutChange} // Appelé lorsque le layout change
					onBreakpointChange={(newBreakpoint) =>
						setCurrentBreakpoint(newBreakpoint)
					} // Mettre à jour le breakpoint actuel
					draggableHandle=".drag-handle" // Spécifie la poignée de déplacement
					compactType="vertical" // Compactage vertical des éléments
					preventCollision={true} // Empêche les collisions lors du déplacement
					autoSize={true} // Ajuste automatiquement la hauteur du conteneur
					style={{ height: "calc(100vh - 60px)" }} // Hauteur du conteneur
				>
					{/* Parcourir les éléments du layout pour le breakpoint actuel */}
					{layouts[currentBreakpoint]?.map((item) => (
						<div key={item.i} className="box">
							<div className="drag-handle">☰</div>{" "}
							{/* Poignée pour déplacer l'élément */}
							<p>Élément {item.i}</p> {/* Affiche le numéro de l'élément */}
							{/* Bouton pour supprimer l'élément */}
							<button
								type="button"
								className="delete-button"
								onClick={() => removeItem(item.i)}
							>
								×
							</button>
						</div>
					))}
				</ResponsiveGridLayout>
			</div>
		</div>
	);
};

export default GridLayoutTest;
