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

import UserApi from "../auth/user.api";

export default function PlaylistPage() {
  const { playSong } = useMusic();

  const [playlists, setPlaylists] = useState([]);
  const [playlistName, setPlaylistName] = useState("");
  const [userId, setUserId] = useState("");
  const [songId, setSongId] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // ================= GET PLAYLISTS =================

  const fetchPlaylists = async () => {
    try {

      setLoading(true);

      const res = await UserApi.getAllPlaylist();

      const playlistData = Array.isArray(res.playlist)
        ? res.playlist
        : (res.playlists || []);

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
  }, []);

  // ================= CREATE PLAYLIST =================

  const createPlaylist = async () => {

    try {

      if (!playlistName || !image) {
        return alert(
          "Playlist name and image are required"
        );
      }

      const formData = new FormData();

      formData.append("name", playlistName);
      formData.append("image", image);

      if (songId) {
        formData.append(
          "songs",
          JSON.stringify([songId])
        );
      }

      await UserApi.createplaylist(
        formData,
        userId,
        songId
      );

      alert("Playlist created successfully");

      setPlaylistName("");
      setUserId("");
      setSongId("");
      setImage(null);

      fetchPlaylists();

    } catch (error) {

      console.log(error);

      alert(
        error.message || "Failed to create playlist"
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

  return (
    <div className="min-h-screen bg-black text-white flex">

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

                <div className="w-14 h-14 overflow-hidden rounded-lg">

                  <img
                    src={playlist.image}
                    alt={playlist.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div>

                  <h3 className="font-semibold">
                    {playlist.name}
                  </h3>

                  <p className="text-sm text-zinc-400">
                    {playlist.songs?.length || 0} songs
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

            {/* Song ID */}

            {/* <input
              type="text"
              placeholder="Song ID"
              value={songId}
              onChange={(e) =>
                setSongId(e.target.value)
              }
              className="bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-green-500"
            /> */}
          </div>

          {/* Upload Image */}
          

          <label className="bg-zinc-800 border-2 border-dashed border-zinc-700 hover:border-green-500 transition rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer min-h-[180px]">

            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setImage(e.target.files[0])
              }
              className="hidden"
            />

            {image ? (

              <div className="text-center">

                <img
                  src={URL.createObjectURL(image)}
                  alt="preview"
                  className="w-32 h-32 object-cover rounded-xl mx-auto mb-4"
                />

                <p className="text-zinc-300">
                  {image.name}
                </p>
              </div>

            ) : (

              <>
                <Plus
                  size={36}
                  className="text-green-500 mb-3"
                />

                <p className="text-zinc-300 font-medium">
                  Upload Playlist Image
                </p>

                <p className="text-zinc-500 text-sm mt-1">
                  Click to browse image
                </p>
              </>
            )}
          </label>

          <button
            onClick={createPlaylist}
            className="mt-6 bg-green-500 hover:bg-green-600 transition px-6 py-3 rounded-xl font-semibold"
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

                {/* Image */}

                <div className="w-full h-64 overflow-hidden rounded-2xl mb-4">

                  <img
                    src={playlist.image}
                    alt={playlist.name}
                    className="w-full h-full object-cover hover:scale-105 transition-all duration-500"
                  />
                </div>

                {/* Header */}

                <div className="flex items-center justify-between">

                  <div>

                    <h2 className="text-2xl font-bold">
                      {playlist.name}
                    </h2>

                    <p className="text-zinc-400 text-sm mt-1">
                      {playlist.songs?.length || 0} Songs
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

                <div className="flex items-center justify-between mt-6">

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