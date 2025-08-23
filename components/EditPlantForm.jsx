import React, { useState, useEffect } from 'react';
import { PLANT_CATEGORIES } from '../constants';

const EditPlantForm = ({ plant, onSubmit, onCancel }) => {
  const [name, setName] = useState(plant.name);
  const [price, setPrice] = useState(plant.price.toString());
  const [categories, setCategories] = useState(plant.categories);
  const [inStock, setInStock] = useState(plant.inStock);
  const [description, setDescription] = useState(plant.description);
  const [imagePreview, setImagePreview] = useState(plant.imageUrl);
  const [error, setError] = useState('');

  // Update form when plant prop changes
  useEffect(() => {
    setName(plant.name);
    setPrice(plant.price.toString());
    setCategories(plant.categories);
    setInStock(plant.inStock);
    setDescription(plant.description);
    setImagePreview(plant.imageUrl);
    setError('');
  }, [plant]);

  const handleCategoryChange = (category) => {
    setCategories(prev =>
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // 2MB limit
        setError('Image file is too large. Please select an image under 2MB.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setError(''); // Clear error on successful load
      };
      reader.onerror = () => {
        setError('Failed to read image file.');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !price || categories.length === 0 || !imagePreview) {
      setError('Please fill out all required fields, including the image.');
      return;
    }
    const priceValue = parseFloat(price);
    if (isNaN(priceValue) || priceValue <= 0) {
      setError('Please enter a valid price.');
      return;
    }
    setError('');
    onSubmit({
      ...plant,
      name,
      price: priceValue,
      categories,
      inStock,
      imageUrl: imagePreview,
      description: description || 'A beautiful plant.'
    });
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      {error && <div className="alert alert-danger small p-2">{error}</div>}
      
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Plant Name</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="form-control"
          required
        />
      </div>
      
      <div className="mb-3">
        <label htmlFor="price" className="form-label">Price ($)</label>
        <input
          id="price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="form-control"
          required
          min="0.01"
          step="0.01"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="description" className="form-label">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="form-control"
          rows={3}
          placeholder="Describe your plant..."
        />
      </div>

      <div className="mb-3">
        <label htmlFor="image" className="form-label">Plant Image</label>
        <input
          id="image"
          type="file"
          onChange={handleImageChange}
          className="form-control"
          accept="image/png, image/jpeg, image/webp"
        />
        {imagePreview && (
          <div className="mt-2 text-center">
            <img 
                src={imagePreview} 
                alt="Plant preview" 
                className="img-thumbnail" 
                style={{ width: '100px', height: '100px', objectFit: 'cover' }}
            />
          </div>
        )}
      </div>

      <div className="mb-3">
        <label className="form-label">Categories</label>
        <div className="row row-cols-2 row-cols-sm-3 g-2">
          {PLANT_CATEGORIES.map(cat => (
            <div className="col" key={cat}>
              <div className="form-check">
                <input
                  type="checkbox"
                  id={`category-${cat}`}
                  checked={categories.includes(cat)}
                  onChange={() => handleCategoryChange(cat)}
                  className="form-check-input"
                />
                <label htmlFor={`category-${cat}`} className="form-check-label">{cat}</label>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="form-check mb-4">
        <input
          id="inStock"
          type="checkbox"
          checked={inStock}
          onChange={(e) => setInStock(e.target.checked)}
          className="form-check-input"
        />
        <label htmlFor="inStock" className="form-check-label">Available in Stock</label>
      </div>
      
      <div className="d-flex gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="btn btn-outline-secondary flex-fill"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn btn-primary flex-fill"
        >
          Update Plant
        </button>
      </div>
    </form>
  );
};

export default EditPlantForm;
