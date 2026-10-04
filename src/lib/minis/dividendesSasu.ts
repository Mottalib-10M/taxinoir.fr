import { P } from '../engine/params';
import { T, eur, pct, type L } from './_kit';
/** Bénéfice d'une SASU distribué en dividendes : impôt sur les sociétés à 15 % puis 25 %, prélèvement
 *  forfaitaire unique (service-public F36215, vérifié le 21 février 2026). Sans rémunération du président. */
export default (l: L) => ({
  title: T(l, 'SASU : ce qui reste d’un bénéfice versé en dividendes', 'SASU: what is left of a profit paid out as dividends'),
  cta: T(l, 'Revenu net en micro ou au réel', 'Net income as micro or real regime'),
  inputs: [
    { id: 'b', label: T(l, 'Bénéfice de l’exercice avant impôt', 'Profit for the year before tax'), def: 30000, unit: '€', max: 2000000 },
  ],
  run: ({ b }: Record<string, number>) => {
    const S = P.societe, x = Math.max(0, b);
    const is = Math.min(x, S.is_reduit_plafond) * S.is_reduit + Math.max(0, x - S.is_reduit_plafond) * S.is_normal;
    const div = x - is, pfu = div * S.pfu_dividendes, net = div - pfu;
    return { head: [T(l, 'Dividende net après impôts', 'Net dividend after tax'), eur(net, l)],
      rows: [[T(l, 'Impôt sur les sociétés', 'Corporation tax'), eur(is, l)],
        [T(l, `Prélèvement forfaitaire de ${pct(S.pfu_dividendes, l)}`, `${pct(S.pfu_dividendes, l)} flat-rate levy`), eur(pfu, l)],
        [T(l, 'Part du bénéfice qui vous revient', 'Share of the profit you keep'), pct(x > 0 ? net / x : 0, l)]] as [string, string][],
      note: T(l, 'Sans salaire du président : aucune cotisation, donc ni retraite ni indemnités journalières. Le salaire n’est pas simulé ici.', 'With no salary for the president: no contributions, so no pension rights and no sick pay. Salary is not modelled here.') };
  },
});
