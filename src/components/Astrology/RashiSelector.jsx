import React from 'react';
import { rashiData } from '../../utils/astrologyCalculations';

const RashiSelector = ({ selectedRashi, onRashiSelect }) => {
  const getRashiIcon = (rashiName) => {
    const icons = {
      'Aries': '♈',
      'Taurus': '♉', 
      'Gemini': '♊',
      'Cancer': '♋',
      'Leo': '♌',
      'Virgo': '♍',
      'Libra': '♎',
      'Scorpio': '♏',
      'Sagittarius': '♐',
      'Capricorn': '♑',
      'Aquarius': '♒',
      'Pisces': '♓'
    };
    return icons[rashiName] || '☆';
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-orange-200 shadow-lg">
      <div className="flex items-center justify-center mb-6">
        <div className="w-2 h-8 bg-orange-500 rounded-full mr-3"></div>
        <h2 className="text-xl font-bold text-gray-800">Choose Your Rashi</h2>
        <div className="w-2 h-8 bg-amber-500 rounded-full ml-3"></div>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-3">
        {rashiData.map((rashi) => (
          <button
            key={rashi.en}
            onClick={() => onRashiSelect(rashi.en)}
            className={`p-3 rounded-xl transition-all duration-300 transform border-2 ${
              selectedRashi === rashi.en
                ? 'bg-gradient-to-br from-orange-500 to-amber-500 border-orange-400 shadow-lg scale-105'
                : 'bg-white border-orange-100 hover:border-orange-300 hover:shadow-md'
            }`}
          >
            <div className="text-center">
              <div className={`text-2xl mb-1 ${selectedRashi === rashi.en ? 'text-white' : 'text-orange-500'}`}>
                {getRashiIcon(rashi.en)}
              </div>
              <h3 className={`font-semibold text-sm ${selectedRashi === rashi.en ? 'text-white' : 'text-gray-800'}`}>
                {rashi.en}
              </h3>
              <p className={`text-xs mt-0.5 ${selectedRashi === rashi.en ? 'text-orange-100' : 'text-gray-600'}`}>
                {rashi.hi}
              </p>
              <p className={`text-xs mt-0.5 ${selectedRashi === rashi.en ? 'text-orange-200' : 'text-gray-500'}`}>
                {rashi.dates}
              </p>
            </div>
          </button>
        ))}
      </div>
      
      {selectedRashi && (
        <div className="mt-4 p-3 bg-orange-50 rounded-lg border border-orange-200">
          <p className="text-center text-sm text-orange-700">
            Selected: <span className="font-semibold">{selectedRashi}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default RashiSelector; 