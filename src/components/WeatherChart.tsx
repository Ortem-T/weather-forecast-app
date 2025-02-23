import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';
import { WeatherData } from '../types';

interface WeatherChartProps {
    cities: string[];
}

const WeatherChart: React.FC<WeatherChartProps> = ({ cities }) => {
    const [dataType, setDataType] = useState<string>('temperature');
    const [granularity, setGranularity] = useState<string>('3h');
    const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchWeatherData = async () => {
            setLoading(true);
            setError(null);
            try {
                const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
                const data = await Promise.all(cities.map(async (city) => {
                    const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`);
                    return response.data;
                }));
                setWeatherData(data);
            } catch (err) {
                setError('Error fetching data');
            } finally {
                setLoading(false);
            }
        };

        fetchWeatherData();
    }, [cities]);

    const handleDataTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setDataType(event.target.value);
    };

    const handleGranularityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setGranularity(event.target.value);
    };

    const getChartData = (): { time: string; [key: string]: string | number }[] => {
        if (!weatherData.length) return [];
        const chartData: { [key: string]: any } = {};

        weatherData.forEach((data, cityIndex) => {
            data.list
                .filter((item: any, index: number) => granularity === '3h' || index % 8 === 0)
                .forEach((item: any) => {
                    const time = item.dt_txt;
                    if (!chartData[time]) {
                        chartData[time] = { time };
                    }
                    chartData[time][`city${cityIndex}`] = dataType === 'temperature' ? item.main.temp :
                                                           dataType === 'pressure' ? item.main.pressure :
                                                           dataType === 'humidity' ? item.main.humidity :
                                                           item.wind.speed;
                });
        });

        return Object.values(chartData);
    };

    const formatXAxis = (tickItem: string) => {
        const date = new Date(tickItem);
        return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    };

    const getYAxisLabel = () => {
        switch (dataType) {
            case 'temperature':
                return 'Temperature (°C)';
            case 'pressure':
                return 'Pressure (hPa)';
            case 'humidity':
                return 'Humidity (%)';
            case 'wind':
                return 'Wind Speed (m/s)';
            default:
                return '';
        }
    };

    return (
        <div>
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
            {error && <p>{error}</p>}
            {!loading && !error && (
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={getChartData()}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" tick={{ fontSize: 10 }} tickFormatter={formatXAxis} label={{ value: 'Time', position: 'insideBottomRight', offset: -5 }} />
                        <YAxis label={{ value: getYAxisLabel(), angle: -90, position: 'insideLeft' }} />
                        <Tooltip />
                        <Legend />
                        {cities.map((city, index) => (
                            <Line key={index} type="monotone" dataKey={`city${index}`} name={city} stroke={`#${Math.floor(Math.random()*16777215).toString(16)}`} />
                        ))}
                    </LineChart>
                </ResponsiveContainer>
            )}
        </div>
    );
};

export default WeatherChart;