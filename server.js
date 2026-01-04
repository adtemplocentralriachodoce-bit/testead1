const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const app = express();

// 🔥 CORS MÁXIMO - SEMPRE PRIMEIRO
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://adtemplocentralriachodoce-bit.github.io');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  next();
});

app.use(express.json());

mongoose.connect('mongodb+srv://adtemplocentralriachodoce_db_user:c2Y7FWXUpCcoVY9n@cluster0.9sqjsa3.mongodb.net/celebracao');

const User = mongoose.model('User', { username: String, password: String });

app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    
    if (user && await bcrypt.compare(password, user.password)) {
      res.json({ success: true, user: { username } });
    } else {
      res.json({ success: false });
    }
  } catch {
    res.json({ success: false });
  }
});

app.get('/api/test', (req, res) => res.json({ ok: true }));

app.listen(process.env.PORT || 3000);
