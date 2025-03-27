import React, { useState } from 'react'
import signIn_Background from './../../assets/images/img.png';
import logo from './../../assets/images/logo.png';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import './Signin.css'

const signIn = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange"
  });

  const onSubmit = (data) => {
    console.log("Form submitted", data);
  };

  return (
    <div className="signin-container">
      <div className="signin-left">   
          <img src={signIn_Background} alt="Stadium" className="signin-image"/>
        <div className="signin-overlay">
          <h3>___ QuickAsyst Admin Dashboard</h3>
          <h1>Manage your ticketing empire from one </h1><h1>central hub</h1>
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
                {...register("password", {
                  required: "Password is required!",
                  minLength: {
                    value: 8,
                    message: "Password should be at least 8 characters",
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message:
                      "Password must contain at least one uppercase, one lowercase, one number, and one special character",
                  },
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

          <button type="submit" className="signin-button">Sign In</button>
        </form>
      </div>
    </div>
  )
}

export default signIn