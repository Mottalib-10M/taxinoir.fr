import { defineGuide } from '../../lib/guide-types';
import { P } from '../../lib/engine/params';

// Valeurs lues dans params-2026.json, bloc `transport_personnes` : code des transports, R3113-8 (licences),
// R3113-31 à R3113-34 (capacité financière), L3112-1 ; code de la route, R311-1. Lus le 4 octobre 2026.
const X = P.transport_personnes;

export default defineGuide({
  id: 'licence-transport',
  group: 'autres',
  order: 90,
  mini: 'licenceTransport',
  miniHref: 'capacite-transport-personnes',
  related: ['capacite-transport-personnes', 'devenir-chauffeur-bus', 'licence-taxi', 'registre-vtc', 'taxi-ou-vtc', 'devenir-chauffeur-livreur'],
  sources: ['ctR3113Licences', 'ctR3113CapFin', 'ctL3113', 'crR311_1', 'ctL3112_1'],
  fr: {
    slug: 'licence-transport',
    nav: 'Licence de transport',
    card: 'Licence communautaire ou intérieure : qui la délivre, pour quels véhicules, avec quels capitaux.',
    title: 'Licence de transport 2026 : communautaire ou intérieure',
    description: `Licence de transport en 2026 : communautaire pour les autocars, intérieure pour les autres véhicules, ${X.licence_validite_max_ans} ans au plus, ${X.capfin_leger_par_vehicule} € de capitaux par véhicule léger.`,
    h1: 'Licence de transport de personnes : laquelle, quand, à quel prix en capitaux',
    intro: 'La licence n’est pas un examen : c’est le titre que reçoit l’entreprise le jour de son inscription au registre.',
    resume: `La licence de transport est délivrée par le préfet de région à une entreprise de transport public routier de personnes au moment de son inscription au registre (code des transports, article R3113-8). Le type dépend des véhicules : une licence communautaire quand l’entreprise utilise un ou plusieurs autobus ou autocars, c’est-à-dire des véhicules de plus de ${X.places_passagers_max_m1} places assises en plus du conducteur, et une licence de transport intérieur pour tous les autres véhicules. Elle vaut ${X.licence_validite_max_ans} ans au plus, renouvelable, est établie au nom de l’entreprise, ne se cède pas et s’accompagne d’autant de copies certifiées conformes numérotées que de véhicules. Pour l’obtenir, il faut un gestionnaire titulaire de l’attestation de capacité, l’honorabilité et des capitaux et réserves de ${X.capfin_leger_par_vehicule} € par véhicule léger, ${X.capfin_car_premier} € pour le premier autocar et ${X.capfin_car_suivant} € par autocar suivant (article R3113-31). La licence de taxi, l’autorisation de stationnement, est un autre titre.`,
    faqs: [
      { q: 'Quelle différence entre licence communautaire et licence de transport intérieur ?', a: `Le véhicule. L’article R3113-8 du code des transports prévoit la licence communautaire quand l’entreprise utilise un ou plusieurs autobus ou autocars, et la licence de transport intérieur quand elle utilise d’autres véhicules. Le code de la route définit l’autobus comme un véhicule de transport en commun, de catégorie M2 ou M3, donc à plus de ${X.places_passagers_max_m1} places assises en plus du conducteur.` },
      { q: 'Combien de temps est valable une licence de transport ?', a: `${X.licence_validite_max_ans} ans au plus, renouvelable, selon l’article R3113-8 du code des transports. La licence doit être restituée au préfet de région à la fin de sa validité, ou si l’autorisation d’exercer est suspendue ou retirée. Entre-temps, l’entreprise doit continuer de remplir les conditions de son inscription, dont la capacité financière vérifiée sur les comptes de chaque exercice.` },
      { q: 'Faut-il une licence de transport pour être chauffeur de taxi ou de VTC ?', a: 'Non. Le taxi exploite une autorisation de stationnement délivrée par la commune ou la préfecture, et le VTC inscrit son entreprise au registre des VTC. Ces deux activités relèvent du titre du code des transports consacré au transport public particulier de personnes, distinct du registre des transporteurs et de ses licences. Les règles de chaque métier ont leur page sur le site.' },
      { q: 'Quels capitaux faut-il pour obtenir une licence de transport intérieur ?', a: `${X.capfin_leger_par_vehicule} € de capitaux et réserves par véhicule de ${X.leger_places_conducteur_inclus} places au plus, conducteur compris (article R3113-31). Avec trois monospaces, il faut donc justifier de ${3 * X.capfin_leger_par_vehicule} €. Une garantie d’un organisme financier peut compléter des capitaux insuffisants, mais dans la limite de la moitié du montant exigé (article R3113-32).` },
      { q: 'Peut-on louer ou prêter sa licence de transport ?', a: 'Non. L’article R3113-8 précise que la licence est établie au nom de l’entreprise et ne peut pas être cédée à un tiers. L’original est conservé à l’établissement principal, et chaque véhicule utilisé correspond à une copie certifiée conforme numérotée. Les copies peuvent être retirées, temporairement ou définitivement, en cas de manquement, selon l’article L3452-1 du code des transports.' },
    ],
    body: (h) => `
<h2>La licence, dernière étape de l’inscription</h2>
<p>Une entreprise de transport public de personnes ne peut pas exercer sans être inscrite au registre tenu par l’État (${h.src('ctL3113', 'article L3113-1 du code des transports')}). L’inscription suppose quatre conditions : un établissement en France, l’honorabilité professionnelle des dirigeants et du gestionnaire de transport, la capacité financière et la capacité professionnelle. Une fois l’inscription prononcée, le préfet de région délivre la licence. C’est donc un titre d’entreprise, pas un diplôme : personne ne « passe » une licence de transport, on l’obtient en remplissant les conditions.</p>
<p>La capacité professionnelle, portée par le gestionnaire, a sa propre page : ${h.a('capacite-transport-personnes', 'capacité de transport de personnes')}. Celle-ci traite de ce qui vient après : le choix de la licence, les capitaux à réunir et les obligations qui suivent.</p>

<h2>Communautaire ou intérieure : tout dépend du véhicule</h2>
<p>L’${h.src('ctR3113Licences', 'article R3113-8')}, dans sa version du 13 août 2022, prévoit deux licences :</p>
<ul>
<li><strong>la licence communautaire</strong>, lorsque l’entreprise utilise un ou plusieurs autobus ou autocars ;</li>
<li><strong>la licence de transport intérieur</strong>, lorsqu’elle utilise un ou plusieurs véhicules autres que des autobus ou des autocars.</li>
</ul>
<p>Pour savoir dans quelle case tombe un véhicule, il faut le ${h.src('crR311_1', 'code de la route')}. Son article R311-1 définit l’autobus comme un véhicule de transport en commun affecté au transport de personnes et de leurs bagages, et le véhicule de transport en commun comme un véhicule de catégorie M2 ou M3, c’est-à-dire comportant plus de ${X.places_passagers_max_m1} places assises en plus du siège du conducteur. L’autocar est un autobus affecté au transport sur de longues distances. Un monospace ou un van de ${X.places_passagers_max_m1} places passagers est de catégorie M1 : il relève de la licence intérieure. Un minibus de seize places passagers relève de la catégorie M2 ou M3 : il appelle la licence communautaire.</p>
<p>Le mini-simulateur en haut de page fait ce tri à partir du nombre de places passagers, et signale le cas où un véhicule léger ne peut pas assurer un service occasionnel.</p>

<h2>Ce que dit la licence, et ce qu’elle interdit</h2>
${h.table(['Règle', 'Contenu', 'Texte'], [
  ['Autorité', 'le préfet de région, lors de l’inscription au registre', 'R3113-8'],
  ['Durée', `${X.licence_validite_max_ans} ans au plus, renouvelable`, 'R3113-8'],
  ['Titulaire', 'l’entreprise, à son nom ; aucune cession à un tiers', 'R3113-8'],
  ['Copies', 'une copie certifiée conforme numérotée par véhicule', 'R3113-8'],
  ['Original', 'conservé à l’établissement principal', 'R3113-8'],
  ['Fin', 'restitution à l’expiration, ou en cas de suspension ou de retrait', 'R3113-8'],
  ['Sanction', 'retrait temporaire ou définitif des copies possible', 'L3452-1'],
], 'Source : code des transports, lu sur Légifrance le 4 octobre 2026')}
<p>Le lien entre copies et véhicules est la clé du système : chaque véhicule exploité correspond à une copie, et le nombre de véhicules détermine aussi les capitaux exigés. Ajouter un véhicule à la flotte, c’est demander une copie de plus et justifier la capacité financière qui va avec.</p>

<h2>La capacité financière, véhicule par véhicule</h2>
<p>L’${h.src('ctR3113CapFin', 'article R3113-31')} fixe le montant des capitaux et réserves dont l’entreprise doit disposer chaque année :</p>
${h.table(['Véhicule', 'Capitaux et réserves exigés'], [
  [`Véhicule de ${X.leger_places_conducteur_inclus} places au plus, conducteur compris`, `${h.eur(X.capfin_leger_par_vehicule)} par véhicule`],
  ['Premier autobus ou autocar', h.eur(X.capfin_car_premier)],
  ['Chaque autobus ou autocar suivant', h.eur(X.capfin_car_suivant)],
], 'Source : code des transports, article R3113-31')}
<p>Quand les capitaux propres ne suffisent pas, l’entreprise peut présenter une garantie donnée par un organisme financier, mais cette garantie ne peut pas couvrir plus de ${h.pct(X.capfin_garantie_part_max, 0)} de la capacité exigée (article R3113-32). À l’inscription, l’entreprise fournit les documents comptables, statutaires ou établis par des organismes financiers qui prouvent le montant disponible. Ensuite, la vérification se fait après chaque exercice, sur les comptes annuels certifiés par un expert-comptable, un commissaire aux comptes, un centre de gestion agréé ou une association de gestion comptable (article R3113-34). Les articles R3113-34-1 à R3113-34-4 organisent la transmission de données fiscales à l’administration : un défaut de transmission, après mise en demeure, peut conduire à la suspension de l’autorisation.</p>
<!--mini:capaciteFinanciere-->

<h2>Une licence intérieure ne permet pas tout</h2>
<p>La licence de transport intérieur couvre les véhicules légers, mais leur usage en service occasionnel est limité. Depuis le 1er janvier 2021, l’${h.src('ctL3112_1', 'article L3112-1')} impose que, lorsque le départ et l’arrivée d’un transport occasionnel sont dans le ressort d’une même autorité organisatrice soumise à l’obligation d’établir un plan de mobilité, le service soit exécuté avec un véhicule de plus de ${X.places_passagers_max_m1} places assises en plus du conducteur. Le même article soumet les services occasionnels en véhicule léger aux interdictions de l’article L3120-2 : pas de prise en charge sur la voie publique sans réservation préalable, pas de stationnement en quête de clients.</p>
<p>Autrement dit, une licence intérieure ne transforme pas un monospace en taxi, ni en VTC. Elle ouvre un transport collectif organisé, sur réservation, dans les limites de ces règles.</p>

<h2>Licence de transport, licence de taxi, registre VTC</h2>
<p>Trois titres portent des noms proches et n’ont rien en commun :</p>
<ul>
<li><strong>la licence de transport</strong>, communautaire ou intérieure, est délivrée par le préfet de région à une entreprise inscrite au registre des transporteurs de personnes ;</li>
<li><strong>la licence de taxi</strong> est l’autorisation de stationnement (ADS), délivrée par le maire ou le préfet pour une zone et un véhicule : elle est expliquée sur la page ${h.a('licence-taxi', 'licence taxi')} ;</li>
<li><strong>l’inscription au registre des VTC</strong> concerne l’exploitant de voitures de transport avec chauffeur : la page ${h.a('registre-vtc', 'registre VTC')} en décrit la démarche.</li>
</ul>
<p>Le transport de marchandises a aussi ses licences, délivrées par le même préfet de région selon des règles voisines (article R3211-12) ; elles sortent du sujet de ce site, consacré au transport de personnes.</p>

<h2>Le parcours, dans l’ordre</h2>
<ol>
<li>Désigner le gestionnaire de transport et obtenir son attestation de capacité professionnelle, complète ou limitée aux véhicules légers.</li>
<li>Créer l’entreprise et réunir les capitaux et réserves correspondant à la flotte prévue, ou une garantie financière dans la limite de la moitié.</li>
<li>Déposer la demande d’inscription au registre auprès des services du préfet de région, avec les justificatifs d’établissement, d’honorabilité et de capacité financière.</li>
<li>Recevoir la licence et ses copies certifiées, une par véhicule.</li>
<li>Conserver l’original à l’établissement principal, transmettre chaque année les comptes, et demander une copie de plus avant de mettre un véhicule supplémentaire en service.</li>
</ol>
<p>Pour la conduite elle-même, les conducteurs d’autocars ont besoin du permis D et de la qualification initiale : voir ${h.a('devenir-chauffeur-bus', 'devenir chauffeur de bus')}. Pour savoir si le transport particulier vous conviendrait mieux, la page ${h.a('taxi-ou-vtc', 'taxi ou VTC')} compare les deux métiers.</p>
`,
  },
  en: {
    slug: 'passenger-transport-licence',
    nav: 'Transport licence',
    card: 'Community or domestic licence: who issues it, for which vehicles, with how much capital.',
    title: 'Transport Licence France 2026: Community or Domestic',
    description: `Transport licence in France, 2026: Community licence for coaches, domestic licence for other vehicles, up to ${X.licence_validite_max_ans} years, €${X.capfin_leger_par_vehicule} of capital per light vehicle.`,
    h1: 'The French passenger transport licence: which one, when, and the capital behind it',
    intro: 'A transport licence is not an exam: it is the document a company receives on the day it joins the register.',
    resume: `In France, the licence de transport is issued by the regional prefect to a public road passenger transport company when it is entered on the register (Transport Code, article R3113-8). Its type depends on the vehicles. A Community licence is issued when the company runs one or more buses or coaches, meaning vehicles with more than ${X.places_passagers_max_m1} seats besides the driver; a domestic transport licence covers every other vehicle. It lasts up to ${X.licence_validite_max_ans} years and can be renewed, is made out in the company’s name, cannot be transferred, and comes with one numbered certified copy per vehicle. To obtain it, the firm needs a transport manager holding the competence certificate, good repute, and capital and reserves of €${X.capfin_leger_par_vehicule} per light vehicle, €${X.capfin_car_premier} for the first coach and €${X.capfin_car_suivant} for each further coach (article R3113-31). A taxi licence is an entirely different document.`,
    faqs: [
      { q: 'What separates a Community licence from a domestic transport licence?', a: `The vehicle. Article R3113-8 of the Transport Code provides a Community licence where the company uses one or more buses or coaches, and a domestic licence where it uses other vehicles. The Highway Code defines a bus as a public transport vehicle of category M2 or M3, which means more than ${X.places_passagers_max_m1} seats besides the driver’s.` },
      { q: 'For how long is a French transport licence issued?', a: `For up to ${X.licence_validite_max_ans} years, renewable, under article R3113-8 of the Transport Code. It has to be returned to the regional prefect when it expires, or if the right to operate is suspended or withdrawn. In between, the company must keep meeting the registration conditions, including financial standing checked against each year’s accounts.` },
      { q: 'Does a taxi or VTC driver need a transport licence?', a: 'No. A taxi runs on a taxi licence (ADS) issued by the town hall or the prefecture, and a VTC operator registers on the VTC register. Both jobs fall under the part of the Transport Code on private passenger transport, separate from the carriers’ register and its licences. Each of those jobs has its own guide on this site.' },
      { q: 'How much capital does a domestic transport licence require?', a: `€${X.capfin_leger_par_vehicule} of capital and reserves per vehicle with ${X.leger_places_conducteur_inclus} seats or fewer including the driver (article R3113-31). Three people carriers therefore mean €${3 * X.capfin_leger_par_vehicule}. A guarantee from a financial institution can top up insufficient capital, but only up to half of the amount required (article R3113-32).` },
      { q: 'Can a transport licence be rented out or lent to another firm?', a: 'No. Article R3113-8 states that the licence is made out in the company’s name and cannot be transferred to a third party. The original stays at the main establishment, and each vehicle in use corresponds to one numbered certified copy. Copies can be withdrawn, temporarily or for good, after breaches, under article L3452-1 of the Transport Code.' },
    ],
    body: (h) => `
<h2>The licence comes at the end of registration</h2>
<p>A public passenger transport company cannot operate without being entered on the register kept by the State (${h.src('ctL3113', 'article L3113-1 of the Transport Code')}). Entry rests on four conditions: an establishment in France, the good repute of the managers and the transport manager, financial standing and professional competence. Once the company is registered, the regional prefect issues the licence. It is a business document, not a qualification: nobody sits a transport licence; a firm earns it by meeting the conditions.</p>
<p>Professional competence, held by the transport manager, has its own guide: ${h.a('capacite-transport-personnes', 'passenger transport competence')}. This page covers what follows: choosing the licence, the capital to set aside and the duties that come with it.</p>

<h2>Community or domestic: the vehicle decides</h2>
<p>${h.src('ctR3113Licences', 'Article R3113-8')}, in its version of 13 August 2022, provides two licences:</p>
<ul>
<li><strong>the Community licence</strong>, when the company uses one or more buses or coaches;</li>
<li><strong>the domestic transport licence</strong> (licence de transport intérieur), when it uses one or more vehicles other than buses or coaches.</li>
</ul>
<p>To place a vehicle, turn to the ${h.src('crR311_1', 'Highway Code')}. Its article R311-1 defines a bus as a public transport vehicle used to carry people and their luggage, and a public transport vehicle as one of category M2 or M3, that is with more than ${X.places_passagers_max_m1} seats besides the driver’s. A coach is a bus used for long-distance journeys. A people carrier or van with ${X.places_passagers_max_m1} passenger seats is category M1 and falls under the domestic licence; a sixteen-passenger minibus is M2 or M3 and calls for the Community licence.</p>
<p>The calculator at the top of the page sorts this out from the number of passenger seats, and flags when a light vehicle cannot run an occasional service.</p>

<h2>What the licence says and what it forbids</h2>
${h.table(['Rule', 'What it means', 'Text'], [
  ['Issuer', 'the regional prefect, on entry to the register', 'R3113-8'],
  ['Term', `up to ${X.licence_validite_max_ans} years, renewable`, 'R3113-8'],
  ['Holder', 'the company, in its own name; no transfer to anyone else', 'R3113-8'],
  ['Copies', 'one numbered certified copy per vehicle', 'R3113-8'],
  ['Original', 'kept at the main establishment', 'R3113-8'],
  ['End', 'returned on expiry, suspension or withdrawal', 'R3113-8'],
  ['Penalty', 'copies may be withdrawn for a time or permanently', 'L3452-1'],
], 'Source: Transport Code, read on Légifrance on 4 October 2026')}
<p>The link between copies and vehicles is the core of the system: each vehicle in service has its copy, and the number of vehicles also sets the capital required. Adding a vehicle means asking for one more copy and proving the financial standing that goes with it.</p>

<h2>Financial standing, vehicle by vehicle</h2>
<p>${h.src('ctR3113CapFin', 'Article R3113-31')} sets the capital and reserves the company must have each year:</p>
${h.table(['Vehicle', 'Capital and reserves required'], [
  [`Vehicle with ${X.leger_places_conducteur_inclus} seats or fewer, driver included`, `${h.eur(X.capfin_leger_par_vehicule)} per vehicle`],
  ['First bus or coach', h.eur(X.capfin_car_premier)],
  ['Each further bus or coach', h.eur(X.capfin_car_suivant)],
], 'Source: Transport Code, article R3113-31')}
<p>Where own funds fall short, the company may provide a guarantee from a financial institution, but it cannot cover more than ${h.pct(X.capfin_garantie_part_max, 0)} of the amount required (article R3113-32). On registration, the company supplies accounting, statutory or bank documents showing what is available. After that, the check happens after each financial year, on annual accounts certified by a chartered accountant, an auditor, an approved management centre or an approved accounting association (article R3113-34). Articles R3113-34-1 to R3113-34-4 arrange for tax data to reach the authorities; failing to supply it, after formal notice, can lead to suspension.</p>
<!--mini:capaciteFinanciere-->

<h2>A domestic licence does not open every door</h2>
<p>The domestic licence covers light vehicles, but their use for occasional services is limited. Since 1 January 2021, ${h.src('ctL3112_1', 'article L3112-1')} has required that, where an occasional journey starts and ends in the area of a single transport authority obliged to adopt a mobility plan, it runs with a vehicle that has more than ${X.places_passagers_max_m1} seats besides the driver’s. The same article subjects occasional services in light vehicles to the bans in article L3120-2: no picking up on the street without a prior booking and no waiting about for passengers.</p>
<p>In short, a domestic licence does not turn a people carrier into a taxi or a private hire car. It allows organised group transport, booked in advance, within those limits.</p>

<h2>Transport licence, taxi licence, VTC register</h2>
<p>Three documents have similar names and nothing else in common:</p>
<ul>
<li><strong>the transport licence</strong>, Community or domestic, issued by the regional prefect to a company on the passenger carriers’ register;</li>
<li><strong>the taxi licence</strong>, the autorisation de stationnement (ADS), issued by the mayor or the prefect for one area and one vehicle and explained on the ${h.a('licence-taxi', 'taxi licence')} page;</li>
<li><strong>the VTC register entry</strong>, for businesses running private hire cars, covered on the ${h.a('registre-vtc', 'VTC register')} page.</li>
</ul>
<p>Road haulage has its own licences, issued by the same regional prefect under similar rules (article R3211-12); they fall outside this site, which is about carrying people.</p>

<h2>The steps, in order</h2>
<ol>
<li>Appoint the transport manager and obtain their competence certificate, full or limited to light vehicles.</li>
<li>Set up the company and gather the capital and reserves matching the planned fleet, or a financial guarantee for up to half.</li>
<li>File the registration request with the regional prefect’s services, with proof of establishment, good repute and financial standing.</li>
<li>Receive the licence and its certified copies, one per vehicle.</li>
<li>Keep the original at the main establishment, send in the accounts each year, and ask for another copy before putting an extra vehicle into service.</li>
</ol>
<p>All of this runs in French with the regional administration, so allow time for forms and correspondence. For the driving itself, coach drivers need a D licence and the initial qualification: see ${h.a('devenir-chauffeur-bus', 'becoming a bus driver')}. To see whether private passenger transport would suit you better, the ${h.a('taxi-ou-vtc', 'taxi or VTC')} page compares the two trades.</p>
`,
  },
});
