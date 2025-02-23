import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';
import useWeatherData from '../hooks/useWeatherData';

const WeatherChart: React.FC<{ city: string }> = ({ city }) => {
    const [dataType, setDataType] = useState<string>('temperature');
    const [granularity, setGranularity] = useState<string>('3h');
    const { weatherData, loading, error } = useWeatherData(city);

    const handleDataTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setDataType(event.target.value);
    };

    const handleGranularityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setGranularity(event.target.value);
    };

    const getChartData = (): { time: string; value: number }[] => {
        if (!weatherData) return [];
        return weatherData.list
            .filter((item: any, index: number) => granularity === '3h' || index % 8 === 0) // Фильтрация данных для дневной гранулярности
            .map((item: any) => ({
                time: item.dt_txt,
                value: dataType === 'temperature' ? item.main.temp :
                       dataType === 'pressure' ? item.main.pressure :
                       dataType === 'humidity' ? item.main.humidity :
                       item.wind.speed
            }));
    };

    const formatXAxis = (tickItem: string) => {
        const date = new Date(tickItem);
        return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    };

    return (
        <div>
            <h2>{city}</h2>
            <div>
                <label>
                    Data Type:
                    <select onChange={handleDataTypeChange} value={dataType}>
                        <option value="temperature">Temperature</option>
                        <option value="pressure">Pressure</option>
                        <option value="humidity">Humidity</option>
                        <option value="wind">Wind Speed</option>
                    </select>
                </label>
                <label>
                    Granularity:
                    <select onChange={handleGranularityChange} value={granularity}>
                        <option value="3h">3 Hours</option>
                        <option value="day">Day</option>
                    </select>
                </label>
            </div>
            {loading && <p>Loading...</p>}
            {error && <p>Error fetching data: {error}</p>}
            {!loading && !error && (
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={getChartData()}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" tick={{ fontSize: 10 }} tickFormatter={formatXAxis} />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="value" stroke="#8884d8" />
                    </LineChart>
                </ResponsiveContainer>
            )}
        </div>
    );
};

export default WeatherChart;