import { defineGuide } from '../../lib/guide-types';
import { P } from '../../lib/engine/params';
import { achatOuLocation } from '../../lib/engine/acces';
import { formatMoney, displayDate } from '../../lib/format';

const A = P.acces;
const X = P.taxi;

// Valeurs lues dans params-2026.json ; source : (bloc taxi) : période sur laquelle s’apprécient les années
// d’exercice donnant priorité, code des transports, article L3121-5
// https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000023086525/LEGISCTA000023071053/
const ADS_PRIORITE_PERIODE_ANS = P.taxi.ads_priorite_periode_ans;
// Date de vérification des prix publiés par service-public (clé spTaxi)
const PRIX_VERIFIES_LE = P.taxi.ads_prix_verifies_le;

// Hypothèses d’exemple pour le calcul achat contre location (pas des valeurs réglementaires) :
// apport et taux sont des saisies du lecteur dans le mini-simulateur.
const HYP_APPORT = 40000;
const HYP_TAUX = 0.045;
const HYP_DUREES = [7, 10, 15];
const cas = HYP_DUREES.map((annees) => ({ annees, ...achatOuLocation({ prix: X.ads_prix_paris_environ, apport: HYP_APPORT, taux: HYP_TAUX, annees, loyer: X.ads_loyer_paris_mois_environ }) }));
const NICE_ANS = 10;
const nice = achatOuLocation({ prix: X.ads_prix_nice_environ, apport: HYP_APPORT, taux: HYP_TAUX, annees: NICE_ANS, loyer: X.ads_loyer_paris_mois_environ });

const fe = (n: number, l: 'fr' | 'en') => formatMoney(n, 0, l);
const fd = (iso: string, l: 'fr' | 'en') => {
  const s = displayDate(iso, l === 'fr' ? 'fr-FR' : 'en-GB');
  return l === 'fr' ? s.replace(/^1 /, '1er ') : s;
};

