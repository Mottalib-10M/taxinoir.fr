import { defineGuide } from '../../lib/guide-types';
import { P } from '../../lib/engine/params';
import { revenuNet, DEFAULTS } from '../../lib/engine/revenu';

// Valeurs lues dans params-2026.json : bloc `carburant_regions` (flux officiel prix-carburants.gouv.fr,
// moyennes des stations mises à jour du 1er au 4 octobre 2026), `taxi` (F21907, prix des licences vérifiés
// le 13 juillet 2026), `grille_trv`, `ambulancier`. Aucune donnée de revenu régional n'est publiée ici :
// nous n'en avons trouvé aucune source publique fiable.
const C = P.carburant_regions;
const R = C.regions as Array<[string, string, number, number]>;
const TX = P.taxi;
const KM = 4000, CONSO = 5.5;
const litres = (KM * CONSO) / 100;
const e10 = R.map((r) => r[3]);
const gaz = R.map((r) => r[2]);
const ecartE10 = (Math.max(...e10) - Math.min(...e10)) * litres;
const ecartGaz = (Math.max(...gaz) - Math.min(...gaz)) * litres;
const cherE10 = R[e10.indexOf(Math.max(...e10))][1];
const basE10 = R[e10.indexOf(Math.min(...e10))][1];
const d = DEFAULTS.vtc_plateforme;
const netA = revenuNet({ ...d, carburantMois: Math.min(...e10) * litres }).netMensuel;
const netB = revenuNet({ ...d, carburantMois: Math.max(...e10) * litres }).netMensuel;
const fr = (n: number) => Math.round(n).toLocaleString('fr-FR');
const en = (n: number) => Math.round(n).toLocaleString('en-GB');

