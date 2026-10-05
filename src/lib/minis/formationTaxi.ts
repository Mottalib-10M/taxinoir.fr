import { P } from '../engine/params';
import { coutFormationTaxi } from '../engine/metiers';
import { T, eur, type L } from './_kit';
/** Coût total jusqu'à la carte de taxi : frais réglementés (CMA, carte) + prix privés saisis (formation, PSC1, médecin). */
export default (l: L) => ({
  title: T(l, 'Formation taxi : combien jusqu’à la carte ?', 'Taxi training: what it costs to reach the card'),
  cta: T(l, 'Coût d’accès complet', 'Full start-up cost'),
  inputs: [
    { id: 'p', label: T(l, 'Prix de la formation (devis du centre)', 'Course price (school’s quote)'), def: 1500, unit: '€', max: 20000 },
    { id: 's', label: T(l, 'PSC1 et médecin agréé (vos devis)', 'First-aid course and approved doctor (your quotes)'), def: 120, unit: '€', max: 2000 },
    { id: 'v', label: T(l, 'Votre situation', 'Your situation'), def: 1, options: [{ value: '1', label: T(l, 'Premier examen', 'First exam') }, { value: '2', label: T(l, 'Déjà admissible au VTC (mobilité)', 'Already passed the VTC written stage') }] },
  ],
  run: ({ p, s, v }: Record<string, number>) => {
    const r = coutFormationTaxi({ formation: p, psc1: s, medecin: 0, mobiliteVtc: v === 2 });
    return { head: [T(l, 'Coût total jusqu’à la carte', 'Total cost up to the card'), eur(r.total, l)],
      rows: [[T(l, 'Frais réglementés (examen CMA + carte)', 'Regulated fees (CMA exam + card)'), eur(r.reglementes, l)],
        [T(l, 'Vos devis (formation, PSC1, médecin)', 'Your quotes (course, first aid, doctor)'), eur(r.prives, l)],
        [T(l, 'Si vous ratez la pratique', 'If you fail the practical test'), eur(r.siEchecPratique, l)],
        [T(l, 'Si vous ratez les écrits', 'If you fail the written stage'), eur(r.siEchecEcrit, l)]] as [string, string][],
      note: T(l, `Examen ${v === 2 ? P.acces.examen_mobilite : P.acces.examen_complet} € et carte environ ${P.acces.carte_pro_environ} € (CMA, service-public). Les prix privés sont vos saisies.`, `Exam €${v === 2 ? P.acces.examen_mobilite : P.acces.examen_complet} and card about €${P.acces.carte_pro_environ} (CMA, service-public). Private prices are your own figures.`) };
  },
});
