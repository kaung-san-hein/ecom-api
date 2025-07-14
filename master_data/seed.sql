INSERT INTO products (
  id, name, description, price, stock, category, sku, images, "isActive", brand, "createdAt", "updatedAt"
)
SELECT uuid_generate_v4(), 'iPhone 15 Pro', 'Latest Apple smartphone with A17 Pro chip', 4500000, 50, 'Electronics', 'IPH15P001', 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500', true, 'Apple', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Samsung Galaxy S24', 'Premium Android smartphone with AI features', 4050000, 45, 'Electronics', 'SGS24001', 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500', true, 'Samsung', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'MacBook Air M3', 'Ultra-thin laptop with M3 chip', 5850000, 30, 'Electronics', 'MBA13M3', 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500', true, 'Apple', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Dell XPS 13', 'Premium ultrabook with Intel processor', 4950000, 25, 'Electronics', 'DXPS13001', 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500', true, 'Dell', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Sony WH-1000XM5', 'Noise-canceling wireless headphones', 1800000, 60, 'Electronics', 'SWH1000XM5', 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500', true, 'Sony', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'AirPods Pro 2', 'Apple wireless earbuds with active noise cancellation', 1125000, 80, 'Electronics', 'APP2001', 'https://images.unsplash.com/photo-1603351154351-5e2d0600bb77?w=500', true, 'Apple', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'iPad Pro 12.9', 'Professional tablet with M2 chip', 4950000, 35, 'Electronics', 'IPP129M2', 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500', true, 'Apple', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Nintendo Switch OLED', 'Gaming console with OLED screen', 1575000, 40, 'Electronics', 'NSW001', 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500', true, 'Nintendo', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'PlayStation 5', 'Latest Sony gaming console', 2250000, 20, 'Electronics', 'PS5001', 'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=500', true, 'Sony', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Xbox Series X', 'Microsoft gaming console', 2250000, 22, 'Electronics', 'XSX001', 'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=500', true, 'Microsoft', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Nike Air Max 90', 'Classic running shoes', 540000, 100, 'Clothing', 'NAM90001', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500', true, 'Nike', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Adidas Ultraboost 22', 'Performance running shoes', 810000, 85, 'Clothing', 'AUB22001', 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=500', true, 'Adidas', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Levis 501 Jeans', 'Classic straight-leg jeans', 360000, 120, 'Clothing', 'L501001', 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500', true, 'Levis', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'North Face Jacket', 'Waterproof outdoor jacket', 900000, 45, 'Clothing', 'TNF001', 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500', true, 'The North Face', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Ralph Lauren Polo', 'Classic polo shirt', 405000, 70, 'Clothing', 'RL001', 'https://images.unsplash.com/photo-1581803118522-7b72a50f7e9f?w=500', true, 'Ralph Lauren', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Champion Hoodie', 'Comfortable cotton hoodie', 225000, 90, 'Clothing', 'CH001', 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500', true, 'Champion', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Nike Dri-FIT T-Shirt', 'Moisture-wicking athletic shirt', 135000, 150, 'Clothing', 'NDT001', 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500', true, 'Nike', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Patagonia Fleece', 'Eco-friendly fleece jacket', 630000, 55, 'Clothing', 'PF001', 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500', true, 'Patagonia', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Converse Chuck Taylor', 'Classic canvas sneakers', 292500, 110, 'Clothing', 'CCT001', 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500', true, 'Converse', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Under Armour Shorts', 'Athletic performance shorts', 180000, 80, 'Clothing', 'UA001', 'https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=500', true, 'Under Armour', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Dyson V15 Vacuum', 'Powerful cordless vacuum cleaner', 3375000, 25, 'Home & Garden', 'DV15001', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500', true, 'Dyson', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'KitchenAid Mixer', 'Stand mixer for baking', 3360000, 35, 'Home & Garden', 'KAM001', 'https://images.unsplash.com/photo-1583241475880-083f84372725?w=500', true, 'KitchenAid', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Instant Pot Duo', 'Multi-use pressure cooker', 450000, 60, 'Home & Garden', 'IPD001', 'https://images.unsplash.com/photo-1574781330855-d0db8cc6a79c?w=500', true, 'Instant Pot', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Roomba i7+', 'Robot vacuum with auto-empty', 2700000, 20, 'Home & Garden', 'RI7001', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500', true, 'iRobot', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Philips Hue Bulbs', 'Smart LED light bulbs 4-pack', 900000, 40, 'Home & Garden', 'PHB001', 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=500', true, 'Philips', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Nest Thermostat', 'Smart home thermostat', 1125000, 30, 'Home & Garden', 'NT001', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500', true, 'Google', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Weber Grill', 'Gas barbecue grill', 2250000, 15, 'Home & Garden', 'WG001', 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=500', true, 'Weber', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Keurig Coffee Maker', 'Single-serve coffee machine', 585000, 50, 'Home & Garden', 'KCM001', 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=500', true, 'Keurig', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Ninja Blender', 'High-performance blender', 720000, 45, 'Home & Garden', 'NB001', 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=500', true, 'Ninja', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Shark Steam Mop', 'Steam cleaning mop', 405000, 35, 'Home & Garden', 'SSM001', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500', true, 'Shark', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'The Great Gatsby', 'Classic American novel by F. Scott Fitzgerald', 67500, 200, 'Books', 'TGG001', 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=500', true, 'Scribner', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'To Kill a Mockingbird', 'Harper Lee Pulitzer Prize winner', 63000, 180, 'Books', 'TKAM001', 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500', true, 'Harper Collins', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), '1984', 'George Orwell dystopian masterpiece', 67500, 220, 'Books', 'G1984001', 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=500', true, 'Penguin', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Harry Potter Box Set', 'Complete 7-book series', 270000, 75, 'Books', 'HP001', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500', true, 'Scholastic', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'The Catcher in the Rye', 'J.D. Salinger coming-of-age novel', 76500, 150, 'Books', 'TCITR001', 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500', true, 'Little Brown', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Pride and Prejudice', 'Jane Austen romantic classic', 58500, 190, 'Books', 'PAP001', 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500', true, 'Penguin Classics', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'The Lord of the Rings', 'Tolkien epic fantasy trilogy', 112500, 120, 'Books', 'LOTR001', 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=500', true, 'Houghton Mifflin', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Atomic Habits', 'James Clear guide to building good habits', 85500, 100, 'Books', 'AH001', 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=500', true, 'Avery', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'The Midnight Library', 'Matt Haig philosophical novel', 81000, 85, 'Books', 'TML001', 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=500', true, 'Viking', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Educated', 'Tara Westover memoir', 76500, 95, 'Books', 'EDU001', 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=500', true, 'Random House', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Wilson Tennis Racket', 'Professional tennis racket', 900000, 40, 'Sports & Outdoors', 'WTR001', 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500', true, 'Wilson', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Spalding Basketball', 'Official size basketball', 135000, 80, 'Sports & Outdoors', 'SB001', 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=500', true, 'Spalding', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Yeti Cooler', 'Insulated cooler for camping', 1575000, 25, 'Sports & Outdoors', 'YC001', 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=500', true, 'Yeti', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Coleman Tent', '4-person camping tent', 585000, 35, 'Sports & Outdoors', 'CT001', 'https://images.unsplash.com/photo-1487730116645-74489c95b41b?w=500', true, 'Coleman', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Hydro Flask Water Bottle', 'Insulated stainless steel bottle', 202500, 120, 'Sports & Outdoors', 'HF001', 'https://images.unsplash.com/photo-1523362628745-0c100150b504?w=500', true, 'Hydro Flask', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Bowflex Dumbbells', 'Adjustable weight dumbbells', 1800000, 15, 'Sports & Outdoors', 'BD001', 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500', true, 'Bowflex', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Peloton Bike', 'Indoor cycling bike', 6727500, 10, 'Sports & Outdoors', 'PB001', 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500', true, 'Peloton', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Garmin Watch', 'GPS fitness watch', 1350000, 50, 'Sports & Outdoors', 'GW001', 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500', true, 'Garmin', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Patagonia Backpack', 'Hiking backpack 40L', 855000, 30, 'Sports & Outdoors', 'PB002', 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500', true, 'Patagonia', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'REI Sleeping Bag', 'Lightweight sleeping bag', 675000, 40, 'Sports & Outdoors', 'RSB001', 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=500', true, 'REI', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Olay Moisturizer', 'Anti-aging face moisturizer', 112500, 150, 'Beauty & Personal Care', 'OM001', 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=500', true, 'Olay', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Neutrogena Cleanser', 'Gentle face cleanser', 40500, 200, 'Beauty & Personal Care', 'NC001', 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=500', true, 'Neutrogena', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'LOreal Shampoo', 'Repair and restore shampoo', 58500, 180, 'Beauty & Personal Care', 'LS001', 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=500', true, 'LOreal', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Maybelline Mascara', 'Volumizing mascara', 45000, 220, 'Beauty & Personal Care', 'MM001', 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500', true, 'Maybelline', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'CeraVe Cream', 'Hydrating facial cream', 90000, 130, 'Beauty & Personal Care', 'CC001', 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=500', true, 'CeraVe', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Dove Body Wash', 'Moisturizing body wash', 31500, 250, 'Beauty & Personal Care', 'DBW001', 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=500', true, 'Dove', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Gillette Razor', 'Multi-blade razor', 67500, 100, 'Beauty & Personal Care', 'GR001', 'https://images.unsplash.com/photo-1499013819532-e4ff41b00669?w=500', true, 'Gillette', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Clinique Serum', 'Vitamin C serum', 180000, 80, 'Beauty & Personal Care', 'CS001', 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=500', true, 'Clinique', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Pantene Conditioner', 'Strengthening conditioner', 54000, 160, 'Beauty & Personal Care', 'PC001', 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=500', true, 'Pantene', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Oral-B Toothbrush', 'Electric toothbrush', 405000, 60, 'Beauty & Personal Care', 'OB001', 'https://images.unsplash.com/photo-1499013819532-e4ff41b00669?w=500', true, 'Oral-B', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Michelin Tires', 'All-season tires set of 4', 2700000, 20, 'Automotive', 'MT001', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500', true, 'Michelin', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Mobil 1 Oil', 'Synthetic motor oil 5W-30', 225000, 100, 'Automotive', 'M1001', 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=500', true, 'Mobil', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Bosch Wipers', 'Windshield wiper blades', 112500, 80, 'Automotive', 'BW001', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500', true, 'Bosch', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Garmin GPS', 'Automotive GPS navigator', 810000, 45, 'Automotive', 'GG001', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500', true, 'Garmin', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'K&N Air Filter', 'High-performance air filter', 270000, 70, 'Automotive', 'KN001', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500', true, 'K&N', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Armor All Cleaner', 'All-purpose car cleaner', 45000, 150, 'Automotive', 'AA001', 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=500', true, 'Armor All', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Weather Tech Mats', 'Custom fit floor mats', 585000, 35, 'Automotive', 'WT001', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500', true, 'WeatherTech', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Optima Battery', 'High-performance car battery', 1125000, 25, 'Automotive', 'OB002', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500', true, 'Optima', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'STP Fuel Additive', 'Fuel system cleaner', 36000, 200, 'Automotive', 'STP001', 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=500', true, 'STP', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Thule Roof Rack', 'Vehicle roof cargo carrier', 1800000, 15, 'Automotive', 'TR001', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500', true, 'Thule', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Centrum Multivitamin', 'Daily multivitamin supplement', 90000, 180, 'Health & Wellness', 'CM001', 'https://images.unsplash.com/photo-1701201632697-7ec41bfee65f?w=500', true, 'Centrum', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Fitbit Charge 5', 'Fitness tracker with GPS', 900000, 40, 'Health & Wellness', 'FC5001', 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=500', true, 'Fitbit', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Protein Powder', 'Whey protein isolate', 225000, 90, 'Health & Wellness', 'PP001', 'https://images.unsplash.com/photo-1693996045300-521e9d08cabc?w=500', true, 'Optimum Nutrition', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Yoga Mat', 'Non-slip exercise mat', 157500, 120, 'Health & Wellness', 'YM001', 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500', true, 'Gaiam', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Resistance Bands', 'Exercise resistance band set', 90000, 150, 'Health & Wellness', 'RB001', 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500', true, 'TheraBand', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Essential Oils', 'Aromatherapy essential oil set', 180000, 80, 'Health & Wellness', 'EO001', 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500', true, 'DoTerra', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Massage Gun', 'Percussion therapy device', 900000, 30, 'Health & Wellness', 'MG001', 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500', true, 'Theragun', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Air Purifier', 'HEPA air purification system', 1350000, 25, 'Health & Wellness', 'AP001', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500', true, 'Honeywell', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Meditation Cushion', 'Ergonomic meditation pillow', 225000, 60, 'Health & Wellness', 'MC001', 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500', true, 'Zabuton', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Water Filter', 'Countertop water filtration system', 405000, 50, 'Health & Wellness', 'WF001', 'https://images.unsplash.com/photo-1596808566008-e726a22aa509?w=500', true, 'Brita', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'LEGO Creator Set', 'Building blocks construction set', 360000, 60, 'Toys & Games', 'LC001', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500', true, 'LEGO', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Monopoly Board Game', 'Classic property trading game', 112500, 100, 'Toys & Games', 'MBG001', 'https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=500', true, 'Hasbro', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Barbie Doll', 'Fashion doll with accessories', 67500, 150, 'Toys & Games', 'BD002', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500', true, 'Mattel', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Hot Wheels Track Set', 'Racing track with cars', 180000, 80, 'Toys & Games', 'HW001', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500', true, 'Hot Wheels', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Pokemon Cards', 'Trading card game booster pack', 22500, 300, 'Toys & Games', 'PC002', 'https://images.unsplash.com/photo-1611931960487-4932667079f1?w=500', true, 'Pokemon', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Nerf Blaster', 'Foam dart blaster toy', 135000, 70, 'Toys & Games', 'NB002', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500', true, 'Nerf', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Rubiks Cube', 'Classic 3x3 puzzle cube', 45000, 200, 'Toys & Games', 'RC001', 'https://images.unsplash.com/photo-1551731409-43eb3e517a1a?w=500', true, 'Rubiks', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Play-Doh Set', 'Modeling clay activity set', 90000, 120, 'Toys & Games', 'PD001', 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500', true, 'Play-Doh', NOW(), NOW();