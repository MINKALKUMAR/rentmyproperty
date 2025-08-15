import React, { useState } from 'react';

const PropertyRegistrationForm = () => {
  const ADMIN_WHATSAPP_NUMBER = "917830063882"; // Replace with your admin number
  
  const [formData, setFormData] = useState({
    ownerName: '',
    phoneNumber: '',
    email: '',
    propertyType: '',
    location: '',
    detailedLocation: '',
    monthlyRent: '',
    negotiable: '',
    allowedFor: '',
    furnishing: [],
    additionalInfo: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newFurnishingItem, setNewFurnishingItem] = useState('');

  // Property type options (can be typed or selected)
  const propertyTypeOptions = [
    'PG', 'Room with Kitchen', 'Room with Washroom', 
    '1BHK', '2BHK', '3BHK', 'Independent House'
  ];

  // Location suggestions
  const locationOptions = [
    'Chandigarh', 'Mohali', 'Panchkula',
    'Sector 22', 'Sector 35', 'Sector 17',
    'Zirakpur', 'Kharar', 'Manimajra'
  ];

  // Allowed for suggestions
  const allowedForOptions = [
    'For boys', 'For girls', 'For family', 'For All',
    'Only for working professionals', 'Students only',
    'For couples', 'For bachelors'
  ];

  // Common furnishing options
  const commonFurnishingOptions = [
    'Furniture', 'Bed', 'Wardrobe', 'Sofa', 
    'Dining Table', 'TV', 'Fridge', 'Washing Machine',
    'AC', 'Geyser', 'Modular Kitchen', 'Microwave'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const addFurnishingItem = () => {
    if (newFurnishingItem.trim() && !formData.furnishing.includes(newFurnishingItem)) {
      setFormData(prev => ({
        ...prev,
        furnishing: [...prev.furnishing, newFurnishingItem]
      }));
      setNewFurnishingItem('');
    }
  };

  const toggleFurnishingItem = (item) => {
    setFormData(prev => ({
      ...prev,
      furnishing: prev.furnishing.includes(item)
        ? prev.furnishing.filter(i => i !== item)
        : [...prev.furnishing, item]
    }));
  };

  const removeFurnishingItem = (itemToRemove) => {
    setFormData(prev => ({
      ...prev,
      furnishing: prev.furnishing.filter(item => item !== itemToRemove)
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = [
      'ownerName', 'phoneNumber', 'propertyType',
      'location', 'detailedLocation', 'monthlyRent',
      'negotiable', 'allowedFor'
    ];
    
    requiredFields.forEach(field => {
      if (!formData[field]) {
        newErrors[field] = 'This field is required';
      }
    });

    if (formData.phoneNumber && !/^[0-9]{10}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Enter a valid 10-digit number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatWhatsAppMessage = () => {
    return `*📝  PROPERTY REGISTRATION DETAILS  📝*%0A%0A` +
      `*════ OWNER DETAILS ════*%0A` +
      `👤 Name: ${formData.ownerName}%0A` +
      `📞 Phone: ${formData.phoneNumber}%0A` +
      `📧 Email: ${formData.email || 'Not provided'}%0A` +
      `%0A` +
      `*════ PROPERTY DETAILS ════*%0A` +
      `🏠 Type: ${formData.propertyType}%0A` +
      `📍 Location: ${formData.location}%0A` +
      `📌 Detailed Location: ${formData.detailedLocation}%0A` +
      `💰 Monthly Rent: ₹${formData.monthlyRent}%0A` +
      `🤝 Negotiable: ${formData.negotiable}%0A` +
      `👫 Allowed for: ${formData.allowedFor}%0A` +
      `%0A` +
      `*════ ROOM DETAILS ════*%0A` +
      `${formData.furnishing.length > 0 ? formData.furnishing.map(item => `✔️ ${item}`).join('%0A') : '• No furnishing details'}` +
      `%0A%0A` +
      `*✨ Thank you for registering your property with RentMyProperty! ✨*%0A` +
      `*We'll contact you soon to help you find the right tenants.*`;
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
    <div className="mb-6">
      <label htmlFor={id} className="block text-lg font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        value={formData[id]}
        onChange={handleChange}
        placeholder={placeholder}
        className={`w-full px-5 py-4 text-lg border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
          errors[id] ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-gray-50'
        }`}
        required={required}
      />
      {errors[id] && <p className="mt-2 text-base text-red-600">{errors[id]}</p>}
    </div>
  );

  const renderTextInputWithSuggestions = (id, label, options, placeholder, required = false) => (
    <div className="mb-6">
      <label htmlFor={id} className="block text-lg font-medium text-gray-700 mb-2">
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
        className={`w-full px-5 py-4 text-lg border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
          errors[id] ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-gray-50'
        }`}
        required={required}
      />
      <datalist id={`${id}Options`}>
        {options.map(option => (
          <option key={option} value={option} />
        ))}
      </datalist>
      {errors[id] && <p className="mt-2 text-base text-red-600">{errors[id]}</p>}
    </div>
  );

  const renderPropertyTypeInput = () => (
    <div className="mb-6">
      <label htmlFor="propertyType" className="block text-lg font-medium text-gray-700 mb-2">
        Property Type <span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        id="propertyType"
        name="propertyType"
        value={formData.propertyType}
        onChange={handleChange}
        list="propertyTypeOptions"
        placeholder="Type or select property type"
        className={`w-full px-5 py-4 text-lg border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
          errors.propertyType ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-gray-50'
        }`}
        required
      />
      <datalist id="propertyTypeOptions">
        {propertyTypeOptions.map(option => (
          <option key={option} value={option} />
        ))}
      </datalist>
      {errors.propertyType && <p className="mt-2 text-base text-red-600">{errors.propertyType}</p>}
    </div>
  );

  const renderFurnishingSection = () => (
    <div className="mb-8">
      <label className="block text-lg font-medium text-gray-700 mb-3">Furnishing *</label>
      
      {/* Selected items */}
      <div className="flex flex-wrap gap-3 mb-4">
        {formData.furnishing.map(item => (
          <div key={item} className="flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-lg">
            <span className="mr-2">{item}</span>
            <button
              type="button"
              onClick={() => removeFurnishingItem(item)}
              className="text-blue-600 hover:text-blue-800 text-xl"
            >
              &times;
            </button>
          </div>
        ))}
      </div>
      
      {/* Add new item */}
      <div className="flex mb-4">
        <input
          type="text"
          value={newFurnishingItem}
          onChange={(e) => setNewFurnishingItem(e.target.value)}
          placeholder="Add furnishing item"
          className="flex-1 px-5 py-3 text-lg border-2 border-gray-300 rounded-l-xl focus:ring-blue-500 focus:border-blue-500"
          onKeyPress={(e) => e.key === 'Enter' && addFurnishingItem()}
        />
        <button
          type="button"
          onClick={addFurnishingItem}
          className="px-6 py-3 bg-blue-600 text-white text-lg rounded-r-xl hover:bg-blue-700 transition"
        >
          Add
        </button>
      </div>
      
      {/* Common options */}
      <div className="mb-4">
        <p className="text-base text-gray-500 mb-3">Common options:</p>
        <div className="flex flex-wrap gap-3">
          {commonFurnishingOptions.map(option => (
            <button
              key={option}
              type="button"
              onClick={() => toggleFurnishingItem(option)}
              className={`px-4 py-2 text-base rounded-full ${
                formData.furnishing.includes(option)
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <div className="mx-auto w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-3">Property Registration</h1>
          <p className="text-xl text-gray-600">Fill in the details to list your property with us</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-blue-600 px-8 py-6">
            <h2 className="text-2xl font-semibold text-white">Property Information</h2>
          </div>

          <form onSubmit={handleSubmit} className="p-8 sm:p-10">
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-medium text-gray-900 mb-6 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                  Owner Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {renderInput('ownerName', "Owner's Name", 'text', 'John Doe', true)}
                  {renderInput('phoneNumber', "Phone Number", 'tel', '9876543210', true)}
                  {renderInput('email', "Email (optional)", 'email', 'john@example.com')}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-medium text-gray-900 mb-6 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                  </svg>
                  Property Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {renderPropertyTypeInput()}
                  {renderTextInputWithSuggestions(
                    'location',
                    'Location',
                    locationOptions,
                    'Enter property location',
                    true
                  )}
                  {renderInput('detailedLocation', 'Detailed Location', 'text', 'Sector 22, Near Market', true)}
                  {renderInput('monthlyRent', 'Monthly Rent (₹)', 'number', '10000', true)}
                  
                  <div className="mb-6">
                    <label className="block text-lg font-medium text-gray-700 mb-3">Negotiable? <span className="text-red-500">*</span></label>
                    <div className="flex space-x-6 mt-2">
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="negotiable"
                          value="Yes"
                          checked={formData.negotiable === 'Yes'}
                          onChange={handleChange}
                          className="h-5 w-5 text-blue-600 focus:ring-blue-500"
                          required
                        />
                        <span className="ml-3 text-gray-700 text-lg">Yes</span>
                      </label>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="negotiable"
                          value="No"
                          checked={formData.negotiable === 'No'}
                          onChange={handleChange}
                          className="h-5 w-5 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-3 text-gray-700 text-lg">No</span>
                      </label>
                    </div>
                    {errors.negotiable && <p className="mt-2 text-base text-red-600">{errors.negotiable}</p>}
                  </div>
                  
                  {renderTextInputWithSuggestions(
                    'allowedFor',
                    'Allowed For',
                    allowedForOptions,
                    'Who can rent this property?',
                    true
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-medium text-gray-900 mb-6 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                  </svg>
                  Furnishing
                </h3>
                {renderFurnishingSection()}
              </div>

              <div>
                <label htmlFor="additionalInfo" className="block text-lg font-medium text-gray-700 mb-3">
                  Additional Information
                </label>
                <textarea
                  id="additionalInfo"
                  name="additionalInfo"
                  rows={5}
                  value={formData.additionalInfo}
                  onChange={handleChange}
                  className="w-full px-5 py-4 text-lg border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 transition-all"
                  placeholder="Any other details about the property..."
                />
              </div>
            </div>

            <div className="mt-12">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 px-8 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold text-xl rounded-xl shadow-lg transition-all flex items-center justify-center ${
                  isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    Submit via WhatsApp
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PropertyRegistrationForm;