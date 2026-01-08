// geminiClient.js - Updated with Gemini 3.0 Flash model as default
import { GoogleGenAI } from "@google/genai";

// Multiple API keys from environment variables
const API_KEYS = [
  import.meta.env.VITE_GEMINI_API_KEY,
  import.meta.env.VITE_GEMINI_API_KEY_2,
  import.meta.env.VITE_GEMINI_API_KEY_3,
  import.meta.env.VITE_GEMINI_API_KEY_4,
].filter(key => key && key.trim() !== '');

// console.log(`🔑 Loaded ${API_KEYS.length} API keys`);

let currentKeyIndex = 0;
let failedKeys = new Set();

// Gemini 3.0 Flash is now available and free tier friendly
const AVAILABLE_MODELS = [
  'gemini-3-flash-preview', // Experimental version with latest features
  
];

const getCurrentAPIKey = () => {
  if (API_KEYS.length === 0) return null;
  return API_KEYS[currentKeyIndex];
};

const rotateAPIKey = () => {
  if (API_KEYS.length === 0) return;
  
  const originalIndex = currentKeyIndex;
  
  do {
    currentKeyIndex = (currentKeyIndex + 1) % API_KEYS.length;
    // If we've tried all keys, reset failed keys and try again
    if (currentKeyIndex === originalIndex) {
      // console.log('🔄 All keys exhausted, resetting failed keys');
      failedKeys.clear();
      break;
    }
  } while (failedKeys.has(currentKeyIndex));
  
  // console.log(`🔄 Rotated to API key index: ${currentKeyIndex}`);
};

const createAIInstance = (apiKey) => {
  return new GoogleGenAI({ apiKey });
};

