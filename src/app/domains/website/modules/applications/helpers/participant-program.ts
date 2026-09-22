export interface IParticipantActivity {
  id: string;
  time: string;
  title: string;
  description: string;
}

export interface IParticipantDay {
  id: string;
  date: string;
  title: string;
  activities: readonly IParticipantActivity[];
}

export const PARTICIPANT_DAYS: readonly IParticipantDay[] = [
  {
    id: '2026-11-25',
    date: '25 novembre 2026',
    title: 'Jour 1 — Inspirer • Découvrir • Connecter',
    activities: [
      {
        id: 'd1-accueil-experience',
        time: '08h00–09h00',
        title: 'Accueil & FIKIRI Experience',
        description: 'Village, stands, démonstrations technologiques, plateformes FIKIRI et médias.'
      },
      {
        id: 'd1-ouverture',
        time: '09h00–10h15',
        title: "Grande plénière d'ouverture",
        description: 'Génération FIKIRI : la jeunesse qui construit la RDC de demain + FIKIRI Impact 2023–2026.'
      },
      {
        id: 'd1-talks',
        time: '10h15–10h45',
        title: 'FIKIRI Talks',
        description: 'Startup, IA, innovation frugale et territoires.'
      },
      {
        id: 'd1-village',
        time: '10h45–11h15',
        title: 'Visite du Village',
        description: 'Rencontre directe entre autorités, visiteurs et innovateurs.'
      },
      {
        id: 'd1-paralleles',
        time: '11h15–13h00',
        title: 'Activités en parallèle',
        description: 'IA • Entrepreneuriat • Financement • Métiers numériques • FIKIRI Lab • Village.'
      },
      {
        id: 'd1-networking',
        time: '13h00–14h00',
        title: 'Networking',
        description: 'Networking Challenge et rencontres.'
      },
      {
        id: 'd1-pleniere-2030',
        time: '14h00–15h00',
        title: 'Grande plénière',
        description: 'Quelle RDC numérique voulons-nous en 2030 ?'
      },
      {
        id: 'd1-challenges',
        time: '15h00–17h00',
        title: 'FIKIRI Challenges',
        description: 'AI • GovTech • Green Innovation • Women & Girls in Tech • Territorial Innovation.'
      }
    ]
  },
  {
    id: '2026-11-26',
    date: '26 novembre 2026',
    title: 'Jour 2 — Apprendre • Construire • Expérimenter',
    activities: [
      {
        id: 'd2-morning',
        time: '08h30–09h00',
        title: 'FIKIRI Morning',
        description: 'Animation, musique et récapitulatif du Jour 1.'
      },
      {
        id: 'd2-pleniere-createur',
        time: '09h00–10h00',
        title: 'Grande plénière',
        description: 'De consommateur de technologie à créateur de solutions.'
      },
      {
        id: 'd2-academy',
        time: '10h00–12h30',
        title: 'FIKIRI Academy',
        description: 'Masterclasses : startup, IA générative, cybersécurité, MVP, pitch, financement, marque personnelle, data & langues congolaises.'
      },
      {
        id: 'd2-permanentes',
        time: '10h00–12h30',
        title: 'Activités permanentes',
        description: 'Village • Career Corner • Mentoring Corner • Investors Corner • FIKIRI Studio.'
      },
      {
        id: 'd2-demo-show',
        time: '13h30–15h00',
        title: 'FIKIRI Demo Show',
        description: 'Pitch de 3 minutes + 2 minutes de questions, avec vote du public.'
      },
      {
        id: 'd2-b2b',
        time: '15h00–17h00',
        title: 'Rencontres B2B & activités permanentes',
        description: 'Mise en relation entre besoins, solutions, talents, partenaires et investisseurs.'
      },
      {
        id: 'd2-after-party',
        time: '18h00–21h00',
        title: 'FIKIRI After Party',
        description: 'DJ • networking • animations • Talent Show.'
      }
    ]
  },
  {
    id: '2026-11-27',
    date: '27 novembre 2026',
    title: "Jour 3 — Pitcher • S'engager • Célébrer",
    activities: [
      {
        id: 'd3-morning',
        time: '08h30–09h00',
        title: 'FIKIRI Morning',
        description: 'Accueil et synthèse des temps forts des deux premiers jours.'
      },
      {
        id: 'd3-village-rencontres',
        time: '09h00–12h30',
        title: 'Village & rencontres',
        description: 'Career Corner • Mentoring Corner • Investors Corner • FIKIRI Studio • échanges B2B.'
      },
      {
        id: 'd3-grand-pitch',
        time: '13h30–15h00',
        title: 'FIKIRI Grand Pitch',
        description: '10 à 15 innovations finalistes devant Gouvernement, PNUD, entreprises, investisseurs, universités et experts.'
      },
      {
        id: 'd3-session-2000-idees',
        time: '15h00–16h00',
        title: 'Session spéciale',
        description: '2 000 jeunes, 2 000 idées pour transformer la RDC.'
      },
      {
        id: 'd3-cloture',
        time: '16h00–17h00',
        title: 'Grande clôture',
        description: 'Déclaration FIKIRI 2026 • Awards • annonces • photo officielle.'
      },
      {
        id: 'd3-innovators-night',
        time: '18h30–22h00',
        title: 'FIKIRI Innovators Night',
        description: 'Dîner VIP • networking • témoignages • awards • rencontres investisseurs/innovateurs.'
      }
    ]
  }
];
