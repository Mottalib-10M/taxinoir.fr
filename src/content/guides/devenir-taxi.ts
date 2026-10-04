import { defineGuide } from '../../lib/guide-types';
import { P } from '../../lib/engine/params';
import { formatMoney, displayDate } from '../../lib/format';

const A = P.acces;
const X = P.taxi;
const E = P.examen;

// Valeurs lues dans params-2026.json ; source : (bloc taxi), source spTaxi
// https://entreprendre.service-public.gouv.fr/vosdroits/F21907 (vérifié le 13 juillet 2026)
const LE_TAXI_SUSPENSION = P.taxi.le_taxi_suspension;
const CPAM_TARIFS_DEPUIS = P.taxi.cpam_tarifs_depuis;
const PARTAGE_DETOUR_KM = P.taxi.partage_detour_km;
const PARTAGE_RAYON_KM = P.taxi.partage_rayon_km;
const PARTAGE_ATTENTE_MIN = P.taxi.partage_attente_min;
const TAXI_PLACES_MAX = P.taxi.places_max;
const CARTE_DEMANDE_TARDIVE_ANS = P.taxi.carte_demande_tardive_ans; // carte demandée plus de 5 ans après l’examen
// Valeurs lues dans params-2026.json ; source : (bloc examen), source cmaReglement, art. III.3
// https://www.exament3p.fr/media/pdf/cma_reglement_examen_taxi.pdf
const CMA_GARANTIE_MOIS = P.examen.reglement.garantie_mois;

const fe = (n: number, l: 'fr' | 'en') => formatMoney(n, 0, l);
const fd = (iso: string, l: 'fr' | 'en') => {
  const s = displayDate(iso, l === 'fr' ? 'fr-FR' : 'en-GB');
  return l === 'fr' ? s.replace(/^1 /, '1er ') : s;
};

