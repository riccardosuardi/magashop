# Loghi dei marchi trattati

I 36 marchi sono elencati in **`assets/brands.json`**, che alimenta il nastro a scorrimento della
sezione "Brand". Questa cartella contiene i file dei loghi, quando ci sono.

## Come funziona

Ogni voce del JSON ha un `nome` obbligatorio e un `file` facoltativo:

```json
{ "nome": "BOSS" }
{ "nome": "Ray-Ban", "file": "ray-ban.svg" }
```

- **Senza `file`**: il nastro mostra il nome composto nel carattere del sito.
- **Con `file`**: mostra l'immagine da questa cartella, alla stessa altezza della scritta.

Quindi aggiungere un logo è **una chiave nel JSON più un file qui dentro**. Niente HTML da toccare,
e la sezione resta pubblicabile anche con zero loghi.

## Convenzioni

- **Formato**: SVG quando possibile. Altrimenti PNG con trasparenza, alto almeno 60px reali (nel
  nastro sono alti 30px).
- **Nome del file**: minuscolo, senza accenti né spazi — `ray-ban.svg`, `dolce-gabbana.svg`,
  `love-moschino.svg`. Deve corrispondere esattamente alla chiave `file`.
- **Un colore, navy**: il nastro rende tutti i marchi come scritte navy. È una deroga consapevole
  alla regola "colori originali", e regge perché quasi tutti questi loghi sono logotipi neri, quindi
  in navy restano quasi fedeli. Per i marchi con colori identitari — **Missoni** in primis — va
  verificato caso per caso: se il colore è parte del marchio, meglio tenerlo a colori e accettare
  che stoni un po', che snaturarlo.
- **Solo marchi autorizzati**: vanno mostrati soltanto i brand di cui MagaShop è rivenditore
  autorizzato.

## Dove procurarli

**Non vanno ricostruiti a mano né scaricati dai siti aggregatori** (Seeklogo, Worldvectorlogo e
simili), che ospitano marchi registrati spesso senza autorizzazione e restituiscono file di qualità
e proporzioni incoerenti.

La fonte giusta è il **media kit che il fornitore dà al rivenditore autorizzato**. Basta chiederlo
all'agente:

| Fornitore | Marchi |
|---|---|
| EssilorLuxottica | Ray-Ban, Ray-Ban Meta, Nuance Audio |
| Safilo | BOSS, Carrera, Carrera Ducati, Missoni, Seventh Street, David Beckham, Tommy Hilfiger, Jimmy Choo, Carolina Herrera |
| Marcolin | Moschino, Love Moschino, Marc Jacobs, DSQUARED2, ICON by DSQUARED2 |
| Altri | Dolce & Gabbana, Kartell, Damiani, Epos, Eyepetizer, NIK03, Opposit, Woodys, Serge Blanco, Original Vintage, Inès de la Fressange, Le Parc, CliC, Centrostyle, Seiko, Good Vision, Giuliani, M&G, Trevi Coliseum |

## Grafie da confermare

Nel JSON alcuni nomi sono quelli mandati dal cliente e non è stato possibile verificarli:
**Giuliani**, **Good Vision**, **Le Parc**, **M&G**, **Trevi Coliseum**. Prima di considerare
chiusa la sezione conviene farli confermare: sbagliare la grafia di un marchio su un sito da
rivenditore autorizzato si nota.
