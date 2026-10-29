/* =========================================================
   QUIZ ESTILO KAHOOT
   ---------------------------------------------------------
   Para editar, mexa no array PERGUNTAS:
     pergunta   → o enunciado
     certa      → a alternativa correta
     erradas    → as três alternativas erradas
     explicacao → aparece depois que a pessoa responde
   As alternativas são embaralhadas a cada partida.
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

  let rodada = [];
  let indice = 0;
  let pontos = 0;
  let acertos = 0;
  let sequencia = 0;
  let historico = [];
  let inicioPergunta = 0;
  let quadro = 0;
  let respondendo = false;

  const formatar = n => n.toLocaleString('pt-BR');
  const poucoMovimento = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
    pontos = 0;
    acertos = 0;
    sequencia = 0;
    historico = [];
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

  function telaPergunta() {
    const p = rodada[indice];
    app.innerHTML = `
      <div class="quiz-screen quiz-play">
        <div class="quiz-hud">
          <span class="quiz-chip">Pergunta <strong>${indice + 1}</strong> de ${rodada.length}</span>
          <span class="quiz-chip"><strong data-quiz="pontos">${formatar(pontos)}</strong> pontos</span>
        </div>
        <div class="quiz-timebar" aria-hidden="true"><span></span></div>
        <div class="quiz-body">
          <div class="quiz-clock" aria-hidden="true">${TEMPO_POR_PERGUNTA}</div>
          <h3 class="quiz-question" tabindex="-1">${p.pergunta}<span class="sr-only"> Você tem ${TEMPO_POR_PERGUNTA} segundos.</span></h3>
        </div>
        <div class="quiz-answers" role="group" aria-label="Alternativas">
          ${p.alternativas.map((a, i) => `
            <button type="button" class="quiz-answer cor-${FORMAS[i].cor}" data-resposta="${i}" aria-keyshortcuts="${i + 1}">
              <svg class="quiz-shape" viewBox="0 0 24 24" aria-hidden="true">${FORMAS[i].svg}</svg>
              <span class="quiz-answer-text">${a.texto}</span>
              <span class="quiz-mark" aria-hidden="true"></span>
            </button>`).join('')}
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
      if (restante <= 0) { responder(null); return; }
      quadro = requestAnimationFrame(passo);
    };
    quadro = requestAnimationFrame(passo);
  }

  // escolha = índice da alternativa, ou null quando o tempo acaba
  function responder(escolha) {
    if (!respondendo) return;
    respondendo = false;
    cancelAnimationFrame(quadro);

    const p = rodada[indice];
    const decorrido = Math.min(TEMPO_POR_PERGUNTA, (performance.now() - inicioPergunta) / 1000);
    const indiceCerto = p.alternativas.findIndex(a => a.certa);
    const acertou = escolha === indiceCerto;
    const pontosAntes = pontos;
    let ganhos = 0;

    if (acertou) {
      // de 1000 (resposta imediata) até 500 (no último segundo)
      ganhos = Math.round(1000 * (1 - (decorrido / TEMPO_POR_PERGUNTA) / 2));
      pontos += ganhos;
      acertos++;
      sequencia++;
    } else {
      sequencia = 0;
    }
    historico.push(acertou);

    app.querySelectorAll('.quiz-answer').forEach((botao, i) => {
      botao.disabled = true;
      const marca = botao.querySelector('.quiz-mark');
      if (i === indiceCerto) {
        botao.classList.add('is-correct');
        marca.innerHTML = ICONE_CERTO;
      } else if (i === escolha) {
        botao.classList.add('is-wrong');
        marca.innerHTML = ICONE_ERRADO;
      } else {
        botao.classList.add('is-dim');
      }
    });

    const tipo = escolha === null ? 'tempo' : acertou ? 'certo' : 'errado';
    const tituloFeedback = { certo: 'Correto!', errado: 'Errou!', tempo: 'Tempo esgotado!' }[tipo];
    const ultima = indice === rodada.length - 1;
    const feedback = app.querySelector('.quiz-feedback');

    feedback.innerHTML = `
      <div class="feedback feedback--${tipo}">
        <p class="feedback-titulo">${tituloFeedback}${acertou ? ` <span class="feedback-pts">+${formatar(ganhos)} pontos</span>` : ''}</p>
        <p class="feedback-texto">${acertou ? '' : `<strong>Resposta certa:</strong> ${p.certa}. `}${p.explicacao}</p>
        <div class="feedback-rodape">
          <p class="feedback-total">Total: <strong>${formatar(pontos)}</strong> pontos · ${acertos} de ${indice + 1} acertos${sequencia >= 2 ? ` · ${sequencia} seguidas!` : ''}</p>
          <button type="button" class="btn btn-primary" data-quiz="${ultima ? 'final' : 'proxima'}">${ultima ? 'Ver resultado' : 'Próxima pergunta'} →</button>
        </div>
      </div>`;

    animarNumero(app.querySelector('[data-quiz="pontos"]'), pontosAntes, pontos, 700);
    feedback.querySelector('button').focus({ preventScroll: true });
    feedback.scrollIntoView({ behavior: poucoMovimento() ? 'auto' : 'smooth', block: 'nearest' });
  }

  function telaFinal() {
    const n = rodada.length;

    app.innerHTML = `
      <div class="quiz-screen quiz-end">
        <img class="quiz-trofeu" src="img/ai-dentro.jpeg" width="320" height="352" alt="">
        <p class="eyebrow">Fim de jogo</p>
        <p class="quiz-score"><span data-quiz="total">0</span></p>
        <p class="quiz-score-label">pontos</p>
        <p class="quiz-hits" tabindex="-1">Você acertou <strong>${acertos}</strong> de <strong>${n}</strong> perguntas</p>
        <ol class="quiz-dots" aria-label="Resumo das respostas">
          ${historico.map((ok, i) => `
            <li class="${ok ? 'dot--certo' : 'dot--errado'}" title="Pergunta ${i + 1}: ${ok ? 'acertou' : 'errou'}">
              <span aria-hidden="true">${i + 1}</span><span class="sr-only">Pergunta ${i + 1}: ${ok ? 'acertou' : 'errou'}</span>
            </li>`).join('')}
        </ol>
        <button type="button" class="btn btn-primary btn-lg" data-quiz="denovo">Jogar de novo</button>
      </div>`;

    app.querySelector('[data-quiz="total"]').textContent = formatar(poucoMovimento() ? pontos : 0);
    animarNumero(app.querySelector('[data-quiz="total"]'), 0, pontos, 1400);
    app.querySelector('.quiz-hits').focus({ preventScroll: true });
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
    if (resposta) { responder(Number(resposta.dataset.resposta)); return; }

    const botao = e.target.closest('button[data-quiz]');
    if (!botao) return;
    switch (botao.dataset.quiz) {
      case 'comecar':
      case 'denovo':
        novaRodada();
        rolarParaQuiz();
        telaPergunta();
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

  // Teclas 1 a 4 respondem (só com o quiz visível e a apresentação fechada)
  document.addEventListener('keydown', e => {
    if (!respondendo || e.altKey || e.ctrlKey || e.metaKey) return;
    if (document.documentElement.classList.contains('deck-aberto')) return;
    const numero = Number(e.key);
    if (!(numero >= 1 && numero <= 4)) return;
    const area = app.getBoundingClientRect();
    if (area.bottom < 0 || area.top > window.innerHeight) return;
    e.preventDefault();
    responder(numero - 1);
  });

  novaRodada();
  telaInicio();
})();
