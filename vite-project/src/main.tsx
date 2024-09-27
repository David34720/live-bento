import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "bulma/css/bulma.min.css"; // Import de Bulma
import "./index.css"; // Votre CSS personnalisé
import "./index.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
	throw new Error("L'élément racine avec l'ID 'root' n'a pas été trouvé.");
}

// Vous pouvez maintenant utiliser rootElement en toute sécurité
const root = createRoot(rootElement);

root.render(
	<StrictMode>
		<App />
	</StrictMode>,
);
