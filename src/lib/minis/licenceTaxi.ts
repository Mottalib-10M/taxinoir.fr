import { achatOuLocation } from '../engine/acces';
import { P } from '../engine/params';
import { T, eur, num, pct, type L } from './_kit';
export default (l: L) => ({
  title: T(l, 'Licence de taxi : acheter à crédit ou louer ?', 'Taxi licence: buy on credit or rent?'),
  cta: T(l, 'Revenu net avec cette charge', 'Net income with this cost'),
  inputs: [
    { id: 'p', label: T(l, 'Prix de la licence', 'Licence price'), def: P.taxi.ads_prix_paris_environ, unit: '€', max: 2000000 },
    { id: 'ap', label: T(l, 'Apport', 'Deposit'), def: 40000, unit: '€', max: 2000000 },
    { id: 't', label: T(l, 'Taux du prêt (votre offre)', 'Loan rate (your offer)'), def: 4.5, unit: '%', max: 20, decimals: 2 },
    { id: 'lo', label: T(l, 'Loyer mensuel d’une licence louée', 'Monthly rent of a leased licence'), def: P.taxi.ads_loyer_paris_mois_environ, unit: '€', max: 20000 },
  ],
  run: ({ p, ap, t, lo }: Record<string, number>) => {
    const r = achatOuLocation({ prix: p, apport: ap, taux: t / 100, annees: 10, loyer: lo });
    return { head: [T(l, 'Mensualité sur 10 ans', 'Monthly repayment over 10 years'), eur(r.mensualite, l)],
      rows: [[T(l, 'Écart avec le loyer, par mois', 'Gap with the rent, per month'), eur(r.ecartMensuel, l)], [T(l, 'Intérêts sur la durée', 'Interest over the term'), eur(r.interets, l)], [T(l, 'Années de loyer égales au prix', 'Years of rent equal to the price'), num(r.anneesLoyer, l, 1)]] as [string, string][],
      note: T(l, `Prix et loyer par défaut : ordres de grandeur parisiens publiés par service-public. Taux de ${pct(t / 100, l, 2)} : remplacez-le par votre offre.`, `Default price and rent: Paris orders of magnitude published by service-public. ${pct(t / 100, l, 2)} rate: replace it with your own offer.`) };
  },
});
