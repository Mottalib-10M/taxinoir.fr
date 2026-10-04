import { coutAcces } from '../engine/acces';
import { T, eur, type L } from './_kit';
/** Coût d'entrée comparé, frais réglementés des paramètres + saisies du visiteur (moteur coutAcces). */
export default (l: L) => ({
  title: T(l, 'Taxi ou VTC : ce que coûte l’entrée', 'Taxi or VTC: what getting in costs'),
  cta: T(l, 'Coût d’accès détaillé', 'Detailed start-up cost'),
  inputs: [
    { id: 'f', label: T(l, 'Formation (devis reçu, même montant pour les deux)', 'Training (quote received, same for both)'), def: 1200, unit: '€', max: 20000 },
    { id: 'lic', label: T(l, 'Taxi : achat de licence (0 si gratuite ou louée)', 'Taxi: licence purchase (0 if free or rented)'), def: 0, unit: '€', max: 1000000 },
    { id: 'g', label: T(l, 'VTC : véhicules ni à vous ni loués plus de 6 mois', 'VTC: vehicles neither owned nor leased over 6 months'), def: 0, max: 1, options: [{ value: '0', label: T(l, 'aucun', 'none') }, { value: '1', label: T(l, 'un', 'one') }] },
  ],
  run: ({ f, lic, g }: Record<string, number>) => {
    const taxi = coutAcces({ metier: 'taxi', formation: f, medecin: 0, psc1: 0, licence: lic, demarrage: 0 });
    const vtc = coutAcces({ metier: 'vtc', formation: f, medecin: 0, garantieFinanciere: g === 1, demarrage: 0 });
    const d = taxi.total - vtc.total;
    return { head: [d > 0 ? T(l, 'Le taxi coûte de plus', 'Taxi costs more by') : d < 0 ? T(l, 'Le VTC coûte de plus', 'VTC costs more by') : T(l, 'Écart', 'Difference'), eur(Math.abs(d), l)],
      rows: [[T(l, 'Entrée en taxi', 'Getting into taxi work'), eur(taxi.total, l)], [T(l, 'Entrée en VTC', 'Getting into VTC work'), eur(vtc.total, l)], [T(l, 'Dont frais réglementés taxi / VTC', 'Of which regulated fees, taxi / VTC'), `${eur(taxi.reglementes, l)} / ${eur(vtc.reglementes, l)}`]] as [string, string][],
      note: T(l, 'Hors médecin agréé, PSC1 et véhicule, qui dépendent de vos devis.', 'Excludes the approved doctor, PSC1 first aid and the vehicle, which depend on your quotes.') };
  },
});
