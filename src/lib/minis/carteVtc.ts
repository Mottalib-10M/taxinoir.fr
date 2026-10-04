import { P } from '../engine/params';
import { T, eur, num, type L } from './_kit';
export default (l: L) => ({
  title: T(l, 'Ce que la carte VTC vous coûtera sur votre carrière', 'What the VTC card will cost over your career'),
  cta: T(l, 'Calendrier de renouvellement', 'Renewal calendar'),
  inputs: [
    { id: 'a', label: T(l, 'Années d’activité prévues', 'Years you plan to drive'), def: 10, unit: T(l, 'ans', 'yrs'), max: 50 },
    { id: 's', label: T(l, 'Prix du stage de formation continue (devis)', 'Continuing training course price (quote)'), def: 250, unit: '€', max: 5000 },
  ],
  run: ({ a, s }: Record<string, number>) => {
    const v = P.acces.carte_validite_ans, carte = P.acces.carte_pro_environ;
    const renouv = a > 0 ? Math.ceil(a / v) - 1 : 0;
    return { head: [T(l, 'Carte, renouvellements et stages', 'Card, renewals and courses'), eur(carte + renouv * (carte + s), l)],
      rows: [[T(l, 'Renouvellements à prévoir', 'Renewals ahead'), num(renouv, l)], [T(l, 'Stages de 14 heures', '14-hour courses'), num(renouv, l)], [T(l, 'Carte (environ, par fabrication)', 'Card (approx., each issue)'), eur(carte, l)]] as [string, string][] };
  },
});
