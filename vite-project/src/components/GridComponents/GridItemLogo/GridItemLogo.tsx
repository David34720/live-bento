import React from "react";
import type { LayoutItem, Shop } from "../../../@types";
import "./gridItemLogo.scss";

const GridItemLogo = React.memo(
	({
		item,
		currentShop,
		currentBreakpoint,
	}: {
		item: LayoutItem;
		currentShop: Shop;
		currentBreakpoint: string;
	}) => {
		if (!currentShop || !currentShop.layouts) {
			return null;
		}

		// Accéder au layout correspondant à l'élément actuel et au breakpoint actuel
		const layoutForItem = currentShop.layouts[currentBreakpoint]?.find(
			(layoutItem: LayoutItem) => layoutItem.i === item.i,
		);

		if (!layoutForItem) {
			return null;
		}

		return (
			<div
				className="gridItemLogo"
				style={{
					backgroundImage: `url(/img/${currentShop.logo})`,
					backgroundColor: layoutForItem.bgColor || "transparent",
					borderColor: layoutForItem.borderColor || "black",
					borderWidth: `${layoutForItem.borderSize}px`,
				}}
			>
				{/* Contenu ou logo ici */}
			</div>
		);
	},
);

export default GridItemLogo;
