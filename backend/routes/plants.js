const express = require('express');
const { body, validationResult } = require('express-validator');
const Plant = require('../models/Plant-sqlite');

const router = express.Router();

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
        const plants = await Plant.getAll();
        res.json({
            success: true,
            data: plants,
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
            const plants = await Plant.getAll();
            return res.json({
                success: true,
                data: plants,
                message: 'All plants retrieved'
            });
        }

        const plants = await Plant.search(searchTerm || '', category);
        res.json({
            success: true,
            data: plants,
            message: `Found ${plants.length} plants matching your search`
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
        const categories = await Plant.getCategories();
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
        const storageInfo = await Plant.getStorageInfo();
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
        const plant = await Plant.getById(parseInt(req.params.id));

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

        const plantData = {
            name: req.body.name,
            price: parseFloat(req.body.price),
            description: req.body.description,
            imageUrl: req.body.imageUrl,
            categories: req.body.categories || [],
            inStock: req.body.inStock
        };

        const newPlant = await Plant.create(plantData);

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
        const existingPlant = await Plant.getById(plantId);
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

        const updatedPlant = await Plant.update(plantId, plantData);

        res.json({
            success: true,
            data: updatedPlant,
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
        const existingPlant = await Plant.getById(plantId);
        if (!existingPlant) {
            return res.status(404).json({
                success: false,
                message: 'Plant not found'
            });
        }

        await Plant.delete(plantId);

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
