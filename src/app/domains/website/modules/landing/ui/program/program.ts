import { Component } from '@angular/core';

@Component({
  selector: 'program',
  templateUrl: './program.html'
})
export class Program {
  protected readonly days = [
    {
      date: '25 novembre 2026',
      title: 'Jour 1 — Inspirer • Découvrir • Connecter',
      sessions: [
        ['08h00–09h00', 'Accueil & FIKIRI Experience', 'Village, stands, démonstrations technologiques, plateformes FIKIRI et médias.'],
        ['09h00–10h15', "Grande plénière d'ouverture", '« Génération FIKIRI : la jeunesse qui construit la RDC de demain » + FIKIRI Impact 2023–2026.'],
        ['10h15–10h45', 'FIKIRI Talks', '5 intervenants × 5 minutes : startup, IA, innovation frugale et territoires.'],
        ['10h45–11h15', 'Pause + visite du Village', 'Rencontre directe entre autorités et innovateurs.'],
        ['11h15–13h00', 'Activités en parallèle', 'IA • Entrepreneuriat • Financement • Métiers numériques • FIKIRI Lab • Village.'],
        ['13h00–14h00', 'Déjeuner & networking', 'Networking Challenge et rencontres.'],
        ['14h00–15h00', 'Grande plénière', '« Quelle RDC numérique voulons-nous en 2030 ? »'],
        ['15h00–17h00', 'FIKIRI Challenges', 'AI • GovTech • Green Innovation • Women & Girls in Tech • Territorial Innovation.']
      ]
    },
    {
      date: '26 novembre 2026',
      title: 'Jour 2 — Apprendre • Construire • Expérimenter',
      sessions: [
        ['08h30–09h00', 'FIKIRI Morning', 'Animation, musique et récapitulatif du Jour 1.'],
        ['09h00–10h00', 'Grande plénière', '« De consommateur de technologie à créateur de solutions »'],
        ['10h00–12h30', 'FIKIRI Academy', '8 masterclasses : startup, IA générative, cybersécurité, MVP, pitch, financement, marque personnelle, data & langues congolaises.'],
        ['10h00–12h30', 'Activités permanentes', 'Village • Career Corner • Mentoring Corner • Investors Corner • FIKIRI Studio.'],
        ['12h30–13h30', 'Pause', 'Networking et visites.'],
        ['13h30–15h00', 'FIKIRI Demo Show', 'Pitch de 3 minutes + 2 minutes de questions, avec vote du public.'],
        ['15h00–17h00', 'Rencontres B2B & activités permanentes', 'Mise en relation entre besoins, solutions, talents, partenaires et investisseurs.'],
        ['18h00–21h00', 'FIKIRI After Party', 'DJ • networking • animations • Talent Show.']
      ]
    },
    {
      date: '27 novembre 2026',
      title: "Jour 3 — Pitcher • S'engager • Célébrer",
      sessions: [
        ['08h30–09h00', 'FIKIRI Morning', 'Accueil et synthèse des temps forts des deux premiers jours.'],
        ['09h00–12h30', 'Village & rencontres', 'Career Corner • Mentoring Corner • Investors Corner • FIKIRI Studio • échanges B2B.'],
        ['12h30–13h30', 'Pause', 'Networking et visites.'],
        ['13h30–15h00', 'FIKIRI Grand Pitch', '10 à 15 innovations finalistes devant Gouvernement, PNUD, entreprises, investisseurs, universités et experts.'],
        ['15h00–16h00', 'Session spéciale', '« 2 000 jeunes, 2 000 idées pour transformer la RDC »'],
        ['16h00–17h00', 'Grande clôture', 'Déclaration FIKIRI 2026 • Awards • annonces • photo officielle.'],
        ['18h30–22h00', 'FIKIRI Innovators Night', 'Dîner VIP • networking • témoignages • awards • rencontres investisseurs/innovateurs.']
      ]
    }
  ] as const;
}
