import React, { useEffect, useState } from "react";
import {
  Music2,
  Plus,
  Play,
  Trash2,
  Search,
  Heart,
} from "lucide-react";

import UserApi from "../auth/user.api";

export default function PlaylistPage() {
  const [playlists, setPlaylists] = useState([]);

  const [playlistName, setPlaylistName] = useState("");
  const [userId, setUserId] = useState("");
  const [songId, setSongId] = useState("");

  const [loading, setLoading] = useState(false);

  // ================= GET ALL PLAYLISTS =================

  const fetchPlaylists = async () => {
    try {
      setLoading(true);

      const res = await UserApi.getAllPlaylist();
      console.log(res.playlist);
      

      // Handle both array and object responses
      const playlistData = Array.isArray(res.playlist) ? res.playlist : (res.playlists || []);
      setPlaylists(playlistData);
    } catch (error) {
      console.log(error);
      alert(error.message || "Failed to fetch playlists");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlaylists();
  }, []);

  // ================= CREATE PLAYLIST =================

  const createPlaylist = async () => {
    try {
      if (!playlistName || !userId || !songId) {
        return alert("All fields are required");
      }

      const payload = {
        name: playlistName,
      };

      await UserApi.createplaylist(payload, userId, songId);

      alert("Playlist created successfully");

      setPlaylistName("");
      setUserId("");
      setSongId("");

      fetchPlaylists();
    } catch (error) {
      console.log(error);
      alert(error.message || "Failed to create playlist");
    }
  };

  // ================= DELETE PLAYLIST =================

  const deletePlaylist = async (playlistId) => {
    try {
      await UserApi.deleteplaylist(playlistId);

      alert("Playlist deleted successfully");

      fetchPlaylists();
    } catch (error) {
      console.log(error);
      alert(error.message || "Failed to delete playlist");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Sidebar */}
      <div className="w-72 bg-zinc-900 border-r border-zinc-800 p-6 hidden md:block">
        <div className="flex items-center gap-3 mb-10">
          <div className="bg-green-500 p-2 rounded-full">
            <Music2 size={22} />
          </div>

          <h1 className="text-2xl font-bold">My Playlist</h1>
        </div>

        <button className="w-full bg-green-500 hover:bg-green-600 transition py-3 rounded-xl font-semibold flex items-center justify-center gap-2">
          <Plus size={18} />
          Create Playlist
        </button>

        <div className="mt-10">
          <h2 className="text-zinc-400 uppercase text-sm mb-4">
            Your Playlists
          </h2>

          <div className="space-y-3">
            {playlists.map((playlist) => (
              <div
                key={playlist._id}
                className="bg-zinc-800 hover:bg-zinc-700 transition p-4 rounded-xl cursor-pointer"
              >
                <h3 className="font-semibold">
                  {playlist.name}
                </h3>

                <p className="text-sm text-zinc-400">
                  {playlist.songs?.length || 0} songs
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 p-6 md:p-10 overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold">
              Playlists
            </h1>

            <p className="text-zinc-400 mt-2">
              Manage your playlists and songs
            </p>
          </div>

          <div className="flex items-center bg-zinc-900 px-4 py-2 rounded-xl w-full md:w-80">
            <Search
              size={18}
              className="text-zinc-400"
            />

            <input
              type="text"
              placeholder="Search playlist..."
              className="bg-transparent outline-none px-3 w-full"
            />
          </div>
        </div>

        {/* Create Playlist */}
        <div className="bg-zinc-900 rounded-2xl p-6 mb-8 border border-zinc-800">
          <h2 className="text-2xl font-semibold mb-6">
            Create New Playlist
          </h2>

          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <input
              type="text"
              placeholder="User ID"
              value={userId}
              onChange={(e) =>
                setUserId(e.target.value)
              }
              className="bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-green-500"
            />

            <input
              type="text"
              placeholder="Playlist Name"
              value={playlistName}
              onChange={(e) =>
                setPlaylistName(e.target.value)
              }
              className="bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-green-500"
            />

            <input
              type="text"
              placeholder="Song ID"
              value={songId}
              onChange={(e) =>
                setSongId(e.target.value)
              }
              className="bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-green-500"
            />
          </div>

          <button
            onClick={createPlaylist}
            className="bg-green-500 hover:bg-green-600 transition px-6 py-3 rounded-xl font-semibold"
          >
            Create Playlist
          </button>
        </div>

        {/* Playlist Cards */}
        {loading ? (
          <div className="text-center text-zinc-400">
            Loading playlists...
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-6">
            {playlists.map((playlist) => (
              <div
                key={playlist._id}
                className="bg-gradient-to-br from-zinc-900 to-zinc-800 p-6 rounded-3xl border border-zinc-800 shadow-lg"
              >
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-zinc-400">
                      User ID:{" "}
                      {playlist.userId?._id ||
                        playlist.userId}
                    </p>

                    <h2 className="text-2xl font-bold mt-1">
                      {playlist.name}
                    </h2>
                  </div>

                  <button className="bg-green-500 p-3 rounded-full hover:scale-105 transition">
                    <Play
                      size={18}
                      fill="white"
                    />
                  </button>
                </div>

                {/* Songs */}
                <div className="mt-6 space-y-3">
                  {playlist.songs &&
                  playlist.songs.length > 0 ? (
                    playlist.songs.map(
                      (song, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between bg-zinc-800 px-4 py-3 rounded-xl"
                        >
                          <div className="flex items-center gap-3">
                            <Music2
                              size={18}
                              className="text-green-500"
                            />

                            <div>
                              <p>{song.title}</p>

                              <p className="text-sm text-zinc-400">
                                {song.artist}
                              </p>
                            </div>
                          </div>

                          <button className="text-zinc-400 hover:text-red-500 transition">
                            <Heart size={18} />
                          </button>
                        </div>
                      )
                    )
                  ) : (
                    <p className="text-zinc-400">
                      No songs found
                    </p>
                  )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between mt-6">
                  <p className="text-zinc-400 text-sm">
                    {playlist.songs?.length || 0} Songs
                  </p>

                  <button
                    onClick={() =>
                      deletePlaylist(playlist._id)
                    }
                    className="flex items-center gap-2 text-red-500 hover:text-red-400 transition"
                  >
                    <Trash2 size={18} />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}