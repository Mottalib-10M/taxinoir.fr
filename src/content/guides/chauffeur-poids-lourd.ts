import { defineGuide } from '../../lib/guide-types';
import { P } from '../../lib/engine/params';
import { salaireTrm, netSalarie } from '../../lib/engine/metiers';

// Valeurs lues dans params-2026.json, lues le 5 octobre 2026 :
// - bloc `poids_lourd` : code de la route R221-5 et R221-10 ; code des transports R3314-4, R3314-6, D3312-45 à R3312-51 ;
// - bloc `bus` : durées de la qualification initiale et de la FCO (R3314-2, R3314-5, R3314-7, R3314-10 à R3314-14),
//   communes au transport de marchandises et de voyageurs ;
// - bloc `grille_trm` : accord du 11 octobre 2023 (barème « M »), nomenclature de l'accord du 16 juin 1961, avenant n° 72 ;
// - bloc `salarie` : Urssaf secteur privé et Agirc-Arrco 2026 ; Smic : bloc `ambulancier` (service-public F2300).
const L = P.poids_lourd;
const B = P.bus;
const G = P.grille_trm;
const S = P.salarie;
const SMIC = P.ambulancier.smic_horaire;
const taux = G.taux as Array<[string, number]>;
const anc = G.anciennete as Array<[number, number]>;
const groupes = G.groupes as Array<[string, string]>;
const tauxDe = (code: string) => taux.find(([k]) => k === code || (k === '110M-120M' && ['115M', '118M', '120M'].includes(code)))![1];
const tauxGlobal = netSalarie(2000).total / 2000;
const ex39 = salaireTrm({ coef: 2, anciennete: 0, heuresSemaine: L.heures_autres_roulants, majoration: 0.25 });
const ex43 = salaireTrm({ coef: 3, anciennete: 0, heuresSemaine: L.heures_grand_routier, majoration: 0.25 });
const fr2 = (n: number) => n.toFixed(2).replace('.', ',');
const frE = (n: number) => Math.round(n).toLocaleString('fr-FR').replace(/\s/g, ' ');
const enE = (n: number) => Math.round(n).toLocaleString('en-GB');

