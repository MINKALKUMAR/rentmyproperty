// src/pages/Filters.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { 
  getLocations, 
  getPropertyTypes, 
  getOccupancyTypes,
  deleteLocation,
  deletePropertyType,
  deleteOccupancyType
} from "../api";

export default function Filters() {
  const [locations, setLocations] = useState([]);
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [occupancyTypes, setOccupancyTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('locations');
  const { user } = useAuth();

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const [locRes, ptRes, otRes] = await Promise.all([
          getLocations(),
          getPropertyTypes(),
          getOccupancyTypes()
        ]);

        if (locRes?.success) setLocations(locRes.data);
        if (ptRes?.success) setPropertyTypes(ptRes.data);
        if (otRes?.success) setOccupancyTypes(otRes.data);
      } catch (error) {
        console.error("Error fetching filters:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFilters();
  }, []);

  const handleDelete = async (type, id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        let response;
        switch (type) {
          case 'location':
            response = await deleteLocation(id);
            if (response.success) {
              setLocations(locations.filter(item => item._id !== id));
            }
            break;
          case 'propertyType':
            response = await deletePropertyType(id);
            if (response.success) {
              setPropertyTypes(propertyTypes.filter(item => item._id !== id));
            }
            break;
          case 'occupancyType':
            response = await deleteOccupancyType(id);
            if (response.success) {
              setOccupancyTypes(occupancyTypes.filter(item => item._id !== id));
            }
            break;
          default:
            break;
        }
      } catch (error) {
        console.error("Error deleting filter:", error);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-xl">Loading...</div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Manage Filters</h1>
      </div>

      {/* Tabs */}
      <div className="mb-8 border-b border-gray-200">
        <nav className="-mb-px flex space-x-8 overflow-x-auto">
          <button
            onClick={() => setActiveTab('locations')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-lg ${
              activeTab === 'locations'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Locations
          </button>
          <button
            onClick={() => setActiveTab('propertyTypes')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-lg ${
              activeTab === 'propertyTypes'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Property Types
          </button>
          <button
            onClick={() => setActiveTab('occupancyTypes')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-lg ${
              activeTab === 'occupancyTypes'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Occupancy Types
          </button>
        </nav>
      </div>

      {/* Add New Button */}
      <div className="mb-8">
        {activeTab === 'locations' && (
          <Link
            to="/filters/locations/add"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg"
          >
            Add New Location
          </Link>
        )}
        {activeTab === 'propertyTypes' && (
          <Link
            to="/filters/property-types/add"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg"
          >
            Add New Property Type
          </Link>
        )}
        {activeTab === 'occupancyTypes' && (
          <Link
            to="/filters/occupancy-types/add"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg"
          >
            Add New Occupancy Type
          </Link>
        )}
      </div>

      {/* Content based on active tab */}
      <div className="bg-white shadow-xl rounded-xl overflow-hidden">
        {activeTab === 'locations' && (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-lg font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-lg font-medium text-gray-500 uppercase tracking-wider">
                    Created At
                  </th>
                  <th className="px-6 py-4 text-left text-lg font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {locations.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="px-6 py-6 text-center text-lg text-gray-500">
                      No locations found
                    </td>
                  </tr>
                ) : (
                  locations.map((location) => (
                    <tr key={location._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-lg font-medium text-gray-900">
                        {location.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-lg text-gray-500">
                        {new Date(location.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-lg text-gray-500">
                        <Link
                          to={`/filters/locations/edit/${location._id}`}
                          className="text-blue-600 hover:text-blue-900 mr-4"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete('location', location._id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'propertyTypes' && (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-lg font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-lg font-medium text-gray-500 uppercase tracking-wider">
                    Created At
                  </th>
                  <th className="px-6 py-4 text-left text-lg font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {propertyTypes.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="px-6 py-6 text-center text-lg text-gray-500">
                      No property types found
                    </td>
                  </tr>
                ) : (
                  propertyTypes.map((type) => (
                    <tr key={type._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-lg font-medium text-gray-900">
                        {type.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-lg text-gray-500">
                        {new Date(type.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-lg text-gray-500">
                        <Link
                          to={`/filters/property-types/edit/${type._id}`}
                          className="text-blue-600 hover:text-blue-900 mr-4"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete('propertyType', type._id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'occupancyTypes' && (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-lg font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-lg font-medium text-gray-500 uppercase tracking-wider">
                    Created At
                  </th>
                  <th className="px-6 py-4 text-left text-lg font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {occupancyTypes.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="px-6 py-6 text-center text-lg text-gray-500">
                      No occupancy types found
                    </td>
                  </tr>
                ) : (
                  occupancyTypes.map((type) => (
                    <tr key={type._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-lg font-medium text-gray-900">
                        {type.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-lg text-gray-500">
                        {new Date(type.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-lg text-gray-500">
                        <Link
                          to={`/filters/occupancy-types/edit/${type._id}`}
                          className="text-blue-600 hover:text-blue-900 mr-4"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete('occupancyType', type._id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}