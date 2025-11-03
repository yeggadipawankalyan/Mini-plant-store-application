const express = require('express');
const { body, validationResult } = require('express-validator');
// const Plant = require('../models/Plant-sqlite'); // Comment out database model

const router = express.Router();

// Temporary plant data (will work immediately in production)
const plantDatabase = [
    {
        id: 1,
        name: 'Snake Plant',
        price: 25,
        categories: ['Indoor', 'Air Purifying', 'Low Maintenance'],
        inStock: true,
        imageUrl: 'https://picsum.photos/seed/snakeplant/400/400',
        description: 'Known for its air-purifying qualities and tolerance for low light.'
    },
    {
        id: 2,
        name: 'Monstera Deliciosa',
        price: 45,
        categories: ['Indoor', 'Home Decor'],
        inStock: true,
        imageUrl: 'https://picsum.photos/seed/monstera/400/400',
        description: 'Features iconic split leaves, making a bold statement in any room.'
    },
    {
        id: 3,
        name: 'Spider Plant',
        price: 15,
        categories: ['Indoor', 'Air Purifying', 'Pet Friendly'],
        inStock: false,
        imageUrl: 'https://picsum.photos/seed/spiderplant/400/400',
        description: 'Easy to grow and propagate, with arching leaves and baby plantlets.'
    },
    {
        id: 4,
        name: 'Pothos',
        price: 18,
        categories: ['Indoor', 'Low Maintenance', 'Home Decor'],
        inStock: true,
        imageUrl: 'https://picsum.photos/seed/pothos/400/400',
        description: 'A forgiving trailing vine that thrives in a variety of conditions.'
    },
    {
        id: 5,
        name: 'ZZ Plant',
        price: 30,
        categories: ['Indoor', 'Low Maintenance', 'Air Purifying'],
        inStock: true,
        imageUrl: 'https://picsum.photos/seed/zzplant/400/400',
        description: 'Extremely drought-tolerant with glossy, dark green leaves.'
    },
    {
        id: 6,
        name: 'Fiddle Leaf Fig',
        price: 75,
        categories: ['Indoor', 'Home Decor'],
        inStock: true,
        imageUrl: 'https://picsum.photos/seed/fiddlefig/400/400',
        description: 'A popular but fussy tree with large, violin-shaped leaves.'
    },
    {
        id: 7,
        name: 'Echeveria',
        price: 12,
        categories: ['Succulent', 'Indoor', 'Low Maintenance'],
        inStock: true,
        imageUrl: 'https://picsum.photos/seed/echeveria/400/400',
        description: 'A rosette-forming succulent available in various colors.'
    },
    {
        id: 8,
        name: 'Aloe Vera',
        price: 20,
        categories: ['Succulent', 'Indoor'],
        inStock: true,
        imageUrl: 'https://picsum.photos/seed/aloe/400/400',
        description: 'Famous for its medicinal gel and easy care.'
    },
    {
        id: 9,
        name: 'Peace Lily',
        price: 28,
        categories: ['Indoor', 'Air Purifying', 'Flowering'],
        inStock: false,
        imageUrl: 'https://picsum.photos/seed/peacelily/400/400',
        description: 'Elegant plant with dark leaves and white spathe flowers.'
    },
    {
        id: 10,
        name: 'Lavender',
        price: 22,
        categories: ['Outdoor', 'Flowering', 'Herb'],
        inStock: true,
        imageUrl: 'https://picsum.photos/seed/lavender/400/400',
        description: 'A fragrant herb known for its beautiful purple flowers and calming scent.'
    }
];

// Validation middleware
const validatePlant = [
    body('name').trim().isLength({ min: 1 }).withMessage('Plant name is required'),
    body('price').isFloat({ min: 0.01 }).withMessage('Price must be a positive number'),
    body('categories').isArray().withMessage('Categories must be an array'),
    body('categories.*').isString().withMessage('Each category must be a string'),
    body('inStock').isBoolean().withMessage('inStock must be a boolean'),
    body('imageUrl').isURL().withMessage('Image URL must be a valid URL'),
    body('description').optional().isString().withMessage('Description must be a string')
];

// GET /api/plants - Get all plants
router.get('/', async (req, res) => {
    try {
        // Use plant data instead of database
        res.json({
            success: true,
            data: plantDatabase,
            message: 'Plants retrieved successfully'
        });
    } catch (error) {
        console.error('Error fetching plants:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch plants',
            error: error.message
        });
    }
});

