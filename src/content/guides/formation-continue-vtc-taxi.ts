import { defineGuide } from '../../lib/guide-types';
import { P } from '../../lib/engine/params';

const A = P.acces;
const X = P.taxi;

// Valeurs lues dans params-2026.json ; source : (bloc `acces`) : fractionnement du stage de formation continue.
// Source lue : arrêté du 11 août 2017 relatif à la formation continue des conducteurs de taxi et de VTC, article 1er
// https://www.legifrance.gouv.fr/loda/id/JORFTEXT000035484647/
const STAGE_PERIODES = P.acces.stage_periodes;
const STAGE_PERIODE_HEURES = P.acces.stage_periode_heures;
const STAGE_FRACTION_MAX_MOIS = P.acces.stage_fraction_max_mois;
const MOBILITE_MODULE_MIN_HEURES = P.acces.mobilite_module_min_heures;

export default defineGuide({
  id: 'formation-continue-vtc-taxi',
  group: 'vtc',
  order: 70,
  mini: 'echeanceCarte',
  miniHref: 'calendrier-renouvellement',
  related: ['carte-vtc', 'calendrier-renouvellement', 'registre-vtc', 'licence-taxi', 'devenir-taxi'],
  sources: ['arreteFormationContinue', 'spVtc', 'spTaxi', 'arreteCarteVtc'],
  fr: {
    slug: 'formation-continue-vtc-taxi',
    nav: 'Formation continue et renouvellement',
    card: `Le stage de ${A.formation_continue_heures} heures tous les ${A.carte_validite_ans} ans, la demande de nouvelle carte et la mobilité des taxis.`,
    title: 'Renouvellement carte VTC 2026 : stage de 14 h et démarche',
    description: `Renouveler sa carte VTC ou taxi en 2026 : stage de formation continue de ${A.formation_continue_heures} h tous les ${A.carte_validite_ans} ans, ${A.formation_continue_avant_mois} mois avant l’échéance, puis demande en ligne à environ ${A.carte_pro_environ} €.`,
    h1: 'Formation continue VTC et taxi : renouveler sa carte tous les cinq ans',
    intro: 'Une carte professionnelle ne se prolonge pas d’elle-même : sans attestation de stage, pas de nouvelle carte.',
    resume: `La carte professionnelle de VTC comme celle de taxi est valable ${A.carte_validite_ans} ans. Pour la renouveler, le conducteur suit un stage de formation continue de ${A.formation_continue_heures} heures, soit deux jours, dans un centre de formation agréé ; service-public conseille de le faire ${A.formation_continue_avant_mois} mois avant la fin de validité. L’arrêté du 11 août 2017 fixe le cadre : présence obligatoire en salle, découpage possible en ${STAGE_PERIODES} demi-journées de ${STAGE_PERIODE_HEURES.toLocaleString('fr-FR')} heures sur ${STAGE_FRACTION_MAX_MOIS} mois au plus, trois modules imposés (droit du transport de personnes, réglementation propre au taxi ou au VTC, sécurité routière) et un module au choix. Le centre remet aussitôt une attestation. Le chauffeur VTC dépose ensuite sa demande de renouvellement en ligne sur Démarches simplifiées et paie environ ${A.carte_pro_environ} € pour la nouvelle carte, puis refait son inscription au registre des VTC. Le taxi suit le même stage ; s’il veut exercer hors du département de son examen, il ajoute un stage de mobilité de ${X.mobilite_heures} heures, ${X.mobilite_heures_paris} heures pour Paris.`,
    faqs: [
      { q: 'Quand réserver son stage de formation continue pour ne pas rouler avec une carte expirée ?', a: `Service-public recommande de suivre le stage ${A.formation_continue_avant_mois} mois avant la fin de validité de la carte, qui dure ${A.carte_validite_ans} ans. Ce délai laisse le temps de trouver une session, de recevoir l’attestation puis de déposer la demande de nouvelle carte en ligne et de la payer. Le mini-simulateur de cette page calcule le mois limite à partir de votre date de délivrance.` },
      { q: `Peut-on étaler le stage de ${A.formation_continue_heures} heures sur plusieurs semaines ?`, a: `Oui, dans une limite précise. L’arrêté du 11 août 2017 autorise à fractionner les ${A.formation_continue_heures} heures en ${STAGE_PERIODES} périodes de ${STAGE_PERIODE_HEURES.toLocaleString('fr-FR')} heures, réparties sur ${STAGE_FRACTION_MAX_MOIS} mois au maximum. C’est utile pour un chauffeur qui ne veut pas perdre deux journées de travail d’affilée. Tous les centres ne proposent pas ce format : demandez-le au moment de l’inscription.` },
      { q: 'Le stage de formation continue VTC peut-il se suivre en ligne ?', a: 'Non. L’arrêté du 11 août 2017 précise que la formation continue est dispensée en présentiel, dans un centre de formation agréé. Une session entièrement à distance ne permet donc pas d’obtenir une attestation valable pour le renouvellement. Les sessions sont aussi séparées par métier : un chauffeur VTC suit une session organisée pour les VTC, pas une session prévue pour les taxis.' },
      { q: 'Faut-il se réinscrire au registre des VTC après avoir reçu la nouvelle carte ?', a: `Oui. Service-public indique que tous les ${A.registre_validite_ans} ans, dès réception de la nouvelle carte professionnelle, il faut refaire une inscription sur le registre des exploitants de VTC, depuis son espace en ligne. Carte et inscription vivent au même rythme : laisser passer l’une bloque l’autre, et exercer sans inscription valable est une infraction pénale depuis la loi du 27 juin 2026.` },
      { q: 'Un chauffeur de taxi doit-il suivre un stage pour travailler dans un autre département ?', a: `Oui. La carte de taxi ne vaut que dans le département de l’examen. Pour en ajouter un, il faut un stage de mobilité de ${X.mobilite_heures} heures, ou ${X.mobilite_heures_paris} heures pour la zone de Paris, sur le territoire et la réglementation locale, puis une demande de nouvelle carte à environ ${A.carte_pro_environ} €. Service-public limite l’exercice à ${X.mobilite_max_departements} départements au plus.` },
      { q: 'Mon examen de taxi date de plus de cinq ans : puis-je encore demander ma carte ?', a: 'Oui. Service-public précise qu’aucun délai n’est imposé entre la réussite à l’examen et la demande de carte de taxi. Mais si la demande arrive plus de cinq ans après l’examen, il faut joindre une attestation de formation continue datant de moins de cinq ans. Concrètement, le stage de quatorze heures devient la première étape du dossier.' },
    ],
    body: (h) => `
<h2>Le calendrier : une échéance tous les cinq ans</h2>
<p>La carte de VTC et la carte de taxi ont la même durée de vie, ${A.carte_validite_ans} ans, et la même condition de renouvellement : une attestation de formation continue. Service-public conseille de suivre le stage ${A.formation_continue_avant_mois} mois avant la date de fin. Ce n’est pas une marge de confort : il faut trouver une session qui correspond à votre métier, la suivre, recevoir l’attestation, déposer la demande et attendre la fabrication de la carte. Aucun texte consulté ne fixe de délai de délivrance par la préfecture.</p>
<p>Le mini-simulateur ci-dessus donne le mois limite à partir de la date de délivrance de votre carte actuelle. Le ${h.a('calendrier-renouvellement', 'calendrier de renouvellement')} va plus loin : il aligne sur une même frise la carte, le registre, la visite du véhicule et, pour le taxi, la licence.</p>

<h2>Le stage de 14 heures, selon l’arrêté du 11 août 2017</h2>
<p>L’${h.src('arreteFormationContinue', 'arrêté du 11 août 2017')} est le texte qui décrit le stage. Il dure ${A.formation_continue_heures} heures. Il peut être suivi d’une traite, sur deux jours, ou découpé en ${STAGE_PERIODES} périodes de ${STAGE_PERIODE_HEURES.toLocaleString('fr-FR')} heures étalées sur ${STAGE_FRACTION_MAX_MOIS} mois au maximum. Il se déroule en présentiel, dans un centre de formation agréé. Chaque session est organisée soit pour des taxis, soit pour des VTC : on ne mélange pas les deux publics.</p>
<p>Le programme comporte trois modules obligatoires et un module à choisir :</p>
<ul>
<li>A, droit du transport public particulier de personnes ;</li>
<li>B, réglementation propre à l’activité de taxi ou à celle de VTC, selon la session ;</li>
<li>C, sécurité routière ;</li>
<li>puis un module parmi D, anglais, E, gestion et développement commercial, et F, prévention et secours civiques.</li>
</ul>
<p>À la fin, le centre remet sans délai une attestation de suivi, datée et signée par son représentant légal, sur un support durable. Gardez-en une copie numérique : elle est demandée pour la carte, et elle sert encore si la carte est perdue avant l’échéance suivante. Le stage n’est pas un examen : l’arrêté parle d’une attestation de suivi, pas d’une note.</p>
<p>Son prix n’est fixé par aucun texte. Chaque centre agréé fixe le sien, et nous n’en publions aucun faute de source officielle. La liste des centres se trouve sur le site de la CMA de votre département pour le VTC, selon service-public, et sur celui de la préfecture pour le taxi.</p>

<h2>VTC : la demande de nouvelle carte, puis le registre</h2>
<p>Avec l’attestation, le chauffeur VTC dépose sa demande sur le formulaire de renouvellement de Démarches simplifiées, uniquement en ligne. Après la demande, l’Imprimerie nationale envoie un courriel pour le paiement, environ ${h.eur(A.carte_pro_environ)}, comme pour une première carte. Le détail des pièces et des règles d’usage de la carte est sur la page ${h.a('carte-vtc', 'carte VTC')}.</p>
<p>La nouvelle carte déclenche une seconde démarche, souvent oubliée : refaire l’inscription au ${h.a('registre-vtc', 'registre des VTC')}, que service-public demande tous les ${A.registre_validite_ans} ans, dès réception de la carte. Depuis le ${h.date(A.loi_renforcement)}, l’exploitant doit aussi y déclarer ses conducteurs, le numéro de leur carte professionnelle et les plaques exploitées : un numéro de carte qui change doit donc être mis à jour.</p>

<h2>Taxi : le même stage, avec la mobilité en plus</h2>
<p>Pour le taxi, la règle de base est identique : ${A.formation_continue_heures} heures de formation continue ${A.formation_continue_avant_mois} mois avant la fin des ${A.carte_validite_ans} ans, dans une session organisée pour les taxis. La différence vient de la géographie. La carte de taxi ne vaut que dans le département où l’examen a été réussi.</p>
<p>Pour travailler ailleurs, le conducteur suit un stage de mobilité de ${X.mobilite_heures} heures, porté à ${X.mobilite_heures_paris} heures pour la zone des taxis parisiens. L’arrêté y consacre au moins ${MOBILITE_MODULE_MIN_HEURES} heures à la connaissance du territoire et autant à la réglementation locale. Avec l’attestation, il remplit le formulaire de demande de mobilité et obtient une nouvelle carte, environ ${h.eur(A.carte_pro_environ)}, qui indique les départements autorisés. Service-public fixe la limite à ${X.mobilite_max_departements} départements.</p>
<p>Un dernier cas concerne ceux qui ont réussi l’examen de taxi sans demander la carte. Aucun délai ne leur est imposé, mais si la demande intervient plus de ${A.carte_validite_ans} ans après l’examen, service-public exige une attestation de formation continue de moins de ${A.carte_validite_ans} ans.</p>
${h.table(['', 'VTC', 'Taxi'], [
  ['Validité de la carte', `${A.carte_validite_ans} ans, toute la France`, `${A.carte_validite_ans} ans, département de l’examen`],
  ['Stage de renouvellement', `${A.formation_continue_heures} h, session VTC`, `${A.formation_continue_heures} h, session taxi`],
  ['Nouvelle carte', `environ ${h.eur(A.carte_pro_environ)}`, `environ ${h.eur(A.carte_pro_environ)}`],
  ['Démarche liée', 'nouvelle inscription au registre', 'aucune pour l’ADS, selon service-public'],
  ['Changer de zone', 'sans objet', `stage de ${X.mobilite_heures} h (${X.mobilite_heures_paris} h à Paris), ${X.mobilite_max_departements} départements au plus`],
], 'Sources : arrêté du 11 août 2017 ; service-public F31027 et F21907')}

<h2>Et la licence de taxi ?</h2>
<p>La licence, officiellement autorisation de stationnement (ADS), suit sa propre logique. Service-public indique qu’après son obtention, l’ADS est renouvelée de droit, sans démarche, et ne dépend donc pas du stage. La même fiche apporte une nuance pour les licences obtenues gratuitement après le ${h.date(X.ads_date_incessibilite)} : elles sont valables ${X.ads_gratuite_validite_ans} ans et leur renouvellement se demande ${X.ads_renouvellement_avant_mois} mois avant la fin. Les règles de cession et de location sont sur la page ${h.a('licence-taxi', 'licence de taxi')}.</p>

<h2>Les erreurs qui coûtent une carte</h2>
<p>La plus fréquente est d’attendre le dernier mois : les sessions se remplissent et la carte expire avant que la nouvelle n’arrive. Rouler avec une carte qui n’est plus valide expose à une amende de ${h.eur(A.amende_carte_invalide)} selon service-public. La deuxième est de suivre une session du mauvais métier, puisque l’arrêté les sépare. La troisième, côté VTC, est de recevoir la nouvelle carte et d’oublier le registre.</p>
<p>Un chauffeur qui a obtenu sa carte en août 2021 doit ainsi avoir suivi son stage avant mai 2026 pour une échéance en août 2026. Le même raisonnement vaut à chaque cycle : notez la date de délivrance une fois pour toutes, et le reste se calcule.</p>
`,
  },
  en: {
    slug: 'continuing-training-vtc-taxi',
    nav: 'Continuing training and renewal',
    card: `The ${A.formation_continue_heures}-hour course every ${A.carte_validite_ans} years, applying for the new card and taxi mobility.`,
    title: 'VTC Card Renewal France 2026: 14-Hour Course and Steps',
    description: `Renewing a VTC or taxi card in France, 2026: ${A.formation_continue_heures}-hour continuing training course every ${A.carte_validite_ans} years, ${A.formation_continue_avant_mois} months before expiry, then apply online for about €${A.carte_pro_environ}.`,
    h1: 'Continuing training for VTC and taxi drivers: renewing your card',
    intro: 'Your professional card does not roll over on its own. No course certificate, no new card.',
    resume: `In France both the VTC (private-hire) card and the taxi card last ${A.carte_validite_ans} years. To renew either one, you take a ${A.formation_continue_heures}-hour continuing training course, usually two days, at an approved training centre, and service-public, the official government information site, advises doing it ${A.formation_continue_avant_mois} months before expiry. The ministerial order of 11 August 2017 sets the format: you must attend in person, the hours can be split into ${STAGE_PERIODES} half-days of ${STAGE_PERIODE_HEURES} hours over no more than ${STAGE_FRACTION_MAX_MOIS} months, three modules are compulsory (passenger transport law, taxi or VTC rules, road safety) and you pick one more. The centre hands you a certificate on the spot. VTC drivers then apply online through Démarches simplifiées, the government forms portal, pay about €${A.carte_pro_environ} for the new card and re-register on the VTC register. Taxi drivers take the same course, plus a ${X.mobilite_heures}-hour mobility course (${X.mobilite_heures_paris} hours for Paris) if they want to work outside the département where they passed the exam.`,
    faqs: [
      { q: 'How early should I book the course before my card runs out?', a: `Service-public recommends taking it ${A.formation_continue_avant_mois} months before your ${A.carte_validite_ans}-year card expires. That gap covers finding a session, receiving the certificate, filing the online application and paying for the new card. The calculator on this page works out your deadline month from the date your current card was issued, so you can put it in your diary now.` },
      { q: `Can the ${A.formation_continue_heures} hours be spread out instead of two full days?`, a: `Yes, within limits. The order of 11 August 2017 allows the ${A.formation_continue_heures} hours to be split into ${STAGE_PERIODES} sessions of ${STAGE_PERIODE_HEURES} hours, all within ${STAGE_FRACTION_MAX_MOIS} months. That suits drivers who cannot give up two working days in a row. Not every centre runs the split format, so ask when you book rather than assuming it is available.` },
      { q: 'Is an online-only refresher course accepted for renewal?', a: 'No. The order of 11 August 2017 requires continuing training to be delivered in person at an approved centre, so a fully remote course will not give you a valid certificate. Sessions are also run separately for each trade: as a VTC driver you need a session organised for VTC drivers, not one designed for taxi drivers.' },
      { q: 'After renewal, do I have to update my VTC register entry?', a: `Yes. Service-public says that every ${A.registre_validite_ans} years, as soon as the new card arrives, you must register again on the VTC operators’ register from your online account. The card and the register entry run on the same cycle, and working without a valid entry has been a criminal offence carrying heavy penalties since the law of 27 June 2026.` },
      { q: 'As a taxi driver, can I work in a second département?', a: `Yes, after a mobility course. A taxi card is valid only in the département of your exam. To add another, you take a ${X.mobilite_heures}-hour course on the local area and rules, ${X.mobilite_heures_paris} hours for the Paris taxi zone, then apply for a new card at about €${A.carte_pro_environ}. Service-public caps it at ${X.mobilite_max_departements} départements in total.` },
      { q: 'I passed the taxi exam over five years ago but never got the card. Too late?', a: 'No. Service-public states there is no deadline between passing the taxi exam and applying for the card. If more than five years have gone by, though, you must enclose a continuing training certificate less than five years old. In practice the fourteen-hour course becomes the first step of your application rather than an afterthought.' },
    ],
    body: (h) => `
<h2>One deadline every five years</h2>
<p>VTC and taxi cards share the same lifespan, ${A.carte_validite_ans} years, and the same renewal condition: proof that you completed continuing training. Service-public suggests taking the course ${A.formation_continue_avant_mois} months before the expiry date. That is not padding. You need to find a session for your trade, attend it, get the certificate, apply, and wait for the card to be printed, and none of the official texts we read gives the prefecture a deadline for issuing it.</p>
<p>Enter your issue date in the calculator above to see your deadline month. The ${h.a('calendrier-renouvellement', 'renewal calendar')} goes further and lines up the card, the register, the annual vehicle test and, for taxis, the licence on a single timeline.</p>

<h2>The 14-hour course under the order of 11 August 2017</h2>
<p>The rules for the course come from the ${h.src('arreteFormationContinue', 'order of 11 August 2017')}. It lasts ${A.formation_continue_heures} hours, taken either in one go over two days or split into ${STAGE_PERIODES} sessions of ${STAGE_PERIODE_HEURES} hours within ${STAGE_FRACTION_MAX_MOIS} months. Attendance is in person at an approved centre. Every session is set up for one audience only, taxi drivers or VTC drivers.</p>
<p>Three modules are compulsory and one is your choice:</p>
<ul>
<li>A: the law on passenger transport by taxi, VTC and motorbike taxi;</li>
<li>B: rules specific to taxi work or to VTC work, depending on the session;</li>
<li>C: road safety;</li>
<li>plus one of D, English, E, business management and development, or F, first aid and civil protection.</li>
</ul>
<p>When you finish, the centre gives you an attendance certificate straight away, dated and signed by its legal representative, on a durable medium. Keep a digital copy, since you need it for the card and again if the card is lost before the next cycle. There is no test at the end: the order speaks of a certificate of attendance, not a mark.</p>
<p>No regulation sets the price. Each approved centre charges what it likes, and we publish no figure because there is no official one. For VTC drivers, service-public points to the CMA (chamber of trades) website of your département for the list of centres; for taxi drivers, to the prefecture website.</p>

<h2>VTC drivers: new card first, register next</h2>
<p>Certificate in hand, you file the renewal on the Démarches simplifiées form; there is no paper route. The Imprimerie nationale, which prints the cards, then emails you to pay about ${h.eur(A.carte_pro_environ)}, the same as a first card. The document list and the rules on displaying the card are on the ${h.a('carte-vtc', 'VTC card')} page.</p>
<p>The new card triggers a second task that drivers often forget: registering again on the ${h.a('registre-vtc', 'VTC register')}, which service-public requires every ${A.registre_validite_ans} years once the new card arrives. Since ${h.date(A.loi_renforcement)} operators must also record their drivers, each driver’s card number and the number plates they run, so a changed card number has to be updated there too.</p>

<h2>Taxi drivers: same course, plus mobility</h2>
<p>For taxis the basic rule is the same: ${A.formation_continue_heures} hours of continuing training ${A.formation_continue_avant_mois} months before the ${A.carte_validite_ans} years are up, in a session organised for taxi drivers. Geography is what sets taxis apart, because a taxi card only covers the département where you passed the exam.</p>
<p>To work elsewhere, you take a mobility course of ${X.mobilite_heures} hours, or ${X.mobilite_heures_paris} hours for the Paris taxi zone, with at least ${MOBILITE_MODULE_MIN_HEURES} hours each on the local area and on local rules. You then fill in the mobility application and receive a new card, about ${h.eur(A.carte_pro_environ)}, listing the départements where you may work, up to ${X.mobilite_max_departements} according to service-public.</p>
<p>Some people pass the taxi exam and never apply for the card. There is no time limit, but if you apply more than ${A.carte_validite_ans} years after the exam, service-public requires a continuing training certificate under ${A.carte_validite_ans} years old.</p>
${h.table(['', 'VTC', 'Taxi'], [
  ['Card validity', `${A.carte_validite_ans} years, all of France`, `${A.carte_validite_ans} years, exam département only`],
  ['Renewal course', `${A.formation_continue_heures} h, VTC session`, `${A.formation_continue_heures} h, taxi session`],
  ['New card', `about ${h.eur(A.carte_pro_environ)}`, `about ${h.eur(A.carte_pro_environ)}`],
  ['Linked step', 'register again on the VTC register', 'none for the licence, per service-public'],
  ['Changing area', 'not applicable', `${X.mobilite_heures} h course (${X.mobilite_heures_paris} h for Paris), up to ${X.mobilite_max_departements} départements`],
], 'Sources: order of 11 August 2017; service-public F31027 and F21907')}

<h2>What about the taxi licence?</h2>
<p>The licence, officially an autorisation de stationnement (ADS), runs on its own track. Service-public says that once granted, the ADS is renewed automatically with no paperwork, so it does not hinge on the course. The same page adds a caveat for licences granted free of charge after ${h.date(X.ads_date_incessibilite)}: they last ${X.ads_gratuite_validite_ans} years, and renewal must be requested ${X.ads_renouvellement_avant_mois} months before they end. Transfer and rental rules are on the ${h.a('licence-taxi', 'taxi licence')} page.</p>

<h2>Mistakes that cost drivers their card</h2>
<p>Leaving it to the final month is the classic one: sessions fill up and the old card lapses before the new one turns up. Driving with an invalid card carries a ${h.eur(A.amende_carte_invalide)} fine according to service-public. Booking a session meant for the other trade is the second, since the order keeps them apart. For VTC drivers, the third is collecting the new card and forgetting the register.</p>
<p>Take a driver whose card was issued in August 2021: it expires in August 2026, so the course should have been done by May 2026. Every later cycle works the same way, which is why writing down your issue date once saves a lot of trouble.</p>
`,
  },
});
