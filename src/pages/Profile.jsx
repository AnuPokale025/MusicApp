import React from "react";
import { useAuth } from "../context/Authcontext.jsx";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const handleLogout = () => {
        logout();

        navigate("/", {
            replace: true,
        });
    };


    return (
        <div className="min-h-screen bg-black text-white p-10">
            <div className="max-w-md mx-auto bg-zinc-900 p-6 rounded-2xl">

                <h1 className="text-3xl font-bold mb-6">
                    Profile
                </h1>

                <div className="space-y-4">

                    <div>
                        <p className="text-zinc-400">Name</p>
                        <h2 className="text-lg">{user?.name}</h2>
                    </div>

                    <div>
                        <p className="text-zinc-400">Email</p>
                        <h2 className="text-lg">{user?.email}</h2>
                    </div>

                    <div>
                        <p className="text-zinc-400">Username</p>
                        <h2 className="text-lg">{user?.username}</h2>
                    </div>

                    <div>
                        <p className="text-zinc-400">Phone</p>
                        <h2 className="text-lg capitalize">
                            {user?.phone}
                        </h2>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="w-full bg-red-500 hover:bg-red-600 transition-all duration-300 text-white font-bold py-3 rounded-lg mt-5"
                    >
                        Logout
                    </button>

                </div>
            </div>
        </div>
    );
};

export default Profile;