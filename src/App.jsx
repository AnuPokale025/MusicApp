import { Routes, Route } from 'react-router-dom'
import { useAuth } from './context/Authcontext'
import HeroSection from "./pages/HeroSection"
import Login from "./pages/Login"
import Register from "./pages/Register"
import MainLayout from './layouts/MainLayout'
import ArtistLayout from './layouts/ArtistLayout'
import Profile from './pages/Profile'
import PlaylistPage from './pages/Playlist'
import Song from './pages/Song'
import ForgetPassword from './pages/ForgetPassword'
import ResetPassword from './pages/ResetPassword'
import Artist from './pages/Artist'
import MusicModal from './model/MusicModel'


function App() {
  const { user } = useAuth()
  const isArtist = user?.role?.toLowerCase() === 'artist'

  return (
    <>
      <Routes>
        {/* Public routes - without layout */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forget" element={<ForgetPassword />} />
        <Route path="/reset" element={<ResetPassword />} />

        {/* User / admin protected routes */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<HeroSection />} />
          <Route path="/home" element={<HeroSection />} />
          <Route path="/playlist" element={<PlaylistPage />} />
          <Route path="/songs" element={<Song />} />
        </Route>

        {/* Artist protected routes */}
        <Route element={isArtist ? <ArtistLayout /> : <MainLayout />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/artists" element={<Artist />} />
        </Route>
      </Routes>
      <MusicModal />
    </>
  )
}

export default App
