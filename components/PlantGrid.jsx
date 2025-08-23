import React, { useState, useMemo } from 'react';
import PlantCard from './PlantCard';

const PlantGrid = ({ plants, onGetCareTips, onEdit, onDelete }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const plantsPerPage = 12;

  // Calculate pagination
  const totalPages = Math.ceil(plants.length / plantsPerPage);
  const startIndex = (currentPage - 1) * plantsPerPage;
  const endIndex = startIndex + plantsPerPage;
  const currentPlants = plants.slice(startIndex, endIndex);

  // Reset to first page when plants change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [plants.length]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (plants.length === 0) {
    return (
      <div className="text-center py-5 bg-light rounded-3">
        <h3 className="text-muted">No Plants Found</h3>
        <p className="text-muted">Try adjusting your search or filter criteria.</p>
      </div>
    );
  }

  return (
    <div>
      {/* Plants Grid */}
      <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 g-4 mb-4">
        {currentPlants.map((plant) => (
          <div className="col" key={plant.id}>
            <PlantCard
              plant={plant}
              onGetCareTips={onGetCareTips}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <nav aria-label="Plant pagination" className="d-flex justify-content-center">
          <ul className="pagination pagination-lg">
            {/* Previous button */}
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button
                className="page-link"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="Previous page"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-left" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
                </svg>
              </button>
            </li>

            {/* Page numbers */}
            {Array.from({ length: totalPages }, (_, index) => {
              const pageNumber = index + 1;
              const isCurrentPage = pageNumber === currentPage;

              // Show first page, last page, current page, and pages around current page
              const shouldShow =
                pageNumber === 1 ||
                pageNumber === totalPages ||
                Math.abs(pageNumber - currentPage) <= 1;

              if (!shouldShow) {
                // Show ellipsis if there's a gap
                const prevPage = pageNumber - 1;
                if (prevPage > 1 && prevPage < currentPage - 1) {
                  return (
                    <li key={`ellipsis-start-${pageNumber}`} className="page-item disabled">
                      <span className="page-link">...</span>
                    </li>
                  );
                }
                const nextPage = pageNumber + 1;
                if (nextPage < totalPages && nextPage > currentPage + 1) {
                  return (
                    <li key={`ellipsis-end-${pageNumber}`} className="page-item disabled">
                      <span className="page-link">...</span>
                    </li>
                  );
                }
                return null;
              }

              return (
                <li key={pageNumber} className={`page-item ${isCurrentPage ? 'active' : ''}`}>
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(pageNumber)}
                    aria-current={isCurrentPage ? 'page' : undefined}
                  >
                    {pageNumber}
                  </button>
                </li>
              );
            })}

            {/* Next button */}
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button
                className="page-link"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label="Next page"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-right" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
                </svg>
              </button>
            </li>
          </ul>
        </nav>
      )}

      {/* Page info */}
      {totalPages > 1 && (
        <div className="text-center text-muted small">
          Showing {startIndex + 1}-{Math.min(endIndex, plants.length)} of {plants.length} plants
        </div>
      )}
    </div>
  );
};

export default PlantGrid;