export default defineGuide({
  id: 'licence-taxi',
  group: 'taxi',
  order: 30,
  mini: 'licenceTaxi',
  related: ['devenir-taxi', 'salaire-taxi', 'examen-taxi', 'revenu-net-chauffeur', 'cout-acces-metier'],
  sources: ['spTaxi', 'ctL3124Ads', 'ctL3121', 'ctL3120'],
  fr: {
    slug: 'licence-taxi',
    nav: 'Licence de taxi (ADS)',
    card: 'Gratuite, achetée ou louée : règles de l’ADS, prix publiés et calcul achat contre location.',
    title: 'Licence taxi 2026 : prix, ADS gratuite, achat ou location',
    description: `Licence taxi 2026 : ADS gratuite sur liste d’attente, incessible depuis 2014 ; prix publiés de ${fe(X.ads_prix_min, 'fr')} à ${fe(X.ads_prix_max, 'fr')}, location vers ${fe(X.ads_loyer_paris_mois_environ, 'fr')} par mois à Paris.`,
    h1: 'Licence de taxi : l’obtenir gratuitement, l’acheter ou la louer',
    intro: 'Sans autorisation de stationnement, pas de maraude : c’est elle, plus que l’examen, qui décide du budget d’un taxi.',
    resume: `La licence de taxi s’appelle officiellement autorisation de stationnement (ADS). Elle s’obtient de trois façons. Gratuitement, en s’inscrivant sur la liste d’attente de la mairie, ou de la préfecture de police à Paris, inscription à renouveler chaque année, avec une priorité aux conducteurs qui ont exercé au moins ${X.ads_priorite_activite_ans} ans au cours des ${ADS_PRIORITE_PERIODE_ANS} dernières années ; une licence ainsi délivrée depuis le ${fd(X.ads_date_incessibilite, 'fr')} est incessible et vaut ${X.ads_gratuite_validite_ans} ans renouvelables. En l’achetant à un titulaire d’une ancienne licence, cessible après ${X.ads_cession_ancienne_ans} ans d’exploitation, ou ${X.ads_cession_achetee_ans} ans après un premier achat : service-public cite des prix de ${fe(X.ads_prix_min, 'fr')} à ${fe(X.ads_prix_max, 'fr')}, environ ${fe(X.ads_prix_paris_environ, 'fr')} à Paris et ${fe(X.ads_prix_nice_environ, 'fr')} à Nice. En la louant enfin, par une location-gérance d’au moins ${X.location_gerance_min_ans} an, autour de ${fe(X.ads_loyer_paris_mois_environ, 'fr')} par mois à Paris. La carte professionnelle est exigée pour la demander gratuitement ou la louer.`,
    faqs: [
      { q: 'Combien coûte une licence de taxi en 2026 ?', a: `Rien si elle est attribuée par la mairie. Achetée, son prix est fixé librement par le vendeur : service-public indique de ${fe(X.ads_prix_min, 'fr')} à ${fe(X.ads_prix_max, 'fr')} selon la ville, environ ${fe(X.ads_prix_paris_environ, 'fr')} à Paris et ${fe(X.ads_prix_nice_environ, 'fr')} à Nice (page vérifiée le ${fd(PRIX_VERIFIES_LE, 'fr')}). Ces ordres de grandeur ne remplacent pas le prix négocié, qui dépend de la commune et du vendeur.` },
      { q: 'Peut-on revendre une licence de taxi obtenue gratuitement ?', a: `Seulement si elle a été délivrée avant le ${fd(X.ads_date_incessibilite, 'fr')}, et après ${X.ads_cession_ancienne_ans} ans d’exploitation effective et continue, selon l’article L3121-2 du code des transports. Une licence gratuite délivrée depuis cette date est incessible : elle vaut ${X.ads_gratuite_validite_ans} ans, se renouvelle, mais ne se vend pas. Elle doit en outre être exploitée personnellement par son titulaire, qui ne peut ni la louer ni la confier à un salarié.` },
      { q: 'Combien coûte la location d’une licence de taxi à Paris ?', a: `Service-public donne un loyer d’environ ${fe(X.ads_loyer_paris_mois_environ, 'fr')} par mois à Paris, en précisant que le prix dépend de l’entreprise de location. Le contrat de location-gérance dure au moins ${X.location_gerance_min_ans} an. Selon la même fiche, l’entreprise de location entretient le véhicule, et le locataire garde la totalité de ses recettes, mais n’a pas droit au chômage s’il arrête.` },
      { q: 'Peut-on acheter une licence de taxi sans carte professionnelle ?', a: 'Service-public répond que rien ne l’empêche techniquement. L’acheteur devra ensuite prouver qu’il la loue à un conducteur ou qu’il emploie un salarié titulaire de la carte pour l’exploiter. En revanche, sans carte professionnelle en cours de validité, impossible de s’inscrire sur la liste d’attente d’une licence gratuite ou de prendre une licence en location.' },
      { q: 'Comment s’inscrire sur la liste d’attente d’une ADS gratuite ?', a: `Auprès de la mairie de la commune visée, ou de la préfecture de police pour Paris. L’article L3121-5 du code des transports exige une carte professionnelle valide, interdit d’être déjà titulaire d’une ADS et de figurer sur plus d’une liste. L’inscription se renouvelle chaque année. La priorité va à ceux qui justifient ${X.ads_priorite_activite_ans} ans d’exercice comme taxi au cours des ${ADS_PRIORITE_PERIODE_ANS} ans précédents.` },
      { q: 'Que risque-t-on à exercer comme taxi sans autorisation de stationnement ?', a: `L’article L3124-4 du code des transports punit l’exercice de l’activité d’exploitant de taxi sans ADS de ${A.sanction_prison_ans} ans d’emprisonnement et ${fe(A.sanction_amende_personne, 'fr')} d’amende, avec des peines complémentaires : suspension du permis jusqu’à ${A.sanction_suspension_permis_ans} ans, immobilisation du véhicule jusqu’à ${A.sanction_immobilisation_ans} an, confiscation possible. Le titulaire qui n’exploite pas réellement sa licence s’expose à son retrait.` },
    ],
    body: (h) => `
<h2>Ce que donne la licence, et ce qu’elle ne donne pas</h2>
<p>L’ADS est attachée à un véhicule et à un territoire, programmé dans le taximètre. Elle seule permet la maraude : prendre un client qui vous hèle ou vous attend à une station. Hors de sa zone, le taxi ne travaille plus que sur réservation, avec un justificatif à présenter en cas de contrôle (${h.src('ctL3121', 'articles L3121-11 et suivants du code des transports')}). Elle n’est pas la carte professionnelle : la carte qualifie la personne, la licence autorise l’exploitation. Il faut les deux pour travailler en artisan.</p>
<p>Service-public précise que la licence peut être retirée par l’autorité administrative en cas de violation de la réglementation, de décès ou d’inaptitude médicale, ou rendue par son titulaire.</p>

<h2>La licence gratuite : une file d’attente encadrée par la loi</h2>
<p>Les nouvelles licences sont attribuées sans contrepartie financière, dans l’ordre de listes d’attente rendues publiques : en mairie dans le cas général, à la préfecture de police à Paris. L’article L3121-5 du code des transports fixe trois conditions pour s’inscrire : détenir une carte professionnelle en cours de validité, ne pas être déjà titulaire d’une ADS, ne figurer que sur une seule liste. L’inscription se renouvelle chaque année ; un oubli fait perdre son rang.</p>
<p>La priorité va aux conducteurs qui justifient de ${X.ads_priorite_activite_ans} ans d’exercice comme taxi au cours des ${ADS_PRIORITE_PERIODE_ANS} ans qui précèdent la délivrance, ce qui revient à favoriser les salariés et les locataires déjà au volant. Service-public prévient que l’attente se compte souvent en années dans les grandes villes. Aucun texte consulté ne publie de délai moyen : demandez votre rang à la mairie plutôt que de croire une estimation.</p>
<h3>Incessible, personnelle, valable cinq ans</h3>
<p>Une licence gratuite délivrée depuis le ${h.date(X.ads_date_incessibilite)} est incessible et vaut ${X.ads_gratuite_validite_ans} ans, renouvelables (article L3121-2) ; le renouvellement se demande ${X.ads_renouvellement_avant_mois} mois avant la fin, selon service-public. L’article L3121-1-2 ajoute que son titulaire l’exploite personnellement : pas de location à un autre chauffeur, pas de salarié pour la faire rouler à sa place. Ces dérogations n’existent que pour les licences délivrées avant le ${h.date(X.ads_date_incessibilite)}. Une licence gratuite récente n’est donc ni un capital à revendre ni une rente à louer : c’est un droit de travailler.</p>

<h2>Acheter une ancienne licence</h2>
<p>Le marché ne porte que sur les licences délivrées avant le ${h.date(X.ads_date_incessibilite)}. Leur titulaire peut présenter un successeur à titre onéreux après ${X.ads_cession_ancienne_ans} ans d’exploitation effective et continue depuis la délivrance, ou après ${X.ads_cession_achetee_ans} ans à compter de la première mutation : une licence achetée se revend donc après ${X.ads_cession_achetee_ans} ans d’exploitation sans interruption. Chaque transaction est inscrite, avec son montant, dans un registre tenu par l’autorité qui délivre les licences, et le successeur doit justifier de l’exploitation effective et continue (article L3121-4).</p>
<h3>Les seuls prix que nous publions</h3>
<p>Le prix est fixé par le vendeur. Nous ne reprenons ni annonces ni estimations de cabinets : seulement les ordres de grandeur publiés par ${h.src('spTaxi', 'service-public')}, page vérifiée le ${h.date(PRIX_VERIFIES_LE)}.</p>
${h.table(['Repère', 'Montant publié'], [
  ['Fourchette nationale', `${h.eur(X.ads_prix_min)} à ${h.eur(X.ads_prix_max)}`],
  ['Paris', `environ ${h.eur(X.ads_prix_paris_environ)}`],
  ['Nice', `environ ${h.eur(X.ads_prix_nice_environ)}`],
  ['Location à Paris, par mois', `environ ${h.eur(X.ads_loyer_paris_mois_environ)}`],
], `Source : service-public, fiche F21907 vérifiée le ${h.date(PRIX_VERIFIES_LE)}`)}
<p>Un acheteur n’a pas besoin d’être chauffeur : service-public admet l’achat sans carte professionnelle. Il doit alors démontrer qu’il loue la licence ou qu’il emploie un salarié titulaire de la carte, ce que permet justement le régime des licences d’avant 2014. Pour celui qui veut conduire lui-même, la carte vient d’abord ; le parcours est sur la page ${h.a('devenir-taxi', 'devenir chauffeur de taxi')}.</p>

<h2>Louer : la location-gérance</h2>
<p>Le locataire signe avec une entreprise spécialisée un contrat de location-gérance d’au moins ${X.location_gerance_min_ans} an et verse un loyer mensuel dont le montant dépend de l’entreprise. Il est indépendant, encaisse toutes ses recettes et, d’après service-public, c’est le loueur qui entretient le véhicule. En face, il n’a pas d’assurance chômage s’il cesse son activité, et le loyer tombe chaque mois, que la semaine ait été bonne ou non.</p>
<p>C’est aussi la voie qui prépare la licence gratuite : ${X.ads_priorite_activite_ans} ans de location dans les ${ADS_PRIORITE_PERIODE_ANS} dernières années comptent pour la priorité sur la liste d’attente.</p>

<h2>Acheter à crédit ou louer : le calcul</h2>
<p>Le tableau ci-dessous est généré par le moteur du site à partir de trois hypothèses que nous choisissons pour l’exemple : le prix parisien publié (${h.eur(X.ads_prix_paris_environ)}), un apport de ${h.eur(HYP_APPORT)} et un taux de ${h.pct(HYP_TAUX, 1)}. Ce ne sont pas des conditions bancaires constatées. Le loyer de comparaison est celui que service-public donne pour Paris.</p>
${h.table(['Durée du prêt', 'Mensualité', 'Intérêts totaux', 'Écart avec le loyer'], cas.map((c) => [`${c.annees} ans`, h.eur(c.mensualite), h.eur(c.interets), h.eur(c.ecartMensuel)]), 'Calcul : achatOuLocation, prêt amortissable à mensualités constantes ; hypothèses d’exemple')}
<p>Trois lectures. La mensualité reste sous le loyer dans les trois durées, mais elle ne paie que la licence : le véhicule, son entretien et son assurance restent à la charge de l’artisan, alors que le loueur, selon service-public, entretient le véhicule. Au prix de Nice (${h.eur(X.ads_prix_nice_environ)}), avec les mêmes hypothèses sur ${NICE_ANS} ans, la mensualité monte à ${h.eur(nice.mensualite)}. Enfin, ${h.num(cas[0].anneesLoyer, 1)} années de loyer parisien égalent le prix d’achat : c’est l’horizon à partir duquel l’achat commence à se défendre, si la licence garde sa valeur, ce que personne ne peut garantir.</p>
<p>Reprenez le calcul avec votre offre de prêt dans le mini-simulateur en haut de page, puis mettez le résultat dans le ${h.a('revenu-net-chauffeur', 'simulateur de revenu net')} pour voir ce qu’il vous reste. La page ${h.a('salaire-taxi', 'combien gagne un taxi')} compare propriétaire et locataire à recettes égales.</p>

<h2>Les sanctions liées à la licence</h2>
<p>Les ${h.src('ctL3124Ads', 'articles L3124-1 à L3124-5 du code des transports')} prévoient deux niveaux. Côté administratif, l’autorité peut adresser un avertissement au titulaire, ou retirer la licence temporairement ou définitivement, s’il ne l’exploite pas de façon effective et continue ou en cas de violation grave ou répétée de son contenu. Côté pénal, exercer l’activité d’exploitant de taxi sans ADS est puni de ${A.sanction_prison_ans} ans d’emprisonnement et de ${h.eur(A.sanction_amende_personne)} d’amende, avec suspension possible du permis jusqu’à ${A.sanction_suspension_permis_ans} ans, immobilisation du véhicule jusqu’à ${A.sanction_immobilisation_ans} an et confiscation.</p>
<p>Ces règles s’ajoutent aux dispositions communes aux taxis et aux VTC des ${h.src('ctL3120', 'articles L3120-1 à L3120-5')}, dont l’obligation de réservation préalable pour qui travaille sans licence ou hors de sa zone.</p>
`,
  },
  en: {
    slug: 'taxi-licence-ads',
    nav: 'Taxi licence (ADS)',
    card: 'Free, bought or rented: ADS rules, published prices and a buy-versus-rent calculation.',
    title: 'Taxi Licence France 2026: ADS Price, Free List, Buy or Rent',
    description: `French taxi licence (ADS), 2026: free via a waiting list, non-transferable since 2014; public prices ${fe(X.ads_prix_min, 'en')} to ${fe(X.ads_prix_max, 'en')}, about ${fe(X.ads_loyer_paris_mois_environ, 'en')}/month to rent in Paris.`,
    h1: 'The taxi licence in France: free, bought or rented',
    intro: 'Without an ADS there are no street hails, and it shapes a taxi driver’s budget far more than the exam does.',
    resume: `In France, what drivers call a taxi licence is officially an ADS (autorisation de stationnement, literally a parking authorisation). There are three ways to get one. Free of charge, by joining the waiting list at the town hall, or at the Préfecture de police in Paris; you renew your place every year, and drivers with at least ${X.ads_priorite_activite_ans} years’ taxi work in the last ${ADS_PRIORITE_PERIODE_ANS} get priority. A free licence issued since ${fd(X.ads_date_incessibilite, 'en')} cannot be sold and lasts ${X.ads_gratuite_validite_ans} years, renewable. By buying an older licence, which can be sold after ${X.ads_cession_ancienne_ans} years of operation, or ${X.ads_cession_achetee_ans} years after a previous sale; service-public quotes ${fe(X.ads_prix_min, 'en')} to ${fe(X.ads_prix_max, 'en')}, around ${fe(X.ads_prix_paris_environ, 'en')} in Paris and ${fe(X.ads_prix_nice_environ, 'en')} in Nice. Or by renting, under a lease-management contract of at least ${X.location_gerance_min_ans} year, at about ${fe(X.ads_loyer_paris_mois_environ, 'en')} a month in Paris. You need a professional card to apply for a free licence or to rent one.`,
    faqs: [
      { q: 'What does a taxi licence cost in France in 2026?', a: `Nothing if the town hall grants it. Bought from a holder, the price is whatever the seller asks: service-public gives a range of ${fe(X.ads_prix_min, 'en')} to ${fe(X.ads_prix_max, 'en')} depending on the city, about ${fe(X.ads_prix_paris_environ, 'en')} in Paris and ${fe(X.ads_prix_nice_environ, 'en')} in Nice (page checked on ${fd(PRIX_VERIFIES_LE, 'en')}). Treat these as orders of magnitude; the actual price depends on the town and the seller.` },
      { q: 'Can I sell a licence the town hall gave me for free?', a: `Only if it was issued before ${fd(X.ads_date_incessibilite, 'en')}, and only after ${X.ads_cession_ancienne_ans} years of actual, continuous operation, under article L3121-2 of the Transport Code. A free licence issued since then cannot be transferred: it lasts ${X.ads_gratuite_validite_ans} years and can be renewed, but not sold. Its holder must also drive it personally and may not rent it out or put an employee on it.` },
      { q: 'How much is it to rent a taxi licence in Paris?', a: `Service-public puts the rent at about ${fe(X.ads_loyer_paris_mois_environ, 'en')} a month in Paris, adding that the amount depends on the rental firm. The lease-management contract runs for at least ${X.location_gerance_min_ans} year. According to the same page, the firm maintains the vehicle and you keep all your takings, but tenants have no unemployment cover if they stop.` },
      { q: 'Can someone without a taxi card buy a licence as an investment?', a: 'Technically yes, says service-public. The buyer must then show that the licence is rented to a driver or operated by an employee who holds the card. What you cannot do without a valid professional card is join the waiting list for a free licence or take one on a rental contract.' },
      { q: 'How do I get on the waiting list for a free ADS?', a: `Apply to the town hall of the commune you want, or to the Préfecture de police for Paris. Article L3121-5 of the Transport Code requires a valid professional card, bars anyone who already holds an ADS and allows only one list per person. You must renew your registration every year. Priority goes to those with ${X.ads_priorite_activite_ans} years of taxi work in the previous ${ADS_PRIORITE_PERIODE_ANS}.` },
      { q: 'What is the penalty for running a taxi without an ADS?', a: `Under article L3124-4 of the Transport Code, operating a taxi without an ADS carries up to ${A.sanction_prison_ans} years in prison and a ${fe(A.sanction_amende_personne, 'en')} fine, plus additional penalties: licence suspension for up to ${A.sanction_suspension_permis_ans} years, impounding of the vehicle for up to ${A.sanction_immobilisation_ans} year, and possible confiscation. A holder who does not genuinely operate the licence risks having it withdrawn.` },
    ],
    body: (h) => `
<h2>What the licence gives you, and what it does not</h2>
<p>The ADS is tied to one vehicle and one area, which is programmed into the meter. Only an ADS lets you take street hails and work from taxi ranks. Outside its area, a taxi can only carry passengers who booked in advance, and must show proof of the booking if checked (${h.src('ctL3121', 'articles L3121-11 onwards of the Transport Code')}). The licence is not the professional card: the card qualifies you as a person, the licence authorises the business. An owner-driver needs both.</p>
<p>Service-public notes that the authorities can withdraw a licence after a breach of the rules, the holder’s death or medical unfitness, and that a holder can also hand it back.</p>

<h2>Free licences: a waiting list set by law</h2>
<p>New licences are issued free, in the order of public waiting lists: at the town hall (mairie) in most places, at the Préfecture de police in Paris. Article L3121-5 of the Transport Code sets three conditions to register: a valid professional card, not already holding an ADS, and no more than one list per person. You must renew your registration each year, and missing a renewal costs you your place.</p>
<p>Priority goes to drivers who can show ${X.ads_priorite_activite_ans} years of taxi work during the ${ADS_PRIORITE_PERIODE_ANS} years before the licence is issued, which in practice favours employees and tenants already on the road. Service-public warns that the wait often runs to years in big cities. None of the texts we read gives an average waiting time, so ask the town hall for your position rather than relying on hearsay.</p>
<h3>Non-transferable, personal, five years</h3>
<p>A free licence issued since ${h.date(X.ads_date_incessibilite)} cannot be transferred and lasts ${X.ads_gratuite_validite_ans} years, renewable (article L3121-2); service-public says to request renewal ${X.ads_renouvellement_avant_mois} months before it expires. Article L3121-1-2 adds that the holder must operate it personally: no renting it to another driver, no employee driving it on your behalf. Those options only exist for licences issued before ${h.date(X.ads_date_incessibilite)}. So a recent free licence is neither an asset to sell nor an income to rent out. It is a right to work.</p>

<h2>Buying an older licence</h2>
<p>Only licences issued before ${h.date(X.ads_date_incessibilite)} can change hands for money. Their holder may present a paying successor after ${X.ads_cession_ancienne_ans} years of actual, continuous operation from the date of issue, or ${X.ads_cession_achetee_ans} years after the first transfer; in other words, a licence you bought can be resold once you have operated it without a break for ${X.ads_cession_achetee_ans} years. Every sale is recorded, amount included, in a register kept by the issuing authority, and the successor must document continuous operation (article L3121-4).</p>
<h3>The only prices we publish</h3>
<p>The seller sets the price. We do not quote listings or broker estimates, only the orders of magnitude published by ${h.src('spTaxi', 'service-public')}, page checked on ${h.date(PRIX_VERIFIES_LE)}.</p>
${h.table(['Benchmark', 'Published amount'], [
  ['National range', `${h.eur(X.ads_prix_min)} to ${h.eur(X.ads_prix_max)}`],
  ['Paris', `about ${h.eur(X.ads_prix_paris_environ)}`],
  ['Nice', `about ${h.eur(X.ads_prix_nice_environ)}`],
  ['Renting in Paris, per month', `about ${h.eur(X.ads_loyer_paris_mois_environ)}`],
], `Source: service-public, page F21907 checked on ${h.date(PRIX_VERIFIES_LE)}`)}
<p>You do not have to be a driver to buy: service-public accepts a purchase without a professional card. The buyer must then show the licence is rented out or driven by an employee with a card, which the pre-2014 regime allows. If you want to drive it yourself, the card comes first; the steps are on the ${h.a('devenir-taxi', 'becoming a taxi driver')} page.</p>

<h2>Renting: location-gérance</h2>
<p>A tenant signs a lease-management contract (location-gérance) of at least ${X.location_gerance_min_ans} year with a specialist firm and pays monthly rent set by that firm. You are self-employed and keep every euro of takings, and according to service-public the firm maintains the vehicle. The flip side: no unemployment benefit if you stop, and the rent is due every month whether trade was good or not.</p>
<p>Renting is also the usual path towards a free licence, since ${X.ads_priorite_activite_ans} years of tenancy within the last ${ADS_PRIORITE_PERIODE_ANS} count towards priority on the waiting list.</p>

<h2>Buying on credit versus renting: the numbers</h2>
<p>The table below is produced by the site’s engine from three assumptions chosen for illustration: the published Paris price (${h.eur(X.ads_prix_paris_environ)}), a ${h.eur(HYP_APPORT)} deposit and a ${h.pct(HYP_TAUX, 1)} interest rate. These are not observed bank terms. The comparison rent is the Paris figure from service-public.</p>
${h.table(['Loan term', 'Monthly repayment', 'Total interest', 'Gap with rent'], cas.map((c) => [`${c.annees} years`, h.eur(c.mensualite), h.eur(c.interets), h.eur(c.ecartMensuel)]), 'Calculation: achatOuLocation, fixed-rate amortising loan; illustrative assumptions')}
<p>How to read it. The repayment stays below the rent for all three terms, but it only buys the licence: an owner still pays for the car, its upkeep and insurance, whereas service-public says a rental firm maintains the vehicle. At the Nice price (${h.eur(X.ads_prix_nice_environ)}), with the same assumptions over ${NICE_ANS} years, the repayment rises to ${h.eur(nice.mensualite)}. Finally, ${h.num(cas[0].anneesLoyer, 1)} years of Paris rent add up to the purchase price. That is roughly the horizon from which buying starts to make sense, provided the licence keeps its value, which nobody can promise.</p>
<p>Rerun the numbers with your own loan offer in the calculator at the top of the page, then feed the result into the ${h.a('revenu-net-chauffeur', 'net income calculator')}. The ${h.a('salaire-taxi', 'taxi driver earnings')} page compares an owner and a tenant on the same takings.</p>

<h2>Licence-related penalties</h2>
<p>${h.src('ctL3124Ads', 'Articles L3124-1 to L3124-5 of the Transport Code')} work on two levels. Administratively, the authority can warn the holder, or withdraw the licence for a period or permanently, if it is not operated effectively and continuously or if its terms are seriously or repeatedly breached. Criminally, running a taxi business without an ADS carries ${A.sanction_prison_ans} years in prison and a ${h.eur(A.sanction_amende_personne)} fine, with possible licence suspension for up to ${A.sanction_suspension_permis_ans} years, impounding for up to ${A.sanction_immobilisation_ans} year and confiscation.</p>
<p>These rules sit alongside the provisions shared by taxis and VTCs in ${h.src('ctL3120', 'articles L3120-1 to L3120-5')}, including the duty to work on pre-booking only when you have no licence or are outside your area.</p>
`,
  },
});
