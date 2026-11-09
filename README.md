# Edutasia Julekalender 2026 🎄

Et professionelt og responsivt e-læringsjulekalender-website skræddersyet til Edutasia.

## 📁 Filer i projektet
- **`index.html`**: Kalenderens hovedside med header, 24 låger og video-modal (Lightbox).
- **`doors-config.js`**: **Her indsætter du dine 24 Vimeo-adresser** og eventuelle titler/beskrivelser.
- **`style.css`**: Styling med Edutasias visuelle identitet (petroleumsblå `#2B4C5E`, hvid og elegante guldaccenter), responsivt gitter og animationer.
- **`app.js`**: Logik til datostyring, Vimeo-embed, "set"-flueben (localStorage) og diskret sneeffekt.
- **`edutasia logo.png`**: Edutasias officielle logo.

---

## 🛠 Sådan udskifter du de 24 videoer
Åbn filen **`doors-config.js`** i en teksteditor (fx VS Code, Notepad eller lignende).

Find hver låge (`day: 1` til `day: 24`) og indsæt din Vimeo webadresse i feltet `videoUrl`:

```javascript
{
  day: 1,
  title: "1. december – Velkommen til julekalenderen",
  videoUrl: "https://vimeo.com/714785167", // <-- Indsæt dit Vimeo-link her
  description: "Dagens e-læringsvideo fra Edutasia."
}
```

### Understøttede Vimeo-formater:
Skriptet håndterer automatisk alle Vimeo URL-formater:
- Almindeligt link: `https://vimeo.com/714785167`
- Skjult / unlisted link med hash: `https://vimeo.com/714785167/abc1234`
- Direkte player-link: `https://player.vimeo.com/video/714785167`
- Rent video-ID: `"714785167"`

> **Bemærk vedr. "Embed only" videoer på Vimeo:**  
> Når en video er sat til *Embed only*, skal du på Vimeo under videoens privatlivsindstillinger (Sharing/Embed Privacy) sikre, at enten **"Anywhere"** er tilladt, eller tilføje dit domæne (fx `edutasia.dk`) til listen over godkendte domæner.

---

## 🔍 Sådan tester du kalenderen på forhånd
Sitet har en indbygget test-tilstand, så du og kolleger kan teste alle 24 låger før december uden at ændre computerens ur:

1. **Lås alle 24 låger op:**
   Åbn sitet med `?preview=true` i URL'en:
   ```text
   index.html?preview=true
   ```
2. **Simulér en bestemt dag i december (fx 12. december):**
   ```text
   index.html?day=12
   ```
   (Dette vil låse låge 1-12 op og markere låge 12 som "I dag").

---

## 🚀 Udgivelse & Hosting
Da kalenderen er bygget i ren HTML, CSS og JavaScript, kræver den **ingen installation eller serverkonfiguration**:
- Upload blot alle filerne i mappen til dit webhotel, Azure/AWS, Netlify, GitHub Pages eller et underbibliotek på `edutasia.dk/julekalender/`.
