import { defineGuide } from '../../lib/guide-types';
import { P } from '../../lib/engine/params';

// Valeurs lues dans params-2026.json : bloc `vsl` (code de la santé publique, R6312-7 à R6312-10, version
// du 16 août 2026 ; L6312-1 à L6312-4 ; Ameli, page mise à jour le 30 septembre 2026) et bloc `ambulancier`
// (arrêté du 11 avril 2022, article 2 ; avenant n° 8 du 6 mai 2025).
const V = P.vsl;
const A = P.ambulancier;

export default defineGuide({
  id: 'devenir-chauffeur-vsl',
  group: 'ambulance',
  order: 40,
  mini: 'equipageVsl',
  miniHref: 'devenir-ambulancier',
  related: ['devenir-ambulancier', 'formation-ambulancier', 'salaire-ambulancier', 'taxi-conventionne', 'devenir-taxi', 'taxi-ou-vtc'],
  sources: ['cspR6312', 'cspL6312', 'arreteDea', 'ameliTransport', 'avenantAmbulanciers'],
  fr: {
    slug: 'devenir-chauffeur-vsl',
    nav: 'Devenir chauffeur VSL',
    card: 'Le VSL roule avec une seule personne à bord : qui peut la tenir, avec quelle formation et pour quel employeur.',
    title: 'Devenir chauffeur VSL en 2026 : formation, équipage, règles',
    description: `Devenir chauffeur VSL en 2026 : un seul membre d’équipage depuis le décret du 13 août 2026, auxiliaire après ${A.auxiliaire_heures} h ou diplôme d’État, employeur agréé par l’ARS.`,
    h1: 'Devenir chauffeur de VSL : le métier, les textes, la formation',
    intro: 'Le véhicule sanitaire léger se conduit seul, mais pas par n’importe qui : le code de la santé publique dit exactement qui peut s’asseoir au volant.',
    resume: `Le véhicule sanitaire léger (VSL) est la catégorie D des véhicules de transport sanitaire définie par l’article R6312-8 du code de la santé publique. Depuis le 16 août 2026, l’article R6312-10, réécrit par le décret n° 2026-787 du 13 août 2026, fixe son équipage à ${V.equipage_vsl} seule personne, titulaire du diplôme d’État d’ambulancier ou relevant du 3° de l’article R6312-7, quand l’ambulance en demande ${V.equipage_ambulance}. Pour conduire un VSL sans diplôme d’État, la voie courte est l’auxiliaire ambulancier : l’arrêté du 11 avril 2022 l’habilite à conduire le VSL et l’ambulance après une formation de ${A.auxiliaire_heures} heures avec évaluation des compétences, l’attestation de gestes et soins d’urgence de niveau 2, un permis sorti de la période probatoire, l’attestation préfectorale d’aptitude à la conduite d’ambulance, un certificat médical et des vaccinations à jour. On travaille alors pour une entreprise de transport sanitaire agréée par l’agence régionale de santé, sur prescription médicale.`,
    faqs: [
      { q: 'Faut-il le diplôme d’État d’ambulancier pour conduire un VSL ?', a: `Non. L’article R6312-10 du code de la santé publique, dans sa version du 16 août 2026, ouvre l’équipage du VSL aux titulaires du diplôme d’État et aux personnes du 3° de l’article R6312-7. L’arrêté du 11 avril 2022 habilite aussi l’auxiliaire ambulancier, formé en ${A.auxiliaire_heures} heures, à conduire le VSL (article 2). Le diplôme d’État, ${A.dea_heures} heures, reste nécessaire pour assurer la prise en soin dans l’ambulance.` },
      { q: 'Combien de personnes faut-il à bord d’un VSL ?', a: `Une seule. Depuis le décret n° 2026-787 du 13 août 2026, entré en vigueur le 16 août, l’article R6312-10 fixe l’équipage des véhicules de catégorie D à ${V.equipage_vsl} personne. Les ambulances des catégories A et C demandent ${V.equipage_ambulance} personnes, et jusqu’à ${V.equipage_bariatrique_max} pour un transport bariatrique, dont au moins un titulaire du diplôme d’État.` },
      { q: 'Peut-on être chauffeur de VSL à son compte ?', a: 'Seulement en créant une entreprise de transport sanitaire. L’article L6312-2 du code de la santé publique impose que toute personne qui effectue un transport sanitaire soit agréée au préalable par le directeur général de l’agence régionale de santé, et l’article L6312-4 soumet la mise en service de chaque véhicule à son autorisation. Une simple voiture et un statut de micro-entrepreneur ne suffisent pas.' },
      { q: 'Quelle différence pour le patient entre un VSL et un taxi conventionné ?', a: 'Pour l’Assurance maladie, ce sont deux formes de transport assis professionnalisé, prescrites par le médecin selon l’autonomie du patient. Le VSL relève du transport sanitaire et de son agrément par l’ARS ; le taxi conventionné reste un taxi, avec carte professionnelle, autorisation de stationnement et convention signée avec la caisse. Ameli précise qu’un trajet en taxi non conventionné n’est pas remboursé.' },
      { q: 'Quel salaire pour un conducteur de VSL salarié ?', a: `L’avenant n° 8 du 6 mai 2025 fixe trois niveaux d’ambulancier sans dire lequel correspond au conducteur de VSL. En 2026, les niveaux 1 et 2 sont sous le Smic horaire de ${A.smic_horaire.toString().replace('.', ',')} € : c’est donc le Smic qui s’applique. Le niveau 3 garantit ${A.taux_horaire_niveau3.toString().replace('.', ',')} € de l’heure. Votre niveau doit figurer sur votre contrat et sur chaque bulletin de paie.` },
    ],
    body: (h) => `
<h2>Le VSL dans le code de la santé publique</h2>
<p>Le transport sanitaire est défini par l’article L6312-1 : c’est le transport d’une personne malade, blessée ou parturiente, pour des raisons de soins ou de diagnostic, sur prescription médicale ou en cas d’urgence médicale, à bord d’un moyen de transport spécialement adapté. Le ${h.src('cspR6312', 'chapitre réglementaire')} range ces véhicules en quatre catégories : A pour l’ambulance de secours et de soins d’urgence, B pour la voiture de secours aux asphyxiés, C pour l’ambulance, D pour le véhicule sanitaire léger. Les normes de chaque catégorie sont renvoyées à un arrêté du ministre.</p>
<p>Le VSL transporte donc des patients assis, sur prescription, dans une voiture aménagée qui appartient à une entreprise de transport sanitaire. Ce n’est ni un taxi, ni un VTC : il ne prend aucun client dans la rue, ne travaille pas sur réservation commerciale et ne fixe pas son prix librement.</p>

<h2>Un seul membre d’équipage depuis le 16 août 2026</h2>
<p>Le décret n° 2026-787 du ${h.date(V.decret_equipages)} a réécrit l’article R6312-10, qui fixe la composition des équipages. Le texte en vigueur depuis le ${h.date(V.equipages_en_vigueur)} distingue trois cas :</p>
${h.table(['Véhicule', 'Équipage', 'Qualification exigée'], [
  ['A (secours et soins d’urgence) et C (ambulance)', `${V.equipage_ambulance} personnes, jusqu’à ${V.equipage_bariatrique_max} en bariatrique`, 'au moins un titulaire du diplôme d’État d’ambulancier'],
  ['B (voiture de secours aux asphyxiés)', `${V.equipage_ambulance} personnes au moins`, 'au moins une du 1° ou du 2° de l’article R6312-7'],
  ['D (véhicule sanitaire léger)', `${V.equipage_vsl} personne`, 'une personne du 1° ou du 3° de l’article R6312-7'],
], 'Source : code de la santé publique, article R6312-10, version en vigueur depuis le 16 août 2026')}
<p>Le 1° de l’article R6312-7 vise les titulaires du diplôme d’État d’ambulancier, le 2° les sapeurs-pompiers formés au secours d’urgence aux personnes. Le 3° regroupe d’autres personnes, notamment des professionnels de santé réglementés et des titulaires de certains certificats de secourisme. Quelle que soit la catégorie, tous doivent avoir le permis B et une attestation délivrée par le préfet après un examen médical passé dans les conditions des articles R221-10 et R221-11 du code de la route.</p>

<h2>La voie la plus courte : auxiliaire ambulancier</h2>
<p>L’${h.src('arreteDea', 'arrêté du 11 avril 2022')} a créé deux formations : le diplôme d’État d’ambulancier et la formation d’auxiliaire ambulancier. Son article 2 habilite l’auxiliaire à assurer la conduite du véhicule sanitaire léger et de l’ambulance, et à être l’équipier de l’ambulancier dans l’ambulance. Pour exercer, l’auxiliaire réunit :</p>
<ul>
<li>un permis de conduire en cours de validité, sorti de la période probatoire ;</li>
<li>l’attestation préfectorale d’aptitude à la conduite d’ambulance, délivrée après un examen médical ;</li>
<li>un certificat médical de non-contre-indication et un certificat de vaccinations conformes à la réglementation ;</li>
<li>l’attestation de formation de ${A.auxiliaire_heures} heures, avec évaluation des compétences ;</li>
<li>l’attestation de formation aux gestes et soins d’urgence de niveau 2 (AFGSU 2).</li>
</ul>
<p>La formation porte sur l’hygiène, les principes et les valeurs professionnels, la relation avec l’équipe et avec les patients, l’ergonomie et les gestes et postures lors des mobilisations. Elle se suit dans un institut de formation d’ambulanciers. L’institut peut refuser de délivrer l’attestation si les compétences acquises ne permettent pas d’exercer : la décision doit alors être motivée par écrit. Le mini-simulateur en haut de page vous dit, selon votre qualification, ce que vous pouvez conduire et combien d’heures il vous reste.</p>

<h2>Auxiliaire ou diplômé d’État : ce que change le VSL</h2>
<p>Avant le décret d’août 2026, la question se posait surtout pour l’ambulance, où l’équipage mêlait diplômé et auxiliaire. Le VSL, lui, n’embarque qu’une personne : c’est le métier où l’auxiliaire travaille le plus en autonomie. Il conduit, accueille le patient, l’aide à monter et à descendre, vérifie le bon de transport et gère la tournée.</p>
<p>Le diplôme d’État reste la porte vers la prise en soin. Il demande ${A.dea_heures} heures, dont ${A.dea_heures_institut} en institut et ${A.dea_heures_stage} en stage, après une sélection sur dossier et entretien. Un auxiliaire qui a travaillé quelques mois peut y accéder avec des allègements : la page ${h.a('formation-ambulancier', 'formation d’ambulancier')} détaille les durées, et la page ${h.a('devenir-ambulancier', 'devenir ambulancier')} compare les deux portes d’entrée.</p>

<h2>Pour qui travaille un chauffeur de VSL</h2>
<p>Pour une entreprise de transport sanitaire, presque toujours. L’${h.src('cspL6312', 'article L6312-2')} exige que toute personne effectuant un transport sanitaire soit agréée au préalable par le directeur général de l’agence régionale de santé (ARS), et que le refus soit motivé. L’article L6312-4 ajoute que, dans chaque département, la mise en service de chaque véhicule de transport sanitaire est soumise à l’autorisation du même directeur général. Ces deux verrous expliquent qu’on ne s’installe pas chauffeur de VSL comme on s’installe chauffeur de VTC.</p>
<p>Créer sa propre entreprise reste possible, mais c’est un autre projet : agrément, autorisations de véhicules, locaux, personnel, normes d’équipement. Le parcours de départ, pour un chauffeur, est le contrat de travail dans une entreprise agréée.</p>

<h2>Le patient du VSL : ce que dit l’Assurance maladie</h2>
<p>Le choix du véhicule ne revient ni au chauffeur ni à l’entreprise : c’est le médecin qui prescrit le mode de transport adapté à l’état de santé et à l’autonomie du patient. Selon ${h.src('ameliTransport', 'Ameli')}, page mise à jour le ${h.date(V.ameli_maj)}, le transport assis professionnalisé, VSL ou taxi conventionné, est prescrit quand le patient a besoin d’une aide technique pour se déplacer (béquille, déambulateur), de l’aide d’une tierce personne, ou du respect de règles d’hygiène particulières. L’ambulance est réservée aux patients qui doivent voyager allongés ou en position semi-assise, ou sous la surveillance d’une personne qualifiée.</p>
<p>Concrètement, le chauffeur de VSL transporte des patients qui marchent mal, se rendent à une dialyse, une séance de chimiothérapie, une consultation ou une sortie d’hospitalisation. Le geste d’accompagnement compte autant que la conduite.</p>

<h2>VSL ou taxi conventionné : deux métiers voisins</h2>
<p>Les deux véhicules transportent les mêmes patients assis, mais les chauffeurs ne relèvent pas du même droit. Le conducteur de VSL relève du transport sanitaire : agrément de l’entreprise par l’ARS, qualification d’ambulancier ou d’auxiliaire. Le chauffeur de taxi conventionné reste un chauffeur de taxi : carte professionnelle obtenue après l’examen de la chambre de métiers, autorisation de stationnement, puis convention avec la caisse primaire sur le modèle de la ${h.src('conventionCpam', 'décision du 13 février 2025')}. Le parcours de ce second métier est décrit sur la page ${h.a('devenir-taxi', 'devenir taxi')}.</p>
<p>La différence se voit aussi sur la fiche de paie ou le compte de résultat. Le chauffeur de VSL est salarié et suit la grille des ambulanciers. Le taxi conventionné est souvent artisan et vit de ses courses, comme l’explique la comparaison ${h.a('taxi-ou-vtc', 'taxi ou VTC')}.</p>

<h2>La rémunération : grille ambulancière et Smic</h2>
<p>Les salariés des entreprises de transport sanitaire relèvent de la convention collective des transports routiers, et leurs minima de l’${h.src('avenantAmbulanciers', 'avenant n° 8 du 6 mai 2025')}. L’avenant fixe trois niveaux d’ambulancier, à ${h.eur(A.taux_horaire_niveau1, 2)}, ${h.eur(A.taux_horaire_niveau2, 2)} et ${h.eur(A.taux_horaire_niveau3, 2)} de l’heure, et ne dit pas lequel correspond au conducteur de VSL. En 2026, le Smic horaire est de ${h.eur(A.smic_horaire, 2)} : les deux premiers niveaux sont relevés au Smic. La page ${h.a('salaire-ambulancier', 'salaire d’un ambulancier')} calcule le brut mensuel avec vos heures et vos dimanches.</p>

<h2>Le parcours en cinq étapes</h2>
<ol>
<li>Vérifier son permis : catégorie B, période probatoire terminée.</li>
<li>Passer l’examen médical et obtenir l’attestation préfectorale d’aptitude à la conduite d’ambulance.</li>
<li>Mettre ses vaccinations à jour et obtenir le certificat médical de non-contre-indication.</li>
<li>Suivre la formation d’auxiliaire de ${A.auxiliaire_heures} heures et l’AFGSU de niveau 2 dans un institut de formation d’ambulanciers.</li>
<li>Postuler dans une entreprise de transport sanitaire agréée, et demander par écrit le niveau de la grille retenu dans le contrat.</li>
</ol>
<p>Les instituts fixent eux-mêmes leurs tarifs : demandez un devis et renseignez-vous sur les financements possibles avant de vous inscrire. Nous ne citons aucun institut.</p>
`,
  },
  en: {
    slug: 'become-vsl-driver',
    nav: 'VSL driver',
    card: 'A VSL runs with one person on board: who that can be, the training and the employer.',
    title: 'Become a VSL Driver in France 2026: Training and Crew Rules',
    description: `VSL driver in France, 2026: one crew member since the decree of 13 August 2026, ambulance assistant after ${A.auxiliaire_heures} hours or State diploma, ARS-approved employer.`,
    h1: 'Driving a VSL in France: what the job is and how to qualify',
    intro: 'A VSL is the seated patient car of French healthcare transport, and the law spells out who may drive it alone.',
    resume: `A VSL (véhicule sanitaire léger, a light patient-transport car for seated patients) is category D of patient-transport vehicles under article R6312-8 of the French Public Health Code. Since 16 August 2026, article R6312-10, rewritten by Decree no. 2026-787 of 13 August 2026, sets its crew at ${V.equipage_vsl} person, who must hold the State ambulance diploma (DEA) or belong to the group in point 3 of article R6312-7; an ambulance needs ${V.equipage_ambulance}. The quick way in without the diploma is to train as an auxiliaire ambulancier (ambulance assistant): the order of 11 April 2022 allows assistants to drive VSLs and ambulances after a ${A.auxiliaire_heures}-hour course with a skills assessment, first-aid training level 2 (AFGSU 2), a licence past its probationary period, the prefecture’s ambulance driving certificate, a medical certificate and up-to-date vaccinations. The work is with a patient-transport firm approved by the regional health agency (ARS), carrying patients on a doctor’s prescription.`,
    faqs: [
      { q: 'Can I drive a VSL in France without the State ambulance diploma?', a: `Yes. Article R6312-10 of the Public Health Code, as in force since 16 August 2026, opens the VSL crew to DEA holders and to people in point 3 of article R6312-7. The order of 11 April 2022 also allows the ambulance assistant, trained in ${A.auxiliaire_heures} hours, to drive a VSL (article 2). The ${A.dea_heures}-hour State diploma is still needed to provide patient care in an ambulance.` },
      { q: 'Does a VSL still need two people on board?', a: `No. Decree no. 2026-787 of 13 August 2026, in force from 16 August, reduced the crew of category D vehicles to ${V.equipage_vsl} person under article R6312-10. Category A and C ambulances still need ${V.equipage_ambulance} people, and up to ${V.equipage_bariatrique_max} for bariatric transport, with at least one State diploma holder among them.` },
      { q: 'Could I run my own VSL as a self-employed driver?', a: 'Only by setting up a patient-transport company. Article L6312-2 of the Public Health Code requires anyone carrying out patient transport to be approved beforehand by the director general of the regional health agency (ARS), and article L6312-4 makes each vehicle put into service subject to the same director’s authorisation. A car and a micro-enterprise registration are not enough.' },
      { q: 'How does a VSL differ from a medical taxi for the patient?', a: 'For the health insurance fund, both are seated professional transport, chosen by the doctor according to how independent the patient is. A VSL belongs to patient transport and its ARS approval; a taxi conventionné is still a taxi, with a driver card, a licence and an agreement signed with the local fund. Ameli states that a ride in a non-approved taxi is not reimbursed.' },
      { q: 'What is the pay for an employed VSL driver?', a: `Amendment no. 8 of 6 May 2025 sets three ambulance levels without saying which one covers VSL drivers. In 2026 levels 1 and 2 are below the hourly Smic (minimum wage) of €${A.smic_horaire}, so the Smic applies. Level 3 guarantees €${A.taux_horaire_niveau3} an hour. Your level should appear on your contract and on every payslip.` },
    ],
    body: (h) => `
<h2>Where the VSL sits in French health law</h2>
<p>Article L6312-1 of the Public Health Code defines patient transport as carrying a sick, injured or pregnant person for care or diagnosis, on a doctor’s prescription or in a medical emergency, in a vehicle specially adapted for it. The ${h.src('cspR6312', 'regulatory chapter')} sorts road vehicles into four categories: A for the emergency care ambulance, B for the rescue vehicle for asphyxia cases, C for the standard ambulance and D for the light patient car, the VSL. A ministerial order sets the equipment standards for each.</p>
<p>So a VSL carries seated patients, on prescription, in a fitted car owned by a patient-transport company. It is neither a taxi nor a VTC (private hire car): it never picks up passengers in the street, takes no commercial bookings and does not set its own prices.</p>

<h2>One crew member since 16 August 2026</h2>
<p>Decree no. 2026-787 of ${h.date(V.decret_equipages)} rewrote article R6312-10, which sets crew sizes. The version in force since ${h.date(V.equipages_en_vigueur)} reads as follows:</p>
${h.table(['Vehicle', 'Crew', 'Qualification required'], [
  ['A (emergency care) and C (ambulance)', `${V.equipage_ambulance} people, up to ${V.equipage_bariatrique_max} for bariatric transport`, 'at least one State diploma holder'],
  ['B (rescue vehicle for asphyxia cases)', `at least ${V.equipage_ambulance} people`, 'at least one from point 1 or 2 of article R6312-7'],
  ['D (VSL)', `${V.equipage_vsl} person`, 'one person from point 1 or 3 of article R6312-7'],
], 'Source: Public Health Code, article R6312-10, version in force since 16 August 2026')}
<p>Point 1 of article R6312-7 covers holders of the State ambulance diploma; point 2 covers firefighters trained in emergency rescue. Point 3 groups other people, notably regulated health professionals and holders of certain first-aid certificates. Every crew member, whatever the vehicle, needs a category B licence and a certificate issued by the prefecture after a medical examination under articles R221-10 and R221-11 of the Highway Code.</p>

<h2>The short route: ambulance assistant</h2>
<p>The ${h.src('arreteDea', 'order of 11 April 2022')} created two courses: the State ambulance diploma and the ambulance assistant course. Its article 2 allows the assistant to drive the VSL and the ambulance, and to act as the qualified ambulancier’s crewmate inside the ambulance. To work, an assistant needs:</p>
<ul>
<li>a valid driving licence that is past its probationary period;</li>
<li>the prefecture’s certificate of fitness to drive an ambulance, issued after a medical examination;</li>
<li>a medical certificate stating no contraindication, plus proof of the vaccinations required by law;</li>
<li>the ${A.auxiliaire_heures}-hour course certificate, including a skills assessment;</li>
<li>the emergency care certificate level 2 (AFGSU 2), a hospital-standard first-aid qualification.</li>
</ul>
<p>The course covers hygiene, professional values, working with the team and with patients, ergonomics, and safe handling when moving patients. It is taught in an ambulance training institute (IFA). The institute may refuse the certificate if the trainee’s skills are not enough to do the job, in which case it must give its reasons in writing. All of it is in French, so a solid level of spoken French is a practical must. The calculator at the top of the page tells you what you may drive with your qualification and how many course hours remain.</p>

<h2>Assistant or diploma holder: what the VSL changes</h2>
<p>Before the August 2026 decree, the assistant’s role mattered mostly inside ambulances, where crews mixed both profiles. A VSL carries a single crew member, which makes it the job where an assistant works with the most independence: driving, greeting the patient, helping them in and out, checking the transport form and running the day’s round.</p>
<p>The State diploma remains the gateway to patient care. It takes ${A.dea_heures} hours, ${A.dea_heures_institut} in the institute and ${A.dea_heures_stage} on placements, after selection on file and interview. An assistant with a few months’ work behind them gets shortcuts: the ${h.a('formation-ambulancier', 'ambulance training')} page sets out the hours and the ${h.a('devenir-ambulancier', 'becoming an ambulance worker')} page compares both routes.</p>

<h2>Who employs VSL drivers</h2>
<p>Patient-transport companies, in almost every case. ${h.src('cspL6312', 'Article L6312-2')} requires anyone carrying out patient transport to be approved beforehand by the director general of the regional health agency (ARS, agence régionale de santé), with reasons given for any refusal. Article L6312-4 adds that, in each département, putting a patient-transport vehicle into service needs that director’s authorisation. Those two locks are why you cannot set up as a VSL driver the way you can as a VTC driver.</p>
<p>Founding your own company is possible but it is a different project: approval, vehicle authorisations, premises, staff and equipment standards. For a driver starting out, the realistic path is an employment contract with an approved firm.</p>

<h2>Who rides in a VSL, according to the health insurance fund</h2>
<p>Neither the driver nor the company chooses the vehicle: the doctor prescribes the transport suited to the patient’s health and independence. According to ${h.src('ameliTransport', 'Ameli')}, the national health insurance website, in a page updated on ${h.date(V.ameli_maj)}, seated professional transport, by VSL or approved taxi, is prescribed when a patient needs a walking aid such as crutches or a frame, help from another person, or special hygiene precautions. The ambulance is kept for patients who must travel lying down or half-seated, or under the watch of a qualified person.</p>
<p>In practice, VSL drivers take people with limited mobility to dialysis, chemotherapy, consultations or home after a hospital stay. Helping the patient matters as much as the driving.</p>

<h2>VSL or approved taxi: two neighbouring jobs</h2>
<p>Both carry the same seated patients, but the drivers fall under different law. The VSL driver works in patient transport: ARS approval of the company, an ambulance diploma or assistant qualification. The driver of a taxi conventionné (a taxi approved by the health insurance fund) is still a taxi driver: a professional card obtained through the chamber of trades exam, a taxi licence, then an agreement with the local fund based on the ${h.src('conventionCpam', 'decision of 13 February 2025')}. That second path is described in the ${h.a('devenir-taxi', 'becoming a taxi driver')} guide.</p>
<p>The difference shows in how you are paid, too. The VSL driver is an employee on the ambulance pay scale. The approved taxi driver is often self-employed and lives on fares, as the ${h.a('taxi-ou-vtc', 'taxi or VTC comparison')} explains.</p>

<h2>Pay: the ambulance scale and the minimum wage</h2>
<p>Employees of patient-transport companies come under the road transport collective agreement, with minimum rates set by ${h.src('avenantAmbulanciers', 'amendment no. 8 of 6 May 2025')}. It sets three ambulance levels, at ${h.eur(A.taux_horaire_niveau1, 2)}, ${h.eur(A.taux_horaire_niveau2, 2)} and ${h.eur(A.taux_horaire_niveau3, 2)} an hour, and does not say which one applies to VSL drivers. In 2026 the hourly Smic is ${h.eur(A.smic_horaire, 2)}, so the first two levels are lifted to it. The ${h.a('salaire-ambulancier', 'ambulance pay')} page works out the monthly gross from your hours and Sundays.</p>

<h2>Five steps to your first round</h2>
<ol>
<li>Check your licence: category B, probation over. A licence from outside the EU may first need exchanging for a French one.</li>
<li>Have the medical examination and get the prefecture’s ambulance driving certificate.</li>
<li>Bring vaccinations up to date and obtain the medical certificate.</li>
<li>Take the ${A.auxiliaire_heures}-hour assistant course and AFGSU 2 at an ambulance training institute.</li>
<li>Apply to an approved patient-transport firm and ask in writing which pay level your contract uses.</li>
</ol>
<p>Institutes set their own fees, so ask for a written quote and look into funding before you enrol. We do not name or recommend any institute.</p>
`,
  },
});
