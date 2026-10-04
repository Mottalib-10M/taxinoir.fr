import { defineGuide } from '../../lib/guide-types';
import { P } from '../../lib/engine/params';

// Valeurs lues dans params-2026.json, bloc `bus` : code de la route, R221-4 et R221-5 ; code des transports,
// R3314-2 à R3314-8 (qualification initiale) et R3314-10 à R3314-14 (formation continue). Lus le 4 octobre 2026.
const B = P.bus;

export default defineGuide({
  id: 'devenir-chauffeur-bus',
  group: 'autres',
  order: 100,
  mini: 'permisBus',
  miniHref: 'salaire-chauffeur-bus',
  related: ['salaire-chauffeur-bus', 'capacite-transport-personnes', 'licence-transport', 'devenir-taxi', 'devenir-chauffeur-vtc'],
  sources: ['crR221', 'ctFimo', 'ctFco', 'crR311_1', 'nomenclatureTrv'],
  fr: {
    slug: 'devenir-chauffeur-bus',
    nav: 'Devenir chauffeur de bus',
    card: 'Permis D, qualification initiale de 140 ou 280 heures, âges minimaux et formation continue tous les cinq ans.',
    title: 'Devenir chauffeur de bus en 2026 : permis D, FIMO et FCO',
    description: `Devenir chauffeur de bus ou de car en 2026 : permis D à ${B.age_permis_d} ans, ou plus tôt avec la FIMO de ${B.fimo_acceleree_h} h ou la formation de ${B.fimo_longue_h} h, puis FCO de ${B.fco_h} h tous les ${B.fco_periodicite_ans} ans.`,
    h1: 'Devenir chauffeur de bus ou de car : permis, qualification, âge',
    intro: 'Deux titres se superposent pour conduire un car : le permis D, et la qualification professionnelle qui en fait un métier.',
    resume: `Pour conduire un bus ou un car en France, il faut le permis D, qui couvre les véhicules conçus pour plus de ${B.d_passagers_plus_de} passagers en plus du conducteur, et la qualification initiale de conducteur. Le code de la route fixe l’âge du permis D à ${B.age_permis_d} ans et celui du permis D1, limité à ${B.d1_passagers_max} passagers et ${B.d1_longueur_max_m} mètres, à ${B.age_permis_d1} ans, permis B obligatoire avant (article R221-5). La qualification initiale abaisse ces âges : après la formation longue de ${B.fimo_longue_h} heures, on conduit un car dès ${B.age_longue_d} ans, ${B.age_longue_d_national} ans en France seulement, et même ${B.age_longue_d_ligne} ans sur les lignes régulières de ${B.ligne_km_max} km au plus ; après la formation accélérée de ${B.fimo_acceleree_h} heures, la FIMO, dès ${B.age_acceleree_d} ans, ou ${B.age_acceleree_d_ligne} ans sur ces lignes courtes (articles R3314-4 et R3314-6 du code des transports). Ensuite, une formation continue de ${B.fco_h} heures, la FCO, est obligatoire tous les ${B.fco_periodicite_ans} ans.`,
    faqs: [
      { q: 'À quel âge peut-on conduire un car en France ?', a: `Le permis D s’obtient à ${B.age_permis_d} ans révolus (article R221-5 du code de la route). La qualification initiale permet de commencer plus tôt : dès ${B.age_acceleree_d} ans après la FIMO accélérée de ${B.fimo_acceleree_h} heures, et dès ${B.age_longue_d_national} ans en France après la formation longue de ${B.fimo_longue_h} heures. Sur les lignes régulières de ${B.ligne_km_max} km au plus, ces âges descendent à ${B.age_acceleree_d_ligne} et ${B.age_longue_d_ligne} ans.` },
      { q: 'Quelle différence entre le permis D et le permis D1 ?', a: `Le permis D1 couvre les véhicules conçus pour ${B.d1_passagers_max} passagers au plus, hors conducteur, d’une longueur de ${B.d1_longueur_max_m} mètres au plus ; il s’obtient à ${B.age_permis_d1} ans. Le permis D couvre tous les véhicules de plus de ${B.d_passagers_plus_de} passagers, sans limite de longueur, et s’obtient à ${B.age_permis_d} ans. Les deux exigent d’avoir déjà le permis B (article R221-5 du code de la route).` },
      { q: 'Combien d’heures dure la FIMO voyageurs ?', a: `La formation accélérée dure au moins ${B.fimo_acceleree_h} heures, sur ${B.fimo_acceleree_semaines} semaines obligatoirement consécutives (article R3314-5 du code des transports). La formation longue, qui ouvre la conduite plus jeune, dure au moins ${B.fimo_longue_h} heures (article R3314-2). Un conducteur déjà qualifié en marchandises qui passe aux voyageurs suit une formation complémentaire de ${B.complementaire_h} heures (articles R3314-7 et R3314-8).` },
      { q: 'La FCO peut-elle se faire en plusieurs fois ?', a: `Oui. Les ${B.fco_h} heures de formation continue se suivent soit sur ${B.fco_jours} jours consécutifs, soit de façon fractionnée, par séquences d’au moins ${B.fco_sequence_min_h} heures (article R3314-11 du code des transports). La formation peut être achevée par anticipation dans l’année qui précède l’échéance (article R3314-12). Elle vaut pour les voyageurs comme pour les marchandises (article R3314-13).` },
      { q: 'Que se passe-t-il si la FCO n’a pas été faite à temps ?', a: `Le conducteur ne peut plus conduire un véhicule qui exige la qualification. L’article R3314-14 du code des transports impose à celui qui a dépassé le délai de suivre la formation continue de ${B.fco_h} heures avant de reprendre l’activité. Le mini-simulateur en haut de page calcule le temps qui reste avant l’échéance des ${B.fco_periodicite_ans} ans à partir de votre dernière formation.` },
    ],
    body: (h) => `
<h2>Deux titres, deux logiques</h2>
<p>Le permis D est un permis de conduire : il dit quels véhicules vous savez conduire. La qualification initiale de conducteur, que tout le monde appelle FIMO, est une qualification professionnelle : elle dit que vous pouvez conduire ces véhicules pour transporter des voyageurs. Le code des transports exige les deux pour les conducteurs de véhicules de transport de personnes. Les formations les combinent souvent, mais les textes, les âges et les durées sont distincts.</p>
<p>Le métier lui-même se décline en plusieurs emplois : lignes régulières interurbaines, transport scolaire, services occasionnels, tourisme et grand tourisme, réseaux urbains. La page ${h.a('salaire-chauffeur-bus', 'salaire d’un chauffeur de bus')} détaille la grille de la convention collective pour chacun de ces emplois.</p>

<h2>Le permis : D ou D1</h2>
<p>L’${h.src('crR221', 'article R221-4 du code de la route')} définit les catégories. Le permis D1 vise les véhicules conçus et construits pour transporter ${B.d1_passagers_max} passagers au plus, non compris le conducteur, d’une longueur de ${B.d1_longueur_max_m} mètres au plus. Le permis D vise les véhicules conçus pour plus de ${B.d_passagers_plus_de} passagers, non compris le conducteur. Les catégories D1E et DE ajoutent une remorque de plus de ${B.remorque_kg} kg.</p>
${h.table(['Catégorie', 'Véhicules', 'Âge minimal du permis'], [
  ['D1', `${B.d1_passagers_max} passagers au plus, ${B.d1_longueur_max_m} m au plus`, `${B.age_permis_d1} ans`],
  ['D', `plus de ${B.d_passagers_plus_de} passagers`, `${B.age_permis_d} ans`],
], 'Source : code de la route, articles R221-4 et R221-5 ; permis B exigé au préalable')}
<p>Le code de la route classe ces véhicules parmi les véhicules de transport en commun, de catégorie M2 ou M3 (${h.src('crR311_1', 'article R311-1')}). Le permis lourd s’accompagne d’un contrôle médical de l’aptitude à la conduite, prévu par l’article R221-10 du même code : renseignez-vous sur les modalités auprès de votre préfecture avant de vous inscrire.</p>

<h2>La qualification initiale : longue ou accélérée</h2>
<p>Le ${h.src('ctFimo', 'code des transports')} prévoit deux formations de qualification initiale, qui n’ouvrent pas les mêmes âges :</p>
${h.table(['Formation', 'Durée minimale', 'Car (D) dès', 'Minibus (D1) dès'], [
  ['Longue (R3314-2)', `${B.fimo_longue_h} h`, `${B.age_longue_d} ans ; ${B.age_longue_d_national} ans en France ; ${B.age_longue_d_ligne} ans sur ligne régulière de ${B.ligne_km_max} km au plus`, `${B.age_longue_d1} ans ; ${B.age_longue_d1_national} ans en France`],
  ['Accélérée, ou FIMO (R3314-5)', `${B.fimo_acceleree_h} h sur ${B.fimo_acceleree_semaines} semaines consécutives`, `${B.age_acceleree_d} ans ; ${B.age_acceleree_d_ligne} ans sur ligne régulière de ${B.ligne_km_max} km au plus`, `${B.age_acceleree_d1} ans`],
], 'Source : code des transports, articles R3314-2 à R3314-6, lus sur Légifrance le 4 octobre 2026')}
<p>La formation longue vise surtout les jeunes : elle permet de conduire un car dès ${B.age_longue_d_ligne} ans sur les lignes régulières nationales de ${B.ligne_km_max} km au plus, ou sans passagers, avec des mesures spécifiques pour le transport scolaire avant ${B.age_longue_d_national} ans. La FIMO accélérée est la voie habituelle de la reconversion : quatre semaines de formation intensive, souvent couplées au permis D dans le même parcours.</p>
<p>Un conducteur qui a déjà la qualification pour les marchandises et passe aux voyageurs, ou l’inverse, ne refait pas tout : il suit une formation complémentaire de ${B.complementaire_h} heures (articles R3314-7 et R3314-8).</p>

<h2>La formation continue tous les cinq ans</h2>
<p>La qualification ne s’acquiert pas une fois pour toutes. L’${h.src('ctFco', 'article R3314-10')} impose à chaque conducteur une formation continue obligatoire tous les ${B.fco_periodicite_ans} ans, la FCO. Elle dure ${B.fco_h} heures (article R3314-11), suivies en ${B.fco_jours} jours consécutifs ou en séquences d’au moins ${B.fco_sequence_min_h} heures. Elle peut être achevée par anticipation dans l’année qui précède l’échéance (article R3314-12), et une même FCO permet de conduire indifféremment des véhicules de voyageurs ou de marchandises (article R3314-13).</p>
<p>Celui qui laisse passer l’échéance doit suivre la formation continue avant de reprendre la conduite (article R3314-14). Le mini-simulateur en haut de page vous donne l’âge minimal selon votre formation et le service visé, et le temps qui reste avant votre prochaine FCO.</p>

<h2>Les employeurs et les emplois</h2>
<p>La convention collective des transports routiers décrit les emplois de conducteur dans sa ${h.src('nomenclatureTrv', 'nomenclature du personnel roulant voyageurs')} : conducteur de car, conducteur-receveur qui perçoit aussi les recettes, conducteur affecté aux services librement organisés (coefficient 142 V), conducteur de tourisme (145 V), conducteur grand tourisme (150 V) et grand tourisme confirmé (155 V). Le conducteur de tourisme doit avoir au moins deux ans de pratique ; le grand tourisme confirmé, huit ans dont quatre au coefficient 150 V. Les conducteurs en période scolaire sont au coefficient 140 V depuis le 1er septembre 2022, sauf ceux des services dédiés aux personnes handicapées ou à mobilité réduite (${h.src('avenantTrv115', 'avenant n° 115')}).</p>
<p>Les réseaux urbains, eux, relèvent d’une autre convention collective, avec leurs propres grilles. Avant de payer une formation, interrogez les employeurs de votre bassin sur leurs modalités de recrutement et de formation : c’est une question à poser dès le premier entretien.</p>

<h2>Le parcours type d’une reconversion</h2>
<ol>
<li>Vérifier son permis B et passer le contrôle médical exigé pour les permis lourds.</li>
<li>Choisir entre la formation longue et la FIMO accélérée selon son âge et le service visé.</li>
<li>Passer le permis D, souvent dans le même centre et dans la même période que la FIMO.</li>
<li>Obtenir la qualification, puis postuler en ligne régulière, en scolaire ou en tourisme.</li>
<li>Noter la date d’échéance de la FCO, ${B.fco_periodicite_ans} ans après la qualification.</li>
</ol>
<p>Le car reste un métier salarié. Créer sa propre entreprise de transport collectif demande, en plus, l’attestation de ${h.a('capacite-transport-personnes', 'capacité de transport de personnes')} et une ${h.a('licence-transport', 'licence de transport')} communautaire. Pour un métier de conduite à son compte, les voies sont celles du ${h.a('devenir-taxi', 'taxi')} ou du ${h.a('devenir-chauffeur-vtc', 'VTC')}.</p>

<h2>Ce que cette page ne dit pas</h2>
<p>Les prix des formations, du permis D et de la FIMO varient d’un centre à l’autre et ne sont fixés par aucun texte : nous ne les publions pas. Nous ne citons aucun centre. Les épreuves du permis D, leur organisation et les délais d’examen relèvent d’autres textes que ceux lus pour cette page.</p>
`,
  },
  en: {
    slug: 'become-bus-driver',
    nav: 'Bus driver',
    card: 'D licence, initial qualification of 140 or 280 hours, minimum ages and refresher training every five years.',
    title: 'Become a Bus Driver in France 2026: D Licence, FIMO, FCO',
    description: `Bus or coach driver in France, 2026: D licence at ${B.age_permis_d}, or younger with the ${B.fimo_acceleree_h}-hour FIMO or the ${B.fimo_longue_h}-hour course, then a ${B.fco_h}-hour refresher every ${B.fco_periodicite_ans} years.`,
    h1: 'Becoming a bus or coach driver in France',
    intro: 'Two separate qualifications stack up for coach driving in France: the D licence, and the professional qualification that turns it into a job.',
    resume: `To drive a bus or coach in France you need a D licence, which covers vehicles designed for more than ${B.d_passagers_plus_de} passengers besides the driver, plus the initial driver qualification. The Highway Code sets the minimum age at ${B.age_permis_d} for the D licence and ${B.age_permis_d1} for the D1 licence, limited to ${B.d1_passagers_max} passengers and ${B.d1_longueur_max_m} metres, with a car licence (category B) held first (article R221-5). The initial qualification lowers those ages. After the ${B.fimo_longue_h}-hour long course you may drive a coach from ${B.age_longue_d}, from ${B.age_longue_d_national} within France, and from ${B.age_longue_d_ligne} on scheduled routes of ${B.ligne_km_max} km or less. After the ${B.fimo_acceleree_h}-hour fast-track course, known as FIMO, the age is ${B.age_acceleree_d}, or ${B.age_acceleree_d_ligne} on those short routes (Transport Code, articles R3314-4 and R3314-6). After that, a ${B.fco_h}-hour refresher course, the FCO, is compulsory every ${B.fco_periodicite_ans} years.`,
    faqs: [
      { q: 'What is the minimum age to drive a coach in France?', a: `The D licence can be taken at ${B.age_permis_d} (article R221-5 of the Highway Code). The initial qualification lets you start earlier: from ${B.age_acceleree_d} after the ${B.fimo_acceleree_h}-hour fast-track FIMO, and from ${B.age_longue_d_national} within France after the ${B.fimo_longue_h}-hour long course. On scheduled routes of ${B.ligne_km_max} km or less, those ages drop to ${B.age_acceleree_d_ligne} and ${B.age_longue_d_ligne}.` },
      { q: 'Should I take the D1 or the full D licence?', a: `D1 covers vehicles designed for up to ${B.d1_passagers_max} passengers, driver excluded, and no longer than ${B.d1_longueur_max_m} metres; the minimum age is ${B.age_permis_d1}. The D licence covers any vehicle for more than ${B.d_passagers_plus_de} passengers with no length limit, from ${B.age_permis_d}. Most coach and bus jobs ask for the full D. Both require a category B licence first (article R221-5 of the Highway Code).` },
      { q: 'How long is the FIMO course for passenger transport?', a: `The fast-track course lasts at least ${B.fimo_acceleree_h} hours over ${B.fimo_acceleree_semaines} consecutive weeks (article R3314-5 of the Transport Code). The long course, which allows driving at a younger age, lasts at least ${B.fimo_longue_h} hours (article R3314-2). A driver already qualified for goods who moves to passengers takes a ${B.complementaire_h}-hour top-up course instead (articles R3314-7 and R3314-8).` },
      { q: 'Can the five-yearly FCO refresher be split up?', a: `Yes. The ${B.fco_h} hours can be taken over ${B.fco_jours} consecutive days or in blocks of at least ${B.fco_sequence_min_h} hours (article R3314-11 of the Transport Code). You may complete it early, within the year before the deadline (article R3314-12), and one FCO covers both passenger and goods vehicles (article R3314-13).` },
      { q: 'I missed my FCO deadline. Can I keep driving?', a: `No. Article R3314-14 of the Transport Code requires a driver who has gone past the deadline to complete the ${B.fco_h}-hour refresher before driving such vehicles again. The calculator at the top of the page works out the time left before your ${B.fco_periodicite_ans}-year deadline from the date of your last course.` },
    ],
    body: (h) => `
<h2>Two qualifications, two purposes</h2>
<p>The D licence is a driving licence: it shows which vehicles you can handle. The initial driver qualification, which everyone calls FIMO (formation initiale minimale obligatoire), is a professional qualification: it shows you may drive them for a living. French law requires both from anyone driving passenger vehicles commercially. Courses often bundle them, but the rules, ages and hours are separate.</p>
<p>The job itself comes in several forms: scheduled intercity routes, school runs, occasional hire, tourism and long-distance touring, and city bus networks. The ${h.a('salaire-chauffeur-bus', 'bus driver pay')} page sets out the collective agreement scale for each.</p>

<h2>The licence: D or D1</h2>
<p>${h.src('crR221', 'Article R221-4 of the Highway Code')} defines the categories. D1 covers vehicles designed and built for no more than ${B.d1_passagers_max} passengers, driver excluded, and no longer than ${B.d1_longueur_max_m} metres. D covers vehicles designed for more than ${B.d_passagers_plus_de} passengers, driver excluded. D1E and DE add a trailer over ${B.remorque_kg} kg.</p>
${h.table(['Category', 'Vehicles', 'Minimum licence age'], [
  ['D1', `up to ${B.d1_passagers_max} passengers, up to ${B.d1_longueur_max_m} m`, `${B.age_permis_d1}`],
  ['D', `more than ${B.d_passagers_plus_de} passengers`, `${B.age_permis_d}`],
], 'Source: Highway Code, articles R221-4 and R221-5; a category B licence is required first')}
<p>The Highway Code classes these as public transport vehicles, category M2 or M3 (${h.src('crR311_1', 'article R311-1')}). Heavy licences come with a medical fitness check under article R221-10 of the same code: ask your prefecture how it works before enrolling. If you hold a licence from outside the EU, check first whether it must be exchanged for a French one.</p>

<h2>Initial qualification: long or fast-track</h2>
<p>The ${h.src('ctFimo', 'Transport Code')} provides two initial qualification courses, which open different ages:</p>
${h.table(['Course', 'Minimum length', 'Coach (D) from', 'Minibus (D1) from'], [
  ['Long (R3314-2)', `${B.fimo_longue_h} h`, `${B.age_longue_d}; ${B.age_longue_d_national} within France; ${B.age_longue_d_ligne} on scheduled routes of ${B.ligne_km_max} km or less`, `${B.age_longue_d1}; ${B.age_longue_d1_national} within France`],
  ['Fast-track, or FIMO (R3314-5)', `${B.fimo_acceleree_h} h over ${B.fimo_acceleree_semaines} consecutive weeks`, `${B.age_acceleree_d}; ${B.age_acceleree_d_ligne} on scheduled routes of ${B.ligne_km_max} km or less`, `${B.age_acceleree_d1}`],
], 'Source: Transport Code, articles R3314-2 to R3314-6, read on Légifrance on 4 October 2026')}
<p>The long course is mostly for young people: it allows coach driving from ${B.age_longue_d_ligne} on domestic scheduled routes of ${B.ligne_km_max} km or less, or without passengers, with specific measures for school transport under ${B.age_longue_d_national}. The fast-track FIMO is the usual route for a career change: four intensive weeks, often combined with the D licence in a single programme.</p>
<p>A driver already qualified for goods who moves to passengers, or the other way round, does not start again: a ${B.complementaire_h}-hour top-up course is enough (articles R3314-7 and R3314-8).</p>

<h2>Refresher training every five years</h2>
<p>The qualification is not for life. ${h.src('ctFco', 'Article R3314-10')} requires every driver to take compulsory periodic training every ${B.fco_periodicite_ans} years, the FCO (formation continue obligatoire). It lasts ${B.fco_h} hours (article R3314-11), over ${B.fco_jours} consecutive days or in blocks of at least ${B.fco_sequence_min_h} hours. It may be completed up to a year early (article R3314-12), and one FCO covers both passenger and goods vehicles (article R3314-13).</p>
<p>A driver who misses the deadline must complete the course before driving again (article R3314-14). The calculator above gives your minimum age according to your course and the work you aim for, and the time left before your next FCO.</p>

<h2>Employers and job titles</h2>
<p>The road transport collective agreement lists driving jobs in its ${h.src('nomenclatureTrv', 'job classification for passenger driving staff')}: coach driver, driver-conductor who also handles fares, driver on commercial intercity coach services (coefficient 142 V), tourism driver (145 V), long-distance touring driver (150 V) and senior touring driver (155 V). A tourism driver needs at least two years’ experience; a senior touring driver eight years, four of them at coefficient 150 V. School-period drivers have been on coefficient 140 V since 1 September 2022, except on services dedicated to disabled or reduced-mobility passengers (${h.src('avenantTrv115', 'amendment no. 115')}).</p>
<p>City bus networks come under a different collective agreement, with their own pay scales. Before paying for a course, ask the employers in your area how they recruit and train new drivers; it is a fair question for a first interview. Training and the job run in French, and passengers expect clear spoken French on board.</p>

<h2>A typical career-change path</h2>
<ol>
<li>Check your category B licence and take the medical check required for heavy licences.</li>
<li>Choose between the long course and the fast-track FIMO, depending on your age and the work you want.</li>
<li>Take the D licence, often at the same centre and in the same period as the FIMO.</li>
<li>Obtain the qualification, then apply for scheduled routes, school runs or tourism.</li>
<li>Note your FCO deadline, ${B.fco_periodicite_ans} years after qualifying.</li>
</ol>
<p>Coach driving is a salaried job. Starting your own group transport firm also takes the ${h.a('capacite-transport-personnes', 'passenger transport competence certificate')} and a Community ${h.a('licence-transport', 'transport licence')}. For self-employed driving, the routes are ${h.a('devenir-taxi', 'taxi')} or ${h.a('devenir-chauffeur-vtc', 'VTC')} work.</p>

<h2>What this page leaves out</h2>
<p>The price of courses, the D licence and the FIMO varies between providers and is not set by any law, so we do not publish it, and we name no training centre. The D licence tests themselves, how they are organised and how long you wait for a slot are governed by texts other than those read for this page.</p>
`,
  },
});
