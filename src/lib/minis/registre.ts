import { P } from '../engine/params';
import { T, eur, type L } from './_kit';
export default (l: L) => ({
  title: T(l, 'Inscription au registre : ce que vous devrez payer ou bloquer', 'Register entry: what you will pay or set aside'),
  cta: T(l, 'Coût d’accès complet', 'Full start-up cost'),
  inputs: [
    { id: 'v', label: T(l, 'Véhicules ni à vous ni loués plus de 6 mois', 'Vehicles neither owned nor leased over 6 months'), def: 0, max: 50 },
    { id: 'n', label: T(l, 'Vignettes VTC à commander', 'VTC stickers to order'), def: 1, max: 50 },
  ],
  run: ({ v, n }: Record<string, number>) => {
    const g = v * P.acces.garantie_financiere_par_vehicule, vi = n * P.acces.vignette_environ;
    return { head: [T(l, 'Frais et garantie au démarrage', 'Fees and guarantee at the start'), eur(P.acces.registre_inscription + g + vi, l)],
      rows: [[T(l, 'Frais d’inscription au registre', 'Register fee'), eur(P.acces.registre_inscription, l)], [T(l, 'Garantie financière à justifier', 'Financial guarantee to evidence'), eur(g, l)], [T(l, 'Vignettes (environ)', 'Stickers (approx.)'), eur(vi, l)]] as [string, string][],
      note: T(l, `Renouvellement de l’inscription tous les ${P.acces.registre_validite_ans} ans.`, `Registration must be renewed every ${P.acces.registre_validite_ans} years.`) };
  },
});