export default defineGuide({
  id: 'devenir-taxi',
  group: 'taxi',
  order: 10,
  mini: 'budgetTaxi',
  miniHref: 'cout-acces-metier',
  related: ['examen-taxi', 'licence-taxi', 'salaire-taxi', 'formation-continue-vtc-taxi', 'cout-acces-metier', 'devenir-chauffeur-vtc'],
  sources: ['spTaxi', 'cmaT3p', 'cmaConditions', 'ctL3121', 'artisanatL125_5', 'conventionCadreTaxi', 'arreteReservationTaxi', 'spTarifsTaxi'],
  fr: {
    slug: 'devenir-chauffeur-taxi',
    nav: 'Devenir taxi',
    card: 'Conditions, formation, examen, carte, licence, statut et CPAM : le parcours complet.',
    title: 'Devenir taxi en 2026 : formation, examen, carte et licence',
    description: `Devenir chauffeur de taxi en 2026 : PSC1 de moins de ${A.psc1_validite_ans} ans, formation facultative, examen CMA à ${A.examen_complet} €, carte départementale, la licence ADS et les statuts.`,
    h1: 'Devenir chauffeur de taxi : le parcours, de la formation à la première course',
    intro: 'Huit étapes séparent un titulaire du permis B de sa première course au compteur, et la plus longue n’est pas l’examen.',
    resume: `Pour devenir chauffeur de taxi en 2026, il faut un permis B depuis ${A.permis_anciennete_ans} ans (${A.permis_conduite_accompagnee_ans} ans après une conduite accompagnée), un casier judiciaire sans les condamnations de l’article R3120-8 du code des transports, l’avis favorable d’un médecin agréé et une attestation de premiers secours PSC1 datant de moins de ${A.psc1_validite_ans} ans. On passe ensuite l’examen organisé par la chambre de métiers et de l’artisanat (${A.examen_complet} € en 2026), avec ou sans formation : celle-ci est recommandée, pas obligatoire, et coûte de ${fe(A.formation_cout_min, 'fr')} à ${fe(A.formation_cout_max, 'fr')} pour ${A.formation_heures_min} à ${A.formation_heures_max} heures selon service-public. La carte professionnelle, environ ${A.carte_pro_environ} €, ne vaut que dans le département de l’examen, sauf stage de mobilité. Reste le plus lourd : exploiter une licence, l’autorisation de stationnement (ADS), obtenue gratuitement après des années d’attente, achetée de ${fe(X.ads_prix_min, 'fr')} à ${fe(X.ads_prix_max, 'fr')}, louée, ou fournie par un employeur si l’on choisit d’être salarié.`,
    faqs: [
      { q: 'La formation taxi est-elle obligatoire pour passer l’examen ?', a: `Non. Service-public la dit fortement recommandée mais facultative, et la CMA accepte les candidats libres. Les centres proposent de ${A.formation_heures_min} à ${A.formation_heures_max} heures environ, pour ${A.formation_cout_min} à ${A.formation_cout_max} €, finançables avec le compte personnel de formation. Seule la formation aux premiers secours PSC1, de moins de ${A.psc1_validite_ans} ans, est exigée, et seulement au moment de demander la carte en préfecture.` },
      { q: 'Combien de temps faut-il pour devenir chauffeur de taxi ?', a: `Pour la partie examen, la CMA garantit, une fois le dossier validé, de passer les épreuves et d’avoir le résultat pratique dans les ${CMA_GARANTIE_MOIS} mois suivant le dépôt, selon son règlement. Il faut ajouter la formation éventuelle, la demande de carte, dont aucun texte ne fixe le délai, puis l’accès à une licence : l’attente d’une ADS gratuite se compte souvent en années dans les grandes villes, d’après service-public.` },
      { q: 'Peut-on être taxi sans posséder de licence ?', a: 'Oui, de deux façons décrites par service-public. Le salarié d’une entreprise de taxis conduit un véhicule dont l’employeur détient la licence ; il touche un fixe et un pourcentage des recettes du compteur. Le locataire signe un contrat de location-gérance d’au moins un an et paie un loyer mensuel. Dans les deux cas, la carte professionnelle reste obligatoire, et sans ADS toute course doit avoir été réservée à l’avance.' },
      { q: 'Ma carte de taxi me permet-elle de travailler dans un autre département ?', a: `Pas d’emblée : elle est limitée au département où vous avez réussi l’examen. Pour en ajouter d’autres, il faut suivre un stage de mobilité de ${X.mobilite_heures} heures (${X.mobilite_heures_paris} heures pour Paris) dans un centre agréé, puis demander une nouvelle carte, environ ${A.carte_pro_environ} €. Service-public plafonne l’extension à ${X.mobilite_max_departements} départements au total.` },
      { q: 'Faut-il refaire la formation de premiers secours avant chaque renouvellement de carte taxi ?', a: `Les textes lus n’imposent le PSC1 de moins de ${A.psc1_validite_ans} ans qu’à la demande de carte : c’est une pièce exigée par la préfecture avec l’attestation de réussite de la CMA. Pour le renouvellement tous les ${A.carte_validite_ans} ans, service-public ne cite que le stage de formation continue de ${A.formation_continue_heures} heures. Vérifiez la liste des pièces affichée sur le formulaire le jour de votre demande.` },
      { q: 'Un chauffeur VTC peut-il devenir taxi sans tout repasser ?', a: `Oui, s’il a réussi les écrits complets de l’examen VTC depuis moins de ${E.mobilite_validite_ans} ans : c’est la mobilité professionnelle. Il ne passe que les deux épreuves écrites propres au taxi, puis l’épreuve pratique, pour ${A.examen_mobilite} € en 2026. Une carte VTC obtenue par équivalence ne donne pas ce droit, faute d’avoir validé le tronc commun, précise le règlement de la CMA.` },
      { q: 'Que change le conventionnement CPAM pour un nouveau taxi ?', a: `Il permet de transporter des patients assis, payés selon la convention-cadre nationale approuvée par l’arrêté du 29 juillet 2025, appliquée depuis le ${fd(CPAM_TARIFS_DEPUIS, 'fr')}. La convention locale vaut un an, renouvelable dans la limite de ${X.cpam_convention_ans} ans. Il impose aussi d’équiper chaque véhicule, avant le ${fd(X.cpam_equipement_avant, 'fr')}, d’une géolocalisation certifiée par l’Assurance maladie et du système de facturation SEFI, et de proposer le transport partagé quand l’ordonnance l’autorise.` },
    ],
    body: (h) => `
<h2>Les quatre conditions personnelles</h2>
<p>Avant toute inscription, vérifiez quatre points, que la préfecture contrôlera au moment de délivrer la carte. Le permis B doit dater d’au moins ${A.permis_anciennete_ans} ans, ou ${A.permis_conduite_accompagnee_ans} ans si vous l’avez obtenu après une conduite accompagnée, et la période probatoire doit être terminée : la CMA refuse l’inscription à l’examen tant qu’elle court. Le bulletin n° 2 du casier judiciaire ne doit mentionner aucune des condamnations listées à l’${h.src('ctR3120_8', 'article R3120-8 du code des transports')}.</p>
<p>Il faut aussi un avis médical favorable sur le cerfa n° 14880, rendu par un médecin agréé par la préfecture. Votre médecin traitant ne peut pas le signer ; la liste des médecins agréés est publiée par chaque préfecture. La quatrième condition est propre au taxi : une attestation de formation aux premiers secours, le PSC1 (prévention et secours civiques de niveau 1), suivie depuis moins de ${A.psc1_validite_ans} ans. Les chauffeurs VTC n’y sont pas soumis. La CMA le rappelle dans ses ${h.src('cmaConditions', 'conditions d’accès d’octobre 2025')}.</p>
<p>Ni le certificat médical ni le PSC1 ne sont demandés pour s’inscrire à l’examen. Ils servent plus tard, pour la carte. Ne les faites pas trop tôt : un certificat ou une attestation périmés de quelques semaines obligent à recommencer.</p>

<h2>La formation taxi : utile, pas obligatoire</h2>
<p>On peut se présenter en candidat libre. Service-public décrit pourtant la formation comme « fortement recommandée » pour réussir, et l’on comprend pourquoi en regardant le programme : réglementation nationale et locale, gestion d’entreprise, sécurité routière, français, anglais, puis une épreuve de conduite où il faut manier taximètre, imprimante et terminal de paiement sous le regard d’un jury.</p>
<p>Les centres agréés, dont la liste est publiée par la préfecture, annoncent de ${A.formation_heures_min} à ${A.formation_heures_max} heures environ, pour un prix de ${h.eur(A.formation_cout_min)} à ${h.eur(A.formation_cout_max)} selon service-public. Le compte personnel de formation peut la financer, et France Travail peut aider un demandeur d’emploi. Ce site ne recommande aucun centre : comparez les devis, demandez si la location du véhicule équipé pour l’épreuve pratique est comprise, car les droits d’examen ne la couvrent pas.</p>
<p>Le mini-simulateur en haut de page additionne ce que coûte l’ensemble avant la première course, à partir de vos propres devis. Le détail ligne par ligne est dans le ${h.a('cout-acces-metier', 'simulateur de coût d’accès au métier')}.</p>

<h2>L’examen de la chambre de métiers</h2>
<p>L’examen est commun dans son architecture aux taxis, aux VTC et aux motos-taxis, mais deux épreuves écrites sur sept sont propres au taxi, dont l’une porte sur le territoire et la réglementation de votre département. Les écrits se valident avec une moyenne pondérée d’au moins ${E.admissibilite_moyenne} sur 20 sans note éliminatoire, puis vient une épreuve pratique notée sur 20, réussie à partir de ${E.pratique_admis}. L’inscription se fait en ligne auprès de la CMA, pour ${h.eur(A.examen_complet)} en 2026.</p>
<p>Les épreuves, leurs durées, leurs coefficients et le barème de la conduite sont détaillés sur la page ${h.a('examen-taxi', 'examen taxi')}, avec un simulateur de note pour l’épreuve pratique. Retenez ici une conséquence pratique : le candidat taxi est convoqué à l’épreuve pratique dans le département où il veut exercer, et c’est dans ce département que sa carte vaudra.</p>

<h2>La carte professionnelle, liée à un département</h2>
<p>Avec l’attestation de réussite de la CMA, vous déposez la demande de carte de conducteur de taxi en ligne, sur Démarches simplifiées. La préfecture vérifie l’identité, le permis, l’avis médical, le PSC1 et l’attestation d’aptitude. La carte coûte environ ${h.eur(A.carte_pro_environ)} et vaut ${A.carte_validite_ans} ans. Rien n’oblige à la demander aussitôt, mais une demande déposée plus de ${CARTE_DEMANDE_TARDIVE_ANS} ans après l’examen doit être accompagnée d’une attestation de formation continue de moins de ${CARTE_DEMANDE_TARDIVE_ANS} ans, selon service-public.</p>
<p>La différence avec le VTC est géographique : la carte taxi ne permet d’exercer que dans le département de l’examen. L’autorité administrative peut adresser un avertissement, ou retirer la carte temporairement ou définitivement, au conducteur qui enfreint la réglementation de la profession.</p>

<h3>La mobilité vers d’autres départements</h3>
<p>Vous déménagez, ou votre clientèle déborde sur le département voisin ? La mobilité interdépartementale vous l’ouvre, dans la limite de ${X.mobilite_max_departements} départements. Elle passe par un stage de ${X.mobilite_heures} heures, ou ${X.mobilite_heures_paris} heures pour Paris, consacré à la géographie, aux sites touristiques et à la réglementation locale du nouveau territoire. Avec l’attestation de stage, on demande une nouvelle carte portant les départements autorisés, au même prix d’environ ${h.eur(A.carte_pro_environ)}. Le cadre est fixé par l’${h.src('arreteFormationContinue', 'arrêté du 11 août 2017')}.</p>

<h2>Artisan, locataire ou salarié : trois façons d’exercer</h2>
<p>Service-public distingue trois statuts. Ils ne demandent pas le même argent au départ et ne laissent pas le même revenu à la fin du mois.</p>
${h.table(['Statut', 'Licence', 'Véhicule', 'Rémunération'], [
  ['Artisan', 'à vous, gratuite ou achetée', 'à votre charge, entretien et assurance compris', 'tout le bénéfice'],
  ['Locataire (location-gérance)', `louée, contrat d’au moins ${X.location_gerance_min_ans} an`, 'entretenu par l’entreprise de location', 'toutes les recettes, moins le loyer'],
  ['Salarié', 'détenue par l’employeur', 'entretenu et assuré par l’employeur', 'un fixe et un pourcentage des recettes du compteur'],
], 'Source : service-public, fiche F21907 vérifiée le 13 juillet 2026')}
<p>L’artisan exerce une activité artisanale au sens de l’${h.src('artisanatL125_5', 'article L125-5 du code de l’artisanat')} : il crée son entreprise (micro-entreprise, entreprise individuelle, EURL ou SASU) et l’immatricule au registre national des entreprises. Le locataire est lui aussi indépendant ; service-public signale qu’il n’a pas droit à l’assurance chômage s’il arrête. Le salarié, lui, a un contrat de travail. Pour ce qui reste à chacun, voyez ${h.a('salaire-taxi', 'combien gagne un taxi')}, où les trois cas sont chiffrés avec le simulateur.</p>

<h2>La licence : la vraie barrière d’entrée</h2>
<p>Un taxi ne roule pas sans autorisation de stationnement, l’ADS, que tout le monde appelle licence ou plaque. Elle est attachée au véhicule, son territoire est programmé dans le taximètre, et c’est elle qui donne le droit à la maraude : charger un client qui vous hèle dans la rue ou vous attend à une station.</p>
<p>Trois voies existent. La mairie, ou la préfecture de police à Paris, attribue gratuitement les nouvelles licences par liste d’attente, avec une priorité aux conducteurs déjà en activité depuis ${X.ads_priorite_activite_ans} ans. Un titulaire d’une ancienne licence peut vous la vendre à un prix libre, que service-public situe entre ${h.eur(X.ads_prix_min)} et ${h.eur(X.ads_prix_max)}. Une entreprise spécialisée peut vous en louer une. La carte professionnelle est exigée pour la demander gratuitement ou la louer.</p>
<p>Les règles d’incessibilité, la durée de validité, les prix publiés et le calcul achat contre location sont sur la page ${h.a('licence-taxi', 'licence de taxi')}. Le simulateur ci-dessous en donne un premier aperçu avec vos chiffres.</p>
<!--mini:licenceTaxi-->

<h2>Hors de sa zone : la réservation préalable</h2>
<p>La licence fixe un territoire. Dehors, la maraude n’est plus permise : vous ne pouvez prendre un client qu’après une réservation, et vous devez pouvoir en présenter le justificatif à un contrôle, sur papier ou sur écran. Les ${h.src('ctL3121', 'articles L3121-11 et suivants du code des transports')} posent le principe ; l’${h.src('arreteReservationTaxi', 'arrêté du 6 août 2025')} liste les mentions : numéro de l’ADS, nom et coordonnées de l’exploitant, numéro Siren, nom et téléphone du client, date et heure de la réservation, date, heure et lieu de prise en charge souhaités.</p>
<p>La même règle vaut pour un conducteur qui n’a pas de licence. Si le nom ou le téléphone du client manque, il faut donner sans délai à l’agent le moyen de le joindre. Gardez l’habitude de tout consigner dans votre application de réservation : c’est votre défense en cas de contrôle.</p>

<h2>Le véhicule et ses équipements obligatoires</h2>
<p>Le véhicule compte au plus ${TAXI_PLACES_MAX} places assises, conducteur compris. Service-public énumère ce qu’il doit porter :</p>
<ul>
<li>le dispositif lumineux de toit, avec la mention « taxi » et le nom de la commune, vert quand le taxi est libre, rouge quand il est occupé ;</li>
<li>le taximètre, qui mesure le temps et la distance et doit rester visible du client ;</li>
<li>un terminal de paiement par carte bancaire ;</li>
<li>une imprimante reliée au taximètre pour remettre la note ;</li>
<li>une plaque visible de l’extérieur avec le numéro de l’ADS et le ou les départements d’exercice.</li>
</ul>
<p>Le contrôle technique est dû la première année puis chaque année, sans convocation : c’est à vous d’y penser, et le taximètre comme le lumineux y sont vérifiés. L’assurance doit couvrir un usage professionnel, avec une responsabilité civile professionnelle. Les tarifs de course, plafonnés par arrêté et actualisés chaque année dans le taximètre, relèvent du ${h.src('spTarifsTaxi', 'cadre réglementaire des tarifs')} ; ce site n’en publie pas la grille, qui concerne le client.</p>
<p>Service-public cite aussi un smartphone muni d’une application agréée par le.taxi, le registre de disponibilité des taxis. Ce service est suspendu depuis le ${h.date(LE_TAXI_SUSPENSION)}, et les obligations qui s’y rattachent ne peuvent plus être remplies depuis cette date.</p>
<h3>Le taxi-relais en cas de panne</h3>
<p>Si votre véhicule est immobilisé par une panne, un accident ou un vol, vous pouvez rouler temporairement avec un véhicule de remplacement, le taxi-relais. Les véhicules disponibles dans chaque département figurent dans un répertoire en ligne sur le site MesADS. Le recours est temporaire : il couvre l’immobilisation, pas un changement de véhicule.</p>

<h2>Le conventionnement CPAM et le transport de patients</h2>
<p>Beaucoup de taxis hors des grandes villes vivent en partie du transport assis de patients, remboursé par l’Assurance maladie. Il faut pour cela signer avec la caisse une convention calquée sur la ${h.src('conventionCadreTaxi', 'convention-cadre approuvée par l’arrêté du 29 juillet 2025')}. Ses tarifs s’appliquent depuis le ${h.date(CPAM_TARIFS_DEPUIS)} ; la convention vaut un an, renouvelable dans la limite de ${X.cpam_convention_ans} ans. Le détail figure sur la page ${h.a('taxi-conventionne', 'taxi conventionné')}.</p>
<p>Deux équipements deviennent obligatoires sur tous les véhicules conventionnés avant le ${h.date(X.cpam_equipement_avant)} : une géolocalisation certifiée par l’Assurance maladie, qui enregistre le lieu et l’heure de prise en charge et d’arrivée, et le SEFI, système électronique de facturation intégré, qui facture le kilométrage réel. Le SEFI suppose d’obtenir au préalable une carte de dirigeant ou de personnel d’établissement de santé auprès de l’Agence du numérique en santé. Budgétez ces deux équipements dès l’achat du véhicule si vous visez ce marché.</p>
<p>La convention impose enfin de proposer le transport partagé quand l’ordonnance le permet, pour certains soins (chimiothérapie, radiothérapie, dialyse, rééducation, hôpital de jour) : pas plus de ${PARTAGE_DETOUR_KM} km de détour, un rayon de ${PARTAGE_RAYON_KM} km autour de la destination, ${PARTAGE_ATTENTE_MIN} minutes d’attente supplémentaire au plus. Un patient qui refuse paie directement la course, et le refus est noté sur la facture.</p>

<h2>Après le démarrage : ce qui revient chaque année ou tous les cinq ans</h2>
<p>La carte expire au bout de ${A.carte_validite_ans} ans. Pour la renouveler, on suit un stage de formation continue de ${A.formation_continue_heures} heures sur deux jours, au plus tard ${A.formation_continue_avant_mois} mois avant l’échéance, puis on redemande la carte. Le contenu du stage est sur la page ${h.a('formation-continue-vtc-taxi', 'formation continue')}, et le ${h.a('calendrier-renouvellement', 'calendrier de renouvellement')} calcule vos dates.</p>
<p>Une licence obtenue gratuitement depuis le ${h.date(X.ads_date_incessibilite)} vaut ${X.ads_gratuite_validite_ans} ans ; son renouvellement se demande ${X.ads_renouvellement_avant_mois} mois avant la fin. Chaque année, enfin : le contrôle technique, la mise à jour du taximètre aux nouveaux tarifs, et la déclaration de vos recettes, avec la TVA à ${h.pct(P.tva.taux_transport, 0)} sur le transport de voyageurs dès que vous dépassez la franchise (voir ${h.a('tva-vtc-taxi', 'la TVA du taxi')}).</p>

<h2>L’ordre des démarches, résumé en une liste</h2>
<ol>
<li>Vérifier le permis, le casier et la fin de la période probatoire.</li>
<li>Choisir de se former ou non, puis s’inscrire à l’examen auprès de la CMA.</li>
<li>Réussir les écrits, puis l’épreuve pratique dans le département visé.</li>
<li>Passer le PSC1 et la visite chez le médecin agréé, dans les deux ans qui précèdent la demande de carte.</li>
<li>Demander la carte sur Démarches simplifiées.</li>
<li>Choisir son statut, créer son entreprise si l’on est artisan ou locataire.</li>
<li>Obtenir, acheter ou louer une licence, ou signer un contrat de travail.</li>
<li>Équiper et assurer le véhicule, puis signer la convention CPAM si on la vise.</li>
</ol>
<p>Le taxi n’est pas le seul métier de chauffeur accessible par l’examen de la CMA. Si l’attente d’une licence vous décourage, comparez avec le ${h.a('devenir-chauffeur-vtc', 'parcours VTC')}, sans licence mais sans maraude.</p>
`,
  },
  en: {
    slug: 'become-a-taxi-driver-france',
    nav: 'Becoming a taxi driver',
    card: 'Requirements, training, exam, card, licence, status and health-insurance work.',
    title: 'Become a Taxi Driver in France 2026: Exam, Card, Licence',
    description: `Becoming a taxi driver in France, 2026: first-aid course under ${A.psc1_validite_ans} years, optional training, €${A.examen_complet} CMA exam, a card tied to one département, the ADS licence.`,
    h1: 'How to become a taxi driver in France, from training to your first fare',
    intro: 'Eight steps stand between a car licence and your first metered fare, and the exam is not the slowest one.',
    resume: `To work as a taxi driver in France in 2026 you need a category B licence held for ${A.permis_anciennete_ans} years (${A.permis_conduite_accompagnee_ans} after accompanied driving), a criminal record free of the convictions listed in article R3120-8 of the Transport Code, a favourable opinion from a prefecture-approved doctor and a PSC1 first-aid certificate under ${A.psc1_validite_ans} years old. You then sit the exam run by the chamber of trades (CMA), €${A.examen_complet} in 2026. Training is recommended but optional; service-public puts it at ${A.formation_heures_min} to ${A.formation_heures_max} hours for ${fe(A.formation_cout_min, 'en')} to ${fe(A.formation_cout_max, 'en')}. The professional card costs about €${A.carte_pro_environ} and only covers the département (county-level area) where you passed, unless you take a mobility course. The hardest part comes last: you need a licence, called an ADS (parking authorisation). You can wait years for a free one, buy one for ${fe(X.ads_prix_min, 'en')} to ${fe(X.ads_prix_max, 'en')}, rent one, or drive as an employee on your employer’s licence.`,
    faqs: [
      { q: 'Do I have to take a taxi training course before the exam?', a: `No. Service-public calls it strongly recommended but optional, and the CMA accepts independent candidates. Approved schools run roughly ${A.formation_heures_min} to ${A.formation_heures_max} hours for €${A.formation_cout_min} to €${A.formation_cout_max}, and your personal training account (CPF) can pay for it. The only compulsory course is PSC1 first aid, taken within ${A.psc1_validite_ans} years, and it is only checked when you apply for the card.` },
      { q: 'How long does the whole process take in practice?', a: `Once your file is validated, the CMA’s rules guarantee you can sit the papers and get your driving test result within ${CMA_GARANTIE_MOIS} months of filing. Add any training, then the card application, for which no text sets a processing time. The licence is the slow part: service-public warns that the waiting list for a free ADS in a big city often runs to several years.` },
      { q: 'Can I drive a taxi without owning a licence?', a: 'Yes, in two ways described by service-public. As an employee of a taxi firm, you drive on the employer’s licence and earn a fixed wage plus a share of the meter takings. As a tenant, you sign a lease-management contract (location-gérance) of at least one year and pay monthly rent. Either way you still need the professional card, and without an ADS every ride must be booked in advance.' },
      { q: 'I passed the exam in one département. Can I work in another one?', a: `Not straight away: the card only covers the département where you passed. To add others you take a ${X.mobilite_heures}-hour mobility course (${X.mobilite_heures_paris} hours for Paris) at an approved centre and apply for a new card, about €${A.carte_pro_environ}. Service-public caps the total at ${X.mobilite_max_departements} départements.` },
      { q: 'Do I need a fresh first-aid certificate every time the taxi card is renewed?', a: `The texts we read only require a PSC1 certificate under ${A.psc1_validite_ans} years old when you first apply for the card, together with the CMA pass certificate. For renewal every ${A.carte_validite_ans} years, service-public only mentions the ${A.formation_continue_heures}-hour continuing training course. Check the list of documents shown on the form on the day you apply.` },
      { q: 'I already hold a VTC card. Do I have to sit the whole taxi exam?', a: `Not if you passed the full VTC written papers less than ${E.mobilite_validite_ans} years ago. Under the CMA’s professional mobility rule, you only sit the two taxi-specific papers and the driving test, for €${A.examen_mobilite} in 2026. A VTC card obtained through work experience does not qualify, because its holder never passed the common papers.` },
      { q: 'Is it worth signing the health-insurance agreement as a new taxi driver?', a: `It opens up seated patient transport paid by the national health insurance (Assurance maladie), under the national framework agreement approved by the order of 29 July 2025, applied since ${fd(CPAM_TARIFS_DEPUIS, 'en')}. The local agreement runs for one year, renewable up to ${X.cpam_convention_ans} years. It also means fitting every vehicle with certified geolocation and the SEFI billing system before ${fd(X.cpam_equipement_avant, 'en')}, and offering shared rides when the prescription allows it.` },
    ],
    body: (h) => `
<h2>Four personal requirements</h2>
<p>The prefecture (the State’s office in each département) checks four things when it issues your card, so confirm them before you pay for anything. Your category B licence must be at least ${A.permis_anciennete_ans} years old, or ${A.permis_conduite_accompagnee_ans} if you learned through accompanied driving, and your probationary period must be over; the CMA will not even register you while it runs. A licence from outside the EU is accepted for exam registration only within a year of settling in France, so newcomers should not wait. Your criminal record extract (bulletin no. 2) must not show any conviction listed in ${h.src('ctR3120_8', 'article R3120-8 of the Transport Code')}.</p>
<p>You also need a favourable medical opinion on form cerfa no. 14880, signed by a doctor approved by the prefecture; your own GP cannot sign it. The fourth requirement applies to taxis only: a PSC1 certificate, the basic French civil first-aid course, taken within the last ${A.psc1_validite_ans} years. VTC drivers are exempt. The CMA lists all of this in its ${h.src('cmaConditions', 'October 2025 access conditions')}.</p>
<p>Neither the medical opinion nor the first-aid certificate is needed to register for the exam. They come into play later, for the card, so time them carefully: one that expired a few weeks before you apply has to be redone.</p>

<h2>Taxi training: useful but optional</h2>
<p>You can sit the exam as an independent candidate. Service-public still describes training as strongly recommended, and the syllabus explains why: national and local regulations, business management, road safety, French, English, and a driving test where you operate a meter, a receipt printer and a card terminal while two examiners play passengers. If French is not your first language, the French paper and the local rules paper deserve the most preparation time.</p>
<p>Approved schools, listed on each prefecture’s website, advertise roughly ${A.formation_heures_min} to ${A.formation_heures_max} hours, at ${h.eur(A.formation_cout_min)} to ${h.eur(A.formation_cout_max)} according to service-public. Your CPF (compte personnel de formation, the training credit every worker in France accrues) can fund it, and France Travail, the public employment service, may help jobseekers. We do not recommend any school. Compare quotes and ask whether the equipped car for the driving test is included, because the exam fee does not cover it.</p>
<p>The calculator at the top of this page adds up what you will spend before your first fare, using your own quotes. The ${h.a('cout-acces-metier', 'start-up cost calculator')} breaks it down line by line.</p>

<h2>The chamber of trades exam</h2>
<p>Taxi, VTC and motorbike-taxi candidates share the same exam framework, but two of the seven written papers are taxi-only, and one of them tests the geography and local rules of your département. You pass the written stage with a weighted average of at least ${E.admissibilite_moyenne} out of 20 and no paper below its elimination mark, then take a practical test marked out of 20, with ${E.pratique_admis} needed to pass. You register online with the CMA, at ${h.eur(A.examen_complet)} in 2026.</p>
<p>Papers, timings, weightings and the driving-test scale are set out on the ${h.a('examen-taxi', 'taxi exam')} page, which also has a calculator for your practical mark. One consequence matters here: taxi candidates take the driving test in the département where they intend to work, and that is where the card will be valid.</p>

<h2>A professional card tied to one département</h2>
<p>With the CMA pass certificate, you apply for the taxi driver card online on Démarches simplifiées, the government forms portal, which works in French only. The prefecture checks your ID, licence, medical opinion, first-aid certificate and exam result. The card costs about ${h.eur(A.carte_pro_environ)} and lasts ${A.carte_validite_ans} years. There is no deadline after the exam, but if you apply more than ${CARTE_DEMANDE_TARDIVE_ANS} years later, service-public says you must add a continuing-training certificate under ${CARTE_DEMANDE_TARDIVE_ANS} years old.</p>
<p>The big difference from VTC work is geographical: a taxi card only lets you work in the département where you passed. The authorities can warn a driver who breaks the profession’s rules, or withdraw the card for a period or for good.</p>

<h3>Adding départements: taxi mobility</h3>
<p>If you move, or your customers live across the border of the next département, interdepartmental mobility lets you extend the card, up to ${X.mobilite_max_departements} départements. It requires a ${X.mobilite_heures}-hour course, ${X.mobilite_heures_paris} hours for Paris, covering the new area’s streets, landmarks and local rules. With the course certificate you request a new card listing the authorised départements, again about ${h.eur(A.carte_pro_environ)}. The framework comes from the ${h.src('arreteFormationContinue', 'order of 11 August 2017')}.</p>

<h2>Owner, tenant or employee</h2>
<p>Service-public describes three ways to work. They need very different sums up front and leave very different amounts at the end of the month.</p>
${h.table(['Status', 'Licence', 'Vehicle', 'Pay'], [
  ['Owner-driver (artisan)', 'yours, free or bought', 'your cost, including upkeep and insurance', 'all the profit'],
  ['Tenant (location-gérance)', `rented, contract of at least ${X.location_gerance_min_ans} year`, 'maintained by the rental firm', 'all takings, minus the rent'],
  ['Employee', 'held by the employer', 'maintained and insured by the employer', 'fixed wage plus a share of meter takings'],
], 'Source: service-public, page F21907 checked on 13 July 2026')}
<p>An owner-driver is an artisan, the French legal category for skilled trades, under ${h.src('artisanatL125_5', 'article L125-5 of the Crafts Code')}. You set up a business (micro-entreprise, sole trader, single-member company) and register it on the national business register. A tenant is self-employed too, and service-public points out that tenants get no unemployment benefit if they stop. An employee has an ordinary work contract. For what each one actually keeps, see ${h.a('salaire-taxi', 'taxi driver earnings')}, where all three cases are run through the calculator.</p>

<h2>The licence is the real hurdle</h2>
<p>No taxi runs without an ADS (autorisation de stationnement), which drivers call the licence or the plate. It belongs to the vehicle, its area is programmed into the meter, and it alone gives you the right to pick up passengers who hail you in the street or queue at a rank.</p>
<p>You can get one in three ways. The town hall, or the Préfecture de police in Paris, hands out new licences free of charge from a waiting list, giving priority to drivers already working for ${X.ads_priorite_activite_ans} years. The holder of an older licence can sell you theirs at a price they set, which service-public puts between ${h.eur(X.ads_prix_min)} and ${h.eur(X.ads_prix_max)}. A specialist firm can rent you one. You need the professional card to apply for a free licence or to rent one.</p>
<p>Transfer rules, validity, published prices and a buy-versus-rent calculation are on the ${h.a('licence-taxi', 'taxi licence')} page. The calculator below gives a first answer with your own figures.</p>
<!--mini:licenceTaxi-->

<h2>Outside your area, bookings only</h2>
<p>The licence defines a territory. Beyond it, you may not pick up anyone who flags you down: the ride must have been booked first, and you must be able to show proof of the booking at a roadside check, on paper or on screen. ${h.src('ctL3121', 'Articles L3121-11 onwards of the Transport Code')} set the principle, and the ${h.src('arreteReservationTaxi', 'order of 6 August 2025')} lists what the proof must contain: the ADS number, the operator’s name and contact details, the Siren business number, the customer’s name and phone number, the time the booking was made, and the requested pick-up date, time and place.</p>
<p>The same applies to a driver with no licence at all. If the customer’s name or number is missing, you must give the officer a way to reach them on the spot. Logging every booking in an app is the simplest protection.</p>

<h2>The car and its compulsory equipment</h2>
<p>A taxi seats no more than ${TAXI_PLACES_MAX} people including the driver. Service-public lists what it must carry:</p>
<ul>
<li>a roof sign reading “taxi” with the name of the town, lit green when free and red when taken;</li>
<li>a meter recording time and distance, visible to the passenger;</li>
<li>a card payment terminal;</li>
<li>a printer linked to the meter for receipts;</li>
<li>a plate, readable from outside, showing the ADS number and the département or départements where you may work.</li>
</ul>
<p>The roadworthiness test (contrôle technique) is due in the first year and then every year, with no reminder sent; the meter and roof sign are checked as part of it. Your insurance must cover professional use, with professional liability cover. Fares are capped by a ministerial order and updated in the meter every year under the ${h.src('spTarifsTaxi', 'official fare rules')}; this site leaves the fare table itself to passenger-facing sites.</p>
<p>Service-public also mentions a smartphone with an app approved by le.taxi, the national taxi availability register. That service has been suspended since ${h.date(LE_TAXI_SUSPENSION)}, and the obligations linked to it cannot be met since then.</p>
<h3>Taxi-relais: a replacement car</h3>
<p>If your car is off the road after a breakdown, an accident or a theft, you may temporarily drive a registered replacement vehicle, known as a taxi-relais. The MesADS website keeps a directory of those available in each département. It covers the period of immobilisation, not a permanent change of car.</p>

<h2>Health-insurance work (CPAM agreement)</h2>
<p>Outside the big cities, many taxi drivers earn a good part of their income driving seated patients to treatment, paid by the health insurance fund (CPAM). To do so you sign an agreement with the local fund based on the ${h.src('conventionCadreTaxi', 'framework agreement approved by the order of 29 July 2025')}. Its fares have applied since ${h.date(CPAM_TARIFS_DEPUIS)}; the agreement runs for one year, renewable up to ${X.cpam_convention_ans} years. The ${h.a('taxi-conventionne', 'CPAM-approved taxi')} page has the details.</p>
<p>Before ${h.date(X.cpam_equipement_avant)}, every vehicle under the agreement must be fitted with geolocation certified by the health insurance, recording pick-up and drop-off times and places, and with SEFI, the integrated electronic billing system that charges the real distance driven. To install SEFI you first need a healthcare establishment card from the Agence du numérique en santé, the digital health agency. If you plan to do this work, cost both devices into your vehicle budget from day one.</p>
<p>The agreement also requires you to offer shared rides when the prescription allows it, for treatments such as chemotherapy, radiotherapy, dialysis, rehabilitation and day hospital care: a detour of no more than ${PARTAGE_DETOUR_KM} km, within ${PARTAGE_RAYON_KM} km of the destination, and no more than ${PARTAGE_ATTENTE_MIN} extra minutes of waiting. A patient who refuses pays the fare directly, and the refusal is noted on the invoice.</p>

<h2>Once you are up and running</h2>
<p>The card expires after ${A.carte_validite_ans} years. Renewal requires a ${A.formation_continue_heures}-hour continuing training course over two days, at least ${A.formation_continue_avant_mois} months before expiry, followed by a new application. The course is covered on the ${h.a('formation-continue-vtc-taxi', 'continuing training')} page, and the ${h.a('calendrier-renouvellement', 'renewal calendar')} works out your dates.</p>
<p>A free licence issued since ${h.date(X.ads_date_incessibilite)} lasts ${X.ads_gratuite_validite_ans} years, and renewal must be requested ${X.ads_renouvellement_avant_mois} months before it ends. Every year there is also the roadworthiness test, the meter update for new fares, and your tax return, with ${h.pct(P.tva.taux_transport, 0)} VAT on passenger transport once you pass the exemption threshold (see ${h.a('tva-vtc-taxi', 'VAT for taxi drivers')}).</p>

<h2>The steps in order</h2>
<ol>
<li>Check your licence age, criminal record and probationary period.</li>
<li>Decide whether to train, then register for the exam with the CMA.</li>
<li>Pass the written papers, then the driving test in your chosen département.</li>
<li>Take PSC1 and see the approved doctor within the two years before applying for the card.</li>
<li>Apply for the card on Démarches simplifiées.</li>
<li>Pick a status and, as owner or tenant, register your business.</li>
<li>Obtain, buy or rent a licence, or sign a work contract.</li>
<li>Equip and insure the car, then sign the CPAM agreement if you want patient work.</li>
</ol>
<p>The CMA exam also leads to private-hire work. If the wait for a licence puts you off, compare with the ${h.a('devenir-chauffeur-vtc', 'VTC route')}, which needs no licence but rules out street hails.</p>
`,
  },
});
