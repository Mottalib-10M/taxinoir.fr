import { P } from '../engine/params';
import { salaireTrm } from '../engine/metiers';
import { T, eur, num, type L } from './_kit';
/** Brut et net minimaux d'un conducteur poids lourd salarié : barème M (accord du 11 octobre 2023), Smic, taux Urssaf 2026. */
const G = P.grille_trm;
const taux = G.taux as Array<[string, number]>;
export default (l: L) => ({
  title: T(l, 'Chauffeur poids lourd : brut et net selon le coefficient', 'HGV driver: gross and net pay by coefficient'),
  cta: T(l, 'Conduire un car : permis D et FIMO', 'Coach driving: D licence and FIMO'),
  inputs: [
    { id: 'c', label: T(l, 'Coefficient (barème marchandises)', 'Coefficient (goods pay scale)'), def: 2, options: taux.map(([k], i) => ({ value: String(i), label: k })) },
    { id: 'a', label: T(l, 'Ancienneté dans l’entreprise', 'Years with the employer'), def: 0, unit: T(l, 'ans', 'yrs'), max: 45 },
    { id: 'h', label: T(l, 'Temps de service par semaine', 'Weekly service time'), def: 39, unit: 'h', max: 60 },
    { id: 'm', label: T(l, 'Majoration des heures après 35 h (votre contrat)', 'Premium on hours over 35 (your contract)'), def: 25, unit: '%', max: 100 },
  ],
  run: ({ c, a, h, m }: Record<string, number>) => {
    const r = salaireTrm({ coef: c, anciennete: a, heuresSemaine: h, majoration: m / 100 });
    return { head: [T(l, 'Net mensuel estimé, avant impôt', 'Estimated monthly net, before tax'), eur(r.net.net, l)],
      rows: [[T(l, 'Brut mensuel', 'Monthly gross'), eur(r.brut, l)],
        [T(l, `Taux horaire ${r.code}${r.smicApplique ? ' (Smic appliqué)' : ''}`, `Hourly rate ${r.code}${r.smicApplique ? ' (minimum wage applies)' : ''}`), eur(r.tauxApplique, l, 2)],
        [T(l, 'Heures payées par mois, dont majorées', 'Hours paid a month, of which at a premium'), `${num(r.heuresMois, l, 1)} / ${num(r.heuresMajoreesMois, l, 1)}`],
        [T(l, 'Cotisations salariales', 'Employee contributions'), eur(r.net.total, l)]] as [string, string][],
      note: T(l, 'Hors frais de route, primes, mutuelle et prévoyance de l’entreprise, réduction sur heures supplémentaires et impôt.', 'Excludes road allowances, bonuses, company health and protection cover, overtime contribution relief and income tax.') };
  },
});
