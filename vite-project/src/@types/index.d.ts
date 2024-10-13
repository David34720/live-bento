import { Layouts, Layout } from "react-grid-layout";

export interface Users {
	// faire un tableau d'user
	users: User[];
}
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
	shadow?: boolean;
	shadowColor?: string;
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
	styles?: LayoutStyles; // Styles par défaut du composant
}

export interface ItemTitleProps {
	text?: string;
	styles?: LayoutStyles; // Styles par défaut du composant
}

export interface ItemNavigationProps {
	items: string[];
	styles?: LayoutStyles; // Styles par défaut du composant
}

export interface ItemFooterProps {
	text?: string;
	link?: string;
	styles?: LayoutStyles; // Styles par défaut du composant
}

export interface ItemBannerProps {
	imageUrl?: string;
	caption?: string;
	styles?: LayoutStyles; // Styles par défaut du composant
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
	| ({
			component: "logo";
			componentProps?: ItemLogoProps;
			styles?: LayoutStyles; // Surcharges de styles spécifiques au layout
			hidden?: string[];
	  } & Layout )
	| ({
			component: "title";
			componentProps?: ItemTitleProps;
			styles?: LayoutStyles; // Surcharges de styles spécifiques au layout
			hidden?: string[];
	  } & Layout )
	| ({
			component: "navigation";
			componentProps?: ItemNavigationProps;
			styles?: LayoutStyles; // Surcharges de styles spécifiques au layout
			hidden?: string[];
	  } & Layout )
	| ({
			component: "footer";
			componentProps?: ItemFooterProps;
			styles?: LayoutStyles; // Surcharges de styles spécifiques au layout
			hidden?: string[];
	  } & Layout )
	| ({
			component: "banner";
			componentProps?: ItemBannerProps;
			styles?: LayoutStyles; // Surcharges de styles spécifiques au layout
			hidden?: string[];
	  }	& Layout );

// Définition des layouts par breakpoint
export interface LayoutsShop extends Layouts {
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
// Définition des propriétés spécifiques des composants
export interface ItemLogoProps {
  imgUrl?: string;
  altText?: string;
  styles?: LayoutStyles; // Styles par défaut du composant
}

export interface ItemTitleProps {
  text?: string;
  styles?: LayoutStyles; // Styles par défaut du composant
}

export interface ItemNavigationProps {
  items: string[];
  styles?: LayoutStyles; // Styles par défaut du composant
}


333,,,export interface ItemFooterProps {
  text?: string;
  link?: string;
  styles?: LayoutStyles; // Styles par défaut du composant
}

export interface ItemBannerProps {
  imageUrl?: string;
  caption?: string;
  styles?: LayoutStyles; // Styles par défaut du composant
}

// Définition des types de composants disponibles
export type ComponentType = 'logo' | 'title' | 'navigation' | 'footer' | 'banner';


// * // A string corresponding to the component key
//   i: string,

//   // These are all in grid units, not pixels
//   x: number,
//   y: number,
//   w: number,
//   h: number,
//   minW: ?number = 0,
//   maxW: ?number = Infinity,
//   minH: ?number = 0,
//   maxH: ?number = Infinity,

//   // If true, equal to `isDraggable: false, isResizable: false`.
//   static: ?boolean = false,
//   // If false, will not be draggable. Overrides `static`.
//   isDraggable: ?boolean = true,
//   // If false, will not be resizable. Overrides `static`.
//   isResizable: ?boolean = true,
//   // By default, a handle is only shown on the bottom-right (southeast) corner.
//   // As of RGL >= 1.4.0, resizing on any corner works just fine!
//   resizeHandles?: ?Array<'s' | 'w' | 'e' | 'n' | 'sw' | 'nw' | 'se' | 'ne'> = ['se']
//   // If true and draggable, item will be moved only within grid.
//   isBounded: ?boolean = false