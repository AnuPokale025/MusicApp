import React, { useEffect, useState } from "react";
import UserApi from "../auth/user.api";
import { Music2, Calendar, User, Play, Heart } from "lucide-react";
import { useMusic } from "../context/MusicContext";
import { useAuth } from "../context/Authcontext";
import socket from "./socket";

const Song = () => {
  const [songs, setSongs] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const { playSong } = useMusic();
  const { user } = useAuth();
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected:", socket.id);
    });

    socket.on("newfavoriteSong", (data) => {
      console.log("New Favorite Song:", data);

      setFavorites((prev) => [...prev, data]);
    });

    return () => {
      socket.off("newfavoriteSong");
    };
  }, []);

  useEffect(() => {
    const fetchSong = async () => {
      try {
        const res = await UserApi.getAllSongs();

        // const data = Object.keys(res)

        console.log(res.data);

        // Handle both array and object responses
        const songData = Array.isArray(res.data) ? res.data : res.songs || [];
        setSongs(songData);

      } catch (err) {
        console.error("Song fetch error:", err);
      }
    };

    fetchSong();
  }, []);

  useEffect(() => {
    const fetchFavoriteSongs = async () => {
      try {
        const res = await UserApi.getAllFavoriteSong();
        const favoriteData = Array.isArray(res.data)
          ? res.data
          : res.data?.songs || res.songs || [];
        console.log("Favorite Songs:", favoriteData);
        setFavorites(favoriteData);
      } catch (err) {
        console.error("Favorite Songs fetch error:", err);
      }
    };

    fetchFavoriteSongs();
  }, []);

  const getFavoriteMap = () => {
    return favorites.reduce((map, fav) => {
      const songId = fav?.songId?._id || fav?.songId;
      if (songId) {
        map[songId] = fav;
      }
      return map;
    }, {});
  };

  const favoriteMap = getFavoriteMap();
  const isFavorite = (songId) => Boolean(favoriteMap[songId]);

  const addToFavorite = async (songId) => {
    const userId = user?._id;

    if (!userId) {
      return alert("Please log in to add favorites.");
    }

    try {
      const res = await UserApi.addFavoriteSong(songId, userId);
      console.log("Added to favorites:", res);
      setFavorites((prev) => [...prev, res]);
    } catch (err) {
      console.error("Error adding to favorites:", err);
    }
  };

  const removeFavorite = async (favoriteId) => {
    try {
      await UserApi.removeFavoriteSong(favoriteId);
      setFavorites((prev) => prev.filter((fav) => fav._id !== favoriteId));
    } catch (err) {
      console.error("Error removing favorite:", err);
    }
  };

  const toggleFavorite = async (song) => {
    const songId = song?._id;
    const favorite = favoriteMap[songId];

    if (favorite) {
      await removeFavorite(favorite._id);
    } else {
      await addToFavorite(songId);
    }
  };

  return (
    <div className="min-h-screen bg-black px-6 py-10">

      {/* Heading */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-white">
          Songs
        </h1>


        <p className="text-zinc-400 mt-2">
          Explore all music tracks
        </p>
      </div>

      {/* Songs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

        {songs.map((song, index) => (
          <div
            key={index}
            className="bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800 hover:bg-zinc-800 transition-all duration-300 shadow-xl"
          >

            {/* Song Image */}
            <div className="w-full h-60 overflow-hidden">
              <img
                src={song.image}
                alt={song.title}
                className="w-full h-full object-cover hover:scale-105 transition-all duration-500"
              />
            </div>

            {/* Song Details */}
            <div className="p-5">

              {/* Title */}
              <div className="flex items-center gap-2 mb-3">
                <Music2 size={18} className="text-green-500" />

                <h2 className="text-white text-xl font-semibold truncate">
                  {song.title}
                </h2>
              </div>

              {/* Artist */}
              <div className="flex items-center gap-2 text-zinc-400 mb-2">
                <User size={16} />

                <p>{song.artist}</p>
              </div>

              {/* Release Date */}
              <div className="flex items-center gap-2 text-zinc-500 text-sm mb-4">
                <Calendar size={15} />

                <p>
                  {new Date(song.releaseDate).toLocaleDateString()}
                </p>
              </div>

              <button
                onClick={() =>
                  playSong({
                    ...song,
                    audioUrl: song.audio || song.audioUrl,
                    coverImage: song.image || song.coverImage || song.cover,
                  })
                }
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-green-500 px-4 py-3 text-sm font-semibold text-black transition hover:bg-green-400"
              >
                <Play size={18} />
                Play Song
              </button>
              <button
                onClick={() => toggleFavorite(song)}
                className="p-3 rounded-full bg-zinc-800 text-white hover:bg-red-500 transition"
              >
                <Heart
                  size={20}
                  fill={isFavorite(song._id) ? "red" : "none"}
                  className={isFavorite(song._id) ? "text-red-500" : "text-white"}
                />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* No Songs */}
      {songs.length === 0 && (
        <div className="flex flex-col items-center justify-center mt-20">
          <Music2 size={60} className="text-zinc-700 mb-4" />

          <h2 className="text-2xl text-zinc-400 font-semibold">
            No Songs Found
          </h2>
        </div>
      )}
    </div>
  );
};

export default Song;