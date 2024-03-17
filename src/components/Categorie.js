import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

const Categorie = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/categories/")
      .then((response) => response.json())
      .then((data) => setCategories(data));
  }, []);

  return (
    <div className="bg-dark text-light min-vh-100">
      <Navbar />
      <div className="container mt-4">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {categories.map((category) => (
            <div key={category.id} className="col mb-4">
              <div className="card h-100 shadow-sm border-0 bg-light text-dark d-flex flex-column">
                <div className="card-body">
                  <h5 className="card-title text-center mb-4">{category.name}</h5>
                  <p className="card-text">{category.description}</p>
                </div>
                <div className="mt-auto">
                  <Link
                    to={`/categoryProviders/${category.id}`}
                    className="btn btn-primary btn-sm d-block w-100"
                    style={{
                      backgroundColor: "#2d89e5", // Dark blue color
                      borderColor: "#2d89e5",
                      transition: "background-color 0.3s, border-color 0.3s",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = "#00317E"; // Darken on hover
                      e.target.style.borderColor = "#00317E";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "#2d89e5"; // Revert to original color
                      e.target.style.borderColor = "#2d89e5";
                    }}
                  >
                    See Providers <i className="bi bi-arrow-right"></i>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categorie;
