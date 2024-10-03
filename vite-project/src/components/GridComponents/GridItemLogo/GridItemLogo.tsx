import type { LayoutItem } from "../../../@types";
import "./gridItemLogo.scss";

const GridItemLogo = ({
	item,
	currentShop,
	currentBreakpoint,
}: {
	item: LayoutItem;
	currentShop: Shop;
	currentBreakpoint: string;
}) => {
	if (!currentShop || !currentShop.layouts) {
		console.log("currentShop or layouts is undefined", currentBreakpoint);
		return null;
	}

	// Accéder au layout correspondant à l'élément actuel et au breakpoint actuel
	const layoutForItem = currentShop.layouts[currentBreakpoint]?.find(
		(layoutItem: LayoutItem) => layoutItem.i === item.i,
	);

	if (!layoutForItem) {
		console.log(`Layout for item ${item.i} not found   ${currentBreakpoint}`);
		return null;
	}

	// Affichage du style pour debug
	console.log(
		layoutForItem.bgColor,
		layoutForItem.borderColor,
		layoutForItem.borderSize,
	);

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
};

export default GridItemLogo;
