import React, { useCallback } from "react";
import type { FC } from "react";
import type { LayoutItem, Shop, LayoutsShop } from "../../@types";
import { Responsive, WidthProvider, type Layouts, Layout } from "react-grid-layout";
import "react-grid-layout/css/styles.css"; // Styles par défaut de react-grid-layout
import "react-resizable/css/styles.css"; // Styles pour le redimensionnement
import "bulma/css/bulma.min.css"; // Styles de Bulma
import "./GridLayout.scss"; // Styles personnalisés
import GridItemLogo from "../GridComponents/GridItemLogo/GridItemLogo";
import GridItemTitle from "../GridComponents/GridItemTitle/GridItemTitle";
const ResponsiveGridLayout = WidthProvider(Responsive);

interface GridLayoutProps {
	layouts: LayoutsShop;
	onLayoutChange: (
		layout: Layout[],
		allLayouts: LayoutsShop,
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
	selectedItem: LayoutItem | null;
	setSelectedItem: (item: LayoutItem | null) => void;
	setCurrentMenu: (menu: string) => void;
	setMenuIsActive: (menuIsActive: boolean) => void;
	menuIsActive: boolean;
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
		selectedItem,
		setSelectedItem,
		setCurrentMenu,
		setMenuIsActive,
		menuIsActive,
	}) => {
		const chooseComponentToDisplay = useCallback(
		(item: LayoutItem, currentShop: Shop, currentBreakpoint: string) => {
			switch (item.component) {
				case "logo":
					return (
						<GridItemLogo
							item={item}
							currentShop={currentShop}
							currentBreakpoint={currentBreakpoint}
						/>
					);
				case "title":
					return (
						<GridItemTitle
							item={item}
							currentShop={currentShop}
							currentBreakpoint={currentBreakpoint}
						/>
					);
				// Ajouter des cas pour les autres types de composants...
				default:
					return <div></div>;
			}
		},
		[currentShop, currentBreakpoint]
	);
		// todo: ajouter un bouton pour ajouter un nouvel item
		const capitalizeFirstLetter = (string: string) => {
			return string.charAt(0).toUpperCase() + string.slice(1);
		};
		const handleEditItem = useCallback(
			(item: LayoutItem) => {
				if (isAdmin) {
					setSelectedItem(item);
					setCurrentMenu(`Component${capitalizeFirstLetter(item.component)}Settings`);
					setMenuIsActive(true);
				}
			},
			[isAdmin, setSelectedItem, setCurrentMenu, setMenuIsActive]
		);

		return (
			<ResponsiveGridLayout
				className="layout"
				layouts={layouts}
				breakpoints={breakpoints}
				cols={cols}
				rowHeight={rowHeight} //Hauteur de chaque ligne en pixels. Peut être modifiée en fonction des points de rupture (breakpoints) si vous utilisez une grille réactive.
				onLayoutChange={onLayoutChange}
				draggableHandle={isAdmin ? draggableHandle : undefined}
				compactType={compactType}
				preventCollision={preventCollision} // Si true, empêche les éléments de changer de position lorsqu'ils sont déplacés au-dessus d'autres éléments. Si allowOverlap est false, cela empêche simplement de déposer un élément sur un autre.
				autoSize={isAdmin ? autoSize : false} // Si true, la hauteur du conteneur s'ajustera automatiquement pour contenir tous les éléments de la grille.
				style={style}
				isDraggable={isAdmin} // Active le déplacement seulement pour les admins
				isResizable={isAdmin}

				// * quelques parametres utiles de la documentation de ResponsiveGridLayout
				// draggableCancel: string = '' : Sélecteur CSS pour les éléments qui ne doivent pas être déplaçables.  draggableCancel: '.non-draggable' empêchera le glissement sur les éléments avec la classe .non-draggable
				//compactType: 'vertical' | 'horizontal' | null = 'vertical' : vertical compactera les éléments vers le haut, horizontal vers la gauche, et null désactivera le compactage
				//margin: [number, number] = [10, 10] :  Définit la marge entre les éléments de la grille sous la forme [horizontal, vertical] en pixels.
				//isBounded: boolean = false :  Si true, les éléments sont limités aux limites de la grille pendant le déplacement.
				// useCSSTransforms: boolean = true : Si true, utilise transform: translate() en CSS pour déplacer les éléments, ce qui améliore les performances de rendu.
				//resizeHandles: Array = ['se'] : Définit quelles poignées de redimensionnement doivent être rendues. Les options incluent : 's', 'w', 'e', 'n', 'sw', 'nw', 'se', 'ne'.
				//resizeHandle : Composant personnalisé pour les poignées de redimensionnement. Doit avoir la classe .react-resizable-handle ou ajouter votre classe personnalisée à la propriété draggableCancel.
				// 				Rappels (Callbacks) :
				// onLayoutChange: (layout: Layout) => void

				// Description : Rappel appelé après chaque arrêt de glissement ou de redimensionnement, vous permettant de sauvegarder la disposition actuelle.
				// ItemCallback

				// Description : Type de rappel pour les événements d'élément individuels, avec la signature (layout, oldItem, newItem, placeholder, e, element).
				// onDragStart, onDrag, onDragStop

				// Description : Rappels appelés respectivement au début, pendant et à la fin du déplacement d'un élément.
				// onResizeStart, onResize, onResizeStop

				// Description : Rappels appelés respectivement au début, pendant et à la fin du redimensionnement d'un élément.
				// onDrop: (layout: Layout, item: ?LayoutItem, e: Event) => void

				// Description : Rappel appelé lorsqu'un élément a été déposé dans la grille depuis l'extérieur.
				// onDropDragOver: (e: DragOverEvent) => ?({ w?: number, h?: number } | false)

				// Description : Rappel appelé lorsqu'un élément est en cours de glissement au-dessus de la grille depuis l'extérieur. Retournez un objet pour changer dynamiquement la taille de droppingItem ou false pour ignorer le glissement.
				// innerRef: { current: null | HTMLDivElement }

				// *Description : Référence pour obtenir une référence au div englobant de la grille.
				//*
			>
				{/* Parcourir les éléments du layout pour le breakpoint actuel */}
				{layouts[currentBreakpoint]?.map((item) => {
					if ((item as LayoutItem).hidden?.includes(currentBreakpoint)) return null;
					return (
						<div
							key={item.i}
							className={`box  ${isAdmin ? "layout-item__admin" : "layout-item"}`}
						>
							{isAdmin && (
								<div className="drag-handle">
									<i className="fas fa-grip-vertical" />
								</div>
							)}
							{isAdmin && (
								// biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
								<i
									className="edit-button fas fa-pen fa-2x"
									onClick={() => handleEditItem(item as LayoutItem)}
								/>
							)}
							{chooseComponentToDisplay(item as LayoutItem, currentShop, currentBreakpoint)}
							{isAdmin && (
								// biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
								<i
									className="delete-button fas fa-times-circle"
									onClick={() => removeItem(item.i)}
								/>
							)}
						</div>
					);
				})}
			</ResponsiveGridLayout>
		);
	},
);

export default GridLayout;
