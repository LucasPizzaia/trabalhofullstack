document.getElementById('cadastroForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const nome = document.getElementById('nome').value;
    const cpf = document.getElementById('cpf').value;
    const telefone = document.getElementById('telefone').value;
    
    const response = await fetch('/pessoas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, cpf, telefone })
    });
    
    if (response.ok) {
      document.getElementById('cadastroForm').reset();
      carregarPessoas();
    } else {
      alert('Erro ao cadastrar pessoa');
    }
  });
  
  async function carregarPessoas() {
    const response = await fetch('/pessoas');
    const pessoas = await response.json();
    
    const listaPessoas = document.getElementById('listaPessoas');
    listaPessoas.innerHTML = '';
    
    pessoas.forEach(pessoa => {
      const li = document.createElement('li');
      li.textContent = `${pessoa.nome} - CPF: ${pessoa.cpf} - Telefone: ${pessoa.telefone}`;
      listaPessoas.appendChild(li);
    });
  }
  
  document.addEventListener('DOMContentLoaded', carregarPessoas);
  