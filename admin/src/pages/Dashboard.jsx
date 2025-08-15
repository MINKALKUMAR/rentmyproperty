// src/pages/Dashboard.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getProperties } from '../api';

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalProperties: 0,
    activeProperties: 0,
    inactiveProperties: 0,
    recentProperties: []
  });

  const { user } = useAuth();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await getProperties();
        
        if (response?.success && Array.isArray(response.data)) {
          const properties = response.data;
          const activeCount = properties.filter(p => 
            p.status === 'active' || typeof p.status === 'undefined'
          ).length;
  
          setStats({
            totalProperties: properties.length,
            activeProperties: activeCount,
            inactiveProperties: properties.filter(p => p.status === 'inactive').length,
            recentProperties: properties
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .slice(0, 3)
              .map(p => ({
                id: p._id,
                pid: p.pid,
                title: p.title,
                status: p.status || 'active'
              }))
          });
        }
      } catch (error) {
        console.error('Dashboard error:', error);
      }
    };
  
    fetchStats();
  }, []);

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-3">Total Properties</h3>
          <p className="text-4xl font-bold text-blue-600">{stats.totalProperties}</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-3">Active Properties</h3>
          <p className="text-4xl font-bold text-green-600">{stats.activeProperties}</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-3">Inactive Properties</h3>
          <p className="text-4xl font-bold text-red-600">{stats.inactiveProperties}</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-5">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          <Link
            to="/properties/add"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg"
          >
            Add New Property
          </Link>
          <Link
            to="/properties"
            className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg text-lg"
          >
            View All Properties
          </Link>
        </div>
      </div>

      {/* Recent Properties */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-5">Recently Added Properties</h2>
        
        {stats.recentProperties.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-lg font-medium text-gray-500 uppercase tracking-wider">PID</th>
                  <th className="px-6 py-4 text-left text-lg font-medium text-gray-500 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-4 text-left text-lg font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-lg font-medium text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {stats.recentProperties.map((property) => (
                  <tr key={property.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-lg font-medium text-gray-900">{property.pid}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-lg text-gray-500">{property.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-lg leading-5 font-semibold rounded-full ${
                        property.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {property.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-lg text-gray-500">
                      <Link
                        to={`/properties/edit/${property.id}`}
                        className="text-blue-600 hover:text-blue-900 text-lg"
                      >
                        View/Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-600 text-lg">No recent properties found</p>
        )}
      </div>
    </div>
  );
}