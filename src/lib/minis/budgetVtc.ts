import { coutAcces } from '../engine/acces';
import { P } from '../engine/params';
import { T, eur, type L } from './_kit';
export default (l: L) => ({
  title: T(l, 'Votre budget pour devenir VTC', 'Your budget to become a VTC driver'),
  cta: T(l, 'Coût d’accès détaillé', 'Detailed start-up cost'),
  inputs: [
    { id: 'f', label: T(l, 'Prix de la formation (devis reçu)', 'Training price (quote received)'), def: 1500, unit: '€', max: 20000 },
    { id: 'm', label: T(l, 'Visite chez le médecin agréé', 'Approved doctor’s fee'), def: 50, unit: '€', max: 1000 },
  ],
  run: ({ f, m }: Record<string, number>) => {
    const r = coutAcces({ metier: 'vtc', formation: f, medecin: m, demarrage: 0 });
    return { head: [T(l, 'Avant le premier client, hors véhicule', 'Before your first client, vehicle excluded'), eur(r.total, l)],
      rows: [[T(l, 'Frais réglementés (examen, carte, registre, vignette)', 'Regulated fees (exam, card, register, sticker)'), eur(r.reglementes, l)], [T(l, 'Examen T3P complet 2026', 'Full T3P exam, 2026'), eur(P.acces.examen_complet, l)], [T(l, 'Formation et médecin (vos montants)', 'Training and doctor (your figures)'), eur(r.prives, l)]] as [string, string][] };
  },
});
