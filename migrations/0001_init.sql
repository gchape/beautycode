CREATE TABLE categories (
    slug TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    is_active INTEGER NOT NULL DEFAULT 1 CHECK (is_active IN (0, 1))
);

CREATE TABLE products (
    id INTEGER PRIMARY KEY,
    slug TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    brand TEXT NOT NULL DEFAULT '',
    category_slug TEXT NOT NULL REFERENCES categories (slug),
    description TEXT NOT NULL DEFAULT '',
    price_minor INTEGER NOT NULL CHECK (price_minor >= 0),
    stock_status TEXT NOT NULL DEFAULT 'in_stock'
        CHECK (stock_status IN ('in_stock', 'out_of_stock', 'preorder')),
    status TEXT NOT NULL DEFAULT 'draft'
        CHECK (status IN ('draft', 'published', 'archived')),
    created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
    updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

CREATE VIRTUAL TABLE products_fts USING fts5 (
    name,
    brand,
    description,
    content = 'products',
    content_rowid = 'id',
    tokenize = 'unicode61',
    prefix = '2 3'
);

CREATE TRIGGER products_search_after_insert
AFTER INSERT ON products
BEGIN
    INSERT INTO products_fts (rowid, name, brand, description)
    VALUES (new.id, new.name, new.brand, new.description);
END;

CREATE TRIGGER products_search_after_delete
AFTER DELETE ON products
BEGIN
    INSERT INTO products_fts (products_fts, rowid, name, brand, description)
    VALUES ('delete', old.id, old.name, old.brand, old.description);
END;

CREATE TRIGGER products_search_after_update
AFTER UPDATE ON products
BEGIN
    INSERT INTO products_fts (products_fts, rowid, name, brand, description)
    VALUES ('delete', old.id, old.name, old.brand, old.description);

    INSERT INTO products_fts (rowid, name, brand, description)
    VALUES (new.id, new.name, new.brand, new.description);
END;

CREATE INDEX products_status_category_index ON products (status, category_slug);

CREATE TABLE product_images (
    id INTEGER PRIMARY KEY,
    product_id INTEGER NOT NULL REFERENCES products (id) ON DELETE CASCADE,
    url TEXT NOT NULL,
    alt TEXT NOT NULL DEFAULT '',
    sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE INDEX product_images_product_order_index ON product_images (product_id, sort_order);
