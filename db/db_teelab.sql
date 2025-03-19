use db_teelab

CREATE TABLE users (
	user_id INT PRIMARY KEY AUTO_INCREMENT,
	userName VARCHAR(255),
	phone VARCHAR(255),
	email VARCHAR(255),
	password VARCHAR(255),
	image VARCHAR(255),
	role BOOLEAN,
	description VARCHAR(255)
)

CREATE TABLE products (
	product_id INT PRIMARY KEY AUTO_INCREMENT,
	product_name VARCHAR(255),
	price FLOAT,
	quantity INT,
	material VARCHAR(255),
	form VARCHAR(255),
	color VARCHAR(255),
	design VARCHAR(255),
	product_type_id INT,
	description VARCHAR(255),
	FOREIGN KEY (product_type_id) REFERENCES product_type (product_type_id)
)


CREATE TABLE product_type (
	product_type_id INT PRIMARY KEY AUTO_INCREMENT,
	product_name VARCHAR(255),
	description VARCHAR(255)
)

CREATE TABLE orders (
	order_id INT PRIMARY KEY AUTO_INCREMENT,
	address VARCHAR(255),
	province VARCHAR(255),
	district VARCHAR(255),
	commune VARCHAR(255),
	description VARCHAR(255)
)


