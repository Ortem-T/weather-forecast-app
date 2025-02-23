import { useState, useEffect } from 'react';
import axios from 'axios';
import { WeatherData } from '../types';

const useWeatherData = (city: string) => {
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchWeatherData = async () => {
            setLoading(true);
            setError(null);
            try {
                const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
                const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`);
                setWeatherData(response.data);
            } catch (err) {
                setError('Failed to fetch weather data');
            } finally {
                setLoading(false);
            }
        };

        if (city) {
            fetchWeatherData();
        }
    }, [city]);

    return { weatherData, loading, error };
};

export default useWeatherData;