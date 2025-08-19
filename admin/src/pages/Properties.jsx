// src/pages/Properties.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getProperties, deleteProperty } from "../api";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Properties() {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await getProperties();
        if (response && response.success) {
          setProperties(response.data);
          setFilteredProperties(response.data);
        }
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  // Filter properties based on search term
  useEffect(() => {
    const filtered = properties.filter(property =>
      property.pid.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProperties(filtered);
  }, [searchTerm, properties]);

  const handleDelete = async (id) => {
    const toastId = toast.info(
      <div>
        <p>Are you sure you want to delete this property?</p>
        <div className="flex justify-around mt-2">
          <button 
            className="px-4 py-1 bg-red-500 text-white rounded cursor-pointer"
            onClick={() => {
              toast.dismiss(toastId);
              confirmDelete(id);
            }}
          >
            Yes
          </button>
          <button 
            className="px-4 py-1 bg-green-500 text-white rounded cursor-pointer"
            onClick={() => toast.dismiss(toastId)}
          >
            No
          </button>
        </div>
      </div>,
      {
        autoClose: false,
        closeButton: false,
      }
    );
  };
  
  const confirmDelete = async (id) => {
    try {
      await deleteProperty(id);
      setProperties(properties.filter((property) => property._id !== id));
      toast.success("Property deleted successfully");
    } catch (error) {
      console.error("Error deleting property:", error);
      toast.error("Failed to delete property");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 sm:mb-0">Manage Properties</h1>
        <Link
          to="/properties/add"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg"
        >
          Add New Property
        </Link>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <input
            type="text"
            placeholder="Search by PID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {filteredProperties.length === 0 ? (
        <div className="bg-white shadow-xl rounded-xl p-8 text-center">
          <p className="text-xl text-gray-600">
            {searchTerm ? "No properties match your search" : "No properties found. Add your first property!"}
          </p>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="mt-4 text-blue-600 hover:text-blue-800 text-lg"
            >
              Clear search
            </button>
          )}
        </div>
      ) : (
        <div className="bg-white shadow-xl rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-lg font-medium text-gray-500 uppercase tracking-wider">
                    PID
                  </th>
                  <th className="px-6 py-4 text-left text-lg font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-4 text-left text-lg font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-4 text-left text-lg font-medium text-gray-500 uppercase tracking-wider">
                    Rent
                  </th>
                  <th className="px-6 py-4 text-left text-lg font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-lg font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProperties.map((property) => (
                  <tr key={property._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-lg font-medium text-gray-900">
                      {property.pid}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-lg text-gray-500">
                      {property.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-lg text-gray-500">
                      {property.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-lg text-gray-500">
                      ₹{property.price} / {property.rentPeriod || "per month"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 inline-flex text-lg leading-5 font-semibold rounded-full ${
                          property.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {property.status || "active"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-lg text-gray-500">
                      <Link
                        to={`/properties/edit/${property._id}`}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(property._id)}
                        className="text-red-600 hover:text-red-900 cursor-pointer"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
