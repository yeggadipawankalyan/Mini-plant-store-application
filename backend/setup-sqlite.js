const fs = require('fs');
const path = require('path');
const db = require('./config/database-sqlite');

async function setupSQLiteDatabase() {
    try {
        console.log('🚀 Starting SQLite database setup...');
        
        // Create database directory if it doesn't exist
        const dbDir = path.join(__dirname, 'database');
        if (!fs.existsSync(dbDir)) {
            fs.mkdirSync(dbDir, { recursive: true });
        }
        
        // Create tables
        console.log('📋 Creating database schema...');
        
        // Create categories table
        await db.run(`
            CREATE TABLE IF NOT EXISTS categories (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT UNIQUE NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);
        
        // Create plants table
        await db.run(`
            CREATE TABLE IF NOT EXISTS plants (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                price REAL NOT NULL CHECK (price > 0),
                description TEXT,
                image_url TEXT,
                in_stock BOOLEAN DEFAULT 1,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);
        
        // Create plant_categories junction table
        await db.run(`
            CREATE TABLE IF NOT EXISTS plant_categories (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                plant_id INTEGER,
                category_id INTEGER,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (plant_id) REFERENCES plants (id) ON DELETE CASCADE,
                FOREIGN KEY (category_id) REFERENCES categories (id) ON DELETE CASCADE,
                UNIQUE(plant_id, category_id)
            )
        `);
        
        console.log('✅ Schema created successfully');
        
        // Insert default categories
        console.log('🏷️ Inserting default categories...');
        const categories = [
            'Indoor', 'Outdoor', 'Succulent', 'Air Purifying', 
            'Home Decor', 'Pet-Friendly', 'Low Maintenance', 'Flowering', 'Herb'
        ];
        
        for (const category of categories) {
            await db.run(
                'INSERT OR IGNORE INTO categories (name) VALUES (?)',
                [category]
            );
        }
        
        console.log('✅ Categories inserted successfully');
        
        // Insert sample plants
        console.log('🌱 Seeding plants data...');
        const plants = [
            {
                name: 'Snake Plant',
                price: 25.00,
                description: 'Known for its air-purifying qualities and tolerance for low light.',
                image_url: 'https://picsum.photos/seed/snakeplant/400/400',
                in_stock: 1,
                categories: ['Indoor', 'Air Purifying', 'Low Maintenance']
            },
            {
                name: 'Monstera Deliciosa',
                price: 45.00,
                description: 'Features iconic split leaves, making a bold statement in any room.',
                image_url: 'https://picsum.photos/seed/monstera/400/400',
                in_stock: 1,
                categories: ['Indoor', 'Home Decor']
            },
            {
                name: 'Spider Plant',
                price: 15.00,
                description: 'Easy to grow and propagate, with arching leaves and baby plantlets.',
                image_url: 'https://picsum.photos/seed/spiderplant/400/400',
                in_stock: 0,
                categories: ['Indoor', 'Air Purifying', 'Pet-Friendly']
            },
            {
                name: 'Pothos',
                price: 18.00,
                description: 'A forgiving trailing vine that thrives in a variety of conditions.',
                image_url: 'https://picsum.photos/seed/pothos/400/400',
                in_stock: 1,
                categories: ['Indoor', 'Low Maintenance', 'Home Decor']
            },
            {
                name: 'ZZ Plant',
                price: 30.00,
                description: 'Extremely drought-tolerant with glossy, dark green leaves.',
                image_url: 'https://picsum.photos/seed/zzplant/400/400',
                in_stock: 1,
                categories: ['Indoor', 'Low Maintenance', 'Air Purifying']
            }
        ];
        
        for (const plant of plants) {
            // Insert plant
            const result = await db.run(
                'INSERT INTO plants (name, price, description, image_url, in_stock) VALUES (?, ?, ?, ?, ?)',
                [plant.name, plant.price, plant.description, plant.image_url, plant.in_stock]
            );
            
            // Insert categories
            for (const category of plant.categories) {
                const categoryResult = await db.queryOne('SELECT id FROM categories WHERE name = ?', [category]);
                if (categoryResult.rows.length > 0) {
                    await db.run(
                        'INSERT INTO plant_categories (plant_id, category_id) VALUES (?, ?)',
                        [result.lastID, categoryResult.rows[0].id]
                    );
                }
            }
        }
        
        console.log('✅ Plants data seeded successfully');
        
        // Verify the setup
        console.log('🔍 Verifying setup...');
        const plantCount = await db.queryOne('SELECT COUNT(*) as count FROM plants');
        const categoryCount = await db.queryOne('SELECT COUNT(*) as count FROM categories');
        const relationshipCount = await db.queryOne('SELECT COUNT(*) as count FROM plant_categories');
        
        console.log(`✅ Setup complete!`);
        console.log(`   📊 Plants: ${plantCount.rows[0].count}`);
        console.log(`   🏷️  Categories: ${categoryCount.rows[0].count}`);
        console.log(`   🔗 Relationships: ${relationshipCount.rows[0].count}`);
        
    } catch (error) {
        console.error('❌ Error during database setup:', error);
        throw error;
    } finally {
        db.db.close();
    }
}

// Run setup if this file is executed directly
if (require.main === module) {
    setupSQLiteDatabase()
        .then(() => {
            console.log('🎉 SQLite database setup completed successfully!');
            process.exit(0);
        })
        .catch((error) => {
            console.error('💥 SQLite database setup failed:', error);
            process.exit(1);
        });
}

module.exports = { setupSQLiteDatabase };
