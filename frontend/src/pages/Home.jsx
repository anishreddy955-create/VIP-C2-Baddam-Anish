import { Link } from 'react-router-dom';

const Home = () => {
  const categories = [
    { name: 'Fashion', image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&q=80', path: '/products?category=Fashion' },
    { name: 'Electronics', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&q=80', path: '/products?category=Electronics' },
    { name: 'Mobiles', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&q=80', path: '/products?category=mobiles' },
    { name: 'Groceries', image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&q=80', path: '/products?category=Groceries' },
    { name: 'Sports Equipments', image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=400&q=80', path: '/products?category=Sports-Equipment' },
  ];

  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      {/* Banner */}
      <div style={{ width: '100%', height: '300px', borderRadius: '12px', overflow: 'hidden', marginBottom: '3rem', position: 'relative' }}>
        <img 
          src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&q=80" 
          alt="OneCart Super Sale" 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{ position: 'absolute', bottom: '30px', left: 0, width: '100%', display: 'flex', justifyContent: 'center' }}>
          <Link to="/products" style={{ textDecoration: 'none' }}>
            <p style={{ fontSize: '1.2rem', margin: 0, background: '#14532d', color: '#fff', padding: '0.6rem 2.5rem', borderRadius: '30px', fontWeight: 'bold', boxShadow: '0 4px 6px rgba(0,0,0,0.3)' }}>SHOP NOW</p>
          </Link>
        </div>
      </div>

      {/* Categories */}
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1.5rem' }}>
        {categories.map((cat, index) => (
          <Link to={cat.path} key={index} style={{ textDecoration: 'none', color: 'inherit', flex: 1 }}>
            <div style={{ 
              transition: 'transform 0.2s',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1rem'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{ width: '160px', height: '160px', borderRadius: '50%', overflow: 'hidden', border: '4px solid lightblue', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', background: '#fff' }}>
                <img 
                  src={cat.image} 
                  alt={cat.name} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
              </div>
              <h3 style={{ fontSize: '1.2rem', margin: 0, fontWeight: '600', color: '#1e3a8a' }}>{cat.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
