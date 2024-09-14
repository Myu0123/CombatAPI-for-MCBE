const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 5000;

// Middlewares
app.use(express.json());

// API Endpoints
app.get('/api/v1/hello', (req, res) => {
    res.json({ message: 'Hello, World!' });
});

// Start the server
app.listen(port, () => {
    console.log(`API running at http://localhost:${port}`);
});
