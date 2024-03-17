import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import Navbar from "./Navbar";
import defaultProfilePhoto1 from "../assets/med yahya.jpg"; 
import defaultProfilePhoto2 from "../assets/delivery.jpg";
import defaultProfilePhoto3 from "../assets/da7ye.jpg";

const Profile = () => {
  const { id } = useParams();
  const [Profile, setProfile] = useState([]);
  const [participantsData, setParticipantsData] = useState([]);
  const defaultProfilePhotos = [defaultProfilePhoto1, defaultProfilePhoto2, defaultProfilePhoto3];

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/providers/${id}/`)
      .then((response) => response.json())
      .then((data) => setProfile(data));
  }, [id]);

  const fetchParticipantData = async (participant) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/categoryProvider/${participant}/`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching participant data:", error);
      return ""; // or handle the error accordingly
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (Profile.categories) {
        const participantDataPromises = Profile.categories.map((categories) =>
          fetchParticipantData(categories)
        );
        const data = await Promise.all(participantDataPromises);
        setParticipantsData(data);
      }
    };

    fetchData();
  }, [Profile.categories]);

  return (
    <>
      <Navbar />
      <div className="bg-dark text-light min-vh-100 py-5">
        <div className="container-xl">
          <div className="row">
            <div key={Profile.id} className="col-lg-8 offset-lg-2">
              <div className="card shadow-lg bg-light text-dark rounded-3">
                <div className="card-body">
                  <div className="row mb-4">
                    <div className="col-3">
                      <img
                        src={defaultProfilePhotos[Profile.id % defaultProfilePhotos.length]}
                        className="img-fluid rounded-circle"
                        alt="Profile"
                      />
                    </div>
                    <div className="col-9 d-flex align-items-center">
                      <h4 className="card-title mb-0 fw-bold">{Profile.name}.{Profile.last_name}</h4>
                    </div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-6">
                      <h6 className="card-text mb-1 mx-5 fw-bold">Email:</h6>
                      <p className="card-text mx-5">{Profile.email}</p>
                    </div>
                    <div className="col-6">
                      <h6 className="card-text mx-5 mb-1 fw-bold">Phone:</h6>
                      <p className="card-text mx-5">{Profile.phone_number}</p>
                    </div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-6">
                      <h6 className="card-text mb-1 mx-5 fw-bold">Price Per hour:</h6>
                      <p className="card-text mx-5">{Profile.price}</p>
                    </div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-6">
                      <h6 className="card-text mb-1 mx-5 fw-bold">Description Small:</h6>
                      <p className="card-text mx-5">{Profile.description_small}</p>
                    </div>
                    <div className="col-6">
                      <h6 className="card-text mx-5 mb-1 fw-bold">Description Big:</h6>
                      <p className="card-text mx-5">{Profile.description_big}</p>
                    </div>
                  </div>
                  <div className="row mb-2">
                    <div className="col ">
                      <h5 className="card-text mb-1 mx-5 fw-bold">Les categories</h5>
                      {participantsData.map((participant, index) => (
                        <p key={index} className="card-text mx-5 mb-0">{participant.name}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
