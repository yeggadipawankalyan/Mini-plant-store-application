const db = require('../config/database-sqlite');

class Plant {
    // Get all plants with their categories
    static async getAll() {
        try {
            const query = `
                SELECT 
                    p.id,
                    p.name,
                    p.price,
                    p.description,
                    p.image_url,
                    p.in_stock,
                    p.created_at,
                    p.updated_at,
                    GROUP_CONCAT(c.name) as categories
                FROM plants p
                LEFT JOIN plant_categories pc ON p.id = pc.plant_id
                LEFT JOIN categories c ON pc.category_id = c.id
                GROUP BY p.id, p.name, p.price, p.description, p.image_url, p.in_stock, p.created_at, p.updated_at
                ORDER BY p.created_at DESC
            `;

            const result = await db.query(query);
            return result.rows.map(row => ({
                ...row,
                categories: row.categories ? row.categories.split(',') : []
            }));
        } catch (error) {
            throw new Error(`Error fetching plants: ${error.message}`);
        }
    }

    // Get plant by ID
    static async getById(id) {
        try {
            const query = `
                SELECT 
                    p.id,
                    p.name,
                    p.price,
                    p.description,
                    p.image_url,
                    p.in_stock,
                    p.created_at,
                    p.updated_at,
                    GROUP_CONCAT(c.name) as categories
                FROM plants p
                LEFT JOIN plant_categories pc ON p.id = pc.plant_id
                LEFT JOIN categories c ON pc.category_id = c.id
                WHERE p.id = ?
                GROUP BY p.id, p.name, p.price, p.description, p.image_url, p.in_stock, p.created_at, p.updated_at
            `;

            const result = await db.queryOne(query, [id]);
            if (result.rows.length === 0) {
                return null;
            }

            const plant = result.rows[0];
            return {
                ...plant,
                categories: plant.categories ? plant.categories.split(',') : []
            };
        } catch (error) {
            throw new Error(`Error fetching plant: ${error.message}`);
        }
    }

    // Search plants by name or category
    static async search(searchTerm, categoryFilter = null) {
        try {
            let query = `
                SELECT DISTINCT
                    p.id,
                    p.name,
                    p.price,
                    p.description,
                    p.image_url,
                    p.in_stock,
                    p.created_at,
                    p.updated_at,
                    GROUP_CONCAT(c.name) as categories
                FROM plants p
                LEFT JOIN plant_categories pc ON p.id = pc.plant_id
                LEFT JOIN categories c ON pc.category_id = c.id
                WHERE (
                    LOWER(p.name) LIKE LOWER(?) OR
                    LOWER(p.description) LIKE LOWER(?) OR
                    EXISTS (
                        SELECT 1 FROM plant_categories pc2 
                        JOIN categories c2 ON pc2.category_id = c2.id 
                        WHERE pc2.plant_id = p.id AND LOWER(c2.name) LIKE LOWER(?)
                    )
                )
            `;

            const params = [`%${searchTerm}%`, `%${searchTerm}%`, `%${searchTerm}%`];

            if (categoryFilter && categoryFilter !== 'all') {
                query += ` AND EXISTS (
                    SELECT 1 FROM plant_categories pc3 
                    JOIN categories c3 ON pc3.category_id = c3.id 
                    WHERE pc3.plant_id = p.id AND c3.name = ?
                )`;
                params.push(categoryFilter);
            }

            query += `
                GROUP BY p.id, p.name, p.price, p.description, p.image_url, p.in_stock, p.created_at, p.updated_at
                ORDER BY p.created_at DESC
            `;

            const result = await db.query(query, params);
            return result.rows.map(row => ({
                ...row,
                categories: row.categories ? row.categories.split(',') : []
            }));
        } catch (error) {
            throw new Error(`Error searching plants: ${error.message}`);
        }
    }

