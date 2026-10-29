/* =========================================================
   APRESENTAÇÃO DE SLIDES
   ---------------------------------------------------------
   Para editar o conteúdo, mexa só no array SLIDES abaixo.

   Tipos de slide e seus campos:
     capa        → aula, titulo, subtitulo, imagem
     frase       → titulo, texto, nota (opcional), imagem,
                   retrato (opcional: foto recortada que fica à direita)
     topicos     → titulo, topicos [lista], imagem (opcional)
     cards       → titulo, cards [{ marca, titulo, texto }], imagem (opcional)
     contraste   → titulo, esquerda e direita { titulo, itens, riscado },
                   simbolo, intro e rodape (opcionais)
     linha       → titulo, passos [lista], imagem
     integrantes → titulo, nomes [lista], agradecimento, referencia, imagem

   Todo slide aceita "rotulo" (texto pequeno acima do título) e
   "curto" (nome usado no roteiro, quando o título é longo).
   Dentro dos textos dá para usar <strong> e <em>.
   ========================================================= */

// Fotos do Unsplash (licença livre). Basta trocar o código da foto.
const FOTOS = {
  entardecer: '1504370805625-d32c54b16100',
  estradaEntardecer: '1511576661531-b34d7da5d0bb',
  terraArida: '1547234935-80c7145ec969',
  estradaSertao: '1494783367193-149034c05e8f',
  igreja: '1438032005730-c779502df39b',
  ceuEmCamadas: '1500964757637-c85e8a162699',
  solVermelho: '1495567720989-cebdbdd97913',
  velas: '1602523961358-f9f03dd557db',
  bibliotecaMagica: '1532012197267-da84d127e765',
  escrita: '1455390582262-044cdead277a',
  ceuEstrelado: '1419242902214-272b3f66ee7a',
  biblioteca: '1481627834876-b7833e8f5570',
  livroAberto: '1543002588-bfa74002ed7e',
  paginas: '1457369804613-52c61a468e7d',
  raiosDeSol: '1490682143684-14369e18dce8',
};

