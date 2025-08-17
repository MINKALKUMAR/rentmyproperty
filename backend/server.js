const cors = require('cors');
const app = require('./app');
const connectDB = require('./config/db');

// Load env vars
require('dotenv').config();

//I am using for Railway 
app.use('/api/properties', propertyRoutes);
app.use('/api/filters', filterRoutes);

// Connect to database
connectDB();
const allowedOrigins = [
  'https://rentmyproperty-frontend.onrender.com',  // Fixed typo
  'https://rentmyproperty.onrender.com'           // Add your other frontend URL
];
app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));


const PORT = process.env.PORT || 8000;

const server = app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});
