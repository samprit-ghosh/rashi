// import { useState, useRef } from 'react';
// import { Upload, Calendar, User, Mail, Phone, MapPin, FileText, Star, Clock, Shield, Sparkles } from 'lucide-react';

// export default function KundliUploadPage() {
//   const [uploadStep, setUploadStep] = useState(1);
//   const [kundliFile, setKundliFile] = useState(null);
//   const [previewUrl, setPreviewUrl] = useState('');
//   const [formData, setFormData] = useState({
//     name: '',
//     birthDate: '',
//     birthTime: '',
//     birthPlace: '',
//     email: '',
//     phone: '',
//     gender: '',
//     concern: '',
//     priority: 'medium',
//     consent: false
//   });
//   const fileInputRef = useRef(null);

//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setKundliFile(file);
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPreviewUrl(reader.result);
//       };
//       reader.readAsDataURL(file);
//       setUploadStep(2);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Here you would typically send the data to your backend
//     console.log({ kundliFile, formData });
//     setUploadStep(4); // Move to success step
//   };

//   const handleDragOver = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     const file = e.dataTransfer.files[0];
//     if (file && file.type === 'application/pdf') {
//       handleFileUpload({ target: { files: [file] } });
//     }
//   };

//   const zodiacSigns = [
//     { name: 'Aries', icon: '♈', color: 'from-red-500 to-orange-500' },
//     { name: 'Taurus', icon: '♉', color: 'from-green-500 to-emerald-500' },
//     { name: 'Gemini', icon: '♊', color: 'from-yellow-500 to-amber-500' },
//     { name: 'Cancer', icon: '♋', color: 'from-gray-500 to-slate-500' },
//     { name: 'Leo', icon: '♌', color: 'from-orange-500 to-yellow-500' },
//     { name: 'Virgo', icon: '♍', color: 'from-green-500 to-teal-500' },
//     { name: 'Libra', icon: '♎', color: 'from-pink-500 to-rose-500' },
//     { name: 'Scorpio', icon: '♏', color: 'from-red-500 to-pink-500' },
//     { name: 'Sagittarius', icon: '♐', color: 'from-purple-500 to-indigo-500' },
//     { name: 'Capricorn', icon: '♑', color: 'from-gray-700 to-gray-900' },
//     { name: 'Aquarius', icon: '♒', color: 'from-blue-500 to-cyan-500' },
//     { name: 'Pisces', icon: '♓', color: 'from-purple-500 to-violet-500' },
//   ];

//   const concernsList = [
//     'Career Guidance',
//     'Marriage & Relationships',
//     'Financial Prosperity',
//     'Health Issues',
//     'Education & Studies',
//     'Family Matters',
//     'Business Decisions',
//     'Spiritual Growth',
//     'Travel & Migration',
//     'Property Matters'
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
//       {/* Animated Background Elements */}
//       <div className="absolute inset-0 overflow-hidden">
//         {[...Array(20)].map((_, i) => (
//           <div
//             key={i}
//             className="absolute rounded-full bg-white/10 animate-pulse"
//             style={{
//               width: `${Math.random() * 100 + 50}px`,
//               height: `${Math.random() * 100 + 50}px`,
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//               animationDelay: `${Math.random() * 5}s`,
//               animationDuration: `${Math.random() * 10 + 10}s`,
//             }}
//           />
//         ))}
//       </div>

//       <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         {/* Header */}
//         <div className="text-center mb-12">
//           <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-purple-600 to-cyan-600 mb-6">
//             <Sparkles className="w-10 h-10 text-white" />
//           </div>
//           <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
//             Kundli Analysis & Guidance
//           </h1>
//           <p className="text-xl text-purple-200 max-w-3xl mx-auto">
//             Upload your birth chart for personalized astrological insights and guidance from expert astrologers
//           </p>
//         </div>

//         {/* Progress Steps */}
//         <div className="max-w-7xl mx-auto mb-20">
//           <div className="flex items-center justify-between relative">
//             <div className="absolute top-1/2 left-0 w-full h-1 bg-white/10 -translate-y-1/2"></div>
//             <div className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 -translate-y-1/2 transition-all duration-500"
//               style={{ width: `${(uploadStep - 1) * 33.33}%` }}>
//             </div>
            
//             {[1, 2, 3, 4].map((step) => (
//               <div key={step} className="relative z-10">
//                 <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${uploadStep >= step ? 'bg-gradient-to-r from-purple-600 to-cyan-600 scale-110' : 'bg-white/10'} border-2 ${uploadStep > step ? 'border-purple-400' : 'border-white/20'}`}>
//                   {uploadStep > step ? (
//                     <div className="w-6 h-6 text-white">✓</div>
//                   ) : (
//                     <span className={`text-lg font-bold ${uploadStep >= step ? 'text-white' : 'text-purple-300'}`}>
//                       {step}
//                     </span>
//                   )}
//                 </div>
//                 <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 text-sm font-medium">
//                   <span className={`${uploadStep >= step ? 'text-cyan-300' : 'text-purple-300'}`}>
//                     {step === 1 && 'Upload Kundli'}
//                     {step === 2 && 'Personal Details'}
//                     {step === 3 && 'Guidance Request'}
//                     {step === 4 && 'Complete'}
//                   </span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="grid lg:grid-cols-3 gap-8 ">
//           {/* Left Column - Upload Section */}
//           <div className="lg:col-span-2">
//             <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/20 p-8">
//               {uploadStep === 1 && (
//                 <div>
//                   <div className="flex items-center mb-6">
//                     <div className="w-12 h-12 rounded-full bg-purple-900/50 flex items-center justify-center mr-4">
//                       <Upload className="w-6 h-6 text-purple-400" />
//                     </div>
//                     <div>
//                       <h2 className="text-2xl font-bold text-white">Upload Your Kundli</h2>
//                       <p className="text-purple-300">Supported formats: PDF, JPEG, PNG</p>
//                     </div>
//                   </div>

