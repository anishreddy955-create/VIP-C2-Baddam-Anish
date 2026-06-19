import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Portfolio = () => {
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const { data } = await axios.get('/api/portfolio', { withCredentials: true });
        setPortfolio(data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        setLoading(false);
      }
    };

    fetchPortfolio();
    const interval = setInterval(fetchPortfolio, 5000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <div className="container mt-8 text-center">Loading Portfolio...</div>;
  if (error) return <div className="container mt-8 text-center text-red-500">{error}</div>;

  return (
    <div className="container mt-8">
      <h1 className="text-3xl font-bold mb-6">My Portfolio</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="glass p-6 rounded-lg text-center">
          <h3 className="text-gray-400 text-sm mb-2">Total Portfolio Value</h3>
          <p className="text-3xl font-bold">${portfolio.totalPortfolioValue.toFixed(2)}</p>
        </div>
        <div className="glass p-6 rounded-lg text-center">
          <h3 className="text-gray-400 text-sm mb-2">Available Cash</h3>
          <p className="text-3xl font-bold text-green-400">${portfolio.balance.toFixed(2)}</p>
        </div>
        <div className="glass p-6 rounded-lg text-center">
          <h3 className="text-gray-400 text-sm mb-2">Invested Value</h3>
          <p className="text-3xl font-bold">${(portfolio.totalPortfolioValue - portfolio.balance).toFixed(2)}</p>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-4">Current Holdings</h2>
      {portfolio.holdings.length === 0 ? (
        <div className="glass p-8 text-center rounded-lg">
          <p className="text-gray-400 mb-4">You don't own any stocks yet.</p>
          <Link to="/dashboard" className="btn btn-primary">Browse Market</Link>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/20">
                <th className="p-4">Symbol</th>
                <th className="p-4">Shares</th>
                <th className="p-4">Avg Cost</th>
                <th className="p-4">Current Price</th>
                <th className="p-4">Total Value</th>
                <th className="p-4">Total Return</th>
              </tr>
            </thead>
            <tbody>
              {portfolio.holdings.map((holding) => (
                <tr key={holding._id} className="border-b border-white/10 hover:bg-white/5 transition">
                  <td className="p-4 font-bold">
                    <Link to={`/stock/${holding.stockSymbol}`} className="hover:text-primary">
                      {holding.stockSymbol}
                    </Link>
                  </td>
                  <td className="p-4">{holding.quantity}</td>
                  <td className="p-4">${holding.averagePrice.toFixed(2)}</td>
                  <td className="p-4">${holding.currentPrice.toFixed(2)}</td>
                  <td className="p-4 font-bold">${holding.currentValue.toFixed(2)}</td>
                  <td className={`p-4 font-bold ${holding.profitLoss >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {holding.profitLoss >= 0 ? '+' : ''}${holding.profitLoss.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Portfolio;
