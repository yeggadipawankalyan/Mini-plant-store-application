import React, { useState } from 'react';
import { PLANT_CATEGORIES } from '../constants';

const AddPlantForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [categories, setCategories] = useState([]);
  const [inStock, setInStock] = useState(true);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState('');

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

    // For now, we'll use a placeholder image URL since base64 is too large
    // In production, you'd upload to a cloud service and get a URL back
    const imageUrl = 'https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=400&h=400&fit=crop';

    onSubmit({
      name,
      price: priceValue,
      categories,
      inStock,
      imageUrl: imageUrl,
      description: '' // Service will provide a default
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
        <label htmlFor="image" className="form-label">Plant Image</label>
        <input
          id="image"
          type="file"
          onChange={handleImageChange}
          className="form-control"
          accept="image/png, image/jpeg, image/webp"
          required
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

      <button
        type="submit"
        className="btn btn-success w-100"
      >
        Add Plant
      </button>
    </form>
  );
};

export default AddPlantForm;
