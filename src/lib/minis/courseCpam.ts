import { courseConventionnee } from '../engine/exploitation';
import { P } from '../engine/params';
import { T, eur, num, type L } from './_kit';
export default (l: L) => ({
  title: T(l, 'Montant d’un transport assis conventionné', 'Amount for a seated patient journey'),
  cta: T(l, 'Revenu net d’un taxi', 'Taxi net income'),
  inputs: [
    { id: 'k', label: T(l, 'Kilomètres parcourus avec le patient', 'Kilometres driven with the patient'), def: 25, unit: 'km', max: 1000 },
    { id: 't', label: T(l, 'Tarif kilométrique de votre département (annexe 2)', 'Per-km rate for your département (annex 2)'), def: P.cpam.tarif_km_exemples['13'], unit: '€', max: 3, decimals: 2 },
    { id: 'g', label: T(l, 'Départ ou arrivée en « grande ville »', 'Pick-up or drop-off in a “big city”'), def: 0, options: [{ value: '0', label: T(l, 'Non', 'No') }, { value: '1', label: T(l, 'Oui', 'Yes') }] },
  ],
  run: ({ k, t, g }: Record<string, number>) => {
    const x = courseConventionnee({ km: k, tarifKm: t, grandeVille: g === 1 });
    return { head: [T(l, 'Montant de base du transport', 'Base amount for the journey'), eur(x.total, l, 2)],
      rows: [[T(l, `Forfait prise en charge (${P.cpam.km_inclus} premiers km)`, `Pick-up flat fee (first ${P.cpam.km_inclus} km)`), eur(x.forfait, l, 2)], [T(l, `${num(x.kmFactures, l)} km au tarif de ${eur(x.tarif, l, 2)}`, `${num(x.kmFactures, l)} km at ${eur(x.tarif, l, 2)}`), eur(x.distance, l, 2)], [T(l, 'Forfait « Grande ville »', '“Big city” flat fee'), eur(x.grandeVille, l, 2)]] as [string, string][],
      note: T(l, `Grille de la convention-cadre approuvée par l’arrêté du 29 juillet 2025, applicable depuis le 1er novembre 2025. Tarif par défaut : celui des Bouches-du-Rhône. Hors péages, attente, transport partagé, supplément TPMR et remises.`, `Grid from the framework agreement approved by the order of 29 July 2025, in force since 1 November 2025. Default rate: Bouches-du-Rhône. Tolls, waiting, shared rides, wheelchair supplement and discounts excluded.`) };
  },
});
