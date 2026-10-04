import { P } from '../engine/params';
import { T, eur, num, type L } from './_kit';
/** Salaire mensuel garanti d'un conducteur, avenant n° 120 du 27 novembre 2025 (convention des transports routiers). */
const G = P.grille_trv;
const coefs = G.taux as Array<[string, number]>;
const anc = G.anciennete as Array<[number, number]>;
export default (l: L) => ({
  title: T(l, 'Brut mensuel minimal d’un conducteur de car', 'Minimum monthly gross for a coach driver'),
  cta: T(l, 'Revenu d’un chauffeur indépendant', 'Self-employed driver income'),
  inputs: [
    { id: 'c', label: T(l, 'Coefficient de la grille', 'Pay-scale coefficient'), def: 5, options: coefs.map(([k], i) => ({ value: String(i), label: k })) },
    { id: 'y', label: T(l, 'Ancienneté dans l’entreprise', 'Years with the employer'), def: 0, unit: T(l, 'ans', 'yrs'), max: 45 },
    { id: 'd', label: T(l, 'Dimanches et jours fériés travaillés dans le mois', 'Sundays and bank holidays worked in the month'), def: 2, max: 14 },
  ],
  run: ({ c, y, d }: Record<string, number>) => {
    const [code, taux] = coefs[Math.min(coefs.length - 1, Math.max(0, Math.round(c)))];
    const maj = anc.filter(([an]) => Math.max(0, y) >= an).pop()![1];
    const horaire = Math.max(taux, P.ambulancier.smic_horaire);
    const base = horaire * G.heures_mois * (1 + maj);
    const primes = Math.max(0, Math.round(d)) * G.dimanche;
    return { head: [T(l, 'Brut mensuel minimal', 'Minimum monthly gross'), eur(base + primes, l)],
      rows: [[T(l, `Salaire garanti ${code}, ${num(G.heures_mois, l, 2)} h`, `Guaranteed pay ${code}, ${num(G.heures_mois, l, 2)} h`), eur(base, l)],
        [T(l, 'Majoration d’ancienneté', 'Seniority increase'), `+${Math.round(maj * 100)} %`],
        [T(l, 'Indemnités de dimanche et jour férié', 'Sunday and bank holiday allowances'), eur(primes, l, 2)]] as [string, string][],
      note: T(l, 'Hors heures supplémentaires, amplitude, frais de déplacement et primes de l’entreprise.', 'Excludes overtime, spread-over allowances, travel expenses and company bonuses.') };
  },
});