//                   <div
//                     className="border-3 border-dashed border-white/20 rounded-xl p-12 text-center transition-all duration-300 hover:border-purple-400 hover:bg-white/5 cursor-pointer"
//                     onClick={() => fileInputRef.current.click()}
//                     onDragOver={handleDragOver}
//                     onDrop={handleDrop}
//                   >
//                     <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-900/30 to-cyan-900/30 flex items-center justify-center mx-auto mb-6">
//                       <Upload className="w-10 h-10 text-cyan-400" />
//                     </div>
//                     <h3 className="text-xl font-semibold text-white mb-2">Drop your Kundli file here</h3>
//                     <p className="text-purple-300 mb-6">or click to browse files</p>
//                     <input
//                       ref={fileInputRef}
//                       type="file"
//                       accept=".pdf,.jpg,.jpeg,.png"
//                       onChange={handleFileUpload}
//                       className="hidden"
//                     />
//                     <div className="flex flex-wrap justify-center gap-4">
//                       <div className="px-4 py-2 bg-purple-900/30 rounded-lg border border-purple-400/30">
//                         <span className="text-sm text-purple-300">PDF Document</span>
//                       </div>
//                       <div className="px-4 py-2 bg-cyan-900/30 rounded-lg border border-cyan-400/30">
//                         <span className="text-sm text-cyan-300">Image Files</span>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Sample Kundli Section */}
//                   <div className="mt-8">
//                     <h3 className="text-lg font-semibold text-white mb-4">Don't have a Kundli?</h3>
//                     <div className="grid sm:grid-cols-2 gap-4">
//                       <div className="bg-gradient-to-br from-purple-900/30 to-transparent rounded-xl p-4 border border-purple-400/20">
//                         <div className="flex items-center mb-3">
//                           <Calendar className="w-5 h-5 text-purple-400 mr-2" />
//                           <h4 className="font-medium text-white">Generate Online</h4>
//                         </div>
//                         <p className="text-sm text-purple-300">Create your Kundli using our online generator</p>
//                         <button className="mt-3 text-sm text-cyan-400 hover:text-cyan-300 font-medium">
//                           Generate Now →
//                         </button>
//                       </div>
//                       <div className="bg-gradient-to-br from-cyan-900/30 to-transparent rounded-xl p-4 border border-cyan-400/20">
//                         <div className="flex items-center mb-3">
//                           <FileText className="w-5 h-5 text-cyan-400 mr-2" />
//                           <h4 className="font-medium text-white">Sample Format</h4>
//                         </div>
//                         <p className="text-sm text-purple-300">Download sample format for reference</p>
//                         <button className="mt-3 text-sm text-purple-400 hover:text-purple-300 font-medium">
//                           Download Sample →
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {uploadStep === 2 && (
//                 <div>
//                   <div className="flex items-center mb-8">
//                     <div className="w-12 h-12 rounded-full bg-cyan-900/50 flex items-center justify-center mr-4">
//                       <User className="w-6 h-6 text-cyan-400" />
//                     </div>
//                     <div>
//                       <h2 className="text-2xl font-bold text-white">Personal Information</h2>
//                       <p className="text-purple-300">Enter your birth details for accurate analysis</p>
//                     </div>
//                   </div>

//                   <div className="grid md:grid-cols-2 gap-6">
//                     <div>
//                       <label className="block text-sm font-medium text-purple-300 mb-2">
//                         <User className="w-4 h-4 inline mr-2" />
//                         Full Name
//                       </label>
//                       <input
//                         type="text"
//                         name="name"
//                         value={formData.name}
//                         onChange={handleInputChange}
//                         className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-purple-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all"
//                         placeholder="Enter your full name"
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-purple-300 mb-2">
//                         <Calendar className="w-4 h-4 inline mr-2" />
//                         Birth Date
//                       </label>
//                       <input
//                         type="date"
//                         name="birthDate"
//                         value={formData.birthDate}
//                         onChange={handleInputChange}
//                         className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-purple-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all"
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-purple-300 mb-2">
//                         <Clock className="w-4 h-4 inline mr-2" />
//                         Birth Time
//                       </label>
//                       <input
//                         type="time"
//                         name="birthTime"
//                         value={formData.birthTime}
//                         onChange={handleInputChange}
//                         className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-purple-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all"
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-purple-300 mb-2">
//                         <MapPin className="w-4 h-4 inline mr-2" />
//                         Birth Place
//                       </label>
//                       <input
//                         type="text"
//                         name="birthPlace"
//                         value={formData.birthPlace}
//                         onChange={handleInputChange}
//                         className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-purple-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all"
//                         placeholder="City, State, Country"
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-purple-300 mb-2">
//                         <Mail className="w-4 h-4 inline mr-2" />
//                         Email Address
//                       </label>
//                       <input
//                         type="email"
//                         name="email"
//                         value={formData.email}
//                         onChange={handleInputChange}
//                         className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-purple-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all"
//                         placeholder="your@email.com"
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-purple-300 mb-2">
//                         <Phone className="w-4 h-4 inline mr-2" />
//                         Phone Number
//                       </label>
//                       <input
//                         type="tel"
//                         name="phone"
//                         value={formData.phone}
//                         onChange={handleInputChange}
//                         className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-purple-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all"
//                         placeholder="+91 9876543210"
//                       />
//                     </div>
//                   </div>

//                   <div className="flex justify-between mt-8">
//                     <button
//                       onClick={() => setUploadStep(1)}
//                       className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg border border-white/20 transition-all duration-300"
//                     >
//                       ← Back
//                     </button>
//                     <button
//                       onClick={() => setUploadStep(3)}
//                       className="px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white rounded-lg transition-all duration-300 transform hover:scale-105"
//                     >
//                       Continue →
//                     </button>
//                   </div>
//                 </div>
//               )}

//               {uploadStep === 3 && (
//                 <form onSubmit={handleSubmit}>
//                   <div className="flex items-center mb-8">
//                     <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-900/50 to-cyan-900/50 flex items-center justify-center mr-4">
//                       <FileText className="w-6 h-6 text-purple-400" />
//                     </div>
//                     <div>
//                       <h2 className="text-2xl font-bold text-white">Guidance Request</h2>
//                       <p className="text-purple-300">Tell us what guidance you're seeking</p>
//                     </div>
//                   </div>

//                   <div className="mb-6">
//                     <label className="block text-sm font-medium text-purple-300 mb-3">
//                       What guidance are you seeking?
//                     </label>
//                     <div className="grid sm:grid-cols-2 gap-3">
//                       {concernsList.map((concern) => (
//                         <label
//                           key={concern}
//                           className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all duration-300 ${formData.concern === concern ? 'bg-purple-900/30 border-purple-400' : 'bg-white/5 border-white/20 hover:border-purple-400/50'}`}
//                         >
//                           <input
//                             type="radio"
//                             name="concern"
//                             value={concern}
//                             checked={formData.concern === concern}
//                             onChange={handleInputChange}
//                             className="hidden"
//                           />
//                           <div className={`w-5 h-5 rounded-full border mr-3 flex items-center justify-center ${formData.concern === concern ? 'border-purple-400' : 'border-white/30'}`}>
//                             {formData.concern === concern && (
//                               <div className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-400 to-cyan-400"></div>
//                             )}
//                           </div>
//                           <span className="text-white">{concern}</span>
//                         </label>
//                       ))}
//                     </div>
//                   </div>

//                   <div className="mb-6">
//                     <label className="block text-sm font-medium text-purple-300 mb-3">
//                       Additional Details
//                     </label>
//                     <textarea
//                       name="additionalDetails"
//                       rows="4"
//                       className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-purple-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all resize-none"
//                       placeholder="Please provide any additional information or specific questions..."
//                     ></textarea>
//                   </div>

//                   <div className="mb-6">
//                     <label className="block text-sm font-medium text-purple-300 mb-3">
//                       Priority Level
//                     </label>
//                     <div className="flex space-x-4">
//                       {['low', 'medium', 'high'].map((level) => (
//                         <label
//                           key={level}
//                           className={`flex-1 text-center py-3 rounded-lg border cursor-pointer transition-all duration-300 ${formData.priority === level ? 'bg-gradient-to-r from-purple-900/30 to-cyan-900/30 border-purple-400' : 'bg-white/5 border-white/20 hover:border-purple-400/50'}`}
//                         >
//                           <input
//                             type="radio"
//                             name="priority"
//                             value={level}
//                             checked={formData.priority === level}
//                             onChange={handleInputChange}
//                             className="hidden"
//                           />
//                           <span className={`font-medium ${formData.priority === level ? 'text-white' : 'text-purple-300'}`}>
//                             {level.charAt(0).toUpperCase() + level.slice(1)}
//                           </span>
//                         </label>
//                       ))}
//                     </div>
//                   </div>

//                   <div className="mb-8">
//                     <label className="flex items-start cursor-pointer">
//                       <input
//                         type="checkbox"
//                         name="consent"
//                         checked={formData.consent}
//                         onChange={handleInputChange}
//                         className="hidden"
//                       />
//                       <div className={`w-5 h-5 rounded border mr-3 mt-1 flex items-center justify-center transition-all duration-300 ${formData.consent ? 'bg-gradient-to-r from-purple-400 to-cyan-400 border-purple-400' : 'bg-white/5 border-white/30'}`}>
//                         {formData.consent && (
//                           <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
//                           </svg>
//                         )}
//                       </div>
//                       <span className="text-sm text-purple-300">
//                         I agree to share my birth details for astrological analysis and consent to receiving personalized guidance based on my Kundli.
//                       </span>
//                     </label>
//                   </div>

//                   <div className="flex justify-between">
//                     <button
//                       type="button"
//                       onClick={() => setUploadStep(2)}
//                       className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg border border-white/20 transition-all duration-300"
//                     >
//                       ← Back
//                     </button>
//                     <button
//                       type="submit"
//                       disabled={!formData.consent}
//                       className={`px-8 py-3 rounded-lg transition-all duration-300 transform ${formData.consent ? 'bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 hover:scale-105 text-white' : 'bg-white/10 text-white/50 cursor-not-allowed'}`}
//                     >
//                       Submit Request
//                     </button>
//                   </div>
//                 </form>
//               )}

//               {uploadStep === 4 && (
//                 <div className="text-center py-12">
//                   <div className="w-24 h-24 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center mx-auto mb-6">
//                     <div className="w-12 h-12 text-white">✓</div>
//                   </div>
//                   <h2 className="text-3xl font-bold text-white mb-4">Request Submitted Successfully!</h2>
//                   <p className="text-xl text-purple-300 mb-8">
//                     Your Kundli analysis request has been received. Our expert astrologers will review your chart and provide personalized guidance within 24-48 hours.
//                   </p>
//                   <div className="grid md:grid-cols-3 gap-6 mb-8">
//                     <div className="bg-white/5 rounded-xl p-6 border border-white/20">
//                       <div className="w-12 h-12 rounded-full bg-purple-900/30 flex items-center justify-center mx-auto mb-4">
//                         <Clock className="w-6 h-6 text-purple-400" />
//                       </div>
//                       <h3 className="font-semibold text-white mb-2">Processing Time</h3>
//                       <p className="text-sm text-purple-300">24-48 hours</p>
//                     </div>
//                     <div className="bg-white/5 rounded-xl p-6 border border-white/20">
//                       <div className="w-12 h-12 rounded-full bg-cyan-900/30 flex items-center justify-center mx-auto mb-4">
//                         <Mail className="w-6 h-6 text-cyan-400" />
//                       </div>
//                       <h3 className="font-semibold text-white mb-2">Updates</h3>
//                       <p className="text-sm text-purple-300">Sent to your email</p>
//                     </div>
//                     <div className="bg-white/5 rounded-xl p-6 border border-white/20">
//                       <div className="w-12 h-12 rounded-full bg-emerald-900/30 flex items-center justify-center mx-auto mb-4">
//                         <Shield className="w-6 h-6 text-emerald-400" />
//                       </div>
//                       <h3 className="font-semibold text-white mb-2">Confidential</h3>
//                       <p className="text-sm text-purple-300">100% Secure & Private</p>
//                     </div>
//                   </div>
//                   <div className="flex justify-center space-x-4">
//                     <button
//                       onClick={() => {
//                         setUploadStep(1);
//                         setKundliFile(null);
//                         setPreviewUrl('');
//                         setFormData({
//                           name: '',
//                           birthDate: '',
//                           birthTime: '',
//                           birthPlace: '',
//                           email: '',
//                           phone: '',
//                           gender: '',
//                           concern: '',
//                           priority: 'medium',
//                           consent: false
//                         });
//                       }}
//                       className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg border border-white/20 transition-all duration-300"
//                     >
//                       New Request
//                     </button>
//                     <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white rounded-lg transition-all duration-300 transform hover:scale-105">
//                       Track Request
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Right Column - Info & Features */}
//           <div className="space-y-8">
//             {/* Uploaded Preview */}
//             {kundliFile && (
//               <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/20 p-6">
//                 <h3 className="text-lg font-semibold text-white mb-4">Uploaded Kundli</h3>
//                 <div className="flex items-center space-x-4">
//                   <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-purple-900/30 to-cyan-900/30 flex items-center justify-center">
//                     <FileText className="w-8 h-8 text-cyan-400" />
//                   </div>
//                   <div>
//                     <h4 className="font-medium text-white">{kundliFile.name}</h4>
//                     <p className="text-sm text-purple-300">
//                       {(kundliFile.size / 1024).toFixed(2)} KB • PDF
//                     </p>
//                     <button
//                       onClick={() => {
//                         setKundliFile(null);
//                         setPreviewUrl('');
//                         setUploadStep(1);
//                       }}
//                       className="text-sm text-red-400 hover:text-red-300 mt-1"
//                     >
//                       Remove
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Features */}
//             <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/20 p-6">
//               <h3 className="text-lg font-semibold text-white mb-6">Why Choose Us?</h3>
//               <div className="space-y-4">
//                 {[
//                   { icon: '⭐', title: 'Expert Astrologers', desc: 'Certified Vedic astrologers with 10+ years experience' },
//                   { icon: '🔒', title: '100% Confidential', desc: 'Your data is encrypted and never shared' },
//                   { icon: '⚡', title: '24-48 Hour Turnaround', desc: 'Quick responses from our experts' },
//                   { icon: '📱', title: 'Digital Delivery', desc: 'Receive guidance via email & app' },
//                 ].map((feature, index) => (
//                   <div key={index} className="flex items-start">
//                     <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-900/30 to-cyan-900/30 flex items-center justify-center mr-4">
//                       <span className="text-lg">{feature.icon}</span>
//                     </div>
//                     <div>
//                       <h4 className="font-medium text-white">{feature.title}</h4>
//                       <p className="text-sm text-purple-300">{feature.desc}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Zodiac Signs */}
//             <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/20 p-6">
//               <h3 className="text-lg font-semibold text-white mb-6">Zodiac Signs</h3>
//               <div className="grid grid-cols-3 gap-3">
//                 {zodiacSigns.map((sign) => (
//                   <div
//                     key={sign.name}
//                     className={`bg-gradient-to-br ${sign.color}/20 to-transparent rounded-lg p-3 border border-white/10 text-center hover:scale-105 transition-transform duration-300 cursor-pointer`}
//                   >
//                     <div className="text-2xl mb-1">{sign.icon}</div>
//                     <div className="text-xs font-medium text-white">{sign.name}</div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Support */}
   
