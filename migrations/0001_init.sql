CREATE TABLE categories (
    slug TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL DEFAULT '',
    icon TEXT NOT NULL DEFAULT 'sparkles',
    sort_order INTEGER NOT NULL DEFAULT 0,
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
    sale_price_minor INTEGER CHECK (
        sale_price_minor IS NULL
        OR (sale_price_minor >= 0 AND sale_price_minor <= price_minor)
    ),
    features_json TEXT NOT NULL DEFAULT '[]',
    sku TEXT,
    meta_description TEXT NOT NULL DEFAULT '',
    is_featured INTEGER NOT NULL DEFAULT 0 CHECK (is_featured IN (0, 1)),
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

CREATE UNIQUE INDEX products_sku_index ON products (sku) WHERE sku IS NOT NULL;

CREATE TABLE admin_audit_log (
    id         INTEGER PRIMARY KEY,
    username   TEXT NOT NULL,
    action     TEXT NOT NULL,
    entity     TEXT NOT NULL,
    entity_id  TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

INSERT INTO categories (slug, name, description, icon, sort_order)
VALUES
    ('თმის-მოვლა', 'თმისა და სკალპის მოვლა', 'თმისა და სკალპის ყოველდღიური მოვლა', 'wind', 0),
    ('ეპილატორები', 'ეპილატორები', 'გლუვი კანისთვის, ყოველდღე', 'sparkles', 1),
    ('კანის-მოვლა', 'სახის მოვლა', 'სახის გაწმენდა და მასაჟი', 'droplet', 2),
    ('პირის-ღრუს-მოვლა', 'პირის ღრუს მოვლა', 'კბილებისა და ღრძილების ყოველდღიური ჰიგიენა', 'smile', 3);

INSERT INTO products (
    slug,
    name,
    brand,
    category_slug,
    description,
    price_minor,
    sale_price_minor,
    stock_status,
    status,
    is_featured,
    features_json
)
VALUES (
    'ipl-epilator',
    'IPL ეპილატორი',
    'Beauty Code',
    'ეპილატორები',
    'IPL ეპილატორი სახლის პირობებში არასასურველი თმის მოსაშორებლად. მოწყობილობას აქვს ავტომატური რეჟიმი, გაგრილება და რეგულირებადი სიმძლავრე.',
    30000,
    14900,
    'in_stock',
    'published',
    1,
    '["1 მილიონი იმპულსი", "Smart სენსორი", "გაგრილების ფუნქცია", "ავტომატური რეჟიმი", "სიმძლავრის 5 დონე", "5-წლიანი გარანტია"]'
);

INSERT INTO products (
    slug,
    name,
    brand,
    category_slug,
    description,
    price_minor,
    sale_price_minor,
    stock_status,
    status,
    is_featured,
    features_json
)
VALUES (
    'premium-ipl-epilator',
    'პრემიუმ IPL ეპილატორი',
    'Beauty Code',
    'ეპილატორები',
    'პრემიუმ IPL ეპილატორი ორი თავაკითა და დამცავი სათვალით. აერთიანებს ეპილაციისა და კანის მოვლის რეჟიმებს, გაგრილების ფუნქციას და სიმძლავრის 9 დონეს.',
    84000,
    44900,
    'in_stock',
    'published',
    1,
    '["1 მილიონი იმპულსი", "სიმძლავრის 9 დონე", "2 თავაკი და დამცავი სათვალე", "მოყინვის ფუნქცია", "HR — ეპილაციის რეჟიმი", "SC — კანის მოვლის რეჟიმი", "RA — აკნეს საწინააღმდეგო რეჟიმი", "5-წლიანი ოფიციალური გარანტია"]'
);

INSERT INTO products (
    slug,
    name,
    brand,
    category_slug,
    description,
    price_minor,
    sale_price_minor,
    stock_status,
    status,
    is_featured,
    features_json
)
VALUES (
    'scalp-massager',
    'სკალპის მასაჟორ-სავარცხელი',
    'Beauty Code',
    'თმის-მოვლა',
    'ელექტრო მასაჟორ-სავარცხელი სკალპის ყოველდღიური მოვლისთვის. აერთიანებს სინათლისა და მასაჟის ფუნქციებს და შრატის თანაბრად განაწილების სისტემას.',
    28900,
    14900,
    'in_stock',
    'published',
    1,
    '["630 ნმ სინათლე", "სკალპის დამამშვიდებელი მასაჟი", "შრატის განაწილების 8-ბურთიანი სისტემა", "გამოიყენება შრატთან ან თხევად მოვლის საშუალებასთან ერთად", "5-წლიანი ოფიციალური გარანტია"]'
);

INSERT INTO products (
    slug,
    name,
    brand,
    category_slug,
    description,
    price_minor,
    sale_price_minor,
    stock_status,
    status,
    is_featured,
    features_json
)
VALUES (
    'face-massager',
    'სახისა და ყელის მასაჟორი',
    'Beauty Code',
    'კანის-მოვლა',
    'სახისა და ყელის მასაჟორი სამი რეჟიმით. თბილი მასაჟი, LED სინათლე და EMS მიკროდენების რეჟიმი ერთ მოწყობილობაში, რეგულირებადი ინტენსივობით.',
    22000,
    11900,
    'in_stock',
    'published',
    1,
    '["HOT — თბილი მასაჟი", "IR — 3 ფერის LED რეჟიმი", "EMS — მიკროდენების რეჟიმი", "9 რეგულირებადი დონე", "წითელი, მწვანე და ლურჯი სინათლე", "სახისა და ყელის მასაჟისთვის"]'
);

INSERT INTO products (
    slug,
    name,
    brand,
    category_slug,
    description,
    price_minor,
    sale_price_minor,
    stock_status,
    status,
    is_featured,
    features_json
)
VALUES (
    'oral-irrigator',
    'პორტატული პირის ღრუს ირიგატორი',
    'Beauty Code',
    'პირის-ღრუს-მოვლა',
    'პორტატული ელექტრო ირიგატორი პირის ღრუს ყოველდღიური ჰიგიენისთვის. პულსური წყლის ნაკადი განკუთვნილია ძნელად მისადგომ ადგილებში საკვების ნარჩენების მოსაშორებლად.',
    22000,
    13000,
    'in_stock',
    'published',
    1,
    '["1200 პულსი წუთში", "IPX7 წყალგამძლეობა", "პორტატული მოწყობილობა მოგზაურობისთვის", "5-წლიანი ოფიციალური გარანტია", "უფასო საკურიერო მიწოდება"]'
);

INSERT INTO products (
    slug,
    name,
    brand,
    category_slug,
    description,
    price_minor,
    sale_price_minor,
    stock_status,
    status,
    is_featured,
    features_json
)
VALUES (
    'face-cleanser',
    'სახის გამწმენდი ვაკუუმი',
    'Beauty Code',
    'კანის-მოვლა',
    'სახის გამწმენდი აპარატი ფორების გასაწმენდად და შავი წერტილების მოსაშორებლად. ხუთი ცვლადი თავაკი სხვადასხვა საჭიროებისთვის.',
    12900,
    NULL,
    'in_stock',
    'published',
    1,
    '["ფორების გაწმენდა", "შავი წერტილების მოშორება", "5 ცვლადი თავაკი"]'
);

INSERT INTO product_images (product_id, url, alt)
SELECT id, 'https://res.cloudinary.com/<CLOUD_NAME>/image/upload/v<VER>/beautycode/products/<ID-1>.png', name FROM products WHERE slug = 'ipl-epilator';

INSERT INTO product_images (product_id, url, alt)
SELECT id, 'https://res.cloudinary.com/<CLOUD_NAME>/image/upload/v<VER>/beautycode/products/<ID-2>.png', name FROM products WHERE slug = 'premium-ipl-epilator';

INSERT INTO product_images (product_id, url, alt)
SELECT id, 'https://res.cloudinary.com/<CLOUD_NAME>/image/upload/v<VER>/beautycode/products/<ID-3>.png', name FROM products WHERE slug = 'scalp-massager';

INSERT INTO product_images (product_id, url, alt)
SELECT id, 'https://res.cloudinary.com/<CLOUD_NAME>/image/upload/v<VER>/beautycode/products/<ID-4>.png', name FROM products WHERE slug = 'face-massager';

INSERT INTO product_images (product_id, url, alt)
SELECT id, 'https://res.cloudinary.com/<CLOUD_NAME>/image/upload/v<VER>/beautycode/products/<ID-5>.png', name FROM products WHERE slug = 'oral-irrigator';

INSERT INTO product_images (product_id, url, alt)
SELECT id, 'https://res.cloudinary.com/<CLOUD_NAME>/image/upload/v<VER>/beautycode/products/<ID-6>.png', name FROM products WHERE slug = 'face-cleanser';
