import React, { useState } from "react";
import { Music2, Mail, Lock, KeyRound } from "lucide-react";
import AuthApi from "../auth/auth.api";

const ResetPassword = () => {
    const [formData, setFormData] = useState({
        email: "",
        otp: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     const savedOTP = localStorage.getItem("resetOTP");
    //     const savedEmail = localStorage.getItem("resetEmail");

    //     if (formData.email !== savedEmail) {
    //         alert("Email does not match.");
    //         return;
    //     }

    //     if (formData.otp !== savedOTP) {
    //         alert("Invalid OTP");
    //         return;
    //     }

    //     try {
    //         // TODO: Call your backend API here
    //         // await AuthApi.resetPassword({
    //         //     email: formData.email,
    //         //     password: formData.password,
    //         // });

    //         alert("Password reset successfully!");

    //         localStorage.removeItem("resetOTP");
    //         localStorage.removeItem("resetEmail");

    //         setFormData({
    //             email: "",
    //             otp: "",
    //             password: "",
    //         });
    //     } catch (error) {
    //         alert(error.message || "Failed to reset password");
    //     }
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await AuthApi.resetPassword({
                email: formData.email,
                password: formData.password,
                otp: formData.otp,
            });
            console.log(res);


            if (res.success) {
                alert("Password reset successfully!");
            } else {
                alert(res.message || "Failed to reset password");
            }
        } catch (error) {
            alert(error.message || "Failed to reset password");
        }


    }

    return (
        <div className="min-h-screen bg-black flex items-center justify-center px-4">
            <div className="absolute w-[450px] h-[450px] bg-green-500/20 blur-3xl rounded-full"></div>

            <div className="relative z-10 w-full max-w-md bg-[#121212] border border-zinc-800 rounded-2xl shadow-2xl p-8">
                {/* Logo */}
                <div className="flex flex-col items-center mb-8">
                    <div className="bg-green-500 p-4 rounded-full mb-4">
                        <Music2 className="text-black w-8 h-8" />
                    </div>

                    <h2 className="text-2xl font-bold text-white">
                        Reset Password
                    </h2>

                    <p className="text-zinc-400 text-sm mt-2 text-center">
                        Enter OTP and create a new password
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
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
                            />
                        </div>
                    </div>

                    {/* OTP */}
                    <div>
                        <label className="text-white text-sm mb-2 block">
                            OTP
                        </label>

                        <div className="flex items-center bg-[#1e1e1e] border border-zinc-700 rounded-lg px-3">
                            <KeyRound className="text-zinc-400 w-5 h-5" />

                            <input
                                type="text"
                                name="otp"
                                value={formData.otp}
                                onChange={handleChange}
                                placeholder="Enter OTP"
                                className="w-full bg-transparent text-white px-3 py-3 outline-none"
                            />
                        </div>
                    </div>

                    {/* New Password */}
                    <div>
                        <label className="text-white text-sm mb-2 block">
                            New Password
                        </label>

                        <div className="flex items-center bg-[#1e1e1e] border border-zinc-700 rounded-lg px-3">
                            <Lock className="text-zinc-400 w-5 h-5" />

                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter new password"
                                className="w-full bg-transparent text-white px-3 py-3 outline-none"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        onClick={handleSubmit}
                        className="w-full bg-green-500 hover:bg-green-400 transition-all duration-300 text-black font-bold py-3 rounded-full"
                    >
                        Reset Password
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;