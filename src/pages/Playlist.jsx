import React, { useEffect, useState } from "react";
import {
  Music2,
  Plus,
  Play,
  Trash2,
  Search,
  Heart,
} from "lucide-react";
import { useMusic } from "../context/MusicContext";
import PlaylistModal from "../model/PlaylistModal";
import { useAuth } from "../context/Authcontext";
import UserApi from "../auth/user.api";

export default function PlaylistPage() {
  const { playSong } = useMusic();
  const { user } = useAuth();

  const [playlists, setPlaylists] = useState([]);
  const [availableSongs, setAvailableSongs] = useState([]);
  const [selectedSongs, setSelectedSongs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [playlistName, setPlaylistName] = useState("");
  const [loading, setLoading] = useState(false);

  const normalizeSong = (song) => {
    if (!song) return null;
    if (typeof song === "string" || typeof song === "number") {
      return {
        _id: song,
        id: song,
        title: "Unknown Song",
        artist: "",
      };
    }

    const track = song.songId || song.songs || song;
    const id = track._id || track.id || song._id || song.id || song?.songId?._id || song?.songId?.id;

    return {
      ...track,
      _id: id,
      id,
      title: track.title || track.name || "Unknown Song",
      artist: track.artist || "Unknown Artist",
      audioUrl: track.audioUrl || track.audio || track.src,
      image: track.image || track.coverImage || track.cover,
    };
  };

  const getPlaylistArray = (response) => {
    if (!response) return [];
    if (Array.isArray(response)) return response;
    if (Array.isArray(response.data)) return response.data;
    if (Array.isArray(response.playlist)) return response.playlist;
    if (Array.isArray(response.playlists)) return response.playlists;
    if (Array.isArray(response.data?.data)) return response.data.data;
    return [];
  };

  // ================= GET PLAYLISTS =================

  const fetchPlaylists = async () => {
    try {

      setLoading(true);

      const res = await UserApi.getAllPlaylist();

      let playlistData = getPlaylistArray(res);

      playlistData = playlistData.map((playlist) => ({
        ...playlist,
        songs: Array.isArray(playlist.songs)
          ? playlist.songs
              .map(normalizeSong)
              .filter(Boolean)
          : [],
      }));

      setPlaylists(playlistData);

    } catch (error) {

      console.log(error);

      alert(
        error.message || "Failed to fetch playlists"
      );

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {
    fetchPlaylists();
    fetchSongs();
  }, []);

  const openSongModal = () => setIsModalOpen(true);
  const closeSongModal = () => setIsModalOpen(false);

  const handleSongSelect = (song) => {
    const normalizedSong = normalizeSong(song);
    if (!normalizedSong) return;

    const id = normalizedSong._id || normalizedSong.id;
    if (!id) return;

    if (selectedSongs.some((item) => item._id === id || item.id === id)) {
      return;
    }

    setSelectedSongs((prev) => [...prev, normalizedSong]);
  };

  const removeSelectedSong = (songId) => {
    setSelectedSongs((prev) => prev.filter((item) => item._id !== songId && item.id !== songId));
  };

  // ================= CREATE PLAYLIST =================

  const createPlaylist = async (songId) => {
    const userId = user?._id;
    try {
      if (!playlistName.trim()) {
        return alert("Playlist name is required");
      }

      const playlistData = {
        name: playlistName,
        songs: selectedSongs.map((song) => song._id || song.id),
      };

      const res = await UserApi.createplaylist(playlistData, userId);

      console.log(res.data);
      
      alert("Playlist created successfully");

      setPlaylistName("");
      setSelectedSongs([]);
      fetchPlaylists();
    } catch (error) {
      console.log(error);
      alert(
        error.response?.data?.message ||
        error.message ||
        "Failed to create playlist"
      );
    }
  };

  // ================= DELETE PLAYLIST =================

  const deletePlaylist = async (playlistId) => {

    try {

      await UserApi.removeplaylist(playlistId);

      alert("Playlist deleted successfully");

      fetchPlaylists();

    } catch (error) {

      console.log(error);

      alert(
        error.message || "Failed to delete playlist"
      );
    }
  };


  const fetchSongs = async () => {
    try {
      const res = await UserApi.getAllSongs();
      const songData = Array.isArray(res.data)
        ? res.data
        : res.data?.song || [];

      setAvailableSongs(songData);
    } catch (err) {
      console.error("internal server error", err);
    }
  };


  return (
    <div className="min-h-screen bg-black text-white flex flex-col md:flex-row">

      {/* Sidebar */}

      <div className="w-72 bg-zinc-900 border-r border-zinc-800 p-6 hidden md:block">

        <div className="flex items-center gap-3 mb-10">

          <div className="bg-green-500 p-2 rounded-full">
            <Music2 size={22} />
          </div>

          <h1 className="text-2xl font-bold">
            My Playlist
          </h1>
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
                className="bg-zinc-800 hover:bg-zinc-700 transition p-4 rounded-xl cursor-pointer flex items-center gap-4"
              >

                <div>

                  <h3 className="font-semibold">
                    {playlist.name}
                  </h3>

                  <p className="text-sm text-zinc-400">
                    {Array.isArray(playlist.songs) ? playlist.songs.length : 0} songs
                  </p>
                </div>
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

          <div className="flex items-center bg-zinc-900 border border-zinc-800 px-4 py-3 rounded-xl w-full md:w-96">

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

        <div className="bg-zinc-900 rounded-2xl p-6 mb-8 border border-zinc-800 max-w-4xl">

          <h2 className="text-2xl font-semibold mb-6">
            Create New Playlist
          </h2>

          <div className="grid md:grid-cols-2 gap-4 mb-6">

            {/* Playlist Name */}

            <input
              type="text"
              placeholder="Playlist Name"
              value={playlistName}
              onChange={(e) =>
                setPlaylistName(e.target.value)
              }
              className="bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-green-500"
            />


          </div>



          <div className="flex flex-wrap gap-4 mt-6">
            <button
              onClick={openSongModal}
              className="bg-blue-500 hover:bg-blue-600 px-5 py-2 rounded-xl font-medium"
            >
              Add Songs
            </button>

            <button
              onClick={createPlaylist}
              className="bg-green-500 hover:bg-green-600 px-5 py-2 rounded-xl font-medium"
            >
              Create Playlist
            </button>
          </div>

          {selectedSongs.length > 0 && (
            <div className="mt-6 rounded-2xl border border-zinc-700 bg-zinc-950 p-4">
              <h3 className="text-sm text-zinc-400 mb-3">
                Selected songs ({selectedSongs.length})
              </h3>
              <div className="grid gap-3 md:grid-cols-2">
                {selectedSongs.map((song) => (
                  <div
                    key={song._id || song.id}
                    className="flex items-center justify-between rounded-xl bg-zinc-900 p-3"
                  >
                    <div>
                      <p className="font-medium">{song.title || song.songId?.title || song.songs?.title}</p>
                      <p className="text-sm text-zinc-500">
                        {song.artist || song.songId?.artist || song.songs?.artist}
                      </p>
                    </div>
                    <button
                      onClick={() => removeSelectedSong(song._id || song.id)}
                      className="text-sm text-red-400 hover:text-red-300"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* <button
            onClick={createPlaylist}
            className="mt-6 bg-green-500 hover:bg-green-600 transition px-6 py-3 rounded-xl font-semibold"
          >
            Create Playlist
          </button> */}
        </div>

        {/* Playlist Cards */}

        {loading ? (

          <div className="text-center text-zinc-400">
            Loading playlists...
          </div>

        ) : (

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

            {playlists.map((playlist) => (

              <div
                key={playlist._id}
                className="bg-gradient-to-br from-zinc-900 to-zinc-800 p-6 rounded-3xl border border-zinc-800 shadow-lg flex flex-col h-full"
              >

                {/* Header */}

                <div className="flex items-center justify-between">

                  <div>

                    <h2 className="text-2xl font-bold">
                      {playlist.name}
                    </h2>

                    <p className="text-zinc-400 text-sm mt-1">
                      {Array.isArray(playlist.songs) ? playlist.songs.length : 0} Songs
                    </p>
                  </div>

                  <button
                    onClick={() =>
                      playlist.songs?.[0] &&
                      playSong({
                        ...playlist.songs[0],
                        audioUrl: playlist.songs[0].audio || playlist.songs[0].audioUrl,
                        coverImage: playlist.songs[0].image || playlist.songs[0].coverImage || playlist.songs[0].cover,
                      })
                    }
                    className="bg-green-500 p-3 rounded-full hover:scale-105 transition"
                  >
                    <Play
                      size={18}
                      fill="white"
                    />
                  </button>
                </div>

                {/* Songs */}

                <div className="mt-6 space-y-3">

                  {Array.isArray(playlist.songs) &&
                    playlist.songs.length > 0 ? (

                    playlist.songs.map(
                      (song, index) => (

                        <div
                          key={index}
                          className="flex flex-wrap md:flex-nowrap items-center justify-between gap-3 bg-zinc-800 px-4 py-3 rounded-xl"
                        >

                          <div className="flex items-center gap-3">

                            <Music2
                              size={18}
                              className="text-green-500"
                            />

                            <div>

                              <p>{song.title || song.songId?.title || song.songs?.title}</p>

                              <p className="text-sm text-zinc-400">
                                {song.artist || song.songId?.artist || song.songs?.artist}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() =>
                                playSong({
                                  ...song,
                                  audioUrl: song.audio || song.audioUrl,
                                  coverImage: song.image || song.coverImage || song.cover,
                                })
                              }
                              className="text-green-400 hover:text-green-300 transition"
                            >
                              <Play size={18} />
                            </button>

                            <button className="text-zinc-400 hover:text-red-500 transition">
                              <Heart size={18} />
                            </button>
                          </div>
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

                <div className="flex items-center justify-between mt-auto pt-6">

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
      <PlaylistModal
        isOpen={isModalOpen}
        songs={availableSongs}
        selectedSongIds={selectedSongs.map((song) => song._id || song.id)}
        onClose={closeSongModal}
        onSongAdd={handleSongSelect}
      />
    </div>
  );
}