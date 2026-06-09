import React, { useEffect, useState } from "react";
import UserApi from "../auth/user.api";
import { Music2, Calendar, User, Play, Heart } from "lucide-react";
import { useMusic } from "../context/MusicContext";
import { useAuth } from "../context/Authcontext";
import { useNavigate } from "react-router-dom";
import socket from "../utils/socket";

const Song = () => {
  const [songs, setSongs] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const { playSong } = useMusic();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected:", socket.id);
    });

    socket.on("newfavoriteSong", (data) => {
      console.log("New Favorite Song:", data);

      setFavorites((prev) => {
        const exists = prev.some(
          (fav) =>
            (fav.songId?._id || fav.songId) ===
            (data.songId?._id || data.songId)
        );

        return exists ? prev : [...prev, data];
      });
    });

    return () => {
      socket.off("connect");
      socket.off("newfavoriteSong");
    };
  }, []);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const res = await UserApi.getAllSongs();

        const songData = Array.isArray(res.data)
          ? res.data
          : res.data?.songs || [];

        setSongs(songData);
      } catch (err) {
        console.error("Song fetch error:", err);
      }
    };

    fetchSongs();
  }, []);

  useEffect(() => {
    const fetchFavoriteSongs = async () => {
      try {
        const res = await UserApi.getAllFavoriteSong();

        const favoriteData = Array.isArray(res.data)
          ? res.data
          : res.data?.songs || [];

        setFavorites(favoriteData);
      } catch (err) {
        console.error("Favorite Songs fetch error:", err);
      }
    };

    fetchFavoriteSongs();
  }, []);

  const favoriteMap = favorites.reduce((map, fav) => {
    const songId = fav?.songId?._id || fav?.songId;

    if (songId) {
      map[songId] = fav;
    }

    return map;
  }, {});

  const isFavorite = (songId) => Boolean(favoriteMap[songId]);

  const addToFavorite = async (songId) => {
    const userId = user?._id;

    if (!userId) {
      alert("Please login first");
      return;
    }

    try {
      const res = await UserApi.addFavoriteSong(songId, userId);

      const favoriteData = res.data || res;

      setFavorites((prev) => [...prev, favoriteData]);
    } catch (err) {
      console.error("Error adding favorite:", err);
    }
  };

  const removeFavorite = async (favoriteId) => {
    try {
      await UserApi.removeFavoriteSong(favoriteId);

      setFavorites((prev) =>
        prev.filter((fav) => fav._id !== favoriteId)
      );
    } catch (err) {
      console.error("Error removing favorite:", err);
    }
  };

  const toggleFavorite = async (song) => {
    const favorite = favoriteMap[song._id];

    if (favorite) {
      await removeFavorite(favorite._id);
    } else {
      await addToFavorite(song._id);
    }
  };

  return (
    <div className="min-h-screen bg-black px-4 sm:px-6 lg:px-8 py-10">
      {/* Heading */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-white">Songs</h1>

        <p className="text-zinc-400 mt-2">
          Explore all music tracks
        </p>
      </div>

      {/* Songs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {songs.map((song) => (
          <div
            key={song._id}
            className="bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800 hover:bg-zinc-800 hover:border-zinc-700 transition-all duration-300 shadow-xl flex flex-col"
          >
            {/* Song Image */}
            <div className="relative w-full h-60 overflow-hidden">
              <img
                src={song.image}
                alt={song.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-1">
              {/* Song Title */}
              <div className="flex items-center gap-2 mb-3">
                <Music2
                  size={18}
                  className="text-green-500 flex-shrink-0"
                />

                <h2
                  className="text-white text-lg font-semibold truncate"
                  title={song.title}
                >
                  {song.title}
                </h2>
              </div>

              {/* Artist */}
              <div className="flex items-center gap-2 text-zinc-400 mb-2">
                <User
                  size={16}
                  className="flex-shrink-0"
                />

                <p className="truncate">
                  {song.artist || "Unknown Artist"}
                </p>
              </div>

              {/* Release Date */}
              <div className="flex items-center gap-2 text-zinc-500 text-sm mb-5">
                <Calendar
                  size={15}
                  className="flex-shrink-0"
                />

                <p>
                  {song.releaseDate
                    ? new Date(
                        song.releaseDate
                      ).toLocaleDateString()
                    : "No Date"}
                </p>
              </div>

              {/* Buttons */}
              <div className="mt-auto flex items-center gap-3">
                <button
                  onClick={() => {
                    if (!user) {
                      alert("Please sign in to play songs.");
                      navigate("/login");
                      return;
                    }

                    playSong({
                      ...song,
                      audioUrl:
                        song.audio || song.audioUrl,
                      coverImage:
                        song.image ||
                        song.coverImage ||
                        song.cover,
                    });
                  }}
                  className="flex-1 flex items-center justify-center gap-2 rounded-full bg-green-500 px-4 py-3 text-sm font-semibold text-black hover:bg-green-400 transition"
                >
                  <Play size={18} />
                  Play Song
                </button>

                <button
                  onClick={() => toggleFavorite(song)}
                  className={`h-12 w-12 flex items-center justify-center rounded-full transition ${
                    isFavorite(song._id)
                      ? "bg-red-500"
                      : "bg-zinc-800 hover:bg-red-500"
                  }`}
                >
                  <Heart
                    size={20}
                    fill={
                      isFavorite(song._id)
                        ? "white"
                        : "none"
                    }
                    className="text-white"
                  />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {songs.length === 0 && (
        <div className="flex flex-col items-center justify-center mt-24">
          <Music2
            size={70}
            className="text-zinc-700 mb-4"
          />

          <h2 className="text-2xl font-semibold text-zinc-400">
            No Songs Found
          </h2>

          <p className="text-zinc-500 mt-2">
            Songs will appear here once added.
          </p>
        </div>
      )}
    </div>
  );
};

export default Song;