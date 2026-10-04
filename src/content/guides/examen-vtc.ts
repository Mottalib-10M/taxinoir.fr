import { defineGuide } from '../../lib/guide-types';
import { P } from '../../lib/engine/params';

const A = P.acces;
const E = P.examen;
const EPREUVES = [...E.tronc_commun, ...E.vtc];
const MINUTES_ECRIT = EPREUVES.reduce((s, e) => s + e.minutes, 0);
const COEF_TOTAL = EPREUVES.reduce((s, e) => s + e.coef, 0);
const B = E.pratique_bareme_vtc;
const ANGLAIS = E.tronc_commun.find((e) => e.code === 'E')!;
const FRANCAIS = E.tronc_commun.find((e) => e.code === 'D')!;
const ELIM_GENERAL = E.tronc_commun[0].eliminatoire;
/** Exemple du règlement appliqué : 10/20 partout sauf l’anglais à sa note plancher. */
const EXEMPLE_MOYENNE = Math.round(((COEF_TOTAL - ANGLAIS.coef) * 10 + ANGLAIS.coef * ANGLAIS.eliminatoire) / COEF_TOTAL * 100) / 100;

// Valeurs lues dans params-2026.json ; source : : règlement CMA de l’examen T3P (version de décembre 2024),
// https://www.exament3p.fr/media/pdf/cma_reglement_examen_taxi.pdf
const SESSIONS_PAR_AN = P.examen.reglement.sessions_par_an; // art. IV.1
const INSTRUCTION_JOURS_OUVRES = P.examen.reglement.instruction_jours_ouvres; // art. III.3
const GARANTIE_MOIS = P.examen.reglement.garantie_mois; // art. III.3
const CONVOCATION_ECRIT_JOURS = P.examen.reglement.convocation_ecrit_jours; // art. IV.2
const CONVOCATION_PRATIQUE_MOIS = P.examen.reglement.convocation_pratique_mois; // art. V.1
const RESULTATS_PUBLIES_MOIS = P.examen.reglement.resultats_mois; // art. IV.3 et X
const CONSULTATION_COPIE_ANS = P.examen.reglement.consultation_copie_ans; // art. VII
const RECLAMATION_MOIS = P.examen.reglement.reclamation_mois; // art. VII
const FRAUDE_EXCLUSION_ANS = P.examen.reglement.fraude_exclusion_ans; // art. III.1 et IX
const RETRAIT_CARTE_ANS = P.examen.reglement.retrait_carte_ans; // art. III.1
const FORCE_MAJEURE_JOURS = P.examen.reglement.force_majeure_jours; // art. III.2
const HANDICAP_DEMANDE_MOIS = P.examen.reglement.handicap_demande_mois; // art. VIII
const JURY_EXPERIENCE_ANS = P.examen.reglement.jury_experience_ans; // art. V.3
const JURY_PERIODE_ANS = P.examen.reglement.jury_periode_ans; // art. V.3
const PERMIS_HORS_UE_ANCIENNETE_ANS = P.examen.reglement.permis_hors_ue_anciennete_ans; // art. III.1
const PERMIS_HORS_UE_RESIDENCE_ANS = P.examen.reglement.permis_hors_ue_residence_ans; // art. III.1
// Valeurs lues dans params-2026.json ; source : : tarifs 2025, https://www.exament3p.fr/id/5
const EXAMEN_MOBILITE_2025 = P.acces.examen_mobilite_2025;
const EXAMEN_ADMISSION_2025 = P.acces.examen_admission_seule_2025;

