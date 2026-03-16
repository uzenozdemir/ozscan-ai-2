import { useState } from 'react';
import { useStore } from '../store/useStore';
import { useTranslation } from '../hooks/useTranslation';
import { Link, Navigate } from 'react-router-dom';
import { 
  User, Shield, CreditCard, Bell, Save, Eye, EyeOff,
  Check, Coins, Crown, Zap
} from 'lucide-react';

export function Settings() {
  const { t } = useTranslation();
  const { isAuthenticated, user, updateUser } = useStore();
  
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [saved, setSaved] = useState(false);
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const tabs = [
    { id: 'profile', label: t.settings.profile, icon: User },
    { id: 'security', label: t.settings.security, icon: Shield },
    { id: 'billing', label: t.settings.billing, icon: CreditCard },
    { id: 'notifications', label: t.settings.notifications, icon: Bell },
  ];

  const handleSave = () => {
    if (activeTab === 'profile') {
      updateUser({ name: formData.name });
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const planDetails = {
    free: { name: 'Free', icon: Zap, color: 'gray', credits: 5 },
    pro: { name: 'Pro', icon: Crown, color: 'emerald', credits: 50 },
    elite: { name: 'Elite', icon: Crown, color: 'amber', credits: 999 },
  };

  const currentPlan = planDetails[user?.plan || 'free'];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-24 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {t.settings.title}
          </h1>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                    activeTab === tab.id
                      ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border-l-4 border-emerald-500'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Quick Stats */}
            <div className="mt-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  currentPlan.color === 'emerald' 
                    ? 'bg-emerald-100 dark:bg-emerald-900/30' 
                    : currentPlan.color === 'amber'
                    ? 'bg-amber-100 dark:bg-amber-900/30'
                    : 'bg-gray-100 dark:bg-gray-800'
                }`}>
                  <currentPlan.icon className={`w-5 h-5 ${
                    currentPlan.color === 'emerald' 
                      ? 'text-emerald-600' 
                      : currentPlan.color === 'amber'
                      ? 'text-amber-600'
                      : 'text-gray-600'
                  }`} />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">{currentPlan.name}</p>
                  <p className="text-sm text-gray-500">{t.settings.currentPlan}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Coins className="w-4 h-4 text-amber-500" />
                <span className="text-gray-600 dark:text-gray-400">
                  {user?.credits} {t.dashboard.creditsRemaining}
                </span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1">
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8">
              {/* Success Message */}
              {saved && (
                <div className="mb-6 p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl flex items-center gap-3">
                  <Check className="w-5 h-5 text-emerald-500" />
                  <span className="text-emerald-700 dark:text-emerald-400">{t.common.success}</span>
                </div>
              )}

              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                    {t.settings.updateProfile}
                  </h2>
                  
                  <div className="flex items-center gap-6 mb-8">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white text-2xl font-bold">
                      {user?.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <button className="px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg text-sm font-medium transition-colors">
                        Change Avatar
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t.auth.name}
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t.auth.email}
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      disabled
                      className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-500 cursor-not-allowed"
                    />
                    <p className="text-xs text-gray-500 mt-2">Email cannot be changed</p>
                  </div>
                </div>
              )}

              {/* Security Tab */}
              {activeTab === 'security' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                    {t.settings.changePassword}
                  </h2>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t.settings.currentPassword}
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={formData.currentPassword}
                        onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all pr-12"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t.settings.newPassword}
                    </label>
                    <input
                      type="password"
                      value={formData.newPassword}
                      onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t.settings.confirmNew}
                    </label>
                    <input
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>
              )}

              {/* Billing Tab */}
              {activeTab === 'billing' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                    {t.settings.billing}
                  </h2>

                  <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{t.settings.currentPlan}</p>
                        <p className="text-2xl font-bold text-emerald-500">{currentPlan.name}</p>
                      </div>
                      <Link
                        to="/pricing"
                        className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-sm font-medium transition-colors"
                      >
                        Upgrade
                      </Link>
                    </div>
                    <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                      <p className="text-sm text-gray-500">
                        {t.settings.nextBilling}: {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white mb-4">{t.settings.paymentMethod}</h3>
                    <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                      <CreditCard className="w-8 h-8 text-gray-400" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">•••• •••• •••• 4242</p>
                        <p className="text-sm text-gray-500">Expires 12/25</p>
                      </div>
                    </div>
                    <button className="mt-4 text-emerald-500 hover:text-emerald-600 text-sm font-medium">
                      {t.settings.updatePayment}
                    </button>
                  </div>
                </div>
              )}

              {/* Notifications Tab */}
              {activeTab === 'notifications' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                    {t.settings.notifications}
                  </h2>

                  {[
                    { label: 'Email Notifications', desc: 'Receive email about your account activity' },
                    { label: 'Watchlist Alerts', desc: 'Get notified when tracked brands change' },
                    { label: 'Marketing Emails', desc: 'Receive tips, updates and offers' },
                    { label: 'Weekly Report', desc: 'Get weekly summary of your scans' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{item.label}</p>
                        <p className="text-sm text-gray-500">{item.desc}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked={i < 2} className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                      </label>
                    </div>
                  ))}
                </div>
              )}

              {/* Save Button */}
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/25 transition-all"
                >
                  <Save className="w-5 h-5" />
                  {t.settings.saveChanges}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
