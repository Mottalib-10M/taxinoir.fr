import { P } from '../engine/params';
import { T, num, type L } from './_kit';
const B = P.examen.pratique_bareme_taxi;
export default (l: L) => ({
  title: T(l, 'Épreuve pratique taxi : votre note sur 20', 'Taxi practical test: your mark out of 20'),
  cta: T(l, 'Coût d’accès au métier', 'Cost of getting started'),
  inputs: [
    { id: 'a', label: T(l, `Préparation du parcours (sur ${B.parcours})`, `Route preparation (out of ${B.parcours})`), def: 1.5, max: B.parcours, decimals: 1 },
    { id: 'b', label: T(l, `Conduite et code de la route (sur ${B.conduite})`, `Driving and Highway Code (out of ${B.conduite})`), def: 6, max: B.conduite, decimals: 1 },
    { id: 'c', label: T(l, `Accueil et informations au client (sur ${B.client})`, `Customer care and local information (out of ${B.client})`), def: 3, max: B.client, decimals: 1 },
    { id: 'd', label: T(l, `Facturation et équipements (sur ${B.facturation})`, `Billing and equipment (out of ${B.facturation})`), def: 2, max: B.facturation, decimals: 1 },
  ],
  run: ({ a, b, c, d }: Record<string, number>) => {
    const n = Math.min(a, B.parcours) + Math.min(b, B.conduite) + Math.min(c, B.client) + Math.min(d, B.facturation);
    return { head: [T(l, 'Note de l’épreuve pratique', 'Practical test mark'), `${num(n, l, 1)} /20`],
      rows: [[T(l, 'Résultat', 'Outcome'), n >= P.examen.pratique_admis ? T(l, 'reçu', 'pass') : T(l, 'ajourné', 'fail')], [T(l, 'Note minimale', 'Pass mark'), `${P.examen.pratique_admis} /20`], [T(l, 'Points manquants', 'Points missing'), num(Math.max(0, P.examen.pratique_admis - n), l, 1)]] as [string, string][] };
  },
});
