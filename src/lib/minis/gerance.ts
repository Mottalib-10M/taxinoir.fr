import { recettesPourNet } from '../engine/exploitation';
import { DEFAULTS } from '../engine/revenu';
import { P } from '../engine/params';
import { T, eur, pct, type L } from './_kit';
export default (l: L) => ({
  title: T(l, 'Locataire d’une licence : les recettes qu’il vous faut', 'Renting a licence: the takings you need'),
  cta: T(l, 'Simulateur complet du revenu net', 'Full net income calculator'),
  inputs: [
    { id: 'lo', label: T(l, 'Loyer mensuel de la licence (contrat)', 'Monthly licence rent (contract)'), def: P.taxi.ads_loyer_paris_mois_environ, unit: '€', max: 20000 },
    { id: 'n', label: T(l, 'Net mensuel que vous visez', 'Monthly net you are aiming for'), def: 2000, unit: '€', max: 20000 },
    { id: 's', label: T(l, 'Régime', 'Tax regime'), def: 1, options: [{ value: '1', label: T(l, 'Réel (loyer déductible)', 'Real profit (rent deductible)') }, { value: '0', label: T(l, 'Micro-entreprise', 'Micro-enterprise') }] },
  ],
  run: ({ lo, n, s }: Record<string, number>) => {
    const x = recettesPourNet({ loyerMois: lo, netCible: n, statut: s === 0 ? 'micro' : 'reel' });
    if (!Number.isFinite(x.semaine)) return { head: [T(l, 'Recettes nécessaires par semaine', 'Takings needed per week'), T(l, 'hors de portée', 'out of reach')], rows: [] as [string, string][] };
    return { head: [T(l, 'Recettes au compteur nécessaires par semaine', 'Meter takings needed per week'), eur(x.semaine, l)],
      rows: [[T(l, 'Dont loyer, par semaine travaillée', 'Of which rent, per working week'), eur(x.loyerParSemaine, l)], [T(l, 'Part du loyer dans les recettes', 'Rent as a share of takings'), pct(x.partLoyer, l, 0)], [T(l, 'Cotisations par mois à ce niveau', 'Contributions per month at that level'), eur(x.resultat.cotisations / 12, l)]] as [string, string][],
      note: T(l, `Loyer par défaut : ordre de grandeur parisien publié par service-public. Carburant, entretien et assurance : valeurs d’exemple du moteur, ${DEFAULTS.taxi.semaines} semaines travaillées.`, `Default rent: Paris order of magnitude published by service-public. Fuel, servicing and insurance: the engine’s example values, ${DEFAULTS.taxi.semaines} working weeks.`) };
  },
});