export default defineGuide({
  id: 'revenus-chauffeur-region',
  group: 'revenus',
  order: 70,
  mini: 'carburantRegion',
  miniHref: 'revenu-net-chauffeur',
  related: ['revenu-net-chauffeur', 'salaire-chauffeur-vtc', 'salaire-taxi', 'licence-taxi', 'salaire-chauffeur-bus', 'salaire-ambulancier'],
  sources: ['prixCarburants', 'spTaxi', 'avenantTrv120', 'avenantAmbulanciers', 'spSmic'],
  fr: {
    slug: 'revenus-chauffeur-region',
    nav: 'Revenus par région',
    card: 'Ce qui change vraiment d’une région à l’autre : carburant relevé, licence de taxi, et ce qui ne change pas.',
    title: 'Revenus chauffeur par région 2026 : carburant, licence, net',
    description: `Revenus des chauffeurs par région en 2026 : prix officiels du carburant dans ${R.length} régions, licence de taxi à Paris et Nice, grilles nationales et simulateur.`,
    h1: 'Revenus des chauffeurs par région : ce que disent les données publiques',
    intro: 'Il n’existe pas de statistique publique du revenu des chauffeurs région par région : cette page montre ce qui varie vraiment, chiffres officiels à l’appui.',
    resume: `Nous n’avons trouvé aucune source publique fiable qui donne le revenu des chauffeurs de taxi ou de VTC par région : la page ne publie donc aucun « salaire moyen » régional. Elle s’appuie sur ce qui est mesuré. Le carburant d’abord : selon le flux officiel des prix de prix-carburants.gouv.fr, relevé du 1er au 4 octobre 2026, le litre d’E10 coûte en moyenne de ${R[e10.indexOf(Math.min(...e10))][3].toFixed(3).replace('.', ',')} € (${basE10}) à ${R[e10.indexOf(Math.max(...e10))][3].toFixed(3).replace('.', ',')} € (${cherE10}), soit environ ${fr(ecartE10)} € d’écart par mois pour ${fr(KM)} km à ${CONSO.toString().replace('.', ',')} L/100. La licence de taxi ensuite, dont service-public situe le prix vers ${fr(TX.ads_prix_paris_environ)} € à Paris et ${fr(TX.ads_prix_nice_environ)} € à Nice. À l’inverse, les minima des salariés sont nationaux : Smic, grille des conducteurs de car, grille des ambulanciers. Le reste, prix moyen des courses et nombre de courses par heure, dépend de votre zone : le simulateur vous laisse le saisir.`,
    faqs: [
      { q: 'Combien gagne un chauffeur VTC à Paris par rapport à la province ?', a: 'Aucune statistique publique fiable ne le mesure : les chiffres qui circulent viennent de plateformes, de centres de formation ou d’annonces, et nous ne les reprenons pas. Ce qui diffère réellement se calcule : prix et volume des courses, que vous connaissez mieux que quiconque dans votre zone, coût du carburant relevé par région, et frais de véhicule. Le simulateur de revenu net fait le calcul avec vos chiffres.' },
      { q: 'Le carburant coûte-t-il beaucoup plus cher selon les régions ?', a: `Un peu. Sur le relevé officiel du 1er au 4 octobre 2026, l’écart entre la région la moins chère et la plus chère est d’environ ${fr(ecartE10)} € par mois en E10 et ${fr(ecartGaz)} € en gazole, pour un chauffeur qui parcourt ${fr(KM)} km par mois à ${CONSO.toString().replace('.', ',')} litres aux 100 km. C’est réel, mais bien moins que l’écart de prix des courses ou de commission.` },
      { q: 'Le salaire d’un ambulancier ou d’un conducteur de car change-t-il selon la région ?', a: 'Pas le minimum. Le Smic est le même partout en métropole, et les grilles conventionnelles des ambulanciers comme des conducteurs de car s’appliquent à toute la branche, quelle que soit la région. Les écarts viennent des heures supplémentaires, des primes d’entreprise, des indemnités de dimanche et de la politique salariale de chaque employeur, pas d’un barème régional.' },
      { q: 'Pourquoi la licence de taxi coûte-t-elle plus cher dans certaines villes ?', a: `Parce que son prix est libre et fixé par le vendeur. Service-public indique des montants de l’ordre de ${fr(TX.ads_prix_paris_environ)} € à Paris et ${fr(TX.ads_prix_nice_environ)} € à Nice, dans une fourchette nationale de ${fr(TX.ads_prix_min)} à ${fr(TX.ads_prix_max)} €. Les licences attribuées gratuitement depuis le 1er octobre 2014 ne sont pas cessibles : seules les plus anciennes se vendent.` },
      { q: 'D’où viennent les prix du carburant affichés sur cette page ?', a: 'Du flux instantané publié par le ministère de l’Économie sur prix-carburants.gouv.fr, où chaque station déclare ses prix. Nous avons calculé la moyenne simple des stations de chaque région mises à jour entre le 1er et le 4 octobre 2026. Les prix bougent chaque semaine : la page sera mise à jour, et le mini-simulateur accepte de toute façon votre propre consommation.' },
    ],
    body: (h) => `
<h2>Pourquoi aucun salaire moyen régional n’est affiché</h2>
<p>Les classements « combien gagne un VTC dans chaque région » qui circulent ne citent pas de source publique vérifiable : sondages de plateformes, estimations de centres de formation, offres d’emploi. Le revenu d’un chauffeur indépendant n’est pas un salaire, et les statistiques publiques que nous avons consultées ne le publient pas par région pour les taxis et VTC. Plutôt que d’inventer une moyenne, cette page montre les composantes qui varient réellement d’une région à l’autre et celles qui ne varient pas, puis laisse le simulateur faire le calcul avec vos hypothèses locales.</p>

<h2>Le carburant, région par région</h2>
<p>Le ministère de l’Économie publie en continu les prix déclarés par chaque station (${h.src('prixCarburants', 'flux prix-carburants.gouv.fr')}). Nous avons calculé la moyenne simple des stations de chaque région mises à jour du 1er au 4 octobre 2026. Le tableau applique ces prix à un exemple : ${h.num(KM)} km par mois, ${h.num(CONSO, 1)} litres aux 100 km.</p>
${h.table(['Région', 'Gazole (€/L)', 'Essence E10 (€/L)', `Carburant E10 par mois`], R.map(([, nom, g, e]) => [nom, h.num(g, 3), h.num(e, 3), h.eur(e * litres)]), 'Source : prix-carburants.gouv.fr, flux instantané, moyennes des stations mises à jour du 1er au 4 octobre 2026 ; Corse : SP95, le relevé n’y comptant pas d’E10', ['l', 'r', 'r', 'r'])}
<p>L’écart entre la région la moins chère et la plus chère représente environ ${h.eur(ecartE10)} par mois en E10 et ${h.eur(ecartGaz)} en gazole sur cet exemple. Appliqué au profil d’exemple du simulateur, un VTC de plateforme en micro-entreprise, il fait passer le net estimé de ${h.eur(netB)} à ${h.eur(netA)} par mois. C’est un écart réel, mais modeste à côté de ce que changent le prix moyen des courses, la commission ou les heures travaillées. Le mini-simulateur en haut de page refait le calcul avec votre région, votre carburant, votre kilométrage et votre consommation.</p>

<h2>La licence de taxi : l’écart le plus fort</h2>
<p>Pour un taxi, la plus grande différence géographique est le prix de la licence. Une autorisation de stationnement délivrée gratuitement depuis le ${h.date(TX.ads_date_incessibilite)} ne se vend pas ; les plus anciennes se cèdent à un prix libre. ${h.src('spTaxi', 'Service-public')}, page vérifiée le ${h.date(TX.ads_prix_verifies_le)}, situe ces prix entre ${h.eur(TX.ads_prix_min)} et ${h.eur(TX.ads_prix_max)}, avec des ordres de grandeur d’environ ${h.eur(TX.ads_prix_paris_environ)} à Paris et ${h.eur(TX.ads_prix_nice_environ)} à Nice, et une location autour de ${h.eur(TX.ads_loyer_paris_mois_environ)} par mois à Paris. Pour un taxi locataire ou qui rembourse un emprunt, cette charge pèse davantage sur le revenu que toutes les différences de carburant. La page ${h.a('licence-taxi', 'licence taxi')} calcule l’achat contre la location.</p>

<h2>Ce qui ne change pas d’une région à l’autre</h2>
<ul>
<li><strong>Les cotisations et la TVA</strong> : taux Urssaf, seuils de la micro-entreprise et TVA à ${h.pct(P.tva.taux_transport, 0)} sur le transport de voyageurs sont nationaux.</li>
<li><strong>Le Smic</strong> : ${h.eur(P.ambulancier.smic_horaire, 2)} brut de l’heure en 2026 selon ${h.src('spSmic', 'service-public')}, le même partout en métropole.</li>
<li><strong>Les grilles des salariés</strong> : celle des ${h.src('avenantAmbulanciers', 'ambulanciers')} et celle des ${h.src('avenantTrv120', 'conducteurs de car')} s’appliquent à toute la branche, sans barème régional. Voir ${h.a('salaire-ambulancier', 'salaire d’un ambulancier')} et ${h.a('salaire-chauffeur-bus', 'salaire d’un chauffeur de bus')}.</li>
<li><strong>Les garanties des plateformes</strong> : les accords conclus pour les VTC de plateforme fixent un revenu minimal de ${h.eur(P.plateformes.revenu_min_course)} net par course, sans distinction de région.</li>
<li><strong>Les frais réglementés d’accès</strong> : examen, carte, registre, identiques partout.</li>
</ul>

<h2>Ce qui change et que vous seul connaissez</h2>
<p>Le prix moyen d’une course, le nombre de courses par heure, le temps perdu dans les embouteillages, la part d’aéroports et de gares, la saisonnalité touristique : ce sont ces éléments qui font l’essentiel de l’écart entre une grande métropole et une ville moyenne. Aucune source officielle ne les publie par région, mais vous pouvez les mesurer sur quelques semaines d’activité, ou les estimer à partir des relevés d’un chauffeur de votre zone. Le loyer de votre véhicule et votre assurance varient aussi selon le lieu : prenez vos propres devis.</p>
<p>Le ${h.a('revenu-net-chauffeur', 'simulateur de revenu net')} accepte toutes ces hypothèses et renvoie un net mensuel et horaire, avec les taux officiels 2026. Les pages ${h.a('salaire-chauffeur-vtc', 'salaire d’un chauffeur VTC')} et ${h.a('salaire-taxi', 'salaire d’un taxi')} montrent comment lire le résultat. Ce sont des estimations construites sur vos hypothèses, jamais des promesses de revenu.</p>

<h2>Méthode et mise à jour</h2>
<p>Les prix du carburant sont des moyennes simples, non pondérées par les volumes vendus, des stations qui ont mis à jour leur prix entre le 1er et le 4 octobre 2026 : ${R.length} régions de métropole, hors outre-mer, absent du flux utilisé. Pour la Corse, la colonne essence reprend le SP95. Les prix changent chaque semaine ; la page sera actualisée à chaque révision des paramètres du site. Si une source publique de revenus régionaux des chauffeurs paraît, elle remplacera la partie « hypothèses » de cette page.</p>
`,
  },
  en: {
    slug: 'driver-income-by-region',
    nav: 'Income by region',
    card: 'What really changes from one region to another: recorded fuel prices, taxi licences, and what stays the same.',
    title: 'Driver Income by Region France 2026: Fuel, Licence, Net',
    description: `Driver income by French region, 2026: official fuel prices in ${R.length} regions, taxi licence prices in Paris and Nice, national pay scales and a calculator.`,
    h1: 'Driver income by region in France: what public data actually shows',
    intro: 'There is no public statistic on drivers’ income region by region, so this page shows what really varies, backed by official figures.',
    resume: `We have found no reliable public source giving taxi or VTC drivers’ income by French region, so this page publishes no regional “average salary”. It relies on what is measured. Fuel first: according to the official price feed on prix-carburants.gouv.fr, read from 1 to 4 October 2026, a litre of E10 petrol averages from €${R[e10.indexOf(Math.min(...e10))][3].toFixed(3)} (${basE10}) to €${R[e10.indexOf(Math.max(...e10))][3].toFixed(3)} (${cherE10}), a gap of about €${en(ecartE10)} a month for ${en(KM)} km at ${CONSO} L/100 km. Then the taxi licence, which service-public puts at around €${en(TX.ads_prix_paris_environ)} in Paris and €${en(TX.ads_prix_nice_environ)} in Nice. By contrast, minimum pay for employed drivers is national: the Smic (minimum wage), the coach driver scale and the ambulance scale. The rest, average fare and rides per hour, depends on your area, and the calculator lets you enter it.`,
    faqs: [
      { q: 'How much does a VTC driver earn in Paris compared with the rest of France?', a: 'No reliable public statistic measures it: the figures going round come from platforms, training centres or job ads, and we do not repeat them. What really differs can be calculated: fare levels and volume, which you know better than anyone in your area, fuel costs recorded by region, and vehicle costs. The net income calculator does the sums with your figures.' },
      { q: 'Is fuel much more expensive in some French regions?', a: `Slightly. In the official readings from 1 to 4 October 2026, the gap between the cheapest and dearest region is about €${en(ecartE10)} a month for E10 and €${en(ecartGaz)} for diesel, for a driver covering ${en(KM)} km a month at ${CONSO} litres per 100 km. It is real, but far smaller than differences in fares or commission.` },
      { q: 'Do ambulance and coach driver wages vary by region?', a: 'Not the minimum. The Smic is the same across mainland France, and the ambulance and coach driver pay scales apply to the whole sector regardless of region. Differences come from overtime, company bonuses, Sunday allowances and each employer’s pay policy, not from a regional scale.' },
      { q: 'Why do taxi licences cost more in some cities?', a: `Because the price is free and set by the seller. Service-public gives amounts of around €${en(TX.ads_prix_paris_environ)} in Paris and €${en(TX.ads_prix_nice_environ)} in Nice, within a national range of €${en(TX.ads_prix_min)} to €${en(TX.ads_prix_max)}. Licences issued free since 1 October 2014 cannot be sold: only older ones change hands.` },
      { q: 'Where do the fuel prices on this page come from?', a: 'From the live feed published by the Ministry of the Economy on prix-carburants.gouv.fr, where every station reports its prices. We took the simple average of stations in each region updated between 1 and 4 October 2026. Prices move every week; the page will be updated, and the calculator takes your own consumption in any case.' },
    ],
    body: (h) => `
<h2>Why no regional average income is shown</h2>
<p>The rankings of “what a VTC earns in each region” that circulate online cite no verifiable public source: platform surveys, training-centre estimates, job ads. A self-employed driver’s income is not a salary, and the public statistics we consulted do not publish it by region for taxis and VTCs. Rather than invent an average, this page shows which components really vary between regions and which do not, then lets the calculator work it out from your local assumptions.</p>

<h2>Fuel, region by region</h2>
<p>The Ministry of the Economy publishes the prices reported by every station in real time (${h.src('prixCarburants', 'prix-carburants.gouv.fr feed')}). We took the simple average of stations in each region updated from 1 to 4 October 2026. The table applies those prices to an example: ${h.num(KM)} km a month at ${h.num(CONSO, 1)} litres per 100 km.</p>
${h.table(['Region', 'Diesel (€/L)', 'Petrol E10 (€/L)', 'E10 fuel per month'], R.map(([, nom, g, e]) => [nom, h.num(g, 3), h.num(e, 3), h.eur(e * litres)]), 'Source: prix-carburants.gouv.fr live feed, averages of stations updated from 1 to 4 October 2026; Corsica: SP95, as the readings there include no E10', ['l', 'r', 'r', 'r'])}
<p>The gap between the cheapest and dearest region comes to about ${h.eur(ecartE10)} a month for E10 and ${h.eur(ecartGaz)} for diesel in this example. Applied to the calculator’s example profile, a platform VTC driver on the micro-enterprise scheme, it moves estimated net income from ${h.eur(netB)} to ${h.eur(netA)} a month. A real difference, but modest beside what average fare, commission or hours worked can change. The calculator at the top of the page redoes the sum with your region, fuel, mileage and consumption.</p>

<h2>The taxi licence: the biggest gap</h2>
<p>For a taxi, the largest geographical difference is the licence price. A licence (autorisation de stationnement) issued free since ${h.date(TX.ads_date_incessibilite)} cannot be sold; older ones change hands at a free price. ${h.src('spTaxi', 'Service-public')}, in a page checked on ${h.date(TX.ads_prix_verifies_le)}, puts those prices between ${h.eur(TX.ads_prix_min)} and ${h.eur(TX.ads_prix_max)}, with orders of magnitude of about ${h.eur(TX.ads_prix_paris_environ)} in Paris and ${h.eur(TX.ads_prix_nice_environ)} in Nice, and rent around ${h.eur(TX.ads_loyer_paris_mois_environ)} a month in Paris. For a taxi driver paying rent or a loan, that cost weighs on income far more than any fuel difference. The ${h.a('licence-taxi', 'taxi licence')} page compares buying with renting.</p>

<h2>What stays the same across regions</h2>
<ul>
<li><strong>Contributions and VAT</strong>: Urssaf rates, micro-enterprise thresholds and the ${h.pct(P.tva.taux_transport, 0)} VAT on passenger transport are national.</li>
<li><strong>The Smic</strong>: ${h.eur(P.ambulancier.smic_horaire, 2)} gross an hour in 2026 according to ${h.src('spSmic', 'service-public')}, the same across mainland France.</li>
<li><strong>Employee pay scales</strong>: the ${h.src('avenantAmbulanciers', 'ambulance')} and ${h.src('avenantTrv120', 'coach driver')} scales apply sector-wide with no regional variant. See ${h.a('salaire-ambulancier', 'ambulance pay')} and ${h.a('salaire-chauffeur-bus', 'bus driver pay')}.</li>
<li><strong>Platform guarantees</strong>: the agreements for platform VTC drivers set a minimum of ${h.eur(P.plateformes.revenu_min_course)} net per ride, with no regional distinction.</li>
<li><strong>Regulated entry fees</strong>: exam, card and register cost the same everywhere.</li>
</ul>

<h2>What changes, and only you know</h2>
<p>Average fare, rides per hour, time lost in traffic, the share of airport and station work, tourist seasons: these make up most of the gap between a large city and a mid-sized town. No official source publishes them by region, but you can measure them over a few weeks of work, or estimate them from a local driver’s figures. Vehicle rental and insurance also vary by place, so get your own quotes.</p>
<p>The ${h.a('revenu-net-chauffeur', 'net income calculator')} takes all of these assumptions and returns monthly and hourly net income using the official 2026 rates. The ${h.a('salaire-chauffeur-vtc', 'VTC driver earnings')} and ${h.a('salaire-taxi', 'taxi driver pay')} pages show how to read the result. They are estimates built on your assumptions, never promises of income.</p>

<h2>Method and updates</h2>
<p>Fuel prices are simple averages, not weighted by volume sold, of stations that updated their prices between 1 and 4 October 2026: ${R.length} mainland regions; the overseas territories are not in the feed we used. For Corsica, the petrol column uses SP95. Prices change weekly, and the page will be refreshed whenever the site’s parameters are reviewed. If a public source of regional driver income appears, it will replace the assumptions part of this page.</p>
`,
  },
});
