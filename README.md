# Ottica MagaShop

Sito vetrina di **Ottica MagaShop** — visite optometriche, occhiali da vista e da sole, lenti a contatto.
Tre negozi in Lombardia: Limido Comasco, Saronno, Villa Guardia.

## Contenuto

Landing page statica, senza build step e senza dipendenze:

- `index.html` — l'intera pagina (HTML, CSS e JS inline). L'unica risorsa esterna è il font da Google Fonts.
- `assets/magashop-mark.svg` — il pittogramma, vettoriale, estratto dalle brand guidelines. Nella pagina è
  incorporato come `<symbol id="maga-mark">` e riusato con `<use>`: prende il colore da `currentColor`, quindi
  header, footer, hero e pattern usano tutti la stessa forma.
- `assets/magashop-wordmark.png` — il logotipo "OTTICA MAGASHOP" in bianco su fondo trasparente.
- `assets/favicon.svg` — il pittogramma bianco su quadrato navy.
- `.nojekyll` — disattiva la pipeline Jekyll di GitHub Pages, i file vengono serviti così come sono.

## Brand

Il sito segue le **Brand Guidelines Ottica MagaShop**.

### Palette

| Colore | HEX | RGB | Uso nel sito |
|---|---|---|---|
| Navy | `#323D59` | 50 61 89 | header, hero, sezione "perché noi", footer, testo sui fondi chiari |
| Blu | `#80A4DD` | 128 164 221 | eyebrow, icone, accenti |
| Blu chiaro | `#C4D5E7` | 196 213 231 | testo sui fondi navy, bordi delle card, fondo sezione negozi |
| Sabbia | `#D3C8C2` | 211 200 194 | fascia dei numeri sotto l'hero |
| Lime | `#D7F39C` | 215 243 156 | call to action, numerazione, focus dei campi |

`--navy-deep`, `--navy-line` e `--ink-soft` sono tinte derivate dal navy per profondità, bordi e testi
secondari: servono all'interfaccia, non sono colori di brand aggiuntivi.

### Font

Le guidelines indicano **Avenir Medium**, che non è distribuibile via web. Il sito usa **Mulish** (Google Fonts),
la sostituta più vicina per proporzioni e disegno, con Avenir Next e Avenir come fallback per chi le ha installate.

### Regole rispettate

- Il **payoff "Ai tuoi occhi, il meglio" non compare**: il logotipo è stato ritagliato per contenere solo
  "OTTICA MAGASHOP".
- Logo in **negativo** (bianco) sui fondi navy, come da tavola "Negativo su sfondi colorati".
- Nessun effetto applicato al marchio: nell'hero il bagliore è un cerchio separato dietro al pittogramma, e il
  pittogramma non viene mai ruotato né deformato.
- Il pattern dell'hero riprende la tavola "Immagine coordinata — Pattern": il marchio ripetuto in blu e blu
  chiaro, inclinato, a bassa opacità.
- Nessun colore fuori palette.

## Pubblicazione

Il sito è pubblicato con GitHub Pages dal branch `main`, cartella root:

https://riccardosuardi.github.io/magashop/

Ogni push su `main` aggiorna il sito online in un paio di minuti.

## Sviluppo in locale

Serve un server locale, perché la pagina carica gli asset da `assets/`:

```bash
python3 -m http.server 8000
# poi apri http://localhost:8000
```

## Da sistemare

- Gli orari di apertura dei negozi sono segnati "da confermare".
- Il form contatti è solo lato client: mostra un messaggio di conferma ma non invia nulla. Va collegato a un
  servizio di form (es. Formspree) o a un endpoint proprio.
- Il logotipo è un PNG a 660×145: il vettoriale nelle guidelines è disponibile solo come immagine, quindi se
  serve stamparlo grande conviene rigenerarlo dal file originale del logo.
