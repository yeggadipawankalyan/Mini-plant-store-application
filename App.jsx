import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { getPlants, addPlant as addPlantService, updatePlant as updatePlantService, deletePlant as deletePlantService, getStorageInfo } from './services/apiService';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import CategoryFilter from './components/CategoryFilter';
import PlantGrid from './components/PlantGrid';
import Modal from './components/Modal';
import AddPlantForm from './components/AddPlantForm';
import EditPlantForm from './components/EditPlantForm';
import DeleteConfirmationModal from './components/DeleteConfirmationModal';
import PlantCareAssistant from './components/PlantCareAssistant';

const App = () => {
    const [plants, setPlants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    const [isAddPlantModalOpen, setAddPlantModalOpen] = useState(false);
    const [isEditPlantModalOpen, setEditPlantModalOpen] = useState(false);
    const [isDeletePlantModalOpen, setDeletePlantModalOpen] = useState(false);
    const [isCareModalOpen, setCareModalOpen] = useState(false);
    const [selectedPlantForCare, setSelectedPlantForCare] = useState(null);
    const [selectedPlantForEdit, setSelectedPlantForEdit] = useState(null);
    const [selectedPlantForDelete, setSelectedPlantForDelete] = useState(null);

    useEffect(() => {
        const fetchPlants = async () => {
            try {
                setLoading(true);
                const plantsData = await getPlants();
                setPlants(plantsData);
                setError(null);
            } catch (err) {
                setError('Failed to fetch plants. Please try again later.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchPlants();
    }, []);

    // Auto-hide success message after 5 seconds
    useEffect(() => {
        if (successMessage) {
            const timer = setTimeout(() => {
                setSuccessMessage(null);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [successMessage]);

    const filteredPlants = useMemo(() => {
        return plants
            .filter(plant => {
                if (selectedCategory === 'all') return true;
                return plant.categories.includes(selectedCategory);
            })
            .filter(plant => {
                const lowerCaseSearch = searchTerm.toLowerCase();
                const nameMatch = plant.name.toLowerCase().includes(lowerCaseSearch);
                const categoryMatch = plant.categories.some(cat => cat.toLowerCase().includes(lowerCaseSearch));
                return nameMatch || categoryMatch;
            });
    }, [plants, searchTerm, selectedCategory]);

    const handleAddPlant = useCallback(async (newPlant) => {
        try {
            const addedPlant = await addPlantService(newPlant);
            // Refresh plants from storage instead of manually updating state
            const updatedPlants = await getPlants();
            setPlants(updatedPlants);
            setAddPlantModalOpen(false);
            setSuccessMessage(`✅ "${addedPlant.name}" has been successfully added to your plant collection!`);
        } catch (err) {
            console.error('Failed to add plant', err);
            setError('Failed to add plant. Please try again.');
        }
    }, []);

    const handleEditPlant = useCallback(async (updatedPlant) => {
        try {
            const editedPlant = await updatePlantService(updatedPlant);
            // Refresh plants from storage
            const updatedPlants = await getPlants();
            setPlants(updatedPlants);
            setEditPlantModalOpen(false);
            setSelectedPlantForEdit(null);
            setSuccessMessage(`✅ "${editedPlant.name}" has been successfully updated!`);
        } catch (err) {
            console.error('Failed to update plant', err);
            setError('Failed to update plant. Please try again.');
        }
    }, []);

    const handleDeletePlant = useCallback(async () => {
        if (!selectedPlantForDelete) return;

        try {
            await deletePlantService(selectedPlantForDelete.id);
            // Refresh plants from storage
            const updatedPlants = await getPlants();
            setPlants(updatedPlants);
            setDeletePlantModalOpen(false);
            setSelectedPlantForDelete(null);
            setSuccessMessage(`🗑️ "${selectedPlantForDelete.name}" has been successfully deleted from your collection.`);
        } catch (err) {
            console.error('Failed to delete plant', err);
            setError('Failed to delete plant. Please try again.');
        }
    }, [selectedPlantForDelete]);

    const handleOpenEditModal = useCallback((plant) => {
        setSelectedPlantForEdit(plant);
        setEditPlantModalOpen(true);
    }, []);

    const handleCloseEditModal = useCallback(() => {
        setEditPlantModalOpen(false);
        setSelectedPlantForEdit(null);
    }, []);

    const handleOpenDeleteModal = useCallback((plant) => {
        setSelectedPlantForDelete(plant);
        setDeletePlantModalOpen(true);
    }, []);

    const handleCloseDeleteModal = useCallback(() => {
        setDeletePlantModalOpen(false);
        setSelectedPlantForDelete(null);
    }, []);

    const handleOpenCareAssistant = useCallback((plant) => {
        setSelectedPlantForCare(plant);
        setCareModalOpen(true);
    }, []);

    // Get storage info
    const [storageInfo, setStorageInfo] = useState({ totalPlants: 0, customPlants: 0 });

    // Fetch storage info
    useEffect(() => {
        const fetchStorageInfo = async () => {
            try {
                const info = await getStorageInfo();
                setStorageInfo(info);
            } catch (error) {
                console.error('Failed to fetch storage info:', error);
            }
        };
        fetchStorageInfo();
    }, [plants.length]); // Refresh when plants change

    return (
        <>
            <Header onAddPlantClick={() => setAddPlantModalOpen(true)} />

            <main className="container py-4">
                {/* Success Message */}
                {successMessage && (
                    <div className="alert alert-success alert-dismissible fade show" role="alert">
                        {successMessage}
                        <button
                            type="button"
                            className="btn-close"
                            onClick={() => setSuccessMessage(null)}
                            aria-label="Close"
                        ></button>
                    </div>
                )}

                <div className="card shadow-sm mb-4">
                    <div className="card-body p-4">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h2 className="h4 card-title mb-0">Find Your Perfect Plant</h2>
                            <small className="text-muted">
                                {storageInfo.totalPlants} plants available
                                {storageInfo.customPlants > 0 && (
                                    <span className="ms-2 badge bg-success">
                                        +{storageInfo.customPlants} custom
                                    </span>
                                )}
                            </small>
                        </div>
                        <div className="row g-3">
                            <div className="col-md">
                                <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                            </div>
                            <div className="col-md-auto">
                                <CategoryFilter selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
                            </div>
                        </div>
                    </div>
                </div>

                {loading && (
                    <div className="text-center py-5">
                        <div className="spinner-border text-success" role="status" style={{ width: '3rem', height: '3rem' }}>
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <p className="mt-3 text-muted">Loading Plants...</p>
                    </div>
                )}
                {error && <div className="alert alert-danger">{error}</div>}
                {!loading && !error && (
                    <PlantGrid
                        plants={filteredPlants}
                        onGetCareTips={handleOpenCareAssistant}
                        onEdit={handleOpenEditModal}
                        onDelete={handleOpenDeleteModal}
                    />
                )}
            </main>

            {isAddPlantModalOpen && (
                <Modal title="Add a New Plant" onClose={() => setAddPlantModalOpen(false)}>
                    <AddPlantForm onSubmit={handleAddPlant} />
                </Modal>
            )}

            {isEditPlantModalOpen && selectedPlantForEdit && (
                <Modal title={`Edit ${selectedPlantForEdit.name}`} onClose={handleCloseEditModal}>
                    <EditPlantForm
                        plant={selectedPlantForEdit}
                        onSubmit={handleEditPlant}
                        onCancel={handleCloseEditModal}
                    />
                </Modal>
            )}

            {isDeletePlantModalOpen && selectedPlantForDelete && (
                <Modal title="Delete Plant" onClose={handleCloseDeleteModal}>
                    <DeleteConfirmationModal
                        plant={selectedPlantForDelete}
                        onConfirm={handleDeletePlant}
                        onCancel={handleCloseDeleteModal}
                    />
                </Modal>
            )}

            {isCareModalOpen && selectedPlantForCare && (
                <Modal title={`Care Tips for ${selectedPlantForCare.name}`} onClose={() => setCareModalOpen(false)}>
                    <PlantCareAssistant plantName={selectedPlantForCare.name} />
                </Modal>
            )}

        </>
    );
};

export default App;
