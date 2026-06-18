import React, { useEffect, useState } from "react";
import { useAuth } from "../context/Authcontext.jsx";
import { useNavigate } from "react-router-dom";
import {
    User,
    Mail,
    Phone,
    AtSign,
    LogOut,
    Music,
    Heart,
    Disc3,
} from "lucide-react";
import UserApi from "../auth/user.api.js";

const Profile = () => {
    const [favorite, setfavorite] = useState([]);
    const [playlist, setPlaylist] = useState([]);
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/", { replace: true });
    };
    useEffect(() => {
        const fetchFavorite = async () => {
            try {
                const res = await UserApi.getAllFavoriteSong();

                console.log("Favorite Songs:", res.data);
                const favoriteData = Array.isArray(res.data)
                    ? res.data
                    : res.data?.data || [];

                setfavorite(favoriteData);
            } catch (error) {
                console.error("Internal Error:", error);
            }
        };

        fetchFavorite();
    }, []);

    useEffect(() => {
        const fetchplaylist = async () => {
            try {
                const res = await UserApi.getAllPlaylist();
                console.log("playlist", res.data);

                const playlistData = Array.isArray(res.data)
                    ? res.data
                    : res.data ?.data || [];
                setPlaylist(playlistData)

            } catch (error) {
                console.error("Internal Error:", error);
            }
        }
        fetchplaylist();
    }, [])

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black text-white">
            <div className="max-w-7xl mx-auto px-4 py-10">

                {/* Profile Header */}
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-green-600 via-green-500 to-emerald-500 p-8 md:p-12 shadow-2xl">

                    <div className="absolute top-0 right-0 h-72 w-72 rounded-full bg-white/10 blur-3xl"></div>

                    <div className="relative flex flex-col md:flex-row items-center gap-8">

                        {/* Avatar */}
                        <div className="h-40 w-40 rounded-full bg-white/20 backdrop-blur-lg border-4 border-white/20 flex items-center justify-center shadow-xl">
                            <User size={70} className="text-white" />
                            {/* {user.image} */}
                        </div>

                        {/* User Info */}
                        <div className="text-center md:text-left">
                            <h1 className="text-4xl md:text-5xl font-black">
                                {user?.name || "Music Lover"}
                            </h1>

                            <p className="mt-3 text-lg text-white/80">
                                @{user?.username || "username"}
                            </p>

                            <p className="mt-1 text-white/70">
                                {user?.email}
                            </p>

                            <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-black/20 px-5 py-2 backdrop-blur-lg">
                                <Music size={18} />
                                Premium Listener
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">

                    <div className="bg-zinc-900/80 backdrop-blur-lg rounded-3xl p-6 border border-zinc-800">
                        <div className="flex items-center justify-between">
                            <h3 className="text-zinc-400">Favorite Songs</h3>
                            <Heart className="text-red-500" />
                        </div>


                        <h2 className="text-4xl font-bold mt-4">
                            {favorite.length}
                        </h2>

                    </div>

                    <div className="bg-zinc-900/80 backdrop-blur-lg rounded-3xl p-6 border border-zinc-800">
                        <div className="flex items-center justify-between">
                            <h3 className="text-zinc-400">Playlists</h3>
                            <Disc3 className="text-green-500" />
                        </div>

                        <h2 className="text-4xl font-bold mt-4">
                            {playlist.length}
                        </h2>
                    </div>

                    <div className="bg-zinc-900/80 backdrop-blur-lg rounded-3xl p-6 border border-zinc-800">
                        <div className="flex items-center justify-between">
                            <h3 className="text-zinc-400">Hours Played</h3>
                            <Music className="text-blue-500" />
                        </div>

                        <h2 className="text-4xl font-bold mt-4">
                            546
                        </h2>
                    </div>
                </div>

                {/* User Details */}
                <div className="mt-8 bg-zinc-900/80 backdrop-blur-lg rounded-3xl border border-zinc-800 p-6">

                    <h2 className="text-2xl font-bold mb-6">
                        Account Information
                    </h2>

                    <div className="grid md:grid-cols-2 gap-5">

                        <div className="bg-zinc-800 rounded-2xl p-5">
                            <div className="flex items-center gap-3">
                                <User className="text-green-500" />
                                <div>
                                    <p className="text-zinc-400 text-sm">
                                        Full Name
                                    </p>
                                    <h3 className="font-semibold">
                                        {user?.name || "N/A"}
                                    </h3>
                                </div>
                            </div>
                        </div>

                        <div className="bg-zinc-800 rounded-2xl p-5">
                            <div className="flex items-center gap-3">
                                <Mail className="text-green-500" />
                                <div>
                                    <p className="text-zinc-400 text-sm">
                                        Email
                                    </p>
                                    <h3 className="font-semibold">
                                        {user?.email || "N/A"}
                                    </h3>
                                </div>
                            </div>
                        </div>

                        <div className="bg-zinc-800 rounded-2xl p-5">
                            <div className="flex items-center gap-3">
                                <AtSign className="text-green-500" />
                                <div>
                                    <p className="text-zinc-400 text-sm">
                                        Username
                                    </p>
                                    <h3 className="font-semibold">
                                        {user?.username || "N/A"}
                                    </h3>
                                </div>
                            </div>
                        </div>

                        <div className="bg-zinc-800 rounded-2xl p-5">
                            <div className="flex items-center gap-3">
                                <Phone className="text-green-500" />
                                <div>
                                    <p className="text-zinc-400 text-sm">
                                        Phone Number
                                    </p>
                                    <h3 className="font-semibold">
                                        {user?.phone || "N/A"}
                                    </h3>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Logout */}
                    <button
                        onClick={handleLogout}
                        className="mt-8 w-full md:w-auto px-8 py-3 rounded-xl bg-red-500 hover:bg-red-600 flex items-center justify-center gap-2 font-semibold transition"
                    >
                        <LogOut size={20} />
                        Logout
                    </button>

                </div>
            </div>
        </div>
    );
};

export default Profile;