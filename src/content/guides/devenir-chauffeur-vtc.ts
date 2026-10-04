import { defineGuide } from '../../lib/guide-types';
import { P } from '../../lib/engine/params';

const A = P.acces;
const V = P.vehicule_vtc;
const M = P.micro;
const PL = P.plateformes;

// Valeurs lues dans params-2026.json ; source : : règlement CMA de l’examen T3P (version de décembre 2024),
// art. III.3, https://www.exament3p.fr/media/pdf/cma_reglement_examen_taxi.pdf
const EXAMEN_GARANTIE_MOIS = P.examen.reglement.garantie_mois;
// Valeurs lues dans params-2026.json ; source : : même règlement, art. III.1 (permis délivré hors UE/EEE)
const PERMIS_HORS_UE_ANCIENNETE_ANS = P.examen.reglement.permis_hors_ue_anciennete_ans;
const PERMIS_HORS_UE_RESIDENCE_ANS = P.examen.reglement.permis_hors_ue_residence_ans;
// Valeurs lues dans params-2026.json ; source : : service-public F31027, étape 6 (pièce manquante au Guichet des formalités)
// https://entreprendre.service-public.gouv.fr/vosdroits/F31027
const GUICHET_PIECE_MANQUANTE_JOURS = P.acces.guichet_piece_manquante_jours;

/** Frais fixés ou indiqués par les textes, avant le premier client (hors véhicule, formation et médecin). */
const REGLEMENTES = A.examen_complet + A.carte_pro_environ + A.registre_inscription + A.vignette_environ;

