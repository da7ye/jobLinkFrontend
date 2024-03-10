import React,{ useState, useEffect }  from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

const Categorie = ()=>{
    const [categories, setCategories] = useState([]);
  
    useEffect(() => {
      fetch('http://127.0.0.1:8000/api/categories/')
        .then((response) => response.json())
        .then((data) => setCategories(data));
    }, []);
    return(
        <>
        <Navbar/> 
        <div className="row">
        {categories.map((categories) => (
            <div key={categories.id}className="col-sm-3 mb-3 mb-sm-0">
                <div className="card">
                <div className="card-body">
                    <h5 className="card-title"> {categories.name} </h5>
                    <p className="card-text">{categories.description}.</p>
                    <Link to={`/categoryProviders/${categories.id}`}  className="ard-link">More ....</Link>
                </div>
                </div>
            </div>
            ))};
            </div>
        </>
    );
}

export default Categorie;