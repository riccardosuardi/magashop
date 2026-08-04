# Ottica MagaShop

Sito vetrina di **Ottica MagaShop** — analisi visiva professionale, occhiali da vista e da sole,
lenti a contatto. Tre negozi in Lombardia: Limido Comasco, Saronno, Villa Guardia.

## Contenuto

Sito statico, senza build step e senza dipendenze da installare:

- `index.html` — la pagina principale: hero, chi siamo, servizi, brands, recensioni, contatti.
- `privacy.html` — informativa privacy e cookie.
- `assets/style.css` — foglio di stile condiviso dalle due pagine, con le `@font-face`.
- `assets/fonts/` — Mulish in woff2, ospitato in locale, più il testo della licenza OFL.
- `assets/magashop-mark.svg` — il pittogramma vettoriale estratto dalle brand guidelines. Nelle pagine
  è incorporato come `<symbol id="maga-mark">` e riusato con `<use>`: prende il colore da
  `currentColor`, quindi header, footer, hero e pattern usano tutti la stessa forma.
- `assets/magashop-wordmark.png` — il logotipo "OTTICA MAGASHOP" in bianco su fondo trasparente.
- `assets/favicon.svg` — il pittogramma bianco su quadrato navy.
- `assets/brands/` — loghi dei marchi trattati (da popolare, vedi sotto).
- `.nojekyll` — disattiva la pipeline Jekyll di GitHub Pages: i file vengono serviti così come sono.

## Brand

Il sito segue le **Brand Guidelines Ottica MagaShop**.

### Palette

| Colore | HEX | RGB | Uso nel sito |
|---|---|---|---|
| Navy | `#323D59` | 50 61 89 | header, hero, "chi siamo", footer, testo sui fondi chiari |
| Blu | `#80A4DD` | 128 164 221 | eyebrow, icone, numerazione, accenti di testo |
| Blu chiaro | `#C4D5E7` | 196 213 231 | pulsanti pieni, testo sui fondi navy, bordi, fondo sezione brands |
| Sabbia | `#D3C8C2` | 211 200 194 | fascia dei dati sotto l'hero |
| Lime | `#D7F39C` | 215 243 156 | in palette, oggi non usato |

`--navy-deep`, `--navy-line` e `--ink-soft` sono tinte derivate dal navy per profondità, bordi e testi
secondari: servono all'interfaccia, non sono colori di brand aggiuntivi.

### Font

Le guidelines indicano **Avenir Medium**, che non è distribuibile via web. Il sito usa **Mulish**, la
sostituta più vicina per proporzioni e disegno, con Avenir Next e Avenir come fallback per chi le ha
installate. Mulish è **ospitato in locale** (`assets/fonts/`), non caricato da Google Fonts: così la
visita non genera nessuna connessione verso server di terze parti.

Per aggiornarlo: scaricare i woff2 da Google Fonts e sostituire i file, tenendo le stesse
`unicode-range` nelle `@font-face`. La licenza è SIL OFL 1.1, che consente la ridistribuzione: il
testo va tenuto in `assets/fonts/OFL.txt`.

### Regole rispettate

- Il **payoff "Ai tuoi occhi, il meglio" non compare**: il logotipo è stato ritagliato per contenere
  solo "OTTICA MAGASHOP".
- Logo in **negativo** (bianco) sui fondi navy, come da tavola "Negativo su sfondi colorati".
- Nessun effetto applicato al marchio: nell'hero il bagliore è un cerchio separato dietro al
  pittogramma.
- **Il marchio non viene mai ruotato**, nemmeno nel pattern dell'hero: le istanze sono dritte e
  sfalsate a mattoncino. Il `patternTransform="rotate(...)"` che c'era prima è stato tolto proprio
  per questo — non va reintrodotto.
- I **loghi dei marchi trattati** vanno mostrati nei loro colori originali: niente filtri, niente
  monocromia, altrimenti si violano le guidelines dei rispettivi brand.
- Nessun colore fuori palette.

## Dati dei negozi

| Negozio | Telefono | Mail | Orari |
|---|---|---|---|
| Limido Comasco — Via Quattro Novembre, 28 | 031 938301 | limido@magashop.it | Mar–Sab 9:00–12:30 · 15:00–19:00 |
| Saronno — Via Varese, 172 | 02 9602891 | saronno@magashop.it | Mar–Sab 9:00–12:30 · 15:00–19:00, mercoledì solo pomeriggio |
| Villa Guardia — Via Tevere, 6 | 031 563948 | villa@magashop.it | Mar–Sab 9:00–12:30 · 15:00–19:00 |

