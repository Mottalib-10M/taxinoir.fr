import { defineGuide } from '../../lib/guide-types';
import { P } from '../../lib/engine/params';

const A = P.acces;
const E = P.examen;
const B = E.pratique_bareme_taxi;

// Valeurs lues dans params-2026.json ; source : (bloc examen), source cmaReglement (version de décembre 2024)
// https://www.exament3p.fr/media/pdf/cma_reglement_examen_taxi.pdf
const CMA_INSTRUCTION_JOURS_OUVRES = P.examen.reglement.instruction_jours_ouvres;
const CMA_GARANTIE_MOIS = P.examen.reglement.garantie_mois;
const SESSIONS_PAR_AN = P.examen.reglement.sessions_par_an;
const CONVOCATION_PRATIQUE_MOIS = P.examen.reglement.convocation_pratique_mois;
const RESULTATS_PUBLIES_MOIS = P.examen.reglement.resultats_mois;
const JURY_EXPERIENCE_ANS = P.examen.reglement.jury_experience_ans;
const CONTESTATION_MOIS = P.examen.reglement.contestation_mois;
const FORCE_MAJEURE_JOURS = P.examen.reglement.force_majeure_jours;
// Valeurs lues dans params-2026.json ; source : (bloc acces), source cmaT3p : tarifs 2025
// https://www.exament3p.fr/id/5
const EXAMEN_MOBILITE_2025 = P.acces.examen_mobilite_2025;
const EXAMEN_ADMISSION_SEULE_2025 = P.acces.examen_admission_seule_2025;
// Valeurs lues dans params-2026.json ; source : (bloc taxi), source spTarifsTaxi
// https://entreprendre.service-public.gouv.fr/vosdroits/F22127 (vérifié le 13 août 2026)
const NOTE_OBLIGATOIRE_DES = P.taxi.note_obligatoire_des;
const NOTE_CONSERVATION_ANS = P.taxi.note_conservation_ans;

const ecrits = [...E.tronc_commun, ...E.taxi];
const coefTotal = ecrits.reduce((s, e) => s + e.coef, 0);
const coefTaxi = E.taxi.reduce((s, e) => s + e.coef, 0);
const minutesTotal = ecrits.reduce((s, e) => s + e.minutes, 0);
const [FT, GT] = E.taxi;

