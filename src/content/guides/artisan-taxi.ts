import { defineGuide } from '../../lib/guide-types';
import { P } from '../../lib/engine/params';
import { displayDate, formatMoney, formatPercent } from '../../lib/format';

const A = P.acces;
const X = P.taxi;
const M = P.micro;
const T = P.tva;
const dfr = (iso: string) => displayDate(iso, 'fr-FR');
const den = (iso: string) => displayDate(iso, 'en-GB');
const fe = (n: number, l: 'fr' | 'en') => formatMoney(n, 0, l);
const fp = (x: number, l: 'fr' | 'en') => formatPercent(x, 1, l);

export default defineGuide({
  id: 'artisan-taxi',
  group: 'taxi',
  order: 60,
  mini: 'artisanTaxi',
  miniHref: 'tva-vtc-taxi',
  related: ['devenir-taxi', 'licence-taxi', 'location-licence-taxi', 'taxi-conventionne', 'salaire-taxi', 'tva-vtc-taxi'],
  sources: ['spTaxi', 'artisanatL125_5', 'ctL3121Ads', 'spTarifsTaxi', 'urssafAe', 'spFranchiseTva', 'cgi279'],
  fr: {
    slug: 'artisan-taxi',
    nav: 'Artisan taxi',
    card: 'Statut, immatriculation, équipements, obligations et régime fiscal du taxi propriétaire de sa licence.',
    title: 'Artisan taxi 2026 : statut, immatriculation et obligations',
    description: `Artisan taxi en 2026 : licence à vous, immatriculation au RNE, micro-entreprise jusqu’à ${fe(M.seuil_services, 'fr')}, TVA à ${formatPercent(T.taux_transport, 0, 'fr')}, taximètre, terminal de paiement et note dès ${X.note_obligatoire_des} €.`,
    h1: 'Artisan taxi : le statut du chauffeur propriétaire de sa licence',
    intro: 'Être artisan taxi, c’est être chef d’entreprise : la licence, la voiture, les recettes et les risques sont à vous.',
    resume: `L’artisan taxi est un chauffeur indépendant qui exploite sa propre licence. Service-public le définit ainsi : il est propriétaire de sa licence, ses bénéfices lui reviennent entièrement, et il répond de son véhicule, de son entretien et de son assurance. Le code de l’artisanat range le transport de voyageurs par taxi parmi les activités artisanales et renvoie, à son article L125-5, aux articles L3121-1 à L3121-12 du code des transports. Pour exercer, il faut la carte professionnelle de taxi, une autorisation de stationnement exploitée personnellement, et une entreprise immatriculée au registre national des entreprises : micro-entreprise, entreprise individuelle, EURL ou SASU pour qui se lance seul. En micro-entreprise, les cotisations atteignent ${fp(M.taux_bic_services, 'fr')} des recettes, plus ${fp(M.cfp_artisan, 'fr')} de contribution à la formation, jusqu’à ${fe(M.seuil_services, 'fr')} de chiffre d’affaires en 2026. Le transport de voyageurs relève de la TVA à ${formatPercent(T.taux_transport, 0, 'fr')}. Le véhicule porte taximètre, lumineux, plaque et terminal de paiement, contrôlés chaque année.`,
    faqs: [
      { q: 'Quelle différence entre artisan taxi, taxi locataire et taxi salarié ?', a: 'L’artisan possède sa licence et exploite son entreprise : il garde tout le bénéfice et porte tous les frais. Le locataire loue la licence et le véhicule par une location-gérance d’au moins un an et verse un loyer, sans droit à l’assurance chômage. Le salarié conduit le véhicule d’une entreprise de taxis, avec un fixe et un pourcentage des recettes. Les trois ont besoin de la même carte professionnelle.' },
      { q: 'Quel statut juridique choisir pour devenir artisan taxi ?', a: `Service-public cite, pour qui se lance seul, la micro-entreprise, l’entreprise individuelle, l’EURL ou la SASU, et la SARL ou la SAS avec des associés. La micro-entreprise est la plus simple, mais elle ne déduit aucun frais réel et s’arrête au-delà de ${fe(M.seuil_services, 'fr')} de recettes en 2026. Avec une licence achetée à crédit, le régime réel est souvent plus favorable : le mini-simulateur compare les deux.` },
      { q: 'Où immatriculer une entreprise d’artisan taxi ?', a: 'Au registre national des entreprises, par le guichet unique des formalités des entreprises, en ligne : on crée un compte personnel, puis on dépose une formalité de création. La chambre de métiers et de l’artisanat de la région est l’interlocutrice des artisans et peut accompagner la démarche, puisque le code de l’artisanat range le transport par taxi parmi les activités artisanales.' },
      { q: 'Quels équipements un artisan taxi doit-il avoir dans sa voiture ?', a: `Selon service-public : un taximètre, un dispositif lumineux portant la mention « taxi » et le nom de la commune, une plaque indiquant le numéro de la licence, un terminal de paiement par carte en état de marche et une imprimante reliée au compteur. Le taximètre et le lumineux sont vérifiés à chaque contrôle technique annuel. Une note est obligatoire pour toute course d’au moins ${X.note_obligatoire_des} € TTC.` },
      { q: 'Un artisan taxi doit-il facturer la TVA ?', a: `Pas forcément. Sous ${fe(T.franchise_services, 'fr')} de chiffre d’affaires en 2026, la franchise en base dispense de facturer la TVA. Au-delà, ou sur option, le transport de voyageurs est taxé à ${formatPercent(T.taux_transport, 0, 'fr')}, selon l’article 279 du code général des impôts, et l’artisan récupère la TVA sur ses achats. Le seuil majoré de ${fe(T.franchise_services_majore, 'fr')} déclenche la TVA dès son dépassement.` },
    ],
    body: (h) => `
<h2>Ce qu’est un artisan taxi</h2>
<p>Le mot « artisan » n’est pas qu’une habitude de langage. Le code de l’artisanat range le transport de voyageurs par taxi parmi les activités artisanales : son ${h.src('artisanatL125_5', 'article L125-5')} renvoie, pour les règles de cette activité, aux articles L3121-1 à L3121-12 du code des transports. La chambre de métiers et de l’artisanat de la région est l’interlocutrice naturelle du taxi indépendant.</p>
<p>${h.src('spTaxi', 'Service-public')} décrit l’artisan taxi en trois traits : il est indépendant, ses bénéfices lui reviennent entièrement, et il doit être propriétaire de sa licence. Il est responsable de son véhicule, de son entretien et de son assurance. C’est ce qui le distingue des deux autres façons d’exercer : le locataire, qui exploite la licence d’un autre en location-gérance, et le salarié d’une entreprise de taxis. La page ${h.a('location-licence-taxi', 'location de licence')} détaille la deuxième.</p>

<h2>Les trois conditions pour s’installer</h2>
<ol>
<li><strong>La carte professionnelle de taxi</strong>, obtenue après l’examen de la chambre de métiers, ${h.eur(A.examen_complet)} en 2026, et valable ${A.carte_validite_ans} ans. Elle est liée au département de l’examen. Voir ${h.a('examen-taxi', 'examen taxi')}.</li>
<li><strong>Une autorisation de stationnement</strong>, la licence, que l’artisan exploite personnellement selon l’${h.src('ctL3121Ads', 'article L3121-1-2 du code des transports')}, en justifiant d’une exploitation effective et continue. Gratuite, elle s’obtient sur liste d’attente en mairie et vaut ${X.ads_gratuite_validite_ans} ans renouvelables ; achetée, elle coûte de ${h.eur(X.ads_prix_min)} à ${h.eur(X.ads_prix_max)} selon service-public. Voir ${h.a('licence-taxi', 'licence de taxi')}.</li>
<li><strong>Une entreprise immatriculée</strong> au registre national des entreprises.</li>
</ol>

<h2>Choisir la forme de l’entreprise</h2>
<p>Service-public liste les formes possibles : pour qui se lance seul, micro-entrepreneur, entreprise individuelle, EURL ou SASU ; avec des associés, SARL ou SAS. L’immatriculation se fait en ligne sur le guichet des formalités des entreprises : on crée un compte personnel, puis on dépose une formalité d’entreprise. Les conseillers de la CMA peuvent accompagner la démarche.</p>
${h.table(['Forme', 'Cotisations', 'Frais réels', 'Point d’attention'], [
  ['Micro-entreprise', `${h.pct(M.taux_bic_services)} des recettes, plus ${h.pct(M.cfp_artisan)} de formation (Urssaf)`, 'non déduits', `seuil de ${h.eur(M.seuil_services)} de recettes en 2026`],
  ['Entreprise individuelle au réel, EURL à l’impôt sur le revenu', 'barème des indépendants sur le bénéfice', 'déduits', 'comptabilité complète'],
  ['SASU, SAS', 'régime des assimilés salariés sur la rémunération', 'déduits', 'non simulé sur ce site'],
], 'Formes juridiques citées par service-public ; taux micro 2026 de l’Urssaf')}
<p>Le choix tient surtout au poids des frais. Un artisan qui a acheté sa licence à crédit, qui roule beaucoup et qui paie une assurance élevée supporte des frais importants : la micro-entreprise ne les déduit pas, puisque ses cotisations portent sur les recettes, selon l’${h.src('urssafAe', 'Urssaf')}. Le mini-simulateur compare, pour vos recettes et vos frais annuels, le net en micro-entreprise et au régime réel. L’${h.a('tva-vtc-taxi', 'outil TVA et statuts')} va plus loin.</p>

<h2>La TVA</h2>
<p>Sous ${h.eur(T.franchise_services)} de chiffre d’affaires en 2026, la franchise en base dispense de facturer la TVA, selon la fiche ${h.src('spFranchiseTva', 'franchise en base de service-public')} ; le dépassement du seuil majoré de ${h.eur(T.franchise_services_majore)} y met fin aussitôt. Au-delà, le transport de voyageurs est soumis au taux de ${h.pct(T.taux_transport, 0)} prévu par l’${h.src('cgi279', 'article 279 du code général des impôts')}. Être assujetti a un avantage : récupérer la TVA payée sur le véhicule, le carburant et l’entretien, dans les limites prévues par les textes.</p>

<h2>Les équipements et les contrôles</h2>
<p>La fiche ${h.src('spTarifsTaxi', 'tarifs, équipements et affichage des taxis')} énumère ce que la voiture doit porter :</p>
<ul>
<li>un taximètre, qui mesure le temps et la distance de la course ;</li>
<li>un dispositif lumineux portant la mention « taxi » et le nom de la commune de rattachement, vert quand le taxi est libre, rouge quand il est occupé ;</li>
<li>une plaque extérieure indiquant le numéro de la licence et les départements autorisés ;</li>
<li>un terminal de paiement par carte bancaire en état de marche ;</li>
<li>une imprimante reliée au compteur, pour éditer les notes.</li>
</ul>
<p>La même fiche mentionne un smartphone relié au service le.taxi ; ce service est suspendu depuis le ${h.date(X.le_taxi_suspension)}. Le taximètre et le lumineux sont vérifiés à chaque contrôle technique, qui a lieu chaque année. Le client peut payer en espèces ou par carte, quel que soit le montant. Toute course d’au moins ${h.eur(X.note_obligatoire_des)} TTC donne lieu à une note détaillée. Les tarifs maximaux de l’année sont fixés par arrêté : pour 2026, celui du 24 décembre 2025.</p>

<h2>Obligations qui reviennent</h2>
${h.table(['Obligation', 'Rythme', 'Texte ou source'], [
  ['Contrôle technique, taximètre et lumineux compris', 'chaque année', 'service-public F22127'],
  ['Stage de formation continue', `${A.formation_continue_heures} heures avant chaque renouvellement de la carte`, 'arrêté du 11 août 2017'],
  ['Carte professionnelle', `renouvelée tous les ${A.carte_validite_ans} ans`, 'service-public F21907'],
  ['Licence gratuite délivrée après 2014', `renouvellement demandé ${X.ads_renouvellement_avant_mois} mois avant la fin des ${X.ads_gratuite_validite_ans} ans`, 'code des transports, L3121-2'],
  ['Exploitation effective et continue de la licence', 'en permanence', 'code des transports, L3121-1-2'],
], 'Échéances d’un artisan taxi')}
<p>Le ${h.a('calendrier-renouvellement', 'calendrier de renouvellement')} calcule les dates de la carte et du stage à partir de votre date de délivrance.</p>

<h2>Les sources de recettes</h2>
<p>L’artisan taxi peut charger des clients hélés dans sa zone ou en station, accepter des réservations, travailler avec des applications qui acceptent les taxis et, s’il remplit les conditions, transporter des patients sous convention avec l’Assurance maladie. Ce dernier marché suppose au moins ${P.cpam.ads_exploitation_ans} ans d’exploitation de la licence et des équipements propres : voir ${h.a('taxi-conventionne', 'taxi conventionné')}. Hors de sa zone, le taxi ne peut prendre en charge qu’un client ayant réservé, comme le rappelle la page ${h.a('devenir-taxi', 'devenir taxi')}.</p>

<h2>Ce qui reste à la fin du mois</h2>
<p>Les recettes d’un artisan dépendent de la ville, des horaires et de la part de courses conventionnées : aucune statistique publique datée ne permet d’en donner une moyenne fiable. Le mini-simulateur part donc de vos recettes et de vos frais. Pour un calcul complet, avec semaines travaillées, carburant, assurance et crédit de licence, utilisez la page ${h.a('salaire-taxi', 'combien gagne un taxi')} et le ${h.a('revenu-net-chauffeur', 'simulateur de revenu net')}. Les montants obtenus sont des estimations à partir de vos hypothèses et des taux officiels 2026, pas des promesses.</p>
`,
  },
  en: {
    slug: 'self-employed-taxi-driver',
    nav: 'Self-employed taxi driver',
    card: 'Status, registration, equipment, duties and tax for the owner-driver of a taxi licence.',
    title: 'Self-Employed Taxi Driver France 2026: Status and Duties',
    description: `Owner-driver taxi in France, 2026: your own licence, RNE registration, micro-enterprise up to ${fe(M.seuil_services, 'en')}, ${formatPercent(T.taux_transport, 0, 'en')} VAT, meter, card terminal and receipts from €${X.note_obligatoire_des}.`,
    h1: 'The self-employed taxi driver (artisan taxi): owning and running your licence',
    intro: 'An artisan taxi is a business owner: the licence, the car, the takings and the risks are all yours.',
    resume: `In France, an artisan taxi is a self-employed driver who runs their own taxi licence. Service-public, the government information site, defines it simply: you own the licence, the profits are entirely yours, and you answer for the car, its upkeep and its insurance. The Crafts Code treats taxi passenger transport as a craft activity and, in article L125-5, points to articles L3121-1 to L3121-12 of the Transport Code. To work you need the professional taxi card, a licence (autorisation de stationnement) that you run personally, and a business registered on the national business register (RNE): micro-enterprise, sole trader, single-member limited company (EURL) or single-shareholder company (SASU) if you start alone. As a micro-entrepreneur, contributions are ${fp(M.taux_bic_services, 'en')} of takings, plus ${fp(M.cfp_artisan, 'en')} for training, up to ${fe(M.seuil_services, 'en')} of turnover in 2026. Passenger transport carries ${formatPercent(T.taux_transport, 0, 'en')} VAT. The car carries a meter, roof light, plate and card terminal, all checked every year.`,
    faqs: [
      { q: 'How does an owner-driver differ from a tenant or employed taxi driver?', a: 'The owner-driver (artisan) owns the licence and runs the business, keeping all profit and bearing all costs. The tenant rents licence and car through a lease of at least one year and pays rent, with no unemployment cover. The employee drives a taxi firm’s car for a fixed wage plus a share of takings. All three need the same professional card from the prefecture.' },
      { q: 'Which business structure suits a self-employed taxi driver in France?', a: `Service-public lists, for someone starting alone, the micro-enterprise, sole trader (entreprise individuelle), EURL or SASU, and SARL or SAS with partners. The micro-enterprise is simplest but deducts no actual costs and stops above ${fe(M.seuil_services, 'en')} of takings in 2026. With a licence bought on credit, the real-profit regime often works out better; the calculator compares both.` },
      { q: 'Where does a taxi owner-driver register the business?', a: 'On the national business register (RNE), through the single online business formalities portal: you create a personal account, then file a business creation formality. The regional chamber of trades (CMA) is the point of contact for craft businesses and can help, since the Crafts Code classes taxi transport as a craft activity. The portal is in French only.' },
      { q: 'What equipment must a French taxi carry?', a: `According to service-public: a meter (taximètre), a roof light showing “taxi” and the name of the town, a plate showing the licence number, a working card payment terminal and a printer connected to the meter. The meter and roof light are checked at each yearly roadworthiness test. A detailed receipt is compulsory for any fare of at least €${X.note_obligatoire_des} including VAT.` },
      { q: 'Does a self-employed taxi driver have to charge VAT?', a: `Not necessarily. Below ${fe(T.franchise_services, 'en')} of turnover in 2026, the small-business exemption means no VAT is charged. Above it, or by choice, passenger transport is taxed at ${formatPercent(T.taux_transport, 0, 'en')} under article 279 of the General Tax Code, and the driver reclaims VAT on purchases. Crossing the higher threshold of ${fe(T.franchise_services_majore, 'en')} brings VAT in straight away.` },
    ],
    body: (h) => `
<h2>What an artisan taxi is</h2>
<p>“Artisan” is not just a figure of speech. The Crafts Code classes taxi passenger transport as a craft activity: its ${h.src('artisanatL125_5', 'article L125-5')} refers to articles L3121-1 to L3121-12 of the Transport Code for the rules. The regional chamber of trades (chambre de métiers et de l’artisanat, CMA) is the natural point of contact for an independent taxi driver.</p>
<p>${h.src('spTaxi', 'Service-public')} sums up the artisan taxi in three points: self-employed, entitled to all the profit, and owner of the licence. The artisan is responsible for the car, its upkeep and its insurance. That sets them apart from the two other ways of working: the tenant, who runs someone else’s licence under lease management, and the employee of a taxi firm. Our page on ${h.a('location-licence-taxi', 'renting a taxi licence')} covers the tenant route.</p>

<h2>Three conditions to set up</h2>
<ol>
<li><strong>The professional taxi card</strong>, obtained after the chamber of trades’ exam, ${h.eur(A.examen_complet)} in 2026, and valid for ${A.carte_validite_ans} years. It is tied to the département where you sat the exam. See ${h.a('examen-taxi', 'the taxi exam')}.</li>
<li><strong>A taxi licence</strong> (autorisation de stationnement), which the artisan runs personally under ${h.src('ctL3121Ads', 'article L3121-1-2 of the Transport Code')}, proving actual and continuous use. A free licence comes from a town-hall waiting list and lasts ${X.ads_gratuite_validite_ans} years, renewable; a bought one costs ${h.eur(X.ads_prix_min)} to ${h.eur(X.ads_prix_max)} according to service-public. See ${h.a('licence-taxi', 'the taxi licence')}.</li>
<li><strong>A registered business</strong> on the national business register.</li>
</ol>

<h2>Choosing a business structure</h2>
<p>Service-public lists the options: for someone starting alone, micro-entrepreneur, sole trader, EURL or SASU; with partners, SARL or SAS. Registration happens online on the business formalities portal: create a personal account, then file a business formality. CMA advisers can help along the way.</p>
${h.table(['Structure', 'Social contributions', 'Actual costs', 'Watch out for'], [
  ['Micro-enterprise', `${h.pct(M.taux_bic_services)} of takings, plus ${h.pct(M.cfp_artisan)} for training (Urssaf)`, 'not deducted', `${h.eur(M.seuil_services)} turnover ceiling in 2026`],
  ['Sole trader on real profit, EURL taxed as income', 'self-employed scale on profit', 'deducted', 'full accounts'],
  ['SASU, SAS', 'employee-like scheme on the director’s pay', 'deducted', 'not modelled on this site'],
], 'Structures listed by service-public; 2026 micro rates from the Urssaf')}
<p>The choice turns mainly on costs. An owner-driver who bought the licence on credit, covers long distances and pays high insurance has heavy costs, and the micro-enterprise ignores them because contributions are charged on takings, according to the ${h.src('urssafAe', 'Urssaf')}, the body that collects them. The calculator compares, for your takings and yearly costs, net income as a micro-entrepreneur and under real profit. The ${h.a('tva-vtc-taxi', 'VAT and status tool')} goes further.</p>

<h2>VAT</h2>
<p>Below ${h.eur(T.franchise_services)} of turnover in 2026, the small-business exemption means no VAT is charged, according to service-public’s page on the ${h.src('spFranchiseTva', 'VAT exemption')}; crossing the higher ${h.eur(T.franchise_services_majore)} threshold ends it at once. Above that, passenger transport is taxed at the ${h.pct(T.taux_transport, 0)} rate in ${h.src('cgi279', 'article 279 of the General Tax Code')}. Being VAT-registered has an upside: reclaiming VAT paid on the car, fuel and servicing, within the limits the rules set.</p>

<h2>Equipment and checks</h2>
<p>Service-public’s page on ${h.src('spTarifsTaxi', 'taxi fares, equipment and display rules')} lists what the car must carry:</p>
<ul>
<li>a meter, measuring the time and distance of each ride;</li>
<li>a roof light showing “taxi” and the name of the home town, green when free, red when taken;</li>
<li>an outside plate with the licence number and the départements covered;</li>
<li>a working card payment terminal;</li>
<li>a printer linked to the meter for receipts.</li>
</ul>
<p>The same page mentions a smartphone connected to the le.taxi service, which has been suspended since ${h.date(X.le_taxi_suspension)}. Meter and roof light are checked at every roadworthiness test, which is yearly. Customers may pay cash or by card whatever the amount. Any fare of at least ${h.eur(X.note_obligatoire_des)} including VAT requires a detailed receipt. Maximum fares for the year are set by order; for 2026, the order of 24 December 2025.</p>

<h2>Recurring duties</h2>
${h.table(['Duty', 'How often', 'Text or source'], [
  ['Roadworthiness test, meter and roof light included', 'every year', 'service-public F22127'],
  ['Continuing training course', `${A.formation_continue_heures} hours before each card renewal`, 'order of 11 August 2017'],
  ['Professional card', `renewed every ${A.carte_validite_ans} years`, 'service-public F21907'],
  ['Free licence issued after 2014', `renewal requested ${X.ads_renouvellement_avant_mois} months before the ${X.ads_gratuite_validite_ans} years run out`, 'Transport Code, L3121-2'],
  ['Actual, continuous use of the licence', 'at all times', 'Transport Code, L3121-1-2'],
], 'An owner-driver’s deadlines')}
<p>The ${h.a('calendrier-renouvellement', 'renewal calendar')} works out card and course dates from your issue date.</p>

<h2>Where the fares come from</h2>
<p>An owner-driver can pick up passengers hailing in the licensed area or at a rank, take bookings, work with apps that accept taxis and, if eligible, carry patients under a health insurance agreement. That last market requires at least ${P.cpam.ads_exploitation_ans} years of running the licence and specific equipment; see ${h.a('taxi-conventionne', 'CPAM-approved taxis')}. Outside the licensed area, a taxi may only pick up a customer who booked in advance, as our page on ${h.a('devenir-taxi', 'becoming a taxi driver')} explains.</p>

<h2>What is left at the end of the month</h2>
<p>An owner-driver’s takings depend on the city, the hours worked and the share of patient transport, and no dated public statistic gives a reliable average. The calculator therefore starts from your own takings and costs. For a full calculation, with weeks worked, fuel, insurance and licence loan, use our page on ${h.a('salaire-taxi', 'how much a taxi driver earns')} and the ${h.a('revenu-net-chauffeur', 'net income calculator')}. The results are estimates from your assumptions and the official 2026 rates, not promises.</p>
`,
  },
});
