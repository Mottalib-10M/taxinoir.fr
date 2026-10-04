import { defineGuide } from '../../lib/guide-types';
import { P } from '../../lib/engine/params';
import { displayDate, formatMoney } from '../../lib/format';

const X = P.taxi;
const G = P.gerance;
const dfr = (iso: string) => displayDate(iso, 'fr-FR');
const den = (iso: string) => displayDate(iso, 'en-GB');
const fe = (n: number, l: 'fr' | 'en') => formatMoney(n, 0, l);

export default defineGuide({
  id: 'location-licence-taxi',
  group: 'taxi',
  order: 50,
  mini: 'gerance',
  related: ['licence-taxi', 'devenir-taxi', 'artisan-taxi', 'salaire-taxi', 'taxi-conventionne'],
  sources: ['ctL3121Ads', 'spTaxi', 'spLocationGerance', 'ctL3124Ads'],
  fr: {
    slug: 'location-licence-taxi',
    nav: 'Location de licence taxi',
    card: 'Location-gérance, taxi locataire, salariat : ce que permet le code des transports et ce que coûte le loyer.',
    title: 'Location licence taxi 2026 : gérance, locataire et loyer',
    description: `Location de licence taxi en 2026 : seules les licences d’avant octobre 2014 se louent, en gérance d’au moins ${X.location_gerance_min_ans} an, loyer d’environ ${fe(X.ads_loyer_paris_mois_environ, 'fr')} par mois à Paris.`,
    h1: 'Louer une licence de taxi : location-gérance et taxi locataire',
    intro: 'Le code des transports ne permet de louer que certaines licences, et seulement sous une forme précise.',
    resume: `Louer une licence de taxi, c’est exploiter l’autorisation de stationnement d’un autre en lui versant un loyer. Le code des transports l’encadre strictement. Depuis la loi du 1er octobre 2014, le titulaire d’une licence doit l’exploiter personnellement (article L3121-1-2), et les licences délivrées après cette date sont incessibles et valables cinq ans (article L3121-2) : elles ne se louent pas. Seules les licences délivrées avant le ${dfr(X.ads_date_incessibilite)} peuvent être exploitées par des salariés ou par un locataire-gérant, à qui l’on concède la location de la licence et du véhicule selon les règles de la location-gérance du code de commerce, ou par une coopérative qui loue le taxi à ses coopérateurs. Service-public précise que le contrat dure au moins ${X.location_gerance_min_ans} an, que le loueur entretient le véhicule, que le locataire garde toutes ses recettes et qu’il n’a pas droit à l’assurance chômage. Le loyer, libre, avoisine ${fe(X.ads_loyer_paris_mois_environ, 'fr')} par mois à Paris selon la même source.`,
    faqs: [
      { q: 'Peut-on louer n’importe quelle licence de taxi ?', a: `Non. Les licences délivrées après le ${dfr(X.ads_date_incessibilite)} sont incessibles et doivent être exploitées personnellement par leur titulaire, selon les articles L3121-1-2 et L3121-2 du code des transports. Seules les licences plus anciennes peuvent être confiées à un locataire-gérant, à des salariés ou à une coopérative. Avant de signer, demandez la date de délivrance de la licence : elle figure sur l’arrêté d’attribution.` },
      { q: 'Quel loyer prévoir pour une licence louée en location-gérance ?', a: `Service-public indique un loyer mensuel d’environ ${fe(X.ads_loyer_paris_mois_environ, 'fr')} à Paris, en précisant que le montant dépend de l’entreprise de location. Aucun texte ne fixe ce loyer : il se négocie. Le loueur entretient le véhicule selon la même fiche ; carburant, cotisations et frais personnels restent à votre charge. Le mini-simulateur calcule les recettes hebdomadaires nécessaires pour garder un net donné avec ce loyer.` },
      { q: 'Quelle est la durée minimale d’un contrat de location-gérance de taxi ?', a: `${X.location_gerance_min_ans} an, selon la fiche de service-public consacrée au métier de taxi. Le contrat suit les règles générales de la location-gérance du code de commerce, auxquelles renvoie l’article L3121-1-2 du code des transports : publication dans un support d’annonces légales dans les ${G.publication_jours} jours de la signature et immatriculation du locataire-gérant dans les ${G.immatriculation_jours} jours du début d’activité.` },
      { q: 'Un taxi locataire a-t-il droit au chômage ?', a: 'Non. Service-public précise qu’un taxi qui loue sa licence n’est pas couvert par l’assurance chômage en cas d’arrêt de son activité : il est travailleur indépendant, pas salarié. C’est l’une des différences majeures avec le chauffeur salarié d’une entreprise de taxis, qui touche un fixe et un pourcentage des recettes et relève du régime des salariés.' },
      { q: 'La location d’une licence compte-t-elle pour le conventionnement CPAM ?', a: 'La convention-cadre approuvée par l’arrêté du 29 juillet 2025 ouvre le conventionnement au titulaire de la licence « ou à son exploitant », s’il justifie d’au moins trois ans d’exploitation effective et continue de cette licence. Un locataire-gérant est l’exploitant de la licence qu’il loue. Le service-public rappelle aussi que la priorité pour une licence gratuite va aux taxis salariés ou locataires en activité depuis deux ans.' },
    ],
    body: (h) => `
<h2>Ce que dit le code des transports</h2>
<p>Trois phrases du code règlent la question. Elles figurent dans les ${h.src('ctL3121Ads', 'articles L3121-1 à L3121-8')}, tels que modifiés par la loi du 1er octobre 2014 sur les taxis et les VTC.</p>
<ol>
<li><strong>L’exploitation personnelle.</strong> L’article L3121-1-2 pose le principe : le titulaire exploite personnellement l’autorisation de stationnement, et justifie de son exploitation effective et continue dans des conditions fixées par décret.</li>
<li><strong>L’exception pour les licences anciennes.</strong> Le même article prévoit que, lorsqu’une personne est titulaire d’une ou plusieurs licences délivrées avant le ${h.date(X.ads_date_incessibilite)}, l’exploitation peut en être assurée par des salariés, ou par un locataire-gérant auquel la location de la licence et du véhicule a été concédée dans les conditions des articles L144-1 à L144-13 du code de commerce. Elle peut aussi l’être par une société coopérative ouvrière de production, titulaire des licences, qui loue le taxi à ses coopérateurs autorisés à conduire.</li>
<li><strong>L’incessibilité des licences récentes.</strong> L’article L3121-2 dispose que les licences délivrées après la loi de 2014 sont incessibles et valables cinq ans, renouvelables.</li>
</ol>
<p>La conséquence est directe : seules les licences antérieures au ${h.date(X.ads_date_incessibilite)} peuvent être louées. Une licence gratuite attribuée récemment par une mairie ne peut ni se vendre ni se louer ; son titulaire doit la faire rouler lui-même. La page ${h.a('licence-taxi', 'licence de taxi')} détaille ces deux régimes.</p>

<h2>Location-gérance, « taxi locataire », salariat : trois montages</h2>
${h.table(['Montage', 'Ce que vous avez', 'Ce que vous payez', 'Statut'], [
  ['Locataire-gérant', 'la licence et le véhicule, loués ensemble', `un loyer mensuel, environ ${h.eur(X.ads_loyer_paris_mois_environ)} à Paris selon service-public`, 'indépendant, pas d’assurance chômage'],
  ['Coopérateur d’une coopérative', 'le taxi loué par la coopérative', 'la location prévue par la coopérative', 'selon les statuts de la coopérative'],
  ['Salarié', 'un véhicule de l’entreprise', 'rien : vous touchez un fixe et un pourcentage des recettes', 'salarié'],
], 'Montages prévus par l’article L3121-1-2 pour les licences antérieures au 1er octobre 2014')}
<p>Dans le langage courant, on parle de « taxi locataire » pour le premier montage. C’est aussi le terme de ${h.src('spTaxi', 'service-public')}, qui le décrit ainsi : vous louez une licence auprès d’une entreprise spécialisée dans la location de licences de taxi, par un contrat de location-gérance d’au moins ${X.location_gerance_min_ans} an ; vous payez un loyer mensuel ; l’entreprise de location entretient le véhicule ; vous percevez la totalité de vos recettes ; vous n’êtes pas couvert par l’assurance chômage en cas d’arrêt.</p>

<h2>Les règles de la location-gérance</h2>
<p>Le code des transports renvoie au code de commerce, dont la fiche ${h.src('spLocationGerance', 'location-gérance de service-public')} résume les règles générales :</p>
<ul>
<li>le contrat est publié sous forme d’extrait ou d’avis dans un support d’annonces légales, dans les ${G.publication_jours} jours qui suivent sa signature ;</li>
<li>le locataire-gérant s’immatricule dans les ${G.immatriculation_jours} jours du début de son activité ;</li>
<li>entre la signature et la publication, le loueur et le locataire-gérant sont solidairement responsables des dettes nées de l’exploitation ;</li>
<li>la redevance est libre et soumise à la TVA au taux normal de ${h.pct(G.tva_redevance, 0)}, que le loueur peut répercuter si le contrat le prévoit.</li>
</ul>
<p>Ces règles valent pour toute location-gérance ; la fiche de service-public sur le taxi y ajoute la durée minimale d’un an. Relisez le contrat sur la répartition des frais : service-public indique que le loueur entretient le véhicule, mais l’assurance, les pneus, les équipements de taxi et la franchise en cas de sinistre doivent être écrits noir sur blanc.</p>

<h2>Ce que coûte un loyer, en recettes</h2>
<p>Un loyer de licence est une charge fixe : il tombe chaque mois, que la semaine ait été bonne ou non. La bonne question n’est donc pas « combien coûte la licence », mais « combien faut-il encaisser pour vivre avec ce loyer ». C’est ce que calcule le mini-simulateur : à partir du loyer et du net mensuel que vous visez, il cherche les recettes hebdomadaires au compteur qui donnent ce net, avec des frais de carburant, d’entretien et d’assurance d’exemple et les cotisations de votre régime.</p>
<p>Le régime pèse lourd. En micro-entreprise, les cotisations portent sur les recettes et le loyer ne se déduit pas ; au régime réel, le loyer diminue le bénéfice sur lequel portent les cotisations. Pour un locataire, l’écart est souvent important : essayez les deux options du mini-simulateur. La page ${h.a('salaire-taxi', 'combien gagne un taxi')} compare un propriétaire et un locataire à recettes égales.</p>

<h2>Louer pour, un jour, posséder</h2>
<p>La location n’est pas qu’une dépense : elle compte comme activité. Service-public indique que, pour une licence gratuite, la priorité est donnée aux taxis salariés ou locataires déjà en activité depuis au moins ${X.ads_priorite_activite_ans} ans. Et la convention-cadre de l’Assurance maladie ouvre le conventionnement au titulaire de la licence ou à son exploitant, après ${P.cpam.ads_exploitation_ans} ans d’exploitation effective : la page ${h.a('taxi-conventionne', 'taxi conventionné')} détaille cette condition.</p>
<p>À l’inverse, louer longtemps une licence chère revient à payer son prix sans jamais l’acquérir. Le mini-simulateur de la page ${h.a('licence-taxi', 'licence de taxi')} compare un achat financé à crédit et une location, mois par mois.</p>

<h2>Ce qui est interdit</h2>
<p>Louer une licence délivrée après le ${h.date(X.ads_date_incessibilite)}, ou la faire exploiter par quelqu’un d’autre en dehors des montages prévus, sort du cadre de l’article L3121-1-2. Les ${h.src('ctL3124Ads', 'articles L3124-1 à L3124-5')} permettent à l’autorité de retirer, temporairement ou définitivement, une licence qui n’est pas exploitée de façon effective et continue ou dont le contenu est gravement ou régulièrement violé. Avant de signer, vérifiez la date de délivrance de la licence et la qualité de celui qui la loue : titulaire, entreprise de location ou coopérative.</p>

<h2>Avant de signer : la liste</h2>
<ol>
<li>La licence a-t-elle été délivrée avant le ${h.date(X.ads_date_incessibilite)} ? Demandez l’arrêté d’attribution.</li>
<li>Le contrat est-il bien une location-gérance de la licence et du véhicule, d’au moins ${X.location_gerance_min_ans} an ?</li>
<li>Qui paie l’entretien, l’assurance, les équipements obligatoires et la franchise ?</li>
<li>Le loyer est-il hors taxe ou toutes taxes comprises ?</li>
<li>Avec ce loyer, vos recettes réalistes laissent-elles le net visé ? Le mini-simulateur répond.</li>
</ol>
<p>Le statut de l’indépendant qui loue sa licence est le même que celui de l’artisan propriétaire pour l’immatriculation et les cotisations : la page ${h.a('artisan-taxi', 'artisan taxi')} le détaille, et le ${h.a('devenir-taxi', 'parcours pour devenir taxi')} replace la licence dans l’ordre des démarches.</p>
`,
  },
  en: {
    slug: 'taxi-licence-rental',
    nav: 'Renting a taxi licence',
    card: 'Lease management, tenant drivers, employees: what the Transport Code allows and what rent costs.',
    title: 'Renting a Taxi Licence in France 2026: Lease and the Law',
    description: `Renting a taxi licence in France, 2026: only licences issued before 1 October 2014 can be leased, for ${X.location_gerance_min_ans} year minimum, at about ${fe(X.ads_loyer_paris_mois_environ, 'en')} a month in Paris.`,
    h1: 'Renting a taxi licence in France: lease management and tenant drivers',
    intro: 'French law lets only some taxi licences be rented, and only in a specific legal form.',
    resume: `Renting a taxi licence in France means running someone else’s licence (autorisation de stationnement, ADS) in return for rent. The Transport Code frames it tightly. Since the law of 1 October 2014, a licence holder must run the licence personally (article L3121-1-2), and licences issued after that date cannot be transferred and last five years (article L3121-2), so they cannot be rented out. Only licences issued before ${den(X.ads_date_incessibilite)} may be run by employees, by a tenant manager (locataire-gérant) who leases both licence and car under the commercial code’s lease-management rules, or by a cooperative that rents the taxi to its members. Service-public, the government information site, adds that the contract lasts at least ${X.location_gerance_min_ans} year, that the rental firm maintains the car, that the tenant keeps all fares and has no unemployment cover. Rent is freely set and runs at about ${fe(X.ads_loyer_paris_mois_environ, 'en')} a month in Paris, according to the same source.`,
    faqs: [
      { q: 'Can every French taxi licence be rented out?', a: `No. Licences issued after ${den(X.ads_date_incessibilite)} cannot be transferred and must be run personally by their holder, under articles L3121-1-2 and L3121-2 of the Transport Code. Only older licences may be entrusted to a tenant manager, employees or a cooperative. Before signing anything, ask for the licence’s issue date, which appears on the decision that granted it.` },
      { q: 'How much rent do taxi drivers pay for a licence in Paris?', a: `Service-public quotes monthly rent of about ${fe(X.ads_loyer_paris_mois_environ, 'en')} in Paris, adding that the amount depends on the rental firm. No regulation sets it: it is negotiated. The same page says the rental firm maintains the car; fuel, social contributions and personal costs are yours. The calculator works out the weekly takings needed to keep a chosen net income with that rent.` },
      { q: 'What is the minimum term of a taxi lease-management contract?', a: `${X.location_gerance_min_ans} year, according to service-public’s page on becoming a taxi driver. The contract follows the general lease-management rules of the commercial code, to which article L3121-1-2 refers: publication in a legal notices outlet within ${G.publication_jours} days of signing, and registration of the tenant manager within ${G.immatriculation_jours} days of starting work.` },
      { q: 'Does a tenant taxi driver get unemployment benefit?', a: 'No. Service-public states that a driver renting a licence is not covered by unemployment insurance when the activity stops: they are self-employed, not an employee. That is one of the main differences from a salaried taxi driver, who earns a fixed wage plus a share of takings and falls under the employee social security scheme.' },
      { q: 'Does running a rented licence count towards CPAM approval?', a: 'The framework agreement approved by the order of 29 July 2025 opens health insurance approval to the licence holder “or the person running it”, after at least three years of actual, continuous use of that licence. A tenant manager is the person running the licence they rent. Service-public also notes that priority for a free licence goes to employed or tenant drivers active for two years.' },
    ],
    body: (h) => `
<h2>What the Transport Code says</h2>
<p>Three provisions settle the matter. They sit in ${h.src('ctL3121Ads', 'articles L3121-1 to L3121-8')}, as amended by the law of 1 October 2014 on taxis and VTCs.</p>
<ol>
<li><strong>Personal operation.</strong> Article L3121-1-2 sets the principle: the holder runs the licence personally and proves actual, continuous operation under conditions set by decree.</li>
<li><strong>The exception for older licences.</strong> The same article provides that where someone holds one or more licences issued before ${h.date(X.ads_date_incessibilite)}, they may be run by employees, or by a tenant manager to whom the rental of the licence and the car has been granted under articles L144-1 to L144-13 of the commercial code. A worker cooperative (société coopérative ouvrière de production) holding licences may also rent the taxi to its members who are authorised to drive.</li>
<li><strong>Newer licences cannot be transferred.</strong> Article L3121-2 states that licences issued after the 2014 law are non-transferable and valid for five years, renewable.</li>
</ol>
<p>The upshot: only licences predating ${h.date(X.ads_date_incessibilite)} can be rented. A free licence recently granted by a town hall can be neither sold nor rented; its holder has to drive it. Our page on the ${h.a('licence-taxi', 'taxi licence')} explains both regimes.</p>

<h2>Tenant manager, cooperative member or employee</h2>
${h.table(['Arrangement', 'What you get', 'What you pay', 'Status'], [
  ['Tenant manager (locataire-gérant)', 'licence and car, leased together', `monthly rent, about ${h.eur(X.ads_loyer_paris_mois_environ)} in Paris per service-public`, 'self-employed, no unemployment cover'],
  ['Cooperative member', 'the taxi rented by the cooperative', 'the rental set by the cooperative', 'per the cooperative’s rules'],
  ['Employee', 'a company car', 'nothing: you earn a fixed wage plus a share of takings', 'employee'],
], 'Arrangements allowed by article L3121-1-2 for licences issued before 1 October 2014')}
<p>In everyday French, the first arrangement is called “taxi locataire”, the tenant taxi. ${h.src('spTaxi', 'Service-public')} uses the same idea: you rent a licence from a firm specialising in taxi licence rental, through a lease-management contract of at least ${X.location_gerance_min_ans} year; you pay monthly rent; the rental firm maintains the car; you keep all your fares; you are not covered by unemployment insurance if you stop.</p>

<h2>Lease-management rules</h2>
<p>The Transport Code points to the commercial code, whose general rules are summarised on service-public’s ${h.src('spLocationGerance', 'lease-management page')}:</p>
<ul>
<li>the contract is published as an extract or notice in a legal notices outlet within ${G.publication_jours} days of signing;</li>
<li>the tenant manager registers the business within ${G.immatriculation_jours} days of starting work;</li>
<li>between signing and publication, owner and tenant manager are jointly liable for debts arising from the business;</li>
<li>the rent is freely agreed and subject to VAT at the standard ${h.pct(G.tva_redevance, 0)} rate, which the owner may pass on if the contract says so.</li>
</ul>
<p>Those rules apply to any lease management; service-public’s taxi page adds the one-year minimum. Read the contract for the split of costs: service-public says the rental firm maintains the car, but insurance, tyres, taxi equipment and the excess after an accident should all be written down. If French is not your first language, have the contract checked before signing, since it binds you for a year.</p>

<h2>What the rent means in takings</h2>
<p>Licence rent is a fixed cost: it falls due every month, good week or bad. So the useful question is not “what does the licence cost” but “how much must I take to live with this rent”. That is what the calculator does: from the rent and the monthly net income you are aiming for, it finds the weekly meter takings that produce it, using example fuel, servicing and insurance costs and the contributions of your tax regime.</p>
<p>The regime matters a great deal. As a micro-entrepreneur, contributions are charged on takings and rent is not deducted; under the real-profit regime, rent reduces the profit on which contributions are charged. For a tenant the gap is often large, so try both options. Our page on ${h.a('salaire-taxi', 'how much a taxi driver earns')} compares an owner and a tenant on the same takings.</p>

<h2>Renting now, owning later</h2>
<p>Renting is not only a cost: it counts as activity. Service-public states that priority for a free licence goes to employed or tenant drivers already active for at least ${X.ads_priorite_activite_ans} years. And the health insurance framework agreement opens approval to the licence holder or the person running it, after ${P.cpam.ads_exploitation_ans} years of actual use: see our page on ${h.a('taxi-conventionne', 'CPAM-approved taxis')}.</p>
<p>The flip side: renting an expensive licence for years means paying its price without ever owning it. The calculator on the ${h.a('licence-taxi', 'taxi licence')} page compares buying on credit with renting, month by month.</p>

<h2>What is not allowed</h2>
<p>Renting out a licence issued after ${h.date(X.ads_date_incessibilite)}, or having someone else run it outside the permitted arrangements, falls outside article L3121-1-2. ${h.src('ctL3124Ads', 'Articles L3124-1 to L3124-5')} allow the authorities to withdraw, temporarily or for good, a licence that is not actually and continuously run or whose terms are seriously or repeatedly breached. Before signing, check the licence’s issue date and who is renting it to you: the holder, a rental firm or a cooperative.</p>

<h2>Checklist before signing</h2>
<ol>
<li>Was the licence issued before ${h.date(X.ads_date_incessibilite)}? Ask for the grant decision.</li>
<li>Is the contract a lease management of both licence and car, for at least ${X.location_gerance_min_ans} year?</li>
<li>Who pays for servicing, insurance, compulsory equipment and the excess?</li>
<li>Is the rent quoted before or after VAT?</li>
<li>With that rent, do realistic takings leave the net income you need? The calculator tells you.</li>
</ol>
<p>A self-employed tenant registers and pays contributions like an owner-driver: see our page on ${h.a('artisan-taxi', 'self-employed taxi drivers')}, and the ${h.a('devenir-taxi', 'route to becoming a taxi driver')} puts the licence in its place among the steps.</p>
`,
  },
});
