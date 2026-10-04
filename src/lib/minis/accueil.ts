import { revenuNet, DEFAULTS, type Metier } from '../engine/revenu';
import { T, eur, type L } from './_kit';
const METIERS: Metier[] = ['vtc_plateforme', 'vtc_propre', 'taxi'];
export default (l: L) => ({
  title: T(l, 'Votre revenu net en deux saisies', 'Your net income in two inputs'),
  cta: T(l, 'Simulateur complet du revenu net', 'Full net income calculator'),
  inputs: [
    { id: 'm', label: T(l, 'Activité', 'Activity'), def: 0, options: [T(l, 'VTC avec une plateforme', 'VTC with a platform'), T(l, 'VTC, clientèle propre', 'VTC, own clients'), T(l, 'Taxi', 'Taxi')].map((x, i) => ({ value: String(i), label: x })) },
    { id: 'ca', label: T(l, 'Chiffre d’affaires par semaine', 'Takings per week'), def: 1400, unit: '€', max: 20000 },
  ],
  run: ({ m, ca }: Record<string, number>) => {
    const d = DEFAULTS[METIERS[m] ?? 'vtc_plateforme'];
    const r = revenuNet({ ...d, caAnnuel: ca * d.semaines });
    return { head: [T(l, 'Net estimé par mois, avant impôt', 'Estimated net per month, before income tax'), eur(r.netMensuel, l)],
      rows: [[T(l, 'Par heure travaillée', 'Per hour worked'), eur(r.netHoraire, l, 2)], [T(l, 'Cotisations et TVA par mois', 'Contributions and VAT per month'), eur((r.cotisations + r.tva) / 12, l)], [T(l, 'Frais du véhicule et commission par mois', 'Vehicle costs and commission per month'), eur((r.charges.total + r.commission) / 12, l)]] as [string, string][],
      note: T(l, `Micro-entreprise, ${d.semaines} semaines et frais d’exemple : remplacez-les dans le simulateur complet.`, `Micro-enterprise, ${d.semaines} weeks and example costs: replace them in the full calculator.`) };
  },
});
