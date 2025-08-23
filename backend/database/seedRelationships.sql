-- Seed plant-category relationships for all 50 plants
-- This matches the categories from the frontend data

-- Snake Plant
INSERT INTO plant_categories (plant_id, category_id) 
SELECT p.id, c.id FROM plants p, categories c 
WHERE p.name = 'Snake Plant' AND c.name IN ('Indoor', 'Air Purifying', 'Low Maintenance')
ON CONFLICT DO NOTHING;

-- Monstera Deliciosa
INSERT INTO plant_categories (plant_id, category_id) 
SELECT p.id, c.id FROM plants p, categories c 
WHERE p.name = 'Monstera Deliciosa' AND c.name IN ('Indoor', 'Home Decor')
ON CONFLICT DO NOTHING;

-- Spider Plant
INSERT INTO plant_categories (plant_id, category_id) 
SELECT p.id, c.id FROM plants p, categories c 
WHERE p.name = 'Spider Plant' AND c.name IN ('Indoor', 'Air Purifying', 'Pet-Friendly')
ON CONFLICT DO NOTHING;

-- Pothos
INSERT INTO plant_categories (plant_id, category_id) 
SELECT p.id, c.id FROM plants p, categories c 
WHERE p.name = 'Pothos' AND c.name IN ('Indoor', 'Low Maintenance', 'Home Decor')
ON CONFLICT DO NOTHING;

-- ZZ Plant
INSERT INTO plant_categories (plant_id, category_id) 
SELECT p.id, c.id FROM plants p, categories c 
WHERE p.name = 'ZZ Plant' AND c.name IN ('Indoor', 'Low Maintenance', 'Air Purifying')
ON CONFLICT DO NOTHING;

-- Fiddle Leaf Fig
INSERT INTO plant_categories (plant_id, category_id) 
SELECT p.id, c.id FROM plants p, categories c 
WHERE p.name = 'Fiddle Leaf Fig' AND c.name IN ('Indoor', 'Home Decor')
ON CONFLICT DO NOTHING;

-- Echeveria
INSERT INTO plant_categories (plant_id, category_id) 
SELECT p.id, c.id FROM plants p, categories c 
WHERE p.name = 'Echeveria' AND c.name IN ('Succulent', 'Indoor', 'Low Maintenance')
ON CONFLICT DO NOTHING;

-- Aloe Vera
INSERT INTO plant_categories (plant_id, category_id) 
SELECT p.id, c.id FROM plants p, categories c 
WHERE p.name = 'Aloe Vera' AND c.name IN ('Succulent', 'Indoor')
ON CONFLICT DO NOTHING;

-- Peace Lily
INSERT INTO plant_categories (plant_id, category_id) 
SELECT p.id, c.id FROM plants p, categories c 
WHERE p.name = 'Peace Lily' AND c.name IN ('Indoor', 'Air Purifying', 'Flowering')
ON CONFLICT DO NOTHING;

-- Lavender
INSERT INTO plant_categories (plant_id, category_id) 
SELECT p.id, c.id FROM plants p, categories c 
WHERE p.name = 'Lavender' AND c.name IN ('Outdoor', 'Flowering', 'Herb')
ON CONFLICT DO NOTHING;

-- Rubber Plant
INSERT INTO plant_categories (plant_id, category_id) 
SELECT p.id, c.id FROM plants p, categories c 
WHERE p.name = 'Rubber Plant' AND c.name IN ('Indoor', 'Home Decor')
ON CONFLICT DO NOTHING;

-- Calathea Orbifolia
INSERT INTO plant_categories (plant_id, category_id) 
SELECT p.id, c.id FROM plants p, categories c 
WHERE p.name = 'Calathea Orbifolia' AND c.name IN ('Indoor', 'Pet-Friendly', 'Home Decor')
ON CONFLICT DO NOTHING;

-- Bird of Paradise
INSERT INTO plant_categories (plant_id, category_id) 
SELECT p.id, c.id FROM plants p, categories c 
WHERE p.name = 'Bird of Paradise' AND c.name IN ('Indoor', 'Home Decor')
ON CONFLICT DO NOTHING;

-- Jade Plant
INSERT INTO plant_categories (plant_id, category_id) 
SELECT p.id, c.id FROM plants p, categories c 
WHERE p.name = 'Jade Plant' AND c.name IN ('Succulent', 'Indoor', 'Low Maintenance')
ON CONFLICT DO NOTHING;

-- Boston Fern
INSERT INTO plant_categories (plant_id, category_id) 
SELECT p.id, c.id FROM plants p, categories c 
WHERE p.name = 'Boston Fern' AND c.name IN ('Indoor', 'Pet-Friendly', 'Air Purifying')
ON CONFLICT DO NOTHING;

-- Anthurium
INSERT INTO plant_categories (plant_id, category_id) 
SELECT p.id, c.id FROM plants p, categories c 
WHERE p.name = 'Anthurium' AND c.name IN ('Indoor', 'Flowering')
ON CONFLICT DO NOTHING;

