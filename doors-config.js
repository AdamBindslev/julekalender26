/**
 * ==============================================================================
 * EDUTASIA JULEKALENDER 2026 - KONFIGURATION AF LÅGER
 * ==============================================================================
 * Her kan du nemt udskifte de 24 Vimeo webadresser og tilpasse titler/beskrivelser.
 *
 * SÅDAN UDSKIFTER DU EN VIDEO:
 * Find den pågældende låge (fx day: 2) og erstat 'videoUrl' med dit Vimeo-link.
 * Understøttede URL-formater:
 *   - https://vimeo.com/123456789
 *   - https://vimeo.com/123456789/privathash
 *   - https://player.vimeo.com/video/123456789
 *   - eller blot video-ID'et direkte, fx "123456789"
 *
 * TEST-TILSTAND (ÅBN ALLE LÅGER PÅ FORHÅND):
 * Tilføj '?preview=true' i adresselinjen i din browser, fx:
 * index.html?preview=true
 * Du kan også simulere en bestemt dag, fx: index.html?day=15
 * ==============================================================================
 */

window.CALENDAR_CONFIG = {
  title: "Edutasia julekalender 2026",
  subtitle: "Åbn dagens låge og få et nyt e-læringsboost hver dag frem til jul",
  year: 2026, // Kalenderen er aktiv i december 2026
  
  // Fast, harmonisk spredt rækkefølge på gitteret (klassisk julekalender-stil)
  displayOrder: [
    14,  3, 21,  8, 17,  5,
    12, 19,  1, 24,  7, 15,
     2, 16, 10, 22,  4, 18,
    20,  9, 13,  6, 23, 11
  ],

  doors: [
    {
      day: 1,
      title: "1. december – Velkommen til julekalenderen",
      videoUrl: "https://vimeo.com/714785167",
      description: "Dagens e-læringsvideo fra Edutasia."
    },
    {
      day: 2,
      title: "2. december",
      videoUrl: "https://vimeo.com/714785167",
      description: "Dagens e-læringsvideo fra Edutasia."
    },
    {
      day: 3,
      title: "3. december",
      videoUrl: "https://vimeo.com/714785167",
      description: "Dagens e-læringsvideo fra Edutasia."
    },
    {
      day: 4,
      title: "4. december",
      videoUrl: "https://vimeo.com/714785167",
      description: "Dagens e-læringsvideo fra Edutasia."
    },
    {
      day: 5,
      title: "5. december",
      videoUrl: "https://vimeo.com/714785167",
      description: "Dagens e-læringsvideo fra Edutasia."
    },
    {
      day: 6,
      title: "6. december",
      videoUrl: "https://vimeo.com/714785167",
      description: "Dagens e-læringsvideo fra Edutasia."
    },
    {
      day: 7,
      title: "7. december",
      videoUrl: "https://vimeo.com/714785167",
      description: "Dagens e-læringsvideo fra Edutasia."
    },
    {
      day: 8,
      title: "8. december",
      videoUrl: "https://vimeo.com/714785167",
      description: "Dagens e-læringsvideo fra Edutasia."
    },
    {
      day: 9,
      title: "9. december",
      videoUrl: "https://vimeo.com/714785167",
      description: "Dagens e-læringsvideo fra Edutasia."
    },
    {
      day: 10,
      title: "10. december",
      videoUrl: "https://vimeo.com/714785167",
      description: "Dagens e-læringsvideo fra Edutasia."
    },
    {
      day: 11,
      title: "11. december",
      videoUrl: "https://vimeo.com/714785167",
      description: "Dagens e-læringsvideo fra Edutasia."
    },
    {
      day: 12,
      title: "12. december",
      videoUrl: "https://vimeo.com/714785167",
      description: "Dagens e-læringsvideo fra Edutasia."
    },
    {
      day: 13,
      title: "13. december – Lucia",
      videoUrl: "https://vimeo.com/714785167",
      description: "Dagens e-læringsvideo fra Edutasia."
    },
    {
      day: 14,
      title: "14. december",
      videoUrl: "https://vimeo.com/714785167",
      description: "Dagens e-læringsvideo fra Edutasia."
    },
    {
      day: 15,
      title: "15. december",
      videoUrl: "https://vimeo.com/714785167",
      description: "Dagens e-læringsvideo fra Edutasia."
    },
    {
      day: 16,
      title: "16. december",
      videoUrl: "https://vimeo.com/714785167",
      description: "Dagens e-læringsvideo fra Edutasia."
    },
    {
      day: 17,
      title: "17. december",
      videoUrl: "https://vimeo.com/714785167",
      description: "Dagens e-læringsvideo fra Edutasia."
    },
    {
      day: 18,
      title: "18. december",
      videoUrl: "https://vimeo.com/714785167",
      description: "Dagens e-læringsvideo fra Edutasia."
    },
    {
      day: 19,
      title: "19. december",
      videoUrl: "https://vimeo.com/714785167",
      description: "Dagens e-læringsvideo fra Edutasia."
    },
    {
      day: 20,
      title: "20. december",
      videoUrl: "https://vimeo.com/714785167",
      description: "Dagens e-læringsvideo fra Edutasia."
    },
    {
      day: 21,
      title: "21. december – Vintersolhverv",
      videoUrl: "https://vimeo.com/714785167",
      description: "Dagens e-læringsvideo fra Edutasia."
    },
    {
      day: 22,
      title: "22. december",
      videoUrl: "https://vimeo.com/714785167",
      description: "Dagens e-læringsvideo fra Edutasia."
    },
    {
      day: 23,
      title: "23. december – Lillejuleaften",
      videoUrl: "https://vimeo.com/714785167",
      description: "Dagens e-læringsvideo fra Edutasia."
    },
    {
      day: 24,
      title: "24. december – Juleaften",
      videoUrl: "https://vimeo.com/714785167",
      description: "Glædelig jul fra Edutasia! Her er årets sidste låge."
    }
  ]
};
