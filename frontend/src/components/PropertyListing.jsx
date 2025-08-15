import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  FaMapMarkerAlt,
  FaSearch,
  FaStar,
  FaHeart,
  FaWifi,
  FaCar,
  FaSnowflake,
  FaShieldAlt,
  FaDoorOpen,
  FaTint,
  FaPlug,
  FaChair,
  FaWhatsapp,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import {
  getProperties,
  getLocations,
  getPropertyTypes,
  getOccupancyTypes,
} from "../services/api";

// Helper function to normalize amenities
const normalizeAmenities = (input) => {
  try {
    if (typeof input === "string" && input.startsWith("[")) {
      try {
        return JSON.parse(input);
      } catch (jsonError) {
        const cleaned = input.replace(/^\[|\]$/g, "").replace(/"/g, "");
        return cleaned.split(",").map((item) => item.trim());
      }
    }

    if (typeof input === "string" && input.includes(",")) {
      return input
        .split(",")
        .map((item) => item.trim().replace(/^["']|["']$/g, ""));
    }

    if (typeof input === "string") {
      return [input];
    }

    if (Array.isArray(input)) {
      return input;
    }

    return [];
  } catch (e) {
    console.error("Error parsing amenities:", input, e);
    if (typeof input === "string") {
      return input
        .split(",")
        .map((item) => item.trim().replace(/^["']|["']$/g, ""));
    }
    return [];
  }
};

const PropertyCard = ({ property }) => {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isAutoRotating, setIsAutoRotating] = useState(true);

  const {
    pid = "N/A",
    title = "Unknown Property",
    location = "Unknown Location",
    type = "N/A",
    occupancy = "N/A",
    furnished = [],
    rent = 0,
    contact = "917830063882",
    media = [],
    description = "No description available",
    amenities = [],
    rating = "N/A",
  } = property;

  const normalizedAmenities = Array.isArray(amenities)
    ? amenities.flatMap((a) => normalizeAmenities(a)).filter(Boolean)
    : normalizeAmenities(amenities).filter(Boolean);

  // Navigation functions
  const goToMedia = (index) => {
    setCurrentMediaIndex(index);
    setIsAutoRotating(false);
    setTimeout(() => setIsAutoRotating(true), 5000);
  };

  const goToPrevMedia = () => {
    setCurrentMediaIndex(prev => 
      prev === 0 ? media.length - 1 : prev - 1
    );
    setIsAutoRotating(false);
    setTimeout(() => setIsAutoRotating(true), 5000);
  };

  const goToNextMedia = () => {
    setCurrentMediaIndex(prev => 
      prev === media.length - 1 ? 0 : prev + 1
    );
    setIsAutoRotating(false);
    setTimeout(() => setIsAutoRotating(true), 5000);
  };

  useEffect(() => {
    setCurrentMediaIndex(0);
  }, [media]);

  useEffect(() => {
    if (media.length <= 1 || !isAutoRotating) return;

    const interval = setInterval(() => {
      setCurrentMediaIndex((prevIndex) =>
        prevIndex === media.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [media.length, isAutoRotating]);

  const renderMedia = () => {
    if (media.length === 0) {
      return (
        <div className="w-full h-80 bg-gray-200 border-2 border-dashed rounded-xl flex items-center justify-center text-gray-500">
          Contact For Images
        </div>
      );
    }

    const mediaItem = media[currentMediaIndex];

    return (
      <div className="relative w-full h-80 overflow-hidden">
        {mediaItem.type === "image" ? (
          <div
            className="w-full h-full bg-cover bg-center transition-all duration-700 ease-in-out"
            style={{
              backgroundImage: `url(${mediaItem.url})`,
              transform: isHovered ? "scale(1.05)" : "scale(1)",
            }}
          />
        ) : (
          <video controls className="w-full h-full object-cover">
            <source src={mediaItem.url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}

        {/* Navigation Arrows */}
        {media.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToPrevMedia();
              }}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-blue-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all"
              aria-label="Previous image"
            >
              <FaChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToNextMedia();
              }}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all"
              aria-label="Next image"
            >
              <FaChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>
    );
  };

  const renderAmenityIcon = (amenity) => {
    const normalized = amenity.toLowerCase().trim();

    switch (normalized) {
      case "ac":
      case "air conditioning":
        return <FaSnowflake className="text-blue-600 text-lg" />;
      case "furnished":
        return <FaChair className="text-blue-600 text-lg" />;
      case "parking":
      case "car parking":
        return <FaCar className="text-blue-600 text-lg" />;
      case "security":
      case "24/7 security":
        return <FaShieldAlt className="text-blue-600 text-lg" />;
      case "wifi":
      case "wi-fi":
        return <FaWifi className="text-blue-600 text-lg" />;
      case "water supply":
      case "water":
        return <FaTint className="text-blue-600 text-lg" />;
      case "power backup":
      case "generator":
        return <FaPlug className="text-blue-600 text-lg" />;
      default:
        return (
          <div className="bg-blue-100 text-blue-700 p-1.5 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        );
    }
  };

  return (
    <div
      className="bg-white rounded-2xl overflow-hidden shadow-xl border border-gray-100 transition-all duration-300 hover:shadow-2xl flex flex-col h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        {renderMedia()}

        {media.length > 1 && (
          <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
            {media.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  goToMedia(index);
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentMediaIndex === index
                    ? "bg-white w-6"
                    : "bg-white bg-opacity-50 hover:bg-opacity-75"
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        )}

        <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-full px-4 py-1.5 font-bold text-sm shadow-lg">
          ₹{rent.toLocaleString()}/month
        </div>

        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent h-20" />
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="flex items-center">
              <h3 className="text-xl font-bold text-gray-800">
                {title}
              </h3>
            </div>
            <p className="text-gray-500 text-lg flex items-center gap-1 mt-2">
              <FaMapMarkerAlt className="text-blue-600 mr-2" />
              {location}
            </p>
          </div>
          <span className="bg-blue-50 text-blue-700 text-xs font-semibold px-2.5 py-1 rounded-full">
            PID: {pid}
          </span>
        </div>

        <div className="w-full mb-5 py-4 border-y border-gray-100">
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center text-gray-700">
              <FaDoorOpen className="text-gray-500 mr-1.5" />
              <span className="font-medium mr-4">{type}</span>
            </div>

            {(Array.isArray(furnished) ? furnished : furnished
              ?.replace(/[\[\]]/g, '')
              .match(/"([^"]+)"/g)     
              ?.map(str => str.replace(/"/g, '')) 
            )?.map((item, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-blue-50 to-blue-100 px-3 py-1.5 rounded-full flex items-center shadow-sm hover:shadow-md transition duration-200"
              >
                <span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
                <span className="text-blue-700 text-sm font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {normalizedAmenities.length > 0 && (
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-700 mb-3 px-2">
              AMENITIES
            </h4>
            <div className="flex flex-wrap gap-3 px-2">
              {normalizedAmenities.map((amenity, index) => (
                <div
                  key={index}
                  className="flex items-center bg-blue-50 rounded-lg px-3 py-2"
                >
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center mr-2 shadow-sm">
                    {renderAmenityIcon(amenity)}
                  </div>
                  <span className="text-gray-700 font-medium text-sm capitalize">
                    {amenity.toLowerCase()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-auto pt-4">
          <div className="flex justify-between items-center h-12">
            <span className="bg-green-100 text-green-800 px-3 py-1.5 rounded-full text-sm font-medium flex items-center h-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
              {occupancy}
            </span>
            <button
              onClick={() => {
                const cleanLocation = location.replace(/,/g, ' - ');
                const message = encodeURIComponent(
                  `Hello, I'm interested in this property:\n\n` +
                  `*Property ID:* ${pid}\n` +
                  `*Location:* ${cleanLocation}\n` +
                  `*Type:* ${type}\n` +
                  `*Rent:* ₹${rent.toLocaleString()}/month\n\n` +
                  `Could you please share more details about this property?`
                );
                const whatsappNumber = contact || "919876543210";
                window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
              }}
              className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white px-5 py-2.5 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg flex items-center h-full whitespace-nowrap cursor-pointer"
            >
              <FaWhatsapp className="h-4 w-4 mr-2" />
              Contact Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const FilterSection = ({
  filters,
  onFilterChange,
  onSearch,
  locations,
  propertyTypes,
  occupancyTypes,
}) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onFilterChange({ [name]: value });
  };

  const handlePidSearch = (e) => {
    onSearch(e.target.value);
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl shadow-lg mb-10 border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Find Your Perfect Property
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {/* Search by PID */}
        <div className="md:col-span-3">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              onChange={handlePidSearch}
              placeholder="Search by PID (e.g. C20AV988)"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
            />
          </div>
        </div>

        {/* Location Filter */}
        <div>
          <div className="relative">
            <select
              name="location"
              value={filters.location}
              onChange={handleInputChange}
              className="w-full py-3 px-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
            >
              <option value="">All Locations</option>
              {locations.map((loc) => (
                <option key={loc._id} value={loc.name}>
                  {loc.name}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Property Type Filter */}
        <div>
          <div className="relative">
            <select
              name="propertyType"
              value={filters.propertyType}
              onChange={handleInputChange}
              className="w-full py-3 px-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
            >
              <option value="">All Types</option>
              {propertyTypes.map((type) => (
                <option key={type._id} value={type.name}>
                  {type.name}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Occupancy Filter */}
        <div>
          <div className="relative">
            <select
              name="occupancy"
              value={filters.occupancy}
              onChange={handleInputChange}
              className="w-full py-3 px-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
            >
              <option value="">All Occupancy</option>
              {occupancyTypes.map((type) => (
                <option key={type._id} value={type.name}>
                  {type.name}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Min Rent Filter */}
        <div>
          <input
            type="number"
            name="minRent"
            value={filters.minRent}
            onChange={handleInputChange}
            placeholder="Min Rent (₹)"
            className="w-full py-3 px-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
          />
        </div>

        {/* Max Rent Filter */}
        <div>
          <input
            type="number"
            name="maxRent"
            value={filters.maxRent}
            onChange={handleInputChange}
            placeholder="Max Rent (₹)"
            className="w-full py-3 px-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
          />
        </div>
      </div>
    </div>
  );
};

const PropertyListings = () => {
  const [filters, setFilters] = useState({
    location: "",
    propertyType: "",
    occupancy: "",
    minRent: "",
    maxRent: "",
  });

  const [properties, setProperties] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [locations, setLocations] = useState([]);
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [occupancyTypes, setOccupancyTypes] = useState([]);
  const [initialLoad, setInitialLoad] = useState(true);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  // Fetch filter options from backend
  const fetchFilterOptions = useCallback(async () => {
    try {
      const [locRes, ptRes, otRes] = await Promise.all([
        getLocations(),
        getPropertyTypes(),
        getOccupancyTypes(),
      ]);

      if (locRes?.success) setLocations(locRes.data);
      if (ptRes?.success) setPropertyTypes(ptRes.data);
      if (otRes?.success) setOccupancyTypes(otRes.data);
    } catch (err) {
      console.error("Error fetching filter options:", err);
    }
  }, []);

  // Transform backend data to frontend format with safety checks
  const transformProperty = useCallback((prop) => {
    const rawAmenities = prop.amenities || [];
    const normalizedAmenities = normalizeAmenities(rawAmenities);
    const flattenedAmenities = []
      .concat(...normalizedAmenities)
      .filter(Boolean)
      .map((amenity) => amenity.trim().replace(/^["']+|["']+$/g, ""));

    // Standardize the occupancy value to uppercase for consistent comparison
    const standardizedOccupancy = prop.availability
      ? prop.availability.toUpperCase()
      : "N/A";

    // Handle furnishing as an array
    let furnishedItems = [];
    if (Array.isArray(prop.furnishing)) {
      furnishedItems = prop.furnishing
        .filter(Boolean)
        .map((item) => item.trim());
    } else if (typeof prop.furnishing === "string") {
      furnishedItems = prop.furnishing
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
    } else {
      furnishedItems = ["Unfurnished"];
    }

    // If no furnishing items, default to 'Unfurnished'
    if (furnishedItems.length === 0) {
      furnishedItems = ["Unfurnished"];
    }

    return {
      pid: prop.pid || "N/A",
      title: prop.title || "Unknown Property",  // Add this line
      location: prop.location || "Unknown Location",  // Use location directly
      type: prop.type ? `${prop.type} ` : "N/A",
      occupancy: standardizedOccupancy,
      furnished: furnishedItems,
      rent: prop.price || 0,
      contact: prop.contact || "917830063882", // Ensure contact exists
      media: (prop.images || []).map((img) => ({
        type: "image",
        url: img.url || "",
      })),
      amenities: flattenedAmenities,
      rating: 4.5,
      description: prop.title || "No description available",
      status: prop.status || "active",
    };
  }, []);

  // Fetch properties from backend with current filters
  const fetchProperties = useCallback(async () => {
    try {
      setLoading(true);

      // Prepare query params - only include non-empty filters
      const params = {
        status: "active", // Only fetch active properties
      };

      if (filters.location) params.location = filters.location;
      if (filters.propertyType) params.type = filters.propertyType;
      if (filters.minRent) params.minPrice = filters.minRent;
      if (filters.maxRent) params.maxPrice = filters.maxRent;

      console.log("Fetching with params:", params);

      const response = await getProperties(params);

      if (response?.success) {
        const transformed = response.data.map(transformProperty);
        setProperties(transformed);
        setError(null);
      } else {
        throw new Error(response?.message || "Failed to fetch properties");
      }
    } catch (err) {
      setError(
        err.message || "Failed to load properties. Please try again later."
      );
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
      setInitialLoad(false);
    }
  }, [filters, transformProperty]);

  // Apply search filter on the frontend
  const filteredProperties = useMemo(() => {
    if (!properties) return [];

    let result = [...properties];

    // Filter out inactive properties
    result = result.filter((property) => property.status === "active");

    // Apply occupancy filter if present (case-insensitive)
    if (filters.occupancy) {
      const selectedOccupancy = filters.occupancy.toUpperCase();
      result = result.filter(
        (property) =>
          property.occupancy === selectedOccupancy ||
          property.occupancy === "FOR ALL"
      );
    }

    // Apply search term filter if present
    if (searchTerm) {
      result = result.filter((property) =>
        property.pid.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return result;
  }, [searchTerm, properties, filters.occupancy]);

  // Reset to first page when filters or search term change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters, searchTerm]);

  // Pagination calculations
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProperties.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);

  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Handle items per page change
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page
  };

  // Debounce filter changes to avoid too many API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!initialLoad) {
        fetchProperties();
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [filters, fetchProperties, initialLoad]);

  // Initial data fetch for filter options and properties
  useEffect(() => {
    const loadData = async () => {
      await fetchFilterOptions();
      await fetchProperties();
    };

    loadData();
  }, [fetchFilterOptions, fetchProperties]);

  const handleFilterChange = (newFilter) => {
    setFilters((prev) => ({ ...prev, ...newFilter }));
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const resetFilters = () => {
    setFilters({
      location: "",
      propertyType: "",
      occupancy: "",
      minRent: "",
      maxRent: "",
    });
    setSearchTerm("");
    setCurrentPage(1);
  };

  // Loading state
  if (loading && initialLoad) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading properties...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl text-red-500 mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-700 mb-3">
            Error Loading Properties
          </h2>
          <p className="text-gray-600 max-w-md mx-auto mb-6">{error}</p>
          <button
            onClick={fetchProperties}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-500">
              Premium Property Listings
            </span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Discover beautifully designed properties in Chandigarh's most
            sought-after locations
          </p>
        </header>

        <FilterSection
          filters={filters}
          onFilterChange={handleFilterChange}
          onSearch={handleSearch}
          locations={locations}
          propertyTypes={propertyTypes}
          occupancyTypes={occupancyTypes}
        />

        {/* Pagination top controls */}
        {!loading && filteredProperties.length > 0 && (
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 bg-white p-4 rounded-xl shadow-sm">
            <div className="flex items-center mb-3 sm:mb-0">
              <span className="text-gray-700 mr-3">Properties per page:</span>
              <select
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value={6}>6</option>
                <option value={12}>12</option>
                <option value={18}>18</option>
                <option value={24}>24</option>
              </select>
            </div>

            <div className="text-gray-700">
              Showing{" "}
              <span className="font-semibold">
                {indexOfFirstItem + 1} -{" "}
                {Math.min(indexOfLastItem, filteredProperties.length)}
              </span>{" "}
              of{" "}
              <span className="font-semibold">{filteredProperties.length}</span>{" "}
              properties
            </div>
          </div>
        )}

        {loading && !initialLoad ? (
          <div className="flex justify-center my-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        ) : filteredProperties.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center shadow-xl max-w-3xl mx-auto">
            <div className="text-6xl text-gray-200 mb-5">🏠</div>
            <h2 className="text-2xl font-bold text-gray-700 mb-3">
              No properties found
            </h2>
            <p className="text-gray-600 max-w-md mx-auto mb-6">
              We couldn't find any properties matching your criteria. Try
              adjusting your filters.
            </p>
            <button
              onClick={resetFilters}
              className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
              {currentItems.map((property) => (
                <PropertyCard key={property.pid} property={property} />
              ))}
            </div>

            {/* Pagination bottom controls */}
            <div className="mt-10 flex flex-col sm:flex-row justify-between items-center">
              <div className="mb-4 sm:mb-0 text-gray-600">
                Page <span className="font-semibold">{currentPage}</span> of{" "}
                <span className="font-semibold">{totalPages}</span>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-lg border ${
                    currentPage === 1
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white text-blue-600 hover:bg-blue-50"
                  }`}
                >
                  Previous
                </button>

                {/* Show first page */}
                {currentPage > 2 && (
                  <button
                    onClick={() => handlePageChange(1)}
                    className={`w-10 h-10 rounded-lg border ${
                      currentPage === 1
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    1
                  </button>
                )}

                {/* Show ellipsis if needed */}
                {currentPage > 3 && (
                  <span className="flex items-end px-2">...</span>
                )}

                {/* Show current page and adjacent pages */}
                {Array.from({ length: Math.min(3, totalPages) }, (_, i) => {
                  let pageNum;
                  if (currentPage === 1) {
                    pageNum = i + 1;
                  } else if (currentPage === totalPages) {
                    pageNum = totalPages - 2 + i;
                  } else {
                    pageNum = currentPage - 1 + i;
                  }

                  if (pageNum < 1 || pageNum > totalPages) return null;

                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`w-10 h-10 rounded-lg border ${
                        currentPage === pageNum
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-white text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                {/* Show ellipsis if needed */}
                {currentPage < totalPages - 2 && (
                  <span className="flex items-end px-2">...</span>
                )}

                {/* Show last page */}
                {currentPage < totalPages - 1 && totalPages > 3 && (
                  <button
                    onClick={() => handlePageChange(totalPages)}
                    className={`w-10 h-10 rounded-lg border ${
                      currentPage === totalPages
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {totalPages}
                  </button>
                )}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 rounded-lg border ${
                    currentPage === totalPages
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white text-blue-600 hover:bg-blue-50"
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PropertyListings;