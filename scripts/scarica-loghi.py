#!/usr/bin/env python3
"""
Scarica i loghi dei marchi da Wikipedia e li mette in assets/brands/.

Perché esiste: l'ambiente in cui è stato costruito il sito non ha accesso alla
rete pubblica, quindi i loghi non erano scaricabili da lì. Questo script fa quel
lavoro da un computer normale.

Cosa fa, marchio per marchio:
  1. cerca la voce su Wikipedia (prima in italiano, poi in inglese);
  2. prende l'immagine principale della voce, che per le aziende è quasi sempre
     il logo, preferendo l'SVG se disponibile;
  3. salva il file in assets/brands/;
  4. aggiorna assets/brands.json aggiungendo la chiave "file".

Uso:
    python3 scripts/scarica-loghi.py            # scarica i mancanti
    python3 scripts/scarica-loghi.py --tutti    # riscarica anche quelli già presenti
    python3 scripts/scarica-loghi.py --prova    # mostra cosa farebbe, senza scrivere

Avvertenze, da leggere prima di pubblicare:
  - Wikipedia copre i marchi grandi (Ray-Ban, BOSS, Missoni…). Sugli indipendenti
    italiani non troverà quasi nulla: quelli vanno chiesti ai fornitori.
  - I loghi restano marchi registrati dei rispettivi titolari. Vanno mostrati solo
    perché MagaShop ne è rivenditore autorizzato. Se un fornitore fornisce il file
    ufficiale, quello ha la precedenza su qualsiasi cosa scaricata da qui.
  - Controlla a occhio ogni file scaricato: Wikipedia a volte mette come immagine
    principale una fotografia invece del logo. Lo script segnala i sospetti, ma
    l'ultima parola è tua.
"""

import argparse
import json
import re
import sys
import urllib.parse
import urllib.request
from pathlib import Path

RADICE = Path(__file__).resolve().parent.parent
ELENCO = RADICE / "assets" / "brands.json"
DESTINAZIONE = RADICE / "assets" / "brands"

# Wikipedia chiede un user agent che dica chi sei: senza, risponde 403.
UA = "MagaShopLogoFetcher/1.0 (https://magashop.it; contatto: info@magashop.it)"

# Marchi il cui nome da solo porta alla voce sbagliata o a nessuna voce.
# La chiave è il "nome" in brands.json, il valore è cosa cercare su Wikipedia.
DISAMBIGUA = {
    "BOSS": "Hugo Boss",
    "Carrera": "Carrera (occhiali)",
    "Carrera Ducati": "Ducati",
    "CliC": None,               # marchio piccolo, su Wikipedia non c'è
    "Centrostyle": None,
    "David Beckham": "David Beckham",
    "DSQUARED2": "Dsquared²",
    "Epos": None,
    "Eyepetizer": None,
    "Giuliani": None,
    "Good Vision": None,
    "ICON by DSQUARED2": None,
    "Inès de la Fressange": "Inès de la Fressange",
    "Le Parc": None,
    "Love Moschino": "Moschino",
    "M&G": None,
    "NIK03": None,
    "Nuance Audio": None,
    "Opposit": None,
    "Original Vintage": None,
    "Ray-Ban Meta": "Ray-Ban",
    "Seiko": "Seiko",
    "Serge Blanco": "Serge Blanco",
    "Seventh Street": None,
    "Trevi Coliseum": None,
    "Woodys": None,
}


def chiama(url):
    richiesta = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(richiesta, timeout=30) as risposta:
        return risposta.read()


def api(lingua, parametri):
    parametri = {**parametri, "format": "json", "formatversion": "2"}
    url = f"https://{lingua}.wikipedia.org/w/api.php?" + urllib.parse.urlencode(parametri)
    return json.loads(chiama(url))


def cerca_voce(lingua, termine):
    """Restituisce il titolo della voce più pertinente, o None."""
    dati = api(lingua, {"action": "query", "list": "search", "srsearch": termine, "srlimit": 1})
    risultati = dati.get("query", {}).get("search", [])
    return risultati[0]["title"] if risultati else None


def immagine_principale(lingua, titolo):
    """L'immagine in cima alla voce: per le aziende è quasi sempre il logo."""
    dati = api(lingua, {
        "action": "query", "titles": titolo,
        "prop": "pageimages", "piprop": "original",
    })
    pagine = dati.get("query", {}).get("pages", [])
    if pagine and "original" in pagine[0]:
        return pagine[0]["original"]["source"]
    return None