function unsplash(id, largura) {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${largura}&q=75`;
}

const SLIDES = [
  {
    tipo: 'capa',
    curto: 'Capa',
    rotulo: 'Literatura',
    aula: 'Aula 23',
    titulo: 'Vozes das Mulheres na Literatura Contemporânea Brasileira',
    subtitulo: 'Parte 1 · <em>A cabeça do santo</em>, de Socorro Acioli',
    imagem: FOTOS.entardecer,
    alt: 'Pôr do sol dourado sobre morros secos',
  },
  {
    tipo: 'frase',
    rotulo: 'Introdução',
    titulo: 'A literatura feita por mulheres',
    texto: 'Vai <strong>além da autoria</strong>: é um movimento de <strong>revisão histórica</strong> e de <strong>afirmação política</strong>.',
    imagem: FOTOS.escrita,
    alt: 'Caneta-tinteiro escrevendo em uma folha de caderno',
  },
  {
    tipo: 'topicos',
    rotulo: 'Literatura feita por mulheres',
    titulo: 'Ruptura com o silenciamento',
    topicos: [
      'Por muito tempo, <strong>excluídas do cânone</strong>',
      'Hoje ocupam <strong>espaços de destaque</strong>',
      'Narram as <strong>próprias vivências</strong>',
      'Sem a mediação do <strong>olhar masculino</strong>',
    ],
    imagem: FOTOS.biblioteca,
    alt: 'Corredor de uma biblioteca antiga com estantes cheias de livros',
  },
  {
    tipo: 'contraste',
    rotulo: 'Literatura feita por mulheres',
    titulo: 'Desconstrução de estereótipos',
    simbolo: '→',
    esquerda: { titulo: 'Antes', itens: ['“Musa passiva”', '“Mulher angelical”'], riscado: true },
    direita: { titulo: 'Agora', itens: ['Complexas', 'Contraditórias', 'Autônomas', 'Com desejos próprios'] },
  },
  {
    tipo: 'topicos',
    rotulo: 'Literatura feita por mulheres',
    titulo: 'Literatura como resistência',
    topicos: [
      'Denuncia <strong>violências</strong> físicas e simbólicas',
      'Discute o <strong>corpo</strong> e a <strong>ancestralidade</strong>',
      'Questiona as <strong>estruturas de poder</strong> da sociedade brasileira',
    ],
    imagem: FOTOS.livroAberto,
    alt: 'Livro aberto com as páginas se abrindo em leque',
  },
  {
    tipo: 'frase',
    rotulo: 'Realismo Mágico',
    titulo: 'O que é Realismo Mágico?',
    texto: 'Estilo consolidado na <strong>América Latina</strong> que funde a <strong>realidade cotidiana</strong> com <strong>elementos fantásticos</strong>.',
    imagem: FOTOS.bibliotecaMagica,
    alt: 'Livro aberto flutuando no meio de uma livraria antiga',
  },
  {
    tipo: 'cards',
    curto: 'Características do Realismo Mágico',
    rotulo: 'Realismo Mágico',
    titulo: 'Características',
    cards: [
      { marca: 'a', titulo: 'O extraordinário é normal', texto: 'Os personagens aceitam o sobrenatural como parte da vida, ao contrário da Fantasia e do Terror.' },
      { marca: 'b', titulo: 'Função simbólica', texto: 'O “mágico” é metáfora de questões sociais, políticas ou psicológicas.' },
      { marca: 'c', titulo: 'Tempo e espaço', texto: 'Tempo muitas vezes cíclico e espaço com carga simbólica, que reflete o estado emocional dos personagens.' },
    ],
    imagem: FOTOS.ceuEstrelado,
    alt: 'Céu estrelado em tons de roxo e rosa',
  },
  {
    tipo: 'frase',
    curto: 'Socorro Acioli e A cabeça do santo',
    rotulo: 'A obra',
    titulo: 'Socorro Acioli e <em>A cabeça do santo</em>',
    texto: 'Obra fundamental da <strong>literatura cearense contemporânea</strong>, que une <strong>rigor estético</strong> e <strong>cultura popular</strong>.',
    nota: 'Companhia das Letras, 2014',
    imagem: FOTOS.paginas,
    alt: 'Parede coberta de páginas de livros antigos',
    retrato: 'img/socorro-acioli.png',
    retratoAlt: 'Retrato da escritora Socorro Acioli',
  },
  {
    tipo: 'topicos',
    rotulo: 'A obra',
    titulo: 'A inspiração real',
    topicos: [
      'Uma estátua de <strong>Santo Antônio</strong> em <strong>Caridade (CE)</strong>',
      'A cabeça ficou <strong>separada do corpo</strong> por décadas',
      'O motivo: um <strong>erro técnico</strong>',
    ],
    imagem: FOTOS.igreja,
    alt: 'Interior de uma igreja com vitrais coloridos e luminárias acesas (imagem ilustrativa)',
  },
  {
    tipo: 'topicos',
    rotulo: 'A obra',
    titulo: 'O protagonista Samuel',
    topicos: [
      'Representa a <strong>busca pela identidade</strong>',
      'Procura o <strong>pai desconhecido</strong>',
      'É <strong>transfigurado</strong> pela dor e pela jornada',
    ],
    imagem: FOTOS.estradaEntardecer,
    alt: 'Estrada vazia atravessando um campo seco ao entardecer',
  },
  {
    tipo: 'cards',
    rotulo: 'A obra',
    titulo: 'Temas centrais',
    cards: [
      { marca: '01', titulo: 'Religiosidade popular', texto: 'A fé como ferramenta de <strong>sobrevivência</strong> e de <strong>barganha ética</strong>.' },
      { marca: '02', titulo: 'Estética da escassez', texto: 'A falta de comida, água e telhado espelha a <strong>escassez de afetos</strong> e a dureza das relações humanas.' },
    ],
    imagem: FOTOS.velas,
    alt: 'Três velas acesas em ambiente escuro',
  },
  {
    tipo: 'contraste',
    rotulo: 'Temas centrais',
    titulo: 'Vozes femininas na obra',
    simbolo: '×',
    esquerda: { titulo: 'Helenice', itens: ['Brutalidade', 'Expulsa Samuel com a vassoura'] },
    direita: { titulo: 'A moça da bodega', itens: ['Empatia sofrida', 'Dá pão e água a Samuel'] },
    rodape: 'Mulheres <strong>moldadas pela hostilidade do meio</strong>.',
  },
  {
    tipo: 'topicos',
    rotulo: 'Temas centrais',
    titulo: 'Candeia como personagem',
    topicos: [
      'Descrita com <strong>metáforas de morte</strong>: “cemitério de gigantes”, “casas mortas”',
      'Não é só cenário: é um <strong>organismo em agonia</strong>',
      '<strong>Interage</strong> com o herói',
    ],
    imagem: FOTOS.terraArida,
    alt: 'Paisagem árida de terra avermelhada e morros de pedra',
  },
  {
    tipo: 'contraste',
    rotulo: 'Temas centrais',
    titulo: 'A dialética do sofrimento',
    intro: 'A dor pode gerar…',
    simbolo: '↔',
    esquerda: { titulo: 'Egoísmo', itens: ['Instinto de preservação'] },
    direita: { titulo: 'Solidariedade', itens: ['Pena e cuidado com o outro'] },
    rodape: 'Fraquezas e instintos <strong>humanizam</strong> os personagens.',
  },
  {
    tipo: 'linha',
    rotulo: 'Leitura',
    titulo: 'O trecho “Café”',
    passos: [
      'Ao entardecer, Samuel chega a <strong>Candeia</strong>, um povoado quase abandonado',
      'Na bodega, <strong>Helenice</strong> o recebe com hostilidade e uma vassoura',
      'Uma <strong>moça</strong> lhe dá pão velho e água: sente pena e, ao mesmo tempo, alívio por ver alguém que sofre mais',
      'Samuel é <strong>expulso</strong> da bodega',
      'Encontra <strong>Rosa</strong>, senhora gentil. Ele esperava que fosse a avó <strong>Niceia</strong>',
    ],
    imagem: FOTOS.ceuEmCamadas,
    alt: 'Entardecer em tons de laranja e lilás sobre camadas de montanhas',
  },
  {
    tipo: 'cards',
    rotulo: 'Análise',
    titulo: 'Análise da linguagem',
    cards: [
      { marca: '“', titulo: '“Cemitério de gigantes”', texto: 'Algo que já foi grandioso e agora está morto ou estagnado: um tom de <strong>decadência épica</strong>.' },
      { marca: '“', titulo: '“Funeral do sol”', texto: 'O fim do dia vira um evento de <strong>morte cíclica</strong>, que cria um clima de desesperança.' },
    ],
    imagem: FOTOS.solVermelho,
    alt: 'Sol vermelho se pondo entre nuvens',
  },
  {
    tipo: 'contraste',
    rotulo: 'Análise',
    titulo: 'Mulheres reais, não arquétipos',
    esquerda: { titulo: 'A moça', itens: ['Pensamento “egoísta”', 'A dor extrema cria mecanismos de defesa'] },
    direita: { titulo: 'Helenice', itens: ['“Mais bicho que ele”', 'A dureza da sobrevivência no sertão'] },
    rodape: 'Nenhuma das duas é <strong>“totalmente boa”</strong> ou <strong>“totalmente má”</strong>.',
  },
  {
    tipo: 'frase',
    rotulo: 'Análise',
    titulo: 'Espaço e protagonista',
    texto: 'A hostilidade de Candeia (o <strong>pão seco</strong>, a <strong>água suja</strong>) espelha a <strong>miséria</strong> e a <strong>transfiguração</strong> do próprio Samuel.',
    nota: 'Na apostila: Atividade 2, alternativa d',
    imagem: FOTOS.estradaSertao,
    alt: 'Estrada reta atravessando uma planície seca',
  },
  {
    tipo: 'frase',
    rotulo: 'Fechamento',
    titulo: 'Conclusão',
    texto: 'A literatura de autoria feminina dá <strong>voz</strong>, <strong>complexidade</strong> e <strong>humanidade</strong> a personagens e realidades antes silenciadas.',
    imagem: FOTOS.raiosDeSol,
    alt: 'Raios de sol atravessando um vale ao entardecer',
  },
  {
    tipo: 'integrantes',
    rotulo: 'Grupo',
    titulo: 'Integrantes',
    nomes: ['Pedro Vilela', 'Eduarda Monforte', 'Luisa Lima', 'Rebeca Mendes', 'Mariana Brandão'],
    agradecimento: 'Agradecemos a atenção!',
    referencia: 'ACIOLI, S. <em>A cabeça do santo</em>. São Paulo: Companhia das Letras, 2014.',
    imagem: FOTOS.entardecer,
    alt: 'Pôr do sol dourado sobre morros secos',
  },
];

/* =========================================================
   Daqui para baixo é o funcionamento da apresentação.
   ========================================================= */
(function () {
  'use strict';

  const total = SLIDES.length;
  const deck = document.getElementById('deck');
  const stage = document.getElementById('deck-stage');
  const barra = document.getElementById('deck-barra');
  const contador = document.getElementById('deck-contador');
  const aviso = document.getElementById('deck-aviso');
  const btnAnterior = deck.querySelector('[data-acao="anterior"]');
  const btnProximo = deck.querySelector('[data-acao="proximo"]');
  const btnTelaCheia = deck.querySelector('[data-acao="tela-cheia"]');
  const restoDaPagina = document.querySelectorAll('body > .skip-link, body > header, body > main, body > footer');

  const elementos = [];
  let atual = 0;
  let aberto = false;
  let scrollAnterior = 0;
  let focoAnterior = null;
  let manterAbertoAoSairDaTelaCheia = false;
  let timerOcioso = null;

  /* ---------- Montagem do HTML de cada slide ---------- */
  function textoPuro(html) {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent;
  }

  const nomeDoSlide = s => s.curto || textoPuro(s.titulo);

  // A imagem fica em data-src e só carrega quando o slide está perto de aparecer
  const imagem = (s, largura) =>
    s.imagem ? `<img data-src="${unsplash(s.imagem, largura)}" alt="${s.alt || ''}" decoding="async">` : '';

  const fundo = s => (s.imagem ? `<div class="slide-bg">${imagem(s, 1920)}</div>` : '');
  const rotulo = s => (s.rotulo ? `<p class="slide-rotulo a" style="--i:0">${s.rotulo}</p>` : '');
  const titulo = s => `<h2 class="slide-titulo a" style="--i:1">${s.titulo}</h2>`;
  const rodape = '<p class="slide-rodape" aria-hidden="true">Aula 23 · Vozes das Mulheres na Literatura</p>';
  const lista = (itens, inicio) => itens.map((t, i) => `<li class="a" style="--i:${i + inicio}">${t}</li>`).join('');

  const MODELOS = {
    capa: s => `
      ${fundo(s)}
      <div class="slide-inner slide-inner--capa">
        ${rotulo(s)}
        <p class="capa-aula a" style="--i:1">${s.aula}</p>
        <h2 class="capa-titulo a" style="--i:2">${s.titulo}</h2>
        <p class="capa-sub a" style="--i:3">${s.subtitulo}</p>
      </div>`,

    frase: s => `
      ${fundo(s)}
      <div class="slide-inner">
        ${rotulo(s)}
        ${titulo(s)}
        <p class="frase a" style="--i:2">${s.texto}</p>
        ${s.nota ? `<p class="slide-nota a" style="--i:3">${s.nota}</p>` : ''}
      </div>
      ${s.retrato ? `<figure class="slide-retrato a" style="--i:2"><img data-src="${s.retrato}" alt="${s.retratoAlt || ''}" decoding="async"></figure>` : ''}
      ${rodape}`,

    topicos: s => `
      <div class="slide-inner slide-inner--split${s.imagem ? '' : ' sem-imagem'}">
        <div>
          ${rotulo(s)}
          ${titulo(s)}
          <ul class="topicos">${lista(s.topicos, 2)}</ul>
        </div>
        ${s.imagem ? `<figure class="split-media a" style="--i:1">${imagem(s, 1100)}</figure>` : ''}
      </div>
      ${rodape}`,

    cards: s => `
      ${fundo(s)}
      <div class="slide-inner">
        ${rotulo(s)}
        ${titulo(s)}
        <div class="slide-cards" style="--n:${s.cards.length}">
          ${s.cards.map((c, i) => `
            <div class="slide-card a" style="--i:${i + 2}">
              ${c.marca ? `<span class="slide-card-marca" aria-hidden="true">${c.marca}</span>` : ''}
              <h3>${c.titulo}</h3>
              <p>${c.texto}</p>
            </div>`).join('')}
        </div>
      </div>
      ${rodape}`,

    contraste: s => {
      const lado = (l, classe, i) => `
        <div class="contraste-lado ${classe} a" style="--i:${i}">
          <h3>${l.titulo}</h3>
          <ul${l.riscado ? ' class="riscado"' : ''}>${l.itens.map(t => `<li>${t}</li>`).join('')}</ul>
        </div>`;
      return `
        <div class="slide-inner">
          ${rotulo(s)}
          ${titulo(s)}
          ${s.intro ? `<p class="contraste-intro a" style="--i:2">${s.intro}</p>` : ''}
          <div class="contraste${s.simbolo ? '' : ' contraste--duplo'}">
            ${lado(s.esquerda, 'contraste-lado--a', 3)}
            ${s.simbolo ? `<span class="contraste-simbolo a" style="--i:4" aria-hidden="true">${s.simbolo}</span>` : ''}
            ${lado(s.direita, 'contraste-lado--b', 5)}
          </div>
          ${s.rodape ? `<p class="contraste-rodape a" style="--i:6">${s.rodape}</p>` : ''}
        </div>
        ${rodape}`;
    },

    linha: s => `
      <div class="slide-inner slide-inner--split slide-inner--linha">
        <div>
          ${rotulo(s)}
          ${titulo(s)}
          <ol class="linha">${lista(s.passos.map(p => `<span>${p}</span>`), 2)}</ol>
        </div>
        ${s.imagem ? `<figure class="split-media a" style="--i:1">${imagem(s, 1100)}</figure>` : ''}
      </div>
      ${rodape}`,

    integrantes: s => `
      ${fundo(s)}
      <div class="slide-inner slide-inner--integrantes">
        ${rotulo(s)}
        ${titulo(s)}
        <ul class="nomes">${lista(s.nomes, 2)}</ul>
        <p class="integrantes-agradece a" style="--i:${s.nomes.length + 2}">${s.agradecimento}</p>
        <p class="integrantes-ref a" style="--i:${s.nomes.length + 3}">${s.referencia}</p>
      </div>`,
  };

  function criarSlide(s, i) {
    const el = document.createElement('section');
    el.className = `slide slide--${s.tipo}${s.retrato ? ' slide--com-retrato' : ''}`;
    el.setAttribute('role', 'group');
    el.setAttribute('aria-roledescription', 'slide');
    el.setAttribute('aria-label', `${i + 1} de ${total}: ${nomeDoSlide(s)}`);
    el.innerHTML = (MODELOS[s.tipo] || MODELOS.frase)(s);
    return el;
  }

  function carregarImagens(el) {
    if (!el) return;
    el.querySelectorAll('img[data-src]').forEach(img => {
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
    });
  }

  // Se a foto não carregar, some e fica o gradiente de fundo
  function esconderImagemQuebrada(e) {
    if (e.target.tagName === 'IMG') e.target.hidden = true;
  }

  SLIDES.forEach((s, i) => {
    const el = criarSlide(s, i);
    el.setAttribute('aria-hidden', 'true');
    el.inert = true;
    elementos.push(el);
    stage.appendChild(el);
  });
  stage.addEventListener('error', esconderImagemQuebrada, true);

  /* ---------- Navegação ---------- */
  function irPara(n) {
    n = Math.max(0, Math.min(total - 1, n));
    elementos.forEach((el, i) => {
      const ativo = i === n;
      el.classList.toggle('is-active', ativo);
      el.classList.toggle('is-before', i < n);
      el.setAttribute('aria-hidden', String(!ativo));
      el.inert = !ativo;
    });
    for (let i = n - 1; i <= n + 2; i++) carregarImagens(elementos[i]);

    atual = n;
    barra.style.transform = `scaleX(${(n + 1) / total})`;
    contador.textContent = `${n + 1} / ${total}`;
    btnAnterior.disabled = n === 0;
    btnProximo.disabled = n === total - 1;
    aviso.textContent = `Slide ${n + 1} de ${total}: ${nomeDoSlide(SLIDES[n])}`;
  }

  const proximo = () => irPara(atual + 1);
  const anterior = () => irPara(atual - 1);

  /* ---------- Tela cheia ---------- */
  const elementoTelaCheia = () => document.fullscreenElement || document.webkitFullscreenElement;

  function pedirTelaCheia() {
    const pedir = deck.requestFullscreen || deck.webkitRequestFullscreen;
    if (!pedir) return;
    manterAbertoAoSairDaTelaCheia = false;
    try {
      const promessa = pedir.call(deck);
      if (promessa && promessa.catch) promessa.catch(() => {});
    } catch (erro) { /* navegador recusou: segue sem tela cheia */ }
  }

  function sairTelaCheia() {
    const sair = document.exitFullscreen || document.webkitExitFullscreen;
    if (!sair || !elementoTelaCheia()) return;
    try {
      const promessa = sair.call(document);
      if (promessa && promessa.catch) promessa.catch(() => {});
    } catch (erro) { /* ignora */ }
  }

  function alternarTelaCheia() {
    if (elementoTelaCheia()) {
      manterAbertoAoSairDaTelaCheia = true;
      sairTelaCheia();
    } else {
      pedirTelaCheia();
    }
  }

  function aoMudarTelaCheia() {
    const emTelaCheia = Boolean(elementoTelaCheia());
    deck.classList.toggle('is-fullscreen', emTelaCheia);
    btnTelaCheia.setAttribute('aria-pressed', String(emTelaCheia));
    btnTelaCheia.setAttribute('aria-label', emTelaCheia ? 'Sair da tela cheia' : 'Entrar em tela cheia');
    if (emTelaCheia) return;

    if (manterAbertoAoSairDaTelaCheia) {
      manterAbertoAoSairDaTelaCheia = false;
    } else if (aberto) {
      // ESC dentro da tela cheia: o navegador sai da tela cheia e nós fechamos a apresentação
      fechar();
    } else {
      restaurarRolagem();
    }
  }

  document.addEventListener('fullscreenchange', aoMudarTelaCheia);
  document.addEventListener('webkitfullscreenchange', aoMudarTelaCheia);

  if (!deck.requestFullscreen && !deck.webkitRequestFullscreen) btnTelaCheia.hidden = true;

  /* ---------- Abrir e fechar ---------- */
  function abrir(inicio) {
    inicio = inicio || 0;
    if (aberto) { irPara(inicio); return; }
    aberto = true;
    scrollAnterior = window.scrollY;
    focoAnterior = document.activeElement;

    deck.hidden = false;
    pedirTelaCheia();
    document.documentElement.classList.add('deck-aberto');
    restoDaPagina.forEach(el => { el.inert = true; el.setAttribute('aria-hidden', 'true'); });

    elementos.forEach(el => el.classList.remove('is-active', 'is-before'));
    // força o navegador a calcular o estado inicial, para as transições de entrada rodarem
    void deck.offsetWidth;
    deck.classList.add('is-open');
    irPara(inicio);
    deck.focus({ preventScroll: true });
    acordar();
  }

  function fechar() {
    if (!aberto) return;
    aberto = false;
    clearTimeout(timerOcioso);
    sairTelaCheia();

    deck.classList.remove('is-open', 'is-idle');
    deck.hidden = true;
    document.documentElement.classList.remove('deck-aberto');
    restoDaPagina.forEach(el => { el.inert = false; el.removeAttribute('aria-hidden'); });

    restaurarRolagem();
    if (focoAnterior && document.contains(focoAnterior)) focoAnterior.focus({ preventScroll: true });
  }

  // Volta exatamente para o ponto da página onde a pessoa estava
  function restaurarRolagem() {
    const html = document.documentElement;
    const comportamento = html.style.scrollBehavior;
    html.style.scrollBehavior = 'auto';
    window.scrollTo(0, scrollAnterior);
    html.style.scrollBehavior = comportamento;
  }

  /* ---------- Controles escondem com o mouse parado ---------- */
  function acordar() {
    deck.classList.remove('is-idle');
    clearTimeout(timerOcioso);
    timerOcioso = setTimeout(() => { if (aberto) deck.classList.add('is-idle'); }, 2800);
  }
  deck.addEventListener('mousemove', acordar);

  /* ---------- Teclado ---------- */
  document.addEventListener('keydown', e => {
    if (!aberto || e.altKey || e.ctrlKey || e.metaKey) return;
    const emBotao = e.target.closest && e.target.closest('button');

    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
      case 'PageDown':
        proximo();
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
      case 'PageUp':
        anterior();
        break;
      case ' ':
      case 'Spacebar':
      case 'Enter':
        if (emBotao) return; // deixa o botão focado funcionar normalmente
        if (e.shiftKey) anterior(); else proximo();
        break;
      case 'Home':
        irPara(0);
        break;
      case 'End':
        irPara(total - 1);
        break;
      case 'Escape':
        fechar();
        break;
      case 'f':
      case 'F':
        alternarTelaCheia();
        break;
      default:
        return;
    }
    e.preventDefault();
    if (aberto) acordar();
  });

  /* ---------- Botões da apresentação ---------- */
  deck.addEventListener('click', e => {
    const botao = e.target.closest('[data-acao]');
    if (!botao) return;
    const acao = botao.dataset.acao;
    if (acao === 'fechar') { fechar(); return; }
    if (acao === 'proximo') proximo();
    if (acao === 'anterior') anterior();
    if (acao === 'tela-cheia') alternarTelaCheia();
    // clique com mouse ou dedo: devolve o foco ao slide para a barra de espaço continuar avançando
    if (e.detail > 0) deck.focus({ preventScroll: true });
    acordar();
  });

  /* ---------- Swipe no celular ---------- */
  let toque = null;
  deck.addEventListener('touchstart', e => {
    acordar();
    if (e.touches.length !== 1) { toque = null; return; }
    toque = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }, { passive: true });

  deck.addEventListener('touchend', e => {
    if (!toque || e.target.closest('button')) { toque = null; return; }
    const dx = e.changedTouches[0].clientX - toque.x;
    const dy = e.changedTouches[0].clientY - toque.y;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.2) {
      if (dx < 0) proximo(); else anterior();
    }
    toque = null;
  }, { passive: true });

  /* ---------- Botões do site que abrem os slides ---------- */
  document.addEventListener('click', e => {
    const botao = e.target.closest('[data-abrir-slides]');
    if (!botao) return;
    e.preventDefault();
    abrir(Number(botao.dataset.slide) || 0);
  });

  window.Apresentacao = { abrir, fechar };
})();
