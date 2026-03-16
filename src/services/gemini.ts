import { GoogleGenerativeAI } from '@google/generative-ai';

// API Key placeholder - Ozdemir will paste here
const OZSCAN_GEMINI_KEY = "AIzaSyDnHfWG1nXew5E3Q-nTZfLqOSHyp3T83zw"; // Ozdemir will paste here

interface AnalysisResult {
  supplyChainScore: number;
  carbonScore: number;
  laborScore: number;
  sentimentScore: number;
  overallScore: number;
  details: {
    supplyChain: string;
    carbon: string;
    labor: string;
    sentiment: string;
  };
  recommendations: string[];
  sources: string[];
}

// Proxy wrapper for CORS bypass (production would use a real proxy)
export const PROXY_URL = 'https://api.allorigins.win/raw?url=';

export async function fetchWithProxy(url: string): Promise<string> {
  try {
    const response = await fetch(`${PROXY_URL}${encodeURIComponent(url)}`);
    if (!response.ok) throw new Error('Proxy fetch failed');
    return await response.text();
  } catch {
    return '';
  }
}

export async function analyzeBrand(brandName: string, deepScan: boolean = false): Promise<AnalysisResult> {
  // If no API key is set, return simulated data
  if (!OZSCAN_GEMINI_KEY) {
    return simulateAnalysis(brandName, deepScan);
  }

  try {
    const genAI = new GoogleGenerativeAI(OZSCAN_GEMINI_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `
Analyze the brand "${brandName}" for sustainability and ethics. Provide a JSON response with these exact fields:
{
  "supplyChainScore": <number 0-100>,
  "carbonScore": <number 0-100, higher is better/lower emissions>,
  "laborScore": <number 0-100>,
  "sentimentScore": <number 0-100>,
  "details": {
    "supplyChain": "<2-3 sentence analysis of supply chain transparency>",
    "carbon": "<2-3 sentence analysis of carbon footprint and environmental impact>",
    "labor": "<2-3 sentence analysis of worker conditions and labor rights>",
    "sentiment": "<2-3 sentence analysis of consumer sentiment and reputation>"
  },
  "recommendations": ["<recommendation 1>", "<recommendation 2>", "<recommendation 3>"],
  "sources": ["<data source 1>", "<data source 2>"]
}

${deepScan ? 'Provide detailed, comprehensive analysis with specific data points.' : 'Provide a quick overview analysis.'}

Return ONLY valid JSON, no other text.
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Parse JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      return {
        ...parsed,
        overallScore: Math.round(
          (parsed.supplyChainScore + parsed.carbonScore + parsed.laborScore + parsed.sentimentScore) / 4
        ),
      };
    }
    
    throw new Error('Invalid response format');
  } catch (error) {
    console.error('Gemini API error:', error);
    return simulateAnalysis(brandName, deepScan);
  }
}

function simulateAnalysis(brandName: string, deepScan: boolean): AnalysisResult {
  // Generate semi-random but consistent scores based on brand name
  const hash = brandName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const base = (hash % 20) + 10; // ARTIK 10-30 ARALIĞINDA (TEST İÇİN DÜŞÜRÜLDÜ)
  
  const supplyChainScore = Math.min(100, base + (hash % 10));
  const carbonScore = Math.min(100, base + ((hash * 2) % 10));
  const laborScore = Math.min(100, base + ((hash * 3) % 10));
  const sentimentScore = Math.min(100, base + ((hash * 4) % 10));
  const overallScore = Math.round((supplyChainScore + carbonScore + laborScore + sentimentScore) / 4);

  const details = {
    supplyChain: `[SİMÜLASYON] ${brandName} için gerçek veri çekilemedi.`,
    carbon: `[SİMÜLASYON] Gemini bağlantısı kurulamadı, puanlar düşük.`,
    labor: `[SİMÜLASYON] Lütfen API anahtarını kontrol edin.`,
    sentiment: `[SİMÜLASYON] Şu an gösterilen veriler gerçek analiz değildir.`,
  };

  const recommendations = [
    'Gemini API anahtarınızı kontrol edin',
    'Vercel Environment Variables ayarlarını doğrulayın',
    'İnternet bağlantınızı kontrol edin',
  ];

  const sources = ['Sistem Simülasyonu (Hata Modu)'];

  return {
    supplyChainScore,
    carbonScore,
    laborScore,
    sentimentScore,
    overallScore,
    details,
    recommendations,
    sources,
  };
}

export async function compareBrands(brand1: string, brand2: string): Promise<{
  brand1: AnalysisResult;
  brand2: AnalysisResult;
  winner: string;
  analysis: string;
}> {
  const [result1, result2] = await Promise.all([
    analyzeBrand(brand1, true),
    analyzeBrand(brand2, true),
  ]);

  const winner = result1.overallScore >= result2.overallScore ? brand1 : brand2;
  const diff = Math.abs(result1.overallScore - result2.overallScore);

  let analysis = '';
  if (diff < 5) {
    analysis = `Both brands show similar sustainability performance. ${brand1} edges slightly ${result1.overallScore >= result2.overallScore ? 'ahead' : 'behind'} with a ${diff} point difference.`;
  } else if (diff < 15) {
    analysis = `${winner} demonstrates moderately better sustainability practices with a ${diff} point lead, particularly in ${result1.overallScore > result2.overallScore ? (result1.carbonScore > result1.laborScore ? 'carbon emissions' : 'labor rights') : (result2.carbonScore > result2.laborScore ? 'carbon emissions' : 'labor rights')}.`;
  } else {
    analysis = `${winner} significantly outperforms with a ${diff} point advantage across all sustainability metrics. Consider ${winner} as the more ethical choice.`;
  }

  return { brand1: result1, brand2: result2, winner, analysis };
}
