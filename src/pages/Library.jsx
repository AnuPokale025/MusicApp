import React, { useEffect, useState } from "react";
import UserApi from "../auth/user.api";
import { Heart, Music2, Play } from "lucide-react";
import { useMusic } from "../context/MusicContext";

const Library = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  const { playSong } = useMusic();

  useEffect(() => {
    const fetchFavoriteSongs = async () => {
      try {
        const res = await UserApi.getAllFavoriteSong();

        console.log("Favorite Songs:", res.data);

        const favoriteSongData = Array.isArray(res.data)
          ? res.data
          : res.data?.songs || [];

        setFavorites(favoriteSongData);
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
      await UserApi.removeFavoriteSong(favoriteId);

      setFavorites((prev) =>
        prev.filter((fav) => fav._id !== favoriteId)
      );
    } catch (err) {
      console.error("Error removing favorite:", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-white text-lg">Loading favorites...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-white">
          Your Library
        </h1>

        <p className="text-zinc-400 mt-2">
          Your favorite songs collection
        </p>
      </div>

      {/* Empty State */}
      {favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-24">
          <Music2
            size={70}
            className="text-zinc-700 mb-4"
          />

          <h2 className="text-2xl text-zinc-400 font-semibold">
            No Favorite Songs Found
          </h2>

          <p className="text-zinc-500 mt-2">
            Add songs to your favorites to see them here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favorites.map((fav) => (
            <div
              key={fav._id}
              className="bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800 hover:bg-zinc-800 hover:border-zinc-700 transition-all duration-300 shadow-xl flex flex-col"
            >
              {/* Song Image */}
              <div className="w-full h-60 overflow-hidden">
                <img
                  src={fav.songId?.image}
                  alt={fav.songId?.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-1">
                <h3
                  className="text-white text-lg font-semibold truncate"
                  title={fav.songId?.title}
                >
                  {fav.songId?.title || "Unknown Song"}
                </h3>

                <p
                  className="text-zinc-400 mt-2 truncate"
                  title={fav.songId?.artist}
                >
                  {fav.songId?.artist || "Unknown Artist"}
                </p>

                {/* Buttons */}
                <div className="mt-auto pt-5 flex flex-col gap-3">
                  <button
                    onClick={() =>
                      playSong({
                        ...fav.songId,
                        audioUrl:
                          fav.songId?.audio ||
                          fav.songId?.audioUrl,
                        coverImage:
                          fav.songId?.image ||
                          fav.songId?.coverImage ||
                          fav.songId?.cover,
                      })
                    }
                    className="w-full flex items-center justify-center gap-2 rounded-full bg-green-500 px-4 py-3 text-sm font-semibold text-black hover:bg-green-400 transition"
                  >
                    <Play size={18} />
                    Play Song
                  </button>

                  <button
                    onClick={() =>
                      removeFromFavorites(fav._id)
                    }
                    className="w-full flex items-center justify-center gap-2 rounded-full bg-red-500 px-4 py-3 text-sm font-semibold text-white hover:bg-red-600 transition"
                  >
                    <Heart
                      size={18}
                      fill="white"
                    />
                    Remove Favorite
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Library;