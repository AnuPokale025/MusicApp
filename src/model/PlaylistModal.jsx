import React from "react";
import { X } from "lucide-react";
import UserApi from "../auth/user.api";

const PlaylistModal = ({
  isOpen,
  songs,
  selectedSongIds,
  onClose,
  onSongAdd,
}) => {
  if (!isOpen) return null;

  const getSongById = async (songId) => {
    try {
      const res = await UserApi.getSongById(songId);

      // console.log("Song Details:", res.data);

      // Add song to selected songs
      onSongAdd(res.data);
    } catch (err) {
      console.error("Internal Server Error", err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="w-full max-w-4xl overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950 shadow-2xl">
        <div className="flex items-start justify-between border-b border-zinc-800 px-6 py-5">
          <div>
            <h2 className="text-2xl font-semibold text-white">
              Select Songs for Playlist
            </h2>
            <p className="text-sm text-zinc-400 mt-1">
              Click Add to choose a song for the playlist.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-400 transition hover:text-white"
          >
            <X size={22} />
          </button>
        </div>

        <div className="max-h-[70vh] overflow-y-auto p-6 space-y-3">
          {songs.length === 0 ? (
            <p className="text-zinc-400">No songs available.</p>
          ) : (
            songs.map((song) => {
              const id = song._id || song.id;
              const isSelected = selectedSongIds?.includes(id);

              return (
                <div
                  key={id}
                  className="flex flex-col gap-3 rounded-3xl border border-zinc-800 bg-zinc-900 p-4 md:flex-row md:items-center md:justify-between"
                >
                  <div>
                    <p className="font-semibold text-white">{song.title}</p>
                    <p className="text-sm text-zinc-400 mt-1">
                      {song.artist}
                    </p>
                  </div>
                  <button
                    onClick={() => getSongById(id)}
                    disabled={isSelected}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${isSelected
                      ? "bg-zinc-700 text-zinc-300 cursor-not-allowed"
                      : "bg-green-500 text-white hover:bg-green-600"
                      }`}
                  >
                    {isSelected ? "Added" : "Add"}
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default PlaylistModal;
