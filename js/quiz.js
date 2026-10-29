/* =========================================================
   QUIZ ESTILO KAHOOT
   ---------------------------------------------------------
   Para editar, mexa no array PERGUNTAS:
     pergunta   → o enunciado
     certa      → a alternativa correta
     erradas    → as três alternativas erradas
     explicacao → aparece depois que a pessoa responde
   As alternativas são embaralhadas a cada partida.
   São 2 jogadores ao mesmo tempo: o 1 responde com Q W A S
   e o 2 com I O K L (mesma posição das alternativas na tela).
   ========================================================= */

const TEMPO_POR_PERGUNTA = 20; // segundos

const PERGUNTAS = [
  {
    pergunta: 'Segundo a aula, a produção literária feminina atual representa, além da autoria:',
    certa: 'Um movimento de revisão histórica e afirmação política',
    erradas: ['Uma tendência apenas comercial', 'Um retorno à figura da musa passiva', 'Uma literatura voltada só ao público feminino'],
    explicacao: 'A literatura feita por mulheres vai além de quem assina o livro: revisa a história e afirma uma posição política.',
  },
  {
    pergunta: 'O que caracteriza o Realismo Mágico?',
    certa: 'Eventos sobrenaturais são aceitos como parte comum da vida',
    erradas: ['O sobrenatural sempre causa medo nos personagens', 'A história se passa em mundos inventados', 'Não há relação com a realidade social'],
    explicacao: 'No Realismo Mágico, o extraordinário é tratado como normal, diferente do que acontece na Fantasia e no Terror.',
  },
  {
    pergunta: 'A estátua que inspirou “A cabeça do santo” fica em:',
    certa: 'Caridade (CE)',
    erradas: ['Juazeiro do Norte (CE)', 'Fortaleza (CE)', 'Candeia (CE)'],
    explicacao: 'A estátua de Santo Antônio fica em Caridade (CE). A cabeça ficou décadas separada do corpo por um erro técnico. Candeia é a cidade do romance.',
  },
  {
    pergunta: 'O que Samuel busca ao longo da obra?',
    certa: 'Sua identidade e o pai desconhecido',
    erradas: ['Uma herança em dinheiro', 'Fugir da polícia', 'Um emprego na cidade grande'],
    explicacao: 'Samuel representa a busca pela identidade: ele procura o pai que nunca conheceu.',
  },
  {
    pergunta: 'A expressão “cemitério de gigantes” sugere que Candeia:',
    certa: 'Já foi grandiosa e agora está morta ou estagnada',
    erradas: ['É uma cidade cheia de vida', 'Tem um cemitério famoso', 'É habitada por gigantes'],
    explicacao: 'A metáfora mostra algo que já foi grande e agora está morto, com um tom de decadência épica.',
  },
  {
    pergunta: 'Na “estética da escassez”, a falta de recursos espelha:',
    certa: 'A escassez de afetos e a dureza das relações humanas',
    erradas: ['A riqueza escondida da cidade', 'A preguiça dos moradores', 'O progresso do sertão'],
    explicacao: 'Faltam comida, água e telhado, e faltam também afeto e gentileza entre as pessoas.',
  },
  {
    pergunta: 'O pensamento “egoísta” da moça da bodega mostra que:',
    certa: 'A dor extrema produz mecanismos de defesa complexos',
    erradas: ['Ela é uma vilã', 'Ela não sentiu pena de Samuel', 'Ela conhecia Samuel desde criança'],
    explicacao: 'Ela sente pena e, ao mesmo tempo, alívio por ver alguém que sofre mais. Isso a humaniza, não a torna vilã.',
  },
  {
    pergunta: 'Como Helenice é construída na narrativa?',
    certa: 'Brutal, representando a dureza da sobrevivência no sertão',
    erradas: ['Totalmente bondosa e angelical', 'Como uma personagem sobrenatural', 'Como mãe de Samuel'],
    explicacao: 'Helenice é “mais bicho que ele”: sua brutalidade nasce da dureza da vida no sertão.',
  },
  {
    pergunta: 'A desconstrução de estereótipos substitui a “mulher angelical” por:',
    certa: 'Personagens complexas, contraditórias e autônomas',
    erradas: ['Personagens sempre heroicas', 'Personagens sem voz na história', 'Personagens masculinas'],
    explicacao: 'A “musa passiva” e a “mulher angelical” dão lugar a mulheres complexas e com desejos próprios.',
  },
  {
    pergunta: 'Qual alternativa analisa melhor a relação entre Candeia e Samuel?',
    certa: 'Candeia é um organismo em agonia cuja hostilidade espelha a miséria de Samuel',
    erradas: ['Candeia é um cenário neutro', 'A agressividade de Helenice impede que a obra seja Realismo Mágico', 'O “funeral do sol” indica sucesso imediato na busca de Samuel'],
    explicacao: 'O pão seco e a água suja de Candeia refletem a miséria e a transfiguração do próprio Samuel.',
  },
];

