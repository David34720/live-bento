// ResponsiveToggle.tsx
import type { FC, Dispatch } from "react";
import type {} from "../../../../@types";

interface ResponsiveToggleProps {
	visibleBreakpoints: string[];
	currentBreakpoint: string;
	setCurrentBreakpoint: Dispatch<React.SetStateAction<string>>;
}

const ResponsiveToggle: FC<ResponsiveToggleProps> = ({
	visibleBreakpoints,
	currentBreakpoint,
	setCurrentBreakpoint,
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
			{visibleBreakpoints.map((key) => (
				<button
					type="button"
					style={{ width: "40px", height: "40px" }}
					key={key}
					onClick={() => setCurrentBreakpoint(key)}
					className={`button is-small mr-2 mb-2 ${
						currentBreakpoint === key ? "is-focused" : ""
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

export default ResponsiveToggle;