export default defineGuide({
  id: 'chauffeur-poids-lourd',
  group: 'autres',
  order: 110,
  mini: 'salairePoidsLourd',
  miniHref: 'devenir-chauffeur-bus',
  related: ['devenir-chauffeur-bus', 'salaire-chauffeur-bus', 'devenir-chauffeur-livreur', 'salaire-ambulancier', 'salaire-taxi'],
  sources: ['crR221_5', 'crR221_10', 'ctFimo', 'ctFco', 'ctD3312', 'accordTrm2023', 'nomenclatureTrm', 'avenantTrm72', 'urssafSalaries', 'agircArrco', 'spSmic'],
  fr: {
    slug: 'chauffeur-poids-lourd',
    nav: 'Chauffeur poids lourd',
    card: 'Permis C ou CE, FIMO de 140 heures, puis un salaire de branche qui, en 2026, tombe souvent sur le Smic.',
    title: 'Chauffeur poids lourd 2026 : salaire, permis C et FIMO',
    description: `Chauffeur poids lourd en 2026 : permis C à ${L.age_c} ans, FIMO de ${B.fimo_acceleree_h} h, grille de ${fr2(taux[0][1])} à ${fr2(taux[taux.length - 1][1])} € de l’heure face au Smic de ${fr2(SMIC)} €, net estimé selon Urssaf.`,
    h1: 'Chauffeur poids lourd : permis, qualification et salaire en 2026',
    intro: 'Pour conduire un camion contre salaire, il faut un permis de la catégorie C et une qualification professionnelle, puis une fiche de paie lue à la lumière du Smic.',
    resume: `Conduire un poids lourd de marchandises demande deux titres. Le permis C, pour les véhicules de plus de ${frE(L.c1_ptac_min_kg)} kg, s’obtient à ${L.age_c} ans (le C1, jusqu’à ${frE(L.c1_ptac_max_kg)} kg, à ${L.age_c1} ans), après le permis B et un avis médical favorable (code de la route, R221-5 et R221-10). La qualification initiale, ensuite : la FIMO de ${B.fimo_acceleree_h} heures sur ${B.fimo_acceleree_semaines} semaines ouvre le C dès ${L.age_c_fimo} ans, la formation longue de ${B.fimo_longue_h} heures dès ${L.age_c_formation_longue} ans, puis une FCO de ${B.fco_h} heures tous les ${B.fco_periodicite_ans} ans. Côté salaire, le dernier barème conventionnel du transport de marchandises publié sur Légifrance, l’accord du 11 octobre 2023, va de ${fr2(taux[0][1])} € de l’heure aux coefficients 110 M à 120 M à ${fr2(tauxDe('150M'))} € au coefficient 150 M, celui du conducteur hautement qualifié. Le Smic horaire est de ${fr2(SMIC)} € depuis le 1er juin 2026 : il s’applique donc à l’embauche jusqu’au coefficient 138 M. Le net se déduit en retirant ${fr2(tauxGlobal * 100)} % de cotisations salariales sous le plafond.`,
    faqs: [
      { q: 'Combien gagne un chauffeur poids lourd qui débute en 2026 ?', a: `Au minimum le Smic horaire, ${fr2(SMIC)} € brut, sur les coefficients 110 M à 138 M, car le barème de l’accord du 11 octobre 2023 est passé dessous. Pour un temps de service de ${L.heures_autres_roulants} heures par semaine avec les heures au-delà de 35 majorées de 25 %, cela donne environ ${frE(ex39.brut)} € brut et ${frE(ex39.net.net)} € net par mois, hors frais de route et primes. La majoration réelle dépend de votre contrat.` },
      { q: 'Quel coefficient pour un conducteur de semi-remorque ?', a: `La nomenclature range le conducteur de véhicule de plus de 19 tonnes dans le groupe 6, coefficient 138 M, et le conducteur hautement qualifié dans le groupe 7, coefficient 150 M. Ce dernier doit réunir au moins ${G.hautement_qualifie_points} points selon un barème qui tient compte notamment du tonnage, des services à longue distance, des repos hors du domicile, de l’international et des ensembles articulés.` },
      { q: 'À quel âge peut-on conduire un camion de plus de 3,5 tonnes ?', a: `Le code de la route fixe l’âge du permis C à ${L.age_c} ans. Le code des transports permet de conduire professionnellement les véhicules des catégories C et CE dès ${L.age_c_formation_longue} ans après la formation longue de ${B.fimo_longue_h} heures (R3314-4), et dès ${L.age_c_fimo} ans après la FIMO de ${B.fimo_acceleree_h} heures (R3314-6). Le C1, limité à ${frE(L.c1_ptac_max_kg)} kg, est accessible dès ${L.age_c1_fimo} ans après la FIMO.` },
      { q: 'Combien d’heures travaille un routier selon le code des transports ?', a: `L’article D3312-45 fixe la durée de référence à ${L.heures_grand_routier} heures par semaine pour les « grands routiers » ou « longue distance », ${L.heures_autres_roulants} heures pour les autres conducteurs et 35 heures pour la messagerie. Les heures à partir de la ${L.majoration_des_h}e sont payées selon les usages ou les accords collectifs (D3312-46). Le temps de service ne peut dépasser ${L.service_quotidien_max_h} heures par jour.` },
      { q: 'Faut-il refaire la FIMO pour passer du car au camion ?', a: `Non. Un conducteur déjà qualifié pour le transport de voyageurs qui passe aux marchandises suit une formation complémentaire de ${B.complementaire_h} heures (articles R3314-7 et R3314-8 du code des transports). Il lui faut aussi le permis de la catégorie C. La formation continue de ${B.fco_h} heures, elle, vaut pour les deux secteurs (R3314-13).` },
    ],
    body: (h) => `
<h2>Le permis : C1, C, CE</h2>
<p>Le code de la route découpe les poids lourds en catégories selon le poids total autorisé en charge (PTAC). Le C1 vise les véhicules de plus de ${h.num(L.c1_ptac_min_kg)} kg et jusqu’à ${h.num(L.c1_ptac_max_kg)} kg, conçus pour huit passagers au plus en plus du conducteur. Le C vise tous ceux de plus de ${h.num(L.c1_ptac_min_kg)} kg, sans plafond. Les catégories C1E et CE ajoutent une remorque de plus de ${h.num(L.remorque_kg)} kg ; l’ensemble C1E ne dépasse pas ${h.num(L.c1e_max_kg)} kg.</p>
${h.table(['Catégorie', 'Véhicules', 'Âge du permis', 'À détenir avant'], [
  ['C1', `${h.num(L.c1_ptac_min_kg)} à ${h.num(L.c1_ptac_max_kg)} kg`, `${L.age_c1} ans`, 'B'],
  ['C1E', `C1 + remorque de plus de ${h.num(L.remorque_kg)} kg, ${h.num(L.c1e_max_kg)} kg au plus`, `${L.age_c1} ans`, 'C1'],
  ['C', `plus de ${h.num(L.c1_ptac_min_kg)} kg`, `${L.age_c} ans`, 'B'],
  ['CE', `C + remorque ou semi-remorque de plus de ${h.num(L.remorque_kg)} kg`, `${L.age_c} ans`, 'C'],
], 'Source : code de la route, articles R221-4 et R221-5')}
<p>L’${h.src('crR221_5', 'article R221-5')} pose les âges et les catégories à détenir au préalable : on ne passe pas le CE sans le C. L’${h.src('crR221_10', 'article R221-10')} ajoute une condition propre aux permis lourds : ils ne s’obtiennent et ne se renouvellent qu’après un avis médical favorable. Renseignez-vous auprès de votre préfecture sur la visite avant de vous inscrire en auto-école.</p>

<h2>La qualification : FIMO ou formation longue</h2>
<p>Le permis dit que vous savez conduire le véhicule. La qualification initiale dit que vous pouvez le conduire pour en faire votre métier. Le ${h.src('ctFimo', 'code des transports')} prévoit deux voies, qui n’ouvrent pas les mêmes âges pour les marchandises :</p>
${h.table(['Voie', 'Durée minimale', 'C et CE dès', 'C1 et C1E dès'], [
  ['Formation longue (R3314-2, R3314-4)', `${B.fimo_longue_h} h, examen final`, `${L.age_c_formation_longue} ans`, `${L.age_c_formation_longue} ans`],
  ['FIMO accélérée (R3314-5, R3314-6)', `${B.fimo_acceleree_h} h sur ${B.fimo_acceleree_semaines} semaines consécutives`, `${L.age_c_fimo} ans`, `${L.age_c1_fimo} ans`],
], 'Source : code des transports, articles R3314-2 à R3314-6, lus sur Légifrance le 5 octobre 2026')}
<p>La formation longue, sanctionnée par un examen et la délivrance d’un titre professionnel, vise surtout les jeunes qui entrent dans le métier. La FIMO de quatre semaines est la voie de la reconversion, souvent couplée au permis C ou CE dans le même parcours. Un conducteur de car qui change de secteur ne refait pas tout : ${B.complementaire_h} heures de formation complémentaire suffisent (R3314-7 et R3314-8). Le versant voyageurs est décrit sur la page ${h.a('devenir-chauffeur-bus', 'devenir chauffeur de bus')}.</p>
<h3>La FCO tous les cinq ans</h3>
<p>L’${h.src('ctFco', 'article R3314-10')} impose une formation continue tous les ${B.fco_periodicite_ans} ans. Elle dure ${B.fco_h} heures, en ${B.fco_jours} jours consécutifs ou par séquences d’au moins ${B.fco_sequence_min_h} heures, peut être achevée dans l’année qui précède l’échéance et vaut pour les marchandises comme pour les voyageurs. Qui laisse passer la date doit la suivre avant de reprendre le volant (R3314-14).</p>

<h2>Ce que coûtent le permis et la FIMO</h2>
<p>Aucun texte ne fixe le prix d’un permis C ou CE ni celui d’une FIMO : chaque centre fixe le sien, et nous n’en publions aucun faute de source officielle. Nous ne citons ni ne recommandons aucun centre. Avant de payer, interrogez les transporteurs de votre bassin : certains recrutent puis financent la formation, et la question mérite d’être posée dès le premier entretien.</p>

<h2>Le temps de travail d’un routier</h2>
<p>Le transport de marchandises a son propre décompte. L’${h.src('ctD3312', 'article D3312-45 du code des transports')} fixe la durée considérée comme équivalente à la durée légale, appelée temps de service :</p>
${h.table(['Personnel roulant', 'Par semaine', 'Par trimestre'], [
  ['« Grands routiers » ou « longue distance »', `${L.heures_grand_routier} h`, `${L.heures_grand_routier_trimestre} h`],
  ['Autres conducteurs', `${L.heures_autres_roulants} h`, `${L.heures_autres_roulants_trimestre} h`],
  ['Conducteurs de messagerie, convoyeurs de fonds', `${L.heures_messagerie} h`, `${L.heures_messagerie_trimestre} h`],
], 'Source : code des transports, article D3312-45')}
<p>L’article D3312-46 précise que les heures de temps de service à partir de la ${L.majoration_des_h}e par semaine sont rémunérées « conformément aux usages ou aux conventions ou accords collectifs ». Au-delà des durées du tableau, ce sont des heures supplémentaires (R3312-47). Les plafonds sont ceux de l’article R3312-50 : ${L.service_max_grand_routier_h} heures sur une semaine isolée pour un grand routier, ${L.service_max_autres_h} pour les autres, avec des moyennes plus basses sur la période ; et ${L.service_quotidien_max_h} heures par jour au plus (R3312-51). Le mini-simulateur vous laisse saisir la majoration qui figure sur votre contrat, 25 % par défaut.</p>

<h2>Le salaire : une grille passée sous le Smic</h2>
<p>Le barème des ouvriers du transport routier de marchandises, repérés par la lettre « M », figure dans l’${h.src('accordTrm2023', 'accord du 11 octobre 2023')}, étendu par arrêté du ${h.date(G.extension)} et applicable depuis le ${h.date(G.date_effet)}. C’est le dernier barème « M » que nous avons trouvé sur Légifrance au ${h.date(G.verifie_le)}. Les taux comprennent l’ancienneté :</p>
${h.table(['Coefficient', 'Embauche', 'Après 2 ans', 'Après 5 ans', 'Après 10 ans', 'Après 15 ans'], taux.map(([k, t]) => [k, ...anc.map(([, m]) => h.eur(t * (1 + m), 4))]), 'Source : accord du 11 octobre 2023, personnels ouvriers, taux horaires en euros', ['l', 'r', 'r', 'r', 'r', 'r'])}
<p>Le Smic horaire est de ${h.eur(SMIC, 2)} brut depuis le 1er juin 2026 selon ${h.src('spSmic', 'service-public')}. Toutes les cases de la colonne « embauche » sont en dessous, sauf le coefficient 150 M. Dans ce cas, c’est le Smic qui s’applique : un employeur ne peut payer moins. L’ancienneté fait remonter la grille au-dessus du Smic au bout de deux ans pour la plupart des coefficients. Le mini-simulateur retient toujours le plus élevé des deux taux.</p>
<h3>Quel coefficient pour quel camion</h3>
<p>La ${h.src('nomenclatureTrm', 'nomenclature du personnel roulant marchandises')} classe les conducteurs par groupe, et l’${h.src('avenantTrm72', 'avenant n° 72')} donne la correspondance avec les coefficients :</p>
${h.table(['Groupe', 'Emploi', 'Coefficient'], groupes.filter(([g]) => g !== '3').map(([g, c]) => [g, g === '3 bis' ? `véhicule jusqu’à ${h.num(G.pl_4_tonnes_min, 1)} tonnes` : g === '4' ? `poids lourd de plus de ${h.num(G.pl_4_tonnes_min, 1)} t et jusqu’à ${G.pl_4_tonnes_max} t` : g === '5' ? `poids lourd de plus de ${G.pl_4_tonnes_max} t et jusqu’à ${G.pl_5_tonnes_max} t` : g === '6' ? `poids lourd de plus de ${G.pl_5_tonnes_max} t` : `conducteur hautement qualifié, ${G.hautement_qualifie_points} points au moins`, c]), 'Sources : accord du 16 juin 1961, annexe I ; avenant n° 72 du 5 décembre 1990')}
<p>Le groupe 7 ne dépend pas du seul camion : la nomenclature attribue des points selon le tonnage, les services à longue distance, les repos pris hors du domicile, l’international, la conduite d’ensembles articulés et le diplôme. Il faut en réunir au moins ${G.hautement_qualifie_points}. Vérifiez sur votre contrat le groupe retenu ; nous ne le devinons pas à votre place.</p>

<h2>Du brut au net</h2>
<p>Le net se calcule avec les taux de la part salariale publiés par l’${h.src('urssafSalaries', 'Urssaf')} et l’${h.src('agircArrco', 'Agirc-Arrco')} pour 2026. Sous le plafond de la Sécurité sociale, ${h.eur(S.pmss)} par mois, un salarié non cadre paie :</p>
${h.table(['Cotisation salariale', 'Taux', 'Assiette'], [
  ['Assurance vieillesse plafonnée', h.pct(S.vieillesse_plafonnee, 2), 'salaire, jusqu’au plafond'],
  ['Assurance vieillesse déplafonnée', h.pct(S.vieillesse_deplafonnee, 2), 'tout le salaire'],
  ['Retraite complémentaire, tranche 1', h.pct(S.agirc_t1, 2), 'jusqu’au plafond'],
  ['Contribution d’équilibre général, tranche 1', h.pct(S.ceg_t1, 2), 'jusqu’au plafond'],
  ['CSG et CRDS', h.pct(S.csg_deductible + S.csg_non_deductible + S.crds, 1), `${h.pct(S.csg_assiette, 2)} du salaire`],
], 'Sources : Urssaf, taux du secteur privé (1er janvier 2026) ; Agirc-Arrco, paramètres 2026')}
<p>Le total fait ${h.pct(tauxGlobal, 2)} du brut. Appliqué au Smic mensuel, ${h.eur(S.smic_brut_mensuel, 2)}, il redonne exactement le net publié par service-public, ${h.eur(S.smic_net_mensuel, 2)}. Restent hors calcul : la complémentaire santé et la prévoyance de l’entreprise, la réduction de cotisations sur les heures supplémentaires, le supplément de ${h.pct(S.alsace_moselle, 1)} en Alsace-Moselle, les frais de route et le prélèvement de l’impôt.</p>
<p>Deux exemples avec 25 % de majoration après 35 heures : un conducteur de véhicule de plus de 19 tonnes au coefficient 138 M, ${L.heures_autres_roulants} heures par semaine, touche au moins ${h.eur(ex39.brut)} brut et ${h.eur(ex39.net.net)} net ; un conducteur hautement qualifié au coefficient 150 M, grand routier à ${L.heures_grand_routier} heures, ${h.eur(ex43.brut)} brut et ${h.eur(ex43.net.net)} net. Ce sont des minimums d’embauche, pas des moyennes.</p>

<h2>Camion, car, taxi : trois métiers de la conduite</h2>
<p>Le routier reste presque toujours salarié. Le conducteur de car aussi, avec une grille de branche distincte, revalorisée en 2026 et entièrement au-dessus du Smic : voir le ${h.a('salaire-chauffeur-bus', 'salaire d’un chauffeur de bus')}. Les ambulanciers connaissent la même situation que les routiers, avec des taux d’embauche sous le Smic (${h.a('salaire-ambulancier', 'salaire ambulancier')}). Pour la livraison en véhicule léger, salariée ou à son compte, la page ${h.a('devenir-chauffeur-livreur', 'devenir chauffeur livreur')} détaille les conditions, et le ${h.a('salaire-taxi', 'revenu d’un taxi')} montre l’autre logique, celle de l’indépendant.</p>
`,
  },
  en: {
    slug: 'hgv-driver-france',
    nav: 'HGV driver',
    card: 'C or CE licence, a 140-hour FIMO course, then a sector pay scale that in 2026 often sits on the minimum wage.',
    title: 'HGV Driver in France 2026: Pay Scale, C Licence and FIMO',
    description: `HGV driver in France, 2026: C licence at ${L.age_c}, ${B.fimo_acceleree_h}-hour FIMO, goods pay scale of €${taux[0][1].toFixed(2)} to €${taux[taux.length - 1][1].toFixed(2)} an hour against the €${SMIC.toFixed(2)} minimum wage, net from Urssaf rates.`,
    h1: 'Driving lorries in France: licence, qualification and 2026 pay',
    intro: 'Driving a lorry for a living in France takes a category C licence, a professional qualification and a payslip read against the minimum wage.',
    resume: `Heavy goods driving in France needs two separate qualifications. The C licence, for vehicles over ${enE(L.c1_ptac_min_kg)} kg gross weight, can be taken at ${L.age_c} (C1, up to ${enE(L.c1_ptac_max_kg)} kg, at ${L.age_c1}), once you hold a car licence and a favourable medical opinion (Highway Code, R221-5 and R221-10). Then comes the initial driver qualification: the ${B.fimo_acceleree_h}-hour FIMO over ${B.fimo_acceleree_semaines} weeks lets you drive C vehicles from ${L.age_c_fimo}, the ${B.fimo_longue_h}-hour long course from ${L.age_c_formation_longue}, and a ${B.fco_h}-hour refresher (FCO) follows every ${B.fco_periodicite_ans} years. On pay, the latest goods-transport scale published on Légifrance, the agreement of 11 October 2023, runs from €${taux[0][1].toFixed(2)} an hour for coefficients 110 M to 120 M up to €${tauxDe('150M').toFixed(2)} at 150 M, the highly qualified driver. The French minimum wage (Smic) has been €${SMIC.toFixed(2)} an hour since 1 June 2026, so it overrides the scale at hiring for every coefficient up to 138 M. Employee contributions of ${(tauxGlobal * 100).toFixed(2)}% below the social security ceiling take you from gross to net.`,
    faqs: [
      { q: 'What does a newly hired lorry driver earn in France in 2026?', a: `At least the minimum wage, €${SMIC.toFixed(2)} gross an hour, for coefficients 110 M to 138 M, because the 2023 goods scale is now below it. On ${L.heures_autres_roulants} hours of service a week, with hours over 35 paid at plus 25%, that is roughly €${enE(ex39.brut)} gross and €${enE(ex39.net.net)} net a month, before road allowances and bonuses. Your contract sets the actual premium.` },
      { q: 'Which pay coefficient applies to an articulated lorry driver?', a: `The job classification puts drivers of vehicles over 19 tonnes in group 6, coefficient 138 M, and the highly qualified driver in group 7, coefficient 150 M. Group 7 requires at least ${G.hautement_qualifie_points} points on a scale that counts, among other things, vehicle weight, long-distance work, nights away from home, international trips and articulated combinations.` },
      { q: 'How old must I be to drive a truck over 3.5 tonnes in France?', a: `The Highway Code sets the C licence age at ${L.age_c}. The Transport Code lets you drive C and CE vehicles professionally from ${L.age_c_formation_longue} after the ${B.fimo_longue_h}-hour long course (R3314-4), and from ${L.age_c_fimo} after the ${B.fimo_acceleree_h}-hour FIMO (R3314-6). C1 vehicles, up to ${enE(L.c1_ptac_max_kg)} kg, are open from ${L.age_c1_fimo} after the FIMO.` },
      { q: 'How many hours a week does a French lorry driver work?', a: `Article D3312-45 of the Transport Code sets the reference at ${L.heures_grand_routier} hours a week for long-distance drivers, ${L.heures_autres_roulants} for other drivers and 35 for parcel delivery. Hours from the ${L.majoration_des_h}th are paid according to custom or collective agreements (D3312-46). Service time may not exceed ${L.service_quotidien_max_h} hours in a day.` },
      { q: 'I drive coaches. Must I redo the FIMO to drive lorries?', a: `No. A driver already qualified for passengers who moves to goods takes a ${B.complementaire_h}-hour top-up course (Transport Code, articles R3314-7 and R3314-8), plus the category C licence itself. The ${B.fco_h}-hour refresher covers both sectors (R3314-13), so you keep a single five-year cycle.` },
    ],
    body: (h) => `
<h2>The licence: C1, C or CE</h2>
<p>French licence categories for lorries depend on gross vehicle weight (PTAC). C1 covers vehicles over ${h.num(L.c1_ptac_min_kg)} kg and up to ${h.num(L.c1_ptac_max_kg)} kg, built for no more than eight passengers besides the driver. C covers anything over ${h.num(L.c1_ptac_min_kg)} kg with no upper limit. C1E and CE add a trailer over ${h.num(L.remorque_kg)} kg, and a C1E combination stays within ${h.num(L.c1e_max_kg)} kg.</p>
${h.table(['Category', 'Vehicles', 'Licence age', 'Must hold first'], [
  ['C1', `${h.num(L.c1_ptac_min_kg)} to ${h.num(L.c1_ptac_max_kg)} kg`, `${L.age_c1}`, 'B'],
  ['C1E', `C1 + trailer over ${h.num(L.remorque_kg)} kg, ${h.num(L.c1e_max_kg)} kg max`, `${L.age_c1}`, 'C1'],
  ['C', `over ${h.num(L.c1_ptac_min_kg)} kg`, `${L.age_c}`, 'B'],
  ['CE', `C + trailer or semi-trailer over ${h.num(L.remorque_kg)} kg`, `${L.age_c}`, 'C'],
], 'Source: Highway Code, articles R221-4 and R221-5')}
<p>${h.src('crR221_5', 'Article R221-5')} sets the ages and the categories you must hold first: no CE without C. ${h.src('crR221_10', 'Article R221-10')} adds a rule for heavy licences: they are only issued and renewed after a favourable medical opinion. Ask your prefecture how the check works before booking a driving school. A licence from outside the EU may first need exchanging for a French one.</p>

<h2>The qualification: FIMO or long course</h2>
<p>The licence shows you can drive the vehicle; the initial qualification shows you may drive it for a living. The ${h.src('ctFimo', 'Transport Code')} offers two routes, with different minimum ages for goods work:</p>
${h.table(['Route', 'Minimum length', 'C and CE from', 'C1 and C1E from'], [
  ['Long course (R3314-2, R3314-4)', `${B.fimo_longue_h} h, final exam`, `${L.age_c_formation_longue}`, `${L.age_c_formation_longue}`],
  ['Fast-track FIMO (R3314-5, R3314-6)', `${B.fimo_acceleree_h} h over ${B.fimo_acceleree_semaines} consecutive weeks`, `${L.age_c_fimo}`, `${L.age_c1_fimo}`],
], 'Source: Transport Code, articles R3314-2 to R3314-6, read on Légifrance on 5 October 2026')}
<p>The long course ends with an exam and a professional title and is mostly taken by young entrants. The four-week FIMO (formation initiale minimale obligatoire) is the career-change route, often run together with the C or CE licence. A coach driver switching sectors only needs ${B.complementaire_h} extra hours (R3314-7 and R3314-8). The passenger side is covered in our guide to ${h.a('devenir-chauffeur-bus', 'becoming a bus driver')}. Courses and tests are in French.</p>
<h3>The five-yearly FCO</h3>
<p>${h.src('ctFco', 'Article R3314-10')} requires periodic training every ${B.fco_periodicite_ans} years, the FCO (formation continue obligatoire). It lasts ${B.fco_h} hours, over ${B.fco_jours} consecutive days or in blocks of at least ${B.fco_sequence_min_h} hours, can be finished up to a year early and counts for goods and passengers alike. Miss the deadline and you must complete it before driving again (R3314-14).</p>

<h2>What the licence and FIMO cost</h2>
<p>No law sets the price of a C or CE licence or of a FIMO course; each provider sets its own, so we publish none, and we name or recommend no training centre. Before paying, ask hauliers in your area how they recruit: some hire first and fund the training, which is worth raising at the first interview.</p>

<h2>Working time on the road</h2>
<p>Road haulage counts hours its own way. ${h.src('ctD3312', 'Article D3312-45 of the Transport Code')} sets the “service time” treated as equivalent to the legal working week:</p>
${h.table(['Driving staff', 'Per week', 'Per quarter'], [
  ['Long-distance (“grands routiers”)', `${L.heures_grand_routier} h`, `${L.heures_grand_routier_trimestre} h`],
  ['Other drivers', `${L.heures_autres_roulants} h`, `${L.heures_autres_roulants_trimestre} h`],
  ['Parcel delivery drivers, cash escorts', `${L.heures_messagerie} h`, `${L.heures_messagerie_trimestre} h`],
], 'Source: Transport Code, article D3312-45')}
<p>Under article D3312-46, service hours from the ${L.majoration_des_h}th each week are paid “according to custom or collective agreements”. Beyond the thresholds in the table they count as overtime (R3312-47). Article R3312-50 caps a single week at ${L.service_max_grand_routier_h} hours for long-distance drivers and ${L.service_max_autres_h} for others, with lower averages over the period, and a day at ${L.service_quotidien_max_h} hours (R3312-51). The calculator lets you enter the premium on your own contract, 25% by default.</p>

<h2>Pay: a scale overtaken by the minimum wage</h2>
<p>The pay scale for manual staff in goods haulage, marked with an “M”, is in the ${h.src('accordTrm2023', 'agreement of 11 October 2023')}, extended by order of ${h.date(G.extension)} and in force since ${h.date(G.date_effet)}. It is the latest “M” scale we found on Légifrance as of ${h.date(G.verifie_le)}. The rates build in seniority:</p>
${h.table(['Coefficient', 'On hiring', 'After 2 yrs', 'After 5 yrs', 'After 10 yrs', 'After 15 yrs'], taux.map(([k, t]) => [k, ...anc.map(([, m]) => h.eur(t * (1 + m), 4))]), 'Source: agreement of 11 October 2023, manual staff, hourly rates in euros', ['l', 'r', 'r', 'r', 'r', 'r'])}
<p>The Smic, France’s legal minimum wage, has been ${h.eur(SMIC, 2)} gross an hour since 1 June 2026, according to ${h.src('spSmic', 'service-public')}. Every hiring rate is below it except 150 M, and where that happens the Smic applies: no employer may pay less. Seniority lifts most coefficients back above the Smic after two years. The calculator always takes the higher of the two rates.</p>
<h3>Which coefficient for which lorry</h3>
<p>The ${h.src('nomenclatureTrm', 'goods driving staff classification')} sorts drivers into groups, and ${h.src('avenantTrm72', 'amendment no. 72')} links each group to a coefficient:</p>
${h.table(['Group', 'Job', 'Coefficient'], groupes.filter(([g]) => g !== '3').map(([g, c]) => [g, g === '3 bis' ? `vehicle up to ${h.num(G.pl_4_tonnes_min, 1)} tonnes` : g === '4' ? `lorry over ${h.num(G.pl_4_tonnes_min, 1)} t, up to ${G.pl_4_tonnes_max} t` : g === '5' ? `lorry over ${G.pl_4_tonnes_max} t, up to ${G.pl_5_tonnes_max} t` : g === '6' ? `lorry over ${G.pl_5_tonnes_max} t` : `highly qualified driver, at least ${G.hautement_qualifie_points} points`, c]), 'Sources: agreement of 16 June 1961, annex I; amendment no. 72 of 5 December 1990')}
<p>Group 7 is not about the lorry alone: points are awarded for weight, long-distance work, rest taken away from home, international trips, articulated combinations and qualifications, with ${G.hautement_qualifie_points} needed. Check the group on your contract; we do not guess it for you.</p>

<h2>From gross to net</h2>
<p>Net pay uses the 2026 employee rates published by ${h.src('urssafSalaries', 'Urssaf')}, the body that collects social contributions, and by ${h.src('agircArrco', 'Agirc-Arrco')}, the supplementary pension fund. Below the social security ceiling, ${h.eur(S.pmss)} a month, a non-managerial employee pays:</p>
${h.table(['Employee contribution', 'Rate', 'Base'], [
  ['State pension, capped', h.pct(S.vieillesse_plafonnee, 2), 'pay up to the ceiling'],
  ['State pension, uncapped', h.pct(S.vieillesse_deplafonnee, 2), 'all pay'],
  ['Supplementary pension, band 1', h.pct(S.agirc_t1, 2), 'up to the ceiling'],
  ['General balancing contribution, band 1', h.pct(S.ceg_t1, 2), 'up to the ceiling'],
  ['CSG and CRDS (social levies)', h.pct(S.csg_deductible + S.csg_non_deductible + S.crds, 1), `${h.pct(S.csg_assiette, 2)} of pay`],
], 'Sources: Urssaf, private-sector rates (1 January 2026); Agirc-Arrco, 2026 parameters')}
<p>That adds up to ${h.pct(tauxGlobal, 2)} of gross pay. Applied to the monthly Smic, ${h.eur(S.smic_brut_mensuel, 2)}, it gives exactly the net figure service-public publishes, ${h.eur(S.smic_net_mensuel, 2)}. Left out: company health and protection cover, the contribution relief on overtime, the extra ${h.pct(S.alsace_moselle, 1)} in Alsace-Moselle, road allowances and income tax withheld at source.</p>
<p>Two examples with a 25% premium after 35 hours: a driver of vehicles over 19 tonnes at 138 M working ${L.heures_autres_roulants} hours earns at least ${h.eur(ex39.brut)} gross and ${h.eur(ex39.net.net)} net; a highly qualified long-distance driver at 150 M on ${L.heures_grand_routier} hours, ${h.eur(ex43.brut)} gross and ${h.eur(ex43.net.net)} net. These are hiring minimums, not averages.</p>

<h2>Lorry, coach or taxi</h2>
<p>Lorry drivers are nearly always employees. So are coach drivers, under a separate scale raised in 2026 and fully above the Smic: see ${h.a('salaire-chauffeur-bus', 'bus driver pay')}. Ambulance crews face the same squeeze as hauliers, with hiring rates below the Smic (${h.a('salaire-ambulancier', 'ambulance pay')}). For van deliveries, employed or self-employed, read ${h.a('devenir-chauffeur-livreur', 'becoming a delivery driver')}, and the ${h.a('salaire-taxi', 'taxi income')} page shows the self-employed logic instead.</p>
`,
  },
});
