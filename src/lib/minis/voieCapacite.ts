import { P } from '../engine/params';
import { T, type L } from './_kit';
/** Attestation de capacité professionnelle en transport de personnes : laquelle, et par quelle voie
 *  (code des transports, R3113-35, R3113-36, R3113-39 à R3113-41). */
export default (l: L) => ({
  title: T(l, 'Capacité de transport : quelle attestation, par quelle voie ?', 'Transport competence: which certificate, which route?'),
  cta: T(l, 'Coût d’accès au métier', 'Cost of getting started'),
  inputs: [
    { id: 't', label: T(l, 'Votre flotte', 'Your fleet'), def: 1, options: [{ value: '1', label: T(l, `Uniquement des véhicules de ${P.transport_personnes.leger_places_conducteur_inclus} places au plus, conducteur compris`, `Only vehicles of ${P.transport_personnes.leger_places_conducteur_inclus} seats or fewer, driver included`) }, { value: '2', label: T(l, 'Au moins un autocar ou un autobus', 'At least one coach or bus') }] },
    { id: 'g', label: T(l, 'Années de gestion continue d’une entreprise de transport de personnes', 'Years running a passenger transport firm continuously'), def: 0, unit: T(l, 'ans', 'yrs'), max: 50, decimals: 1 },
    { id: 'c', label: T(l, 'Années écoulées depuis que vous avez cessé de la gérer', 'Years since you stopped running it'), def: 0, unit: T(l, 'ans', 'yrs'), max: 50, decimals: 1 },
  ],
  run: ({ t, g, c }: Record<string, number>) => {
    const X = P.transport_personnes, leger = t !== 2, gere = g > 0;
    const exp = leger && g >= X.cappro_experience_leger_ans && c <= X.cappro_interruption_max_ans;
    const voie = leger
      ? (exp ? T(l, 'expérience de gestion (R3113-40, 2°)', 'management experience (R3113-40, 2°)') : T(l, 'formation puis examen écrit, ou diplôme listé', 'course then written exam, or a listed diploma'))
      : T(l, 'examen écrit ou diplôme listé', 'written exam or a listed diploma');
    return { head: [T(l, 'Attestation à obtenir', 'Certificate to obtain'), leger ? T(l, `véhicules de ${X.leger_places_conducteur_inclus} places au plus`, `vehicles of ${X.leger_places_conducteur_inclus} seats or fewer`) : T(l, 'transport routier de personnes, tous véhicules', 'road passenger transport, all vehicles')],
      rows: [[T(l, 'Voie ouverte', 'Route open to you'), voie],
        [T(l, 'Stage d’actualisation possible', 'Refresher course may be required'), gere && c > X.cappro_actualisation_inactivite_ans ? T(l, `oui, plus de ${X.cappro_actualisation_inactivite_ans} ans sans gestion`, `yes, over ${X.cappro_actualisation_inactivite_ans} years without managing`) : T(l, 'non', 'no')],
        [T(l, 'Délivrée par', 'Issued by'), T(l, 'le préfet de région', 'the regional prefect')]] as [string, string][] };
  },
});
