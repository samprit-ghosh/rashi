// geminiClient.js - Add these functions

// Enhanced function to generate analytics data
export const generateHoroscopeAnalysis = async (rashi) => {
  try {
    // Use multiple API keys for better reliability
    const apiKeys = [
      process.env.REACT_APP_GEMINI_API_KEY,
      process.env.REACT_APP_GEMINI_API_KEY_2,
      process.env.REACT_APP_GEMINI_API_KEY_3
    ].filter(key => key);

    const currentKey = apiKeys[Math.floor(Math.random() * apiKeys.length)] || process.env.REACT_APP_GEMINI_API_KEY;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${currentKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `Generate detailed horoscope analytics for ${rashi} in JSON format with the following structure:
            {
              "score": number between 0-100,
              "trend": "up" or "down",
              "change": string with percentage,
              "elementDistribution": [
                {"name": "Fire", "value": number, "color": "#FF6B6B"},
                {"name": "Earth", "value": number, "color": "#4ECDC4"},
                {"name": "Air", "value": number, "color": "#45B7D1"},
                {"name": "Water", "value": number, "color": "#96CEB4"}
              ],
              "aspectData": [
                {"aspect": "Love", "score": number, "fullMark": 100},
                {"aspect": "Career", "score": number, "fullMark": 100},
                {"aspect": "Health", "score": number, "fullMark": 100},
                {"aspect": "Finance", "score": number, "fullMark": 100},
                {"aspect": "Spiritual", "score": number, "fullMark": 100},
                {"aspect": "Social", "score": number, "fullMark": 100}
              ],
              "luckyElements": [
                {"type": "Lucky Number", "value": "string"},
                {"type": "Lucky Color", "value": "string"},
                {"type": "Favorable Day", "value": "string"},
                {"type": "Best Time", "value": "string"}
              ],
              "insights": "string with detailed insight"
            }
            
            Make the data realistic and specific to ${rashi}. Ensure all numbers add up appropriately.`
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        }
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
      throw new Error('Invalid response format from API');
    }

    // Extract JSON from the response
    const responseText = data.candidates[0].content.parts[0].text;
    
    // Try to extract JSON from the response
    try {
      // Find JSON in the response (it might be wrapped in markdown or text)
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const analyticsData = JSON.parse(jsonMatch[0]);
        
        // Validate the structure
        if (analyticsData.score && analyticsData.elementDistribution) {
          return {
            ...analyticsData,
            timestamp: new Date().toLocaleTimeString()
          };
        }
      }
      
      // If JSON extraction failed, generate mock data
      return generateFallbackAnalytics(rashi);
      
    } catch (parseError) {
      console.error('Failed to parse analytics JSON:', parseError);
      return generateFallbackAnalytics(rashi);
    }
    
  } catch (error) {
    console.error('Error generating analytics:', error);
    throw error;
  }
};

// Fallback function for when API fails
const generateFallbackAnalytics = (rashi) => {
  // Generate realistic mock data based on Rashi
  const baseScore = 65 + Math.random() * 30;
  
  return {
    score: Math.round(baseScore),
    trend: Math.random() > 0.5 ? 'up' : 'down',
    change: Math.random() > 0.5 ? `+${(Math.random() * 5).toFixed(1)}%` : `-${(Math.random() * 3).toFixed(1)}%`,
    elementDistribution: [
      { name: 'Fire', value: 30 + Math.random() * 40, color: '#FF6B6B' },
      { name: 'Earth', value: 20 + Math.random() * 30, color: '#4ECDC4' },
      { name: 'Air', value: 15 + Math.random() * 25, color: '#45B7D1' },
      { name: 'Water', value: 15 + Math.random() * 25, color: '#96CEB4' }
    ],
    aspectData: [
      { aspect: 'Love', score: 60 + Math.random() * 30, fullMark: 100 },
      { aspect: 'Career', score: 60 + Math.random() * 30, fullMark: 100 },
      { aspect: 'Health', score: 60 + Math.random() * 30, fullMark: 100 },
      { aspect: 'Finance', score: 60 + Math.random() * 30, fullMark: 100 },
      { aspect: 'Spiritual', score: 60 + Math.random() * 30, fullMark: 100 },
      { aspect: 'Social', score: 60 + Math.random() * 30, fullMark: 100 }
    ],
    luckyElements: [
      { type: 'Lucky Number', value: '7' },
      { type: 'Lucky Color', value: 'Royal Blue' },
      { type: 'Favorable Day', value: 'Friday' },
      { type: 'Best Time', value: '2-4 PM' }
    ],
    insights: `The celestial alignment for ${rashi} indicates a period of growth and opportunity. Focus on balancing your energies across different life aspects.`,
    timestamp: new Date().toLocaleTimeString()
  };
};