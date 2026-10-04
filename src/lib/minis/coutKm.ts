import { coutKm } from '../engine/vehicule';
import { P } from '../engine/params';
import { T, eur, type L } from './_kit';
export default (l: L) => ({
  title: T(l, 'Le vrai coût de votre voiture au kilomètre', 'What your car really costs per kilometre'),
  cta: T(l, 'Vérifier la conformité du véhicule', 'Check the car meets the rules'),
  inputs: [
    { id: 'p', label: T(l, 'Prix d’achat', 'Purchase price'), def: 38000, unit: '€', max: 200000 },
    { id: 'r', label: T(l, 'Revente estimée', 'Estimated resale'), def: 11000, unit: '€', max: 200000 },
    { id: 'a', label: T(l, 'Années de détention', 'Years you keep it'), def: 5, unit: T(l, 'ans', 'yrs'), max: 15 },
    { id: 'k', label: T(l, 'Kilomètres par an', 'Kilometres per year'), def: 60000, unit: 'km', max: 300000 },
    { id: 'e', label: T(l, 'Carburant ou recharge pour 100 km', 'Fuel or charging per 100 km'), def: 7, unit: '€', max: 50, decimals: 2 },
    { id: 'f', label: T(l, 'Assurance et entretien par an', 'Insurance and servicing per year'), def: 3800, unit: '€', max: 30000 },
  ],
  run: ({ p, r, a, k, e, f }: Record<string, number>) => {
    const x = coutKm({ prix: p, revente: r, annees: a, kmAn: k, energie100: e, assuranceAn: f, entretienAn: 0 });
    return { head: [T(l, 'Coût complet par kilomètre', 'Full cost per kilometre'), eur(x.parKm, l, 3)],
      rows: [[T(l, 'Par mois', 'Per month'), eur(x.parMois, l)], [T(l, 'Perte de valeur par an', 'Depreciation per year'), eur(x.depreciation, l)], [T(l, 'Énergie par an', 'Energy per year'), eur(x.energie, l)]] as [string, string][],
      note: x.depasseAgeThermique ? T(l, `Attention : une voiture thermique doit avoir moins de ${P.vehicule_vtc.age_max_ans} ans pour rouler en VTC (arrêté du 26 mars 2015). Hybrides et électriques en sont exemptés.`, `Note: a petrol or diesel car must be under ${P.vehicule_vtc.age_max_ans} years old to work as a VTC (order of 26 March 2015). Hybrids and electric cars are exempt.`) : T(l, 'Prix, revente, énergie et frais : vos chiffres. Le calcul ne retient aucune aide à l’achat.', 'Price, resale, energy and running costs: your figures. No purchase grant is included.') };
  },
});
