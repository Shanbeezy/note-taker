const express = require('express');
const storageRoutes = require('./routes/storageRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

// Initialize the app and create a port to run on
const app = express();
const PORT = process.env.PORT || 3001;

// Set up parsing for body, static, and route middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use('/api', storageRoutes);
app.use('/notes', htmlRoutes);

// Start the server on the port
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
