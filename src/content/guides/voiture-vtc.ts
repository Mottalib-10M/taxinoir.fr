import { defineGuide } from '../../lib/guide-types';
import { P } from '../../lib/engine/params';
import { displayDate } from '../../lib/format';

const V = P.vehicule_vtc;
const PL = P.plateformes_publiees;
const dfr = (iso: string) => displayDate(iso, 'fr-FR');
const den = (iso: string) => displayDate(iso, 'en-GB');

export default defineGuide({
  id: 'voiture-vtc',
  group: 'vtc',
  order: 100,
  mini: 'coutKm',
  miniHref: 'vehicule-vtc',
  related: ['vehicule-vtc', 'location-voiture-vtc', 'assurance-vtc', 'devenir-chauffeur-uber', 'devenir-chauffeur-bolt', 'revenu-net-chauffeur'],
  sources: ['arreteVehicule', 'spVtc', 'uberVehicules', 'boltVehicules', 'heetchVehicules'],
  fr: {
    slug: 'voiture-vtc',
    nav: 'Choisir sa voiture VTC',
    card: 'Critères du texte, exigences des plateformes, hybride ou électrique, et coût au kilomètre.',
    title: 'Voiture VTC 2026 : critères, hybride, électrique, coût au km',
    description: `Voiture VTC en 2026 : moins de ${V.age_max_ans} ans, ${V.puissance_min_kw} kW et ${V.portes_min} portes en thermique, hybrides et électriques exemptés, règles des plateformes et coût complet au kilomètre.`,
    h1: 'Choisir sa voiture VTC : ce que le texte exige, ce que coûte un kilomètre',
    intro: 'Le texte fixe un plancher ; les plateformes en ajoutent un autre ; votre budget décide du reste.',
    resume: `Une voiture VTC thermique doit avoir moins de ${V.age_max_ans} ans, au moins ${V.portes_min} portes, mesurer ${V.longueur_min_m.toLocaleString('fr-FR')} m sur ${V.largeur_min_m.toLocaleString('fr-FR')} m et développer ${V.puissance_min_kw} kW de puissance nette, selon l’arrêté du 26 mars 2015 ; les hybrides et les électriques sont exemptés de ces cinq critères, et toutes doivent compter de ${V.places_min} à ${V.places_max} places. Les plateformes ajoutent leurs propres règles, publiées sur leurs sites : Uber n’accepte plus aucun diesel depuis le ${dfr(PL.uber_diesel_fin)} et limite à ${PL.uber_berline_age_max_ans} ans l’âge des voitures de ses catégories Berline, Comfort et Van ; Bolt réserve sa catégorie Green aux hybrides et aux électriques. Le texte ne désigne aucun modèle et nous n’en recommandons aucun. Le bon choix se mesure au coût complet par kilomètre : perte de valeur, énergie, assurance et entretien, que le mini-simulateur calcule avec vos chiffres.`,
    faqs: [
      { q: 'Quelle est la meilleure voiture pour faire du VTC ?', a: `Aucun texte ne désigne de modèle, et nous n’en mettons aucun en avant. La meilleure voiture est celle qui passe les critères de l’arrêté du 26 mars 2015, ou qui en est exemptée parce qu’elle est hybride ou électrique, qui est acceptée dans la catégorie visée sur votre plateforme et dont le coût complet au kilomètre reste bas. Comparez deux ou trois modèles dans le mini-simulateur avant de signer.` },
      { q: 'Une voiture électrique doit-elle mesurer 4,50 m pour faire du VTC ?', a: `Non. L’article 2 de l’arrêté du 26 mars 2015 exempte les véhicules hybrides et électriques des critères d’âge, de portes, de dimensions et de puissance. Seul le nombre de places, de ${V.places_min} à ${V.places_max} conducteur compris, reste exigé par service-public. Une citadine électrique peut donc être admise par la loi, mais une plateforme peut la refuser dans certaines catégories.` },
      { q: 'Peut-on encore rouler en diesel sur Uber ?', a: `Non, selon la page des critères véhicules d’Uber consultée le 4 octobre 2026 : depuis le ${dfr(PL.uber_diesel_fin)}, plus aucun véhicule diesel ou hybride diesel ne peut effectuer de courses sur l’application. Cette règle est celle de la plateforme, pas de la loi : l’arrêté du 26 mars 2015 n’interdit pas le diesel. Elle compte pourtant dès l’achat si vous comptez travailler avec Uber.` },
      { q: 'Combien coûte une voiture VTC au kilomètre ?', a: 'Cela dépend du prix, de la revente, du kilométrage et de l’énergie : aucune source publique ne publie de moyenne pour les VTC. Le mini-simulateur additionne la perte de valeur annuelle, le carburant ou la recharge, l’assurance et l’entretien, puis divise par les kilomètres parcourus. Avec ses valeurs d’exemple, il affiche environ 22 centimes par kilomètre ; remplacez-les par vos devis pour obtenir votre chiffre.' },
      { q: 'Combien d’années peut-on garder une voiture VTC hybride ?', a: `L’arrêté du 26 mars 2015 ne fixe pas de limite d’âge pour les hybrides et les électriques, contrairement aux thermiques limités à moins de ${V.age_max_ans} ans. Les plateformes peuvent en revanche appliquer leurs propres plafonds : Uber limite ses catégories Berline, Comfort et Van à ${PL.uber_berline_age_max_ans} ans glissants, et Bolt demande des photos pour un véhicule de plus de douze ans.` },
    ],
    body: (h) => `
<h2>Trois filtres, dans cet ordre</h2>
<p>Choisir une voiture de VTC revient à passer trois filtres successifs. Le premier est la loi : sans lui, aucune inscription au registre. Le deuxième est la plateforme, si vous comptez en utiliser une : elle peut refuser une voiture légale. Le troisième est l’argent : une voiture admise partout peut ruiner votre revenu si elle coûte trop cher au kilomètre.</p>

<h2>Premier filtre : le texte</h2>
<p>L’${h.src('arreteVehicule', 'arrêté du 26 mars 2015')} fixe cinq critères pour une voiture thermique : moins de ${V.age_max_ans} ans depuis la première immatriculation, sauf véhicule de collection, au moins ${V.portes_min} portes, ${h.num(V.longueur_min_m, 2)} m de long et ${h.num(V.largeur_min_m, 2)} m de large hors tout, et ${V.puissance_min_kw} kW de puissance nette. Son article 2 en exempte entièrement les hybrides et les électriques. Service-public ajoute la condition de places : de ${V.places_min} à ${V.places_max}, conducteur compris.</p>
<p>Le ${h.a('vehicule-vtc', 'vérificateur de conformité')} reprend ces critères un par un ; nous ne les détaillons pas ici. Retenez surtout l’effet de l’exemption : elle ouvre le métier à des voitures plus petites et moins puissantes, à condition qu’elles soient hybrides ou électriques. C’est souvent ce qui rend l’achat possible pour un premier véhicule.</p>

<h2>Deuxième filtre : les règles des plateformes</h2>
<p>Chaque application publie ses propres critères, qui s’ajoutent au texte sans le remplacer. Ce qui suit reprend leurs pages, consultées le ${dfr(PL.consulte_le)} ; ce sont des informations indicatives, à vérifier auprès de chaque plateforme le jour de votre choix, car elles évoluent.</p>
${h.table(['Plateforme', 'Ce qu’elle publie', 'Source'], [
  ['Uber', `plus aucun diesel ni hybride diesel depuis le ${dfr(PL.uber_diesel_fin)} ; hybrides essence et électriques acceptés ; catégories Berline, Comfort et Van limitées à ${PL.uber_berline_age_max_ans} ans glissants ; à Paris, catégorie Green réservée aux 100 % électriques depuis le ${dfr(PL.uber_paris_electrique)}`, h.src('uberVehicules', 'critères véhicules Uber')],
  ['Bolt', `catégories Bolt, Comfort, Premium, Green, Van et XL ; Premium : moins de 7 ans, ${V.puissance_min_kw} kW, note d’au moins ${h.num(PL.bolt_premium_note_min, 1)} sur 5 ; Green : hybride ou électrique`, h.src('boltVehicules', 'prérequis Bolt')],
  ['Heetch', 'reprend les critères de l’arrêté, avec l’exemption des hybrides et des électriques ; aucune couleur imposée', h.src('heetchVehicules', 'véhicules conformes Heetch')],
], 'Critères publiés par les plateformes, consultés le 4 octobre 2026')}
<p>Deux conséquences pratiques. D’abord, une voiture diesel légale peut être inutilisable si vous visez Uber : c’est un choix de la plateforme, pas de la loi, mais il pèse sur la revente aussi. Ensuite, les catégories haut de gamme imposent souvent une voiture plus récente que le texte, ce qui raccourcit la durée pendant laquelle elle rapporte. Si vous comptez travailler sur plusieurs applications, retenez la règle la plus stricte des trois.</p>

<h2>Thermique, hybride ou électrique</h2>
<p>Le texte avantage clairement les hybrides et les électriques : aucune limite d’âge, aucune taille minimale, aucune puissance minimale. Les plateformes vont dans le même sens avec leurs catégories dédiées. Le thermique reste légal, mais il doit être remplacé avant ses ${V.age_max_ans} ans, ce qui fixe la durée maximale d’un crédit ou d’une location sur ce modèle.</p>
<p>L’électrique change la structure du coût plutôt que son niveau : l’énergie pèse moins par kilomètre quand on recharge chez soi, mais le prix d’achat est souvent plus élevé et la recharge rapide sur la route coûte plus cher que la recharge lente. Le seul moyen de trancher est de chiffrer votre cas. Les aides publiques à l’achat d’un véhicule électrique changent souvent et dépendent du statut de l’acheteur : nous ne les intégrons pas au calcul et vous invitons à vérifier leur existence sur service-public le jour de l’achat.</p>

<h2>Troisième filtre : le coût au kilomètre</h2>
<p>Un chauffeur qui roule beaucoup gagne sa vie au kilomètre, il doit donc compter sa voiture de la même façon. Le mini-simulateur additionne quatre postes sur une année :</p>
<ul>
<li>la <strong>perte de valeur</strong> : prix d’achat moins revente, étalés sur les années de détention ;</li>
<li>l’<strong>énergie</strong> : votre coût pour cent kilomètres, carburant ou recharge, multiplié par la distance ;</li>
<li>l’<strong>assurance et l’entretien</strong>, en montant annuel.</li>
</ul>
<p>Il divise le total par les kilomètres parcourus. Le chiffre obtenu se compare directement au prix d’une course : si une course de dix kilomètres vous rapporte, après commission, moins que dix fois ce coût augmenté de vos cotisations, elle vous fait perdre de l’argent. Le mini-simulateur signale aussi une durée de détention qui dépasse la limite d’âge d’un modèle thermique.</p>
<p>Pour un financement par location plutôt que par achat, remplacez la perte de valeur par le total des loyers : la page ${h.a('location-voiture-vtc', 'location de voiture VTC')} compare les deux au mois.</p>

<h2>Avant d’acheter : une liste courte</h2>
<ol>
<li>Lire la puissance nette sur la carte grise et mesurer la voiture, ou vérifier qu’elle est hybride ou électrique.</li>
<li>Vérifier les critères de chaque plateforme visée, catégorie par catégorie.</li>
<li>Obtenir un devis d’assurance pour le transport de personnes à titre onéreux : il peut varier d’un modèle à l’autre, comme l’explique la page ${h.a('assurance-vtc', 'assurance VTC')}.</li>
<li>Chiffrer le coût au kilomètre avec une revente prudente.</li>
<li>Reporter le coût mensuel dans le ${h.a('revenu-net-chauffeur', 'simulateur de revenu net')}.</li>
</ol>
<p>Le choix de la voiture vient après la carte et avant le registre dans le ${h.a('devenir-chauffeur-vtc', 'parcours pour devenir VTC')} : la carte grise fait partie du dossier d’inscription.</p>
`,
  },
  en: {
    slug: 'best-car-for-vtc',
    nav: 'Choosing a VTC car',
    card: 'Legal criteria, platform rules, hybrid or electric, and the cost per kilometre.',
    title: 'Best Car for VTC in France 2026: Rules, EV, Cost per km',
    description: `Choosing a VTC car in France, 2026: under ${V.age_max_ans} years, ${V.puissance_min_kw} kW and ${V.portes_min} doors for petrol or diesel, hybrids and EVs exempt, platform rules and the full cost per km.`,
    h1: 'Choosing a car for VTC work: the legal floor and the cost of each kilometre',
    intro: 'French law sets one floor, the apps add another, and your budget settles the rest.',
    resume: `A petrol or diesel VTC car in France must be under ${V.age_max_ans} years old, have at least ${V.portes_min} doors, measure ${V.longueur_min_m.toLocaleString('en-GB')} m by ${V.largeur_min_m.toLocaleString('en-GB')} m and deliver ${V.puissance_min_kw} kW of net power, under the order of 26 March 2015; hybrids and fully electric cars are exempt from those five criteria, and every car needs ${V.places_min} to ${V.places_max} seats. Ride-hailing platforms add rules of their own, published on their sites: Uber has accepted no diesel since ${den(PL.uber_diesel_fin)} and caps its Berline, Comfort and Van categories at ${PL.uber_berline_age_max_ans} years; Bolt keeps its Green category for hybrids and electric cars. The law names no model and neither do we. The right car shows up in the full cost per kilometre, covering depreciation, energy, insurance and servicing, which the calculator works out from your own figures.`,
    faqs: [
      { q: 'Which car model is best for VTC work in France?', a: 'No regulation names a model, and we do not promote any. The best car is one that meets the order of 26 March 2015, or is exempt because it is hybrid or electric, that your chosen platform accepts in the category you want, and whose full cost per kilometre stays low. Run two or three candidates through the calculator before you sign anything.' },
      { q: 'Does an electric car have to be 4.5 metres long for VTC work?', a: `No. Article 2 of the order of 26 March 2015 exempts hybrid and electric vehicles from the age, door, size and power criteria. Only the seat count, ${V.places_min} to ${V.places_max} including the driver, still applies according to service-public. A small electric hatchback can therefore be legal, although a platform may still refuse it for some categories.` },
      { q: 'Can I still drive a diesel car on Uber in France?', a: `No, according to Uber’s vehicle requirements page read on 4 October 2026: since ${den(PL.uber_diesel_fin)}, no diesel or diesel hybrid vehicle may carry out rides on the app. That is the platform’s rule, not the law’s, since the 2015 order does not ban diesel. It still matters when you buy if you intend to work with Uber.` },
      { q: 'What does a VTC car cost per kilometre?', a: 'It depends on price, resale value, mileage and energy, and no public source publishes an average for VTC cars. The calculator adds yearly depreciation, fuel or charging, insurance and servicing, then divides by distance driven. With its example values it shows about 22 cents per kilometre; replace them with your own quotes to get your figure, and compare it with what each fare pays you.' },
      { q: 'How long can I keep a hybrid car for VTC work?', a: `The 2015 order sets no age limit for hybrid or electric cars, unlike petrol and diesel models, which must be under ${V.age_max_ans} years old. Platforms may set their own caps: Uber limits its Berline, Comfort and Van categories to a rolling ${PL.uber_berline_age_max_ans} years, and Bolt asks for photographs of any car more than twelve years old.` },
    ],
    body: (h) => `
<h2>Three filters, in order</h2>
<p>Picking a VTC car means passing three filters one after another. The law comes first: without it there is no register entry. The platform comes second, if you plan to use one, because it can turn down a perfectly legal car. Money comes third: a car accepted everywhere can still wreck your income if each kilometre costs too much.</p>

<h2>Filter one: the regulation</h2>
<p>The ${h.src('arreteVehicule', 'order of 26 March 2015')} sets five criteria for petrol and diesel cars: under ${V.age_max_ans} years since first registration (classic cars aside), at least ${V.portes_min} doors, ${h.num(V.longueur_min_m, 2)} m long and ${h.num(V.largeur_min_m, 2)} m wide overall, and ${V.puissance_min_kw} kW net power. Its article 2 fully exempts hybrids and electric cars. Service-public adds the seat rule: ${V.places_min} to ${V.places_max}, driver included.</p>
<p>Our ${h.a('vehicule-vtc', 'vehicle checker')} tests each criterion in turn, so we will not repeat them here. What matters is the effect of the exemption: it opens the trade to smaller, less powerful cars as long as they are hybrid or electric. For a first car, that is often what makes buying affordable.</p>

<h2>Filter two: what the platforms publish</h2>
<p>Each app sets its own requirements on top of the law. The table summarises their pages as read on ${den(PL.consulte_le)}; treat it as a guide only and check with each platform when you choose, because these rules change.</p>
${h.table(['Platform', 'Published requirement', 'Source'], [
  ['Uber', `no diesel or diesel hybrid since ${den(PL.uber_diesel_fin)}; petrol hybrids and EVs accepted; Berline, Comfort and Van capped at a rolling ${PL.uber_berline_age_max_ans} years; in Paris, the Green category is fully electric only since ${den(PL.uber_paris_electrique)}`, h.src('uberVehicules', 'Uber vehicle requirements')],
  ['Bolt', `categories Bolt, Comfort, Premium, Green, Van and XL; Premium: under 7 years, ${V.puissance_min_kw} kW, rating of at least ${h.num(PL.bolt_premium_note_min, 1)} out of 5; Green: hybrid or electric`, h.src('boltVehicules', 'Bolt requirements')],
  ['Heetch', 'mirrors the 2015 order, with the hybrid and electric exemption; any colour accepted', h.src('heetchVehicules', 'Heetch vehicle page')],
], 'Platform requirements, read on 4 October 2026')}
<p>Two practical points follow. A legal diesel car may be useless if you are aiming at Uber; that is a platform choice rather than a legal one, but it also affects resale. And premium categories often want a newer car than the law does, shortening the period during which the car earns money. If you plan to work across several apps, go by the strictest rule.</p>

<h2>Petrol, hybrid or fully electric</h2>
<p>The regulation clearly favours hybrids and electric cars: no age cap, no minimum size, no minimum power. The platforms push the same way with dedicated categories. Petrol remains legal but must be replaced before its ${V.age_max_ans}th birthday, which caps the length of any loan or lease on that car.</p>
<p>Going electric changes the shape of the cost more than its level. Energy per kilometre is lower if you charge at home, but the purchase price is usually higher, and rapid charging on the road costs more than slow charging. Only your own numbers can settle it. Government purchase grants for electric cars change often and depend on who is buying; we leave them out of the calculation and suggest checking service-public on the day you buy.</p>

<h2>Filter three: cost per kilometre</h2>
<p>A driver who covers long distances earns money by the kilometre, so the car should be costed the same way. The calculator adds four items over a year:</p>
<ul>
<li><strong>depreciation</strong>: purchase price minus resale, spread over the years you keep the car;</li>
<li><strong>energy</strong>: your cost per hundred kilometres, fuel or charging, times distance;</li>
<li><strong>insurance and servicing</strong>, as yearly amounts.</li>
</ul>
<p>It divides the total by the kilometres driven. You can set the result directly against a fare: if a ten-kilometre ride pays you less, after commission, than ten times that figure plus your social contributions, the ride loses you money. The calculator also flags a holding period that runs past the age limit for petrol and diesel cars.</p>
<p>If you lease rather than buy, swap depreciation for total rent: our page on ${h.a('location-voiture-vtc', 'renting or leasing a VTC car')} compares the two month by month.</p>

<h2>A short checklist before buying</h2>
<ol>
<li>Read net power on the registration document and measure the car, or confirm it is hybrid or electric.</li>
<li>Check each target platform’s rules, category by category.</li>
<li>Get an insurance quote for paid passenger use, which can differ from one model to another; see ${h.a('assurance-vtc', 'VTC insurance')}.</li>
<li>Work out the cost per kilometre using a cautious resale value.</li>
<li>Carry the monthly cost into the ${h.a('revenu-net-chauffeur', 'net income calculator')}.</li>
</ol>
<p>In the ${h.a('devenir-chauffeur-vtc', 'step-by-step route to VTC work')}, the car comes after the professional card and before the register, because the registration document is part of the register file.</p>
`,
  },
});