// Enhanced function to generate analytics data with Gemini 3.0
export const generateHoroscopeAnalysis = async (rashi) => {
  if (API_KEYS.length === 0) {
    // console.warn('⚠️ No API keys configured, using fallback data');
    return generateFallbackAnalytics(rashi);
  }

  let lastError = null;
  
  // Try each API key
  for (let keyAttempt = 0; keyAttempt < API_KEYS.length * 2; keyAttempt++) {
    const apiKey = getCurrentAPIKey();
    
    if (!apiKey || failedKeys.has(currentKeyIndex)) {
      rotateAPIKey();
      continue;
    }

    const ai = createAIInstance(apiKey);

    // Try each model with current key (Gemini 3.0 first)
    for (const model of AVAILABLE_MODELS) {
      try {
        // console.log(`📊 Generating analytics with key ${currentKeyIndex + 1}, model: ${model} for ${rashi}`);
        
        const prompt = `Generate detailed horoscope analytics for ${rashi} zodiac sign in JSON format with the following exact structure:

{
  "score": number between 60-85,
  "trend": "up" or "down",
  "change": string with percentage like "+5.2%" or "-2.1%",
  "elementDistribution": [
    {"name": "Fire", "value": number between 15-45, "color": "#FF6B6B"},
    {"name": "Earth", "value": number between 15-45, "color": "#4ECDC4"},
    {"name": "Air", "value": number between 15-45, "color": "#45B7D1"},
    {"name": "Water", "value": number between 15-45, "color": "#96CEB4"}
  ],
  "aspectData": [
    {"aspect": "Love", "score": number between 40-90, "fullMark": 100},
    {"aspect": "Career", "score": number between 40-90, "fullMark": 100},
    {"aspect": "Health", "score": number between 40-90, "fullMark": 100},
    {"aspect": "Finance", "score": number between 40-90, "fullMark": 100},
    {"aspect": "Spiritual", "score": number between 40-90, "fullMark": 100},
    {"aspect": "Social", "score": number between 40-90, "fullMark": 100}
  ],
  "luckyElements": [
    {"type": "Lucky Number", "value": "string"},
    {"type": "Lucky Color", "value": "string"},
    {"type": "Favorable Day", "value": "string"},
    {"type": "Best Time", "value": "string"}
  ],
  "insights": "2-3 sentences of specific astrological insights for ${rashi} based on current planetary positions"
}

IMPORTANT RULES:
1. Return ONLY valid JSON, no markdown, no code blocks, no additional text
2. All elementDistribution values must sum to exactly 100
3. Make the data specific to ${rashi} characteristics
4. Use authentic Vedic astrology insights
5. Score should reflect current planetary transits for ${rashi}
6. Element distribution should match ${rashi}'s natural element dominance

Based on today's planetary positions, provide realistic analytics.`;

        const response = await ai.models.generateContent({
          model: model,
          contents: prompt,
          config: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          }
        });

        if (!response || !response.text) {
          throw new Error('Invalid response from API');
        }

        // Extract and parse JSON from response
        const responseText = response.text.trim();
        
        try {
          // Clean the response
          let cleanedText = responseText
            .replace(/```json\s*/g, '')
            .replace(/```\s*/g, '')
            .trim();
          
          // Try to find JSON in the response
          const jsonMatch = cleanedText.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            cleanedText = jsonMatch[0];
          }
          
          const analyticsData = JSON.parse(cleanedText);
          
          // Validate required fields
          if (typeof analyticsData.score !== 'number' || 
              !Array.isArray(analyticsData.elementDistribution)) {
            throw new Error('Invalid data structure');
          }
          
          // Normalize element distribution to sum to 100
          const totalElements = analyticsData.elementDistribution.reduce((sum, item) => sum + (item.value || 0), 0);
          if (totalElements > 0 && totalElements !== 100) {
            analyticsData.elementDistribution = analyticsData.elementDistribution.map(item => ({
              ...item,
              value: Math.round((item.value / totalElements) * 100)
            }));
          }
          
          console.log(`✅ Analytics success with key ${currentKeyIndex + 1}, model: ${model}`);
          return {
            ...analyticsData,
            timestamp: new Date().toLocaleTimeString(),
            date: new Date().toLocaleDateString(),
            rashi: rashi,
            source: 'gemini-3.0',
            model: model
          };
          
        } catch (parseError) {
          // console.error('Failed to parse analytics JSON:', parseError);
          // Try next model
          continue;
        }
        
      } catch (error) {
        // console.log(`❌ Analytics failed with key ${currentKeyIndex + 1}, model ${model}:`, error.message);
        lastError = error;
        
        // If it's a quota error, mark this key as failed and move to next
        if (error.message?.includes('429') || error.message?.includes('quota') || 
            error.message?.includes('RESOURCE_EXHAUSTED') || error.message?.includes('rate limit')) {
          // console.log(`🚫 Key ${currentKeyIndex + 1} quota exceeded, marking as failed`);
          failedKeys.add(currentKeyIndex);
          break; // Break model loop and try next key
        }
        
        // For other errors, continue to next model
      }
    }
    
    // Rotate to next key
    rotateAPIKey();
    
    // Small delay between key attempts
    if (keyAttempt < API_KEYS.length * 2 - 1) {
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }

  // console.log('⚠️ All API keys exhausted for analytics, using fallback');
  return generateFallbackAnalytics(rashi);
};

