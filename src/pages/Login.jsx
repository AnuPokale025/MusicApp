import React, { useState } from "react";
import { Music2, Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AuthApi from "../auth/auth.api";
import Cookies from "js-cookie"
import { useAuth } from "../context/Authcontext";

const Login = () => {
  const [formData, setFormdata] = useState({
    emailOrUsername: "",
    password: "",
  });
  const { login } = useAuth();

  const navigate = useNavigate();

  const change = () => {
    navigate("/register");
  };

  // Handle Input Change
  const handleChange = (e) => {
    setFormdata({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle Submit
 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    // Validation
    if (!formData.emailOrUsername || !formData.password) {
      return alert("All fields are required");
    }

    const loginData = {
      emailOrUsername: formData.emailOrUsername,
      password: formData.password,
    };

    const res = await AuthApi.login(loginData);

    console.log(res.data);

    // IMPORTANT
    const { token, role, account } = res;

    // Save token + user in cookies
    login(account, token);

    console.log(Cookies.get("token"));

    const findrole = role.toLowerCase();

    // Navigate based on role
    if (findrole === "admin") {
      navigate("/", { replace: true });
    } else {
      navigate("/", { replace: true });
    }

  } catch (error) {
    console.log(error?.response?.data || error.message);
  }
};

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      {/* Background Glow */}
      <div className="absolute w-[450px] h-[450px] bg-green-500/20 blur-3xl rounded-full"></div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md bg-[#121212] border border-zinc-800 rounded-2xl shadow-2xl p-8">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="bg-green-500 p-4 rounded-full mb-4">
            <Music2 className="text-black w-8 h-8" />
          </div>

          <h3 className="text-2xl font-bold text-white">
            Login to Music
          </h3>
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Email OR Username */}
          <div>
            <label className="text-white text-sm mb-2 block">
              Email OR Username
            </label>

            <div className="flex items-center bg-[#1e1e1e] border border-zinc-700 rounded-lg px-3">
              <Mail className="text-zinc-400 w-5 h-5" />

              <input
                type="text"
                name="emailOrUsername"
                value={formData.emailOrUsername}
                onChange={handleChange}
                placeholder="Enter your email or username"
                autoComplete="username"
                className="w-full bg-transparent text-white px-3 py-3 outline-none"
              />
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
                placeholder="Enter your password"
                autoComplete="current-password"
                className="w-full bg-transparent text-white px-3 py-3 outline-none"
              />
            </div>
          </div>

          {/* Forgot Password */}
          <div className="flex justify-end">
            <button
              type="button"
              className="text-sm text-green-500 hover:underline"
            >
              Forgot Password?
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-400 transition-all duration-300 text-black font-bold py-3 rounded-full"
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-[1px] bg-zinc-700"></div>
          <span className="text-zinc-400 text-sm">or</span>
          <div className="flex-1 h-[1px] bg-zinc-700"></div>
        </div>

        {/* Google Login */}
        <button className="w-full border border-zinc-700 hover:border-white text-white py-3 rounded-full transition-all">
          Continue with Google
        </button>

        {/* Signup */}
        <p className="text-zinc-400 text-center mt-6 text-sm">
          Don’t have an account?

          <span
            onClick={change}
            className="text-green-500 hover:underline cursor-pointer ml-2"
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;