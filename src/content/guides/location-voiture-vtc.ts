import { defineGuide } from '../../lib/guide-types';
import { P } from '../../lib/engine/params';
import { formatMoney } from '../../lib/format';

const A = P.acces;
const V = P.vehicule_vtc;
const fe = (n: number, l: 'fr' | 'en') => formatMoney(n, 0, l);

export default defineGuide({
  id: 'location-voiture-vtc',
  group: 'vtc',
  order: 90,
  mini: 'financementVehicule',
  related: ['voiture-vtc', 'assurance-vtc', 'registre-vtc', 'vehicule-vtc', 'revenu-net-chauffeur', 'signaletique-vtc'],
  sources: ['spVtc', 'registreAide', 'ctR3122', 'arreteVehicule', 'spFranchiseMicro', 'heetchVehicules', 'uberConditions'],
  fr: {
    slug: 'location-voiture-vtc',
    nav: 'Location de voiture VTC',
    card: 'Location courte, LLD ou LOA face à l’achat : la règle des six mois et le coût mensuel.',
    title: 'Location voiture VTC 2026 : LLD, LOA ou achat, le vrai coût',
    description: `Location de voiture VTC en 2026 : au-delà de ${A.location_longue_mois} mois, pas de garantie de ${fe(A.garantie_financiere_par_vehicule, 'fr')} au registre ; LLD, LOA et crédit comparés au mois, véhicule de moins de ${V.age_max_ans} ans.`,
    h1: 'Louer sa voiture VTC : courte durée, LLD, LOA ou achat',
    intro: 'Le choix du financement change votre dossier au registre avant de changer votre budget.',
    resume: `Un chauffeur VTC peut rouler avec une voiture achetée, louée à la semaine, en location longue durée (LLD) ou en location avec option d’achat (LOA). La durée de location a une conséquence réglementaire directe : selon service-public et le site du registre des VTC, l’exploitant doit fournir une garantie financière de ${fe(A.garantie_financiere_par_vehicule, 'fr')} pour chaque véhicule utilisé de façon régulière, sauf s’il en est propriétaire ou s’il le loue pour plus de ${A.location_longue_mois} mois. Une location courte coûte donc, en plus du loyer, cette garantie bancaire. Dans tous les cas, la voiture doit respecter l’arrêté du 26 mars 2015 : moins de ${V.age_max_ans} ans, ${V.portes_min} portes, dimensions et puissance minimales, sauf hybride ou électrique. Côté budget, aucun barème public n’existe : le mini-simulateur compare, sur la même durée, le loyer de votre devis et un achat à crédit dont on déduit la revente.`,
    faqs: [
      { q: 'Faut-il une garantie financière quand on loue sa voiture VTC ?', a: `Oui, si la location dure ${A.location_longue_mois} mois ou moins. Service-public et le registre des VTC demandent ${fe(A.garantie_financiere_par_vehicule, 'fr')} de garantie par véhicule utilisé de façon régulière, sauf pour un véhicule dont vous êtes propriétaire ou que vous louez plus de ${A.location_longue_mois} mois. La garantie est délivrée par un établissement de crédit ou un organisme agréé. Avec une LLD ou une LOA de plusieurs années, le contrat de location suffit à l’écarter.` },
      { q: 'LLD ou LOA pour un VTC : laquelle choisir ?', a: 'Les deux évitent l’achat comptant et dépassent en général six mois, ce qui écarte la garantie financière. La LOA ajoute une option d’achat en fin de contrat, utile si la voiture peut encore rouler en VTC à ce moment, c’est-à-dire avant ses sept ans pour un modèle thermique. La LLD convient à qui veut changer de voiture à chaque échéance. Comparez surtout le coût total, kilométrage compris : le mini-simulateur ramène chaque option au mois.' },
      { q: 'Les loyers de la voiture sont-ils déductibles en micro-entreprise ?', a: 'Non. En micro-entreprise, l’impôt se calcule après un abattement forfaitaire sur le chiffre d’affaires et les cotisations sociales portent sur les recettes : les frais réels, loyers compris, ne se déduisent pas, comme le rappelle service-public. Au régime réel, les loyers sont des charges qui diminuent le bénéfice imposable et l’assiette des cotisations. Le comparateur de statuts du site montre à partir de quel niveau de frais le réel devient plus intéressant.' },
      { q: 'Peut-on louer une voiture VTC à la semaine via une plateforme ?', a: 'Certaines plateformes le proposent ou le facilitent. Bolt écrit dans sa page chauffeurs que l’on peut louer un véhicule auprès d’un de ses partenaires, et Heetch cite le leasing ou le crédit-bail auprès de banques ou de sociétés automobiles. Une location à la semaine reste soumise aux mêmes règles : véhicule conforme, inscription au registre, signalétique, et garantie financière tant que la durée ne dépasse pas six mois.' },
      { q: 'Que devient la vignette VTC quand je rends une voiture louée ?', a: `La signalétique est délivrée pour un véhicule précis : elle porte son numéro d’immatriculation et celui de l’exploitant. Quand la voiture quitte votre flotte, déclarez la modification dans votre compte du registre et commandez la signalétique du nouveau véhicule, environ ${A.vignette_environ} € selon service-public. Depuis l’arrêté du 24 juillet 2025, les vignettes sont collées de façon à ne pas pouvoir être retirées sans être détruites.` },
    ],
    body: (h) => `
<h2>Quatre façons de disposer d’une voiture</h2>
<p>La voiture est le premier poste de dépense d’un chauffeur VTC indépendant, souvent devant le carburant. Il y a quatre manières de l’avoir, et la loi ne les traite pas toutes de la même façon.</p>
${h.table(['Formule', 'Principe', 'Durée habituelle', 'Garantie financière de ' + h.eur(A.garantie_financiere_par_vehicule)], [
  ['Achat comptant ou à crédit', 'la voiture est à vous', 'jusqu’à la revente', 'non'],
  ['Location courte', 'loyer à la semaine ou au mois, entretien souvent inclus', 'quelques semaines à quelques mois', `oui, si ${A.location_longue_mois} mois ou moins`],
  ['Location longue durée (LLD)', 'loyer fixe, voiture rendue au terme', '2 à 5 ans le plus souvent', `non, au-delà de ${A.location_longue_mois} mois`],
  ['Location avec option d’achat (LOA)', 'loyer, puis possibilité d’acheter à un prix fixé d’avance', '2 à 5 ans le plus souvent', `non, au-delà de ${A.location_longue_mois} mois`],
], 'Règle de la garantie : service-public F31027 et site du registre des VTC')}
<p>Les durées « habituelles » de la troisième colonne sont des ordres de grandeur du marché, pas une règle : c’est votre contrat qui compte. La dernière colonne, elle, vient des textes.</p>

<h2>La règle des six mois</h2>
<p>Le dossier d’inscription au registre doit prouver la capacité financière de l’exploitant, en vertu de l’${h.src('ctR3122', 'article R3122-1 du code des transports')}. En pratique, le ${h.src('registreAide', 'site du registre')} et la fiche ${h.src('spVtc', 'service-public F31027')} la traduisent ainsi : ${h.eur(A.garantie_financiere_par_vehicule)} de garantie pour chaque véhicule utilisé de façon régulière, apportée par une banque ou un organisme agréé, sauf si l’exploitant est propriétaire du véhicule ou le loue pour une durée supérieure à ${A.location_longue_mois} mois. Dans ces deux cas, on fournit à la place le justificatif de propriété ou le contrat de location longue.</p>
<p>Conséquence concrète : une location courte, souvent choisie pour démarrer sans apport, n’est pas « sans engagement » côté registre. Elle demande une garantie bancaire que la banque peut facturer et qui immobilise parfois une somme. Une LLD ou une LOA de deux ans, au contraire, suffit à écarter la garantie dès la signature. Uber reprend la même règle dans ses ${h.src('uberConditions', 'étapes d’inscription')} : contrat de location de plus de six mois, justificatif de propriété ou capacité financière de ${h.eur(A.garantie_financiere_par_vehicule)}.</p>

<h2>Louée ou achetée, la voiture doit être conforme</h2>
<p>Le mode de financement ne change rien aux exigences techniques de l’${h.src('arreteVehicule', 'arrêté du 26 mars 2015')} : moins de ${V.age_max_ans} ans, au moins ${V.portes_min} portes, ${h.num(V.longueur_min_m, 2)} m de long sur ${h.num(V.largeur_min_m, 2)} m de large, ${V.puissance_min_kw} kW de puissance nette, avec une exemption totale pour les hybrides et les électriques. Le ${h.a('vehicule-vtc', 'vérificateur de conformité')} contrôle chaque critère avant que vous signiez.</p>
<p>La règle d’âge pèse sur la durée du contrat. Une voiture thermique immatriculée il y a quatre ans ne peut plus servir en VTC au-delà de trois années supplémentaires : une LOA de cinq ans sur ce modèle n’aurait pas de sens. Pour une voiture neuve, la question se pose au moment de lever l’option d’achat.</p>
<p>Heetch résume les solutions pour qui n’a pas de voiture conforme dans son ${h.src('heetchVehicules', 'centre d’aide')} : acheter un véhicule conforme, passer par le leasing ou le crédit-bail auprès d’une banque ou d’une société automobile, ou être rattaché à un gérant de flotte comme salarié.</p>

<h2>Comparer au mois, sur la même durée</h2>
<p>Un loyer et une mensualité de crédit ne se comparent pas directement. Le loyer s’arrête et vous rendez la voiture ; le crédit s’arrête et vous possédez une voiture qui vaut encore quelque chose. Le mini-simulateur met les deux à égalité :</p>
<ul>
<li>pour l’achat à crédit, il additionne l’apport et toutes les mensualités, retire la revente que vous estimez, et divise par le nombre de mois ;</li>
<li>pour la location, il additionne le premier loyer et les loyers, et divise par le même nombre de mois.</li>
</ul>
<p>Le résultat dépend fortement de la revente. Une voiture de VTC roule beaucoup : soixante mille kilomètres par an ne sont pas rares, et la valeur de revente baisse avec. Si vous n’avez aucune idée de ce prix, testez une revente basse : un calcul prudent vaut mieux qu’une bonne surprise qui ne vient pas. Le taux du crédit, le prix et le loyer sont vos devis ; le site n’en propose aucun et ne met en avant aucun loueur.</p>

<h2>Ce que le contrat doit dire</h2>
<p>Avant de signer, relisez quatre points qui pèsent lourd pour un chauffeur :</p>
<ol>
<li><strong>Le kilométrage autorisé.</strong> Les contrats de location fixent un forfait annuel ; le dépassement se paie au kilomètre. Un forfait pensé pour un particulier est vite épuisé en VTC.</li>
<li><strong>L’usage déclaré.</strong> Le loueur doit accepter le transport de personnes à titre onéreux. Si l’assurance est comprise, demandez l’attestation qui le mentionne : c’est elle que les plateformes vérifient, comme l’explique la page ${h.a('assurance-vtc', 'assurance VTC')}.</li>
<li><strong>L’entretien et l’immobilisation.</strong> Qui paie les pneus et les révisions, et y a-t-il un véhicule de remplacement ? Chaque jour sans voiture est un jour sans recette.</li>
<li><strong>La restitution.</strong> Les frais de remise en état en fin de contrat sont un coût de sortie réel, à prévoir dans le calcul.</li>
</ol>

<h2>Fiscalité : micro-entreprise ou réel</h2>
<p>En micro-entreprise, les cotisations sont un pourcentage des recettes et l’impôt s’applique après un abattement forfaitaire, sans déduction des frais réels : le loyer de la voiture ne réduit ni l’un ni l’autre, comme l’explique la fiche ${h.src('spFranchiseMicro', 'régime fiscal de la micro-entreprise')}. Au régime réel, loyers et intérêts d’emprunt sont des charges qui diminuent le bénéfice. Quand la voiture absorbe une grande partie du chiffre d’affaires, cet écart peut décider du statut ; l’${h.a('tva-vtc-taxi', 'outil TVA et statuts')} le chiffre.</p>

<h2>Changer de voiture en cours de route</h2>
<p>La voiture est déclarée au registre avec sa carte grise, et la signalétique est fabriquée pour elle. Remplacer une voiture louée, c’est donc mettre à jour son compte dans les ${A.changement_registre_jours} jours et commander une nouvelle signalétique, environ ${h.eur(A.vignette_environ)} : la page ${h.a('signaletique-vtc', 'signalétique VTC')} détaille ce que le texte impose. Le coût total d’une voiture, financement, énergie et entretien compris, se lit au kilomètre dans le guide pour ${h.a('voiture-vtc', 'choisir sa voiture VTC')}, et son effet sur votre revenu dans le ${h.a('revenu-net-chauffeur', 'simulateur de revenu net')}.</p>
`,
  },
  en: {
    slug: 'vtc-car-hire-leasing',
    nav: 'Renting a VTC car',
    card: 'Short hire, long-term lease or lease-to-own against buying: the six-month rule and monthly cost.',
    title: 'VTC Car Rental and Leasing France 2026: Lease or Buy?',
    description: `Renting a VTC car in France, 2026: beyond ${A.location_longue_mois} months no ${fe(A.garantie_financiere_par_vehicule, 'en')} register guarantee is needed. Long-term lease, lease-to-own and car loan compared per month.`,
    h1: 'Renting or leasing a car for VTC work in France',
    intro: 'How you pay for the car changes your register file before it changes your budget.',
    resume: `A VTC driver in France can work with a car they own, a short-term hire paid weekly, a long-term lease (location longue durée, LLD) or a lease with an option to buy (location avec option d’achat, LOA). The length of the rental has a direct regulatory effect: according to service-public and the VTC register’s own site, the operator must provide a financial guarantee of ${fe(A.garantie_financiere_par_vehicule, 'en')} for each vehicle used regularly, unless they own it or rent it for more than ${A.location_longue_mois} months. A short hire therefore costs the weekly rent plus that bank guarantee. Whatever the formula, the car must meet the order of 26 March 2015: under ${V.age_max_ans} years old, ${V.portes_min} doors, minimum size and power, unless hybrid or electric. No public price list exists, so the calculator compares your lease quote with buying on credit, resale deducted, over the same term.`,
    faqs: [
      { q: 'Do I need the financial guarantee if I rent my VTC car?', a: `Yes, if the rental lasts ${A.location_longue_mois} months or less. Service-public and the VTC register require a ${fe(A.garantie_financiere_par_vehicule, 'en')} guarantee for each vehicle used regularly, except a car you own or rent for more than ${A.location_longue_mois} months. A bank or approved body provides it. With a lease of several years, the lease contract itself is enough to avoid it, so many newcomers choose a longer contract for that reason.` },
      { q: 'Long-term lease or lease-to-own: which suits a new VTC driver?', a: 'Both avoid paying cash and usually run past six months, which removes the guarantee. Lease-to-own (LOA) adds a purchase option at the end, worth having only if the car can still work as a VTC then, meaning before its seventh birthday for a petrol or diesel model. A plain long-term lease (LLD) suits drivers who want a new car each cycle. Compare total cost including mileage: the calculator reduces each option to a monthly figure.' },
      { q: 'Can a micro-entrepreneur deduct lease payments?', a: 'No. Under the micro-enterprise scheme, income tax is worked out after a flat allowance on turnover and social contributions are charged on takings, so actual costs, lease included, are never deducted, as service-public explains. Under the real-profit regime (régime réel), lease payments are expenses that reduce taxable profit and the contribution base. The site’s VAT and status tool shows the level of costs at which real profit pays off.' },
      { q: 'Can I hire a car by the week through Bolt or Heetch?', a: 'Some platforms offer or broker it. Bolt’s driver page says you can rent a vehicle from one of its partners, and Heetch mentions leasing or credit-lease through banks or car companies. A weekly hire is still subject to the same rules: a compliant car, a register entry, the VTC sticker, and the financial guarantee as long as the rental lasts six months or less.' },
      { q: 'What happens to the VTC sticker when I hand a rented car back?', a: `The sticker is issued for one specific car: it carries that car’s registration number and the operator’s number. When the car leaves your fleet, update your register account and order a sticker for the replacement, about €${A.vignette_environ} according to service-public. Since the order of 24 July 2025, stickers must be applied so that they cannot be removed without being destroyed, so they cannot move from car to car.` },
    ],
    body: (h) => `
<h2>Four ways to get a car on the road</h2>
<p>For a self-employed VTC driver, the car is the biggest single cost, often ahead of fuel. There are four ways to have one, and French rules do not treat them all alike.</p>
${h.table(['Formula', 'How it works', 'Typical length', h.eur(A.garantie_financiere_par_vehicule) + ' guarantee'], [
  ['Buying, cash or on credit', 'the car is yours', 'until you sell it', 'no'],
  ['Short-term hire', 'weekly or monthly rent, servicing often included', 'a few weeks to a few months', `yes, if ${A.location_longue_mois} months or less`],
  ['Long-term lease (LLD)', 'fixed rent, car returned at the end', 'usually 2 to 5 years', `no, beyond ${A.location_longue_mois} months`],
  ['Lease-to-own (LOA)', 'rent, then an option to buy at a price set in advance', 'usually 2 to 5 years', `no, beyond ${A.location_longue_mois} months`],
], 'Guarantee rule: service-public F31027 and the VTC register site')}
<p>The “typical length” column reflects the market, not a rule: your contract is what counts. The last column comes from the official texts.</p>

<h2>The six-month rule</h2>
<p>The register file must show the operator’s financial capacity, under ${h.src('ctR3122', 'article R3122-1 of the Transport Code')}. The ${h.src('registreAide', 'register site')} and ${h.src('spVtc', 'service-public page F31027')} put it in practical terms: a ${h.eur(A.garantie_financiere_par_vehicule)} guarantee for every vehicle used regularly, provided by a bank or approved body, unless the operator owns the car or rents it for more than ${A.location_longue_mois} months. In those two cases you upload proof of ownership or the long rental contract instead.</p>
<p>So a short hire, often picked to start without savings, is not commitment-free as far as the register is concerned. It needs a bank guarantee, which the bank may charge for and which can tie up money. A two-year lease, by contrast, removes the guarantee from day one. ${h.src('uberConditions', 'Uber’s sign-up steps')} state the same rule: a rental of more than six months, proof of ownership, or ${h.eur(A.garantie_financiere_par_vehicule)} of financial capacity.</p>

<h2>Rented or owned, the car must comply</h2>
<p>Financing changes nothing about the technical rules in the ${h.src('arreteVehicule', 'order of 26 March 2015')}: under ${V.age_max_ans} years old, at least ${V.portes_min} doors, ${h.num(V.longueur_min_m, 2)} m long by ${h.num(V.largeur_min_m, 2)} m wide, ${V.puissance_min_kw} kW net power, with hybrids and electric cars fully exempt. Run the ${h.a('vehicule-vtc', 'vehicle checker')} before signing anything.</p>
<p>The age rule shapes the contract length. A petrol car first registered four years ago can work as a VTC for only three more years, so a five-year lease-to-own deal on it makes no sense. With a new car, the question arises when you decide whether to buy it at the end.</p>
<p>Heetch’s ${h.src('heetchVehicules', 'help centre')} lists the options for drivers without a compliant car: buy one, use leasing or credit-lease from a bank or car company, or join a fleet manager as an employee.</p>

<h2>Comparing month by month over the same term</h2>
<p>A lease payment and a loan repayment cannot be compared head to head. When the lease ends you hand the car back; when the loan ends you own a car that is still worth something. The calculator levels them:</p>
<ul>
<li>for buying on credit, it adds the deposit and every repayment, subtracts the resale value you expect, and divides by the number of months;</li>
<li>for leasing, it adds the first payment and the monthly rents and divides by the same number of months.</li>
</ul>
<p>The answer swings on resale value. VTC cars cover huge distances, sixty thousand kilometres a year is common, and resale prices fall accordingly. If you have no idea, try a low figure: a cautious estimate beats a pleasant surprise that never comes. Loan rate, price and rent are your own quotes; we suggest none and promote no rental firm.</p>

<h2>Read the contract for these four points</h2>
<ol>
<li><strong>Mileage allowance.</strong> Lease contracts set a yearly allowance and charge per extra kilometre. An allowance designed for a private motorist runs out fast in VTC work.</li>
<li><strong>Declared use.</strong> The rental firm must accept paid passenger transport. If insurance is included, ask for the certificate that says so, because the apps check it; see our page on ${h.a('assurance-vtc', 'VTC insurance')}.</li>
<li><strong>Servicing and downtime.</strong> Who pays for tyres and services, and is there a courtesy car? Every day off the road is a day without fares.</li>
<li><strong>Return conditions.</strong> Refurbishment charges at the end are a real exit cost; build them into your figures.</li>
</ol>

<h2>Tax: micro-enterprise or real profit</h2>
<p>As a micro-entrepreneur, contributions are a percentage of takings and income tax applies after a flat allowance, with no deduction of actual costs, so the lease reduces neither, as service-public’s page on the ${h.src('spFranchiseMicro', 'micro-enterprise tax regime')} explains. Under real profit, lease payments and loan interest are expenses that cut your profit. When the car eats a large share of turnover, that difference can decide your status; the ${h.a('tva-vtc-taxi', 'VAT and status tool')} puts numbers on it.</p>

<h2>Changing cars along the way</h2>
<p>The car is declared on the register with its registration document, and the sticker is printed for it. Swapping a rented car therefore means updating your account within ${A.changement_registre_jours} days and ordering new markings, about ${h.eur(A.vignette_environ)}; our page on the ${h.a('signaletique-vtc', 'VTC sticker')} sets out what the rules require. The full cost of a car, financing, energy and servicing included, is worked out per kilometre in our guide to ${h.a('voiture-vtc', 'choosing a VTC car')}, and its effect on your income in the ${h.a('revenu-net-chauffeur', 'net income calculator')}.</p>
`,
  },
});
