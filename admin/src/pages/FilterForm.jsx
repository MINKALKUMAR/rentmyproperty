import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  createLocation, 
  updateLocation,
  createPropertyType,
  updatePropertyType,
  createOccupancyType,
  updateOccupancyType,
  getLocation,
  getPropertyType,
  getOccupancyType
} from '../api';

export default function FilterForm({ type }) {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();
  const isEdit = !!id;

  useEffect(() => {
    if (isEdit) {
      const fetchFilter = async () => {
        try {
          setLoading(true);
          let response;
          
          switch (type) {
            case 'location':
              response = await getLocation(id);
              break;
            case 'propertyType':
              response = await getPropertyType(id);
              break;
            case 'occupancyType':
              response = await getOccupancyType(id);
              break;
            default:
              break;
          }

          if (response?.success) {
            setName(response.data.name);
          } else {
            setError('Failed to fetch filter data');
          }
        } catch (err) {
          setError('Failed to fetch filter data');
          console.error(err);
        } finally {
          setLoading(false);
        }
      };

      fetchFilter();
    }
  }, [id, type, isEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let response;
      
      if (isEdit) {
        switch (type) {
          case 'location':
            response = await updateLocation(id, { name });
            break;
          case 'propertyType':
            response = await updatePropertyType(id, { name });
            break;
          case 'occupancyType':
            response = await updateOccupancyType(id, { name });
            break;
          default:
            break;
        }
      } else {
        switch (type) {
          case 'location':
            response = await createLocation({ name });
            break;
          case 'propertyType':
            response = await createPropertyType({ name });
            break;
          case 'occupancyType':
            response = await createOccupancyType({ name });
            break;
          default:
            break;
        }
      }

      if (response?.success) {
        navigate('/filters');
      } else {
        setError(response?.message || 'Failed to save');
      }
    } catch (err) {
      setError('Failed to save');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getTitle = () => {
    const typeMap = {
      location: 'Location',
      propertyType: 'Property Type',
      occupancyType: 'Occupancy Type'
    };
    
    return `${isEdit ? 'Edit' : 'Add New'} ${typeMap[type]}`;
  };

  if (loading && isEdit) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">{getTitle()}</h1>
        <button
          onClick={() => navigate('/filters')}
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md"
        >
          Back to Filters
        </button>
      </div>

      <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6 max-w-lg mx-auto">
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              loading ? 'opacity-75 cursor-not-allowed' : ''
            }`}
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </>
            ) : (
              'Save'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}