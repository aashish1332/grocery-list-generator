import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';

export function AIChat({ cart, allProducts, onAddToCart }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, role: 'ai', text: 'Hi! I am your AI grocery assistant. I can help you find items, suggest recipes, or optimize your cart. What do you need?' }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAIResponse = (userMsg) => {
    const lowerMsg = userMsg.toLowerCase();
    
    // Simulate AI thinking contextually
    if (lowerMsg.includes('recipe') || lowerMsg.includes('make')) {
      const cartNames = cart.map(c => c.name.toLowerCase());
      if (cartNames.includes('premium basmati rice') && cartNames.includes('toor dal (pigeon peas)')) {
        return "You have Basmati Rice and Toor Dal! You could make a delicious Dal Tadka. Would you like to add some Ghee or Cumin Seeds to complete the tadka?";
      }
      return "I can help with Indian recipes! Tell me what you're craving, or add some base ingredients like Atta or Dal to your cart.";
    }

    if (lowerMsg.includes('forget') || lowerMsg.includes('missing')) {
      if (cart.length === 0) return "Your cart is empty! Try adding some essentials like Basmati Rice or Atta first.";
      
      const missing = [];
      const hasChai = cart.find(c => c.name.toLowerCase().includes('chai'));
      const hasBiscuits = cart.find(c => c.name.toLowerCase().includes('biscuits'));
      
      if (hasChai && !hasBiscuits) missing.push("Parle-G Biscuits");
      
      if (missing.length > 0) {
        return `Based on your cart, you might be forgetting: ${missing.join(', ')}. Perfect for your tea time! Want me to suggest those?`;
      }
      return "Your cart looks great! Everything seems balanced for a perfect Indian kitchen.";
    }

    if (lowerMsg.includes('suggest') || lowerMsg.includes('recommend')) {
      return "I recommend checking out our 'Smart Suggestions' panel on the dashboard. It uses your purchase history to find exactly what you need.";
    }

    return "I'm a demo AI. In a production environment, I would analyze your cart (" + cart.length + " items) and our full catalog to give you perfect grocery advice!";
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMsg = { id: Date.now(), role: 'user', text: input };
    setMessages(prev => [...prev, newMsg]);
    setInput('');

    // Simulate AI delay
    setTimeout(() => {
      setMessages(prev => [
        ...prev, 
        { id: Date.now() + 1, role: 'ai', text: generateAIResponse(newMsg.text) }
      ]);
    }, 800);
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="glass-panel"
            style={{
              position: 'fixed',
              bottom: '2rem',
              right: '2rem',
              width: '60px',
              height: '60px',
              borderRadius: '30px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 1000,
              boxShadow: '0 8px 32px rgba(220, 38, 38, 0.4)'
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Sparkles color="var(--primary)" size={28} />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="glass-panel"
            style={{
              position: 'fixed',
              bottom: '2rem',
              right: '2rem',
              width: '350px',
              height: '500px',
              zIndex: 1000,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden'
            }}
          >
            {/* Header */}
            <div style={{ 
              padding: '1rem', 
              borderBottom: '1px solid var(--glass-border)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: 'rgba(220, 38, 38, 0.1)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'bold' }}>
                <Sparkles size={20} color="var(--primary)" />
                AI Assistant
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-main)' }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Chat Area */}
            <div style={{ flex: 1, padding: '1rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {messages.map(msg => (
                <div 
                  key={msg.id} 
                  style={{ 
                    alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                    maxWidth: '80%',
                    padding: '0.75rem 1rem',
                    borderRadius: msg.role === 'user' ? '16px 16px 0 16px' : '16px 16px 16px 0',
                    background: msg.role === 'user' ? 'var(--primary)' : 'var(--surface)',
                    color: msg.role === 'user' ? '#fff' : 'var(--text-main)',
                    border: msg.role === 'user' ? 'none' : '1px solid var(--glass-border)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                    fontSize: '0.9rem',
                    lineHeight: '1.4'
                  }}
                >
                  {msg.text}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form 
              onSubmit={handleSend}
              style={{ 
                padding: '1rem', 
                borderTop: '1px solid var(--glass-border)',
                display: 'flex',
                gap: '0.5rem'
              }}
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about groceries..."
                style={{
                  flex: 1,
                  padding: '0.75rem 1rem',
                  borderRadius: '20px',
                  border: '1px solid var(--glass-border)',
                  background: 'var(--surface)',
                  color: 'var(--text-main)',
                  outline: 'none',
                }}
              />
              <button 
                type="submit"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '20px',
                  background: 'var(--primary)',
                  color: 'white',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
