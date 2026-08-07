# Ottica MagaShop

Sito vetrina di **Ottica MagaShop** — analisi visiva professionale, occhiali da vista e da sole,
lenti a contatto. Tre negozi in Lombardia: Limido Comasco, Saronno, Villa Guardia.

## Contenuto

Sito statico, senza build step e senza dipendenze da installare:

- `index.html` — la pagina principale: hero, chi siamo, servizi, brand, recensioni, contatti.
- `privacy.html` — informativa privacy e cookie.
- `assets/style.css` — foglio di stile condiviso dalle due pagine, con le `@font-face`.
- `assets/script.js` — anch'esso condiviso: menu a panino, comparse allo scorrimento, numeri che
  salgono, parallasse del pattern e carosello delle recensioni. **Menu mobile e carosello dipendono
  dal JavaScript**: senza, il pannello non si apre e la sezione recensioni si rimuove da sola invece
  di restare vuota. Il resto della pagina funziona comunque.
- `assets/recensioni.json` — le recensioni mostrate nel carosello (vedi sotto).
- `assets/brands.json` — i 36 marchi trattati, che alimentano il nastro a scorrimento.
- `assets/og-image.png` — anteprima per la condivisione su social e messaggistica.
- `assets/loghi/` — marchi istituzionali del footer (da popolare, vedi il README lì dentro).
- `sitemap.xml` e `robots.txt` — indicizzazione.
- `assets/fonts/` — Mulish in woff2, ospitato in locale, più il testo della licenza OFL.
- `assets/magashop-mark.svg` — il pittogramma vettoriale estratto dalle brand guidelines. Nelle pagine
  è incorporato come `<symbol id="maga-mark">` e riusato con `<use>`: prende il colore da
  `currentColor`, quindi header, footer, hero e pattern usano tutti la stessa forma.
- `assets/magashop-wordmark.png` — il logotipo "OTTICA MAGASHOP" in bianco su fondo trasparente.
- `assets/favicon.svg` — il pittogramma bianco su quadrato navy.
- `assets/brands/` — loghi dei marchi trattati (da popolare, vedi sotto).
- `scripts/scarica-loghi.py` — scarica i loghi dei marchi da Wikipedia (vedi `assets/brands/README.md`).
- `.nojekyll` — residuo del periodo su GitHub Pages, dove disattivava Jekyll. Su Vercel è inerte:
  lo teniamo solo perché tornare indietro non costi nulla.

## Identità del marchio

Il sito segue le **Brand Guidelines Ottica MagaShop**.

### Palette

| Colore | HEX | RGB | Uso nel sito |
|---|---|---|---|
| Navy | `#323D59` | 50 61 89 | header, hero, "chi siamo", footer, testo sui fondi chiari |
| Blu | `#80A4DD` | 128 164 221 | eyebrow, icone, numerazione, accenti di testo |
| Blu chiaro | `#C4D5E7` | 196 213 231 | testo sui fondi navy, bordi, fondo sezione brand, etichette sede |
| Sabbia | `#D3C8C2` | 211 200 194 | fascia dei dati sotto l'hero |
| Lime | `#D7F39C` | 215 243 156 | pulsanti pieni, numerazione, stelle, icone dei servizi |

Sul lime va detta una cosa, perché è già stata sbagliata una volta: **non è un colore a basso
contrasto**. Testo navy su lime dà 8,8:1, il rapporto più alto della palette. Il colore da maneggiare
con cura è l'azzurro pieno `#80A4DD`, che con il navy si ferma a 4,25:1 — sotto la soglia di 4,5:1
per il testo normale, quindi va bene per titoli grandi e icone, non per testo piccolo su pulsante.

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
- I **loghi dei marchi trattati** nel nastro sono resi in navy monocromatico. È una deroga
  consapevole alla regola dei colori originali: quasi tutti quei marchi hanno un logotipo nero,
  quindi in navy restano quasi fedeli, e la monocromia è ciò che tiene insieme 36 segni diversi.
  Per i marchi il cui colore è identitario — Missoni su tutti — va deciso caso per caso quando
  arriveranno i file. Vedi `assets/brands/README.md`.
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

## I marchi trattati

I 36 marchi stanno in **`assets/brands.json`**, in ordine alfabetico. Il nastro li divide in due
righe — prima metà sopra, seconda sotto, così l'ordine A–Z si legge riga per riga — e le fa scorrere
a velocità diverse. Si ferma al passaggio del mouse e quando un elemento riceve il focus; con
`prefers-reduced-motion` non parte e diventa una griglia statica con tutti i marchi visibili.

Sotto al nastro c'è **l'elenco completo come testo**, letto una volta sola: serve a chi usa uno
screen reader, che da un nastro in movimento non ricava nulla, e a Google, che così associa il sito
alle ricerche del tipo "ottica che vende Ray-Ban a Saronno". La copia duplicata che rende continuo
lo scorrimento è nascosta agli assistivi.

Per aggiungere o togliere un marchio si tocca **solo il JSON**. Per i loghi e le grafie da
confermare vedi `assets/brands/README.md`.

## Recensioni

Il carosello legge **`assets/recensioni.json`**: un array di oggetti con `sede`, `autore`, `stelle`
e `testo`. Mostra una recensione per punto vendita, ruota da sola ogni 7 secondi, si ferma al
passaggio del mouse e quando un controllo riceve il focus, e con `prefers-reduced-motion` non parte
affatto. Per cambiare le recensioni **si tocca solo quel file**: nell'HTML non c'è testo da
modificare. Se il file manca o è vuoto, la sezione si rimuove da sola.

### Perché non si aggiornano da sole

La richiesta era "selezionare automaticamente le migliori recensioni a 5 stelle". Con la **Places
API non si può fare**: restituisce al massimo 5 recensioni, solo quelle che Google considera più
pertinenti, senza filtro né ordinamento per stelle.

