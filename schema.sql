-- 1. TABELA products
CREATE TABLE `product` (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL
) ENGINE=InnoDB;

-- 2. TABELA orders
CREATE TABLE `order` (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    total_amount DECIMAL(10, 2) DEFAULT 0.00,
    status ENUM('pending', 'paid', 'failed') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 3. TABELA orders_items
CREATE TABLE `order_item` (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    price_at_purchase DECIMAL(10, 2) NOT NULL,
    CONSTRAINT fk_order FOREIGN KEY (order_id) REFERENCES `order`(id) ON DELETE CASCADE,
    CONSTRAINT fk_product FOREIGN KEY (product_id) REFERENCES `product`(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 4. DANE STARTOWE
INSERT INTO `product` (id, name, price) VALUES 
(1, 'Magazyn Energii', 30000.00),
(2, 'Panel Fotowoltaiczny', 2500.00);

-- 5. TRIGGERY
DELIMITER //

-- Przed zapisem: Pobierz cenę z tabeli product
CREATE TRIGGER before_order_item_insert
BEFORE INSERT ON order_item
FOR EACH ROW
BEGIN
    SET NEW.price_at_purchase = (SELECT price FROM product WHERE id = NEW.product_id);
END //

-- Po zapisie: Dodaj do sumy zamówienia
CREATE TRIGGER after_order_item_insert
AFTER INSERT ON order_item
FOR EACH ROW
BEGIN
    UPDATE `order` 
    SET total_amount = total_amount + (NEW.price_at_purchase * NEW.quantity)
    WHERE id = NEW.order_id;
END //

-- Po usunięciu: Odejmij od sumy zamówienia
CREATE TRIGGER after_order_item_delete
AFTER DELETE ON order_item
FOR EACH ROW
BEGIN
    UPDATE `order` 
    SET total_amount = total_amount - (OLD.price_at_purchase * OLD.quantity)
    WHERE id = OLD.order_id;
END //

-- Po aktualizacji: Przelicz różnicę w sumie
CREATE TRIGGER after_order_item_update
AFTER UPDATE ON order_item
FOR EACH ROW
BEGIN
    UPDATE `order` 
    SET total_amount = total_amount 
        - (OLD.price_at_purchase * OLD.quantity) 
        + (NEW.price_at_purchase * NEW.quantity)
    WHERE id = NEW.order_id;
END //

DELIMITER ;