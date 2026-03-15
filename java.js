const adicionarCard = document.getElementById('adicionarServidorCard');
const form = document.getElementById('formAdicionar');
const lista = document.getElementById('listaServidores');
const preview = document.getElementById('previewImg');

// CRIAR CARD
function criarServidorCard(nome, desc, link, imgSrc, index) {

  const divServidor = document.createElement('div');
  divServidor.className = 'servidor';

  const imagem = document.createElement('img');
  imagem.src = imgSrc;
  imagem.alt = nome;

  const info = document.createElement('div');
  info.className = 'servidor-info';

  const h2 = document.createElement('h2');
  h2.textContent = nome;

  const p = document.createElement('p');
  p.textContent = desc;

  info.appendChild(h2);
  info.appendChild(p);

  const botao = document.createElement('button');
  botao.className = 'btn-entrar';
  botao.textContent = 'Entrar';
  botao.onclick = () => window.open(link,'_blank');

  // BOTÃO EXCLUIR
  const excluir = document.createElement('button');
  excluir.className = 'btn-excluir';
  excluir.textContent = 'Excluir';

  excluir.onclick = () => {

    if(confirm("Excluir servidor?")){

      let servidores = JSON.parse(localStorage.getItem('servidores')) || [];

      servidores.splice(index,1);

      localStorage.setItem("servidores", JSON.stringify(servidores));

      location.reload();

    }

  };

  divServidor.appendChild(imagem);
  divServidor.appendChild(info);
  divServidor.appendChild(botao);
  divServidor.appendChild(excluir);

  lista.appendChild(divServidor);
}

// CARREGAR SERVIDORES
window.addEventListener('load', () => {

  const servidoresSalvos = JSON.parse(localStorage.getItem('servidores')) || [];

  servidoresSalvos.forEach((s,i) => {

    criarServidorCard(s.nome, s.desc, s.link, s.imgSrc, i);

  });

});

// ABRIR FORMULÁRIO
adicionarCard.addEventListener('click', () => {

  form.style.display = 'flex';

});

// PREVIEW DA IMAGEM
document.getElementById("imgServidor").addEventListener("change",(e)=>{

  const file = e.target.files[0];

  if(!file) return;

  const reader = new FileReader();

  reader.onload = function(ev){

    preview.src = ev.target.result;

    preview.style.display = "block";

  }

  reader.readAsDataURL(file);

});

// ADICIONAR SERVIDOR
document.getElementById('btnAdicionarServidor').addEventListener('click',(e)=>{

  e.stopPropagation();

  const nome = document.getElementById('nomeServidor').value.trim();
  const desc = document.getElementById('descServidor').value.trim();
  const link = document.getElementById('linkServidor').value.trim();
  const imgInput = document.getElementById('imgServidor');

  if(!nome || !desc || !link || !imgInput.files[0]){

    alert("Preencha tudo!");

    return;

  }

  const reader = new FileReader();

  reader.onload = function(ev){

    const imgSrc = ev.target.result;

    criarServidorCard(nome,desc,link,imgSrc);

    const servidores = JSON.parse(localStorage.getItem('servidores')) || [];

    servidores.push({nome,desc,link,imgSrc});

    localStorage.setItem("servidores",JSON.stringify(servidores));

    location.reload();

  }

  reader.readAsDataURL(imgInput.files[0]);

});