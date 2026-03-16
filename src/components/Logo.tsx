

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function Logo({ className = '', showText = true, size = 'md' }: LogoProps) {
  const sizes = {
    sm: { icon: 24, text: 'text-lg' },
    md: { icon: 32, text: 'text-xl' },
    lg: { icon: 48, text: 'text-3xl' },
  };

  const { icon, text } = sizes[size];

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg
        width={icon}
        height={icon}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background */}
        <rect width="48" height="48" rx="12" fill="#111827" />
        
        {/* Outer ring with gradient */}
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="50%" stopColor="#059669" />
            <stop offset="100%" stopColor="#047857" />
          </linearGradient>
          <linearGradient id="logoGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
        </defs>
        
        {/* Scanning circle */}
        <circle
          cx="24"
          cy="24"
          r="14"
          stroke="url(#logoGradient)"
          strokeWidth="2.5"
          fill="none"
        />
        
        {/* Scan lines */}
        <path
          d="M24 12V24L32 32"
          stroke="url(#logoGradient2)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Center dot */}
        <circle cx="24" cy="24" r="4" fill="url(#logoGradient)" />
        
        {/* Corner brackets for scan effect */}
        <path
          d="M14 18V14H18"
          stroke="#10b981"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.7"
        />
        <path
          d="M34 18V14H30"
          stroke="#10b981"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.7"
        />
        <path
          d="M14 30V34H18"
          stroke="#10b981"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.7"
        />
        <path
          d="M34 30V34H30"
          stroke="#10b981"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.7"
        />
      </svg>
      
      {showText && (
        <span className={`font-bold ${text} tracking-tight`}>
          <span className="text-gray-900 dark:text-white">Oz</span>
          <span className="text-emerald-500">Scan</span>
          <span className="text-gray-400 font-light ml-1">AI</span>
        </span>
      )}
    </div>
  );
}
