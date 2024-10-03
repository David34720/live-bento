// GridLayout.tsx
import type { FC } from "react";
import { Responsive, WidthProvider, type Layouts } from "react-grid-layout";
import "react-grid-layout/css/styles.css"; // Styles par défaut de react-grid-layout
import "react-resizable/css/styles.css"; // Styles pour le redimensionnement
import "bulma/css/bulma.min.css"; // Styles de Bulma
import "./GridLayout.scss"; // Styles personnalisés

const ResponsiveGridLayout = WidthProvider(Responsive);

interface GridLayoutProps {
	layouts: Layouts;
	onLayoutChange: (
		layout: ReactGridLayout.Layout[],
		allLayouts: Layouts,
	) => void;
	breakpoints: { [key: string]: number };
	cols: { [key: string]: number };
	rowHeight: number;
	// onBreakpointChange: (newBreakpoint: string) => void;
	draggableHandle: string;
	compactType: "vertical" | "horizontal" | null;
	preventCollision: boolean;
	autoSize: boolean;
	style: React.CSSProperties;
	currentBreakpoint: string;
	removeItem: (i: string) => void;
}

const GridLayout: FC<GridLayoutProps> = ({
	layouts,
	onLayoutChange,
	breakpoints,
	cols,
	rowHeight,
	draggableHandle,
	compactType,
	preventCollision,
	autoSize,
	style,
	currentBreakpoint,
	removeItem,
}) => {
	return (
		<ResponsiveGridLayout
			className="layout"
			layouts={layouts}
			breakpoints={breakpoints}
			cols={cols}
			rowHeight={rowHeight}
			onLayoutChange={onLayoutChange}
			// onBreakpointChange={(newBreakpoint) => {
			// 	// Mette à jour le currentBreakpoint lorsqu'un changement de breakpoint est détecté
			// 	setCurrentBreakpoint(newBreakpoint);
			// }}
			draggableHandle={draggableHandle}
			compactType={compactType}
			preventCollision={preventCollision}
			autoSize={autoSize}
			style={style}
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
	);
};

export default GridLayout;
