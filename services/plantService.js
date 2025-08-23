import { plantDatabase } from '../data/plantData';

// Simulate network delay
const delay = (ms) => new Promise(res => setTimeout(res, ms));

// Storage key for plants
const PLANTS_STORAGE_KEY = 'urvann_plants_data';

// Helper functions for localStorage
const getStoredPlants = () => {
  try {
    const stored = localStorage.getItem(PLANTS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [...plantDatabase];
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return [...plantDatabase];
  }
};

const savePlantsToStorage = (plants) => {
  try {
    localStorage.setItem(PLANTS_STORAGE_KEY, JSON.stringify(plants));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

// Initialize plants from storage or default database
let plants = getStoredPlants();

export const getPlants = async () => {
  console.log('Fetching all plants...');
  await delay(500); // Simulate API call latency

  // Refresh from storage in case it was updated elsewhere
  plants = getStoredPlants();
  return [...plants].sort((a, b) => b.id - a.id); // Return newest first
};

export const addPlant = async (newPlantData) => {
  console.log('Adding new plant...', newPlantData);
  await delay(300); // Simulate API call latency

  // Get fresh data from storage
  plants = getStoredPlants();

  const newPlant = {
    id: Math.max(...plants.map(p => p.id), 0) + 1,
    ...newPlantData,
    description: newPlantData.description || 'A newly added, beautiful plant.' // Default description
  };

  // Add to plants array
  plants = [newPlant, ...plants];

  // Save to localStorage
  savePlantsToStorage(plants);

  return newPlant;
};

export const updatePlant = async (updatedPlant) => {
  console.log('Updating plant...', updatedPlant);
  await delay(300); // Simulate API call latency

  // Get fresh data from storage
  plants = getStoredPlants();

  // Find and update the plant
  const plantIndex = plants.findIndex(p => p.id === updatedPlant.id);
  if (plantIndex === -1) {
    throw new Error('Plant not found');
  }

  // Update the plant
  plants[plantIndex] = updatedPlant;

  // Save to localStorage
  savePlantsToStorage(plants);

  return updatedPlant;
};

export const deletePlant = async (plantId) => {
  console.log('Deleting plant...', plantId);
  await delay(300); // Simulate API call latency

  // Get fresh data from storage
  plants = getStoredPlants();

  // Find and remove the plant
  const plantIndex = plants.findIndex(p => p.id === plantId);
  if (plantIndex === -1) {
    throw new Error('Plant not found');
  }

  // Remove the plant
  plants.splice(plantIndex, 1);

  // Save to localStorage
  savePlantsToStorage(plants);
};

// Optional: Function to reset to original database (useful for development)
export const resetToOriginalDatabase = () => {
  plants = [...plantDatabase];
  savePlantsToStorage(plants);
  console.log('Reset to original plant database');
};

// Optional: Function to get storage info
export const getStorageInfo = () => {
  const storedPlants = getStoredPlants();
  const originalCount = plantDatabase.length;
  return {
    totalPlants: storedPlants.length,
    customPlants: storedPlants.length - originalCount
  };
};
