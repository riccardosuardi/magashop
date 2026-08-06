/* Ottica MagaShop — comportamenti condivisi da index.html e privacy.html */

const MOTO_RIDOTTO = window.matchMedia('(prefers-reduced-motion: reduce)');

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

/* ---------- Comparsa dei blocchi allo scorrimento ----------
   Gli elementi con .stagger dentro uno stesso contenitore entrano uno dopo l'altro:
   l'indice finisce in --i, il ritardo lo calcola il CSS. */
(function () {
  const revealEls = document.querySelectorAll('.reveal');
  if (!revealEls.length) return;

  document.querySelectorAll('.stagger').forEach((el) => {
    const fratelli = [...el.parentElement.children].filter((n) => n.classList.contains('stagger'));
    el.style.setProperty('--i', fratelli.indexOf(el));
  });

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

/* ---------- Numeri che salgono ----------
   data-conta è il valore finale, data-partenza quello di avvio (per il 1973 non ha
   senso partire da zero). Parte una volta sola, quando la fascia entra in vista. */
(function () {
  const numeri = document.querySelectorAll('[data-conta]');
  if (!numeri.length || MOTO_RIDOTTO.matches) return;

  const anima = (el) => {
    const fine = Number(el.dataset.conta);
    const inizio = Number(el.dataset.partenza || 0);
    const durata = 1100;
    const avvio = performance.now();

    const passo = (ora) => {
      const t = Math.min((ora - avvio) / durata, 1);
      // easing in uscita: parte veloce e si posa sul valore finale
      const e = 1 - Math.pow(1 - t, 3);
      el.textContent = Math.round(inizio + (fine - inizio) * e);
      if (t < 1) requestAnimationFrame(passo);
    };
    requestAnimationFrame(passo);
  };

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          anima(e.target);
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.6 }
  );
  numeri.forEach((el) => io.observe(el));
})();

/* ---------- Parallasse leggera del pattern nell'hero ---------- */
(function () {
  const pattern = document.querySelector('.hero-pattern');
  if (!pattern || MOTO_RIDOTTO.matches) return;

  let inCoda = false;
  const aggiorna = () => {
    // Pochi pixel: deve dare profondità, non far muovere la pagina.
    pattern.style.transform = `translate3d(0, ${window.scrollY * 0.12}px, 0)`;
    inCoda = false;
  };

  window.addEventListener(
    'scroll',
    () => {
      if (inCoda) return;
      inCoda = true;
      requestAnimationFrame(aggiorna);
    },
    { passive: true }
  );
})();

/* ---------- Nastro dei brand ----------
   I marchi stanno in assets/brands.json. Se la voce ha una chiave "file" viene mostrato
   il logo da assets/brands/, altrimenti il nome composto: così la sezione funziona già
   oggi che i loghi ufficiali non ci sono, e domani ogni logo prende il posto della
   propria scritta senza toccare nient'altro. */
(function () {
  const root = document.querySelector('[data-nastro]');
  const elenco = document.querySelector('[data-elenco]');
  if (!root) return;

  const righe = [...root.querySelectorAll('[data-riga]')];

  const esc = (t) =>
    String(t).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  const voce = (b) =>
    b.file
      ? `<div class="brand-card"><img src="assets/brands/${esc(b.file)}" alt="${esc(b.nome)}" loading="lazy"></div>`
      : `<div class="brand-card">${esc(b.nome)}</div>`;

  fetch('assets/brands.json')
    .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
    .then((brand) => {
      const validi = brand.filter((b) => b && b.nome);
      if (!validi.length) {
        root.remove();
        if (elenco) elenco.remove();
        return;
      }

      // Prima metà alfabetica sopra, seconda sotto: l'ordine A-Z si legge riga per riga.
      const meta = Math.ceil(validi.length / 2);
      const gruppi = [validi.slice(0, meta), validi.slice(meta)];

      righe.forEach((riga, i) => {
        const html = gruppi[i].map(voce).join('');
        // La sequenza va ripetuta perché il ciclo si richiuda senza salto, ma la copia
        // non deve essere letta due volte da chi usa uno screen reader.
        const copia = MOTO_RIDOTTO.matches
          ? ''
          : `<span class="nastro-copia" aria-hidden="true" style="display:contents">${html}</span>`;
        riga.innerHTML = html + copia;
      });

      // L'elenco completo, leggibile una volta sola: per gli assistivi e per i motori.
      if (elenco) elenco.textContent = validi.map((b) => b.nome).join(' · ');
    })
    .catch(() => {
      // Meglio nessun nastro che un nastro vuoto.
      root.remove();
      if (elenco) elenco.remove();
    });
})();

