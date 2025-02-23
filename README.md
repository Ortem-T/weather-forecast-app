# Weather Forecast Application

This is a weather forecast application built with React and TypeScript. It utilizes Recharts for data visualization and Axios for making API calls to OpenWeatherMap to retrieve weather data.

## Features

- User input field for entering a city to retrieve a 5-day weather forecast.
- Display of temperature graph with options to switch between different data types (pressure, humidity, wind, etc.).
- Metrics displayed on hover for better insights.
- Ability to change graph granularity (3 hours/day).
- Support for comparing weather data for multiple cities.

## Setup Instructions

1. **Clone the repository**:
   ```
   git clone https://github.com/Ortem-T/weather-forecast-app.git
   cd weather-forecast-app
   ```

2. **Install dependencies**:
   ```
   npm install
   ```

3. **Set up the API key**:
   - Create an account on [openweathermap.org](https://openweathermap.org/) and obtain your API key.
   - Create a `.env` file in the root of the project.
   - Add the following line to the `.env` file:
     ```
     REACT_APP_WEATHER_API_KEY=your_api_key_here
     ```
   - Replace `your_api_key_here` with your actual API key.

4. **Run the application**:
   ```
   npm start
   ```

## Usage

- Enter a city name in the input field to fetch the weather data.
- Use the graph to visualize different weather metrics.
- Hover over the graph to see detailed metrics.
- Add multiple cities to compare their weather forecasts.

## Technologies Used

- React
- TypeScript
- Recharts
- Axios

## License

This project is licensed under the MIT License.