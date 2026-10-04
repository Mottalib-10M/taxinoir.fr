import { artisanMicroOuReel } from '../engine/exploitation';
import { T, eur, type L } from './_kit';
export default (l: L) => ({
  title: T(l, 'Artisan taxi : micro-entreprise ou réel ?', 'Owner-driver taxi: micro-enterprise or real profit?'),
  cta: T(l, 'Comparer TVA et régimes', 'Compare VAT and regimes'),
  inputs: [
    { id: 'r', label: T(l, 'Recettes annuelles au compteur', 'Annual meter takings'), def: 65000, unit: '€', max: 500000 },
    { id: 'f', label: T(l, 'Frais annuels (véhicule, carburant, assurance, crédit de licence…)', 'Annual costs (car, fuel, insurance, licence loan…)'), def: 32000, unit: '€', max: 500000 },
  ],
  run: ({ r, f }: Record<string, number>) => {
    const x = artisanMicroOuReel({ recettesAn: r, fraisAn: f });
    return { head: [T(l, 'Régime le plus favorable ici', 'Better regime here'), x.meilleur === 'micro' ? T(l, 'micro-entreprise', 'micro-enterprise') : T(l, 'réel', 'real profit')],
      rows: [[T(l, 'Net mensuel en micro-entreprise', 'Monthly net, micro-enterprise'), eur(x.micro.netMensuel, l)], [T(l, 'Net mensuel au réel', 'Monthly net, real profit'), eur(x.reel.netMensuel, l)], [T(l, 'Seuil de la micro-entreprise 2026', '2026 micro-enterprise ceiling'), eur(x.seuilMicro, l)]] as [string, string][],
      note: x.depasseSeuil ? T(l, 'Vos recettes dépassent le seuil de la micro-entreprise : vérifiez sur service-public les conditions de sortie du régime.', 'Your takings exceed the micro-enterprise ceiling: check the rules for leaving the scheme on service-public.') : T(l, 'Net avant impôt sur le revenu. Frais : vos chiffres, payés quel que soit le régime ; seules les cotisations changent.', 'Net before income tax. Costs: your figures, paid whatever the regime; only contributions change.') };
  },
});
