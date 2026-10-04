import { P } from '../engine/params';
import { T, num, type L } from './_kit';
/** Licence délivrée à l'inscription au registre (R3113-8) et règle des services occasionnels en zone de
 *  plan de mobilité (L3112-1, II), selon les places passagers du véhicule (R311-1 du code de la route). */
export default (l: L) => ({
  title: T(l, 'Quelle licence pour votre véhicule ?', 'Which licence for your vehicle?'),
  cta: T(l, 'Coût d’accès au métier', 'Cost of getting started'),
  inputs: [
    { id: 'p', label: T(l, 'Places assises passagers, hors conducteur', 'Passenger seats, driver excluded'), def: 8, max: 90 },
    { id: 'n', label: T(l, 'Nombre de véhicules', 'Number of vehicles'), def: 1, max: 500 },
    { id: 'z', label: T(l, 'Service occasionnel dont le départ et l’arrivée sont dans une même zone de plan de mobilité', 'Occasional service starting and ending in the same mobility-plan area'), def: 0, options: [{ value: '0', label: T(l, 'non', 'no') }, { value: '1', label: T(l, 'oui', 'yes') }] },
  ],
  run: ({ p, n, z }: Record<string, number>) => {
    const X = P.transport_personnes, car = p > X.places_passagers_max_m1;
    return { head: [T(l, 'Licence délivrée par le préfet de région', 'Licence issued by the regional prefect'), car ? T(l, 'licence communautaire', 'Community licence') : T(l, 'licence de transport intérieur', 'domestic transport licence')],
      rows: [[T(l, 'Copies certifiées, une par véhicule', 'Certified copies, one per vehicle'), num(Math.max(0, Math.round(n)), l)],
        [T(l, 'Durée maximale, renouvelable', 'Maximum term, renewable'), `${X.licence_validite_max_ans} ${T(l, 'ans', 'years')}`],
        [T(l, 'Service occasionnel possible avec ce véhicule', 'Occasional service allowed with this vehicle'), (z === 1 && !car) ? T(l, `non : plus de ${X.places_passagers_max_m1} places passagers exigées`, `no: more than ${X.places_passagers_max_m1} passenger seats required`) : T(l, 'oui', 'yes')]] as [string, string][] };
  },
});
