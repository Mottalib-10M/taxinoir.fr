import { revenuNet, DEFAULTS } from '../engine/revenu';
import { T, eur, type L } from './_kit';
export default (l: L) => ({
  title: T(l, 'Votre virement de la semaine et ce qu’il devient', 'Your weekly payout and what becomes of it'),
  cta: T(l, 'Simulateur complet du revenu net', 'Full net income calculator'),
  inputs: [
    { id: 'ca', label: T(l, 'Courses de la semaine, prix client', 'Week’s fares, rider price'), def: 1300, unit: '€', max: 20000 },
    { id: 'c', label: T(l, 'Commission (votre hypothèse)', 'Commission (your assumption)'), def: 25, unit: '%', max: 60, decimals: 1 },
    { id: 'h', label: T(l, 'Heures connectées dans la semaine', 'Hours logged in that week'), def: 45, unit: 'h', max: 100 },
  ],
  run: ({ ca, c, h }: Record<string, number>) => {
    const d = DEFAULTS.vtc_plateforme;
    const r = revenuNet({ ...d, caAnnuel: ca * d.semaines, commission: c / 100, heuresSemaine: h });
    const virement = (r.caClient - r.commission) / d.semaines;
    return { head: [T(l, 'Virement estimé pour la semaine', 'Estimated payout for the week'), eur(virement, l)],
      rows: [[T(l, 'Net par heure connectée, après frais et cotisations', 'Net per hour logged in, after costs and contributions'), eur(r.netHoraire, l, 2)], [T(l, 'Net estimé par mois, avant impôt', 'Estimated net per month, before income tax'), eur(r.netMensuel, l)], [T(l, 'Cotisations par mois', 'Contributions per month'), eur(r.cotisations / 12, l)]] as [string, string][],
      note: T(l, 'Le virement couvre une semaine du lundi 0 h au dimanche 23 h 59, selon le centre d’aide de Bolt. Commission et frais : vos hypothèses.', 'The payout covers Monday 00:00 to Sunday 23:59, according to Bolt’s help centre. Commission and costs: your assumptions.') };
  },
});
