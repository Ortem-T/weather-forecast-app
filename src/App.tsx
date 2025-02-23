import React, { useState } from 'react';
import CityInput from './components/CityInput';
import WeatherChart from './components/WeatherChart';
import './styles/App.css';

const App: React.FC = () => {
    const [cities, setCities] = useState<string[]>([]);
    const [selectedCities, setSelectedCities] = useState<string[]>([]);

    const addCity = (city: string) => {
        if (!cities.includes(city)) {
            setCities([...cities, city]);
            setSelectedCities([...selectedCities, city]); // Добавляем город в выбранные города
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
            {cities.length > 0 && <WeatherChart cities={selectedCities} />}
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