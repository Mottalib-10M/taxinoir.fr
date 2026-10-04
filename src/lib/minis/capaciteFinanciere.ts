import { P } from '../engine/params';
import { T, eur, num, type L } from './_kit';
/** Capacité financière d'un transporteur public routier de personnes (code des transports, R3113-31 et R3113-32). */
export default (l: L) => ({
  title: T(l, 'Capacité financière à justifier au registre', 'Financial standing to prove for the register'),
  cta: T(l, 'Coût d’accès au métier', 'Cost of getting started'),
  inputs: [
    { id: 'lg', label: T(l, `Véhicules de ${P.transport_personnes.leger_places_conducteur_inclus} places au plus, conducteur compris`, `Vehicles with ${P.transport_personnes.leger_places_conducteur_inclus} seats or fewer, driver included`), def: 2, max: 500 },
    { id: 'car', label: T(l, 'Autocars ou autobus', 'Coaches or buses'), def: 0, max: 500 },
  ],
  run: ({ lg, car }: Record<string, number>) => {
    const X = P.transport_personnes, n = Math.max(0, Math.round(lg)), c = Math.max(0, Math.round(car));
    const total = n * X.capfin_leger_par_vehicule + (c > 0 ? X.capfin_car_premier + (c - 1) * X.capfin_car_suivant : 0);
    return { head: [T(l, 'Capitaux et réserves exigés', 'Capital and reserves required'), eur(total, l)],
      rows: [[T(l, 'Part couverte au plus par une garantie bancaire', 'Share a bank guarantee may cover, at most'), eur(total * X.capfin_garantie_part_max, l)],
        [T(l, 'Fonds propres à montrer au minimum', 'Own funds to show, at least'), eur(total * (1 - X.capfin_garantie_part_max), l)],
        [T(l, 'Copies certifiées de la licence', 'Certified copies of the licence'), num(n + c, l)]] as [string, string][],
      note: T(l, `Barème : ${eur(X.capfin_leger_par_vehicule, l)} par véhicule léger, ${eur(X.capfin_car_premier, l)} pour le premier car, ${eur(X.capfin_car_suivant, l)} par car suivant.`, `Scale: ${eur(X.capfin_leger_par_vehicule, l)} per light vehicle, ${eur(X.capfin_car_premier, l)} for the first coach, ${eur(X.capfin_car_suivant, l)} for each further coach.`) };
  },
});
