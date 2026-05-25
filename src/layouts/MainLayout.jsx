import { Outlet } from 'react-router-dom';
import Navbar from '../common/Navabar';
import Footer from '../common/Footer';

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
