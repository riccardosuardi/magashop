# Loghi istituzionali del footer

Qui vanno i marchi che MagaShop può esporre: il riconoscimento come attività storica e
l'affiliazione a Confcommercio. Sono richiamati dal blocco `.foot-loghi` in `index.html`, oggi
commentato in attesa dei file.

## Attività storiche: quale riconoscimento?

Esistono **due marchi diversi e non intercambiabili**. Prima di mettere un logo bisogna sapere
quale dei due è stato ottenuto:

- **Regione Lombardia** — "attività storiche e di tradizione", registro regionale previsto
  dall'art. 148 ter della L.R. 6/2010. Il marchio viene consegnato dalla Regione insieme al
  riconoscimento, in genere in cerimonia presso la Camera di commercio.
- **Unioncamere** — "Impresa Storica d'Italia", riconoscimento nazionale.

Il file ufficiale arriva con il riconoscimento: **non va ricostruito né ridisegnato**, e non va
usato se il riconoscimento non c'è.

## Confcommercio

Logo ufficiale, il cui uso è riservato agli associati. Va chiesto alla sede territoriale di
riferimento, che fornisce il file nella versione corretta.

## Convenzioni

- **Formato**: SVG quando disponibile, altrimenti PNG con trasparenza ad almeno 92px di altezza
  reale (nel footer sono alti 46px).
- **Nomi dei file**: `attivita-storiche.svg`, `confcommercio.svg`.
- **Colori originali**: nessun filtro, nessuna monocromia. Se il logo è scuro e non si legge sul
  fondo navy del footer, va chiesta la versione in negativo prevista dalle loro linee guida — non
  schiarito a mano.

## Come attivarli

In `index.html`, nel footer, togliere i commenti attorno al blocco `.foot-loghi`.
