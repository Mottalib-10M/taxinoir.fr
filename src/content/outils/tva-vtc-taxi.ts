import { defineGuide } from '../../lib/guide-types';
import { P } from '../../lib/engine/params';

const V = P.tva, M = P.micro, T = P.tns;
const tx = Math.round(V.taux_transport * 100);

export default defineGuide({
  id: 'tva-vtc-taxi',
  group: 'outils',
  order: 30,
  tool: 'tva',
  related: ['revenu-net-chauffeur', 'salaire-chauffeur-vtc', 'salaire-taxi', 'devenir-chauffeur-vtc', 'devenir-taxi'],
  sources: ['cgi279', 'spFranchiseTva', 'urssafAe', 'spFranchiseMicro', 'urssafTns', 'urssafReforme'],
  fr: {
    slug: 'tva-vtc-taxi',
    nav: 'TVA et statut',
    card: `Seuil de franchise, TVA à ${tx} % et comparaison micro ou réel.`,
    title: 'TVA VTC et taxi 2026 : taux de 10 %, seuils et micro ou réel',
    description: `TVA VTC et taxi en 2026 : ${tx} % sur le transport de voyageurs, franchise jusqu’à ${V.franchise_services.toLocaleString('fr-FR')} € de chiffre d’affaires, comparateur micro ou réel sur vos chiffres.`,
    h1: 'TVA d’un VTC ou d’un taxi, et le statut qui vous laisse le plus',
    intro: 'Le seuil de franchise et le choix du statut pèsent plus sur votre net que la plupart des économies de carburant.',
    resume: `Le transport de voyageurs, en taxi comme en VTC, relève du taux réduit de TVA de ${tx} %, fixé par l’article 279 b quater du code général des impôts. Tant que votre chiffre d’affaires de l’année précédente ne dépasse pas ${V.franchise_services.toLocaleString('fr-FR')} €, et celui de l’année en cours ${V.franchise_services_majore.toLocaleString('fr-FR')} €, vous bénéficiez de la franchise en base : vous ne facturez pas de TVA et n’en récupérez pas. Au-delà, vos prix contiennent la taxe, et un client qui paie ${100 + tx} € ne vous laisse que 100 € de chiffre d’affaires. Le choix du statut joue ensuite : en micro-entreprise, les cotisations valent ${(M.taux_bic_services * 100).toLocaleString('fr-FR')} % du chiffre d’affaires, quels que soient vos frais ; au réel, elles portent sur le bénéfice abattu de ${Math.round(T.abattement_taux * 100)} %, avec des cotisations minimales. Le comparateur ci-dessus calcule les deux sur vos chiffres.`,
    faqs: [
      { q: 'Un chauffeur VTC en micro-entreprise paie-t-il la TVA ?', a: `Pas tant qu’il reste sous le seuil de franchise : ${V.franchise_services.toLocaleString('fr-FR')} € de chiffre d’affaires l’année précédente pour une activité de services, avec une tolérance jusqu’à ${V.franchise_services_majore.toLocaleString('fr-FR')} € l’année en cours. Le statut micro et la TVA sont deux choses distinctes : un micro-entrepreneur qui dépasse le seuil de TVA reste micro-entrepreneur, jusqu’à ${M.seuil_services.toLocaleString('fr-FR')} € de chiffre d’affaires, mais doit facturer et reverser la TVA.` },
      { q: 'Quel taux de TVA appliquer sur une course de taxi ou de VTC ?', a: `${tx} %, le taux réduit prévu pour les transports de voyageurs par l’article 279 b quater du code général des impôts, en vigueur dans sa version applicable depuis le 1er mars 2026. Ce taux vise la course elle-même. Les frais que vous payez, comme la commission d’une plateforme, l’entretien ou le carburant, portent leur propre taux de TVA, souvent le taux normal de ${Math.round(V.taux_normal * 100)} %.` },
      { q: 'À partir de quel chiffre d’affaires le réel devient-il plus intéressant que la micro ?', a: 'Il n’y a pas de seuil unique : tout dépend de la part de vos frais. Un chauffeur dont le véhicule, le carburant et l’assurance absorbent une grande partie des recettes a souvent intérêt au réel, parce que les cotisations portent alors sur un bénéfice faible ; un chauffeur aux frais légers garde l’avantage de la micro. Le comparateur fait le calcul avec vos montants.' },
    ],
    body: (h) => `
<h2>Le seuil de franchise, mois par mois</h2>
<p>La franchise en base de TVA s’apprécie sur deux seuils pour les prestations de services (${h.src('spFranchiseTva', 'service-public, fiche F21746')}). Si le chiffre d’affaires de l’année précédente reste sous ${h.eur(V.franchise_services)}, vous démarrez l’année en franchise. Si celui de l’année en cours dépasse ${h.eur(V.franchise_services_majore)}, la TVA est due dès le jour du dépassement. Entre les deux, vous terminez l’année sans TVA mais vous y entrez au 1er janvier suivant. L’abaissement du seuil à 25 000 € envisagé en 2025 a été abandonné : les seuils de 2026 sont inchangés.</p>
${h.table(['Chiffre d’affaires de l’année', 'Régime cette année', 'L’année suivante'], [
  [`jusqu’à ${h.eur(V.franchise_services)}`, 'franchise', 'franchise'],
  [`de ${h.eur(V.franchise_services)} à ${h.eur(V.franchise_services_majore)}`, 'franchise', 'TVA'],
  [`au-delà de ${h.eur(V.franchise_services_majore)}`, 'TVA dès le dépassement', 'TVA'],
], 'Seuils 2026 des prestations de services')}

<h2>Ce que la TVA change à votre revenu</h2>
<p>Sur un marché où le client compare les prix, vous ne pouvez pas toujours augmenter vos tarifs de ${h.pct(V.taux_transport, 0)} le jour où vous passez le seuil. Si le prix reste le même, c’est votre chiffre d’affaires qui baisse d’environ ${h.pct(V.taux_transport / (1 + V.taux_transport))}. En contrepartie, un redevable récupère la TVA payée sur ses achats professionnels quand la loi l’autorise ; le comparateur part de frais saisis hors taxe dans ce cas, et toutes taxes comprises en franchise.</p>

<h2>Micro ou réel : deux bases différentes</h2>
<p>En micro-entreprise, les cotisations sont un pourcentage du chiffre d’affaires : ${h.pct(M.taux_bic_services)} pour les prestations de services artisanales, plus ${h.pct(M.cfp_artisan)} de formation professionnelle (${h.src('urssafAe', 'Urssaf')}). Au réel, l’Urssaf applique le barème des artisans au bénéfice, diminué d’un abattement de ${h.pct(T.abattement_taux, 0)} depuis la réforme de l’assiette (${h.src('urssafReforme', 'Urssaf, réforme de l’assiette sociale')}). Le réel demande une comptabilité complète, souvent confiée à un expert-comptable : mettez ses honoraires dans les frais du comparateur avant de conclure.</p>

<h2>Limites</h2>
<p>Le comparateur ne calcule pas l’impôt sur le revenu, ne traite pas la SASU et ne tient pas compte de l’exonération Acre au réel. Le ${h.a('revenu-net-chauffeur', 'simulateur de revenu net')} reprend les mêmes règles avec le détail des frais du véhicule.</p>
`,
  },
  en: {
    slug: 'vat-taxi-vtc-france',
    nav: 'VAT and status',
    card: `Exemption threshold, ${tx}% VAT and micro versus real profit.`,
    title: 'VAT for VTC and Taxi Drivers France 2026: 10% and Thresholds',
    description: `VAT for VTC and taxi drivers in France, 2026: ${tx}% on passenger transport, exemption up to €${V.franchise_services.toLocaleString('en-GB')} of turnover, micro versus real profit on your figures.`,
    h1: 'VAT for a VTC or taxi driver, and the status that leaves you more',
    intro: 'The exemption threshold and your choice of status weigh more on your net pay than most fuel savings.',
    resume: `In France, passenger transport by taxi or VTC (licensed private hire) carries the reduced VAT rate of ${tx}%, set by article 279 b quater of the General Tax Code. As long as last year’s turnover stays under €${V.franchise_services.toLocaleString('en-GB')}, and this year’s under €${V.franchise_services_majore.toLocaleString('en-GB')}, you benefit from the small-business exemption (franchise en base): you charge no VAT and reclaim none. Above that, your fares include the tax, so a passenger paying €${100 + tx} leaves you €100 of turnover. Your status then comes into play: as a micro-entrepreneur (the simplified self-employed scheme), contributions are ${(M.taux_bic_services * 100).toLocaleString('en-GB')}% of turnover whatever your costs; under real profit, they are charged on profit less a ${Math.round(T.abattement_taux * 100)}% allowance, with minimum contributions. The comparison above runs both on your own figures.`,
    faqs: [
      { q: 'Does a micro-entrepreneur VTC driver have to charge VAT?', a: `Not while below the exemption threshold: €${V.franchise_services.toLocaleString('en-GB')} of turnover in the previous year for a service activity, with leeway up to €${V.franchise_services_majore.toLocaleString('en-GB')} in the current year. The micro scheme and VAT are separate questions: a micro-entrepreneur who crosses the VAT threshold stays on the micro scheme, up to €${M.seuil_services.toLocaleString('en-GB')} of turnover, but must charge and pay over VAT.` },
      { q: 'What VAT rate applies to a taxi or VTC fare?', a: `${tx}%, the reduced rate for passenger transport under article 279 b quater of the General Tax Code, in the version applicable since 1 March 2026. That rate covers the ride itself. What you buy, such as a platform’s commission, servicing or fuel, carries its own VAT rate, often the standard ${Math.round(V.taux_normal * 100)}%.` },
      { q: 'At what turnover does real profit beat the micro scheme?', a: 'There is no single figure: it depends on how much of your takings go on costs. A driver whose car, fuel and insurance eat a large share of takings is often better off under real profit, because contributions then fall on a small profit; a driver with light costs keeps the micro advantage. The comparison runs the numbers with your own amounts.' },
    ],
    body: (h) => `
<h2>The exemption threshold, year by year</h2>
<p>For service businesses, the VAT exemption works on two thresholds (${h.src('spFranchiseTva', 'service-public, page F21746')}). If last year’s turnover stayed under ${h.eur(V.franchise_services)}, you start the year exempt. If this year’s turnover goes past ${h.eur(V.franchise_services_majore)}, VAT is due from the day you cross it. In between, you finish the year without VAT and become liable on 1 January. The plan floated in 2025 to cut the threshold to €25,000 was dropped, so the 2026 thresholds are unchanged.</p>
${h.table(['Turnover in the year', 'This year', 'Next year'], [
  [`up to ${h.eur(V.franchise_services)}`, 'exempt', 'exempt'],
  [`${h.eur(V.franchise_services)} to ${h.eur(V.franchise_services_majore)}`, 'exempt', 'VAT'],
  [`above ${h.eur(V.franchise_services_majore)}`, 'VAT from the day crossed', 'VAT'],
], '2026 thresholds for service activities')}

<h2>What VAT does to your income</h2>
<p>When passengers compare prices, you cannot always put fares up by ${h.pct(V.taux_transport, 0)} the day you cross the threshold. If the price stays put, your turnover drops by about ${h.pct(V.taux_transport / (1 + V.taux_transport))}. In return, a VAT-registered driver reclaims VAT on business purchases where the law allows it; the comparison therefore expects costs excluding VAT in that case, and including VAT while exempt.</p>

<h2>Micro or real profit: two different bases</h2>
<p>Under the micro scheme, contributions are a percentage of turnover: ${h.pct(M.taux_bic_services)} for craft-type services, plus ${h.pct(M.cfp_artisan)} training levy (${h.src('urssafAe', 'Urssaf')}). Under real profit, Urssaf applies the craftspeople’s scale to profit reduced by a ${h.pct(T.abattement_taux, 0)} allowance since the reform of the contribution base (${h.src('urssafReforme', 'Urssaf, contribution base reform')}). Real profit means full bookkeeping, usually done by a chartered accountant (expert-comptable): put that fee in the costs before drawing conclusions.</p>

<h2>Limits</h2>
<p>The comparison does not compute income tax, does not cover a SASU company and ignores Acre relief under real profit. The ${h.a('revenu-net-chauffeur', 'net income calculator')} applies the same rules with a full breakdown of vehicle costs.</p>
`,
  },
});
