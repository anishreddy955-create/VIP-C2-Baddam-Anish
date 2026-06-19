import { FiBox } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="glass mt-8" style={{ padding: '3rem 0', borderTop: '1px solid var(--glass-border)' }}>
      <div className="container text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <FiBox size={24} className="text-muted" />
          <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            OneCart
          </h3>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