/* =========================================================
   Daqui para baixo é o funcionamento do quiz.
   ========================================================= */
(function () {
  'use strict';

  const app = document.getElementById('quiz-app');
  if (!app) return;

  // Cores e formas fixas por posição, como no Kahoot
  const FORMAS = [
    { cor: 'vermelho', svg: '<polygon points="12,3 22,20.5 2,20.5"/>' },
    { cor: 'azul', svg: '<polygon points="12,1.5 22.5,12 12,22.5 1.5,12"/>' },
    { cor: 'amarelo', svg: '<circle cx="12" cy="12" r="10"/>' },
    { cor: 'verde', svg: '<rect x="2.5" y="2.5" width="19" height="19" rx="1.5"/>' },
  ];
  const ICONE_CERTO = '<svg viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg>';
  const ICONE_ERRADO = '<svg viewBox="0 0 24 24"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>';

  // Teclas de cada jogador, na mesma posição das alternativas (2 em cima, 2 embaixo)
  const TECLAS = [
    ['KeyQ', 'KeyW', 'KeyA', 'KeyS'],
    ['KeyI', 'KeyO', 'KeyK', 'KeyL'],
  ];
  const LETRAS = [['Q', 'W', 'A', 'S'], ['I', 'O', 'K', 'L']];

  let rodada = [];
  let indice = 0;
  let nomes = ['', ''];
  let jogadores = [];
  let inicioPergunta = 0;
  let quadro = 0;
  let respondendo = false;

  const formatar = n => n.toLocaleString('pt-BR');
  const poucoMovimento = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // os nomes são digitados pelos jogadores, então não podem virar HTML
  const escapar = texto => texto.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  function embaralhar(lista) {
    const copia = lista.slice();
    for (let i = copia.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copia[i], copia[j]] = [copia[j], copia[i]];
    }
    return copia;
  }

  function novaRodada() {
    rodada = PERGUNTAS.map(p => ({
      ...p,
      alternativas: embaralhar([
        { texto: p.certa, certa: true },
        ...p.erradas.map(texto => ({ texto, certa: false })),
      ]),
    }));
    indice = 0;
    jogadores = nomes.map((nome, n) => ({
      nome: nome || `Jogador ${n + 1}`,
      pontos: 0,
      acertos: 0,
      historico: [],
      escolha: null,
      tempo: 0,
    }));
  }

  function rolarParaQuiz() {
    const topo = app.getBoundingClientRect().top;
    if (topo < 0 || topo > window.innerHeight * 0.35) {
      app.scrollIntoView({ behavior: poucoMovimento() ? 'auto' : 'smooth', block: 'start' });
    }
  }

  function animarNumero(el, de, para, duracao) {
    if (!el) return;
    if (poucoMovimento() || de === para) { el.textContent = formatar(para); return; }
    const inicio = performance.now();
    const passo = () => {
      const t = Math.max(0, Math.min(1, (performance.now() - inicio) / duracao));
      const suave = 1 - Math.pow(1 - t, 3);
      el.textContent = formatar(Math.round(de + (para - de) * suave));
      if (t < 1) requestAnimationFrame(passo);
    };
    requestAnimationFrame(passo);
  }

  /* ---------- Telas ---------- */
  function telaInicio() {
    app.innerHTML = `
      <div class="quiz-screen quiz-start">
        <div class="quiz-shapes" aria-hidden="true">
          ${FORMAS.map((f, i) => `<span class="cor-${f.cor}" style="--i:${i}"><svg viewBox="0 0 24 24">${f.svg}</svg></span>`).join('')}
        </div>
        <h3 class="quiz-title">Quiz: <em>A cabeça do santo</em></h3>
        <button type="button" class="btn btn-primary btn-lg" data-quiz="comecar">Começar</button>
      </div>`;
  }

  function telaNomes() {
    app.innerHTML = `
      <form class="quiz-screen quiz-start quiz-nomes">
        <h3 class="quiz-title">Quem vai jogar?</h3>
        <div class="quiz-nomes-campos">
          ${[0, 1].map(n => `
            <div class="quiz-nome jogador-${n + 1}">
              <label for="quiz-nome-${n + 1}">Jogador ${n + 1}</label>
              <input id="quiz-nome-${n + 1}" maxlength="20" autocomplete="off" placeholder="Nome" value="${escapar(nomes[n])}">
              <p class="quiz-nome-teclas">Responde com ${LETRAS[n].map(l => `<kbd>${l}</kbd>`).join('')}</p>
            </div>`).join('')}
        </div>
        <button type="submit" class="btn btn-primary btn-lg">Começar o jogo</button>
      </form>`;
    app.querySelector('input').focus({ preventScroll: true });
  }

  const placar = n => `
    <span class="quiz-chip quiz-chip--jogador jogador-${n + 1}">
      ${escapar(jogadores[n].nome)} <strong data-pontos="${n}">${formatar(jogadores[n].pontos)}</strong>
    </span>`;

  function telaPergunta() {
    const p = rodada[indice];
    jogadores.forEach(j => { j.escolha = null; j.tempo = 0; });
    app.innerHTML = `
      <div class="quiz-screen quiz-play">
        <div class="quiz-hud">
          ${placar(0)}
          <span class="quiz-chip">Pergunta <strong>${indice + 1}</strong> de ${rodada.length}</span>
          ${placar(1)}
        </div>
        <div class="quiz-timebar" aria-hidden="true"><span></span></div>
        <div class="quiz-body">
          <div class="quiz-clock" aria-hidden="true">${TEMPO_POR_PERGUNTA}</div>
          <h3 class="quiz-question" tabindex="-1">${p.pergunta}<span class="sr-only"> Vocês têm ${TEMPO_POR_PERGUNTA} segundos.</span></h3>
        </div>
        <div class="quiz-answers">
          ${p.alternativas.map((a, i) => `
            <div class="quiz-answer cor-${FORMAS[i].cor}">
              <svg class="quiz-shape" viewBox="0 0 24 24" aria-hidden="true">${FORMAS[i].svg}</svg>
              <span class="quiz-answer-text">${a.texto}</span>
              <span class="quiz-quem"></span>
              <span class="quiz-mark" aria-hidden="true"></span>
            </div>`).join('')}
        </div>
        <div class="quiz-controles">
          ${jogadores.map((j, n) => `
            <div class="quiz-controle jogador-${n + 1}" role="group" aria-label="Respostas de ${escapar(j.nome)}">
              <p class="quiz-controle-nome">${escapar(j.nome)}</p>
              <div class="quiz-controle-botoes">
                ${FORMAS.map((f, i) => `
                  <button type="button" class="cor-${f.cor}" data-jogador="${n}" data-resposta="${i}"
                          aria-label="${escapar(p.alternativas[i].texto)}" aria-keyshortcuts="${LETRAS[n][i]}">
                    <svg viewBox="0 0 24 24" aria-hidden="true">${f.svg}</svg><kbd>${LETRAS[n][i]}</kbd>
                  </button>`).join('')}
              </div>
              <p class="quiz-controle-status" data-status="${n}">Pensando…</p>
            </div>`).join('')}
        </div>
        <div class="quiz-feedback" aria-live="polite"></div>
      </div>`;
    app.querySelector('.quiz-question').focus({ preventScroll: true });
    respondendo = true;
    iniciarCronometro();
  }

  function iniciarCronometro() {
    const barra = app.querySelector('.quiz-timebar');
    const preenchimento = barra.firstElementChild;
    const relogio = app.querySelector('.quiz-clock');
    inicioPergunta = performance.now();
    cancelAnimationFrame(quadro);

    const passo = () => {
      const decorrido = Math.max(0, (performance.now() - inicioPergunta) / 1000);
      const restante = Math.max(0, TEMPO_POR_PERGUNTA - decorrido);
      const urgente = restante <= 5;
      preenchimento.style.transform = `scaleX(${restante / TEMPO_POR_PERGUNTA})`;
      relogio.textContent = Math.ceil(restante);
      barra.classList.toggle('is-urgente', urgente);
      relogio.classList.toggle('is-urgente', urgente);
      if (restante <= 0) { revelar(); return; }
      quadro = requestAnimationFrame(passo);
    };
    quadro = requestAnimationFrame(passo);
  }

  // O jogador n escolheu a alternativa i. A escolha fica escondida até os dois responderem.
  function escolher(n, i) {
    const j = jogadores[n];
    if (!respondendo || j.escolha !== null) return;
    j.escolha = i;
    j.tempo = Math.min(TEMPO_POR_PERGUNTA, (performance.now() - inicioPergunta) / 1000);

    const controle = app.querySelector(`.quiz-controle.jogador-${n + 1}`);
    controle.classList.add('is-respondeu');
    controle.querySelectorAll('button').forEach(b => { b.disabled = true; });
    app.querySelector(`[data-status="${n}"]`).textContent = 'Respondeu!';

    if (jogadores.every(x => x.escolha !== null)) revelar();
  }

  // Mostra a resposta certa e soma os pontos (quando os dois respondem ou o tempo acaba)
  function revelar() {
    if (!respondendo) return;
    respondendo = false;
    cancelAnimationFrame(quadro);

    const p = rodada[indice];
    const indiceCerto = p.alternativas.findIndex(a => a.certa);
    const antes = jogadores.map(j => j.pontos);

    const resultados = jogadores.map(j => {
      const acertou = j.escolha === indiceCerto;
      let ganhos = 0;
      if (acertou) {
        // de 1000 (resposta imediata) até 500 (no último segundo)
        ganhos = Math.round(1000 * (1 - (j.tempo / TEMPO_POR_PERGUNTA) / 2));
        j.pontos += ganhos;
        j.acertos++;
      }
      j.historico.push(acertou);
      return { ganhos, tipo: j.escolha === null ? 'tempo' : acertou ? 'certo' : 'errado' };
    });

    app.querySelectorAll('.quiz-answer').forEach((card, i) => {
      const marca = card.querySelector('.quiz-mark');
      const escolheram = jogadores.filter(j => j.escolha === i);
      if (i === indiceCerto) {
        card.classList.add('is-correct');
        marca.innerHTML = ICONE_CERTO;
      } else if (escolheram.length) {
        card.classList.add('is-wrong');
        marca.innerHTML = ICONE_ERRADO;
      } else {
        card.classList.add('is-dim');
      }
      card.querySelector('.quiz-quem').innerHTML = escolheram
        .map(j => `<span class="jogador-${jogadores.indexOf(j) + 1}">${escapar(j.nome)}</span>`).join('');
    });

    resultados.forEach((r, n) => {
      const controle = app.querySelector(`.quiz-controle.jogador-${n + 1}`);
      controle.classList.add(`is-${r.tipo}`);
      controle.querySelectorAll('button').forEach(b => { b.disabled = true; });
      app.querySelector(`[data-status="${n}"]`).textContent =
        { certo: `Acertou! +${formatar(r.ganhos)}`, errado: 'Errou!', tempo: 'Não respondeu' }[r.tipo];
      animarNumero(app.querySelector(`[data-pontos="${n}"]`), antes[n], jogadores[n].pontos, 700);
    });

    const ultima = indice === rodada.length - 1;
    const feedback = app.querySelector('.quiz-feedback');
    feedback.innerHTML = `
      <div class="feedback feedback--rodada">
        <p class="feedback-texto"><strong>Resposta certa:</strong> ${p.certa}. ${p.explicacao}</p>
        <div class="feedback-rodape">
          <p class="feedback-total">${jogadores.map(j => `${escapar(j.nome)}: <strong>${formatar(j.pontos)}</strong>`).join(' · ')}</p>
          <button type="button" class="btn btn-primary" data-quiz="${ultima ? 'final' : 'proxima'}">${ultima ? 'Ver resultado' : 'Próxima pergunta'} →</button>
        </div>
      </div>`;

    feedback.querySelector('button').focus({ preventScroll: true });
    feedback.scrollIntoView({ behavior: poucoMovimento() ? 'auto' : 'smooth', block: 'nearest' });
  }

  function telaFinal() {
    const n = rodada.length;
    const [a, b] = jogadores;
    const vencedor = a.pontos === b.pontos ? null : a.pontos > b.pontos ? a : b;

    app.innerHTML = `
      <div class="quiz-screen quiz-end">
        <img class="quiz-trofeu" src="img/ai-dentro.jpeg" width="320" height="352" alt="">
        <p class="eyebrow">Fim de jogo</p>
        <h3 class="quiz-vencedor" tabindex="-1">${vencedor ? `<em>${escapar(vencedor.nome)}</em> venceu!` : 'Empate!'}</h3>
        <div class="quiz-finais">
          ${jogadores.map((j, i) => `
            <div class="quiz-final jogador-${i + 1}${j === vencedor ? ' is-vencedor' : ''}">
              <p class="quiz-final-nome">${escapar(j.nome)}</p>
              <p class="quiz-score"><span data-total="${i}">0</span></p>
              <p class="quiz-score-label">pontos · ${j.acertos} de ${n} acertos</p>
              <ol class="quiz-dots" aria-label="Respostas de ${escapar(j.nome)}">
                ${j.historico.map((ok, k) => `
                  <li class="${ok ? 'dot--certo' : 'dot--errado'}" title="Pergunta ${k + 1}: ${ok ? 'acertou' : 'errou'}">
                    <span aria-hidden="true">${k + 1}</span><span class="sr-only">Pergunta ${k + 1}: ${ok ? 'acertou' : 'errou'}</span>
                  </li>`).join('')}
              </ol>
            </div>`).join('')}
        </div>
        <button type="button" class="btn btn-primary btn-lg" data-quiz="denovo">Jogar de novo</button>
      </div>`;

    jogadores.forEach((j, i) => {
      const el = app.querySelector(`[data-total="${i}"]`);
      el.textContent = formatar(poucoMovimento() ? j.pontos : 0);
      animarNumero(el, 0, j.pontos, 1400);
    });
    app.querySelector('.quiz-vencedor').focus({ preventScroll: true });
    rolarParaQuiz();
    confete();
  }

  /* ---------- Confete ---------- */
  function confete() {
    if (poucoMovimento()) return;
    const canvas = document.createElement('canvas');
    canvas.className = 'confete';
    canvas.setAttribute('aria-hidden', 'true');
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let largura = 0;
    let altura = 0;
    const ajustar = () => {
      largura = window.innerWidth;
      altura = window.innerHeight;
      canvas.width = largura * dpr;
      canvas.height = altura * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    ajustar();
    window.addEventListener('resize', ajustar);

    const cores = ['#e21b3c', '#1368ce', '#f0ad00', '#26890c', '#ff9a52', '#b48be6', '#f3e6cf'];
    const area = app.getBoundingClientRect();
    const origemX = area.left + area.width / 2;
    const origemY = Math.min(altura * 0.6, Math.max(80, area.top + area.height * 0.3));
    const pecas = [];

    // explosão a partir do quiz
    for (let i = 0; i < 160; i++) {
      const angulo = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 1.2;
      const velocidade = 8 + Math.random() * 11;
      pecas.push(novaPeca(origemX, origemY, Math.cos(angulo) * velocidade, Math.sin(angulo) * velocidade, i));
    }
    // chuva vinda do topo
    for (let i = 0; i < 90; i++) {
      pecas.push(novaPeca(Math.random() * largura, -20 - Math.random() * altura * 0.6, (Math.random() - 0.5) * 2, 2 + Math.random() * 3, i));
    }

    function novaPeca(x, y, vx, vy, i) {
      return {
        x, y, vx, vy,
        tamanho: 7 + Math.random() * 8,
        giro: Math.random() * Math.PI,
        velocidadeGiro: (Math.random() - 0.5) * 0.3,
        balanco: Math.random() * Math.PI * 2,
        cor: cores[i % cores.length],
        redondo: Math.random() < 0.3,
      };
    }

    const inicio = performance.now();
    const duracao = 4800;
    const desenhar = () => {
      const t = performance.now() - inicio;
      ctx.clearRect(0, 0, largura, altura);
      ctx.globalAlpha = t > duracao - 1000 ? Math.max(0, (duracao - t) / 1000) : 1;

      pecas.forEach(p => {
        p.vx *= 0.97;
        p.vy = p.vy * 0.97 + 0.2;
        p.balanco += 0.08;
        p.x += p.vx + Math.sin(p.balanco) * 0.7;
        p.y += p.vy;
        p.giro += p.velocidadeGiro;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.giro);
        ctx.fillStyle = p.cor;
        if (p.redondo) {
          ctx.beginPath();
          ctx.arc(0, 0, p.tamanho / 2.4, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillRect(-p.tamanho / 2, -p.tamanho / 4, p.tamanho, p.tamanho / 2);
        }
        ctx.restore();
      });

      if (t < duracao) {
        requestAnimationFrame(desenhar);
      } else {
        window.removeEventListener('resize', ajustar);
        canvas.remove();
      }
    };
    requestAnimationFrame(desenhar);
  }

  /* ---------- Eventos ---------- */
  app.addEventListener('click', e => {
    const resposta = e.target.closest('[data-resposta]');
    if (resposta) { escolher(Number(resposta.dataset.jogador), Number(resposta.dataset.resposta)); return; }

    const botao = e.target.closest('button[data-quiz]');
    if (!botao) return;
    switch (botao.dataset.quiz) {
      case 'comecar':
      case 'denovo':
        telaNomes();
        rolarParaQuiz();
        break;
      case 'proxima':
        indice++;
        telaPergunta();
        break;
      case 'final':
        telaFinal();
        break;
    }
  });

  // Tela dos nomes: o jogo começa quando o formulário é enviado
  app.addEventListener('submit', e => {
    e.preventDefault();
    nomes = [0, 1].map(n => app.querySelector(`#quiz-nome-${n + 1}`).value.trim());
    novaRodada();
    telaPergunta();
  });

  // Teclas de cada jogador (só com o quiz visível e a apresentação fechada)
  document.addEventListener('keydown', e => {
    if (!respondendo || e.altKey || e.ctrlKey || e.metaKey) return;
    if (document.documentElement.classList.contains('deck-aberto')) return;
    const area = app.getBoundingClientRect();
    if (area.bottom < 0 || area.top > window.innerHeight) return;
    TECLAS.forEach((teclas, n) => {
      const i = teclas.indexOf(e.code);
      if (i === -1) return;
      e.preventDefault();
      escolher(n, i);
    });
  });

  telaInicio();
})();
