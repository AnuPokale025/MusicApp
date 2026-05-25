import { Routes, Route } from 'react-router-dom'
import HeroSection from "./pages/HeroSection"
import Login from "./pages/Login"
import Register from "./pages/Register"
import MainLayout from './layouts/MainLayout'
import Profile from './pages/Profile'

function App() {
  return (
    <Routes>
      {/* Public routes - without layout */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected routes - with Navbar and Footer */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HeroSection />} />
        <Route path="/home" element={<HeroSection />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  )
}

export default App
