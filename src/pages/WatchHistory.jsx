import React, { useEffect, useState } from "react";
import { Clock, Play, Trash2 } from "lucide-react";
import UserApi from "../auth/user.api";
import { useAuth } from "../context/Authcontext";
import { useMusic } from "../context/MusicContext";

const WatchHistory = () => {
    const [history, setHistory] = useState([]);
    const { user } = useAuth();

    const { playSong } = useMusic();

    useEffect(() => {
        if (!user?._id) return;

        const fetchHistory = async () => {
            try {
                const res = await UserApi.getHistory(user._id);

                console.log("History:", res.data);

                const historyData = Array.isArray(res.data)
                    ? res.data
                    : res.data.history || [];

                setHistory(historyData);
            } catch (error) {
                console.error("Failed to fetch history:", error);
            }
        };

        fetchHistory();
    }, [user]);

    const deleteHistory = async () => {
        if (!user?._id) {
            alert("Please login first");
            return;
        }

        try {
            await UserApi.deleteHistory(user._id);
            setHistory([]);
        } catch (error) {
            console.error("Failed to delete history:", error);
        }
    };

    return (
        <div className="max-w-5xl mx-auto px-4 py-6">
            <div className="bg-zinc-900 rounded-2xl shadow-xl overflow-hidden">

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-zinc-800">
                    <div className="flex items-center gap-3">
                        <Clock size={26} className="text-green-500" />
                        <h2 className="text-2xl font-bold text-white">
                            Recently Played
                        </h2>
                    </div>

                    {history.length > 0 && (
                        <button
                            onClick={deleteHistory}
                            className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg text-white text-sm font-medium transition"
                        >
                            <Trash2 size={16} />
                            Clear History
                        </button>
                    )}
                </div>

                {/* Content */}
                <div className="p-5">
                    {history.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 text-zinc-500">
                            <Clock size={60} />
                            <p className="mt-4 text-lg">
                                No recently played songs
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {history.map((item, index) => (
                                <div
                                    key={item._id || index}
                                    className="group flex items-center justify-between bg-zinc-800 hover:bg-zinc-700 rounded-xl p-4 transition-all duration-300"
                                >
                                    {/* Song Details */}
                                    <div className="flex items-center gap-4 min-w-0">
                                        <img
                                            src={
                                                item.songId?.image ||
                                                "https://via.placeholder.com/80"
                                            }
                                            alt={item.songId?.title}
                                            className="w-16 h-16 rounded-lg object-cover shadow-md"
                                        />

                                        <div className="min-w-0">
                                            <h3 className="text-white font-semibold text-lg truncate">
                                                {item.songId?.title || "Unknown Song"}
                                            </h3>

                                            <p className="text-zinc-400 text-sm truncate">
                                                {item.songId?.artist || "Unknown Artist"}
                                            </p>

                               
                                        </div>
                                    </div>

                                    {/* Play Button */}
                                    <button
                                        onClick={() => {
                                            if (!user) {
                                                alert("Please sign in to play songs.");
                                                navigate("/login");
                                                return;
                                            }

                                            playSong({
                                                ...item,
                                                audioUrl:
                                                    item.songId.audio || item.songId.audioUrl,
                                                coverImage:
                                                    item.songId.image ||
                                                    item.songId.coverImage ||
                                                    item.songId.cover,
                                            });
                                        }}

                                        className="opacity-0 group-hover:opacity-100 bg-green-500 hover:bg-green-600 rounded-full p-3 transition">
                                        <Play
                                            size={18}
                                            fill="white"
                                            className="text-white"
                                        />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default WatchHistory;