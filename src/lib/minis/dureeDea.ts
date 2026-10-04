import { P } from '../engine/params';
import { T, num, eur, type L } from './_kit';
export default (l: L) => ({
  title: T(l, 'Formation d’ambulancier : durée et coût horaire', 'Ambulance training: length and hourly cost'),
  cta: T(l, 'Salaire d’ambulancier', 'Ambulance worker pay'),
  inputs: [
    { id: 'h', label: T(l, 'Heures de cours par semaine', 'Teaching hours per week'), def: 35, unit: 'h', max: 60 },
    { id: 'd', label: T(l, 'Devis de l’institut', 'Training institute quote'), def: 0, unit: '€', max: 50000 },
    { id: 'f', label: T(l, 'Financement obtenu (CPF, région, employeur…)', 'Funding secured (CPF, region, employer…)'), def: 0, unit: '€', max: 50000 },
  ],
  run: ({ h, d, f }: Record<string, number>) => {
    const A = P.ambulancier;
    const sem = h > 0 ? A.dea_heures_institut / h + A.dea_semaines_stage : 0;
    return { head: [T(l, 'Durée du DEA en continu', 'DEA length, full time'), `${num(sem, l, 1)} ${T(l, 'semaines', 'weeks')}`],
      rows: [[T(l, 'Heures en institut + stages', 'Hours in the institute + placements'), `${A.dea_heures_institut} + ${A.dea_heures_stage} h`], [T(l, 'Reste à votre charge', 'Left for you to pay'), eur(Math.max(0, d - f), l)], [T(l, 'Coût par heure de formation', 'Cost per training hour'), eur(d > 0 ? d / A.dea_heures : 0, l, 2)]] as [string, string][] };
  },
});
