import { useState, useEffect } from 'react'
import { Play, Pause, SkipForward, SkipBack, Volume2, Shuffle, Repeat, ChevronRight, Heart } from 'lucide-react'
import UserApi from '../auth/user.api'
import { useMusic } from '../context/MusicContext'

// ── Data ────────────────────────────────────────────────────────────────────

const FEATURED = [
  {
    id: 1,
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    album: 'After Hours',
    duration: '3:20',
    liked: true,
    gradient: 'from-[#c0392b] via-[#8e1a2e] to-[#121212]',
    accent: '#c0392b',
    cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
  },
  {
    id: 2,
    title: 'As It Was',
    artist: 'Harry Styles',
    album: "Harry's House",
    duration: '2:47',
    liked: false,
    gradient: 'from-[#1565c0] via-[#0d3b72] to-[#121212]',
    accent: '#1565c0',
    cover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=400&fit=crop',
  },
  {
    id: 3,
    title: 'Flowers',
    artist: 'Miley Cyrus',
    album: 'Endless Summer Vacation',
    duration: '3:20',
    liked: true,
    gradient: 'from-[#6d4c41] via-[#3e2723] to-[#121212]',
    accent: '#a1887f',
    cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop',
  },
]

const TRENDING = [
  { rank: 1, title: 'Cruel Summer', artist: 'Taylor Swift', plays: '1.2B', cover: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=80&h=80&fit=crop' },
  { rank: 2, title: 'Unholy', artist: 'Sam Smith', plays: '980M', cover: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=80&h=80&fit=crop' },
  { rank: 3, title: 'Anti-Hero', artist: 'Taylor Swift', plays: '870M', cover: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=80&h=80&fit=crop' },
  { rank: 4, title: 'Calm Down', artist: 'Rema & Selena', plays: '760M', cover: 'https://images.unsplash.com/photo-1499415479124-43c32433a620?w=80&h=80&fit=crop' },
  { rank: 5, title: 'Escapism', artist: 'RAYE', plays: '640M', cover: 'https://images.unsplash.com/photo-1446057032654-9d8885db76c6?w=80&h=80&fit=crop' },
]

const GENRES = [
  { label: 'Pop', color: 'bg-[#e91e8c]', emoji: '🎤' },
  { label: 'Hip-Hop', color: 'bg-[#8000ff]', emoji: '🎧' },
  { label: 'R&B', color: 'bg-[#e67e22]', emoji: '🎷' },
  { label: 'Electronic', color: 'bg-[#00bcd4]', emoji: '🎛️' },
  { label: 'Rock', color: 'bg-[#e53935]', emoji: '🎸' },
  { label: 'Jazz', color: 'bg-[#fdd835]', emoji: '🎺' },
]

// ── Sub-components ───────────────────────────────────────────────────────────

function GenreChip({ label, color, emoji }) {
  return (
    <button
      type="button"
      className={`${color} flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold text-white shadow-lg transition hover:scale-105 hover:brightness-110 active:scale-95`}
    >
      <span>{emoji}</span>
      {label}
    </button>
  )
}

function TrendingRow({ rank, title, artist, plays, cover }) {
  const [liked, setLiked] = useState(false)
  const [songs, setSongs] = useState([]);
  const { playSong } = useMusic()

  useEffect(() => {
    const fetchSong = async () => {
      try {
        const res = await UserApi.getAllSongs();
        const songData = Array.isArray(res.data) ? res.data : res.songs || [];
        setSongs(songData);
        console.log("Songs:", songData);
      } catch (err) {
        console.error("Song fetch error:", err);
      }

    };
    fetchSong();
  }, []);

  return (
    <div className="grid grid-rows-2  gap-4">
      {songs.map((song) => (
        <div
          key={song._id}
          className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700"
        >
          <img
            src={song.image}
            alt={song.title}
            className="w-full h-40 object-cover rounded-md"
          />

          <h3 className="text-white font-semibold mt-2">
            {song.title}
          </h3>

          <p className="text-gray-400 text-sm">
            {song.artist}
          </p>
            <button
                onClick={() =>
                  playSong({
                    ...song,
                    audioUrl: song.audio || song.audioUrl,
                    coverImage: song.image || song.coverImage || song.cover,
                  })
                }
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-green-500 px-4 py-3 text-sm font-semibold text-black transition hover:bg-green-400"
              >
                <Play size={18} />
                Play Song
              </button>
        </div>
      ))}
    </div>
  );
};
  

function MiniPlayer({ track, isPlaying, onToggle, progress, onProgress }) {
  return (
    <div className="flex flex-col gap-2 rounded-2xl bg-[#1a1a1a] p-4 shadow-2xl">
      <div className="flex items-center gap-3">
        <img src={track.cover} alt={track.title} className="h-12 w-12 rounded-lg object-cover shadow-lg" />
        <div className="flex-1 min-w-0">
          <p className="truncate text-sm font-bold text-white">{track.title}</p>
          <p className="truncate text-xs text-[#b3b3b3]">{track.artist}</p>
        </div>
        <button className="text-[#b3b3b3] transition hover:text-[#1DB954]">
          <Heart size={16} className={track.liked ? 'fill-[#1DB954] text-[#1DB954]' : ''} />
        </button>
      </div>

      {/* Progress bar */}
      <div className="flex items-center gap-2">
        <span className="text-[10px] text-[#b3b3b3]">1:12</span>
        <div className="group relative flex-1 cursor-pointer">
          <div className="h-1 overflow-hidden rounded-full bg-white/20">
            <div
              className="h-full rounded-full bg-[#1DB954] transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        <span className="text-[10px] text-[#b3b3b3]">{track.duration}</span>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <button className="text-[#b3b3b3] transition hover:text-white">
          <Shuffle size={14} />
        </button>
        <button className="text-[#b3b3b3] transition hover:text-white">
          <SkipBack size={18} />
        </button>
        <button
          onClick={onToggle}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow transition hover:scale-105 active:scale-95"
        >
          {isPlaying
            ? <Pause size={18} className="text-black" />
            : <Play size={18} className="ml-0.5 text-black" />
          }
        </button>
        <button className="text-[#b3b3b3] transition hover:text-white">
          <SkipForward size={18} />
        </button>
        <button className="text-[#1DB954]">
          <Repeat size={14} />
        </button>
      </div>
    </div>
  )
}

// ── Hero Section ─────────────────────────────────────────────────────────────

export default function HeroSection() {
  const [activeIdx, setActiveIdx] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(36)

  const track = FEATURED[activeIdx]

  // Simulate progress
  useEffect(() => {
    if (!isPlaying) return
    const t = setInterval(() => setProgress(p => (p >= 100 ? 0 : p + 0.3)), 300)
    return () => clearInterval(t)
  }, [isPlaying])

  // Auto-cycle slides
  useEffect(() => {
    const t = setInterval(() => {
      setActiveIdx(i => (i + 1) % FEATURED.length)
    }, 5000)
    return () => clearInterval(t)
  }, [])

  return (
    <section className="min-h-screen w-full overflow-hidden bg-[#121212]">

      {/* ── Hero banner ─────────────────────────────────────────── */}
      <div className={`relative bg-linear-to-b ${track.gradient} transition-all duration-700`}>

        {/* Noise texture overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: '200px',
          }}
        />

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-16 lg:px-12">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16 items-center">

            {/* Left — text + controls */}
            <div className="flex flex-col gap-6">
              {/* Badge */}
              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-[#1DB954]/20 px-3 py-1 text-xs font-bold text-[#1DB954] ring-1 ring-[#1DB954]/30">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#1DB954]" />
                NOW TRENDING
              </span>

              {/* Title */}
              <div>
                <h1 className="text-5xl font-black leading-none tracking-tighter text-white lg:text-7xl">
                  {track.title}
                </h1>
                <p className="mt-2 text-lg font-semibold text-white/60">{track.artist} · {track.album}</p>
              </div>

              {/* Waveform visualiser (CSS animated bars) */}
              <div className="flex items-end gap-0.75 h-10">
                {Array.from({ length: 28 }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-1 rounded-full ${isPlaying ? 'animate-barBounce' : ''}`}
                    style={{
                      background: track.accent,
                      height: `${20 + Math.sin(i * 0.7) * 16 + Math.cos(i * 1.3) * 10}px`,
                      opacity: isPlaying ? 1 : 0.4,
                      animationDuration: isPlaying ? `${0.5 + (i % 5) * 0.15}s` : undefined,
                    }}
                  />
                ))}
              </div>

              {/* CTA buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setIsPlaying(p => !p)}
                  className="inline-flex items-center gap-2 rounded-full bg-[#1DB954] px-8 py-3.5 text-sm font-bold text-black shadow-lg transition hover:scale-105 hover:bg-[#1ed760] active:scale-95"
                >
                  {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                  {isPlaying ? 'Pause' : 'Play Now'}
                </button>
                <button className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-3.5 text-sm font-bold text-white transition hover:border-white/50 hover:bg-white/5">
                  <Heart size={18} />
                  Like
                </button>
              </div>

              {/* Slide dots */}
              <div className="flex items-center gap-2">
                {FEATURED.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIdx(i)}
                    className={`h-1.5 rounded-full transition-all ${i === activeIdx ? 'w-8 bg-[#1DB954]' : 'w-1.5 bg-white/30 hover:bg-white/60'}`}
                  />
                ))}
              </div>
            </div>

            {/* Right — album art + mini player */}
            <div className="flex flex-col items-center gap-6 lg:items-end">
              {/* Album art */}
              <div className="relative">
                <div
                  className="absolute -inset-4 rounded-3xl opacity-40 blur-2xl transition-all duration-700"
                  style={{ background: track.accent }}
                />
                <img
                  key={track.id}
                  src={track.cover}
                  alt={track.title}
                  className="relative h-64 w-64 rounded-2xl object-cover shadow-2xl ring-1 ring-white/10 lg:h-72 lg:w-72 animate-fadeIn"
                />
                {/* Spinning disc badge */}
                {isPlaying && (
                  <div
                    className="absolute -bottom-4 -right-4 h-16 w-16 rounded-full bg-[#121212] p-1 shadow-xl ring-1 ring-white/10 animate-spinSlow"
                  >
                    <div className="h-full w-full rounded-full bg-[#1a1a1a] flex items-center justify-center">
                      <div className="h-3 w-3 rounded-full bg-[#1DB954]" />
                    </div>
                  </div>
                )}
              </div>

              {/* Mini player */}
              <div className="w-full max-w-xs">
                <MiniPlayer
                  track={track}
                  isPlaying={isPlaying}
                  onToggle={() => setIsPlaying(p => !p)}
                  progress={progress}
                  onProgress={setProgress}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Genres ──────────────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-12">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold text-white">
            Browse by Genre
          </h2>
          <button className="flex items-center gap-1 text-sm font-semibold text-[#b3b3b3] transition hover:text-white">
            Show all <ChevronRight size={16} />
          </button>
        </div>
        <div className="flex flex-wrap gap-3">
          {GENRES.map(g => <GenreChip key={g.label} {...g} />)}
        </div>
      </div>

      {/* ── Featured + Trending grid ─────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-6 pb-16 lg:px-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">

          {/* Featured cards */}
          <div className="lg:col-span-2">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">
                Featured Albums
              </h2>
              <button className="flex items-center gap-1 text-sm font-semibold text-[#b3b3b3] transition hover:text-white">
                Show all <ChevronRight size={16} />
              </button>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {FEATURED.map((item, i) => (
                <button
                  key={item.id}
                  onClick={() => setActiveIdx(i)}
                  className={`group relative overflow-hidden rounded-2xl text-left transition hover:scale-[1.02] active:scale-[0.98] ${i === activeIdx ? 'ring-2 ring-[#1DB954]' : ''}`}
                >
                  <img
                    src={item.cover}
                    alt={item.title}
                    className="h-44 w-full object-cover transition group-hover:brightness-75"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-3">
                    <p className="text-sm font-bold text-white">{item.title}</p>
                    <p className="text-xs text-white/70">{item.artist}</p>
                  </div>
                  <div className="absolute bottom-3 right-3 hidden group-hover:flex h-9 w-9 items-center justify-center rounded-full bg-[#1DB954] shadow-lg transition">
                    <Play size={16} className="ml-0.5 text-black" />
                  </div>
                  {i === activeIdx && (
                    <div className="absolute top-2 right-2 rounded-full bg-[#1DB954] px-2 py-0.5 text-[10px] font-bold text-black">
                      PLAYING
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Trending */}
          <div>
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">
                Trending Now
              </h2>
              <button className="flex items-center gap-1 text-sm font-semibold text-[#b3b3b3] transition hover:text-white">
                All <ChevronRight size={16} />
              </button>
            </div>
            <div className="rounded-2xl bg-[#1a1a1a] py-2">
               <TrendingRow />
            </div>
          </div>
        </div>
      </div>

    </section>
  )
}