L'unica via davvero automatica è la **Google Business Profile API**, che legge tutte le recensioni
dall'account del cliente e permette di filtrarle. È gratuita, ma l'accesso va richiesto a Google e
l'approvazione non è né scontata né rapida. Se un giorno arriva, basta una GitHub Action che
riscriva `recensioni.json`: il sito non cambia di una riga, ed è per questo che il carosello nasce
già leggendo un file invece di avere le recensioni scritte dentro l'HTML.

I widget di terze parti (Elfsight, Trustindex) lo farebbero subito, ma caricano script esterni:
costerebbero l'assenza di banner cookie, e i piani gratuiti hanno un tetto di visualizzazioni.

## Social

Le icone in fondo alla pagina portano a Instagram e Facebook. Sono **link normali**, non contenuti
incorporati: nessuno script, nessun cookie, nessun impatto sulla privacy finché si resta così.

### Perché non c'è il feed di Instagram

La Basic Display API è spenta dal 4 dicembre 2024. Oggi servono un account Instagram Professional,
un'app Meta e un token che scade ogni 60 giorni. Il sito è statico e non ha un server dove tenerlo,
quindi restano due strade: un widget di terze parti — che fa **decadere l'assenza di banner cookie** —
oppure una GitHub Action che scarica ogni giorno post e immagini dentro il repo, così i contenuti
restano serviti da noi. La seconda è l'unica che non costa il banner, ma è un pezzo di
infrastruttura da mantenere: va affrontata come lavoro a sé.

## Dati societari nel footer

L'art. 2250 del codice civile impone alle società di capitali di indicare **anche sul sito** sede,
ufficio del Registro Imprese e numero di iscrizione, REA, capitale sociale effettivamente versato,
eventuale socio unico e stato di liquidazione. Vanno aggiunti partita IVA, codice fiscale e PEC.

Il blocco è in fondo a `index.html` e `privacy.html`, ed è **identico nelle due pagine**: se cambia
un dato va cambiato in entrambe, più la sezione "Titolare del trattamento" dell'informativa.

| | |
|---|---|
| Ragione sociale | MAGA SHOP S.R.L. |
| Sede legale | Via Tevere 6, 22079 Villa Guardia (CO) |
| Registro Imprese | Como-Lecco n. CO-24754 |
| REA | 221687 (C.C.I.A.A. di Como) |
| Capitale sociale | € 30.000,00 i.v. |
| P. IVA e C.F. | 01852450137 |
| PEC | maga.villaguardia@lamiapec.it |

**Resta da chiarire una cosa**: l'art. 2250 impone di indicare se la società ha un **socio unico**.
Il dato non è arrivato, quindi non compare. Se MAGA SHOP S.R.L. è a socio unico va aggiunta la
dicitura, altrimenti l'elenco è già completo così.

## Privacy e cookie

Il sito **non usa cookie e non carica nulla da server di terze parti**: niente analytics, niente
widget, niente iframe, font in locale. Per questo non c'è banner di consenso, e `privacy.html` lo
dichiara esplicitamente.

Il banner serve solo se ci sono cookie non tecnici o strumenti di tracciamento (Linee guida del
Garante del 10 giugno 2021). Qui non ce ne sono, quindi non serve.

**Se in futuro si aggiunge Google Analytics, un widget di recensioni, il feed Instagram, una mappa
incorporata o un modulo con script esterno, il banner con blocco preventivo diventa obbligatorio**:
"Accetta" e "Rifiuta" allo stesso livello, niente consenso per scroll, niente cookie wall. E
l'informativa va riscritta di conseguenza.

L'informativa dichiara anche il **trasferimento di dati verso gli Stati Uniti** dovuto all'hosting su
Vercel, sulla base della decisione di adeguatezza UE-USA (Data Privacy Framework). Se il sito cambia
di nuovo hosting, quella parte va rivista: è già successo passando da GitHub Pages a Vercel.

## Contenuti ancora da inserire

Sono predisposti nel codice: basta lasciar cadere i file al posto giusto.

| Cosa | Dove |
|---|---|
| Loghi dei marchi trattati | `assets/brands.json` (chiave `file`) + `assets/brands/` |
| Logo attività storiche e logo Confcommercio | `assets/loghi/`, blocco commentato nel footer |

## Sviluppo in locale

Serve un server locale, perché le pagine caricano CSS, font e immagini da `assets/`:

```bash
python3 -m http.server 8000
# poi apri http://localhost:8000
```

## Pubblicazione

Il sito è pubblicato su **Vercel**, collegato al branch `main` di questo repo:

https://magashop.vercel.app/

Ogni push su `main` fa ripartire la pubblicazione da solo.

Prima stava su GitHub Pages ed è stato spostato perché la coda di pubblicazione di Pages smise di
smaltire: quattro deploy di fila rimasti in `deployment_queued` per dieci minuti e poi scaduti, con
la build sempre riuscita. Se un giorno si passa a **magashop.it**, vanno aggiornati `canonical`,
`og:url` e `og:image` nelle due pagine, i tre blocchi JSON-LD in fondo a `index.html`, `sitemap.xml`
e `robots.txt` — cioè ogni punto in cui l'indirizzo compare per esteso.

## Note

- Il logotipo è un PNG a 660×145: nelle guidelines è disponibile solo come immagine, non come
  tracciato, quindi per stamparlo grande conviene partire dal file originale del logo.
- Non c'è un modulo di contatto: la prenotazione passa da telefono e mail dedicata di ogni negozio.
  Se in futuro se ne vuole uno, Formspree nel piano gratuito funziona senza JavaScript di terze parti
  e non cambierebbe le conclusioni sui cookie.
