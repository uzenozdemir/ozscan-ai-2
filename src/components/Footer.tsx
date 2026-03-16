import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { useTranslation } from '../hooks/useTranslation';
import { Twitter, Github, Linkedin, Mail } from 'lucide-react';

export function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Logo size="md" />
            <p className="mt-4 text-sm text-gray-400 leading-relaxed">
              {t.footer.description}
            </p>
            <div className="flex items-center gap-4 mt-6">
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t.footer.product}</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/scraper" className="text-sm hover:text-emerald-400 transition-colors">
                  {t.nav.scraper}
                </Link>
              </li>
              <li>
                <Link to="/compare" className="text-sm hover:text-emerald-400 transition-colors">
                  {t.nav.compare}
                </Link>
              </li>
              <li>
                <Link to="/watchlist" className="text-sm hover:text-emerald-400 transition-colors">
                  {t.nav.watchlist}
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-sm hover:text-emerald-400 transition-colors">
                  {t.nav.pricing}
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t.footer.company}</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-sm hover:text-emerald-400 transition-colors">
                  {t.footer.about}
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-emerald-400 transition-colors">
                  {t.footer.careers}
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-emerald-400 transition-colors">
                  {t.footer.contact}
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t.footer.legal}</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/legal/privacy" className="text-sm hover:text-emerald-400 transition-colors">
                  {t.footer.privacy}
                </Link>
              </li>
              <li>
                <Link to="/legal/terms" className="text-sm hover:text-emerald-400 transition-colors">
                  {t.footer.terms}
                </Link>
              </li>
              <li>
                <Link to="/legal/disclaimer" className="text-sm hover:text-emerald-400 transition-colors">
                  {t.footer.disclaimer}
                </Link>
              </li>
              <li>
                <Link to="/legal/cookies" className="text-sm hover:text-emerald-400 transition-colors">
                  {t.footer.cookies}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500">
              © {currentYear} OzScan AI. {t.footer.rights}
            </p>
            <div className="flex items-center gap-6">
              <span className="text-xs text-gray-600">Powered by Google Gemini</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
