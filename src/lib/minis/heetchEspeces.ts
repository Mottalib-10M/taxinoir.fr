import { soldeEspeces } from '../engine/exploitation';
import { T, eur, type L } from './_kit';
export default (l: L) => ({
  title: T(l, 'Courses en espèces : votre solde de la semaine', 'Cash rides: your balance for the week'),
  cta: T(l, 'Simulateur complet du revenu net', 'Full net income calculator'),
  inputs: [
    { id: 'n', label: T(l, 'Courses par semaine', 'Rides per week'), def: 60, max: 400 },
    { id: 'p', label: T(l, 'Prix moyen d’une course', 'Average fare'), def: 18, unit: '€', max: 500, decimals: 2 },
    { id: 'e', label: T(l, 'Part payée en espèces', 'Share paid in cash'), def: 40, unit: '%', max: 100 },
    { id: 'c', label: T(l, 'Commission (votre hypothèse)', 'Commission (your assumption)'), def: 20, unit: '%', max: 60, decimals: 1 },
  ],
  run: ({ n, p, e, c }: Record<string, number>) => {
    const x = soldeEspeces({ coursesSemaine: n, prixMoyen: p, partEspeces: e / 100, commission: c / 100 });
    return { head: [x.enDette ? T(l, 'Solde négatif (dette) de la semaine', 'Negative balance (debt) for the week') : T(l, 'Solde à recevoir pour la semaine', 'Balance due to you for the week'), eur(Math.abs(x.solde), l)],
      rows: [[T(l, 'Espèces encaissées dans la voiture', 'Cash collected in the car'), eur(x.especes, l)], [T(l, 'Commission due sur ces espèces', 'Commission owed on that cash'), eur(x.commissionEspeces, l)], [T(l, 'Courses par carte, après commission', 'Card rides, after commission'), eur(x.creditCarte, l)]] as [string, string][],
      note: x.depasseSeuil ? T(l, `Heetch indique qu’une dette de plus de ${eur(x.seuilSuspension, l)} non réglée après deux semaines peut suspendre le compte.`, `Heetch states that a debt above ${eur(x.seuilSuspension, l)} left unpaid for two weeks may lead to a temporary suspension.`) : T(l, 'Mécanisme décrit par le centre d’aide de Heetch ; commission : votre hypothèse.', 'Mechanism as described in Heetch’s help centre; commission: your assumption.') };
  },
});
