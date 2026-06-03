import React, { createContext, useContext, useState } from 'react';

const MusicModalContext = createContext();

export const MusicModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);

  const openModal = (song) => {
    setCurrentSong(song);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setCurrentSong(null);
  };

  const value = {
    isOpen,
    currentSong,
    openModal,
    closeModal,
  };

  return (
    <MusicModalContext.Provider value={value}>
      {children}
    </MusicModalContext.Provider>
  );
};

export const useMusicModal = () => {
  const context = useContext(MusicModalContext);
  if (!context) {
    throw new Error('useMusicModal must be used within MusicModalProvider');
  }
  return context;
};
