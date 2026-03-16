import { useStore } from '../store/useStore';
import { translations } from '../i18n/translations';

export function useTranslation() {
  const { language, setLanguage } = useStore();
  const t = translations[language];
  
  return {
    t,
    language,
    setLanguage,
    toggleLanguage: () => setLanguage(language === 'en' ? 'tr' : 'en'),
  };
}
