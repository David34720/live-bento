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
import type { Layouts, Layout } from "react-grid-layout";
import "react-grid-layout/css/styles.css"; // Styles par défaut de react-grid-layout
import "react-resizable/css/styles.css"; // Styles pour le redimensionnement
import "bulma/css/bulma.min.css"; // Styles de Bulma
// Importation des différents menus
import MenuGlobal from "./components/Header/MenuGlobal/MenuGlobal";
import MenuAddGrid from "./components/Header/MenuGlobal/MenuAddGrid/MenuAddGrid";
import MenuHomePageSettings from "./components/Header/MenuGlobal/MenuHomePageSettings/MenuHomePageSettings";
import type { ComponentType } from "./@types";
import ComponentLogoSettings from "./components/Header/MenuGlobal/ComponentsPropsSettings/ComponentLogoSettings/ComponentLogoSettings";
import ComponentTitleSettings from "./components/Header/MenuGlobal/ComponentsPropsSettings/ComponentTitleSettings/ComponentTitleSettings";
import data from "./data";



function App() {
	// Initialiser les données user et shops
	const [user, setUser] = useState<User>();
	const [shops, setShops] = useState<Shop[]>([]);
	const [currentShop, setCurrentShop] = useState<Shop>();
	const [layouts, setLayouts] = useState<LayoutsShop>();
	const [counter, setCounter] = useState<number>(0); // Compteur pour les nouveaux éléments
	const [isAdmin, setIsAdmin] = useState<boolean>(false);
	const [selectedItem, setSelectedItem] = useState<LayoutItem | null>(null);
	const [menuIsActive, setMenuIsActive] = useState<boolean>(false);
	const [currentMenu, setCurrentMenu] = useState<string>("MenuGlobal"); // Créer une référence pour le conteneur principal
	const mainContentRef = useRef<HTMLDivElement>(null);
	// Gestion des breakpoints par bouton dans dropdown menu ou avec le changement de la fenetre
	const [currentBreakpoint, setCurrentBreakpoint] = useState<string>("lg");
	const [breakpoints] = useState<Breakpoints>(data.breakpoints);
	const [maxWidthBreakpoints] = useState<Breakpoints>(data.maxWidthBreakpoints);
	const [visibleBreakpoints, setVisibleBreakpoints] = useState<string[]>();

	const [backgroundSettings, setBackgroundSettings] = useState<BackgroundSettings>({});

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
					console.log('first shop', firstShop)
					setLayouts(ensureLayouts(firstShop.layouts));
					setCounter(Object.keys(firstShop.layouts).length - 1);
					setBackgroundSettings(firstShop.BackgroundSettings || {
						imageUrl: "",
						color: "#ffffff",
						opacity: 1,
						fontColor: "#000000",
						fontSize: "16px",
						fontWeight: "normal",
					});
				}
			}
		}
		initData();
	}, []);

	// Function pour filtrer les Layouts avec les Hidden retirer
const filteredLayouts = useMemo(() => {
    if (!layouts || !currentBreakpoint) return null;

    const layoutForBreakpoint = layouts[currentBreakpoint] || [];

    // Filtrer les éléments qui ne doivent pas être affichés pour ce breakpoint
    const filteredLayout = layoutForBreakpoint.filter(
      (item) => !(item as LayoutItem).hidden?.includes(currentBreakpoint)
    );
		console.log('filtered layout', filteredLayout)
    return {
      ...layouts,
      [currentBreakpoint]: filteredLayout,
    };
  }, [layouts, currentBreakpoint]);

	
// Fonction pour ajouter un nouvel élément à la grille
const addItem = useCallback((componentType: ComponentType) => {
  const newItemId = counter.toString();

  setLayouts((prevLayouts: LayoutsShop | undefined) => {
    const newLayouts: LayoutsShop = {
      lg: prevLayouts?.lg ?? [],
      md: prevLayouts?.md ?? [],
      sm: prevLayouts?.sm ?? [],
      xs: prevLayouts?.xs ?? [],
      xxs: prevLayouts?.xxs ?? [],
    };

    for (const key of Object.keys(newLayouts)) {
      const breakpointLayouts = newLayouts[key as keyof LayoutsShop];
      // Initialiser componentProps en fonction de componentType
      let componentProps: any = {};
      switch (componentType) {
				case "logo":
					componentProps = {
						imgUrl: "logo.png",
            altText: "Logo par défaut",
            styles: {
							bgColor: "",
              borderColor: "",
              borderSize: 0,
            },
          };
          break;
					case "title":
						componentProps = {
							text: "Titre par défaut",
							styles: {
								fontSize: backgroundSettings.fontSize,
								fontWeight: backgroundSettings.fontWeight,
								color: backgroundSettings.fontColor,
							},
						};
						break;
						// Ajouter des cas pour les autres types de composants...
						default:
							break;
						}
						
						const newItem: LayoutItem = {
							i: newItemId,
							x: 0,
							y: Number.POSITIVE_INFINITY,
							w: breakpointLayouts[0]?.w || 4,
							h: breakpointLayouts[0]?.h || 2,
							component: componentType,
							componentProps: componentProps,
							styles: {},
							hidden: [],
						};
						
						newLayouts[key as keyof LayoutsShop] = [...breakpointLayouts, newItem];
						console.log("Build New Layouts", newLayouts);
    }
	
    return newLayouts;
  });

  setCounter((prevCounter) => prevCounter + 1);
}, [counter]);

