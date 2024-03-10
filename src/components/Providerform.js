import React, { useState, useEffect, Fragment } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import axios from 'axios';
import Navbar from './Navbar';

const ProviderForm = () => {
  const { token ,user} = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    profile_photo: null,
    name: '',
    last_name: '',
    email: '',
    gender: '',
    phone_number: '',
    price: '',
    categories: [],
    description_small: '',
    description_big: '',
  });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/categories/')
      .then((response) => response.json())
      .then((data) => setCategories(data));
  }, []);

  const handleChange = (e) => {
    console.log('Event:', e);
    const { name, value, type } = e.target;
    if (type === 'select-multiple') {
      const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
      setFormData({ ...formData, [name]: selectedOptions });
    } else {
      if (['phone_number', 'price'].includes(name) && !/^\d+$/.test(value)) {
        return; 
      }
      setFormData({ ...formData, [name]: value });
    }
  };
  

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, profile_photo: file || null });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('profile_photo', formData.profile_photo);
      formDataToSend.append('name', formData.name);
      formDataToSend.append('last_name', formData.last_name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('gender', formData.gender);
      formDataToSend.append('phone_number', formData.phone_number);
      formDataToSend.append('price', formData.price);
      formData.categories.forEach((category) => formDataToSend.append('categories', category));
      formDataToSend.append('description_small', formData.description_small);
      formDataToSend.append('description_big', formData.description_big.replace(/\r\n/g, '\n'));


      console.log('FormData:', formData); 
      console.log('Token:', token);
      const response = await axios.post('http://127.0.0.1:8000/api/createProvider/', formData, {
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'multipart/form-data'
        },
      });

      if (response.data) {
        navigate(`/profiles/${user.id}`);
      } else {
        console.error('Error:', 'Response data is undefined.');
      }
    } catch (error) {
  
    console.error('Error:', error.response.data);
    }
  };

  if(!token){
    navigate('/')
    }
  return (
    <Fragment>
      <Navbar/>
      <div className="container mt-5">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="id_profile_photo" className="form-label">
              Profile Photo:
            </label>
            <input
              type="file"
              className="form-control"
              id="id_profile_photo"
              name="profile_photo"
              onChange={handleFileChange}
            />
          </div>
          
          <div className="mb-3">
            <label htmlFor="id_name" className="form-label">
              Name:
            </label>
            <input
              type="text"
              className="form-control"
              id="id_name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          
          <div className="mb-3">
            <label htmlFor="id_last_name" className="form-label">
              Last Name:
            </label>
            <input
              type="text"
              className="form-control"
              id="id_last_name"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="id_email" className="form-label">
              Email:
            </label>
            <input
              type="email"
              className="form-control"
              id="id_email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="id_gender" className="form-label">
              Gender:
            </label>
            <select
              className="form-select"
              id="id_gender"
              name="gender"
              onChange={handleChange}
            >
              <option value="M">Male</option>
              <option value="F">Female</option>
        
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="id_phone_number" className="form-label">
              Phone Number:
            </label>
            <input
              type="tel"
              className="form-control"
              id="id_phone_number"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="id_price" className="form-label">
              Price:
            </label>
            <input
              type="number"
              className="form-control"
              id="id_price"
              name="price"
              value={formData.price}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="id_categories" className="form-label">
              Categories:
            </label>
            <select
              multiple
              className="form-select"
              id="id_categories"
              name="categories"
              onChange={handleChange}
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        
          <div className="mb-3">
            <label htmlFor="id_description_small" className="form-label">
                Small Description:
            </label>
            <textarea
                className="form-control"
                id="id_description_small"
                name="description_small"
                value={formData.description_small}
                onChange={handleChange}
            />
            </div>

            <div className="mb-3">
            <label htmlFor="id_description_big" className="form-label">
                Big Description:
            </label>
            <textarea
                className="form-control"
                id="id_description_big"
                name="description_big"
                value={formData.description_big}
                onChange={handleChange}
            />
            </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default ProviderForm;