//           </div>
//         </div>
//       </div>

//       {/* Add custom animations */}
//       <style jsx="true">{`
//         @keyframes float {
//           0%, 100% { transform: translateY(0px); }
//           50% { transform: translateY(-20px); }
//         }
        
//         @keyframes glow {
//           0%, 100% { opacity: 0.5; }
//           50% { opacity: 1; }
//         }
        
//         .animate-pulse {
//           animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
//         }
        
//         .absolute.rounded-full.bg-white\\/10 {
//           animation: float 20s ease-in-out infinite, glow 4s ease-in-out infinite;
//         }
        
//         /* Custom scrollbar */
//         ::-webkit-scrollbar {
//           width: 8px;
//         }
        
//         ::-webkit-scrollbar-track {
//           background: rgba(255, 255, 255, 0.05);
//         }
        
//         ::-webkit-scrollbar-thumb {
//           background: linear-gradient(to bottom, #8b5cf6, #06b6d4);
//           border-radius: 4px;
//         }
        
//         ::-webkit-scrollbar-thumb:hover {
//           background: linear-gradient(to bottom, #7c3aed, #0891b2);
//         }
//       `}</style>
//     </div>
//   );
// }



import React, { useState, useRef, useEffect } from 'react';
import { Upload, Calendar, User, Mail, Phone, MapPin, FileText, Star, Clock, Shield, Sparkles, MessageCircle, Send, X, Download } from 'lucide-react';
import { useWebSocket } from '../../utils/websocket-context';
import { Link } from 'react-router-dom';

