import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";

const Provider = () => {
  const [providers, setProviders] = useState([]);
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/providers/')
      .then((response) => response.json())
      .then((data) => setProviders(data));
  }, []);

  return (
    <>
      <Navbar />
      <div className="row">
        {providers.map((provider) => (
          <div key={provider.id} className="col-sm-3 mb-3 mb-sm-0">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title"> {provider.name} </h5>
                <h6 className="card-text">Email : {provider.email}.</h6>
                <h6 className="card-text">Phone : {provider.phone_number}.</h6> 
                <h6 className="card-text">Price : {provider.price}.</h6>
                <h6 className="card-text">descriptionSmall :  {provider.description_small}.</h6>
                <h6 className="card-text">descriptionBig :{provider.description_big}.</h6> 
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Provider;
