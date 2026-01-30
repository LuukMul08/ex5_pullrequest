import { IndexService } from "../wrk/indexService.js";

export class Ctrl {
  #indexService;
  #annonces = [];

  constructor() {
    this.#indexService = new IndexService();
    this.#afficherToutesLesAnnonces();

    // Ajouter annonce
    document.getElementById("addAnnonceForm").addEventListener("submit", async (e) => {
      e.preventDefault();

      const titre = document.getElementById("annonceTitle").value;
      const description = document.getElementById("annonceDescription").value;
      const prix = parseFloat(document.getElementById("annoncePrix").value) || null;

      await this.#indexService.addAnnonce(titre, description, prix);

      bootstrap.Modal.getInstance(document.getElementById("addAnnonceModal")).hide();

      document.getElementById("annonceTitle").value = "";
      document.getElementById("annonceDescription").value = "";
      document.getElementById("annoncePrix").value = "";

      await this.#afficherToutesLesAnnonces();
    });

    // Tri par titre
    document.getElementById("sortSelect")?.addEventListener("change", (e) => {
      let annoncesTriees = [...this.#annonces];
      if (e.target.value === "title-asc") {
        annoncesTriees.sort((a, b) => a.titre.localeCompare(b.titre, "fr", { sensitivity: "base" }));
      }
      this.#renderAnnonces(annoncesTriees);
    });
  }

  async #afficherToutesLesAnnonces() {
    this.#annonces = await this.#indexService.getAllAnnonces();
    this.#renderAnnonces(this.#annonces);
  }

  #renderAnnonces(annonces) {
    const container = document.getElementById("annonces-container");
    container.innerHTML = "";

    for (const a of annonces) {
      const div = document.createElement("div");
      div.className = "col-md-4 mb-4";

      div.innerHTML = `
        <div class="card h-100 ${a.vendue ? "border-secondary" : ""}">
          <div class="card-body">
            <h5 class="card-title">${a.titre}</h5>
            <p class="card-text">${a.description}</p>
            <p class="card-text fw-bold">${a.prix !== null ? `CHF ${a.prix}` : ""}</p>
            ${a.vendue ? '<span class="badge bg-secondary">Vendue</span>' : ''}
            <div class="mt-2">
              <a class="link link-danger delete-annonce-link" data-id="${a.id}" href="#">Supprimer</a>
            </div>
          </div>
        </div>
      `;
      container.appendChild(div);
    }

    this.#bindDeleteEvents();
  }

  #bindDeleteEvents() {
    document.querySelectorAll(".delete-annonce-link").forEach(link => {
      link.addEventListener("click", async e => {
        e.preventDefault();
        const id = link.dataset.id;
        await this.#indexService.deleteAnnonce(id);
        await this.#afficherToutesLesAnnonces();
      });
    });
  }
}
