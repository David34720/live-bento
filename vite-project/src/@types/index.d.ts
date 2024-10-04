// dans ce fichier on définit le typage qu'on utilise à plusieurs endroits

export interface LayoutItem {
	i: string; // Identifiant unique pour chaque élément
	bgColor?: string;
	borderColor?: string;
	borderSize?: number;
	x: number; // Position X de l'élément dans la grille
	y: number; // Position Y de l'élément dans la grille
	w: number; // Largeur de l'élément
	h: number; // Hauteur de l'élément
}

export interface LayoutsShop {
	lg: LayoutItem[];
	md: LayoutItem[];
	sm: LayoutItem[];
	xs: LayoutItem[];
	xxs: LayoutItem[];
}

export interface User {
	id: number;
	name: string;
	email: string;
	isAdmin: boolean;
}

export interface Shop {
	id: number;
	userId: number;
	name: string;
	layouts: Layouts;
	logo?: string;
}

export interface Breakpoints {
	[key: string]: number; // Associe chaque clé de breakpoint à une valeur numérique (taille en pixels)
}
interface IVisibleBreakPoints {
	breakpoint: string;
}
export interface MaxWidthBreakpoints {
	[key: string]: number; // Similaire à Breakpoints mais pour les largeurs maximales
}

export interface BackgroundSettings {
	imageUrl?: string;
	color?: string;
	opacity?: number;
}

export interface IVIsibleBreakPoints {
	breakpoint: string[]; // Liste des breakpoints visibles
}
