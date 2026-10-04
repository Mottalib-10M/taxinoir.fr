import { defineGuide } from '../../lib/guide-types';
import { P } from '../../lib/engine/params';
import { revenuNet, DEFAULTS, type RevenuInput } from '../../lib/engine/revenu';
import { achatOuLocation } from '../../lib/engine/acces';
import { formatMoney, formatDecimal } from '../../lib/format';

const X = P.taxi;
const M = P.micro;
const V = P.tva;
const S = P.ambulancier; // Smic horaire et durée légale (source spSmic), rangés dans ce bloc des paramètres

// Hypothèses d’exemple (pas des statistiques) : recettes hebdomadaires, prêt de l’acheteur.
const HYP_RECETTE = 1500;
const HYP_RECETTE_HAUTE = 2000;
const HYP_APPORT = 40000;
const HYP_TAUX = 0.045;
const HYP_PRET_ANS = 10;

const d = DEFAULTS.taxi;
const run = (o: Partial<RevenuInput>) => revenuNet({ ...d, statut: 'reel', ...o });
const proprio = run({ caAnnuel: HYP_RECETTE * d.semaines, licenceMois: 0 });
// Locataire : le loueur entretient le véhicule (service-public) ; on retire véhicule et entretien,
// on garde carburant, assurance et frais divers, par prudence.
const locataire = run({ caAnnuel: HYP_RECETTE * d.semaines, licenceMois: X.ads_loyer_paris_mois_environ, vehiculeMois: 0, entretienMois: 0 });
const locataireHaut = run({ caAnnuel: HYP_RECETTE_HAUTE * d.semaines, licenceMois: X.ads_loyer_paris_mois_environ, vehiculeMois: 0, entretienMois: 0 });
const pret = achatOuLocation({ prix: X.ads_prix_paris_environ, apport: HYP_APPORT, taux: HYP_TAUX, annees: HYP_PRET_ANS, loyer: X.ads_loyer_paris_mois_environ });
const acheteurReste = proprio.netMensuel - pret.mensualite;
const proprioMicro = revenuNet({ ...d, statut: 'micro', caAnnuel: HYP_RECETTE * d.semaines, licenceMois: 0 });
const locataireMicro = revenuNet({ ...d, statut: 'micro', caAnnuel: HYP_RECETTE * d.semaines, licenceMois: X.ads_loyer_paris_mois_environ, vehiculeMois: 0, entretienMois: 0 });
const smicMensuel = S.smic_horaire * S.duree_legale_mensuelle_h;

const fe = (n: number, l: 'fr' | 'en') => formatMoney(n, 0, l);
/** Un net négatif s’écrit comme une perte, jamais « -247 € ». */
const net = (n: number, l: 'fr' | 'en') => (n < 0 ? (l === 'fr' ? `une perte d’environ ${fe(-n, l)}` : `a loss of about ${fe(-n, l)}`) : fe(n, l));

