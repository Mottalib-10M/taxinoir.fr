import { P } from '../engine/params';
import { T, num, type L } from './_kit';
export default (l: L) => ({
  title: T(l, 'Auxiliaire ou diplôme d’État : combien de semaines avant de travailler', 'Assistant or State diploma: how many weeks before you can work'),
  cta: T(l, 'Formation d’ambulancier en détail', 'Ambulance training in detail'),
  inputs: [
    { id: 'h', label: T(l, 'Heures de formation possibles par semaine', 'Training hours you can do per week'), def: 35, unit: 'h', max: 60 },
  ],
  run: ({ h }: Record<string, number>) => {
    const A = P.ambulancier;
    const aux = h > 0 ? A.auxiliaire_heures / h : 0;
    const dea = h > 0 ? A.dea_heures_institut / h + A.dea_semaines_stage : 0;
    return { head: [T(l, 'Diplôme d’État d’ambulancier (DEA)', 'State ambulance diploma (DEA)'), `${num(dea, l, 1)} ${T(l, 'semaines', 'weeks')}`],
      rows: [[T(l, 'Auxiliaire ambulancier', 'Ambulance assistant'), `${num(aux, l, 1)} ${T(l, 'semaines', 'weeks')}`], [T(l, 'Heures du DEA', 'DEA hours'), `${A.dea_heures} h`], [T(l, 'Heures de la formation d’auxiliaire', 'Assistant course hours'), `${A.auxiliaire_heures} h`]] as [string, string][],
      note: T(l, `Le DEA compte ${A.dea_semaines_stage} semaines de stage de 35 heures ; sélection préalable sur dossier et entretien.`, `The DEA includes ${A.dea_semaines_stage} weeks of 35-hour placements; selection beforehand on file and interview.`) };
  },
});
