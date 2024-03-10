import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import Navbar from "./Navbar";

const Profile = () => {
  const { id } = useParams();
  const [Profile, setProfile] = useState([]);
  const [participantsData, setParticipantsData] = useState([]);
 
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
      <div className="row">
          <div key={Profile.id} className="col-sm-3 mb-3 mb-sm-0">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title"> {Profile.name}.{Profile.last_name} </h4>
                <h6 className="card-text">Email : {Profile.email}.</h6>
                <h6 className="card-text">Phone : {Profile.phone_number}.</h6> 
                <h6 className="card-text">Price : {Profile.price}.</h6>
                <h6 className="card-text">descriptionSmall :  {Profile.description_small}.</h6>
                <h6 className="card-text">descriptionBig : {Profile.description_big}.</h6>
                <h5 className="card-text">Les categories </h5>
                {participantsData.map((participant, index) => (
                  <p className="card-text">
                  {participant.name}
                </p>
                ))}
              </div>
            </div>
          </div>
      </div>
    </>
  );
}

export default Profile;