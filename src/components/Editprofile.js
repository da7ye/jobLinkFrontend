import React, { useState, useEffect, Fragment } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from './AuthContext';

const EditProfile = () => {
  const { token } = useAuth();
  const { providerId } = useParams();
  const navigate = useNavigate();

  const [userId, setUserId] = useState("");
  const [formData, setFormData] = useState({
    profilePhoto: null,
    name: '',
    lastName: '',
    email: '',
    gender: '',
    phoneNumber: '',
    price: '',
    categories: [],
    descriptionSmall: '',
    descriptionBig: '',
  });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (providerId) {
      fetch(`http://127.0.0.1:8000/api/providers/${providerId}/`)
        .then(response => response.json())
        .then(data => {
          setFormData({
            profilePhoto: null,
            name: data.name,
            lastName: data.lastName,
            email: data.email,
            gender: data.gender,
            phoneNumber: data.phoneNumber,
            price: data.price,
            categories: data.categories,
            descriptionSmall: data.descriptionSmall,
            descriptionBig: data.descriptionBig,
          });
        })
        .catch(error => {
          console.error("Error fetching provider data:", error);
        });
    }
  }, [providerId]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/categories/')
      .then(response => response.json())
      .then(data => setCategories(data));
  }, []);

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === 'select-multiple') {
      const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
      setFormData({ ...formData, [name]: selectedOptions });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, profilePhoto: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('profilePhoto', formData.profilePhoto);
      formDataToSend.append('name', formData.name);
      formDataToSend.append('lastName', formData.lastName);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('gender', formData.gender);
      formDataToSend.append('phoneNumber', formData.phoneNumber);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('categories', JSON.stringify(formData.categories));
      formDataToSend.append('descriptionSmall', formData.descriptionSmall);
      formDataToSend.append('descriptionBig', formData.descriptionBig);

      const response = await fetch(`http://127.0.0.1:8000/api/providers/${providerId}/`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to update data');
      }

      navigate(`/profiles/${userId}`);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
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
            name="profilePhoto"
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
            name="lastName"
            value={formData.lastName}
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
            value={formData.gender}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
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
            name="phoneNumber"
            value={formData.phoneNumber}
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
            value={formData.categories}
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
            name="descriptionSmall"
            value={formData.descriptionSmall}
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
            name="descriptionBig"
            value={formData.descriptionBig}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Update
        </button>
      </form>
    </div>
  </>
  );
};

export default EditProfile;
