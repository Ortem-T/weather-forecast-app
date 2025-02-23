import axios from 'axios';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const fetchWeatherForecast = async (city: string) => {
    try {
        const response = await axios.get(`${BASE_URL}/forecast`, {
            params: {
                q: city,
                appid: API_KEY,
                units: 'metric', // Change to 'imperial' for Fahrenheit
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error;
    }
};

export const fetchCityCoordinates = async (city: string) => {
    try {
        const response = await axios.get(`${BASE_URL}/weather`, {
            params: {
                q: city,
                appid: API_KEY,
            },
        });
        return response.data.coord;
    } catch (error) {
        console.error('Error fetching city coordinates:', error);
        throw error;
    }
};