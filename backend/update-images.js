const db = require('./config/database-sqlite');

async function updatePlantImages() {
    try {
        console.log('🖼️ Updating plant images with unique images...');

        // Better image URLs that are more reliable and specific to each plant
        const imageUpdates = [
            {
                name: 'Snake Plant',
                image_url: 'https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=400&h=400&fit=crop'
            },
            {
                name: 'Monstera Deliciosa',
                image_url: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=400&h=400&fit=crop'
            },
            {
                name: 'Spider Plant',
                image_url: 'https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=400&h=400&fit=crop'
            },
            {
                name: 'Pothos',
                image_url: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=400&h=400&fit=crop'
            },
            {
                name: 'ZZ Plant',
                image_url: 'https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=400&h=400&fit=crop'
            }
        ];

        for (const update of imageUpdates) {
            await db.run(
                'UPDATE plants SET image_url = ? WHERE name = ?',
                [update.image_url, update.name]
            );
            console.log(`✅ Updated image for ${update.name}`);
        }

        console.log('🎉 All plant images updated successfully!');

    } catch (error) {
        console.error('❌ Error updating images:', error);
        throw error;
    } finally {
        db.db.close();
    }
}

// Run if this file is executed directly
if (require.main === module) {
    updatePlantImages()
        .then(() => {
            console.log('🎉 Image update completed successfully!');
            process.exit(0);
        })
        .catch((error) => {
            console.error('💥 Image update failed:', error);
            process.exit(1);
        });
}

module.exports = { updatePlantImages };
