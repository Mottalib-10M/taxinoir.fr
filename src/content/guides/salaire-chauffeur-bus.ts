import { defineGuide } from '../../lib/guide-types';
import { P } from '../../lib/engine/params';

// Valeurs lues dans params-2026.json, bloc `grille_trv` : avenant n° 120 du 27 novembre 2025 (ouvriers,
// transports routiers), étendu par arrêté du 7 avril 2026 ; nomenclature de l'accord du 16 juin 1961 ;
// avenant n° 115 du 23 mars 2022. Smic : bloc `ambulancier` (service-public F2300).
const G = P.grille_trv;
const SMIC = P.ambulancier.smic_horaire;
const coefs = G.taux as Array<[string, number]>;
const anc = G.anciennete as Array<[number, number]>;
const taux = (code: string) => coefs.find(([k]) => k === code)![1];
const maj = (ans: number) => anc.filter(([a]) => ans >= a).pop()![1];
const mois = (code: string, ans = 0) => taux(code) * G.heures_mois * (1 + maj(ans));
const fr2 = (n: number) => n.toFixed(2).replace('.', ',');
const ex = '140V';

export default defineGuide({
  id: 'salaire-chauffeur-bus',
  group: 'autres',
  order: 40,
  mini: 'salaireBus',
  miniHref: 'devenir-chauffeur-bus',
  related: ['devenir-chauffeur-bus', 'salaire-ambulancier', 'salaire-taxi', 'salaire-chauffeur-vtc', 'revenus-chauffeur-region'],
  sources: ['avenantTrv120', 'nomenclatureTrv', 'avenantTrv115', 'spSmic'],
  fr: {
    slug: 'salaire-chauffeur-bus',
    nav: 'Salaire chauffeur de bus',
    card: 'La grille conventionnelle 2026 des conducteurs de car, coefficient par coefficient, avec l’ancienneté.',
    title: 'Salaire chauffeur de bus 2026 : la grille des conducteurs',
    description: `Salaire chauffeur de bus en 2026 : de ${fr2(coefs[0][1])} à ${fr2(coefs[coefs.length - 1][1])} € brut de l’heure selon le coefficient, +${Math.round(maj(30) * 100)} % d’ancienneté à 30 ans, ${fr2(G.dimanche)} € par dimanche travaillé.`,
    h1: 'Salaire d’un chauffeur de bus ou de car : la grille 2026',
    intro: 'Le salaire d’un conducteur de car part d’une grille de branche, puis grimpe avec le coefficient de l’emploi et l’ancienneté.',
    resume: `Le salaire minimal d’un chauffeur de car salarié est fixé par la convention collective des transports routiers. L’avenant n° 120 du 27 novembre 2025, étendu par arrêté du 7 avril 2026, s’applique depuis le 1er janvier 2026 : le taux horaire garanti va de ${fr2(coefs[0][1])} € brut pour les coefficients 110 V à 128 V à ${fr2(taux('155V'))} € au coefficient 155 V, celui du conducteur grand tourisme confirmé. Pour ${fr2(G.heures_mois)} heures par mois, un conducteur au coefficient 140 V, celui des conducteurs en période scolaire depuis septembre 2022, touche au moins ${fr2(mois(ex))} € brut à l’embauche. La grille ajoute une majoration d’ancienneté de ${Math.round(maj(1) * 100)} % après un an, ${Math.round(maj(5) * 100)} % après cinq ans, jusqu’à ${Math.round(maj(30) * 100)} % après trente ans, et une indemnité de ${fr2(G.dimanche)} € pour chaque dimanche ou jour férié travaillé, quel que soit le nombre d’heures. Tous ces taux dépassent le Smic de ${fr2(SMIC)} €. Les réseaux de bus urbains suivent une autre convention collective.`,
    faqs: [
      { q: 'Combien gagne un chauffeur de car qui débute ?', a: `Au minimum ${fr2(mois(ex))} € brut par mois pour ${fr2(G.heures_mois)} heures au coefficient 140 V, selon l’avenant n° 120 applicable depuis le 1er janvier 2026. Au coefficient 131 V, le minimum est de ${fr2(mois('131V'))} €. S’y ajoutent les indemnités de dimanche et de jour férié, les heures supplémentaires et les primes de l’entreprise. Le net dépend des cotisations salariales, non calculées ici.` },
      { q: 'Comment l’ancienneté augmente-t-elle le salaire d’un conducteur de car ?', a: `Par une majoration du salaire garanti : +${Math.round(maj(1) * 100)} % après un an, +${Math.round(maj(5) * 100)} % après cinq ans, +${Math.round(maj(10) * 100)} % après dix ans, +${Math.round(maj(15) * 100)} % après quinze ans, +${Math.round(maj(20) * 100)} % après vingt ans, +${Math.round(maj(25) * 100)} % après vingt-cinq ans et +${Math.round(maj(30) * 100)} % après trente ans. Au coefficient 140 V, le minimum passe ainsi de ${fr2(mois(ex))} € à ${fr2(mois(ex, 30))} € brut.` },
      { q: 'Combien rapporte un dimanche travaillé en transport de voyageurs ?', a: `${fr2(G.dimanche)} € depuis le 1er janvier 2026, quel que soit le nombre d’heures effectuées ce jour-là. Le même montant est versé pour un jour férié travaillé autre que le 1er mai, qui suit ses propres règles légales. Ces indemnités sont fixées par l’avenant n° 120 du 27 novembre 2025 et s’ajoutent au salaire mensuel garanti.` },
      { q: 'Quel coefficient pour un conducteur grand tourisme ?', a: `La nomenclature de la convention place le conducteur grand tourisme au coefficient 150 V, soit ${fr2(taux('150V'))} € brut de l’heure en 2026, et le grand tourisme confirmé au coefficient 155 V, ${fr2(taux('155V'))} € de l’heure. Ce dernier doit avoir conduit au moins huit ans, dont quatre au coefficient 150 V. Le conducteur de tourisme, avec au moins deux ans de pratique, est au coefficient 145 V.` },
      { q: 'La grille des cars s’applique-t-elle aux conducteurs de bus en ville ?', a: 'Pas forcément. La grille de cette page vient de la convention collective des transports routiers, qui couvre le transport interurbain, scolaire et touristique. Les réseaux de transport urbain de voyageurs relèvent de leur propre convention collective, avec d’autres coefficients et d’autres montants. Vérifiez la convention indiquée sur votre contrat ou votre bulletin de paie.' },
    ],
    body: (h) => `
<h2>La grille 2026, coefficient par coefficient</h2>
<p>L’${h.src('avenantTrv120', 'avenant n° 120 du 27 novembre 2025')} revalorise, à compter du 1er janvier 2026, les rémunérations conventionnelles des ouvriers de la convention collective des transports routiers, dont les conducteurs du transport de voyageurs. Il a été étendu par arrêté du ${h.date(G.extension)} : il s’impose donc à toutes les entreprises de la branche, adhérentes ou non à une organisation patronale.</p>
${h.table(['Coefficient', 'Taux horaire', `À l’embauche (${h.num(G.heures_mois, 2)} h)`, 'Après 5 ans', 'Après 10 ans'], coefs.map(([k, t]) => [k, h.eur(t, 4), h.eur(t * G.heures_mois, 2), h.eur(t * G.heures_mois * (1 + maj(5)), 2), h.eur(t * G.heures_mois * (1 + maj(10)), 2)]), 'Source : avenant n° 120 du 27 novembre 2025, barème des ouvriers, transport de voyageurs, applicable au 1er janvier 2026', ['l', 'r', 'r', 'r', 'r'])}
<p>Les coefficients 110 V à 128 V partagent le même taux, ${h.eur(coefs[0][1], 4)}. Tous les taux de la grille sont supérieurs au Smic horaire 2026, ${h.eur(SMIC, 2)} selon ${h.src('spSmic', 'service-public')} : contrairement à la grille des ambulanciers, ce sont bien les montants conventionnels qui s’appliquent.</p>

<h2>Quel coefficient pour quel emploi</h2>
<p>La ${h.src('nomenclatureTrv', 'nomenclature des emplois')} de l’accord du 16 juin 1961 décrit le personnel roulant voyageurs. Elle range les emplois de conducteur en plusieurs niveaux, du conducteur de car qui conduit et aide au chargement des bagages jusqu’au grand tourisme confirmé. Les coefficients que nous avons lus dans le texte sont les suivants :</p>
<ul>
<li>conducteur affecté aux services librement organisés, pour au moins la moitié de son temps de travail effectif : 142 V ;</li>
<li>conducteur de tourisme, après au moins deux ans de pratique : 145 V ;</li>
<li>conducteur grand tourisme, habituellement affecté aux circuits de longue durée : 150 V ;</li>
<li>conducteur grand tourisme confirmé, avec au moins huit ans de conduite dont quatre au coefficient 150 V : 155 V.</li>
</ul>
<p>Pour les conducteurs en période scolaire, l’${h.src('avenantTrv115', 'avenant n° 115 du 23 mars 2022')} a remplacé le coefficient 137 V par le coefficient 140 V à compter du 1er septembre 2022, sauf pour les services dédiés aux personnes handicapées ou à mobilité réduite. Le conducteur de car et le conducteur-receveur, qui perçoit aussi les recettes, figurent dans la nomenclature ; leur coefficient exact doit apparaître sur votre contrat. Nous ne le devinons pas.</p>
<p>Le barème prévoit aussi une majoration de ${h.pct(G.majoration_mecanicien_encaisseur, 0)} pour les ouvriers qui ont une qualification de mécanicien ou d’encaisseur.</p>

<h2>L’ancienneté : jusqu’à vingt pour cent</h2>
${h.table(['Ancienneté', 'Majoration', `Au coefficient ${ex}`], anc.map(([a, m]) => [a === 0 ? 'à l’embauche' : `après ${a} an${a > 1 ? 's' : ''}`, `+${h.pct(m, 0)}`, h.eur(mois(ex, a), 2)]), 'Source : avenant n° 120, colonnes d’ancienneté du barème ; calcul taxinoir.fr')}
<p>La majoration porte sur le salaire mensuel garanti, pas sur les indemnités. L’ancienneté s’apprécie dans l’entreprise : un conducteur qui change d’employeur peut repartir de la colonne d’embauche, sauf clause plus favorable de son nouveau contrat.</p>

<h2>Dimanches, jours fériés et ce qui s’ajoute</h2>
<p>L’avenant fixe deux indemnités forfaitaires : ${h.eur(G.dimanche, 2)} pour un dimanche travaillé et ${h.eur(G.ferie, 2)} pour un jour férié travaillé autre que le 1er mai, quel que soit le nombre d’heures effectuées. Un conducteur scolaire travaille rarement le dimanche ; un conducteur de tourisme beaucoup plus souvent, et l’écart se voit sur la fiche de paie.</p>
<p>Le salaire réel dépasse souvent le minimum par d’autres lignes que la grille ne couvre pas : heures supplémentaires et leurs majorations, amplitude des journées, frais de déplacement et repas, primes propres à l’entreprise. Le mini-simulateur en haut de page s’en tient au minimum conventionnel : coefficient, ancienneté et dimanches.</p>

<h2>Du brut au net</h2>
<p>Les montants de la grille sont bruts. Le net à payer dépend des cotisations salariales, de la complémentaire santé de l’entreprise et du prélèvement à la source de l’impôt sur le revenu. Le site ne recalcule pas ce net : votre bulletin de paie fait foi. Comparez surtout trois lignes : le coefficient, le taux horaire de base et les indemnités de dimanche.</p>

<h2>Salarié sur la route ou chauffeur à son compte</h2>
<p>Le conducteur de car est salarié, avec une grille, des congés payés et une protection sociale complète. Le chauffeur de taxi ou de VTC est le plus souvent indépendant : son revenu dépend de ses courses, de ses frais et de son statut. Les deux ne se comparent pas ligne à ligne, mais les pages ${h.a('salaire-taxi', 'salaire d’un chauffeur de taxi')} et ${h.a('salaire-chauffeur-vtc', 'salaire d’un chauffeur VTC')} donnent les ordres de grandeur côté indépendant, calculés par le simulateur. Côté transport sanitaire, la page ${h.a('salaire-ambulancier', 'salaire d’un ambulancier')} montre une grille qui, elle, est passée sous le Smic. Pour l’accès au métier de conducteur de car, voir ${h.a('devenir-chauffeur-bus', 'devenir chauffeur de bus')}.</p>
`,
  },
  en: {
    slug: 'bus-driver-salary',
    nav: 'Bus driver pay',
    card: 'The 2026 collective-agreement pay scale for coach drivers, coefficient by coefficient, with seniority.',
    title: 'Bus Driver Salary France 2026: the Coach Driver Pay Scale',
    description: `Bus driver salary in France, 2026: €${coefs[0][1].toFixed(2)} to €${taux('155V').toFixed(2)} gross an hour by coefficient, +${Math.round(maj(30) * 100)}% for 30 years’ seniority, €${G.dimanche.toFixed(2)} for each Sunday or bank holiday worked.`,
    h1: 'What bus and coach drivers are paid in France',
    intro: 'A French coach driver’s pay starts from a sector-wide scale, then rises with the job’s coefficient and years of service.',
    resume: `Minimum pay for an employed coach driver in France is set by the road transport collective agreement. Amendment no. 120 of 27 November 2025, extended to the whole sector by an order of 7 April 2026, has applied since 1 January 2026. The guaranteed hourly rate runs from €${coefs[0][1].toFixed(2)} gross for coefficients 110 V to 128 V up to €${taux('155V').toFixed(2)} at coefficient 155 V, the senior long-distance touring driver. For ${G.heures_mois} hours a month, a driver at coefficient 140 V, the level of school-period drivers since September 2022, earns at least €${mois(ex).toFixed(2)} gross at hiring. The scale adds a seniority increase of ${Math.round(maj(1) * 100)}% after one year and ${Math.round(maj(5) * 100)}% after five, up to ${Math.round(maj(30) * 100)}% after thirty, plus an allowance of €${G.dimanche.toFixed(2)} for each Sunday or bank holiday worked, however many hours. Every rate is above the €${SMIC.toFixed(2)} hourly Smic (minimum wage). City bus networks follow a different collective agreement.`,
    faqs: [
      { q: 'What does a newly hired coach driver earn in France?', a: `At least €${mois(ex).toFixed(2)} gross a month for ${G.heures_mois} hours at coefficient 140 V, under amendment no. 120 in force since 1 January 2026. At coefficient 131 V the minimum is €${mois('131V').toFixed(2)}. Sunday and bank holiday allowances, overtime and company bonuses come on top. Take-home pay depends on employee contributions, which this page does not calculate.` },
      { q: 'How much does seniority add to a coach driver’s pay?', a: `The guaranteed salary rises by ${Math.round(maj(1) * 100)}% after one year, ${Math.round(maj(5) * 100)}% after five, ${Math.round(maj(10) * 100)}% after ten, ${Math.round(maj(15) * 100)}% after fifteen, ${Math.round(maj(20) * 100)}% after twenty, ${Math.round(maj(25) * 100)}% after twenty-five and ${Math.round(maj(30) * 100)}% after thirty years with the employer. At coefficient 140 V, the minimum goes from €${mois(ex).toFixed(2)} to €${mois(ex, 30).toFixed(2)} gross.` },
      { q: 'Is Sunday work paid extra for coach drivers?', a: `Yes: €${G.dimanche.toFixed(2)} since 1 January 2026, however many hours you work that day. The same amount is paid for a bank holiday worked, other than 1 May, which has its own legal rules. Both allowances are set by amendment no. 120 of 27 November 2025 and come on top of the guaranteed monthly salary.` },
      { q: 'Which coefficient applies to long-distance touring drivers?', a: `The agreement’s job classification puts the long-distance touring driver at coefficient 150 V, €${taux('150V').toFixed(2)} gross an hour in 2026, and the senior touring driver at 155 V, €${taux('155V').toFixed(2)} an hour. The senior grade requires at least eight years of driving, four of them at 150 V. A tourism driver, with at least two years’ experience, is at 145 V.` },
      { q: 'Does this pay scale cover city bus drivers?', a: 'Not necessarily. The scale on this page comes from the road transport collective agreement, which covers intercity, school and tourist coach work. Urban public transport networks have their own collective agreement, with different coefficients and amounts. Check which agreement is named on your contract or payslip before comparing figures.' },
    ],
    body: (h) => `
<h2>The 2026 scale, coefficient by coefficient</h2>
<p>${h.src('avenantTrv120', 'Amendment no. 120 of 27 November 2025')} raises the minimum pay of manual staff under the road transport collective agreement, including passenger transport drivers, from 1 January 2026. It was extended by an order of ${h.date(G.extension)}, so it binds every firm in the sector, whether or not it belongs to an employers’ organisation. In France, a coefficient is the grade attached to your job in the agreement; it sets your minimum rate.</p>
${h.table(['Coefficient', 'Hourly rate', `At hiring (${h.num(G.heures_mois, 2)} h)`, 'After 5 years', 'After 10 years'], coefs.map(([k, t]) => [k, h.eur(t, 4), h.eur(t * G.heures_mois, 2), h.eur(t * G.heures_mois * (1 + maj(5)), 2), h.eur(t * G.heures_mois * (1 + maj(10)), 2)]), 'Source: amendment no. 120 of 27 November 2025, manual staff scale, passenger transport, from 1 January 2026', ['l', 'r', 'r', 'r', 'r'])}
<p>Coefficients 110 V to 128 V share one rate, ${h.eur(coefs[0][1], 4)}. Every rate on the scale is above the 2026 hourly Smic, ${h.eur(SMIC, 2)} according to ${h.src('spSmic', 'service-public')}, so unlike the ambulance scale, these agreed amounts are what actually apply.</p>

<h2>Which coefficient for which job</h2>
<p>The ${h.src('nomenclatureTrv', 'job classification')} in the agreement of 16 June 1961 describes passenger driving staff. It sorts driving jobs into several levels, from the coach driver who drives and helps load luggage up to the senior touring driver. The coefficients we read in the text are:</p>
<ul>
<li>driver assigned to commercial intercity coach services for at least half of their working time: 142 V;</li>
<li>tourism driver, with at least two years’ experience: 145 V;</li>
<li>long-distance touring driver, usually on multi-day tours: 150 V;</li>
<li>senior touring driver, with at least eight years of driving including four at 150 V: 155 V.</li>
</ul>
<p>For school-period drivers, ${h.src('avenantTrv115', 'amendment no. 115 of 23 March 2022')} replaced coefficient 137 V with 140 V from 1 September 2022, except on services dedicated to disabled or reduced-mobility passengers. Coach drivers and driver-conductors, who also collect fares, are listed in the classification; your exact coefficient must appear on your contract, and we do not guess it.</p>
<p>The scale also provides a ${h.pct(G.majoration_mecanicien_encaisseur, 0)} increase for staff with a mechanic’s or cashier’s qualification.</p>

<h2>Seniority: up to twenty per cent</h2>
${h.table(['Years with the employer', 'Increase', `At coefficient ${ex}`], anc.map(([a, m]) => [a === 0 ? 'at hiring' : `after ${a} year${a > 1 ? 's' : ''}`, `+${h.pct(m, 0)}`, h.eur(mois(ex, a), 2)]), 'Source: amendment no. 120, seniority columns of the scale; calculation by taxinoir.fr')}
<p>The increase applies to the guaranteed monthly salary, not to the allowances. Seniority counts within the company: a driver who changes employer may start again in the hiring column unless the new contract says otherwise.</p>

<h2>Sundays, bank holidays and extras</h2>
<p>The amendment sets two flat allowances: ${h.eur(G.dimanche, 2)} for a Sunday worked and ${h.eur(G.ferie, 2)} for a bank holiday worked other than 1 May, whatever the number of hours. A school-run driver rarely works Sundays; a tourism driver does so far more often, and it shows on the payslip.</p>
<p>Actual pay often goes beyond the minimum through items the scale does not cover: overtime and its premiums, long working days, travel and meal expenses, company bonuses. The calculator at the top of the page sticks to the agreed minimum: coefficient, seniority and Sundays.</p>

<h2>From gross to net</h2>
<p>Scale amounts are gross. Net pay depends on employee contributions, the company health plan and income tax withheld at source. We do not work out the net figure here; your payslip is the reference. Check three lines above all: the coefficient, the basic hourly rate and the Sunday allowances.</p>

<h2>Employed on the road or self-employed</h2>
<p>A coach driver is an employee, with a pay scale, paid holidays and full social cover. A taxi or VTC driver is usually self-employed, and income depends on fares, costs and business structure. The two do not compare line by line, but the ${h.a('salaire-taxi', 'taxi driver pay')} and ${h.a('salaire-chauffeur-vtc', 'VTC driver earnings')} pages give self-employed figures worked out by the calculator. In patient transport, the ${h.a('salaire-ambulancier', 'ambulance pay')} page shows a scale that has fallen below the Smic. To get into coach driving, see ${h.a('devenir-chauffeur-bus', 'becoming a bus driver')}.</p>
`,
  },
});
