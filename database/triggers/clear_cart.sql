DROP TRIGGER IF EXISTS clear_cart;

CREATE TRIGGER clear_cart
AFTER INSERT
ON order_details FOR EACH ROW
BEGIN
    DECLARE user_id INTEGER;
    SELECT userId INTO user_id FROM orders WHERE orderId = NEW.orderId LIMIT 1;

    DELETE FROM user_cart WHERE userId = user_id AND productId = NEW.productId;
END;
