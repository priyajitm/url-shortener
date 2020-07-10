const express = require('express');
const connectDB = require('./config/db');

// Initialize Express
const app = express();

// Connect Database
connectDB();

// Initialize Middleware
app.use(express.json());
// app.use(urlencoded({ extended: false }));

// Routes
app.use('/', require('./routes/redirect'));
app.use('/api/genurl', require('./routes/genurl'));
app.use('/api/register', require('./routes/register'));
app.use('/api/login', require('./routes/login'));
app.use('/api/url', require('./routes/url'));

// app.use('/', (request, response) => response.send('Hello'));

// Start Express
const PORT = process.env.port || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
