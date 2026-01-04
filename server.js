const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const app = express();

// 🔥 CORS TOTAL - PARA GITHUB PAGES
app.use(cors({
  origin: 'https://adtemplocentralriachodoce-bit.github.io',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));

// Preflight OPTIONS
app.options('*', cors());

app.use(express.json());

mongoose.connect('mongodb+srv://adtemplocentralriachodoce_db_user:c2Y7FWXUpCcoVY9n@cluster0.9sqjsa3.mongodb.net/celebracao');

const User = mongoose.model('User', {
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true }
});

app.post('/api/login', async (req, res) => {
  res.header('Access-Control-Allow-Origin', 'https://adtemplocentralriachodoce-bit.github.io');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    
    if (user && await bcrypt.compare(password, user.password)) {
      res.json({ success: true, user: { username } });
    } else {
      res.json({ success: false, message: 'Senha incorreta' });
    }
  } catch {
    res.json({ success: false });
  }
});

app.get('/api/test', (req, res) => {
  res.json({ status: '✅ Backend OK! CORS funcionando!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('✅ Backend + CORS OK'));
