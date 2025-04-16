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

CREATE TABLE `orders` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `order_id` VARCHAR(100) NOT NULL UNIQUE,
  `request_id` VARCHAR(100) NOT NULL,
  `amount` INT NOT NULL,
  `order_info` VARCHAR(255),
  `status` ENUM('pending', 'success', 'failed') DEFAULT 'pending',
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE `order_details` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `order_id` INT NOT NULL,
  `product_id` INT NOT NULL,
  `quantity` INT NOT NULL,
  `price` INT NOT NULL,
  FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON DELETE CASCADE
);



