// ResponsiveToggle.tsx
import type { FC } from "react";
import { Breakpoints } from '../../../@types/index';

interface ResponsiveViewComponentProps {
	breakpoints: Breakpoints;
	setItemHiddenBreakpoints: (hiddenBreakpoints: string[]) => void;
	itemHiddenBreakpoints: string[];
}

const ResponsiveViewComponent: FC<ResponsiveViewComponentProps> = ({
	breakpoints,
	setItemHiddenBreakpoints,
	itemHiddenBreakpoints,
}) => {
	const breakpointIcons: { [key: string]: string } = {
		xxs: "fas fa-mobile-alt", // Icône pour mobile
		xs: "fas fa-mobile-alt", // Icône pour tablette
		sm: "fas fa-tablet-alt", // Icône pour petite tablette
		md: "fas fa-laptop", // Icône pour ordinateur portable
		lg: "fas fa-desktop", // Icône pour grand écran (bureau)
	};

	


	return (
		<div className="responsive-toggle">
			<label className="label">Caché sur ce écrans :</label>
			{Object.keys(breakpoints).map((key) => (
				<button
					type="button"
					style={{ width: "40px", height: "40px" }}
					key={key}
					onClick={() => {
						let hidden = [...itemHiddenBreakpoints];
						if (hidden.includes(key)) {
							hidden = hidden.filter((item) => item !== key);
						} else {
							const totalBreakpoints = Object.keys(breakpoints).length;
							if (hidden.length >= totalBreakpoints - 1) {
								// Empêcher de masquer le dernier breakpoint visible
								alert("Vous ne pouvez pas masquer cet élément sur tous les breakpoints.");
								return;
							}
							hidden.push(key);
						}
						setItemHiddenBreakpoints(hidden);
					}}
					className={`button is-small mr-2 mb-2 ${
						itemHiddenBreakpoints.includes(key) ? "is-focused" : ""
					}`}
				>
					<div>
						<i
							className={`${breakpointIcons[key]} ${key === "xs" ? "rotate-90" : ""}`}
						/>
					</div>
				</button>
			))}
		</div>
	);
};

export default ResponsiveViewComponent;
