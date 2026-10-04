import { coutAssurance } from '../engine/vehicule';
import { P } from '../engine/params';
import { T, eur, num, type L } from './_kit';
export default (l: L) => ({
  title: T(l, 'Ce que vos deux assurances pèsent par heure de travail', 'What your two insurance policies cost per working hour'),
  cta: T(l, 'Revenu net avec cette assurance', 'Net income with this insurance'),
  inputs: [
    { id: 'v', label: T(l, 'Assurance du véhicule, transport à titre onéreux (devis annuel)', 'Vehicle cover for paid passengers (annual quote)'), def: 2400, unit: '€', max: 20000 },
    { id: 'p', label: T(l, 'Responsabilité civile professionnelle (devis annuel)', 'Professional liability (annual quote)'), def: 400, unit: '€', max: 10000 },
    { id: 'h', label: T(l, 'Heures de travail par semaine', 'Working hours per week'), def: 45, unit: 'h', max: 100 },
  ],
  run: ({ v, p, h }: Record<string, number>) => {
    const r = coutAssurance({ primeVehiculeAn: v, primeProAn: p, heuresSemaine: h, semaines: 46 });
    return { head: [T(l, 'Assurances par mois', 'Insurance per month'), eur(r.mensuel, l)],
      rows: [[T(l, 'Par heure travaillée (46 semaines)', 'Per working hour (46 weeks)'), eur(r.parHeure, l, 2)], [T(l, 'Par an, les deux contrats', 'Per year, both policies'), eur(r.annuel, l)], [T(l, 'Mois de primes égaux à l’amende sans assurance', 'Months of premiums equal to the uninsured fine'), num(r.moisEgalAmende, l, 1)]] as [string, string][],
      note: T(l, `Primes : vos devis, aucun barème public ne les fixe. Amende encourue sans assurance : jusqu’à ${eur(P.acces.amende_sans_assurance, l)} (service-public).`, `Premiums: your own quotes, no public scale sets them. Fine for driving uninsured: up to ${eur(P.acces.amende_sans_assurance, l)} (service-public).`) };
  },
});
