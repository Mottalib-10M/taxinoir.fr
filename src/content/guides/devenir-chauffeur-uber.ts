import { defineGuide } from '../../lib/guide-types';
import { P } from '../../lib/engine/params';
import { displayDate, formatMoney } from '../../lib/format';

const A = P.acces;
const PF = P.plateformes;
const PL = P.plateformes_publiees;
const T = P.tva;
const dfr = (iso: string) => displayDate(iso, 'fr-FR');
const den = (iso: string) => displayDate(iso, 'en-GB');
const fe = (n: number, l: 'fr' | 'en') => formatMoney(n, 0, l);

export default defineGuide({
  id: 'devenir-chauffeur-uber',
  group: 'vtc',
  order: 120,
  mini: 'uberNet',
  related: ['devenir-chauffeur-vtc', 'devenir-chauffeur-bolt', 'devenir-chauffeur-heetch', 'salaire-chauffeur-vtc', 'voiture-vtc', 'revenu-net-chauffeur'],
  sources: ['uberConditions', 'uberVehicules', 'spVtc', 'ctR1326', 'arpeRevenuCourse', 'arpeRevenuHoraire', 'arpeDesactivation'],
  fr: {
    slug: 'devenir-chauffeur-uber',
    nav: 'Devenir chauffeur Uber',
    card: 'Les étapes publiées par Uber, la carte VTC, le véhicule et les garanties de revenu.',
    title: 'Devenir chauffeur Uber 2026 : étapes, carte VTC et véhicule',
    description: `Devenir chauffeur Uber en 2026 : carte VTC, ${PL.uber_etapes} étapes publiées par Uber, véhicule sans diesel, ${fe(PF.revenu_min_course, 'fr')} net minimum par course (accords ARPE). Site indépendant.`,
    h1: 'Devenir chauffeur Uber : ce que publie Uber, ce qu’impose la loi',
    intro: 'Uber est une plateforme de réservation, pas un employeur ni une autorité : la carte et le registre restent l’affaire de l’État.',
    resume: `Pour conduire avec Uber en France, il faut d’abord être chauffeur VTC au sens de la loi : carte professionnelle obtenue après l’examen des chambres de métiers, entreprise inscrite au registre des VTC, véhicule conforme et assurances. Uber décrit ensuite, sur sa page de conditions consultée le ${dfr(PL.consulte_le)}, un parcours en ${PL.uber_etapes} étapes : créer un compte chauffeur, prendre rendez-vous dans un espace d’accueil partenaire, obtenir la carte VTC, créer sa société, s’immatriculer à la TVA, trouver un véhicule, assurer l’activité et la voiture, s’inscrire au registre et commander la signalétique. Un chauffeur rattaché à un gestionnaire de flotte ne fait que les ${PL.uber_etapes_flotte} premières. Côté véhicule, Uber n’accepte plus de diesel depuis le ${dfr(PL.uber_diesel_fin)}. Uber ne publie pas de taux de commission sur ces pages ; les accords ARPE garantissent en revanche ${fe(PF.revenu_min_course, 'fr')} net par course au minimum. Site indépendant, non affilié à Uber.`,
    faqs: [
      { q: 'Peut-on conduire pour Uber sans carte VTC ?', a: 'Non. La carte professionnelle de conducteur de VTC est une obligation légale, délivrée par la préfecture après la réussite à l’examen des chambres de métiers et de l’artisanat. Uber la place d’ailleurs parmi les étapes obligatoires de sa page de conditions. Depuis le 12 août 2026, l’accès par l’expérience professionnelle est fermé : l’examen est la seule voie pour une nouvelle demande.' },
      { q: 'Quelle commission Uber prend-elle sur une course ?', a: 'Uber ne publie pas de taux de commission sur ses pages de conditions et de véhicules consultées le 4 octobre 2026, et nous n’en inventons pas. La loi oblige la plateforme à indiquer, avant que vous acceptiez une course, la distance et le prix minimal garanti après déduction de sa commission. Le mini-simulateur laisse le taux en hypothèse : lisez le vôtre sur vos relevés et remplacez la valeur proposée.' },
      { q: 'Faut-il obligatoirement créer une société pour rouler avec Uber ?', a: `Uber écrit « créer une société » dans ses étapes pour les indépendants. Juridiquement, une micro-entreprise immatriculée au registre national des entreprises permet aussi d’exercer, et Heetch ou Bolt l’acceptent explicitement. L’étape d’immatriculation à la TVA citée par Uber s’articule avec la franchise en base, valable jusqu’à ${fe(T.franchise_services, 'fr')} de chiffre d’affaires en 2026. Le choix du statut se fait avec l’outil TVA et statuts.` },
      { q: 'Quel revenu minimum Uber doit-il verser à un chauffeur VTC ?', a: `Les accords conclus sous l’égide de l’ARPE, applicables aux plateformes de VTC, garantissent au chauffeur au moins ${fe(PF.revenu_min_course, 'fr')} net par course, ${fe(PF.revenu_min_heure, 'fr')} par heure travaillée et ${fe(PF.revenu_min_km, 'fr')} par kilomètre parcouru en course, selon service-public. Ces planchers ne disent rien du revenu mensuel, qui dépend des heures, des frais et des cotisations : le mini-simulateur l’estime à partir de vos hypothèses.` },
      { q: 'Que se passe-t-il si Uber désactive mon compte chauffeur ?', a: 'L’accord du 19 septembre 2023 signé entre organisations de chauffeurs et de plateformes, présenté par l’ARPE, prévoit que les chauffeurs soient informés des circonstances pouvant entraîner une restriction, une suspension ou une résiliation, un mécanisme d’alerte permettant de présenter ses observations avant la décision, et un dédommagement en cas de suspension due à une erreur manifeste de la plateforme.' },
    ],
    body: (h) => `
<p><strong>Site indépendant.</strong> taxinoir.fr n’est ni affilié à Uber, ni partenaire, ni rémunéré par la plateforme ; Uber est une marque de son propriétaire. Les informations ci-dessous reprennent les pages publiées par Uber, consultées le ${h.date(PL.consulte_le)}, et des textes officiels. Elles sont indicatives et peuvent changer : vérifiez-les auprès d’Uber avant toute décision.</p>

<h2>Ce qu’Uber est, et ce qu’il n’est pas</h2>
<p>Uber met en relation des clients et des chauffeurs indépendants. Service-public le range parmi les centrales de réservation, avec d’autres applications. La plateforme ne délivre ni la carte, ni l’inscription au registre, ni l’autorisation d’exercer : ce sont la préfecture, la chambre de métiers et le ministère des Transports qui le font. Tout le socle légal se trouve dans le ${h.a('devenir-chauffeur-vtc', 'parcours pour devenir VTC')} ; cette page s’en tient à ce qu’Uber ajoute.</p>

<h2>Les étapes publiées par Uber</h2>
<p>La ${h.src('uberConditions', 'page de conditions d’Uber')} décrit ${PL.uber_etapes} étapes pour un chauffeur indépendant :</p>
<ol>
<li>créer un compte chauffeur ;</li>
<li>prendre rendez-vous dans un espace d’accueil partenaire ;</li>
<li>obtenir la carte professionnelle VTC ;</li>
<li>créer une société ;</li>
<li>procéder à son immatriculation à la TVA ;</li>
<li>trouver un véhicule ;</li>
<li>assurer son activité et son véhicule ;</li>
<li>s’inscrire au registre VTC ;</li>
<li>commander la signalétique VTC pour ses véhicules.</li>
</ol>
<p>La même page précise qu’un chauffeur qui souhaite être rattaché à un gestionnaire de flotte n’effectue que les ${PL.uber_etapes_flotte} premières étapes, puis trouve un gestionnaire. C’est alors l’entreprise du gestionnaire qui détient le véhicule, l’assurance et l’inscription au registre.</p>
<p>Uber indique aussi des conditions générales : avoir l’âge minimum pour conduire dans sa ville, une autorisation de transport, un mode de transport admissible, les documents requis et un permis valide.</p>

<h2>Lire ces étapes avec les textes</h2>
<p>Trois points méritent une lecture attentive.</p>
<h3>La carte vient avant tout le reste</h3>
<p>L’étape 3 conditionne toutes les suivantes. Elle suppose l’examen des chambres de métiers, ${h.eur(A.examen_complet)} en 2026, puis la demande en ligne de la carte, environ ${h.eur(A.carte_pro_environ)}. Depuis le ${h.date(A.equivalence_fin)}, l’équivalence par l’expérience est fermée. Les détails sont sur les pages ${h.a('examen-vtc', 'examen VTC')} et ${h.a('carte-vtc', 'carte VTC')}.</p>
<h3>« Créer une société »</h3>
<p>L’expression d’Uber recouvre toute forme d’entreprise. La loi n’impose pas de société : une micro-entreprise suffit, et Heetch comme Bolt l’acceptent expressément dans leurs propres pages. L’immatriculation à la TVA, citée à l’étape 5, s’articule avec la franchise en base : sous ${h.eur(T.franchise_services)} de chiffre d’affaires en 2026, on peut ne pas facturer la TVA, au-delà le taux du transport de voyageurs est de ${h.pct(T.taux_transport, 0)}. L’${h.a('tva-vtc-taxi', 'outil TVA et statuts')} compare les options.</p>
<h3>Assurance et registre</h3>
<p>Uber écrit que l’assurance RC exploitation et l’assurance RC circulation sont toutes deux obligatoires. L’inscription au registre coûte ${h.eur(A.registre_inscription)} et demande, pour chaque véhicule, soit la propriété, soit une location de plus de ${A.location_longue_mois} mois, soit une garantie de ${h.eur(A.garantie_financiere_par_vehicule)}. Voir ${h.a('assurance-vtc', 'assurance VTC')} et ${h.a('registre-vtc', 'registre VTC')}.</p>

<h2>Le véhicule selon Uber</h2>
<p>La ${h.src('uberVehicules', 'page des critères véhicules')} d’Uber ajoute ses règles à l’arrêté du 26 mars 2015 :</p>
<ul>
<li>hybrides essence et électriques acceptés, conformément à la réglementation ;</li>
<li>depuis le ${h.date(PL.uber_diesel_fin)}, plus aucun diesel ni hybride diesel ;</li>
<li>catégories Comfort, Berline et Van limitées à ${PL.uber_berline_age_max_ans} ans glissants ;</li>
<li>à Paris, la catégorie Green est réservée aux voitures 100 % électriques depuis le ${h.date(PL.uber_paris_electrique)}.</li>
</ul>
<p>Le guide pour ${h.a('voiture-vtc', 'choisir sa voiture VTC')} compare ces règles avec celles des autres plateformes et chiffre le coût au kilomètre.</p>

<h2>Ce que la loi garantit au chauffeur de plateforme</h2>
<p>Les relations entre chauffeurs et plateformes sont encadrées par les ${h.src('ctR1326', 'articles R1326-1 à R1326-10 du code des transports')}. Avant chaque proposition de course, la plateforme doit communiquer de façon claire et loyale la distance et le prix minimal garanti, c’est-à-dire ce qui revient au chauffeur après déduction de la commission ; si la destination est inconnue, elle doit le dire. Elle publie aussi chaque année, au 1er mars, ${PL.r1326_indicateurs} indicateurs sur l’activité de l’année précédente : durée moyenne d’une course, revenu moyen, temps d’attente moyen, ventilés par tranches d’activité.</p>
<p>Des accords conclus sous l’égide de l’ARPE, l’autorité des relations sociales des plateformes, fixent des planchers rappelés par service-public :</p>
${h.table(['Garantie', 'Montant', 'Texte'], [
  ['Revenu minimal par course', h.eur(PF.revenu_min_course), h.src('arpeRevenuCourse', 'avenant du 19 décembre 2023')],
  ['Revenu minimal par heure travaillée', h.eur(PF.revenu_min_heure), h.src('arpeRevenuHoraire', 'accord du 19 décembre 2023')],
  ['Revenu minimal par kilomètre en course', h.eur(PF.revenu_min_km), 'même accord'],
], 'Planchers applicables aux plateformes de VTC')}
<p>Un troisième accord, présenté par l’ARPE dans son ${h.src('arpeDesactivation', 'communiqué du 19 septembre 2023')}, encadre la suspension et la désactivation des comptes : information détaillée sur les motifs possibles, alerte préalable permettant de présenter ses observations, dédommagement en cas d’erreur manifeste de la plateforme.</p>

<h2>Ce que vous gagnerez : une estimation, jamais une promesse</h2>
<p>Uber ne publie pas de taux de commission sur les pages consultées. Le mini-simulateur part donc de trois hypothèses que vous seul pouvez fixer : le nombre de courses, le prix moyen payé par le client et la commission lue sur vos relevés. Il calcule ce qui vous revient par course, le compare au plancher de ${h.eur(PF.revenu_min_course)}, puis estime un net mensuel avec des frais de véhicule d’exemple et les cotisations de la micro-entreprise. Les chiffres affichés sont des estimations du simulateur, pas des données d’Uber.</p>
<p>Pour aller plus loin, la page ${h.a('salaire-chauffeur-vtc', 'combien gagne un chauffeur VTC')} détaille la mécanique, et le ${h.a('revenu-net-chauffeur', 'simulateur complet')} laisse modifier chaque frais. Pour comparer les plateformes entre elles, voyez aussi ${h.a('devenir-chauffeur-bolt', 'devenir chauffeur Bolt')} et ${h.a('devenir-chauffeur-heetch', 'devenir chauffeur Heetch')}.</p>
`,
  },
  en: {
    slug: 'become-uber-driver-france',
    nav: 'Becoming an Uber driver',
    card: 'Uber’s published steps, the VTC card, the car and the income floors.',
    title: 'Become an Uber Driver in France 2026: Steps, VTC Card, Car',
    description: `Driving for Uber in France, 2026: VTC card first, the ${PL.uber_etapes} steps Uber publishes, no diesel, at least ${fe(PF.revenu_min_course, 'en')} net per ride under ARPE agreements. Independent site.`,
    h1: 'Driving for Uber in France: what Uber publishes and what the law requires',
    intro: 'Uber is a booking platform, not an employer or a licensing body: the card and the register stay in the state’s hands.',
    resume: `To drive with Uber in France you first have to be a VTC driver in the legal sense: a professional card obtained after the chambers of trades’ exam, a business listed on the VTC register, a compliant car and insurance. Uber then describes, on its requirements page read on ${den(PL.consulte_le)}, a nine-step route: create a driver account, book an appointment at a partner welcome centre, obtain the VTC card, set up a company, register for VAT, find a car, insure the business and the car, join the VTC register and order the stickers. A driver attached to a fleet manager only does the first ${PL.uber_etapes_flotte}. On cars, Uber has accepted no diesel since ${den(PL.uber_diesel_fin)}. Uber publishes no commission rate on those pages; agreements under the ARPE (the platform labour relations authority) do guarantee at least ${fe(PF.revenu_min_course, 'en')} net per ride. This is an independent site, not affiliated with Uber.`,
    faqs: [
      { q: 'Can I drive for Uber in France with a foreign private-hire licence?', a: 'No. Uber requires the French professional VTC card, issued by the prefecture after passing the exam run by the chambers of trades (CMA). A London PCO licence or a US rideshare approval does not count. Since 12 August 2026, the work-experience route has also closed, so the French exam is the only way in for a new application.' },
      { q: 'What commission does Uber take in France?', a: 'Uber does not state a commission rate on the requirements and vehicle pages we read on 4 October 2026, and we will not guess one. French law does require the platform to show you, before you accept a ride, the distance and the minimum guaranteed price after its commission. The calculator treats the rate as your assumption: read yours on your statements and replace the suggested figure.' },
      { q: 'Does Uber require a limited company rather than sole trader status?', a: `Uber’s steps say “set up a company”. Legally, a micro-enterprise registered on the national business register also lets you work, and Heetch and Bolt accept it in so many words. The VAT registration step Uber mentions sits alongside the small-business exemption, which applies up to ${fe(T.franchise_services, 'en')} of turnover in 2026. Our VAT and status tool helps you choose.` },
      { q: 'Is there a legal minimum Uber must pay per ride in France?', a: `Yes. Agreements reached under the ARPE, which apply to VTC platforms, guarantee at least ${fe(PF.revenu_min_course, 'en')} net per ride, ${fe(PF.revenu_min_heure, 'en')} per hour worked and ${fe(PF.revenu_min_km, 'en')} per kilometre driven on a ride, according to service-public. These floors say nothing about monthly income, which depends on hours, costs and contributions; the calculator estimates it from your assumptions.` },
      { q: 'What protection do I have if Uber deactivates my account?', a: 'The agreement of 19 September 2023 between driver and platform organisations, announced by the ARPE, provides for detailed information on what can lead to restriction, suspension or termination, an early-warning step letting the driver respond before any decision, and compensation when a suspension results from an obvious error by the platform. It applies to VTC platforms operating in France.' },
    ],
    body: (h) => `
<p><strong>Independent site.</strong> taxinoir.fr is not affiliated with, partnered with or paid by Uber; Uber is a trademark of its owner. What follows draws on pages published by Uber, read on ${h.date(PL.consulte_le)}, and on official texts. It is for guidance only and may change: check with Uber before making any decision.</p>

<h2>What Uber is, and what it is not</h2>
<p>Uber connects riders with independent drivers. Service-public lists it among booking platforms (centrales de réservation), alongside other apps. Uber does not issue the card, the register entry or the right to work: the prefecture, the chamber of trades and the Ministry of Transport do. The legal groundwork is in our ${h.a('devenir-chauffeur-vtc', 'guide to becoming a VTC driver')}; this page sticks to what Uber adds.</p>

<h2>The steps Uber publishes</h2>
<p>${h.src('uberConditions', 'Uber’s requirements page')} sets out ${PL.uber_etapes} steps for a self-employed driver:</p>
<ol>
<li>create a driver account;</li>
<li>book an appointment at a partner welcome centre;</li>
<li>obtain the professional VTC card;</li>
<li>set up a company;</li>
<li>register for VAT;</li>
<li>find a car;</li>
<li>insure the business and the car;</li>
<li>join the VTC register;</li>
<li>order VTC stickers for each car.</li>
</ol>
<p>The same page says a driver who wants to work under a fleet manager completes only the first ${PL.uber_etapes_flotte} steps and then finds a manager. The manager’s company then holds the car, the insurance and the register entry, which is often how newcomers to France start out.</p>
<p>Uber also lists general conditions: being old enough to drive in your city, holding a transport authorisation, an eligible vehicle, the required documents and a valid driving licence.</p>

<h2>Reading those steps against the law</h2>
<p>Three points deserve a careful look.</p>
<h3>The card comes before everything</h3>
<p>Step 3 gates all the others. It means passing the chambers of trades’ exam, ${h.eur(A.examen_complet)} in 2026, then applying online for the card, about ${h.eur(A.carte_pro_environ)}. Since ${h.date(A.equivalence_fin)}, recognition of experience has closed. The exam includes a French paper, so non-native speakers should prepare for it. See our pages on the ${h.a('examen-vtc', 'VTC exam')} and the ${h.a('carte-vtc', 'VTC card')}.</p>
<h3>“Set up a company”</h3>
<p>Uber’s wording covers any form of business. The law does not demand a company: a micro-enterprise is enough, and Heetch and Bolt accept it explicitly on their own pages. VAT registration, step 5, interacts with the small-business exemption: below ${h.eur(T.franchise_services)} of turnover in 2026 you may charge no VAT; above it, passenger transport is taxed at ${h.pct(T.taux_transport, 0)}. The ${h.a('tva-vtc-taxi', 'VAT and status tool')} compares the options.</p>
<h3>Insurance and the register</h3>
<p>Uber states that both RC exploitation and RC circulation insurance are compulsory. The register costs ${h.eur(A.registre_inscription)} and requires, for each car, ownership, a rental of more than ${A.location_longue_mois} months or a ${h.eur(A.garantie_financiere_par_vehicule)} guarantee. See ${h.a('assurance-vtc', 'VTC insurance')} and ${h.a('registre-vtc', 'the VTC register')}.</p>

<h2>Cars, according to Uber</h2>
<p>Uber’s ${h.src('uberVehicules', 'vehicle requirements page')} adds its own rules to the order of 26 March 2015:</p>
<ul>
<li>petrol hybrids and electric cars accepted, in line with the regulation;</li>
<li>no diesel or diesel hybrid since ${h.date(PL.uber_diesel_fin)};</li>
<li>Comfort, Berline and Van categories capped at a rolling ${PL.uber_berline_age_max_ans} years;</li>
<li>in Paris, the Green category has been fully electric only since ${h.date(PL.uber_paris_electrique)}.</li>
</ul>
<p>Our guide to ${h.a('voiture-vtc', 'choosing a VTC car')} sets these rules beside other platforms’ and works out the cost per kilometre.</p>

<h2>What the law guarantees platform drivers</h2>
<p>Relations between drivers and platforms are framed by ${h.src('ctR1326', 'articles R1326-1 to R1326-10 of the Transport Code')}. Before each ride offer, the platform must state clearly and fairly the distance and the minimum guaranteed price, meaning what reaches the driver after commission; if the destination is unknown, it must say so. Every 1 March it also publishes ${PL.r1326_indicateurs} indicators on the previous year: average ride duration, average income, average waiting time, broken down by activity band.</p>
<p>Agreements reached under the ARPE set floors, which service-public summarises:</p>
${h.table(['Guarantee', 'Amount', 'Text'], [
  ['Minimum income per ride', h.eur(PF.revenu_min_course), h.src('arpeRevenuCourse', 'amendment of 19 December 2023')],
  ['Minimum income per hour worked', h.eur(PF.revenu_min_heure), h.src('arpeRevenuHoraire', 'agreement of 19 December 2023')],
  ['Minimum income per kilometre on a ride', h.eur(PF.revenu_min_km), 'same agreement'],
], 'Floors that apply to VTC platforms')}
<p>A third agreement, announced in the ARPE’s ${h.src('arpeDesactivation', 'press release of 19 September 2023')}, covers suspension and deactivation: detailed information on possible grounds, an advance alert so the driver can respond, and compensation after an obvious platform error.</p>

<h2>What you will earn: an estimate, never a promise</h2>
<p>Uber publishes no commission rate on the pages we read. The calculator therefore starts from three assumptions only you can set: rides per week, the average fare paid by riders and the commission shown on your statements. It works out what reaches you per ride, compares it with the ${h.eur(PF.revenu_min_course)} floor, then estimates a monthly net figure using example car costs and micro-enterprise contributions. Every figure is the calculator’s estimate, not Uber data.</p>
<p>For the full mechanics, see ${h.a('salaire-chauffeur-vtc', 'how much a VTC driver earns')}, and the ${h.a('revenu-net-chauffeur', 'full calculator')} lets you change each cost. To compare platforms, read ${h.a('devenir-chauffeur-bolt', 'driving for Bolt')} and ${h.a('devenir-chauffeur-heetch', 'driving for Heetch')} too.</p>
`,
  },
});
