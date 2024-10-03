// dans ce fichier on définit le typage qu'on utilise à plusieurs endroits

export interface BackgroundSettings {
	imageUrl?: string;
	color?: string;
	opacity?: number;
}
export interface Breakpoints {
	[key: string]: number;
}

export interface IVIsibleBreakPoints {
	breakpoint: string[];
}