export default function KundliUploadPage() {
  const [uploadStep, setUploadStep] = useState(1);
  const [kundliFile, setKundliFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    birthDate: '',
    birthTime: '',
    birthPlace: '',
    email: '',
    phone: '',
    gender: '',
    concern: '',
    priority: 'medium',
    consent: false
  });
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [activeAdmin, setActiveAdmin] = useState('admin_1');
  const [uploadedDocuments, setUploadedDocuments] = useState([]);
  
  const { socket, connected } = useWebSocket();
  const fileInputRef = useRef(null);
  const chatContainerRef = useRef(null);

  // Mock user data
  const mockUser = {
    id: 'user_' + Date.now(),
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+91 9876543210',
    zodiac: 'Leo',
    status: 'active'
  };

  // Mock admin data
  const admins = [
    { id: 'admin_1', name: 'Astro Guru', role: 'Senior Astrologer', status: 'online', avatar: '🪐' },
    { id: 'admin_2', name: 'Cosmic Guide', role: 'Vedic Expert', status: 'online', avatar: '✨' },
    { id: 'admin_3', name: 'Star Reader', role: 'Numerology Specialist', status: 'offline', avatar: '⭐' }
  ];

  // Load data from localStorage
  useEffect(() => {
    const savedDocs = localStorage.getItem('client_documents');
    if (savedDocs) {
      setUploadedDocuments(JSON.parse(savedDocs));
    }

    // Load messages for this user
    const savedMessages = localStorage.getItem(`client_messages_${mockUser.id}`);
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    } else {
      // Initialize with sample messages
      const sampleMessages = [
        { id: 1, sender: 'admin', text: 'Welcome! How can I help you today?', timestamp: new Date().toISOString(), adminId: 'admin_1' },
        { id: 2, sender: 'user', text: 'Hello! I need guidance on my career path.', timestamp: new Date().toISOString(), adminId: 'admin_1' }
      ];
      setMessages(sampleMessages);
      localStorage.setItem(`client_messages_${mockUser.id}`, JSON.stringify(sampleMessages));
    }
  }, []);

  // Save messages to localStorage
  useEffect(() => {
    localStorage.setItem(`client_messages_${mockUser.id}`, JSON.stringify(messages));
  }, [messages]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newDocument = {
        id: Date.now(),
        name: file.name,
        size: file.size,
        type: file.type.includes('image') ? 'image' : 'pdf',
        uploadDate: new Date().toISOString(),
        status: 'pending',
        clientId: mockUser.id
      };
      
      setKundliFile(file);
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
      
      // Update documents
      const updatedDocs = [...uploadedDocuments, newDocument];
      setUploadedDocuments(updatedDocs);
      localStorage.setItem('client_documents', JSON.stringify(updatedDocs));
      
      // Update admin clients
      const adminClients = JSON.parse(localStorage.getItem('admin_clients') || '[]');
      const clientIndex = adminClients.findIndex(c => c.id === mockUser.id);
      if (clientIndex >= 0) {
        adminClients[clientIndex].documents += 1;
        localStorage.setItem('admin_clients', JSON.stringify(adminClients));
      }
      
      setUploadStep(2);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ kundliFile, formData });
    
    // Update document status
    if (uploadedDocuments.length > 0) {
      const updatedDocs = uploadedDocuments.map(doc => ({
        ...doc,
        status: 'submitted',
        concern: formData.concern,
        priority: formData.priority
      }));
      setUploadedDocuments(updatedDocs);
      localStorage.setItem('client_documents', JSON.stringify(updatedDocs));
    }
    
    setUploadStep(4);
  };

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const message = {
      id: Date.now(),
      sender: 'user',
      text: newMessage,
      timestamp: new Date().toISOString(),
      adminId: activeAdmin
    };

    setMessages(prev => [...prev, message]);
    
    // Send via WebSocket
    if (socket && connected) {
      socket.emit('sendMessage', {
        ...message,
        senderId: mockUser.id,
        senderName: mockUser.name,
        receiverId: activeAdmin,
        text: newMessage
      });
    }

    setNewMessage('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Scroll to bottom of chat
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const zodiacSigns = [
    { name: 'Aries', icon: '♈', color: 'from-red-500 to-orange-500' },
    { name: 'Taurus', icon: '♉', color: 'from-green-500 to-emerald-500' },
    { name: 'Gemini', icon: '♊', color: 'from-yellow-500 to-amber-500' },
    { name: 'Cancer', icon: '♋', color: 'from-gray-500 to-slate-500' },
    { name: 'Leo', icon: '♌', color: 'from-orange-500 to-yellow-500' },
    { name: 'Virgo', icon: '♍', color: 'from-green-500 to-teal-500' },
    { name: 'Libra', icon: '♎', color: 'from-pink-500 to-rose-500' },
    { name: 'Scorpio', icon: '♏', color: 'from-red-500 to-pink-500' },
    { name: 'Sagittarius', icon: '♐', color: 'from-purple-500 to-indigo-500' },
    { name: 'Capricorn', icon: '♑', color: 'from-gray-700 to-gray-900' },
    { name: 'Aquarius', icon: '♒', color: 'from-blue-500 to-cyan-500' },
    { name: 'Pisces', icon: '♓', color: 'from-purple-500 to-violet-500' },
  ];

  const concernsList = [
    'Career Guidance',
    'Marriage & Relationships',
    'Financial Prosperity',
    'Health Issues',
    'Education & Studies',
    'Family Matters',
    'Business Decisions',
    'Spiritual Growth',
    'Travel & Migration',
    'Property Matters'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white/10 animate-pulse"
            style={{
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 10 + 10}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div className="text-center md:text-left">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-purple-600 to-cyan-600 mb-6">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Kundli Analysis & Guidance
            </h1>
            <p className="text-xl text-purple-200">
              Upload your birth chart for personalized astrological insights
            </p>
          </div>

          {/* Navigation */}
          <div className="flex flex-wrap gap-4">
            <Link
              to="/"
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg border border-white/20 transition-all duration-300"
            >
              ← Back to Home
            </Link>
            <button
              onClick={() => setShowChat(!showChat)}
              className="relative group px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white font-bold rounded-full transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center space-x-3"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Chat with Astrologer</span>
              {connected && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-ping"></span>
              )}
            </button>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="max-w-7xl mx-auto mb-20">
          <div className="flex items-center justify-between relative">
            <div className="absolute top-1/2 left-0 w-full h-1 bg-white/10 -translate-y-1/2"></div>
            <div 
              className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 -translate-y-1/2 transition-all duration-500"
              style={{ width: `${(uploadStep - 1) * 33.33}%` }}
            ></div>
            
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="relative z-10">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${uploadStep >= step ? 'bg-gradient-to-r from-purple-600 to-cyan-600 scale-110' : 'bg-white/10'} border-2 ${uploadStep > step ? 'border-purple-400' : 'border-white/20'}`}>
                  {uploadStep > step ? (
                    <div className="w-6 h-6 text-white">✓</div>
                  ) : (
                    <span className={`text-lg font-bold ${uploadStep >= step ? 'text-white' : 'text-purple-300'}`}>
                      {step}
                    </span>
                  )}
                </div>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 text-sm font-medium">
                  <span className={`${uploadStep >= step ? 'text-cyan-300' : 'text-purple-300'}`}>
                    {step === 1 && 'Upload Kundli'}
                    {step === 2 && 'Personal Details'}
                    {step === 3 && 'Guidance Request'}
                    {step === 4 && 'Complete'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Upload Section */}
          <div className="lg:col-span-2">
            {/* Client Info Card */}
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/20 p-6 mb-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-cyan-600 flex items-center justify-center">
                    <span className="text-2xl">{zodiacSigns.find(z => z.name === mockUser.zodiac)?.icon || '⭐'}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{mockUser.name}</h3>
                    <p className="text-purple-300">{mockUser.email}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm">
                        {mockUser.zodiac}
                      </span>
                      <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">
                        Active
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-purple-300">Documents Uploaded</p>
                  <p className="text-3xl font-bold text-white">{uploadedDocuments.length}</p>
                </div>
              </div>
            </div>

            {/* Upload Form */}
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/20 p-8">
              {uploadStep === 1 && (
                <div>
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 rounded-full bg-purple-900/50 flex items-center justify-center mr-4">
                      <Upload className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">Upload Your Kundli</h2>
                      <p className="text-purple-300">Supported formats: PDF, JPEG, PNG</p>
                    </div>
                  </div>

                  <div
                    className="border-3 border-dashed border-white/20 rounded-xl p-12 text-center transition-all duration-300 hover:border-purple-400 hover:bg-white/5 cursor-pointer"
                    onClick={() => fileInputRef.current.click()}
                  >
                    <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-900/30 to-cyan-900/30 flex items-center justify-center mx-auto mb-6">
                      <Upload className="w-10 h-10 text-cyan-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">Drop your Kundli file here</h3>
                    <p className="text-purple-300 mb-6">or click to browse files</p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    {previewUrl && (
                      <div className="mt-6">
                        <img src={previewUrl} alt="Preview" className="max-h-40 mx-auto rounded-lg" />
                      </div>
                    )}
                  </div>

                  {/* Sample Kundli Section */}
                  <div className="mt-8">
                    <h3 className="text-lg font-semibold text-white mb-4">Don't have a Kundli?</h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="bg-gradient-to-br from-purple-900/30 to-transparent rounded-xl p-4 border border-purple-400/20">
                        <div className="flex items-center mb-3">
                          <Calendar className="w-5 h-5 text-purple-400 mr-2" />
                          <h4 className="font-medium text-white">Generate Online</h4>
                        </div>
                        <p className="text-sm text-purple-300">Create your Kundli using our online generator</p>
                        <button className="mt-3 text-sm text-cyan-400 hover:text-cyan-300 font-medium">
                          Generate Now →
                        </button>
                      </div>
                      <div className="bg-gradient-to-br from-cyan-900/30 to-transparent rounded-xl p-4 border border-cyan-400/20">
                        <div className="flex items-center mb-3">
                          <FileText className="w-5 h-5 text-cyan-400 mr-2" />
                          <h4 className="font-medium text-white">Sample Format</h4>
                        </div>
                        <p className="text-sm text-purple-300">Download sample format for reference</p>
                        <button className="mt-3 text-sm text-purple-400 hover:text-purple-300 font-medium">
                          Download Sample →
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {uploadStep === 2 && (
                <div>
                  <div className="flex items-center mb-8">
                    <div className="w-12 h-12 rounded-full bg-cyan-900/50 flex items-center justify-center mr-4">
                      <User className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">Personal Information</h2>
                      <p className="text-purple-300">Enter your birth details for accurate analysis</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-purple-300 mb-2">
                        <User className="w-4 h-4 inline mr-2" />
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-purple-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-purple-300 mb-2">
                        <Calendar className="w-4 h-4 inline mr-2" />
                        Birth Date
                      </label>
                      <input
                        type="date"
                        name="birthDate"
                        value={formData.birthDate}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-purple-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-purple-300 mb-2">
                        <Clock className="w-4 h-4 inline mr-2" />
                        Birth Time
                      </label>
                      <input
                        type="time"
                        name="birthTime"
                        value={formData.birthTime}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-purple-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-purple-300 mb-2">
                        <MapPin className="w-4 h-4 inline mr-2" />
                        Birth Place
                      </label>
                      <input
                        type="text"
                        name="birthPlace"
                        value={formData.birthPlace}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-purple-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all"
                        placeholder="City, State, Country"
                      />
                    </div>
                  </div>

                  <div className="flex justify-between mt-8">
                    <button
                      onClick={() => setUploadStep(1)}
                      className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg border border-white/20 transition-all duration-300"
                    >
                      ← Back
                    </button>
                    <button
                      onClick={() => setUploadStep(3)}
                      className="px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white rounded-lg transition-all duration-300 transform hover:scale-105"
                    >
                      Continue →
                    </button>
                  </div>
                </div>
              )}

              {uploadStep === 3 && (
                <form onSubmit={handleSubmit}>
                  <div className="flex items-center mb-8">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-900/50 to-cyan-900/50 flex items-center justify-center mr-4">
                      <FileText className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">Guidance Request</h2>
                      <p className="text-purple-300">Tell us what guidance you're seeking</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-purple-300 mb-3">
                      What guidance are you seeking?
                    </label>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {concernsList.map((concern) => (
                        <label
                          key={concern}
                          className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all duration-300 ${formData.concern === concern ? 'bg-purple-900/30 border-purple-400' : 'bg-white/5 border-white/20 hover:border-purple-400/50'}`}
                        >
                          <input
                            type="radio"
                            name="concern"
                            value={concern}
                            checked={formData.concern === concern}
                            onChange={handleInputChange}
                            className="hidden"
                          />
                          <div className={`w-5 h-5 rounded-full border mr-3 flex items-center justify-center ${formData.concern === concern ? 'border-purple-400' : 'border-white/30'}`}>
                            {formData.concern === concern && (
                              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-400 to-cyan-400"></div>
                            )}
                          </div>
                          <span className="text-white">{concern}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="mb-8">
                    <label className="flex items-start cursor-pointer">
                      <input
                        type="checkbox"
                        name="consent"
                        checked={formData.consent}
                        onChange={handleInputChange}
                        className="hidden"
                      />
                      <div className={`w-5 h-5 rounded border mr-3 mt-1 flex items-center justify-center transition-all duration-300 ${formData.consent ? 'bg-gradient-to-r from-purple-400 to-cyan-400 border-purple-400' : 'bg-white/5 border-white/30'}`}>
                        {formData.consent && (
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <span className="text-sm text-purple-300">
                        I agree to share my birth details for astrological analysis and consent to receiving personalized guidance based on my Kundli.
                      </span>
                    </label>
                  </div>

                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={() => setUploadStep(2)}
                      className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg border border-white/20 transition-all duration-300"
                    >
                      ← Back
                    </button>
                    <button
                      type="submit"
                      disabled={!formData.consent}
                      className={`px-8 py-3 rounded-lg transition-all duration-300 transform ${formData.consent ? 'bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 hover:scale-105 text-white' : 'bg-white/10 text-white/50 cursor-not-allowed'}`}
                    >
                      Submit Request
                    </button>
                  </div>
                </form>
              )}

              {uploadStep === 4 && (
                <div className="text-center py-12">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center mx-auto mb-6">
                    <div className="w-12 h-12 text-white">✓</div>
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-4">Request Submitted Successfully!</h2>
                  <p className="text-xl text-purple-300 mb-8">
                    Your Kundli analysis request has been received. Our expert astrologers will review your chart and provide personalized guidance within 24-48 hours.
                  </p>
                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white/5 rounded-xl p-6 border border-white/20">
                      <div className="w-12 h-12 rounded-full bg-purple-900/30 flex items-center justify-center mx-auto mb-4">
                        <Clock className="w-6 h-6 text-purple-400" />
                      </div>
                      <h3 className="font-semibold text-white mb-2">Processing Time</h3>
                      <p className="text-sm text-purple-300">24-48 hours</p>
                    </div>
                    <div className="bg-white/5 rounded-xl p-6 border border-white/20">
                      <div className="w-12 h-12 rounded-full bg-cyan-900/30 flex items-center justify-center mx-auto mb-4">
                        <Mail className="w-6 h-6 text-cyan-400" />
                      </div>
                      <h3 className="font-semibold text-white mb-2">Updates</h3>
                      <p className="text-sm text-purple-300">Sent to your email</p>
                    </div>
                    <div className="bg-white/5 rounded-xl p-6 border border-white/20">
                      <div className="w-12 h-12 rounded-full bg-emerald-900/30 flex items-center justify-center mx-auto mb-4">
                        <Shield className="w-6 h-6 text-emerald-400" />
                      </div>
                      <h3 className="font-semibold text-white mb-2">Confidential</h3>
                      <p className="text-sm text-purple-300">100% Secure & Private</p>
                    </div>
                  </div>
                  <div className="flex justify-center space-x-4">
                    <button
                      onClick={() => {
                        setUploadStep(1);
                        setKundliFile(null);
                        setPreviewUrl('');
                        setFormData({
                          name: '',
                          birthDate: '',
                          birthTime: '',
                          birthPlace: '',
                          email: '',
                          phone: '',
                          gender: '',
                          concern: '',
                          priority: 'medium',
                          consent: false
                        });
                      }}
                      className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg border border-white/20 transition-all duration-300"
                    >
                      New Request
                    </button>
                    <button 
                      onClick={() => setShowChat(true)}
                      className="px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white rounded-lg transition-all duration-300 transform hover:scale-105"
                    >
                      Chat with Astrologer
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Uploaded Documents */}
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/20 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Your Documents</h3>
              <div className="space-y-4">
                {uploadedDocuments.length > 0 ? (
                  uploadedDocuments.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <FileText className="w-5 h-5 text-cyan-400" />
                        <div>
                          <p className="text-sm text-white font-medium truncate max-w-[150px]">
                            {doc.name}
                          </p>
                          <p className="text-xs text-purple-300">
                            {(doc.size / 1024).toFixed(1)} KB • {new Date(doc.uploadDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs ${
                        doc.status === 'pending' ? 'bg-yellow-500/20 text-yellow-300' :
                        doc.status === 'submitted' ? 'bg-green-500/20 text-green-300' :
                        'bg-blue-500/20 text-blue-300'
                      }`}>
                        {doc.status}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-purple-300 text-center py-4">No documents uploaded yet</p>
                )}
              </div>
            </div>

            {/* Available Astrologers */}
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/20 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Available Astrologers</h3>
              <div className="space-y-3">
                {admins.map((admin) => (
                  <div
                    key={admin.id}
                    className={`flex items-center p-3 rounded-lg cursor-pointer transition-all duration-300 ${
                      activeAdmin === admin.id 
                        ? 'bg-gradient-to-r from-purple-900/30 to-cyan-900/30 border border-purple-400/50' 
                        : 'bg-white/5 hover:bg-white/10'
                    }`}
                    onClick={() => {
                      setActiveAdmin(admin.id);
                      setShowChat(true);
                    }}
                  >
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-cyan-600 flex items-center justify-center">
                        <span className="text-lg">{admin.avatar}</span>
                      </div>
                      <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-gray-900 ${
                        admin.status === 'online' ? 'bg-green-500' : 'bg-gray-500'
                      }`}></div>
                    </div>
                    <div className="ml-3 flex-1">
                      <h4 className="font-medium text-white">{admin.name}</h4>
                      <p className="text-xs text-purple-300">{admin.role}</p>
                    </div>
                    {admin.status === 'online' && (
                      <span className="text-xs text-green-400">● Online</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Support Info */}
            <div className="bg-gradient-to-br from-purple-900/30 to-cyan-900/30 backdrop-blur-xl rounded-2xl border border-purple-400/30 p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Need Help?</h3>
              <p className="text-purple-300 text-sm mb-4">
                Our support team is here to help you with the upload process or any questions.
              </p>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Mail className="w-5 h-5 text-cyan-400 mr-3" />
                  <span className="text-white text-sm">support@astroguide.com</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-5 h-5 text-purple-400 mr-3" />
                  <span className="text-white text-sm">+91 1800-123-4567</span>
                </div>
              </div>
              <button 
                onClick={() => setShowChat(true)}
                className="w-full mt-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg border border-white/30 transition-all duration-300"
              >
                Live Chat Support
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Window */}
      {showChat && (
        <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-gradient-to-br from-gray-800 via-purple-900/90 to-violet-900/90 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl z-50 overflow-hidden">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-purple-900/50 to-cyan-900/50 p-4 border-b border-white/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-cyan-600 flex items-center justify-center">
                  <span className="text-lg">{admins.find(a => a.id === activeAdmin)?.avatar || '⭐'}</span>
                </div>
                <div>
                  <h3 className="font-bold text-white">{admins.find(a => a.id === activeAdmin)?.name || 'Astrologer'}</h3>
                  <div className="flex items-center space-x-2">
                    <span className={`text-xs ${connected ? 'text-green-400' : 'text-red-400'}`}>
                      {connected ? '● Connected' : '● Disconnected'}
                    </span>
                    <span className="text-xs text-purple-300">{admins.find(a => a.id === activeAdmin)?.role}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setShowChat(false)}
                className="text-white hover:text-purple-300 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Chat Messages */}
          <div 
            ref={chatContainerRef}
            className="flex-1 p-4 overflow-y-auto space-y-4 max-h-[400px]"
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white rounded-br-none'
                      : 'bg-white/10 text-white rounded-bl-none'
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <div className="p-4 border-t border-white/20">
            <div className="flex space-x-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 px-4 py-3 bg-white/5 border border-white/20 rounded-full text-white placeholder-purple-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all"
              />
              <button
                onClick={sendMessage}
                disabled={!newMessage.trim()}
                className="px-4 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-purple-400 mt-2 text-center">
              Real-time chat with WebSocket connection
            </p>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        .absolute.rounded-full.bg-white\\/10 {
          animation: float 20s ease-in-out infinite;
        }
        
        /* Custom scrollbar for chat */
        .overflow-y-auto::-webkit-scrollbar {
          width: 6px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
        }
        
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #8b5cf6, #06b6d4);
          border-radius: 3px;
        }
      `}</style>
    </div>
  );
}