-- String of Pearls
INSERT INTO plant_categories (plant_id, category_id) 
SELECT p.id, c.id FROM plants p, categories c 
WHERE p.name = 'String of Pearls' AND c.name IN ('Succulent', 'Indoor', 'Home Decor')
ON CONFLICT DO NOTHING;

-- Orchid
INSERT INTO plant_categories (plant_id, category_id) 
SELECT p.id, c.id FROM plants p, categories c 
WHERE p.name = 'Orchid' AND c.name IN ('Indoor', 'Flowering', 'Home Decor')
ON CONFLICT DO NOTHING;

-- Rosemary
INSERT INTO plant_categories (plant_id, category_id) 
SELECT p.id, c.id FROM plants p, categories c 
WHERE p.name = 'Rosemary' AND c.name IN ('Outdoor', 'Herb')
ON CONFLICT DO NOTHING;

-- Basil
INSERT INTO plant_categories (plant_id, category_id) 
SELECT p.id, c.id FROM plants p, categories c 
WHERE p.name = 'Basil' AND c.name IN ('Outdoor', 'Herb')
ON CONFLICT DO NOTHING;

-- Mint
INSERT INTO plant_categories (plant_id, category_id) 
SELECT p.id, c.id FROM plants p, categories c 
WHERE p.name = 'Mint' AND c.name IN ('Outdoor', 'Herb', 'Low Maintenance')
ON CONFLICT DO NOTHING;

-- Chinese Money Plant
INSERT INTO plant_categories (plant_id, category_id) 
SELECT p.id, c.id FROM plants p, categories c 
WHERE p.name = 'Chinese Money Plant' AND c.name IN ('Indoor', 'Pet-Friendly')
ON CONFLICT DO NOTHING;

-- Air Plant (Tillandsia)
INSERT INTO plant_categories (plant_id, category_id) 
SELECT p.id, c.id FROM plants p, categories c 
WHERE p.name = 'Air Plant (Tillandsia)' AND c.name IN ('Indoor', 'Low Maintenance', 'Home Decor')
ON CONFLICT DO NOTHING;

-- Croton
INSERT INTO plant_categories (plant_id, category_id) 
SELECT p.id, c.id FROM plants p, categories c 
WHERE p.name = 'Croton' AND c.name IN ('Indoor', 'Home Decor')
ON CONFLICT DO NOTHING;

-- Areca Palm
INSERT INTO plant_categories (plant_id, category_id) 
SELECT p.id, c.id FROM plants p, categories c 
WHERE p.name = 'Areca Palm' AND c.name IN ('Indoor', 'Pet-Friendly', 'Air Purifying')
ON CONFLICT DO NOTHING;

-- Marigold
INSERT INTO plant_categories (plant_id, category_id) 
SELECT p.id, c.id FROM plants p, categories c 
WHERE p.name = 'Marigold' AND c.name IN ('Outdoor', 'Flowering')
ON CONFLICT DO NOTHING;

-- Petunia
INSERT INTO plant_categories (plant_id, category_id) 
SELECT p.id, c.id FROM plants p, categories c 
WHERE p.name = 'Petunia' AND c.name IN ('Outdoor', 'Flowering')
ON CONFLICT DO NOTHING;

-- Hoya Carnosa
INSERT INTO plant_categories (plant_id, category_id) 
SELECT p.id, c.id FROM plants p, categories c 
WHERE p.name = 'Hoya Carnosa' AND c.name IN ('Indoor', 'Flowering', 'Low Maintenance')
ON CONFLICT DO NOTHING;

-- Yucca Plant
INSERT INTO plant_categories (plant_id, category_id) 
SELECT p.id, c.id FROM plants p, categories c 
WHERE p.name = 'Yucca Plant' AND c.name IN ('Indoor', 'Outdoor', 'Low Maintenance')
ON CONFLICT DO NOTHING;

-- Begonia
INSERT INTO plant_categories (plant_id, category_id) 
SELECT p.id, c.id FROM plants p, categories c 
WHERE p.name = 'Begonia' AND c.name IN ('Indoor', 'Flowering', 'Home Decor')
ON CONFLICT DO NOTHING;

-- Dracaena Marginata
INSERT INTO plant_categories (plant_id, category_id) 
SELECT p.id, c.id FROM plants p, categories c 
WHERE p.name = 'Dracaena Marginata' AND c.name IN ('Indoor', 'Air Purifying')
ON CONFLICT DO NOTHING;

-- Aglaonema
INSERT INTO plant_categories (plant_id, category_id) 
SELECT p.id, c.id FROM plants p, categories c 
WHERE p.name = 'Aglaonema' AND c.name IN ('Indoor', 'Low Maintenance', 'Home Decor')
ON CONFLICT DO NOTHING;

-- Haworthia
INSERT INTO plant_categories (plant_id, category_id) 
SELECT p.id, c.id FROM plants p, categories c 
WHERE p.name = 'Haworthia' AND c.name IN ('Succulent', 'Indoor', 'Low Maintenance')
ON CONFLICT DO NOTHING;

