const express = require("express");
const annonceService = require("../services/annonceService");

const router = express.Router();

/** GET toutes les annonces */
router.get("/read", async (req, res) => {
  try {
    const annonces = await annonceService.getAllAnnonces();
    res.status(200).json(annonces);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
});

/** GET une annonce par ID */
router.get("/read/:id", async (req, res) => {
  try {
    const annonce = await annonceService.getAnnonceById(req.params.id);
    if (!annonce)
      return res.status(404).json({ message: "Annonce non trouvée" });
    res.status(200).json(annonce);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
});

/** POST créer une annonce */
router.post("/create", async (req, res) => {
  try {
    const { titre, description } = req.body;
    if (!titre || !description) {
      return res
        .status(400)
        .json({ message: "Titre et description obligatoires" });
    }
    const newAnnonce = await annonceService.createAnnonce(titre, description);
    res.status(201).json(newAnnonce);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
});

/** DELETE une annonce par ID */
router.delete("/delete/:id", async (req, res) => {
  try {
    await annonceService.deleteAnnonce(req.params.id);
    res.status(200).json({ message: "Annonce supprimée" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
});

/** PUT mettre à jour une annonce par ID */
router.put("/update/:id", async (req, res) => {
  try {
    const { titre, description } = req.body;
    if (!titre || !description) {
      return res
        .status(400)
        .json({ message: "Titre et description obligatoires" });
    }
    const updatedAnnonce = await annonceService.updateAnnonce(
      req.params.id,
      titre,
      description
    );
    res.status(200).json(updatedAnnonce);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
});

module.exports = router;
