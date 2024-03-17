import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import defaultProfilePhoto1 from "../assets/med yahya.jpg"; 
import defaultProfilePhoto2 from "../assets/delivery.jpg";
import defaultProfilePhoto3 from "../assets/da7ye.jpg";

const Provider = () => {
  const [providers, setProviders] = useState([]);
  const [currentPhotoIndices, setCurrentPhotoIndices] = useState([]);
  const defaultProfilePhotos = [defaultProfilePhoto1, defaultProfilePhoto2, defaultProfilePhoto3];

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/providers/")
      .then((response) => response.json())
      .then((data) => {
        setProviders(data);
        setCurrentPhotoIndices(new Array(data.length).fill(0));
      });
  }, []);


  return (
    <>
      <Navbar />
      <div className="bg-dark text-light min-vh-100">
        <div className="container mt-4">
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {providers.map((provider, index) => (
              <div key={provider.id} className="col mb-4">
                <div className="card h-100 shadow-sm border-0 bg-light text-dark d-flex flex-column position-relative">
                  <div className="position-absolute end-0 top-0 bottom-0">
                    <img
                    src={defaultProfilePhotos[index % defaultProfilePhotos.length]}
                    className="card-img-top h-100"
                      alt="Provider Profile"
                    />
                  </div>
                  <div className="card-body">
                    <h5 className="card-title mb-4">
                      {provider.name}
                    </h5>
                    <h6 className="card-text">{provider.email}</h6>
                    <h6 className="card-text">
                      Phone: {provider.phone_number}
                    </h6>
                    <h6 className="card-text">Price Per hour: {provider.price}</h6>
                    <h6 className="card-text">
                      {provider.description_small}
                    </h6>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Provider;
