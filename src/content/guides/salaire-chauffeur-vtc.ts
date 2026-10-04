import { defineGuide } from '../../lib/guide-types';
import { P } from '../../lib/engine/params';
import { revenuNet, DEFAULTS, type RegimeTva } from '../../lib/engine/revenu';

const M = P.micro;
const T = P.tva;
const G = P.plateformes;

/* Exemples calculés par le moteur du site, à partir des hypothèses par défaut du simulateur
   (ce ne sont ni des moyennes, ni des statistiques, ni des taux publiés par une plateforme). */
const d = DEFAULTS.vtc_plateforme;
const fraisMois = d.carburantMois + d.vehiculeMois + d.assuranceMois + d.entretienMois + d.autresMois;
const NIVEAUX = [800, 1100, 1400, 1800];
const lignes = NIVEAUX.map((ca) => ({ ca, r: revenuNet({ ...d, caAnnuel: ca * d.semaines }) }));
const ref = lignes[2];
const reel = revenuNet({ ...d, caAnnuel: ref.ca * d.semaines, statut: 'reel' });
const p = DEFAULTS.vtc_propre;
const propre = revenuNet(p);
const fraisPropre = p.carburantMois + p.vehiculeMois + p.assuranceMois + p.entretienMois + p.autresMois;
const premierAssujetti = lignes.find((x) => x.r.regimeTva === 'assujetti');

const nf = (n: number) => Math.round(n).toLocaleString('fr-FR').replace(/\s/g, '\u00a0');
const ne = (n: number) => Math.round(n).toLocaleString('en-GB');
const pf = (x: number) => (Math.round(x * 1000) / 10).toLocaleString('fr-FR');
const pe = (x: number) => (Math.round(x * 1000) / 10).toLocaleString('en-GB');

const regimeFr: Record<RegimeTva, string> = { franchise: 'franchise', tolerance: 'franchise (seuil majoré)', assujetti: 'TVA due' };
const regimeEn: Record<RegimeTva, string> = { franchise: 'exempt', tolerance: 'exempt (upper threshold)', assujetti: 'VAT due' };

