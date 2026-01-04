const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const app = express();

// ✅ CORS CORRETO (ESSA LINHA!)
app.use(cors({
  origin: ['https://adtemplocentralriachodoce-bit.github.io', 'https://seu-dominio.github.io'],
  credentials: true
}));
app.use(express.json());

mongoose.connect('mongodb+srv://adtemplocentralriachodoce_db_user:c2Y7FWXUpCcoVY9n@cluster0.9sqjsa3.mongodb.net/celebracao?retryWrites=true&w=majority');

const User = mongoose.model('User', {
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true }
});

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

app.get('/api/test', (req, res) => {
  res.json({ status: '✅ Backend OK! MongoDB conectado!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Backend na porta ${PORT}`));
