import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const StockDetail = () => {
  const { symbol } = useParams();
  const navigate = useNavigate();
  const [stock, setStock] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tradeMessage, setTradeMessage] = useState('');

  useEffect(() => {
    const fetchStock = async () => {
      try {
        const { data } = await axios.get(`/api/stocks/live`);
        const found = data.find(s => s.symbol === symbol);
        if (found) {
          setStock(found);
        } else {
          setError('Stock not found');
        }
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        setLoading(false);
      }
    };

    fetchStock();
    const interval = setInterval(fetchStock, 5000);
    return () => clearInterval(interval);
  }, [symbol]);

  const handleTrade = async (type) => {
    try {
      setTradeMessage('');
      const config = {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      };
      await axios.post(`/api/trades/${type.toLowerCase()}`, {
        stockSymbol: symbol,
        quantity: Number(quantity)
      }, config);
      setTradeMessage(`Successfully ${type.toLowerCase()}ed ${quantity} shares of ${symbol}`);
    } catch (err) {
      setTradeMessage(`Error: ${err.response?.data?.message || err.message}`);
    }
  };

  if (loading) return <div className="container mt-8 text-center">Loading...</div>;
  if (error) return <div className="container mt-8 text-center text-red-500">{error}</div>;

  const chartData = {
    labels: ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', 'Now'],
    datasets: [
      {
        label: `${symbol} Price`,
        data: [
          stock.dailyLow,
          stock.dailyLow + (stock.currentPrice - stock.dailyLow) * 0.2,
          stock.dailyHigh - (stock.dailyHigh - stock.currentPrice) * 0.5,
          stock.currentPrice * 0.98,
          stock.dailyHigh * 0.99,
          stock.currentPrice * 1.01,
          stock.currentPrice
        ],
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="container mt-8">
      <button onClick={() => navigate('/dashboard')} className="mb-4 text-primary hover:underline">&larr; Back to Dashboard</button>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass p-6 rounded-lg">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold">{stock.name} ({stock.symbol})</h1>
              <p className="text-gray-400 text-sm">Volume: {stock.volume}</p>
            </div>
            <div className="text-right">
              <h2 className="text-4xl font-bold">${stock.currentPrice.toFixed(2)}</h2>
            </div>
          </div>
          
          <div className="bg-white/5 p-4 rounded-lg">
            <Line data={chartData} options={{ responsive: true, maintainAspectRatio: false }} height={300} />
          </div>
        </div>

        <div className="glass p-6 rounded-lg h-fit">
          <h3 className="text-xl font-bold mb-4">Trade {symbol}</h3>
          
          {tradeMessage && (
            <div className={`p-3 mb-4 rounded ${tradeMessage.startsWith('Error') ? 'bg-red-500/20 text-red-200' : 'bg-green-500/20 text-green-200'}`}>
              {tradeMessage}
            </div>
          )}

          <div className="mb-4">
            <label className="block text-sm text-gray-400 mb-2">Quantity</label>
            <input 
              type="number" 
              min="1" 
              value={quantity} 
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded p-2 text-white"
            />
          </div>

          <div className="flex justify-between mb-6 text-sm">
            <span>Estimated Total:</span>
            <span className="font-bold">${(stock.currentPrice * quantity).toFixed(2)}</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => handleTrade('BUY')}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition"
            >
              Buy
            </button>
            <button 
              onClick={() => handleTrade('SELL')}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition"
            >
              Sell
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockDetail;