    // Create new plant
    static async create(plantData) {
        try {
            // Handle image data - if it's a base64 data URL, truncate it or use a placeholder
            let imageUrl = plantData.imageUrl;
            if (imageUrl && imageUrl.startsWith('data:image/')) {
                // For base64 images, we'll use a placeholder for now
                // In production, you'd want to upload to a cloud service like AWS S3
                imageUrl = 'https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=400&h=400&fit=crop';
            }

            // Insert plant
            const plantResult = await db.run(
                'INSERT INTO plants (name, price, description, image_url, in_stock) VALUES (?, ?, ?, ?, ?)',
                [
                    plantData.name,
                    plantData.price,
                    plantData.description || 'A beautiful plant.',
                    imageUrl,
                    plantData.inStock ? 1 : 0
                ]
            );

            const plantId = plantResult.lastID;

            // Insert categories if provided
            if (plantData.categories && plantData.categories.length > 0) {
                for (const categoryName of plantData.categories) {
                    // Get or create category
                    let categoryResult = await db.queryOne(
                        'SELECT id FROM categories WHERE name = ?',
                        [categoryName]
                    );

                    let categoryId;
                    if (categoryResult.rows.length === 0) {
                        // Create new category
                        const newCategoryResult = await db.run(
                            'INSERT INTO categories (name) VALUES (?)',
                            [categoryName]
                        );
                        categoryId = newCategoryResult.lastID;
                    } else {
                        categoryId = categoryResult.rows[0].id;
                    }

                    // Link plant to category
                    await db.run(
                        'INSERT INTO plant_categories (plant_id, category_id) VALUES (?, ?)',
                        [plantId, categoryId]
                    );
                }
            }

            // Return the created plant with categories
            return await this.getById(plantId);
        } catch (error) {
            throw new Error(`Error creating plant: ${error.message}`);
        }
    }

    // Update plant
    static async update(id, plantData) {
        try {
            // Handle image data - if it's a base64 data URL, use a placeholder
            let imageUrl = plantData.imageUrl;
            if (imageUrl && imageUrl.startsWith('data:image/')) {
                // For base64 images, we'll use a placeholder for now
                imageUrl = 'https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=400&h=400&fit=crop';
            }

            // Update plant
            const plantResult = await db.run(
                'UPDATE plants SET name = ?, price = ?, description = ?, image_url = ?, in_stock = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
                [
                    plantData.name,
                    plantData.price,
                    plantData.description || 'A beautiful plant.',
                    imageUrl,
                    plantData.inStock ? 1 : 0,
                    id
                ]
            );

            if (plantResult.changes === 0) {
                throw new Error('Plant not found');
            }

            // Update categories if provided
            if (plantData.categories) {
                // Remove existing categories
                await db.run('DELETE FROM plant_categories WHERE plant_id = ?', [id]);

                // Add new categories
                for (const categoryName of plantData.categories) {
                    // Get or create category
                    let categoryResult = await db.queryOne(
                        'SELECT id FROM categories WHERE name = ?',
                        [categoryName]
                    );

                    let categoryId;
                    if (categoryResult.rows.length === 0) {
                        // Create new category
                        const newCategoryResult = await db.run(
                            'INSERT INTO categories (name) VALUES (?)',
                            [categoryName]
                        );
                        categoryId = newCategoryResult.lastID;
                    } else {
                        categoryId = categoryResult.rows[0].id;
                    }

                    // Link plant to category
                    await db.run(
                        'INSERT INTO plant_categories (plant_id, category_id) VALUES (?, ?)',
                        [id, categoryId]
                    );
                }
            }

            // Return the updated plant with categories
            return await this.getById(id);
        } catch (error) {
            throw new Error(`Error updating plant: ${error.message}`);
        }
    }

    // Delete plant
    static async delete(id) {
        try {
            const result = await db.run('DELETE FROM plants WHERE id = ?', [id]);
            if (result.changes === 0) {
                throw new Error('Plant not found');
            }
            return { id };
        } catch (error) {
            throw new Error(`Error deleting plant: ${error.message}`);
        }
    }

    // Get all categories
    static async getCategories() {
        try {
            const result = await db.query('SELECT * FROM categories ORDER BY name');
            return result.rows;
        } catch (error) {
            throw new Error(`Error fetching categories: ${error.message}`);
        }
    }

    // Get storage info (total plants, custom plants)
    static async getStorageInfo() {
        try {
            const result = await db.queryOne('SELECT COUNT(*) as total FROM plants');
            const totalPlants = parseInt(result.rows[0].total);

            return {
                totalPlants,
                customPlants: totalPlants
            };
        } catch (error) {
            throw new Error(`Error getting storage info: ${error.message}`);
        }
    }
}

module.exports = Plant;
