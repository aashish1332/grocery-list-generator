import React from 'react';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <div style={{ minHeight: '100vh', paddingTop: '100px', paddingBottom: '4rem' }} className="container">
      <motion.div 
        className="glass-panel" 
        style={{ padding: '3rem' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 style={{ fontSize: '3rem', marginBottom: '1.5rem', background: 'linear-gradient(135deg, var(--primary), var(--secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          About SmartGrocery
        </h1>
        
        <div style={{ fontSize: '1.2rem', lineHeight: '1.8', color: 'var(--text-main)', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <p>
            SmartGrocery is the future of seamless shopping. We leverage advanced AI to analyze your purchase history and current cart to predict exactly what you need.
          </p>
          <p>
            Our mission is to save you time and ensure you never forget an essential item again. By intelligently pairing products and tracking your unique preferences, we create a personalized shopping experience that feels like magic.
          </p>
          <div style={{ marginTop: '2rem', display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
            <div className="glass-panel" style={{ flex: '1 1 250px', padding: '1.5rem', textAlign: 'center' }}>
              <h3 style={{ fontSize: '2rem', color: 'var(--primary)' }}>10k+</h3>
              <p>Active Users</p>
            </div>
            <div className="glass-panel" style={{ flex: '1 1 250px', padding: '1.5rem', textAlign: 'center' }}>
              <h3 style={{ fontSize: '2rem', color: 'var(--secondary)' }}>50k+</h3>
              <p>AI Suggestions</p>
            </div>
            <div className="glass-panel" style={{ flex: '1 1 250px', padding: '1.5rem', textAlign: 'center' }}>
              <h3 style={{ fontSize: '2rem', color: 'var(--accent)' }}>99%</h3>
              <p>Accuracy Rate</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
