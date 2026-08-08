# Loghi istituzionali del footer

Due marchi, entrambi confermati dal cliente:

| Marchio | Nome file | Che cos'è |
|---|---|---|
| Attività storiche | `attivita-storiche.png` | Riconoscimento di **Regione Lombardia** — registro regionale delle attività storiche e di tradizione, art. 148 ter L.R. 6/2010. Lo stemma verde e oro, non quello di Unioncamere |
| Confcommercio | `confcommercio.png` | Logo ufficiale, uso riservato agli associati |

Se i file sono SVG basta cambiare l'estensione qui e nel blocco `.foot-loghi` di `index.html`.

## Come attivarli

1. Metti i due file in questa cartella, coi nomi esatti della tabella.
2. In `index.html`, nel footer, togli il commento attorno al blocco `.foot-loghi`.

Il blocco è già scritto, con gli `alt` corretti: serve solo scoprirlo.

## Perché stanno su una targa bianca

Nel CSS ogni logo è dentro uno `<span>` con fondo bianco e angoli arrotondati. Non è un vezzo: il
footer è navy e lo stemma di Regione Lombardia è verde e oro, quindi ci si leggerebbe male. Un
marchio istituzionale però **non si può ricolorare né adattare** — le sue linee guida non lo
consentono. La targa chiara risolve il problema senza toccare il marchio.

Se un domani arriva la versione ufficiale in negativo di uno dei due, quella può stare direttamente
sul navy: basta togliere lo `<span>` attorno a quell'immagine.

## Requisiti dei file

- **Formato**: SVG se disponibile, altrimenti PNG **con trasparenza**.
- **Altezza reale**: almeno 92px, perché nel footer sono alti 46px e sugli schermi retina servono il
  doppio dei pixel.
- **Niente ritocchi**: nessun ritaglio, nessuna ricolorazione, nessuna deformazione. Vanno usati
  come li ha consegnati l'ente.

Se non hai il file ufficiale: quello di Regione Lombardia viene consegnato con il riconoscimento, in
genere in cerimonia presso la Camera di commercio; quello di Confcommercio lo fornisce la sede
territoriale di riferimento.