Domenica e lunedì chiusi in tutte le sedi. I numeri sono stati verificati su PagineGialle,
PagineBianche, Virgilio Aziende e Yelp: quelli del primo mockup avevano una cifra di troppo.

Gli stessi dati sono ripetuti nel blocco **JSON-LD** in fondo a `index.html` (`schema.org/Optician`):
è quello che permette a Google di mostrare orari e recapiti giusti nelle ricerche locali. **Se cambi
un orario o un recapito, cambialo in entrambi i punti**, altrimenti il sito e i risultati di ricerca
diranno cose diverse.

Il pulsante "Vedi su Google Maps" cerca **nome del negozio + indirizzo**, così si arriva alla scheda
dell'attività con recensioni, foto e orari, e non al semplice segnaposto dell'indirizzo. Per puntare
alla scheda in modo blindato si può aggiungere `&query_place_id=<PLACE_ID>` all'URL, prendendo il
Place ID dal profilo Google Business di ciascun negozio.

### Perché gli orari non sono sincronizzati con Google

È tecnicamente possibile, ma non conviene:

- `regularOpeningHours` sta nella fascia **Enterprise** della Places API: 1.000 chiamate gratis al
  mese, cioè circa 330 visite al sito con tre negozi letti a ogni caricamento. Oltre, si paga.
- I termini di Google **vietano di mettere in cache** gli orari (solo il `place_id` è esente), quindi
  non si può aggirare il costo salvandoli in un file e rileggendoli.
- La strada pulita sarebbe la **Google Business Profile API**, che legge i dati del cliente dal suo
  stesso account ed è gratuita, ma l'accesso va richiesto a Google e l'approvazione non è scontata.

Per orari che cambiano una volta l'anno, tenerli scritti nel sito è la scelta ragionevole. Vanno però
aggiornati anche sul profilo Google, che è dove la maggior parte delle persone li legge.

## Privacy e cookie

Il sito **non usa cookie e non carica nulla da server di terze parti**: niente analytics, niente
widget, niente iframe, font in locale. Per questo non c'è banner di consenso, e `privacy.html` lo
dichiara esplicitamente.

**Se in futuro si aggiunge Google Analytics, un widget di recensioni, una mappa incorporata o un
modulo di contatto con script esterno, il banner cookie con blocco preventivo diventa obbligatorio**
e l'informativa va riscritta di conseguenza.

## Contenuti ancora da inserire

Sono già predisposti nel codice, marcati con commenti HTML in maiuscolo: basta sostituire i
segnaposto.

| Cosa | Dove | Segnaposto |
|---|---|---|
| Storia del negozio | `index.html`, sezione "Chi siamo" | `<!-- TESTO DA CLIENTE -->` |
| Loghi dei marchi trattati | `index.html`, sezione "Brands" + `assets/brands/` | `<!-- LOGHI DA CLIENTE -->` |
| Recensioni Google da pubblicare | `index.html`, sezione "Recensioni" | `<!-- RECENSIONI DA CLIENTE -->` |
| Ragione sociale, P.IVA, sede legale | `privacy.html` | `<!-- DATI DA CLIENTE -->` e il riquadro giallo |

Il riquadro giallo in cima a `privacy.html` va tolto quando i dati societari sono stati inseriti:
finché è lì, segnala che la pagina non è definitiva.

## Sviluppo in locale

Serve un server locale, perché le pagine caricano CSS, font e immagini da `assets/`:

```bash
python3 -m http.server 8000
# poi apri http://localhost:8000
```

## Pubblicazione

Il sito è pubblicato con GitHub Pages dal branch `main`, cartella root:

https://riccardosuardi.github.io/magashop/

Ogni push su `main` aggiorna il sito online in un paio di minuti.

## Note

- Il logotipo è un PNG a 660×145: nelle guidelines è disponibile solo come immagine, non come
  tracciato, quindi per stamparlo grande conviene partire dal file originale del logo.
- Non c'è un modulo di contatto: la prenotazione passa da telefono e mail dedicata di ogni negozio.
  Se in futuro se ne vuole uno, Formspree nel piano gratuito funziona senza JavaScript di terze parti
  e non cambierebbe le conclusioni sui cookie.
