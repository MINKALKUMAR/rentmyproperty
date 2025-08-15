const cors = require('cors');
const app = require('./app');
const connectDB = require('./config/db');

// Load env vars
require('dotenv').config();

// Connect to database
connectDB();
const allowedOrigins = [
  'https://rentmyproperty-frontent.onrender.com'
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
