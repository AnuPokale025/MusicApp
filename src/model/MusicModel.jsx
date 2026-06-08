import React, { useEffect, useState } from "react";
import { Play, Pause, X } from "lucide-react";
import { useMusic } from "../context/MusicContext";

const MusicModal = () => {
  const {
    currentSong,
    isModalOpen,
    setIsModalOpen,
    audioRef,
  } = useMusic();

  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!audioRef.current) return;

    const audio = audioRef.current;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
    };
  }, [audioRef]);

  if (!isModalOpen || !currentSong) return null;

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (audioRef.current.paused) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  };

  return (
    <div className="fixed bottom-5 right-5 w-80 bg-zinc-900 text-white rounded-xl shadow-2xl p-4 z-50">
      <button
        onClick={() => setIsModalOpen(false)}
        className="absolute top-2 right-2"
      >
        <X size={20} />
      </button>

      <div className="flex items-center gap-3">
        <img
          src={
            currentSong.coverImage ||
            currentSong.image ||
            currentSong.cover
          }
          alt={currentSong.title || currentSong.name}
          className="w-16 h-16 rounded-lg object-cover"
        />

        <div className="flex-1">
          <h3 className="font-semibold">
            {currentSong.title || currentSong.name}
          </h3>

          <p className="text-sm text-gray-400">
            {currentSong.artist ||
              currentSong.performer ||
              currentSong.author}
          </p>
        </div>

        <button
          onClick={togglePlay}
          className="p-2 rounded-full bg-green-500 hover:bg-green-600"
        >
          {isPlaying ? <Pause size={24} /> : <Play size={24} />}
        </button>
      </div>
    </div>
  );
};

export default MusicModal;