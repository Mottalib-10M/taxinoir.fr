import { defineGuide } from '../../lib/guide-types';
import { P } from '../../lib/engine/params';
import { revenuLivreur, salaireTrm, capaciteFinanciereLegere } from '../../lib/engine/metiers';

// Valeurs lues dans params-2026.json, lues le 5 octobre 2026 :
// - bloc `livreur` : service-public F31849 (vérifié le 18 juillet 2025), code des transports R3211-40 et R3211-41,
//   code de la route R221-5, Urssaf (contribution à la formation des commerçants) ;
// - blocs `micro` et `tva` : Urssaf, service-public F21746 ; bloc `grille_trm` : accord du 11 octobre 2023 ;
// - bloc `poids_lourd` : durée du travail, code des transports D3312-45.
const V = P.livreur;
const M = P.micro;
const G = P.grille_trm;
const L = P.poids_lourd;
const SMIC = P.ambulancier.smic_horaire;
const ex = revenuLivreur({ caMois: 3000, fraisMois: 900 });
const sal35 = salaireTrm({ coef: 0, anciennete: 0, heuresSemaine: 35, majoration: 0.25 });
const g3 = (G.groupes as Array<[string, string]>).find(([g]) => g === '3')![1];
const g3b = (G.groupes as Array<[string, string]>).find(([g]) => g === '3 bis')![1];
const t118 = (G.taux as Array<[string, number]>)[0][1];
const fr = (n: number) => Math.round(n).toLocaleString('fr-FR').replace(/\s/g, ' ');
const en = (n: number) => Math.round(n).toLocaleString('en-GB');
const fr2 = (n: number) => n.toFixed(2).replace('.', ',');

