import { useState } from 'react'
import { Home, Search, LayoutGrid, ArrowUpRight, User, Plus } from 'lucide-react'

function SpotifyLogo() {
  return (
    <svg width="28" height="28" viewBox="0 0 496 512" xmlns="http://www.w3.org/2000/svg">
      <path
        fill="#1DB954"
        d="M248 8C111.1 8 8 111.1 8 248s103.1 240 240 240 240-103.1 240-240S384.9 8 248 8zm110.7 348.2c-4.3 7-13.5 9.2-20.5 4.9-56.3-34.4-127.1-42.1-210.6-23-8.1 1.9-16.1-3.1-18-11.2-1.9-8.1 3-16.1 11.1-18 91.3-20.8 169.7-11.8 233.1 26.5 7 4.3 9.2 13.5 4.9 20.8zm29.5-65.7c-5.4 8.7-16.9 11.5-25.7 6.1-64.4-39.6-162.5-51-238.5-27.9-9.9 3-20.3-2.5-23.3-12.3-3-9.9 2.5-20.3 12.4-23.3 86.9-26.4 194.8-13.6 268.5 32.1 8.8 5.5 11.6 17 6.6 25.3zm2.5-68.1c-77-45.7-204-49.9-277.5-27.6-11.8 3.6-24.3-3.1-27.9-14.9-3.6-11.8 3-24.3 14.9-27.9 84.5-25.7 224.7-20.7 313.2 32 10.6 6.3 14.1 20 7.8 30.6-6.4 10.5-20.2 14.1-30.5 7.8z"
      />
    </svg>
  )
}

function FilterPill({ label }) {
  return (
    <button
      type="button"
      className="rounded-full bg-white/10 px-3.5 py-1.5 text-[13px] font-semibold text-white transition hover:bg-white/20 whitespace-nowrap"
    >
      {label}
    </button>
  )
}

function IconBtn({ children, className = '', ...props }) {
  return (
    <button
      type="button"
      {...props}
      className={`flex h-8 w-8 items-center justify-center rounded-full text-[#b3b3b3] transition hover:bg-white/10 hover:text-white ${className}`}
    >
      {children}
    </button>
  )
}

export default function Navbar() {
  const [focused, setFocused] = useState(false)

  return (
    <div className="bg-[#121212] font-sans">

      {/* ── Top bar ── */}
      <header className="flex h-16 items-center gap-2 border-b border-white/[0.08] bg-[#121212] px-4">

        {/* Logo */}
        <a
          href="#"
          aria-label="Spotify Home"
          className="mr-2 flex items-center gap-2 no-underline"
        >
          {/* <SpotifyLogo /> */}
          <span className="text-[15px] font-bold tracking-tight text-white">Music</span>
        </a>

        {/* Home button */}
        <button
          type="button"
          aria-label="Home"
          className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#1a1a1a] text-white transition hover:bg-[#2a2a2a]"
        >
          <Home size={20} />
        </button>

        {/* Search bar */}
        <div className="relative ml-2 flex-1" style={{ maxWidth: 364 }}>
          <Search
            size={18}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#a7a7a7]"
          />
          <input
            type="text"
            placeholder="What do you want to play?"
            aria-label="Search"
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className={`h-12 w-full rounded-full bg-[#242424] px-12 text-sm text-white placeholder-[#a7a7a7] outline-none transition
              ${focused ? 'border border-white bg-[#2a2a2a]' : 'border border-transparent'}`}
          />
          {/* Browse icon + divider */}
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

        {/* Right actions */}
        <div className="flex flex-shrink-0 items-center gap-2">

          {/* Upgrade */}
          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-full px-4 py-1 text-sm font-semibold text-[#a7a7a7] transition hover:text-white whitespace-nowrap bg-transparent border-none cursor-pointer"
          >
            <ArrowUpRight size={16} />
            Upgrade
          </button>

          {/* Sign up */}
          <button
            type="button"
            className="rounded-full bg-white px-8 py-3 text-sm font-bold text-black transition hover:bg-[#f0f0f0] hover:scale-[1.03] active:scale-100 whitespace-nowrap border-none cursor-pointer"
          >
            Sign up
          </button>

          {/* Avatar pill */}
          <button
            type="button"
            aria-label="Anna's account"
            className="flex items-center gap-2 rounded-full bg-[#1a1a1a] py-1 pl-1 pr-3 transition hover:bg-[#2a2a2a] border-none cursor-pointer"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#333] text-white">
              <User size={16} />
            </span>
            <span className="text-sm font-semibold text-white">Anna</span>
          </button>
        </div>
      </header>

      {/* ── Library / filter bar ── */}
      <nav
        aria-label="Your library"
        className="flex items-center gap-1 border-b border-white/[0.08] bg-[#121212] px-3"
      >
        {/* Your Library tab */}
        <button
          type="button"
          className="inline-flex items-center gap-1.5 border-b-2 border-[#1DB954] px-3.5 py-2.5 -mb-px text-sm font-medium text-white bg-transparent cursor-pointer rounded-none"
        >
          <LayoutGrid size={16} />
          Your Library
        </button>

        {/* Divider */}
        <div className="mx-1 h-5 w-px bg-white/10" />

        {/* Filter pills */}
        {['Playlists', 'Podcasts & Shows', 'Artists', 'Albums'].map(pill => (
          <FilterPill key={pill} label={pill} />
        ))}

        {/* Spacer */}
        <div className="flex-1" />

        {/* Search + Create playlist */}
        <div className="flex items-center gap-1">
          <IconBtn aria-label="Search library">
            <Search size={18} />
          </IconBtn>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded px-3 py-1.5 text-[13px] font-semibold text-[#b3b3b3] transition hover:bg-white/[0.07] hover:text-white whitespace-nowrap bg-transparent border-none cursor-pointer"
          >
            <Plus size={16} />
            Create playlist
          </button>
        </div>
      </nav>

    </div>
  )
}