import { defineGuide } from '../../lib/guide-types';
import { P } from '../../lib/engine/params';

const A = P.ambulancier;

// Valeurs lues dans params-2026.json ; source : (bloc `ambulancier`) : valeurs lues dans l'arrêté du 11 avril 2022,
// https://www.legifrance.gouv.fr/loda/id/JORFTEXT000045593318 (version consolidée lue le 4 octobre 2026).
const DEA = P.ambulancier.dea;

const H_SEM = A.dea_heures_stage / A.dea_semaines_stage;
const semainesContinu = A.dea_heures_institut / H_SEM + A.dea_semaines_stage;
const fr1 = (x: number) => x.toLocaleString('fr-FR', { maximumFractionDigits: 1 });
const en1 = (x: number) => x.toLocaleString('en-GB', { maximumFractionDigits: 1 });

export default defineGuide({
  id: 'formation-ambulancier',
  group: 'ambulance',
  order: 10,
  mini: 'dureeDea',
  miniHref: 'salaire-ambulancier',
  related: ['devenir-ambulancier', 'salaire-ambulancier', 'cout-acces-metier', 'devenir-taxi', 'method'],
  sources: ['arreteDea', 'avenantAmbulanciers'],
  fr: {
    slug: 'formation-ambulancier',
    nav: 'Formation ambulancier (DEA)',
    card: 'Sélection, heures en institut et en stage, allègements, financement du diplôme d’État.',
    title: `Formation ambulancier 2026 : DEA en ${A.dea_heures} h, sélection, coût`,
    description: `Formation d’ambulancier 2026 : ${A.dea_heures} heures dont ${A.dea_heures_stage} en stage, sélection sur dossier noté sur 20 puis entretien, allègements, et le reste à charge de votre devis.`,
    h1: 'Formation d’ambulancier : de la sélection au diplôme d’État',
    intro: 'Un seul texte encadre tout le cursus : l’arrêté du 11 avril 2022, que cette page suit article par article.',
    resume: `La formation qui mène au diplôme d’État d’ambulancier (DEA) dure ${A.dea_heures} heures selon l’arrêté du 11 avril 2022, modifié en novembre 2022 et en juillet 2024 : ${A.dea_heures_institut} heures d’enseignement théorique et pratique en institut, réparties en ${DEA.modules} modules, et ${A.dea_heures_stage} heures en milieu professionnel, soit ${A.dea_semaines_stage} semaines de ${A.dea_heures_stage / A.dea_semaines_stage} heures. Le diplôme valide ${DEA.blocs} blocs de compétences. Pour entrer, il faut un permis hors période probatoire, l’attestation préfectorale d’aptitude à la conduite d’ambulance obtenue après examen médical, un certificat médical de non-contre-indication, un certificat de vaccinations et, sauf dispense, un stage d’observation de ${A.stage_observation_heures} heures. La sélection se fait en deux temps : un dossier noté sur 20, admissible à partir de ${A.selection_admissibilite_min}, puis un entretien de ${A.entretien_max_min} minutes au plus. L’institut peut étaler le cursus sur ${A.dea_duree_max_ans} ans au maximum. Le prix n’est fixé par aucun texte : il dépend de l’institut et de votre financement.`,
    faqs: [
      { q: 'Combien de temps dure la formation d’ambulancier à temps plein ?', a: `L’arrêté fixe ${A.dea_heures} heures. À raison de ${A.dea_heures_stage / A.dea_semaines_stage} heures par semaine, les ${A.dea_heures_institut} heures d’institut représentent environ ${fr1(A.dea_heures_institut / H_SEM)} semaines, auxquelles s’ajoutent ${A.dea_semaines_stage} semaines de stage : un peu plus de ${Math.floor(semainesContinu)} semaines sans compter les congés ni l’attente entre deux périodes. En discontinu, l’institut peut répartir le parcours sur ${A.dea_duree_max_ans} ans au plus (article 17).` },
      { q: `Le stage d’observation de ${A.stage_observation_heures} heures est-il obligatoire pour tous les candidats ?`, a: `Non. L’article 6 de l’arrêté en dispense deux profils : le candidat qui a travaillé au moins ${DEA.dispense_stage_auxiliaire_mois} mois comme auxiliaire ambulancier, en continu ou non, au cours des ${DEA.dispense_stage_periode_ans} dernières années, et celui qui vient de la brigade des sapeurs-pompiers de Paris ou du bataillon de marins-pompiers de Marseille avec ${DEA.pompiers_experience_ans} ans d’expérience. Pour les autres, le stage se fait dans un service hospitalier de transport sanitaire ou dans une entreprise de transport sanitaire.` },
      { q: 'Que contient le dossier de sélection pour entrer en institut d’ambulanciers ?', a: 'L’article 7 demande notamment une pièce d’identité, le permis, l’attestation préfectorale d’aptitude à la conduite d’ambulance, les certificats médicaux, une lettre de motivation manuscrite, un curriculum vitae, un document manuscrit personnel de deux pages au plus, les diplômes, les bulletins scolaires et les attestations de travail. Un candidat de nationalité extérieure à l’Union européenne joint une attestation de niveau B2 en français.' },
      { q: 'Peut-on suivre la formation d’ambulancier en apprentissage ou à distance ?', a: `Oui pour l’apprentissage : l’article 3 ouvre le diplôme par la formation initiale, dont l’apprentissage, par la formation continue et par la validation des acquis de l’expérience. Un apprenti déjà retenu par un employeur est admis directement par le directeur de l’institut (article 15). La distance est limitée : l’enseignement théorique peut être fait à distance dans la limite de ${Math.round(DEA.distance_max_part * 100)} % de sa durée (article 18).` },
      { q: 'Combien coûte la formation d’ambulancier en 2026 ?', a: 'Aucun texte national ne fixe le prix : chaque institut établit son tarif, et le montant restant à votre charge dépend du financement obtenu. Le site ne publie donc pas de prix moyen. Saisissez le devis de votre institut et le financement accordé dans le simulateur de cette page : il calcule le reste à payer et le coût par heure de formation, sur la base des heures fixées par l’arrêté.' },
      { q: 'Que se passe-t-il si l’on rate un bloc de compétences du DEA ?', a: `Chaque bloc demande au moins ${DEA.bloc_note_min} sur 20 à l’évaluation théorique, sans compensation entre blocs (article 22). Un bloc non validé ouvre une session de rattrapage organisée selon les mêmes modalités (article 23). Si le rattrapage échoue, l’élève peut se réinscrire une deuxième fois pour suivre les seuls enseignements des blocs manquants (article 25).` },
    ],
    body: (h) => `
<h2>Ce que l’arrêté exige avant même le dossier</h2>
<p>Le diplôme est accessible sans condition de diplôme scolaire (article 3). Les exigences portent sur l’aptitude à conduire et sur la santé. L’article 7 liste ce que le dossier doit prouver :</p>
<ul>
<li>un permis de conduire valide, sorti de la période probatoire ;</li>
<li>l’attestation préfectorale d’aptitude à la conduite d’ambulance, délivrée après un examen médical ;</li>
<li>un certificat médical de non-contre-indication à la profession d’ambulancier ;</li>
<li>un certificat médical de vaccinations conforme à la réglementation, celle qui s’applique aux professionnels de santé.</li>
</ul>
<p>Vient ensuite le stage d’observation de ${A.stage_observation_heures} heures, dans un service hospitalier chargé du transport sanitaire ou dans une entreprise de transport sanitaire habilitée (article 6). Il sert de matière à l’entretien : le candidat doit en parler. Deux profils en sont dispensés, ceux qui ont déjà travaillé comme auxiliaire ambulancier au moins ${DEA.dispense_stage_auxiliaire_mois} mois au cours des ${DEA.dispense_stage_periode_ans} dernières années, et les anciens de la brigade des sapeurs-pompiers de Paris ou des marins-pompiers de Marseille qui justifient de ${DEA.pompiers_experience_ans} ans d’expérience.</p>

<h2>La sélection : un dossier, puis un jury</h2>
<p>L’admissibilité se joue sur pièces. Un binôme d’évaluateurs, un ambulancier diplômé en activité ou un chef d’entreprise de transport sanitaire titulaire du diplôme, associé à un formateur permanent, note le dossier sur 20. Les candidats qui obtiennent ${A.selection_admissibilite_min} ou plus sont déclarés admissibles (article 11).</p>
<p>L’entretien d’admission dure ${A.entretien_max_min} minutes au plus et se note sur 20 (article 10). Il s’ouvre sur une présentation orale de ${DEA.entretien_presentation_min} minutes liée au stage d’observation, suivie de ${DEA.entretien_echange_min} minutes d’échange avec le jury. Une note inférieure à ${DEA.entretien_eliminatoire} sur 20 est éliminatoire. Le jury classe ensuite les candidats selon les places de l’institut.</p>
<h3>Les voies plus courtes</h3>
<p>Plusieurs profils évitent une partie du parcours. Le titulaire d’un diplôme de niveau 4, comme le baccalauréat, ou d’un titre sanitaire ou social de niveau 3 au moins passe directement à l’entretien, à condition que ce diplôme ait été délivré dans le système de formation français (article 8). Celui qui a exercé comme auxiliaire ambulancier pendant ${DEA.auxiliaire_voie_directe_ans} an en continu au cours des ${DEA.dispense_stage_periode_ans} dernières années ne dépose qu’un dossier d’admission (article 9). L’apprenti déjà recruté par un employeur est admis directement (article 15).</p>
<p>Les résultats ne valent que pour la rentrée concernée, mais le directeur peut accorder un report de ${DEA.report_max_ans} ans au plus (article 13). Chaque institut organise au moins ${DEA.rentrees_par_an_min} rentrées par an (article 16).</p>

<h2>Le cursus en heures</h2>
${h.table(['Composante', 'Volume fixé par l’arrêté', 'Article'], [
  ['Enseignement théorique et pratique', `${A.dea_heures_institut} h, en ${DEA.modules} modules`, '17 et 18'],
  ['Formation en milieu professionnel', `${A.dea_heures_stage} h, soit ${A.dea_semaines_stage} semaines`, '17 et 19'],
  ['Total', `${A.dea_heures} h`, '17'],
  ['Part maximale à distance', `${Math.round(DEA.distance_max_part * 100)} % de la théorie`, '18'],
  ['Durée maximale en discontinu', `${A.dea_duree_max_ans} ans`, '17'],
], 'Source : arrêté du 11 avril 2022, version consolidée lue le 4 octobre 2026')}
<p>Les stages prennent trois formes : deux périodes de ${DEA.stages_courts_semaines} semaines et une de ${DEA.stage_long_semaines} semaines (article 19), dont une en entreprise de transport sanitaire. Un portfolio suit l’apprenant d’un stage à l’autre (article 20). La présence aux cours et aux stages est obligatoire, et toute absence pour maladie doit être justifiée par un certificat (article 21).</p>
<p>À temps plein, le calcul donne environ ${h.num(semainesContinu, 1)} semaines de présence. Le simulateur en tête de page refait ce calcul avec votre propre rythme hebdomadaire.</p>

<h2>${DEA.blocs} blocs de compétences, sans compensation</h2>
<p>Le diplôme atteste la validation de ${DEA.blocs} blocs (article 1er, annexe II) :</p>
<ol>
<li>la prise en soin du patient à tout âge de la vie ;</li>
<li>le recueil de données cliniques et les soins adaptés à l’état du patient, notamment en urgence ;</li>
<li>le transport du patient dans le respect du code de la route et de la sécurité ;</li>
<li>l’entretien et le contrôle du véhicule, des matériels et des installations ;</li>
<li>le travail en équipe, le traitement des informations et la gestion des risques.</li>
</ol>
<p>Chaque bloc exige au moins ${DEA.bloc_note_min} sur 20 à l’évaluation théorique, et une bonne note dans l’un ne rattrape pas une mauvaise dans l’autre (article 22). Pour être déclaré reçu, l’élève doit aussi détenir l’attestation de formation aux gestes et soins d’urgence de niveau 2 (article 27). Le diplôme est délivré par le préfet de région sur décision d’un jury qu’il nomme (articles 26 et 27).</p>

<h2>Allègements pour les professionnels de santé</h2>
<p>Un diplôme sanitaire ou social déjà obtenu raccourcit le parcours. L’article 28 énumère des diplômes, parmi lesquels ceux d’aide-soignant, d’auxiliaire de puériculture, d’assistant de régulation médicale et d’accompagnant éducatif et social : leurs titulaires obtiennent des équivalences ou des allègements sur certains blocs. L’article 29 fait de même pour les infirmiers, masseurs-kinésithérapeutes, pédicures-podologues, ergothérapeutes, psychomotriciens, manipulateurs d’électroradiologie et techniciens de laboratoire. Le détail bloc par bloc figure en annexe X, que l’arrêté renvoie au site du ministère de la santé : demandez à l’institut le tableau qui vous concerne avant de signer.</p>

<h2>La formation courte d’auxiliaire</h2>
<p>À côté du DEA existe une formation de ${A.auxiliaire_heures} heures qui permet de travailler comme auxiliaire ambulancier (article 2). Elle porte sur l’hygiène, les valeurs professionnelles, la relation avec l’équipe et les patients, l’ergonomie, les gestes de mobilisation et de brancardage, et les règles du transport sanitaire. Elle s’ajoute aux mêmes exigences de permis, d’attestation préfectorale, de certificats médicaux et à l’attestation de gestes et soins d’urgence de niveau 2. Le choix entre les deux portes est détaillé sur la page ${h.a('devenir-ambulancier', 'devenir ambulancier')}.</p>

<h2>Payer la formation : ce que le texte ne dit pas</h2>
<p>L’arrêté ne fixe aucun tarif, et le site ne publie pas de moyenne faute de source publique. Chaque institut établit son devis. Selon votre situation, plusieurs pistes existent : le compte personnel de formation (CPF), le projet de transition professionnelle instruit par Transitions Pro pour un salarié en reconversion, une aide de la région, un accompagnement de France Travail pour un demandeur d’emploi, ou l’employeur, en particulier dans le cadre de l’apprentissage prévu par l’article 3. Aucune n’est automatique.</p>
<p>Saisissez votre devis et ce que vous avez obtenu dans le simulateur : il affiche le reste à charge et le coût par heure, utile pour comparer deux instituts. Pour une vue d’ensemble des frais d’entrée dans le métier, le ${h.a('cout-acces-metier', 'simulateur de coût d’accès')} ajoute la visite médicale et vos autres dépenses de départ, et la page ${h.a('salaire-ambulancier', 'salaire d’ambulancier')} montre ce que rapporte le diplôme une fois en poste.</p>
`,
  },
  en: {
    slug: 'ambulance-training-dea',
    nav: 'Ambulance training (DEA)',
    card: 'Selection, classroom and placement hours, shortcuts and funding for the State diploma.',
    title: `Ambulance Training France 2026: the ${A.dea_heures}-Hour DEA Diploma`,
    description: `Ambulance training in France, 2026: the State diploma takes ${A.dea_heures} hours with ${A.dea_semaines_stage} weeks of placements, entry by scored file and interview, then a quote you fund.`,
    h1: 'Training as an ambulance worker in France: the State diploma step by step',
    intro: 'One ministerial order governs the whole course, from the entry file to the final jury, and this guide follows it closely.',
    resume: `In France, ambulance work is a regulated health profession, and the full qualification is the diplôme d’État d’ambulancier, or DEA (State ambulance diploma). The order of 11 April 2022, amended in November 2022 and July 2024, sets it at ${A.dea_heures} hours: ${A.dea_heures_institut} hours of theory and practical work at an IFA (institut de formation d’ambulanciers, a dedicated training institute), spread over ${DEA.modules} modules, plus ${A.dea_heures_stage} hours of placements, which is ${A.dea_semaines_stage} weeks of ${A.dea_heures_stage / A.dea_semaines_stage} hours. You graduate by passing ${DEA.blocs} skill blocks. To apply you need a driving licence past its probationary period, the prefecture’s fitness-to-drive certificate for ambulances issued after a medical check, a medical certificate, proof of vaccinations and, unless exempt, a ${A.stage_observation_heures}-hour observation placement. Selection has two stages: a written file marked out of 20 (pass mark ${A.selection_admissibilite_min}) and an interview of up to ${A.entretien_max_min} minutes. Fees are set by each institute, not by law.`,
    faqs: [
      { q: 'How many weeks does the DEA take if I study full time?', a: `Count roughly ${en1(semainesContinu)} weeks of attendance: the ${A.dea_heures_institut} institute hours come to about ${en1(A.dea_heures_institut / H_SEM)} weeks at ${A.dea_heures_stage / A.dea_semaines_stage} hours a week, and the placements add ${A.dea_semaines_stage} weeks. Holidays and gaps between periods come on top. The institute may also run the course part time, but article 17 caps the whole thing at ${A.dea_duree_max_ans} years.` },
      { q: 'Who is excused from the 70-hour observation placement?', a: `Article 6 names two groups. People who have worked as an auxiliaire ambulancier (ambulance assistant) for at least ${DEA.dispense_stage_auxiliaire_mois} month, in one go or not, during the last ${DEA.dispense_stage_periode_ans} years, and former members of the Paris fire brigade or the Marseille naval fire battalion with ${DEA.pompiers_experience_ans} years of service. Everyone else does the placement in a hospital patient-transport unit or an approved ambulance company.` },
      { q: 'My French is not perfect. Is there a language requirement for ambulance school?', a: 'The order asks candidates from outside the European Union to add a certificate of French at level B2 to their file (article 7). EU nationals have no separate test, but the whole selection runs in French: a handwritten cover letter, a handwritten personal statement of up to two pages, and a spoken presentation followed by questions from the jury. Prepare as you would for a job interview in French.' },
      { q: 'What does ambulance training cost, and who pays?', a: 'No national fee exists. Each IFA sets its own price, so we do not quote an average. Depending on your situation, funding may come from your CPF (personal training account), a career-change scheme run by Transitions Pro, your region, France Travail (the public employment service) or an employer, notably through apprenticeship. Enter your quote and any funding in the calculator above to see what remains to pay.' },
      { q: 'I am already a nurse in France. Do I have to do the whole DEA?', a: `No. Under article 29, holders of a nursing diploma, and also physiotherapists, podiatrists, occupational therapists, psychomotor therapists, radiographers and lab technicians, get exemptions for some skill blocks. Article 28 gives similar relief to care assistants, childcare assistants and medical dispatch assistants, among others. The block-by-block table sits in annex X, published on the health ministry’s website; ask the institute for it.` },
      { q: 'Can I fail one part of the DEA and still graduate?', a: `Not without retaking it. Each block needs at least ${DEA.bloc_note_min} out of 20 in its theory assessment, and blocks do not offset each other (article 22). You get one resit session in the same format (article 23). If that fails too, you may re-enrol once and attend only the teaching for the blocks you are missing (article 25).` },
    ],
    body: (h) => `
<h2>Before the application: driving and health</h2>
<p>No school diploma is needed (article 3). What the order checks is whether you can drive an ambulance and whether your health allows the job. Article 7 asks for:</p>
<ul>
<li>a valid driving licence that is no longer probationary;</li>
<li>the prefecture’s certificate of fitness to drive an ambulance, issued after a medical examination;</li>
<li>a medical certificate stating nothing prevents you from working as an ambulancier;</li>
<li>a vaccination certificate meeting the rules for health workers.</li>
</ul>
<p>The order also lists more ordinary papers: ID, CV, a handwritten cover letter and personal statement, diplomas, school reports and employment certificates.</p>
<p>Then comes the ${A.stage_observation_heures}-hour observation placement, either in a hospital department that transports patients or in an approved private ambulance company (article 6). Treat it as research for the interview, because the jury will ask about it. Two groups skip it: anyone with at least ${DEA.dispense_stage_auxiliaire_mois} month of work as an ambulance assistant in the past ${DEA.dispense_stage_periode_ans} years, and former Paris or Marseille firefighters with ${DEA.pompiers_experience_ans} years of service.</p>

<h2>How institutes pick students</h2>
<p>Round one is on paper. Two assessors mark your file out of 20: a working, qualified ambulancier or an ambulance-company owner who holds the diploma, paired with a permanent trainer. A mark of ${A.selection_admissibilite_min} or more makes you eligible for interview (article 11).</p>
<p>Round two is the interview, ${A.entretien_max_min} minutes at most and also marked out of 20 (article 10). You speak for ${DEA.entretien_presentation_min} minutes about your observation placement, then answer the jury’s questions for ${DEA.entretien_echange_min} minutes. Anything under ${DEA.entretien_eliminatoire} out of 20 rules you out. Places are capped per institute, so the jury ranks candidates rather than simply passing them.</p>
<h3>Shortcuts worth knowing</h3>
<p>If you hold a level 4 qualification (the French baccalauréat or equivalent, registered in the national certification directory) or a health or social care qualification at level 3 or above, you go straight to the interview (article 8). An ambulance assistant with ${DEA.auxiliaire_voie_directe_ans} year of continuous work in the last ${DEA.dispense_stage_periode_ans} years only submits an admission file (article 9). An apprentice already hired by an employer is admitted directly (article 15). The first shortcut only covers qualifications issued within the French education and training system, so a foreign diploma does not open it.</p>
<p>A selection result only counts for the intake it was held for, though the director can defer your start by up to ${DEA.report_max_ans} years (article 13). Every institute runs at least ${DEA.rentrees_par_an_min} intakes a year (article 16), so missing one is not the end of the world.</p>

<h2>Where the ${A.dea_heures} hours go</h2>
${h.table(['Part of the course', 'Hours set by the order', 'Article'], [
  ['Theory and practical work', `${A.dea_heures_institut} h in ${DEA.modules} modules`, '17 and 18'],
  ['Work placements', `${A.dea_heures_stage} h over ${A.dea_semaines_stage} weeks`, '17 and 19'],
  ['Whole diploma', `${A.dea_heures} h`, '17'],
  ['Maximum taught remotely', `${Math.round(DEA.distance_max_part * 100)}% of the theory`, '18'],
  ['Longest part-time spread', `${A.dea_duree_max_ans} years`, '17'],
], 'Source: order of 11 April 2022, consolidated version read on 4 October 2026')}
<p>Placements come in three blocks: two of ${DEA.stages_courts_semaines} weeks and one of ${DEA.stage_long_semaines} weeks, one of them in an ambulance company (article 19), tracked in a portfolio (article 20). Attendance is compulsory throughout, and sick leave needs a doctor’s note (article 21). Since July 2024, digital health training has been folded into the existing modules without adding hours (article 18 bis).</p>

<h2>The ${DEA.blocs} skill blocks</h2>
<p>The diploma certifies five areas of competence (annex II): caring for patients of any age; gathering clinical observations and giving suitable care, including in emergencies; driving patients safely and within the Highway Code; checking and maintaining the vehicle and its equipment; and teamwork, record-keeping and risk management. Each needs at least ${DEA.bloc_note_min} out of 20 in its theory test, with no averaging across blocks (article 22). You also need the AFGSU 2, France’s level 2 certificate in emergency care, before the jury can pass you (article 27). The diploma itself is issued by the regional prefect.</p>

<h2>Credit for an existing health qualification</h2>
<p>Coming from another care job pays off. Article 28 lists diplomas such as care assistant (aide-soignant), childcare assistant, medical dispatch assistant and social care worker, whose holders get exemptions or lighter assessment for some blocks. Article 29 covers nurses, physiotherapists, podiatrists, occupational therapists, psychomotor therapists, radiographers and lab technicians. The details are in annex X on the health ministry’s website rather than in the order itself, so ask the IFA which blocks you can skip before you sign anything.</p>

<h2>The short course: ambulance assistant</h2>
<p>There is a quicker way to start working: the ${A.auxiliaire_heures}-hour auxiliaire ambulancier course (article 2). It covers hygiene, professional values, dealing with patients and colleagues, safe lifting and stretcher handling, and patient-transport rules. You still need the same licence, prefecture certificate and medical papers, plus the AFGSU 2. How the assistant’s job differs from the qualified ambulancier’s is explained in ${h.a('devenir-ambulancier', 'how to become an ambulance worker')}.</p>

<h2>Paying for it</h2>
<p>Because the order sets no fee, any figure you see online comes from a particular institute. The usual routes for funding a vocational qualification in France may apply to you: the CPF, the PTP career-change scheme run by Transitions Pro if you are an employee, regional schemes, France Travail if you are registered as a jobseeker, or an employer through apprenticeship. None is guaranteed, and the order does not set their amounts.</p>
<p>Use the calculator with a real quote: it shows your share and the cost per training hour, which makes two institutes easy to compare. The ${h.a('cout-acces-metier', 'start-up cost calculator')} adds the medical check and other costs, and ${h.a('salaire-ambulancier', 'ambulance worker pay')} shows the minimum wage scale you can expect once qualified.</p>
`,
  },
});
