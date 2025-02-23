import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CityInput from './components/CityInput';
import WeatherChart from './components/WeatherChart';
import './styles/App.css';

const App: React.FC = () => {
    const [cities, setCities] = useState<string[]>([]);
    const [selectedCities, setSelectedCities] = useState<string[]>([]);

    useEffect(() => {
        const fetchCityByLocation = async (latitude: number, longitude: number) => {
            try {
                const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
                const response = await axios.get(`https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${apiKey}`);
                if (response.data.length > 0) {
                    const city = response.data[0].name;
                    addCity(city);
                    setSelectedCities([city]); // Добавляем город в выбранные города только при первой загрузке
                }
            } catch (error) {
                console.error('Error fetching city by location:', error);
            }
        };

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    fetchCityByLocation(latitude, longitude);
                },
                (error) => {
                    console.error('Error getting geolocation:', error);
                }
            );
        }
    }, []);

    const addCity = (city: string) => {
        if (!cities.includes(city)) {
            setCities([...cities, city]);
        }
    };

    const toggleCitySelection = (city: string) => {
        if (selectedCities.includes(city)) {
            setSelectedCities(selectedCities.filter(selectedCity => selectedCity !== city));
        } else {
            setSelectedCities([...selectedCities, city]);
        }
    };

    return (
        <div className="App">
            <h1>Weather Forecast Application</h1>
            <CityInput onAddCity={addCity} />
            {selectedCities.length > 0 && <WeatherChart cities={selectedCities} />}
            <div>
                {cities.length > 0 && (
                    <h2>Comparing Weather Data for:</h2>
                )}
                <ul>
                    {cities.map((city, index) => (
                        <li key={index} onClick={() => toggleCitySelection(city)} style={{ cursor: 'pointer', color: selectedCities.includes(city) ? 'blue' : 'black' }}>
                            {city}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default App;