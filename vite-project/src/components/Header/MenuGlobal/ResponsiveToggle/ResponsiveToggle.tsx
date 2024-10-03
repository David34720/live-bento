// ResponsiveToggle.tsx
import React, { type FC } from "react";
import type { IVIsibleBreakPoints } from "../../../../@types";

interface ResponsiveToggleProps {
	visibleBreakpoints: IVIsibleBreakPoints;
	currentBreakpoint: string;
	setCurrentBreakpoint: React.Dispatch<React.SetStateAction<string>>;
}

const ResponsiveToggle: FC<ResponsiveToggleProps> = ({
	visibleBreakpoints,
	currentBreakpoint,
	setCurrentBreakpoint,
}) => {
	return (
		<div className="responsive-toggle">
			{visibleBreakpoints.map((key) => (
				<button
					type="button"
					key={key}
					onClick={() => setCurrentBreakpoint(key)}
					className={`button is-small mr-2 mb-2 ${
						currentBreakpoint === key ? "is-focused" : ""
					}`}
				>
					<div>
						<div>{key.toUpperCase()}</div>
					</div>
				</button>
			))}
		</div>
	);
};

export default ResponsiveToggle;
