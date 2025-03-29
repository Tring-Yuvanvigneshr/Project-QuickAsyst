import React, { useState, useEffect } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { signIn } from 'aws-amplify/auth';
import { useNavigate } from 'react-router-dom';
import signIn_Background from './../../assets/images/img.png';
import logo from './../../assets/images/logo.png';
import divider from './../../assets/images/Divider.png';
import CircularProgress from '@mui/material/CircularProgress';
import { toast } from "react-toastify";
import './Signin.css';


const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: "onChange"
  });

  const onSubmit = async (data) => {
    const { email, password } = data;
    setLoading(true);

    try {
      const user = await signIn({
        username: email,
        password
      }
      );
      console.log(user);
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.message || 'sign in failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-left">
        <img src={signIn_Background} alt="Stadium" className="signin-image" />
        <div className="signin-overlay">
          <h3><img src={divider} className='divider' alt="divider" /> QuickAsyst Admin Dashboard</h3>
          <h1>Manage your ticketing empire from one central hub</h1>
        </div>
      </div>

      <div className="signin-right">
        <img src={logo} alt="logo" />
        <h2>Welcome to QuickAsyst Portal</h2>
        <p>Login to access admin portal</p>

        <form className="signin-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter Email"
              form="novalidatedform"
              {...register("email", {
                required: "Email is required!",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Enter a valid email",
                },
              })}
              className={errors.email ? "error-input" : ""}
            />
            {errors.email && <span className="error-message">{errors.email.message}</span>}
          </div>

          <div className="input-group">
            <label>Password</label>
            <div className="password-container">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                form="novalidatedform"
                {...register("password", {
                  required: "Password is required!",
                })}
                className={errors.password ? "error-input" : ""}
              />
              <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
            {errors.password && <span className="error-message">{errors.password.message}</span>}
          </div>

          <div className="forgot-password">
            <a>Forgot Password?</a>
          </div>

            {loading ? <div className="loading-container"><CircularProgress className='loading-circle' size={24} /></div> : ""}
          <button type="submit" className="signin-button" disabled={loading}>
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;