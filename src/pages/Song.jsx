import React, { useEffect, useState } from "react";
import UserApi from "../auth/user.api";
import { Music2, Calendar, User, Play } from "lucide-react";
import { useMusic } from "../context/MusicContext";

const Song = () => {
  const [songs, setSongs] = useState([]);
  const { playSong } = useMusic();

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