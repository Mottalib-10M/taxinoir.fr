import { P } from '../engine/params';
import { T, num, type L } from './_kit';
/** Âge minimal de conduite d'un car (code des transports, R3314-4 et R3314-6) et échéance de la FCO (R3314-10). */
export default (l: L) => ({
  title: T(l, 'Car ou bus : à quel âge, et quand refaire la FCO ?', 'Bus or coach: from what age, and when is the next refresher?'),
  cta: T(l, 'Salaire d’un chauffeur de bus', 'Bus driver pay'),
  inputs: [
    { id: 'f', label: T(l, 'Qualification initiale', 'Initial qualification'), def: 2, options: [{ value: '1', label: T(l, `Formation longue (${P.bus.fimo_longue_h} h)`, `Long course (${P.bus.fimo_longue_h} h)`) }, { value: '2', label: T(l, `FIMO accélérée (${P.bus.fimo_acceleree_h} h)`, `Fast-track FIMO (${P.bus.fimo_acceleree_h} h)`) }] },
    { id: 's', label: T(l, 'Service visé (permis D)', 'Intended work (D licence)'), def: 2, options: [{ value: '1', label: T(l, 'Trajets internationaux', 'International journeys') }, { value: '2', label: T(l, 'France uniquement', 'France only') }, { value: '3', label: T(l, `Lignes régulières de ${P.bus.ligne_km_max} km au plus`, `Regular routes of ${P.bus.ligne_km_max} km or less`) }] },
    { id: 'a', label: T(l, 'Années depuis la qualification ou la dernière FCO', 'Years since qualification or last refresher'), def: 3, unit: T(l, 'ans', 'yrs'), max: 40, decimals: 1 },
  ],
  run: ({ f, s, a }: Record<string, number>) => {
    const B = P.bus;
    const age = f === 1 ? (s === 1 ? B.age_longue_d : s === 2 ? B.age_longue_d_national : B.age_longue_d_ligne) : (s === 3 ? B.age_acceleree_d_ligne : B.age_acceleree_d);
    const reste = B.fco_periodicite_ans - Math.max(0, a);
    return { head: [T(l, 'Âge minimal pour conduire un car', 'Minimum age to drive a coach'), `${age} ${T(l, 'ans', 'years')}`],
      rows: [[T(l, 'Âge du permis D sans qualification', 'D licence age without the qualification'), `${B.age_permis_d} ${T(l, 'ans', 'years')}`],
        [T(l, 'FCO à suivre dans', 'Refresher (FCO) due in'), reste > 0 ? `${num(reste, l, 1)} ${T(l, 'ans', 'years')}` : T(l, 'dépassée : FCO avant de reprendre', 'overdue: refresher before driving again')],
        [T(l, 'Durée de la FCO', 'Refresher length'), `${B.fco_h} h`]] as [string, string][] };
  },
});
