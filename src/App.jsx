import React, { useState, useMemo, useEffect } from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import { motion, AnimatePresence, LayoutGroup, useScroll, useTransform } from 'framer-motion';
import { ShaderAnimation } from './components/ui/shader-lines';
import { SplineScene } from './components/ui/spline';
import { AIChat } from './components/ui/AIChat';
import About from './pages/About';
import Auth from './pages/Auth';
import { 
  ShoppingCart, 
  Sparkles, 
  Settings, 
  Plus,
  Check,
  Key,
  Trash2,
  TrendingUp,
  History,
  Moon,
  Sun,
  BarChart as BarChartIcon
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';
import './index.css';

// Extended Mock Data
// Extended Mock Data - Indian Groceries
const ALL_PRODUCTS = [
  { id: 1, name: 'Premium Basmati Rice', category: 'Grains', image: 'https://images.unsplash.com/photo-1586201375761-83865001e8ac?w=400&q=80', price: 12.49, pairsWith: [2, 6, 10] },
  { id: 2, name: 'Toor Dal (Pigeon Peas)', category: 'Pulses', image: 'https://images.unsplash.com/photo-1585996838426-60de5139cd32?w=400&q=80', price: 4.99, pairsWith: [1, 3, 9] },
  { id: 3, name: 'Pure Desi Ghee', category: 'Dairy', image: 'https://images.unsplash.com/photo-1631515243349-e1cb7544519d?w=400&q=80', price: 18.99, pairsWith: [4, 1, 2] },
  { id: 4, name: 'Ashirvaad Atta', category: 'Flour', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&q=80', price: 9.49, pairsWith: [3, 19, 20] },
  { id: 5, name: 'Alphonso Mangoes', category: 'Produce', image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=400&q=80', price: 15.50, pairsWith: [9, 21] },
  { id: 6, name: 'Turmeric Powder', category: 'Spices', image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400&q=80', price: 2.99, pairsWith: [1, 2, 7] },
  { id: 7, name: 'Fresh Paneer', category: 'Dairy', image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&q=80', price: 5.99, pairsWith: [8, 23, 24] },
  { id: 8, name: 'Green Chilies', category: 'Produce', image: 'https://images.unsplash.com/photo-1588253518679-119c8ca9d8b2?w=400&q=80', price: 1.49, pairsWith: [7, 20, 24] },
  { id: 9, name: 'Masala Chai Gold', category: 'Beverages', image: 'https://images.unsplash.com/photo-1544787210-2211d74fc44c?w=400&q=80', price: 6.99, pairsWith: [10, 15] },
  { id: 10, name: 'Parle-G Biscuits', category: 'Snacks', image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&q=80', price: 0.99, pairsWith: [9] },
  { id: 11, name: 'Red Onions', category: 'Produce', image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=400&q=80', price: 3.99, pairsWith: [8, 18, 12] },
  { id: 12, name: 'Ginger & Garlic Paste', category: 'Pantry', image: 'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=400&q=80', price: 4.49, pairsWith: [7, 1, 2] },
  { id: 13, name: 'Kashmiri Red Chili', category: 'Spices', image: 'https://images.unsplash.com/photo-1599481238505-b8b0537a3f77?w=400&q=80', price: 3.49, pairsWith: [6, 12] },
  { id: 14, name: 'Saffron (Kesar)', category: 'Spices', image: 'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=400&q=80', price: 25.00, pairsWith: [3, 1] },
  { id: 15, name: 'Samosa Crust Mix', category: 'Pantry', image: 'https://images.unsplash.com/photo-1601050690597-df056fb1d745?w=400&q=80', price: 4.99, pairsWith: [9, 10] },
  { id: 16, name: 'Mustard Oil', category: 'Oils', image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&q=80', price: 7.99, pairsWith: [1, 13] },
  { id: 17, name: 'Amul Butter', category: 'Dairy', image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=400&q=80', price: 5.49, pairsWith: [4, 15] },
  { id: 18, name: 'Fresh Cilantro', category: 'Produce', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400&q=80', price: 0.99, pairsWith: [11, 8, 7] },
  { id: 19, name: 'Greek Yogurt (Curd)', category: 'Dairy', image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&q=80', price: 3.49, pairsWith: [1, 21] },
  { id: 20, name: 'Cumin Seeds (Jeera)', category: 'Spices', image: 'https://images.unsplash.com/photo-1599481238505-b8b0537a3f77?w=400&q=80', price: 2.49, pairsWith: [1, 2, 6] },
  { id: 21, name: 'Gulab Jamun Mix', category: 'Sweets', image: 'https://images.unsplash.com/photo-1589119908995-c6800faecf39?w=400&q=80', price: 5.99, pairsWith: [3, 14] },
  { id: 22, name: 'Basmati Rice (Extra Long)', category: 'Grains', image: 'https://images.unsplash.com/photo-1586201375761-83865001e8ac?w=400&q=80', price: 14.99, pairsWith: [2, 6, 12] },
  { id: 23, name: 'Curry Leaves', category: 'Produce', image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=400&q=80', price: 0.99, pairsWith: [2, 16] },
  { id: 24, name: 'Cashews', category: 'Dry Fruits', image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&q=80', price: 12.99, pairsWith: [14, 21] },
];

const MOCK_PAST_ORDERS = [
  {
    id: 'ORD-001',
    date: 'Oct 24, 2023',
    total: '$84.50',
    items: [1, 2, 4, 5, 7]
  },
  {
    id: 'ORD-002',
    date: 'Oct 17, 2023',
    total: '$112.30',
    items: [3, 8, 18, 17, 9, 10]
  },
  {
    id: 'ORD-003',
    date: 'Oct 10, 2023',
    total: '$65.20',
    items: [6, 3, 16, 15]
  }
];

// Determine purchase frequency for cold start
const purchaseHistoryCount = {};
MOCK_PAST_ORDERS.forEach(order => {
  order.items.forEach(itemId => {
    purchaseHistoryCount[itemId] = (purchaseHistoryCount[itemId] || 0) + 1;
  });
});



function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('auth') === 'true');
  const [isLightMode, setIsLightMode] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [showApiModal, setShowApiModal] = useState(false);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isLightMode) {
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
    }
  }, [isLightMode]);

  const handleAddToCart = (item) => {
    if (!cart.find(i => i.id === item.id)) {
      setCart(prev => [...prev, item]);
    }
  };

  const handleRemoveFromCart = (itemId) => {
    setCart(prev => prev.filter(i => i.id !== itemId));
  };

  const handleSaveApiKey = (e) => {
    e.preventDefault();
    setShowApiModal(false);
  };

  // Generate Suggestions based on Context (Cold Start vs Active Cart)
  const suggestions = useMemo(() => {
    let suggestedItems = [];
    
    if (cart.length === 0) {
      // Cold Start: Suggest frequently bought items and recent history
      const sortedHistory = Object.entries(purchaseHistoryCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 8);
      
      suggestedItems = sortedHistory.map(([id]) => {
        const item = ALL_PRODUCTS.find(p => p.id === parseInt(id));
        return { ...item, reason: 'Frequently bought', reasonType: 'history' };
      });

      // Pad with some random popular items if history is small
      if (suggestedItems.length < 8) {
        const padding = ALL_PRODUCTS.filter(p => !suggestedItems.find(s => s.id === p.id)).slice(0, 8 - suggestedItems.length);
        suggestedItems = [...suggestedItems, ...padding.map(p => ({ ...p, reason: 'Popular choice', reasonType: 'trending' }))];
      }
    } else {
      // Active Cart: Suggest pairings based on current cart items
      const pairedIds = new Set();
      cart.forEach(cartItem => {
        if (cartItem.pairsWith) {
          cartItem.pairsWith.forEach(id => pairedIds.add(id));
        }
      });

      const pairings = Array.from(pairedIds)
        .filter(id => !cart.find(c => c.id === id)) // Don't suggest what's already in cart
        .map(id => {
          const item = ALL_PRODUCTS.find(p => p.id === id);
          const matchedCartItem = cart.find(c => c.pairsWith?.includes(id));
          return { ...item, reason: `Pairs well with ${matchedCartItem.name}`, reasonType: 'pairing' };
        });

      // Mix in some history items to fill the grid
      const historyIds = Object.keys(purchaseHistoryCount)
        .map(id => parseInt(id))
        .filter(id => !cart.find(c => c.id === id) && !pairings.find(p => p.id === id));
      
      const historyMix = historyIds.slice(0, Math.max(0, 8 - pairings.length)).map(id => {
         const item = ALL_PRODUCTS.find(p => p.id === id);
         return { ...item, reason: 'Based on your history', reasonType: 'history' };
      });

      suggestedItems = [...pairings, ...historyMix].slice(0, 8);
    }

    return suggestedItems;
  }, [cart]);

  const chartData = useMemo(() => {
    return Object.entries(purchaseHistoryCount)
      .map(([id, count]) => ({
        name: ALL_PRODUCTS.find(p => p.id === parseInt(id))?.name || 'Unknown',
        count: count
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8);
  }, []);

  const spendingData = [
    { month: 'May', spent: 420 },
    { month: 'Jun', spent: 380 },
    { month: 'Jul', spent: 510 },
    { month: 'Aug', spent: 460 },
    { month: 'Sep', spent: 590 },
    { month: 'Oct', spent: 630 },
  ];

  const replenishmentAlerts = useMemo(() => {
    return Object.entries(purchaseHistoryCount)
      .filter(([id, count]) => count >= 2)
      .map(([id]) => ALL_PRODUCTS.find(p => p.id === parseInt(id)))
      .slice(0, 3);
  }, []);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip glass-panel" style={{ padding: '10px 15px', border: '1px solid rgba(255,255,255,0.1)' }}>
          <p className="label" style={{ fontWeight: 'bold', marginBottom: '5px' }}>{label}</p>
          <p className="intro" style={{ color: 'var(--primary-light)' }}>
            {payload[0].name === 'spent' ? `$${payload[0].value}` : `${payload[0].value} purchases`}
          </p>
        </div>
      );
    }
    return null;
  };

  // Framer Motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    show: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 24 } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } }
  };

  return (
    <>
      <ShaderAnimation isLightMode={isLightMode} />
      <div className="parallax-bg">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>
      <nav className="navbar">

        <div className="container navbar-content">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <Link to="/" className="logo">
              <motion.div
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.3 }}
              >
                <ShoppingCart className="logo-icon" size={28} />
              </motion.div>
              <span className="logo-text">SmartGrocery</span>
            </Link>
          </motion.div>
          <div className="nav-links-container">
            <div className="nav-links hidden-mobile">
              <Link to="/about" style={{ textDecoration: 'none', color: 'var(--text-main)', transition: 'color 0.2s' }}>About Us</Link>
              {isAuthenticated ? (
                <button 
                  onClick={() => {
                    localStorage.removeItem('auth');
                    setIsAuthenticated(false);
                  }}
                  style={{ background: 'none', border: 'none', color: 'var(--text-main)', transition: 'color 0.2s', cursor: 'pointer', fontSize: '1rem', fontWeight: 600, padding: 0 }}
                >
                  Sign Out
                </button>
              ) : (
                <Link to="/login" style={{ textDecoration: 'none', color: 'var(--text-main)', transition: 'color 0.2s' }}>Sign In</Link>
              )}
            </div>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <button 
                onClick={() => setIsLightMode(!isLightMode)}
                style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-main)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                title="Toggle Theme"
              >
                {isLightMode ? <Moon size={20} /> : <Sun size={20} />}
              </button>
              <motion.button 
              className="btn btn-outline"
              onClick={() => setShowApiModal(true)}
              title="Set AI API Key"
              whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(220, 38, 38, 0.4)" }}
              whileTap={{ scale: 0.95 }}
            >
              <Key size={18} />
              <span className="hidden-mobile">API Key</span>
            </motion.button>
            <div style={{ position: 'relative' }}>
              <motion.button 
                className="btn btn-primary"
                onClick={() => setShowCart(!showCart)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ShoppingCart size={18} />
                <span>Cart</span>
              </motion.button>
              <AnimatePresence>
                {cart.length > 0 && (
                  <motion.span 
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 180 }}
                    transition={{ type: "spring", bounce: 0.6 }}
                    className="cart-badge"
                  >
                    {cart.length}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Slide-out Cart */}
      <AnimatePresence>
        {showCart && (
          <>
            <motion.div 
              className="cart-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCart(false)}
            />
            <motion.div 
              className="cart-sidebar glass-panel"
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div className="cart-header">
                <h2>Your Cart</h2>
                <button className="close-btn" onClick={() => setShowCart(false)}>×</button>
              </div>
              <div className="cart-items">
                <AnimatePresence mode="popLayout">
                  {cart.length === 0 ? (
                    <motion.div 
                      className="empty-cart"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <ShoppingCart size={48} opacity={0.2} />
                      <p>Your cart is empty</p>
                    </motion.div>
                  ) : (
                    cart.map(item => (
                      <motion.div 
                        key={item.id} 
                        layout
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20, scale: 0.9 }}
                        className="cart-item"
                      >
                        <div className="cart-item-image-container">
                          <img src={item.image} alt={item.name} className="cart-item-image" />
                        </div>
                        <div className="cart-item-details">
                          <h4>{item.name}</h4>
                          <span className="cart-item-price">${item.price.toFixed(2)}</span>
                        </div>
                        <motion.button 
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="btn-remove" 
                          onClick={() => handleRemoveFromCart(item.id)}
                        >
                          <Trash2 size={16} />
                        </motion.button>
                      </motion.div>
                    ))
                  )}
                </AnimatePresence>
              </div>
              {cart.length > 0 && (
                <div className="cart-footer">
                  <div className="cart-total">
                    <span>Total:</span>
                    <span>${cart.reduce((acc, item) => acc + item.price, 0).toFixed(2)}</span>
                  </div>
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn btn-primary" 
                    style={{ width: '100%', marginBottom: '0.75rem' }}
                  >
                    Checkout
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.02, backgroundColor: 'rgba(139, 92, 246, 0.2)' }}
                    whileTap={{ scale: 0.98 }}
                    className="btn btn-outline" 
                    style={{ width: '100%', borderColor: 'var(--primary)', color: 'var(--primary)', display: 'flex', gap: '0.5rem' }}
                  >
                    <Sparkles size={16} />
                    AI Meal Planner
                  </motion.button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Routes>
        <Route path="/" element={
          isAuthenticated ? (
          <main>
        <div className="hero-container" style={{ backgroundColor: 'transparent' }}>
          <div className="hero-overlay" style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', padding: '2rem 5%', gap: '2rem' }}>
            
            {/* Left Content */}
            <div style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left', zIndex: 10 }}>
              <div className="hero-badge-wrapper animate-fade-in-down" style={{ marginBottom: '1.5rem' }}>
                <div className="hero-badge">
                  <div style={{ display: 'flex' }}>
                    <span style={{ color: '#fde047' }}>✨</span>
                    <span style={{ color: '#fb923c' }}>🛒</span>
                  </div>
                  <span style={{ color: '#ffedd5' }}>Powered by advanced AI suggestions.</span>
                </div>
              </div>

              <div className="hero-content" style={{ alignItems: 'flex-start', textAlign: 'left', margin: 0, padding: 0 }}>
                <div>
                  <h1 className="hero-headline-1 animate-fade-in-up animation-delay-200">
                    Intelligent
                  </h1>
                  <h1 className="hero-headline-2 animate-fade-in-up animation-delay-400">
                    Grocery Planning
                  </h1>
                </div>
                
                <div className="animate-fade-in-up animation-delay-600">
                  <p className="hero-subtitle" style={{ textAlign: 'left', margin: '1rem 0' }}>
                    We analyze your past purchases and current cart to predict exactly what you need. Experience the future of seamless shopping.
                  </p>
                </div>
                
                <div className="hero-buttons animate-fade-in-up animation-delay-800" style={{ justifyContent: 'flex-start', marginTop: '1rem' }}>
                  <button onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })} className="hero-btn-primary">
                    Start Shopping
                  </button>
                </div>
              </div>
            </div>

            {/* Right Content - Spline (Desktop Only) */}
            {isDesktop && (
              <div style={{ 
                flex: '1 1 400px', 
                height: '100%', 
                position: 'relative', 
                minHeight: '500px', 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center',
                WebkitMaskImage: 'linear-gradient(to bottom, black 75%, transparent 100%)',
                maskImage: 'linear-gradient(to bottom, black 75%, transparent 100%)'
              }}>
                <SplineScene 
                  scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                  className="spline-canvas"
                />
              </div>
            )}
            
          </div>
        </div>

        <div className="container dashboard-grid" style={{ paddingTop: '4rem' }}>
          {/* Sidebar - Past Orders */}
          <motion.aside 
            className="glass-panel past-orders"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: 'spring', bounce: 0.4, delay: 0.3 }}
          >
            <h2 className="section-title">
              <History size={20} className="logo-icon" />
              Purchase History
            </h2>
            
            <LayoutGroup>
              <motion.div 
                layout
                style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}
              >
                {MOCK_PAST_ORDERS.map((order, idx) => (
                  <motion.div 
                    layout
                    key={order.id}
                    className="order-item"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + (idx * 0.1), type: 'spring' }}
                    whileHover={{ scale: 1.02, backgroundColor: 'rgba(220, 38, 38, 0.05)' }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="order-header">
                      <span className="order-date">{order.date}</span>
                      <span className="order-total">{order.total}</span>
                    </div>
                    <div className="order-items-list">
                      {order.items.slice(0, 3).map(id => ALL_PRODUCTS.find(p => p.id === id)?.name).join(', ')}
                      {order.items.length > 3 && ` +${order.items.length - 3} more`}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </LayoutGroup>
          </motion.aside>

          {/* Main Area - Suggestions */}
          <motion.section 
            className="glass-panel suggestions-panel"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', bounce: 0.3, delay: 0.4 }}
          >
            <div className="suggestions-header">
              <motion.div layout>
                <motion.h2 layout>Smart Suggestions</motion.h2>
                <motion.p layout style={{ color: 'var(--text-muted)' }}>
                  {cart.length === 0 
                    ? "Based on your 3-month purchase history" 
                    : "Curated pairings for your current cart"}
                </motion.p>
              </motion.div>
              <motion.div whileHover={{ rotate: 90 }} transition={{ type: 'spring' }}>
                <Settings size={24} color="var(--text-muted)" style={{ cursor: 'pointer' }} />
              </motion.div>
            </div>

            <motion.div 
              className="ai-status"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <div className="ai-status-text">
                <Sparkles size={20} />
                <AnimatePresence mode="wait">
                  <motion.span
                    key={cart.length === 0 ? 'history' : 'cart'}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    {cart.length === 0 ? "Analyzing History..." : "Analyzing Cart Combinations..."}
                  </motion.span>
                </AnimatePresence>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                <div className="pulse"></div>
                Active
              </div>
            </motion.div>

            <motion.div 
              className="items-grid"
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              <AnimatePresence mode="popLayout">
                {suggestions.map((item) => {
                  const isAdded = cart.find(i => i.id === item.id);
                  return (
                    <motion.div 
                      key={item.id}
                      layout
                      variants={itemVariants}
                      className="grocery-card"
                      whileHover={{ 
                        y: -8,
                        boxShadow: "0 20px 40px rgba(220, 38, 38, 0.15)",
                        borderColor: "rgba(220, 38, 38, 0.4)"
                      }}
                    >
                      <div className="item-image-container">
                        <img src={item.image} alt={item.name} className="item-image" />
                      </div>
                      <div className="item-details">
                        <h3>{item.name}</h3>
                        <span className="item-category">{item.category}</span>
                      </div>
                      <div className={`reason-badge ${item.reasonType}`}>
                        {item.reasonType === 'pairing' && <Sparkles size={12} />}
                        {item.reasonType === 'history' && <History size={12} />}
                        {item.reasonType === 'trending' && <TrendingUp size={12} />}
                        {item.reason}
                      </div>
                      <div className="item-actions">
                        <motion.button 
                          className={`btn-add ${isAdded ? 'added' : ''}`}
                          onClick={() => handleAddToCart(item)}
                          disabled={isAdded}
                          whileTap={!isAdded ? { scale: 0.95 } : {}}
                        >
                          {isAdded ? (
                            <motion.span 
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem' }}
                            >
                              <Check size={16} /> Added
                            </motion.span>
                          ) : (
                            <motion.span 
                              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem' }}
                            >
                              <Plus size={16} /> Add to Cart
                            </motion.span>
                          )}
                        </motion.button>
                      </div>
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </motion.div>
          </motion.section>

          {/* Insights Grid */}
          <div className="insights-grid" style={{ gridColumn: '1 / -1', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem', marginTop: '2rem' }}>
            
            {/* Spending Trends */}
            <motion.section 
              className="glass-panel insights-panel"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="section-header">
                <h2 className="section-title">
                  <TrendingUp size={20} className="logo-icon" />
                  Monthly Spending Trends
                </h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Your grocery budget at a glance</p>
              </div>
              
              <div style={{ width: '100%', height: 250, marginTop: '2rem' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={spendingData}>
                    <defs>
                      <linearGradient id="colorSpent" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)', fontSize: 11 }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--text-muted)', fontSize: 11 }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area type="monotone" dataKey="spent" stroke="var(--primary)" strokeWidth={3} fillOpacity={1} fill="url(#colorSpent)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.section>

            {/* Purchase Frequency */}
            <motion.section 
              className="glass-panel insights-panel"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="section-header">
                <h2 className="section-title">
                  <BarChartIcon size={20} className="logo-icon" />
                  Product Affinity
                </h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Most frequently ordered items</p>
              </div>
              
              <div style={{ width: '100%', height: 250, marginTop: '2rem' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} layout="vertical" margin={{ left: 40 }}>
                    <XAxis type="number" hide />
                    <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-main)', fontSize: 11 }} width={100} />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
                    <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={20}>
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={`url(#barGradient-${index})`} />
                      ))}
                    </Bar>
                    <defs>
                      {chartData.map((entry, index) => (
                        <linearGradient key={`grad-${index}`} id={`barGradient-${index}`} x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0%" stopColor="var(--primary)" />
                          <stop offset="100%" stopColor="var(--secondary)" />
                        </linearGradient>
                      ))}
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.section>
          </div>

          {/* Smart Replenishment (Option 1) */}
          <motion.section 
            className="glass-panel replenishment-panel"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            style={{ gridColumn: '1 / -1', marginTop: '2rem', padding: '2rem' }}
          >
             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <h2 className="section-title">
                    <Sparkles size={20} className="logo-icon" />
                    Running Low? (AI Prediction)
                  </h2>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Based on your consumption patterns, you might need these soon.</p>
                </div>
                <button className="btn btn-outline" style={{ borderStyle: 'dashed' }}>
                   View Full Analysis
                </button>
             </div>

             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
                {replenishmentAlerts.map(item => (
                  <div key={item.id} className="replenish-card glass-panel" style={{ display: 'flex', gap: '1rem', padding: '1rem', alignItems: 'center' }}>
                     <img src={item.image} style={{ width: '50px', height: '50px', borderRadius: '10px', objectFit: 'cover' }} alt="" />
                     <div style={{ flex: 1 }}>
                        <h4 style={{ fontSize: '0.9rem', margin: 0 }}>{item.name}</h4>
                        <div style={{ fontSize: '0.75rem', color: 'var(--primary-light)', marginTop: '4px' }}>Expected out in 3 days</div>
                     </div>
                     <button 
                      onClick={() => handleAddToCart(item)}
                      className="btn-add" 
                      style={{ width: '32px', height: '32px', padding: 0, borderRadius: '50%' }}
                     >
                       <Plus size={16} />
                     </button>
                  </div>
                ))}
             </div>
          </motion.section>
        </div>
          </main>
          ) : <Navigate to="/login" replace />
        } />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Auth setIsAuthenticated={setIsAuthenticated} />} />
      </Routes>

      {/* API Key Modal */}
      <AnimatePresence>
        {showApiModal && (
          <motion.div 
            className="modal-overlay"
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
          >
            <motion.div 
              className="modal-content"
              initial={{ scale: 0.8, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.8, y: 50, opacity: 0 }}
              transition={{ type: 'spring', bounce: 0.4 }}
            >
              <div className="modal-header">
                <h3>AI Integration Setup</h3>
                <p>Enter your API key to enable live smart suggestions.</p>
              </div>
              <form onSubmit={handleSaveApiKey}>
                <div className="input-group">
                  <label htmlFor="apiKey">API Key</label>
                  <input 
                    type="password" 
                    id="apiKey" 
                    placeholder="sk-..." 
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    autoFocus
                  />
                </div>
                <div className="modal-actions">
                  <button 
                    type="button" 
                    className="btn btn-outline"
                    onClick={() => setShowApiModal(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save Key
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {isAuthenticated && <AIChat cart={cart} allProducts={ALL_PRODUCTS} />}
    </>
  );
}

export default App;

