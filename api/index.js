import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import OpenAI from 'openai';

import User from './models/User.js';


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection Caching
let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }

  const MONGO_URI = process.env.MONGO_URI;
  if (!MONGO_URI) {
    throw new Error('MONGO_URI is not defined in environment variables');
  }

  try {
    const db = await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
    });
    cachedDb = db;
    console.log('✅ Connected to MongoDB');
    return db;
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    throw err;
  }
}

// Middleware to ensure DB connection
app.use(async (req, res, next) => {
  try {
    await connectToDatabase();
    next();
  } catch (err) {
    res.status(500).json({ message: 'Database connection failed', error: err.message });
  }
});

// Basic API Routes
app.get('/api/status', (req, res) => {
  res.json({ status: 'API is running', dbConnected: mongoose.connection.readyState === 1 });
});

// Auth Routes
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'your_jwt_secret', { expiresIn: '1d' });
    res.status(201).json({ 
      message: 'User created successfully', 
      token, 
      user: { id: user._id, name: user.name, email: user.email } 
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'your_jwt_secret', { expiresIn: '1d' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// AI Chat Route (Robust with Fallback)
app.post('/api/chat', async (req, res) => {
  const { message, cart } = req.body;
  const apiKey = process.env.GROK_API_KEY;
  
  if (!apiKey) {
    return res.status(500).json({ message: 'Grok API Key not configured' });
  }

  const openai = new OpenAI({ 
    apiKey,
    baseURL: 'https://api.x.ai/v1',
  });

  const cartContext = cart && cart.length > 0 
    ? `Current cart: ${cart.map(item => `${item.name} (Qty: ${item.quantity || 1})`).join(', ')}`
    : 'Cart is empty.';

  try {
    console.log(`🤖 Attempting AI response with Grok (x.ai)`);
    const completion = await openai.chat.completions.create({
      model: "grok-beta",
      messages: [
        {
          role: "system",
          content: `You are an intelligent grocery assistant for "SmartGrocery".
            - Be helpful, polite, and concise.
            - Suggest Indian groceries if asked.
            - Max 2 paragraphs.`
        },
        {
          role: "user",
          content: `${cartContext}\n\nUser: "${message}"`
        }
      ],
      max_tokens: 300,
    });
    
    const text = completion.choices[0].message.content;
    return res.json({ text });
  } catch (error) {
    console.error(`❌ Grok API failed: ${error.message}`);
    
    if (error.status === 429) {
      return res.status(429).json({ 
        text: "Grok is currently at its limit. Please wait a minute or try again later! 🙏"
      });
    }

    res.status(500).json({ 
      message: 'Grok AI Assistant is currently busy', 
      error: error.message
    });
  }

});





// Start Server (only for local dev)
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}

export default app;

