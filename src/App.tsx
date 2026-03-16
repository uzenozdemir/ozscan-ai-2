import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';
import { Home } from './pages/Home';
import { Dashboard } from './pages/Dashboard';
import { Scraper } from './pages/Scraper';
import { Compare } from './pages/Compare';
import { Watchlist } from './pages/Watchlist';
import { Pricing } from './pages/Pricing';
import { Settings } from './pages/Settings';
import { Legal } from './pages/Legal';

export function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/scraper" element={<Scraper />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/watchlist" element={<Watchlist />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/legal/:type" element={<Legal />} />
          </Routes>
        </main>
        <Footer />
        <AuthModal />
      </div>
    </BrowserRouter>
  );
}
