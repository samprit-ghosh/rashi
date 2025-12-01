import { GoogleGenAI } from "@google/genai";

// Multiple API keys from environment variables
const API_KEYS = [
  import.meta.env.VITE_GEMINI_API_KEY,
  import.meta.env.VITE_GEMINI_API_KEY_2,
  import.meta.env.VITE_GEMINI_API_KEY_3,
  import.meta.env.VITE_GEMINI_API_KEY_4,
].filter(key => key && key.startsWith('AIza')); // Only valid keys

console.log(`🔑 Loaded ${API_KEYS.length} API keys`);

let currentKeyIndex = 0;
let failedKeys = new Set();

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
      console.log('🔄 All keys exhausted, resetting failed keys');
      failedKeys.clear();
      break;
    }
  } while (failedKeys.has(currentKeyIndex));
  
  console.log(`🔄 Rotated to API key index: ${currentKeyIndex}`);
};

const createAIInstance = (apiKey) => {
  return new GoogleGenAI({ apiKey });
};

const AVAILABLE_MODELS = [
  'gemini-2.0-flash',
  'gemini-1.5-flash',
  'gemini-1.5-pro',
];

export const generateHoroscope = async (rashi) => {
  if (API_KEYS.length === 0) {
    throw new Error('No valid API keys configured. Please add API keys to your .env file.');
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

    // Try each model with current key
    for (const model of AVAILABLE_MODELS) {
      try {
        console.log(`🔮 Attempt with key ${currentKeyIndex + 1}, model: ${model}`);
        
        const prompt = `You are an expert Vedic astrologer with 30 years of experience. Create an authentic daily horoscope prediction for ${rashi} zodiac sign.

IMPORTANT GUIDELINES:
- Write as a seasoned astrologer, not as AI
- Use traditional Vedic astrology terminology
- Be specific and practical in predictions
- Maintain positive and uplifting tone
- Make it feel personalized and genuine

REQUIRED FORMAT - respond EXACTLY like this:

GENERAL: [Provide 2-3 specific predictions about their day. Mention planetary influences like Moon in specific nakshatra or Jupiter aspects]
LOVE: [Give 2 practical relationship insights. Be specific about timing or situations]
CAREER: [Offer 2 concrete work/finance predictions. Mention opportunities or cautions]
HEALTH: [Provide 1-2 wellness recommendations specific to ${rashi}]
LUCKY_NUMBER: [single number between 1-108 with brief reason]
LUCKY_COLOR: [single color name that aligns with today's planetary energy]
SPIRITUAL: [Give 1-2 sentences of dharmic guidance or mantra suggestion]

Example for reference:
GENERAL: Today Moon in Purva Phalguni brings creative energy. Venus aspect suggests social harmony. Good time for artistic pursuits.
LOVE: Evening hours favorable for heart-to-heart conversations. Express your feelings openly.
CAREER: Unexpected opportunity around midday. Networking pays off. Avoid financial decisions after 3 PM.
HEALTH: Focus on hydration. Gentle yoga recommended for lower back.
LUCKY_NUMBER: 7 - Number of spiritual completion
LUCKY_COLOR: Gold
SPIRITUAL: Chant Gayatri mantra for inner peace. Practice gratitude today.

Now create for ${rashi}:`;

        const response = await ai.models.generateContent({
          model: model,
          contents: prompt,
        });

        console.log(`✅ Success with key ${currentKeyIndex + 1}, model: ${model}`);
        return response.text;
        
      } catch (error) {
        console.log(`❌ Key ${currentKeyIndex + 1}, model ${model} failed:`, error.message);
        lastError = error;
        
        // If it's a quota error, mark this key as failed and move to next
        if (error.message?.includes('429') || error.message?.includes('quota') || error.message?.includes('RESOURCE_EXHAUSTED')) {
          console.log(`🚫 Key ${currentKeyIndex + 1} quota exceeded, marking as failed`);
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

  throw new Error(`All API keys exhausted. ${API_KEYS.length} keys tried. Please add more API keys or wait for quota reset.`);
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
        console.log(`🔮 Generating Rashi analysis with key ${currentKeyIndex + 1}, model: ${model}`);
        
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

        console.log(`✅ Rashi analysis success with key ${currentKeyIndex + 1}`);
        return response.text;
        
      } catch (error) {
        console.log(`❌ Rashi analysis failed with key ${currentKeyIndex + 1}, model ${model}:`, error.message);
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

export const testGeminiAPI = async () => {
  if (API_KEYS.length === 0) {
    return { 
      success: false, 
      message: 'No API keys configured',
      suggestion: 'Add VITE_GEMINI_API_KEY_1, VITE_GEMINI_API_KEY_2, etc. to your .env file'
    };
  }

  console.log(`🧪 Testing ${API_KEYS.length} API keys...`);

  for (let i = 0; i < API_KEYS.length; i++) {
    const apiKey = API_KEYS[i];
    const ai = createAIInstance(apiKey);

    for (const model of AVAILABLE_MODELS) {
      try {
        console.log(`Testing key ${i + 1} with model: ${model}`);
        
        const response = await ai.models.generateContent({
          model: model,
          contents: "Say 'OK' in one word.",
        });

        return { 
          success: true, 
          message: `✅ Key ${i + 1} working with ${model}`,
          response: response.text,
          model: model,
          workingKeys: API_KEYS.length - failedKeys.size,
          totalKeys: API_KEYS.length
        };
        
      } catch (error) {
        console.log(`Key ${i + 1}, model ${model} failed:`, error.message);
        
        if (error.message?.includes('429') || error.message?.includes('quota')) {
          failedKeys.add(i);
        }
      }
    }
  }

  return { 
    success: false, 
    message: `All ${API_KEYS.length} keys quota exceeded`,
    suggestion: 'Add more API keys or wait for quota reset',
    workingKeys: API_KEYS.length - failedKeys.size,
    totalKeys: API_KEYS.length
  };
};

// Export key status for debugging
export const getKeyStatus = () => ({
  totalKeys: API_KEYS.length,
  workingKeys: API_KEYS.length - failedKeys.size,
  failedKeys: Array.from(failedKeys),
  currentKeyIndex: currentKeyIndex
});