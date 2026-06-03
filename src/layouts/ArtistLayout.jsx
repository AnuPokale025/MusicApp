import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { useAuth } from '../context/Authcontext'

const ArtistLayout = () => {
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <header className="border-b border-zinc-800 py-5">
        <div className="mx-auto flex flex-col gap-4 px-5 md:flex-row md:items-center md:justify-between max-w-6xl">
          <div>
            <h1 className="text-3xl font-bold">Artist Dashboard</h1>
            <p className="text-sm text-zinc-400">
              {user?.name ? `Welcome, ${user.name}` : 'Logged in as artist'}
            </p>
          </div>

          <nav className="flex flex-wrap gap-3 text-sm">
            <Link to="/artists" className="rounded-full border border-green-500 px-4 py-2 text-green-400 hover:bg-green-500 hover:text-black transition">
              Your Songs
            </Link>
            <Link to="/profile" className="rounded-full border border-zinc-700 px-4 py-2 text-zinc-300 hover:bg-zinc-700 transition">
              Profile
            </Link>
            <Link to="/" className="rounded-full border border-zinc-700 px-4 py-2 text-zinc-300 hover:bg-zinc-700 transition">
              Home
            </Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl p-5">
        <Outlet />
      </main>
      <MusicModal/>
    </div>
  )
}

export default ArtistLayout
