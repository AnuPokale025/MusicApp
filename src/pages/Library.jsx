import React, { useEffect, useState } from "react";
import UserApi from "../auth/user.api";
import { Heart, Music2, Play } from "lucide-react";
import { useMusic } from "../context/MusicContext";

const Library = () => {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const {playSong} = useMusic();  

    useEffect(() => {
        const fetchFavoriteSongs = async () => {
            try {
                const res = await UserApi.getAllFavoriteSong();

                console.log("Favorite Songs:", res.data);

                // Backend returns { message, data }
                const FavoriteSongData = Array.isArray(res.data) ? res.data : res.songs || [];
                setFavorites(FavoriteSongData);
            } catch (err) {
                console.error("Favorite Songs fetch error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchFavoriteSongs();
    }, []);

    const removeFromFavorites = async (favoriteId) => {
        try {
            const res = await UserApi.removeFavoriteSong(favoriteId);

            console.log("Removed from favorites:", res.data);

            setFavorites((prev) =>
                prev.filter((fav) => fav._id !== favoriteId)
            );
        } catch (err) {
            console.error("Error removing favorite:", err);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex justify-center items-center">
                <p className="text-white text-lg">Loading favorites...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black px-6 py-8">
            <h1 className="text-4xl font-bold text-white mb-2">
                Your Library
            </h1>

            <p className="text-zinc-400 mb-8">
                Your favorite songs collection
            </p>

            {favorites.length === 0 ? (
                <div className="flex flex-col items-center justify-center mt-20">
                    <Music2 size={60} className="text-zinc-700 mb-4" />

                    <h2 className="text-2xl text-zinc-400 font-semibold">
                        No Favorite Songs Found
                    </h2>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {favorites.map((fav) => (
                        <div
                            key={fav._id}
                            className="bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 hover:bg-zinc-800 transition"
                        >
                            <img
                                src={fav.songId?.image}
                                alt={fav.songId?.title}
                                className="w-full h-56 object-cover"
                            />

                            <div className="p-4">
                                <h3 className="text-white text-lg font-semibold truncate">
                                    {fav.songId?.title}
                                </h3>

                                <p className="text-zinc-400 mt-1">
                                    {fav.songId?.artist}
                                </p>
                                <button
                                    onClick={() =>
                                        playSong({
                                            ...fav.songId,
                                            audioUrl: fav.songId.audio || fav.songId.audioUrl,
                                            coverImage: fav.songId.image || fav.songId.coverImage || fav.songId.cover,
                                        })
                                    }
                                    className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-green-500 px-4 py-3 text-sm font-semibold text-black transition hover:bg-green-400"
                                >
                                    <Play size={18} />
                                    Play Song
                                </button>

                                <button
                                    onClick={() => removeFromFavorites(fav._id)}
                                    className="mt-4 w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition"
                                >
                                    <Heart size={18} fill="white" />
                                    Remove Favorite
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Library;