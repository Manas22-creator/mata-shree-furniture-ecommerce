import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const navigate = useNavigate();
  const { register, userInfo, loading, error } = useContext(AuthContext);

  useEffect(() => {
    if (userInfo) navigate("/");
  }, [userInfo, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      setMessage(null);
      register(name, email, password);
    }
  };

  return (
    <div className="form-container">
      <h1>Sign Up</h1>
      {message && <p className="error-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
      {loading && <p>Loading...</p>}

      <form onSubmit={submitHandler}>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" />
        <button type="submit">Register</button>
      </form>

      <Link to="/login">Already have an account?</Link>
    </div>
  );
};

export default RegisterPage;