const updateItemProps = useCallback(
  (updatedItem: LayoutItem) => {
    setLayouts((prevLayouts) => {
      if (!prevLayouts) return prevLayouts;

      const newLayouts: LayoutsShop = { ...prevLayouts };

      for (const breakpoint of Object.keys(newLayouts)) {
        newLayouts[breakpoint] = newLayouts[breakpoint].map((item) =>
          item.i === updatedItem.i ? updatedItem : item
        );
      }
			console.log("Build New Layouts", newLayouts);
      return newLayouts;
    });
  },
  [setLayouts]
);




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
  (layout: Layout[], allLayouts: Layouts) => {
    if (!layouts) return;

    // Créer un nouvel objet de dispositions en copiant les dispositions existantes
    const newLayouts: LayoutsShop = { ...layouts };

    // Déterminer le breakpoint actuel
    const breakpoint = currentBreakpoint;

    // Obtenir les items pour le breakpoint actuel
    const currentItems = newLayouts[breakpoint];

    // Séparer les éléments visibles et cachés
    const visibleItems = currentItems.filter(
      (item) => !(item as LayoutItem).hidden?.includes(currentBreakpoint)
    );
    const hiddenItems = currentItems.filter((item) =>
      (item as LayoutItem).hidden?.includes(currentBreakpoint)
    );

    // Mettre à jour les positions des éléments visibles
    const updatedVisibleItems = visibleItems.map((item) => {
      const updatedItem = layout.find((l) => l.i === item.i);
      if (updatedItem) {
        return {
          ...item,
          x: updatedItem.x,
          y: updatedItem.y,
          w: updatedItem.w,
          h: updatedItem.h,
        };
      } else {
        return item;
      }
    });

    // Combiner les éléments mis à jour avec les éléments cachés
    newLayouts[breakpoint] = [...updatedVisibleItems, ...hiddenItems];

    setLayouts(newLayouts);
  },
  [layouts, currentBreakpoint],
);


const capitalizeFirstLetter = (string: string) => {
			return string.charAt(0).toUpperCase() + string.slice(1);
		};
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
					backgroundSettings={backgroundSettings}
        />
      );
    // Gérer dynamiquement les composants de paramètres
    default:
      if (selectedItem) {
        const componentSettingsMenu = `Component${capitalizeFirstLetter(selectedItem.component)}Settings`;
        if (currentMenu === componentSettingsMenu) {
          // Rendre le composant de paramètres correspondant
          switch (selectedItem.component) {
            case "logo":
              return (
								<ComponentLogoSettings
									breakpoints={breakpoints}
                  item={selectedItem}
                  updateItemProps={updateItemProps}
                  setCurrentMenu={setCurrentMenu}
                />
              );
            case "title":
              return (
								<ComponentTitleSettings
									breakpoints={breakpoints}
                  item={selectedItem}
                  updateItemProps={updateItemProps}
                  setCurrentMenu={setCurrentMenu}
									
                />
              );
            // Ajouter des cas pour d'autres types de composants...
            default:
              return null;
          }
        }
      }
      // Par défaut, retourner le MenuGlobal
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
  currentBreakpoint,
  visibleBreakpoints,
  selectedItem,
  setSelectedItem,
  updateItemProps,
  layouts,
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
			minHeight: "calc(100vh - 60px)",
			maxWidth: `${maxWidthBreakpoints[currentBreakpoint]}px`,
			margin: "0 auto",
			transition: "max-width 0.3s ease",
		}),
		[currentBreakpoint, maxWidthBreakpoints],
	);

	return (
		<div className="app" ref={mainContentRef} style={appStyles}>
			<Header
				addItem={(componentType) => addItem(componentType)}
				onChangeBackground={onChangeBackground}
				BackgroundSettings={backgroundSettings}
				setBackgroundSettings={setBackgroundSettings}
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
						layouts={ensureLayouts(filteredLayouts as LayoutsShop ?? {})}
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
						selectedItem={selectedItem}
						setSelectedItem={setSelectedItem}
						setCurrentMenu={setCurrentMenu}
						setMenuIsActive={setMenuIsActive}
						menuIsActive={menuIsActive}
					/>
				)}
			</div>
		</div>
	);
}

export default React.memo(App);
