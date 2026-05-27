import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Music2,
  Mail,
  Lock,
  User,
  Phone,
  ShieldCheck,
} from "lucide-react";
import AuthApi from "../auth/auth.api";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    username: "",
    phone: "",
    role: "",
    password: ""
  });
  const [error, setError] = useState("");
  const change =()=>{
    navigate ('/login')
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const registerData = {
        email: formData.email,
        name: formData.name,
        username: formData.username,
        phone: formData.phone,
        role: formData.role,
        password: formData.password
      };

      const res = await AuthApi.signup(registerData);

      if (res) {
        navigate("/login", {
          replace: true,
          state: {
            message: "Signup successful! Please login.",
            email: formData.email,
          },
        });
      }

    } catch (err) {
      setError(
        err?.message ||
          "Registration failed"
      );
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-10">

      {/* Background Glow */}
      <div className="absolute w-125 h-500 bg-green-500/20 blur-3xl rounded-full"></div>

      {/* Register Card */}
      <div className="relative z-10 w-full max-w-md bg-[#121212] border border-zinc-800 rounded-2xl shadow-2xl p-8">

        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="bg-green-500 p-4 rounded-full mb-4">
            <Music2 className="text-black w-8 h-8" />
          </div>

          <h1 className="text-3xl font-bold text-white">
            Sign up for Music
          </h1>

          <p className="text-zinc-400 mt-2 text-sm">
            Create your music account
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500/20 border border-red-500 rounded-lg p-3 mb-4">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>

          {/* Name */}
          <div>
            <label className="text-white text-sm mb-2 block">
              Full Name
            </label>

            <div className="flex items-center bg-[#1e1e1e] border border-zinc-700 rounded-lg px-3">
              <User className="text-zinc-400 w-5 h-5" />

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full bg-transparent text-white px-3 py-3 outline-none"
                required
              />
            </div>
          </div>

          {/* Username */}
          <div>
            <label className="text-white text-sm mb-2 block">
              Username
            </label>

            <div className="flex items-center bg-[#1e1e1e] border border-zinc-700 rounded-lg px-3">
              <User className="text-zinc-400 w-5 h-5" />

              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter username"
                className="w-full bg-transparent text-white px-3 py-3 outline-none"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="text-white text-sm mb-2 block">
              Email
            </label>

            <div className="flex items-center bg-[#1e1e1e] border border-zinc-700 rounded-lg px-3">
              <Mail className="text-zinc-400 w-5 h-5" />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full bg-transparent text-white px-3 py-3 outline-none"
                required
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="text-white text-sm mb-2 block">
              Phone Number
            </label>

            <div className="flex items-center bg-[#1e1e1e] border border-zinc-700 rounded-lg px-3">
              <Phone className="text-zinc-400 w-5 h-5" />

              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
                className="w-full bg-transparent text-white px-3 py-3 outline-none"
              />
            </div>
          </div>

          {/* Role */}
          <div>
            <label className="text-white text-sm mb-2 block">
              Role
            </label>

            <div className="flex items-center bg-[#1e1e1e] border border-zinc-700 rounded-lg px-3">
              <ShieldCheck className="text-zinc-400 w-5 h-5" />

              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full bg-transparent text-white px-3 py-3 outline-none"
                required
              >
                <option className="bg-black" value="">Select Role</option>
                <option className="bg-black" value="user">
                  User
                </option>
                <option className="bg-black" value="admin">
                  Admin
                </option>
              </select>
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-white text-sm mb-2 block">
              Password
            </label>

            <div className="flex items-center bg-[#1e1e1e] border border-zinc-700 rounded-lg px-3">
              <Lock className="text-zinc-400 w-5 h-5" />

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="w-full bg-transparent text-white px-3 py-3 outline-none"
                required
              />
            </div>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-400 transition-all duration-300 text-black font-bold py-3 rounded-full"
          >
            Create Account
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-1px bg-zinc-700"></div>
          <span className="text-zinc-400 text-sm">or</span>
          <div className="flex-1 h-1px bg-zinc-700"></div>
        </div>

        {/* Google Button */}
        <button className="w-full border border-zinc-700 hover:border-white text-white py-3 rounded-full transition-all">
          Continue with Google
        </button>

        {/* Login Link */}
        <p className="text-zinc-400 text-center mt-6 text-sm">
          Already have an account?

          <span onClick={change} className="text-green-500 hover:underline cursor-pointer ml-2">
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;