const db = require("../utils/db_pool");

/**
 * Récupère toutes les annonces.
 */
const getAllAnnonces = async () => {
  const annonces = (await db.request("SELECT * FROM t_annonce", []))[0];
  return annonces.map((a) => ({
    id: a.pk_annonce,
    titre: a.titre,
    description: a.description,
  }));
};

/**
 * Récupère une annonce par ID.
 */
const getAnnonceById = async (id) => {
  const annonce = (
    await db.request("SELECT * FROM t_annonce WHERE pk_annonce = ?", [id])
  )[0];
  if (annonce.length === 0) return null;
  return {
    id: annonce[0].pk_annonce,
    titre: annonce[0].titre,
    description: annonce[0].description,
  };
};

/**
 * Crée une nouvelle annonce.
 */
const createAnnonce = async (titre, description) => {
  const result = (
    await db.request(
      "INSERT INTO t_annonce (titre, description) VALUES (?, ?)",
      [titre, description]
    )
  )[0];
  return { id: result.insertId, titre, description };
};

/**
 * Supprime une annonce par ID.
 */
const deleteAnnonce = async (id) => {
  await db.request("DELETE FROM t_annonce WHERE pk_annonce = ?", [id]);
};

/**
 * Met à jour une annonce par ID.
 */
const updateAnnonce = async (id, titre, description) => {
  await db.request(
    "UPDATE t_annonce SET titre = ?, description = ? WHERE pk_annonce = ?",
    [titre, description, id]
  );
  return { id, titre, description };
};

module.exports = {
  getAllAnnonces,
  getAnnonceById,
  createAnnonce,
  deleteAnnonce,
  updateAnnonce,
};
