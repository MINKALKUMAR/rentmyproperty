import React, { useState } from 'react';

const TenantRegistrationForm = () => {
  const ADMIN_WHATSAPP_NUMBER = "917830063882";
  
  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    phoneNumber: '',
    email: '',
    occupation: '',
    nativePlace: '',
    currentAddress: '',
    preferredLocation: '',
    specificAreas: '',
    occupancyType: '',
    propertyType: '',
    budget: '',
    budgetFlexibility: '',
    furnishingPreference: '',
    essentialAmenities: [],
    moveInTimeframe: '',
    stayDuration: '',
    specialRequirements: '',
    numberOfPeople: '',
    hasPets: '',
    previousRentalExperience: '',
    referralSource: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newAmenity, setNewAmenity] = useState('');

  // Location suggestions
  const locationOptions = [
    'Chandigarh', 'Mohali', 'Kharar', 
    'Sector 23', 'Sector 126', 'Near Metro Station',
    'Sector 22', 'Sector 35', 'Sector 17',
    'Zirakpur', 'Manimajra'
  ];

  // Occupancy type options
  const occupancyTypeOptions = [
    'Girl', 'Boy', 'Family', 'Live-in'
  ];

  // Property type options
  const propertyTypeOptions = [
    'Room with Kitchen', 'Room with Washroom', 
    '1 BHK', '2 BHK', '3 BHK', 'PG'
  ];

  // Furnishing preferences
  const furnishingOptions = [
    'Fully Furnished', 'Semi Furnished', 'Unfurnished'
  ];

  // Common amenities
  const commonAmenities = [
    'Wi-Fi', 'AC', 'Parking', 'Power Backup', 
    'Water Supply 24x7', 'Security/CCTV', 'Lift', 'Washing Machine'
  ];

  // Move-in timeframe options
  const moveInTimeframeOptions = [
    'Immediately', 'Within 1 week', 'Within 1 month', 'After 1 month'
  ];

  // Stay duration options
  const stayDurationOptions = [
    'Less than 6 months', '6 months to 1 year', 
    '1-2 years', '2+ years'
  ];

  // Referral source options
  const referralSourceOptions = [
    'Friend/Colleague', 'Advertisement', 'Online Search', 
    'Social Media', 'Newspaper', 'Word of Mouth'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const toggleAmenity = (amenity) => {
    setFormData(prev => ({
      ...prev,
      essentialAmenities: prev.essentialAmenities.includes(amenity)
        ? prev.essentialAmenities.filter(a => a !== amenity)
        : [...prev.essentialAmenities, amenity]
    }));
  };

  const addCustomAmenity = () => {
    if (newAmenity.trim() && !formData.essentialAmenities.includes(newAmenity)) {
      setFormData(prev => ({
        ...prev,
        essentialAmenities: [...prev.essentialAmenities, newAmenity]
      }));
      setNewAmenity('');
    }
  };

  const removeAmenity = (amenityToRemove) => {
    setFormData(prev => ({
      ...prev,
      essentialAmenities: prev.essentialAmenities.filter(a => a !== amenityToRemove)
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = [
      'fullName', 'age', 'phoneNumber', 'occupation', 
      'nativePlace', 'preferredLocation', 'occupancyType',
      'propertyType', 'budget', 'moveInTimeframe'
    ];
    
    requiredFields.forEach(field => {
      if (!formData[field]) {
        newErrors[field] = 'This field is required';
      }
    });

    if (formData.phoneNumber && !/^[0-9]{10}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Enter a valid 10-digit number';
    }

    if (formData.age && (isNaN(formData.age) || formData.age < 18 || formData.age > 100)) {
      newErrors.age = 'Enter a valid age (18-100)';
    }

    if (formData.budget && (isNaN(formData.budget) || formData.budget < 1)) {
      newErrors.budget = 'Enter a valid budget amount';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatWhatsAppMessage = () => {
    return `*📝  NEW TENANT REGISTRATION REQUEST  📝*%0A%0A` +
      `*══════ PERSONAL INFORMATION ══════*%0A` +
      `👤 Full Name: ${formData.fullName}%0A` +
      `🎂 Age: ${formData.age}%0A` +
      `📱 Phone: ${formData.phoneNumber}%0A` +
      `${formData.email ? `📧 Email: ${formData.email}%0A` : ''}` +
      `💼 Occupation: ${formData.occupation}%0A` +
      `🏠 Native Place: ${formData.nativePlace}%0A` +
      `${formData.currentAddress ? `📍 Current Address: ${formData.currentAddress}%0A` : ''}` +
      `%0A` +
      `*══════ PROPERTY PREFERENCES ══════*%0A` +
      `📍 Preferred Location: ${formData.preferredLocation}%0A` +
      `${formData.specificAreas ? `🗺️ Specific Areas: ${formData.specificAreas}%0A` : ''}` +
      `🏘️ Occupancy Type: ${formData.occupancyType}%0A` +
      `🏡 Property Type: ${formData.propertyType}%0A` +
      `💰 Budget: ₹${formData.budget} ${formData.budgetFlexibility === 'Negotiable' ? '(Negotiable)' : ''}%0A` +
      `%0A` +
      `*══════ ADDITIONAL REQUIREMENTS ══════*%0A` +
      `${formData.furnishingPreference ? `🛋️ Furnishing Preference: ${formData.furnishingPreference}%0A` : ''}` +
      `${formData.essentialAmenities.length > 0 ? `✅ Essential Amenities: ${formData.essentialAmenities.join(', ')}%0A` : ''}` +
      `📅 Move-in Timeframe: ${formData.moveInTimeframe}%0A` +
      `${formData.stayDuration ? `⏳ Expected Stay Duration: ${formData.stayDuration}%0A` : ''}` +
      `${formData.specialRequirements ? `❗ Special Requirements: ${formData.specialRequirements}%0A` : ''}` +
      `%0A` +
      `*══════ FAMILY/ROOMMATE INFO ══════*%0A` +
      `${formData.numberOfPeople ? `👪 Number of People: ${formData.numberOfPeople}%0A` : ''}` +
      `${formData.hasPets ? `🐾 Pets: ${formData.hasPets}%0A` : ''}` +
      `${formData.previousRentalExperience ? `%0A*══════ PREVIOUS RENTAL EXPERIENCE ══════*%0A📝 ${formData.previousRentalExperience}%0A` : ''}` +
      `${formData.referralSource ? `%0A*══════ REFERRAL INFORMATION ══════*%0A🔗 How did you hear about us: ${formData.referralSource}` : ''}` +
      `%0A%0A` +
      `*✨ Thank you for your registration! We'll contact you shortly. ✨*`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }

    const message = formatWhatsAppMessage();
    window.open(`https://wa.me/${ADMIN_WHATSAPP_NUMBER}?text=${message}`, '_blank');
    
    setIsSubmitting(false);
  };

  const renderInput = (id, label, type = 'text', placeholder, required = false) => (
    <div className="relative">
      <label htmlFor={id} className="block text-lg font-medium text-slate-800 mb-3">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        value={formData[id]}
        onChange={handleChange}
        placeholder={placeholder}
        className={`w-full px-5 py-4 text-lg border-2 ${
          errors[id] ? 'border-red-500' : 'border-slate-300'
        } rounded-xl focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 transition-all duration-300 shadow-md bg-white`}
        required={required}
      />
      {errors[id] && (
        <p className="mt-2 text-lg text-red-600">{errors[id]}</p>
      )}
    </div>
  );

  const renderTextarea = (id, label, placeholder, required = false, maxChars = null) => (
    <div className="relative">
      <label htmlFor={id} className="block text-lg font-medium text-slate-800 mb-3">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <textarea
        id={id}
        name={id}
        value={formData[id]}
        onChange={handleChange}
        placeholder={placeholder}
        rows="4"
        className={`w-full px-5 py-4 text-lg border-2 ${
          errors[id] ? 'border-red-500' : 'border-slate-300'
        } rounded-xl focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 transition-all duration-300 shadow-md bg-white`}
        required={required}
        maxLength={maxChars}
      ></textarea>
      {maxChars && (
        <div className="text-right text-sm text-slate-500 mt-1">
          {formData[id]?.length || 0}/{maxChars} characters
        </div>
      )}
      {errors[id] && (
        <p className="mt-2 text-lg text-red-600">{errors[id]}</p>
      )}
    </div>
  );

  // NEW: Function to render input with suggestions but allow typing
  const renderInputWithSuggestions = (id, label, options, placeholder, required = false) => (
    <div className="relative">
      <label htmlFor={id} className="block text-lg font-medium text-slate-800 mb-3">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type="text"
        id={id}
        name={id}
        value={formData[id]}
        onChange={handleChange}
        list={`${id}Options`}
        placeholder={placeholder}
        className={`w-full px-5 py-4 text-lg border-2 ${
          errors[id] ? 'border-red-500' : 'border-slate-300'
        } rounded-xl focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 transition-all duration-300 shadow-md bg-white`}
        required={required}
      />
      <datalist id={`${id}Options`}>
        {options.map(option => (
          <option key={option} value={option} />
        ))}
      </datalist>
      {errors[id] && (
        <p className="mt-2 text-lg text-red-600">{errors[id]}</p>
      )}
    </div>
  );

  const renderRadioGroup = (id, label, options, required = false) => (
    <div className="relative">
      <label className="block text-lg font-medium text-slate-800 mb-4">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="flex flex-wrap gap-8">
        {options.map(option => (
          <label key={option} className="inline-flex items-center">
            <input
              type="radio"
              name={id}
              value={option}
              checked={formData[id] === option}
              onChange={handleChange}
              className="h-6 w-6 text-indigo-600 focus:ring-4 focus:ring-indigo-200"
              required={required}
            />
            <span className="ml-3 text-slate-800 font-medium text-lg">{option}</span>
          </label>
        ))}
      </div>
      {errors[id] && (
        <p className="mt-2 text-lg text-red-600">{errors[id]}</p>
      )}
    </div>
  );

  const renderAmenitiesSection = () => (
    <div className="mb-6">
      <label className="block text-lg font-medium text-slate-800 mb-4">
        Essential Amenities
      </label>
      
      {/* Selected amenities */}
      <div className="flex flex-wrap gap-3 mb-6">
        {formData.essentialAmenities.map(item => (
          <span key={item} className="inline-flex items-center px-4 py-2 bg-indigo-200 text-indigo-800 rounded-xl text-lg font-medium shadow-sm">
            {item}
            <button
              type="button"
              onClick={() => removeAmenity(item)}
              className="ml-3 text-indigo-600 hover:text-indigo-900 text-xl"
            >
              &times;
            </button>
          </span>
        ))}
      </div>
      
      {/* Add custom amenity */}
      <div className="flex mb-4">
        <input
          type="text"
          value={newAmenity}
          onChange={(e) => setNewAmenity(e.target.value)}
          placeholder="Add custom amenity"
          className="flex-1 px-5 py-4 text-lg border-2 border-slate-300 rounded-l-xl focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500"
          onKeyPress={(e) => e.key === 'Enter' && addCustomAmenity()}
        />
        <button
          type="button"
          onClick={addCustomAmenity}
          className="px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-r-xl hover:from-indigo-700 hover:to-purple-600 transition-all duration-300 text-lg font-medium"
        >
          Add
        </button>
      </div>
      
      {/* Common amenities */}
      <div className="mb-6">
        <h4 className="text-lg font-medium text-slate-800 mb-3">Common amenities:</h4>
        <div className="flex flex-wrap gap-3">
          {commonAmenities.map(option => (
            <button
              key={option}
              type="button"
              onClick={() => toggleAmenity(option)}
              className={`px-4 py-2 rounded-xl text-lg font-medium transition-all duration-300 shadow-sm ${
                formData.essentialAmenities.includes(option)
                  ? 'bg-indigo-200 text-indigo-800'
                  : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex flex-col items-center mb-8">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 rounded-2xl shadow-2xl mb-8 transform transition-transform duration-300 hover:scale-105">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h1 className="text-5xl font-bold text-slate-800 mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-700">
              Tenant Registration Form
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Help us find the perfect property that matches your needs and preferences
            </p>
            <div className="mt-8 w-48 h-2.5 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-full animate-pulse"></div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-transform duration-500 hover:shadow-2xl">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 py-8 px-10">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-white">Find Your Perfect Home</h2>
                <p className="text-cyan-100 mt-2 text-lg">Provide your details to help us match you with the ideal property</p>
              </div>
              <div className="bg-white/20 p-4 rounded-full transform transition-transform duration-300 hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="p-8 md:p-10">
            {/* Personal Information Section */}
            <div className="mb-12 bg-indigo-50 rounded-2xl p-8 shadow-lg">
              <div className="flex items-center mb-8">
                <div className="h-14 w-14 rounded-full bg-gradient-to-r from-blue-600 to-indigo-700 flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-slate-800">Personal Information</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {renderInput('fullName', "Full Name", 'text', 'Enter your full name', true)}
                {renderInput('age', "Age", 'number', 'Enter your age', true)}
                {renderInput('phoneNumber', "Phone Number", 'tel', 'Enter 10-digit phone number', true)}
                {renderInput('email', "Email Address", 'email', 'Enter your email address')}
                {renderInput('occupation', "Occupation", 'text', 'e.g., Software Engineer, Student', true)}
                {renderInput('nativePlace', "Native Place", 'text', 'Enter your hometown', true)}
              </div>
              
              <div className="mt-8">
                {renderTextarea('currentAddress', "Current Address", 'Enter your current address (optional)', false, 200)}
              </div>
            </div>
            
            {/* Property Preferences Section */}
            <div className="mb-12 bg-indigo-50 rounded-2xl p-8 shadow-lg">
              <div className="flex items-center mb-8">
                <div className="h-14 w-14 rounded-full bg-gradient-to-r from-blue-600 to-indigo-700 flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-slate-800">Property Preferences</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Changed to input with suggestions */}
                {renderInputWithSuggestions('preferredLocation', 'Preferred Location', locationOptions, 'Type or select location', true)}
                {renderInput('specificAreas', 'Specific Areas/Sectors (if any)', 'text', 'e.g., Sector 23, Near Metro Station')}
                
                {/* Changed to input with suggestions */}
                {renderInputWithSuggestions('occupancyType', 'Type of Occupancy', occupancyTypeOptions, 'Type or select occupancy type', true)}
                
                {/* Changed to input with suggestions */}
                {renderInputWithSuggestions('propertyType', 'Preferred Property Type', propertyTypeOptions, 'Type or select property type', true)}
                
                {renderInput('budget', 'Budget (Monthly Rent ₹)', 'number', 'Enter your budget', true)}
                {renderRadioGroup('budgetFlexibility', 'Budget Flexibility', ['Fixed', 'Negotiable'])}
              </div>
            </div>
            
            {/* Additional Requirements Section */}
            <div className="mb-12 bg-indigo-50 rounded-2xl p-8 shadow-lg">
              <div className="flex items-center mb-8">
                <div className="h-14 w-14 rounded-full bg-gradient-to-r from-blue-600 to-indigo-700 flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-slate-800">Additional Requirements</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Changed to input with suggestions */}
                {renderInputWithSuggestions('furnishingPreference', 'Furnishing Preference', furnishingOptions, 'Type or select furnishing')}
                
                {/* Changed to input with suggestions */}
                {renderInputWithSuggestions('moveInTimeframe', 'When do you plan to move in?', moveInTimeframeOptions, 'Type or select timeframe', true)}
                
                {/* Changed to input with suggestions */}
                {renderInputWithSuggestions('stayDuration', 'Expected Stay Duration', stayDurationOptions, 'Type or select duration')}
              </div>
              
              <div className="mt-8">
                {renderAmenitiesSection()}
              </div>
              
              <div className="mt-8">
                {renderTextarea('specialRequirements', 'Special Requirements or Additional Information', 'Enter any special requirements (max 300 characters)', false, 300)}
              </div>
            </div>
            
            {/* Family/Roommate Information Section */}
            <div className="mb-12 bg-indigo-50 rounded-2xl p-8 shadow-lg">
              <div className="flex items-center mb-8">
                <div className="h-14 w-14 rounded-full bg-gradient-to-r from-blue-600 to-indigo-700 flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-slate-800">Family/Roommate Information</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {renderInput('numberOfPeople', 'Number of People', 'number', 'Total number of occupants')}
                {renderRadioGroup('hasPets', 'Do you have pets?', ['Yes', 'No'])}
              </div>
            </div>
            
            {/* Previous Rental Experience Section */}
            <div className="mb-12 bg-indigo-50 rounded-2xl p-8 shadow-lg">
              <div className="flex items-center mb-8">
                <div className="h-14 w-14 rounded-full bg-gradient-to-r from-blue-600 to-indigo-700 flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-slate-800">Previous Rental Experience</h3>
              </div>
              
              <div>
                {renderTextarea('previousRentalExperience', 'Share your previous rental experience', 'Length of stay, issues, positive experiences (max 300 characters)', false, 300)}
              </div>
            </div>
            
            {/* Referral Information Section */}
            <div className="mb-10 bg-indigo-50 rounded-2xl p-8 shadow-lg">
              <div className="flex items-center mb-8">
                <div className="h-14 w-14 rounded-full bg-gradient-to-r from-blue-600 to-indigo-700 flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-slate-800">Referral Information</h3>
              </div>
              
              <div>
                {/* Changed to input with suggestions */}
                {renderInputWithSuggestions('referralSource', 'How did you hear about us?', referralSourceOptions, 'Type or select source')}
              </div>
            </div>
            
            {/* Submit Button */}
            <div className="mt-10">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-5 px-8 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-indigo-700 hover:to-purple-600 text-white font-bold rounded-xl shadow-xl transition-all duration-500 flex items-center justify-center group transform hover:scale-[1.02] cursor-pointer text-xl ${
                  isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-3 group-hover:animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    Submit Information via WhatsApp
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
        
        {/* Footer */}
        <div className="mt-12 text-center text-slate-600">
          <p>© {new Date().getFullYear()} Tenant Registration Service. All rights reserved.</p>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="fixed top-20 left-0 w-48 h-48 bg-cyan-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div className="fixed top-40 right-20 w-56 h-56 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="fixed bottom-20 left-1/3 w-52 h-52 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
    </div>
  );
};

export default TenantRegistrationForm;