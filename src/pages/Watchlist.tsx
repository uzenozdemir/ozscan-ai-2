import { Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { useTranslation } from '../hooks/useTranslation';
import { 
  Eye, Bell, BellOff, Trash2, ExternalLink, Search,
  TrendingUp, Star
} from 'lucide-react';

export function Watchlist() {
  const { t } = useTranslation();
  const { watchlist, removeFromWatchlist, toggleWatchlistAlert, isAuthenticated, setShowAuthModal } = useStore();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-24 pb-12 px-4">
        <div className="max-w-2xl mx-auto text-center py-24">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 flex items-center justify-center">
            <Eye className="w-12 h-12 text-emerald-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {t.watchlist.title}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            {t.auth.loginRequiredDesc}
          </p>
          <button
            onClick={() => setShowAuthModal(true, 'login')}
            className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/25 transition-all"
          >
            {t.nav.login}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-24 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {t.watchlist.title}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {t.watchlist.subtitle}
          </p>
        </div>

        {watchlist.length === 0 ? (
          <div className="text-center py-24">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 flex items-center justify-center">
              <Star className="w-12 h-12 text-emerald-500" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {t.watchlist.empty}
            </h2>
            <p className="text-gray-500 mb-8">{t.watchlist.emptyDesc}</p>
            <Link
              to="/scraper"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/25 transition-all"
            >
              <Search className="w-5 h-5" />
              {t.scraper.analyze}
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {watchlist.map((item) => (
              <div
                key={item.id}
                className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-lg transition-shadow"
              >
                {/* Card Header */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {item.brand}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {t.watchlist.lastUpdated}: {new Date(item.lastUpdated).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-4 h-4 text-emerald-500" />
                      <span className="text-xl font-bold text-emerald-500">{item.lastScore}%</span>
                    </div>
                  </div>

                  {/* Score Bar */}
                  <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-4">
                    <div
                      className={`h-full rounded-full transition-all ${
                        item.lastScore >= 80
                          ? 'bg-emerald-500'
                          : item.lastScore >= 60
                          ? 'bg-yellow-500'
                          : 'bg-red-500'
                      }`}
                      style={{ width: `${item.lastScore}%` }}
                    />
                  </div>

                  {/* Alert Status */}
                  <div className="flex items-center gap-2">
                    {item.alertsEnabled ? (
                      <>
                        <Bell className="w-4 h-4 text-emerald-500" />
                        <span className="text-sm text-emerald-600 dark:text-emerald-400">
                          {t.watchlist.alertsEnabled}
                        </span>
                      </>
                    ) : (
                      <>
                        <BellOff className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-500">Alerts disabled</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleWatchlistAlert(item.id)}
                      className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                      title={item.alertsEnabled ? 'Disable alerts' : 'Enable alerts'}
                    >
                      {item.alertsEnabled ? (
                        <BellOff className="w-5 h-5 text-gray-500" />
                      ) : (
                        <Bell className="w-5 h-5 text-gray-500" />
                      )}
                    </button>
                    <button
                      onClick={() => removeFromWatchlist(item.id)}
                      className="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors"
                      title={t.watchlist.remove}
                    >
                      <Trash2 className="w-5 h-5 text-red-500" />
                    </button>
                  </div>
                  <Link
                    to={`/scraper?brand=${encodeURIComponent(item.brand)}`}
                    className="flex items-center gap-2 text-sm text-emerald-600 hover:text-emerald-700 font-medium"
                  >
                    {t.watchlist.viewDetails}
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
