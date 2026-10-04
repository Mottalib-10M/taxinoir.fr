/** Accueil (page pilier) : texte des deux langues. Rendu par components/HomePage.astro. */
import { P } from '../lib/engine/params';
import type { PageText } from '../lib/guide-types';

const A = P.acces, M = P.micro, V = P.tva, Tx = P.taxi, Am = P.ambulancier, E = P.examen, G = P.plateformes;
const fixeVtc = A.examen_complet + A.carte_pro_environ + A.registre_inscription + A.vignette_environ;

export const HOME: Record<'fr' | 'en', Omit<PageText, 'slug' | 'card'>> = {
  fr: {
    nav: 'Accueil',
    title: 'Devenir chauffeur VTC, taxi ou ambulancier en 2026 : guide',
    description: `Devenir chauffeur VTC, taxi ou ambulancier en 2026 : examen ${A.examen_complet} €, carte, registre, licence, diplôme d’État, simulateur du revenu net. Textes officiels cités.`,
    h1: 'Devenir chauffeur de taxi, de VTC ou ambulancier en France',
    intro: 'Les étapes dans l’ordre, chaque règle reliée à son texte, et des simulateurs pour chiffrer votre propre cas. Aucun centre de formation à vendre.',
    resume: `Trois métiers transportent des passagers en France, avec trois portes d’entrée différentes. Le chauffeur VTC et le chauffeur de taxi passent le même examen écrit devant les chambres de métiers et de l’artisanat, ${A.examen_complet} € en 2026, puis demandent une carte professionnelle valable ${A.carte_validite_ans} ans ; le VTC s’inscrit ensuite au registre des VTC (${A.registre_inscription} €) et roule sur réservation, tandis que le taxi a besoin d’une licence, l’autorisation de stationnement, qui lui ouvre la maraude. L’ambulancier suit une autre voie : un diplôme d’État de ${Am.dea_heures} heures, ou une formation d’auxiliaire de ${Am.auxiliaire_heures} heures, puis un emploi salarié. Depuis le 12 août 2026, l’examen est la seule façon de devenir VTC : l’accès par l’expérience a été supprimé. Ce site suit ce parcours étape par étape, cite pour chaque règle l’article ou la fiche officielle qui la fonde, et calcule ce qui reste au chauffeur une fois payés la TVA, la commission, le véhicule et les cotisations.`,
    faqs: [
      { q: 'Faut-il un diplôme pour devenir chauffeur VTC ou taxi ?', a: `Non. L’examen des chambres de métiers est ouvert quel que soit le niveau d’études, et la formation préparatoire n’est pas obligatoire. Il faut en revanche un permis B depuis ${A.permis_anciennete_ans} ans (${A.permis_conduite_accompagnee_ans} ans après une conduite accompagnée), un casier compatible, l’avis favorable d’un médecin agréé et, pour le taxi, une formation aux premiers secours de moins de ${A.psc1_validite_ans} ans.` },
      { q: 'Combien de temps faut-il pour devenir VTC ?', a: 'Aucun texte ne fixe de durée totale : elle dépend du calendrier des sessions de votre région, de votre préparation et des délais de votre préfecture. Les jalons connus sont l’écrit puis la pratique, la carte demandée en ligne après l’attestation de réussite, et l’inscription au registre, que le code des transports fait intervenir au plus tard deux mois après un dossier complet.' },
      { q: 'Taxi ou VTC : lequel rapporte le plus ?', a: 'Aucune statistique publique fiable ne permet de répondre en général. Le taxi peut prendre des clients dans la rue et appliquer des tarifs réglementés, mais il doit trouver une licence, gratuite après une longue attente, louée ou achetée. Le VTC démarre plus vite, fixe ses prix librement et dépend souvent d’une commission de plateforme. Le simulateur compare les deux sur vos propres chiffres.' },
      { q: 'Peut-on être chauffeur VTC en étant salarié ?', a: 'Oui : une entreprise inscrite au registre peut employer des conducteurs titulaires de la carte, et depuis le 27 juin 2026 elle doit les déclarer au registre avec le numéro de leur carte. Prêter ou louer son inscription à un autre chauffeur est interdit : la loi requalifie cette mise à disposition en contrat de travail et prévoit la radiation de l’exploitant.' },
      { q: 'Le revenu affiché par vos simulateurs est-il garanti ?', a: `Non. C’est une estimation calculée à partir de vos hypothèses (courses, prix, commission, frais) et des taux officiels de 2026 : ${(M.taux_bic_services * 100).toLocaleString('fr-FR')} % de cotisations en micro-entreprise, TVA de ${Math.round(V.taux_transport * 100)} % au-delà du seuil de franchise, barème de l’Urssaf au réel. Ce n’est ni une promesse de gain, ni un conseil personnalisé. Pour votre cas, un expert-comptable ou l’Urssaf font foi.` },
      { q: 'Ce site est-il lié à Uber, à une centrale de taxis ou à un centre de formation ?', a: 'Non. Taxinoir est édité par Radif Partners, sans lien avec une administration, une plateforme de réservation, une centrale de taxis, un assureur ou un centre de formation. Nous ne vendons aucun contact et ne recevons aucune commission. Les marques citées appartiennent à leurs propriétaires et les informations sur les plateformes sont indicatives, à vérifier auprès d’elles.' },
    ],
    body: (h) => `
<h2>Trois métiers, trois portes d’entrée</h2>
<p>Avant de choisir une formation ou un véhicule, il faut savoir par quelle porte on entre. Le tableau résume ce qui distingue les trois métiers, tel que le décrivent les fiches de service-public et les textes cités en bas de page.</p>
${h.table(['', 'VTC', 'Taxi', 'Ambulancier'], [
  ['Accès', `examen T3P (${h.eur(A.examen_complet)})`, `examen T3P (${h.eur(A.examen_complet)})`, `diplôme d’État (${Am.dea_heures} h) ou auxiliaire (${Am.auxiliaire_heures} h)`],
  ['Titre à obtenir', `carte professionnelle, ${A.carte_validite_ans} ans, toute la France`, 'carte professionnelle, dans le département de l’examen', 'diplôme, puis contrat de travail'],
  ['Autorisation d’exploiter', `registre des VTC, ${h.eur(A.registre_inscription)}`, 'licence (ADS) gratuite, louée ou achetée', 'celle de l’entreprise de transport sanitaire'],
  ['Clients', 'sur réservation préalable uniquement', 'maraude dans sa zone, réservation ailleurs', 'patients, sur prescription'],
  ['Prix', 'libres', 'réglementés', 'facturés par l’employeur'],
  ['Statut le plus courant', 'indépendant', 'artisan, locataire ou salarié', 'salarié'],
], 'Sources : service-public F31027 et F21907, arrêté du 11 avril 2022')}

<h2>Le parcours VTC, dans l’ordre</h2>
<p>Le chemin d’un futur VTC tient en sept étapes, chacune détaillée sur sa page :</p>
<ol>
<li>Vérifier les conditions : permis, casier, visite chez un médecin agréé.</li>
<li>Se préparer, avec ou sans ${h.a('formation-vtc', 'formation VTC')}.</li>
<li>Réussir l’${h.a('examen-vtc', 'examen T3P')} : sept épreuves écrites, puis une épreuve de conduite.</li>
<li>Demander la ${h.a('carte-vtc', 'carte professionnelle')} en ligne.</li>
<li>Créer son entreprise, dans le secteur de l’artisanat.</li>
<li>S’inscrire au ${h.a('registre-vtc', 'registre des VTC')}.</li>
<li>Équiper un ${h.a('vehicule-vtc', 'véhicule conforme')} de sa vignette.</li>
</ol>
<p>Le pilier ${h.a('devenir-chauffeur-vtc', 'devenir chauffeur VTC')} les enchaîne avec les pièges de chaque étape. Une étape a disparu en 2026 : la ${h.a('carte-vtc-equivalence', 'carte par équivalence')}, fermée le 12 août pour toute demande nouvelle par le décret n° 2026-764.</p>
<p>Avant la première course, les frais réglementés d’un VTC atteignent ${h.eur(fixeVtc)}, sans compter la formation, le médecin et le véhicule. Le ${h.a('cout-acces-metier', 'simulateur de coût d’accès')} ajoute vos propres devis.</p>

<h2>Le parcours taxi et la question de la licence</h2>
<p>Le futur taxi passe le même tronc commun que le VTC. Deux épreuves lui sont propres, dont une sur la connaissance de son territoire et la réglementation locale, et l’épreuve pratique note aussi la facturation et l’usage des équipements du taxi : la page ${h.a('examen-taxi', 'examen taxi')} les détaille. Sa carte ne vaut que dans le département de l’examen, sauf mobilité vers ${Tx.mobilite_max_departements} départements au plus après un stage.</p>
<p>La vraie difficulté est la ${h.a('licence-taxi', 'licence')}. Une licence gratuite s’obtient en mairie après une liste d’attente souvent longue dans les grandes villes ; délivrée depuis le 1er octobre 2014, elle ne se revend pas et dure ${Tx.ads_gratuite_validite_ans} ans renouvelables. Une licence achetée coûte entre ${h.eur(Tx.ads_prix_min)} et ${h.eur(Tx.ads_prix_max)} selon service-public, environ ${h.eur(Tx.ads_prix_paris_environ)} à Paris. Une licence louée coûte environ ${h.eur(Tx.ads_loyer_paris_mois_environ)} par mois à Paris. Le ${h.a('devenir-taxi', 'guide pour devenir taxi')} compare les trois statuts qui en découlent : artisan, locataire ou salarié.</p>

<h2>Ambulancier : une formation, puis un emploi</h2>
<p>L’ambulancier ne relève pas du transport public particulier de personnes et ne passe pas l’examen des chambres de métiers. Il entre dans le métier par un institut de formation, après une sélection sur dossier et entretien, pour un diplôme d’État de ${Am.dea_heures} heures dont ${Am.dea_heures_stage} de stage. La formation d’auxiliaire ambulancier, de ${Am.auxiliaire_heures} heures, permet de travailler plus vite au sein d’un équipage. La ${h.a('formation-ambulancier', 'formation')}, le ${h.a('devenir-ambulancier', 'parcours')} et le ${h.a('salaire-ambulancier', 'salaire conventionnel')} ont chacun leur page. Point d’attention : les taux horaires d’embauche des niveaux 1 et 2 de la grille de 2025 sont inférieurs au Smic de 2026, qui s’applique donc à leur place.</p>

<h2>Ce qui reste au chauffeur</h2>
<p>Un chauffeur indépendant n’a pas de salaire : il a un chiffre d’affaires, dont il retire tout le reste. Le ${h.a('revenu-net-chauffeur', 'simulateur de revenu net')} fait ces retraits dans l’ordre où ils tombent réellement.</p>
<ul>
<li>La TVA à ${h.pct(V.taux_transport, 0)}, dès que le chiffre d’affaires dépasse ${h.eur(V.franchise_services)} dans l’année.</li>
<li>La commission de la plateforme, pour un VTC qui en utilise une.</li>
<li>Le véhicule : crédit ou location, carburant, assurance, entretien.</li>
<li>La licence, pour un taxi locataire ou acheteur à crédit.</li>
<li>Les cotisations sociales : ${h.pct(M.taux_bic_services)} du chiffre d’affaires en micro-entreprise, ou le barème de l’Urssaf sur le bénéfice au réel.</li>
</ul>
<p>Rapporté aux heures réellement passées au volant, attente comprise, ce reste devient un net horaire, le seul chiffre qui se compare à un salaire. Les pages ${h.a('salaire-chauffeur-vtc', 'combien gagne un VTC')} et ${h.a('salaire-taxi', 'combien gagne un taxi')} l’appliquent à des cas types, et le ${h.a('tva-vtc-taxi', 'comparateur TVA et statut')} dit si la micro-entreprise ou le réel vous laisse davantage.</p>
<!--mini:gainTaxi-->

<h2>Pourquoi nos chiffres viennent du texte, et pas d’un autre site</h2>
<p>Sur ces requêtes, une grande partie des pages en tête de Google est écrite par des centres de formation, des sociétés de création d’entreprise ou des assureurs : leur intérêt est de vendre une inscription, un statut ou un contrat. Nous ne vendons rien de tout cela, et nous avons construit le site sur une règle simple : chaque valeur réglementaire est lue sur sa source officielle et écrite une seule fois, dans un fichier de paramètres daté. Toutes les pages et tous les simulateurs la lisent de là.</p>
<p>Le moteur de calcul est vérifié par des tests automatiques : les cotisations minimales et maximales publiées par l’Urssaf pour 2026, les seuils de franchise de TVA, les critères de l’arrêté sur les véhicules et le barème de l’examen sont rejoués à chaque compilation. Si l’un d’eux dévie, le site ne se publie pas. La ${h.a('method', 'méthode')} détaille ces contrôles et ce que les simulateurs ne savent pas faire.</p>
<p>Ce choix a un effet visible : quand un texte change, le site change le jour même. L’accès au métier de VTC par l’expérience a été fermé le 12 août 2026, et beaucoup de pages expliquent encore comment l’obtenir. Ici, la règle en vigueur s’affiche avec sa date et son décret.</p>

<h2>Ce qui a changé en 2026</h2>
${h.table(['Date', 'Changement', 'Où le lire'], [
  ['1er janvier 2026', `Seuil de la micro-entreprise porté à ${h.eur(M.seuil_services)} pour les services ; examen T3P à ${h.eur(A.examen_complet)}`, 'Urssaf, CMA'],
  ['Avril 2026', 'Nouvelle assiette des cotisations des indépendants : abattement de 26 %', 'Urssaf'],
  ['12 juin 2026', 'Suspension du service le.taxi', 'service-public, F21907'],
  ['27 juin 2026', 'Sanctions pénales renforcées ; déclaration des conducteurs et des plaques au registre', 'service-public, F31027'],
  ['12 août 2026', 'Fin de l’accès au métier de VTC par l’expérience professionnelle', 'décret n° 2026-764'],
  ['1er janvier 2027', 'Géolocalisation et facturation électronique obligatoires pour les taxis conventionnés', 'service-public, F21907'],
], 'Dates relevées le 4 octobre 2026')}

<h2>Les simulateurs du site</h2>
<p>Cinq outils complets, et un mini-simulateur sur chaque guide :</p>
<ul>
<li>le ${h.a('revenu-net-chauffeur', 'revenu net')} par mois et par heure ;</li>
<li>le ${h.a('cout-acces-metier', 'coût d’accès au métier')} ;</li>
<li>la ${h.a('tva-vtc-taxi', 'TVA et le choix du statut')} ;</li>
<li>la ${h.a('vehicule-vtc', 'conformité d’un véhicule VTC')} ;</li>
<li>le ${h.a('calendrier-renouvellement', 'calendrier de renouvellement')} de la carte et du registre.</li>
</ul>
<p>Tous calculent dans votre navigateur : aucune saisie n’est envoyée à un serveur.</p>
<p>Le site parle aussi anglais, pour les anglophones qui vivent en France et veulent conduire un taxi, un VTC ou une ambulance : chaque page y a sa version, avec les termes français expliqués.</p>
`,
  },
  en: {
    nav: 'Home',
    title: 'Become a VTC, Taxi or Ambulance Driver France 2026: Guide',
    description: `Becoming a VTC, taxi or ambulance driver in France in 2026: €${A.examen_complet} exam, card, register, licence, State diploma and a net income calculator. Texts cited.`,
    h1: 'Becoming a taxi, VTC or ambulance driver in France',
    intro: 'The steps in order, every rule tied to its official text, and calculators to put numbers on your own situation. No training course to sell.',
    resume: `Three jobs carry passengers in France, each with its own way in. VTC drivers (licensed private hire, the French equivalent of a minicab or ride-hailing driver) and taxi drivers sit the same written exam with the chambers of trades (CMA), €${A.examen_complet} in 2026, then apply for a professional card valid for ${A.carte_validite_ans} years. The VTC driver then joins the national VTC register (€${A.registre_inscription}) and works on pre-booked trips only, while the taxi driver needs a licence, the autorisation de stationnement, which allows street hails. Ambulance workers follow a different route: a ${Am.dea_heures}-hour State diploma, or a ${Am.auxiliaire_heures}-hour assistant course, then a salaried job. Since 12 August 2026 the exam is the only way to become a VTC driver, as access through work experience was abolished. This site follows each route step by step, cites the article or official page behind every rule, and works out what a driver keeps once VAT, commission, the car and social contributions are paid.`,
    faqs: [
      { q: 'Do I need qualifications to become a taxi or VTC driver in France?', a: `No. The chambers of trades exam is open whatever your schooling, and preparatory training is optional. You do need a category B licence held for ${A.permis_anciennete_ans} years (${A.permis_conduite_accompagnee_ans} after accompanied driving), a compatible criminal record, a favourable opinion from an approved doctor and, for taxis, a first-aid certificate under ${A.psc1_validite_ans} years old.` },
      { q: 'How long does it take to become a VTC driver?', a: 'No text sets an overall time: it depends on exam sessions in your region, how well you prepare and your prefecture’s workload. The known milestones are the written test then the practical test, the card applied for online once you hold the pass certificate, and the register entry, which the Transport Code requires within two months of a complete file.' },
      { q: 'Which pays better, taxi or VTC?', a: 'No reliable public statistic answers that in general. A taxi can pick up street hails and charges regulated fares, but needs a licence that is free after a long wait, rented or bought. A VTC driver starts faster and sets prices freely but often pays a platform commission. The calculator compares both on your own figures rather than on averages.' },
      { q: 'Can I drive a VTC as an employee rather than self-employed?', a: 'Yes. A business on the register can employ card-holding drivers, and since 27 June 2026 it must declare them on the register with their card numbers. Lending or renting your register entry to another driver is banned: the law treats it as an employment contract and provides for the operator to be struck off.' },
      { q: 'Are the earnings shown by your calculators guaranteed?', a: `No. They are estimates built from your assumptions (rides, fares, commission, costs) and official 2026 rates: ${(M.taux_bic_services * 100).toLocaleString('en-GB')}% contributions under the micro scheme, ${Math.round(V.taux_transport * 100)}% VAT above the exemption threshold, the Urssaf scale under real profit. They are neither a promise of income nor personal advice; for your case, an accountant or Urssaf has the final word.` },
      { q: 'Is this site linked to Uber, a taxi company or a driving school?', a: 'No. Taxinoir is published by Radif Partners and has no link with any government body, ride-hailing platform, taxi dispatcher, insurer or training centre. We sell no contacts and take no commission. Brand names belong to their owners, and anything said about a platform is indicative and should be checked with the platform itself.' },
    ],
    body: (h) => `
<h2>Three jobs, three ways in</h2>
<p>Before picking a course or a car, it helps to know which door you are walking through. The table sums up what separates the three jobs, as described on the official service-public pages and the texts listed at the bottom of this page.</p>
${h.table(['', 'VTC', 'Taxi', 'Ambulance'], [
  ['Entry', `T3P exam (${h.eur(A.examen_complet)})`, `T3P exam (${h.eur(A.examen_complet)})`, `State diploma (${Am.dea_heures} h) or assistant course (${Am.auxiliaire_heures} h)`],
  ['What you obtain', `professional card, ${A.carte_validite_ans} years, all of France`, 'professional card, in the exam’s département', 'diploma, then an employment contract'],
  ['Right to operate', `VTC register, ${h.eur(A.registre_inscription)}`, 'licence (ADS): free, rented or bought', 'the ambulance company’s'],
  ['Passengers', 'pre-booked only', 'street hails in your zone, bookings elsewhere', 'patients, on prescription'],
  ['Fares', 'set freely', 'regulated', 'billed by the employer'],
  ['Usual status', 'self-employed', 'owner-driver, licence tenant or employee', 'employee'],
], 'Sources: service-public F31027 and F21907, order of 11 April 2022')}

<h2>The VTC route, in order</h2>
<p>A future VTC driver goes through seven steps, each covered on its own page:</p>
<ol>
<li>Check the conditions: licence, criminal record, approved doctor.</li>
<li>Prepare, with or without a ${h.a('formation-vtc', 'training course')}.</li>
<li>Pass the ${h.a('examen-vtc', 'T3P exam')}: seven written papers, then a driving test.</li>
<li>Apply for the ${h.a('carte-vtc', 'professional card')} online.</li>
<li>Set up your business, registered as a craft activity.</li>
<li>Join the ${h.a('registre-vtc', 'VTC register')}.</li>
<li>Fit a ${h.a('vehicule-vtc', 'compliant car')} with its sticker.</li>
</ol>
<p>The ${h.a('devenir-chauffeur-vtc', 'complete VTC guide')} links them up with the traps at each stage. One shortcut disappeared in 2026: the ${h.a('carte-vtc-equivalence', 'card by equivalence')}, closed to new applications on 12 August by Decree no. 2026-764.</p>
<p>Before your first fare, a VTC driver’s regulated fees come to ${h.eur(fixeVtc)}, excluding training, the doctor and the car. The ${h.a('cout-acces-metier', 'start-up cost calculator')} adds your own quotes.</p>

<h2>The taxi route and the licence question</h2>
<p>A future taxi driver sits the same core papers as a VTC driver. Two papers are specific to taxis, one on knowledge of the local area and local rules, and the driving test also marks billing and the use of taxi equipment, as set out on the ${h.a('examen-taxi', 'taxi exam')} page. The card only covers the département where the exam was taken, unless the driver completes a course to extend it to up to ${Tx.mobilite_max_departements} départements.</p>
<p>The real hurdle is the ${h.a('licence-taxi', 'licence')}. A free licence comes from the town hall after a waiting list that runs for years in big cities; if issued since 1 October 2014, it cannot be sold and lasts ${Tx.ads_gratuite_validite_ans} years, renewable. A bought licence costs between ${h.eur(Tx.ads_prix_min)} and ${h.eur(Tx.ads_prix_max)} according to service-public, around ${h.eur(Tx.ads_prix_paris_environ)} in Paris, and renting one costs about ${h.eur(Tx.ads_loyer_paris_mois_environ)} a month in Paris. The ${h.a('devenir-taxi', 'guide to becoming a taxi driver')} compares the three resulting statuses: owner-driver, licence tenant or employee.</p>

<h2>Ambulance work: training first, then a job</h2>
<p>Ambulance work is not part of the passenger-transport regime for taxis and VTCs, and there is no chambers of trades exam. You enter through a training institute, after selection on file and interview, for a ${Am.dea_heures}-hour State diploma including ${Am.dea_heures_stage} hours of placements. The ${Am.auxiliaire_heures}-hour ambulance assistant course gets you into a crew sooner. ${h.a('formation-ambulancier', 'Training')}, the ${h.a('devenir-ambulancier', 'route into the job')} and ${h.a('salaire-ambulancier', 'pay under the collective agreement')} each have their own page. One point to know: the 2025 hiring rates for levels 1 and 2 are below the 2026 minimum wage (Smic), which therefore applies instead.</p>

<h2>What the driver actually keeps</h2>
<p>A self-employed driver has no salary, only takings from which everything else comes out. The ${h.a('revenu-net-chauffeur', 'net income calculator')} takes those deductions in the order they really fall.</p>
<ul>
<li>VAT at ${h.pct(V.taux_transport, 0)}, once turnover passes ${h.eur(V.franchise_services)} in the year.</li>
<li>The platform commission, for a VTC driver who uses one.</li>
<li>The car: loan or lease, fuel, insurance, servicing.</li>
<li>The licence, for a taxi driver who rents one or bought it on credit.</li>
<li>Social contributions: ${h.pct(M.taux_bic_services)} of turnover under the micro scheme, or the Urssaf scale on profit under real profit.</li>
</ul>
<p>Divided by the hours really spent at the wheel, waiting included, what is left becomes an hourly rate, the only figure you can compare with a wage. The pages on ${h.a('salaire-chauffeur-vtc', 'VTC driver earnings')} and ${h.a('salaire-taxi', 'taxi driver earnings')} apply it to typical cases, and the ${h.a('tva-vtc-taxi', 'VAT and status comparison')} shows whether the micro scheme or real profit leaves you more.</p>
<!--mini:gainTaxi-->

<h2>Why our figures come from the law, not from another website</h2>
<p>For these searches, many of the top results are written by training centres, company-formation services or insurers whose business is selling a course, a legal structure or a policy. We sell none of those. The site rests on one rule: every regulatory value is read at its official source and written once, in a dated parameter file that every page and calculator reads.</p>
<p>The calculation engine is checked by automated tests: the minimum and maximum contributions Urssaf published for 2026, the VAT thresholds, the vehicle criteria and the exam marking scheme are replayed at every build, and the site is not published if any of them drifts. The ${h.a('method', 'method page')} lists those checks and what the calculators cannot do.</p>
<p>That choice shows when a rule changes. Access to VTC work through experience ended on 12 August 2026, yet many pages still explain how to use it. Here the rule in force appears with its date and its decree.</p>

<h2>What changed in 2026</h2>
${h.table(['Date', 'Change', 'Where to read it'], [
  ['1 January 2026', `Micro-enterprise ceiling raised to ${h.eur(M.seuil_services)} for services; T3P exam at ${h.eur(A.examen_complet)}`, 'Urssaf, CMA'],
  ['April 2026', 'New contribution base for the self-employed: 26% allowance', 'Urssaf'],
  ['12 June 2026', 'The le.taxi service suspended', 'service-public, F21907'],
  ['27 June 2026', 'Tougher criminal penalties; drivers and plates declared on the register', 'service-public, F31027'],
  ['12 August 2026', 'End of access to VTC work through professional experience', 'Decree no. 2026-764'],
  ['1 January 2027', 'Tracking and e-billing required for taxis under health-insurance agreements', 'service-public, F21907'],
], 'Dates read on 4 October 2026')}

<h2>The calculators on this site</h2>
<p>Five full tools, plus a small calculator on every guide:</p>
<ul>
<li>${h.a('revenu-net-chauffeur', 'net income')} per month and per hour;</li>
<li>the ${h.a('cout-acces-metier', 'cost of getting into the job')};</li>
<li>${h.a('tva-vtc-taxi', 'VAT and the choice of status')};</li>
<li>${h.a('vehicule-vtc', 'whether a car qualifies as a VTC')};</li>
<li>the ${h.a('calendrier-renouvellement', 'renewal calendar')} for the card and the register.</li>
</ul>
<p>They all run in your browser: nothing you type is sent to a server.</p>
<p>Every page also exists in French, the language of the exam, the forms and the prefecture. Reading both versions side by side is a good way to learn the vocabulary you will meet in the written papers.</p>
`,
  },
};
