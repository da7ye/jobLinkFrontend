import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import defaultProfilePhoto1 from "../assets/med yahya.jpg"; 
import defaultProfilePhoto2 from "../assets/delivery.jpg";
import defaultProfilePhoto3 from "../assets/da7ye.jpg";
import { Link, useParams } from 'react-router-dom';

const Categorieprovider = () => {
  const { id } = useParams();
  const [categoriesp, setCategoriesp] = useState([]);
  const [participantsData, setParticipantsData] = useState([]);
  const defaultProfilePhotos = [defaultProfilePhoto1, defaultProfilePhoto2, defaultProfilePhoto3];

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/categoryProvider/${id}/`)
      .then((response) => response.json())
      .then((data) => setCategoriesp(data));
  }, [id]);

  const fetchParticipantData = async (participant) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/providers/${participant}/`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching participant data:", error);
      return "";
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (categoriesp.participants) {
        const participantDataPromises = categoriesp.participants.map((participant) =>
          fetchParticipantData(participant)
        );
        const data = await Promise.all(participantDataPromises);
        setParticipantsData(data);
      }
    };
    fetchData();
  }, [categoriesp.participants]);

  return (
    <>
      <Navbar />
      <div className="bg-dark text-light min-vh-100">
        <div className="container mt-4">
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {participantsData.map((participant, index) => (
              <div key={participant.id} className="col mb-4">
                <div className="card h-100 shadow-sm border-0 bg-light text-dark d-flex flex-column position-relative">
                  <div className="position-absolute end-0 top-0 bottom-0">
                    <img
                      src={defaultProfilePhotos[index % defaultProfilePhotos.length]}
                      className="card-img-top h-100"
                      alt="Provider Profile"
                    />
                  </div>
                  <div className="card-body">
                    <Link
                      to={`/profiles/${participant.id}`}
                      className="card-link"
                      style={{ textDecoration: 'none' }}
                    >
                      <h5
                        className="card-title mb-4"
                        style={{
                          color: 'blue',
                          textDecoration: 'none',
                          cursor: 'pointer',
                          transition: 'color 0.3s ease',
                          fontSize: '1.4rem', // Larger font size for the name
                        }}
                        onMouseEnter={(e) => e.target.style.color = 'red'}
                        onMouseLeave={(e) => e.target.style.color = 'blue'}
                      >
                        {participant.name}
                      </h5>
                    </Link>
                    <h6 className="card-text" style={{ fontSize: '0.8rem' }}>{participant.email}</h6> {/* Smaller font size */}
                    <h6 className="card-text" style={{ fontSize: '0.8rem' }}> {/* Smaller font size */}
                      Phone: {participant.phone_number}
                    </h6>
                    <h6 className="card-text" style={{ fontSize: '0.8rem' }}>Price Per hour: {participant.price}</h6> {/* Smaller font size */}
                    <p className="card-text" style={{ fontSize: '0.6rem' }}>{participant.description_small}</p> {/* Very small font size */}
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

export default Categorieprovider;
