import { useState } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { useStore } from '../store/useStore';
import { Check, Sparkles, Zap, Crown, CreditCard } from 'lucide-react';

export function Pricing() {
  const { t, language } = useTranslation();
  const { isAuthenticated, user, setShowAuthModal, updateUser } = useStore();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const plans = [
    {
      id: 'free',
      ...t.pricing.free,
      icon: Zap,
      color: 'gray',
      popular: false,
    },
    {
      id: 'pro',
      ...t.pricing.pro,
      icon: Sparkles,
      color: 'emerald',
      popular: true,
    },
    {
      id: 'elite',
      ...t.pricing.elite,
      icon: Crown,
      color: 'amber',
      popular: false,
    },
  ];

  const handleSelectPlan = (planId: string) => {
    if (!isAuthenticated) {
      setShowAuthModal(true, 'signup');
      return;
    }
    
    if (planId === 'free') {
      updateUser({ plan: 'free', credits: 5 });
      return;
    }
    
    setSelectedPlan(planId);
    setShowPaymentModal(true);
  };

  const handlePayment = () => {
    // Simulate payment
    if (selectedPlan === 'pro') {
      updateUser({ plan: 'pro', credits: 50 });
    } else if (selectedPlan === 'elite') {
      updateUser({ plan: 'elite', credits: 999 });
    }
    setShowPaymentModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-24 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t.pricing.title}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
            {t.pricing.subtitle}
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center p-1 bg-gray-200 dark:bg-gray-800 rounded-xl">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              {t.pricing.monthly}
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                billingCycle === 'yearly'
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              {t.pricing.yearly}
              <span className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-xs rounded-full">
                {t.pricing.save}
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-white dark:bg-gray-900 rounded-3xl border-2 ${
                plan.popular 
                  ? 'border-emerald-500 shadow-xl shadow-emerald-500/10' 
                  : 'border-gray-200 dark:border-gray-800'
              } overflow-hidden`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-bold px-4 py-1 rounded-bl-xl">
                  {t.pricing.pro.popular}
                </div>
              )}

              <div className="p-8">
                {/* Icon */}
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${
                  plan.color === 'emerald' 
                    ? 'bg-emerald-100 dark:bg-emerald-900/30' 
                    : plan.color === 'amber'
                    ? 'bg-amber-100 dark:bg-amber-900/30'
                    : 'bg-gray-100 dark:bg-gray-800'
                }`}>
                  <plan.icon className={`w-7 h-7 ${
                    plan.color === 'emerald' 
                      ? 'text-emerald-600' 
                      : plan.color === 'amber'
                      ? 'text-amber-600'
                      : 'text-gray-600'
                  }`} />
                </div>

                {/* Plan Name */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-500 text-sm mb-6">{plan.description}</p>

                {/* Price */}
                <div className="mb-8">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">
                    {billingCycle === 'yearly' && plan.id !== 'free' 
                      ? (language === 'tr' 
                        ? `₺${Math.round(parseInt(plan.price.replace(/[^0-9]/g, '')) * 10)}`
                        : `$${(parseFloat(plan.price.replace('$', '')) * 10).toFixed(2)}`)
                      : plan.price
                    }
                  </span>
                  {plan.id !== 'free' && (
                    <span className="text-gray-500 ml-1">
                      /{billingCycle === 'yearly' ? (language === 'tr' ? 'yıl' : 'year') : (language === 'tr' ? 'ay' : 'month')}
                    </span>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                        plan.color === 'emerald' 
                          ? 'bg-emerald-100 dark:bg-emerald-900/30' 
                          : plan.color === 'amber'
                          ? 'bg-amber-100 dark:bg-amber-900/30'
                          : 'bg-gray-100 dark:bg-gray-800'
                      }`}>
                        <Check className={`w-3 h-3 ${
                          plan.color === 'emerald' 
                            ? 'text-emerald-600' 
                            : plan.color === 'amber'
                            ? 'text-amber-600'
                            : 'text-gray-600'
                        }`} />
                      </div>
                      <span className="text-gray-600 dark:text-gray-400 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button
                  onClick={() => handleSelectPlan(plan.id)}
                  disabled={isAuthenticated && user?.plan === plan.id}
                  className={`w-full py-3 rounded-xl font-semibold transition-all ${
                    plan.popular
                      ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white shadow-lg shadow-emerald-500/25'
                      : plan.color === 'amber'
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg shadow-amber-500/25'
                      : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {isAuthenticated && user?.plan === plan.id ? 'Current Plan' : plan.cta}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Payment Methods */}
        <div className="mt-16 text-center">
          <p className="text-sm text-gray-500 mb-4">Secure payment with</p>
          <div className="flex items-center justify-center gap-6 opacity-50">
            <span className="text-2xl font-bold text-gray-400">Stripe</span>
            <span className="text-2xl font-bold text-gray-400">iyzico</span>
            <span className="text-2xl font-bold text-gray-400">PayPal</span>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowPaymentModal(false)}
          />
          <div className="relative w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                <CreditCard className="w-8 h-8 text-emerald-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Complete Payment
              </h2>
              <p className="text-gray-500 mt-2">
                {selectedPlan === 'pro' ? t.pricing.pro.name : t.pricing.elite.name} Plan
              </p>
            </div>

            <div className="space-y-4 mb-6">
              <input
                type="text"
                placeholder="Card Number"
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <input
                  type="text"
                  placeholder="CVC"
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <button
              onClick={handlePayment}
              className="w-full py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/25 transition-all"
            >
              Pay {selectedPlan === 'pro' ? t.pricing.pro.price : t.pricing.elite.price}
            </button>

            <p className="text-xs text-gray-500 text-center mt-4">
              This is a demo. No real payment will be processed.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
