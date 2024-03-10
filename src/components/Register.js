import React, { useState ,useEffect} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import axios from 'axios';

const Register = () => {
    const { token, setToken ,user ,setUser} = useAuth(null);

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
      
        password: '',
        re_password: ''
    });

    const { username, email, password, re_password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();

        if (password === re_password) {
            try {
                const response = await axios.post('http://127.0.0.1:8000/api/signup', {
                    username,
                    password,
                });
            
                console.log(response.data); // Log the response data

                if (response.status === 200) {
                    const data = response.data;
                    const receivedToken = data.token;
                    setToken(receivedToken);
                    localStorage.setItem('authToken', token);
                    setUser(data.user);
                    console.log('Received Token:', receivedToken);
                    navigate('/profilecreate');
                } 
            } catch (error) {
                console.error('Error:', error.message);
            }
        }
    };
    if(token){
        navigate(`/`)
        }
    return (
        <div className='container mt-5'>
            <h1>Register as a provider</h1>
            <form onSubmit={e => onSubmit(e)}>
                <div className='form-group'>
                    <label className='form-label'>Username: </label>
                    <input
                        className='form-control'
                        type='text'
                        placeholder='Username*'
                        name='username'
                        onChange={e => onChange(e)}
                        value={username}
                        required
                    />
                </div>
               
                <div className='form-group'>
                    <label className='form-label mt-3'>Password: </label>
                    <input
                        className='form-control'
                        type='password'
                        placeholder='Password*'
                        name='password'
                        onChange={e => onChange(e)}
                        value={password}
                        minLength='6'
                        required
                    />
                </div>
                <div className='form-group'>
                    <label className='form-label mt-3'>Confirm Password: </label>
                    <input
                        className='form-control'
                        type='password'
                        placeholder='Confirm Password*'
                        name='re_password'
                        onChange={e => onChange(e)}
                        value={re_password}
                        minLength='6'
                        required
                    />
                </div>
                <button className='btn btn-primary mt-3' type='submit'>
                    Register
                </button>
            </form>
            <p className='mt-3'>
                Already have an Account? <Link to='/login'>Sign In</Link>
            </p>
        </div>
    );
};

export default Register;
