import React, { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom';
import Navbar from "./Navbar";

const Categorieprovider = () => {
  const { id } = useParams();
  const [categoriesp, setCategoriesp] = useState([]);
  const [participantsData, setParticipantsData] = useState([]);

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
      <div className="row">
        <div className="col-sm-3 mb-3 mb-sm-0">
          {categoriesp && (
            <>
              <h5 className="card-title"> {categoriesp.name} </h5>
              <p className="card-text">{categoriesp.description}</p>
              {participantsData.map((participant, index) => (
               <Link to={`/profiles/${participant.id}`} className="card-link"> <p key={index} className="card-title" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {participant.name}{participant.last_name}
                </p>
                </Link>
                ))}
              </> )}
        </div>
      </div>
    </>
  );
}

export default Categorieprovider;