export default defineGuide({
  id: 'salaire-chauffeur-vtc',
  group: 'revenus',
  order: 10,
  mini: 'gainVtc',
  related: ['revenu-net-chauffeur', 'tva-vtc-taxi', 'salaire-taxi', 'vehicule-vtc', 'devenir-chauffeur-vtc'],
  sources: ['urssafAe', 'spFranchiseTva', 'cgi279', 'arpeRevenuCourse', 'arpeRevenuHoraire', 'spVtc', 'urssafTns'],
  fr: {
    slug: 'combien-gagne-un-chauffeur-vtc',
    nav: 'Combien gagne un VTC',
    card: 'Pas de salaire : du chiffre d’affaires au net, avec des exemples calculés par le simulateur.',
    title: 'Salaire chauffeur VTC 2026 : ce qui reste après les frais',
    description: `Salaire chauffeur VTC 2026 : pas de paie, un chiffre d’affaires moins commission, frais, TVA à ${pf(T.taux_transport)} % et cotisations micro de ${pf(M.taux_bic_services)} %. Exemples chiffrés.`,
    h1: 'Combien gagne un chauffeur VTC : du chiffre d’affaires au revenu net',
    intro: 'Un chauffeur VTC indépendant ne touche pas de salaire : il garde ce que son chiffre d’affaires laisse après tout le reste.',
    resume: `Un chauffeur VTC indépendant n’a pas de salaire. Il encaisse un chiffre d’affaires et garde ce qui reste après cinq prélèvements : la commission de la plateforme s’il en utilise une, les frais du véhicule (carburant, location ou crédit, assurance, entretien), la TVA à ${pf(T.taux_transport)} % dès que le chiffre dépasse la franchise (${nf(T.franchise_services)} € par an, ${nf(T.franchise_services_majore)} € au seuil majoré, en 2026), les cotisations sociales (${pf(M.taux_bic_services)} % du chiffre d’affaires en micro-entreprise, plus ${pf(M.cfp_artisan)} % de contribution à la formation, ou un barème sur le bénéfice au réel) et l’impôt sur le revenu. Le résultat dépend surtout des heures et des frais. Avec les hypothèses d’exemple du simulateur (${d.semaines} semaines, ${d.heuresSemaine} heures par semaine, ${nf(fraisMois)} € de frais par mois), ${nf(ref.ca)} € de courses facturées par semaine laissent environ ${nf(ref.r.netMensuel)} € net par mois avant impôt. Ce sont des estimations, pas une promesse. Côté plateformes, les accords de 2023 garantissent au moins ${G.revenu_min_course} € net par course, ${G.revenu_min_heure} € par heure travaillée et ${G.revenu_min_km} € par kilomètre.`,
    faqs: [
      { q: 'Un chauffeur VTC indépendant touche-t-il un salaire fixe ?', a: 'Non. En micro-entreprise ou en entreprise individuelle, le chauffeur facture des courses et se rémunère sur ce qui reste une fois payés la commission, les frais du véhicule, la TVA éventuelle et les cotisations. Il n’a ni fiche de paie, ni minimum garanti par un employeur. Seul le chauffeur salarié d’une entreprise de VTC perçoit un salaire, fixé par son contrat.' },
      { q: 'À partir de quel chiffre d’affaires un VTC doit-il facturer la TVA ?', a: `En 2026, la franchise de TVA des prestations de services s’arrête à ${nf(T.franchise_services)} € de chiffre d’affaires annuel. Entre ce seuil et ${nf(T.franchise_services_majore)} €, la franchise tient jusqu’au 31 décembre ; au-delà du seuil majoré, la TVA est due dès le jour du dépassement, selon service-public (fiche F21746). Le transport de voyageurs est taxé à ${pf(T.taux_transport)} % (article 279 b quater du CGI).` },
      { q: 'Quel pourcentage du chiffre d’affaires part en cotisations pour un VTC micro-entrepreneur ?', a: `${pf(M.taux_bic_services)} % du chiffre d’affaires pour les prestations de services, auxquels s’ajoute ${pf(M.cfp_artisan)} % de contribution à la formation professionnelle pour un artisan, selon l’Urssaf. Ces taux s’appliquent au chiffre encaissé, sans déduire les frais du véhicule. L’Acre, accordée sous conditions, réduit le taux jusqu’à la fin du troisième trimestre civil suivant le début d’activité ; l’option pour le versement libératoire ajoute ${pf(M.versement_liberatoire_bic_services)} % au titre de l’impôt.` },
      { q: `Une plateforme peut-elle verser moins de ${G.revenu_min_course} € pour une course VTC ?`, a: `Non, selon l’avenant du 19 décembre 2023 signé dans le cadre de l’ARPE et repris par service-public : chaque course donne lieu à un revenu minimal de ${G.revenu_min_course} €, calculé après déduction de la commission. Un autre accord du même jour garantit ${G.revenu_min_heure} € par heure travaillée et ${G.revenu_min_km} € par kilomètre parcouru en course. Ces montants peuvent être révisés chaque année.` },
      { q: 'Le revenu net d’un VTC est-il encore imposable après les cotisations ?', a: `Oui. Le net calculé ici est un revenu avant impôt sur le revenu. En micro-entreprise, le bénéfice imposable est le chiffre d’affaires diminué d’un abattement forfaitaire de ${pf(M.abattement_bic_services)} % pour les services, puis il s’ajoute aux autres revenus du foyer. L’option pour le versement libératoire, si vous y avez droit, remplace ce calcul par ${pf(M.versement_liberatoire_bic_services)} % du chiffre d’affaires.` },
      { q: 'Combien gagne un chauffeur VTC qui a sa propre clientèle ?', a: `Aucune statistique publique sourcée ne permet de répondre en moyenne. Le simulateur donne un ordre de grandeur à partir d’hypothèses : avec ${p.coursesSemaine} courses par semaine à ${p.prixMoyen} € et ${nf(fraisPropre)} € de frais mensuels, il estime environ ${nf(propre.netMensuel)} € net par mois avant impôt, sans commission mais avec la TVA. Changez ces valeurs pour votre cas.` },
    ],
    body: (h) => `
<h2>Pas de salaire, un chiffre d’affaires</h2>
<p>La question « combien gagne un chauffeur VTC » suppose un salaire. Or le chauffeur VTC type est indépendant : micro-entrepreneur, entrepreneur individuel ou dirigeant de sa société. Il facture des courses, directement ou par l’intermédiaire d’une plateforme, et vit de la différence entre ce qu’il encaisse et ce qu’il paie. Un même chiffre d’affaires peut donc laisser des revenus très différents à deux chauffeurs, selon leur voiture, leurs heures et leur statut.</p>
<p>Aucune statistique publique de revenu des chauffeurs VTC n’a été relevée dans les sources officielles que nous utilisons. Plutôt que de recopier des moyennes invérifiables, cette page montre le calcul et l’applique à des hypothèses que vous pouvez remplacer par les vôtres dans le mini-simulateur ci-dessus ou dans le ${h.a('revenu-net-chauffeur', 'simulateur complet de revenu net')}.</p>

<h2>Du prix payé par le client au net</h2>
<ol>
<li><strong>La commission</strong> : la plateforme retient une part de chaque course. Service-public indique qu’elle varie selon la plateforme ; aucun taux n’est publié dans les sources que nous avons lues, prenez celui de votre relevé.</li>
<li><strong>Les frais du véhicule</strong> : carburant ou recharge, location ou crédit, assurance professionnelle, entretien, téléphone, nettoyage. Ce sont souvent les plus lourds.</li>
<li><strong>La TVA</strong> : à ${h.pct(T.taux_transport)} sur le transport de voyageurs (${h.src('cgi279', 'article 279 b quater du CGI')}), seulement au-delà de la franchise.</li>
<li><strong>Les cotisations sociales</strong> : un pourcentage du chiffre d’affaires en micro-entreprise, un barème sur le bénéfice au réel.</li>
<li><strong>L’impôt sur le revenu</strong>, qui dépend de tout le foyer et n’est pas inclus dans le net affiché.</li>
</ol>

<h2>Quatre niveaux de chiffre d’affaires, calculés par le simulateur</h2>
<p>Le tableau applique le moteur de calcul du site à quatre montants de courses facturées par semaine, prix payé par le client. Les autres hypothèses sont celles du simulateur par défaut : ${d.semaines} semaines travaillées, ${d.heuresSemaine} heures par semaine, micro-entreprise sans Acre, ${h.eur(fraisMois)} de frais de véhicule et divers par mois, et une commission d’exemple de ${h.pct(d.commission ?? 0)} du prix client. Ce taux est une hypothèse de calcul, pas celui d’une plateforme.</p>
${h.table(['Courses par semaine', 'Chiffre d’affaires annuel', 'TVA', 'Net par mois', 'Net par heure'], lignes.map(({ ca, r }) => [
  h.eur(ca), h.eur(r.caClient), regimeFr[r.regimeTva], h.eur(r.netMensuel), h.eur(r.netHoraire, 2),
]), 'Estimations du simulateur taxinoir.fr, avant impôt sur le revenu, taux 2026 de l’Urssaf et de service-public')}
<p>Deux enseignements ressortent. D’abord, les frais fixes pèsent énormément au bas de l’échelle : à ${h.eur(lignes[0].ca)} par semaine, le véhicule absorbe presque tout. Ensuite, la progression n’est pas linéaire. ${premierAssujetti ? `À partir de ${h.eur(premierAssujetti.ca)} par semaine, le chiffre annuel dépasse le seuil majoré de la franchise et la TVA est due : ${h.eur(premierAssujetti.r.tva)} par an dans cet exemple, prélevés sur le prix payé par le client.` : ''}</p>
<p>Ces lignes ne décrivent aucun chauffeur réel. Un véhicule déjà payé, une assurance moins chère ou moins d’heures à vide changent tout. Servez-vous-en pour comprendre l’effet de chaque poste, pas comme une référence de revenu.</p>

<h2>Le seuil de TVA, la marche que l’on sent passer</h2>
<p>En 2026, la franchise de TVA des services s’applique tant que le chiffre d’affaires de l’année précédente ne dépasse pas ${h.eur(T.franchise_services)}. Si l’année en cours le dépasse sans franchir ${h.eur(T.franchise_services_majore)}, la franchise tient jusqu’au 31 décembre et tombe au 1er janvier suivant ; au-delà du seuil majoré, la TVA est due dès le jour du dépassement (${h.src('spFranchiseTva', 'service-public, fiche F21746')}).</p>
<p>Pour un VTC, le choc est réel parce que ses prix, fixés par la plateforme ou affichés à ses clients, ne montent pas d’un coup de ${h.pct(T.taux_transport)}. La TVA se prend alors sur la marge. La page ${h.a('tva-vtc-taxi', 'TVA des VTC et taxis')} détaille le calcul et le choix d’opter ou non.</p>

<h2>Micro-entreprise ou réel : ce que change le statut</h2>
<p>En micro-entreprise, l’Urssaf prélève ${h.pct(M.taux_bic_services)} du chiffre d’affaires pour les prestations de services, plus ${h.pct(M.cfp_artisan)} de contribution à la formation professionnelle pour un artisan (${h.src('urssafAe', 'Urssaf, autoentrepreneur.urssaf.fr')}). Le calcul est simple, mais il ignore les frais : un chauffeur aux frais élevés cotise sur de l’argent qu’il a déjà dépensé. Le plafond du régime est de ${h.eur(M.seuil_services)} de chiffre d’affaires en 2026.</p>
<p>Au réel, l’entrepreneur individuel cotise sur son bénéfice, frais déduits, selon le barème 2026 des artisans. Sur la ligne à ${h.eur(ref.ca)} par semaine, le simulateur estime ${h.eur(ref.r.netMensuel)} net par mois en micro et ${h.eur(reel.netMensuel)} au réel, avec les mêmes frais. L’écart vient des frais déduits avant cotisations ; il se paie en comptabilité. La SASU n’est pas simulée par le site, faute de sources complètes sur ses cotisations.</p>

<h2>Ce que garantissent les accords avec les plateformes</h2>
<p>Trois montants minimaux s’imposent aux plateformes de VTC, issus d’accords négociés en 2023 au sein de l’Autorité des relations sociales des plateformes d’emploi (ARPE) et repris par service-public :</p>
<ul>
<li>${h.eur(G.revenu_min_course)} au moins par course, après déduction de la commission (${h.src('arpeRevenuCourse', 'avenant du 19 décembre 2023')}) ;</li>
<li>${h.eur(G.revenu_min_heure)} au moins par heure travaillée ;</li>
<li>${h.eur(G.revenu_min_km)} au moins par kilomètre parcouru en course (${h.src('arpeRevenuHoraire', 'accord du 19 décembre 2023')}).</li>
</ul>
<p>Ce sont des planchers versés par la plateforme, avant les frais du véhicule, la TVA et les cotisations, qui restent à la charge du chauffeur. L’accord définit lui-même ce qui compte comme heure travaillée : lisez-le avant de comparer ce plancher avec vos heures connectées. Ces montants peuvent être révisés chaque année. Les informations sur les plateformes sont indicatives et se vérifient auprès de chacune d’elles.</p>

<h2>Clientèle propre : pas de commission, d’autres coûts</h2>
<p>Le chauffeur qui travaille pour ses propres clients, hôtels, entreprises ou particuliers, ne verse pas de commission, mais il doit trouver ses courses et peut avoir plus de frais de prospection. Le simulateur, avec ${p.coursesSemaine} courses par semaine à ${h.eur(p.prixMoyen)}, ${p.heuresSemaine} heures et ${h.eur(fraisPropre)} de frais mensuels, estime ${h.eur(propre.netMensuel)} net par mois et ${h.eur(propre.netHoraire, 2)} par heure, TVA déduite. Le choix du ${h.a('vehicule-vtc', 'véhicule')} pèse lourd dans ce résultat, et la comparaison avec le ${h.a('salaire-taxi', 'revenu d’un taxi')} se fait avec le même moteur.</p>
`,
  },
  en: {
    slug: 'vtc-driver-earnings',
    nav: 'VTC driver earnings',
    card: 'No salary: from turnover to take-home pay, with examples worked out by the calculator.',
    title: 'VTC Driver Earnings France 2026: What You Really Keep',
    description: `VTC driver pay in France, 2026: no salary, just fares minus commission, running costs, ${pe(T.taux_transport)}% VAT and ${pe(M.taux_bic_services)}% micro-enterprise contributions. Worked examples.`,
    h1: 'How much does a VTC driver earn in France? From fares to take-home pay',
    intro: 'Self-employed VTC drivers have no wage. What they earn is whatever their fares leave once everything else is paid.',
    resume: `A self-employed VTC (private-hire) driver in France has no salary. You bill fares and keep what is left after five deductions: the platform’s commission if you use an app, your vehicle costs (fuel, lease or loan, insurance, servicing), VAT at ${pe(T.taux_transport)}% once your turnover goes past the small-business exemption (€${ne(T.franchise_services)} a year, €${ne(T.franchise_services_majore)} at the upper threshold, in 2026), social contributions to the Urssaf, the body that collects them (${pe(M.taux_bic_services)}% of turnover as a micro-entrepreneur plus ${pe(M.cfp_artisan)}% for training, or a scale based on profit under the standard regime), and income tax. Hours and costs drive the result more than anything. Using the calculator’s example assumptions (${d.semaines} weeks, ${d.heuresSemaine} hours a week, €${ne(fraisMois)} of monthly costs), €${ne(ref.ca)} of weekly fares leaves roughly €${ne(ref.r.netMensuel)} a month before income tax. That is an estimate, not a promise. For app work, agreements signed in 2023 guarantee at least €${G.revenu_min_course} net per ride, €${G.revenu_min_heure} per hour worked and €${G.revenu_min_km} per kilometre.`,
    faqs: [
      { q: 'Do self-employed VTC drivers in France get a monthly wage?', a: 'No. As a micro-entrepreneur or sole trader, you bill rides and pay yourself from what remains after commission, vehicle costs, any VAT and social contributions. There is no payslip and no employer-backed minimum. Only drivers employed by a VTC company receive a salary, and its amount is whatever their employment contract sets.' },
      { q: 'At what turnover must a VTC driver start charging VAT?', a: `In 2026 the VAT exemption for services ends at €${ne(T.franchise_services)} of annual turnover. Between that and €${ne(T.franchise_services_majore)}, you stay exempt until 31 December; above the upper threshold, VAT is due from the day you cross it, according to service-public page F21746. Passenger transport is taxed at ${pe(T.taux_transport)}% under article 279 b quater of the tax code.` },
      { q: 'What share of turnover goes to Urssaf for a micro-entrepreneur driver?', a: `${pe(M.taux_bic_services)}% of turnover for service activities, plus a ${pe(M.cfp_artisan)}% training levy for craft businesses such as VTC, according to the Urssaf. Both apply to the money you take, with no deduction for vehicle costs. Acre, a start-up relief granted under conditions, cuts the rate until the end of the third calendar quarter after you start, and the flat-rate tax option adds ${pe(M.versement_liberatoire_bic_services)}% for income tax.` },
      { q: 'Is there a minimum payment per ride on VTC apps?', a: `Yes. Under the amendment of 19 December 2023, negotiated through ARPE, the public body overseeing platform labour relations, and quoted by service-public, every ride must pay the driver at least €${G.revenu_min_course} after commission. A second agreement of the same date sets €${G.revenu_min_heure} per hour worked and €${G.revenu_min_km} per kilometre driven on a ride. These figures can be reviewed each year.` },
      { q: 'Do I still owe income tax on top of contributions?', a: `Yes. The net figure on this page is before income tax. As a micro-entrepreneur, your taxable profit is turnover minus a flat ${pe(M.abattement_bic_services)}% allowance for services, added to the rest of your household’s income. If you qualify for the flat-rate option (versement libératoire), you instead pay ${pe(M.versement_liberatoire_bic_services)}% of turnover each time you declare it.` },
      { q: 'What can a driver with private clients rather than apps expect?', a: `No sourced public statistic gives an average. The calculator offers a rough idea from assumptions: ${p.coursesSemaine} rides a week at €${p.prixMoyen} with €${ne(fraisPropre)} of monthly costs comes out at about €${ne(propre.netMensuel)} a month before income tax, with no commission but with VAT. Swap in your own numbers for a meaningful answer.` },
    ],
    body: (h) => `
<h2>Turnover, not a pay cheque</h2>
<p>Asking what a VTC driver “earns” assumes a wage. Most VTC drivers in France are self-employed, either as micro-entrepreneurs (the simplified sole-trader scheme), standard sole traders or owners of their own small company. They bill rides, through an app or directly, and live on the gap between money in and money out. Two drivers with identical fares can end up with very different incomes depending on the car, the hours and the status they chose.</p>
<p>We found no public earnings statistics for VTC drivers in the official sources this site relies on. Instead of repeating averages nobody can check, this page walks through the sums and runs them on assumptions you can replace with your own, in the calculator above or in the ${h.a('revenu-net-chauffeur', 'full net income calculator')}.</p>

<h2>From the rider’s fare to your pocket</h2>
<ol>
<li><strong>Commission</strong>: the app keeps a cut of each fare. Service-public says it varies between platforms, and none of the sources we read publishes a rate, so use the one on your own statement.</li>
<li><strong>Vehicle costs</strong>: fuel or charging, lease or loan, professional insurance, servicing, phone, cleaning. Usually the heaviest item.</li>
<li><strong>VAT</strong>: ${h.pct(T.taux_transport)} on passenger transport (${h.src('cgi279', 'tax code, article 279 b quater')}), and only above the exemption threshold.</li>
<li><strong>Social contributions</strong>: a percentage of turnover for micro-entrepreneurs, a sliding scale on profit under the standard regime.</li>
<li><strong>Income tax</strong>, which depends on your whole household and is left out of the net figures here.</li>
</ol>

<h2>Four turnover levels, run through the calculator</h2>
<p>The table feeds four weekly fare totals, at the price the rider pays, into the site’s calculation engine. Everything else uses the calculator’s default example: ${d.semaines} working weeks, ${d.heuresSemaine} hours a week, micro-enterprise without Acre relief, ${h.eur(fraisMois)} a month of vehicle and sundry costs, and an example commission of ${h.pct(d.commission ?? 0)} of the fare. That rate is our working assumption, not any platform’s published figure.</p>
${h.table(['Weekly fares', 'Annual turnover', 'VAT', 'Net a month', 'Net an hour'], lignes.map(({ ca, r }) => [
  h.eur(ca), h.eur(r.caClient), regimeEn[r.regimeTva], h.eur(r.netMensuel), h.eur(r.netHoraire, 2),
]), 'taxinoir.fr calculator estimates, before income tax, using 2026 Urssaf and service-public rates')}
<p>Two lessons stand out. At the bottom, fixed costs dominate: at ${h.eur(lignes[0].ca)} a week, the car swallows almost everything. Further up, the curve is not smooth. ${premierAssujetti ? `From ${h.eur(premierAssujetti.ca)} a week, annual turnover clears the upper VAT threshold, so VAT becomes payable: ${h.eur(premierAssujetti.r.tva)} a year in this example, carved out of the fares riders pay.` : ''}</p>
<p>None of these rows describes a real driver. A car that is already paid off, cheaper insurance or less empty driving changes the picture completely. Use the table to see what each cost does, not as a benchmark of what you will make.</p>

<h2>The VAT threshold: a step you will feel</h2>
<p>For 2026, the VAT exemption for services (franchise en base) applies while the previous year’s turnover stays at or under ${h.eur(T.franchise_services)}. If the current year goes past that without reaching ${h.eur(T.franchise_services_majore)}, you stay exempt until 31 December and lose the exemption on 1 January; beyond the upper figure, VAT is due from the day you cross it (${h.src('spFranchiseTva', 'service-public, page F21746')}).</p>
<p>VTC drivers feel it because fares, set by the app or quoted to clients, do not jump by ${h.pct(T.taux_transport)} overnight, so the tax comes out of the margin. The ${h.a('tva-vtc-taxi', 'VAT for VTC and taxi drivers')} page covers the sums and whether opting in early makes sense.</p>

<h2>Micro-enterprise or standard regime</h2>
<p>As a micro-entrepreneur you pay ${h.pct(M.taux_bic_services)} of turnover on service income plus a ${h.pct(M.cfp_artisan)} training levy for craft businesses (${h.src('urssafAe', 'Urssaf, autoentrepreneur.urssaf.fr')}). It is easy to work out but blind to costs: a driver with heavy running costs pays contributions on money already spent. The scheme stops at ${h.eur(M.seuil_services)} of turnover in 2026.</p>
<p>Under the standard regime (régime réel), a sole trader pays contributions on profit after costs, using the 2026 scale for craft businesses. On the ${h.eur(ref.ca)}-a-week row, the calculator estimates ${h.eur(ref.r.netMensuel)} a month as a micro-entrepreneur and ${h.eur(reel.netMensuel)} under the standard regime, with identical costs. The gap comes from deducting costs before contributions, and you pay for it in bookkeeping. The site does not model a SASU company, because we lack complete sources on its contributions.</p>

<h2>What the platform agreements guarantee</h2>
<p>Three minimum amounts bind VTC apps. They come from agreements negotiated in 2023 through ARPE (Autorité des relations sociales des plateformes d’emploi) and are quoted by service-public:</p>
<ul>
<li>at least ${h.eur(G.revenu_min_course)} per ride after commission (${h.src('arpeRevenuCourse', 'amendment of 19 December 2023')});</li>
<li>at least ${h.eur(G.revenu_min_heure)} per hour worked;</li>
<li>at least ${h.eur(G.revenu_min_km)} per kilometre driven on a ride (${h.src('arpeRevenuHoraire', 'agreement of 19 December 2023')}).</li>
</ul>
<p>These are floors paid by the platform, before your vehicle costs, VAT and contributions, which you still carry. The agreement itself defines what counts as an hour worked, so read it before setting that floor against your logged-in hours. The amounts may be reviewed yearly. Anything said here about platforms is for guidance only; check the details with each one.</p>

<h2>Private clients: no commission, other costs</h2>
<p>Drivers who serve their own clients, such as hotels, companies or private customers, pay no commission but have to find the work themselves and often spend more on getting known. With ${p.coursesSemaine} rides a week at ${h.eur(p.prixMoyen)}, ${p.heuresSemaine} hours and ${h.eur(fraisPropre)} of monthly costs, the calculator estimates ${h.eur(propre.netMensuel)} a month and ${h.eur(propre.netHoraire, 2)} an hour, after VAT. Your choice of ${h.a('vehicule-vtc', 'vehicle')} weighs heavily on that result, and the ${h.a('salaire-taxi', 'taxi driver earnings')} page uses the same engine for comparison.</p>
`,
  },
});
