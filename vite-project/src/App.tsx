import React, {
	useCallback,
	useEffect,
	useState,
	useRef,
	useMemo,
	type CSSProperties,
} from "react";
import GridLayout from "./components/GridLayout/GridLayout";
import Header from "./components/Header/Header";
import type {
	BackgroundSettings,
	Breakpoints,
	Shop,
	Users,
	User,
	LayoutItem,
	LayoutsShop,
} from "./@types";
import "./App.scss";
import type { Layouts } from "react-grid-layout";
import "react-grid-layout/css/styles.css"; // Styles par défaut de react-grid-layout
import "react-resizable/css/styles.css"; // Styles pour le redimensionnement
import "bulma/css/bulma.min.css"; // Styles de Bulma
// Importation des différents menus
import MenuGlobal from "./components/Header/MenuGlobal/MenuGlobal";
import MenuAddGrid from "./components/Header/MenuGlobal/MenuAddGrid/MenuAddGrid";
import MenuHomePageSettings from "./components/Header/MenuGlobal/MenuHomePageSettings/MenuHomePageSettings";
import data from "./data";


function App() {
	// Initialiser les données user et shops
	const [user, setUser] = useState<User>();
	const [shops, setShops] = useState<Shop[]>([]);
	const [currentShop, setCurrentShop] = useState<Shop>();
	const [layouts, setLayouts] = useState<LayoutsShop>();
	const [counter, setCounter] = useState<number>(0); // Compteur pour les nouveaux éléments
	const [isAdmin, setIsAdmin] = useState<boolean>(false);
	const [currentItemSelected, setCurrentItemSelected] =
		useState<LayoutItem>("");
	const [menuIsActive, setMenuIsActive] = useState<boolean>(false);
	const [currentMenu, setCurrentMenu] = useState<string>("MenuGlobal"); // Créer une référence pour le conteneur principal
	const mainContentRef = useRef<HTMLDivElement>(null);
	// Gestion des breakpoints par bouton dans dropdown menu ou avec le changement de la fenetre
	const [currentBreakpoint, setCurrentBreakpoint] = useState<string>("lg");
	const [breakpoints] = useState<Breakpoints>(data.breakpoints);
	const [maxWidthBreakpoints] = useState<Breakpoints>(data.maxWidthBreakpoints);
	const [visibleBreakpoints, setVisibleBreakpoints] = useState<string[]>();

	const [backgroundSettings, setBackgroundSettings] =
		useState<BackgroundSettings>({});

	const onChangeBackground = useCallback(
		(newBackground: BackgroundSettings) => {
			setBackgroundSettings(newBackground);
		},
		[],
	);
	const isAdminConnect = useCallback(() => {
		if (user) {
			setIsAdmin(user.isAdmin);
		} else {
			setIsAdmin(false);
		}
	}, [user]);

	useEffect(() => {
		isAdminConnect();
	}, [isAdminConnect]);

	const ensureLayouts = (layouts: LayoutsShop): LayoutsShop => {
		return {
			lg: layouts.lg || [],
			md: layouts.md || [],
			sm: layouts.sm || [],
			xs: layouts.xs || [],
			xxs: layouts.xxs || []
		};
	};

	useEffect(() => {
		async function initData() {
			const foundUser = data.users.find((u) => u.id === 1);
			if (foundUser) {
				setUser(foundUser);
				const userShops = data.shops.filter(
					(shop) => shop.userId === foundUser.id,
				);
				setShops(userShops.map(shop => ({ ...shop, layouts: ensureLayouts(shop.layouts as LayoutsShop) })));
				if (userShops.length > 0) {
					const firstShop = userShops[0] as Shop;
					setCurrentShop(firstShop);
					setLayouts(firstShop.layouts);
					setCounter(Object.keys(firstShop.layouts).length - 1);
				}
			}
		}
		initData();
	}, []);
// Fonction pour ajouter un nouvel élément à la grille
const addItem = useCallback(() => {
    const newItemId = counter.toString(); // Nouvel identifiant basé sur le compteur

    setLayouts((prevLayouts: LayoutsShop | undefined) => {
        // Copier les layouts existants tout en initialisant les breakpoints manquants à []
        const newLayouts: LayoutsShop = {
            lg: prevLayouts?.lg ?? [], // Si lg est undefined, initialiser à []
            md: prevLayouts?.md ?? [], // Si md est undefined, initialiser à []
            sm: prevLayouts?.sm ?? [],
            xs: prevLayouts?.xs ?? [],
            xxs: prevLayouts?.xxs ?? []
        };

        // Boucle à travers chaque breakpoint
        for (const key of Object.keys(newLayouts)) {
            // Récupérer le layout pour chaque breakpoint
            const breakpointLayouts = newLayouts[key as keyof LayoutsShop];

            // Créer le nouvel élément à ajouter à la grille
            const newItem: LayoutItem = {
                i: newItemId, // Identifiant unique de l'élément
                x: 0, // Position X initiale
                y: Number.POSITIVE_INFINITY, // Position Y initiale
                w: breakpointLayouts[0]?.w || 4, // Largeur (par défaut ou celle du premier élément)
                h: breakpointLayouts[0]?.h || 2, // Hauteur (par défaut ou celle du premier élément)
                component: "logo", // Ajouter un type de composant par défaut (à personnaliser selon ton besoin)
            };

            // Ajouter le nouvel élément à la disposition du breakpoint actuel
            newLayouts[key as keyof LayoutsShop] = [...breakpointLayouts, newItem];
        }

        // Retourner les nouveaux layouts mis à jour
        return newLayouts;
    });

    // Incrémenter le compteur pour garantir un identifiant unique à chaque nouvel élément
    setCounter((prevCounter) => prevCounter + 1);
}, [counter]);




	// Fonction pour supprimer un élément de la grille
	const removeItem = useCallback((i: string) => {
		setLayouts((prevLayouts) => {
			const newLayouts: LayoutsShop = {
            lg: prevLayouts?.lg ?? [], // Si lg est undefined, initialiser à []
            md: prevLayouts?.md ?? [], // Si md est undefined, initialiser à []
            sm: prevLayouts?.sm ?? [],
            xs: prevLayouts?.xs ?? [],
            xxs: prevLayouts?.xxs ?? []
        };
			for (const key of Object.keys(newLayouts)) {
				// Filtrer les éléments pour supprimer celui avec l'identifiant 'i'
				newLayouts[key as keyof LayoutsShop] = newLayouts[key as keyof LayoutsShop].filter((item) => item.i !== i);
			}
			return newLayouts; // Retourner les layouts mis à jour
		});
	}, []);
	// Fonction appelée lorsque le layout change
	const onLayoutChange = useCallback(
		(layout: ReactGridLayout.Layout[], allLayouts: LayoutsShop) => {
			setLayouts(allLayouts); // Mettre à jour les layouts avec les nouvelles dispositions
		},
		[],
	);

	// Choisir quel menu afficher
	const renderMenuContent = useCallback(() => {
		switch (currentMenu) {
			case "MenuGlobal":
				return (
					<MenuGlobal
						isAdmin={isAdmin}
						setCurrentMenu={setCurrentMenu}
						currentBreakpoint={currentBreakpoint}
						setSelectedBreakpoint={setCurrentBreakpoint}
						visibleBreakpoints={visibleBreakpoints ?? []}
					/>
				);
			case "MenuAddGrid":
				return (
					<MenuAddGrid
						isAdmin={isAdmin}
						addItem={addItem}
						setCurrentMenu={setCurrentMenu}
					/>
				);
			case "MenuHomePageSettings":
				return (
					<MenuHomePageSettings
						isAdmin={isAdmin}
						setCurrentMenu={setCurrentMenu}
						onChangeBackground={onChangeBackground}
					/>
				);
			default:
				return (
					<MenuGlobal
						isAdmin={isAdmin}
						setCurrentMenu={setCurrentMenu}
						currentBreakpoint={currentBreakpoint}
						setSelectedBreakpoint={setCurrentBreakpoint}
						visibleBreakpoints={visibleBreakpoints ?? []}
					/>
				);
		}
	}, [
		currentMenu,
		isAdmin,
		addItem,
		currentBreakpoint,
		visibleBreakpoints,
		onChangeBackground,
	]);

	// Utilisation correcte de useCallback avec les dépendances appropriées

	useEffect(() => {
		const handleResize = () => {
			const width = window.innerWidth;
			if (width >= breakpoints.lg) {
				setCurrentBreakpoint("lg");
			} else if (width >= breakpoints.md) {
				setCurrentBreakpoint("md");
			} else if (width >= breakpoints.sm) {
				setCurrentBreakpoint("sm");
			} else if (width >= breakpoints.xs) {
				setCurrentBreakpoint("xs");
			} else {
				setCurrentBreakpoint("xxs");
			}
			// Filtrer les breakpoints visibles en fonction de la taille de la fenêtre
			const newVisibleBreakpoints = Object.entries(breakpoints)
				.filter(([, breakpointWidth]) => breakpointWidth <= width)
				.map(([key]) => key);
			setVisibleBreakpoints(newVisibleBreakpoints);
		};
		// Écoute les changements de taille de la fenêtre
		window.addEventListener("resize", handleResize);
		// Exécute une fois pour ajuster le breakpoint et les boutons visibles à l'initialisation
		handleResize();
		// Nettoyage lors de la destruction du composant
		return () => window.removeEventListener("resize", handleResize);
	}, [breakpoints]);

	// Utiliser useMemo pour mémoriser les styles
	const appStyles = useMemo(
		() =>
			({
				margin: "0 auto",
				"--background-image": backgroundSettings.imageUrl
					? `url(${backgroundSettings.imageUrl})`
					: "none",
				"--background-color": backgroundSettings.color || "transparent",
				"--background-opacity": backgroundSettings.opacity ?? 1,
			}) as CSSProperties,
		[backgroundSettings],
	);

	// Utiliser useMemo pour mémoriser les styles du GridLayout
	const gridLayoutStyles = useMemo(
		() => ({
			height: "calc(100vh - 60px)",
			maxWidth: `${maxWidthBreakpoints[currentBreakpoint]}px`,
			margin: "0 auto",
			transition: "max-width 0.3s ease",
		}),
		[currentBreakpoint, maxWidthBreakpoints],
	);

	return (
		<div className="app" ref={mainContentRef} style={appStyles}>
			<Header
				addItem={addItem}
				onChangeBackground={onChangeBackground}
				isAdmin={isAdmin}
				setIsAdmin={setIsAdmin}
				renderMenuContent={renderMenuContent}
				menuIsActive={menuIsActive}
				setMenuIsActive={setMenuIsActive}
				setCurrentMenu={setCurrentMenu}
				currentMenu={currentMenu}
				currentBreakpoint={currentBreakpoint}
				setCurrentBreakpoint={setCurrentBreakpoint} // Utiliser setCurrentBreakpoint
				visibleBreakpoints={visibleBreakpoints ?? []} // Passer visibleBreakpoints comme prop
			/>
			<div className="main-content">
				{/* Ajoute une condition de rendu pour vérifier currentShop et currentBreakpoint */}
				{currentShop && currentBreakpoint && layouts && (
					<GridLayout
						layouts={layouts}
						onLayoutChange={onLayoutChange}
						breakpoints={breakpoints}
						cols={{ lg: 12, md: 12, sm: 12, xs: 6, xxs: 4 }}
						rowHeight={31}
						draggableHandle=".drag-handle"
						compactType="vertical"
						preventCollision={false}
						autoSize={true}
						style={gridLayoutStyles}
						currentBreakpoint={currentBreakpoint}
						removeItem={removeItem}
						currentShop={currentShop}
						isAdmin={isAdmin}
					/>
				)}
			</div>
		</div>
	);
}

export default React.memo(App);
