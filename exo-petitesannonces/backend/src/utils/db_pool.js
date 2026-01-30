/**
 * Script de gestion de la base de données. Le script est basé sur un pool de connexions dont la 
 * configuration est définie dans le fichier script ../config/config.js.
 * 
 * @author Les enseignants EMF du module 324
 * @version 1.0
 */

const config = require('../config/config');


/**
 * Exécute une requête SQL sur la base de données.
 * 
 * @param {string} sql La requête SQL à exécuter.
 * @param {Array} params Les paramètres à utiliser dans la requête.
 * @returns 
 */
const request = async (sql, params) => {
    const connection = await config.pool.getConnection();

    try {
        const [results, fields] = await connection.execute(sql, params);
        return [results, fields];
    } catch (error) {
        console.error('Database query error:', error);
        throw error;
    }
    finally {
        connection.release();
    }
}

module.exports = {
    request
};