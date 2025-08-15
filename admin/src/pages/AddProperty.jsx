// src/pages/AddProperty.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { createProperty } from '../api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const amenitiesOptions = ['AC', 'Furnished', 'Parking', 'Security', 'WiFi', 'Water Supply', 'Power Backup'];
const propertyTypes = ['1 RK', '1 BHK', '2 BHK', '3 BHK', '4+ BHK'];
const availabilityOptions = ['FOR ALL', 'FAMILY ONLY', 'BACHELOR ONLY'];
const furnishingOptions = [
  'Furniture', 'Bed', 'Wardrobe', 'Sofa', 
  'Dining Table', 'TV', 'Fridge', 'Washing Machine',
  'AC', 'Geyser', 'Modular Kitchen', 'Microwave'
];
const propertyTypeOptions = ['Apartment', 'Villa', 'Independent', 'PG'];
const rentPeriodOptions = ['per month', 'per week', 'per day'];
const statusOptions = ['active', 'inactive'];

export default function AddProperty() {
  const [formData, setFormData] = useState({
    pid: '',
    title: '',
    location: '',
    type: '1 RK',
    availability: 'FOR ALL',
    furnishing: [],
    propertyType: 'Apartment',
    amenities: [],
    price: '',
    rentPeriod: 'per month',
    status: 'active',
    media: []
  });

  const [furnishingInput, setFurnishingInput] = useState('');
  const [previewMedia, setPreviewMedia] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      previewMedia.forEach(item => URL.revokeObjectURL(item.preview));
    };
  }, [previewMedia]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAmenityChange = (amenity) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const handleFurnishingInputChange = (e) => {
    setFurnishingInput(e.target.value);
  };

  const addFurnishingItem = () => {
    if (furnishingInput.trim() && !formData.furnishing.includes(furnishingInput.trim())) {
      setFormData(prev => ({
        ...prev,
        furnishing: [...prev.furnishing, furnishingInput.trim()]
      }));
      setFurnishingInput('');
    }
  };

  const removeFurnishingItem = (itemToRemove) => {
    setFormData(prev => ({
      ...prev,
      furnishing: prev.furnishing.filter(item => item !== itemToRemove)
    }));
  };

  const handleFurnishingKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addFurnishingItem();
    }
  };

  const handleMediaChange = (e) => {
    const files = Array.from(e.target.files);
    
    if (!files || files.length === 0) return;
  
    const newMedia = files.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      type: file.type.startsWith('image/') ? 'image' : 'video'
    }));
    
    setPreviewMedia(prev => [...prev, ...newMedia]);
    
    setFormData(prev => ({
      ...prev,
      media: [...(prev.media || []), ...files]
    }));
  };

  const removeMedia = (index) => {
    if (!previewMedia[index]) return;
    
    URL.revokeObjectURL(previewMedia[index].preview);
    
    const newPreviews = [...previewMedia];
    newPreviews.splice(index, 1);
    setPreviewMedia(newPreviews);
    
    setFormData(prev => ({
      ...prev,
      media: (prev.media || []).filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const requiredFields = {
      pid: 'Property ID',
      title: 'Title',
      location: 'Location',
      availability: 'Availability',
      furnishing: 'Furnishing',
      propertyType: 'Property Type',
      price: 'Price'
    };
  
    const missingFields = Object.entries(requiredFields)
      .filter(([key]) => !formData[key] || (Array.isArray(formData[key]) && formData[key].length === 0))
      .map(([_, name]) => name);
  
    if (missingFields.length > 0) {
      toast.error(`Please fill in all required fields: ${missingFields.join(', ')}`);
      return;
    }
  
    setIsSubmitting(true);
    
    try {
      const formDataToSend = new FormData();
      
      formDataToSend.append('pid', formData.pid);
      formDataToSend.append('title', formData.title);
      formDataToSend.append('location', formData.location);
      formDataToSend.append('type', formData.type);
      formDataToSend.append('availability', formData.availability);
      formDataToSend.append('furnishing', JSON.stringify(formData.furnishing));
      formDataToSend.append('propertyType', formData.propertyType);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('rentPeriod', formData.rentPeriod);
      formDataToSend.append('status', formData.status);
      formDataToSend.append('amenities', JSON.stringify(formData.amenities));
      
      if (Array.isArray(formData.media)) {
        formData.media.forEach(file => {
          formDataToSend.append('images', file);
        });
      }
  
      const response = await createProperty(formDataToSend);
      toast.success('Property added successfully!');
      navigate('/properties');
    } catch (error) {
      console.error('Submission error:', error);
      toast.error(error.response?.data?.error || 'Failed to add property');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex flex-col items-center">
            <div className="bg-blue-600 p-5 sm:p-6 rounded-2xl shadow-xl mb-5 sm:mb-8 transform transition-transform duration-300 hover:scale-105">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 sm:h-16 sm:w-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold text-gray-800 mb-3">
              Add New Property
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Fill in the details to list your property
            </p>
            <div className="mt-5 w-32 h-1.5 bg-blue-600 rounded-full"></div>
          </div>
        </div>

        <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl overflow-hidden">
          <div className="bg-blue-600 py-5 sm:py-6 px-5 sm:px-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between">
              <div className="mb-4 sm:mb-0">
                <h2 className="text-2xl sm:text-3xl font-bold text-white">Property Details</h2>
                <p className="text-blue-100 mt-2 text-lg sm:text-xl">Complete all required fields</p>
              </div>
              <button
                onClick={() => navigate('/properties')}
                className="px-5 py-2.5 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors text-lg"
              >
                Back to Properties
              </button>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="p-5 sm:p-7 md:p-9">
            <div className="grid grid-cols-1 gap-7 sm:gap-9">
              {/* Basic Information Section */}
              <div className="space-y-5 sm:space-y-7 bg-blue-50 rounded-xl p-5 sm:p-7 shadow-sm">
                <div className="flex items-center mb-4 sm:mb-5">
                  <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-blue-600 flex items-center justify-center mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-7 sm:w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-800">Basic Information</h3>
                </div>
                
                <InputField
                  label="PID (Property ID)"
                  name="pid"
                  value={formData.pid}
                  onChange={handleChange}
                  required
                  icon={
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  }
                />

                <InputField
                  label="Title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  icon={
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  }
                />

                <InputField
                  label="Location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  icon={
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  }
                />

                <SelectField
                  label="Property Type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  options={propertyTypes}
                  required
                />
              </div>

              {/* Rental Information Section */}
              <div className="space-y-5 sm:space-y-7 bg-blue-50 rounded-xl p-5 sm:p-7 shadow-sm">
                <div className="flex items-center mb-4 sm:mb-5">
                  <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-blue-600 flex items-center justify-center mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-7 sm:w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-800">Rental Information</h3>
                </div>
                
                <InputField
                  label="Availability"
                  name="availability"
                  value={formData.availability}
                  onChange={handleChange}
                  required
                  placeholder="e.g. For Boys"
                  icon={
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  }
                />

                {/* Furnishing Section */}
                <div className="space-y-4">
                  <label className="block text-lg font-medium text-gray-700">
                    Furnishing
                    <span className="text-red-500"> *</span>
                  </label>
                  
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={furnishingInput}
                      onChange={handleFurnishingInputChange}
                      onKeyPress={handleFurnishingKeyPress}
                      placeholder="Add furnishing item"
                      className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
                    />
                    <button
                      type="button"
                      onClick={addFurnishingItem}
                      className="px-4 py-2.5 sm:px-5 sm:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-lg"
                    >
                      Add
                    </button>
                  </div>

                  {formData.furnishing.length > 0 && (
                    <div className="flex flex-wrap gap-3 mt-3">
                      {formData.furnishing.map((item, index) => (
                        <div key={index} className="flex items-center bg-blue-100 rounded-full px-4 py-2">
                          <span className="text-base sm:text-lg text-blue-800">{item}</span>
                          <button
                            type="button"
                            onClick={() => removeFurnishingItem(item)}
                            className="ml-3 text-blue-600 hover:text-blue-800"
                          >
                            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="mt-4">
                    <p className="text-base text-gray-500 mb-3">Common options:</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {furnishingOptions.map(item => (
                        <button
                          type="button"
                          key={item}
                          onClick={() => {
                            if (!formData.furnishing.includes(item)) {
                              setFormData(prev => ({
                                ...prev,
                                furnishing: [...prev.furnishing, item]
                              }));
                            }
                          }}
                          disabled={formData.furnishing.includes(item)}
                          className={`px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg text-base sm:text-lg text-center transition-colors ${
                            formData.furnishing.includes(item)
                              ? 'bg-blue-600 text-white cursor-default'
                              : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                          }`}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <InputField
                  label="Property Type"
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Apartment"
                  icon={
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  }
                />

                <InputField
                  label="Rent Amount (₹)"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  icon={
                    <span className="text-gray-500 text-lg">₹</span>
                  }
                />

                <SelectField
                  label="Rent Period"
                  name="rentPeriod"
                  value={formData.rentPeriod}
                  onChange={handleChange}
                  options={rentPeriodOptions}
                  required
                />
              </div>

              {/* Amenities Section */}
              <div className="space-y-5 sm:space-y-7 bg-blue-50 rounded-xl p-5 sm:p-7 shadow-sm">
                <div className="flex items-center mb-4 sm:mb-5">
                  <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-blue-600 flex items-center justify-center mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-7 sm:w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-800">Amenities</h3>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
                  {amenitiesOptions.map(amenity => (
                    <label key={amenity} className="inline-flex items-center bg-white rounded-lg p-4 cursor-pointer hover:bg-blue-100 transition-colors border border-gray-200">
                      <input
                        type="checkbox"
                        id={`amenity-${amenity}`}
                        checked={formData.amenities.includes(amenity)}
                        onChange={() => handleAmenityChange(amenity)}
                        className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="ml-3 text-base sm:text-lg text-gray-700 font-medium">{amenity}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Media Upload Section */}
              <div className="space-y-5 sm:space-y-7 bg-blue-50 rounded-xl p-5 sm:p-7 shadow-sm">
                <div className="flex items-center mb-4 sm:mb-5">
                  <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-blue-600 flex items-center justify-center mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-7 sm:w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-800">Property Media</h3>
                </div>
                
                <div className="space-y-5">
                  <div>
                    <label className="block text-lg font-medium text-gray-700 mb-3">
                      Upload Images/Videos
                    </label>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                      <label className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg border border-blue-700 transition-colors flex items-center justify-center text-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        Choose Files
                        <input
                          type="file"
                          multiple
                          onChange={handleMediaChange}
                          className="hidden"
                          accept="image/*,video/*"
                        />
                      </label>
                      <span className="text-lg text-gray-500 text-center sm:text-left">
                        {formData.media.length > 0 ? `${formData.media.length} files selected` : 'No files selected'}
                      </span>
                    </div>
                  </div>

                  {previewMedia.length > 0 && (
                    <div>
                      <h3 className="text-lg font-medium text-gray-700 mb-3">Preview:</h3>
                      <div className="flex flex-wrap gap-4">
                        {previewMedia.map((item, index) => (
                          <div key={index} className="relative group">
                            {item.type === 'image' ? (
                              <img
                                src={item.preview}
                                alt={`Preview ${index + 1}`}
                                className="h-24 w-24 sm:h-32 sm:w-32 object-cover rounded-lg border border-gray-200"
                              />
                            ) : (
                              <div className="h-24 w-24 sm:h-32 sm:w-32 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center">
                                <svg className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                              </div>
                            )}
                            <button
                              type="button"
                              onClick={() => removeMedia(index)}
                              className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Status Section */}
              <div className="space-y-5 sm:space-y-7 bg-blue-50 rounded-xl p-5 sm:p-7 shadow-sm">
                <div className="flex items-center mb-4 sm:mb-5">
                  <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-blue-600 flex items-center justify-center mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-7 sm:w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-800">Status</h3>
                </div>
                
                <SelectField
                  label="Property Status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  options={statusOptions}
                  required
                />
              </div>
            </div>

            <div className="mt-8 sm:mt-10 flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-7 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-lg shadow-md transition-all duration-300 flex items-center text-lg ${
                  isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Adding Property...
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add Property
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// Reusable Input Component
function InputField({ label, name, type = 'text', value, onChange, required = false, icon, placeholder = '' }) {
  return (
    <div className="relative">
      <label className="block text-lg font-medium text-gray-700 mb-2">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full ${icon ? 'pl-11' : 'pl-4'} pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-white text-lg`}
          required={required}
        />
      </div>
    </div>
  );
}

// Reusable Select Component
function SelectField({ label, name, value, onChange, options, required = false }) {
  return (
    <div className="relative">
      <label className="block text-lg font-medium text-gray-700 mb-2">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      <div className="relative">
        <select
          name={name}
          value={value}
          onChange={onChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition appearance-none bg-white text-lg"
          required={required}
        >
          {options.map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <svg className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
    </div>
  );
}