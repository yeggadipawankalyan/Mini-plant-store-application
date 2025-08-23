import React from 'react';

const PlantCard = ({ plant, onGetCareTips, onEdit, onDelete }) => {
  return (
    <div className="card h-100 shadow-sm plant-card">
      <div className="position-relative">
        <img
          src={plant.image_url || plant.imageUrl}
          alt={plant.name}
          className="card-img-top plant-card__image"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
        <div
          className="card-img-top plant-card__image-placeholder d-none align-items-center justify-content-center bg-light"
          style={{ height: '200px' }}
        >
          <div className="text-center text-muted">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" className="bi bi-image" viewBox="0 0 16 16">
              <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
              <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z" />
            </svg>
            <div className="mt-2">{plant.name}</div>
          </div>
        </div>
        <div className="position-absolute top-0 end-0 m-2 d-flex gap-1">
          <span className={`badge ${plant.inStock ? 'text-bg-success' : 'text-bg-success'}`}>
            {plant.inStock ? 'In Stock' : 'In Stock'}
          </span>
          <button
            onClick={() => onEdit(plant)}
            className="btn btn-sm btn-outline-primary"
            title="Edit plant"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
              <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
            </svg>
          </button>
        </div>
      </div>
      <div className="card-body d-flex flex-column">
        <h3 className="card-title h5">{plant.name}</h3>
        <p className="plant-card__price mb-2">${plant.price.toFixed(2)}</p>
        <div className="d-flex flex-wrap gap-1 mb-3">
          {plant.categories.map((cat) => (
            <span key={cat} className="badge rounded-pill text-bg-light fw-normal">
              {cat}
            </span>
          ))}
        </div>
        <p className="card-text small text-muted flex-grow-1">{plant.description}</p>
        <div className="d-flex gap-2 mt-auto">
          <button
            onClick={() => onGetCareTips(plant)}
            className="btn btn-outline-success flex-fill"
          >
            Get Care Tips
          </button>
          <button
            onClick={() => onDelete(plant)}
            className="btn btn-outline-danger"
            title="Delete plant"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
              <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlantCard;
