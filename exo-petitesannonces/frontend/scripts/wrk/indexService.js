/* 
    Auteur: Nicolas Rouiller
    Date: 31.03.2025
    Description: Service pour interagir avec l'API des annonces
*/

import { API_ENDPOINT } from "../config/config.js";

/**
 * Service pour interagir avec l'API des annonces.
 */
export class IndexService {
    /**
     * Récupère une annonce par son identifiant.
     * @param {string} id - L'identifiant de l'annonce.
     * @returns {Promise<Object>} Les données de l'annonce.
     * @throws {Error} Si la récupération échoue.
     */
    async getAnnonceById(id) {
        const response = await fetch(`${API_ENDPOINT}/annonces/read/${id}`);
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération de l\'annonce');
        }
        return response.json();
    }

    /**
     * Récupère toutes les annonces.
     * @returns {Promise<Object[]>} Une liste d'annonces.
     * @throws {Error} Si la récupération échoue.
     */
    async getAllAnnonces() {
        const response = await fetch(`${API_ENDPOINT}/annonces/read`);
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des annonces');
        }
        return response.json();
    }

    /**
     * Ajoute une nouvelle annonce.
     * @param {string} titre - Le titre de l'annonce.
     * @param {string} description - La description de l'annonce.
     * @returns {Promise<Object>} Les données de l'annonce créée.
     * @throws {Error} Si l'ajout échoue.
     */
    async addAnnonce(titre, description) {
        const token = sessionStorage.getItem('token');
        const response = await fetch(`${API_ENDPOINT}/annonces/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ titre, description })
        });
        if (!response.ok) {
            throw new Error('Erreur lors de l\'ajout de l\'annonce');
        }
        return response.json();
    }

    /**
     * Supprime une annonce par son identifiant.
     * @param {string} id - L'identifiant de l'annonce à supprimer.
     * @returns {Promise<Object>} Les données de la réponse après suppression.
     * @throws {Error} Si la suppression échoue.
     */
    async deleteAnnonce(id) {
        const token = sessionStorage.getItem('token');
        const response = await fetch(`${API_ENDPOINT}/annonces/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error('Erreur lors de la suppression de l\'annonce');
        };
    }
}