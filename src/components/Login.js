import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
const Login = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const {token,setToken,user,setUser} = useAuth(null); // State to store the token

    const { username, password } = formData;

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://127.0.0.1:8000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to log in');
            }

            // Extract the token from the response
            const data = await response.json();
            const receivedToken = data.token;

            // Set the token in the state
            setUser(data.user);
            setToken(receivedToken);
            console.log('Received Token:', data.user);
            // Redirect to the home page
            navigate(`/profiles/${user.id}`);
        } catch (error) {
            console.error('Error:', error);
        }
    };
if(token){
navigate(`/`)
}
    return (
        <div className='container mt-5'>
            <h1>Sign In</h1>
            <p>Sign into your Session Auth account</p>
            <form onSubmit={(e) => onSubmit(e)}>
                {/* CSRFToken component might be used here */}
                <div className='form-group'>
                    <label className='form-label'>Username: </label>
                    <input
                        className='form-control'
                        type='text'
                        placeholder='Username*'
                        name='username'
                        onChange={(e) => onChange(e)}
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
                        onChange={(e) => onChange(e)}
                        value={password}
                        minLength='6'
                        required
                    />
                </div>
                <button className='btn btn-primary mt-3' type='submit'>
                    Login
                </button>
            </form>
            <p className='mt-3'>
                Don't have an Account? <Link to='/register'>Sign Up</Link>
            </p>
            {/* {token && <p className='mt-3'>Token: {token}</p>} */}
        </div>
    );
};

export default Login;
