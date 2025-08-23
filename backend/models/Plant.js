const db = require('../config/database');

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
          ARRAY_AGG(c.name) as categories
        FROM plants p
        LEFT JOIN plant_categories pc ON p.id = pc.plant_id
        LEFT JOIN categories c ON pc.category_id = c.id
        GROUP BY p.id, p.name, p.price, p.description, p.image_url, p.in_stock, p.created_at, p.updated_at
        ORDER BY p.created_at DESC
      `;

            const result = await db.query(query);
            return result.rows.map(row => ({
                ...row,
                categories: row.categories.filter(cat => cat !== null) // Remove null values
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
          ARRAY_AGG(c.name) as categories
        FROM plants p
        LEFT JOIN plant_categories pc ON p.id = pc.plant_id
        LEFT JOIN categories c ON pc.category_id = c.id
        WHERE p.id = $1
        GROUP BY p.id, p.name, p.price, p.description, p.image_url, p.in_stock, p.created_at, p.updated_at
      `;

            const result = await db.query(query, [id]);
            if (result.rows.length === 0) {
                return null;
            }

            const plant = result.rows[0];
            return {
                ...plant,
                categories: plant.categories.filter(cat => cat !== null)
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
          ARRAY_AGG(c.name) as categories
        FROM plants p
        LEFT JOIN plant_categories pc ON p.id = pc.plant_id
        LEFT JOIN categories c ON pc.category_id = c.id
        WHERE (
          LOWER(p.name) LIKE LOWER($1) OR
          LOWER(p.description) LIKE LOWER($1) OR
          EXISTS (
            SELECT 1 FROM plant_categories pc2 
            JOIN categories c2 ON pc2.category_id = c2.id 
            WHERE pc2.plant_id = p.id AND LOWER(c2.name) LIKE LOWER($1)
          )
        )
      `;

            const params = [`%${searchTerm}%`];

            if (categoryFilter && categoryFilter !== 'all') {
                query += ` AND EXISTS (
          SELECT 1 FROM plant_categories pc3 
          JOIN categories c3 ON pc3.category_id = c3.id 
          WHERE pc3.plant_id = p.id AND c3.name = $2
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
                categories: row.categories.filter(cat => cat !== null)
            }));
        } catch (error) {
            throw new Error(`Error searching plants: ${error.message}`);
        }
    }

    // Create new plant
    static async create(plantData) {
        const client = await db.pool.connect();
        try {
            await client.query('BEGIN');

            // Insert plant
            const plantQuery = `
        INSERT INTO plants (name, price, description, image_url, in_stock)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
      `;

            const plantResult = await client.query(plantQuery, [
                plantData.name,
                plantData.price,
                plantData.description || 'A beautiful plant.',
                plantData.imageUrl,
                plantData.inStock
            ]);

            const plant = plantResult.rows[0];

            // Insert categories if provided
            if (plantData.categories && plantData.categories.length > 0) {
                for (const categoryName of plantData.categories) {
                    // Get or create category
                    let categoryResult = await client.query(
                        'SELECT id FROM categories WHERE name = $1',
                        [categoryName]
                    );

                    let categoryId;
                    if (categoryResult.rows.length === 0) {
                        // Create new category
                        const newCategoryResult = await client.query(
                            'INSERT INTO categories (name) VALUES ($1) RETURNING id',
                            [categoryName]
                        );
                        categoryId = newCategoryResult.rows[0].id;
                    } else {
                        categoryId = categoryResult.rows[0].id;
                    }

                    // Link plant to category
                    await client.query(
                        'INSERT INTO plant_categories (plant_id, category_id) VALUES ($1, $2)',
                        [plant.id, categoryId]
                    );
                }
            }

            await client.query('COMMIT');

            // Return the created plant with categories
            return await this.getById(plant.id);
        } catch (error) {
            await client.query('ROLLBACK');
            throw new Error(`Error creating plant: ${error.message}`);
        } finally {
            client.release();
        }
    }

    // Update plant
    static async update(id, plantData) {
        const client = await db.pool.connect();
        try {
            await client.query('BEGIN');

            // Update plant
            const plantQuery = `
        UPDATE plants 
        SET name = $1, price = $2, description = $3, image_url = $4, in_stock = $5, updated_at = CURRENT_TIMESTAMP
        WHERE id = $6
        RETURNING *
      `;

            const plantResult = await client.query(plantQuery, [
                plantData.name,
                plantData.price,
                plantData.description || 'A beautiful plant.',
                plantData.imageUrl,
                plantData.inStock,
                id
            ]);

            if (plantResult.rows.length === 0) {
                throw new Error('Plant not found');
            }

            // Update categories if provided
            if (plantData.categories) {
                // Remove existing categories
                await client.query('DELETE FROM plant_categories WHERE plant_id = $1', [id]);

                // Add new categories
                for (const categoryName of plantData.categories) {
                    // Get or create category
                    let categoryResult = await client.query(
                        'SELECT id FROM categories WHERE name = $1',
                        [categoryName]
                    );

                    let categoryId;
                    if (categoryResult.rows.length === 0) {
                        // Create new category
                        const newCategoryResult = await client.query(
                            'INSERT INTO categories (name) VALUES ($1) RETURNING id',
                            [categoryName]
                        );
                        categoryId = newCategoryResult.rows[0].id;
                    } else {
                        categoryId = categoryResult.rows[0].id;
                    }

                    // Link plant to category
                    await client.query(
                        'INSERT INTO plant_categories (plant_id, category_id) VALUES ($1, $2)',
                        [id, categoryId]
                    );
                }
            }

            await client.query('COMMIT');

            // Return the updated plant with categories
            return await this.getById(id);
        } catch (error) {
            await client.query('ROLLBACK');
            throw new Error(`Error updating plant: ${error.message}`);
        } finally {
            client.release();
        }
    }

    // Delete plant
    static async delete(id) {
        try {
            const result = await db.query('DELETE FROM plants WHERE id = $1 RETURNING *', [id]);
            if (result.rows.length === 0) {
                throw new Error('Plant not found');
            }
            return result.rows[0];
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
            const result = await db.query('SELECT COUNT(*) as total FROM plants');
            const totalPlants = parseInt(result.rows[0].total);

            // For now, we'll consider all plants as "custom" since they're in the database
            // In a real app, you might have a flag to distinguish original vs custom plants
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
