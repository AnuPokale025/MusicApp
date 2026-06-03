import React, { useEffect, useState } from "react";
import UserApi from "../auth/user.api";
import { Play } from "lucide-react";
import { useMusic } from "../context/MusicContext";

const Artist = () => {
  const [songs, setSongs] = useState([]);
  const { playSong } = useMusic();

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const res = await UserApi.getAllSongs();

        const songData = Array.isArray(res.data)
          ? res.data
          : res.data?.songs || [];

        setSongs(songData);

        console.log("Songs:", songData);
      } catch (err) {
        console.error("Artist fetch error:", err);
      }
    };

    fetchArtist();
  }, []);

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold mb-4">Artists</h1>

      {songs.length === 0 ? (
        <p>No songs found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {songs.map((song) => (
            <div
              key={song._id}
              className="bg-gray-900 rounded-lg overflow-hidden shadow-lg"
            >
              <div className="w-full h-60 overflow-hidden">
                <img
                  src={song.image}
                  alt={song.title}
                  className="w-full h-full object-cover hover:scale-105 transition-all duration-500"
                />
              </div>

              <div className="p-4">
                <h2 className="text-xl font-semibold">{song.artist}</h2>
                <p className="text-gray-400">{song.title}</p>
                <p className="text-sm text-gray-500">{song.album}</p>

                <button
                  onClick={() =>
                    playSong({
                      ...song,
                      audioUrl: song.audio || song.audioUrl,
                      coverImage: song.image || song.coverImage || song.cover,
                    })
                  }
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-green-500 px-4 py-2 text-sm font-semibold text-black transition hover:bg-green-400"
                >
                  <Play size={16} />
                  Play
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Artist;