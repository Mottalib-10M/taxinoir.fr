import { defineGuide } from '../../lib/guide-types';
import { P } from '../../lib/engine/params';

const A = P.ambulancier;

// Valeurs lues dans params-2026.json ; source : (bloc `ambulancier`) : durées lues dans l'arrêté du 11 avril 2022,
// https://www.legifrance.gouv.fr/loda/id/JORFTEXT000045593318 (articles 6 et 9).
const PASSERELLE = P.ambulancier.passerelle;
// Valeurs lues dans params-2026.json ; source : (bloc `taxi`) : échéance lue sur service-public F21907,
// https://entreprendre.service-public.gouv.fr/vosdroits/F21907 (vérifié le 13 juillet 2026).
const CPAM_EQUIPEMENT_AVANT = P.taxi.cpam_equipement_avant;

const niveaux = [A.taux_horaire_niveau1, A.taux_horaire_niveau2, A.taux_horaire_niveau3];
const sousSmic = niveaux.filter((t) => t < A.smic_horaire).length;

export default defineGuide({
  id: 'devenir-ambulancier',
  group: 'ambulance',
  order: 20,
  mini: 'parcoursAmbulancier',
  miniHref: 'formation-ambulancier',
  related: ['formation-ambulancier', 'salaire-ambulancier', 'devenir-taxi', 'licence-taxi', 'cout-acces-metier', 'examen-taxi'],
  sources: ['arreteDea', 'avenantAmbulanciers', 'spTaxi', 'conventionCpam'],
  fr: {
    slug: 'devenir-ambulancier',
    nav: 'Devenir ambulancier',
    card: 'Auxiliaire ou diplômé d’État, rôle dans l’équipage, différence avec le taxi conventionné, embauche.',
    title: 'Devenir ambulancier en 2026 : auxiliaire ou diplôme d’État',
    description: `Devenir ambulancier en 2026 : auxiliaire après ${A.auxiliaire_heures} heures ou diplôme d’État, exigences de permis et de santé, rôle de chacun, emploi en transport sanitaire.`,
    h1: 'Devenir ambulancier : choisir sa porte d’entrée',
    intro: 'On entre dans le transport sanitaire par une formation courte ou par un diplôme, et ce choix décide de ce que vous aurez le droit de faire.',
    resume: `Il existe deux façons de travailler dans une ambulance en France, toutes deux fixées par l’arrêté du 11 avril 2022. L’auxiliaire ambulancier suit une formation de ${A.auxiliaire_heures} heures : il peut conduire le véhicule sanitaire léger (VSL) et l’ambulance, et faire équipe avec un ambulancier diplômé (article 2). L’ambulancier titulaire du diplôme d’État (DEA) est défini comme un professionnel de santé et du transport sanitaire, qui prend en soin et transporte des patients sur prescription médicale (annexe I) ; son diplôme demande ${A.dea_heures} heures et une sélection. Les deux portes exigent un permis hors période probatoire, l’attestation préfectorale d’aptitude à la conduite d’ambulance, un certificat médical, des vaccinations à jour et l’attestation de gestes et soins d’urgence de niveau 2. L’emploi se trouve surtout dans les entreprises de transport sanitaire, dont les salariés relèvent de la convention collective des transports routiers et de l’accord du 16 février 2004 sur les rémunérations.`,
    faqs: [
      { q: 'Quelle est la différence entre auxiliaire ambulancier et ambulancier diplômé d’État ?', a: `L’arrêté du 11 avril 2022 habilite l’auxiliaire à conduire le VSL et l’ambulance et à être l’équipier de l’ambulancier dans l’ambulance (article 2). L’ambulancier diplômé assure la prise en soin et le transport des patients sur prescription médicale (annexe I). La formation de l’auxiliaire dure ${A.auxiliaire_heures} heures, sans sélection prévue par l’arrêté ; le diplôme d’État demande ${A.dea_heures} heures, un dossier et un entretien.` },
      { q: 'Peut-on commencer comme auxiliaire puis passer le diplôme d’État ?', a: `Oui, et l’arrêté le facilite. Après au moins ${PASSERELLE.auxiliaire_mois_sans_stage} mois comme auxiliaire au cours des ${PASSERELLE.periode_ans} dernières années, le stage d’observation préalable n’est plus exigé (article 6). Après ${PASSERELLE.auxiliaire_ans_dossier_seul} an d’activité continue dans une ou plusieurs entreprises de transport sanitaire sur la même période, la sélection se réduit à un dossier d’admission, sans entretien (article 9).` },
      { q: 'Un chauffeur de taxi peut-il transporter des malades sans être ambulancier ?', a: 'Oui, en taxi conventionné. Service-public indique que ces taxis assurent le transport assis de personnes malades, après avoir signé une convention avec l’Assurance maladie sur le modèle de la décision du 13 février 2025, qui fixe les tarifs. Le conducteur reste un chauffeur de taxi : carte professionnelle obtenue par l’examen de la chambre de métiers et autorisation de stationnement. Ce n’est pas un emploi d’ambulancier.' },
      { q: 'Quelle convention collective s’applique aux ambulanciers salariés ?', a: 'Dans une entreprise de transport sanitaire, c’est la convention collective nationale des transports routiers et activités auxiliaires du transport du 21 décembre 1950. Les salaires des personnels ambulanciers y sont fixés par l’accord du 16 février 2004, revu par avenants : l’avenant n° 8 du 6 mai 2025, étendu par arrêté du 22 juillet 2025, s’applique depuis le 1er juin 2025.' },
      { q: 'Faut-il un permis spécial pour conduire une ambulance ?', a: 'L’arrêté du 11 avril 2022 ne demande pas d’autre catégorie de permis : il exige un permis conforme à la réglementation, en cours de validité et sorti de la période probatoire, plus l’attestation préfectorale d’aptitude à la conduite d’ambulance, délivrée après un examen médical. Cette attestation est demandée aussi bien à l’auxiliaire (article 2) qu’au candidat au diplôme d’État (article 7).' },
    ],
    body: (h) => `
<h2>Deux portes, deux métiers</h2>
<p>Le transport sanitaire ne connaît pas un seul statut. L’arrêté du 11 avril 2022 en organise deux, avec des droits différents.</p>
${h.table(['', 'Auxiliaire ambulancier', 'Ambulancier diplômé d’État'], [
  ['Formation', `${A.auxiliaire_heures} h avec évaluation`, `${A.dea_heures} h après sélection`],
  ['Ce que le texte lui confie', 'conduire le VSL et l’ambulance, être l’équipier de l’ambulancier', 'prise en soin et transport des patients sur prescription médicale'],
  ['Sélection', 'aucune prévue par l’arrêté', 'dossier noté, puis entretien'],
  ['Texte', 'arrêté du 11 avril 2022, art. 2', 'même arrêté, art. 1er et annexe I'],
], 'Source : arrêté du 11 avril 2022, version consolidée lue le 4 octobre 2026')}
<p>Le mini-simulateur ci-dessus compare le temps nécessaire avant de pouvoir travailler, selon le nombre d’heures que vous pouvez consacrer chaque semaine à la formation.</p>

<h3>L’auxiliaire : entrer vite</h3>
<p>La formation d’auxiliaire porte sur l’hygiène, les valeurs du métier, la relation avec l’équipe et les patients, l’ergonomie, les gestes de portage et de brancardage, et les règles du transport sanitaire. Elle donne le droit de conduire et d’accompagner, pas celui d’assurer seul la prise en soin. Elle convient à qui veut voir le métier de l’intérieur avant un cursus long, ou a besoin d’un salaire rapidement.</p>

<h3>Le diplômé d’État : le métier complet</h3>
<p>L’annexe I de l’arrêté présente l’ambulancier comme un professionnel de santé. Son diplôme couvre le recueil de données cliniques, les soins adaptés à l’état du patient, y compris en urgence, l’entretien du véhicule et le travail en équipe. Le cursus, la sélection et les allègements sont décrits sur la page ${h.a('formation-ambulancier', 'formation d’ambulancier')} : on ne les répète pas ici.</p>

<h2>Le socle commun aux deux portes</h2>
<p>Avant toute inscription, vérifiez quatre points, exigés à l’identique par l’article 2 pour l’auxiliaire et par l’article 7 pour le candidat au diplôme :</p>
<ol>
<li>un permis de conduire valide et sorti de la période probatoire ;</li>
<li>l’attestation préfectorale d’aptitude à la conduite d’ambulance, délivrée après un examen médical ;</li>
<li>un certificat médical de non-contre-indication à la profession ;</li>
<li>un certificat de vaccinations conforme à la réglementation.</li>
</ol>
<p>S’y ajoute l’attestation de formation aux gestes et soins d’urgence de niveau 2, demandée à l’auxiliaire (article 2) et exigée du diplômé avant la proclamation des résultats (article 27). Un permis encore probatoire est donc le premier obstacle à regarder : aucune des deux formations ne l’accepte.</p>

<h2>Passer d’auxiliaire à diplômé</h2>
<p>Les deux portes communiquent. Quelques semaines d’expérience suffisent pour échapper au stage d’observation : ${PASSERELLE.auxiliaire_mois_sans_stage} mois comme auxiliaire, en continu ou non, au cours des ${PASSERELLE.periode_ans} dernières années (article 6). Avec ${PASSERELLE.auxiliaire_ans_dossier_seul} an d’activité continue dans une ou plusieurs entreprises de transport sanitaire sur la même période, la sélection se limite à un dossier d’admission (article 9). Commencer comme auxiliaire n’est donc pas une impasse : c’est une manière de tester le métier en étant payé.</p>

<h2>Ambulance, VSL, taxi conventionné : ne pas confondre</h2>
<p>Trois véhicules transportent des patients, avec trois cadres différents.</p>
<ul>
<li><strong>L’ambulance</strong> est le véhicule de l’équipage : l’auxiliaire peut la conduire et y être l’équipier, l’ambulancier diplômé y assure la prise en soin.</li>
<li><strong>Le véhicule sanitaire léger (VSL)</strong> fait aussi partie du transport sanitaire : l’article 2 autorise l’auxiliaire à le conduire. Son fonctionnement propre n’est pas traité sur cette page.</li>
<li><strong>Le taxi conventionné</strong> n’est pas un véhicule sanitaire. C’est un taxi dont l’exploitant a signé une convention avec l’Assurance maladie pour le transport assis de personnes malades, sur le modèle de la décision du 13 février 2025 qui fixe les tarifs. Service-public précise que ces taxis ont jusqu’au ${h.date(CPAM_EQUIPEMENT_AVANT)} pour s’équiper d’une géolocalisation certifiée et du système électronique de facturation intégré (SEFI).</li>
</ul>
<p>Le conducteur d’un taxi conventionné passe par l’examen de la chambre de métiers, la carte professionnelle de taxi et l’${h.a('licence-taxi', 'autorisation de stationnement')} : c’est le parcours décrit sur ${h.a('devenir-taxi', 'devenir chauffeur de taxi')}, qui détaille aussi le conventionnement. Les diplômes d’ambulancier n’y donnent aucun droit, et la carte de taxi ne permet pas de travailler en ambulance.</p>

<h2>Trouver un emploi salarié</h2>
<p>Le débouché principal est l’entreprise de transport sanitaire privée, celle qui accueille aussi les stages. Ses salariés relèvent de la convention collective nationale des transports routiers et activités auxiliaires du transport du 21 décembre 1950. Leurs salaires minimaux sont fixés par l’accord du 16 février 2004 relatif aux rémunérations des personnels ambulanciers, mis à jour par avenants. Le dernier, l’avenant n° 8 du 6 mai 2025, étendu à toutes les entreprises du secteur, prévoit trois niveaux d’ambulancier et une indemnité pour le travail des dimanches et jours fériés.</p>
<p>Un point mérite votre attention avant de signer : pour ${sousSmic} des trois niveaux, le taux d’embauche de la grille est inférieur au Smic 2026, si bien que c’est le Smic qui s’applique. L’avenant ne dit pas quel poste relève de quel niveau ; demandez-le par écrit à l’employeur. Les chiffres et le calcul mensuel sont sur la page ${h.a('salaire-ambulancier', 'salaire d’ambulancier')}.</p>
<p>L’arrêté mentionne aussi les services hospitaliers chargés du transport sanitaire, comme lieux du stage d’observation. Les règles d’embauche à l’hôpital relèvent d’autres textes, que cette page ne couvre pas.</p>

<h2>Par où commencer cette semaine</h2>
<ol>
<li>Vérifiez la date de fin de votre période probatoire sur votre permis.</li>
<li>Renseignez-vous auprès de votre préfecture sur l’examen médical qui conduit à l’attestation d’aptitude à la conduite d’ambulance.</li>
<li>Faites le point sur vos vaccinations avec votre médecin.</li>
<li>Choisissez la porte : auxiliaire pour travailler vite, diplôme d’État pour le métier complet, ou les deux à la suite.</li>
<li>Chiffrez la dépense avec le ${h.a('cout-acces-metier', 'simulateur de coût d’accès')}, en saisissant le devis de l’institut.</li>
</ol>
`,
  },
  en: {
    slug: 'become-an-ambulance-driver',
    nav: 'Becoming an ambulance worker',
    card: 'Assistant or qualified ambulancier, what each one does, how it differs from medical taxis, finding work.',
    title: 'Become an Ambulance Driver in France 2026: Two Routes',
    description: `Becoming an ambulance driver in France, 2026: start as an assistant after ${A.auxiliaire_heures} hours or take the State diploma; licence, health checks and patient-transport jobs.`,
    h1: 'How to become an ambulance worker in France',
    intro: 'Patient transport has a fast way in and a long one, and the one you pick sets what you are allowed to do on the job.',
    resume: `French rules recognise two ambulance jobs, both set out in the ministerial order of 11 April 2022. An auxiliaire ambulancier (ambulance assistant) completes a ${A.auxiliaire_heures}-hour course and may then drive a VSL (véhicule sanitaire léger, a light car used for seated patient transport) or an ambulance, and work as the qualified ambulancier’s crewmate (article 2). A holder of the DEA (diplôme d’État d’ambulancier, the State diploma) is described as a health and patient-transport professional who cares for and transports patients on medical prescription (annex I); that diploma takes ${A.dea_heures} hours plus a selection process. Both routes require a driving licence past its probationary period, a prefecture certificate of fitness to drive an ambulance, a medical certificate, up-to-date vaccinations and the AFGSU 2 emergency care certificate. Most jobs are in private patient-transport companies, where pay follows the road transport collective agreement (convention collective, the sector-wide contract negotiated by unions and employers) and its 16 February 2004 pay agreement.`,
    faqs: [
      { q: 'What can an ambulance assistant do that a qualified ambulancier cannot, and the other way round?', a: `The order lets the assistant drive the VSL and the ambulance and act as the ambulancier’s teammate inside the ambulance (article 2). Caring for the patient on medical prescription belongs to the qualified ambulancier (annex I). The assistant’s course is ${A.auxiliaire_heures} hours with no selection set by the order; the diploma takes ${A.dea_heures} hours and a file plus interview.` },
      { q: 'If I start as an assistant, how soon can I move up to the diploma?', a: `Quite soon. With ${PASSERELLE.auxiliaire_mois_sans_stage} month of assistant work in the last ${PASSERELLE.periode_ans} years, you no longer need the observation placement before applying (article 6). With ${PASSERELLE.auxiliaire_ans_dossier_seul} year of continuous work for one or more patient-transport firms in that period, selection shrinks to an admission file and no interview (article 9). The assistant job can work as a paid trial of the profession.` },
      { q: 'Is driving a medical taxi the same as being an ambulance driver?', a: 'No. A taxi conventionné (approved medical taxi) is an ordinary taxi whose operator has signed an agreement with the national health insurance fund to carry seated patients, using the model of the decision of 13 February 2025, which sets the fares. The driver needs a taxi card from the chamber of trades exam and a taxi licence. Ambulance qualifications play no part, and a taxi card does not let you work in an ambulance.' },
      { q: 'Which collective agreement covers ambulance staff in private firms?', a: 'The national collective agreement for road transport and related activities of 21 December 1950. Within it, ambulance pay is set by the agreement of 16 February 2004, updated by amendments. Amendment no. 8 of 6 May 2025 has applied since 1 June 2025 and was extended by an order of 22 July 2025, which makes it binding on every firm in the sector, union member or not.' },
      { q: 'Does an ambulance need a different licence category from a car?', a: 'The 2022 order does not mention one. It asks for a licence that complies with the rules, is valid and is past its probationary period, together with the prefecture certificate of fitness to drive an ambulance, which you obtain after a medical examination. Assistants need that certificate under article 2 and diploma candidates under article 7, so plan the medical appointment early whichever route you take.' },
    ],
    body: (h) => `
<h2>Two routes into the same vehicle</h2>
<p>In France, “ambulancier” is not just a driving job. The 2022 order splits the work between two people with different rights, and you choose which one you want to be.</p>
${h.table(['', 'Ambulance assistant', 'Qualified ambulancier (DEA)'], [
  ['Training', `${A.auxiliaire_heures} h, assessed`, `${A.dea_heures} h, after selection`],
  ['What the rules let you do', 'drive the VSL and the ambulance, crew alongside the ambulancier', 'care for and transport patients on medical prescription'],
  ['Entry selection', 'none in the order', 'scored file, then interview'],
  ['Legal basis', 'order of 11 April 2022, art. 2', 'same order, art. 1 and annex I'],
], 'Source: order of 11 April 2022, consolidated version read on 4 October 2026')}
<p>Use the calculator above to see how many weeks each route takes at the pace you can manage.</p>

<h3>The assistant route</h3>
<p>The ${A.auxiliaire_heures}-hour course teaches hygiene, professional conduct, how to deal with patients and colleagues, safe lifting, stretcher work and patient-transport rules. You come out able to drive and assist, not to lead patient care. It suits anyone who wants to earn quickly or see the job from the inside before committing to a long course.</p>

<h3>The diploma route</h3>
<p>The DEA makes you a health professional in your own right. Its content runs from clinical observation and emergency care to vehicle checks and teamwork. Selection, course hours and credit for previous health qualifications are explained in ${h.a('formation-ambulancier', 'ambulance training (DEA)')}, so we do not repeat them here.</p>

<h2>What both routes ask of you</h2>
<p>Articles 2 and 7 of the order set the same entry checks for assistants and diploma candidates:</p>
<ul>
<li>a valid driving licence that has left its probationary period. If you hold a foreign licence, find out first whether it must be exchanged for a French one;</li>
<li>the prefecture’s certificate of fitness to drive an ambulance, given after a medical examination (the préfecture is the State’s local office in each département);</li>
<li>a certificate from a doctor stating that nothing prevents you from doing the job;</li>
<li>proof that your vaccinations meet the rules.</li>
</ul>
<p>You will also need the AFGSU 2, the level 2 certificate in emergency gestures and care: assistants before they start (article 2), diploma students before the jury can pass them (article 27). If you passed your test recently, check your probation end date before anything else, because neither course will take you until it is over.</p>

<h2>From assistant to diploma</h2>
<p>The two routes are linked, which is good news if you are not sure yet. ${PASSERELLE.auxiliaire_mois_sans_stage} month of assistant work in the past ${PASSERELLE.periode_ans} years removes the observation placement (article 6). A full year of continuous work for patient-transport firms in that window reduces selection to a single admission file (article 9).</p>

<h2>Ambulance, VSL or medical taxi</h2>
<p>Three kinds of vehicle carry patients in France, and they belong to different worlds.</p>
<ul>
<li><strong>Ambulance</strong>: crewed vehicle; the assistant may drive it or be the second crew member, the qualified ambulancier provides the care.</li>
<li><strong>VSL</strong>: a patient-transport car that the assistant is also allowed to drive (article 2). We do not cover its own rules on this page.</li>
<li><strong>Taxi conventionné</strong>: not a health vehicle at all, but a taxi whose operator has an agreement with the health insurance fund to carry seated patients at fares set by the 13 February 2025 decision. Service-public adds that such taxis have until ${h.date(CPAM_EQUIPEMENT_AVANT)} to fit certified geolocation and the SEFI electronic billing system.</li>
</ul>
<p>A medical taxi driver follows the taxi route: the chamber of trades exam, a taxi driver card and a ${h.a('licence-taxi', 'taxi licence')}. That path, including the health insurance agreement, is set out in ${h.a('devenir-taxi', 'how to become a taxi driver')}.</p>

<h2>Getting hired</h2>
<p>Most ambulance staff are employees of private patient-transport firms, the same firms that host training placements. Their contracts fall under the national collective agreement for road transport of 21 December 1950. Pay floors come from the 16 February 2004 agreement on ambulance staff pay, last updated by amendment no. 8 of 6 May 2025, which sets three ambulance levels and an allowance for Sunday and bank holiday work.</p>
<p>Read the offer closely. At ${sousSmic} of the three levels, the hiring rate in the scale is below the 2026 Smic (France’s statutory minimum wage), so the Smic is what you are actually owed. The amendment does not say which job sits at which level, so ask the employer to put your level in writing. Hourly rates and a monthly calculation are on ${h.a('salaire-ambulancier', 'ambulance worker pay')}.</p>
<p>The order also names hospital patient-transport units as places for the observation placement. Hospital recruitment follows other rules, outside the scope of this guide.</p>

<h2>A first-week checklist</h2>
<ol>
<li>Find the end date of your licence probation.</li>
<li>Ask your préfecture how to book the medical examination for the ambulance driving certificate.</li>
<li>Check your vaccination record with a GP.</li>
<li>Decide on a route, or plan both in sequence.</li>
<li>Price it all in the ${h.a('cout-acces-metier', 'start-up cost calculator')} using a real institute quote.</li>
</ol>
`,
  },
});
