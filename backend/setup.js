const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');
require('dotenv').config();

// Database configuration
const pool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || 'urvann_plant_store',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'your_password',
});

async function setupDatabase() {
    const client = await pool.connect();

    try {
        console.log('🚀 Starting database setup...');

        // Read and execute schema.sql
        console.log('📋 Creating database schema...');
        const schemaPath = path.join(__dirname, 'database', 'schema.sql');
        const schemaSQL = fs.readFileSync(schemaPath, 'utf8');
        await client.query(schemaSQL);
        console.log('✅ Schema created successfully');

        // Read and execute seed.sql
        console.log('🌱 Seeding plants data...');
        const seedPath = path.join(__dirname, 'database', 'seed.sql');
        const seedSQL = fs.readFileSync(seedPath, 'utf8');
        await client.query(seedSQL);
        console.log('✅ Plants data seeded successfully');

        // Read and execute seedRelationships.sql
        console.log('🔗 Creating plant-category relationships...');
        const relationshipsPath = path.join(__dirname, 'database', 'seedRelationships.sql');
        const relationshipsSQL = fs.readFileSync(relationshipsPath, 'utf8');
        await client.query(relationshipsSQL);
        console.log('✅ Plant-category relationships created successfully');

        // Verify the setup
        console.log('🔍 Verifying setup...');
        const plantCount = await client.query('SELECT COUNT(*) FROM plants');
        const categoryCount = await client.query('SELECT COUNT(*) FROM categories');
        const relationshipCount = await client.query('SELECT COUNT(*) FROM plant_categories');

        console.log(`✅ Setup complete!`);
        console.log(`   📊 Plants: ${plantCount.rows[0].count}`);
        console.log(`   🏷️  Categories: ${categoryCount.rows[0].count}`);
        console.log(`   🔗 Relationships: ${relationshipCount.rows[0].count}`);

    } catch (error) {
        console.error('❌ Error during database setup:', error);
        throw error;
    } finally {
        client.release();
        await pool.end();
    }
}

// Run setup if this file is executed directly
if (require.main === module) {
    setupDatabase()
        .then(() => {
            console.log('🎉 Database setup completed successfully!');
            process.exit(0);
        })
        .catch((error) => {
            console.error('💥 Database setup failed:', error);
            process.exit(1);
        });
}

module.exports = { setupDatabase };
