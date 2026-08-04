# Loghi dei marchi trattati

Qui dentro vanno i loghi dei brand in vendita nei negozi MagaShop, poi richiamati dalla sezione
"Brands" di `index.html`.

## Convenzioni

- **Formato**: SVG quando possibile. In alternativa PNG con sfondo trasparente, a doppia risoluzione
  (il logo viene mostrato alto circa 46px, quindi almeno 92px di altezza reale).
- **Nome del file**: nome del marchio in minuscolo, senza accenti né spazi — `ray-ban.svg`,
  `persol.svg`, `zeiss.svg`.
- **Colori originali**: i loghi non vanno virati, resi monocromatici né filtrati. Quasi tutte le
  brand guidelines lo vietano, ed è il motivo per cui le card di sfondo sono bianche.
- **Solo marchi autorizzati**: vanno mostrati soltanto i brand di cui MagaShop è rivenditore
  autorizzato.

## Come inserirli

In `index.html`, nella sezione `#brands`, sostituire ogni segnaposto:

```html
<div class="brand-card"><span class="brand-placeholder">Logo 1</span></div>
```

con il logo vero:

```html
<div class="brand-card"><img src="assets/brands/ray-ban.svg" alt="Ray-Ban"></div>
```

L'attributo `alt` deve contenere il nome del marchio: è quello che leggono i motori di ricerca e chi
naviga con uno screen reader. Le card in eccesso vanno semplicemente cancellate — la griglia si
adatta da sola.
