// data/categories.ts
export const categories = [
  {
    id: 1,
    name: "Imprimante & Scanner",
    slug: "imprimante-scanner",
    children: [
      {
        id: 101,
        name: "Imprimante",
        slug: "imprimante",
        children: [
          { id: 1001, name: "Imprimante à réservoirs rechargeables", slug: "imprimante-reservoirs" },
          { id: 1002, name: "Multifonction Jet d'encre", slug: "multifonction-jet-encre" },
          { id: 1003, name: "Imprimante Laser Couleur", slug: "imprimante-laser-couleur" },
          { id: 1004, name: "Multifonction Laser Couleur", slug: "multifonction-laser-couleur" },
          { id: 1005, name: "Imprimante Jet d'encre", slug: "imprimante-jet-encre" },
          { id: 1006, name: "Imprimante Laser Monochrome", slug: "imprimante-laser-monochrome" },
          { id: 1007, name: "Multifonction Laser Monochrome", slug: "multifonction-laser-monochrome" },
          { id: 1008, name: "Traceur", slug: "traceur" },
          { id: 1009, name: "Imprimante A3 / A3+", slug: "imprimante-a3" },
          { id: 1010, name: "Imprimante matricielle", slug: "imprimante-matricielle" },
        ],
      },
      {
        id: 102,
        name: "Consommables",
        slug: "consommables-imprimante",
        children: [
          { id: 1011, name: "Cartouche d'encre", slug: "cartouche-encre" },
          { id: 1012, name: "Toner", slug: "toner" },
          { id: 1013, name: "Bouteille d'encre", slug: "bouteille-encre" },
          { id: 1014, name: "Ruban", slug: "ruban" },
          { id: 1015, name: "Tête d'impression", slug: "tete-impression" },
          { id: 1016, name: "Papier", slug: "papier" },
          { id: 1017, name: "Cartouche et kit de maintenance", slug: "kit-maintenance" },
        ],
      },
      {
        id: 103,
        name: "Scanner",
        slug: "scanner",
        children: [
          { id: 1018, name: "Scanner à plat avec chargeur automatique", slug: "scanner-plat-chargeur" },
          { id: 1019, name: "Scanner à plat sans chargeur", slug: "scanner-plat-sans-chargeur" },
          { id: 1020, name: "Scanner à défilement", slug: "scanner-defilement" },
          { id: 1021, name: "Scanner grand format", slug: "scanner-grand-format" },
        ],
      },
      {
        id: 104,
        name: "Étiqueteuse et Tickets",
        slug: "etiqueteuse-tickets",
        children: [
          { id: 1022, name: "Étiqueteuse & Imprimante de tickets", slug: "etiqueteuse-imprimante-tickets" },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Ordinateur",
    slug: "ordinateur",
    children: [
      {
        id: 201,
        name: "PC Portable",
        slug: "pc-portable",
        children: [
          { id: 2001, name: "PC portable", slug: "pc-portable-standard" },
          { id: 2002, name: "PC portable gamer", slug: "pc-portable-gamer" },
          { id: 2003, name: "PC 2-en-1 convertible tablette", slug: "pc-2-en-1" },
          { id: 2004, name: "PC portable professionnel", slug: "pc-portable-pro" },
        ],
      },
      {
        id: 202,
        name: "PC Fixe & Tout-en-un",
        slug: "pc-fixe-tout-en-un",
        children: [
          { id: 2005, name: "Unité centrale seule", slug: "unite-centrale-seule" },
          { id: 2006, name: "Unité centrale avec écran", slug: "unite-centrale-ecran" },
          { id: 2007, name: "Tout-en-un", slug: "tout-en-un" },
          { id: 2008, name: "Boîtier PC Gaming", slug: "boitier-pc-gaming" },
        ],
      },
      {
        id: 203,
        name: "Serveur",
        slug: "serveur",
        children: [
          { id: 2009, name: "Serveur Tour", slug: "serveur-tour" },
          { id: 2010, name: "Serveur Rack", slug: "serveur-rack" },
          { id: 2011, name: "Serveur NAS", slug: "serveur-nas" },
        ],
      },
    ],
  },
  {
    id: 3,
    name: "Écran / Moniteur",
    slug: "ecran-moniteur",
    children: [
      {
        id: 301,
        name: "Écran Bureau",
        slug: "ecran-bureau",
        children: [
          { id: 3001, name: "Écran Full HD", slug: "ecran-full-hd" },
          { id: 3002, name: "Écran 4K UHD", slug: "ecran-4k" },
          { id: 3003, name: "Écran gamer", slug: "ecran-gamer" },
          { id: 3004, name: "Écran tactile", slug: "ecran-tactile" },
          { id: 3005, name: "Écran incurvé", slug: "ecran-incurve" },
        ],
      },
      {
        id: 302,
        name: "Vidéoprojecteur",
        slug: "videoprojecteur",
        children: [
          { id: 3006, name: "Vidéoprojecteur portable", slug: "videoprojecteur-portable" },
          { id: 3007, name: "Vidéoprojecteur professionnel", slug: "videoprojecteur-pro" },
          { id: 3008, name: "Tableau blanc interactif", slug: "tableau-blanc-interactif" },
        ],
      },
    ],
  },
  {
    id: 4,
    name: "Périphérique",
    slug: "peripherique",
    children: [
      {
        id: 401,
        name: "Clavier & Souris",
        slug: "clavier-souris",
        children: [
          { id: 4001, name: "Clavier filaire", slug: "clavier-filaire" },
          { id: 4002, name: "Clavier sans fil", slug: "clavier-sans-fil" },
          { id: 4003, name: "Souris filaire", slug: "souris-filaire" },
          { id: 4004, name: "Souris sans fil", slug: "souris-sans-fil" },
          { id: 4005, name: "Pack clavier + souris", slug: "pack-clavier-souris" },
        ],
      },
      {
        id: 402,
        name: "Stockage",
        slug: "stockage",
        children: [
          { id: 4006, name: "Disque dur externe", slug: "disque-dur-externe" },
          { id: 4007, name: "SSD externe", slug: "ssd-externe" },
          { id: 4008, name: "Clé USB", slug: "cle-usb" },
          { id: 4009, name: "Carte mémoire", slug: "carte-memoire" },
        ],
      },
      {
        id: 403,
        name: "Audio & Webcam",
        slug: "audio-webcam",
        children: [
          { id: 4010, name: "Casque et écouteurs", slug: "casque-ecouteurs" },
          { id: 4011, name: "Haut-parleur", slug: "haut-parleur" },
          { id: 4012, name: "Webcam", slug: "webcam" },
          { id: 4013, name: "Micro", slug: "micro" },
        ],
      },
    ],
  },
  {
    id: 5,
    name: "Réseaux",
    slug: "reseaux",
    children: [
      {
        id: 501,
        name: "Wi-Fi & Routeurs",
        slug: "wifi-routeurs",
        children: [
          { id: 5001, name: "Routeur Wi-Fi", slug: "routeur-wifi" },
          { id: 5002, name: "Point d'accès Wi-Fi", slug: "point-acces-wifi" },
          { id: 5003, name: "Répéteur Wi-Fi", slug: "repeteur-wifi" },
          { id: 5004, name: "Mesh Wi-Fi", slug: "mesh-wifi" },
        ],
      },
      {
        id: 502,
        name: "Commutation & Câblage",
        slug: "commutation-cablage",
        children: [
          { id: 5005, name: "Switch réseau", slug: "switch-reseau" },
          { id: 5006, name: "Câble réseau", slug: "cable-reseau" },
          { id: 5007, name: "Fibre optique", slug: "fibre-optique" },
          { id: 5008, name: "Panneau de brassage", slug: "panneau-brassage" },
        ],
      },
      {
        id: 503,
        name: "Sécurité réseau",
        slug: "securite-reseau",
        children: [
          { id: 5009, name: "Firewall", slug: "firewall" },
          { id: 5010, name: "VPN", slug: "vpn" },
        ],
      },
    ],
  },
  {
    id: 6,
    name: "Onduleur",
    slug: "onduleur",
    children: [
      {
        id: 601,
        name: "Onduleur par type",
        slug: "onduleur-type",
        children: [
          { id: 6001, name: "Onduleur Line Interactive", slug: "onduleur-line-interactive" },
          { id: 6002, name: "Onduleur Off-line", slug: "onduleur-offline" },
          { id: 6003, name: "Onduleur On-line", slug: "onduleur-online" },
        ],
      },
      {
        id: 602,
        name: "Onduleur par marque",
        slug: "onduleur-marque",
        children: [
          { id: 6004, name: "APC", slug: "onduleur-apc" },
          { id: 6005, name: "Eaton", slug: "onduleur-eaton" },
          { id: 6006, name: "Legrand", slug: "onduleur-legrand" },
        ],
      },
    ],
  },
  {
    id: 7,
    name: "Accessoires & Composants",
    slug: "accessoires-composants",
    children: [
      {
        id: 701,
        name: "Composants PC",
        slug: "composants-pc",
        children: [
          { id: 7001, name: "Carte graphique", slug: "carte-graphique" },
          { id: 7002, name: "Barrette mémoire RAM", slug: "barrette-memoire-ram" },
          { id: 7003, name: "Carte mère", slug: "carte-mere" },
          { id: 7004, name: "Processeur", slug: "processeur" },
          { id: 7005, name: "Alimentation PC", slug: "alimentation-pc" },
          { id: 7006, name: "SSD interne", slug: "ssd-interne" },
          { id: 7007, name: "Disque dur interne", slug: "disque-dur-interne" },
        ],
      },
      {
        id: 702,
        name: "Accessoires",
        slug: "accessoires",
        children: [
          { id: 7008, name: "Station d'accueil et Hub USB", slug: "station-accueil-hub-usb" },
          { id: 7009, name: "Câble et adaptateur", slug: "cable-adaptateur" },
          { id: 7010, name: "Refroidissement PC", slug: "refroidissement-pc" },
          { id: 7011, name: "Tapis de souris", slug: "tapis-souris" },
        ],
      },
    ],
  },
  {
    id: 8,
    name: "Téléphonie",
    slug: "telephonie",
    children: [
      {
        id: 801,
        name: "Téléphone fixe",
        slug: "telephone-fixe",
        children: [
          { id: 8001, name: "Téléphone de bureau", slug: "telephone-bureau" },
          { id: 8002, name: "Téléphone sans fil DECT", slug: "telephone-dect" },
          { id: 8003, name: "Téléphone IP / VoIP", slug: "telephone-voip" },
          { id: 8004, name: "Standard téléphonique PABX", slug: "pabx" },
        ],
      },
      {
        id: 802,
        name: "Conférence",
        slug: "conference",
        children: [
          { id: 8005, name: "Speakerphone", slug: "speakerphone" },
          { id: 8006, name: "Système de visioconférence", slug: "visioconference" },
        ],
      },
    ],
  },
  {
    id: 9,
    name: "Logiciels",
    slug: "logiciels",
    children: [
      {
        id: 901,
        name: "Système & Sécurité",
        slug: "systeme-securite",
        children: [
          { id: 9001, name: "Système d'exploitation", slug: "systeme-exploitation" },
          { id: 9002, name: "Antivirus et Sécurité", slug: "antivirus-securite" },
        ],
      },
      {
        id: 902,
        name: "Bureautique",
        slug: "bureautique",
        children: [
          { id: 9003, name: "Suite bureautique", slug: "suite-bureautique" },
          { id: 9004, name: "Comptabilité", slug: "logiciel-comptabilite" },
          { id: 9005, name: "Gestion commerciale", slug: "gestion-commerciale" },
        ],
      },
    ],
  },
  {
    id: 10,
    name: "Sacoche & Sac à dos",
    slug: "sacoche-sac-dos",
    children: [
      {
        id: 1001,
        name: "Transport PC",
        slug: "transport-pc",
        children: [
          { id: 10001, name: "Sacoche PC portable", slug: "sacoche-pc-portable" },
          { id: 10002, name: "Housse et étui", slug: "housse-etui" },
          { id: 10003, name: "Sac à dos PC Portable", slug: "sac-dos-pc-portable" },
        ],
      },
    ],
  },
  {
    id: 11,
    name: "Image & Son",
    slug: "image-son",
    children: [
      {
        id: 1101,
        name: "Appareil photo & Caméra",
        slug: "photo-camera",
        children: [
          { id: 11001, name: "Appareil photo numérique", slug: "appareil-photo" },
          { id: 11002, name: "Caméra de surveillance", slug: "camera-surveillance" },
          { id: 11003, name: "Caméra d'action", slug: "camera-action" },
        ],
      },
      {
        id: 1102,
        name: "Audio",
        slug: "audio",
        children: [
          { id: 11004, name: "Enceinte Bluetooth", slug: "enceinte-bluetooth" },
          { id: 11005, name: "Casque audio", slug: "casque-audio" },
          { id: 11006, name: "Barre de son", slug: "barre-son" },
        ],
      },
    ],
  },
  {
    id: 12,
    name: "Tablette tactile",
    slug: "tablette-tactile",
    children: [
      {
        id: 1201,
        name: "Par système",
        slug: "tablette-systeme",
        children: [
          { id: 12001, name: "Tablette Android", slug: "tablette-android" },
          { id: 12002, name: "Tablette Windows", slug: "tablette-windows" },
          { id: 12003, name: "iPad Apple", slug: "ipad" },
        ],
      },
      {
        id: 1202,
        name: "Accessoires tablette",
        slug: "accessoires-tablette",
        children: [
          { id: 12004, name: "Coque et protection", slug: "coque-tablette" },
          { id: 12005, name: "Clavier pour tablette", slug: "clavier-tablette" },
          { id: 12006, name: "Stylet", slug: "stylet" },
        ],
      },
    ],
  },
  {
    id: 13,
    name: "Destructeur de papiers",
    slug: "destructeur-papiers",
    children: [
      {
        id: 1301,
        name: "Par coupe",
        slug: "destructeur-coupe",
        children: [
          { id: 13001, name: "Coupe en bandelettes", slug: "coupe-bandelettes" },
          { id: 13002, name: "Coupe croisée", slug: "coupe-croisee" },
          { id: 13003, name: "Coupe micro", slug: "coupe-micro" },
        ],
      },
      {
        id: 1302,
        name: "Par usage",
        slug: "destructeur-usage",
        children: [
          { id: 13004, name: "Usage personnel", slug: "destructeur-personnel" },
          { id: 13005, name: "Usage bureau", slug: "destructeur-bureau" },
          { id: 13006, name: "Usage industriel", slug: "destructeur-industriel" },
        ],
      },
    ],
  },
  {
    id: 14,
    name: "Tablette graphique",
    slug: "tablette-graphique",
    children: [
      {
        id: 1401,
        name: "Par marque",
        slug: "tablette-graphique-marque",
        children: [
          { id: 14001, name: "Wacom", slug: "wacom" },
          { id: 14002, name: "XP-Pen", slug: "xp-pen" },
          { id: 14003, name: "Huion", slug: "huion" },
        ],
      },
      {
        id: 1402,
        name: "Avec écran",
        slug: "tablette-graphique-ecran",
        children: [
          { id: 14004, name: "Tablette graphique avec écran", slug: "tablette-graphique-avec-ecran" },
          { id: 14005, name: "Tablette graphique sans écran", slug: "tablette-graphique-sans-ecran" },
        ],
      },
    ],
  },
];