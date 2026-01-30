const db = require("../utils/db_pool");

/**
 * Récupère toutes les annonces.
 */
const getAllAnnonces = async () => {
  const [rows] = await db.request("SELECT * FROM t_annonce", []);
  return rows.map((a) => ({
    id: a.pk_annonce,
    titre: a.titre,
    description: a.description,
    prix: a.prix,
    vendue: !!a.vendue,
  }));
};

/**
 * Récupère une annonce par ID.
 */
const getAnnonceById = async (id) => {
  const [rows] = await db.request(
    "SELECT * FROM t_annonce WHERE pk_annonce = ?",
    [id]
  );
  if (rows.length === 0) return null;
  const a = rows[0];
  return {
    id: a.pk_annonce,
    titre: a.titre,
    description: a.description,
    prix: a.prix,
    vendue: !!a.vendue,
  };
};

/**
 * Crée une nouvelle annonce.
 */
const createAnnonce = async (titre, description, prix = null) => {
  const [result] = await db.request(
    "INSERT INTO t_annonce (titre, description, prix) VALUES (?, ?, ?)",
    [titre, description, prix]
  );
  return { id: result.insertId, titre, description, prix, vendue: false };
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
const updateAnnonce = async (id, titre, description, prix, vendue) => {
  await db.request(
    "UPDATE t_annonce SET titre = ?, description = ?, prix = ?, vendue = ? WHERE pk_annonce = ?",
    [titre, description, prix, vendue ? 1 : 0, id]
  );
  return { id, titre, description, prix, vendue: !!vendue };
};

module.exports = {
  getAllAnnonces,
  getAnnonceById,
  createAnnonce,
  deleteAnnonce,
  updateAnnonce,
};
