import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { Music2, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
    const [formData, setFormData] = useState({
        email: "",
    });
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const generateOTP = () => {
        return Math.floor(100000 + Math.random() * 900000).toString();
    };
    const expiryTime = new Date(
        Date.now() + 3 * 60 * 1000
    ).toLocaleTimeString();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.email) {
            alert("Please enter your email");
            return;
        }

        try {
            setLoading(true);

            const generatedOTP = generateOTP();

            await emailjs.send(
                "service_krsrmcf",
                "template_u2f7dln",
                {
                    to_email: formData.email,
                    passcode: generatedOTP,

                },
                "FnhNGd84fm8nIliKV"
            );

            // Save OTP temporarily
            localStorage.setItem("resetOTP", generatedOTP);
            localStorage.setItem("resetEmail", formData.email);

            alert(`OTP sent successfully to ${formData.email}`);

            console.log("Generated OTP:", generatedOTP);
            navigate("/reset");
        } catch (error) {
            console.error("EmailJS Error:", error);

            alert(
                error?.text ||
                error?.message ||
                "Failed to send OTP"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center px-4">
            {/* Background Glow */}
            <div className="absolute w-[450px] h-[450px] bg-green-500/20 blur-3xl rounded-full"></div>

            {/* Card */}
            <div className="relative z-10 w-full max-w-md bg-[#121212] border border-zinc-800 rounded-2xl shadow-2xl p-8">
                {/* Logo */}
                <div className="flex flex-col items-center mb-8">
                    <div className="bg-green-500 p-4 rounded-full mb-4">
                        <Music2 className="text-black w-8 h-8" />
                    </div>

                    <h2 className="text-2xl font-bold text-white">
                        Forget Password
                    </h2>

                    <p className="text-zinc-400 text-sm mt-2 text-center">
                        Enter your email address to receive an OTP.
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="text-white text-sm mb-2 block">
                            Email Address
                        </label>

                        <div className="flex items-center bg-[#1e1e1e] border border-zinc-700 rounded-lg px-3">
                            <Mail className="text-zinc-400 w-5 h-5" />

                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        email: e.target.value,
                                    })
                                }
                                placeholder="Enter your email"
                                autoComplete="email"
                                required
                                className="w-full bg-transparent text-white px-3 py-3 outline-none"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full font-bold py-3 rounded-full transition-all duration-300 ${loading
                            ? "bg-zinc-500 cursor-not-allowed"
                            : "bg-green-500 hover:bg-green-400 text-black"
                            }`}
                    >
                        {loading ? "Sending OTP..." : "Send OTP"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ForgetPassword;