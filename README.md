# Ottica MagaShop

Sito vetrina di **Ottica MagaShop** — visite optometriche, occhiali da vista e da sole, lenti a contatto.
Tre negozi in Lombardia: Limido Comasco, Saronno, Villa Guardia.

## Contenuto

Landing page statica in un unico file, senza build step e senza dipendenze:

- `index.html` — l'intera pagina (HTML, CSS e JS inline). L'unica risorsa esterna è il font Inter da Google Fonts.
- `.nojekyll` — disattiva la pipeline Jekyll di GitHub Pages, i file vengono serviti così come sono.

## Pubblicazione

Il sito è pubblicato con GitHub Pages dal branch `main`, cartella root:

https://riccardosuardi.github.io/magashop/

Ogni push su `main` aggiorna il sito online in un paio di minuti.

## Sviluppo in locale

Basta aprire `index.html` nel browser. In alternativa, per avere un server locale:

```bash
python3 -m http.server 8000
# poi apri http://localhost:8000
```

## Da sistemare

- Gli orari di apertura dei negozi sono segnati "da confermare".
- Il form contatti è solo lato client: mostra un messaggio di conferma ma non invia nulla. Va collegato a un servizio di form (es. Formspree) o a un endpoint proprio.
