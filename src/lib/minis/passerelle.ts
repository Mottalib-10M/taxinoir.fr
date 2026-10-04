import { P } from '../engine/params';
import { T, eur, type L } from './_kit';
export default (l: L) => ({
  title: T(l, 'Déjà chauffeur de taxi ? La passerelle qui reste vers le VTC', 'Already a taxi driver? The bridge to VTC that remains'),
  cta: T(l, 'Coût d’accès au métier', 'Cost of getting started'),
  inputs: [
    { id: 'y', label: T(l, 'Années depuis vos résultats d’admissibilité taxi', 'Years since your taxi written results'), def: 2, unit: T(l, 'ans', 'yrs'), max: 50, decimals: 1 },
  ],
  run: ({ y }: Record<string, number>) => {
    const ok = y < P.examen.mobilite_validite_ans;
    return { head: [T(l, 'Inscription à prévoir', 'Exam fee to plan'), eur(ok ? P.acces.examen_mobilite : P.acces.examen_complet, l)],
      rows: [[T(l, 'Voie possible', 'Route available'), ok ? T(l, 'mobilité professionnelle (2 épreuves écrites + pratique)', 'professional mobility (2 written papers + practical)') : T(l, 'examen complet (7 épreuves + pratique)', 'full exam (7 papers + practical)')], [T(l, 'Accès par l’expérience', 'Access through experience'), T(l, 'fermé depuis le 12 août 2026', 'closed since 12 August 2026')], [T(l, 'Économie par rapport à l’examen complet', 'Saving compared with the full exam'), eur(ok ? P.acces.examen_complet - P.acces.examen_mobilite : 0, l)]] as [string, string][] };
  },
});
