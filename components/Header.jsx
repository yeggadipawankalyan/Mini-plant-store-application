import React from 'react';

const Header = ({ onAddPlantClick }) => {
  return (
    <header>
      <nav className="navbar bg-white shadow-sm sticky-top">
        <div className="container">
          <a className="navbar-brand d-flex align-items-center" href="#">
            <div className="logo-icon me-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-flower1" viewBox="0 0 16 16">
                    <path d="M8 5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5m0 1a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7M6.5 7A1.5 1.5 0 1 0 5 8.5 1.5 1.5 0 0 0 6.5 7m3 0A1.5 1.5 0 1 0 11 8.5 1.5 1.5 0 0 0 9.5 7M6.5 10A1.5 1.5 0 1 0 5 11.5 1.5 1.5 0 0 0 6.5 10m3 0A1.5 1.5 0 1 0 11 11.5 1.5 1.5 0 0 0 9.5 10M10 6.5A1.5 1.5 0 1 0 8.5 5 1.5 1.5 0 0 0 10 6.5m-3 0A1.5 1.5 0 1 0 5.5 5 1.5 1.5 0 0 0 7 6.5m-2 3A1.5 1.5 0 1 0 3.5 8 1.5 1.5 0 0 0 5 9.5m5 0A1.5 1.5 0 1 0 11.5 8 1.5 1.5 0 0 0 10 9.5"/>
                </svg>
            </div>
            <span className="navbar-brand-title">Plantify Plant Store</span>
          </a>
          <button
            onClick={onAddPlantClick}
            className="btn btn-success d-flex align-items-center gap-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"/>
            </svg>
            <span className="d-none d-sm-inline">Add Plant</span>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
