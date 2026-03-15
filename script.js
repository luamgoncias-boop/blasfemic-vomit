const express = require("express");
const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.json());

// Lista de servidores em memória
let servidores = [
  {
    id: 1,
    nome: "laranja vendas",
    descricao: "Vendas Free Fire rápidas e seguras",
    link: "https://discord.gg/jh6nNaGE",
    img: "laranja.webp"
  }
];

// Senha do administrador
const ADMIN_PASSWORD = "minhasenha123";

// Retornar lista de servidores
app.get("/servidores", (req, res) => {
  res.json(servidores);
});

// Adicionar servidor
app.post("/servidores", (req, res) => {
  const { nome, descricao, link, img } = req.body;

  if (!nome || !descricao || !link || !img) {
    return res.status(400).json({ erro: "Preencha todos os campos" });
  }

  const novoServidor = {
    id: Date.now(),
    nome,
    descricao,
    link,
    img
  };

  servidores.push(novoServidor);
  res.json({ sucesso: true });
});

// Excluir servidor (apenas admin)
app.delete("/servidores/:id", (req, res) => {
  const { senha } = req.query;
  if (senha !== ADMIN_PASSWORD) {
    return res.status(403).json({ erro: "Somente o administrador pode excluir" });
  }

  const id = parseInt(req.params.id);
  servidores = servidores.filter(s => s.id !== id);
  res.json({ sucesso: true });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});