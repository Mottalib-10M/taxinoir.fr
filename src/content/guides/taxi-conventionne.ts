import { defineGuide } from '../../lib/guide-types';
import { P } from '../../lib/engine/params';
import { displayDate, formatMoney } from '../../lib/format';

const C = P.cpam;
const X = P.taxi;
const dfr = (iso: string) => displayDate(iso, 'fr-FR');
const den = (iso: string) => displayDate(iso, 'en-GB');
const fe = (n: number, l: 'fr' | 'en', d = 0) => formatMoney(n, d, l);
const villes = C.grandes_villes.join(', ');
const deps = C.grandes_villes_departements.join(', ');

export default defineGuide({
  id: 'taxi-conventionne',
  group: 'taxi',
  order: 40,
  mini: 'courseCpam',
  miniHref: 'salaire-taxi',
  related: ['devenir-taxi', 'licence-taxi', 'artisan-taxi', 'salaire-taxi', 'devenir-ambulancier'],
  sources: ['conventionCadreTaxi', 'cssL322_5', 'ameliTaxi', 'ameliCharteAds', 'ameliGrandeVille', 'spTaxi'],
  fr: {
    slug: 'taxi-conventionne',
    nav: 'Taxi conventionné CPAM',
    card: 'Convention avec l’Assurance maladie : conditions, tarifs 2025, équipements et activité sur le territoire.',
    title: 'Taxi conventionné CPAM 2026 : conditions, tarifs, convention',
    description: `Taxi conventionné CPAM en 2026 : ${C.ads_exploitation_ans} ans d’exploitation de licence, forfait de ${fe(C.forfait_prise_en_charge, 'fr')} pour ${C.km_inclus} km, ${fe(C.forfait_grande_ville, 'fr')} en grande ville, SEFI et géolocalisation au 1er janvier 2027.`,
    h1: 'Devenir taxi conventionné : la convention avec l’Assurance maladie',
    intro: 'Le transport assis de patients fait vivre beaucoup de taxis ; il obéit à une convention nationale révisée en 2025.',
    resume: `Un taxi ne peut transporter des patients remboursés par l’Assurance maladie que s’il a signé une convention avec la caisse, en vertu de l’article L322-5 du code de la sécurité sociale. Le cadre en vigueur est la convention-cadre nationale approuvée par l’arrêté du 29 juillet 2025, publiée au Journal officiel le ${dfr(C.cadre_jo)}. Pour obtenir la convention, le titulaire de la licence ou son exploitant doit justifier d’au moins ${C.ads_exploitation_ans} ans d’exploitation effective et continue de cette licence. Depuis le ${dfr(C.tarifs_depuis)}, chaque transport se facture avec un forfait de ${fe(C.forfait_prise_en_charge, 'fr')} qui inclut les ${C.km_inclus} premiers kilomètres, puis un tarif kilométrique propre au département, de ${fe(C.tarif_km_exemples['33'], 'fr', 2)} en Gironde à ${fe(C.tarif_km_exemples['06'], 'fr', 2)} dans les Alpes-Maritimes, plus un forfait de ${fe(C.forfait_grande_ville, 'fr')} dans douze grandes villes et les Hauts-de-Seine, la Seine-Saint-Denis et le Val-de-Marne. La convention vaut un an, renouvelable tacitement dans la limite de cinq ans. Elle impose la géolocalisation et la facturation SEFI au plus tard le 1er janvier 2027, et plus de la moitié des trajets pour des patients du territoire de la licence.`,
    faqs: [
      { q: 'Combien d’années faut-il pour obtenir le conventionnement CPAM ?', a: `L’article 3.2 de la convention-cadre approuvée par l’arrêté du 29 juillet 2025 exige du titulaire de la licence, ou de son exploitant, une exploitation effective et continue d’au moins ${C.ads_exploitation_ans} ans à la date de la demande. Le texte la définit comme l’affectation d’au moins un conducteur et d’un véhicule à cette licence. Une licence gratuite obtenue récemment ne permet donc pas de demander tout de suite le conventionnement.` },
      { q: 'Quel est le tarif d’un taxi conventionné depuis novembre 2025 ?', a: `L’annexe 2 de la convention-cadre fixe, depuis le ${dfr(C.tarifs_depuis)}, un forfait « prise en charge et accompagnement » de ${fe(C.forfait_prise_en_charge, 'fr')} qui inclut les ${C.km_inclus} premiers kilomètres avec le patient, puis un tarif par kilomètre propre à chaque département, et un forfait « Grande ville » de ${fe(C.forfait_grande_ville, 'fr')} dans les villes listées. Le mini-simulateur additionne ces éléments pour un trajet donné.` },
      { q: 'Quelles villes donnent droit au forfait « Grande ville » de 15 € ?', a: `La convention-cadre cite ${villes}, ainsi que les communes des départements ${deps}. Le forfait s’applique quand la prise en charge ou la dépose du patient a lieu dans l’une d’elles. Ameli publie en outre une liste, mise à jour en avril 2026, des établissements où ce forfait s’applique par extension, situés hors de ces communes.` },
      { q: 'Un taxi conventionné peut-il travailler surtout hors de sa commune ?', a: 'Pas pour ses transports de patients. La convention-cadre demande à chaque licence de prendre en charge majoritairement, à plus de 50 %, des patients de son territoire. La charte nationale de la Cnam, version de juin 2026, compte ce taux par trajet et par licence, sur les transports d’une année facturés au plus tard en mars suivant. Les premiers suivis porteront sur l’année 2026, en commission paritaire locale, au plus tard en juin 2027.' },
      { q: 'SEFI et géolocalisation : quelle date limite pour un taxi conventionné ?', a: 'Le 1er janvier 2027, selon la convention-cadre : à cette date au plus tard, la facturation par SEFI, le système électronique de facturation intégré, devient le mode obligatoire en remplacement de la norme B2, et chaque taxi conventionné doit être équipé d’un dispositif de géolocalisation. Service-public précise que ce dispositif doit être certifié par l’Assurance maladie.' },
      { q: 'Que risque un taxi qui ne respecte pas sa convention CPAM ?', a: `La convention-cadre prévoit des sanctions conventionnelles, dont le déconventionnement, pour une durée maximale de ${C.deconventionnement_max_ans} ans. Pour la règle d’activité majoritaire sur le territoire, la charte de la Cnam prévoit une transition : aucune procédure pour ce motif en 2027, seulement des courriers de rappel, avec la possibilité pour l’entreprise d’apporter ses observations.` },
    ],
    body: (h) => `
<h2>Pourquoi une convention</h2>
<p>Le transport de patients sur prescription médicale est remboursé par l’Assurance maladie. Quand il est fait en taxi, l’${h.src('cssL322_5', 'article L322-5 du code de la sécurité sociale')} pose une règle simple : il n’est remboursé que si l’entreprise de taxi a préalablement conclu une convention avec un organisme local d’assurance maladie. Sans convention, le patient n’est pas remboursé, et le taxi perd ce marché.</p>
<p>Cette convention locale suit un modèle national. Le modèle en vigueur est la ${h.src('conventionCadreTaxi', 'convention-cadre approuvée par l’arrêté du 29 juillet 2025')}, publiée au Journal officiel le ${h.date(C.cadre_jo)}. ${h.src('ameliTaxi', 'Ameli')} indique qu’elle est entrée en vigueur le ${h.date(C.tarifs_depuis)}. Un conducteur de taxi conventionné reste un chauffeur de taxi : la convention ne remplace ni la carte professionnelle, ni la licence. Elle ne doit pas non plus être confondue avec les véhicules sanitaires, ambulances et VSL, qui relèvent d’un autre cadre, présenté sur la page ${h.a('devenir-ambulancier', 'devenir ambulancier')}.</p>

<h2>Qui peut demander la convention</h2>
<p>L’article 3.2 de la convention-cadre réserve le conventionnement au titulaire de l’autorisation de stationnement, ou à son exploitant, qui justifie d’une exploitation effective et continue d’au moins ${C.ads_exploitation_ans} ans à la date de la demande. Le texte précise ce qu’il entend par exploitation : l’affectation d’au moins un conducteur et d’un véhicule à cette autorisation. Autrement dit, la licence doit avoir réellement roulé pendant trois ans.</p>
<p>Le même article renvoie à un maillage territorial : le département est découpé en territoires, de un à dix-sept selon les cas d’après la charte de la Cnam, et les besoins de chaque territoire entrent en compte. La convention n’est donc pas un droit automatique ; elle dépend aussi de l’offre locale. Le futur conventionné présente classiquement sa carte professionnelle, l’attestation d’assurance de responsabilité civile professionnelle et un contrôle technique à jour du véhicule.</p>
<p>Pour un nouveau taxi, la conséquence est nette : la licence vient d’abord, le conventionnement ensuite. La page ${h.a('licence-taxi', 'licence de taxi')} explique comment obtenir une licence, et la page ${h.a('location-licence-taxi', 'location de licence')} comment exploiter celle d’un autre, ce qui compte aussi comme exploitation.</p>

<h2>Les tarifs depuis le 1er novembre 2025</h2>
<p>L’annexe 2 de la convention-cadre fixe la tarification applicable « à compter du ${h.date(C.tarifs_depuis)} ». Elle tient en trois éléments :</p>
${h.table(['Élément', 'Montant', 'Règle'], [
  ['Forfait « prise en charge et accompagnement »', h.eur(C.forfait_prise_en_charge), `inclut les ${C.km_inclus} premiers kilomètres parcourus avec le patient`],
  ['Tarif kilométrique', `${h.eur(C.tarif_km_exemples['33'], 2)} en Gironde, ${h.eur(C.tarif_km_exemples['13'], 2)} dans les Bouches-du-Rhône et en Haute-Garonne, ${h.eur(C.tarif_km_exemples['06'], 2)} dans les Alpes-Maritimes`, 'propre à chaque département, facturé à partir du 5e kilomètre'],
  ['Forfait « Grande ville »', h.eur(C.forfait_grande_ville), `prise en charge ou dépose à ${villes}, ou dans les départements ${deps}`],
], 'Annexe 2 de la convention-cadre approuvée par l’arrêté du 29 juillet 2025, exemples de tarifs départementaux')}
<p>Le tarif kilométrique de chaque département figure dans le tableau de l’annexe ; nous n’en reprenons que quelques lignes, relues sur le texte. Lisez celui de votre département avant d’utiliser le mini-simulateur, qui part par défaut du tarif des Bouches-du-Rhône. Ameli publie aussi une ${h.src('ameliGrandeVille', 'liste des établissements')} où le forfait « Grande ville » s’applique par extension, mise à jour en avril 2026.</p>
<p>Le mini-simulateur donne un montant de base : forfait, kilomètres au tarif départemental et forfait « Grande ville ». Il ne calcule ni les péages, ni l’attente, ni le supplément pour les transports de personnes à mobilité réduite, ni les règles du transport partagé ; ces éléments relèvent de la convention signée avec votre caisse.</p>

<h2>Le transport partagé</h2>
<p>Service-public rappelle que le taxi qui transporte des personnes malades doit leur proposer un transport partagé avec un ou plusieurs autres patients. Trois limites protègent le patient : un détour de ${X.partage_detour_km} km au plus, un périmètre de ${X.partage_rayon_km} km au plus autour du lieu de destination, et ${X.partage_attente_min} minutes d’attente au total au maximum. Côté patient, l’article L322-5 prévoit qu’un refus injustifié du transport partagé entraîne une minoration du remboursement. Le même article confie à la convention-cadre les règles de tarification du transport partagé : consultez la grille de votre convention locale.</p>

<h2>Équipements obligatoires au 1er janvier 2027</h2>
<p>La convention-cadre fixe deux échéances au plus tard au 1er janvier 2027 :</p>
<ul>
<li><strong>la facturation SEFI</strong>, système électronique de facturation intégré, qui devient le mode obligatoire en remplacement de la norme B2 ;</li>
<li><strong>la géolocalisation</strong> du véhicule, par un dispositif certifié par l’Assurance maladie selon ${h.src('spTaxi', 'service-public')}, qui enregistre la prise en charge et l’arrivée.</li>
</ul>
<p>Ces équipements ont un coût, qui varie selon les fournisseurs et n’est fixé par aucun texte public : demandez des devis et ajoutez-les aux frais du véhicule dans le ${h.a('revenu-net-chauffeur', 'simulateur de revenu net')}.</p>

<h2>Travailler sur son territoire : la règle des 50 %</h2>
<p>C’est la nouveauté qui change le plus les habitudes. L’article 5.2 de la convention-cadre demande à chaque licence de prendre en charge majoritairement, à plus de ${h.pct(C.activite_majoritaire, 0)}, des patients de son territoire. La ${h.src('ameliCharteAds', 'charte nationale de la Cnam')}, dans sa version de juin 2026, en précise le calcul :</p>
<ul>
<li>le taux se calcule par licence, c’est-à-dire par véhicule rattaché à la licence conventionnée ;</li>
<li>il se compte par trajet : un patient transporté soixante-dix fois compte soixante-dix fois ;</li>
<li>comptent les patients qui résident dans le territoire et ceux qui y sont pris en charge, quelle que soit leur adresse ;</li>
<li>les données sont celles des transports d’une année, facturés au plus tard en mars de l’année suivante.</li>
</ul>
<p>La charte donne son propre exemple : un taxi qui transporte un patient de son territoire soixante-dix fois dans l’année et trente patients extérieurs une fois chacun atteint un taux de 70 %. Un changement de véhicule de plus de trente jours se signale à la caisse dans les ${C.changement_vehicule_jours} jours calendaires.</p>
<p>La mise en œuvre est progressive. Les premiers suivis en commission paritaire locale porteront sur les chiffres de 2026, au plus tard en juin 2027, avec un point semestriel notifié à l’entreprise. Aucune procédure conventionnelle ne pourra être engagée en 2027 pour ce motif : seulement des courriers de rappel, auxquels l’entreprise peut répondre.</p>

<h2>Durée, renouvellement et sanctions</h2>
<p>La convention signée avec la caisse vaut un an. Elle se renouvelle par tacite reconduction, par périodes d’un an, dans la limite de cinq ans. En cas de manquement, la convention-cadre prévoit des sanctions conventionnelles pouvant aller jusqu’au déconventionnement, pour ${C.deconventionnement_max_ans} ans au plus. Un déconventionnement coupe l’accès à une clientèle qui représente, pour beaucoup de taxis hors des grandes villes, une part importante des recettes.</p>

<h2>Ce que la convention change au revenu</h2>
<p>Le transport de patients apporte un volume régulier, payé selon une grille connue d’avance, souvent en tiers payant. Il impose en contrepartie des équipements, une facturation électronique et une activité centrée sur le territoire de la licence. Pour mesurer ce que cela laisse, reportez vos recettes dans le simulateur de la page ${h.a('salaire-taxi', 'combien gagne un taxi')}. Le statut de l’exploitant, artisan ou société, est détaillé sur la page ${h.a('artisan-taxi', 'artisan taxi')}.</p>
`,
  },
  en: {
    slug: 'cpam-approved-taxi',
    nav: 'CPAM-approved taxi',
    card: 'Health insurance agreement: eligibility, 2025 fares, equipment and the local activity rule.',
    title: 'CPAM-Approved Taxi France 2026: Eligibility, Fares, Rules',
    description: `Approved taxis for patient transport in France, 2026: ${C.ads_exploitation_ans} years of licence use, ${fe(C.forfait_prise_en_charge, 'en')} flat fee covering ${C.km_inclus} km, ${fe(C.forfait_grande_ville, 'en')} big-city fee, SEFI and GPS due by 1 January 2027.`,
    h1: 'Becoming a CPAM-approved taxi: the health insurance agreement',
    intro: 'Seated patient transport keeps many French taxis busy, under a national agreement revised in 2025.',
    resume: `In France, a taxi may carry patients whose fares are reimbursed by the national health insurance (Assurance maladie, run locally by the CPAM) only after signing an agreement with the local fund, under article L322-5 of the Social Security Code. The current model is the national framework agreement approved by the order of 29 July 2025, published in the Official Journal on ${den(C.cadre_jo)}. To qualify, the licence holder or the person running the licence must show at least ${C.ads_exploitation_ans} years of actual, continuous use of that taxi licence. Since ${den(C.tarifs_depuis)}, each journey is billed with a ${fe(C.forfait_prise_en_charge, 'en')} flat fee covering the first ${C.km_inclus} kilometres, then a per-kilometre rate set for each département, from ${fe(C.tarif_km_exemples['33'], 'en', 2)} in Gironde to ${fe(C.tarif_km_exemples['06'], 'en', 2)} in Alpes-Maritimes, plus a ${fe(C.forfait_grande_ville, 'en')} fee in twelve big cities and three départements around Paris. The agreement runs for one year, renewed automatically up to five years. It requires GPS tracking and SEFI e-billing by 1 January 2027, and more than half of journeys for patients from the licence’s own area.`,
    faqs: [
      { q: 'How long must I have run a taxi licence before applying to the CPAM?', a: `Article 3.2 of the framework agreement approved on 29 July 2025 requires the licence holder, or whoever runs the licence, to prove at least ${C.ads_exploitation_ans} years of actual and continuous use on the date of the application. The text defines that as at least one driver and one vehicle assigned to the licence. A recently obtained free licence therefore does not qualify straight away.` },
      { q: 'What does the CPAM pay a taxi per journey since November 2025?', a: `Annex 2 of the framework agreement sets, from ${den(C.tarifs_depuis)}, a “pick-up and assistance” flat fee of ${fe(C.forfait_prise_en_charge, 'en')} covering the first ${C.km_inclus} kilometres with the patient, then a per-kilometre rate specific to each département, plus a ${fe(C.forfait_grande_ville, 'en')} “big city” fee in the listed places. The calculator above adds these up for a given journey; tolls, waiting and other supplements are not included.` },
      { q: 'Which places trigger the €15 big-city fee for patient transport?', a: `The framework agreement lists ${villes}, plus every commune in départements ${deps} around Paris. The fee applies when the patient is picked up or dropped off in one of them. Ameli, the health insurance website, also publishes a list, updated in April 2026, of healthcare facilities outside those communes where the fee applies by extension.` },
      { q: 'Can an approved taxi do most of its patient work outside its own area?', a: 'No. The framework agreement asks each licence to carry mostly, meaning more than 50 %, patients from its own area. The Cnam national charter, June 2026 version, measures this per journey and per licence, over a year’s journeys billed by the following March. The first reviews will cover 2026 figures, in local joint committees, by June 2027 at the latest.' },
      { q: 'When must an approved taxi have SEFI billing and GPS tracking?', a: 'By 1 January 2027 at the latest, according to the framework agreement: from then on SEFI, the integrated electronic billing system, becomes the compulsory billing method in place of the older B2 standard, and every approved taxi must carry a geolocation device. Service-public adds that the device must be certified by the health insurance fund.' },
      { q: 'What happens if a taxi breaks the terms of its CPAM agreement?', a: `The framework agreement provides for contractual penalties, up to withdrawal of the agreement (déconventionnement) for at most ${C.deconventionnement_max_ans} years. For the local-activity rule specifically, the Cnam charter sets a transition: no proceedings on that ground in 2027, only reminder letters, and the firm may submit its own explanations before anything further happens.` },
    ],
    body: (h) => `
<h2>Why an agreement is needed</h2>
<p>Patient transport on a doctor’s prescription is reimbursed by the French health insurance system. When the journey is by taxi, ${h.src('cssL322_5', 'article L322-5 of the Social Security Code')} sets a simple rule: it is reimbursed only if the taxi firm has first signed an agreement with a local health insurance fund. Without one, the patient gets nothing back and the taxi loses that work.</p>
<p>Each local agreement follows a national model. The current one is the ${h.src('conventionCadreTaxi', 'framework agreement approved by the order of 29 July 2025')}, published in the Official Journal on ${h.date(C.cadre_jo)}. ${h.src('ameliTaxi', 'Ameli')} states that it came into force on ${h.date(C.tarifs_depuis)}. An approved-taxi driver is still a taxi driver: the agreement replaces neither the professional card nor the licence. Nor should it be confused with medical transport vehicles such as ambulances and VSLs, which follow different rules described on our page about ${h.a('devenir-ambulancier', 'becoming an ambulance driver')}.</p>

<h2>Who can apply</h2>
<p>Article 3.2 of the framework agreement limits approval to the holder of the taxi licence (autorisation de stationnement, ADS), or the person running it, who can show at least ${C.ads_exploitation_ans} years of actual, continuous use on the date of the application. The text explains what use means: at least one driver and one vehicle assigned to that licence. Put simply, the licence must genuinely have been on the road for three years.</p>
<p>The same article refers to local mapping: each département is split into areas, from one to seventeen according to the Cnam charter, and local needs are taken into account. So approval is not automatic; it also depends on local supply. Applicants typically present their professional card, a professional liability insurance certificate and an up-to-date roadworthiness test for the car.</p>
<p>For a new taxi driver the order is clear: licence first, approval later. Our page on the ${h.a('licence-taxi', 'taxi licence')} explains how to get one, and the page on ${h.a('location-licence-taxi', 'renting a taxi licence')} explains how to run someone else’s, which also counts as use.</p>

<h2>Fares since 1 November 2025</h2>
<p>Annex 2 of the framework agreement sets the fares that apply “from ${h.date(C.tarifs_depuis)}”. There are three building blocks:</p>
${h.table(['Item', 'Amount', 'Rule'], [
  ['“Pick-up and assistance” flat fee', h.eur(C.forfait_prise_en_charge), `covers the first ${C.km_inclus} kilometres driven with the patient`],
  ['Per-kilometre rate', `${h.eur(C.tarif_km_exemples['33'], 2)} in Gironde, ${h.eur(C.tarif_km_exemples['13'], 2)} in Bouches-du-Rhône and Haute-Garonne, ${h.eur(C.tarif_km_exemples['06'], 2)} in Alpes-Maritimes`, 'set for each département, charged from the 5th kilometre'],
  ['“Big city” flat fee', h.eur(C.forfait_grande_ville), `pick-up or drop-off in ${villes}, or in départements ${deps}`],
], 'Annex 2 to the framework agreement approved on 29 July 2025, sample département rates')}
<p>Every département’s rate appears in the annex table; we quote only a few rows, checked against the text. Look up your own before using the calculator, which defaults to the Bouches-du-Rhône rate. Ameli also publishes a ${h.src('ameliGrandeVille', 'list of facilities')} where the big-city fee applies by extension, updated in April 2026.</p>
<p>The calculator gives a base amount: flat fee, kilometres at the département rate and the big-city fee. It does not work out tolls, waiting time, the supplement for passengers with reduced mobility or shared-ride rules; those depend on the agreement you sign with your local fund.</p>

<h2>Shared rides</h2>
<p>Service-public notes that a taxi carrying patients must offer them a shared ride with one or more other patients. Three limits protect the patient: a detour of at most ${X.partage_detour_km} km, a radius of at most ${X.partage_rayon_km} km around the destination, and no more than ${X.partage_attente_min} minutes of total waiting. On the patient’s side, article L322-5 provides for lower reimbursement after an unjustified refusal of a shared ride. The same article leaves shared-ride pricing rules to the framework agreement; check the grid in your local agreement.</p>

<h2>Equipment due by 1 January 2027</h2>
<p>The framework agreement sets two deadlines, 1 January 2027 at the latest:</p>
<ul>
<li><strong>SEFI billing</strong>, the integrated electronic billing system, becomes compulsory in place of the B2 standard;</li>
<li><strong>geolocation</strong> of the car, with a device certified by the health insurance fund according to ${h.src('spTaxi', 'service-public')}, recording pick-up and arrival.</li>
</ul>
<p>The equipment costs money, which varies by supplier and is set by no public text: get quotes and add them to your car costs in the ${h.a('revenu-net-chauffeur', 'net income calculator')}.</p>

<h2>Working your own area: the 50 % rule</h2>
<p>This is the change that most affects day-to-day habits. Article 5.2 of the framework agreement asks each licence to carry mostly, more than ${h.pct(C.activite_majoritaire, 0)}, patients from its own area. The ${h.src('ameliCharteAds', 'Cnam national charter')}, June 2026 version, sets out the calculation:</p>
<ul>
<li>the rate is worked out per licence, meaning per vehicle attached to the approved licence;</li>
<li>it counts journeys: a patient carried seventy times counts seventy times;</li>
<li>patients living in the area count, and so do patients picked up there, whatever their address;</li>
<li>the data covers a year’s journeys billed by the following March.</li>
</ul>
<p>The charter gives its own example: a taxi that carries one local patient seventy times in a year and thirty outside patients once each reaches 70 %. A change of car lasting more than thirty days must be reported to the fund within ${C.changement_vehicule_jours} calendar days.</p>
<p>It is being phased in. The first reviews in local joint committees will cover 2026 figures, by June 2027 at the latest, with a half-yearly update sent to each firm. No proceedings may be brought on this ground in 2027: only reminder letters, to which the firm can respond.</p>

<h2>Term, renewal and penalties</h2>
<p>The agreement with the fund lasts one year. It renews automatically, a year at a time, up to five years. For breaches, the framework agreement provides contractual penalties up to withdrawal of the agreement for ${C.deconventionnement_max_ans} years at most. Losing approval cuts off a client base that, for many taxis outside the big cities, makes up a large share of takings.</p>

<h2>What approval does to your income</h2>
<p>Patient transport brings steady volume, paid on a grid known in advance and often directly by the fund rather than the patient. In return it demands equipment, electronic billing and activity focused on the licence’s area. To see what it leaves you, enter your takings in the calculator on ${h.a('salaire-taxi', 'how much a taxi driver earns')}. Business status, owner-driver or company, is covered on our page about ${h.a('artisan-taxi', 'self-employed taxi drivers')}.</p>
`,
  },
});
