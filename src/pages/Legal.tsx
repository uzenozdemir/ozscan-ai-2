import { useParams } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import { Shield, FileText, Cookie, Lock } from 'lucide-react';

export function Legal() {
  const { type } = useParams<{ type: string }>();
  const { t } = useTranslation();

  const pages = {
    disclaimer: {
      title: t.legal.disclaimerTitle,
      icon: Shield,
      content: t.legal.disclaimerContent,
      fullContent: `
        <h2>OzScan AI Legal Disclaimer</h2>
        <p>Last updated: ${new Date().toLocaleDateString()}</p>
        
        <h3>1. Information Accuracy</h3>
        <p>${t.legal.disclaimerContent}</p>
        
        <h3>2. No Professional Advice</h3>
        <p>The information provided by OzScan AI is for general informational purposes only. It should not be construed as professional advice of any kind, including but not limited to legal, financial, investment, or business advice.</p>
        
        <h3>3. Third-Party Data</h3>
        <p>OzScan AI aggregates data from various third-party sources. We do not guarantee the accuracy, completeness, or reliability of this information. Users should verify all information independently before making any decisions.</p>
        
        <h3>4. AI-Generated Content</h3>
        <p>Our platform uses artificial intelligence to generate analysis and recommendations. AI-generated content may contain errors or biases and should be used as one of many factors in decision-making processes.</p>
        
        <h3>5. Limitation of Liability</h3>
        <p>In no event shall OzScan AI, its directors, employees, partners, agents, suppliers, or affiliates be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the service.</p>
        
        <h3>6. Changes to This Disclaimer</h3>
        <p>We reserve the right to modify this disclaimer at any time. Continued use of OzScan AI after changes constitutes acceptance of the new terms.</p>
      `,
    },
    terms: {
      title: t.legal.termsTitle,
      icon: FileText,
      content: t.legal.termsContent,
      fullContent: `
        <h2>Terms of Service</h2>
        <p>Last updated: ${new Date().toLocaleDateString()}</p>
        
        <h3>1. Acceptance of Terms</h3>
        <p>${t.legal.termsContent}</p>
        
        <h3>2. Description of Service</h3>
        <p>OzScan AI provides brand sustainability and ethics analysis services. Our platform uses AI and data aggregation to provide insights about brands and sellers.</p>
        
        <h3>3. User Accounts</h3>
        <p>Users must provide accurate information when creating accounts. Users are responsible for maintaining the confidentiality of their account credentials and for all activities under their account.</p>
        
        <h3>4. Acceptable Use</h3>
        <p>Users agree not to:</p>
        <ul>
          <li>Use the service for any illegal purpose</li>
          <li>Attempt to gain unauthorized access to any part of the service</li>
          <li>Use the service to defame or harass brands unfairly</li>
          <li>Scrape or collect data from the service without permission</li>
          <li>Resell or redistribute OzScan AI data without authorization</li>
        </ul>
        
        <h3>5. Credits and Payments</h3>
        <p>Credits purchased are non-refundable. Free credits expire after 30 days of inactivity. Subscription plans auto-renew unless cancelled.</p>
        
        <h3>6. Intellectual Property</h3>
        <p>All content, features, and functionality of OzScan AI are owned by us and are protected by international copyright, trademark, and other intellectual property laws.</p>
        
        <h3>7. Termination</h3>
        <p>We may terminate or suspend your account at any time for violation of these terms, without prior notice or liability.</p>
        
        <h3>8. Governing Law</h3>
        <p>These terms shall be governed by and construed in accordance with applicable laws, without regard to conflict of law provisions.</p>
      `,
    },
    privacy: {
      title: t.footer.privacy,
      icon: Lock,
      content: 'Your privacy is important to us.',
      fullContent: `
        <h2>Privacy Policy</h2>
        <p>Last updated: ${new Date().toLocaleDateString()}</p>
        
        <h3>1. Information We Collect</h3>
        <p>We collect information you provide directly, including:</p>
        <ul>
          <li>Account information (name, email, password)</li>
          <li>Usage data (searches, analyses performed)</li>
          <li>Payment information (processed securely through third-party providers)</li>
        </ul>
        
        <h3>2. How We Use Your Information</h3>
        <p>We use collected information to:</p>
        <ul>
          <li>Provide and improve our services</li>
          <li>Process transactions and send related information</li>
          <li>Send promotional communications (with your consent)</li>
          <li>Detect and prevent fraud</li>
        </ul>
        
        <h3>3. Data Sharing</h3>
        <p>We do not sell your personal information. We may share data with:</p>
        <ul>
          <li>Service providers who assist in our operations</li>
          <li>Law enforcement when required by law</li>
          <li>Business partners with your consent</li>
        </ul>
        
        <h3>4. Data Security</h3>
        <p>We implement appropriate security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure.</p>
        
        <h3>5. Your Rights</h3>
        <p>You have the right to access, update, or delete your personal information. Contact us to exercise these rights.</p>
        
        <h3>6. Cookies</h3>
        <p>We use cookies and similar technologies to improve your experience. See our Cookie Policy for more details.</p>
        
        <h3>7. Contact Us</h3>
        <p>For privacy-related questions, contact us at privacy@ozscan.ai</p>
      `,
    },
    cookies: {
      title: t.footer.cookies,
      icon: Cookie,
      content: 'How we use cookies.',
      fullContent: `
        <h2>Cookie Policy</h2>
        <p>Last updated: ${new Date().toLocaleDateString()}</p>
        
        <h3>1. What Are Cookies</h3>
        <p>Cookies are small text files stored on your device when you visit websites. They help websites remember your preferences and improve your experience.</p>
        
        <h3>2. Types of Cookies We Use</h3>
        <ul>
          <li><strong>Essential Cookies:</strong> Required for the website to function properly</li>
          <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our site</li>
          <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
          <li><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements</li>
        </ul>
        
        <h3>3. Managing Cookies</h3>
        <p>You can control cookies through your browser settings. Note that disabling certain cookies may affect website functionality.</p>
        
        <h3>4. Third-Party Cookies</h3>
        <p>Some cookies are placed by third-party services that appear on our pages, such as analytics and advertising partners.</p>
        
        <h3>5. Updates to This Policy</h3>
        <p>We may update this Cookie Policy from time to time. Check this page periodically for changes.</p>
      `,
    },
  };

  const page = pages[type as keyof typeof pages] || pages.disclaimer;
  const Icon = page.icon;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-24 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-100 dark:bg-emerald-900/30 mb-6">
            <Icon className="w-8 h-8 text-emerald-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            {page.title}
          </h1>
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8 md:p-12">
          <div 
            className="prose dark:prose-invert max-w-none prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-600 dark:prose-p:text-gray-400 prose-li:text-gray-600 dark:prose-li:text-gray-400 prose-strong:text-gray-900 dark:prose-strong:text-white"
            dangerouslySetInnerHTML={{ __html: page.fullContent }}
          />
        </div>
      </div>
    </div>
  );
}
