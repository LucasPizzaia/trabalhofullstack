const express = require('express');
const { Pessoa } = require('./models'); 

const app = express();
const port = 3000;

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); 

Pessoa.sync();

app.get('/pessoas', async (req, res) => {
  try {
    const pessoas = await Pessoa.findAll();
    res.json(pessoas);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar pessoas' });
  }
});

app.post('/pessoas', async (req, res) => {
  try {
    const { nome, cpf, telefone } = req.body;
    const novaPessoa = await Pessoa.create({ nome, cpf, telefone });
    res.status(201).json(novaPessoa);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao adicionar pessoa' });
  }
});

app.delete('/pessoas/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const pessoa = await Pessoa.findByPk(id);

    if (!pessoa) {
      return res.status(404).json({ error: 'Pessoa não encontrada' });
    }

    await pessoa.destroy();
    res.status(200).json({ message: 'Pessoa excluída com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir pessoa' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});