// Function to generate daily horoscope with Gemini 3.0
export const generateDailyHoroscope = async (rashi) => {
  if (API_KEYS.length === 0) {
    // console.warn('⚠️ No API keys configured, using fallback horoscope');
    return {
      horoscope: `For ${rashi} today: The stars suggest focusing on personal growth. Small steps lead to big changes. Trust your intuition in decision-making.`,
      date: new Date().toLocaleDateString(),
      rashi: rashi,
      source: 'fallback'
    };
  }

  let lastError = null;
  
  for (let keyAttempt = 0; keyAttempt < API_KEYS.length * 2; keyAttempt++) {
    const apiKey = getCurrentAPIKey();
    
    if (!apiKey || failedKeys.has(currentKeyIndex)) {
      rotateAPIKey();
      continue;
    }

    const ai = createAIInstance(apiKey);

    for (const model of AVAILABLE_MODELS) {
      try {
        // console.log(`✨ Generating daily horoscope with key ${currentKeyIndex + 1}, model: ${model} for ${rashi}`);
        
        const prompt = `As an expert Vedic astrologer, create a concise daily horoscope for ${rashi} zodiac sign.

Requirements:
- 2-3 sentences maximum
- Positive yet realistic tone
- Include specific advice for ${rashi}
- Mention today's planetary influences
- Use authentic astrology terminology
- Make it feel personalized

Focus on practical guidance that ${rashi} can apply today.`;

        const response = await ai.models.generateContent({
          model: model,
          contents: prompt,
          config: {
            temperature: 0.8,
            maxOutputTokens: 150,
          }
        });

        // console.log(`✅ Daily horoscope success with key ${currentKeyIndex + 1}, model: ${model}`);
        return {
          horoscope: response.text.trim(),
          date: new Date().toLocaleDateString(),
          rashi: rashi,
          source: 'gemini-3.0',
          model: model
        };
        
      } catch (error) {
        // console.log(`❌ Daily horoscope failed with key ${currentKeyIndex + 1}, model ${model}:`, error.message);
        lastError = error;
        
        if (error.message?.includes('429') || error.message?.includes('quota') || 
            error.message?.includes('RESOURCE_EXHAUSTED') || error.message?.includes('rate limit')) {
          failedKeys.add(currentKeyIndex);
          break;
        }
      }
    }
    
    rotateAPIKey();
    
    if (keyAttempt < API_KEYS.length * 2 - 1) {
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }

  // console.log('⚠️ All API keys exhausted, using fallback horoscope');
  return {
    horoscope: `For ${rashi} today: The celestial alignment brings opportunities for growth. Trust your instincts and stay open to new possibilities.`,
    date: new Date().toLocaleDateString(),
    rashi: rashi,
    source: 'fallback'
  };
};

// Legacy function for backward compatibility
export const generateHoroscope = async (rashi) => {
  try {
    const [analytics, daily] = await Promise.all([
      generateHoroscopeAnalysis(rashi),
      generateDailyHoroscope(rashi)
    ]);

    // Format in the old format for backward compatibility
    return `GENERAL: ${daily.horoscope}
LOVE: The stars align favorably for relationships. Open communication brings harmony.
CAREER: Opportunities arise through networking. Stay focused on long-term goals.
HEALTH: Balance is key. Incorporate mindfulness practices into your routine.
LUCKY_NUMBER: ${analytics.luckyElements?.find(e => e.type === 'Lucky Number')?.value || '7'}
LUCKY_COLOR: ${analytics.luckyElements?.find(e => e.type === 'Lucky Color')?.value || 'Blue'}
SPIRITUAL: Connect with your inner self through meditation or quiet reflection.`;
    
  } catch (error) {
    console.error('Error generating horoscope:', error);
    return `GENERAL: Today brings mixed energies for ${rashi}. Stay balanced.
LOVE: Express your feelings openly.
CAREER: Focus on completing pending tasks.
HEALTH: Take time for self-care.
LUCKY_NUMBER: 7
LUCKY_COLOR: Blue
SPIRITUAL: Practice gratitude for inner peace.`;
  }
};

// Test function to verify API connection
export const testGeminiConnection = async () => {
  if (API_KEYS.length === 0) {
    return { 
      success: false, 
      error: 'No API keys configured',
      message: 'Add VITE_GEMINI_API_KEY to your .env file'
    };
  }

  // console.log(`🧪 Testing ${API_KEYS.length} API keys with Gemini 3.0 models...`);

  for (let i = 0; i < API_KEYS.length; i++) {
    const apiKey = API_KEYS[i];
    const ai = createAIInstance(apiKey);

    for (const model of AVAILABLE_MODELS) {
      try {
        // console.log(`Testing key ${i + 1} with model: ${model}`);
        
        const response = await ai.models.generateContent({
          model: model,
          contents: "Respond with 'Connected' if you can read this message.",
          config: {
            maxOutputTokens: 10,
          }
        });

        return { 
          success: true, 
          message: `✅ Key ${i + 1} working with ${model}`,
          response: response.text.trim(),
          model: model,
          workingKeys: API_KEYS.length - failedKeys.size,
          totalKeys: API_KEYS.length
        };
        
      } catch (error) {
        // console.log(`Key ${i + 1}, model ${model} failed:`, error.message);
        
        if (error.message?.includes('429') || error.message?.includes('quota') || 
            error.message?.includes('RESOURCE_EXHAUSTED') || error.message?.includes('rate limit')) {
          failedKeys.add(i);
        }
      }
    }
  }

  return { 
    success: false, 
    error: 'All API keys failed',
    message: `All ${API_KEYS.length} keys exhausted`,
    suggestion: 'Add more API keys or wait for quota reset',
    workingKeys: API_KEYS.length - failedKeys.size,
    totalKeys: API_KEYS.length
  };
};

// Fallback function for when API fails
const generateFallbackAnalytics = (rashi) => {
  // Rashi-specific data for realistic fallbacks
  const rashiCharacteristics = {
    'Aries': { element: 'Fire', colors: ['Red', 'Scarlet'], numbers: [9, 18], days: ['Tuesday'], scoreBase: 75 },
    'Taurus': { element: 'Earth', colors: ['Green', 'Pink'], numbers: [6, 15], days: ['Friday'], scoreBase: 72 },
    'Gemini': { element: 'Air', colors: ['Yellow', 'Light Blue'], numbers: [5, 14], days: ['Wednesday'], scoreBase: 70 },
    'Cancer': { element: 'Water', colors: ['Silver', 'White'], numbers: [2, 7], days: ['Monday'], scoreBase: 68 },
    'Leo': { element: 'Fire', colors: ['Gold', 'Orange'], numbers: [1, 10], days: ['Sunday'], scoreBase: 78 },
    'Virgo': { element: 'Earth', colors: ['Navy Blue', 'Green'], numbers: [5, 14], days: ['Wednesday'], scoreBase: 71 },
    'Libra': { element: 'Air', colors: ['Pink', 'Blue'], numbers: [6, 15], days: ['Friday'], scoreBase: 73 },
    'Scorpio': { element: 'Water', colors: ['Maroon', 'Black'], numbers: [9, 18], days: ['Tuesday'], scoreBase: 76 },
    'Sagittarius': { element: 'Fire', colors: ['Purple', 'Blue'], numbers: [3, 12], days: ['Thursday'], scoreBase: 77 },
    'Capricorn': { element: 'Earth', colors: ['Brown', 'Grey'], numbers: [8, 17], days: ['Saturday'], scoreBase: 74 },
    'Aquarius': { element: 'Air', colors: ['Electric Blue', 'Silver'], numbers: [4, 13], days: ['Saturday'], scoreBase: 69 },
    'Pisces': { element: 'Water', colors: ['Sea Green', 'Lavender'], numbers: [7, 16], days: ['Thursday'], scoreBase: 72 }
  };
  
  const data = rashiCharacteristics[rashi] || rashiCharacteristics['Aries'];
  const baseScore = data.scoreBase + Math.random() * 5 - 2.5; // Small variation
  const trend = Math.random() > 0.5 ? 'up' : 'down';
  const changeAmount = (Math.random() * 3 + 1).toFixed(1);
  
  // Element distribution based on primary element
  let elementDist = [
    { name: 'Fire', value: 25, color: '#FF6B6B' },
    { name: 'Earth', value: 25, color: '#4ECDC4' },
    { name: 'Air', value: 25, color: '#45B7D1' },
    { name: 'Water', value: 25, color: '#96CEB4' }
  ];
  
  // Boost the primary element
  const primaryElementIndex = elementDist.findIndex(e => e.name === data.element);
  if (primaryElementIndex !== -1) {
    elementDist[primaryElementIndex].value = 40;
    // Reduce others proportionally
    elementDist.forEach((e, i) => {
      if (i !== primaryElementIndex) {
        e.value = 20;
      }
    });
  }
  
  return {
    score: Math.round(baseScore),
    trend: trend,
    change: trend === 'up' ? `+${changeAmount}%` : `-${changeAmount}%`,
    elementDistribution: elementDist,
    aspectData: [
      { aspect: 'Love', score: Math.round(60 + Math.random() * 30), fullMark: 100 },
      { aspect: 'Career', score: Math.round(60 + Math.random() * 30), fullMark: 100 },
      { aspect: 'Health', score: Math.round(60 + Math.random() * 30), fullMark: 100 },
      { aspect: 'Finance', score: Math.round(60 + Math.random() * 30), fullMark: 100 },
      { aspect: 'Spiritual', score: Math.round(60 + Math.random() * 30), fullMark: 100 },
      { aspect: 'Social', score: Math.round(60 + Math.random() * 30), fullMark: 100 }
    ],
    luckyElements: [
      { type: 'Lucky Number', value: data.numbers[Math.floor(Math.random() * data.numbers.length)].toString() },
      { type: 'Lucky Color', value: data.colors[Math.floor(Math.random() * data.colors.length)] },
      { type: 'Favorable Day', value: data.days[0] },
      { type: 'Best Time', value: `${Math.floor(Math.random() * 2) + 10}:00 AM - ${Math.floor(Math.random() * 4) + 2}:00 PM` }
    ],
    insights: `As a ${data.element} sign, ${rashi} benefits from today's planetary alignment. Focus on balance and remain open to unexpected opportunities that may arise.`,
    timestamp: new Date().toLocaleTimeString(),
    date: new Date().toLocaleDateString(),
    rashi: rashi,
    source: 'fallback'
  };
};

// Legacy functions for backward compatibility
export const getKeyStatus = () => ({
  totalKeys: API_KEYS.length,
  workingKeys: API_KEYS.length - failedKeys.size,
  failedKeys: Array.from(failedKeys),
  currentKeyIndex: currentKeyIndex,
  models: AVAILABLE_MODELS
});

export const testGeminiAPI = async () => {
  const result = await testGeminiConnection();
  return {
    success: result.success,
    message: result.message || result.error,
    suggestion: result.suggestion || '',
    workingKeys: result.workingKeys,
    totalKeys: result.totalKeys,
    model: result.model
  };
};

// New function for Rashi Finder personality analysis
export const generateRashiAnalysis = async (rashi, birthData) => {
  if (API_KEYS.length === 0) {
    throw new Error('No valid API keys configured.');
  }

  let lastError = null;
  
  for (let keyAttempt = 0; keyAttempt < API_KEYS.length * 2; keyAttempt++) {
    const apiKey = getCurrentAPIKey();
    
    if (!apiKey || failedKeys.has(currentKeyIndex)) {
      rotateAPIKey();
      continue;
    }

    const ai = createAIInstance(apiKey);

    for (const model of AVAILABLE_MODELS) {
      try {
        // console.log(`🔮 Generating Rashi analysis with key ${currentKeyIndex + 1}, model: ${model}`);
        
        const prompt = `As a senior Vedic astrologer, provide an authentic personality analysis for someone with ${rashi} as their moon sign.

Birth Details: ${birthData.day}/${birthData.month}/${birthData.year}

Provide insights in this format:

STRENGTHS: [3-4 key personality strengths]
CHALLENGES: [2-3 areas for growth]
CAREER_PATHS: [3 suitable professions]
RELATIONSHIP_STYLE: [2-3 sentences about their approach to relationships]
SPIRITUAL_GUIDANCE: [1-2 sentences of dharmic advice]

Use authentic Vedic terminology like grahas, nakshatras, doshas. Make it feel like a personalized consultation, not generic astrology.`;

        const response = await ai.models.generateContent({
          model: model,
          contents: prompt,
        });

        // console.log(`✅ Rashi analysis success with key ${currentKeyIndex + 1}`);
        return response.text;
        
      } catch (error) {
        // console.log(`❌ Rashi analysis failed with key ${currentKeyIndex + 1}, model ${model}:`, error.message);
        lastError = error;
        
        if (error.message?.includes('429') || error.message?.includes('quota') || error.message?.includes('RESOURCE_EXHAUSTED')) {
          failedKeys.add(currentKeyIndex);
          break;
        }
      }
    }
    
    rotateAPIKey();
    
    if (keyAttempt < API_KEYS.length * 2 - 1) {
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }

  throw new Error('All API keys exhausted for Rashi analysis.');
};

// Export the AI instance if needed elsewhere
export { createAIInstance };

// Export all functions
export default {
  generateHoroscopeAnalysis,
  generateDailyHoroscope,
  generateHoroscope,
  generateRashiAnalysis,
  testGeminiConnection,
  testGeminiAPI,
  getKeyStatus,
  createAIInstance
};