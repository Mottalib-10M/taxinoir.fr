import { coutAcces } from '../engine/acces';
import { T, eur, type L } from './_kit';
export default (l: L) => ({
  title: T(l, 'Votre budget pour devenir taxi', 'Your budget to become a taxi driver'),
  cta: T(l, 'Coût d’accès détaillé', 'Detailed start-up cost'),
  inputs: [
    { id: 'f', label: T(l, 'Formation (devis reçu)', 'Training (quote received)'), def: 1500, unit: '€', max: 20000 },
    { id: 'p', label: T(l, 'Formation PSC1 (prix de l’organisme)', 'First-aid PSC1 course (provider’s price)'), def: 60, unit: '€', max: 1000 },
    { id: 'lic', label: T(l, 'Achat de licence (0 si gratuite ou louée)', 'Licence purchase (0 if free or rented)'), def: 0, unit: '€', max: 1000000 },
  ],
  run: ({ f, p, lic }: Record<string, number>) => {
    const r = coutAcces({ metier: 'taxi', formation: f, medecin: 50, psc1: p, licence: lic, demarrage: 0 });
    return { head: [T(l, 'Avant la première course, hors véhicule', 'Before your first fare, vehicle excluded'), eur(r.total, l)],
      rows: [[T(l, 'Examen et carte (réglementés)', 'Exam and card (regulated)'), eur(r.reglementes, l)], [T(l, 'Formation, PSC1, médecin (hypothèse 50 €)', 'Training, PSC1, doctor (assumed €50)'), eur(r.prives - Math.max(0, lic), l)], [T(l, 'Licence', 'Licence'), eur(Math.max(0, lic), l)]] as [string, string][] };
  },
});
