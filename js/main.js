/* =========================================================
   INTERAÇÕES GERAIS DO SITE
   Cabeçalho, menu do celular, link ativo e animações ao rolar
   ========================================================= */
(function () {
  'use strict';

  const header = document.querySelector('.site-header');
  const botaoMenu = document.querySelector('.nav-toggle');
  const menu = document.getElementById('menu');

  /* ---------- Cabeçalho ganha fundo ao rolar ---------- */
  const aoRolar = () => header.classList.toggle('is-scrolled', window.scrollY > 24);
  aoRolar();
  window.addEventListener('scroll', aoRolar, { passive: true });

  /* ---------- Menu hambúrguer ---------- */
  function alternarMenu(abrir) {
    botaoMenu.setAttribute('aria-expanded', String(abrir));
    botaoMenu.setAttribute('aria-label', abrir ? 'Fechar menu' : 'Abrir menu');
    menu.classList.toggle('is-open', abrir);
    header.classList.toggle('menu-aberto', abrir);
  }

  botaoMenu.addEventListener('click', () => {
    alternarMenu(botaoMenu.getAttribute('aria-expanded') !== 'true');
  });

  // fecha ao escolher um item, ao clicar fora ou com ESC
  menu.addEventListener('click', e => {
    if (e.target.closest('a, button')) alternarMenu(false);
  });
  document.addEventListener('click', e => {
    if (menu.classList.contains('is-open') && !e.target.closest('.nav')) alternarMenu(false);
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && menu.classList.contains('is-open')) {
      alternarMenu(false);
      botaoMenu.focus();
    }
  });

  const telaGrande = window.matchMedia('(min-width: 961px)');
  const aoMudarTela = e => { if (e.matches) alternarMenu(false); };
  if (telaGrande.addEventListener) telaGrande.addEventListener('change', aoMudarTela);
  else telaGrande.addListener(aoMudarTela);

  /* ---------- Link ativo e animações ao rolar ---------- */
  const links = [...menu.querySelectorAll('a[href^="#"]')];
  const secoes = document.querySelectorAll('main > section[id]');
  const revelar = document.querySelectorAll('.reveal');

  if (!('IntersectionObserver' in window)) {
    revelar.forEach(el => el.classList.add('is-visible'));
    return;
  }

  const observarSecoes = new IntersectionObserver(entradas => {
    entradas.forEach(entrada => {
      if (!entrada.isIntersecting) return;
      links.forEach(link => {
        const ativo = link.getAttribute('href') === `#${entrada.target.id}`;
        link.classList.toggle('is-active', ativo);
        if (ativo) link.setAttribute('aria-current', 'true');
        else link.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  secoes.forEach(secao => observarSecoes.observe(secao));

  const observarRevelar = new IntersectionObserver((entradas, observador) => {
    entradas.forEach(entrada => {
      if (!entrada.isIntersecting) return;
      entrada.target.classList.add('is-visible');
      observador.unobserve(entrada.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  revelar.forEach(el => observarRevelar.observe(el));
})();
