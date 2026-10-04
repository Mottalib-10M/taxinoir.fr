import { comparerFinancement } from '../engine/vehicule';
import { T, eur, type L } from './_kit';
export default (l: L) => ({
  title: T(l, 'Louer ou acheter la voiture : le coût par mois', 'Lease or buy the car: the monthly cost'),
  cta: T(l, 'Revenu net avec ce véhicule', 'Net income with this car'),
  inputs: [
    { id: 'p', label: T(l, 'Prix d’achat du véhicule (devis)', 'Purchase price of the car (quote)'), def: 35000, unit: '€', max: 200000 },
    { id: 'd', label: T(l, 'Durée', 'Term'), def: 48, unit: T(l, 'mois', 'months'), max: 84 },
    { id: 't', label: T(l, 'Taux du crédit (votre offre)', 'Loan rate (your offer)'), def: 6, unit: '%', max: 25, decimals: 2 },
    { id: 'r', label: T(l, 'Revente estimée en fin de durée', 'Estimated resale value at the end'), def: 12000, unit: '€', max: 200000 },
    { id: 'lo', label: T(l, 'Loyer mensuel LLD ou LOA (devis)', 'Monthly lease payment (quote)'), def: 650, unit: '€', max: 10000 },
  ],
  run: ({ p, d, t, r, lo }: Record<string, number>) => {
    const x = comparerFinancement({ prix: p, apport: 0, tauxAnnuel: t / 100, mois: d, revente: r, loyer: lo });
    const moinsCher = x.ecartParMois >= 0 ? T(l, 'le crédit', 'buying') : T(l, 'la location', 'leasing');
    return { head: [T(l, 'Achat à crédit, revente déduite, par mois', 'Buying on credit, resale deducted, per month'), eur(x.creditParMois, l)],
      rows: [[T(l, 'Location, par mois', 'Lease, per month'), eur(x.locationParMois, l)], [T(l, 'Mensualité du crédit', 'Loan repayment'), eur(x.mensualite, l)], [T(l, 'Le moins cher sur la durée', 'Cheaper over the term'), `${moinsCher} (${eur(Math.abs(x.ecartParMois), l)}${T(l, ' par mois', ' a month')})`], ...(x.garantieDue ? [[T(l, 'Garantie financière au registre', 'Financial guarantee for the register'), eur(x.garantie, l)] as [string, string]] : [])] as [string, string][],
      note: T(l, 'Tous les montants sont vos devis. La revente est une estimation : si elle ne se réalise pas, le crédit coûte plus cher que ce calcul.', 'Every amount is your own quote. Resale is an estimate: if it falls short, buying costs more than shown.') };
  },
});
