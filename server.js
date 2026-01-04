const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// CONEXÃO MONGODB (SUA STRING)
mongoose.connect('mongodb+srv://adtemplocentralriachodoce_db_user:c2Y7FWXUpCcoVY9n@cluster0.9sqjsa3.mongodb.net/celebracao?retryWrites=true&w=majority');

// USUÁRIO MODEL
const User = mongoose.model('User', {
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true }
});

// LOGIN
app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    
    if (user && await bcrypt.compare(password, user.password)) {
      res.json({ success: true, user: { username } });
    } else {
      res.json({ success: false, message: 'Senha incorreta' });
    }
  } catch {
    res.json({ success: false, message: 'Erro servidor' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('✅ OK'));
