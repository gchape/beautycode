ALTER TABLE categories ADD COLUMN description TEXT NOT NULL DEFAULT '';
ALTER TABLE categories ADD COLUMN icon TEXT NOT NULL DEFAULT 'sparkles';
ALTER TABLE categories ADD COLUMN sort_order INTEGER NOT NULL DEFAULT 0;
ALTER TABLE products ADD COLUMN sku TEXT;
ALTER TABLE products ADD COLUMN meta_description TEXT NOT NULL DEFAULT '';
ALTER TABLE products ADD COLUMN is_featured INTEGER NOT NULL DEFAULT 0 CHECK (is_featured IN (0, 1));

UPDATE categories SET description = 'თმისა და სკალპის ყოველდღიური მოვლა', icon = 'wind', sort_order = 0 WHERE slug = 'თმის-მოვლა';
UPDATE categories SET description = 'გლუვი კანისთვის, ყოველდღე', icon = 'sparkles', sort_order = 1 WHERE slug = 'ეპილატორები';
UPDATE categories SET description = 'სახის გაწმენდა და მასაჟი', icon = 'droplet', sort_order = 2 WHERE slug = 'კანის-მოვლა';
UPDATE categories SET description = 'კბილებისა და ღრძილების ყოველდღიური ჰიგიენა', icon = 'smile', sort_order = 3 WHERE slug = 'პირის-ღრუს-მოვლა';
UPDATE products SET is_featured = 1 WHERE status = 'published';

CREATE UNIQUE INDEX products_sku_index ON products (sku) WHERE sku IS NOT NULL;

CREATE TABLE product_images (
    id INTEGER PRIMARY KEY,
    product_id INTEGER NOT NULL REFERENCES products (id) ON DELETE CASCADE,
    url TEXT NOT NULL,
    alt TEXT NOT NULL DEFAULT '',
    sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE INDEX product_images_product_order_index ON product_images (product_id, sort_order);

INSERT INTO product_images (product_id, url, alt)
SELECT id, image_url, name FROM products WHERE image_url IS NOT NULL;

CREATE TABLE admin_audit_log (
    id INTEGER PRIMARY KEY,
    username TEXT NOT NULL,
    action TEXT NOT NULL,
    entity TEXT NOT NULL,
    entity_id TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);
