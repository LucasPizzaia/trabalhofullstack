const express = require('express');
const bodyParser = require('body-parser');
const { Pessoa } = require('./models'); // Modelo Pessoa gerado pelo Sequelize

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Serve arquivos estáticos da pasta public

// Rota para listar todas as pessoas
app.get('/pessoas', async (req, res) => {
  try {
    const pessoas = await Pessoa.findAll();
    res.json(pessoas);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar pessoas' });
  }
});

// Rota para adicionar uma nova pessoa
app.post('/pessoas', async (req, res) => {
  try {
    const { nome, cpf, telefone } = req.body;
    const novaPessoa = await Pessoa.create({ nome, cpf, telefone });
    res.status(201).json(novaPessoa);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao adicionar pessoa' });
  }
});

// Inicializa o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});


