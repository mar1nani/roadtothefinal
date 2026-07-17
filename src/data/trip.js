export const TRIP_META = {
  title: "Marseille → Barcelone",
  subtitle: "🏆 Road to the Final",
  finalKickoffIso: "2026-07-19T21:00:00",
  finalMatch: "Espagne 🇪🇸 vs Argentine 🇦🇷",
  finalNote: "Finale jouée au MetLife Stadium (New Jersey, USA) — suivie sur écran géant à Barcelone.",
};

export const START_POINT = {
  city: "Marseille",
  label: "Marseille (départ)",
  lat: 43.2965,
  lon: 5.3698,
};

// Fan zone officielle confirmée par la mairie de Barcelone pour la finale
// (source : barcelona.cat/infobarcelona) — écran géant, animations dès 19h.
export const FAN_ZONE = {
  name: "Fan Zone officielle — écran géant finale",
  place: "Carrer de Martí i Franquès, Les Corts, Barcelone",
  lat: 41.3809,
  lon: 2.1228,
  desc: "Animation familiale, musique et jeux dès 19h. Entrées par Carrer Menéndez i Pelayo et Carrer Martí i Franquès (côté montagne). Pas d'alcool ni de bouteilles en verre.",
};

export const DAYS = [
  {
    n: 1,
    date: "Vendredi 17 juillet 2026",
    isoDate: "2026-07-17",
    from: "Marseille",
    to: "Leucate",
    km: 215,
    drive: "~2h15",
    tag: "Départ 🚐",
    emoji: "⚓",
    lat: 42.9046,
    lon: 3.0281,
    stops: [
      "Départ de Marseille en fin de journée",
      "Autoroute A9 direction Perpignan",
      "Arrivée à Leucate-Plage, coucher de soleil sur la Méditerranée",
      "Dodo dans la voiture face à la mer",
    ],
    attractions: [
      { name: "Plage de Leucate / La Franqui", desc: "Immense plage de sable, spot réputé de kitesurf.", mapQuery: "Plage de la Franqui, Leucate" },
      { name: "Château / Sémaphore de Leucate", desc: "Point de vue panoramique sur la mer et les étangs.", mapQuery: "Sémaphore de Leucate" },
      { name: "Étang de Leucate", desc: "Joli coucher de soleil sur l'étang, à l'opposé de la mer.", mapQuery: "Étang de Leucate" },
    ],
    sleep: {
      spot: "Parking proche de la plage, Leucate-Plage",
      type: "Dodo en voiture",
      notes: "Zone calme à 30 min de Perpignan, bon point de départ vers l'Espagne.",
    },
    groceries: "Supermarché à Leucate ou Le Barcarès avant la nuit",
    budgetEstimate: { fuel: 35, toll: 20, food: 20, camp: 0, fun: 0, misc: 5 },
    warn: "⚠️ Bien se garer dans une zone autorisée / éclairée pour la nuit.",
  },
  {
    n: 2,
    date: "Samedi 18 juillet 2026",
    isoDate: "2026-07-18",
    from: "Leucate",
    to: "Girona (via Platja d'Aro)",
    km: 175,
    drive: "~2h30 + pause plage",
    tag: "Costa Brava 🏖️",
    emoji: "🏖️",
    lat: 41.9794,
    lon: 2.8214,
    waypoint: {
      city: "Platja d'Aro",
      label: "Platja d'Aro, Espagne",
      lat: 41.8177,
      lon: 3.0664,
      note: "Pause plage + déjeuner en cours de route",
    },
    stops: [
      "Passage de la frontière France → Espagne",
      "Pause à Platja d'Aro : plage, baignade, déjeuner",
      "Route vers Girona en fin d'après-midi",
      "Balade dans la vieille ville de Girona : cathédrale, rivière Onyar, maisons colorées",
      "Dodo à Girona",
    ],
    attractions: [
      { name: "Plage de Platja d'Aro", desc: "Grande plage de sable fin, très fréquentée en été.", mapQuery: "Platja d'Aro beach" },
      { name: "Camí de Ronda", desc: "Sentier côtier entre Platja d'Aro et S'Agaró, criques magnifiques.", mapQuery: "Camí de Ronda Platja d'Aro" },
      { name: "Cathédrale de Girona", desc: "Une des plus grandes nefs gothiques d'Europe, célèbre pour ses escaliers (Game of Thrones).", mapQuery: "Cathédrale de Girone" },
      { name: "Maisons colorées sur l'Onyar", desc: "Vue emblématique de Girona depuis le Pont de Pedra ou le Pont de Fer (dessiné par l'atelier Eiffel).", mapQuery: "Cases de l'Onyar, Girona" },
      { name: "Passeig de la Muralla", desc: "Balade sur les anciens remparts, vue sur toute la vieille ville.", mapQuery: "Passeig de la Muralla, Girona" },
    ],
    sleep: {
      spot: "Parking proche du centre de Girona",
      type: "Dodo en voiture",
      notes: "Dernière nuit avant Barcelone — lever très tôt le lendemain.",
    },
    groceries: "Supermarché à Platja d'Aro ou Girona",
    budgetEstimate: { fuel: 28, toll: 7, food: 35, camp: 5, fun: 10, misc: 5 },
    warn: "⚠️ Prévoir un réveil tôt le dimanche pour arriver frais à Barcelone.",
  },
  {
    n: 3,
    date: "Dimanche 19 juillet 2026",
    isoDate: "2026-07-19",
    from: "Girona",
    to: "Barcelone",
    km: 100,
    drive: "~1h15",
    tag: "🏆 Jour de la Finale",
    emoji: "⚽",
    lat: 41.3874,
    lon: 2.1686,
    stops: [
      "Départ très tôt le matin de Girona",
      "Arrivée à Barcelone en début de matinée",
      "Journée à Barcelone selon le planning ci-dessous",
      "🏆 LA FINALE, le soir sur écran géant !",
    ],
    // Planning heure par heure pour la journée à Barcelone.
    schedule: [
      {
        time: "08:00",
        title: "Churros traditionnels",
        place: "Masia de Sabor Churreria",
        address: "Carrer dels Escudellers, 12, Ciutat Vella, 08002 Barcelona",
        desc: "Churros & chocolat chaud à l'ancienne, une institution du Barrio Gótico.",
        mapQuery: "Masia de Sabor Churreria, Carrer dels Escudellers 12, Barcelona",
      },
      {
        time: "09:15",
        title: "Balade dans le Barri Gòtic",
        place: "Barrio Gótico",
        desc: "Cathédrale de Barcelone, Plaça Sant Jaume, Plaça Reial, ruelles médiévales — tout est à 2 pas des churros.",
        mapQuery: "Barri Gòtic, Barcelona",
      },
      {
        time: "10:30",
        title: "Marché de la Boqueria + Las Ramblas",
        place: "La Boqueria",
        desc: "Marché couvert mythique, jus frais, ambiance locale.",
        mapQuery: "Mercat de la Boqueria, Barcelona",
      },
      {
        time: "11:45",
        title: "Sagrada Família",
        place: "Sagrada Família",
        desc: "Le chef-d'œuvre inachevé de Gaudí. Réserver le billet en ligne à l'avance (~26-40€) ; sinon l'extérieur se visite gratuitement.",
        mapQuery: "Sagrada Família, Barcelona",
      },
      {
        time: "13:30",
        title: "Déjeuner tapas",
        place: "El Born",
        desc: "Tapas et vermouth dans les ruelles d'El Born.",
        mapQuery: "El Born, Barcelona",
      },
      {
        time: "15:00",
        title: "Park Güell ou Passeig de Gràcia",
        place: "Park Güell",
        desc: "Park Güell (billet ~10€, à réserver en ligne) ou, si moins de temps, balade gratuite devant Casa Batlló & Casa Milà sur Passeig de Gràcia.",
        mapQuery: "Park Güell, Barcelona",
      },
      {
        time: "17:00",
        title: "Plage de la Barceloneta",
        place: "Barceloneta",
        desc: "Détente, baignade, boisson fraîche en terrasse face à la mer avant la finale.",
        mapQuery: "Platja de la Barceloneta",
      },
      {
        time: "19:00",
        title: "Fan Zone officielle — écran géant",
        place: FAN_ZONE.place,
        address: FAN_ZONE.place,
        desc: FAN_ZONE.desc,
        mapQuery: "Carrer de Martí i Franquès, Les Corts, Barcelona",
      },
      {
        time: "21:00",
        title: "🏆 FINALE : Espagne 🇪🇸 vs Argentine 🇦🇷",
        place: "Sur écran géant, Fan Zone Les Corts",
        desc: "Coup d'envoi de la finale de la Coupe du Monde, jouée au MetLife Stadium (USA) et suivie en direct sur écran géant.",
        mapQuery: "Carrer de Martí i Franquès, Les Corts, Barcelona",
      },
    ],
    attractions: [
      { name: "Casa Batlló", desc: "Façade emblématique de Gaudí sur Passeig de Gràcia.", mapQuery: "Casa Batlló, Barcelona" },
      { name: "Casa Milà (La Pedrera)", desc: "Autre chef-d'œuvre de Gaudí, toit-terrasse surréaliste.", mapQuery: "Casa Milà, Barcelona" },
      { name: "Montjuïc + Font Màgica", desc: "Vue sur la ville, jardins, et fontaine magique en soirée (hors jours de finale).", mapQuery: "Montjuïc, Barcelona" },
      { name: "Bunkers del Carmel", desc: "Meilleur point de vue gratuit sur Barcelone, coucher de soleil.", mapQuery: "Bunkers del Carmel, Barcelona" },
      { name: "Camp Nou", desc: "Stade du FC Barcelone, visite possible (Camp Nou Experience).", mapQuery: "Camp Nou, Barcelona" },
    ],
    sleep: {
      spot: "À définir selon l'heure de fin de soirée",
      type: "—",
      notes: "Grosse journée — prévoir de quoi tenir jusqu'à tard le soir.",
    },
    groceries: "Sur place à Barcelone",
    budgetEstimate: { fuel: 16, toll: 0, food: 55, camp: 20, fun: 40, misc: 15 },
    warn: null,
  },
];

// Points affichés sur la carte, dans l'ordre du trajet.
export const MAP_PTS = [
  START_POINT,
  { city: "Leucate", label: "Leucate, France", lat: 42.9046, lon: 3.0281, dayN: 1 },
  { city: "Platja d'Aro", label: "Platja d'Aro, Espagne", lat: 41.8177, lon: 3.0664, dayN: 2, waypoint: true },
  { city: "Girona", label: "Girona, Espagne", lat: 41.9794, lon: 2.8214, dayN: 2 },
  { city: "Barcelone", label: "Barcelone 🏆", lat: 41.3874, lon: 2.1686, dayN: 3 },
];

export const SPEND_CATS = [
  ["fuel", "⛽", "Essence"],
  ["toll", "🛣️", "Péage"],
  ["food", "🛒", "Nourriture"],
  ["camp", "🅿️", "Parking / logement"],
  ["fun", "🎟️", "Activités / billets"],
  ["misc", "🔧", "Autres"],
];

export function dayBudgetTotal(day) {
  const b = day.budgetEstimate || {};
  return Object.values(b).reduce((s, v) => s + (v || 0), 0);
}

export function tripBudgetEstimateTotal() {
  return DAYS.reduce((s, d) => s + dayBudgetTotal(d), 0);
}
