import { Layouts } from "react-grid-layout";

// Définition des utilisateurs
export interface User {
	id: number;
	name: string;
	email: string;
	isAdmin: boolean;
}

// Définition des breakpoints
export interface Breakpoints {
	[key: string]: number; // Associe chaque clé de breakpoint à une valeur numérique (taille en pixels)
}

export interface MaxWidthBreakpoints {
	[key: string]: number; // Similaire à Breakpoints mais pour les largeurs maximales
}

// Définition des styles de mise en page
export interface LayoutStyles {
	bgColor?: string;
	borderColor?: string;
	borderSize?: number;
	padding?: string;
	margin?: string;
	fontFamily?: string;
	fontSize?: string;
	fontWeight?: string;
	textAlign?: string;
	color?: string;
	// Autres propriétés de style selon les besoins
}

// Définition des paramètres de fond de la boutique
export interface BackgroundSettings {
	imageUrl?: string;
	color?: string;
	opacity?: number;
}

// Définition des propriétés spécifiques des composants
export interface ItemLogoProps {
	imgUrl?: string;
	altText?: string;
}

export interface ItemTitleProps {
	text?: string;
}

export interface ItemNavigationProps {
	items: string[];
}

export interface ItemFooterProps {
	text?: string;
	link?: string;
}

export interface ItemBannerProps {
	imageUrl?: string;
	caption?: string;
}

// Définition des types de composants disponibles
export type ComponentType =
	| "logo"
	| "title"
	| "navigation"
	| "footer"
	| "banner";

// Discriminated Union pour LayoutItem
export type LayoutItem =
	| {
			i: string;
			x: number;
			y: number;
			w: number;
			h: number;
			component: "logo";
			componentProps?: ItemLogoProps;
			styles?: LayoutStyles;
			hidden?: string[];
	  }
	| {
			i: string;
			x: number;
			y: number;
			w: number;
			h: number;
			component: "title";
			componentProps?: ItemTitleProps;
			styles?: LayoutStyles;
			hidden?: string[];
	  }
	| {
			i: string;
			x: number;
			y: number;
			w: number;
			h: number;
			component: "navigation";
			componentProps?: ItemNavigationProps;
			styles?: LayoutStyles;
			hidden?: string[];
	  }
	| {
			i: string;
			x: number;
			y: number;
			w: number;
			h: number;
			component: "footer";
			componentProps?: ItemFooterProps;
			styles?: LayoutStyles;
			hidden?: string[];
	  }
	| {
			i: string;
			x: number;
			y: number;
			w: number;
			h: number;
			component: "banner";
			componentProps?: ItemBannerProps;
			styles?: LayoutStyles;
			hidden?: string[];
	  };

// Définition des layouts par breakpoint
export interface LayoutsShop {
	lg: LayoutItem[];
	md: LayoutItem[];
	sm: LayoutItem[];
	xs: LayoutItem[];
	xxs: LayoutItem[];
}

// Définition des boutiques
export interface Shop {
	id: number;
	userId: number;
	name: string;
	layouts: LayoutsShop;
	BackgroundSettings?: BackgroundSettings; // Paramètres de fond spécifiques à la boutique
}
