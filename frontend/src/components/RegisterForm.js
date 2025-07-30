import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase/config';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const RegisterForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();


    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const token = await userCredential.user.getIdToken();

            const res = await axios.post('http://localhost:5000/api/auth/verify', {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setMsg(`Registered ✅ Hello ${res.data.user.email}`);
        } catch (err) {
            setMsg(err.message);
        }
    };

    const handleGoogleSignup = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const token = await result.user.getIdToken();

            const res = await axios.post('http://localhost:5000/api/auth/verify', {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setMsg(`Google Login ✅ Hello ${res.data.user.email}`);
            navigate('/login');

        } catch (err) {
            setMsg(err.message);
        }
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                /><br /><br />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                /><br /><br />
                <button type="submit">Register</button>
            </form>
            <br />
            <button onClick={handleGoogleSignup}>Continue with Google</button>
            <p>{msg}</p>
        </div>
    );
};

export default RegisterForm;
