const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;

// Store the latest GPS coordinates
let currentLocation = {
    latitude: 0,
    longitude: 0
};

// Middleware to parse JSON
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for frontend access

// Route to receive GPS data from ESP8266/ESP32
app.post('/api/track', (req, res) => {
    const { latitude, longitude } = req.body;
    
    if (latitude && longitude) {
        currentLocation.latitude = latitude;
        currentLocation.longitude = longitude;
        console.log(`Received Location: Latitude: ${latitude}, Longitude: ${longitude}`);
        res.status(200).send('Location updated');
    } else {
        res.status(400).send('Invalid GPS data');
    }
});

// Route for the frontend to get the current GPS location
app.get('/api/track', (req, res) => {
    res.json(currentLocation);
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
