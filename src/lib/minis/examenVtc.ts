import { moyenneAdmissibilite } from '../engine/acces';
import { P } from '../engine/params';
import { T, num, type L } from './_kit';
const ep = [...P.examen.tronc_commun, ...P.examen.vtc];
export default (l: L) => ({
  title: T(l, 'Serez-vous admissible ? Moyenne pondérée de l’écrit VTC', 'Will you pass the written part? Weighted VTC average'),
  cta: T(l, 'Coût d’accès au métier', 'Cost of getting started'),
  inputs: [
    { id: 'tc', label: T(l, 'Note moyenne visée en A, B, C, D', 'Target average in A, B, C, D'), def: 11, unit: '/20', max: 20, decimals: 1 },
    { id: 'e', label: T(l, 'Note en anglais (E)', 'English score (E)'), def: 8, unit: '/20', max: 20, decimals: 1 },
    { id: 'sp', label: T(l, 'Note moyenne en F(V) et G(V)', 'Average in F(V) and G(V)'), def: 11, unit: '/20', max: 20, decimals: 1 },
  ],
  run: ({ tc, e, sp }: Record<string, number>) => {
    const r = moyenneAdmissibilite(ep, [tc, tc, tc, tc, e, sp, sp]);
    return { head: [T(l, 'Moyenne pondérée de l’admissibilité', 'Weighted written average'), `${num(r.moyenne, l, 2)} /20`],
      rows: [[T(l, 'Résultat', 'Outcome'), r.admissible ? T(l, 'admissible', 'pass') : T(l, 'non admissible', 'fail')], [T(l, 'Épreuves sous la note éliminatoire', 'Papers below the elimination mark'), r.eliminees.length ? r.eliminees.join(', ') : T(l, 'aucune', 'none')], [T(l, 'Seuil d’admissibilité', 'Pass mark'), `${P.examen.admissibilite_moyenne} /20`]] as [string, string][],
      note: T(l, 'Coefficients du règlement CMA : A 3, B 2, C 3, D 2, E 1, F(V) 3, G(V) 3.', 'Weights from the CMA rules: A 3, B 2, C 3, D 2, E 1, F(V) 3, G(V) 3.') };
  },
});
