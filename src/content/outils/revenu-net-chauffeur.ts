import { defineGuide } from '../../lib/guide-types';
import { P } from '../../lib/engine/params';

const M = P.micro, V = P.tva, T = P.tns, G = P.plateformes;

export default defineGuide({
  id: 'revenu-net-chauffeur',
  group: 'outils',
  order: 10,
  tool: 'revenu',
  related: ['salaire-chauffeur-vtc', 'salaire-taxi', 'tva-vtc-taxi', 'cout-acces-metier', 'licence-taxi', 'devenir-chauffeur-vtc'],
  sources: ['urssafAe', 'spCotisMicro', 'urssafTns', 'urssafReforme', 'spFranchiseTva', 'cgi279', 'arpeRevenuCourse'],
  fr: {
    slug: 'revenu-net-chauffeur',
    nav: 'Revenu net du chauffeur',
    card: 'Net mensuel et horaire d’un taxi ou d’un VTC, cotisations et TVA.',
    title: 'Revenu net chauffeur VTC et taxi 2026 : simulateur gratuit',
    description: `Revenu net 2026 d’un chauffeur VTC ou taxi : courses, commission, frais du véhicule, TVA à ${Math.round(V.taux_transport * 100)} %, cotisations micro ou au réel. Net par mois et par heure.`,
    h1: 'Revenu net d’un chauffeur de taxi ou de VTC : le simulateur',
    intro: 'Vos courses, vos frais et votre statut ; les taux 2026 de l’Urssaf et des impôts. Le résultat : ce qui vous reste par mois et par heure.',
    resume: `Le simulateur part de ce que paient vos clients et retire, dans l’ordre, la TVA si votre chiffre d’affaires dépasse le seuil de franchise, la commission de la plateforme, les frais du véhicule et de l’activité, puis les cotisations sociales. En micro-entreprise, les cotisations valent ${(M.taux_bic_services * 100).toLocaleString('fr-FR')} % du chiffre d’affaires hors taxe pour une activité de services artisanale, plus ${(M.cfp_artisan * 100).toLocaleString('fr-FR')} % de contribution à la formation professionnelle ; au réel, le barème 2026 des artisans s’applique au bénéfice diminué d’un abattement de ${Math.round(T.abattement_taux * 100)} %. Le transport de voyageurs est soumis à une TVA de ${Math.round(V.taux_transport * 100)} %, due au-delà de ${V.franchise_services.toLocaleString('fr-FR')} € de chiffre d’affaires annuel. Toutes les valeurs d’activité sont des hypothèses à remplacer par les vôtres : nombre de courses, prix moyen, commission lue sur votre relevé, carburant, crédit ou location du véhicule, assurance. Le résultat est un revenu avant impôt sur le revenu, jamais une promesse de gain.`,
    faqs: [
      { q: 'Pourquoi mon net baisse-t-il d’un coup quand j’ajoute quelques courses ?', a: `Parce que vous venez de franchir le seuil de franchise de TVA : au-delà de ${V.franchise_services.toLocaleString('fr-FR')} € de chiffre d’affaires de services (et dès le premier euro au-dessus de ${V.franchise_services_majore.toLocaleString('fr-FR')} € dans l’année), vos prix contiennent ${Math.round(V.taux_transport * 100)} % de TVA à reverser. Un client qui paie ${Math.round(100 * (1 + V.taux_transport))} € ne vous laisse plus que 100 € de chiffre d’affaires. Le simulateur applique ce seuil automatiquement et l’indique sous le résultat.` },
      { q: 'Faut-il mettre la commission Uber, Bolt ou Heetch dans le simulateur ?', a: 'Oui, dans le champ « commission de la plateforme », avec le taux qui figure sur vos relevés ou dans les conditions publiées par la plateforme. La valeur affichée par défaut est une simple hypothèse d’exemple, pas un chiffre communiqué par une plateforme. Le site est indépendant et ne reprend aucun taux de commission qui ne serait pas publié par la plateforme elle-même.' },
      { q: 'Le revenu affiché est-il avant ou après impôt sur le revenu ?', a: `Avant impôt, sauf si vous choisissez le versement libératoire en micro-entreprise : l’Urssaf prélève alors ${(M.versement_liberatoire_bic_services * 100).toLocaleString('fr-FR')} % du chiffre d’affaires au titre de l’impôt, et le simulateur le retire. Sans cette option, l’impôt dépend de tout le foyer fiscal ; en micro, le revenu imposable est le chiffre d’affaires après un abattement forfaitaire de ${Math.round(M.abattement_bic_services * 100)} %.` },
      { q: 'Pourquoi la SASU n’est-elle pas proposée ?', a: 'Parce que le président de SASU est assimilé salarié : ses cotisations dépendent de la rémunération qu’il se verse, du taux d’accident du travail de l’entreprise et du partage entre salaire et dividendes. Plutôt que d’afficher un chiffre approximatif, le simulateur se limite pour l’instant à la micro-entreprise et à l’entreprise individuelle au réel, qui couvre aussi l’EURL soumise à l’impôt sur le revenu.' },
    ],
    body: (h) => `
<h2>Ce que le simulateur calcule</h2>
<p>Le chiffre d’affaires annuel vient de vos courses par semaine, multipliées par le prix moyen payé par le client et par le nombre de semaines travaillées ; vous pouvez aussi saisir directement un chiffre d’affaires annuel. Viennent ensuite les retraits, ligne par ligne :</p>
<ul>
<li><strong>TVA</strong> : aucune sous ${h.eur(V.franchise_services)} ; entre ${h.eur(V.franchise_services)} et ${h.eur(V.franchise_services_majore)}, pas de TVA l’année du dépassement ; au-delà, ou si vous optez pour la TVA, le prix payé contient ${h.pct(V.taux_transport, 0)} de TVA (${h.src('cgi279', 'code général des impôts, article 279 b quater')}).</li>
<li><strong>Commission</strong> : pour un VTC de plateforme, le taux que vous saisissez, appliqué au prix payé par le client.</li>
<li><strong>Frais</strong> : carburant ou recharge, crédit, location longue durée ou location du véhicule, assurance, entretien, et pour un taxi le loyer ou la mensualité de la licence.</li>
<li><strong>Cotisations</strong> : en micro, ${h.pct(M.taux_bic_services)} du chiffre d’affaires hors taxe (${h.pct(M.taux_acre_debut_des_juillet)} la première année avec l’Acre pour une activité commencée depuis le 1er juillet 2026) et ${h.pct(M.cfp_artisan)} de formation professionnelle ; au réel, le barème 2026 de l’Urssaf.</li>
</ul>
<p>Le net horaire divise le net annuel par vos heures réelles, attente et trajets à vide compris : c’est le chiffre qui se compare à un salaire.</p>

<h2>Micro ou réel : ce qui change dans le calcul</h2>
<p>En micro-entreprise, les cotisations portent sur le chiffre d’affaires, quels que soient vos frais : un chauffeur qui dépense beaucoup pour son véhicule cotise autant qu’un autre. Au réel, elles portent sur le bénéfice, chiffre d’affaires moins frais, diminué depuis 2026 d’un abattement de ${h.pct(T.abattement_taux, 0)} borné entre ${h.pct(T.abattement_min_pass, 2)} et ${h.pct(T.abattement_max_pass, 0)} du plafond de la Sécurité sociale (${h.eur(T.pass)}). S’y ajoutent des cotisations minimales, dues même sans bénéfice. Le ${h.a('tva-vtc-taxi', 'comparateur TVA et statut')} met les deux régimes côte à côte sur vos chiffres.</p>

<h2>La garantie des plateformes</h2>
<p>Les accords signés entre plateformes et représentants des chauffeurs prévoient un revenu minimal de ${h.eur(G.revenu_min_course)} par course, commission déduite, et service-public mentionne aussi ${h.eur(G.revenu_min_heure)} par heure et ${h.eur(G.revenu_min_km)} par kilomètre. Quand votre prix moyen, commission déduite, tombe sous ${h.eur(G.revenu_min_course)}, le simulateur le signale : c’est le moment de relire vos relevés.</p>

<h2>Ce que le simulateur ne fait pas</h2>
<p>Il ne calcule pas l’impôt sur le revenu du foyer, la cotisation foncière des entreprises, la taxe pour frais de chambre de métiers ni la régularisation des cotisations l’année suivante. Il ne modélise pas la SASU. Il ne promet aucun revenu : il applique des taux officiels à vos propres hypothèses. Les sources et les limites sont détaillées dans la ${h.a('method', 'méthode')}.</p>
`,
  },
  en: {
    slug: 'driver-net-income-calculator',
    nav: 'Driver net income',
    card: 'Monthly and hourly net pay for a taxi or VTC driver, contributions and VAT.',
    title: 'Net Income Taxi and VTC Driver France 2026: Calculator',
    description: `Free 2026 net income calculator for VTC and taxi drivers in France: rides, commission, vehicle costs, ${Math.round(V.taux_transport * 100)}% VAT, contributions. Net per month and per hour.`,
    h1: 'Net income of a taxi or VTC driver in France: the calculator',
    intro: 'Your rides, your costs and your status; Urssaf and tax-office rates for 2026. The output: what you keep per month and per hour.',
    resume: `The calculator starts from what your passengers pay and takes away, in order, VAT if your turnover is above the exemption threshold, the platform commission, vehicle and running costs, then French social contributions. As a micro-entrepreneur (the simplified self-employed scheme), contributions are ${(M.taux_bic_services * 100).toLocaleString('en-GB')}% of turnover excluding VAT for a craft-type service activity, plus ${(M.cfp_artisan * 100).toLocaleString('en-GB')}% training levy; under real profit, the 2026 Urssaf scale for craftspeople applies to profit less a ${Math.round(T.abattement_taux * 100)}% allowance. Passenger transport carries ${Math.round(V.taux_transport * 100)}% VAT, due above €${V.franchise_services.toLocaleString('en-GB')} of annual turnover. Every activity figure is an assumption to replace with your own: rides, average fare, the commission on your statement, fuel, the vehicle loan or rental, insurance. The result is income before income tax, never a promise of earnings.`,
    faqs: [
      { q: 'Why does my net income drop when I add just a few rides?', a: `Because you have crossed the VAT exemption threshold: above €${V.franchise_services.toLocaleString('en-GB')} of service turnover (and from the first euro above €${V.franchise_services_majore.toLocaleString('en-GB')} within the year), your fares include ${Math.round(V.taux_transport * 100)}% VAT that you pay over. A passenger paying €${Math.round(100 * (1 + V.taux_transport))} then leaves you €100 of turnover. The calculator applies the threshold automatically and says so under the result.` },
      { q: 'Should I enter the Uber, Bolt or Heetch commission?', a: 'Yes, in the platform commission field, using the rate shown on your statements or in the terms the platform publishes. The default value is only an example assumption, not a figure provided by any platform. This site is independent and does not use commission rates unless the platform itself has published them.' },
      { q: 'Is the result before or after income tax?', a: `Before income tax, unless you pick the flat-rate option as a micro-entrepreneur: Urssaf then collects ${(M.versement_liberatoire_bic_services * 100).toLocaleString('en-GB')}% of turnover as income tax, and the calculator deducts it. Without that option, tax depends on your whole household; under the micro scheme, taxable income is turnover after a flat ${Math.round(M.abattement_bic_services * 100)}% allowance.` },
      { q: 'Why can’t I choose a SASU company?', a: 'Because a SASU chairman is treated like an employee: contributions depend on the salary paid, the company’s workplace-accident rate and the split between salary and dividends. Rather than show a rough figure, the calculator currently covers the micro-enterprise and the sole trader under real profit, which also covers a single-member EURL taxed as income.' },
    ],
    body: (h) => `
<h2>What the calculator works out</h2>
<p>Annual turnover is your rides per week times the average fare paid by the passenger times the weeks you work; you can also type an annual figure directly. Then come the deductions, line by line:</p>
<ul>
<li><strong>VAT</strong>: none below ${h.eur(V.franchise_services)}; between ${h.eur(V.franchise_services)} and ${h.eur(V.franchise_services_majore)}, no VAT in the year you cross the line; above that, or if you opt in, the fare contains ${h.pct(V.taux_transport, 0)} VAT (${h.src('cgi279', 'General Tax Code, article 279 b quater')}).</li>
<li><strong>Commission</strong>: for a platform VTC driver, the rate you enter, applied to the price the passenger pays.</li>
<li><strong>Costs</strong>: fuel or charging, the vehicle loan, lease or rental, insurance, servicing, and for a taxi the rent or repayment on the licence.</li>
<li><strong>Contributions</strong>: under micro, ${h.pct(M.taux_bic_services)} of turnover excluding VAT (${h.pct(M.taux_acre_debut_des_juillet)} in the first year with Acre, the start-up relief, for a business started since 1 July 2026) and ${h.pct(M.cfp_artisan)} training levy; under real profit, the 2026 Urssaf scale.</li>
</ul>
<p>The hourly figure divides annual net income by the hours you really work, waiting time and empty miles included: that is the number to compare with a salary.</p>

<h2>Micro or real profit: what changes</h2>
<p>Under the micro scheme, contributions are charged on turnover whatever your costs, so a driver with an expensive car pays as much as one with a cheap one. Under real profit, they are charged on profit (turnover minus costs), reduced since 2026 by a ${h.pct(T.abattement_taux, 0)} allowance capped between ${h.pct(T.abattement_min_pass, 2)} and ${h.pct(T.abattement_max_pass, 0)} of the social security ceiling (${h.eur(T.pass)}). Minimum contributions apply even without profit. The ${h.a('tva-vtc-taxi', 'VAT and status comparison')} puts both schemes side by side on your figures.</p>

<h2>The platform guarantee</h2>
<p>Agreements between platforms and drivers’ representatives set a minimum of ${h.eur(G.revenu_min_course)} per ride after commission, and service-public also mentions ${h.eur(G.revenu_min_heure)} per hour and ${h.eur(G.revenu_min_km)} per kilometre. When your average fare after commission falls below ${h.eur(G.revenu_min_course)}, the calculator flags it, which is a good reason to check your statements.</p>

<h2>What the calculator does not do</h2>
<p>It does not compute household income tax, the local business tax (CFE), the chamber of trades levy or the following year’s contribution adjustment. It does not model a SASU. It promises no income: it applies official rates to your own assumptions. Sources and limits are in the ${h.a('method', 'method page')}.</p>
`,
  },
});
