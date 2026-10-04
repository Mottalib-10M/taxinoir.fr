import { brutAmbulancier, type NiveauAmbulancier } from '../engine/acces';
import { P } from '../engine/params';
import { T, eur, type L } from './_kit';
export default (l: L) => ({
  title: T(l, 'Salaire brut minimal d’un ambulancier', 'Minimum gross pay for an ambulance worker'),
  cta: T(l, 'Revenu d’un chauffeur indépendant', 'Self-employed driver income'),
  inputs: [
    { id: 'n', label: T(l, 'Niveau dans la grille conventionnelle', 'Level in the collective-agreement scale'), def: 2, options: [1, 2, 3].map((n) => ({ value: String(n), label: T(l, `Ambulancier niveau ${n}`, `Ambulance level ${n}`) })) },
    { id: 'h', label: T(l, 'Heures payées par mois', 'Paid hours per month'), def: P.ambulancier.duree_legale_mensuelle_h, unit: 'h', max: 400, decimals: 2 },
    { id: 'd', label: T(l, 'Dimanches ou jours fériés travaillés', 'Sundays or bank holidays worked'), def: 2, max: 31 },
  ],
  run: ({ n, h, d }: Record<string, number>) => {
    const b = brutAmbulancier((Math.min(3, Math.max(1, n)) as NiveauAmbulancier), h, d);
    return { head: [T(l, 'Brut mensuel minimal', 'Minimum gross per month'), eur(b.brut, l)],
      rows: [[T(l, 'Taux horaire appliqué', 'Hourly rate applied'), eur(b.applique, l, 2)], [T(l, 'Taux de la grille', 'Scale rate'), eur(b.conventionnel, l, 2) + (b.smicApplique ? T(l, ' (sous le Smic)', ' (below the Smic)') : '')], [T(l, 'Indemnités de dimanche et jours fériés', 'Sunday and bank holiday allowances'), eur(b.indemnites, l, 2)]] as [string, string][],
      note: T(l, 'Hors heures supplémentaires, ancienneté et primes de l’entreprise.', 'Excludes overtime, seniority and company bonuses.') };
  },
});