export default defineGuide({
  id: 'salaire-taxi',
  group: 'revenus',
  order: 20,
  mini: 'gainTaxi',
  related: ['revenu-net-chauffeur', 'licence-taxi', 'tva-vtc-taxi', 'devenir-taxi', 'salaire-chauffeur-vtc'],
  sources: ['spTaxi', 'urssafAe', 'urssafTns', 'spFranchiseTva', 'cgi279', 'spSmic'],
  fr: {
    slug: 'combien-gagne-un-taxi',
    nav: 'Combien gagne un taxi',
    card: 'Artisan, locataire ou salarié : ce qui reste des recettes, calculé avec le simulateur.',
    title: 'Salaire taxi 2026 : combien gagne un chauffeur de taxi',
    description: `Combien gagne un taxi en 2026 : recettes au compteur moins licence, frais, TVA à ${Math.round(V.taux_transport * 100)} % et cotisations. Exemples chiffrés, propriétaire ou locataire à ${fe(X.ads_loyer_paris_mois_environ, 'fr')}.`,
    h1: 'Combien gagne un chauffeur de taxi : ce qui reste après la licence et les charges',
    intro: 'Un artisan taxi ne touche pas de salaire : il garde ce qui reste des recettes, et la licence en décide une bonne part.',
    resume: `Un chauffeur de taxi artisan ou locataire n’a pas de salaire : son revenu est ce qui reste des recettes encaissées au compteur après la TVA, les frais du véhicule, l’éventuel loyer ou remboursement de la licence et les cotisations sociales. Aucune statistique publique de revenu des taxis n’a été relevée pour ce site ; les chiffres ci-dessous sont des estimations du simulateur, à partir d’hypothèses que vous pouvez remplacer. Avec ${fe(HYP_RECETTE, 'fr')} de recettes par semaine sur ${d.semaines} semaines, au réel, le simulateur estime environ ${fe(proprio.netMensuel, 'fr')} nets par mois avant impôt pour un taxi qui possède sa licence, contre environ ${fe(locataire.netMensuel, 'fr')} pour un locataire qui paie ${fe(X.ads_loyer_paris_mois_environ, 'fr')} de loyer mensuel, ordre de grandeur parisien publié par service-public. Le taxi salarié, lui, perçoit un salaire fixe et un pourcentage des recettes du compteur, sans pouvoir être payé sous le Smic.`,
    faqs: [
      { q: 'Combien gagne un chauffeur de taxi par mois en 2026 ?', a: `Il n’existe pas de chiffre unique, et nous n’avons relevé aucune statistique publique fiable. Le simulateur donne une estimation : pour ${fe(HYP_RECETTE, 'fr')} de recettes par semaine, ${d.semaines} semaines et des frais d’exemple, environ ${fe(proprio.netMensuel, 'fr')} nets par mois avant impôt sur le revenu si la licence vous appartient, au régime réel. Remplacez chaque hypothèse par vos chiffres dans le mini-simulateur.` },
      { q: 'Quel est le salaire d’un chauffeur de taxi salarié ?', a: `Service-public décrit sa rémunération comme un salaire fixe plus un pourcentage du chiffre d’affaires réalisé chaque mois au compteur ; il ne publie ni montant ni taux. Comme tout salarié, il ne peut être payé sous le Smic, ${formatDecimal(S.smic_horaire, 2, 'fr')} € brut de l’heure en 2026, soit environ ${fe(smicMensuel, 'fr')} brut par mois pour ${formatDecimal(S.duree_legale_mensuelle_h, 2, 'fr')} heures. L’employeur entretient et assure le véhicule.` },
      { q: 'Un taxi locataire gagne-t-il moins qu’un propriétaire de licence ?', a: `À recettes égales, nettement, d’après le simulateur : avec ${fe(HYP_RECETTE, 'fr')} par semaine, environ ${fe(locataire.netMensuel, 'fr')} par mois pour un locataire à ${fe(X.ads_loyer_paris_mois_environ, 'fr')} de loyer, contre ${fe(proprio.netMensuel, 'fr')} pour un propriétaire, véhicule à sa charge. Le loyer pèse plus que les frais du véhicule qu’il évite. Pour combler l’écart, il faut des recettes plus élevées ou un loyer plus bas que l’ordre de grandeur parisien.` },
      { q: 'Un taxi qui loue sa licence peut-il rester en micro-entreprise ?', a: `Il le peut juridiquement sous le seuil de ${fe(M.seuil_services, 'fr')} de recettes hors taxes, mais le calcul lui devient vite défavorable : en micro, les cotisations portent sur les recettes sans déduire le loyer. Le simulateur, avec ${fe(HYP_RECETTE, 'fr')} par semaine et ${fe(X.ads_loyer_paris_mois_environ, 'fr')} de loyer, estime ${net(locataireMicro.netMensuel, 'fr')} par mois en micro, contre ${fe(locataire.netMensuel, 'fr')} au réel.` },
      { q: 'À partir de quel niveau de recettes un taxi doit-il facturer la TVA ?', a: `Au-delà de ${fe(V.franchise_services, 'fr')} de recettes annuelles, ou de ${fe(V.franchise_services_majore, 'fr')} l’année du dépassement, la franchise de TVA cesse (service-public, fiche F21746). Le transport de voyageurs est alors taxé à ${Math.round(V.taux_transport * 100)} % (article 279 b quater du CGI). Les tarifs étant plafonnés toutes taxes comprises, la TVA se prend sur ce que vous encaissez : avec ${fe(HYP_RECETTE, 'fr')} par semaine, environ ${fe(proprio.tva / 12, 'fr')} par mois à reverser.` },
    ],
    body: (h) => `
<h2>Pourquoi on ne peut pas parler de « salaire » pour un artisan taxi</h2>
<p>Service-public le dit en une ligne pour l’artisan : ses bénéfices lui reviennent entièrement. Le locataire, lui, perçoit la totalité de ses recettes et paie un loyer. Ni l’un ni l’autre n’a de fiche de paie. Ce qu’ils gagnent dépend de six choses qui se multiplient ou se soustraient : les recettes encaissées au compteur, la façon dont la licence a été obtenue, les frais du véhicule, la TVA, les cotisations sociales et le nombre d’heures passées au volant.</p>
<p>C’est pour cela que cette page ne donne pas de « salaire moyen du taxi ». Nous n’avons trouvé aucune statistique publique sourcée (Insee, Dares, rapport officiel) sur le revenu des taxis à reprendre ici. Les montants qui suivent sont des estimations du simulateur à partir de vos hypothèses et des taux officiels de 2026, jamais une promesse.</p>

<h2>La licence change tout : trois situations, mêmes recettes</h2>
<p>Pour isoler l’effet de la licence, nous avons fait tourner le moteur du site avec les mêmes recettes, ${h.eur(HYP_RECETTE)} par semaine, sur ${d.semaines} semaines et ${d.heuresSemaine} heures hebdomadaires, au régime réel. Frais d’exemple pour le propriétaire : carburant ${h.eur(d.carburantMois)}, véhicule ${h.eur(d.vehiculeMois)}, assurance ${h.eur(d.assuranceMois)}, entretien ${h.eur(d.entretienMois)}, divers ${h.eur(d.autresMois)} par mois. Pour le locataire, nous retirons le véhicule et l’entretien, que le loueur assure selon service-public, et nous ajoutons le loyer parisien publié, ${h.eur(X.ads_loyer_paris_mois_environ)}. Pour l’acheteur, nous retranchons du net la mensualité d’un prêt de ${HYP_PRET_ANS} ans sur le prix parisien publié, avec ${h.eur(HYP_APPORT)} d’apport et ${h.pct(HYP_TAUX, 1)} de taux.</p>
${h.table(['Situation', 'Charges par an', 'Cotisations par an', 'Net par mois', 'Net par heure'], [
  ['Licence possédée (gratuite ou payée)', h.eur(proprio.charges.total), h.eur(proprio.cotisations), h.eur(proprio.netMensuel), h.eur(proprio.netHoraire, 2)],
  [`Licence louée ${h.eur(X.ads_loyer_paris_mois_environ)} par mois`, h.eur(locataire.charges.total), h.eur(locataire.cotisations), h.eur(locataire.netMensuel), h.eur(locataire.netHoraire, 2)],
  [`Licence achetée à crédit (net moins ${h.eur(pret.mensualite)} de mensualité)`, h.eur(proprio.charges.total), h.eur(proprio.cotisations), h.eur(acheteurReste), h.eur(acheteurReste * 12 / proprio.heuresAn, 2)],
], `Estimation du simulateur (revenuNet, achatOuLocation), recettes de ${h.eur(HYP_RECETTE)} par semaine, régime réel, avant impôt sur le revenu`)}
<p>Le propriétaire d’une licence obtenue gratuitement, ou déjà remboursée, garde le plus. Le locataire paie chaque mois un loyer qui dépasse largement les frais de véhicule qu’il évite. L’acheteur se situe entre les deux tant que court son prêt ; ensuite il rejoint le propriétaire. La ligne de l’acheteur est une approximation : les intérêts d’emprunt, qui réduisent en principe le bénéfice imposable et les cotisations, ne sont pas modélisés.</p>
<p>Avec ${h.eur(HYP_RECETTE_HAUTE)} de recettes par semaine, le même locataire passe à environ ${h.eur(locataireHaut.netMensuel)} par mois selon le simulateur. Le calcul détaillé de l’achat contre la location est sur la page ${h.a('licence-taxi', 'licence de taxi')}.</p>

<h2>Les recettes : ce que dit le compteur, pas ce que vous espérez</h2>
<p>Les recettes d’un taxi sont plafonnées par des tarifs réglementés et dépendent de facteurs qu’aucun texte ne chiffre : la ville, le créneau horaire, la part de courses réservées, la part de transports de patients sous convention avec l’Assurance maladie. C’est pourquoi le mini-simulateur part de vos recettes hebdomadaires, pas d’un nombre de courses imaginé par nous. Si vous débutez, demandez à des chauffeurs de votre zone ce qu’affiche leur compteur sur une semaine ordinaire, ou prenez les relevés d’un mois de location avant de vous engager dans un achat.</p>
<p>Le temps compte autant que le montant. À ${d.heuresSemaine} heures par semaine, le net horaire du propriétaire de notre exemple ressort à ${h.eur(proprio.netHoraire, 2)}. Travailler davantage augmente le revenu mensuel, mais le loyer d’une licence, lui, ne baisse pas pendant les vacances : le simulateur complet laisse régler le nombre de semaines travaillées.</p>

<h2>TVA et cotisations : ce que l’État prélève sur les recettes</h2>
<h3>La TVA à ${h.pct(V.taux_transport, 0)}</h3>
<p>Le transport de voyageurs est taxé à ${h.pct(V.taux_transport, 0)} (${h.src('cgi279', 'article 279 b quater du CGI')}). Tant que les recettes restent sous ${h.eur(V.franchise_services)} par an, la franchise en base dispense de la facturer ; elle tombe au-delà de ${h.eur(V.franchise_services_majore)}, selon la ${h.src('spFranchiseTva', 'fiche F21746')}. Or le compteur affiche un prix toutes taxes comprises : quand la TVA s’applique, elle se prélève sur vos recettes, sans que le client paie davantage. Dans notre exemple, cela fait environ ${h.eur(proprio.tva / 12)} par mois. Le détail, avec la récupération de la TVA sur les achats, est sur la page ${h.a('tva-vtc-taxi', 'TVA du taxi et du VTC')}.</p>
<h3>Micro-entreprise ou réel</h3>
<p>En micro-entreprise, les cotisations sont un pourcentage des recettes hors taxes : ${h.pct(M.taux_bic_services, 1)}, plus ${h.pct(M.cfp_artisan, 1)} de contribution à la formation professionnelle des artisans (${h.src('urssafAe', 'Urssaf')}), jusqu’à ${h.eur(M.seuil_services)} de recettes. Aucune charge n’est déduite de cette base. Au réel, les cotisations portent sur le bénéfice, après un abattement de ${h.pct(P.tns.abattement_taux, 0)} prévu par la réforme de l’assiette sociale des indépendants, selon le ${h.src('urssafTns', 'barème des artisans')}.</p>
<p>Pour un propriétaire dont les frais restent modérés, les deux régimes donnent des résultats proches : environ ${h.eur(proprioMicro.netMensuel)} par mois en micro contre ${h.eur(proprio.netMensuel)} au réel dans notre exemple. Pour un locataire, l’écart est massif, ${net(locataireMicro.netMensuel, 'fr')} par mois en micro contre ${h.eur(locataire.netMensuel)} au réel, parce que le loyer ne réduit pas la base des cotisations en micro. Le simulateur ne couvre pas la SASU, dont les cotisations n’ont pas été sourcées.</p>

<h2>Le taxi salarié : un fixe et un pourcentage</h2>
<p>Le salarié d’une entreprise de taxis ne possède pas de licence. ${h.src('spTaxi', 'Service-public')} décrit sa rémunération en deux parts : un salaire fixe, et un pourcentage du chiffre d’affaires réalisé chaque mois au compteur. Le véhicule est entretenu et assuré par l’employeur. La fiche ne donne ni montant de fixe ni taux de pourcentage, et nous n’en inventons pas : ils se lisent dans le contrat de travail.</p>
<p>Un plancher existe pourtant, celui de tout salarié : le Smic, ${h.eur(S.smic_horaire, 2)} brut de l’heure en 2026 selon ${h.src('spSmic', 'service-public')}, soit environ ${h.eur(smicMensuel)} brut par mois pour un temps plein de ${h.num(S.duree_legale_mensuelle_h, 2)} heures. Le salariat retire le risque de la licence et du véhicule, et il compte pour l’accès à une licence gratuite : la priorité sur la liste d’attente va aux conducteurs qui ont exercé ${X.ads_priorite_activite_ans} ans.</p>

<h2>Refaire le calcul avec vos chiffres</h2>
<p>Le mini-simulateur en haut de page prend trois saisies, recettes, loyer de licence et heures, et garde les autres hypothèses en micro-entreprise. Le ${h.a('revenu-net-chauffeur', 'simulateur complet du revenu net')} laisse tout modifier : régime, semaines, carburant, assurance, véhicule. Pour comparer avec un autre métier de chauffeur, voyez ${h.a('salaire-chauffeur-vtc', 'combien gagne un VTC')}. Et si vous n’avez pas encore la carte, le parcours commence sur la page ${h.a('devenir-taxi', 'devenir chauffeur de taxi')}.</p>
`,
  },
  en: {
    slug: 'taxi-driver-earnings',
    nav: 'Taxi driver earnings',
    card: 'Owner, tenant or employee: what is left of the takings, worked out with the calculator.',
    title: 'Taxi Driver Salary France 2026: What a Taxi Driver Earns',
    description: `How much a taxi driver earns in France, 2026: meter takings minus licence, costs, ${Math.round(V.taux_transport * 100)}% VAT and contributions. Calculator examples, owner or tenant paying ${fe(X.ads_loyer_paris_mois_environ, 'en')}.`,
    h1: 'What a taxi driver in France really takes home',
    intro: 'A self-employed taxi driver has no salary: you keep what is left of the takings, and the licence decides much of it.',
    resume: `A self-employed taxi driver in France, whether owner or tenant, has no salary. Income is what remains of the meter takings after VAT, vehicle costs, any licence rent or loan repayment, and social contributions. We found no public statistics on taxi drivers’ income that we could cite, so the figures here are estimates from the site’s calculator, based on assumptions you can change. With ${fe(HYP_RECETTE, 'en')} of takings a week over ${d.semaines} weeks, under the standard (réel) tax regime, the calculator estimates about ${fe(proprio.netMensuel, 'en')} net a month before income tax for a driver who owns the licence, against about ${fe(locataire.netMensuel, 'en')} for a tenant paying ${fe(X.ads_loyer_paris_mois_environ, 'en')} a month in rent, the Paris figure published by service-public, the official administration website. An employed taxi driver earns a fixed wage plus a percentage of the meter takings, and cannot be paid below the national minimum wage (Smic).`,
    faqs: [
      { q: 'How much does a taxi driver make per month in France?', a: `There is no single figure, and we have not found reliable public statistics. The calculator gives an estimate: with ${fe(HYP_RECETTE, 'en')} of takings a week, ${d.semaines} weeks a year and example costs, about ${fe(proprio.netMensuel, 'en')} net a month before income tax if you own the licence, under the réel regime. Replace each assumption with your own figures in the calculator above.` },
      { q: 'What does an employed taxi driver earn?', a: `Service-public describes the pay as a fixed wage plus a percentage of the takings recorded on the meter each month, without giving any amount or rate. Like every employee in France, a salaried driver cannot be paid below the Smic, €${formatDecimal(S.smic_horaire, 2, 'en')} gross per hour in 2026, or about ${fe(smicMensuel, 'en')} gross a month full time. The employer maintains and insures the car.` },
      { q: 'Does renting a licence leave much less than owning one?', a: `On the same takings, yes, according to the calculator: with ${fe(HYP_RECETTE, 'en')} a week, about ${fe(locataire.netMensuel, 'en')} a month for a tenant paying ${fe(X.ads_loyer_paris_mois_environ, 'en')} rent, against ${fe(proprio.netMensuel, 'en')} for an owner who pays for the car. The rent outweighs the vehicle costs it saves. Closing the gap takes higher takings or a rent well below the Paris benchmark.` },
      { q: 'Should a taxi tenant use the micro-entreprise scheme?', a: `It is allowed below ${fe(M.seuil_services, 'en')} of takings excluding VAT, but the numbers soon turn against you: under the micro scheme, contributions are charged on takings with no deduction for rent. With ${fe(HYP_RECETTE, 'en')} a week and ${fe(X.ads_loyer_paris_mois_environ, 'en')} rent, the calculator estimates ${net(locataireMicro.netMensuel, 'en')} a month under micro against ${fe(locataire.netMensuel, 'en')} under the réel regime.` },
      { q: 'When does a taxi driver have to charge VAT?', a: `Once annual takings pass ${fe(V.franchise_services, 'en')}, or ${fe(V.franchise_services_majore, 'en')} in the year you cross the line, the VAT exemption ends (service-public, page F21746). Passenger transport is then taxed at ${Math.round(V.taux_transport * 100)}% (article 279 b quater of the General Tax Code). Since fares are capped VAT included, the tax comes out of your takings: about ${fe(proprio.tva / 12, 'en')} a month at ${fe(HYP_RECETTE, 'en')} a week.` },
    ],
    body: (h) => `
<h2>Why “salary” is the wrong word for an owner-driver</h2>
<p>Service-public puts it simply: an owner-driver (artisan) keeps all the profit, and a tenant keeps all the takings and pays rent. Neither gets a payslip. What they earn comes from six factors that multiply or subtract: the takings on the meter, how the licence was obtained, vehicle costs, VAT, social contributions, and the hours spent at the wheel.</p>
<p>So this page gives no “average taxi salary”. We found no sourced public statistics (from Insee, the national statistics office, Dares, the labour ministry’s research unit, or an official report) on taxi drivers’ income. The amounts below are estimates from the calculator, built on your assumptions and the official 2026 rates. They are not a promise.</p>

<h2>The licence changes everything: three cases, same takings</h2>
<p>To isolate the licence effect, we ran the site’s engine with identical takings, ${h.eur(HYP_RECETTE)} a week, over ${d.semaines} weeks of ${d.heuresSemaine} hours, under the réel regime (tax on actual profit). Example monthly costs for the owner: fuel ${h.eur(d.carburantMois)}, vehicle ${h.eur(d.vehiculeMois)}, insurance ${h.eur(d.assuranceMois)}, servicing ${h.eur(d.entretienMois)}, sundries ${h.eur(d.autresMois)}. For the tenant we remove the vehicle and servicing, which service-public says the rental firm covers, and add the published Paris rent of ${h.eur(X.ads_loyer_paris_mois_environ)}. For the buyer, we subtract from net income the repayment on a ${HYP_PRET_ANS}-year loan at the published Paris price, with a ${h.eur(HYP_APPORT)} deposit at ${h.pct(HYP_TAUX, 1)}.</p>
${h.table(['Case', 'Costs per year', 'Contributions per year', 'Net per month', 'Net per hour'], [
  ['Licence owned (free or paid off)', h.eur(proprio.charges.total), h.eur(proprio.cotisations), h.eur(proprio.netMensuel), h.eur(proprio.netHoraire, 2)],
  [`Licence rented at ${h.eur(X.ads_loyer_paris_mois_environ)} a month`, h.eur(locataire.charges.total), h.eur(locataire.cotisations), h.eur(locataire.netMensuel), h.eur(locataire.netHoraire, 2)],
  [`Licence bought on credit (net minus ${h.eur(pret.mensualite)} repayment)`, h.eur(proprio.charges.total), h.eur(proprio.cotisations), h.eur(acheteurReste), h.eur(acheteurReste * 12 / proprio.heuresAn, 2)],
], `Calculator estimate (revenuNet, achatOuLocation), takings of ${h.eur(HYP_RECETTE)} a week, réel regime, before income tax`)}
<p>A driver whose licence was free, or is paid off, keeps the most. The tenant pays monthly rent that far exceeds the vehicle costs it saves. The buyer sits in between while the loan runs, then catches up with the owner. Treat the buyer’s row as an approximation: loan interest, which normally reduces taxable profit and contributions, is not modelled.</p>
<p>At ${h.eur(HYP_RECETTE_HAUTE)} a week, the same tenant would take home about ${h.eur(locataireHaut.netMensuel)} a month according to the calculator. The full buy-versus-rent comparison is on the ${h.a('licence-taxi', 'taxi licence')} page.</p>

<h2>Takings: what the meter shows, not what you hope for</h2>
<p>Taxi fares are capped by regulation, and takings depend on things no official text quantifies: the city, your shifts, how much work comes from bookings, and how much from patient transport under the health-insurance agreement. That is why the calculator starts from your weekly takings rather than a number of rides we would have to guess. If you are starting out, ask drivers in your area what their meter shows over a normal week, or rent for a few months and keep your records before committing to a purchase.</p>
<p>Time matters as much as money. At ${d.heuresSemaine} hours a week, the owner in our example nets ${h.eur(proprio.netHoraire, 2)} an hour. More hours raise monthly income, but licence rent does not stop during holidays; the full calculator lets you set the number of weeks worked.</p>

<h2>VAT and contributions</h2>
<h3>${h.pct(V.taux_transport, 0)} VAT</h3>
<p>Passenger transport carries ${h.pct(V.taux_transport, 0)} VAT under ${h.src('cgi279', 'article 279 b quater of the General Tax Code')}. Below ${h.eur(V.franchise_services)} of takings a year, the small-business exemption (franchise en base) means you charge none; it ends above ${h.eur(V.franchise_services_majore)}, according to ${h.src('spFranchiseTva', 'page F21746')}. Because the meter shows a VAT-inclusive fare, once VAT applies it is taken out of your takings rather than added to the passenger’s bill. In our example that is about ${h.eur(proprio.tva / 12)} a month. Reclaiming VAT on purchases is covered in ${h.a('tva-vtc-taxi', 'VAT for taxi and VTC drivers')}.</p>
<h3>Micro-entreprise or réel</h3>
<p>Under the micro-entreprise scheme, contributions are a flat share of takings excluding VAT: ${h.pct(M.taux_bic_services, 1)}, plus ${h.pct(M.cfp_artisan, 1)} for craft-trade vocational training (${h.src('urssafAe', 'Urssaf')}, the body that collects contributions), up to ${h.eur(M.seuil_services)} of takings. No costs are deducted from that base. Under the réel regime, contributions are charged on profit after the ${h.pct(P.tns.abattement_taux, 0)} allowance introduced by the reform of the self-employed contribution base, using the ${h.src('urssafTns', 'craft-trade rates')}.</p>
<p>For an owner with moderate costs, the two regimes end up close: about ${h.eur(proprioMicro.netMensuel)} a month under micro against ${h.eur(proprio.netMensuel)} under réel in our example. For a tenant the gap is huge, ${net(locataireMicro.netMensuel, 'en')} a month under micro against ${h.eur(locataire.netMensuel)} under réel, because rent does not reduce the micro contribution base. The calculator does not model a SASU company, whose contributions we have not sourced.</p>

<h2>Employed drivers: fixed pay plus a share</h2>
<p>An employee of a taxi firm does not own a licence. ${h.src('spTaxi', 'Service-public')} describes the pay in two parts: a fixed wage and a percentage of the monthly takings on the meter. The employer maintains and insures the car. The page gives no amount for the fixed part and no percentage, and we will not make them up: they are in your employment contract.</p>
<p>There is a floor, as for every employee in France: the Smic, ${h.eur(S.smic_horaire, 2)} gross per hour in 2026 according to ${h.src('spSmic', 'service-public')}, about ${h.eur(smicMensuel)} gross a month for a full-time ${h.num(S.duree_legale_mensuelle_h, 2)} hours. Employment removes the licence and vehicle risk, and it counts towards a free licence: priority on the waiting list goes to drivers with ${X.ads_priorite_activite_ans} years of taxi work.</p>

<h2>Run your own numbers</h2>
<p>The calculator at the top of the page takes three inputs, takings, licence rent and hours, and keeps the other assumptions under the micro scheme. The ${h.a('revenu-net-chauffeur', 'full net income calculator')} lets you change everything: regime, weeks, fuel, insurance, vehicle. To compare with private-hire work, see ${h.a('salaire-chauffeur-vtc', 'what a VTC driver earns')}. If you do not have a card yet, start with ${h.a('devenir-taxi', 'how to become a taxi driver')}.</p>
`,
  },
});
