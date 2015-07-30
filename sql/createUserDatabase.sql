
-- MPC DATABASE -----------------------------------------------------


CREATE DATABASE IF NOT EXISTS mpcUsersDB;
-- CREATE USER 'mpcAdmin'@'localhost' IDENTIFIED BY 'mpcAdminPASS';
-- GRANT select, insert, update, delete ON 'mpcUsersDB'.* TO 'mpcAdmin'@'localhost';

USE mpcUsersDB;

-- MPC DATABASE TABLES ----------------------------------------------

CREATE TABLE IF NOT EXISTS users (
	id		INT NOT NULL AUTO_INCREMENT,
	username 	TEXT NOT NULL, UNIQUE INDEX USING BTREE(username(20)),
	email		TEXT NOT NULL,
	password	TEXT NOT NULL,
	salt 		TEXT NOT NULL,
	accountType	TEXT NOT NULL,
	loginTime	DATE NOT NULL,
	PRIMARY KEY (id)

) ENGINE=MyISAM;

CREATE TABLE IF NOT EXISTS userState (	
	id		INT NOT NULL AUTO_INCREMENT,
	username	TEXT NOT NULL,
	showAll		BOOLEAN NOT NULL,
	selection	TEXT,
	PRIMARY KEY (id),
	FOREIGN KEY (username(20)) REFERENCES users(username)

) ENGINE=MyISAM;

 
CREATE TABLE IF NOT EXISTS reservations (
	id		INT NOT NULL AUTO_INCREMENT,
	username	TEXT NOT NULL, 
	mpGRI		TEXT,
	uniGRI		TEXT NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (username(20)) REFERENCES users(username)
	
) ENGINE=MyISAM;

Insert into users (username , email, password, salt, accountType, loginTime) Values ("testUser", "testUser@uml.edu", "9584d24125cac749357fb4f28783c41fa286d179a957fbaaa008ff96c3ad7ae7", "c2FsdAo=", "admin", CURDATE());
