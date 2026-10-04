import { revenuNet, DEFAULTS } from '../engine/revenu';
import { P } from '../engine/params';
import { T, eur, type L } from './_kit';
export default (l: L) => ({
  title: T(l, 'Combien il vous reste en VTC de plateforme', 'What you keep as a platform VTC driver'),
  cta: T(l, 'Simulateur complet du revenu net', 'Full net income calculator'),
  inputs: [
    { id: 'ca', label: T(l, 'Courses facturées par semaine (prix client)', 'Fares billed per week (rider price)'), def: 1400, unit: '€', max: 20000 },
    { id: 'c', label: T(l, 'Commission de la plateforme (votre relevé)', 'Platform commission (your statement)'), def: 25, unit: '%', max: 60, decimals: 1 },
    { id: 'h', label: T(l, 'Heures connectées par semaine', 'Hours logged in per week'), def: 50, unit: 'h', max: 100 },
  ],
  run: ({ ca, c, h }: Record<string, number>) => {
    const d = DEFAULTS.vtc_plateforme;
    const r = revenuNet({ ...d, caAnnuel: ca * d.semaines, commission: c / 100, heuresSemaine: h });
    return { head: [T(l, 'Net estimé par mois, avant impôt', 'Estimated net per month, before income tax'), eur(r.netMensuel, l)],
      rows: [[T(l, 'Net par heure connectée', 'Net per hour logged in'), eur(r.netHoraire, l, 2)], [T(l, 'Commission par mois', 'Commission per month'), eur(r.commission / 12, l)], [T(l, 'TVA à reverser par mois', 'VAT to pay over per month'), eur(r.tva / 12, l)]] as [string, string][],
      note: T(l, `Frais de véhicule d’exemple (${eur((d.carburantMois + d.vehiculeMois + d.assuranceMois + d.entretienMois + d.autresMois), l)} par mois), micro-entreprise, ${d.semaines} semaines. Garantie des accords : ${eur(P.plateformes.revenu_min_course, l)} net par course au minimum.`, `Example vehicle costs (${eur((d.carburantMois + d.vehiculeMois + d.assuranceMois + d.entretienMois + d.autresMois), l)} a month), micro-enterprise, ${d.semaines} weeks. Agreements guarantee at least ${eur(P.plateformes.revenu_min_course, l)} net per ride.`) };
  },
});
