import { revenuNet, DEFAULTS } from '../engine/revenu';
import { P } from '../engine/params';
import { T, eur, type L } from './_kit';
/** Coût du carburant par région (moyennes du flux officiel prix-carburants.gouv.fr, relevé du 4 octobre 2026)
 *  et effet sur le net du profil d'exemple du simulateur (moteur revenuNet). */
const R = P.carburant_regions.regions as Array<[string, string, number, number]>;
const idf = R.findIndex(([id]) => id === 'ile-de-france');
export default (l: L) => ({
  title: T(l, 'Votre carburant, région par région', 'Your fuel bill, region by region'),
  cta: T(l, 'Simulateur complet du revenu net', 'Full net income calculator'),
  inputs: [
    { id: 'r', label: T(l, 'Région', 'Region'), def: idf, options: R.map(([, nom], i) => ({ value: String(i), label: nom })) },
    { id: 'c', label: T(l, 'Carburant', 'Fuel'), def: 1, options: [{ value: '0', label: T(l, 'gazole', 'diesel') }, { value: '1', label: T(l, 'essence (E10)', 'petrol (E10)') }] },
    { id: 'km', label: T(l, 'Kilomètres par mois', 'Kilometres per month'), def: 4000, unit: 'km', max: 20000 },
    { id: 'conso', label: T(l, 'Consommation moyenne', 'Average consumption'), def: 5.5, unit: 'L/100', max: 20, decimals: 1 },
  ],
  run: ({ r, c, km, conso }: Record<string, number>) => {
    const k = Math.min(R.length - 1, Math.max(0, Math.round(r)));
    const prix = (i: number) => (c === 0 ? R[i][2] : R[i][3]);
    const litres = Math.max(0, km) * Math.max(0, conso) / 100;
    const cout = litres * prix(k);
    const min = Math.min(...R.map((_, i) => prix(i)));
    const d = DEFAULTS.vtc_plateforme;
    const net = revenuNet({ ...d, carburantMois: cout }).netMensuel;
    return { head: [T(l, 'Carburant par mois', 'Fuel per month'), eur(cout, l)],
      rows: [[T(l, 'Prix moyen relevé', 'Average price recorded'), `${eur(prix(k), l, 3)}/L`],
        [T(l, 'Surcoût face à la région la moins chère', 'Extra cost versus the cheapest region'), eur(litres * (prix(k) - min), l)],
        [T(l, 'Net estimé du profil d’exemple VTC', 'Estimated net for the example VTC profile'), eur(net, l)]] as [string, string][],
      note: T(l, `Moyennes des stations mises à jour du 1er au 4 octobre 2026. Profil d’exemple : ${d.coursesSemaine} courses à ${eur(d.prixMoyen, l)} par semaine, commission ${Math.round((d.commission ?? 0) * 100)} %, micro-entreprise.`, `Averages of stations updated from 1 to 4 October 2026. Example profile: ${d.coursesSemaine} rides at ${eur(d.prixMoyen, l)} a week, ${Math.round((d.commission ?? 0) * 100)}% commission, micro-enterprise.`) };
  },
});