export default defineGuide({
  id: 'examen-vtc',
  group: 'vtc',
  order: 40,
  mini: 'examenVtc',
  miniHref: 'cout-acces-metier',
  related: ['formation-vtc', 'carte-vtc', 'examen-taxi', 'devenir-chauffeur-vtc', 'cout-acces-metier'],
  sources: ['cmaReglement', 'cmaT3p', 'cmaFaq', 'arreteProgramme2024', 'spVtc'],
  fr: {
    slug: 'examen-vtc-t3p',
    nav: 'Examen VTC (T3P)',
    card: 'Les 7 épreuves écrites, la conduite, les notes, les tarifs et le repassage.',
    title: 'Examen VTC 2026 : épreuves T3P, coefficients, notes, tarifs',
    description: `Examen VTC 2026 (T3P) : 7 épreuves écrites, coefficients, notes éliminatoires, moyenne de ${E.admissibilite_moyenne}/20, conduite notée sur 20, ${A.examen_complet} € à la CMA et règles de repassage.`,
    h1: 'Examen VTC (T3P) : épreuves, barème, inscription et repassage',
    intro: `Sept copies, au moins ${E.pratique_conduite_min} minutes de conduite, et deux seuils à franchir : ${E.admissibilite_moyenne} de moyenne à l’écrit, ${E.pratique_admis} à la pratique.`,
    resume: `L’examen VTC, dit examen T3P (transport public particulier de personnes), est organisé par les chambres de métiers et de l’artisanat. Il coûte ${A.examen_complet} € en 2026, contre ${A.examen_complet_2025} € en 2025, et se passe en deux temps. L’admissibilité réunit sept épreuves écrites en QCM et questions à réponse courte, soit ${MINUTES_ECRIT} minutes au total : réglementation et prévention des discriminations, gestion, sécurité routière, français, anglais, puis développement commercial et réglementation propre au VTC. Il faut une moyenne pondérée d’au moins ${E.admissibilite_moyenne}/20, sans aucune note éliminatoire : moins de ${ELIM_GENERAL}/20 dans une épreuve, ou moins de ${ANGLAIS.eliminatoire}/20 en anglais. L’admission est une mise en situation de ${E.pratique_duree_max_min} minutes au plus, dont ${E.pratique_conduite_min} minutes de conduite au moins, notée sur 20 ; il faut ${E.pratique_admis}. Un écrit raté se repasse en entier ; une conduite ratée se retente deux fois dans l’année qui suit la publication des notes d’écrit. Les taux de réussite sont publiés par chaque CMA après chaque session.`,
    faqs: [
      { q: 'Quel est le prix de l’inscription à l’examen T3P en 2026 ?', a: `Selon le guide des examens des CMA, l’examen complet coûte ${A.examen_complet} € en 2026, la mobilité professionnelle ${A.examen_mobilite} € et une nouvelle session de conduite seule ${A.examen_admission_seule} €. En 2025, ces tarifs étaient de ${A.examen_complet_2025}, ${EXAMEN_MOBILITE_2025} et ${EXAMEN_ADMISSION_2025} €. Le prix couvre l’écrit et la pratique, pas la location de la voiture à double commande. Une fois le dossier validé par la CMA, rien n’est remboursé, sauf force majeure.` },
      { q: 'Quelle moyenne faut-il pour être admissible à l’écrit de l’examen VTC ?', a: `${E.admissibilite_moyenne}/20 de moyenne sur les sept épreuves, pondérées par leurs coefficients (total ${COEF_TOTAL}) et arrondie au centième, sans note éliminatoire. Le plancher est de ${ELIM_GENERAL}/20 dans chaque épreuve, sauf en anglais où il descend à ${ANGLAIS.eliminatoire}/20. Avec ${ANGLAIS.eliminatoire} en anglais et 10 partout ailleurs, la moyenne tombe à ${String(EXEMPLE_MOYENNE).replace('.', ',')} : il faut donc compenser ailleurs. Le mini-simulateur de cette page fait le calcul avec vos notes.` },
      { q: 'J’ai échoué à la conduite de l’examen VTC : combien de chances me reste-t-il ?', a: `Deux nouvelles tentatives, à faire dans le délai d’un an à partir de la publication de vos notes d’écrit sur la plateforme d’inscription, selon le règlement de la CMA. Chaque nouveau passage se réserve comme une session d’admission seule, ${A.examen_admission_seule} € en 2026, et la CMA vous convoque dans les ${CONVOCATION_PRATIQUE_MOIS} mois suivant la réinscription. Après un troisième échec, ou une fois l’année écoulée, tout l’examen est à repasser, écrit compris.` },
      { q: 'Où consulter le taux de réussite de l’examen VTC dans mon département ?', a: `Sur le site de votre chambre de métiers régionale. Le règlement (articles IV.3 et X) l’oblige à publier, au plus tard ${RESULTATS_PUBLIES_MOIS} mois après chaque session, le nombre d’inscrits et de présents, les moyennes par épreuve et le taux de réussite, détaillés par département. CMA France publie chaque trimestre une synthèse nationale sur artisanat.fr. Nous n’avons pas relevé ces chiffres et n’en citons aucun : méfiez-vous d’un taux annoncé sans session ni département.` },
      { q: 'Titulaire de l’examen taxi, que dois-je repasser pour exercer en VTC ?', a: `Seulement les deux épreuves écrites propres au VTC, développement commercial et réglementation VTC, puis la conduite, à condition que votre admissibilité taxi date de moins de ${E.mobilite_validite_ans} ans. C’est la mobilité professionnelle, facturée ${A.examen_mobilite} € en 2026. Il faut ${E.admissibilite_moyenne}/20 de moyenne pondérée sur ces deux épreuves, sans note éliminatoire. Joignez le relevé de notes d’admissibilité à l’inscription.` },
      { q: 'Quelle voiture faut-il présenter le jour de l’épreuve pratique VTC ?', a: `Une voiture assurée, à jour de son contrôle technique, avec double commande, doubles rétroviseurs intérieurs et extérieurs et quatre portières. Elle n’a pas à respecter les normes de l’arrêté du 26 mars 2015 sur les véhicules de VTC. Si elle est louée, apportez l’attestation d’assurance du loueur avec la plaque et le contrat ou la facture à votre nom ; si un centre la prête, son attestation de mise à disposition.` },
      { q: 'Peut-on contester sa note à l’examen VTC ?', a: `Oui. Vous pouvez d’abord consulter votre copie d’écrit sur place, sur demande écrite au président de la CMA, pendant ${CONSULTATION_COPIE_ANS} an après la publication des notes, sans photo ni copie. Une réclamation écrite sur l’écrit ou la conduite doit lui parvenir dans les ${RECLAMATION_MOIS} mois suivant la notification. Une commission de recours peut alors réexaminer le dossier ; sa décision est définitive.` },
    ],
    body: (h) => `
<h2>Un examen en deux phases, onze sessions par an</h2>
<p>Depuis la loi du 29 décembre 2016 sur le transport public particulier de personnes, ce sont les chambres de métiers et de l’artisanat (CMA) qui évaluent l’aptitude des futurs chauffeurs. Le même examen sert, avec des variantes, aux taxis, aux VTC et aux motos-taxis (VMDTR). Il commence par des épreuves écrites d’admissibilité et se termine par une épreuve pratique d’admission. CMA France fixe chaque année un calendrier national de ${SESSIONS_PAR_AN} sessions d’écrit ; chaque région en organise au moins une par trimestre. Le texte qui fait foi est le ${h.src('cmaReglement', 'règlement de l’examen, version de décembre 2024')}.</p>

<h2>Les sept épreuves écrites</h2>
<p>Cinq épreuves forment un tronc commun avec le taxi, deux sont propres au VTC. Les questions à choix multiples sont corrigées automatiquement par la plateforme, les questions à réponse courte par des correcteurs désignés par la CMA. L’${h.src('arreteProgramme2024', 'arrêté du 20 mars 2024')} a ajouté à l’épreuve A la prévention des discriminations et des violences sexistes et sexuelles.</p>
${h.table(['Épreuve', 'Questions', 'Durée', 'Éliminatoire sous', 'Coef.'],
  EPREUVES.map((e) => [`${e.code}. ${e.fr}`, e.qrc ? `${e.qcm} QCM, ${e.qrc} QRC` : `${e.qcm} QCM`, `${e.minutes} min`, `${e.eliminatoire}/20`, e.coef]),
  `Total : ${MINUTES_ECRIT} minutes d’épreuves, coefficients ${COEF_TOTAL}. Source : règlement CMA, art. II`, ['l', 'l', 'r', 'r', 'r'])}
<p>Deux épreuves pèsent plus qu’on ne le croit. Le français (épreuve D) est éliminatoire sous ${FRANCAIS.eliminatoire}/20, comme presque toutes les autres ; un candidat dont ce n’est pas la langue maternelle doit la préparer en priorité. Les deux épreuves VTC, F(V) et G(V), portent chacune un coefficient ${E.vtc[0].coef} alors qu’elles ne durent que ${E.vtc[0].minutes + E.vtc[1].minutes} minutes à elles deux : quelques points perdus là coûtent cher.</p>

<h2>Le calcul de l’admissibilité</h2>
<p>Pour être admissible, il faut une moyenne d’au moins ${E.admissibilite_moyenne}/20 sur les sept épreuves, chaque note multipliée par son coefficient, le tout divisé par ${COEF_TOTAL} et arrondi au centième. Aucune épreuve ne doit tomber sous sa note éliminatoire : ${ELIM_GENERAL}/20 partout, ${ANGLAIS.eliminatoire}/20 en anglais. Un exemple montre l’effet du plancher : avec 10 dans six épreuves et ${ANGLAIS.eliminatoire} en anglais, on n’est pas éliminé, mais la moyenne descend à ${h.num(EXEMPLE_MOYENNE, 2)} et l’écrit est perdu. Le mini-simulateur placé sous le résumé refait ce calcul avec vos propres notes.</p>
<p>Les résultats sont publiés sur la plateforme d’inscription. En cas de réussite, vous recevez une attestation ou un relevé de notes ; en cas d’échec, un relevé de notes, et il faut se réinscrire à la totalité de l’examen.</p>

<h2>L’épreuve pratique, minute par minute</h2>
<p>La CMA convoque les admissibles dans les ${CONVOCATION_PRATIQUE_MOIS} mois qui suivent les résultats de l’écrit, en principe dans le département où ils veulent exercer, parfois dans un autre département de la même région. L’épreuve dure ${E.pratique_duree_max_min} minutes au plus. Les deux membres du jury jouent les clients ; vous tirez au sort une mise en situation, qui peut inclure de la pluie, un jour férié, des bagages ou des étapes intermédiaires.</p>
<p>Après l’accueil et l’installation des clients, l’un d’eux lit le sujet et donne l’adresse d’arrivée, deux fois au plus, sans l’épeler. Vous avez alors ${E.pratique_preparation_min} minutes pour démarrer le GPS et y saisir ou dicter l’adresse (votre téléphone sur un support est accepté, mais pas une adresse déjà enregistrée), montrer le départ et l’arrivée sur un plan, et établir le devis. Le devis est jugé sur le prix, pas sur ses mentions obligatoires. Dépasser ces ${E.pratique_preparation_min} minutes vaut ajournement.</p>
<p>Suivent au moins ${E.pratique_conduite_min} minutes de circulation. Le jury peut vous interroger sur les monuments, les gares ou les hôpitaux de la ville. Les couloirs de bus sont interdits sauf exception locale annoncée avant le départ. À l’arrivée, vous vous garez, remettez une facture et encaissez.</p>
${h.table(['Critère (VTC)', 'Points'], [
  ['Préparation et réalisation du parcours', B.parcours],
  ['Sécurité et souplesse de la conduite, respect du code de la route', B.conduite],
  ['Prise en charge, relation client, informations touristiques', B.client],
  ['Facturation', B.facturation],
], `Admis à partir de ${E.pratique_admis}/20. Source : règlement CMA, art. II`, ['l', 'r'])}
<p>Quatre situations entraînent l’ajournement sans même attendre la note : le délai de préparation dépassé, l’incapacité à rejoindre la destination, une intervention de l’examinateur sur la double commande ou le volant, et un candidat qui ne remplit pas les conditions (véhicule non conforme, papiers manquants, signes d’alcool ou de stupéfiants, chaussures ouvertes sans bride). Dans ce dernier cas, le passage n’est pas décompté, mais il faut repayer l’inscription.</p>

<h2>S’inscrire sur exament3p.fr</h2>
<p>L’inscription passe par la plateforme officielle des CMA, ${h.src('cmaT3p', 'exament3p.fr')}, en candidat libre ou à l’issue d’une formation. Les pièces demandées :</p>
<ul>
<li>une pièce d’identité en cours de validité ; hors Union européenne, un titre de séjour ou un récépissé autorisant à travailler, délivré par une autorité française ;</li>
<li>le permis de conduire, période probatoire terminée ;</li>
<li>une photo d’identité aux normes et une signature à l’encre noire ou bleue sur fond blanc ;</li>
<li>un justificatif de domicile de moins de trois mois, ou l’attestation de l’hébergeur avec sa pièce d’identité et son propre justificatif ;</li>
<li>pour la mobilité professionnelle, le relevé de notes d’admissibilité de moins de ${E.mobilite_validite_ans} ans.</li>
</ul>
<p>Le certificat médical n’est pas demandé à ce stade : la ${h.src('cmaFaq', 'foire aux questions de la CMA')} le réserve à la carte professionnelle. Un permis délivré hors de l’Union européenne depuis au moins ${PERMIS_HORS_UE_ANCIENNETE_ANS} ans est accepté pendant ${PERMIS_HORS_UE_RESIDENCE_ANS} an après l’installation en France. L’inscription est fermée à qui a subi un retrait définitif de carte professionnelle dans les ${RETRAIT_CARTE_ANS} ans, ou une exclusion pour fraude dans les ${FRAUDE_EXCLUSION_ANS} ans.</p>
<p>La CMA a ${INSTRUCTION_JOURS_OUVRES} jours ouvrés pour examiner le dossier. Une fois validé, elle garantit de vous faire passer les épreuves et de vous donner le résultat de la pratique dans les ${GARANTIE_MOIS} mois suivant le dépôt ; une pièce refusée fait repartir ce délai. La convocation à l’écrit arrive au moins ${CONVOCATION_ECRIT_JOURS} jours avant la date. Un candidat en situation de handicap demande un aménagement à la CMA au moins ${HANDICAP_DEMANDE_MOIS} mois avant, avec l’avis d’un médecin désigné par la CDAPH.</p>

<h2>Les tarifs 2026, et ceux de 2025</h2>
${h.table(['Formule', '2025', '2026'], [
  ['Examen complet (écrit et pratique)', h.eur(A.examen_complet_2025), h.eur(A.examen_complet)],
  ['Mobilité professionnelle', h.eur(EXAMEN_MOBILITE_2025), h.eur(A.examen_mobilite)],
  ['Session d’admission seule (conduite)', h.eur(EXAMEN_ADMISSION_2025), h.eur(A.examen_admission_seule)],
], 'Source : CMA, guide des examens taxi, VTC et VMDTR', ['l', 'r', 'r'])}
<p>Ces droits ne couvrent pas la location du véhicule de l’épreuve pratique. Une annulation n’est remboursée que si elle intervient avant la validation du dossier. Ensuite, seule la force majeure ouvre un report sans frais, demandé par écrit au plus tard ${FORCE_MAJEURE_JOURS} jours après l’examen, justificatifs à l’appui.</p>

<h2>Repasser l’examen</h2>
<p>La règle dépend de la phase ratée. Un écrit non admissible oblige à tout reprendre, au tarif complet. Une conduite ratée laisse ${E.pratique_tentatives_supplementaires} nouvelles chances dans les ${E.pratique_delai_mois} mois qui suivent la publication des notes d’écrit, chacune au tarif de l’admission seule ; au-delà de ce délai ou du troisième échec, retour à l’écrit.</p>

<h2>La mobilité professionnelle depuis le taxi ou la moto</h2>
<p>Un candidat déclaré admissible à l’écrit complet du taxi ou du VMDTR depuis moins de ${E.mobilite_validite_ans} ans peut passer seulement les deux épreuves F(V) et G(V), puis la conduite VTC. Il lui faut ${E.admissibilite_moyenne}/20 de moyenne pondérée sur ces deux épreuves, sans note éliminatoire. Un chauffeur qui a obtenu sa carte VTC par équivalence ne peut pas faire le chemin inverse : il n’a jamais validé le tronc commun. Le parcours vers le taxi est décrit sur la page ${h.a('examen-taxi', 'examen taxi')}.</p>

<h2>Le jury, les résultats et les recours</h2>
<p>À la pratique, le jury compte au moins deux évaluateurs. Le président est un agent de la CMA titulaire d’un diplôme de niveau bac. Le second est un chauffeur VTC en activité ou ancien, titulaire d’un diplôme du même niveau et justifiant de ${JURY_EXPERIENCE_ANS} ans d’expérience au cours des ${JURY_PERIODE_ANS} dernières années, désigné par les organisations professionnelles de la commission locale ; un professionnel du VTC n’évalue que des candidats VTC. Les membres suivent chaque année une formation qui inclut la sensibilisation aux préjugés. En cas de désaccord sur la note, celle du président l’emporte.</p>
<p>Le taux de réussite n’est pas un secret, mais il est local. Au plus tard ${RESULTATS_PUBLIES_MOIS} mois après chaque session, chaque CMA publie les inscrits, les présents, les moyennes par épreuve et le taux de réussite, par département (règlement, articles IV.3 et X), et CMA France en tire une synthèse nationale trimestrielle. Nous ne reproduisons aucun de ces chiffres : consultez ceux de votre région, session par session.</p>
<p>Pour contester, vous pouvez consulter votre copie d’écrit sur place pendant ${CONSULTATION_COPIE_ANS} an, puis adresser une réclamation écrite au président de la CMA dans les ${RECLAMATION_MOIS} mois suivant la décision. La fraude, enfin, se paie cher : téléphone, montre connectée ou oreillette valent annulation de l’examen et ${FRAUDE_EXCLUSION_ANS} ans d’interdiction de réinscription.</p>
<p>Après la réussite viennent la ${h.a('carte-vtc', 'carte VTC')} et le reste du ${h.a('devenir-chauffeur-vtc', 'parcours pour devenir VTC')}. Pour préparer l’écrit et la conduite, voir la page ${h.a('formation-vtc', 'formation VTC')}, et pour chiffrer l’ensemble, le ${h.a('cout-acces-metier', 'simulateur de coût d’accès')}.</p>
`,
  },
  en: {
    slug: 'vtc-exam-t3p',
    nav: 'VTC exam (T3P)',
    card: 'The seven written papers, the driving test, pass marks, fees and resits.',
    title: 'VTC Exam France 2026: T3P Papers, Pass Marks and Fees',
    description: `VTC (T3P) exam in France, 2026: seven written papers, weightings, elimination marks, the ${E.admissibilite_moyenne}/20 average, a driving test marked out of 20, €${A.examen_complet} fee, resits.`,
    h1: 'The VTC exam (T3P): papers, marking, booking and resits',
    intro: `Seven papers, at least ${E.pratique_conduite_min} minutes behind the wheel, and two thresholds to clear: an average of ${E.admissibilite_moyenne} on paper and ${E.pratique_admis} on the road.`,
    resume: `The VTC exam, often called the T3P exam after the French term for chauffeured passenger transport (transport public particulier de personnes), is run by the chambers of trades (CMA). It costs €${A.examen_complet} in 2026, against €${A.examen_complet_2025} in 2025, and has two stages. The written stage is seven papers of multiple-choice and short-answer questions, ${MINUTES_ECRIT} minutes in all: transport regulations and preventing discrimination, business management, road safety, French, English, then business development and VTC-specific rules. You need a weighted average of at least ${E.admissibilite_moyenne}/20 and must not fall below the elimination mark in any paper, which is ${ELIM_GENERAL}/20, or ${ANGLAIS.eliminatoire}/20 for English. The second stage is a role-play journey of up to ${E.pratique_duree_max_min} minutes, including at least ${E.pratique_conduite_min} minutes of driving, marked out of 20 with a pass mark of ${E.pratique_admis}. Fail the written stage and you start again; fail the drive and you get two more tries within a year of your written results. Each CMA publishes its own pass rates after every session.`,
    faqs: [
      { q: 'What are the CMA fees for the T3P exam in 2026?', a: `The chambers of trades’ exam guide lists €${A.examen_complet} for the full exam in 2026, €${A.examen_mobilite} for the professional mobility route and €${A.examen_admission_seule} for a further driving session on its own. In 2025 the same items cost €${A.examen_complet_2025}, €${EXAMEN_MOBILITE_2025} and €${EXAMEN_ADMISSION_2025}. The fee covers both stages but not hiring the dual-control car. Once the CMA has validated your file, nothing is refunded except in cases of force majeure.` },
      { q: 'What average do I need to get through the written part of the VTC exam?', a: `${E.admissibilite_moyenne}/20 across all seven papers, each weighted by its coefficient (${COEF_TOTAL} in total) and rounded to two decimals, with no paper below its elimination mark. That floor is ${ELIM_GENERAL}/20 everywhere except English, where it drops to ${ANGLAIS.eliminatoire}/20. Score ${ANGLAIS.eliminatoire} in English and 10 in everything else and your average is ${EXEMPLE_MOYENNE}, a fail, so you need to make up points elsewhere. The calculator on this page runs the sums with your marks.` },
      { q: 'I failed the VTC driving test. How many more attempts do I get?', a: `Two, within one year of your written results being posted on the booking platform, according to the CMA rules. Each retake is booked as a driving-only session, €${A.examen_admission_seule} in 2026, and the CMA must call you within ${CONVOCATION_PRATIQUE_MOIS} months of re-booking. After a third failure, or once the year is up, you have to sit the whole exam again, written papers included.` },
      { q: 'Where can I find VTC exam pass rates for my area?', a: `On your regional chamber of trades’ website. Under articles IV.3 and X of the exam rules, each CMA must publish within ${RESULTATS_PUBLIES_MOIS} month of every session the numbers registered and present, average marks per paper and the pass rate, broken down by département. CMA France adds a quarterly national summary on artisanat.fr. We have not collected these figures and quote none; be wary of any rate given without a session or area.` },
      { q: 'I already passed the taxi exam. What do I need to sit to switch to VTC?', a: `Only the two VTC written papers, business development and VTC rules, followed by the VTC driving test, provided your taxi written pass is less than ${E.mobilite_validite_ans} years old. This is called professional mobility and costs €${A.examen_mobilite} in 2026. You need a weighted average of ${E.admissibilite_moyenne}/20 across those two papers with no elimination mark. Attach your written results to the booking.` },
      { q: 'What kind of car do I bring to the VTC practical test?', a: `An insured car with an up-to-date roadworthiness test, dual controls, dual interior and exterior mirrors and four doors. It does not have to meet the VTC vehicle standards of the order of 26 March 2015. If it is rented, bring the rental company’s insurance certificate showing the plate plus the contract or paid invoice in your name; if a training centre lends it, bring the centre’s letter confirming that.` },
      { q: 'Can I appeal against my VTC exam result?', a: `Yes. First, you can ask the president of the CMA in writing to see your written script on site, for up to ${CONSULTATION_COPIE_ANS} year after results; no photos or copies are allowed. A written complaint about either stage must reach the president within ${RECLAMATION_MOIS} months of the decision. An appeal committee may then review the case, and its decision is final.` },
    ],
    body: (h) => `
<h2>Two stages, eleven sessions a year</h2>
<p>Since a law of 29 December 2016 on chauffeured passenger transport, France’s chambers of trades (CMA) have tested would-be drivers. One exam, with variations, covers taxis, VTCs and motorbike taxis (VMDTR). It opens with written papers, called admissibilité, and closes with a practical test, called admission. CMA France sets a national calendar of ${SESSIONS_PAR_AN} written sessions a year, and every region holds at least one per quarter. The reference text is the ${h.src('cmaReglement', 'exam rules, December 2024 version')}, available in French only.</p>

<h2>The seven written papers</h2>
<p>Five papers are shared with taxi candidates and two are specific to VTC work. Multiple-choice questions (QCM) are marked automatically; short-answer questions (QRC) are marked by examiners appointed by the CMA. The ${h.src('arreteProgramme2024', 'order of 20 March 2024')} added discrimination and sexual and sexist violence to paper A.</p>
${h.table(['Paper', 'Questions', 'Time', 'Eliminated below', 'Weight'],
  EPREUVES.map((e) => [`${e.code}. ${e.en}`, e.qrc ? `${e.qcm} MCQ, ${e.qrc} short answers` : `${e.qcm} MCQ`, `${e.minutes} min`, `${e.eliminatoire}/20`, e.coef]),
  `Total: ${MINUTES_ECRIT} minutes of papers, weights adding up to ${COEF_TOTAL}. Source: CMA exam rules, art. II`, ['l', 'l', 'r', 'r', 'r'])}
<p>For an English speaker the English paper is the easy one, but it also carries the lowest weight, ${ANGLAIS.coef}. The French paper, D, eliminates anyone below ${FRANCAIS.eliminatoire}/20 and is where non-native candidates most need to prepare. The two VTC papers, F(V) and G(V), each carry a weight of ${E.vtc[0].coef} for just ${E.vtc[0].minutes + E.vtc[1].minutes} minutes between them, so careless mistakes there are expensive.</p>

<h2>How the written result is worked out</h2>
<p>Multiply each mark by its weight, add them up, divide by ${COEF_TOTAL} and round to two decimals: the result must be at least ${E.admissibilite_moyenne}/20. No single paper may fall below ${ELIM_GENERAL}/20, or ${ANGLAIS.eliminatoire}/20 in English. Here is why the floor matters: 10 in six papers and ${ANGLAIS.eliminatoire} in English avoids elimination, yet the average slides to ${h.num(EXEMPLE_MOYENNE, 2)} and the written stage is lost. The calculator under the summary does the arithmetic with your own marks.</p>
<p>Results appear on the booking platform. A pass brings a certificate or transcript; a fail brings a transcript and the need to rebook the entire exam.</p>

<h2>The practical test, step by step</h2>
<p>The CMA calls successful candidates within ${CONVOCATION_PRATIQUE_MOIS} months of the written results, normally in the département where they want to work, sometimes in another département of the same region. The test lasts up to ${E.pratique_duree_max_min} minutes. Both examiners play passengers, and you draw a scenario at random that may involve rain, a public holiday, luggage or stops along the way.</p>
<p>You greet your “passengers” and help them settle in. One reads out the scenario and the destination, at most twice and without spelling it. From then on you have ${E.pratique_preparation_min} minutes to start the GPS and type or dictate the address (your phone in a holder is fine, a saved address is not), point out the start and finish on a map, and draw up a quote. The quote is marked on the price, not on the legal wording. Going over the ${E.pratique_preparation_min} minutes means automatic failure.</p>
<p>Then comes at least ${E.pratique_conduite_min} minutes of driving, during which the examiners may ask about landmarks, stations or hospitals. Bus lanes are off limits unless a local exception is announced before you set off. At the destination you park, hand over an invoice and take payment.</p>
${h.table(['VTC criterion', 'Points'], [
  ['Planning and driving the route', B.parcours],
  ['Safe, smooth driving within the Highway Code', B.conduite],
  ['Passenger care, customer relations, tourist information', B.client],
  ['Invoicing', B.facturation],
], `Pass mark ${E.pratique_admis}/20. Source: CMA exam rules, art. II`, ['l', 'r'])}
<p>Some situations end the test with no mark at all: overrunning the preparation time, being unable to reach the destination, an examiner touching the dual controls or the wheel, or failing the entry conditions on the day (non-compliant car, missing papers, signs of alcohol or drugs, open-backed shoes). In that last case the attempt is not counted against you, though you pay again to rebook.</p>

<h2>Booking on exament3p.fr</h2>
<p>You book through the CMAs’ official platform, ${h.src('cmaT3p', 'exament3p.fr')}, either as an independent candidate or after a course. You will need:</p>
<ul>
<li>a valid ID document; non-EU nationals need a residence permit or receipt allowing them to work, issued by the French authorities;</li>
<li>a driving licence that is out of its probationary period;</li>
<li>a passport-standard photo and a signature in black or blue ink on white paper;</li>
<li>proof of address under three months old or, if you live with someone, their letter, their ID and their own proof of address;</li>
<li>for professional mobility, your written transcript, less than ${E.mobilite_validite_ans} years old.</li>
</ul>
<p>No medical certificate is needed yet: the ${h.src('cmaFaq', 'CMA’s FAQ')} keeps it for the professional card. A licence issued outside the EU and held for at least ${PERMIS_HORS_UE_ANCIENNETE_ANS} years is accepted during your first ${PERMIS_HORS_UE_RESIDENCE_ANS} year of residence in France. You cannot book if your professional card was permanently withdrawn in the last ${RETRAIT_CARTE_ANS} years, or if you were excluded for cheating in the last ${FRAUDE_EXCLUSION_ANS}.</p>
<p>The CMA has ${INSTRUCTION_JOURS_OUVRES} working days to check your file. Once it is validated, the CMA guarantees you can sit both stages and get your practical result within ${GARANTIE_MOIS} months of filing; a rejected document restarts that clock. Your notice to attend the written papers arrives at least ${CONVOCATION_ECRIT_JOURS} days ahead. Candidates with a disability ask the CMA for adjustments at least ${HANDICAP_DEMANDE_MOIS} month before, with an opinion from a doctor appointed by the CDAPH, the local disability rights commission.</p>

<h2>Fees for 2026 compared with 2025</h2>
${h.table(['Option', '2025', '2026'], [
  ['Full exam (written and practical)', h.eur(A.examen_complet_2025), h.eur(A.examen_complet)],
  ['Professional mobility', h.eur(EXAMEN_MOBILITE_2025), h.eur(A.examen_mobilite)],
  ['Practical session only', h.eur(EXAMEN_ADMISSION_2025), h.eur(A.examen_admission_seule)],
], 'Source: CMA exam guide for taxi, VTC and VMDTR', ['l', 'r', 'r'])}
<p>None of these covers hiring a car for the practical test. You can cancel with a refund only before the CMA validates your file. After that, only force majeure gets you a free postponement, requested in writing with evidence no later than ${FORCE_MAJEURE_JOURS} days after the exam date.</p>

<h2>Resits</h2>
<p>What happens depends on which stage you fail. Missing the written average sends you back to the start at the full fee. Failing the drive leaves you ${E.pratique_tentatives_supplementaires} more attempts within ${E.pratique_delai_mois} months of your written results, each at the practical-only price; after that deadline, or a third failure, it is back to the papers.</p>

<h2>Switching from taxi or motorbike taxi</h2>
<p>Anyone who passed the full written stage of the taxi or VMDTR exam less than ${E.mobilite_validite_ans} years ago can sit just F(V) and G(V), then the VTC drive, needing a weighted ${E.admissibilite_moyenne}/20 across those two papers with no elimination mark. Drivers who got a VTC card through the old experience route cannot use this in reverse, since they never passed the common papers. The route into taxi work is described on the ${h.a('examen-taxi', 'taxi exam')} page.</p>

<h2>Examiners, results and appeals</h2>
<p>The practical test has at least two examiners. The chair is a CMA staff member qualified to baccalauréat level. The other is a current or former VTC driver with the same level of qualification and ${JURY_EXPERIENCE_ANS} years’ experience within the last ${JURY_PERIODE_ANS}, nominated by the professional bodies on the local transport committee; VTC professionals examine only VTC candidates. Examiners are trained every year, including on bias and discrimination. If the two disagree, the chair’s mark prevails.</p>
<p>Pass rates are public but local. Within ${RESULTATS_PUBLIES_MOIS} month of each session, every CMA posts the numbers registered and present, average marks per paper and the pass rate for each département (rules, articles IV.3 and X), and CMA France compiles a quarterly national summary. We reproduce none of these: look up your own region, session by session.</p>
<p>To challenge a result, you can view your written script on site for ${CONSULTATION_COPIE_ANS} year and send a written complaint to the CMA president within ${RECLAMATION_MOIS} months of the decision. Cheating is costly: a phone, smartwatch or earpiece means the exam is cancelled and you cannot rebook for ${FRAUDE_EXCLUSION_ANS} years.</p>
<p>Once you pass, the next steps are the ${h.a('carte-vtc', 'VTC driver card')} and the rest of the ${h.a('devenir-chauffeur-vtc', 'route to becoming a VTC driver')}. For revision and driving practice, see ${h.a('formation-vtc', 'VTC training')}; to put a figure on the whole process, use the ${h.a('cout-acces-metier', 'start-up cost calculator')}.</p>
`,
  },
});
