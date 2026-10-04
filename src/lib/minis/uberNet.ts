import { revenuNet, DEFAULTS } from '../engine/revenu';
import { P } from '../engine/params';
import { T, eur, type L } from './_kit';
export default (l: L) => ({
  title: T(l, 'Une semaine type sur une application : ce qui reste par course', 'A typical week on an app: what is left per ride'),
  cta: T(l, 'Simulateur complet du revenu net', 'Full net income calculator'),
  inputs: [
    { id: 'n', label: T(l, 'Courses par semaine', 'Rides per week'), def: 70, max: 400 },
    { id: 'p', label: T(l, 'Prix moyen payé par le client', 'Average fare paid by the rider'), def: 20, unit: '€', max: 500, decimals: 2 },
    { id: 'c', label: T(l, 'Commission (votre hypothèse, à lire sur vos relevés)', 'Commission (your assumption, check your statements)'), def: 25, unit: '%', max: 60, decimals: 1 },
  ],
  run: ({ n, p, c }: Record<string, number>) => {
    const d = DEFAULTS.vtc_plateforme;
    const r = revenuNet({ ...d, coursesSemaine: n, prixMoyen: p, commission: c / 100 });
    return { head: [T(l, 'Reversé par course, après commission', 'Paid out per ride, after commission'), eur(r.netParCourse, l, 2)],
      rows: [[T(l, 'Net estimé par mois, avant impôt', 'Estimated net per month, before income tax'), eur(r.netMensuel, l)], [T(l, 'Commission par mois', 'Commission per month'), eur(r.commission / 12, l)], [T(l, 'Minimum par course des accords ARPE', 'ARPE minimum per ride'), r.sousRevenuMinCourse ? T(l, `sous ${eur(P.plateformes.revenu_min_course, l)}`, `below ${eur(P.plateformes.revenu_min_course, l)}`) : T(l, `au-dessus de ${eur(P.plateformes.revenu_min_course, l)}`, `above ${eur(P.plateformes.revenu_min_course, l)}`)]] as [string, string][],
      note: T(l, `Estimation à partir de vos hypothèses, pas un chiffre de la plateforme. Micro-entreprise, ${d.semaines} semaines, frais de véhicule d’exemple.`, `An estimate from your assumptions, not a platform figure. Micro-enterprise, ${d.semaines} weeks, example vehicle costs.`) };
  },
});
