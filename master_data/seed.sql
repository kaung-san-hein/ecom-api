CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

INSERT INTO products (
  id, name, description, price, stock, category, sku, images, "isActive", brand, "createdAt", "updatedAt"
)
SELECT uuid_generate_v4(), 'iPhone 15 Pro', 'Latest Apple smartphone with A17 Pro chip', 999.99, 50, 'Electronics', 'IPH15P001', 'https://example.com/iphone15pro.jpg', true, 'Apple', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Samsung Galaxy S24', 'Premium Android smartphone with AI features', 899.99, 45, 'Electronics', 'SGS24001', 'https://example.com/galaxys24.jpg', true, 'Samsung', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'MacBook Air M3', 'Ultra-thin laptop with M3 chip', 1299.99, 30, 'Electronics', 'MBA13M3', 'https://example.com/macbookair.jpg', true, 'Apple', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Dell XPS 13', 'Premium ultrabook with Intel processor', 1099.99, 25, 'Electronics', 'DXPS13001', 'https://example.com/dellxps13.jpg', true, 'Dell', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Sony WH-1000XM5', 'Noise-canceling wireless headphones', 399.99, 60, 'Electronics', 'SWH1000XM5', 'https://example.com/sonywh1000.jpg', true, 'Sony', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'AirPods Pro 2', 'Apple wireless earbuds with active noise cancellation', 249.99, 80, 'Electronics', 'APP2001', 'https://example.com/airpodspro2.jpg', true, 'Apple', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'iPad Pro 12.9', 'Professional tablet with M2 chip', 1099.99, 35, 'Electronics', 'IPP129M2', 'https://example.com/ipadpro.jpg', true, 'Apple', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Nintendo Switch OLED', 'Gaming console with OLED screen', 349.99, 40, 'Electronics', 'NSW001', 'https://example.com/switcholed.jpg', true, 'Nintendo', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'PlayStation 5', 'Latest Sony gaming console', 499.99, 20, 'Electronics', 'PS5001', 'https://example.com/ps5.jpg', true, 'Sony', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Xbox Series X', 'Microsoft gaming console', 499.99, 22, 'Electronics', 'XSX001', 'https://example.com/xboxseriesx.jpg', true, 'Microsoft', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Nike Air Max 90', 'Classic running shoes', 119.99, 100, 'Clothing', 'NAM90001', 'https://example.com/airmax90.jpg', true, 'Nike', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Adidas Ultraboost 22', 'Performance running shoes', 179.99, 85, 'Clothing', 'AUB22001', 'https://example.com/ultraboost.jpg', true, 'Adidas', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Levis 501 Jeans', 'Classic straight-leg jeans', 79.99, 120, 'Clothing', 'L501001', 'https://example.com/levis501.jpg', true, 'Levis', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'North Face Jacket', 'Waterproof outdoor jacket', 199.99, 45, 'Clothing', 'TNF001', 'https://example.com/northface.jpg', true, 'The North Face', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Ralph Lauren Polo', 'Classic polo shirt', 89.99, 70, 'Clothing', 'RL001', 'https://example.com/ralphlauren.jpg', true, 'Ralph Lauren', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Champion Hoodie', 'Comfortable cotton hoodie', 49.99, 90, 'Clothing', 'CH001', 'https://example.com/champion.jpg', true, 'Champion', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Nike Dri-FIT T-Shirt', 'Moisture-wicking athletic shirt', 29.99, 150, 'Clothing', 'NDT001', 'https://example.com/nikedrifit.jpg', true, 'Nike', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Patagonia Fleece', 'Eco-friendly fleece jacket', 139.99, 55, 'Clothing', 'PF001', 'https://example.com/patagonia.jpg', true, 'Patagonia', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Converse Chuck Taylor', 'Classic canvas sneakers', 64.99, 110, 'Clothing', 'CCT001', 'https://example.com/converse.jpg', true, 'Converse', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Under Armour Shorts', 'Athletic performance shorts', 39.99, 80, 'Clothing', 'UA001', 'https://example.com/underarmour.jpg', true, 'Under Armour', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Dyson V15 Vacuum', 'Powerful cordless vacuum cleaner', 749.99, 25, 'Home & Garden', 'DV15001', 'https://example.com/dysonv15.jpg', true, 'Dyson', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'KitchenAid Mixer', 'Stand mixer for baking', 379.99, 35, 'Home & Garden', 'KAM001', 'https://example.com/kitchenaid.jpg', true, 'KitchenAid', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Instant Pot Duo', 'Multi-use pressure cooker', 99.99, 60, 'Home & Garden', 'IPD001', 'https://example.com/instantpot.jpg', true, 'Instant Pot', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Roomba i7+', 'Robot vacuum with auto-empty', 599.99, 20, 'Home & Garden', 'RI7001', 'https://example.com/roomba.jpg', true, 'iRobot', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Philips Hue Bulbs', 'Smart LED light bulbs 4-pack', 199.99, 40, 'Home & Garden', 'PHB001', 'https://example.com/philipshue.jpg', true, 'Philips', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Nest Thermostat', 'Smart home thermostat', 249.99, 30, 'Home & Garden', 'NT001', 'https://example.com/nest.jpg', true, 'Google', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Weber Grill', 'Gas barbecue grill', 499.99, 15, 'Home & Garden', 'WG001', 'https://example.com/weber.jpg', true, 'Weber', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Keurig Coffee Maker', 'Single-serve coffee machine', 129.99, 50, 'Home & Garden', 'KCM001', 'https://example.com/keurig.jpg', true, 'Keurig', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Ninja Blender', 'High-performance blender', 159.99, 45, 'Home & Garden', 'NB001', 'https://example.com/ninja.jpg', true, 'Ninja', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Shark Steam Mop', 'Steam cleaning mop', 89.99, 35, 'Home & Garden', 'SSM001', 'https://example.com/sharkmop.jpg', true, 'Shark', NOW(), NOW()
UNION all
SELECT uuid_generate_v4(), 'The Great Gatsby', 'Classic American novel by F. Scott Fitzgerald', 14.99, 200, 'Books', 'TGG001', 'https://example.com/gatsby.jpg', true, 'Scribner', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'To Kill a Mockingbird', 'Harper Lee Pulitzer Prize winner', 13.99, 180, 'Books', 'TKAM001', 'https://example.com/mockingbird.jpg', true, 'Harper Collins', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), '1984', 'George Orwell dystopian masterpiece', 15.99, 220, 'Books', 'G1984001', 'https://example.com/1984.jpg', true, 'Penguin', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Harry Potter Box Set', 'Complete 7-book series', 59.99, 75, 'Books', 'HP001', 'https://example.com/harrypotter.jpg', true, 'Scholastic', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'The Catcher in the Rye', 'J.D. Salinger coming-of-age novel', 16.99, 150, 'Books', 'TCITR001', 'https://example.com/catcher.jpg', true, 'Little Brown', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Pride and Prejudice', 'Jane Austen romantic classic', 12.99, 190, 'Books', 'PAP001', 'https://example.com/pride.jpg', true, 'Penguin Classics', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'The Lord of the Rings', 'Tolkien epic fantasy trilogy', 24.99, 120, 'Books', 'LOTR001', 'https://example.com/lotr.jpg', true, 'Houghton Mifflin', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Atomic Habits', 'James Clear guide to building good habits', 18.99, 100, 'Books', 'AH001', 'https://example.com/atomichabits.jpg', true, 'Avery', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'The Midnight Library', 'Matt Haig philosophical novel', 17.99, 85, 'Books', 'TML001', 'https://example.com/midnightlib.jpg', true, 'Viking', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Educated', 'Tara Westover memoir', 16.99, 95, 'Books', 'EDU001', 'https://example.com/educated.jpg', true, 'Random House', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Wilson Tennis Racket', 'Professional tennis racket', 199.99, 40, 'Sports & Outdoors', 'WTR001', 'https://example.com/wilson.jpg', true, 'Wilson', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Spalding Basketball', 'Official size basketball', 29.99, 80, 'Sports & Outdoors', 'SB001', 'https://example.com/spalding.jpg', true, 'Spalding', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Yeti Cooler', 'Insulated cooler for camping', 349.99, 25, 'Sports & Outdoors', 'YC001', 'https://example.com/yeti.jpg', true, 'Yeti', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Coleman Tent', '4-person camping tent', 129.99, 35, 'Sports & Outdoors', 'CT001', 'https://example.com/coleman.jpg', true, 'Coleman', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Hydro Flask Water Bottle', 'Insulated stainless steel bottle', 44.99, 120, 'Sports & Outdoors', 'HF001', 'https://example.com/hydroflask.jpg', true, 'Hydro Flask', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Bowflex Dumbbells', 'Adjustable weight dumbbells', 399.99, 15, 'Sports & Outdoors', 'BD001', 'https://example.com/bowflex.jpg', true, 'Bowflex', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Peloton Bike', 'Indoor cycling bike', 1495.00, 10, 'Sports & Outdoors', 'PB001', 'https://example.com/peloton.jpg', true, 'Peloton', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Garmin Watch', 'GPS fitness watch', 299.99, 50, 'Sports & Outdoors', 'GW001', 'https://example.com/garmin.jpg', true, 'Garmin', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Patagonia Backpack', 'Hiking backpack 40L', 189.99, 30, 'Sports & Outdoors', 'PB002', 'https://example.com/patagoniapack.jpg', true, 'Patagonia', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'REI Sleeping Bag', 'Lightweight sleeping bag', 149.99, 40, 'Sports & Outdoors', 'RSB001', 'https://example.com/rei.jpg', true, 'REI', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Olay Moisturizer', 'Anti-aging face moisturizer', 24.99, 150, 'Beauty & Personal Care', 'OM001', 'https://example.com/olay.jpg', true, 'Olay', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Neutrogena Cleanser', 'Gentle face cleanser', 8.99, 200, 'Beauty & Personal Care', 'NC001', 'https://example.com/neutrogena.jpg', true, 'Neutrogena', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'LOreal Shampoo', 'Repair and restore shampoo', 12.99, 180, 'Beauty & Personal Care', 'LS001', 'https://example.com/loreal.jpg', true, 'LOreal', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Maybelline Mascara', 'Volumizing mascara', 9.99, 220, 'Beauty & Personal Care', 'MM001', 'https://example.com/maybelline.jpg', true, 'Maybelline', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'CeraVe Cream', 'Hydrating facial cream', 19.99, 130, 'Beauty & Personal Care', 'CC001', 'https://example.com/cerave.jpg', true, 'CeraVe', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Dove Body Wash', 'Moisturizing body wash', 6.99, 250, 'Beauty & Personal Care', 'DBW001', 'https://example.com/dove.jpg', true, 'Dove', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Gillette Razor', 'Multi-blade razor', 14.99, 100, 'Beauty & Personal Care', 'GR001', 'https://example.com/gillette.jpg', true, 'Gillette', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Clinique Serum', 'Vitamin C serum', 39.99, 80, 'Beauty & Personal Care', 'CS001', 'https://example.com/clinique.jpg', true, 'Clinique', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Pantene Conditioner', 'Strengthening conditioner', 11.99, 160, 'Beauty & Personal Care', 'PC001', 'https://example.com/pantene.jpg', true, 'Pantene', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Oral-B Toothbrush', 'Electric toothbrush', 89.99, 60, 'Beauty & Personal Care', 'OB001', 'https://example.com/oralb.jpg', true, 'Oral-B', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Michelin Tires', 'All-season tires set of 4', 599.99, 20, 'Automotive', 'MT001', 'https://example.com/michelin.jpg', true, 'Michelin', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Mobil 1 Oil', 'Synthetic motor oil 5W-30', 49.99, 100, 'Automotive', 'M1001', 'https://example.com/mobil1.jpg', true, 'Mobil', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Bosch Wipers', 'Windshield wiper blades', 24.99, 80, 'Automotive', 'BW001', 'https://example.com/bosch.jpg', true, 'Bosch', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Garmin GPS', 'Automotive GPS navigator', 179.99, 45, 'Automotive', 'GG001', 'https://example.com/garmingps.jpg', true, 'Garmin', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'K&N Air Filter', 'High-performance air filter', 59.99, 70, 'Automotive', 'KN001', 'https://example.com/knfilter.jpg', true, 'K&N', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Armor All Cleaner', 'All-purpose car cleaner', 9.99, 150, 'Automotive', 'AA001', 'https://example.com/armorall.jpg', true, 'Armor All', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Weather Tech Mats', 'Custom fit floor mats', 129.99, 35, 'Automotive', 'WT001', 'https://example.com/weathertech.jpg', true, 'WeatherTech', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Optima Battery', 'High-performance car battery', 249.99, 25, 'Automotive', 'OB002', 'https://example.com/optima.jpg', true, 'Optima', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'STP Fuel Additive', 'Fuel system cleaner', 7.99, 200, 'Automotive', 'STP001', 'https://example.com/stp.jpg', true, 'STP', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Thule Roof Rack', 'Vehicle roof cargo carrier', 399.99, 15, 'Automotive', 'TR001', 'https://example.com/thule.jpg', true, 'Thule', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Centrum Multivitamin', 'Daily multivitamin supplement', 19.99, 180, 'Health & Wellness', 'CM001', 'https://example.com/centrum.jpg', true, 'Centrum', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Fitbit Charge 5', 'Fitness tracker with GPS', 199.99, 40, 'Health & Wellness', 'FC5001', 'https://example.com/fitbit.jpg', true, 'Fitbit', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Protein Powder', 'Whey protein isolate', 49.99, 90, 'Health & Wellness', 'PP001', 'https://example.com/protein.jpg', true, 'Optimum Nutrition', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Yoga Mat', 'Non-slip exercise mat', 34.99, 120, 'Health & Wellness', 'YM001', 'https://example.com/yogamat.jpg', true, 'Gaiam', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Resistance Bands', 'Exercise resistance band set', 19.99, 150, 'Health & Wellness', 'RB001', 'https://example.com/resistance.jpg', true, 'TheraBand', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Essential Oils', 'Aromatherapy essential oil set', 39.99, 80, 'Health & Wellness', 'EO001', 'https://example.com/oils.jpg', true, 'DoTerra', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Massage Gun', 'Percussion therapy device', 199.99, 30, 'Health & Wellness', 'MG001', 'https://example.com/massage.jpg', true, 'Theragun', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Air Purifier', 'HEPA air purification system', 299.99, 25, 'Health & Wellness', 'AP001', 'https://example.com/airpurifier.jpg', true, 'Honeywell', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Meditation Cushion', 'Ergonomic meditation pillow', 49.99, 60, 'Health & Wellness', 'MC001', 'https://example.com/meditation.jpg', true, 'Zabuton', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Water Filter', 'Countertop water filtration system', 89.99, 50, 'Health & Wellness', 'WF001', 'https://example.com/waterfilter.jpg', true, 'Brita', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'LEGO Creator Set', 'Building blocks construction set', 79.99, 60, 'Toys & Games', 'LC001', 'https://example.com/lego.jpg', true, 'LEGO', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Monopoly Board Game', 'Classic property trading game', 24.99, 100, 'Toys & Games', 'MBG001', 'https://example.com/monopoly.jpg', true, 'Hasbro', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Barbie Doll', 'Fashion doll with accessories', 14.99, 150, 'Toys & Games', 'BD002', 'https://example.com/barbie.jpg', true, 'Mattel', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Hot Wheels Track Set', 'Racing track with cars', 39.99, 80, 'Toys & Games', 'HW001', 'https://example.com/hotwheels.jpg', true, 'Hot Wheels', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Pokemon Cards', 'Trading card game booster pack', 4.99, 300, 'Toys & Games', 'PC002', 'https://example.com/pokemon.jpg', true, 'Pokemon', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Nerf Blaster', 'Foam dart blaster toy', 29.99, 70, 'Toys & Games', 'NB002', 'https://example.com/nerf.jpg', true, 'Nerf', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Rubiks Cube', 'Classic 3x3 puzzle cube', 9.99, 200, 'Toys & Games', 'RC001', 'https://example.com/rubiks.jpg', true, 'Rubiks', NOW(), NOW()
UNION ALL
SELECT uuid_generate_v4(), 'Play-Doh Set', 'Modeling clay activity set', 19.99, 120, 'Toys & Games', 'PD001', 'https://example.com/playdoh.jpg', true, 'Play-Doh', NOW(), NOW()
COMMIT;