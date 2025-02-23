import React, { useState } from 'react';

interface CityInputProps {
    onAddCity: (city: string) => void;
}

const CityInput: React.FC<CityInputProps> = ({ onAddCity }) => {
    const [city, setCity] = useState('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCity(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (city.trim()) {
            onAddCity(city.trim());
            setCity('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={city}
                onChange={handleInputChange}
                placeholder="Enter city name"
                required
            />
            <button type="submit">Get Weather</button>
        </form>
    );
};

export default CityInput;