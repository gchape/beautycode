ALTER TABLE products
ADD COLUMN sale_price_minor INTEGER CHECK (
    sale_price_minor IS NULL
    OR (sale_price_minor >= 0 AND sale_price_minor <= price_minor)
);

ALTER TABLE products
ADD COLUMN features_json TEXT NOT NULL DEFAULT '[]';

INSERT INTO categories (slug, name)
VALUES
    ('თმის-მოვლა', 'თმისა და სკალპის მოვლა'),
    ('ეპილატორები', 'ეპილატორები'),
    ('კანის-მოვლა', 'სახის მოვლა'),
    ('პირის-ღრუს-მოვლა', 'პირის ღრუს მოვლა')
ON CONFLICT (slug) DO UPDATE SET
    name = excluded.name,
    is_active = 1;

INSERT INTO products (
    slug,
    name,
    brand,
    category_slug,
    description,
    price_minor,
    sale_price_minor,
    discount_percent,
    stock_status,
    status,
    image_url,
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
    50,
    'in_stock',
    'published',
    '/images/ipl-colors-cutout.png',
    '["1 მილიონი იმპულსი", "Smart სენსორი", "გაგრილების ფუნქცია", "ავტომატური რეჟიმი", "სიმძლავრის 5 დონე", "5-წლიანი გარანტია"]'
)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO products (
    slug,
    name,
    brand,
    category_slug,
    description,
    price_minor,
    sale_price_minor,
    discount_percent,
    stock_status,
    status,
    image_url,
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
    47,
    'in_stock',
    'published',
    '/images/ipl-kit-cutout.png',
    '["1 მილიონი იმპულსი", "სიმძლავრის 9 დონე", "2 თავაკი და დამცავი სათვალე", "მოყინვის ფუნქცია", "HR — ეპილაციის რეჟიმი", "SC — კანის მოვლის რეჟიმი", "RA — აკნეს საწინააღმდეგო რეჟიმი", "5-წლიანი ოფიციალური გარანტია"]'
)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO products (
    slug,
    name,
    brand,
    category_slug,
    description,
    price_minor,
    sale_price_minor,
    discount_percent,
    stock_status,
    status,
    image_url,
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
    48,
    'in_stock',
    'published',
    '/images/scalp-massager-cutout.png',
    '["630 ნმ სინათლე", "სკალპის დამამშვიდებელი მასაჟი", "შრატის განაწილების 8-ბურთიანი სისტემა", "გამოიყენება შრატთან ან თხევად მოვლის საშუალებასთან ერთად", "5-წლიანი ოფიციალური გარანტია"]'
)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO products (
    slug,
    name,
    brand,
    category_slug,
    description,
    price_minor,
    sale_price_minor,
    discount_percent,
    stock_status,
    status,
    image_url,
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
    46,
    'in_stock',
    'published',
    '/images/face-massager-cutout.png',
    '["HOT — თბილი მასაჟი", "IR — 3 ფერის LED რეჟიმი", "EMS — მიკროდენების რეჟიმი", "9 რეგულირებადი დონე", "წითელი, მწვანე და ლურჯი სინათლე", "სახისა და ყელის მასაჟისთვის"]'
)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO products (
    slug,
    name,
    brand,
    category_slug,
    description,
    price_minor,
    sale_price_minor,
    discount_percent,
    stock_status,
    status,
    image_url,
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
    41,
    'in_stock',
    'published',
    '/images/oral-irrigator-cutout.png',
    '["1200 პულსი წუთში", "IPX7 წყალგამძლეობა", "პორტატული მოწყობილობა მოგზაურობისთვის", "5-წლიანი ოფიციალური გარანტია", "უფასო საკურიერო მიწოდება"]'
)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO products (
    slug,
    name,
    brand,
    category_slug,
    description,
    price_minor,
    sale_price_minor,
    discount_percent,
    stock_status,
    status,
    image_url,
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
    0,
    'in_stock',
    'published',
    '/images/face-cleanser-cutout.png',
    '["ფორების გაწმენდა", "შავი წერტილების მოშორება", "5 ცვლადი თავაკი"]'
)
ON CONFLICT (slug) DO NOTHING;
