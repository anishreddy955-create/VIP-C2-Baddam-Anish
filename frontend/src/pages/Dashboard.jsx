import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FiTrendingUp, FiTrendingDown } from 'react-icons/fi';

const Dashboard = () => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const { data } = await axios.get('/api/stocks/live');
        setStocks(data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        setLoading(false);
      }
    };

    fetchStocks();
    // Poll every 5 seconds
    const interval = setInterval(fetchStocks, 5000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <div className="container mt-8 text-center">Loading Market Data...</div>;
  if (error) return <div className="container mt-8 text-center text-red-500">{error}</div>;

  return (
    <div className="container mt-8">
      <h1 className="text-3xl font-bold mb-6">Live Market Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stocks.map(stock => {
          const isUp = stock.currentPrice >= stock.dailyLow; // Simple mock metric
          return (
            <Link to={`/stock/${stock.symbol}`} key={stock._id} className="block">
              <div className="glass p-6 rounded-lg hover:-translate-y-1 transition duration-300">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">{stock.symbol}</h2>
                  {isUp ? <FiTrendingUp className="text-green-500" /> : <FiTrendingDown className="text-red-500" />}
                </div>
                <p className="text-gray-400 text-sm mb-2">{stock.name}</p>
                <div className="text-2xl font-bold mb-2">
                  ${stock.currentPrice.toFixed(2)}
                </div>
                <div className="text-sm flex justify-between">
                  <span className="text-gray-400">High: ${stock.dailyHigh.toFixed(2)}</span>
                  <span className="text-gray-400">Low: ${stock.dailyLow.toFixed(2)}</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
