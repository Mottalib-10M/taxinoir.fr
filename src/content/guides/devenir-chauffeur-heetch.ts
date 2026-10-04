import { defineGuide } from '../../lib/guide-types';
import { P } from '../../lib/engine/params';
import { displayDate, formatMoney } from '../../lib/format';

const A = P.acces;
const V = P.vehicule_vtc;
const PF = P.plateformes;
const PL = P.plateformes_publiees;
const dfr = (iso: string) => displayDate(iso, 'fr-FR');
const den = (iso: string) => displayDate(iso, 'en-GB');
const fe = (n: number, l: 'fr' | 'en') => formatMoney(n, 0, l);

export default defineGuide({
  id: 'devenir-chauffeur-heetch',
  group: 'vtc',
  order: 140,
  mini: 'heetchEspeces',
  related: ['devenir-chauffeur-uber', 'devenir-chauffeur-bolt', 'devenir-chauffeur-vtc', 'carte-vtc', 'salaire-chauffeur-vtc', 'revenu-net-chauffeur'],
  sources: ['heetchInscription', 'heetchStatut', 'heetchVehicules', 'heetchDette', 'spVtc', 'ctR1326'],
  fr: {
    slug: 'devenir-chauffeur-heetch',
    nav: 'Devenir chauffeur Heetch',
    card: 'Trois statuts acceptés, documents, véhicule et courses payées en espèces.',
    title: 'Devenir chauffeur Heetch 2026 : statut, documents, espèces',
    description: `Devenir chauffeur Heetch en 2026 : carte VTC, indépendant, gérant ou employé, documents, espèces et compte suspendu au-delà de ${fe(PL.heetch_dette_suspension, 'fr')} de dette. Site indépendant.`,
    h1: 'Devenir chauffeur Heetch : statuts, pièces et paiement en espèces',
    intro: 'Heetch accepte trois profils de chauffeur et des courses payées en liquide, ce qui change la façon dont la commission se règle.',
    resume: `Heetch pose deux conditions d’inscription dans son centre d’aide, consulté le ${dfr(PL.consulte_le)} : posséder une carte VTC et choisir un statut adapté. Trois statuts sont acceptés : auto-entrepreneur VTC, gérant d’une société inscrite au registre du commerce, ou employé rattaché à un gérant. Les pièces varient selon le statut : identité, permis, relevé de points, carte VTC et photo pour tous ; Kbis ou extrait, responsabilité civile professionnelle et attestation d’inscription au registre des VTC pour un indépendant ou un gérant, avec carte grise, photo du véhicule, mémo d’assurance et attestation d’assurance à titre onéreux ; un simple code employeur pour un salarié. Heetch annonce une validation sous ${PL.heetch_validation_heures} heures au plus. La voiture suit les critères de l’arrêté du 26 mars 2015, hybrides et électriques exemptés. Les clients peuvent payer en espèces : la commission est alors reprise sur le solde du chauffeur, et une dette de plus de ${fe(PL.heetch_dette_suspension, 'fr')} non réglée après ${PL.heetch_dette_semaines} semaines peut suspendre le compte. Site indépendant, non affilié à Heetch.`,
    faqs: [
      { q: 'Quels statuts Heetch accepte-t-il pour ses chauffeurs ?', a: 'Trois, selon son centre d’aide : auto-entrepreneur VTC, en entreprise individuelle ; gérant VTC, pour une société comme une SASU, une SARL ou une EURL inscrite au registre du commerce et des sociétés, y compris un gérant qui ne conduit pas et gère une flotte ; employé VTC, rattaché à un gérant. Le statut détermine les pièces à fournir à l’inscription.' },
      { q: 'Un chauffeur salarié doit-il fournir des documents de véhicule à Heetch ?', a: 'Non. Heetch demande au salarié ses pièces personnelles (identité, permis, relevé de points, carte VTC, photo) et un code employeur, mais aucun document de véhicule : la carte grise, l’assurance et l’inscription au registre relèvent de la société qui l’emploie. L’indépendant et le gérant, eux, fournissent les pièces de l’entreprise et du véhicule.' },
      { q: 'Comment fonctionne la dette chez Heetch quand un client paie en espèces ?', a: `Selon le centre d’aide de Heetch, le solde du chauffeur correspond à ce que Heetch lui doit. Une course payée par carte l’augmente du montant net de commission ; une course payée en espèces le diminue du montant de la commission, puisque le chauffeur a déjà encaissé le prix. Si le solde devient négatif, c’est une dette, que l’on règle par carte depuis l’onglet Revenus. Au-delà de ${fe(PL.heetch_dette_suspension, 'fr')} pendant ${PL.heetch_dette_semaines} semaines, le compte peut être suspendu.` },
      { q: 'Heetch accepte-t-il les voitures hybrides de petite taille ?', a: `Oui, dans la limite de la loi. La page véhicules de Heetch reprend les critères de l’arrêté du 26 mars 2015 (${V.puissance_min_kw} kW, ${V.places_min} à ${V.places_max} places, ${V.longueur_min_m.toLocaleString('fr-FR')} m sur ${V.largeur_min_m.toLocaleString('fr-FR')} m, ${V.portes_min} portes, moins de ${V.age_max_ans} ans, contrôle technique annuel) et précise que les hybrides et les électriques en sont exemptés. Toutes les couleurs de carrosserie sont acceptées.` },
      { q: 'Combien de temps faut-il pour être validé chez Heetch ?', a: `Heetch annonce une validation sous ${PL.heetch_validation_heures} heures au plus après l’envoi des documents sur son site d’inscription. Ce délai ne concerne que la plateforme : l’examen, la carte VTC, l’immatriculation de l’entreprise et l’inscription au registre des VTC prennent des semaines, et doivent être terminés avant. Le registre, par exemple, dispose de ${A.registre_delai_mois} mois pour statuer sur un dossier complet.` },
    ],
    body: (h) => `
<p><strong>Site indépendant.</strong> taxinoir.fr n’est pas affilié à Heetch et n’en reçoit aucune rémunération ; Heetch est une marque de son propriétaire. Cette page reprend le centre d’aide publié par Heetch, consulté le ${h.date(PL.consulte_le)}, et des textes officiels. Ces informations sont indicatives : vérifiez-les auprès de Heetch.</p>

<h2>Deux conditions, trois statuts</h2>
<p>La ${h.src('heetchInscription', 'page d’inscription du centre d’aide')} pose deux conditions : posséder une carte VTC et choisir un statut adapté. La carte est la condition légale que la plateforme se contente de vérifier ; elle s’obtient par l’examen des chambres de métiers et la demande en préfecture, détaillées sur la page ${h.a('carte-vtc', 'carte VTC')}. Le statut, lui, se choisit parmi trois options décrites dans l’${h.src('heetchStatut', 'article sur les statuts')} :</p>
${h.table(['Statut chez Heetch', 'Ce que Heetch en dit', 'Conséquence pour vous'], [
  ['Auto-entrepreneur VTC', 'entreprise individuelle, activité principale de transport de voyageurs, artisan VTC', 'vous êtes l’exploitant : registre, assurance et véhicule à votre nom'],
  ['Gérant VTC', 'société (SASU, SARL, EURL…) inscrite au RCS ; possible sans conduire, pour une flotte', 'la société est l’exploitant et peut employer des chauffeurs'],
  ['Employé VTC', 'rattaché à un gérant', 'contrat de travail, véhicule et assurance fournis par l’employeur'],
], 'Statuts décrits par Heetch, consultés le 4 octobre 2026')}
<p>Le choix n’est pas qu’administratif. Comme auto-entrepreneur, vous payez des cotisations sur le chiffre d’affaires et vous portez seul les frais de la voiture. Comme employé, vous touchez un salaire et l’employeur supporte les frais. Le ${h.a('revenu-net-chauffeur', 'simulateur de revenu net')} chiffre le premier cas ; l’${h.a('tva-vtc-taxi', 'outil TVA et statuts')} compare micro-entreprise et régime réel.</p>

<h2>Les pièces, statut par statut</h2>
<h3>Pour tous</h3>
<p>Carte d’identité en cours de validité, permis de conduire, relevé de points du permis, carte VTC en cours de validité et photo de profil. Le relevé de points est une particularité de la liste de Heetch : ni Uber ni Bolt ne le mentionnent dans les pages consultées.</p>
<h3>Indépendant ou gérant</h3>
<ul>
<li>pour l’entreprise : Kbis ou extrait, responsabilité civile professionnelle en cours de validité, attestation d’inscription au ${h.a('registre-vtc', 'registre des VTC')} ;</li>
<li>pour le véhicule : carte grise, photo du véhicule avec la plaque lisible, mémo d’assurance, attestation d’assurance à titre onéreux.</li>
</ul>
<h3>Employé</h3>
<p>Un code employeur, fourni par la société qui vous emploie, et aucun document de véhicule.</p>
<p>L’inscription se fait en ligne, en téléchargeant ces documents ; Heetch annonce une validation sous ${PL.heetch_validation_heures} heures au plus. Ce délai ne couvre que l’étape de la plateforme : l’examen, la carte et le registre se comptent en semaines.</p>

<h2>La voiture</h2>
<p>La ${h.src('heetchVehicules', 'page véhicules de Heetch')} reprend les critères de l’arrêté du 26 mars 2015 : plus de ${V.puissance_min_kw} kW, ${V.places_min} à ${V.places_max} places, plus de ${h.num(V.longueur_min_m, 1)} m de long et ${h.num(V.largeur_min_m, 1)} m de large, ${V.portes_min} portes au moins, moins de ${V.age_max_ans} ans, contrôle technique annuel, et exemption des hybrides et des électriques. Elle cite trois solutions pour qui n’a pas de voiture conforme : en acheter une, passer par le leasing ou le crédit-bail, ou devenir employé d’un gérant de flotte. Les pages ${h.a('voiture-vtc', 'choisir sa voiture VTC')} et ${h.a('location-voiture-vtc', 'location de voiture VTC')} chiffrent ces options.</p>

<h2>Espèces, solde et dette : le mécanisme</h2>
<p>Heetch accepte le paiement par carte ou en espèces. Cela change la circulation de l’argent. Le ${h.src('heetchDette', 'centre d’aide')} l’explique ainsi : votre solde correspond à ce que Heetch vous doit.</p>
<ul>
<li>Une course payée <strong>par carte</strong> augmente le solde du prix net de commission : c’est Heetch qui encaisse, puis vous reverse.</li>
<li>Une course payée <strong>en espèces</strong> diminue le solde du montant de la commission : vous avez encaissé le prix entier, Heetch récupère sa part sur votre compte.</li>
</ul>
<p>Avec beaucoup de courses en liquide, le solde peut devenir négatif : c’est la dette. Elle se règle par carte bancaire depuis l’onglet Revenus. Heetch précise qu’une dette supérieure à ${h.eur(PL.heetch_dette_suspension)} non réglée après ${PL.heetch_dette_semaines} semaines peut entraîner une suspension temporaire du compte, levée après paiement.</p>
<p>Le mini-simulateur reproduit ce mécanisme. Indiquez le nombre de courses, le prix moyen, la part payée en espèces et votre hypothèse de commission : il affiche les espèces encaissées, la commission due sur elles, les virements des courses par carte et le solde de la semaine. Heetch ne publie pas de taux de commission sur les pages consultées ; la valeur proposée est une hypothèse à remplacer par celle de vos relevés.</p>
<p>Un conseil de gestion découle de ce mécanisme : l’argent liquide de la semaine n’est pas entièrement à vous. Mettez de côté la commission due, puis les cotisations et la TVA éventuelle, qui portent sur toutes les recettes, espèces comprises.</p>

<h2>Les garanties légales s’appliquent aussi</h2>
<p>Heetch est une plateforme de VTC au sens des ${h.src('ctR1326', 'articles R1326-1 à R1326-10 du code des transports')} : avant chaque course, elle indique la distance et le prix minimal garanti après commission, et publie chaque année ses indicateurs d’activité. Les accords ARPE rappelés par ${h.src('spVtc', 'service-public')} garantissent au moins ${h.eur(PF.revenu_min_course)} net par course, ${h.eur(PF.revenu_min_heure)} par heure travaillée et ${h.eur(PF.revenu_min_km)} par kilomètre en course.</p>
<p>Pour comparer avec les autres applications, voyez ${h.a('devenir-chauffeur-uber', 'devenir chauffeur Uber')} et ${h.a('devenir-chauffeur-bolt', 'devenir chauffeur Bolt')}. Le revenu global d’un chauffeur de plateforme est détaillé sur la page ${h.a('salaire-chauffeur-vtc', 'combien gagne un chauffeur VTC')}.</p>
`,
  },
  en: {
    slug: 'become-heetch-driver',
    nav: 'Becoming a Heetch driver',
    card: 'Three accepted statuses, documents, the car and cash-paid rides.',
    title: 'Become a Heetch Driver in France 2026: Status, Cash Rides',
    description: `Driving for Heetch in France, 2026: VTC card, self-employed, manager or employee, documents, cash rides, suspension above a ${fe(PL.heetch_dette_suspension, 'en')} debt. Independent site.`,
    h1: 'Driving for Heetch in France: statuses, paperwork and cash fares',
    intro: 'Heetch accepts three kinds of driver and rides paid in cash, which changes how the commission is collected.',
    resume: `Heetch sets two sign-up conditions in its help centre, read on ${den(PL.consulte_le)}: hold a French VTC card and choose a suitable status. Three statuses are accepted: self-employed VTC driver (auto-entrepreneur), manager of a company registered with the trade register, or employee attached to a manager. Documents depend on status: identity, driving licence, licence points record, VTC card and photo for everyone; a Kbis company extract, professional liability cover and proof of VTC register entry for the self-employed or a manager, plus the registration document, a photo of the car, the insurance memo and a paid-passenger insurance certificate; simply an employer code for an employee. Heetch says approval takes ${PL.heetch_validation_heures} hours at most. The car follows the order of 26 March 2015, with hybrids and EVs exempt. Riders may pay cash; the commission is then taken back from the driver’s balance, and a debt above ${fe(PL.heetch_dette_suspension, 'en')} left unpaid for ${PL.heetch_dette_semaines} weeks may suspend the account. This is an independent site, not affiliated with Heetch.`,
    faqs: [
      { q: 'Which working statuses does Heetch accept?', a: 'Three, according to its help centre: self-employed VTC driver, as a sole trader; VTC manager, for a company such as a SASU, SARL or EURL registered with the trade register, including a non-driving manager running a fleet; and VTC employee, attached to a manager. Your status decides which documents you upload when you sign up, and who holds the car, insurance and register entry.' },
      { q: 'Does an employed driver send Heetch any car documents?', a: 'No. Heetch asks an employee for personal documents (ID, licence, licence points record, VTC card, photo) and an employer code, but nothing about the car: registration, insurance and register entry belong to the company that employs you. Self-employed drivers and managers, by contrast, upload both business and vehicle documents.' },
      { q: 'Why can my Heetch balance go negative after cash rides?', a: `Heetch’s help centre says your balance is what Heetch owes you. A card-paid ride raises it by the fare net of commission; a cash ride lowers it by the commission, because you already hold the whole fare. A negative balance is a debt, paid by card from the Earnings tab. Above ${fe(PL.heetch_dette_suspension, 'en')} for ${PL.heetch_dette_semaines} weeks, the account may be suspended until it is settled.` },
      { q: 'Will Heetch accept a compact hybrid car?', a: `Yes, within the law. Heetch’s vehicle page repeats the 2015 order (${V.puissance_min_kw} kW, ${V.places_min} to ${V.places_max} seats, ${V.longueur_min_m.toLocaleString('en-GB')} m by ${V.largeur_min_m.toLocaleString('en-GB')} m, ${V.portes_min} doors, under ${V.age_max_ans} years, yearly roadworthiness test) and states that hybrids and electric cars are exempt from those criteria. Any body colour is accepted.` },
      { q: 'How fast does Heetch approve a new driver?', a: `Heetch says approval takes ${PL.heetch_validation_heures} hours at most once documents are uploaded. That timing only covers the platform: the exam, the VTC card, registering the business and joining the VTC register take weeks and must come first. The register alone has up to ${A.registre_delai_mois} months to decide on a complete file, so plan the whole route before counting on a start date.` },
    ],
    body: (h) => `
<p><strong>Independent site.</strong> taxinoir.fr is not affiliated with Heetch and receives nothing from it; Heetch is a trademark of its owner. This page draws on the help centre Heetch publishes, read on ${h.date(PL.consulte_le)}, and on official texts. Treat it as guidance and check with Heetch.</p>

<h2>Two conditions, three statuses</h2>
<p>The ${h.src('heetchInscription', 'sign-up page of the help centre')} sets two conditions: hold a VTC card and choose a suitable status. The card is the legal requirement the platform merely checks; you get it through the chambers of trades’ exam and an application to the prefecture, covered on our ${h.a('carte-vtc', 'VTC card')} page. The status is one of three options described in the ${h.src('heetchStatut', 'article on statuses')}:</p>
${h.table(['Heetch status', 'What Heetch says', 'What it means for you'], [
  ['Self-employed VTC', 'sole trader, main activity passenger transport, craft VTC business', 'you are the operator: register, insurance and car in your name'],
  ['VTC manager', 'company (SASU, SARL, EURL…) on the trade register; possible without driving, for a fleet', 'the company is the operator and may employ drivers'],
  ['VTC employee', 'attached to a manager', 'employment contract, car and insurance provided by the employer'],
], 'Statuses described by Heetch, read on 4 October 2026')}
<p>The choice is more than paperwork. Self-employed, you pay contributions on turnover and carry all car costs alone. Employed, you earn a wage and the employer bears the costs. The ${h.a('revenu-net-chauffeur', 'net income calculator')} models the first case; the ${h.a('tva-vtc-taxi', 'VAT and status tool')} compares micro-enterprise and real profit.</p>

<h2>Documents, status by status</h2>
<h3>Everyone</h3>
<p>Valid identity card, driving licence, licence points record, valid VTC card and a profile photo. The points record is specific to Heetch’s list: neither Uber nor Bolt mention it on the pages we read. A foreign licence must have been exchanged for a French one first where the exchange rules require it.</p>
<h3>Self-employed or manager</h3>
<ul>
<li>for the business: Kbis or extract, valid professional liability cover, proof of entry on the ${h.a('registre-vtc', 'VTC register')};</li>
<li>for the car: registration document, photo with the plate visible, insurance memo, paid-passenger insurance certificate.</li>
</ul>
<h3>Employee</h3>
<p>An employer code supplied by the company employing you, and no vehicle documents.</p>
<p>Sign-up happens online by uploading those documents; Heetch says approval takes ${PL.heetch_validation_heures} hours at most. That only covers the platform step, while the exam, the card and the register are measured in weeks.</p>

<h2>The car</h2>
<p>Heetch’s ${h.src('heetchVehicules', 'vehicle page')} repeats the order of 26 March 2015: over ${V.puissance_min_kw} kW, ${V.places_min} to ${V.places_max} seats, over ${h.num(V.longueur_min_m, 1)} m long and ${h.num(V.largeur_min_m, 1)} m wide, at least ${V.portes_min} doors, under ${V.age_max_ans} years old, a yearly roadworthiness test, and exemption for hybrids and EVs. It suggests three routes for drivers without a compliant car: buy one, use leasing or credit-lease, or become an employee of a fleet manager. Our pages on ${h.a('voiture-vtc', 'choosing a VTC car')} and ${h.a('location-voiture-vtc', 'renting a VTC car')} put numbers on those options.</p>

<h2>Cash, balance and debt: how it works</h2>
<p>Heetch takes payment by card or in cash, which changes how money flows. Its ${h.src('heetchDette', 'help centre')} explains that your balance is what Heetch owes you.</p>
<ul>
<li>A <strong>card</strong> ride raises the balance by the fare net of commission: Heetch collects, then pays you.</li>
<li>A <strong>cash</strong> ride lowers the balance by the commission: you collected the whole fare, so Heetch takes its share from your account.</li>
</ul>
<p>With many cash rides the balance can go negative, which Heetch calls a debt. You settle it by card from the Earnings tab. Heetch states that a debt above ${h.eur(PL.heetch_dette_suspension)} left unpaid after ${PL.heetch_dette_semaines} weeks can lead to a temporary suspension, lifted once paid.</p>
<p>The calculator replays this. Enter rides per week, average fare, the share paid in cash and your commission assumption: it shows the cash collected, the commission owed on it, the payouts from card rides and the week’s balance. Heetch publishes no commission rate on the pages we read; the suggested value is an assumption to replace with the rate on your statements.</p>
<p>One money-management point follows: the week’s cash is not all yours. Set aside the commission owed, then social contributions and any VAT, which apply to all takings, cash included.</p>

<h2>The legal safeguards still apply</h2>
<p>Heetch is a VTC platform within ${h.src('ctR1326', 'articles R1326-1 to R1326-10 of the Transport Code')}: before each ride it shows the distance and the minimum guaranteed price after commission, and it publishes yearly activity indicators. The ARPE agreements summarised by ${h.src('spVtc', 'service-public')} guarantee at least ${h.eur(PF.revenu_min_course)} net per ride, ${h.eur(PF.revenu_min_heure)} per hour worked and ${h.eur(PF.revenu_min_km)} per kilometre on a ride.</p>
<p>To compare with other apps, see ${h.a('devenir-chauffeur-uber', 'driving for Uber')} and ${h.a('devenir-chauffeur-bolt', 'driving for Bolt')}. Overall income for a platform driver is broken down on ${h.a('salaire-chauffeur-vtc', 'how much a VTC driver earns')}.</p>
`,
  },
});
