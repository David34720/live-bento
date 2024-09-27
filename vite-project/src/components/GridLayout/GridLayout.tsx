import { useState, type FC } from "react";
import { Responsive, WidthProvider, type Layouts } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import "bulma/css/bulma.min.css";
import "./GridLayout.scss";

const ResponsiveGridLayout = WidthProvider(Responsive);

const GridLayoutTest: FC = () => {
	// Définir les layouts spécifiques pour chaque breakpoint
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

	const [layouts, setLayouts] = useState<Layouts>(initialLayouts);
	const [counter, setCounter] = useState<number>(4);
	const [currentBreakpoint, setCurrentBreakpoint] = useState<string>("lg");

	const onLayoutChange = (
		layout: ReactGridLayout.Layout[],
		allLayouts: Layouts,
	) => {
		setLayouts(allLayouts);
	};

	const addItem = () => {
		const newItemId = counter.toString();
		setLayouts((prevLayouts) => {
			const newLayouts: Layouts = { ...prevLayouts };
			for (const key of Object.keys(newLayouts)) {
				const breakpointLayouts = newLayouts[key];
				const newItem: ReactGridLayout.Layout = {
					i: newItemId,
					x: 0,
					y: Infinity,
					w: breakpointLayouts[0]?.w || 4,
					h: breakpointLayouts[0]?.h || 2,
				};
				newLayouts[key] = [...breakpointLayouts, newItem];
			}
			return newLayouts;
		});
		setCounter(counter + 1);
	};

	const removeItem = (i: string) => {
		setLayouts((prevLayouts) => {
			const newLayouts: Layouts = { ...prevLayouts };
			for (const key of Object.keys(newLayouts)) {
				newLayouts[key] = newLayouts[key].filter((item) => item.i !== i);
			}
			return newLayouts;
		});
	};

	return (
		<div className="section">
			<h1 className="title">
				Test de react-grid-layout avec Ajouter/Supprimer
			</h1>
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
					layouts={layouts}
					breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
					cols={{ lg: 12, md: 12, sm: 12, xs: 6, xxs: 4 }}
					rowHeight={31}
					onLayoutChange={onLayoutChange}
					onBreakpointChange={(newBreakpoint) =>
						setCurrentBreakpoint(newBreakpoint)
					}
					draggableHandle=".drag-handle"
					compactType="vertical"
					preventCollision={true}
					autoSize={true}
					style={{ height: "calc(100vh - 60px)" }}
				>
					{layouts[currentBreakpoint]?.map((item) => (
						<div key={item.i} className="box">
							<div className="drag-handle">☰</div>
							<p>Élément {item.i}</p>
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