export default defineGuide({
  id: 'examen-taxi',
  group: 'taxi',
  order: 20,
  mini: 'notePratiqueTaxi',
  miniHref: 'cout-acces-metier',
  related: ['devenir-taxi', 'licence-taxi', 'examen-vtc', 'cout-acces-metier', 'formation-continue-vtc-taxi'],
  sources: ['cmaReglement', 'cmaT3p', 'cmaFaq', 'arreteProgramme2024', 'spTaxi', 'spTarifsTaxi'],
  fr: {
    slug: 'examen-taxi',
    nav: 'Examen taxi',
    card: 'Épreuve locale, réglementation taxi, pratique avec taximètre : tout l’examen CMA.',
    title: 'Examen taxi 2026 : épreuves, coefficients, pratique et prix',
    description: `Examen taxi 2026 : 7 écrits dont l’épreuve locale F(T), moyenne de ${E.admissibilite_moyenne}/20, pratique avec taximètre réussie à ${E.pratique_admis}/20, ${A.examen_complet} € à la CMA, carte limitée au département.`,
    h1: 'L’examen de taxi : ce que la CMA vérifie, épreuve par épreuve',
    intro: 'Sur sept écrits, deux n’appartiennent qu’au taxi, et l’un d’eux change d’un département à l’autre.',
    resume: `L’examen de taxi est organisé par les chambres de métiers et de l’artisanat (CMA) et se passe en deux temps. Les écrits d’admissibilité comptent sept épreuves : cinq communes aux chauffeurs de taxi, de VTC et de moto-taxi (réglementation du transport de personnes, gestion, sécurité routière, français, anglais), puis deux épreuves propres au taxi, F(T) sur la connaissance du territoire et la réglementation locale, et G(T) sur la réglementation nationale des taxis. Elles pèsent ${coefTaxi} des ${coefTotal} coefficients. On est admissible avec une moyenne pondérée d’au moins ${E.admissibilite_moyenne}/20, sans note sous ${E.tronc_commun[0].eliminatoire}/20 (sous ${E.tronc_commun[4].eliminatoire}/20 en anglais). L’épreuve pratique, ${E.pratique_duree_max_min} minutes au plus dont ${E.pratique_conduite_min} de conduite, se passe dans un véhicule équipé d’un taximètre, d’une imprimante et d’un terminal de paiement ; elle est réussie à ${E.pratique_admis}/20. L’examen complet coûte ${A.examen_complet} € en 2026, et la carte obtenue ne vaut que dans le département de l’examen.`,
    faqs: [
      { q: 'Qui rédige les sujets de l’épreuve locale F(T) ?', a: `La CMA de votre région, et non CMA France. Le règlement de l’examen prévoit que les sujets des épreuves nationales sont arrêtés par CMA France, mais que ceux de l’épreuve F(T), de portée locale, sont arrêtés par la CMA selon les règles de l’arrêté du 21 juin 2024. L’épreuve compte ${FT.qcm} QCM et ${FT.qrc} questions à réponse courte en ${FT.minutes} minutes, coefficient ${FT.coef}.` },
      { q: 'Combien coûte l’examen de taxi en 2026 ?', a: `${A.examen_complet} € pour l’examen complet, écrits et pratique, selon le guide des examens des CMA, contre ${A.examen_complet_2025} € en 2025. Un candidat qui vient du VTC par la mobilité professionnelle paie ${A.examen_mobilite} €, et un nouveau passage de la seule épreuve pratique coûte ${A.examen_admission_seule} €. Ces droits ne comprennent pas la location du véhicule équipé pour l’épreuve de conduite.` },
      { q: 'Combien de fois peut-on repasser la pratique du taxi après un échec ?', a: `Deux fois encore, dans l’année qui suit la publication des notes d’écrit, d’après le règlement de la CMA : ${1 + E.pratique_tentatives_supplementaires} passages au total. Chaque nouveau passage se paie (${A.examen_admission_seule} € en 2026). Au-delà de ce délai, ou après le troisième échec, il faut se réinscrire à l’examen complet. Un échec aux écrits impose de tout repasser.` },
      { q: 'Doit-on passer l’examen dans le département où l’on veut travailler ?', a: 'Pour la pratique, oui : le règlement précise que le candidat taxi est convoqué uniquement dans le département objet de sa demande d’exercice, au premier passage comme aux suivants. La carte délivrée ensuite ne vaut que dans ce département, ce que confirme la foire aux questions de la CMA. Pour élargir sa zone, il faut un stage de mobilité, pas un nouvel examen.' },
      { q: 'Les taux de réussite à l’examen taxi sont-ils publiés ?', a: `Oui. Chaque CMA doit publier, au plus tard ${RESULTATS_PUBLIES_MOIS} mois après chaque session, le nombre d’inscrits et de présents, les moyennes par épreuve et le taux de réussite, détaillés par département ; CMA France publie une synthèse nationale par trimestre. Nous ne les avons pas relevés et n’en citons donc aucun : consultez la page de votre CMA.` },
      { q: 'Quel véhicule faut-il pour l’épreuve pratique taxi ?', a: 'Un véhicule assuré, à jour de son contrôle technique, à quatre portes, avec double commande et doubles rétroviseurs, un taximètre homologué, un dispositif lumineux, une imprimante connectée au taximètre et un terminal de paiement non connecté. Le taximètre peut ne pas être réglé sur le tarif du département. En location, il faut l’attestation d’assurance et le contrat ou la facture.' },
    ],
    body: (h) => `
<h2>Les sept écrits et leur poids</h2>
<p>Les écrits durent ${minutesTotal} minutes au total, en questions à choix multiples (QCM) corrigées par la plateforme et en questions à réponse courte (QRC) corrigées par des correcteurs désignés par la CMA. Le tableau suit le ${h.src('cmaReglement', 'règlement de l’examen')}, dans sa version de décembre 2024 qui intègre l’${h.src('arreteProgramme2024', 'arrêté du 20 mars 2024')} : la prévention des discriminations et des violences sexistes et sexuelles est entrée dans l’épreuve A.</p>
${h.table(['Épreuve', 'Questions', 'Durée', 'Éliminatoire sous', 'Coef.'], ecrits.map((e) => [`${e.code} ${e.fr}`, `${e.qcm} QCM${e.qrc ? `, ${e.qrc} QRC` : ''}`, `${e.minutes} min`, `${e.eliminatoire}/20`, e.coef]), 'Source : règlement CMA de l’examen taxi, VTC et VMDTR, décembre 2024')}
<p>Le calcul est simple : chaque note est multipliée par son coefficient, la somme est divisée par ${coefTotal}, et la moyenne, arrondie au centième, doit atteindre ${E.admissibilite_moyenne}/20. Une seule note éliminatoire suffit à échouer, même avec une bonne moyenne. Les deux épreuves taxi représentent ${h.pct(coefTaxi / coefTotal, 0)} du total : un candidat faible sur le territoire ne peut pas compter sur l’anglais, coefficient ${E.tronc_commun[4].coef}, pour se rattraper.</p>

<h2>F(T) : l’épreuve qui change selon le département</h2>
<p>C’est la seule épreuve écrite dont le contenu n’est pas national. L’arrêté du 6 avril 2017 la consacre à la connaissance du territoire et à la réglementation locale, et ses sujets sont arrêtés par la CMA de région, pas par CMA France. Le programme détaillé figure en annexe de cet arrêté, au Journal officiel ; nous ne le paraphrasons pas. Ce que l’on sait de l’examen dans son ensemble donne pourtant la direction : à l’épreuve pratique, le jury pose des questions sur les sites, les monuments, les gares et les hôpitaux du parcours, et service-public rappelle que l’examinateur vérifie vos connaissances géographiques, culturelles et touristiques du territoire. Les règles locales, elles, sont fixées par arrêté préfectoral dans chaque département.</p>
<p>Format : ${FT.qcm} QCM et ${FT.qrc} QRC en ${FT.minutes} minutes, coefficient ${FT.coef}, éliminatoire sous ${FT.eliminatoire}/20. C’est court, et c’est là que les candidats venus d’ailleurs perdent des points. Une carte routière du département et la lecture des arrêtés de votre préfecture valent mieux que n’importe quel manuel national.</p>

<h2>G(T) : la réglementation nationale des taxis</h2>
<p>La seconde épreuve propre au taxi est plus longue : ${GT.qcm} QCM et ${GT.qrc} QRC en ${GT.minutes} minutes, coefficient ${GT.coef}. L’arrêté du 6 avril 2017 la fait porter sur la réglementation nationale de l’activité de taxi et sur la gestion propre à cette activité. Autrement dit, ce que le code des transports et ses textes d’application imposent à tous les taxis de France, de l’autorisation de stationnement à l’exercice hors de sa zone, avec un sujet identique dans tout le pays. Les pages ${h.a('devenir-taxi', 'devenir taxi')} et ${h.a('licence-taxi', 'licence de taxi')} en donnent les règles principales, texte par texte.</p>
<p>Le pendant VTC de ces deux épreuves est différent : développement commercial et réglementation VTC, détaillés sur la page ${h.a('examen-vtc', 'examen VTC')}. C’est ce qui permet de passer d’un métier à l’autre sans refaire le tronc commun.</p>

<h2>L’épreuve pratique : conduire, renseigner, encaisser</h2>
<p>Admissible, vous êtes convoqué dans les ${CONVOCATION_PRATIQUE_MOIS} mois à l’épreuve d’admission, dans le département où vous voulez exercer. Elle dure ${E.pratique_duree_max_min} minutes au plus, dont au moins ${E.pratique_conduite_min} minutes de conduite. Les deux membres du jury jouent les clients ; l’un est un agent de la CMA, l’autre un chauffeur de taxi d’au moins ${JURY_EXPERIENCE_ANS} ans d’expérience dont la carte est valable dans le département. Un chauffeur VTC ne peut pas évaluer un candidat taxi.</p>
<p>Vous tirez au sort une mise en situation, qui peut ajouter une contrainte (météo, horaire, bagages, étape intermédiaire). Le jury lit l’adresse deux fois au plus, sans l’épeler. Vous avez alors ${E.pratique_preparation_min} minutes pour programmer le GPS sur tout le trajet, montrer départ et arrivée sur un plan, et mettre en route les équipements spéciaux du taxi. Ne pas avoir démarré au bout de ce délai vaut ajournement.</p>
<h3>Le barème taxi</h3>
${h.table(['Critère', 'Points'], [
  ['Préparation et réalisation du parcours', B.parcours],
  ['Sécurité et souplesse de la conduite, respect du code de la route', B.conduite],
  ['Prise en charge, relation client, informations touristiques', B.client],
  ['Facturation et utilisation des équipements spéciaux', B.facturation],
], 'Source : règlement CMA, article II')}
<p>Comparé au VTC, le barème taxi retire un point à la préparation du parcours et l’ajoute à la facturation, qui vaut ${B.facturation} points. La raison tient en une séquence : à la dépose, le candidat taxi arrête le taximètre, imprime le ticket, le remet au jury et encaisse le montant au terminal. Un taximètre oublié en position libre, une imprimante mal reliée, un terminal qu’on ne sait pas manipuler, et ce sont des points perdus sur une épreuve où il faut ${E.pratique_admis}/20. Le mini-simulateur en haut de page vous montre l’effet de chaque critère sur la note.</p>
<p>La facturation de l’examen reflète le métier. Dans la vie réelle, service-public impose de remettre une note dès que la course atteint ${h.eur(NOTE_OBLIGATOIRE_DES)} TTC, quel que soit le montant pour un transport médicalisé, et d’en garder le double ${NOTE_CONSERVATION_ANS} ans ; le détail est dans la ${h.src('spTarifsTaxi', 'fiche tarifs et équipements des taxis')}.</p>
<h3>Ce qui fait échouer d’office</h3>
<ul>
<li>dépasser les ${E.pratique_preparation_min} minutes de préparation ;</li>
<li>ne pas réussir à atteindre la destination ;</li>
<li>une intervention du jury sur la double commande ou le volant, par exemple pour un couloir de bus emprunté sans autorisation locale ;</li>
<li>un véhicule non conforme, des papiers manquants, des chaussures ouvertes ou des signes d’alcool ou de stupéfiants : dans ce dernier cas, aucun passage n’est décompté, mais les frais sont à repayer.</li>
</ul>

<h2>S’inscrire et payer</h2>
<p>L’inscription se fait sur la plateforme nationale des CMA. Le dossier réunit une pièce d’identité, ou un titre de séjour autorisant à travailler pour un candidat hors Union européenne, un permis B hors période probatoire, une photo, une signature et un justificatif de domicile de moins de trois mois. Ni certificat médical ni PSC1 à ce stade, rappelle la ${h.src('cmaFaq', 'foire aux questions de la CMA')} : ils servent à la carte.</p>
<p>La CMA a ${CMA_INSTRUCTION_JOURS_OUVRES} jours ouvrés pour examiner les pièces. Une fois le dossier validé, elle garantit de vous faire passer les épreuves et de donner le résultat pratique dans les ${CMA_GARANTIE_MOIS} mois suivant le dépôt. Le calendrier national prévoit ${SESSIONS_PAR_AN} sessions d’écrits par an, avec au moins une par trimestre dans chaque région.</p>
${h.table(['Formule', '2025', '2026'], [
  ['Examen complet', h.eur(A.examen_complet_2025), h.eur(A.examen_complet)],
  ['Mobilité professionnelle (épreuves taxi et pratique)', h.eur(EXAMEN_MOBILITE_2025), h.eur(A.examen_mobilite)],
  ['Épreuve pratique seule', h.eur(EXAMEN_ADMISSION_SEULE_2025), h.eur(A.examen_admission_seule)],
], 'Source : CMA, guide des examens, tarifs 2025 et 2026')}
<p>Les droits sont définitifs une fois le dossier validé, sauf force majeure justifiée par écrit dans les ${FORCE_MAJEURE_JOURS} jours qui suivent l’examen. Le ${h.a('cout-acces-metier', 'simulateur de coût d’accès')} ajoute la carte, le médecin, le PSC1 et la formation pour le budget complet.</p>

<h2>Venir du VTC : la mobilité professionnelle</h2>
<p>Un candidat déclaré admissible aux écrits complets de l’examen VTC (ou moto-taxi) peut, dans les ${E.mobilite_validite_ans} ans qui suivent la notification de ses résultats, ne passer que F(T) et G(T). Il doit y obtenir une moyenne d’au moins ${E.admissibilite_moyenne}/20 sur ces deux épreuves, sans note éliminatoire, puis réussir la pratique taxi. Il joint à son inscription le relevé de notes d’admissibilité. Le tarif est de ${h.eur(A.examen_mobilite)} en 2026.</p>
<p>Exception notable : une carte VTC obtenue par équivalence d’expérience n’ouvre pas cette voie, puisque son titulaire n’a jamais passé le tronc commun. Depuis la fermeture de l’équivalence le ${h.date(A.equivalence_fin)}, ce cas ne concerne plus que les cartes anciennes.</p>

<h2>Après la réussite</h2>
<p>La CMA délivre une attestation d’aptitude professionnelle. Avec elle, l’avis du médecin agréé et le PSC1, vous demandez la carte en préfecture ; elle sera limitée au département de l’examen, extensible par un stage de mobilité. La suite du parcours, statut et licence compris, est décrite sur la page ${h.a('devenir-taxi', 'devenir chauffeur de taxi')}, et l’accès à une autorisation de stationnement sur la page ${h.a('licence-taxi', 'licence de taxi')}.</p>
<p>Une contestation se fait par écrit au président de la CMA, dans les ${CONTESTATION_MOIS} mois suivant la décision. La copie d’écrit peut être consultée sur place pendant un an, sans photo ni photocopie.</p>
`,
  },
  en: {
    slug: 'taxi-driver-exam',
    nav: 'Taxi exam',
    card: 'The local paper, national taxi rules and the meter-based driving test.',
    title: 'Taxi Driver Exam France 2026: Papers, Marks, Driving Test',
    description: `French taxi exam, 2026: 7 written papers including the local F(T) paper, ${E.admissibilite_moyenne}/20 average, a meter-based driving test passed at ${E.pratique_admis}/20, €${A.examen_complet} paid to the CMA.`,
    h1: 'The French taxi exam, paper by paper',
    intro: 'Of the seven written papers, two belong to taxis alone, and one of those is set locally.',
    resume: `The taxi exam in France is run by the regional chambers of trades (CMA, chambres de métiers et de l’artisanat) in two stages. The written stage has seven papers. Five are shared with VTC and motorbike-taxi candidates: passenger transport rules, business management, road safety, French and English. Two are taxi-only: F(T), on knowledge of the local area and local rules, and G(T), on the national taxi regulations. Together they carry ${coefTaxi} of the ${coefTotal} weighting points. You pass the written stage with a weighted average of ${E.admissibilite_moyenne}/20 or more and no paper below ${E.tronc_commun[0].eliminatoire}/20 (${E.tronc_commun[4].eliminatoire}/20 for English). The practical test lasts up to ${E.pratique_duree_max_min} minutes, at least ${E.pratique_conduite_min} of them driving, in a car fitted with a meter, a receipt printer and a card terminal, and you need ${E.pratique_admis}/20. The full exam costs €${A.examen_complet} in 2026, and the resulting card is valid only in the département where you sat it.`,
    faqs: [
      { q: 'Who writes the questions for the local F(T) paper?', a: `Your regional CMA, not the national body. The exam rules say national papers are set by CMA France, while the local F(T) paper is set by the regional chamber under an order of 21 June 2024. It has ${FT.qcm} multiple-choice and ${FT.qrc} short-answer questions in ${FT.minutes} minutes, with a weighting of ${FT.coef}, so the questions really are about the area where you will work.` },
      { q: 'What are the taxi exam fees for 2026?', a: `€${A.examen_complet} for the full exam, written and practical, according to the CMA exam guide, up from €${A.examen_complet_2025} in 2025. A VTC driver switching through professional mobility pays €${A.examen_mobilite}, and retaking only the driving test costs €${A.examen_admission_seule}. None of these fees covers hiring the equipped car you need for the practical test.` },
      { q: 'I failed the taxi driving test. How many more tries do I get?', a: `Two more, within a year of your written results being published, under the CMA rules: ${1 + E.pratique_tentatives_supplementaires} attempts in all. Each retake is paid for (€${A.examen_admission_seule} in 2026). After that year, or after a third failure, you must register for the full exam again. Failing the written stage always means starting from scratch.` },
      { q: 'Must I sit the exam in the département where I want to drive?', a: 'For the driving test, yes. The rules say a taxi candidate is only ever called to the practical test in the département named in their application, for the first attempt and any retakes. The card issued afterwards is valid only there, as the CMA’s FAQ confirms. To widen your area later, you take a mobility course rather than a new exam.' },
      { q: 'Where can I find pass rates for the taxi exam?', a: `Each CMA must publish, within ${RESULTATS_PUBLIES_MOIS} month of every session, the number of candidates registered and present, the average mark per paper and the pass rate, broken down by département, and CMA France publishes a national summary each quarter. We have not collected these figures, so we quote none here: check your regional CMA’s page.` },
      { q: 'What kind of car do I need for the taxi driving test?', a: 'An insured car with an up-to-date roadworthiness test, four doors, dual controls and dual mirrors, an approved taxi meter, a roof sign, a printer linked to the meter and a card terminal that is not connected. The meter need not be set to the local fare. If you hire the car, bring the insurance certificate and the rental contract or receipt.' },
    ],
    body: (h) => `
<h2>Seven written papers and how they are weighted</h2>
<p>The written stage takes ${minutesTotal} minutes in all. Multiple-choice questions (QCM) are marked automatically; short-answer questions (QRC) are marked by examiners appointed by the CMA. The table follows the ${h.src('cmaReglement', 'exam rules')} in their December 2024 version, which reflects the ${h.src('arreteProgramme2024', 'order of 20 March 2024')}: paper A now includes preventing discrimination and sexual and sexist violence.</p>
${h.table(['Paper', 'Questions', 'Time', 'Fail below', 'Weight'], ecrits.map((e) => [`${e.code} ${e.en}`, `${e.qcm} multiple choice${e.qrc ? `, ${e.qrc} short answer` : ''}`, `${e.minutes} min`, `${e.eliminatoire}/20`, e.coef]), 'Source: CMA rules for the taxi, VTC and VMDTR exam, December 2024')}
<p>Each mark is multiplied by its weight, the total is divided by ${coefTotal}, and the result, rounded to two decimals, must reach ${E.admissibilite_moyenne}/20. A single mark below the elimination threshold sinks you whatever your average. The two taxi papers account for ${h.pct(coefTaxi / coefTotal, 0)} of the total, so a weak showing on local knowledge cannot be rescued by English, which carries a weight of only ${E.tronc_commun[4].coef}. For candidates whose first language is not French, the French paper and the short written answers are where preparation pays off most.</p>

<h2>F(T): the paper that varies by area</h2>
<p>This is the only written paper whose content is not national. The order of 6 April 2017 devotes it to knowledge of the area and local rules, and the questions are set by the regional CMA rather than CMA France. The detailed syllabus is annexed to that order in the Journal officiel, and we do not paraphrase it here. The rest of the exam points the way, though: during the driving test the examiners ask about landmarks, monuments, stations and hospitals along the route, and service-public says the examiner checks your geographical, cultural and tourist knowledge of the area. Local rules are set by each département’s prefect, by order.</p>
<p>Format: ${FT.qcm} multiple-choice and ${FT.qrc} short-answer questions in ${FT.minutes} minutes, weight ${FT.coef}, fail below ${FT.eliminatoire}/20. It is short, and it is where people who recently moved to the area drop marks. A road map of the département and the prefecture’s local orders are better revision than any national textbook.</p>

<h2>G(T): national taxi rules</h2>
<p>The second taxi paper is longer: ${GT.qcm} multiple-choice and ${GT.qrc} short-answer questions in ${GT.minutes} minutes, weight ${GT.coef}. The order of 6 April 2017 says it covers the national regulation of taxi work and the business management specific to it: in other words, what the Transport Code and its implementing texts require of every taxi in France, from the ADS licence to working outside your area. Everyone in the country sits the same paper. Our pages on ${h.a('devenir-taxi', 'becoming a taxi driver')} and the ${h.a('licence-taxi', 'taxi licence')} set out the main rules with their sources.</p>
<p>The VTC equivalents are different papers, on business development and VTC rules, described on the ${h.a('examen-vtc', 'VTC exam')} page. Because the common core is shared, moving from one trade to the other does not mean sitting it twice.</p>

<h2>The practical test: drive, inform, take payment</h2>
<p>Once you pass the written stage, the CMA calls you to the practical test within ${CONVOCATION_PRATIQUE_MOIS} months, in the département where you want to work. It lasts no more than ${E.pratique_duree_max_min} minutes, with at least ${E.pratique_conduite_min} minutes of driving. Two examiners act as passengers: a CMA officer, and a taxi driver with at least ${JURY_EXPERIENCE_ANS} years’ experience and a card valid in that département. VTC drivers never examine taxi candidates.</p>
<p>You draw a scenario at random, which may add a twist such as weather, time of day, luggage or an intermediate stop. The examiner reads out the address no more than twice and will not spell it. You then have ${E.pratique_preparation_min} minutes to program the full route into a GPS or phone, point to the start and finish on a map, and switch on the taxi’s special equipment. If you have not set off when the time is up, you fail.</p>
<h3>The taxi marking scale</h3>
${h.table(['Criterion', 'Points'], [
  ['Route preparation and execution', B.parcours],
  ['Safe, smooth driving within the Highway Code', B.conduite],
  ['Passenger care, customer relations, tourist information', B.client],
  ['Billing and use of special equipment', B.facturation],
], 'Source: CMA rules, article II')}
<p>Compared with the VTC scale, the taxi scale moves one point from route preparation to billing, which is worth ${B.facturation} points. At drop-off, the taxi candidate stops the meter, prints the receipt, hands it over and takes payment on the card terminal. Forget to stop the meter, fumble the printer or the terminal, and those points go on a test where ${E.pratique_admis}/20 is the pass mark. The calculator at the top of the page shows how each criterion moves your score.</p>
<p>That billing step mirrors working life. Service-public requires a receipt for any fare of ${h.eur(NOTE_OBLIGATOIRE_DES)} or more including VAT, and for every medical transport whatever the amount, with a copy kept for ${NOTE_CONSERVATION_ANS} years; see the ${h.src('spTarifsTaxi', 'taxi fares and equipment page')}.</p>
<h3>Automatic fails</h3>
<ul>
<li>going over the ${E.pratique_preparation_min}-minute preparation time;</li>
<li>being unable to reach the destination;</li>
<li>any examiner intervention on the dual controls or steering wheel, for instance after entering a bus lane that local rules do not open to taxis;</li>
<li>a non-compliant car, missing documents, open-backed shoes, or signs of alcohol or drugs; in these cases the attempt is not counted, but you pay again to resit.</li>
</ul>

<h2>Registering and paying</h2>
<p>You register on the CMAs’ national exam platform. The file contains an ID document (non-EU nationals need a French residence permit that allows work), a category B licence past its probationary period, a photo, a signature and proof of address under three months old. As the ${h.src('cmaFaq', 'CMA FAQ')} notes, no medical certificate or first-aid certificate is needed at this point; those are for the card.</p>
<p>The CMA has ${CMA_INSTRUCTION_JOURS_OUVRES} working days to check your documents. Once the file is accepted, it guarantees you can sit the exam and get your driving-test result within ${CMA_GARANTIE_MOIS} months of filing. The national calendar sets ${SESSIONS_PAR_AN} written sessions a year, and every region holds at least one each quarter.</p>
${h.table(['Option', '2025', '2026'], [
  ['Full exam', h.eur(A.examen_complet_2025), h.eur(A.examen_complet)],
  ['Professional mobility (taxi papers and driving test)', h.eur(EXAMEN_MOBILITE_2025), h.eur(A.examen_mobilite)],
  ['Driving test only', h.eur(EXAMEN_ADMISSION_SEULE_2025), h.eur(A.examen_admission_seule)],
], 'Source: CMA exam guide, 2025 and 2026 fees')}
<p>Fees are non-refundable once the file is accepted, except for force majeure documented in writing within ${FORCE_MAJEURE_JOURS} days after the exam. The ${h.a('cout-acces-metier', 'start-up cost calculator')} adds the card, the doctor, first aid and training for a full budget.</p>

<h2>Switching from VTC: professional mobility</h2>
<p>If you passed the full VTC (or motorbike-taxi) written stage, you have ${E.mobilite_validite_ans} years from the notification of your results to sit only F(T) and G(T). You need an average of ${E.admissibilite_moyenne}/20 or more over those two papers with no mark below the threshold, then the taxi driving test. Attach your written-stage transcript when you register. The fee is ${h.eur(A.examen_mobilite)} in 2026.</p>
<p>One catch: a VTC card obtained through recognised work experience does not qualify, because its holder never sat the common core. Since that route closed on ${h.date(A.equivalence_fin)}, this only affects older cards.</p>

<h2>After you pass</h2>
<p>The CMA issues a certificate of professional aptitude. With it, the approved doctor’s opinion and your first-aid certificate, you apply to the prefecture for the card, which will cover the exam département only unless you later take a mobility course. Status, licence and the remaining steps are set out in ${h.a('devenir-taxi', 'how to become a taxi driver')}, and getting an ADS is covered on the ${h.a('licence-taxi', 'taxi licence')} page.</p>
<p>To challenge a result, write to the CMA president within ${CONTESTATION_MOIS} months of the decision. You may view your written script on site for a year, but photos and copies are not allowed.</p>
`,
  },
});
