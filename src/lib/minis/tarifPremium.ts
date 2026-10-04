import { microCotisations } from '../engine/cotisations';
import { P } from '../engine/params';
import { T, eur, type L } from './_kit';
/** Tarif horaire à facturer pour un revenu visé : charges + net, cotisations micro (Urssaf) et TVA à 10 % (CGI 279 b quater). */
export default (l: L) => ({
  title: T(l, 'Votre tarif horaire cible en chauffeur privé', 'Your target hourly rate as a private chauffeur'),
  cta: T(l, 'Simulateur complet du revenu net', 'Full net income calculator'),
  inputs: [
    { id: 'n', label: T(l, 'Revenu net visé par mois', 'Target net income per month'), def: 3000, unit: '€', max: 50000 },
    { id: 'h', label: T(l, 'Heures facturées par mois', 'Billed hours per month'), def: 100, unit: 'h', max: 400 },
    { id: 'c', label: T(l, 'Frais fixes et variables par mois', 'Fixed and running costs per month'), def: 2200, unit: '€', max: 50000 },
    { id: 't', label: T(l, 'TVA', 'VAT'), def: 0, options: [{ value: '0', label: T(l, 'franchise (pas de TVA)', 'exempt (no VAT)') }, { value: '1', label: T(l, 'TVA collectée', 'VAT charged') }] },
  ],
  run: ({ n, h, c, t }: Record<string, number>) => {
    const unit = microCotisations(1);
    const caHtMois = (Math.max(0, n) + Math.max(0, c)) / (1 - unit.total);
    const ht = h > 0 ? caHtMois / h : 0;
    const ttc = t === 1 ? ht * (1 + P.tva.taux_transport) : ht;
    return { head: [T(l, 'Tarif horaire à facturer au client', 'Hourly rate to bill the client'), eur(ttc, l, 2)],
      rows: [[T(l, 'Chiffre d’affaires hors TVA à atteindre par mois', 'Monthly turnover to reach, excl. VAT'), eur(caHtMois, l)],
        [T(l, 'Cotisations micro comprises', 'Micro contributions included'), eur(caHtMois * unit.total, l)],
        [T(l, 'Tarif horaire hors TVA', 'Hourly rate excl. VAT'), eur(ht, l, 2)]] as [string, string][],
      note: T(l, 'Micro-entreprise, hors impôt sur le revenu. Les heures facturées excluent l’attente non payée et les trajets à vide.', 'Micro-enterprise, before income tax. Billed hours exclude unpaid waiting and empty runs.') };
  },
});
