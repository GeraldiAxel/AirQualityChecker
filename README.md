# Air Quality Checker

Real-time air quality monitoring application that provides current and forecasted air quality data for cities worldwide using the World Air Quality Index (WAQI) API.

## Features

- Real-time air quality data lookup for any city
- Weekly air quality forecast visualization
- Interactive map with air quality overlay
- Color-coded AQI indicators
- Default city fallback (Jakarta)
- Error handling for unavailable cities
- Responsive design

## Tech Stack

- Node.js & Express.js
- EJS templating
- Axios for HTTP requests
- Google Maps API
- WAQI API
- Bootstrap 4.6
- jQuery 3.6.4

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/AirQualityChecker.git
cd AirQualityChecker
```
2. Install dependencies:
```bash
npm install
```
3. Create .env file and add your API keys:
```bash
WAQI_API_TOKEN=your_token_here
GOOGLE_MAPS_API_KEY=your_key_here
```
4. Start the server:
```bash
node index.js
```
