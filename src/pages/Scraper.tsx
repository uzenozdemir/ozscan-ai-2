import { useState } from 'react';
import { useStore } from '../store/useStore';
import { useTranslation } from '../hooks/useTranslation';
import { analyzeBrand } from '../services/gemini';
import { 
  Search, Loader2, AlertCircle, Shield, Leaf, Users, 
  MessageSquare, FileText, Plus, ExternalLink, CheckCircle2,
  Zap, Lock
} from 'lucide-react';
import { RadialBarChart, RadialBar, ResponsiveContainer, PolarAngleAxis } from 'recharts';

export function Scraper() {
  const { t } = useTranslation();
  const { isAuthenticated, user, setShowAuthModal, deductCredit, addScan, addToWatchlist } = useStore();
  
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [deepScan, setDeepScan] = useState(false);
  const [result, setResult] = useState<Awaited<ReturnType<typeof analyzeBrand>> | null>(null);
  const [error, setError] = useState('');

  const handleAnalyze = async () => {
    if (!query.trim()) return;

    // Check authentication
    if (!isAuthenticated) {
      setShowAuthModal(true, 'login');
      return;
    }

    // Check credits
    if (!user || user.credits <= 0) {
      setError(t.scraper.noCredits);
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      // Deduct credit
      const credited = deductCredit();
      if (!credited) {
        setError(t.scraper.noCredits);
        setLoading(false);
        return;
      }

      const analysisResult = await analyzeBrand(query, deepScan);
      setResult(analysisResult);

      // Save scan
      addScan({
        id: crypto.randomUUID(),
        brand: query,
        timestamp: new Date().toISOString(),
        ...analysisResult,
      });
    } catch (err) {
      setError(t.common.error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToWatchlist = () => {
    if (result) {
      addToWatchlist({
        id: crypto.randomUUID(),
        brand: query,
        lastScore: result.overallScore,
        lastUpdated: new Date().toISOString(),
        alertsEnabled: true,
      });
    }
  };

  const ScoreCard = ({ 
    icon: Icon, 
    label, 
    score, 
    detail, 
    color 
  }: { 
    icon: typeof Shield; 
    label: string; 
    score: number; 
    detail: string;
    color: string;
  }) => {
    const chartData = [{ value: score, fill: color }];
    
    return (
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              <Icon className="w-5 h-5" style={{ color }} />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white">{label}</h4>
              <p className="text-2xl font-bold" style={{ color }}>{score}%</p>
            </div>
          </div>
          <div className="w-16 h-16">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart
                cx="50%"
                cy="50%"
                innerRadius="60%"
                outerRadius="100%"
                data={chartData}
                startAngle={90}
                endAngle={-270}
              >
                <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                <RadialBar
                  background={{ fill: '#374151' }}
                  dataKey="value"
                  cornerRadius={10}
                />
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{detail}</p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-24 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t.scraper.title}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t.scraper.subtitle}
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 p-2">
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
                  placeholder={t.scraper.placeholder}
                  className="w-full pl-12 pr-4 py-4 bg-transparent border-none outline-none text-gray-900 dark:text-white placeholder-gray-400"
                />
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setDeepScan(!deepScan)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    deepScan 
                      ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400' 
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                  }`}
                >
                  <Zap className="w-4 h-4" />
                  {deepScan ? t.scraper.deepScan : t.scraper.quickScan}
                </button>
                <button
                  onClick={handleAnalyze}
                  disabled={loading || !query.trim()}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      {t.scraper.analyzing}
                    </>
                  ) : !isAuthenticated ? (
                    <>
                      <Lock className="w-5 h-5" />
                      {t.scraper.analyze}
                    </>
                  ) : (
                    <>
                      <Search className="w-5 h-5" />
                      {t.scraper.analyze}
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Auth prompt for non-authenticated users */}
          {!isAuthenticated && (
            <div className="mt-4 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl flex items-start gap-3">
              <Lock className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-amber-800 dark:text-amber-300 font-medium">{t.auth.loginRequired}</p>
                <p className="text-amber-700 dark:text-amber-400 text-sm mt-1">{t.auth.loginRequiredDesc}</p>
              </div>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-500" />
              <p className="text-red-700 dark:text-red-400">{error}</p>
            </div>
          )}
        </div>

        {/* Results */}
        {result && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Overall Score */}
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-8 mb-8 text-white">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">{query}</h2>
                  <p className="text-gray-400">{t.scraper.results}</p>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <p className="text-6xl font-bold text-emerald-400">{result.overallScore}%</p>
                    <p className="text-gray-400 mt-2">Overall Score</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={handleAddToWatchlist}
                      className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      {t.scraper.addWatchlist}
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition-colors">
                      <FileText className="w-4 h-4" />
                      {t.scraper.exportPdf}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Score Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <ScoreCard
                icon={Shield}
                label={t.scraper.supplyScore}
                score={result.supplyChainScore}
                detail={result.details.supplyChain}
                color="#10b981"
              />
              <ScoreCard
                icon={Leaf}
                label={t.scraper.carbonScore}
                score={result.carbonScore}
                detail={result.details.carbon}
                color="#22c55e"
              />
              <ScoreCard
                icon={Users}
                label={t.scraper.laborScore}
                score={result.laborScore}
                detail={result.details.labor}
                color="#14b8a6"
              />
              <ScoreCard
                icon={MessageSquare}
                label={t.scraper.sentimentScore}
                score={result.sentimentScore}
                detail={result.details.sentiment}
                color="#06b6d4"
              />
            </div>

            {/* Recommendations & Sources */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Recommendations */}
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  {t.scraper.recommendations}
                </h3>
                <ul className="space-y-3">
                  {result.recommendations.map((rec, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600 dark:text-gray-400 text-sm">{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Sources */}
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  {t.scraper.sources}
                </h3>
                <ul className="space-y-3">
                  {result.sources.map((source, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <ExternalLink className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600 dark:text-gray-400 text-sm">{source}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!result && !loading && (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 flex items-center justify-center">
              <Search className="w-12 h-12 text-emerald-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Ready to Analyze
            </h3>
            <p className="text-gray-500 max-w-md mx-auto">
              Enter a brand name, seller, or product URL above to get detailed sustainability insights powered by AI.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