def immagine_col_logo(lingua, titolo):
    """Ripiego: fra le immagini della voce, quella che si chiama 'logo'."""
    dati = api(lingua, {"action": "query", "titles": titolo, "prop": "images", "imlimit": "60"})
    pagine = dati.get("query", {}).get("pages", [])
    if not pagine:
        return None

    candidate = [i["title"] for i in pagine[0].get("images", []) if "logo" in i["title"].lower()]
    if not candidate:
        return None
    # Meglio un vettoriale, se c'è.
    candidate.sort(key=lambda t: (not t.lower().endswith(".svg"), len(t)))

    dati = api(lingua, {
        "action": "query", "titles": candidate[0],
        "prop": "imageinfo", "iiprop": "url",
    })
    pagine = dati.get("query", {}).get("pages", [])
    if pagine and pagine[0].get("imageinfo"):
        return pagine[0]["imageinfo"][0]["url"]
    return None


def sigla(nome):
    """BOSS -> boss ; Dolce & Gabbana -> dolce-gabbana ; Ray-Ban -> ray-ban"""
    s = nome.lower()
    s = s.replace("&", "-")
    s = re.sub(r"[àáâä]", "a", s)
    s = re.sub(r"[èéêë]", "e", s)
    s = re.sub(r"[ìíîï]", "i", s)
    s = re.sub(r"[òóôö]", "o", s)
    s = re.sub(r"[ùúûü]", "u", s)
    s = re.sub(r"[^a-z0-9]+", "-", s)
    return s.strip("-")


def scarica(nome, prova=False):
    """Restituisce (nome_file, avviso) oppure (None, motivo)."""
    termine = DISAMBIGUA.get(nome, nome)
    if termine is None:
        return None, "nessuna voce su Wikipedia, va chiesto al fornitore"

    for lingua in ("it", "en"):
        try:
            titolo = cerca_voce(lingua, termine)
            if not titolo:
                continue
            url = immagine_principale(lingua, titolo) or immagine_col_logo(lingua, titolo)
            if not url:
                continue

            estensione = Path(urllib.parse.urlparse(url).path).suffix.lower() or ".png"
            if estensione not in (".svg", ".png", ".jpg", ".jpeg", ".webp"):
                continue

            nome_file = sigla(nome) + estensione
            avviso = None
            # Le foto non sono loghi: se il nome del file non lo dice, segnalalo.
            if "logo" not in url.lower() and estensione in (".jpg", ".jpeg"):
                avviso = f"sembra una fotografia, non un logo ({titolo})"

            if not prova:
                DESTINAZIONE.mkdir(parents=True, exist_ok=True)
                (DESTINAZIONE / nome_file).write_bytes(chiama(url))
            return nome_file, avviso
        except Exception as errore:            # una voce che non risponde non deve fermare le altre
            print(f"      ({lingua}: {errore})", file=sys.stderr)

    return None, "nessuna immagine utilizzabile trovata"


def main():
    argomenti = argparse.ArgumentParser(description="Scarica i loghi dei marchi da Wikipedia.")
    argomenti.add_argument("--tutti", action="store_true", help="riscarica anche i loghi già presenti")
    argomenti.add_argument("--prova", action="store_true", help="mostra cosa farebbe, senza scrivere nulla")
    opzioni = argomenti.parse_args()

    marchi = json.loads(ELENCO.read_text(encoding="utf-8"))
    trovati, mancanti, avvisi = [], [], []

    for marchio in marchi:
        nome = marchio["nome"]
        if marchio.get("file") and not opzioni.tutti:
            print(f"  ·  {nome}: già presente ({marchio['file']})")
            continue

        print(f"  →  {nome}…")
        nome_file, nota = scarica(nome, prova=opzioni.prova)
        if nome_file:
            marchio["file"] = nome_file
            trovati.append(nome)
            print(f"     ok: {nome_file}" + (f"  ⚠ {nota}" if nota else ""))
            if nota:
                avvisi.append(f"{nome}: {nota}")
        else:
            # Se il file c'è davvero su disco — per esempio messo a mano — la chiave
            # resta: il download fallito non deve cancellare il lavoro di qualcun altro.
            riferimento = marchio.get("file")
            if riferimento and not (DESTINAZIONE / riferimento).exists():
                marchio.pop("file")
                print(f"     tolto il riferimento a {riferimento}: il file non c'è")
            mancanti.append(nome)
            print(f"     no: {nota}")

    if not opzioni.prova:
        ELENCO.write_text(json.dumps(marchi, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    print("\n" + "─" * 60)
    print(f"Trovati:  {len(trovati)}/{len(marchi)}")
    print(f"Mancanti: {len(mancanti)}")
    if mancanti:
        print("\nDa chiedere ai fornitori (media kit del rivenditore autorizzato):")
        for nome in mancanti:
            print(f"  · {nome}")
    if avvisi:
        print("\nDa controllare a occhio:")
        for a in avvisi:
            print(f"  · {a}")
    if opzioni.prova:
        print("\n(prova: non è stato scritto niente)")
    else:
        print(f"\nFile in {DESTINAZIONE.relative_to(RADICE)}/ e assets/brands.json aggiornato.")
        print("Apri il sito e guarda il nastro: i loghi hanno preso il posto dei nomi.")


if __name__ == "__main__":
    main()
