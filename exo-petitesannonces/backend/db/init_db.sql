-- ./db/init_db.sql
SET NAMES 'utf8mb4';
SET CHARACTER SET 'utf8mb4';
SET character_set_client = 'utf8mb4';
SET character_set_connection = 'utf8mb4';
SET character_set_results = 'utf8mb4';

CREATE DATABASE IF NOT EXISTS db_annonces;

USE db_annonces;

CREATE TABLE IF NOT EXISTS t_annonce (
  pk_annonce INT AUTO_INCREMENT PRIMARY KEY,
  titre TEXT NOT NULL,
  description TEXT NOT NULL
);

INSERT INTO t_annonce (titre, description) VALUES
('Vélo d''occasion', 'Vélo de montagne en bon état.'),
('Ordinateur portable', 'Ordinateur portable 15 pouces, 8GB RAM.'),
('Canapé 3 places', 'Canapé confortable en tissu gris.');

GRANT ALL PRIVILEGES ON db_annonces.* TO 'appuser'@'%';
FLUSH PRIVILEGES;
