export const rashiData = [
  {
    en: 'Aries',
    hi: 'मेष (Mesh)',
    symbol: '♈',
   
    element: 'Fire'
  },
  {
    en: 'Taurus',
    hi: 'वृषभ (Vrishabha)',
    symbol: '♉',
   
    element: 'Earth'
  },
  {
    en: 'Gemini',
    hi: 'मिथुन (Mithun)',
    symbol: '♊',

    element: 'Air'
  },
  {
    en: 'Cancer',
    hi: 'कर्क (Karka)',
    symbol: '♋',

    element: 'Water'
  },
  {
    en: 'Leo',
    hi: 'सिंह (Simha)',
    symbol: '♌',

    element: 'Fire'
  },
  {
    en: 'Virgo',
    hi: 'कन्या (Kanya)',
    symbol: '♍',

    element: 'Earth'
  },
  {
    en: 'Libra',
    hi: 'तुला (Tula)',
    symbol: '♎',

    element: 'Air'
  },
  {
    en: 'Scorpio',
    hi: 'वृश्चिक (Vrishchik)',
    symbol: '♏',

    element: 'Water'
  },
  {
    en: 'Sagittarius',
    hi: 'धनु (Dhanu)',
    symbol: '♐',
   
    element: 'Fire'
  },
  {
    en: 'Capricorn',
    hi: 'मकर (Makara)',
    symbol: '♑',

    element: 'Earth'
  },
  {
    en: 'Aquarius',
    hi: 'कुंभ (Kumbha)',
    symbol: '♒',
   
    element: 'Air'
  },
  {
    en: 'Pisces',
    hi: 'मीन (Meena)',
    symbol: '♓',
    
    element: 'Water'
  }
];

export const calculateRashi = (month, day) => {
  if (!month || !day) return rashiData[0];
  
  const dayNum = parseInt(day);
  const monthNum = parseInt(month);

  if ((monthNum === 3 && dayNum >= 21) || (monthNum === 4 && dayNum <= 19)) return rashiData[0];
  if ((monthNum === 4 && dayNum >= 20) || (monthNum === 5 && dayNum <= 20)) return rashiData[1];
  if ((monthNum === 5 && dayNum >= 21) || (monthNum === 6 && dayNum <= 20)) return rashiData[2];
  if ((monthNum === 6 && dayNum >= 21) || (monthNum === 7 && dayNum <= 22)) return rashiData[3];
  if ((monthNum === 7 && dayNum >= 23) || (monthNum === 8 && dayNum <= 22)) return rashiData[4];
  if ((monthNum === 8 && dayNum >= 23) || (monthNum === 9 && dayNum <= 22)) return rashiData[5];
  if ((monthNum === 9 && dayNum >= 23) || (monthNum === 10 && dayNum <= 22)) return rashiData[6];
  if ((monthNum === 10 && dayNum >= 23) || (monthNum === 11 && dayNum <= 21)) return rashiData[7];
  if ((monthNum === 11 && dayNum >= 22) || (monthNum === 12 && dayNum <= 21)) return rashiData[8];
  if ((monthNum === 12 && dayNum >= 22) || (monthNum === 1 && dayNum <= 19)) return rashiData[9];
  if ((monthNum === 1 && dayNum >= 20) || (monthNum === 2 && dayNum <= 18)) return rashiData[10];
  if ((monthNum === 2 && dayNum >= 19) || (monthNum === 3 && dayNum <= 20)) return rashiData[11];
  
  return rashiData[0];
};