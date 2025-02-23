import React, { useState } from 'react';
import CityInput from './components/CityInput';
import WeatherChart from './components/WeatherChart';
import './styles/App.css';

const App: React.FC = () => {
    const [cities, setCities] = useState<string[]>([]);
    const [selectedCity, setSelectedCity] = useState<string | null>(null);

    const addCity = (city: string) => {
        if (!cities.includes(city)) {
            setCities([...cities, city]);
        }
        setSelectedCity(city);
    };

    return (
        <div className="App">
            <h1>Weather Forecast Application</h1>
            <CityInput onAddCity={addCity} />
            {selectedCity && <WeatherChart city={selectedCity} />}
            <div>
                {cities.length > 0 && (
                    <h2>Comparing Weather Data for:</h2>
                )}
                <ul>
                    {cities.map((city, index) => (
                        <li key={index}>{city}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default App;