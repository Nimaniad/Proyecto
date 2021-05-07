-- Comandos en mysql para crear la Base de Datos
CREATE DATABASE web;
USE web;

-- Tabla USERS
CREATE TABLE users (
        id INT NOT NULL AUTO_INCREMENT,
        user VARCHAR(20) NOT NULL,
        name VARCHAR(100),
        email VARCHAR(50) NOT NULL,
        password VARCHAR(30) NOT NULL,
        phone INT,
        adress TEXT,
        user_avatar TEXT,
        fecha_registro DATETIME NOT NULL DEFAULT current_timestamp,
        PRIMARY KEY(id)
);

-- Table EVENTOS
CREATE TABLE events (
        event_id INT NOT NULL AUTO_INCREMENT,
        event_name VARCHAR(150) NOT NULL,
        description TEXT,
        event_start_date DATETIME NOT NULL,
        event_end_date DATETIME NOT NULL,
        PRIMARY KEY(event_id)
);

-- Tabla RESERVAS
CREATE TABLE bookings (
        user VARCHAR(20) NOT NULL,
        name VARCHAR(100),
        phone INT,
        adress TEXT,
        booking_start DATETIME,
        booking_end DATETIME,
        PRIMARY KEY(user)
);

-- Tabla LINKS
CREATE TABLE links(
    id INT(11) NOT NULL AUTO_INCREMENT,
    title VARCHAR(150) NOT NULL,
    url VARCHAR(255) NOT NULL,
    description TEXT,
    user_id INT(11),
    create_at timestamp NOT NULL DEFAULT current_timestamp,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id),
    PRIMARY KEY (id)
);