export default defineGuide({
  id: 'devenir-chauffeur-livreur',
  group: 'autres',
  order: 120,
  mini: 'revenuLivreur',
  related: ['chauffeur-poids-lourd', 'statut-vtc', 'charges-comptabilite-vtc', 'capacite-transport-personnes', 'revenu-net-chauffeur'],
  sources: ['spTrm', 'ctR3211CapPro', 'crR221_5', 'urssafAe', 'spFranchiseTva', 'accordTrm2023', 'avenantTrm72', 'ctD3312', 'spSmic'],
  fr: {
    slug: 'devenir-chauffeur-livreur',
    nav: 'Devenir chauffeur livreur',
    card: 'Permis B, puis salarié payé au Smic ou transporteur à son compte avec capacité, registre et licence.',
    title: 'Devenir chauffeur livreur en 2026 : permis B, statut, revenu',
    description: `Devenir chauffeur livreur en 2026 : permis B dès ${V.age_permis_b} ans, salarié au Smic ou indépendant avec capacité de transport léger et ${fr(V.capfin_premier_vehicule)} € de capacité financière.`,
    h1: 'Devenir chauffeur livreur : salarié ou transporteur à son compte',
    intro: 'Livrer des colis en camionnette se fait de deux façons très différentes, et la seconde est une profession réglementée.',
    resume: `Pour livrer en véhicule utilitaire léger, le permis B suffit : il couvre les véhicules de ${fr(V.ptac_leger_kg)} kg au plus de poids total autorisé et s’obtient dès ${V.age_permis_b} ans (code de la route, R221-5). Reste à choisir son cadre. Salarié d’une entreprise de transport, le conducteur de véhicule jusqu’à 3,5 tonnes relève du coefficient ${g3b} de la convention collective, payé ${fr2(t118)} € de l’heure par l’accord du 11 octobre 2023 : c’est sous le Smic de ${fr2(SMIC)} €, qui s’applique donc. À son compte, livrer pour autrui est du transport public routier de marchandises, une activité commerciale réglementée selon service-public : il faut l’honorabilité, une attestation de capacité professionnelle en transport léger (examen, diplôme ou deux ans de direction d’une entreprise de transport), une capacité financière de ${fr(V.capfin_premier_vehicule)} € pour le premier véhicule et ${fr(V.capfin_vehicule_suivant)} € par véhicule suivant, puis l’autorisation d’exercer délivrée par la Dreal. En micro-entreprise, les cotisations prennent ${(M.taux_bic_services * 100).toFixed(1).replace('.', ',')} % du chiffre d’affaires, et les frais du véhicule restent à votre charge.`,
    faqs: [
      { q: 'Quel permis faut-il pour être chauffeur livreur ?', a: `Le permis B, pour une camionnette dont le poids total autorisé en charge ne dépasse pas ${fr(V.ptac_leger_kg)} kg. L’article R221-5 du code de la route le rend accessible dès ${V.age_permis_b} ans. Au-delà de ${fr(V.ptac_leger_kg)} kg, il faut un permis de la catégorie C1 ou C, à partir de ${L.age_c1} ou ${L.age_c} ans, et une qualification professionnelle de conducteur.` },
      { q: 'Faut-il une capacité de transport pour livrer des colis à son compte ?', a: 'Oui, dès que vous transportez pour autrui avec un véhicule motorisé. Service-public range la livraison de colis aux particuliers en utilitaire léger parmi les activités de transport public routier de marchandises. L’article R3211-40 du code des transports prévoit une attestation de capacité propre au transport léger, pour les entreprises qui n’utilisent que des véhicules de 3,5 tonnes au plus en France.' },
      { q: 'Comment obtenir l’attestation de capacité en transport léger ?', a: `Trois voies selon le code des transports et service-public : réussir l’examen, organisé une fois par an en octobre après inscription en ligne et paiement d’une redevance d’environ ${V.examen_redevance_environ} € ; détenir un diplôme reconnu ; ou justifier de ${V.experience_direction_ans} ans de direction continue d’une entreprise de transport, sans interruption de plus de ${V.experience_interruption_max_ans} ans. Les résultats arrivent au moins ${V.resultats_min_mois} mois après l’examen.` },
      { q: 'Combien d’argent faut-il immobiliser pour devenir livreur indépendant ?', a: `La capacité financière exigée en métropole est de ${fr(V.capfin_premier_vehicule)} € pour le premier véhicule de ${fr(V.ptac_leger_kg)} kg au plus, puis ${fr(V.capfin_vehicule_suivant)} € par véhicule supplémentaire, selon service-public. Des cautions ou garanties bancaires peuvent couvrir jusqu’à la moitié de la somme. Un relevé de compte suffit par exemple à prouver que vous la détenez.` },
      { q: 'Combien gagne un chauffeur livreur salarié en 2026 ?', a: `Le minimum légal, en pratique. Le coefficient ${g3b} du conducteur de véhicule jusqu’à 3,5 tonnes est payé ${fr2(t118)} € de l’heure par l’accord du 11 octobre 2023, sous le Smic de ${fr2(SMIC)} € : le Smic s’applique, soit ${fr2(sal35.brut)} € brut et environ ${fr(sal35.net.net)} € net pour 35 heures par semaine. L’ancienneté de deux ans fait repasser la grille juste au-dessus.` },
    ],
    body: (h) => `
<h2>Le permis B, et ses limites</h2>
<p>L’${h.src('crR221_5', 'article R221-5 du code de la route')} ouvre le permis B dès ${V.age_permis_b} ans. Il couvre les véhicules dont le poids total autorisé en charge (PTAC) ne dépasse pas ${h.num(V.ptac_leger_kg)} kg, conçus pour huit passagers au plus en plus du conducteur. C’est la catégorie de la quasi-totalité des fourgons de livraison. Le PTAC se lit sur la carte grise : un utilitaire de grand volume peut le dépasser, et il faut alors un permis C1 ou C, avec la qualification décrite sur la page ${h.a('chauffeur-poids-lourd', 'chauffeur poids lourd')}.</p>

<h2>Première voie : salarié d’un transporteur</h2>
<p>La convention collective des transports routiers décrit deux emplois. Le livreur, groupe 3 et coefficient ${g3}, accompagne le conducteur, classe les marchandises et les remet aux destinataires. Le conducteur de véhicule jusqu’à 3,5 tonnes, groupe 3 bis et coefficient ${g3b}, conduit, charge et livre lui-même. La correspondance entre groupes et coefficients vient de l’${h.src('avenantTrm72', 'avenant n° 72')}.</p>
<p>Les deux coefficients partagent le même taux dans l’${h.src('accordTrm2023', 'accord du 11 octobre 2023')}, dernier barème du transport de marchandises publié sur Légifrance : ${h.eur(t118, 2)} de l’heure à l’embauche. Le Smic horaire, ${h.eur(SMIC, 2)} depuis le 1er juin 2026 selon ${h.src('spSmic', 'service-public')}, est plus élevé : c’est lui qui s’applique. Pour 35 heures par semaine, cela fait ${h.eur(sal35.brut, 2)} brut et environ ${h.eur(sal35.net.net)} net par mois, avant impôt et mutuelle. Après deux ans dans l’entreprise, la majoration d’ancienneté de ${h.pct(0.02, 0)} porte le taux conventionnel à ${h.eur(t118 * 1.02, 4)}, à peine au-dessus du Smic.</p>
<p>La durée de référence dépend du poste. L’${h.src('ctD3312', 'article D3312-45 du code des transports')} retient ${L.heures_autres_roulants} heures par semaine pour les conducteurs qui ne sont ni grands routiers ni affectés à la messagerie, et ${L.heures_messagerie} heures pour les conducteurs de messagerie. Les heures à partir de la ${L.majoration_des_h}e sont rémunérées selon les usages ou les accords collectifs : le calcul détaillé, coefficient par coefficient, est dans le simulateur de la page poids lourd.</p>

<h2>Seconde voie : transporteur à son compte</h2>
<p>Livrer pour le compte d’autrui, contre rémunération, c’est exercer le métier de transporteur public routier de marchandises. La ${h.src('spTrm', 'fiche F31849 de service-public')} le dit sans détour : c’est une profession réglementée et une activité commerciale, qui concerne les véhicules lourds comme légers, à quatre, trois ou deux roues. Elle cite expressément la livraison de colis aux particuliers en utilitaire léger et la livraison de repas en deux-roues motorisé. Transporter ses propres marchandises, en revanche, n’en relève pas.</p>
<p>Quatre conditions doivent être réunies avant de demander l’autorisation d’exercer :</p>
<ol>
<li><strong>L’honorabilité</strong> : aucune condamnation pour infraction grave au code de la route ni interdiction de gérer, attestées par une déclaration de non-condamnation.</li>
<li><strong>La capacité professionnelle</strong> : une attestation de capacité en transport léger, détaillée plus bas.</li>
<li><strong>La capacité financière</strong> : une somme immobilisée par véhicule.</li>
<li><strong>Un établissement en France</strong>, où sont tenus les documents comptables, les documents du personnel et l’original de la licence.</li>
</ol>
<p>La demande d’autorisation part ensuite à la Dreal de votre région, sur un formulaire propre aux entreprises unipersonnelles (EI, EURL, SASU), en ligne ou par courrier. La Dreal renvoie la licence de transport et l’attestation d’inscription au registre des transporteurs. L’immatriculation de l’entreprise se fait sur le guichet unique des formalités.</p>

<h2>L’attestation de capacité en transport léger</h2>
<p>L’${h.src('ctR3211CapPro', 'article R3211-40 du code des transports')} crée une attestation réservée aux entreprises qui n’utilisent que des véhicules de ${h.num(V.ptac_leger_kg)} kg au plus pour des transports en France, ou de ${h.num(V.ptac_leger_international_kg)} kg au plus pour l’international. Le préfet de région la délivre après une formation sanctionnée par un examen écrit. Les titulaires de certains diplômes en sont dispensés, de même que les personnes qui justifient de ${V.experience_direction_ans} ans de direction continue d’une entreprise de transport, sans interruption de plus de ${V.experience_interruption_max_ans} ans. Celui qui n’a pas dirigé d’entreprise de transport depuis ${V.actualisation_inactivite_ans} ans peut se voir demander une formation de remise à niveau (R3211-41).</p>
<p>L’examen se passe une fois par an, en octobre. Les inscriptions ferment au plus tard fin juillet, parfois dès le printemps selon les régions, et se font en ligne après paiement d’une redevance d’environ ${h.eur(V.examen_redevance_environ)}, fixée par arrêté. Les résultats tombent au moins ${V.resultats_min_mois} mois plus tard. Service-public conseille une formation pour s’y préparer, sans l’imposer. Cette attestation n’a rien à voir avec la ${h.a('capacite-transport-personnes', 'capacité de transport de personnes')}, qui vise les voyageurs.</p>

<h2>La capacité financière</h2>
${h.table(['Véhicules', 'Jusqu’à 3,5 t', 'Plus de 3,5 t'], [
  ['Premier véhicule', h.eur(V.capfin_premier_vehicule), h.eur(V.capfin_lourd_premier)],
  ['Chaque véhicule suivant', h.eur(V.capfin_vehicule_suivant), h.eur(V.capfin_lourd_suivant)],
  ['Exemple : trois utilitaires légers', h.eur(capaciteFinanciereLegere(3)), ''],
], 'Source : service-public F31849, métropole ; dans les DROM, les montants sont plus bas')}
<p>Ces sommes se prouvent, par exemple par un relevé de compte, et des cautions ou garanties de banques peuvent en couvrir ${h.pct(V.capfin_garantie_part_max, 0)} au plus. Elles ne sont pas une dépense : c’est de la trésorerie bloquée, qui s’ajoute à l’achat ou à la location du véhicule.</p>

<h2>Combien reste-t-il à un livreur micro-entrepreneur</h2>
<p>La micro-entreprise est un régime social et fiscal, pas une dispense : les conditions d’accès à la profession s’appliquent de la même façon. Le transport de marchandises étant une prestation de services commerciale, l’${h.src('urssafAe', 'Urssaf')} applique le taux de ${h.pct(M.taux_bic_services)} au chiffre d’affaires encaissé, plus ${h.pct(V.cfp_commercant)} de contribution à la formation professionnelle des commerçants. Avec l’Acre, une entreprise créée depuis le 1er juillet 2026 cotise à ${h.pct(M.taux_acre_debut_des_juillet)} pendant la période couverte par l’Acre. Sur option, le versement libératoire de l’impôt ajoute ${h.pct(M.versement_liberatoire_bic_services)}.</p>
<p>Le point qui fait la différence : en micro-entreprise, les frais ne se déduisent pas des cotisations. Le carburant, le loyer ou le crédit de la camionnette, l’assurance et le téléphone sortent de ce qui reste. Avec ${h.eur(ex.ca)} encaissés par mois et ${h.eur(ex.frais)} de frais, le mini-simulateur donne ${h.eur(ex.cotisations)} de cotisations, ${h.eur(ex.cfp)} de contribution à la formation et ${h.eur(ex.net)} de revenu net avant impôt. Ce n’est qu’une estimation tirée de vos hypothèses et des taux officiels.</p>
${h.table(['Seuil 2026', 'Montant', 'Ce qui se passe au-delà'], [
  ['Régime micro, prestations de services', h.eur(M.seuil_services), 'passage au réel après deux années de dépassement'],
  ['Franchise de TVA, prestations de services', h.eur(P.tva.franchise_services), `TVA à facturer, au taux de ${h.pct(P.tva.taux_normal, 0)} pour le transport de marchandises`],
], 'Sources : Urssaf, autoentrepreneur.urssaf.fr ; service-public F21746')}
<p>La TVA mérite une ligne à part : le taux réduit de ${h.pct(P.tva.taux_transport, 0)} vaut pour le transport de voyageurs, pas pour les colis. Les règles de la ${h.src('spFranchiseTva', 'franchise en base')} sont les mêmes que pour un chauffeur VTC. Pour comparer la micro-entreprise et la société, la page ${h.a('statut-vtc', 'statut juridique')} détaille les options, et la page ${h.a('charges-comptabilite-vtc', 'charges et comptabilité')} les obligations de tenue des comptes.</p>

<h2>Ce que cette page ne dit pas</h2>
<p>Nous ne citons ni plateforme de livraison ni donneur d’ordre, et nous ne publions aucun prix de course ou de tournée : ils se négocient et ne sont fixés par aucun texte lu pour cette page. Le transport en vélo sans moteur, les marchandises dangereuses et les convois exceptionnels obéissent à des règles que nous n’avons pas traitées ici. Si votre projet est de transporter des personnes plutôt que des colis, le ${h.a('revenu-net-chauffeur', 'simulateur de revenu net chauffeur')} couvre le taxi et le VTC.</p>
`,
  },
  en: {
    slug: 'become-delivery-driver',
    nav: 'Delivery driver',
    card: 'A car licence, then either a minimum-wage job or your own haulage business with competence, register and licence.',
    title: 'Become a Delivery Driver in France 2026: Licence and Pay',
    description: `Delivery driver in France, 2026: car licence from ${V.age_permis_b}, employed on the minimum wage or self-employed with a light-haulage certificate and €${en(V.capfin_premier_vehicule)} set aside.`,
    h1: 'Becoming a delivery driver in France: employee or your own boss',
    intro: 'Van delivery work in France comes in two very different forms, and the second one is a regulated profession.',
    resume: `A standard car licence (category B) is enough to drive a delivery van in France: it covers vehicles up to ${en(V.ptac_leger_kg)} kg gross weight and can be taken from age ${V.age_permis_b} (Highway Code, R221-5). The real choice is your status. As an employee of a haulage firm, a driver of vehicles up to 3.5 tonnes sits at coefficient ${g3b} of the road transport collective agreement, paid €${t118.toFixed(2)} an hour under the agreement of 11 October 2023. That is below the €${SMIC.toFixed(2)} minimum wage (Smic), so the Smic applies. Working for yourself, carrying goods for others counts as public road haulage, a regulated commercial activity according to the government site service-public. You need a clean record, a light-haulage competence certificate (by exam, diploma or two years running a transport firm), financial standing of €${en(V.capfin_premier_vehicule)} for the first van and €${en(V.capfin_vehicule_suivant)} for each extra one, then an operating licence from the regional transport office (Dreal). As a micro-entrepreneur you pay ${(M.taux_bic_services * 100).toFixed(1)}% of turnover in contributions, and van costs come out of what is left.`,
    faqs: [
      { q: 'Which licence do I need to drive a delivery van in France?', a: `A category B car licence, for vans with a gross vehicle weight of ${en(V.ptac_leger_kg)} kg or less. Article R221-5 of the Highway Code allows it from age ${V.age_permis_b}. Above ${en(V.ptac_leger_kg)} kg you need a C1 or C licence, from ${L.age_c1} or ${L.age_c}, plus the professional driver qualification. Check the weight on the registration document before taking a job.` },
      { q: 'Do I need a haulage certificate to deliver parcels as a freelancer?', a: 'Yes, as soon as you carry goods for others in a motor vehicle. Service-public lists parcel delivery to households by light van as public road haulage. Article R3211-40 of the Transport Code provides a specific competence certificate for firms that only use vehicles of 3.5 tonnes or less within France, so you do not need the full heavy-goods certificate.' },
      { q: 'How do I get the light-haulage competence certificate?', a: `Three routes, according to the Transport Code and service-public: pass the exam, held once a year in October after online registration and a fee of about €${V.examen_redevance_environ}; hold a recognised diploma; or show ${V.experience_direction_ans} years running a transport business without a break of more than ${V.experience_interruption_max_ans} years. Results come at least ${V.resultats_min_mois} months after the exam, so plan almost a year ahead.` },
      { q: 'How much money must a self-employed courier set aside?', a: `In mainland France the financial standing requirement is €${en(V.capfin_premier_vehicule)} for the first vehicle of up to ${en(V.ptac_leger_kg)} kg and €${en(V.capfin_vehicule_suivant)} for each additional one, according to service-public. Bank guarantees can cover up to half of it, and a bank statement is one way to prove you hold the rest. It is money you keep, not a fee.` },
      { q: 'What does an employed delivery driver earn in France in 2026?', a: `In practice the legal minimum. Coefficient ${g3b}, for drivers of vehicles up to 3.5 tonnes, pays €${t118.toFixed(2)} an hour under the 2023 agreement, below the €${SMIC.toFixed(2)} Smic, so the Smic applies: €${sal35.brut.toFixed(2)} gross and about €${en(sal35.net.net)} net for a 35-hour week. Two years’ seniority lifts the scale just above it.` },
    ],
    body: (h) => `
<h2>The car licence and where it stops</h2>
<p>${h.src('crR221_5', 'Article R221-5 of the Highway Code')} sets the category B licence age at ${V.age_permis_b}. It covers vehicles with a gross vehicle weight (PTAC) of no more than ${h.num(V.ptac_leger_kg)} kg, built for up to eight passengers besides the driver, which takes in almost every delivery van. The weight is printed on the registration document: some large-volume vans exceed it, and then you need a C1 or C licence and the qualification described on our ${h.a('chauffeur-poids-lourd', 'HGV driver')} page. If you hold a licence from outside the EU, check whether you must exchange it first.</p>

<h2>Route one: employed by a carrier</h2>
<p>The road transport collective agreement describes two delivery jobs. The delivery assistant (livreur), group 3 and coefficient ${g3}, rides with the driver, sorts the goods and hands them over. The driver of vehicles up to 3.5 tonnes, group 3 bis and coefficient ${g3b}, drives, loads and delivers alone. The link between groups and coefficients comes from ${h.src('avenantTrm72', 'amendment no. 72')}.</p>
<p>Both share one rate in the ${h.src('accordTrm2023', 'agreement of 11 October 2023')}, the latest goods-transport scale on Légifrance: ${h.eur(t118, 2)} an hour on hiring. The Smic, ${h.eur(SMIC, 2)} an hour since 1 June 2026 according to ${h.src('spSmic', 'service-public')}, is higher, so it applies. For a 35-hour week that is ${h.eur(sal35.brut, 2)} gross and about ${h.eur(sal35.net.net)} net a month before tax and health cover. After two years with the same employer, the ${h.pct(0.02, 0)} seniority increase takes the agreed rate to ${h.eur(t118 * 1.02, 4)}, a whisker above the Smic.</p>
<p>Reference hours depend on the post. ${h.src('ctD3312', 'Article D3312-45 of the Transport Code')} uses ${L.heures_autres_roulants} hours a week for drivers who are neither long-distance nor parcel couriers, and ${L.heures_messagerie} hours for parcel delivery (messagerie). Hours from the ${L.majoration_des_h}th are paid according to custom or collective agreements; the HGV page calculator works this out by coefficient.</p>

<h2>Route two: your own haulage business</h2>
<p>Carrying goods for others for payment means working as a public road haulier (transporteur public routier de marchandises). ${h.src('spTrm', 'Service-public page F31849')} is clear that this is a regulated profession and a commercial activity, covering heavy and light vehicles on four, three or two wheels. It names parcel delivery to households by light van and meal delivery by motorbike or scooter. Carrying your own goods is a different matter and falls outside these rules.</p>
<p>Four conditions come before the operating licence:</p>
<ol>
<li><strong>Good repute</strong>: no conviction for serious traffic offences and no ban on running a business, shown by a sworn statement.</li>
<li><strong>Professional competence</strong>: a light-haulage certificate, explained below.</li>
<li><strong>Financial standing</strong>: a sum held per vehicle.</li>
<li><strong>A base in France</strong>, where accounts, staff records and the original licence are kept.</li>
</ol>
<p>You then apply to the Dreal, the regional office that handles transport, on the form for one-person businesses (sole trader, EURL, SASU), online or by post. It sends back the transport licence and proof of entry in the hauliers’ register. The business itself is registered through the government’s single online formalities portal.</p>

<h2>The light-haulage competence certificate</h2>
<p>${h.src('ctR3211CapPro', 'Article R3211-40 of the Transport Code')} creates a certificate for firms that only use vehicles of ${h.num(V.ptac_leger_kg)} kg or less within France, or ${h.num(V.ptac_leger_international_kg)} kg or less for international work. The regional prefect issues it after training ending in a written exam. Holders of certain diplomas are exempt, as are people with ${V.experience_direction_ans} years running a transport business without a gap of more than ${V.experience_interruption_max_ans} years. Someone who has not managed a transport firm for ${V.actualisation_inactivite_ans} years may be asked to take refresher training (R3211-41).</p>
<p>The exam takes place once a year, in October. Registration closes by the end of July at the latest, sometimes in spring depending on the region, and is done online after paying a fee of about ${h.eur(V.examen_redevance_environ)}. Results take at least ${V.resultats_min_mois} months. The exam is in French. Do not confuse it with the ${h.a('capacite-transport-personnes', 'passenger transport competence certificate')}, which is for carrying people.</p>

<h2>Financial standing</h2>
${h.table(['Vehicles', 'Up to 3.5 t', 'Over 3.5 t'], [
  ['First vehicle', h.eur(V.capfin_premier_vehicule), h.eur(V.capfin_lourd_premier)],
  ['Each additional vehicle', h.eur(V.capfin_vehicule_suivant), h.eur(V.capfin_lourd_suivant)],
  ['Example: three light vans', h.eur(capaciteFinanciereLegere(3)), ''],
], 'Source: service-public F31849, mainland France; overseas départements have lower amounts')}
<p>You must be able to prove these sums, for instance with a bank statement, and bank guarantees may cover up to ${h.pct(V.capfin_garantie_part_max, 0)}. This is cash tied up rather than spent, on top of buying or leasing the van.</p>

<h2>What a self-employed courier keeps</h2>
<p>The micro-enterprise scheme, France’s simplified self-employed status, changes how you pay tax and contributions, not whether the haulage rules apply. Goods transport is a commercial service, so ${h.src('urssafAe', 'Urssaf')} takes ${h.pct(M.taux_bic_services)} of turnover received, plus a ${h.pct(V.cfp_commercant)} training levy for traders. With Acre start-up relief, a business started since 1 July 2026 pays ${h.pct(M.taux_acre_debut_des_juillet)} while the relief lasts. The optional flat-rate income tax adds ${h.pct(M.versement_liberatoire_bic_services)}.</p>
<p>The detail that matters most: under the micro scheme, costs are not deducted before contributions. Fuel, van lease or loan, insurance and phone all come out of what remains. On ${h.eur(ex.ca)} a month received and ${h.eur(ex.frais)} of costs, the calculator shows ${h.eur(ex.cotisations)} in contributions, a ${h.eur(ex.cfp)} training levy and ${h.eur(ex.net)} net before income tax. It is an estimate from your own figures and the official rates, not a promise.</p>
${h.table(['2026 threshold', 'Amount', 'What happens above it'], [
  ['Micro scheme, services', h.eur(M.seuil_services), 'switch to the standard regime after two years over'],
  ['VAT exemption, services', h.eur(P.tva.franchise_services), `VAT to charge, at ${h.pct(P.tva.taux_normal, 0)} for goods transport`],
], 'Sources: Urssaf, autoentrepreneur.urssaf.fr; service-public F21746')}
<p>On VAT, the reduced ${h.pct(P.tva.taux_transport, 0)} rate is for carrying passengers, not parcels. The ${h.src('spFranchiseTva', 'small-business VAT exemption')} works as it does for a VTC driver. To weigh micro-enterprise against a company, see our ${h.a('statut-vtc', 'business structure')} guide, and the ${h.a('charges-comptabilite-vtc', 'costs and bookkeeping')} page for record-keeping duties.</p>

<h2>What this page leaves out</h2>
<p>We name no delivery platform or client and publish no rate per drop or per round: these are negotiated and not set by any text read for this page. Pedal-powered couriers, dangerous goods and abnormal loads follow rules we have not covered. If you would rather carry people than parcels, the ${h.a('revenu-net-chauffeur', 'driver net income calculator')} covers taxi and VTC work.</p>
`,
  },
});
