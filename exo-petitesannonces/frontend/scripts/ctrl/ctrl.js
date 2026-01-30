/* 
    Auteur: Nicolas Rouiller
    Description: Contrôleur de la page index.html
*/

import { IndexService } from "../wrk/indexService.js";

/**
 * Classe de contrôle pour gérer les interactions de l'utilisateur avec l'interface.
 */
export class Ctrl {
  #indexService;
  #annonces = []; // Données originales (non modifiées)

  /**
   * Constructeur de la classe Ctrl.
   * Initialise le service d'annonces et charge toutes les annonces.
   */
  constructor() {
    this.#indexService = new IndexService();
    this.#afficherToutesLesAnnonces();

    // Gestionnaire d'événements pour le formulaire d'ajout d'annonce
    document
      .getElementById("addAnnonceForm")
      .addEventListener("submit", async (event) => {
        event.preventDefault();

        const titre = document.getElementById("annonceTitle").value;
        const description = document.getElementById("annonceDescription").value;

        await this.#indexService.addAnnonce(titre, description);

        bootstrap.Modal.getInstance(
          document.getElementById("addAnnonceModal")
        ).hide();

        document.getElementById("annonceTitle").value = "";
        document.getElementById("annonceDescription").value = "";

        await this.#afficherToutesLesAnnonces();
      });

    // Gestionnaire du tri
    document
      .getElementById("sortSelect")
      ?.addEventListener("change", (event) => {
        let annoncesTriees = [...this.#annonces]; // copie = pas de mutation

        if (event.target.value === "title-asc") {
          annoncesTriees.sort((a, b) =>
            a.titre.localeCompare(b.titre, "fr", { sensitivity: "base" })
          );
        }

        this.#renderAnnonces(annoncesTriees);
      });
  }

  /**
   * Récupère toutes les annonces et déclenche l'affichage.
   */
  async #afficherToutesLesAnnonces() {
    this.#annonces = await this.#indexService.getAllAnnonces();
    this.#renderAnnonces(this.#annonces);
  }

  /**
   * Affiche les annonces dans le DOM.
   * @param {Array} annonces
   */
  #renderAnnonces(annonces) {
    const annoncesContainer = document.getElementById("annonces-container");
    annoncesContainer.innerHTML = "";

    for (let annonce of annonces) {
      const annonceDiv = document.createElement("div");
      annonceDiv.className = "col-md-4 mb-4";
      annonceDiv.innerHTML = `
        <div class="card h-100">
          <div class="card-body">
            <h5 class="card-title">${annonce.titre}</h5>
            <p class="card-text">${annonce.description}</p>
            <a class="link link-danger delete-annonce-link" data-id="${annonce.id}" href="#">Supprimer</a>
          </div>
        </div>
      `;
      annoncesContainer.appendChild(annonceDiv);
    }

    this.#bindDeleteEvents();
  }

  /**
   * Ajoute les événements de suppression.
   */
  #bindDeleteEvents() {
    document.querySelectorAll(".delete-annonce-link").forEach((link) => {
      link.addEventListener("click", async (event) => {
        event.preventDefault();
        const annonceId = link.dataset.id;
        await this.#indexService.deleteAnnonce(annonceId);
        await this.#afficherToutesLesAnnonces();
      });
    });
  }
}
