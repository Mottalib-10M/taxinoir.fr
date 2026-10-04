import { defineGuide } from '../../lib/guide-types';
import { P } from '../../lib/engine/params';

// Valeurs lues dans params-2026.json : blocs `micro` (Urssaf, F36232), `tva` (F21746), `acces` (registre),
// et `societe` (service-public F36215 et F36240 vérifiés le 21 février 2026, F38152 vérifié le 25 juin 2026,
// F37777, F37396).
const M = P.micro;
const S = P.societe;
const pc = (x: number, d = 1) => (x * 100).toFixed(d).replace('.', ',').replace(',0', '');
const en = (x: number, d = 1) => (x * 100).toFixed(d).replace('.0', '');

export default defineGuide({
  id: 'statut-vtc',
  group: 'revenus',
  order: 50,
  mini: 'dividendesSasu',
  miniHref: 'tva-vtc-taxi',
  related: ['charges-comptabilite-vtc', 'tva-vtc-taxi', 'revenu-net-chauffeur', 'registre-vtc', 'salaire-chauffeur-vtc'],
  sources: ['urssafAe', 'spSasuCotis', 'spSasuFisc', 'spDirigeant', 'spEurl', 'spEi'],
  fr: {
    slug: 'statut-vtc',
    nav: 'Statut VTC',
    card: 'Micro-entreprise, entreprise individuelle, EURL ou SASU : ce que chaque statut change pour un chauffeur.',
    title: 'Statut VTC 2026 : micro-entreprise, EURL ou SASU ?',
    description: `Statut VTC en 2026 : micro-entreprise jusqu’à ${M.seuil_services.toLocaleString('fr-FR')} € de recettes, EI au réel, EURL ou SASU, cotisations, impôt sur les sociétés à ${pc(S.is_reduit, 0)} % et dividendes.`,
    h1: 'Statut juridique du chauffeur VTC : micro, EI, EURL ou SASU',
    intro: 'Le statut ne change ni l’examen, ni la carte, ni le registre : il change ce que vous payez, ce que vous touchez et votre protection.',
    resume: `Un chauffeur VTC à son compte choisit entre quatre cadres. La micro-entreprise, une entreprise individuelle au régime simplifié, convient tant que le chiffre d’affaires reste sous ${M.seuil_services.toLocaleString('fr-FR')} € par an : les cotisations sont un pourcentage des recettes, ${pc(M.taux_bic_services)} % pour une activité de services artisanale en 2026 selon l’Urssaf, sans déduction des frais. L’entreprise individuelle au réel déduit ses frais réels et cotise sur son bénéfice, comme le gérant associé unique d’une EURL, travailleur indépendant. Dans une SASU, le président est assimilé salarié : il relève du régime général et paie, sur sa rémunération, les cotisations d’un cadre, sauf l’assurance chômage, à laquelle il n’a pas droit (service-public, fiche F36240). La société paie l’impôt sur les sociétés, ${pc(S.is_reduit, 0)} % jusqu’à ${S.is_reduit_plafond.toLocaleString('fr-FR')} € de bénéfice puis ${pc(S.is_normal, 0)} %, et les dividendes supportent un prélèvement forfaitaire de ${pc(S.pfu_dividendes)} %. Le statut ne dispense d’aucune obligation VTC : carte, registre, véhicule conforme.`,
    faqs: [
      { q: 'Quel statut choisir pour commencer en VTC ?', a: `La micro-entreprise est la plus simple : déclaration en ligne, cotisations de ${pc(M.taux_bic_services)} % du chiffre d’affaires plus ${pc(M.cfp_artisan)} % de formation professionnelle, comptabilité réduite. Elle cesse d’être avantageuse quand vos frais réels dépassent nettement le forfait, ce qui arrive vite avec un véhicule financé et une commission de plateforme. Comparez les deux régimes avec vos chiffres avant de choisir.` },
      { q: 'Le président d’une SASU de VTC a-t-il droit au chômage ?', a: 'Non. Service-public indique que le président de SASU, assimilé salarié, relève du régime général de la sécurité sociale mais n’a pas droit à l’assurance chômage ; il ne verse donc pas cette contribution. Il peut souscrire une assurance privée facultative contre la perte d’activité. Le gérant associé unique d’une EURL, travailleur indépendant, n’est pas mieux couvert sur ce point.' },
      { q: 'Peut-on se verser uniquement des dividendes dans une SASU de VTC ?', a: `C’est possible juridiquement : sans rémunération, le président ne paie pas de cotisations sociales. Mais il ne s’ouvre alors aucun droit à la retraite ni aux indemnités journalières. Les dividendes sont imposés au prélèvement forfaitaire de ${pc(S.pfu_dividendes)} %, ou au barème de l’impôt sur le revenu après un abattement de ${pc(S.abattement_dividendes_bareme, 0)} %, sur option (service-public, fiche F36215).` },
      { q: 'En EURL, les dividendes du chauffeur sont-ils soumis à cotisations ?', a: `En partie. Pour un dirigeant travailleur indépendant, comme le gérant associé unique d’EURL, service-public précise que les dividendes entrent dans le calcul des cotisations pour la fraction qui dépasse ${pc(S.tns_dividendes_seuil_capital, 0)} % du capital social détenu. Avec un petit capital, une grande partie des dividendes supporte donc les cotisations d’indépendant.` },
      { q: 'Faut-il refaire l’inscription au registre VTC en changeant de statut ?', a: 'Le registre inscrit l’entreprise qui exploite les véhicules, pas la personne. Passer de la micro-entreprise à une société crée une nouvelle entreprise, avec un nouveau numéro : elle doit être inscrite au registre des VTC, avec ses propres justificatifs et ses frais d’inscription. Prévoyez cette démarche avant de transférer votre activité et vos contrats de plateforme.' },
      { q: 'Le patrimoine personnel d’un VTC en micro-entreprise est-il protégé ?', a: 'Depuis le 15 mai 2022, oui, en grande partie. Service-public explique que le patrimoine professionnel et le patrimoine personnel de l’entrepreneur individuel sont séparés automatiquement : les créanciers professionnels ne peuvent saisir que les biens utiles à l’activité. L’administration fiscale et l’Urssaf peuvent toutefois poursuivre les deux patrimoines en cas de manquement grave.' },
    ],
    body: (h) => `
<h2>Ce que le statut change, et ce qu’il ne change pas</h2>
<p>Quel que soit le statut, le métier reste le même : examen de la chambre de métiers, carte professionnelle, inscription de l’entreprise au ${h.a('registre-vtc', 'registre des VTC')}, véhicule conforme, assurance de transport de personnes. Le statut joue sur quatre choses : la façon de calculer les cotisations sociales, l’impôt, la protection sociale et la complexité administrative. Le tableau résume les quatre cadres possibles.</p>
${h.table(['', 'Micro-entreprise', 'EI au réel', 'EURL', 'SASU'], [
  ['Statut social du dirigeant', 'travailleur indépendant', 'travailleur indépendant', 'travailleur indépendant (gérant associé unique)', 'assimilé salarié (président)'],
  ['Base des cotisations', `chiffre d’affaires, ${h.pct(M.taux_bic_services)}`, `bénéfice, après abattement de ${h.pct(P.tns.abattement_taux, 0)}`, `rémunération et dividendes au-delà de ${h.pct(S.tns_dividendes_seuil_capital, 0)} du capital`, 'rémunération versée'],
  ['Frais réels', 'non déduits', 'déduits', 'déduits', 'déduits'],
  ['Impôt sur le bénéfice', 'impôt sur le revenu (forfait)', 'impôt sur le revenu', 'impôt sur le revenu ou sur les sociétés', 'impôt sur les sociétés, option possible'],
  ['Assurance chômage', 'non', 'non', 'non', 'non'],
], 'Sources : Urssaf ; service-public, fiches F36240, F36215, F38152, F37777 et F37396')}
<p>Aucun des quatre ne donne droit au chômage classique, contrairement à une idée répandue sur la SASU : service-public le dit pour l’assimilé salarié comme pour le travailleur indépendant (${h.src('spDirigeant', 'fiche F38152')}).</p>

<h2>La micro-entreprise : simple, mais au forfait</h2>
<p>La micro-entreprise est une entreprise individuelle qui choisit le régime le plus simple. Selon l’${h.src('urssafAe', 'Urssaf')}, une activité de services artisanale comme le transport de personnes cotise en 2026 ${h.pct(M.taux_bic_services)} du chiffre d’affaires encaissé, plus ${h.pct(M.cfp_artisan)} au titre de la formation professionnelle des artisans. Avec l’aide à la création, l’Acre, le taux est réduit la première année. Le versement libératoire de l’impôt, sur option, ajoute ${h.pct(M.versement_liberatoire_bic_services)} du chiffre d’affaires et solde l’impôt sur le revenu de l’activité.</p>
<p>Le revers est le forfait : les frais réels ne se déduisent pas. Pour l’impôt, le chiffre d’affaires est réduit d’un abattement forfaitaire de ${h.pct(M.abattement_bic_services, 0)}, quels que soient vos frais réels. Un VTC qui paie une location de véhicule, du carburant et une commission de plateforme peut avoir des frais supérieurs à ce forfait. La micro-entreprise reste ouverte tant que le chiffre d’affaires annuel ne dépasse pas ${h.eur(M.seuil_services)} en 2026. La TVA suit un autre seuil, ${h.eur(P.tva.franchise_services)}, détaillé dans la page ${h.a('tva-vtc-taxi', 'TVA VTC et taxi')}.</p>

<h2>L’entreprise individuelle au réel</h2>
<p>La même entreprise individuelle peut sortir du forfait et passer au régime réel. Elle tient alors une vraie comptabilité, déduit ses frais réels et cotise sur son bénéfice. Depuis la réforme de 2026, l’assiette des cotisations des indépendants est le revenu professionnel diminué d’un abattement de ${h.pct(P.tns.abattement_taux, 0)}. Service-public indique, comme ordre de grandeur, des cotisations d’environ ${h.pct(S.ei_cotisations_ordre_grandeur, 0)} du revenu pour un entrepreneur individuel (${h.src('spEi', 'fiche F37396')}). Depuis le ${h.date(S.ei_patrimoine_separe_depuis)}, le patrimoine professionnel et le patrimoine personnel de l’entrepreneur individuel sont séparés automatiquement.</p>
<p>Le simulateur de revenu net du site calcule les deux régimes, micro et réel, avec les barèmes 2026 de l’Urssaf : c’est le bon outil pour savoir à partir de quel niveau de frais le réel devient plus intéressant.</p>

<h2>L’EURL : une société, un statut d’indépendant</h2>
<p>L’EURL est une société à associé unique. Il n’y a pas de capital minimum à sa création (${h.src('spEurl', 'fiche F37777')}). Le gérant associé unique est un travailleur indépendant : il cotise au régime des indépendants sur sa rémunération. Si l’EURL est à l’impôt sur les sociétés, les dividendes perçus qui dépassent ${h.pct(S.tns_dividendes_seuil_capital, 0)} du capital s’ajoutent à l’assiette des cotisations. Un capital de 1 000 € expose donc presque tous les dividendes aux cotisations. À l’impôt sur le revenu, une EURL se calcule comme une entreprise individuelle au réel, ce que fait le simulateur.</p>

<h2>La SASU : assimilé salarié, impôt sur les sociétés</h2>
<p>Le président de SASU est assimilé salarié et dépend du régime général de la sécurité sociale. Sur sa rémunération, il paie les mêmes cotisations qu’un salarié cadre, sauf l’assurance chômage, à laquelle il n’a pas droit (${h.src('spSasuCotis', 'fiche F36240')}). S’il ne se verse aucune rémunération, il ne cotise pas, mais ne s’ouvre aucun droit.</p>
<p>La SASU paie l’impôt sur les sociétés sur son bénéfice. Selon ${h.src('spSasuFisc', 'la fiche F36215')}, le taux normal est de ${h.pct(S.is_normal, 0)}, et un taux réduit de ${h.pct(S.is_reduit, 0)} s’applique jusqu’à ${h.eur(S.is_reduit_plafond)} de bénéfice pour une entreprise dont le chiffre d’affaires est inférieur à ${h.eur(S.is_reduit_ca_max)}, sous conditions. Le bénéfice distribué en dividendes est ensuite imposé au prélèvement forfaitaire de ${h.pct(S.pfu_dividendes)} ou, sur option, au barème progressif après un abattement de ${h.pct(S.abattement_dividendes_bareme, 0)}. Une SASU de moins de ${S.option_ir_anciennete_max_ans} ans, de moins de ${S.option_ir_salaries_max} salariés et sous les ${h.eur(S.is_reduit_ca_max)} de chiffre d’affaires peut opter pour l’impôt sur le revenu, pour ${S.option_ir_exercices} exercices au plus, sans renouvellement.</p>
<p>Le mini-simulateur en haut de page montre ce qui reste d’un bénéfice entièrement distribué en dividendes. Il ne simule pas la rémunération du président : les taux des cotisations de l’assimilé salarié ne sont pas encore intégrés au moteur du site, et nous préférons ne pas afficher un chiffre incomplet.</p>

<h2>Comment trancher</h2>
<ul>
<li><strong>Vous démarrez, avec des frais modestes</strong> : la micro-entreprise permet de tester le métier sans comptable.</li>
<li><strong>Vos frais réels sont lourds</strong> (véhicule financé, commission, carburant) : comparez la micro et le réel avec le ${h.a('revenu-net-chauffeur', 'simulateur de revenu net')} ; pour l’impôt, le réel donne une base plus basse dès que les frais dépassent la moitié du chiffre d’affaires, mais les cotisations suivent un autre calcul.</li>
<li><strong>Vous voulez embaucher, vous associer ou laisser des bénéfices dans l’entreprise</strong> : une société devient pertinente, avec un expert-comptable.</li>
<li><strong>Vous visez une protection proche du salariat</strong> : la SASU avec rémunération, en acceptant des cotisations plus élevées et l’absence de chômage.</li>
</ul>
<p>Les obligations comptables de chaque régime, et les frais que vous pourrez déduire, sont détaillés dans la page ${h.a('charges-comptabilite-vtc', 'charges et comptabilité du chauffeur')}. Changer de statut en cours de route crée une nouvelle entreprise : il faudra l’inscrire au registre des VTC.</p>
`,
  },
  en: {
    slug: 'vtc-business-structure',
    nav: 'VTC business structure',
    card: 'Micro-enterprise, sole trader, EURL or SASU: what each structure means for a driver.',
    title: 'VTC Business Structure France 2026: Micro, EURL or SASU',
    description: `VTC business structure in France, 2026: micro-enterprise up to €${M.seuil_services.toLocaleString('en-GB')} turnover, sole trader, EURL or SASU, contributions, ${en(S.is_reduit, 0)}% corporation tax and dividends.`,
    h1: 'Choosing a business structure as a VTC driver in France',
    intro: 'Your structure changes nothing about the exam, the card or the register; it changes what you pay, what you keep and how you are covered.',
    resume: `A self-employed VTC (private hire) driver in France chooses between four set-ups. The micro-enterprise, a sole trader on the simplified scheme, works while turnover stays under €${M.seuil_services.toLocaleString('en-GB')} a year: contributions are a percentage of takings, ${en(M.taux_bic_services)}% for a craft service activity in 2026 according to Urssaf, the body that collects social contributions, with no deduction for costs. A sole trader on the real regime deducts actual costs and pays contributions on profit, as does the sole partner-manager of an EURL (single-member limited company), who counts as self-employed. In a SASU (single-shareholder simplified company), the president is treated like an employee: covered by the general social security scheme and paying an executive’s contributions on any salary, except unemployment insurance, to which they have no right (service-public, page F36240). The company pays corporation tax, ${en(S.is_reduit, 0)}% up to €${S.is_reduit_plafond.toLocaleString('en-GB')} of profit then ${en(S.is_normal, 0)}%, and dividends bear a ${en(S.pfu_dividendes)}% flat levy.`,
    faqs: [
      { q: 'Which business structure should a new VTC driver start with?', a: `The micro-enterprise is the simplest: online sign-up, contributions of ${en(M.taux_bic_services)}% of turnover plus ${en(M.cfp_artisan)}% for vocational training, and light bookkeeping. It stops paying off once your real costs clearly exceed the flat allowance, which happens quickly with a financed car and a platform commission. Run both regimes with your own figures before deciding.` },
      { q: 'Does a SASU president get unemployment benefit in France?', a: 'No. Service-public states that the SASU president, treated like an employee, is covered by the general social security scheme but has no right to unemployment insurance and therefore pays no contribution for it. Optional private cover against loss of business exists. The sole partner-manager of an EURL, who is self-employed, is no better off on this point.' },
      { q: 'Can I pay myself only in dividends from a VTC SASU?', a: `Legally, yes: with no salary, the president pays no social contributions. But that also means no pension rights and no sick pay. Dividends are taxed at the ${en(S.pfu_dividendes)}% flat rate or, on election, at progressive income tax rates after a ${en(S.abattement_dividendes_bareme, 0)}% allowance (service-public, page F36215).` },
      { q: 'Are EURL dividends subject to social contributions?', a: `Partly. For a self-employed director, such as the sole partner-manager of an EURL, service-public explains that dividends count towards contributions for the share above ${en(S.tns_dividendes_seuil_capital, 0)}% of the share capital held. With a small capital, most dividends therefore bear self-employed contributions.` },
      { q: 'Do I need a new VTC register entry if I change structure?', a: 'The register lists the business that runs the vehicles, not the person. Moving from a micro-enterprise to a company creates a new business with a new number, which must be entered on the VTC register with its own documents and fee. Plan that step before moving your work and platform accounts across.' },
      { q: 'Are my personal assets safe as a micro-entrepreneur?', a: 'Largely, since 15 May 2022. Service-public explains that a sole trader’s business and personal assets are now separated automatically, so business creditors can only claim assets used for the business. The tax authorities and Urssaf can still pursue both in cases of serious breaches.' },
    ],
    body: (h) => `
<h2>What the structure changes, and what it does not</h2>
<p>Whatever structure you choose, the job is the same: the chamber of trades (CMA) exam, the professional card, entry of the business on the ${h.a('registre-vtc', 'VTC register')}, a compliant vehicle and passenger transport insurance. The structure affects four things: how social contributions are worked out, tax, social cover and paperwork. The table sums up the four options.</p>
${h.table(['', 'Micro-enterprise', 'Sole trader, real regime', 'EURL', 'SASU'], [
  ['Director’s social status', 'self-employed', 'self-employed', 'self-employed (sole partner-manager)', 'treated as employee (president)'],
  ['Contribution base', `turnover, ${h.pct(M.taux_bic_services)}`, `profit, after a ${h.pct(P.tns.abattement_taux, 0)} allowance`, `salary, plus dividends above ${h.pct(S.tns_dividendes_seuil_capital, 0)} of capital`, 'salary paid'],
  ['Actual costs', 'not deducted', 'deducted', 'deducted', 'deducted'],
  ['Tax on profit', 'income tax (flat allowance)', 'income tax', 'income tax or corporation tax', 'corporation tax, option available'],
  ['Unemployment insurance', 'no', 'no', 'no', 'no'],
], 'Sources: Urssaf; service-public, pages F36240, F36215, F38152, F37777 and F37396')}
<p>None of the four gives a right to standard unemployment benefit, despite a common belief about the SASU: service-public says so for both employee-like and self-employed directors (${h.src('spDirigeant', 'page F38152')}).</p>

<h2>The micro-enterprise: simple, but flat-rate</h2>
<p>The micro-enterprise (often still called auto-entrepreneur) is a sole trader on the simplest regime. According to ${h.src('urssafAe', 'Urssaf')}, a craft service such as passenger transport pays ${h.pct(M.taux_bic_services)} of cash turnover in contributions in 2026, plus ${h.pct(M.cfp_artisan)} for craft vocational training. With the start-up relief known as Acre, the rate is lower in the first year. The optional flat-rate tax payment adds ${h.pct(M.versement_liberatoire_bic_services)} of turnover and settles income tax on the activity.</p>
<p>The catch is the flat rate: actual costs are not deducted. For income tax, turnover is reduced by a ${h.pct(M.abattement_bic_services, 0)} flat allowance, whatever your real costs. A VTC driver paying for a rental car, fuel and platform commission may well spend more than that. The micro regime stays open while annual turnover is no more than ${h.eur(M.seuil_services)} in 2026. VAT follows a separate threshold, ${h.eur(P.tva.franchise_services)}, explained in the ${h.a('tva-vtc-taxi', 'VAT for VTC and taxi drivers')} guide.</p>

<h2>Sole trader on the real regime</h2>
<p>The same sole trader can leave the flat-rate scheme for the real regime, keep proper accounts, deduct actual costs and pay contributions on profit. Since the 2026 reform, the self-employed contribution base is professional income less a ${h.pct(P.tns.abattement_taux, 0)} allowance. Service-public gives, as a rough guide, contributions of about ${h.pct(S.ei_cotisations_ordre_grandeur, 0)} of income for a sole trader (${h.src('spEi', 'page F37396')}). Since ${h.date(S.ei_patrimoine_separe_depuis)}, a sole trader’s business and personal assets are separated automatically.</p>
<p>The site’s net income calculator handles both regimes with Urssaf’s 2026 scales: it is the right tool to see at what level of costs the real regime pays off.</p>

<h2>The EURL: a company with self-employed status</h2>
<p>An EURL is a limited company with a single partner and no minimum capital (${h.src('spEurl', 'page F37777')}). The sole partner-manager is self-employed and pays self-employed contributions on their pay. If the EURL is taxed as a company, dividends above ${h.pct(S.tns_dividendes_seuil_capital, 0)} of the capital are added to the contribution base, so with €1,000 of capital almost every dividend bears contributions. An EURL taxed under income tax works out like a sole trader on the real regime, which is what the calculator models.</p>

<h2>The SASU: employee-like status, corporation tax</h2>
<p>The SASU president is treated like an employee and covered by the general social security scheme. On any salary, the president pays the same contributions as an executive employee, except unemployment insurance, which they cannot claim (${h.src('spSasuCotis', 'page F36240')}). With no salary there are no contributions, and no entitlements either.</p>
<p>The SASU pays corporation tax on its profit. According to ${h.src('spSasuFisc', 'page F36215')}, the standard rate is ${h.pct(S.is_normal, 0)}, with a reduced ${h.pct(S.is_reduit, 0)} on the first ${h.eur(S.is_reduit_plafond)} of profit for companies with turnover under ${h.eur(S.is_reduit_ca_max)}, subject to conditions. Profit paid out as dividends is then taxed at the ${h.pct(S.pfu_dividendes)} flat rate or, on election, at progressive rates after a ${h.pct(S.abattement_dividendes_bareme, 0)} allowance. A SASU under ${S.option_ir_anciennete_max_ans} years old, with fewer than ${S.option_ir_salaries_max} staff and turnover under ${h.eur(S.is_reduit_ca_max)}, may opt for income tax for up to ${S.option_ir_exercices} financial years, once only.</p>
<p>The calculator at the top of the page shows what remains of a profit paid out entirely as dividends. It does not model a president’s salary: the employee-like contribution rates are not yet in the site’s engine, and we would rather not show an incomplete figure.</p>

<h2>How to decide</h2>
<ul>
<li><strong>Starting out with modest costs</strong>: the micro-enterprise lets you try the job without an accountant.</li>
<li><strong>Heavy real costs</strong> (financed car, commission, fuel): compare micro and real regimes with the ${h.a('revenu-net-chauffeur', 'net income calculator')}; for income tax, the real regime gives a lower base once costs pass half of turnover, but contributions follow a different calculation.</li>
<li><strong>Hiring, taking a partner or keeping profit in the business</strong>: a company makes sense, with a chartered accountant.</li>
<li><strong>Cover close to an employee’s</strong>: a SASU paying a salary, accepting higher contributions and no unemployment benefit.</li>
</ul>
<p>The bookkeeping each regime requires, and the costs you can deduct, are set out on the ${h.a('charges-comptabilite-vtc', 'driver costs and bookkeeping')} page. Changing structure later creates a new business, which has to be entered on the VTC register.</p>
`,
  },
});
