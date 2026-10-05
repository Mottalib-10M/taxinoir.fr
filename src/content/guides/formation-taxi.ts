import { defineGuide } from '../../lib/guide-types';
import { P } from '../../lib/engine/params';

// Valeurs lues dans params-2026.json : bloc `acces` (service-public F21907, vérifié le 13 juillet 2026 ;
// CMA, tarifs 2026 ; arrêté du 11 août 2017), bloc `examen` (règlement CMA, décembre 2024), bloc `taxi`.
const A = P.acces;
const E = P.examen;
const X = P.taxi;
const ecrits = [...E.tronc_commun, ...E.taxi];
const coefTotal = ecrits.reduce((s, e) => s + e.coef, 0);
const [FT, GT] = E.taxi;
const fr = (n: number) => n.toLocaleString('fr-FR').replace(/\s/g, ' ');
const en = (n: number) => n.toLocaleString('en-GB');

export default defineGuide({
  id: 'formation-taxi',
  group: 'taxi',
  order: 15,
  mini: 'formationTaxi',
  miniHref: 'cout-acces-metier',
  related: ['examen-taxi', 'devenir-taxi', 'formation-continue-vtc-taxi', 'cout-acces-metier', 'formation-vtc', 'licence-taxi'],
  sources: ['spTaxi', 'cmaReglement', 'cmaT3p', 'cmaFaq', 'arreteFormationContinue', 'arreteProgramme2024'],
  fr: {
    slug: 'formation-taxi',
    nav: 'Formation taxi',
    card: `Facultative avant l’examen, de ${A.formation_heures_min} à ${A.formation_heures_max} heures : ce que disent les textes, ce qu’elle coûte, ce qui reste obligatoire.`,
    title: 'Formation taxi 2026 : obligatoire ou non, prix, CPF, examen',
    description: `Formation taxi 2026 : facultative selon service-public, de ${A.formation_heures_min} à ${A.formation_heures_max} h et ${A.formation_cout_min} à ${fr(A.formation_cout_max)} € environ, CPF possible, examen CMA à ${A.examen_complet} €, puis ${A.formation_continue_heures} h tous les ${A.carte_validite_ans} ans.`,
    h1: 'Formation taxi : ce qui est exigé, ce qui est conseillé, ce que ça coûte',
    intro: 'Le seul passage imposé pour devenir taxi est l’examen de la chambre de métiers, pas le centre de formation.',
    resume: `Aucun texte n’impose de suivre une formation avant l’examen de taxi. La fiche F21907 de service-public la dit « fortement recommandée » mais « pas obligatoire », et le règlement des chambres de métiers et de l’artisanat (CMA) accepte les candidats libres. Une formation dure de ${A.formation_heures_min} à ${A.formation_heures_max} heures environ et coûte de ${A.formation_cout_min} à ${fr(A.formation_cout_max)} € environ ; le compte personnel de formation (CPF) peut la payer, et France Travail peut aider les demandeurs d’emploi. La liste des centres agréés est publiée par la préfecture. L’examen, lui, se paie à part : ${A.examen_complet} € en 2026 pour sept écrits, dont l’épreuve locale de connaissance du territoire, et une épreuve pratique de conduite avec taximètre. Trois formations restent obligatoires : le PSC1 (premiers secours) de moins de ${A.psc1_validite_ans} ans pour obtenir la carte, le stage de formation continue de ${A.formation_continue_heures} heures tous les ${A.carte_validite_ans} ans, et le stage de mobilité de ${X.mobilite_heures} heures (${X.mobilite_heures_paris} à Paris) pour travailler dans un autre département.`,
    faqs: [
      { q: 'Peut-on passer l’examen de taxi sans avoir suivi de formation ?', a: 'Oui. Le règlement de l’examen des chambres de métiers l’ouvre en candidature libre comme à l’issue d’un parcours de formation, et service-public précise que la formation n’est pas obligatoire. Le dossier d’inscription ne demande aucune attestation de centre. Le candidat libre doit seulement venir à l’épreuve pratique avec un véhicule conforme au règlement, ce qui suppose souvent d’en louer un.' },
      { q: 'Combien coûte une formation taxi en 2026 ?', a: `Service-public donne une fourchette de ${A.formation_cout_min} à ${fr(A.formation_cout_max)} € environ, pour ${A.formation_heures_min} à ${A.formation_heures_max} heures selon le centre et la région. Aucun texte ne fixe ce prix. Il faut y ajouter les droits d’examen versés à la CMA, ${A.examen_complet} € en 2026, puis environ ${A.carte_pro_environ} € pour la carte professionnelle. Le PSC1 et la visite chez le médecin agréé se paient aussi à part.` },
      { q: 'Le CPF peut-il financer une formation taxi ?', a: 'Oui. Service-public indique que le compte personnel de formation peut servir à payer la formation de chauffeur de taxi, et qu’un demandeur d’emploi peut demander conseil à France Travail pour obtenir une aide au financement. Le financeur décide, pas le centre. Vérifiez que la session précise figure dans l’offre éligible avant de signer, et que les droits d’examen sont compris ou non.' },
      { q: 'Quelles formations sont vraiment obligatoires pour un chauffeur de taxi ?', a: `Trois. Le PSC1, formation de prévention et secours civiques de niveau 1 suivie depuis moins de ${A.psc1_validite_ans} ans, exigé pour la carte. Le stage de formation continue de ${A.formation_continue_heures} heures tous les ${A.carte_validite_ans} ans, pour la renouveler. Et, si vous voulez exercer hors du département de l’examen, le stage de mobilité de ${X.mobilite_heures} heures, porté à ${X.mobilite_heures_paris} heures pour Paris.` },
      { q: 'Un chauffeur VTC doit-il refaire toute la préparation pour devenir taxi ?', a: `Non, s’il a été déclaré admissible aux écrits complets de l’examen VTC depuis moins de ${E.mobilite_validite_ans} ans. Il passe alors seulement les deux épreuves propres au taxi, F(T) et G(T), puis la pratique taxi, pour ${A.examen_mobilite} € en 2026 au lieu de ${A.examen_complet} €. La préparation se concentre sur le territoire, la réglementation des taxis et l’usage du taximètre.` },
    ],
    body: (h) => `
<h2>Ce que disent les textes sur la formation initiale</h2>
<p>La ${h.src('spTaxi', 'fiche F21907 de service-public')} consacre sa quatrième étape à la formation avant l’examen. Deux phrases fixent la règle : la formation est fortement recommandée pour avoir une chance de réussir, et elle n’est pas obligatoire. Le ${h.src('cmaReglement', 'règlement de l’examen des CMA')} va dans le même sens en ouvrant l’inscription aux candidats libres. La ${h.src('cmaFaq', 'foire aux questions de la CMA')} rappelle de son côté que le certificat médical et le PSC1 ne servent qu’au moment de la carte : à l’inscription, on vous demande une pièce d’identité, le permis B, une photo et un justificatif de domicile, rien de plus.</p>
<p>Il n’existe donc aucun programme réglementaire de la formation taxi, ni durée minimale, ni agrément qui conditionnerait l’accès à l’examen. Ce que l’État fixe, c’est le contenu des épreuves, par arrêté, modifié en dernier lieu par l’${h.src('arreteProgramme2024', 'arrêté du 20 mars 2024')}. Un centre se juge donc sur sa fidélité à ce programme, et en particulier sur la part qu’il réserve à l’épreuve locale.</p>

<h2>Ce que la préparation doit couvrir</h2>
<p>Sur les sept écrits, six ont un sujet identique dans toute la France. Le septième, F(T), porte sur la connaissance du territoire et la réglementation locale, et ses sujets sont arrêtés par la CMA de région. C’est l’épreuve qui distingue une préparation taxi d’une préparation VTC, et celle où un candidat installé depuis peu dans le département perd le plus de points.</p>
${h.table(['Épreuve', 'Portée du sujet', 'Coefficient', 'À travailler en priorité'], [
  ...E.tronc_commun.map((e) => [`${e.code} ${e.fr}`, 'nationale', e.coef, e.code === 'A' ? 'code des transports, discriminations, violences sexistes' : e.code === 'B' ? 'comptabilité simple, statuts, coût de revient' : e.code === 'C' ? 'code de la route, fatigue, alcool' : e.code === 'D' ? 'compréhension de texte, rédaction courte' : 'accueil d’un client étranger, vocabulaire du trajet']),
  [`${FT.code} ${FT.fr}`, 'locale (CMA de région)', FT.coef, 'gares, hôpitaux, sites touristiques, arrêtés préfectoraux'],
  [`${GT.code} ${GT.fr}`, 'nationale', GT.coef, 'autorisation de stationnement, tarifs, exercice hors zone'],
], 'Source : règlement CMA de l’examen taxi, VTC et VMDTR, décembre 2024 ; colonne de droite : lecture taxinoir.fr du programme')}
<p>La moyenne pondérée doit atteindre ${E.admissibilite_moyenne}/20 sur un total de ${coefTotal} coefficients, sans aucune note éliminatoire. La pratique compte ensuite pour une épreuve entière : ${E.pratique_conduite_min} minutes de conduite au moins, la relation au client et la facturation au taximètre, avec ${E.pratique_admis}/20 pour être reçu. Le détail des barèmes et des cas d’ajournement est sur la page ${h.a('examen-taxi', 'examen taxi')}.</p>

<h2>Durée, prix et format : lire une offre</h2>
<p>Service-public situe la formation entre ${A.formation_heures_min} et ${A.formation_heures_max} heures, et son prix entre ${h.eur(A.formation_cout_min)} et ${h.eur(A.formation_cout_max)} environ. La plupart des centres donnent une partie des cours à distance, et le paiement se fait en ligne ou sur place. Trois questions séparent les offres bien plus que le prix affiché :</p>
<ul>
<li>combien d’heures portent sur l’épreuve locale F(T), avec des cartes et des cas du département où vous passerez la pratique ;</li>
<li>combien d’heures de conduite sont prévues dans un véhicule équipé comme un taxi, avec taximètre, imprimante et terminal de paiement ;</li>
<li>si le véhicule du jour de la pratique et les droits d’examen sont compris.</li>
</ul>
<p>Le mini-simulateur en haut de page additionne votre devis, vos frais de PSC1 et de médecin, les droits de la CMA et la carte, puis montre ce que coûterait un échec à l’une ou l’autre partie. Les frais réglementés viennent de nos paramètres ; les prix privés sont les vôtres, et nous n’en publions aucun.</p>
${h.table(['Poste', 'Montant 2026', 'Fixé par'], [
  ['Formation (facultative)', `${h.eur(A.formation_cout_min)} à ${h.eur(A.formation_cout_max)} environ`, 'le centre'],
  ['Examen complet', h.eur(A.examen_complet), 'la CMA'],
  ['Examen après admissibilité VTC (mobilité)', h.eur(A.examen_mobilite), 'la CMA'],
  ['Pratique seule, après un échec', h.eur(A.examen_admission_seule), 'la CMA'],
  ['Carte professionnelle', `environ ${h.eur(A.carte_pro_environ)}`, 'service-public'],
  ['PSC1, médecin agréé', 'selon devis', 'l’organisme, le médecin'],
], 'Sources : service-public F21907 ; CMA, guide des examens, tarifs 2026')}
<p>En 2025, l’examen complet coûtait ${h.eur(A.examen_complet_2025)}. La hausse est faible, mais elle rappelle que les droits se vérifient sur le ${h.src('cmaT3p', 'guide des examens de la CMA')} au moment de l’inscription, pas sur une plaquette de centre.</p>

<h2>Payer avec le CPF ou une aide de France Travail</h2>
<p>Service-public cite le compte personnel de formation pour la formation taxi, et renvoie les demandeurs d’emploi vers France Travail, qui peut aider au financement et propose un outil de recherche des formations. Le CPF finance une session précise, inscrite dans l’offre éligible : un centre ne peut pas promettre une prise en charge qui dépend d’un autre que lui. Pour un salarié en reconversion, la question se pose aussi des heures d’absence : un stage de plusieurs semaines se prépare avec l’employeur.</p>

<h2>Les trois formations que personne ne peut éviter</h2>
<h3>Le PSC1, avant la carte</h3>
<p>Parmi les conditions pour devenir taxi, service-public cite une formation de prévention et secours civiques de niveau 1 suivie depuis moins de ${A.psc1_validite_ans} ans. La préfecture la vérifie lors de la demande de carte, avec l’avis du médecin agréé et le permis B détenu depuis ${A.permis_anciennete_ans} ans, ${A.permis_conduite_accompagnee_ans} après une conduite accompagnée. Un PSC1 ancien est à refaire : programmez-le dans les semaines qui précèdent la demande.</p>
<h3>La formation continue, tous les cinq ans</h3>
<p>L’${h.src('arreteFormationContinue', 'arrêté du 11 août 2017')} impose un stage de ${A.formation_continue_heures} heures en présentiel, dans une session réservée aux taxis, avant chaque renouvellement de la carte valable ${A.carte_validite_ans} ans. Il réunit trois modules obligatoires, dont la réglementation propre au taxi, et un module au choix. Service-public conseille de le suivre ${A.formation_continue_avant_mois} mois avant l’échéance. Le calendrier et la démarche sont sur la page ${h.a('formation-continue-vtc-taxi', 'formation continue et renouvellement')}.</p>
<h3>La mobilité, pour changer de département</h3>
<p>La carte de taxi ne vaut que dans le département où l’examen a été réussi. Pour en ajouter un, il faut un stage de ${X.mobilite_heures} heures, ${X.mobilite_heures_paris} heures pour Paris, sur le nouveau territoire et sa réglementation, puis une nouvelle carte. Service-public plafonne l’exercice à ${X.mobilite_max_departements} départements. Si vous savez déjà que vous travaillerez ailleurs, passez plutôt l’examen dans ce département-là : la pratique se passe là où vous demandez à exercer.</p>

<h2>Se préparer seul : ce qu’il faut prévoir</h2>
<p>Un candidat libre économise le prix du centre, pas tout le reste. Il lui faut un véhicule conforme au règlement pour la pratique : quatre portes, double commande et doubles rétroviseurs, un taximètre, un dispositif lumineux, une imprimante reliée au compteur et un terminal de paiement. Cette location ne fait pas partie des droits d’examen. Pour les écrits, le programme officiel et les annales suffisent à qui travaille avec méthode, à condition de ne pas négliger l’anglais et le français, notés comme les autres.</p>
<p>La meilleure préparation de l’épreuve F(T) reste le terrain : parcourir les axes, repérer les gares et les établissements de santé, lire les arrêtés de la préfecture. Aucun manuel national ne la couvre en entier.</p>

<h2>Après la formation</h2>
<p>Reçu, vous demandez la carte en préfecture avec l’attestation de la CMA, l’avis médical et le PSC1. Vient ensuite le choix du statut et de la licence, gratuite sur liste d’attente, achetée ou louée, détaillé sur les pages ${h.a('devenir-taxi', 'devenir taxi')} et ${h.a('licence-taxi', 'licence de taxi')}. Pour le budget de démarrage complet, véhicule compris, utilisez le ${h.a('cout-acces-metier', 'simulateur du coût d’accès')}. Si vous hésitez encore entre les deux métiers, la ${h.a('formation-vtc', 'formation VTC')} partage le même tronc commun.</p>
`,
  },
  en: {
    slug: 'taxi-driver-training',
    nav: 'Taxi training',
    card: `Optional before the exam, ${A.formation_heures_min} to ${A.formation_heures_max} hours: what the rules say, what it costs and which courses stay compulsory.`,
    title: 'Taxi Driver Training France 2026: Course, Cost, CPF Funding',
    description: `Taxi training in France, 2026: optional, ${A.formation_heures_min} to ${A.formation_heures_max} hours, about €${A.formation_cout_min} to €${en(A.formation_cout_max)}, CPF funding possible, €${A.examen_complet} CMA exam, then a ${A.formation_continue_heures}-hour refresher every ${A.carte_validite_ans} years.`,
    h1: 'Taxi driver training in France: required, advised, and what it costs',
    intro: 'In France the only compulsory step towards a taxi licence is the exam run by the chambers of trades, not a driving school.',
    resume: `French law does not require you to take a course before the taxi exam. The government site service-public (page F21907) calls training “strongly recommended” but “not compulsory”, and the rules of the chambers of trades (CMA), which run the exam, accept independent candidates. A course usually lasts ${A.formation_heures_min} to ${A.formation_heures_max} hours and costs roughly €${A.formation_cout_min} to €${en(A.formation_cout_max)}; your CPF (the personal training account most workers in France build up) can pay for it, and job seekers can ask France Travail, the public employment service, for help. The prefecture, the State’s office in each département, publishes the list of approved schools. The exam fee is separate: €${A.examen_complet} in 2026 for seven written papers, one of them on local geography and rules, plus a driving test with a taxi meter. Three courses remain mandatory: first aid (PSC1, under ${A.psc1_validite_ans} years old) before the card, a ${A.formation_continue_heures}-hour refresher every ${A.carte_validite_ans} years, and a ${X.mobilite_heures}-hour mobility course (${X.mobilite_heures_paris} in Paris) to work in another département.`,
    faqs: [
      { q: 'Can I sit the French taxi exam without going to a training school?', a: 'Yes. The chambers of trades open the exam to independent candidates as well as to those finishing a course, and service-public states that training is not compulsory. Registration asks for no school certificate. The catch is the driving test: you must bring a car that meets the exam rules, with dual controls and taxi equipment, which usually means hiring one.' },
      { q: 'What does a taxi training course cost in France in 2026?', a: `Service-public quotes about €${A.formation_cout_min} to €${en(A.formation_cout_max)} for ${A.formation_heures_min} to ${A.formation_heures_max} hours, depending on the school and the region. No rule caps the price. On top come the exam fee paid to the chamber of trades, €${A.examen_complet} in 2026, and about €${A.carte_pro_environ} for the professional card, plus your first-aid course and the approved doctor’s visit.` },
      { q: 'Will my CPF account cover a taxi course?', a: 'It can. Service-public lists the compte personnel de formation (CPF) as a way to pay for taxi driver training, and points job seekers to France Travail for funding advice. The funder makes the decision, not the school. Check that the exact session is listed as eligible before you sign, and whether the exam fee is part of the package.' },
      { q: 'Which courses are compulsory for a taxi driver in France?', a: `Three. First aid at PSC1 level, taken within the last ${A.psc1_validite_ans} years, before you apply for the card. A ${A.formation_continue_heures}-hour refresher course every ${A.carte_validite_ans} years to renew it. And a ${X.mobilite_heures}-hour mobility course, ${X.mobilite_heures_paris} hours for Paris, if you want to work outside the département where you passed the exam.` },
      { q: 'I already passed the VTC written exam. Do I start taxi training from scratch?', a: `No, provided your VTC written pass is less than ${E.mobilite_validite_ans} years old. You then sit only the two taxi papers, F(T) on local knowledge and G(T) on national taxi rules, plus the taxi driving test, for €${A.examen_mobilite} in 2026 instead of €${A.examen_complet}. Focus your preparation on the area, taxi law and handling the meter.` },
    ],
    body: (h) => `
<h2>The legal position on initial training</h2>
<p>Step four of ${h.src('spTaxi', 'service-public’s taxi page (F21907)')} deals with training before the exam, and it is short: a course is strongly recommended if you want a real chance of passing, and it is not compulsory. The ${h.src('cmaReglement', 'CMA exam rules')} confirm it by accepting independent candidates. The ${h.src('cmaFaq', 'CMA’s FAQ')} adds that the medical certificate and first-aid course only matter when you apply for the card: to register you need ID (or a residence permit allowing work, if you are from outside the EU), your car licence, a photo and proof of address.</p>
<p>So there is no official taxi syllabus for schools, no minimum number of hours and no approval that gates the exam. What the State does set is the exam content, by ministerial order, last updated by the ${h.src('arreteProgramme2024', 'order of 20 March 2024')}. Judge a school on how closely it follows that content, and on the time it gives to the local paper.</p>

<h2>What good preparation covers</h2>
<p>Six of the seven written papers are identical across France. The seventh, F(T), tests knowledge of the area and its local rules, and the regional chamber of trades writes it. That paper is what sets taxi preparation apart from VTC (private-hire) preparation, and it is where newcomers to a département lose the most marks. If French is not your first language, note that French is examined on its own, with the same elimination threshold as most papers.</p>
${h.table(['Paper', 'Set at', 'Weight', 'Where to focus'], [
  ...E.tronc_commun.map((e) => [`${e.code} ${e.en}`, 'national level', e.coef, e.code === 'A' ? 'Transport Code, discrimination, sexist violence' : e.code === 'B' ? 'basic accounts, business forms, cost price' : e.code === 'C' ? 'Highway Code, fatigue, alcohol' : e.code === 'D' ? 'reading comprehension, short written answers' : 'helping foreign passengers, route vocabulary']),
  [`${FT.code} ${FT.en}`, 'regional CMA', FT.coef, 'stations, hospitals, landmarks, prefecture orders'],
  [`${GT.code} ${GT.en}`, 'national level', GT.coef, 'taxi licence (ADS), fares, working outside your zone'],
], 'Source: CMA rules for the taxi, VTC and VMDTR exam, December 2024; right-hand column: our reading of the syllabus')}
<p>You need a weighted average of ${E.admissibilite_moyenne}/20 across ${coefTotal} weighting points, with no eliminating mark. The driving test then counts on its own: at least ${E.pratique_conduite_min} minutes at the wheel, looking after the passenger and billing on the meter, with ${E.pratique_admis}/20 to pass. Marking scales and instant-fail cases are on the ${h.a('examen-taxi', 'taxi exam')} page.</p>

<h2>Hours, price and format: reading a quote</h2>
<p>Service-public puts courses at ${A.formation_heures_min} to ${A.formation_heures_max} hours and roughly ${h.eur(A.formation_cout_min)} to ${h.eur(A.formation_cout_max)}. Many schools teach part of it online, and you pay online or on site. Three questions tell offers apart far better than the headline price:</p>
<ul>
<li>how many hours go on the local F(T) paper, with maps and cases from the département where you will take the driving test;</li>
<li>how many hours of driving in a car fitted out as a taxi, with meter, printer and card terminal;</li>
<li>whether the car on test day and the exam fee are included.</li>
</ul>
<p>The calculator above adds your quote, your first-aid and doctor costs, the CMA fee and the card, then shows what failing either stage would add. Regulated fees come from our parameters; private prices are yours, and we publish none.</p>
${h.table(['Item', '2026 amount', 'Set by'], [
  ['Training course (optional)', `about ${h.eur(A.formation_cout_min)} to ${h.eur(A.formation_cout_max)}`, 'the school'],
  ['Full exam', h.eur(A.examen_complet), 'the CMA'],
  ['Exam after a VTC written pass (mobility)', h.eur(A.examen_mobilite), 'the CMA'],
  ['Driving test only, after failing it', h.eur(A.examen_admission_seule), 'the CMA'],
  ['Professional card', `about ${h.eur(A.carte_pro_environ)}`, 'service-public'],
  ['First aid (PSC1), approved doctor', 'on quote', 'the provider, the doctor'],
], 'Sources: service-public F21907; CMA exam guide, 2026 fees')}
<p>The full exam cost ${h.eur(A.examen_complet_2025)} in 2025. Always check the current fee in the ${h.src('cmaT3p', 'CMA exam guide')} when you register rather than in a school brochure.</p>

<h2>Funding: CPF and France Travail</h2>
<p>Service-public names the CPF for taxi training and sends job seekers to France Travail, which can contribute and runs a course search tool. CPF money pays for one specific listed session, so a school cannot promise funding that someone else decides. If you are changing careers while employed, plan the time off with your employer: a course of several weeks rarely fits around a full-time job.</p>

<h2>The three courses nobody can skip</h2>
<h3>First aid, before the card</h3>
<p>Among the conditions for becoming a taxi driver, service-public lists the PSC1 (prévention et secours civiques de niveau 1, the basic first-aid certificate) taken within the last ${A.psc1_validite_ans} years. The prefecture checks it with your card application, along with the approved doctor’s opinion and a car licence held for ${A.permis_anciennete_ans} years, or ${A.permis_conduite_accompagnee_ans} after supervised driving. An older certificate must be redone, so book it shortly before you apply.</p>
<h3>Refresher training every five years</h3>
<p>The ${h.src('arreteFormationContinue', 'order of 11 August 2017')} requires a ${A.formation_continue_heures}-hour classroom course in a taxi-only session before each renewal of the card, which lasts ${A.carte_validite_ans} years. It has three set modules, including taxi regulations, plus one of your choice. Service-public advises taking it ${A.formation_continue_avant_mois} months before expiry. Dates and steps are on the ${h.a('formation-continue-vtc-taxi', 'continuing training and renewal')} page.</p>
<h3>Mobility, to change département</h3>
<p>A French taxi card only covers the département where you passed the exam. Adding another takes a ${X.mobilite_heures}-hour course, ${X.mobilite_heures_paris} hours for Paris, on the new area and its rules, then a new card. Service-public caps you at ${X.mobilite_max_departements} départements. If you already know where you will work, sit the exam there: the driving test takes place where you ask to work.</p>

<h2>Preparing on your own</h2>
<p>Going solo saves the school fee, not the rest. For the driving test you need a car that meets the rules: four doors, dual controls and mirrors, a taxi meter, a roof light, a printer linked to the meter and a card terminal. Hiring it is not covered by the exam fee. For the written stage, the official syllabus and past papers are enough for a disciplined candidate.</p>
<p>The best way to prepare F(T) is on the ground: drive the main routes, locate stations and hospitals, read the prefecture’s orders. No national textbook covers it fully.</p>

<h2>After the course</h2>
<p>Once you pass, apply for the card at the prefecture with the CMA certificate, the medical opinion and your first-aid certificate. Then come your business status and the licence, free on a waiting list, bought or rented, explained in the guides to ${h.a('devenir-taxi', 'becoming a taxi driver')} and the ${h.a('licence-taxi', 'taxi licence')}. For the full start-up budget, car included, use the ${h.a('cout-acces-metier', 'start-up cost calculator')}. Still torn between the two trades? ${h.a('formation-vtc', 'VTC training')} shares the same core papers.</p>
`,
  },
});
