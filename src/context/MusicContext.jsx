import { createContext, useContext, useState, useRef } from "react";
import { useAuth } from "./Authcontext";
import UserApi from "../auth/user.api";

const MusicContext = createContext();

export const MusicProvider = ({ children }) => {
  const { user } = useAuth();

  const [currentSong, setCurrentSong] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const audioRef = useRef(new Audio());

  const playSong = async (song) => {
    if (!song) return;

    const audioUrl =
      song.audioUrl || song.audio || song.src;

    if (!audioUrl) return;

    const current = {
      ...song,
      audioUrl,
      coverImage:
        song.coverImage ||
        song.image ||
        song.cover ||
        "",
    };

    setCurrentSong(current);
    setIsModalOpen(true);

    // Save History
    await addToHistory(song._id);

    audioRef.current.src = audioUrl;

    audioRef.current.play().catch(() => { });
  };

  const addToHistory = async (songId) => {
    try {
      // if (!user?._id || !songId) return;
       const userId = user?._id;

      const res = await UserApi.addHistory( userId, songId);
      console.log("Add History", res.data);
      
    } catch (err) {
      console.error("History Error:", err);
    }
  };

  const pauseSong = () => {
    audioRef.current.pause();
  };

  const resumeSong = () => {
    audioRef.current.play();
  };

  return (
    <MusicContext.Provider
      value={{
        currentSong,
        isModalOpen,
        setIsModalOpen,
        playSong,
        pauseSong,
        resumeSong,
        audioRef,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = () => useContext(MusicContext);