/* ---------- Carosello recensioni ----------
   Le recensioni stanno in assets/recensioni.json: per cambiarle si tocca solo quel
   file. Se un giorno l'accesso alla Google Business Profile API viene approvato,
   il file lo riscriverà un processo automatico e qui non cambia niente. */
(function () {
  const root = document.querySelector('[data-carosello]');
  if (!root) return;

  const pista = root.querySelector('[data-pista]');
  const puntiBox = root.querySelector('[data-punti]');
  const bottonePrec = root.querySelector('[data-prec]');
  const bottoneSucc = root.querySelector('[data-succ]');

  const ATTESA = 7000;
  let indice = 0;
  let slide = [];
  let timer = null;

  const stella = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z"/></svg>`;
  const segnaposto = `<svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`;

  const esc = (t) =>
    String(t).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  function disegna(recensioni) {
    pista.innerHTML = recensioni
      .map(
        (r, i) => `
        <div class="carosello-slide" role="group" aria-roledescription="recensione"
             aria-label="${i + 1} di ${recensioni.length}">
          <article class="review-card">
            <span class="review-sede">${segnaposto}${esc(r.sede)}</span>
            <div class="stars" aria-label="${r.stelle} stelle su 5">${stella.repeat(r.stelle)}</div>
            <blockquote>${esc(r.testo)}</blockquote>
            <p class="review-meta"><strong>${esc(r.autore)}</strong>Recensione Google</p>
          </article>
        </div>`
      )
      .join('');

    puntiBox.innerHTML = recensioni
      .map((r, i) => `<button type="button" role="tab" aria-label="Recensione di ${esc(r.sede)}"${i === 0 ? ' aria-current="true"' : ''}></button>`)
      .join('');

    slide = [...pista.children];
    puntiBox.querySelectorAll('button').forEach((b, i) => {
      b.addEventListener('click', () => {
        vai(i);
        riavvia();
      });
    });
  }

  function vai(i) {
    indice = (i + slide.length) % slide.length;
    pista.style.transform = `translateX(-${indice * 100}%)`;
    puntiBox.querySelectorAll('button').forEach((b, n) => {
      if (n === indice) b.setAttribute('aria-current', 'true');
      else b.removeAttribute('aria-current');
    });
  }

  function avvia() {
    // Con le animazioni ridotte il carosello resta fermo: si sfoglia a mano.
    if (MOTO_RIDOTTO.matches || slide.length < 2) return;
    timer = setInterval(() => vai(indice + 1), ATTESA);
  }
  const ferma = () => clearInterval(timer);
  const riavvia = () => {
    ferma();
    avvia();
  };

  bottonePrec.addEventListener('click', () => {
    vai(indice - 1);
    riavvia();
  });
  bottoneSucc.addEventListener('click', () => {
    vai(indice + 1);
    riavvia();
  });

  // Si ferma quando l'utente sta guardando o usando i controlli.
  root.addEventListener('mouseenter', ferma);
  root.addEventListener('mouseleave', avvia);
  root.addEventListener('focusin', ferma);
  root.addEventListener('focusout', (e) => {
    if (!root.contains(e.relatedTarget)) avvia();
  });

  // Swipe su mobile.
  let xIniziale = null;
  pista.addEventListener('touchstart', (e) => { xIniziale = e.touches[0].clientX; }, { passive: true });
  pista.addEventListener('touchend', (e) => {
    if (xIniziale === null) return;
    const delta = e.changedTouches[0].clientX - xIniziale;
    if (Math.abs(delta) > 45) vai(indice + (delta < 0 ? 1 : -1));
    xIniziale = null;
    riavvia();
  }, { passive: true });

  fetch('assets/recensioni.json')
    .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
    .then((recensioni) => {
      const valide = recensioni.filter((r) => r.testo && r.autore && r.sede);
      if (!valide.length) {
        root.remove();
        return;
      }
      disegna(valide);
      vai(0);
      avvia();
    })
    .catch(() => {
      // Meglio nessuna sezione che una sezione vuota o rotta.
      root.remove();
    });
})();
