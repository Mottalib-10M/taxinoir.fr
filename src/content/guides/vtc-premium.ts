import { defineGuide } from '../../lib/guide-types';
import { P } from '../../lib/engine/params';

// Valeurs lues dans params-2026.json : blocs `vehicule_vtc` (arrêté du 26 mars 2015, version du
// 6 décembre 2023), `tva` (CGI, art. 279 b quater), `micro` (Urssaf). Aucun prix de marché : la page
// ne publie que des règles et laisse les tarifs à la saisie du visiteur.
const V = P.vehicule_vtc;
const M = P.micro;
const TVA = P.tva;

export default defineGuide({
  id: 'vtc-premium',
  group: 'vtc',
  order: 110,
  mini: 'tarifPremium',
  miniHref: 'revenu-net-chauffeur',
  related: ['vehicule-vtc', 'devenir-chauffeur-vtc', 'statut-vtc', 'tva-vtc-taxi', 'charges-comptabilite-vtc', 'registre-vtc'],
  sources: ['arreteVehicule', 'arreteReservationVtc', 'ctL3120', 'cgi279', 'urssafAe', 'ctL3131'],
  fr: {
    slug: 'vtc-premium-chauffeur-prive',
    nav: 'VTC premium',
    card: 'Chauffeur privé haut de gamme : clientèle d’affaires, véhicule, contrat et calcul du tarif horaire.',
    title: 'VTC premium, chauffeur privé 2026 : clientèle, voiture, prix',
    description: `VTC premium et chauffeur privé en 2026 : clientèle d’affaires et hôtels, véhicule de moins de ${V.age_max_ans} ans, réservation préalable, TVA à ${Math.round(TVA.taux_transport * 100)} %, tarif horaire.`,
    h1: 'VTC premium et chauffeur privé haut de gamme : se positionner, s’équiper, fixer son prix',
    intro: 'Le haut de gamme n’est pas un statut à part : c’est un VTC qui vend du temps, de la discrétion et de la fiabilité plutôt que des kilomètres.',
    resume: `Le VTC premium, ou chauffeur privé haut de gamme, n’a pas de régime juridique propre : il obéit aux mêmes règles que tout chauffeur VTC. Il faut la carte professionnelle obtenue après l’examen, l’inscription de l’entreprise au registre des VTC, un véhicule conforme à l’arrêté du 26 mars 2015, soit pour un modèle thermique moins de ${V.age_max_ans} ans, ${V.portes_min} portes, ${V.longueur_min_m.toString().replace('.', ',')} m de long, ${V.largeur_min_m.toString().replace('.', ',')} m de large et ${V.puissance_min_kw} kW, l’hybride et l’électrique en étant dispensés, et une réservation préalable pour chaque prise en charge. Ce qui change, c’est le modèle économique. Le chauffeur vend surtout des mises à disposition à l’heure ou à la journée et des transferts réservés à l’avance, à une clientèle d’entreprises, d’hôtels, d’agences d’événements et de particuliers exigeants. Son tarif se construit à partir de ses frais, de ses heures réellement facturées, des cotisations et de la TVA à ${Math.round(TVA.taux_transport * 100)} % sur le transport de voyageurs, pas à partir d’un prix au kilomètre.`,
    faqs: [
      { q: 'Faut-il une carte spéciale pour être chauffeur privé de luxe ?', a: 'Non. Aucun texte ne crée de carte ni de statut « premium ». Un chauffeur qui transporte des clients à titre onéreux dans un véhicule de moins de dix places relève des règles des VTC : examen de la chambre de métiers, carte professionnelle, inscription au registre et véhicule conforme. Le haut de gamme est un positionnement commercial, pas une catégorie juridique.' },
      { q: 'Quelle voiture choisir pour faire du VTC haut de gamme ?', a: `Le texte fixe un minimum, pas un niveau de gamme. Pour un véhicule thermique, l’arrêté du 26 mars 2015 exige moins de ${V.age_max_ans} ans, ${V.portes_min} portes, au moins ${V.longueur_min_m.toString().replace('.', ',')} m sur ${V.largeur_min_m.toString().replace('.', ',')} m et ${V.puissance_min_kw} kW ; les hybrides et électriques en sont dispensés. Au-delà, le choix tient à votre clientèle : espace arrière, coffre pour les bagages, silence, discrétion de la couleur.` },
      { q: 'Comment fixer un tarif horaire de chauffeur privé ?', a: `En partant du revenu que vous visez, pas du prix des concurrents. Additionnez votre net mensuel souhaité et vos frais, divisez par la part qui reste après cotisations (${(M.taux_bic_services * 100).toFixed(1).replace('.', ',')} % plus la formation professionnelle en micro-entreprise), puis par vos heures réellement facturées. Ajoutez ${Math.round(TVA.taux_transport * 100)} % de TVA si vous la collectez. Le mini-simulateur fait ce calcul.` },
      { q: 'Un chauffeur privé peut-il attendre son client devant un hôtel ?', a: 'Seulement s’il a une réservation. L’article L3120-2 du code des transports interdit au VTC de prendre en charge un client sur la voie publique sans réservation préalable, et de s’arrêter ou stationner en quête de clients. Le justificatif, papier ou électronique, doit mentionner notamment le client, la date et l’heure de la réservation et le lieu de prise en charge (arrêté du 6 août 2025).' },
      { q: 'Le chauffeur salarié d’une entreprise a-t-il besoin d’une carte VTC ?', a: 'Pas forcément. L’article L3131-1 du code des transports permet aux entreprises et associations d’organiser des services privés de transport de personnes pour leurs besoins normaux, comme le transport de leur personnel ; ces services ne relèvent pas du transport public. Dès que vous facturez vos trajets à des clients extérieurs, en revanche, ce sont les règles des VTC qui s’appliquent.' },
    ],
    body: (h) => `
<h2>Ce que la loi exige, premium ou non</h2>
<p>Le mot « premium » n’apparaît dans aucun texte. Le code des transports range toute prestation payante de transport de personnes avec un véhicule de moins de dix places, hors transport collectif et transport privé, dans le même titre que le taxi et le VTC (${h.src('ctL3120', 'article L3120-1')}). Le chauffeur haut de gamme est donc un chauffeur VTC : il passe l’examen de la chambre de métiers, obtient sa carte professionnelle, inscrit son entreprise au registre et roule dans un véhicule conforme. Le parcours complet est décrit dans la page ${h.a('devenir-chauffeur-vtc', 'devenir chauffeur VTC')}.</p>
<p>Il obéit aussi à la règle qui distingue le VTC du taxi : la réservation préalable. Sans elle, il ne peut ni prendre en charge un client sur la voie publique, ni s’arrêter ou stationner en quête de clients (article L3120-2). À chaque course, il doit pouvoir présenter un justificatif dont l’${h.src('arreteReservationVtc', 'arrêté du 6 août 2025')} fixe le contenu. Pour une clientèle d’affaires, cette contrainte n’en est pas une : tout se réserve, souvent plusieurs jours à l’avance.</p>

<h2>Le véhicule : le minimum légal, puis le choix commercial</h2>
<p>L’${h.src('arreteVehicule', 'arrêté du 26 mars 2015')}, dans sa version en vigueur, fixe les caractéristiques minimales d’un véhicule de VTC thermique :</p>
${h.table(['Critère', 'Exigence', 'Véhicules hybrides et électriques'], [
  ['Âge', `moins de ${V.age_max_ans} ans, sauf véhicule de collection`, 'dispensés'],
  ['Portes', `au moins ${V.portes_min}`, 'dispensés'],
  ['Dimensions', `au moins ${h.num(V.longueur_min_m, 2)} m de long et ${h.num(V.largeur_min_m, 2)} m de large`, 'dispensés'],
  ['Puissance', `au moins ${V.puissance_min_kw} kW`, 'dispensés'],
  ['Places', `de ${V.places_min} à ${V.places_max}, conducteur compris`, 'même règle'],
], 'Sources : arrêté du 26 mars 2015, articles 1 et 2 ; service-public, fiche F31027')}
<p>Ce socle est le même pour une berline d’entrée de gamme et pour une limousine. Le ${h.a('vehicule-vtc', 'contrôle du véhicule')} du site vérifie chaque critère à partir de la carte grise. Au-delà, le haut de gamme se joue sur ce que le client voit et ressent : espace aux places arrière, volume du coffre pour les bagages d’aéroport, insonorisation, propreté irréprochable, couleur sobre. Un van de six ou sept places ouvre la clientèle des familles et des petits groupes ; une berline reste le standard des déplacements d’affaires.</p>
<p>Le véhicule est aussi le premier poste de charges. Location longue durée, crédit ou location courte : chaque formule a un coût mensuel que vous intégrerez au tarif. Le site ne publie pas de prix de véhicule, qui dépendent de vos devis.</p>

<h2>La clientèle : qui achète du haut de gamme</h2>
<ul>
<li><strong>Les entreprises</strong> : déplacements de dirigeants, accueil de visiteurs, navettes de séminaires. Elles attendent une facture en bonne et due forme, souvent un contrat-cadre, et un paiement sur facture plutôt qu’à la course.</li>
<li><strong>Les hôtels et conciergeries</strong> : transferts d’aéroport et mises à disposition pour leurs clients. La relation se construit sur la fiabilité : un retard coûte le contrat.</li>
<li><strong>Les agences d’événements et de voyages</strong> : salons, mariages, tournages, délégations. Elles réservent en volume, demandent des devis précis et parfois plusieurs véhicules.</li>
<li><strong>Les particuliers</strong> : soirées, mariages, longs trajets. Une clientèle plus irrégulière, sensible à la recommandation.</li>
</ul>
<p>Pour chacune, ce qui se vend est la tranquillité : chauffeur ponctuel, tenue soignée, conduite souple, discrétion sur ce qui se dit à bord, maîtrise de l’anglais pour la clientèle internationale. L’épreuve d’anglais de l’examen fixe un plancher ; une clientèle d’affaires en attend davantage.</p>

<h2>Vendre du temps plutôt que des kilomètres</h2>
<p>Le chauffeur de plateforme est payé à la course. Le chauffeur privé vend surtout du temps : une mise à disposition à l’heure, à la demi-journée ou à la journée, avec l’attente comprise, ou un transfert réservé à prix fixé d’avance. Ce modèle change le calcul. Ce qui compte n’est plus le nombre de courses, mais le nombre d’heures facturées dans le mois, et la part d’heures perdues : trajets à vide pour rejoindre le client, attente non payée, journées creuses.</p>
<p>Un devis clair évite les litiges. Précisez ce qui est compris (durée, kilométrage ou zone, attente, péages, stationnement), ce qui est facturé en sus, et vos conditions d’annulation. Faites connaître le prix total au client avant la prestation.</p>

<h2>Construire son tarif horaire</h2>
<p>Le mini-simulateur en haut de page part de votre objectif : le revenu net mensuel visé et vos frais mensuels, véhicule, assurance, carburant, téléphone, comptable. En micro-entreprise, l’${h.src('urssafAe', 'Urssaf')} prélève ${h.pct(M.taux_bic_services)} du chiffre d’affaires, plus ${h.pct(M.cfp_artisan)} pour la formation professionnelle : le chiffre d’affaires à atteindre est donc la somme du net et des frais, divisée par ce qui reste après ces prélèvements. Divisé par vos heures facturées, il donne le tarif horaire hors taxe. Si vous dépassez la franchise de ${h.eur(TVA.franchise_services)} de chiffre d’affaires, ou si vous optez pour la TVA, ajoutez ${h.pct(TVA.taux_transport, 0)} : c’est le taux du transport de voyageurs (${h.src('cgi279', 'article 279 b quater du code général des impôts')}).</p>
<p>Le résultat n’est pas un prix de marché : c’est le tarif plancher qui couvre vos objectifs. S’il dépasse ce que votre clientèle accepte, il faut jouer sur les heures facturées, les frais ou le statut, que la page ${h.a('statut-vtc', 'statut VTC')} compare. Les frais déductibles au régime réel sont listés dans la page ${h.a('charges-comptabilite-vtc', 'charges et comptabilité')}.</p>

<h2>Chauffeur privé salarié : un autre cadre</h2>
<p>« Chauffeur privé » désigne parfois un salarié. Une entreprise ou une association peut organiser des services privés de transport pour ses besoins normaux de fonctionnement, notamment pour son personnel (${h.src('ctL3131', 'article L3131-1 du code des transports')}) : ces services ne sont pas du transport public, et le chauffeur est payé selon son contrat de travail. Dès que vous transportez des clients extérieurs contre paiement, vous revenez dans le régime des VTC, avec carte, registre et réservation préalable.</p>

<h2>Les erreurs qui coûtent une clientèle</h2>
<ol>
<li>Prendre un client qui vous hèle devant un hôtel sans réservation : c’est l’infraction que les contrôles visent en premier.</li>
<li>Sous-estimer les heures non facturées : trajets d’approche, attente, journées vides.</li>
<li>Négliger la facture : une entreprise ne règle pas sans facture conforme, et la ${h.a('tva-vtc-taxi', 'TVA')} doit y être juste.</li>
<li>Laisser vieillir un véhicule thermique : au-delà de ${V.age_max_ans} ans, il n’est plus conforme, quelle que soit sa gamme.</li>
</ol>
<p>Le ${h.a('registre-vtc', 'registre des VTC')} doit refléter chaque véhicule utilisé : un second véhicule pour une prestation de groupe se déclare comme le premier.</p>
`,
  },
  en: {
    slug: 'premium-vtc-private-chauffeur',
    nav: 'Premium VTC',
    card: 'High-end private chauffeur: business clients, vehicle, contracts and working out an hourly rate.',
    title: 'Premium VTC and Private Chauffeur France 2026: Rates, Cars',
    description: `Premium VTC and private chauffeur work in France, 2026: business and hotel clients, compliant car under ${V.age_max_ans} years old, prior booking, ${Math.round(TVA.taux_transport * 100)}% VAT and an hourly rate.`,
    h1: 'Premium VTC and private chauffeur work in France: positioning, car and pricing',
    intro: 'High-end chauffeuring is not a separate legal status: it is VTC work that sells time, discretion and reliability rather than distance.',
    resume: `A premium VTC driver or high-end private chauffeur in France has no legal regime of their own: the same rules apply as to any VTC (private hire) driver. You need the professional card obtained after the exam, the business entered on the VTC register, a vehicle meeting the order of 26 March 2015, which for a petrol or diesel car means under ${V.age_max_ans} years old, ${V.portes_min} doors, ${V.longueur_min_m} m long, ${V.largeur_min_m} m wide and ${V.puissance_min_kw} kW, with hybrids and electric cars exempt, and a prior booking for every pick-up. What changes is the business model. A chauffeur mostly sells hourly or daily hire and pre-booked transfers to companies, hotels, event agencies and demanding private clients. The rate is built from costs, hours actually billed, social contributions and the ${Math.round(TVA.taux_transport * 100)}% VAT on passenger transport, not from a price per kilometre.`,
    faqs: [
      { q: 'Is there a special licence for luxury chauffeur work in France?', a: 'No. No law creates a “premium” card or status. Anyone carrying passengers for payment in a vehicle with fewer than ten seats falls under the VTC rules: the chamber of trades exam, the professional card, entry on the register and a compliant vehicle. High-end is a market position, not a legal category, so the route in is the same as for any VTC driver.' },
      { q: 'Which car works for high-end VTC in France?', a: `The law sets a minimum, not a class. For a petrol or diesel car, the order of 26 March 2015 requires under ${V.age_max_ans} years, ${V.portes_min} doors, at least ${V.longueur_min_m} m by ${V.largeur_min_m} m and ${V.puissance_min_kw} kW; hybrids and electric cars are exempt. Beyond that, your clients decide: rear legroom, boot space for luggage, quietness and a discreet colour.` },
      { q: 'How should a private chauffeur set an hourly rate?', a: `Start from the income you want, not from competitors’ prices. Add your target monthly net to your costs, divide by what remains after contributions (${(M.taux_bic_services * 100).toFixed(1)}% plus the training levy as a micro-entrepreneur), then by the hours you actually bill. Add ${Math.round(TVA.taux_transport * 100)}% VAT if you charge it. The calculator at the top of the page does the sums.` },
      { q: 'Can a chauffeur wait for passengers outside a hotel?', a: 'Only with a booking. Article L3120-2 of the Transport Code forbids a VTC from picking up a passenger on the street without a prior booking, and from stopping or parking to look for passengers. The proof of booking, on paper or on screen, must show among other things the client, the date and time of booking and the pick-up place (order of 6 August 2025).' },
      { q: 'Does a chauffeur employed by a company need a VTC card?', a: 'Not necessarily. Article L3131-1 of the Transport Code lets companies and associations run private passenger services for their normal needs, such as carrying their staff; those services are not public transport. As soon as you bill journeys to outside clients, though, the VTC rules apply in full.' },
    ],
    body: (h) => `
<h2>What the law requires, premium or not</h2>
<p>The word “premium” appears in no French law. The Transport Code places every paid passenger journey in a vehicle with fewer than ten seats, other than group and private transport, under the same title as taxis and VTCs (${h.src('ctL3120', 'article L3120-1')}). A high-end chauffeur is therefore a VTC driver: they pass the chamber of trades exam, get the professional card, enter the business on the register and drive a compliant car. The full process is set out in the ${h.a('devenir-chauffeur-vtc', 'becoming a VTC driver')} guide.</p>
<p>The rule that separates VTCs from taxis applies too: the prior booking. Without one, a chauffeur may not pick anyone up on the street or stop or park to look for passengers (article L3120-2). For every job, they must be able to show proof of booking with the content set by the ${h.src('arreteReservationVtc', 'order of 6 August 2025')}. With business clients this is hardly a constraint: everything is booked, often days ahead.</p>

<h2>The car: the legal minimum, then a commercial choice</h2>
<p>The ${h.src('arreteVehicule', 'order of 26 March 2015')}, as in force, sets the minimum features of a petrol or diesel VTC:</p>
${h.table(['Criterion', 'Requirement', 'Hybrid and electric vehicles'], [
  ['Age', `under ${V.age_max_ans} years, except collector vehicles`, 'exempt'],
  ['Doors', `at least ${V.portes_min}`, 'exempt'],
  ['Size', `at least ${h.num(V.longueur_min_m, 2)} m long and ${h.num(V.largeur_min_m, 2)} m wide`, 'exempt'],
  ['Power', `at least ${V.puissance_min_kw} kW`, 'exempt'],
  ['Seats', `${V.places_min} to ${V.places_max}, driver included`, 'same rule'],
], 'Sources: order of 26 March 2015, articles 1 and 2; service-public, page F31027')}
<p>That baseline is the same for an entry-level saloon and a limousine. The site’s ${h.a('vehicule-vtc', 'vehicle check')} tests each point from the registration certificate. Beyond it, high-end work is about what the passenger sees and feels: rear legroom, boot space for airport luggage, a quiet cabin, spotless cleanliness and a sober colour. A six- or seven-seat van opens up families and small groups; a saloon remains the standard for business travel.</p>
<p>The car is also your largest cost. Long-term lease, loan or short rental, each comes with a monthly figure that goes into your rate. We do not publish vehicle prices, which depend on your own quotes.</p>

<h2>Who buys high-end chauffeuring</h2>
<ul>
<li><strong>Companies</strong>: executive travel, visitors, seminar shuttles. They expect a proper invoice, often a framework contract, and payment on invoice rather than per ride.</li>
<li><strong>Hotels and concierge services</strong>: airport transfers and hourly hire for their guests. The relationship rests on reliability: one late arrival can cost the account.</li>
<li><strong>Event and travel agencies</strong>: trade fairs, weddings, film shoots, delegations. They book in volume, want precise quotes and sometimes several vehicles.</li>
<li><strong>Private clients</strong>: evenings out, weddings, long trips. A less regular market that runs on word of mouth.</li>
</ul>
<p>Across all of them, what sells is peace of mind: punctuality, smart dress, smooth driving, discretion about what is said on board, and good English for international clients. If English is your first language, that is a real asset in this segment; your French must still be good enough for the exam and for French-speaking clients.</p>

<h2>Selling time rather than distance</h2>
<p>A platform driver is paid per ride. A private chauffeur mostly sells time: hire by the hour, half-day or day with waiting included, or a transfer at a price agreed in advance. That changes the maths. What matters is not the number of rides but the hours billed in a month, and the share of hours lost: empty runs to reach the client, unpaid waiting, quiet days.</p>
<p>A clear quote prevents disputes. State what is included (duration, mileage or area, waiting, tolls, parking), what is charged on top, and your cancellation terms. Make sure the client knows the total price before the job.</p>

<h2>Working out your hourly rate</h2>
<p>The calculator at the top of the page starts from your goal: the monthly net income you want and your monthly costs for car, insurance, fuel, phone and accountant. As a micro-entrepreneur, ${h.src('urssafAe', 'Urssaf')} takes ${h.pct(M.taux_bic_services)} of turnover plus ${h.pct(M.cfp_artisan)} for vocational training, so the turnover you need is net plus costs divided by what is left after those deductions. Divided by billed hours, that gives the hourly rate before VAT. If you go over the ${h.eur(TVA.franchise_services)} VAT exemption threshold, or opt in, add ${h.pct(TVA.taux_transport, 0)}: the rate for passenger transport (${h.src('cgi279', 'article 279 b quater of the General Tax Code')}).</p>
<p>The result is not a market price but the floor that meets your goals. If it is more than your clients will pay, adjust billed hours, costs or business structure, compared on the ${h.a('statut-vtc', 'VTC business structure')} page. Deductible costs under the real regime are listed on the ${h.a('charges-comptabilite-vtc', 'costs and bookkeeping')} page.</p>

<h2>Employed chauffeurs: a different framework</h2>
<p>“Private chauffeur” sometimes means an employee. A company or association may run private transport for its normal needs, notably for its own staff (${h.src('ctL3131', 'article L3131-1 of the Transport Code')}): that is not public transport, and the driver is paid under an employment contract. As soon as you carry outside clients for payment, you are back under the VTC rules, with card, register and prior booking.</p>

<h2>Mistakes that lose clients</h2>
<ol>
<li>Taking a passenger who hails you outside a hotel without a booking: the offence inspections look for first.</li>
<li>Underestimating unbilled hours: positioning runs, waiting, empty days.</li>
<li>Neglecting invoices: companies do not pay without a compliant invoice, and the ${h.a('tva-vtc-taxi', 'VAT')} on it must be right.</li>
<li>Letting a petrol or diesel car age out: past ${V.age_max_ans} years it is no longer compliant, however upmarket.</li>
</ol>
<p>The ${h.a('registre-vtc', 'VTC register')} must list every vehicle you use: a second car for a group job is declared just like the first.</p>
`,
  },
});
