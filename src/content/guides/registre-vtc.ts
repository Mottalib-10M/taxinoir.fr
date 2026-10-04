import { defineGuide } from '../../lib/guide-types';
import { P } from '../../lib/engine/params';

const A = P.acces;

// Valeurs lues dans params-2026.json ; source : : code des transports, R3122-1 III (recours exceptionnel, un mois au plus)
// et R3122-2 (renouvellement demandé au moins trois mois avant le terme), lus le 2026-10-04 :
// https://www.legifrance.gouv.fr/codes/id/LEGISCTA000030048481/
const RECOURS_PONCTUEL_MOIS = P.acces.registre_recours_ponctuel_mois;
const RENOUVELLEMENT_AVANT_MOIS = P.acces.registre_renouvellement_avant_mois;
// Valeurs lues dans params-2026.json ; source : : service-public F31027, étape 8 (mise à disposition de l’inscription,
// article L3124-8) : interdiction de réinscription et de direction jusqu’à 3 ans.
// https://entreprendre.service-public.gouv.fr/vosdroits/F31027
const INTERDICTION_REINSCRIPTION_ANS = P.acces.registre_interdiction_reinscription_ans;

export default defineGuide({
  id: 'registre-vtc',
  group: 'vtc',
  order: 20,
  mini: 'registre',
  miniHref: 'cout-acces-metier',
  related: ['carte-vtc', 'devenir-chauffeur-vtc', 'vehicule-vtc', 'calendrier-renouvellement', 'cout-acces-metier'],
  sources: ['registreAide', 'ctL3122_3', 'ctR3122', 'arreteFraisRegistre', 'spVtc', 'arreteSignaletique'],
  fr: {
    slug: 'registre-vtc',
    nav: 'Registre VTC',
    card: 'Inscription au REVTC, pièces, garantie, délai, mises à jour et sanctions.',
    title: 'Registre VTC 2026 : inscription au REVTC, pièces et frais',
    description: `Registre VTC 2026 : inscription en ligne au REVTC pour ${A.registre_inscription} €, pièces de l’article R3122-1, garantie de ${A.garantie_financiere_par_vehicule} € par véhicule, délai, mises à jour et sanctions.`,
    h1: 'Registre des VTC : s’inscrire au REVTC et rester en règle',
    intro: 'Le registre ne contrôle pas le chauffeur mais l’entreprise qui fait rouler la voiture ; c’est elle qui s’inscrit, paie et répond des mises à jour.',
    resume: `Le registre des exploitants de voitures de transport avec chauffeur (REVTC) recense les entreprises autorisées à faire rouler des VTC ; l’article L3122-3 du code des transports rend l’inscription obligatoire. Elle se demande uniquement en ligne, sur le site du ministère des Transports, et coûte ${A.registre_inscription} €, montant fixé par l’arrêté du 30 décembre 2014 sous un plafond réglementaire de ${A.registre_plafond_frais} €. Le dossier réunit l’attestation de responsabilité civile professionnelle, le justificatif d’immatriculation de l’entreprise, la carte grise de chaque véhicule, la carte professionnelle de chaque conducteur et, pour une voiture qui n’est ni à vous ni louée plus de ${A.location_longue_mois} mois, une garantie financière de ${A.garantie_financiere_par_vehicule} €. L’inscription intervient dans les ${A.registre_delai_mois} mois suivant un dossier complet, vaut ${A.registre_validite_ans} ans et ouvre la commande des vignettes. Depuis le 27 juin 2026, il faut y déclarer les conducteurs et les plaques ; prêter son inscription est interdit, et rouler sans être inscrit est puni de ${A.sanction_prison_ans} ans de prison et ${A.sanction_amende_personne} € d’amende.`,
    faqs: [
      { q: 'Que paie-t-on exactement avec les frais d’inscription au registre des VTC ?', a: `${A.registre_inscription} €, réglés en ligne au dépôt de la demande, couvrent l’instruction et la gestion du registre : l’article L3122-3 réserve ce produit au financement des registres. Ils ne comprennent ni les vignettes, commandées ensuite depuis votre compte pour environ ${A.vignette_environ} € chacune, ni la garantie financière de ${A.garantie_financiere_par_vehicule} € par voiture si elle est exigée. Les mêmes frais reviennent à chaque renouvellement, tous les ${A.registre_validite_ans} ans.` },
      { q: 'Combien de temps l’administration a-t-elle pour valider une inscription au REVTC ?', a: `L’article R3122-2 du code des transports lui laisse ${A.registre_delai_mois} mois au plus à compter d’un dossier complet et du paiement des frais. L’inscription donne lieu à l’envoi d’une attestation. Si une pièce manque, l’administration vous met d’abord en demeure de compléter ; faute de réponse, elle refuse par une décision motivée, notifiée par un moyen qui permet d’en accuser réception. Un dossier soigné du premier coup reste donc le moyen le plus rapide.` },
      { q: 'Un chauffeur salarié d’une société VTC doit-il ouvrir son propre compte au registre ?', a: `Non. L’inscription est celle de l’exploitant, c’est-à-dire de l’entreprise qui fait rouler les voitures. Depuis le 27 juin 2026, l’article L3122-3 impose à cet exploitant de déclarer dans son compte le nom des conducteurs qu’il emploie et le numéro de leur carte professionnelle. Le salarié n’a donc pas d’inscription personnelle, mais il doit vérifier que son employeur l’a bien déclaré et que l’inscription de celui-ci est en cours de validité.` },
      { q: 'Qu’est-ce qui doit être déclaré au registre depuis la loi du 25 juin 2026 ?', a: `L’article 28 de la loi n° 2026-534 du 25 juin 2026 a réécrit l’article L3122-3. Depuis le 27 juin 2026, l’exploitant déclare notamment le nom de ses conducteurs, le numéro de leur carte professionnelle et les numéros d’immatriculation de ses véhicules. Le dossier doit être tenu à jour : l’article R3122-1 fixe un délai de ${A.changement_registre_jours} jours francs, par voie électronique, pour signaler tout changement.` },
      { q: 'Peut-on louer son numéro d’inscription au registre VTC à un autre chauffeur ?', a: `Non, ni le louer ni le prêter gratuitement : l’article L3122-3 l’interdit depuis le 27 juin 2026. Selon service-public, l’exploitant qui le fait est considéré comme l’employeur du chauffeur, la mise à disposition valant contrat de travail. Il est radié immédiatement et peut se voir interdire de se réinscrire jusqu’à ${INTERDICTION_REINSCRIPTION_ANS} ans ; son dirigeant peut être écarté de toute direction d’exploitant inscrit pour la même durée.` },
      { q: `Je loue ma voiture VTC à la semaine : la garantie financière de ${A.garantie_financiere_par_vehicule} € s’applique-t-elle ?`, a: `Oui, dans ce cas. La garantie de ${A.garantie_financiere_par_vehicule} € par véhicule utilisé de façon régulière n’est écartée que si vous êtes propriétaire de la voiture ou si vous la louez pour plus de ${A.location_longue_mois} mois ; un contrat plus court ne suffit pas. Elle prend la forme d’un engagement de caution d’une société de caution mutuelle, d’un assureur ou d’un établissement financier, et son justificatif rejoint le dossier du registre.` },
      { q: 'À quel moment déposer la demande de renouvellement au registre des VTC ?', a: `Au moins ${RENOUVELLEMENT_AVANT_MOIS} mois avant la fin des ${A.registre_validite_ans} ans de validité. L’article R3122-2 prévoit qu’une demande déposée dans ce délai est renouvelée avant l’échéance, sauf si une condition d’inscription n’est plus remplie. Service-public demande aussi de refaire l’inscription dès réception de la nouvelle carte professionnelle. Les frais de ${A.registre_inscription} € sont dus à nouveau, payés au dépôt de la demande.` },
    ],
    body: (h) => `
<h2>Ce que le registre enregistre, et qui doit s’y inscrire</h2>
<p>Le registre vise l’exploitant : la personne, physique ou morale, qui met une voiture avec chauffeur à la disposition de clients. Si vous travaillez seul en micro-entreprise, l’exploitant, c’est vous. Si une société vous emploie, c’est elle qui s’inscrit et vous déclare. Le texte de référence est l’${h.src('ctL3122_3', 'article L3122-3 du code des transports')}, réécrit par la loi n° 2026-534 du 25 juin 2026 : il rend le registre public, fixe la validité à ${A.registre_validite_ans} ans et interdit de céder l’inscription.</p>
<p>La gestion nationale est confiée au préfet de la région Île-de-France (article R3122-5), qui publie la liste des exploitants inscrits sur internet (article R3122-5-1). Un client, une plateforme ou un donneur d’ordre peut donc vérifier qu’une entreprise est en règle avant de lui confier une course. La démarche elle-même se fait sur le ${h.src('registreAide', 'site officiel du registre des VTC')}, et nulle part ailleurs : aucun dossier papier, aucun envoi par courriel.</p>

<h2>L’inscription au REVTC, dans l’ordre</h2>
<ol>
<li>Rassemblez les pièces avant d’ouvrir le formulaire : carte professionnelle reçue, entreprise immatriculée, contrat d’assurance signé, carte grise du véhicule.</li>
<li>Créez votre compte sur le site du registre et saisissez l’identité de l’exploitant : état civil, profession et domicile pour une personne physique ; dénomination, forme juridique, adresse de l’établissement et représentants pour une société (article R3122-1, I).</li>
<li>Déposez les justificatifs numérisés, un véhicule et un conducteur à la fois.</li>
<li>Payez les ${h.eur(A.registre_inscription)} en ligne. Sans paiement, le délai d’instruction ne court pas.</li>
<li>Attendez l’attestation d’inscription, puis commandez les vignettes depuis le même compte.</li>
</ol>

<h2>Les pièces de l’article R3122-1</h2>
<p>L’${h.src('ctR3122', 'article R3122-1')} distingue deux pièces jointes à la demande et un dossier en trois éléments. Au total, l’administration attend :</p>
<ul>
<li>l’attestation d’assurance de responsabilité civile professionnelle ;</li>
<li>le justificatif d’immatriculation de l’entreprise : numéro Siren, extrait du registre national des entreprises ou extrait Kbis ;</li>
<li>la copie du certificat d’immatriculation, la carte grise, de chaque véhicule exploité ;</li>
<li>la copie de la carte professionnelle de chaque conducteur, recto et verso ;</li>
<li>le justificatif de capacité financière, véhicule par véhicule.</li>
</ul>
<p>Pour une première inscription, la carte professionnelle doit être arrivée, pas seulement demandée. Le parcours qui permet de l’obtenir est décrit sur la page ${h.a('carte-vtc', 'carte VTC')}.</p>

<h2>La garantie financière : quand elle est due, quand elle ne l’est pas</h2>
<p>La capacité financière se prouve par une garantie de ${h.eur(A.garantie_financiere_par_vehicule)} pour chaque véhicule utilisé de façon régulière. Elle disparaît dans deux cas : vous êtes propriétaire de la voiture, ou vous la louez pour plus de ${A.location_longue_mois} mois. Il suffit alors de joindre la carte grise à votre nom ou le contrat de location. La garantie est un engagement écrit de caution délivré par une société de caution mutuelle, une compagnie d’assurance ou un établissement financier.</p>
<p>En pratique, c’est la location courte, à la semaine ou au mois, qui déclenche la garantie. Trois voitures louées ainsi représentent ${h.eur(3 * A.garantie_financiere_par_vehicule)} à justifier. Le mini-simulateur en haut de page fait ce calcul pour votre flotte, et la page ${h.a('vehicule-vtc', 'véhicule VTC')} compare achat, location longue et location courte.</p>

<h2>Délai, refus et frais</h2>
<p>L’administration dispose de ${A.registre_delai_mois} mois à compter d’un dossier complet et du paiement (article R3122-2). Elle ne peut refuser que si le dossier reste incomplet après une mise en demeure, ou si l’exploitant ne remplit pas les conditions de l’article L3122-4 ; le refus est motivé et notifié avec accusé de réception.</p>
<p>Les frais s’élèvent à ${h.eur(A.registre_inscription)}, selon l’${h.src('arreteFraisRegistre', 'arrêté du 30 décembre 2014')}. L’article R3122-3 plafonne ce montant à ${h.eur(A.registre_plafond_frais)}. Depuis la loi du 25 juin 2026, l’article L3122-3 précise que les frais se paient au dépôt de la demande ou du renouvellement et renvoie leur montant à un décret ; au 12 août 2026, service-public affichait toujours ${h.eur(A.registre_inscription)}.</p>

<h2>Après l’inscription : les macarons</h2>
<p>Une fois l’inscription validée, le compte permet de commander la signalétique prévue par l’${h.src('arreteSignaletique', 'arrêté du 6 avril 2017')}, environ ${h.eur(A.vignette_environ)} par vignette. Le site du registre fournit d’abord un macaron temporaire au format PDF, valable un mois, à placer dans l’angle inférieur gauche du pare-brise. Les deux macarons définitifs vont à l’avant, en bas à gauche côté conducteur, et à l’arrière, en bas à droite. Chacun porte le numéro d’inscription de l’entreprise et la plaque du véhicule : une vignette par voiture, donc une nouvelle commande à chaque changement de véhicule.</p>

<h2>Tenir son compte à jour : quinze jours francs</h2>
<p>C’est l’obligation la plus souvent oubliée. L’article R3122-1 impose de signaler au gestionnaire, par voie électronique et dans un délai maximum de ${A.changement_registre_jours} jours francs, tout changement dans les informations du dossier : déménagement, nouvelle voiture, voiture rendue au loueur, conducteur embauché ou parti, arrêt d’activité. Dans un délai franc, le jour de l’événement ne compte pas. Service-public évoque un délai de trois mois ; nous retenons celui du code, plus court, puisque c’est le texte qui fait foi.</p>
<p>Le texte admet un recours exceptionnel à des véhicules ou à des conducteurs supplémentaires, pour une manifestation commerciale, sportive, culturelle, éducative ou politique, ou un événement précis qui le justifie. Le gestionnaire doit en être informé au préalable, pièces à l’appui, et ce recours ne dépasse pas ${RECOURS_PONCTUEL_MOIS} mois. Le site du registre retient la même limite d’un mois pour tout recours temporaire à un véhicule ou à un conducteur.</p>

<h2>Ce qui a changé le 27 juin 2026</h2>
<p>Trois changements datent de cette entrée en vigueur. Le premier oblige l’exploitant à déclarer ses conducteurs, le numéro de leur carte et les plaques qu’il exploite.</p>
<p>Le deuxième interdit de mettre l’inscription à la disposition d’un tiers, gratuitement ou non. D’après service-public, l’exploitant qui prête ou loue son numéro devient l’employeur du chauffeur, la relation étant requalifiée en contrat de travail ; il est radié sur-le-champ, privé de réinscription jusqu’à ${INTERDICTION_REINSCRIPTION_ANS} ans, et son dirigeant peut être interdit de diriger un exploitant inscrit pendant la même durée. L’article R3122-4 prévoyait déjà la radiation dans ce cas.</p>
<p>Le troisième relève les peines, selon service-public. Exercer sans inscription expose désormais à ${A.sanction_prison_ans} ans d’emprisonnement et ${h.eur(A.sanction_amende_personne)} d’amende pour une personne physique, ${h.eur(A.sanction_amende_societe)} pour une personne morale. Le juge peut y ajouter la suspension du permis jusqu’à ${A.sanction_suspension_permis_ans} ans, l’immobilisation du véhicule jusqu’à ${A.sanction_immobilisation_ans} an, sa confiscation et l’interdiction de paraître dans certains lieux, gares ou aéroports par exemple.</p>
${h.table(['Situation', 'Texte', 'Conséquence'], [
  ['Exercer sans inscription', 'L3124-7', `${A.sanction_prison_ans} ans, ${h.eur(A.sanction_amende_personne)} (${h.eur(A.sanction_amende_societe)} pour une société)`],
  ['Prêter ou louer son inscription', 'L3122-3, L3124-8', `radiation, réinscription interdite jusqu’à ${INTERDICTION_REINSCRIPTION_ANS} ans`],
  ['Changement non déclaré', 'R3122-1', `déclaration due sous ${A.changement_registre_jours} jours francs`],
  ['Conditions plus remplies', 'R3122-4', 'radiation après mise en demeure'],
], 'Sources : code des transports ; service-public F31027 vérifié le 12 août 2026')}

<h2>Renouveler tous les cinq ans</h2>
<p>L’inscription vaut ${A.registre_validite_ans} ans. L’article R3122-2 garantit le renouvellement avant l’échéance si la demande est déposée au moins ${RENOUVELLEMENT_AVANT_MOIS} mois avant, et si les conditions sont toujours remplies. Comme la carte professionnelle a la même durée, service-public demande de refaire l’inscription dès que la nouvelle carte arrive : en pratique, les deux échéances se suivent. Le ${h.a('calendrier-renouvellement', 'calendrier de renouvellement')} place les deux dates sur une même ligne.</p>
<p>Pour une question sur votre dossier, l’assistance du registre répond au 09 74 36 31 72. Le reste du parcours, de l’examen à la première course, est sur la page ${h.a('devenir-chauffeur-vtc', 'devenir chauffeur VTC')}, et le ${h.a('cout-acces-metier', 'simulateur de coût d’accès')} additionne registre, carte, examen et véhicule.</p>
`,
  },
  en: {
    slug: 'vtc-register-revtc',
    nav: 'VTC register',
    card: 'Joining the REVTC: documents, guarantee, timing, updates and penalties.',
    title: 'VTC Register France 2026: REVTC Entry, Documents, Fees',
    description: `VTC register in France, 2026: online REVTC entry for €${A.registre_inscription}, documents under article R3122-1, €${A.garantie_financiere_par_vehicule} guarantee per car, processing time, updates and new penalties.`,
    h1: 'The VTC register (REVTC): getting listed and staying compliant',
    intro: 'The register does not license the driver, it lists the business that puts the car on the road; that business applies, pays and keeps the file current.',
    resume: `France’s register of VTC operators, known by its French initials REVTC, lists every business allowed to run private-hire cars; article L3122-3 of the Transport Code makes being on it compulsory. You apply online only, on the Ministry of Transport’s register website, and pay €${A.registre_inscription}, an amount set by an order of 30 December 2014 under a regulatory ceiling of €${A.registre_plafond_frais}. The file contains your professional liability insurance certificate, proof that the business is registered, the registration document of each car, the professional card of each driver and, for any car you neither own nor lease for more than ${A.location_longue_mois} months, a €${A.garantie_financiere_par_vehicule} financial guarantee. Registration follows within ${A.registre_delai_mois} months of a complete file, lasts ${A.registre_validite_ans} years and unlocks the VTC stickers. Since 27 June 2026 drivers and number plates must be declared on it, lending your entry to someone else is banned, and operating without one carries ${A.sanction_prison_ans} years in prison and a €${A.sanction_amende_personne} fine.`,
    faqs: [
      { q: 'What does the VTC register fee actually cover?', a: `The €${A.registre_inscription}, paid online when you file, funds the handling of your application and the running of the register; article L3122-3 earmarks the money for that purpose. It does not include the stickers, ordered afterwards from your account for about €${A.vignette_environ} each, or the €${A.garantie_financiere_par_vehicule} per-car guarantee where one is required. The same fee is due again at each renewal, every ${A.registre_validite_ans} years.` },
      { q: 'I have filed my REVTC application: when will I hear back?', a: `Article R3122-2 of the Transport Code gives the authority up to ${A.registre_delai_mois} months from a complete file and payment. Approval comes with a registration certificate. If something is missing you first receive a formal notice to complete the file; if you do not, the application is refused in a reasoned decision sent with proof of receipt. Getting the file right first time is the quickest route.` },
      { q: 'I drive as an employee of a VTC company. Do I need my own register account?', a: `No. The entry belongs to the operator, meaning the business that runs the cars. Since 27 June 2026, article L3122-3 requires that operator to declare in its account the names of the drivers it employs and their professional card numbers. You have no personal entry, but it is worth checking that your employer has declared you and that its own registration is still valid.` },
      { q: 'Which details must operators now declare on the register?', a: `Article 28 of Law no. 2026-534 of 25 June 2026 rewrote article L3122-3. Since 27 June 2026 the operator must declare, among other things, its drivers’ names, their professional card numbers and the number plates of the vehicles it runs. The file must stay current: article R3122-1 allows ${A.changement_registre_jours} clear days, by electronic means, to report any change.` },
      { q: 'A friend wants to work under my register number. Is that allowed?', a: `No, whether you charge for it or not: article L3122-3 has banned it since 27 June 2026. According to service-public, an operator who lends or rents out its entry is treated as the driver’s employer, the arrangement counting as an employment contract. The operator is struck off at once and may be barred from re-registering for up to ${INTERDICTION_REINSCRIPTION_ANS} years; its manager can be banned from running a registered operator for as long.` },
      { q: 'My VTC car is on a weekly rental. Do I still need the financial guarantee?', a: `Yes. The €${A.garantie_financiere_par_vehicule} guarantee per regularly used vehicle is waived only if you own the car or lease it for more than ${A.location_longue_mois} months, so a short rental does not qualify. It takes the form of a written surety from a mutual guarantee company, an insurer or a bank, and proof of it goes into your register file.` },
      { q: 'How early should I apply to renew my VTC register entry?', a: `At least ${RENOUVELLEMENT_AVANT_MOIS} months before the ${A.registre_validite_ans}-year term ends. Under article R3122-2, a request filed in that window is renewed before expiry unless one of the conditions is no longer met. Service-public also tells drivers to re-register as soon as their new professional card arrives. The €${A.registre_inscription} fee is due again when you file.` },
    ],
    body: (h) => `
<h2>What the register covers and who must join it</h2>
<p>The register is about the operator (exploitant): the individual or company that puts a car and driver at customers’ disposal. Working alone as a micro-entrepreneur, you are the operator. If a company employs you, the company registers and declares you. The governing text is ${h.src('ctL3122_3', 'article L3122-3 of the Transport Code')}, rewritten by Law no. 2026-534 of 25 June 2026: it makes the register public, sets a ${A.registre_validite_ans}-year validity and forbids handing your entry to anyone else.</p>
<p>The register is run nationally by the regional prefect of Île-de-France (article R3122-5), who publishes the list of registered operators online (article R3122-5-1). Customers, platforms and businesses booking rides can therefore check that a firm is legitimate. Applications go through the ${h.src('registreAide', 'official VTC register website')}, in French, and nowhere else: there is no paper form and email applications are not accepted.</p>

<h2>Applying to the REVTC, in order</h2>
<ol>
<li>Gather everything before you start: the professional card in hand, the business registered, a signed insurance policy and the car’s registration document.</li>
<li>Open an account on the register site and enter the operator’s details: civil status, occupation and home address for an individual; company name, legal form, address and legal representatives for a company (article R3122-1, I).</li>
<li>Upload the scanned documents, one vehicle and one driver at a time.</li>
<li>Pay the ${h.eur(A.registre_inscription)} online. Until you pay, the processing clock does not start.</li>
<li>Wait for the registration certificate, then order your stickers from the same account.</li>
</ol>

<h2>Documents required by article R3122-1</h2>
<p>${h.src('ctR3122', 'Article R3122-1')} asks for two documents with the application itself and a three-part file. In all, you will need:</p>
<ul>
<li>a professional liability insurance certificate (attestation de responsabilité civile professionnelle);</li>
<li>proof of business registration: your Siren number, an extract from the national business register (RNE) or a Kbis extract;</li>
<li>a copy of the registration document (carte grise) for each car;</li>
<li>a copy of each driver’s professional card, both sides;</li>
<li>proof of financial capacity for every vehicle.</li>
</ul>
<p>For a first application, the card must already be in your hands, not merely applied for. How to get it is covered on the ${h.a('carte-vtc', 'VTC driver card')} page.</p>

<h2>The financial guarantee, and when you can skip it</h2>
<p>Financial capacity is shown through a guarantee of ${h.eur(A.garantie_financiere_par_vehicule)} for each regularly used car. Two situations remove it: you own the car, or you lease it for more than ${A.location_longue_mois} months, in which case the registration document in your name or the lease is enough. The guarantee itself is a written surety (caution) issued by a mutual guarantee society, an insurer or a bank.</p>
<p>In real life it is short-term rental, by the week or the month, that triggers the requirement. Three cars rented that way mean ${h.eur(3 * A.garantie_financiere_par_vehicule)} to cover. The calculator near the top of the page works this out for your fleet, and the ${h.a('vehicule-vtc', 'VTC vehicle')} page compares buying, long leases and short rentals.</p>

<h2>Processing time, refusals and fees</h2>
<p>The authority has ${A.registre_delai_mois} months from a complete file and payment (article R3122-2). It may refuse only if the file is still incomplete after a formal notice, or if the operator fails the conditions of article L3122-4; any refusal must give reasons and be served with proof of receipt.</p>
<p>The fee is ${h.eur(A.registre_inscription)}, under the ${h.src('arreteFraisRegistre', 'order of 30 December 2014')}, and article R3122-3 caps it at ${h.eur(A.registre_plafond_frais)}. Since the June 2026 law, article L3122-3 states that the fee is paid when you file a new or renewal application and that its amount is to be set by decree; as of 12 August 2026, service-public still showed ${h.eur(A.registre_inscription)}.</p>

<h2>After approval: the stickers</h2>
<p>Once you are registered, your account lets you order the markings required by the ${h.src('arreteSignaletique', 'order of 6 April 2017')}, about ${h.eur(A.vignette_environ)} per sticker. The register site first supplies a temporary PDF sticker valid for one month, placed in the bottom left corner of the windscreen. The two permanent stickers go at the front, bottom left on the driver’s side, and at the back, bottom right. Each shows the business’s register number and the car’s plate, so every change of car means a new order.</p>

<h2>Keeping your account current: fifteen clear days</h2>
<p>This is the duty drivers forget most. Article R3122-1 requires you to report to the register, electronically and within ${A.changement_registre_jours} clear days at most, any change to the information on file: moving house, a new car, a rental car handed back, a driver hired or leaving, stopping trading. “Clear days” (jours francs) means the day of the event itself is not counted. Service-public mentions three months; we go by the code, which is the shorter of the two and the binding text.</p>
<p>The code also allows extra vehicles or drivers on an exceptional basis for a trade fair, sporting, cultural, educational or political event, or a specific occasion that justifies it. The register must be told beforehand, with supporting documents, and the arrangement cannot exceed ${RECOURS_PONCTUEL_MOIS} month. The register site gives the same one-month limit for any temporary use of an extra car or driver.</p>

<h2>What changed on 27 June 2026</h2>
<p>Three changes took effect that day. First, operators have to declare their drivers, the drivers’ card numbers and the plates they run.</p>
<p>Second, lending an entry to a third party, free or for money, is now expressly banned. Service-public explains that an operator who does so becomes the driver’s employer, the arrangement being reclassified as an employment contract; the operator is struck off immediately, cannot re-register for up to ${INTERDICTION_REINSCRIPTION_ANS} years, and its manager can be barred from running any registered operator for the same period. Article R3122-4 already provided for striking off in that case.</p>
<p>Third, service-public reports heavier penalties. Operating without registration now carries ${A.sanction_prison_ans} years’ imprisonment and a ${h.eur(A.sanction_amende_personne)} fine for an individual, ${h.eur(A.sanction_amende_societe)} for a company. Courts can add a licence suspension of up to ${A.sanction_suspension_permis_ans} years, immobilisation of the car for up to ${A.sanction_immobilisation_ans} year, its confiscation and a ban from certain places such as stations or airports.</p>
${h.table(['Situation', 'Legal basis', 'Consequence'], [
  ['Operating without registration', 'L3124-7', `${A.sanction_prison_ans} years, ${h.eur(A.sanction_amende_personne)} (${h.eur(A.sanction_amende_societe)} for a company)`],
  ['Lending or renting out your entry', 'L3122-3, L3124-8', `struck off, no re-registration for up to ${INTERDICTION_REINSCRIPTION_ANS} years`],
  ['Change not reported', 'R3122-1', `report due within ${A.changement_registre_jours} clear days`],
  ['Conditions no longer met', 'R3122-4', 'struck off after formal notice'],
], 'Sources: Transport Code; service-public F31027 checked 12 August 2026')}

<h2>Renewing every five years</h2>
<p>An entry lasts ${A.registre_validite_ans} years. Article R3122-2 guarantees renewal before expiry if you apply at least ${RENOUVELLEMENT_AVANT_MOIS} months ahead and still meet the conditions. Because the professional card runs for the same length of time, service-public asks drivers to re-register as soon as the new card arrives, so in practice the two deadlines fall close together. The ${h.a('calendrier-renouvellement', 'renewal calendar')} lines both dates up.</p>
<p>For questions about your file, the register’s helpline is 09 74 36 31 72. The rest of the journey, from the exam to your first fare, is on the ${h.a('devenir-chauffeur-vtc', 'becoming a VTC driver')} page, and the ${h.a('cout-acces-metier', 'start-up cost calculator')} adds up register, card, exam and car.</p>
`,
  },
});