export default defineGuide({
  id: 'devenir-chauffeur-vtc',
  group: 'vtc',
  order: 10,
  mini: 'budgetVtc',
  miniHref: 'cout-acces-metier',
  related: ['examen-vtc', 'carte-vtc', 'registre-vtc', 'vehicule-vtc', 'salaire-chauffeur-vtc', 'cout-acces-metier'],
  sources: ['spVtc', 'cmaT3p', 'cmaReglement', 'decretEquivalence', 'ctL3122_3', 'ctR3122', 'ctL3120', 'arreteVehicule', 'arreteReservationVtc', 'arpeRevenuCourse', 'arpeRevenuHoraire', 'urssafAe'],
  fr: {
    slug: 'devenir-chauffeur-vtc',
    nav: 'Devenir VTC',
    card: 'Le parcours complet, de l’examen à la première course, dans l’ordre.',
    title: 'Devenir chauffeur VTC en 2026 : étapes, examen, coût, règles',
    description: `Devenir chauffeur VTC en 2026 : conditions, examen à ${A.examen_complet} €, carte, entreprise au RNE, registre à ${A.registre_inscription} €, voiture, vignette et règles de prise en charge.`,
    h1: 'Devenir chauffeur VTC : le parcours complet, étape par étape',
    intro: 'Douze étapes séparent le permis B de la première course facturée ; voici l’ordre qui évite de payer deux fois.',
    resume: `Pour devenir chauffeur VTC en 2026, il faut détenir le permis B depuis ${A.permis_anciennete_ans} ans (${A.permis_conduite_accompagnee_ans} ans après une conduite accompagnée), avoir un casier judiciaire compatible et réussir l’examen des chambres de métiers et de l’artisanat, facturé ${A.examen_complet} € cette année. Depuis le 12 août 2026, l’examen est la seule voie d’accès : le décret n° 2026-764 a fermé l’équivalence par l’expérience. Viennent ensuite la carte professionnelle (environ ${A.carte_pro_environ} €, avec l’avis d’un médecin agréé), l’immatriculation de votre entreprise au registre national des entreprises dans le secteur de l’artisanat, puis l’inscription au registre des VTC (${A.registre_inscription} €), une assurance de responsabilité civile professionnelle, une voiture conforme et la vignette rouge (environ ${A.vignette_environ} €). Sans compter la formation, facultative, ni le véhicule, les frais indiqués par les textes s’élèvent à ${REGLEMENTES} €. Au volant, chaque course doit avoir été réservée à l’avance : la maraude est interdite et punie depuis le 27 juin 2026 de ${A.sanction_prison_ans} ans de prison et ${A.sanction_amende_personne} € d’amende.`,
    faqs: [
      { q: 'Combien de temps faut-il compter entre la décision et la première course en VTC ?', a: `Le seul délai garanti est celui de la CMA : une fois le dossier d’examen validé, elle s’engage à vous faire passer les épreuves et à publier le résultat de la pratique dans les ${EXAMEN_GARANTIE_MOIS} mois suivant son dépôt (règlement, art. III.3). La préfecture n’a pas de délai publié pour la carte. Le registre des VTC dispose ensuite de ${A.registre_delai_mois} mois au plus après un dossier complet (article R3122-2). Une préparation de quelques semaines s’ajoute en amont.` },
      { q: 'Peut-on réussir l’examen VTC en candidat libre, sans payer de centre ?', a: `Oui. Le règlement de la CMA ouvre l’examen « en candidature libre ou à la fin d’un parcours de formation », et service-public qualifie la formation de fortement recommandée mais non obligatoire. Le candidat libre doit tout de même louer ou fournir pour l’épreuve pratique une voiture à double commande, ce que les droits d’inscription de ${A.examen_complet} € ne couvrent pas. Les annales ne sont pas diffusées : les sujets restent confidentiels.` },
      { q: 'Faut-il immatriculer son entreprise avant ou après avoir reçu la carte VTC ?', a: `Les deux démarches peuvent avancer en parallèle après l’examen. Service-public place l’immatriculation au registre national des entreprises juste après la réussite, la carte ensuite. Ce qui compte, c’est d’avoir les deux en main pour l’inscription au registre des VTC : l’article R3122-1 du code des transports exige à la fois le justificatif d’immatriculation de l’entreprise et la copie de la carte professionnelle de chaque conducteur.` },
      { q: 'Peut-on conduire un VTC comme salarié, sans créer sa propre entreprise ?', a: `Oui. La personne qui s’inscrit au registre est l’exploitant ; il peut employer des conducteurs. Depuis le 27 juin 2026, l’article L3122-3 du code des transports l’oblige à y déclarer le nom de ces conducteurs, le numéro de leur carte professionnelle et les plaques des véhicules. Le salarié doit, lui, avoir réussi l’examen et détenir sa propre carte, valable ${A.carte_validite_ans} ans.` },
      { q: 'Un client me fait signe sur le trottoir : ai-je le droit de le prendre ?', a: `Non. L’article L3120-2 du code des transports réserve la prise en charge sans réservation aux taxis, et service-public précise que la maraude électronique est interdite comme la maraude physique. Depuis le 27 juin 2026, prendre un client sans réservation préalable expose à ${A.sanction_prison_ans} ans d’emprisonnement et ${A.sanction_amende_personne} € d’amende, avec une possible suspension du permis jusqu’à ${A.sanction_suspension_permis_ans} ans et la confiscation du véhicule.` },
      { q: 'Quel budget prévoir pour se lancer comme chauffeur VTC, voiture non comprise ?', a: `Les frais publiés font ${REGLEMENTES} € en 2026 : examen ${A.examen_complet} €, carte environ ${A.carte_pro_environ} €, registre ${A.registre_inscription} €, vignette environ ${A.vignette_environ} €. S’y ajoutent la visite chez le médecin agréé, dont le prix n’est pas réglementé, et la formation si vous en suivez une : ${A.formation_cout_min} à ${A.formation_cout_max} € selon service-public. Une voiture que vous ne possédez pas et ne louez pas plus de ${A.location_longue_mois} mois impose une garantie de ${A.garantie_financiere_par_vehicule} €.` },
      { q: 'Les plateformes de réservation garantissent-elles un minimum par course au chauffeur VTC ?', a: `Oui, par les accords signés dans le cadre de l’ARPE et repris par service-public : au moins ${PL.revenu_min_course} € par course, calculés après déduction de la commission, ${PL.revenu_min_heure} € par heure travaillée et ${PL.revenu_min_km} € par kilomètre parcouru en course. Ces planchers valent sur tout le territoire et peuvent être révisés chaque année. Ils ne disent rien du nombre de courses que vous recevrez.` },
      { q: 'Mon casier judiciaire peut-il bloquer mon projet de devenir chauffeur VTC ?', a: `Seulement si le bulletin n° 2 porte une condamnation listée à l’article R3120-8 du code des transports : délit routier ayant retiré la moitié des points, conduite sans permis ou malgré une annulation, peine criminelle, ou au moins six mois de prison pour vol, escroquerie, abus de confiance, violences, agression sexuelle, trafic d’armes, extorsion ou stupéfiants. Une autre mention n’empêche pas l’accès. La préfecture le vérifie au moment de la carte.` },
    ],
    body: (h) => `
<h2>Étape 1 : vérifier que vous remplissez les conditions</h2>
<p>Avant de dépenser un euro, contrôlez quatre points. Le permis B doit avoir au moins ${A.permis_anciennete_ans} ans, ou ${A.permis_conduite_accompagnee_ans} ans si vous l’avez obtenu par la conduite accompagnée, et sa période probatoire doit être finie : le règlement de l’examen refuse toute inscription tant qu’elle court. Le bulletin n° 2 du casier judiciaire ne doit porter aucune des condamnations de l’article R3120-8 du code des transports. Un médecin agréé par la préfecture, et non votre médecin traitant, doit rendre un avis favorable sur le formulaire cerfa n° 14880. Enfin, il faudra réussir l’examen.</p>
<p>Aucun diplôme n’est demandé : service-public précise que l’examen est ouvert quel que soit le niveau d’études. Le brevet de secourisme n’est plus obligatoire pour le VTC, alors qu’il l’est encore pour le taxi. La visite médicale n’est pas exigée pour s’inscrire à l’examen, seulement pour la carte, comme le rappelle la foire aux questions de la CMA. Placez-la donc après l’écrit : l’avis doit dater de moins de ${A.certificat_medical_validite_ans} ans le jour de la demande de carte.</p>
<p>Une condition a disparu cette année. Jusqu’au 11 août 2026, un an d’expérience de chauffeur professionnel au cours des dix dernières années permettait d’obtenir la carte sans examen. Le ${h.src('decretEquivalence', 'décret n° 2026-764 du 5 août 2026')} a supprimé cette voie pour toute demande déposée depuis le 12 août ; le détail est sur la page ${h.a('carte-vtc-equivalence', 'carte VTC par équivalence')}.</p>

<h2>Étape 2 : se préparer, avec ou sans formation</h2>
<p>La formation n’est pas obligatoire. Service-public la juge « fortement recommandée », indique une durée de ${A.formation_heures_min} à ${A.formation_heures_max} heures et un prix de ${h.eur(A.formation_cout_min)} à ${h.eur(A.formation_cout_max)} selon le centre, finançable par le compte personnel de formation (CPF) ou avec l’aide de France Travail. La liste des centres agréés de votre département se trouve auprès de la CMA ou de la préfecture.</p>
<p>Ce qu’un centre apporte surtout, c’est l’épreuve pratique : il prête la voiture à double commande exigée le jour J et fait répéter le devis, le GPS et l’accueil du client. Un candidat libre qui maîtrise déjà la gestion et la réglementation peut préparer l’écrit seul, mais devra louer un véhicule équipé pour la pratique. Les écarts entre formules, et ce qu’il faut vérifier sur un devis, sont détaillés dans le guide de la ${h.a('formation-vtc', 'formation VTC')}.</p>

<h2>Étape 3 : passer l’examen de la CMA</h2>
<p>L’inscription se fait en ligne sur la plateforme des chambres de métiers, pour ${h.eur(A.examen_complet)} en 2026 (${h.eur(A.examen_complet_2025)} en 2025). Ce prix couvre l’écrit et la pratique, pas la location du véhicule. L’écrit réunit sept épreuves, cinq communes au taxi et au VTC et deux propres au VTC : développement commercial et réglementation nationale. Il faut une moyenne pondérée d’au moins ${P.examen.admissibilite_moyenne}/20, sans note éliminatoire. Vient ensuite une mise en situation de ${P.examen.pratique_duree_max_min} minutes au plus, dont au moins ${P.examen.pratique_conduite_min} minutes de conduite, où il faut obtenir ${P.examen.pratique_admis}/20.</p>
<p>Le règlement garantit, une fois le dossier validé, de passer les épreuves et de connaître le résultat de la pratique dans les ${EXAMEN_GARANTIE_MOIS} mois. Coefficients, notes éliminatoires, barème de la conduite et règles de repassage sont sur la page ${h.a('examen-vtc', 'examen VTC (T3P)')}.</p>

<h2>Étape 4 : demander la carte professionnelle</h2>
<p>Dès réception de l’attestation de réussite, la demande se dépose en ligne sur Démarches simplifiées, avec l’avis du médecin agréé. L’Imprimerie nationale réclame ensuite environ ${h.eur(A.carte_pro_environ)}. La carte vaut ${A.carte_validite_ans} ans sur tout le territoire et se pose sur le pare-brise pendant le service. Pièces, contrôle Cerbère et pièges du dossier : voir la page ${h.a('carte-vtc', 'carte VTC')}.</p>

<h2>Étape 5 : créer l’entreprise et choisir son régime</h2>
<p>Le chauffeur VTC à son compte relève du secteur artisanal. Son entreprise s’immatricule au registre national des entreprises (RNE), sur le Guichet des formalités des entreprises, avec une pièce d’identité, un justificatif de domiciliation, une attestation de non-condamnation et une attestation de filiation. S’il manque une pièce, le guichet laisse ${GUICHET_PIECE_MANQUANTE_JOURS} jours, renouvelables une fois, pour la fournir.</p>
<p>Le choix de fond oppose l’entreprise individuelle et la société. En micro-entreprise, le chiffre d’affaires ne doit pas dépasser ${h.eur(M.seuil_services)} en 2026 pour les services ; les cotisations sont un pourcentage des recettes, ${h.pct(M.taux_bic_services, 1)} pour une prestation de service commerciale ou artisanale selon l’Urssaf, plus ${h.pct(M.cfp_artisan, 1)} de contribution à la formation professionnelle d’un artisan. L’aide à la création (Acre) réduit ce taux au début. En contrepartie, aucune charge ne se déduit : carburant, crédit, assurance et commissions restent à votre charge sans alléger les cotisations.</p>
<p>Au réel, en entreprise individuelle ou en société, les frais se déduisent et la TVA payée sur la voiture se récupère. La course de VTC est taxée à ${h.pct(P.tva.taux_transport)} ; tant que vos recettes restent sous ${h.eur(P.tva.franchise_services)}, la franchise en base vous dispense de la facturer. Le ${h.a('revenu-net-chauffeur', 'simulateur de revenu net')} compare la micro-entreprise et l’entreprise individuelle au réel ; la SASU n’y figure pas, faute de barème vérifié. Les règles de TVA propres au transport de personnes sont sur la page ${h.a('tva-vtc-taxi', 'TVA du VTC et du taxi')}.</p>

<h2>Étape 6 : s’inscrire au registre des VTC</h2>
<p>Sans inscription au registre des exploitants de VTC, aucune course n’est légale. Elle coûte ${h.eur(A.registre_inscription)}, se fait uniquement en ligne et demande l’attestation d’assurance, le justificatif d’immatriculation de l’entreprise, la carte grise, la carte professionnelle et, si la voiture n’est ni à vous ni louée plus de ${A.location_longue_mois} mois, une garantie financière de ${h.eur(A.garantie_financiere_par_vehicule)} par véhicule. L’administration a ${A.registre_delai_mois} mois après un dossier complet pour vous inscrire. Les pièces, les mises à jour obligatoires et les sanctions renforcées le 27 juin 2026 sont expliquées sur la page ${h.a('registre-vtc', 'registre VTC')}.</p>

<h2>Étape 7 : trouver une voiture conforme</h2>
<p>L’${h.src('arreteVehicule', 'arrêté du 26 mars 2015')} fixe le gabarit : moins de ${V.age_max_ans} ans (sauf voiture de collection), au moins ${V.portes_min} portes, ${h.num(V.longueur_min_m, 2)} m de long et ${h.num(V.largeur_min_m, 2)} m de large au minimum, ${V.puissance_min_kw} kW de puissance nette ou plus. Service-public ajoute une capacité de ${V.places_min} à ${V.places_max} places, conducteur compris. Les hybrides et les électriques échappent aux critères d’âge, de taille et de puissance. Aucun dispositif lumineux extérieur n’est permis, pour ne pas se confondre avec un taxi.</p>
<p>Acheter, louer longue durée ou louer à la semaine change la garantie financière demandée par le registre et le coût au kilomètre. Le ${h.a('vehicule-vtc', 'calcul du coût du véhicule')} met les options côte à côte.</p>

<h2>Étape 8 : assurer l’activité</h2>
<p>Une responsabilité civile professionnelle est obligatoire, et son attestation fait partie du dossier du registre. Service-public signale une amende pouvant atteindre ${h.eur(A.amende_sans_assurance)} sans assurance. Tous les assureurs peuvent la proposer ; vérifiez que le contrat couvre bien le transport de personnes à titre onéreux, et non un simple usage privé ou professionnel du véhicule.</p>

<h2>Étape 9 : commander et coller la vignette</h2>
<p>La signalétique rouge se commande depuis votre compte du registre, pour environ ${h.eur(A.vignette_environ)}. En attendant le modèle définitif, une vignette temporaire peut servir ${A.vignette_temporaire_jours} jours au plus. La vignette définitive se colle deux fois : en bas à gauche du pare-brise avant, côté conducteur, et en bas à droite de la lunette arrière. Elle porte votre numéro d’inscription au registre et la plaque du véhicule.</p>

<h2>Étape 10 : connaître les règles de prise en charge</h2>
<p>C’est ici que le VTC se distingue du taxi, et que les contrôles se concentrent. L’article L3120-2 du code des transports pose la règle de la réservation préalable : vous ne prenez que des clients qui ont réservé. En cas de contrôle, vous montrez un justificatif papier ou électronique dont l’${h.src('arreteReservationVtc', 'arrêté du 6 août 2025')} liste le contenu : identité de l’exploitant, nom et téléphone du client, date et heure de la réservation, date, heure et lieu de prise en charge, numéro au registre des VTC et numéro Siren.</p>
<ul>
<li>La maraude est interdite, qu’elle soit physique (rouler à vide en cherchant un client, être hélé dans la rue) ou électronique.</li>
<li>Sans réservation enregistrée après une course, vous retournez au siège de l’entreprise, à votre domicile si vous êtes à votre compte, ou dans un parking hors de la chaussée.</li>
<li>Près d’une gare ou d’un aéroport, l’attente d’un client qui a réservé ne dépasse pas ${A.stationnement_gare_max_h} heure.</li>
<li>Les prix sont libres : forfait fixé à la réservation, ou calcul selon le temps et la distance après la course.</li>
</ul>
<p>Depuis le 27 juin 2026, prendre un client sans réservation est puni de ${A.sanction_prison_ans} ans d’emprisonnement et de ${h.eur(A.sanction_amende_personne)} d’amende pour une personne physique (${h.eur(A.sanction_amende_societe)} pour une société), avec en plus une possible suspension du permis jusqu’à ${A.sanction_suspension_permis_ans} ans, l’immobilisation du véhicule jusqu’à ${A.sanction_immobilisation_ans} an et sa confiscation.</p>

<h2>Étape 11 : trouver des clients et estimer ce qui reste</h2>
<p>Deux modèles coexistent. Les plateformes de réservation envoient des courses contre une commission prélevée sur chacune ; service-public précise que cette commission et les conditions tarifaires varient d’une plateforme à l’autre, et nous ne publions aucun taux. L’autre voie consiste à bâtir sa propre clientèle, par exemple auprès d’hôtels ou d’agences de voyage. Les deux se combinent. Certaines plateformes proposent aussi des parcours « clés en main » avec examen et formation : lisez ce qui est inclus et ce qui vous engage.</p>
<p>Les chauffeurs reliés à une plateforme bénéficient de planchers négociés à l’ARPE, l’autorité des relations sociales des plateformes : ${h.eur(PL.revenu_min_course)} par course au minimum après commission (${h.src('arpeRevenuCourse', 'avenant du 19 décembre 2023')}), ${h.eur(PL.revenu_min_heure)} par heure travaillée et ${h.eur(PL.revenu_min_km)} par kilomètre en course (${h.src('arpeRevenuHoraire', 'accord du 19 décembre 2023')}). Un accord du 19 septembre 2023 impose aussi aux plateformes de mieux informer avant une désactivation de compte.</p>
<p>Un plancher n’est pas un revenu. Le mini-simulateur ci-dessous part de vos courses facturées, de la commission lue sur votre relevé et de vos heures : le résultat est une estimation du simulateur à partir de vos hypothèses et des taux officiels, jamais une promesse.</p>
<p>Pour aller plus loin, la page ${h.a('salaire-chauffeur-vtc', 'salaire d’un chauffeur VTC')} détaille les postes de charges.</p>
<!--mini:gainVtc-->

<h2>Étape 12 : tenir le calendrier des renouvellements</h2>
<p>Trois échéances reviennent. Tous les ${A.carte_validite_ans} ans, la carte se renouvelle après un stage de formation continue de ${A.formation_continue_heures} heures, à suivre ${A.formation_continue_avant_mois} mois avant l’expiration, puis un nouveau paiement d’environ ${h.eur(A.carte_pro_environ)}. Avec la nouvelle carte, l’inscription au registre se refait. Chaque année, la voiture passe au contrôle technique sans convocation, et une voiture thermique doit être remplacée avant ses ${V.age_max_ans} ans. Le ${h.a('calendrier-renouvellement', 'calendrier de renouvellement')} calcule les dates à partir de la délivrance.</p>

<h2>Le parcours résumé, avec ce qu’il coûte</h2>
${h.table(['Étape', 'Où', 'Coût indiqué par les textes'], [
  ['Médecin agréé (cerfa 14880)', 'cabinet agréé par la préfecture', 'non réglementé'],
  ['Formation (facultative)', 'centre agréé', `${h.eur(A.formation_cout_min)} à ${h.eur(A.formation_cout_max)}`],
  ['Examen T3P', 'CMA, en ligne', h.eur(A.examen_complet)],
  ['Carte professionnelle', 'Démarches simplifiées, préfecture', `environ ${h.eur(A.carte_pro_environ)}`],
  ['Immatriculation de l’entreprise', 'Guichet des formalités, RNE', 'selon la forme choisie'],
  ['Registre des VTC', 'site du registre', h.eur(A.registre_inscription)],
  ['Garantie financière (si besoin)', 'organisme financier', `${h.eur(A.garantie_financiere_par_vehicule)} par véhicule`],
  ['Vignette rouge', 'compte du registre', `environ ${h.eur(A.vignette_environ)}`],
], 'Sources : service-public F31027 (12 août 2026), CMA tarifs 2026, code des transports R3122-1')}
<p>Le premier mini-simulateur de la page, en haut, additionne ces montants avec vos propres prix de formation et de médecin. Le ${h.a('cout-acces-metier', 'simulateur de coût d’accès')} ajoute le véhicule et les premiers mois d’activité.</p>
`,
  },
  en: {
    slug: 'become-a-vtc-driver-france',
    nav: 'Becoming a VTC driver',
    card: 'Every step from the exam to your first paid ride, in order.',
    title: 'Become a VTC Driver in France 2026: Steps, Exam and Costs',
    description: `How to become a VTC driver in France in 2026: conditions, the €${A.examen_complet} CMA exam, driver card, business set-up, €${A.registre_inscription} register entry, car and booking rules.`,
    h1: 'How to become a VTC driver in France, step by step',
    intro: 'Twelve steps lie between a driving licence and your first paid fare; here is the order that saves you paying twice.',
    resume: `A VTC is France’s licensed private-hire car, the category used by ride-hailing apps and chauffeur firms. To drive one in 2026 you need a category B licence held for ${A.permis_anciennete_ans} years (${A.permis_conduite_accompagnee_ans} after accompanied driving), a clean enough criminal record and a pass in the exam run by the chambers of trades (CMA), which costs €${A.examen_complet} this year. Since 12 August 2026 that exam is the only way in, because Decree no. 2026-764 closed the work-experience route. After it you apply for the professional card (about €${A.carte_pro_environ}, with a prefecture-approved doctor’s opinion), register your business in the national business register (RNE) as a craft activity, join the VTC register (€${A.registre_inscription}), take out professional liability insurance, find a compliant car and stick on the red sticker (about €${A.vignette_environ}). Leaving out optional training and the car, the published fees add up to €${REGLEMENTES}. Every ride must be booked in advance: picking people up on the street has been punishable since 27 June 2026 by ${A.sanction_prison_ans} years in prison and a €${A.sanction_amende_personne} fine.`,
    faqs: [
      { q: 'Realistically, how long does it take to go from zero to driving paying VTC passengers?', a: `The only guaranteed timescale comes from the CMA: once your exam file is validated, it undertakes to let you sit the papers and get your practical result within ${EXAMEN_GARANTIE_MOIS} months of filing (exam rules, art. III.3). The prefecture publishes no processing time for the card. The VTC register then has up to ${A.registre_delai_mois} months after a complete file (article R3122-2 of the Transport Code). Add a few weeks of revision beforehand.` },
      { q: 'Can I sit the VTC exam as an independent candidate and skip paid training?', a: `Yes. The CMA rules open the exam to independent candidates as well as trainees, and service-public calls training strongly recommended but optional. For the practical test you still need a dual-control car, which the €${A.examen_complet} fee does not include, so independent candidates usually rent one. Past papers are not published, since the questions are kept confidential.` },
      { q: 'Should I register my business first or wait until the VTC card arrives?', a: `Run them side by side once you have passed. Service-public lists registering the business in the national register (RNE) straight after the exam and the card after that. What matters is holding both when you apply to the VTC register: article R3122-1 of the Transport Code asks for proof of business registration and a copy of each driver’s professional card.` },
      { q: 'Could I drive for a VTC company as an employee instead of going self-employed?', a: `Yes. The register entry belongs to the operator, which may employ drivers. Since 27 June 2026, article L3122-3 of the Transport Code requires the operator to declare those drivers by name, with their card numbers and the number plates it runs. As an employee you still need to pass the exam and hold your own card, valid for ${A.carte_validite_ans} years.` },
      { q: 'What if someone waves me down in the street while I am working?', a: `Drive on. Article L3120-2 of the Transport Code keeps unbooked pick-ups for taxis, and service-public adds that cruising for fares through an app is banned just like cruising on the road. Since 27 June 2026, taking an unbooked passenger can mean ${A.sanction_prison_ans} years in prison and a €${A.sanction_amende_personne} fine, a licence suspension of up to ${A.sanction_suspension_permis_ans} years and confiscation of the car.` },
      { q: 'How much money do I need to get started, not counting the car?', a: `The published fees total €${REGLEMENTES} in 2026: exam €${A.examen_complet}, card about €${A.carte_pro_environ}, register €${A.registre_inscription}, sticker about €${A.vignette_environ}. On top come the approved doctor, whose fee is not regulated, and training if you take it, which service-public puts at €${A.formation_cout_min} to €${A.formation_cout_max}. A car you neither own nor lease for over ${A.location_longue_mois} months also needs a €${A.garantie_financiere_par_vehicule} financial guarantee.` },
      { q: 'Do ride-hailing apps have to pay drivers a minimum amount per trip?', a: `Yes, under agreements negotiated through ARPE, the French authority for platform labour relations, and summarised by service-public: at least €${PL.revenu_min_course} per ride after commission, €${PL.revenu_min_heure} per hour worked and €${PL.revenu_min_km} per kilometre driven on a ride. These floors apply nationwide and may be reviewed each year. They say nothing about how many rides you will be offered.` },
      { q: 'Will a past conviction stop me from becoming a VTC driver?', a: `Only if your criminal record extract (bulletin no. 2) shows an offence listed in article R3120-8 of the Transport Code: a driving offence that cost half your points, driving unlicensed or while banned, a criminal sentence, or six months’ prison or more for theft, fraud, breach of trust, violence, sexual assault, arms trafficking, extortion or drugs. Other entries do not bar you. The prefecture checks this when you apply for the card.` },
    ],
    body: (h) => `
<h2>Step 1: check that you qualify</h2>
<p>Four personal conditions come first, and it pays to check them before spending anything. Your category B licence must be at least ${A.permis_anciennete_ans} years old, or ${A.permis_conduite_accompagnee_ans} years if you learned through accompanied driving, and out of its probationary period; the exam rules turn down candidates whose probation is still running. Your criminal record extract must be free of the convictions listed in article R3120-8 of the Transport Code. A doctor approved by the prefecture (the local office of central government), not your usual GP, has to give a favourable opinion on form cerfa no. 14880. And you have to pass the exam.</p>
<p>No qualification is required: service-public states the exam is open whatever your level of education. A first-aid certificate, still compulsory for taxi drivers, is no longer needed for VTC work. The medical is not needed to book the exam either, only for the card, as the CMA’s own FAQ points out, so leave it until after the written papers: the opinion must be under ${A.certificat_medical_validite_ans} years old when you apply for the card.</p>
<p>Holders of a licence issued outside the EU have a specific rule: the exam accepts it if it has been held for at least ${PERMIS_HORS_UE_ANCIENNETE_ANS} years, and only during the first ${PERMIS_HORS_UE_RESIDENCE_ANS} year after you take up normal residence in France. Beyond that, the rules list only EU and EEA licences, which in practice means exchanging yours for a French one where the exchange rules allow it.</p>
<p>One route vanished this summer. Until 11 August 2026, a year of professional passenger driving within the last ten years could replace the exam. ${h.src('decretEquivalence', 'Decree no. 2026-764 of 5 August 2026')} ended that for any application filed from 12 August; see the page on the ${h.a('carte-vtc-equivalence', 'VTC card by equivalence')} for what happens to older files.</p>

<h2>Step 2: prepare, with or without a course</h2>
<p>Training is optional. Service-public describes it as strongly recommended and quotes ${A.formation_heures_min} to ${A.formation_heures_max} hours for ${h.eur(A.formation_cout_min)} to ${h.eur(A.formation_cout_max)}, depending on the centre. You can pay with your personal training account (CPF, the training credit every worker in France builds up) or ask France Travail, the public employment service, about funding. Approved centres are listed by the CMA or the prefecture of your département.</p>
<p>The real value of a centre lies in the practical test. It lends you the dual-control car required on the day and drills the parts examiners watch: the quote, the GPS set-up, greeting the passenger. Someone already comfortable with bookkeeping and regulations can revise the written part alone, then rent an equipped car for the drive. The guide to ${h.a('formation-vtc', 'VTC training')} explains what to look for in a quote.</p>

<h2>Step 3: sit the CMA exam</h2>
<p>The exam is booked online through the chambers of trades’ platform and costs ${h.eur(A.examen_complet)} in 2026, up from ${h.eur(A.examen_complet_2025)} in 2025. That covers the written and practical parts, not the car hire. There are seven written papers: five shared with would-be taxi drivers, including one in French and one in English, plus two VTC papers on business development and national VTC rules. You need a weighted average of ${P.examen.admissibilite_moyenne}/20 with no paper below its elimination mark. The practical is a role-play journey of up to ${P.examen.pratique_duree_max_min} minutes, at least ${P.examen.pratique_conduite_min} of them at the wheel, and the pass mark is ${P.examen.pratique_admis}/20.</p>
<p>Non-native speakers should take the French paper seriously: it is eliminatory below ${P.examen.tronc_commun[3].eliminatoire}/20, while English only eliminates below ${P.examen.tronc_commun[4].eliminatoire}/20. Once your file is validated, the CMA guarantees you can sit everything and receive your practical result within ${EXAMEN_GARANTIE_MOIS} months. Weightings, marking scheme and resit rules are on the ${h.a('examen-vtc', 'VTC exam (T3P)')} page.</p>

<h2>Step 4: apply for the professional card</h2>
<p>As soon as your pass certificate arrives, you apply online through Démarches simplifiées, the government’s forms portal, attaching the approved doctor’s opinion. The Imprimerie nationale, which prints secure documents for the state, then asks for about ${h.eur(A.carte_pro_environ)}. The card lasts ${A.carte_validite_ans} years, covers the whole of France and goes on the windscreen while you work. Documents, online checks and common mistakes: see the ${h.a('carte-vtc', 'VTC driver card')} page.</p>

<h2>Step 5: set up your business and pick a tax regime</h2>
<p>A self-employed VTC driver counts as a craft business in France. You register it in the national business register (RNE) through the Guichet des formalités des entreprises, the single online desk for business formalities. It asks for ID, proof of the business address, a sworn statement that you have no conviction barring you from running a business and proof of parentage, such as a birth certificate. Missing papers can be sent within ${GUICHET_PIECE_MANQUANTE_JOURS} days, extendable once.</p>
<p>The main choice is between a sole tradership and a company. The micro-entrepreneur scheme (often still called auto-entrepreneur) is the simplest: turnover must stay under ${h.eur(M.seuil_services)} in 2026 for services, and contributions are a flat share of takings, ${h.pct(M.taux_bic_services, 1)} for commercial or craft services according to the Urssaf, the body that collects social contributions, plus ${h.pct(M.cfp_artisan, 1)} towards craftspeople’s vocational training. The Acre start-up relief cuts that rate at first. The catch: nothing is deductible. Fuel, loan repayments, insurance and app commissions come out of your pocket without lowering what you owe.</p>
<p>Under the “real” regime, as a sole trader or a company, costs are deductible and the VAT on your car can be reclaimed. VTC fares carry ${h.pct(P.tva.taux_transport)} VAT, but below ${h.eur(P.tva.franchise_services)} of takings the small-business exemption lets you invoice without it. Our ${h.a('revenu-net-chauffeur', 'net income calculator')} compares micro-enterprise with a sole trader on the real regime; it does not model a single-shareholder SAS (SASU), for want of a verified scale. VAT rules for passenger transport are covered on the ${h.a('tva-vtc-taxi', 'VTC and taxi VAT')} page.</p>

<h2>Step 6: join the VTC register</h2>
<p>No ride is legal until the operator, which may simply be you, is on the register of VTC operators (REVTC). It costs ${h.eur(A.registre_inscription)}, is done entirely online and needs your insurance certificate, proof of business registration, the vehicle registration document, your professional card and, for a car you neither own nor lease for over ${A.location_longue_mois} months, a ${h.eur(A.garantie_financiere_par_vehicule)} financial guarantee per vehicle. The authority has up to ${A.registre_delai_mois} months after a complete file to register you. Documents, compulsory updates and the penalties tightened on 27 June 2026 are explained on the ${h.a('registre-vtc', 'VTC register')} page.</p>

<h2>Step 7: find a car that meets the standard</h2>
<p>The ${h.src('arreteVehicule', 'order of 26 March 2015')} sets the minimum: under ${V.age_max_ans} years old (vintage cars aside), ${V.portes_min} doors or more, at least ${h.num(V.longueur_min_m, 2)} m long and ${h.num(V.largeur_min_m, 2)} m wide, and a net output of ${V.puissance_min_kw} kW or more. Service-public adds ${V.places_min} to ${V.places_max} seats including the driver. Hybrids and fully electric cars are exempt from the age, size and power limits. No exterior roof light is allowed, so nobody mistakes you for a taxi.</p>
<p>Buying, long-term leasing and weekly rental lead to different guarantee requirements on the register and different running costs per kilometre. The ${h.a('vehicule-vtc', 'vehicle cost calculator')} sets them side by side.</p>

<h2>Step 8: insure the business</h2>
<p>Professional liability cover (responsabilité civile professionnelle) is compulsory and its certificate is part of the register file. Service-public warns of a fine of up to ${h.eur(A.amende_sans_assurance)} without it. Any insurer may offer it; make sure the policy covers carrying paying passengers, not just private or business use of the car.</p>

<h2>Step 9: order and fit the sticker</h2>
<p>The red VTC sticker is ordered from your register account for about ${h.eur(A.vignette_environ)}. While you wait, a temporary version can be used for up to ${A.vignette_temporaire_jours} days. The permanent sticker goes in two places: bottom left of the windscreen on the driver’s side, and bottom right of the rear window. It shows your register number and the car’s plate.</p>

<h2>Step 10: learn the pick-up rules</h2>
<p>This is where VTC work parts company with taxis, and where roadside checks focus. Article L3120-2 of the Transport Code sets the prior-booking rule: you carry only passengers who booked. During a check you show proof on paper or on screen; the ${h.src('arreteReservationVtc', 'order of 6 August 2025')} lists what it must contain, from the operator’s details and the passenger’s name and phone number to the booking time, pick-up time and place, your register number and your Siren business number.</p>
<ul>
<li>Cruising for fares is banned, whether on the road (driving empty looking for passengers, being hailed) or through an app.</li>
<li>With no booking lined up after a ride, you head back to your business premises, your home if you work for yourself, or an off-street car park.</li>
<li>At a station or airport you may wait up to ${A.stationnement_gare_max_h} hour for a passenger who has booked.</li>
<li>Prices are free: either a fixed fare agreed at booking or a price worked out afterwards from time and distance.</li>
</ul>
<p>Since 27 June 2026, carrying an unbooked passenger is punishable by ${A.sanction_prison_ans} years’ imprisonment and a fine of ${h.eur(A.sanction_amende_personne)} for an individual (${h.eur(A.sanction_amende_societe)} for a company). Courts can add a licence suspension of up to ${A.sanction_suspension_permis_ans} years, immobilisation of the car for up to ${A.sanction_immobilisation_ans} year and its confiscation.</p>

<h2>Step 11: find passengers and estimate what you keep</h2>
<p>Most newcomers start on booking apps, which pass on rides in exchange for a commission on each one. Service-public notes that commissions and pricing differ between platforms, and we publish no rates. The alternative is building your own clientele, for example with hotels or travel agencies, and many drivers mix the two. Some platforms sell “turnkey” packages bundling exam booking and training: read what is included and what you are signing up to.</p>
<p>App-based drivers are protected by floors negotiated at ARPE: at least ${h.eur(PL.revenu_min_course)} per ride after commission (${h.src('arpeRevenuCourse', 'amendment of 19 December 2023')}), ${h.eur(PL.revenu_min_heure)} per hour worked and ${h.eur(PL.revenu_min_km)} per kilometre on a ride (${h.src('arpeRevenuHoraire', 'agreement of 19 December 2023')}). A separate agreement of 19 September 2023 requires platforms to give clearer notice before deactivating an account.</p>
<p>A floor is not an income. The calculator below starts from your weekly fares, the commission shown on your statement and your hours; what it returns is an estimate based on your own assumptions and official rates, never a promise.</p>
<p>The page on ${h.a('salaire-chauffeur-vtc', 'VTC driver pay')} breaks down the cost lines in more detail.</p>
<!--mini:gainVtc-->

<h2>Step 12: keep track of renewals</h2>
<p>Three deadlines come round. Every ${A.carte_validite_ans} years the card is renewed after a ${A.formation_continue_heures}-hour refresher course, best booked ${A.formation_continue_avant_mois} months ahead, plus a new fee of about ${h.eur(A.carte_pro_environ)}; the register entry is then renewed with the new card. Every year the car needs its roadworthiness test (contrôle technique), with no reminder sent. A petrol or diesel car must be replaced before it turns ${V.age_max_ans}. Our ${h.a('calendrier-renouvellement', 'renewal calendar')} works out the dates from your issue date.</p>

<h2>The whole route at a glance</h2>
${h.table(['Step', 'Where', 'Cost stated in official texts'], [
  ['Approved doctor (cerfa 14880)', 'doctor approved by the prefecture', 'not regulated'],
  ['Training (optional)', 'approved centre', `${h.eur(A.formation_cout_min)} to ${h.eur(A.formation_cout_max)}`],
  ['T3P exam', 'CMA, online', h.eur(A.examen_complet)],
  ['Professional card', 'Démarches simplifiées, prefecture', `about ${h.eur(A.carte_pro_environ)}`],
  ['Business registration', 'Guichet des formalités, RNE', 'depends on legal form'],
  ['VTC register', 'register website', h.eur(A.registre_inscription)],
  ['Financial guarantee (if needed)', 'bank or insurer', `${h.eur(A.garantie_financiere_par_vehicule)} per vehicle`],
  ['Red sticker', 'register account', `about ${h.eur(A.vignette_environ)}`],
], 'Sources: service-public F31027 (12 August 2026), CMA 2026 fees, Transport Code R3122-1')}
<p>The first calculator on this page, near the top, totals these amounts with your own training and doctor prices. The ${h.a('cout-acces-metier', 'start-up cost calculator')} adds the car and your first months of trading.</p>
`,
  },
});
