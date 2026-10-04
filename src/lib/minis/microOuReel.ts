import { P } from '../engine/params';
import { T, eur, type L } from './_kit';
/** Bénéfice imposable : abattement forfaitaire du micro-BIC (50 % pour les services) contre frais réels (régime réel). */
export default (l: L) => ({
  title: T(l, 'Bénéfice imposable : forfait micro ou frais réels ?', 'Taxable profit: micro allowance or actual costs?'),
  cta: T(l, 'TVA et comparaison micro ou réel', 'VAT and micro versus real'),
  inputs: [
    { id: 'ca', label: T(l, 'Chiffre d’affaires annuel hors TVA', 'Annual turnover excluding VAT'), def: 60000, unit: '€', max: 1000000 },
    { id: 'f', label: T(l, 'Frais réels de l’année (véhicule, carburant, assurance, commissions…)', 'Actual costs for the year (vehicle, fuel, insurance, commissions…)'), def: 34000, unit: '€', max: 1000000 },
  ],
  run: ({ ca, f }: Record<string, number>) => {
    const x = Math.max(0, ca), micro = x * (1 - P.micro.abattement_bic_services), reel = Math.max(0, x - Math.max(0, f));
    return { head: [T(l, 'Le plus bas des deux', 'The lower of the two'), micro <= reel ? T(l, 'forfait micro', 'micro allowance') : T(l, 'frais réels', 'actual costs')],
      rows: [[T(l, 'Bénéfice imposable en micro (forfait)', 'Taxable profit under micro (allowance)'), eur(micro, l)],
        [T(l, 'Bénéfice imposable au réel', 'Taxable profit under the real regime'), eur(reel, l)],
        [T(l, 'Écart de base imposable', 'Difference in taxable base'), eur(Math.abs(micro - reel), l)]] as [string, string][],
      note: x > P.micro.seuil_services ? T(l, `Au-delà de ${eur(P.micro.seuil_services, l)}, le micro n’est plus ouvert.`, `Above ${eur(P.micro.seuil_services, l)}, the micro regime is no longer available.`) : T(l, 'Impôt sur le revenu seulement : les cotisations sociales suivent d’autres règles.', 'Income tax base only: social contributions follow other rules.') };
  },
});
