import { P } from '../engine/params';
import { revenuLivreur } from '../engine/metiers';
import { T, eur, pct, type L } from './_kit';
/** Revenu net d'un livreur micro-entrepreneur : taux Urssaf 2026 (services commerciaux BIC), formation des commerçants, frais saisis. */
export default (l: L) => ({
  title: T(l, 'Livreur indépendant : ce qui reste chaque mois', 'Self-employed delivery driver: what is left each month'),
  cta: T(l, 'Revenu d’un chauffeur indépendant', 'Self-employed driver income'),
  inputs: [
    { id: 'ca', label: T(l, 'Chiffre d’affaires encaissé par mois', 'Turnover received per month'), def: 3000, unit: '€', max: 50000 },
    { id: 'f', label: T(l, 'Frais par mois (véhicule, carburant, assurance)', 'Costs per month (van, fuel, insurance)'), def: 900, unit: '€', max: 20000 },
    { id: 'acre', label: T(l, 'Acre (début d’activité depuis juillet 2026)', 'Acre start-up relief (started since July 2026)'), def: 0, options: [{ value: '0', label: T(l, 'Non', 'No') }, { value: '1', label: T(l, 'Oui', 'Yes') }] },
  ],
  run: ({ ca, f, acre }: Record<string, number>) => {
    const r = revenuLivreur({ caMois: ca, fraisMois: f, acre: acre === 1 });
    const alerte = r.seuilDepasse ? T(l, `Au-delà de ${eur(P.micro.seuil_services, l)} par an, le régime micro se perd après deux années de dépassement.`, `Above ${eur(P.micro.seuil_services, l)} a year, two years over the limit end the micro scheme.`)
      : r.franchiseTvaDepassee ? T(l, `Au-delà de ${eur(P.tva.franchise_services, l)} par an, la franchise de TVA ne s’applique plus.`, `Above ${eur(P.tva.franchise_services, l)} a year, the VAT exemption no longer applies.`)
      : T(l, 'Estimation à partir de vos chiffres et des taux Urssaf 2026, avant impôt sur le revenu.', 'Estimate from your figures and the 2026 Urssaf rates, before income tax.');
    return { head: [T(l, 'Revenu net mensuel estimé', 'Estimated monthly net income'), eur(r.net, l)],
      rows: [[T(l, `Cotisations sociales (${pct(r.tauxCotisation, l)})`, `Social contributions (${pct(r.tauxCotisation, l)})`), eur(r.cotisations, l)],
        [T(l, 'Contribution à la formation (commerçant)', 'Training levy (trader)'), eur(r.cfp, l)],
        [T(l, 'Frais saisis', 'Costs entered'), eur(r.frais, l)]] as [string, string][],
      note: alerte };
  },
});
