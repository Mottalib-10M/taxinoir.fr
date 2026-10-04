import { revenuNet, DEFAULTS } from '../engine/revenu';
import { T, eur, type L } from './_kit';
export default (l: L) => ({
  title: T(l, 'Combien gagne un taxi : votre cas', 'How much a taxi driver earns: your case'),
  cta: T(l, 'Simulateur complet du revenu net', 'Full net income calculator'),
  inputs: [
    { id: 'ca', label: T(l, 'Recettes au compteur par semaine', 'Meter takings per week'), def: 1500, unit: '€', max: 20000 },
    { id: 'lo', label: T(l, 'Location de licence par mois (0 si à vous)', 'Licence rent per month (0 if you own it)'), def: 0, unit: '€', max: 20000 },
    { id: 'h', label: T(l, 'Heures au volant par semaine', 'Hours at the wheel per week'), def: 50, unit: 'h', max: 100 },
  ],
  run: ({ ca, lo, h }: Record<string, number>) => {
    const d = DEFAULTS.taxi;
    const r = revenuNet({ ...d, caAnnuel: ca * d.semaines, licenceMois: lo, heuresSemaine: h });
    return { head: [T(l, 'Net estimé par mois, avant impôt', 'Estimated net per month, before income tax'), eur(r.netMensuel, l)],
      rows: [[T(l, 'Net par heure', 'Net per hour'), eur(r.netHoraire, l, 2)], [T(l, 'Cotisations par mois', 'Contributions per month'), eur(r.cotisations / 12, l)], [T(l, 'TVA à reverser par mois', 'VAT to pay over per month'), eur(r.tva / 12, l)]] as [string, string][],
      note: T(l, `Micro-entreprise, ${d.semaines} semaines, frais de véhicule d’exemple : à remplacer dans le simulateur complet.`, `Micro-enterprise, ${d.semaines} weeks, example vehicle costs: replace them in the full calculator.`) };
  },
});
