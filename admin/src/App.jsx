// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Properties from "./pages/Properties";
import AddProperty from "./pages/AddProperty";
import EditProperty from "./pages/EditProperty";
import Layout from "./components/Layout";
import FilterForm from "./pages/FilterForm";
import Filters from "./pages/Filter";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            element={
              <PrivateRoute>
                <Layout />
              </PrivateRoute>
            }
          >
            <Route path="/" element={<Dashboard />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/properties/add" element={<AddProperty />} />
            <Route path="/properties/edit/:id" element={<EditProperty />} />
            <Route path="/filters" element={<Filters />} />
            <Route
              path="/filters/locations/add"
              element={<FilterForm type="location" />}
            />
            <Route
              path="/filters/locations/edit/:id"
              element={<FilterForm type="location" />}
            />
            <Route
              path="/filters/property-types/add"
              element={<FilterForm type="propertyType" />}
            />
            <Route
              path="/filters/property-types/edit/:id"
              element={<FilterForm type="propertyType" />}
            />
            <Route
              path="/filters/occupancy-types/add"
              element={<FilterForm type="occupancyType" />}
            />
            <Route
              path="/filters/occupancy-types/edit/:id"
              element={<FilterForm type="occupancyType" />}
            />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
