import { Link } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import { 
  ArrowRight, Play, Shield, Leaf, Users, MessageSquare, 
  Zap, Sparkles
} from 'lucide-react';

export function Home() {
  const { t } = useTranslation();

  const features = [
    { icon: Shield, title: t.features.supplyChain, desc: t.features.supplyChainDesc, color: 'emerald' },
    { icon: Leaf, title: t.features.carbon, desc: t.features.carbonDesc, color: 'green' },
    { icon: Users, title: t.features.labor, desc: t.features.laborDesc, color: 'teal' },
    { icon: MessageSquare, title: t.features.sentiment, desc: t.features.sentimentDesc, color: 'cyan' },
    { icon: Zap, title: t.features.realtime, desc: t.features.realtimeDesc, color: 'yellow' },
    { icon: Sparkles, title: t.features.ai, desc: t.features.aiDesc, color: 'purple' },
  ];

  const stats = [
    { value: '10K+', label: 'Brands Analyzed' },
    { value: '98%', label: 'Accuracy Rate' },
    { value: '50+', label: 'Countries' },
    { value: '24/7', label: 'Monitoring' },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-50/50 via-white to-white dark:from-emerald-950/20 dark:via-gray-950 dark:to-gray-950" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-full blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-full text-emerald-700 dark:text-emerald-400 text-sm font-medium mb-8">
              <Sparkles className="w-4 h-4" />
              {t.hero.badge}
            </div>

            {/* Title */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-tight">
              {t.hero.title}
              <br />
              <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
                {t.hero.titleHighlight}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mt-6 text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
              {t.hero.subtitle}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
              <Link
                to="/scraper"
                className="group flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold rounded-xl shadow-xl shadow-emerald-500/25 transition-all"
              >
                {t.hero.cta}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="flex items-center gap-2 px-8 py-4 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors">
                <Play className="w-5 h-5" />
                {t.hero.ctaSecondary}
              </button>
            </div>

            {/* Trust badges */}
            <div className="mt-16">
              <p className="text-sm text-gray-500 mb-6">{t.hero.trustedBy}</p>
              <div className="flex items-center justify-center gap-8 opacity-50 grayscale">
                {['Google', 'Microsoft', 'Amazon', 'Apple', 'Meta'].map((company) => (
                  <span key={company} className="text-xl font-bold text-gray-400">
                    {company}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl font-bold text-emerald-500 mb-2">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
              {t.features.title}
            </h2>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">
              {t.features.subtitle}
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <div
                key={i}
                className={`group relative p-8 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-emerald-500/50 hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-300 ${
                  i === 0 ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 px-4 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
              How It Works
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Enter Brand', desc: 'Type any brand name, seller, or product URL' },
              { step: '02', title: 'AI Analysis', desc: 'Our AI scans multiple data sources in real-time' },
              { step: '03', title: 'Get Insights', desc: 'Receive detailed sustainability scores and recommendations' },
            ].map((item, i) => (
              <div key={i} className="relative">
                <div className="text-8xl font-bold text-emerald-500/10 absolute -top-4 -left-2">
                  {item.step}
                </div>
                <div className="relative pt-12">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="relative overflow-hidden bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-12 text-center">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-teal-500/20" />
            <div className="relative">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Ready to make ethical choices?
              </h2>
              <p className="text-gray-300 mb-8 max-w-xl mx-auto">
                Start analyzing brands today with 5 free credits. No credit card required.
              </p>
              <Link
                to="/scraper"
                className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl transition-colors"
              >
                {t.hero.cta}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
