// Importation du contrôleur principal de l'application.
import { Ctrl } from "./ctrl/ctrl.js";

// Fonction d'initialisation de l'application lorsque le DOM est complètement chargé.
document.addEventListener("DOMContentLoaded", () => {
	new Ctrl();
});