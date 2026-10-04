import { P } from '../engine/params';
import { T, num, type L } from './_kit';
/** Qui peut tenir le volant : R6312-10 du code de la santé publique (équipages, version du 16 août 2026)
 *  et article 2 de l'arrêté du 11 avril 2022 (l'auxiliaire conduit le VSL et l'ambulance). */
export default (l: L) => ({
  title: T(l, 'VSL ou ambulance : pouvez-vous rouler seul ?', 'VSL or ambulance: can you drive on your own?'),
  cta: T(l, 'Devenir ambulancier', 'Becoming an ambulance worker'),
  inputs: [
    { id: 'v', label: T(l, 'Véhicule', 'Vehicle'), def: 1, options: [{ value: '1', label: T(l, 'VSL (catégorie D)', 'VSL (category D)') }, { value: '2', label: T(l, 'Ambulance (catégorie C)', 'Ambulance (category C)') }] },
    { id: 'q', label: T(l, 'Votre qualification', 'Your qualification'), def: 2, options: [{ value: '1', label: T(l, 'Diplôme d’État d’ambulancier', 'State ambulance diploma (DEA)') }, { value: '2', label: T(l, 'Auxiliaire ambulancier', 'Ambulance assistant (auxiliaire)') }, { value: '3', label: T(l, 'Aucune pour l’instant', 'None yet') }] },
    { id: 'h', label: T(l, 'Heures de formation d’auxiliaire déjà suivies', 'Assistant course hours already done'), def: 0, unit: 'h', max: P.ambulancier.auxiliaire_heures },
  ],
  run: ({ v, q, h }: Record<string, number>) => {
    const V = P.vsl, vsl = v !== 2, qualifie = q === 1 || q === 2;
    const reste = q === 3 ? Math.max(0, P.ambulancier.auxiliaire_heures - Math.max(0, h)) : 0;
    const verdict = vsl
      ? (qualifie ? T(l, 'Oui, seul au volant', 'Yes, on your own') : T(l, 'Non, pas encore', 'Not yet'))
      : (q === 1 ? T(l, 'Oui, avec un équipier', 'Yes, with a crewmate') : q === 2 ? T(l, 'Oui, avec un diplômé d’État', 'Yes, alongside a DEA holder') : T(l, 'Non, pas encore', 'Not yet'));
    return { head: [T(l, 'Vous pouvez conduire ce véhicule', 'You may drive this vehicle'), verdict],
      rows: [[T(l, 'Équipage minimal du véhicule', 'Minimum crew for the vehicle'), `${vsl ? V.equipage_vsl : V.equipage_ambulance} ${T(l, vsl ? 'personne' : 'personnes', vsl ? 'person' : 'people')}`],
        [T(l, 'Diplômé d’État exigé à bord', 'DEA holder required on board'), vsl ? T(l, 'non', 'no') : T(l, 'oui, au moins un', 'yes, at least one')],
        [T(l, 'Heures restantes pour devenir auxiliaire', 'Hours left to qualify as an assistant'), `${num(reste, l)} h`]] as [string, string][],
      note: T(l, 'Il faut aussi le permis B, l’attestation préfectorale de conduite d’ambulance et l’AFGSU de niveau 2.', 'You also need a B licence, the prefecture’s ambulance driving certificate and first-aid level 2 (AFGSU 2).') };
  },
});
