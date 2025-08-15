// src/components/PrivateRoute.jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>; // Or a loading spinner
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
}