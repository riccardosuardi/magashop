/* Ottica MagaShop — comportamenti condivisi da index.html e privacy.html */

/* ---------- Menu a panino ----------
   Il pulsante e il pannello esistono nell'HTML di entrambe le pagine; sopra i 940px
   li nasconde il CSS. Se il JavaScript non parte il pannello resta chiuso: le stesse
   voci sono comunque nel footer, e la CTA resta nella barra. */
(function () {
  const toggle = document.querySelector('.nav-toggle');
  const panel = document.getElementById('menu-mobile');
  if (!toggle || !panel) return;

  const BREAKPOINT = window.matchMedia('(min-width: 941px)');

  function open() {
    panel.hidden = false;
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Chiudi il menu');
    document.body.style.overflow = 'hidden';
  }

  function close({ restoreFocus = false } = {}) {
    panel.hidden = true;
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Apri il menu');
    document.body.style.overflow = '';
    if (restoreFocus) toggle.focus();
  }

  const isOpen = () => toggle.getAttribute('aria-expanded') === 'true';

  toggle.addEventListener('click', () => (isOpen() ? close() : open()));

  // Una voce scelta porta a destinazione: il pannello non deve restare davanti.
  panel.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => close());
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen()) close({ restoreFocus: true });
  });

  // Tornando alla larghezza da desktop riappare il menu esteso: senza questo reset
  // resterebbero visibili tutti e due.
  BREAKPOINT.addEventListener('change', (e) => {
    if (e.matches && isOpen()) close();
  });
})();

/* ---------- Comparsa dei blocchi allo scorrimento ---------- */
(function () {
  const revealEls = document.querySelectorAll('.reveal');
  if (!revealEls.length) return;

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  revealEls.forEach((el) => io.observe(el));
})();
