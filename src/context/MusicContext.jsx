import { createContext, useContext, useState, useRef } from "react";

const MusicContext = createContext();

export const MusicProvider = ({ children }) => {
  const [currentSong, setCurrentSong] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const audioRef = useRef(new Audio());

  const playSong = (song) => {
    if (!song) return;

    const audioUrl = song.audioUrl || song.audio || song.src;
    if (!audioUrl) return;

    const current = {
      ...song,
      audioUrl,
      coverImage: song.coverImage || song.image || song.cover || '',
    };

    setCurrentSong(current);
    setIsModalOpen(true);

    audioRef.current.src = audioUrl;
    audioRef.current.play().catch(() => {});
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