-- African Violet
INSERT INTO plant_categories (plant_id, category_id) 
SELECT p.id, c.id FROM plants p, categories c 
WHERE p.name = 'African Violet' AND c.name IN ('Indoor', 'Flowering', 'Pet-Friendly')
ON CONFLICT DO NOTHING;

-- Dieffenbachia
INSERT INTO plant_categories (plant_id, category_id) 
SELECT p.id, c.id FROM plants p, categories c 
WHERE p.name = 'Dieffenbachia' AND c.name IN ('Indoor', 'Home Decor')
ON CONFLICT DO NOTHING;

-- Pansy
INSERT INTO plant_categories (plant_id, category_id) 
SELECT p.id, c.id FROM plants p, categories c 
WHERE p.name = 'Pansy' AND c.name IN ('Outdoor', 'Flowering')
ON CONFLICT DO NOTHING;

-- Coleus
INSERT INTO plant_categories (plant_id, category_id) 
SELECT p.id, c.id FROM plants p, categories c 
WHERE p.name = 'Coleus' AND c.name IN ('Outdoor', 'Home Decor')
ON CONFLICT DO NOTHING;

-- Zinnia
INSERT INTO plant_categories (plant_id, category_id) 
SELECT p.id, c.id FROM plants p, categories c 
WHERE p.name = 'Zinnia' AND c.name IN ('Outdoor', 'Flowering')
ON CONFLICT DO NOTHING;

-- Philodendron Heartleaf
INSERT INTO plant_categories (plant_id, category_id) 
SELECT p.id, c.id FROM plants p, categories c 
WHERE p.name = 'Philodendron Heartleaf' AND c.name IN ('Indoor', 'Low Maintenance')
ON CONFLICT DO NOTHING;

-- Cast Iron Plant
INSERT INTO plant_categories (plant_id, category_id) 
SELECT p.id, c.id FROM plants p, categories c 
WHERE p.name = 'Cast Iron Plant' AND c.name IN ('Indoor', 'Low Maintenance')
ON CONFLICT DO NOTHING;

-- Burro's Tail
INSERT INTO plant_categories (plant_id, category_id) 
SELECT p.id, c.id FROM plants p, categories c 
WHERE p.name = 'Burro''s Tail' AND c.name IN ('Succulent', 'Indoor', 'Home Decor')
ON CONFLICT DO NOTHING;

-- Thyme
INSERT INTO plant_categories (plant_id, category_id) 
SELECT p.id, c.id FROM plants p, categories c 
WHERE p.name = 'Thyme' AND c.name IN ('Outdoor', 'Herb')
ON CONFLICT DO NOTHING;

-- Kentia Palm
INSERT INTO plant_categories (plant_id, category_id) 
SELECT p.id, c.id FROM plants p, categories c 
WHERE p.name = 'Kentia Palm' AND c.name IN ('Indoor', 'Home Decor')
ON CONFLICT DO NOTHING;

-- Gloxinia
INSERT INTO plant_categories (plant_id, category_id) 
SELECT p.id, c.id FROM plants p, categories c 
WHERE p.name = 'Gloxinia' AND c.name IN ('Indoor', 'Flowering')
ON CONFLICT DO NOTHING;

-- Ponytail Palm
INSERT INTO plant_categories (plant_id, category_id) 
SELECT p.id, c.id FROM plants p, categories c 
WHERE p.name = 'Ponytail Palm' AND c.name IN ('Indoor', 'Succulent', 'Low Maintenance')
ON CONFLICT DO NOTHING;

-- Kalanchoe
INSERT INTO plant_categories (plant_id, category_id) 
SELECT p.id, c.id FROM plants p, categories c 
WHERE p.name = 'Kalanchoe' AND c.name IN ('Succulent', 'Indoor', 'Flowering')
ON CONFLICT DO NOTHING;

-- Fittonia (Nerve Plant)
INSERT INTO plant_categories (plant_id, category_id) 
SELECT p.id, c.id FROM plants p, categories c 
WHERE p.name = 'Fittonia (Nerve Plant)' AND c.name IN ('Indoor', 'Pet-Friendly', 'Home Decor')
ON CONFLICT DO NOTHING;

-- Peperomia
INSERT INTO plant_categories (plant_id, category_id) 
SELECT p.id, c.id FROM plants p, categories c 
WHERE p.name = 'Peperomia' AND c.name IN ('Indoor', 'Pet-Friendly', 'Low Maintenance')
ON CONFLICT DO NOTHING;

-- Geranium
INSERT INTO plant_categories (plant_id, category_id) 
SELECT p.id, c.id FROM plants p, categories c 
WHERE p.name = 'Geranium' AND c.name IN ('Outdoor', 'Flowering')
ON CONFLICT DO NOTHING;

-- Alocasia Polly
INSERT INTO plant_categories (plant_id, category_id) 
SELECT p.id, c.id FROM plants p, categories c 
WHERE p.name = 'Alocasia Polly' AND c.name IN ('Indoor', 'Home Decor')
ON CONFLICT DO NOTHING;
