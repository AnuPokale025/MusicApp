import { useEffect, useState } from "react";
import {
  Home,
  Search,
  LayoutGrid,
  ArrowUpRight,
  User,
  Plus,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Authcontext.jsx";
import UserApi from "../auth/user.api.js";

function FilterPill({ label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-full bg-white/10 px-3.5 py-1.5 text-[13px] font-semibold text-white transition hover:bg-white/20 whitespace-nowrap"
    >
      {label}
    </button>
  );
}

function IconBtn({ children, className = "", ...props }) {
  return (
    <button
      type="button"
      {...props}
      className={`flex h-8 w-8 items-center justify-center rounded-full text-[#b3b3b3] transition hover:bg-white/10 hover:text-white ${className}`}
    >
      {children}
    </button>
  );
}

export default function Navbar() {
  const { user, logout } = useAuth();
  const [favoriteSongs, setFavoriteSongs] = useState([]);
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const homeBtn = () => {
    navigate("/");
  };

  const profileBtn = () => {
    navigate("/profile");
  };

  const handleLogout = () => {
    logout();
    navigate("/home");
  };

  const handleSearch = async () => {
    try {
      if (!query.trim()) return;

      console.log("Searching:", query);

      const res = await UserApi.searchSong(query);

      console.log("API Response:", res.data);

      setSearchResults(res?.data?.data || res?.data || []);
      // console.log(setSearchResults);

    } catch (error) {
      console.error(
        "Error searching songs:",
        error?.response?.data || error.message
      );
    }
  };
 

    const fetchfavoritesongs = async () => {
      try {
        const res = await UserApi.getAllFavoriteSong();
        console.log("Favorite Songs:", res.data);
        setFavoriteSongs(res.data);
      } catch (err) {
        console.error("Favorite Songs fetch error:", err);

      }
    }



  return (
    <div className="bg-[#121212] font-sans">
      {/* Top Bar */}
      <header className="flex h-16 items-center gap-2 border-b border-white/8 bg-[#121212] px-4">
        {/* Logo */}
        <a
          href="/"
          aria-label="Music Home"
          className="mr-2 flex items-center gap-2 no-underline"
        >
          <span className="text-[15px] font-bold tracking-tight text-white">
            Music
          </span>
        </a>

        {/* Home Button */}
        <button
          onClick={homeBtn}
          type="button"
          aria-label="Home"
          className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full bg-[#1a1a1a] text-white transition hover:bg-[#2a2a2a]"
        >
          <Home size={20} />
        </button>

        {/* Search Bar */}
        <div className="relative ml-2 flex-1 max-w-full sm:max-w-[420px]">
          <button
            type="button"
            onClick={handleSearch}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#a7a7a7] hover:text-white"
          >
            <Search size={18} />
          </button>

          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
            placeholder="What do you want to play?"
            aria-label="Search"
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className={`h-12 w-full rounded-full bg-[#242424] px-12 text-sm text-white placeholder-[#a7a7a7] outline-none transition
              ${focused
                ? "border border-white bg-[#2a2a2a]"
                : "border border-transparent"
              }`}
          />

          <div className="absolute right-3.5 top-1/2 flex -translate-y-1/2 items-center gap-1.5">
            <div className="h-5 w-px bg-white/15" />
            <button
              type="button"
              aria-label="Browse"
              className="flex items-center p-0 text-[#a7a7a7] transition hover:text-white bg-transparent border-none cursor-pointer"
            >
              <LayoutGrid size={18} />
            </button>
          </div>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Right Side */}
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-semibold text-[#a7a7a7] transition hover:text-white whitespace-nowrap"
          >
            <ArrowUpRight size={16} />
            Upgrade
          </button>

          {user ? (
            <button
              onClick={handleLogout}
              type="button"
              className="rounded-full bg-red-500 px-4 sm:px-8 py-2 sm:py-3 text-sm font-bold text-white transition hover:bg-red-600"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => navigate("/login")}
              type="button"
              className="rounded-full bg-white px-8 py-3 text-sm font-bold text-black transition hover:bg-[#f0f0f0]"
            >
              Sign In
            </button>
          )}

          <button
            type="button"
            onClick={profileBtn}
            aria-label="Account"
            className="flex items-center gap-2 rounded-full bg-[#1a1a1a] py-1 pl-1 pr-3 transition hover:bg-[#2a2a2a]"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#333] text-white">
              <User size={16} />
            </span>
            <h4 className="hidden sm:block text-lg">
              {user?.name || "Guest"}
            </h4>
          </button>
        </div>
      </header>

      {/* Library Navigation */}
      <nav
        aria-label="Your library"
        className="flex items-center gap-1 border-b border-white/8 bg-[#121212] px-3 overflow-x-auto whitespace-nowrap"
      >
        <button
        onClick={() => navigate("/favorites")}
          type="button"
          className="inline-flex items-center gap-1.5 border-b-2 border-[#1DB954] px-3.5 py-2.5 -mb-px text-sm font-medium text-white bg-transparent"
        >
          <LayoutGrid size={16} />
          Your Library
        </button>

        <div className="mx-1 h-5 w-px bg-white/10" />

        {["Playlists", "Songs", "Artists", "Albums"].map((pill) => (
          <FilterPill
            key={pill}
            label={pill}
            onClick={() => {
              switch (pill) {
                case "Songs":
                  navigate("/songs");
                  break;

                case "Playlists":
                  navigate("/playlist");
                  break;

                case "Artists":
                  navigate("/artists");
                  break;

                case "Albums":
                  navigate("/#");
                  break;

                default:
                  break;
              }
            }}
          />
        ))}

        <div className="flex-1" />

        <div className="flex items-center gap-1">
          <IconBtn aria-label="Search library">
            <Search size={18} />
          </IconBtn>

          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded px-3 py-1.5 text-[13px] font-semibold text-[#b3b3b3] transition hover:bg-white/[0.07] hover:text-white"
          >
            <Plus size={16} />
            Create playlist
          </button>
        </div>
      </nav>

      {/* Search Results Debug */}
      {searchResults.length > 0 && (
        <div className="p-4 bg-[#181818]">
          <h3 className="text-white font-semibold mb-2">
            Search Results
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {searchResults.map((song, index) => (
              <div
                key={song._id || index}
                className="bg-zinc-900 rounded-xl overflow-hidden shadow-lg hover:shadow-green-500/20 transition-all duration-300"
              >
                {/* Song Image */}
                <div className="h-60 overflow-hidden">
                  <img
                    src={song.image}
                    alt={song.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Song Details */}
                <div className="p-4">
                  <h2 className="text-xl font-bold text-white truncate">
                    {song.title}
                  </h2>

                  <p className="text-gray-400 mt-2">
                    <span className="font-semibold text-gray-200">Artist:</span>{" "}
                    {song.artist}
                  </p>

                  <p className="text-gray-400">
                    <span className="font-semibold text-gray-200">Album:</span>{" "}
                    {song.album}
                  </p>

                  <p className="text-gray-400">
                    <span className="font-semibold text-gray-200">Release:</span>{" "}
                    {song.releaseDate
                      ? new Date(song.releaseDate).toLocaleDateString()
                      : "N/A"}
                  </p>

                  {/* Audio Player */}
                  <div className="mt-4">
                    <audio controls className="w-full">
                      <source src={song.audio} type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}