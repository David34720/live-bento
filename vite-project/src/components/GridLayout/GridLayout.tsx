import React, { useCallback } from "react";
import type { FC } from "react";
import type { LayoutItem, Shop } from "../../@types";
import { Responsive, WidthProvider, type Layouts } from "react-grid-layout";
import "react-grid-layout/css/styles.css"; // Styles par défaut de react-grid-layout
import "react-resizable/css/styles.css"; // Styles pour le redimensionnement
import "bulma/css/bulma.min.css"; // Styles de Bulma
import "./GridLayout.scss"; // Styles personnalisés
import GridItemLogo from "../gridComponents/gridItemLogo/gridItemLogo";
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
	draggableHandle: string;
	compactType: "vertical" | "horizontal" | null;
	preventCollision: boolean;
	autoSize: boolean;
	style: React.CSSProperties;
	currentBreakpoint: string;
	removeItem: (i: string) => void;
	currentShop: Shop;
	isAdmin: boolean;
}

const GridLayout: FC<GridLayoutProps> = React.memo(
	({
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
		currentShop,
		isAdmin,
	}) => {
		const chooseComponentToDisplay = useCallback(
			(item: LayoutItem, currentShop: Shop, currentBreakpoint: string) => {
				switch (item.i) {
					case "logo":
						return (
							<GridItemLogo
								item={item}
								currentShop={currentShop}
								currentBreakpoint={currentBreakpoint}
							/>
						);
					case "header":
						return <div>Ceci est un en-tête</div>;
					case "footer":
						return <div>Ceci est un pied de page</div>;
					default:
						return <div>Composant non trouvé</div>;
				}
			},
			[currentShop, currentBreakpoint],
		);

		return (
			<ResponsiveGridLayout
				className="layout"
				layouts={layouts}
				breakpoints={breakpoints}
				cols={cols}
				rowHeight={rowHeight}
				onLayoutChange={onLayoutChange}
				draggableHandle={isAdmin ? draggableHandle : undefined}
				compactType={compactType}
				preventCollision={preventCollision}
				autoSize={isAdmin ? autoSize : false}
				style={style}
				isDraggable={isAdmin} // Active le déplacement seulement pour les admins
				isResizable={isAdmin}
			>
				{/* Parcourir les éléments du layout pour le breakpoint actuel */}
				{layouts[currentBreakpoint]?.map((item) => (
					<div
						key={item.i}
						className={`box  ${isAdmin ? "layout-item__admin" : "layout-item"}`}
					>
						{isAdmin && <div className="drag-handle"> ☰ </div>}
						{chooseComponentToDisplay(item, currentShop, currentBreakpoint)}
						{isAdmin && (
							<button
								type="button"
								className="delete-button"
								onClick={() => removeItem(item.i)}
							>
								x
							</button>
						)}
					</div>
				))}
			</ResponsiveGridLayout>
		);
	},
);

export default GridLayout;
