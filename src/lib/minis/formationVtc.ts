import { P } from '../engine/params';
import { T, eur, type L } from './_kit';
export default (l: L) => ({
  title: T(l, 'Formation VTC : le vrai prix d’une heure et d’un échec', 'VTC training: the real price of an hour and of a fail'),
  cta: T(l, 'Coût d’accès complet', 'Full start-up cost'),
  inputs: [
    { id: 'p', label: T(l, 'Prix de la formation', 'Training price'), def: 1500, unit: '€', max: 20000 },
    { id: 'h', label: T(l, 'Heures de formation incluses', 'Hours included'), def: 120, unit: 'h', max: 1000 },
  ],
  run: ({ p, h }: Record<string, number>) => {
    const A = P.acces;
    return { head: [T(l, 'Prix d’une heure de formation', 'Price per training hour'), eur(h > 0 ? p / h : 0, l, 2)],
      rows: [[T(l, 'Formation + examen', 'Training + exam'), eur(p + A.examen_complet, l)], [T(l, 'Si vous ratez la pratique (nouvelle admission)', 'If you fail the practical (new admission only)'), eur(p + A.examen_complet + A.examen_admission_seule, l)], [T(l, 'Si vous ratez l’écrit (examen complet à repasser)', 'If you fail the written part (full exam again)'), eur(p + 2 * A.examen_complet, l)]] as [string, string][] };
  },
});