// GET /api/plants/search - Search plants
router.get('/search', async (req, res) => {
    try {
        const { q: searchTerm, category } = req.query;

        if (!searchTerm && !category) {
            // If no search parameters, return all plants
            return res.json({
                success: true,
                data: plantDatabase,
                message: 'All plants retrieved'
            });
        }

        // Filter plants based on search term and category
        let filteredPlants = plantDatabase;

        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            filteredPlants = filteredPlants.filter(plant =>
                plant.name.toLowerCase().includes(term) ||
                plant.description.toLowerCase().includes(term) ||
                plant.categories.some(cat => cat.toLowerCase().includes(term))
            );
        }

        if (category && category !== 'all') {
            filteredPlants = filteredPlants.filter(plant =>
                plant.categories.some(cat => cat.toLowerCase() === category.toLowerCase())
            );
        }

        res.json({
            success: true,
            data: filteredPlants,
            message: `Found ${filteredPlants.length} plants matching your search`
        });
    } catch (error) {
        console.error('Error searching plants:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to search plants',
            error: error.message
        });
    }
});

// GET /api/plants/categories - Get all categories
router.get('/categories', async (req, res) => {
    try {
        // Extract unique categories from plant data
        const allCategories = plantDatabase.reduce((categories, plant) => {
            plant.categories.forEach(category => {
                if (!categories.includes(category)) {
                    categories.push(category);
                }
            });
            return categories;
        }, []);

        const categories = allCategories.map(name => ({ name }));

        res.json({
            success: true,
            data: categories,
            message: 'Categories retrieved successfully'
        });
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch categories',
            error: error.message
        });
    }
});

// GET /api/plants/storage-info - Get storage information
router.get('/storage-info', async (req, res) => {
    try {
        const storageInfo = {
            totalPlants: plantDatabase.length,
            customPlants: 0 // Since we're using static data for now
        };

        res.json({
            success: true,
            data: storageInfo,
            message: 'Storage info retrieved successfully'
        });
    } catch (error) {
        console.error('Error fetching storage info:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch storage info',
            error: error.message
        });
    }
});

// GET /api/plants/:id - Get plant by ID
router.get('/:id', async (req, res) => {
    try {
        const plant = plantDatabase.find(p => p.id === parseInt(req.params.id));

        if (!plant) {
            return res.status(404).json({
                success: false,
                message: 'Plant not found'
            });
        }

        res.json({
            success: true,
            data: plant,
            message: 'Plant retrieved successfully'
        });
    } catch (error) {
        console.error('Error fetching plant:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch plant',
            error: error.message
        });
    }
});

// POST /api/plants - Create new plant
router.post('/', validatePlant, async (req, res) => {
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: errors.array()
            });
        }

        const newPlant = {
            id: plantDatabase.length + 1, // Simple ID generation
            name: req.body.name,
            price: parseFloat(req.body.price),
            description: req.body.description,
            imageUrl: req.body.imageUrl,
            categories: req.body.categories || [],
            inStock: req.body.inStock
        };

        plantDatabase.push(newPlant);

        res.status(201).json({
            success: true,
            data: newPlant,
            message: 'Plant created successfully'
        });
    } catch (error) {
        console.error('Error creating plant:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create plant',
            error: error.message
        });
    }
});

// PUT /api/plants/:id - Update plant
router.put('/:id', validatePlant, async (req, res) => {
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: errors.array()
            });
        }

        const plantId = parseInt(req.params.id);

        // Check if plant exists
        const existingPlant = plantDatabase.find(p => p.id === plantId);
        if (!existingPlant) {
            return res.status(404).json({
                success: false,
                message: 'Plant not found'
            });
        }

        const plantData = {
            name: req.body.name,
            price: parseFloat(req.body.price),
            description: req.body.description,
            imageUrl: req.body.imageUrl,
            categories: req.body.categories || [],
            inStock: req.body.inStock
        };

        // Find the index and update
        const index = plantDatabase.findIndex(p => p.id === plantId);
        plantDatabase[index] = { ...plantDatabase[index], ...plantData };

        res.json({
            success: true,
            data: plantDatabase[index],
            message: 'Plant updated successfully'
        });
    } catch (error) {
        console.error('Error updating plant:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update plant',
            error: error.message
        });
    }
});

// DELETE /api/plants/:id - Delete plant
router.delete('/:id', async (req, res) => {
    try {
        const plantId = parseInt(req.params.id);

        // Check if plant exists
        const initialLength = plantDatabase.length;
        plantDatabase = plantDatabase.filter(p => p.id !== plantId);

        if (plantDatabase.length === initialLength) {
            return res.status(404).json({
                success: false,
                message: 'Plant not found'
            });
        }

        res.json({
            success: true,
            message: 'Plant deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting plant:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete plant',
            error: error.message
        });
    }
});

module.exports = router;
