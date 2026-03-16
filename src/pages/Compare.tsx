import { useState } from 'react';
import { useStore } from '../store/useStore';
import { useTranslation } from '../hooks/useTranslation';
import { compareBrands } from '../services/gemini';
import { 
  Swords, Loader2, Trophy, Shield, Leaf, Users, 
  MessageSquare, Lock, ArrowRight
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';

export function Compare() {
  const { t } = useTranslation();
  const { isAuthenticated, user, setShowAuthModal, deductCredit } = useStore();
  
  const [brand1, setBrand1] = useState('');
  const [brand2, setBrand2] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Awaited<ReturnType<typeof compareBrands>> | null>(null);

  const handleCompare = async () => {
    if (!brand1.trim() || !brand2.trim()) return;

    if (!isAuthenticated) {
      setShowAuthModal(true, 'login');
      return;
    }

    if (!user || user.credits < 2) {
      return;
    }

    setLoading(true);
    try {
      // Deduct 2 credits for comparison
      deductCredit();
      deductCredit();
      
      const comparisonResult = await compareBrands(brand1, brand2);
      setResult(comparisonResult);
    } finally {
      setLoading(false);
    }
  };

  const metrics = result ? [
    { 
      label: t.scraper.supplyScore, 
      brand1: result.brand1.supplyChainScore, 
      brand2: result.brand2.supplyChainScore,
      icon: Shield 
    },
    { 
      label: t.scraper.carbonScore, 
      brand1: result.brand1.carbonScore, 
      brand2: result.brand2.carbonScore,
      icon: Leaf 
    },
    { 
      label: t.scraper.laborScore, 
      brand1: result.brand1.laborScore, 
      brand2: result.brand2.laborScore,
      icon: Users 
    },
    { 
      label: t.scraper.sentimentScore, 
      brand1: result.brand1.sentimentScore, 
      brand2: result.brand2.sentimentScore,
      icon: MessageSquare 
    },
  ] : [];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-24 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 mb-6">
            <Swords className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t.compare.title}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t.compare.subtitle}
          </p>
        </div>

        {/* Comparison Input */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-800 p-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              {/* Brand 1 */}
              <div className="flex-1 w-full">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t.compare.brand1}
                </label>
                <input
                  type="text"
                  value={brand1}
                  onChange={(e) => setBrand1(e.target.value)}
                  placeholder="e.g., Nike"
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                />
              </div>

              {/* VS Badge */}
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  {t.compare.vsLabel}
                </div>
              </div>

              {/* Brand 2 */}
              <div className="flex-1 w-full">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t.compare.brand2}
                </label>
                <input
                  type="text"
                  value={brand2}
                  onChange={(e) => setBrand2(e.target.value)}
                  placeholder="e.g., Adidas"
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>

            <div className="mt-8 flex justify-center">
              <button
                onClick={handleCompare}
                disabled={loading || !brand1.trim() || !brand2.trim()}
                className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold rounded-xl shadow-lg shadow-amber-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    {t.scraper.analyzing}
                  </>
                ) : !isAuthenticated ? (
                  <>
                    <Lock className="w-5 h-5" />
                    {t.compare.startBattle}
                  </>
                ) : (
                  <>
                    <Swords className="w-5 h-5" />
                    {t.compare.startBattle}
                  </>
                )}
              </button>
            </div>

            {!isAuthenticated && (
              <p className="text-center text-sm text-gray-500 mt-4">
                {t.auth.loginRequiredDesc}
              </p>
            )}
          </div>
        </div>

        {/* Results */}
        {result && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Winner Banner */}
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-3xl p-8 mb-8 text-white text-center">
              <Trophy className="w-16 h-16 mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-2">{t.compare.winner}: {result.winner}</h2>
              <p className="text-amber-100 max-w-2xl mx-auto">{result.analysis}</p>
            </div>

            {/* Score Comparison */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Brand 1 Card */}
              <div className={`bg-white dark:bg-gray-900 rounded-2xl p-6 border-2 ${
                result.winner === brand1 
                  ? 'border-amber-500' 
                  : 'border-gray-200 dark:border-gray-800'
              }`}>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{brand1}</h3>
                  <span className="text-3xl font-bold text-emerald-500">
                    {result.brand1.overallScore}%
                  </span>
                </div>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={metrics.map(m => ({ name: m.label.split(' ')[0], value: m.brand1 }))}
                      layout="vertical"
                    >
                      <XAxis type="number" domain={[0, 100]} hide />
                      <YAxis dataKey="name" type="category" width={80} fontSize={12} />
                      <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                        {metrics.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={`hsl(${160 + index * 20}, 70%, 50%)`} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Brand 2 Card */}
              <div className={`bg-white dark:bg-gray-900 rounded-2xl p-6 border-2 ${
                result.winner === brand2 
                  ? 'border-amber-500' 
                  : 'border-gray-200 dark:border-gray-800'
              }`}>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">{brand2}</h3>
                  <span className="text-3xl font-bold text-emerald-500">
                    {result.brand2.overallScore}%
                  </span>
                </div>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={metrics.map(m => ({ name: m.label.split(' ')[0], value: m.brand2 }))}
                      layout="vertical"
                    >
                      <XAxis type="number" domain={[0, 100]} hide />
                      <YAxis dataKey="name" type="category" width={80} fontSize={12} />
                      <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                        {metrics.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={`hsl(${160 + index * 20}, 70%, 50%)`} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Detailed Metrics */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
              <div className="p-6 border-b border-gray-200 dark:border-gray-800">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {t.compare.metrics}
                </h3>
              </div>
              <div className="divide-y divide-gray-200 dark:divide-gray-800">
                {metrics.map((metric, i) => {
                  const diff = metric.brand1 - metric.brand2;
                  const winner = diff > 0 ? brand1 : diff < 0 ? brand2 : 'Tie';
                  
                  return (
                    <div key={i} className="flex items-center p-6">
                      <div className="flex items-center gap-3 w-48">
                        <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                          <metric.icon className="w-5 h-5 text-emerald-500" />
                        </div>
                        <span className="font-medium text-gray-900 dark:text-white">{metric.label}</span>
                      </div>
                      <div className="flex-1 flex items-center gap-4">
                        <span className={`text-lg font-bold ${diff > 0 ? 'text-emerald-500' : 'text-gray-500'}`}>
                          {metric.brand1}%
                        </span>
                        <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden flex">
                          <div 
                            className="h-full bg-emerald-500 transition-all"
                            style={{ width: `${metric.brand1}%` }}
                          />
                        </div>
                        <ArrowRight className="w-5 h-5 text-gray-400" />
                        <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden flex">
                          <div 
                            className="h-full bg-teal-500 transition-all"
                            style={{ width: `${metric.brand2}%` }}
                          />
                        </div>
                        <span className={`text-lg font-bold ${diff < 0 ? 'text-teal-500' : 'text-gray-500'}`}>
                          {metric.brand2}%
                        </span>
                      </div>
                      <div className="w-32 text-right">
                        <span className={`text-sm font-medium ${
                          winner === brand1 ? 'text-emerald-500' : 
                          winner === brand2 ? 'text-teal-500' : 'text-gray-500'
                        }`}>
                          {winner === 'Tie' ? 'Tie' : `+${Math.abs(diff)}pts`}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
