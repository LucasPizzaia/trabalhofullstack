document.getElementById('cadastroForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  
  const nome = document.getElementById('nome').value;
  const cpf = formatarCPF(document.getElementById('cpf').value);
  const telefone = formatarTelefone(document.getElementById('telefone').value);
  
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
    li.innerHTML = `
      Nome: ${pessoa.nome} - CPF: ${formatarCPF(pessoa.cpf)} - Telefone: ${formatarTelefone(pessoa.telefone)}
      <button onclick="excluirPessoa(${pessoa.id})">Excluir</button>
    `;
    listaPessoas.appendChild(li);
  });
}

async function excluirPessoa(id) {
  const response = await fetch(`/pessoas/${id}`, {
    method: 'DELETE'
  });

  if (response.ok) {
    carregarPessoas();
  } else {
    alert('Erro ao excluir pessoa');
  }
}

function formatarCPF(cpf) {
  return cpf.replace(/\D/g, '')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
}

function formatarTelefone(telefone) {
  return telefone.replace(/\D/g, '')
                 .replace(/(\d{2})(\d)/, '($1) $2')
                 .replace(/(\d{5})(\d)/, '$1-$2');
}

document.addEventListener('DOMContentLoaded', carregarPessoas);

