const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Helper function to handle API responses
const handleResponse = async (response) => {
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    return response.json();
};

// Helper function to make API requests
const apiRequest = async (endpoint, options = {}) => {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
        ...options,
    };

    try {
        const response = await fetch(url, config);
        return await handleResponse(response);
    } catch (error) {
        console.error(`API request failed for ${endpoint}:`, error);
        throw error;
    }
};

// Plant API functions
export const getPlants = async () => {
    try {
        const result = await apiRequest('/plants');
        return result.data;
    } catch (error) {
        console.error('Failed to fetch plants:', error);
        throw new Error('Failed to fetch plants. Please try again later.');
    }
};

export const addPlant = async (plantData) => {
    try {
        const result = await apiRequest('/plants', {
            method: 'POST',
            body: JSON.stringify(plantData),
        });
        return result.data;
    } catch (error) {
        console.error('Failed to add plant:', error);
        throw new Error('Failed to add plant. Please try again.');
    }
};

export const updatePlant = async (plantData) => {
    try {
        const result = await apiRequest(`/plants/${plantData.id}`, {
            method: 'PUT',
            body: JSON.stringify(plantData),
        });
        return result.data;
    } catch (error) {
        console.error('Failed to update plant:', error);
        throw new Error('Failed to update plant. Please try again.');
    }
};

export const deletePlant = async (plantId) => {
    try {
        await apiRequest(`/plants/${plantId}`, {
            method: 'DELETE',
        });
    } catch (error) {
        console.error('Failed to delete plant:', error);
        throw new Error('Failed to delete plant. Please try again.');
    }
};

export const searchPlants = async (searchTerm, category = null) => {
    try {
        const params = new URLSearchParams();
        if (searchTerm) params.append('q', searchTerm);
        if (category && category !== 'all') params.append('category', category);

        const queryString = params.toString();
        const endpoint = queryString ? `/plants/search?${queryString}` : '/plants';

        const result = await apiRequest(endpoint);
        return result.data;
    } catch (error) {
        console.error('Failed to search plants:', error);
        throw new Error('Failed to search plants. Please try again.');
    }
};

export const getCategories = async () => {
    try {
        const result = await apiRequest('/plants/categories');
        return result.data.map(cat => cat.name);
    } catch (error) {
        console.error('Failed to fetch categories:', error);
        // Return default categories if API fails
        return [
            'Indoor',
            'Outdoor',
            'Succulent',
            'Air Purifying',
            'Home Decor',
            'Pet-Friendly',
            'Low Maintenance',
            'Flowering',
            'Herb'
        ];
    }
};

export const getStorageInfo = async () => {
    try {
        const result = await apiRequest('/plants/storage-info');
        return result.data;
    } catch (error) {
        console.error('Failed to fetch storage info:', error);
        // Return default info if API fails
        return {
            totalPlants: 0,
            customPlants: 0
        };
    }
};

// Health check function
export const checkApiHealth = async () => {
    try {
        const response = await fetch(`${API_BASE_URL.replace('/api', '')}/health`);
        return response.ok;
    } catch (error) {
        console.error('API health check failed:', error);
        return false;
    }
};
