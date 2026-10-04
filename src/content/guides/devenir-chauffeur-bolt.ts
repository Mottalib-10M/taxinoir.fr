import { defineGuide } from '../../lib/guide-types';
import { P } from '../../lib/engine/params';
import { displayDate, formatMoney } from '../../lib/format';

const A = P.acces;
const V = P.vehicule_vtc;
const M = P.micro;
const PF = P.plateformes;
const PL = P.plateformes_publiees;
const dfr = (iso: string) => displayDate(iso, 'fr-FR');
const den = (iso: string) => displayDate(iso, 'en-GB');
const fe = (n: number, l: 'fr' | 'en') => formatMoney(n, 0, l);

export default defineGuide({
  id: 'devenir-chauffeur-bolt',
  group: 'vtc',
  order: 130,
  mini: 'boltSemaine',
  related: ['devenir-chauffeur-uber', 'devenir-chauffeur-heetch', 'devenir-chauffeur-vtc', 'devenir-taxi', 'voiture-vtc', 'salaire-chauffeur-vtc'],
  sources: ['boltDocuments', 'boltVehicules', 'boltPaiements', 'spVtc', 'urssafAe', 'ctR1326'],
  fr: {
    slug: 'devenir-chauffeur-bolt',
    nav: 'Devenir chauffeur Bolt',
    card: 'Documents demandés par Bolt, catégories de véhicules, paiement à la semaine, VTC ou taxi.',
    title: 'Devenir chauffeur Bolt 2026 : documents, véhicule, paiements',
    description: `Devenir chauffeur Bolt en 2026 : carte VTC ou taxi, onze documents listés par Bolt, thermique de moins de ${V.age_max_ans} ans, paiement chaque semaine. Site indépendant.`,
    h1: 'Devenir chauffeur Bolt : la liste de Bolt, ligne par ligne',
    intro: 'Bolt publie une liste précise de pièces ; chacune renvoie à une démarche administrative que l’application ne fait pas à votre place.',
    resume: `Bolt accepte en France des chauffeurs VTC et des chauffeurs de taxi. Pour un VTC, son centre d’aide, consulté le ${dfr(PL.consulte_le)}, demande la carte professionnelle de conducteur de VTC en cours de validité, une pièce d’identité ou un titre de séjour, le permis de conduire, une photo prise sur place, l’extrait Kbis ou l’avis de situation au répertoire Sirene pour un micro-entrepreneur, l’attestation de responsabilité civile professionnelle, l’attestation d’inscription au registre des VTC, la carte grise, la carte verte, l’attestation d’assurance de transport à titre onéreux et le macaron VTC. Un taxi fournit sa carte de taxi et son autorisation de stationnement. Côté voiture, la catégorie de base reprend les critères de la loi : moins de ${V.age_max_ans} ans en thermique, ${V.portes_min} portes, ${V.puissance_min_kw} kW, avec exemption des hybrides et des électriques. Les paiements sont calculés chaque semaine, du lundi au dimanche. Bolt ne publie pas de taux de commission sur ces pages. Site indépendant, non affilié à Bolt.`,
    faqs: [
      { q: 'Quels documents Bolt demande-t-il à un chauffeur VTC ?', a: 'Selon son centre d’aide consulté le 4 octobre 2026 : carte VTC valide, pièce d’identité ou titre de séjour, permis de conduire, photo prise sur place, Kbis ou avis Sirene pour un micro-entrepreneur, attestation de responsabilité civile professionnelle, attestation d’inscription au registre des VTC, carte grise, carte verte, attestation d’assurance de transport à titre onéreux et macaron VTC. Chaque pièce suppose une démarche faite au préalable auprès de l’administration ou de l’assureur.' },
      { q: 'Un chauffeur de taxi peut-il travailler avec Bolt ?', a: 'Oui, Bolt prévoit une liste de documents pour les chauffeurs de taxi. Elle reprend celle des VTC en remplaçant la carte VTC par la carte professionnelle de taxi en cours de validité et en ajoutant l’attestation d’autorisation de stationnement, la licence. Le taxi reste soumis à ses propres règles, notamment la réservation préalable hors de sa zone de prise en charge, que l’application ne modifie pas.' },
      { q: 'Quand Bolt paie-t-il ses chauffeurs ?', a: `Le centre d’aide de Bolt indique que les paiements sont calculés automatiquement chaque semaine, sur un cycle qui va du lundi 0 h au dimanche 23 h 59. Le virement part dans la première moitié de la semaine suivante et met un à deux jours ouvrés à arriver sur le compte bancaire enregistré. Le mini-simulateur estime ce virement à partir de vos courses et de votre hypothèse de commission.` },
      { q: 'Faut-il être micro-entrepreneur pour rouler avec Bolt ?', a: `Non, toute forme d’entreprise convient, et Bolt accepte l’avis de situation Sirene d’un micro-entrepreneur à la place d’un Kbis. Son article sur les statuts cite un plafond de ${fe(M.seuil_services_2025, 'fr')} : c’était le seuil de 2025. En 2026, le seuil de chiffre d’affaires de la micro-entreprise pour les prestations de services est de ${fe(M.seuil_services, 'fr')}, selon l’Urssaf. Au-delà, il faut passer au régime réel.` },
      { q: 'Quel smartphone faut-il pour l’application chauffeur Bolt ?', a: `La page chauffeurs de Bolt, consultée le 4 octobre 2026, demande au minimum Android ${PL.bolt_android_min}.0 ou iOS ${PL.bolt_ios_min}. Prévoyez aussi un forfait de données suffisant et un support de téléphone fixé : l’application sert à recevoir les courses, à naviguer et à suivre les paiements. Un téléphone trop ancien peut bloquer l’inscription avant même le contrôle des documents.` },
    ],
    body: (h) => `
<p><strong>Site indépendant.</strong> taxinoir.fr n’a aucun lien commercial avec Bolt ; Bolt est une marque de son propriétaire. Les informations qui suivent reprennent les pages publiées par Bolt et consultées le ${h.date(PL.consulte_le)}. Elles sont indicatives : vérifiez-les auprès de Bolt avant de vous engager.</p>

<h2>La liste des pièces, et la démarche derrière chacune</h2>
<p>Le ${h.src('boltDocuments', 'centre d’aide de Bolt')} énumère les documents demandés à un chauffeur privé, c’est-à-dire un VTC. Aucune de ces pièces ne s’obtient auprès de Bolt : chacune résulte d’une démarche faite avant, souvent plusieurs semaines avant.</p>
${h.table(['Pièce demandée par Bolt', 'D’où elle vient', 'Où en savoir plus'], [
  ['Carte VTC en cours de validité', 'préfecture, après l’examen de la chambre de métiers', h.a('carte-vtc', 'carte VTC')],
  ['Pièce d’identité ou titre de séjour, permis de conduire', 'vos papiers ; permis hors période probatoire', h.a('devenir-chauffeur-vtc', 'devenir VTC')],
  ['Photo d’identité prise sur place', 'l’application', 'aucune démarche préalable'],
  ['Kbis, ou avis Sirene pour un micro-entrepreneur', 'immatriculation de l’entreprise', h.a('tva-vtc-taxi', 'TVA et statuts')],
  ['Attestation de responsabilité civile professionnelle', 'votre assureur', h.a('assurance-vtc', 'assurance VTC')],
  ['Attestation d’inscription au registre des VTC', 'registre du ministère des Transports', h.a('registre-vtc', 'registre VTC')],
  ['Carte grise, carte verte, attestation de transport à titre onéreux', 'le véhicule et son assureur', h.a('voiture-vtc', 'voiture VTC')],
  ['Badge VTC (macaron)', 'commande depuis le compte du registre', h.a('signaletique-vtc', 'signalétique VTC')],
], 'Documents listés par Bolt pour un chauffeur VTC, consultés le 4 octobre 2026')}
<p>L’ordre réel est donc celui de l’administration, pas celui de l’application : examen, carte, entreprise, assurance, véhicule, registre, macaron. Ouvrir un compte Bolt avant d’avoir la carte ne fait gagner aucun jour. Pour un chauffeur venu de l’étranger, le titre de séjour doit autoriser une activité indépendante ; c’est un point à vérifier en préfecture, pas auprès de la plateforme.</p>

<h2>Le cas des taxis</h2>
<p>Bolt publie aussi une liste pour les chauffeurs de taxi. Elle remplace la carte VTC par la carte professionnelle de taxi et ajoute l’attestation d’autorisation de stationnement. L’application ne change rien au statut du taxi : il conserve son tarif réglementé dans sa zone et doit justifier d’une réservation préalable hors de celle-ci. La page ${h.a('devenir-taxi', 'devenir taxi')} reprend ces règles.</p>

<h2>Les catégories de véhicules</h2>
<p>La ${h.src('boltVehicules', 'page des prérequis véhicules')} de Bolt pose trois exigences pour toutes les voitures : la carte grise, la carte verte et le badge VTC. Viennent ensuite les catégories :</p>
<ul>
<li><strong>Bolt</strong> (catégorie de base) : critères de l’arrêté du 26 mars 2015, soit moins de ${V.age_max_ans} ans en thermique, ${V.places_min} à ${V.places_max} places, ${V.portes_min} portes, ${h.num(V.longueur_min_m, 2)} m sur ${h.num(V.largeur_min_m, 2)} m et ${V.puissance_min_kw} kW, sans limite de taille pour les hybrides et les électriques ;</li>
<li><strong>Comfort</strong> : véhicule de moins de 7 ans et note d’au moins ${h.num(PL.bolt_comfort_note_min, 1)} sur 5 ;</li>
<li><strong>Premium</strong> : moins de 7 ans, ${V.puissance_min_kw} kW, note d’au moins ${h.num(PL.bolt_premium_note_min, 1)} sur 5, dans une liste de villes ;</li>
<li><strong>Green</strong> : véhicules hybrides ou électriques ;</li>
<li><strong>Van et XL</strong> : 6 à 9 places, dans certaines villes.</li>
</ul>
<p>Bolt indique aussi qu’une voiture de plus de douze ans peut être examinée sur photos si elle est en parfait état, ce qui ne vaut que pour une hybride ou une électrique : une thermique de cet âge reste exclue par la loi. Le guide ${h.a('voiture-vtc', 'choisir sa voiture VTC')} compare ces règles à celles des autres applications.</p>
<p>Bolt publie enfin la liste des villes où elle opère sur son site ; consultez-la avant d’investir, car toutes les catégories ne sont pas proposées partout.</p>

<h2>Le paiement à la semaine</h2>
<p>Le ${h.src('boltPaiements', 'centre d’aide de Bolt')} décrit un cycle hebdomadaire : les gains sont calculés automatiquement du lundi 0 h au dimanche 23 h 59, puis versés dans la première moitié de la semaine suivante, avec un à deux jours ouvrés de délai bancaire. La page chauffeurs présente ces virements comme des paiements hors frais de commission, sans en publier le taux.</p>
<p>Le mini-simulateur part de ce rythme. Entrez le total des courses d’une semaine au prix payé par les clients, votre hypothèse de commission et vos heures connectées : il estime le virement de la semaine, puis ce qu’il reste par heure et par mois après les frais de véhicule d’exemple et les cotisations d’une micro-entreprise. C’est une estimation à partir de vos hypothèses, pas un chiffre de Bolt.</p>

<h2>Ce que la loi garantit, quelle que soit l’application</h2>
<p>Bolt est soumise aux mêmes règles que toute plateforme de VTC. Les ${h.src('ctR1326', 'articles R1326-1 à R1326-10 du code des transports')} imposent d’indiquer au chauffeur, avant qu’il accepte une course, la distance et le prix minimal garanti après commission. Les accords conclus sous l’égide de l’ARPE fixent, selon ${h.src('spVtc', 'service-public')}, un minimum de ${h.eur(PF.revenu_min_course)} par course, ${h.eur(PF.revenu_min_heure)} par heure travaillée et ${h.eur(PF.revenu_min_km)} par kilomètre en course.</p>

<h2>Le statut : un chiffre à mettre à jour</h2>
<p>Bolt publie un article sur le choix du statut juridique, qui décrit l’entreprise individuelle, la micro-entreprise et les sociétés. Il mentionne un plafond de chiffre d’affaires de ${h.eur(M.seuil_services_2025)} pour la micro-entreprise, qui correspond au seuil de 2025. Pour 2026, l’${h.src('urssafAe', 'Urssaf')} fixe le seuil des prestations de services à ${h.eur(M.seuil_services)}. Les cotisations d’un micro-entrepreneur s’élèvent à ${h.pct(M.taux_bic_services)} du chiffre d’affaires, plus ${h.pct(M.cfp_artisan)} de contribution à la formation professionnelle. L’${h.a('tva-vtc-taxi', 'outil TVA et statuts')} aide à choisir, et le ${h.a('revenu-net-chauffeur', 'simulateur de revenu net')} chiffre le résultat.</p>
<p>Pour comparer avec les autres applications, voyez ${h.a('devenir-chauffeur-uber', 'devenir chauffeur Uber')} et ${h.a('devenir-chauffeur-heetch', 'devenir chauffeur Heetch')}.</p>
`,
  },
  en: {
    slug: 'become-bolt-driver-france',
    nav: 'Becoming a Bolt driver',
    card: 'Bolt’s document list, vehicle categories, weekly payouts, VTC or taxi.',
    title: 'Become a Bolt Driver in France 2026: Documents, Car, Pay',
    description: `Driving for Bolt in France, 2026: VTC or taxi card, the eleven documents Bolt lists, petrol cars under ${V.age_max_ans} years, weekly payout cycle. An independent guide.`,
    h1: 'Driving for Bolt in France: Bolt’s checklist, item by item',
    intro: 'Bolt publishes a precise list of documents; each one stands for a piece of French paperwork the app will not do for you.',
    resume: `In France, Bolt takes both VTC (licensed private-hire) drivers and taxi drivers. For a VTC driver, its help centre, read on ${den(PL.consulte_le)}, asks for a valid professional VTC card, an identity document or residence permit, a driving licence, a photo taken in the app, a Kbis company extract or, for a micro-entrepreneur, a Sirene registration notice, a professional liability certificate, proof of entry on the VTC register, the car’s registration document, its green card, a certificate of insurance for paid passengers and the VTC sticker. A taxi driver supplies a taxi card and taxi licence (ADS) instead. For the car, the basic category follows the law: under ${V.age_max_ans} years for petrol or diesel, ${V.portes_min} doors, ${V.puissance_min_kw} kW, with hybrids and electric cars exempt. Earnings are calculated weekly, Monday to Sunday. Bolt publishes no commission rate on these pages. This is an independent site, not affiliated with Bolt.`,
    faqs: [
      { q: 'Which documents does Bolt ask from a VTC driver in France?', a: 'According to its help centre on 4 October 2026: a valid VTC card, ID or residence permit, driving licence, a photo taken in the app, a Kbis or Sirene notice for micro-entrepreneurs, professional liability certificate, VTC register certificate, registration document, green card, paid-passenger insurance certificate and the VTC sticker. Each item assumes a step already completed with a French authority or an insurer.' },
      { q: 'Can a French taxi driver also take Bolt rides?', a: 'Yes. Bolt has a separate document list for taxi drivers. It matches the VTC list, except that the VTC card is replaced by a valid taxi driver card and a certificate of the taxi licence (autorisation de stationnement) is added. The taxi keeps its own rules, notably the need for a prior booking outside its licensed area, which using an app does not change.' },
      { q: 'How often does Bolt pay drivers in France?', a: 'Bolt’s help centre says earnings are calculated automatically every week, over a cycle running from Monday 00:00 to Sunday 23:59. The transfer goes out in the first half of the following week and takes one to two working days to reach the registered bank account. The calculator above estimates that transfer from your fares and your commission assumption.' },
      { q: 'What is the 2026 turnover limit for a micro-entrepreneur driving for Bolt?', a: `Bolt’s article on legal status quotes ${fe(M.seuil_services_2025, 'en')}, which was the 2025 threshold. In 2026, the micro-enterprise turnover limit for services is ${fe(M.seuil_services, 'en')}, according to the Urssaf, the body that collects social contributions. Above it you move to the real-profit regime. Bolt accepts a micro-entrepreneur’s Sirene notice instead of a Kbis, so a limited company is not required.` },
      { q: 'What phone do I need for the Bolt driver app?', a: `Bolt’s driver page, read on 4 October 2026, asks for at least Android ${PL.bolt_android_min}.0 or iOS ${PL.bolt_ios_min}. Plan for a decent data allowance and a fixed phone mount too: the app handles ride offers, navigation and payouts. A phone that is too old can stop your sign-up before the documents are even checked.` },
    ],
    body: (h) => `
<p><strong>Independent site.</strong> taxinoir.fr has no commercial link with Bolt; Bolt is a trademark of its owner. The following draws on pages published by Bolt and read on ${h.date(PL.consulte_le)}. It is for guidance only: check with Bolt before committing.</p>

<h2>Bolt’s document list, and the paperwork behind each item</h2>
<p>${h.src('boltDocuments', 'Bolt’s help centre')} lists the documents required from a private driver, meaning a VTC. None of them comes from Bolt: each is the result of a step completed earlier, often weeks earlier.</p>
${h.table(['Document Bolt asks for', 'Where it comes from', 'Read more'], [
  ['Valid VTC card', 'the prefecture, after the chamber of trades’ exam', h.a('carte-vtc', 'VTC card')],
  ['ID or residence permit, driving licence', 'your own papers; licence past its probationary period', h.a('devenir-chauffeur-vtc', 'becoming a VTC driver')],
  ['ID photo taken in the app', 'the app', 'no prior step'],
  ['Kbis, or Sirene notice for a micro-entrepreneur', 'registering your business', h.a('tva-vtc-taxi', 'VAT and status')],
  ['Professional liability certificate', 'your insurer', h.a('assurance-vtc', 'VTC insurance')],
  ['VTC register certificate', 'the Ministry of Transport’s register', h.a('registre-vtc', 'VTC register')],
  ['Registration document, green card, paid-passenger certificate', 'the car and its insurer', h.a('voiture-vtc', 'choosing a car')],
  ['VTC badge (sticker)', 'ordered from your register account', h.a('signaletique-vtc', 'VTC sticker')],
], 'Documents Bolt lists for a VTC driver, read on 4 October 2026')}
<p>The real order is the administration’s, not the app’s: exam, card, business, insurance, car, register, sticker. Opening a Bolt account before you have the card saves no time. If you come from abroad, your residence permit must allow self-employed work; check that at the prefecture, not with the platform.</p>

<h2>Taxi drivers on Bolt</h2>
<p>Bolt also publishes a list for taxi drivers. It swaps the VTC card for the professional taxi card and adds proof of the taxi licence (autorisation de stationnement, ADS). The app changes nothing about taxi status: regulated fares apply in the licensed area, and a prior booking is required outside it. Our page on ${h.a('devenir-taxi', 'becoming a taxi driver')} covers those rules.</p>

<h2>Vehicle categories</h2>
<p>Bolt’s ${h.src('boltVehicules', 'vehicle requirements page')} sets three basics for every car: registration document, green card and VTC badge. Then come the categories:</p>
<ul>
<li><strong>Bolt</strong> (standard): the order of 26 March 2015, so under ${V.age_max_ans} years for petrol or diesel, ${V.places_min} to ${V.places_max} seats, ${V.portes_min} doors, ${h.num(V.longueur_min_m, 2)} m by ${h.num(V.largeur_min_m, 2)} m and ${V.puissance_min_kw} kW, with no size limit for hybrids and EVs;</li>
<li><strong>Comfort</strong>: car under 7 years old and a rating of at least ${h.num(PL.bolt_comfort_note_min, 1)} out of 5;</li>
<li><strong>Premium</strong>: under 7 years, ${V.puissance_min_kw} kW, rating of at least ${h.num(PL.bolt_premium_note_min, 1)} out of 5, in a list of cities;</li>
<li><strong>Green</strong>: hybrid or electric cars;</li>
<li><strong>Van and XL</strong>: 6 to 9 seats, in some cities.</li>
</ul>
<p>Bolt adds that a car over twelve years old may be assessed from photos if it is in perfect condition. That can only apply to a hybrid or EV, since the law rules out a petrol car of that age. Our guide to ${h.a('voiture-vtc', 'choosing a VTC car')} compares these rules with other apps.</p>
<p>Bolt publishes the list of cities where it operates on its website; check it before investing, because not every category runs everywhere.</p>

<h2>Weekly payouts</h2>
<p>${h.src('boltPaiements', 'Bolt’s help centre')} describes a weekly cycle: earnings are calculated automatically from Monday 00:00 to Sunday 23:59, then paid out in the first half of the following week, with one to two working days of bank delay. The driver page presents these payouts as net of commission, without stating the rate.</p>
<p>The calculator follows that rhythm. Enter one week’s fares at the price riders paid, your commission assumption and your hours logged in: it estimates the week’s payout, then what is left per hour and per month after example car costs and micro-enterprise contributions. It is an estimate based on your assumptions, not a figure from Bolt.</p>

<h2>What the law guarantees on any app</h2>
<p>Bolt is bound by the same rules as every VTC platform. ${h.src('ctR1326', 'Articles R1326-1 to R1326-10 of the Transport Code')} require the driver to be told, before accepting a ride, the distance and the minimum guaranteed price after commission. Agreements reached under the ARPE set, according to ${h.src('spVtc', 'service-public')}, a minimum of ${h.eur(PF.revenu_min_course)} per ride, ${h.eur(PF.revenu_min_heure)} per hour worked and ${h.eur(PF.revenu_min_km)} per kilometre on a ride.</p>

<h2>Status: one figure to update</h2>
<p>Bolt publishes an article on choosing a legal status, covering sole traders, micro-enterprises and companies. It mentions a ${h.eur(M.seuil_services_2025)} turnover limit for the micro-enterprise, which was the 2025 threshold. For 2026, the ${h.src('urssafAe', 'Urssaf')} sets the services threshold at ${h.eur(M.seuil_services)}. A micro-entrepreneur pays ${h.pct(M.taux_bic_services)} of turnover in contributions, plus ${h.pct(M.cfp_artisan)} towards vocational training. The ${h.a('tva-vtc-taxi', 'VAT and status tool')} helps you choose, and the ${h.a('revenu-net-chauffeur', 'net income calculator')} shows the outcome.</p>
<p>To compare with other apps, see ${h.a('devenir-chauffeur-uber', 'driving for Uber')} and ${h.a('devenir-chauffeur-heetch', 'driving for Heetch')}.</p>
`,
  },
});
