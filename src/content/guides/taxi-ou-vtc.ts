import { defineGuide } from '../../lib/guide-types';
import { P } from '../../lib/engine/params';
import { coutAcces } from '../../lib/engine/acces';

// Valeurs lues dans params-2026.json : blocs `acces` (service-public F31027 et F21907, CMA), `examen`
// (règlement CMA), `taxi` (F21907, F22127), `vehicule_vtc` (arrêté du 26 mars 2015). Comparaison des
// frais réglementés calculée par le moteur coutAcces, sans formation ni licence.
const A = P.acces;
const TX = P.taxi;
const E = P.examen;
const taxi0 = coutAcces({ metier: 'taxi', formation: 0, medecin: 0, psc1: 0, licence: 0, demarrage: 0 });
const vtc0 = coutAcces({ metier: 'vtc', formation: 0, medecin: 0, demarrage: 0 });

export default defineGuide({
  id: 'taxi-ou-vtc',
  group: 'taxi',
  order: 40,
  mini: 'taxiOuVtc',
  miniHref: 'cout-acces-metier',
  related: ['devenir-taxi', 'devenir-chauffeur-vtc', 'licence-taxi', 'examen-taxi', 'taxi-conventionne', 'artisan-taxi', 'revenu-net-chauffeur'],
  sources: ['ctL3120', 'ctL3121Ads', 'spTaxi', 'spVtc', 'spTarifsTaxi', 'cmaT3p'],
  fr: {
    slug: 'taxi-ou-vtc',
    nav: 'Taxi ou VTC',
    card: 'Examen, carte, clientèle, tarifs, licence et coûts d’entrée : les différences qui décident.',
    title: 'Taxi ou VTC en 2026 : différences, coût d’accès, que choisir',
    description: `Taxi ou VTC en 2026 : même examen à ${A.examen_complet} €, carte départementale ou nationale, maraude ou réservation, tarif réglementé ou libre, licence jusqu’à ${TX.ads_prix_max.toLocaleString('fr-FR')} €.`,
    h1: 'Taxi ou VTC : les vraies différences, et comment choisir',
    intro: 'Les deux métiers partagent un examen et une partie des règles, puis divergent sur ce qui compte le plus : où trouver les clients et à quel prix.',
    resume: `Taxi et VTC passent le même examen devant la chambre de métiers et de l’artisanat, ${A.examen_complet} € en 2026, avec un tronc commun de cinq épreuves écrites et deux épreuves propres à chaque métier, puis une épreuve pratique. Ensuite, tout diverge. Le taxi a le monopole de la maraude : lui seul peut prendre un client qui le hèle ou l’attend à une station, mais seulement dans la zone de son autorisation de stationnement, la licence, et ses tarifs sont plafonnés par l’administration. Sa carte ne vaut que dans le département de l’examen, sauf stage de mobilité. Le VTC ne travaille que sur réservation préalable (article L3120-2 du code des transports), fixe ses prix librement, exerce partout en France et doit inscrire son entreprise au registre des VTC, ${A.registre_inscription} €. L’accès coûte surtout la licence pour le taxi : gratuite après une liste d’attente, louée, ou achetée entre ${TX.ads_prix_min.toLocaleString('fr-FR')} et ${TX.ads_prix_max.toLocaleString('fr-FR')} € selon service-public. Le VTC dépend plus souvent d’une plateforme et de sa commission.`,
    faqs: [
      { q: 'Est-ce le même examen pour taxi et VTC ?', a: `En grande partie. Les cinq épreuves écrites du tronc commun sont identiques : réglementation du transport public particulier, gestion, sécurité routière, français et anglais. Viennent ensuite deux épreuves propres au métier choisi, dont une sur le territoire et la réglementation locale pour le taxi, puis une épreuve pratique de conduite. L’inscription complète coûte ${A.examen_complet} € dans les deux cas en 2026.` },
      { q: 'Peut-on passer de VTC à taxi sans tout repasser ?', a: `Oui, par la mobilité professionnelle. Un candidat qui a réussi les épreuves d’admissibilité de l’un des métiers depuis moins de ${E.mobilite_validite_ans} ans passe seulement les deux épreuves écrites propres à l’autre métier et l’épreuve pratique, pour ${A.examen_mobilite} € en 2026 selon les chambres de métiers. Au-delà de ce délai, il faut repasser l’examen complet. L’accès au VTC par l’expérience est fermé depuis le 12 août 2026.` },
      { q: 'Un VTC peut-il s’arrêter quand un client lui fait signe ?', a: 'Non. L’article L3120-2 du code des transports interdit à tout conducteur qui n’a pas d’autorisation de stationnement de prendre en charge un client sur la voie publique sans réservation préalable, et de s’arrêter ou de stationner en quête de clients. Seul le taxi, dans la zone de sa licence, peut répondre à un signe de la main ou attendre à une station.' },
      { q: 'Qui gagne le plus, un taxi ou un VTC ?', a: 'Aucune source publique fiable ne permet de trancher en moyenne : tout dépend des heures, de la zone, de la commission de plateforme pour le VTC et du coût de la licence pour le taxi. Le simulateur de revenu net du site compare les deux à partir de vos propres hypothèses et des taux officiels 2026. Le résultat est une estimation, jamais une promesse.' },
      { q: 'Le taxi peut-il transporter des patients pour l’Assurance maladie, et le VTC ?', a: 'Seul le taxi peut devenir taxi conventionné : il signe une convention avec la caisse primaire, sur le modèle de la décision du 13 février 2025, et transporte des patients assis sur prescription médicale. Un VTC ne peut pas être conventionné. Ameli précise qu’un trajet en taxi non conventionné n’est pas remboursé au patient.' },
    ],
    body: (h) => `
<h2>Ce que les deux métiers ont en commun</h2>
<p>Taxi et VTC appartiennent au même ensemble, le transport public particulier de personnes : des prestations payantes avec un véhicule de moins de dix places (${h.src('ctL3120', 'article L3120-1 du code des transports')}). Les deux exigent une carte professionnelle, obtenue après l’examen organisé par les chambres de métiers et de l’artisanat (${h.src('cmaT3p', 'CMA')}), un casier judiciaire compatible et un avis médical favorable. Les deux renouvellent leur carte tous les ${A.carte_validite_ans} ans après un stage de ${A.formation_continue_heures} heures, comme l’explique la page ${h.a('formation-continue-vtc-taxi', 'formation continue')}.</p>
<p>L’examen partage un tronc commun de ${E.tronc_commun.length} épreuves écrites, puis ${E.vtc.length} épreuves propres à chaque métier et une épreuve pratique. Les détails sont dans les pages ${h.a('examen-taxi', 'examen taxi')} et ${h.a('examen-vtc', 'examen VTC')}.</p>

<h2>Le tableau des différences</h2>
${h.table(['', 'Taxi', 'VTC'], [
  ['Épreuves écrites', `${E.tronc_commun.length} communes + ${E.taxi.length} taxi, dont le territoire local`, `${E.tronc_commun.length} communes + ${E.vtc.length} VTC, dont le développement commercial`],
  ['Validité de la carte', 'département de l’examen, sauf mobilité', 'toute la France'],
  ['Trouver des clients', 'maraude et stations dans la zone de la licence, réservation partout', 'réservation préalable uniquement'],
  ['Prix', 'tarifs plafonnés par arrêté, taximètre', 'prix libre, convenu avec le client'],
  ['Titre d’exploitation', 'autorisation de stationnement (licence)', `inscription au registre des VTC, ${h.eur(A.registre_inscription)}`],
  ['Véhicule', 'équipements de taxi : taximètre, lumineux, imprimante', `critères de l’arrêté de 2015 pour un thermique : moins de ${P.vehicule_vtc.age_max_ans} ans, ${P.vehicule_vtc.puissance_min_kw} kW`],
  ['Transport de patients', 'possible en taxi conventionné', 'non'],
], 'Sources : code des transports, L3120-1 et L3120-2 ; service-public, fiches F21907, F31027 et F22127')}

<h2>La clientèle : maraude ou réservation</h2>
<p>C’est la différence de fond. L’article L3120-2 interdit à tout conducteur qui n’a pas d’autorisation de stationnement de prendre en charge un client sur la voie publique sans réservation préalable, et de s’arrêter ou de stationner en quête de clients. Le taxi, lui, détient cette autorisation (${h.src('ctL3121Ads', 'articles L3121-1 et suivants')}) : dans sa zone, il prend les clients qui le hèlent et attend aux stations. Hors de sa zone, il redevient un transport sur réservation.</p>
<p>Concrètement, un taxi d’une grande ville vit beaucoup de la rue, des gares et des aéroports, et des centrales de réservation. Un VTC vit des plateformes et de sa clientèle propre : entreprises, hôtels, particuliers fidélisés. Le premier peut travailler sans téléphone ; le second, jamais sans réservation.</p>

<h2>Le prix : réglementé ou libre</h2>
<p>Les tarifs du taxi sont encadrés : ${h.src('spTarifsTaxi', 'service-public')} décrit des tarifs maximaux fixés par arrêté, appliqués par le taximètre, avec affichage obligatoire dans le véhicule et note remise au client dès ${h.eur(TX.note_obligatoire_des)}. Le VTC fixe son prix avec le client, souvent par l’intermédiaire d’une plateforme qui le calcule et prélève une commission. Pour les chauffeurs de plateforme, les accords conclus dans le cadre de l’autorité des relations sociales des plateformes garantissent au moins ${h.eur(P.plateformes.revenu_min_course)} net par course.</p>

<h2>Ce que coûte l’entrée</h2>
<p>Hors formation, médecin et véhicule, les frais réglementés sont proches : ${h.eur(taxi0.reglementes)} pour le taxi (examen et carte) contre ${h.eur(vtc0.reglementes)} pour le VTC (examen, carte, registre et vignette), selon le moteur du site. L’écart vient d’ailleurs.</p>
<ul>
<li><strong>Pour le taxi, la licence.</strong> Une autorisation gratuite s’obtient par la liste d’attente de la commune, vaut ${TX.ads_gratuite_validite_ans} ans renouvelables et ne se vend pas. Une ancienne licence cessible s’achète à un prix libre, que ${h.src('spTaxi', 'service-public')} situe entre ${h.eur(TX.ads_prix_min)} et ${h.eur(TX.ads_prix_max)}. On peut aussi la louer, autour de ${h.eur(TX.ads_loyer_paris_mois_environ)} par mois à Paris selon la même source. La page ${h.a('licence-taxi', 'licence taxi')} détaille ces trois voies.</li>
<li><strong>Pour le VTC, le véhicule et la garantie.</strong> Le véhicule doit répondre aux critères de l’arrêté, et l’exploitant qui n’est ni propriétaire ni locataire de plus de ${A.location_longue_mois} mois justifie d’une garantie financière de ${h.eur(A.garantie_financiere_par_vehicule)} par véhicule (${h.src('spVtc', 'fiche F31027')}).</li>
</ul>
<p>Le mini-simulateur en haut de page met les deux métiers côte à côte avec votre devis de formation et, pour le taxi, le prix d’une licence achetée. Le ${h.a('cout-acces-metier', 'simulateur de coût d’accès')} ajoute le médecin, le PSC1 et les dépenses de démarrage.</p>

<h2>Les revenus : pas de moyenne publique fiable</h2>
<p>Aucune statistique publique que nous ayons lue ne compare le revenu net moyen d’un taxi et d’un VTC de façon exploitable. Le revenu dépend des heures travaillées, de la zone, du prix moyen des courses, de la commission pour le VTC, du loyer ou du crédit de licence pour le taxi, et du statut. Le ${h.a('revenu-net-chauffeur', 'simulateur de revenu net')} calcule les deux métiers avec les mêmes hypothèses et les taux officiels 2026 : c’est une estimation, à refaire avec vos propres chiffres.</p>

<h2>Comment choisir</h2>
<ul>
<li><strong>Vous voulez démarrer vite, sans capital</strong> : le VTC, avec un véhicule loué et une plateforme, est la voie la plus rapide ; la commission et la concurrence en sont le prix.</li>
<li><strong>Vous visez une clientèle stable et la maraude</strong> : le taxi, si vous pouvez financer ou louer une licence, ou attendre une licence gratuite.</li>
<li><strong>Vous aimez accompagner des patients</strong> : le taxi conventionné, ou le métier voisin de ${h.a('devenir-chauffeur-vsl', 'chauffeur de VSL')}, salarié du transport sanitaire.</li>
<li><strong>Vous hésitez</strong> : la mobilité professionnelle permet de passer de l’un à l’autre en ne repassant que ${E.vtc.length} épreuves écrites et la pratique, pour ${h.eur(A.examen_mobilite)}, dans les ${E.mobilite_validite_ans} ans qui suivent l’admissibilité.</li>
</ul>
<p>Les parcours complets sont dans les pages ${h.a('devenir-taxi', 'devenir taxi')} et ${h.a('devenir-chauffeur-vtc', 'devenir chauffeur VTC')}.</p>
`,
  },
  en: {
    slug: 'taxi-or-vtc',
    nav: 'Taxi or VTC',
    card: 'Exam, card, clients, fares, licence and start-up costs: the differences that decide it.',
    title: 'Taxi or VTC in France 2026: Differences, Costs, Which One',
    description: `Taxi or VTC in France, 2026: same €${A.examen_complet} exam, local or national card, street hails or bookings, capped or free fares, and a taxi licence costing up to €${TX.ads_prix_max.toLocaleString('en-GB')}.`,
    h1: 'Taxi or VTC in France: the real differences and how to choose',
    intro: 'The two jobs share an exam and part of the rules, then part ways on what matters most: where passengers come from and what they pay.',
    resume: `In France, taxi and VTC (private hire) drivers sit the same exam with the chamber of trades (CMA), €${A.examen_complet} in 2026: five shared written papers, two papers specific to each trade, then a practical test. After that everything diverges. Taxis hold the monopoly on street work: only a taxi may pick up someone who hails it or waits at a rank, and only within the area of its licence (autorisation de stationnement, ADS), with fares capped by the authorities. A taxi card is valid only in the département where the exam was taken, unless you take a mobility course. A VTC works only on prior booking (article L3120-2 of the Transport Code), sets its own prices, may work anywhere in France and must enter its business on the VTC register, €${A.registre_inscription}. For a taxi, the big entry cost is the licence: free after a waiting list, rented, or bought for €${TX.ads_prix_min.toLocaleString('en-GB')} to €${TX.ads_prix_max.toLocaleString('en-GB')} according to service-public. A VTC more often depends on a platform and its commission.`,
    faqs: [
      { q: 'Do taxi and VTC drivers sit the same exam in France?', a: `Largely. The five shared written papers are identical: passenger transport rules, business management, road safety, French and English. Then come two papers specific to the chosen trade, including one on the local area and local rules for taxis, and a practical driving test. Full registration costs €${A.examen_complet} for either trade in 2026.` },
      { q: 'Can a VTC driver switch to taxi without starting over?', a: `Yes, through professional mobility. A candidate who passed the written stage of one trade less than ${E.mobilite_validite_ans} years ago sits only the two written papers specific to the other trade plus the practical test, for €${A.examen_mobilite} in 2026 according to the chambers of trades. After that window, the full exam applies again. Access to VTC work through experience closed on 12 August 2026.` },
      { q: 'May a VTC stop when someone waves it down?', a: 'No. Article L3120-2 of the Transport Code forbids any driver without a taxi licence from picking up a passenger on the street without a prior booking, and from stopping or parking to look for passengers. Only a taxi, within its licence area, may respond to a wave or wait at a rank. Inspections target exactly this.' },
      { q: 'Who earns more in France, taxi or VTC drivers?', a: 'No reliable public source settles it on average: it depends on hours, area, platform commission for a VTC and the cost of the licence for a taxi. The site’s net income calculator compares both from your own assumptions and the official 2026 rates. The result is an estimate, never a promise of earnings.' },
      { q: 'Can a VTC carry patients for the health insurance fund like a taxi?', a: 'No. Only a taxi can become a taxi conventionné: it signs an agreement with the local health insurance fund, based on the decision of 13 February 2025, and carries seated patients on prescription. A VTC cannot be approved. Ameli, the health insurance website, states that a ride in a non-approved taxi is not reimbursed.' },
    ],
    body: (h) => `
<h2>What the two trades share</h2>
<p>Taxis and VTCs belong to the same family, private passenger transport: paid journeys in vehicles with fewer than ten seats (${h.src('ctL3120', 'article L3120-1 of the Transport Code')}). Both need a professional card obtained after the exam run by the chambers of trades (${h.src('cmaT3p', 'CMA')}), a compatible criminal record and a favourable medical opinion. Both renew the card every ${A.carte_validite_ans} years after a ${A.formation_continue_heures}-hour course, as the ${h.a('formation-continue-vtc-taxi', 'continuing training')} page explains.</p>
<p>The exam shares ${E.tronc_commun.length} written papers, then ${E.vtc.length} papers specific to each trade and a practical test. Details are in the ${h.a('examen-taxi', 'taxi exam')} and ${h.a('examen-vtc', 'VTC exam')} guides. All papers are in French apart from the English one.</p>

<h2>The differences at a glance</h2>
${h.table(['', 'Taxi', 'VTC'], [
  ['Written papers', `${E.tronc_commun.length} shared + ${E.taxi.length} taxi, including local area knowledge`, `${E.tronc_commun.length} shared + ${E.vtc.length} VTC, including business development`],
  ['Card valid in', 'the exam’s département, unless mobility course', 'all of France'],
  ['Finding passengers', 'street hails and ranks within the licence area, bookings anywhere', 'prior booking only'],
  ['Fares', 'capped by official order, meter', 'free, agreed before the ride'],
  ['Operating document', 'taxi licence (ADS)', `VTC register entry, ${h.eur(A.registre_inscription)}`],
  ['Vehicle', 'taxi equipment: meter, roof light, printer', `2015 order criteria for petrol or diesel: under ${P.vehicule_vtc.age_max_ans} years, ${P.vehicule_vtc.puissance_min_kw} kW`],
  ['Patient transport', 'possible as an approved taxi', 'no'],
], 'Sources: Transport Code, L3120-1 and L3120-2; service-public, pages F21907, F31027 and F22127')}

<h2>Passengers: hails or bookings</h2>
<p>This is the core difference. Article L3120-2 forbids any driver without a taxi licence from picking up a passenger on the street without a prior booking, and from stopping or parking to look for passengers. A taxi holds that licence (${h.src('ctL3121Ads', 'articles L3121-1 onwards')}): within its area it takes passengers who hail it and waits at ranks. Outside its area, it can only work on booking.</p>
<p>In practice, a big-city taxi lives largely off the street, stations, airports and radio dispatch services. A VTC lives off platforms and its own clients: companies, hotels, regular private customers. The first can work without a phone; the second never works without a booking.</p>

<h2>Fares: regulated or free</h2>
<p>Taxi fares are regulated: ${h.src('spTarifsTaxi', 'service-public')} describes maximum fares set by official order, charged through the meter, with a fare notice in the car and a receipt for any fare from ${h.eur(TX.note_obligatoire_des)}. A VTC agrees its price with the passenger, often through a platform that calculates it and takes a commission. For platform drivers, the agreements reached under the platforms’ social relations authority (ARPE) guarantee at least ${h.eur(P.plateformes.revenu_min_course)} net per ride.</p>

<h2>What getting in costs</h2>
<p>Leaving aside training, the doctor and the vehicle, regulated fees are close: ${h.eur(taxi0.reglementes)} for a taxi (exam and card) against ${h.eur(vtc0.reglementes)} for a VTC (exam, card, register and sticker), according to the site’s engine. The gap lies elsewhere.</p>
<ul>
<li><strong>For a taxi, the licence.</strong> A free licence comes through the town’s waiting list, lasts ${TX.ads_gratuite_validite_ans} years, can be renewed and cannot be sold. An older transferable licence sells at a free price, which ${h.src('spTaxi', 'service-public')} puts between ${h.eur(TX.ads_prix_min)} and ${h.eur(TX.ads_prix_max)}. You can also rent one, around ${h.eur(TX.ads_loyer_paris_mois_environ)} a month in Paris according to the same source. The ${h.a('licence-taxi', 'taxi licence')} page covers all three routes.</li>
<li><strong>For a VTC, the car and the guarantee.</strong> The car must meet the order’s criteria, and an operator who neither owns nor leases it for more than ${A.location_longue_mois} months must show a financial guarantee of ${h.eur(A.garantie_financiere_par_vehicule)} per vehicle (${h.src('spVtc', 'page F31027')}).</li>
</ul>
<p>The calculator at the top of the page sets the two trades side by side with your training quote and, for a taxi, the price of a bought licence. The ${h.a('cout-acces-metier', 'start-up cost calculator')} adds the doctor, first-aid training and set-up spending.</p>

<h2>Earnings: no reliable public average</h2>
<p>No public statistic we have read compares the average net income of taxi and VTC drivers in a usable way. Income depends on hours, area, average fare, commission for a VTC, licence rent or loan for a taxi, and business structure. The ${h.a('revenu-net-chauffeur', 'net income calculator')} works out both trades with the same assumptions and the official 2026 rates: an estimate to redo with your own figures.</p>

<h2>How to choose</h2>
<ul>
<li><strong>You want to start fast with little capital</strong>: VTC work with a rented car and a platform is the quickest route; commission and competition are the price.</li>
<li><strong>You want steady custom and street work</strong>: taxi, if you can finance or rent a licence, or wait for a free one.</li>
<li><strong>You like helping patients</strong>: an approved taxi, or the neighbouring job of ${h.a('devenir-chauffeur-vsl', 'VSL driver')}, employed in patient transport.</li>
<li><strong>You cannot decide</strong>: professional mobility lets you switch by sitting only ${E.vtc.length} written papers and the practical test, for ${h.eur(A.examen_mobilite)}, within ${E.mobilite_validite_ans} years of passing the written stage.</li>
</ul>
<p>The full paths are in the ${h.a('devenir-taxi', 'becoming a taxi driver')} and ${h.a('devenir-chauffeur-vtc', 'becoming a VTC driver')} guides.</p>
`,
  },
});
