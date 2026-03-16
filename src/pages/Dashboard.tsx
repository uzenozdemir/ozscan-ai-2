import { Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { useTranslation } from '../hooks/useTranslation';
import { 
  Search, Eye, Coins, ArrowRight, 
  BarChart3, Clock, Star
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';

export function Dashboard() {
  const { user, isAuthenticated, scans, watchlist } = useStore();
  const { t } = useTranslation();

  const chartData = [
    { name: 'Mon', scans: 4, score: 72 },
    { name: 'Tue', scans: 6, score: 78 },
    { name: 'Wed', scans: 8, score: 65 },
    { name: 'Thu', scans: 5, score: 82 },
    { name: 'Fri', scans: 9, score: 74 },
    { name: 'Sat', scans: 3, score: 88 },
    { name: 'Sun', scans: 7, score: 79 },
  ];

  const pieData = [
    { name: 'Excellent', value: 35, color: '#10b981' },
    { name: 'Good', value: 40, color: '#22c55e' },
    { name: 'Fair', value: 18, color: '#eab308' },
    { name: 'Poor', value: 7, color: '#ef4444' },
  ];

  

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {t.dashboard.greeting} {isAuthenticated && user ? user.name.split(' ')[0] : ''} 👋
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            {t.dashboard.greetingMessage}
          </p>
        </div>

        {/* Quick Actions & Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Start Analysis Card */}
          <Link
            to="/scraper"
            className="group col-span-1 md:col-span-2 lg:col-span-2 relative overflow-hidden bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl p-6 text-white hover:shadow-xl hover:shadow-emerald-500/20 transition-all"
          >
            <div className="relative z-10">
              <Search className="w-10 h-10 mb-4 opacity-80" />
              <h3 className="text-xl font-semibold mb-2">{t.scraper.title}</h3>
              <p className="text-emerald-100 text-sm mb-4">{t.scraper.subtitle}</p>
              <div className="flex items-center gap-2 text-sm font-medium">
                {t.scraper.analyze}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
            <div className="absolute right-0 bottom-0 w-32 h-32 bg-white/10 rounded-full -mr-8 -mb-8" />
          </Link>

          {/* Stats Cards */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-500">{t.dashboard.totalScans}</span>
              <BarChart3 className="w-5 h-5 text-emerald-500" />
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{scans.length}</p>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-500">{t.dashboard.credits}</span>
              <Coins className="w-5 h-5 text-amber-500" />
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {isAuthenticated && user ? user.credits : 0}
            </p>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Activity Chart */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              {t.dashboard.quickStats}
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorScans" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                  <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} />
                  <YAxis stroke="#9ca3af" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1f2937',
                      border: 'none',
                      borderRadius: '8px',
                      color: '#fff',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="score"
                    stroke="#10b981"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorScans)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Score Distribution */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              Score Distribution
            </h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap gap-3 justify-center mt-4">
              {pieData.map((item) => (
                <div key={item.name} className="flex items-center gap-2 text-xs">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-gray-600 dark:text-gray-400">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Scans & Watchlist */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Scans */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {t.dashboard.recentScans}
              </h3>
              <Clock className="w-5 h-5 text-gray-400" />
            </div>
            {scans.length === 0 ? (
              <div className="text-center py-8">
                <Search className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                <p className="text-gray-500">{t.dashboard.noScans}</p>
                <Link
                  to="/scraper"
                  className="inline-block mt-4 text-emerald-500 hover:text-emerald-600 text-sm font-medium"
                >
                  {t.dashboard.startFirst}
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {scans.slice(0, 5).map((scan) => (
                  <div
                    key={scan.id}
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl"
                  >
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{scan.brand}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(scan.timestamp).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          scan.overallScore >= 80
                            ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                            : scan.overallScore >= 60
                            ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                            : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                        }`}
                      >
                        {scan.overallScore}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Watchlist */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {t.nav.watchlist}
              </h3>
              <Eye className="w-5 h-5 text-gray-400" />
            </div>
            {watchlist.length === 0 ? (
              <div className="text-center py-8">
                <Star className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                <p className="text-gray-500">{t.watchlist.empty}</p>
                <p className="text-sm text-gray-400 mt-2">{t.watchlist.emptyDesc}</p>
              </div>
            ) : (
              <div className="space-y-4">
                {watchlist.slice(0, 5).map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl"
                  >
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{item.brand}</p>
                      <p className="text-xs text-gray-500">
                        {t.watchlist.lastUpdated}: {new Date(item.lastUpdated).toLocaleDateString()}
                      </p>
                    </div>
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 rounded-full text-sm font-medium">
                      {item.lastScore}%
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
