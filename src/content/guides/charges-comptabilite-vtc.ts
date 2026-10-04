import { defineGuide } from '../../lib/guide-types';
import { P } from '../../lib/engine/params';

// Valeurs lues dans params-2026.json : blocs `micro` (Urssaf, F36232), `societe` (service-public F23266
// vérifié le 7 septembre 2026, F36018 vérifié le 21 février 2026, F32919, F37396), `taxi` (F22127).
const M = P.micro;
const S = P.societe;
const TX = P.taxi;

export default defineGuide({
  id: 'charges-comptabilite-vtc',
  group: 'revenus',
  order: 60,
  mini: 'microOuReel',
  miniHref: 'tva-vtc-taxi',
  related: ['statut-vtc', 'tva-vtc-taxi', 'revenu-net-chauffeur', 'salaire-chauffeur-vtc', 'salaire-taxi'],
  sources: ['spComptaMicro', 'spRegistresMicro', 'spBicReel', 'spEi', 'urssafAe', 'spTarifsTaxi'],
  fr: {
    slug: 'charges-comptabilite-vtc',
    nav: 'Charges et comptabilité',
    card: 'Livre des recettes, réel simplifié, frais déductibles et note client : la comptabilité d’un chauffeur.',
    title: 'Charges VTC et comptabilité 2026 : micro, réel, obligations',
    description: `Charges et comptabilité VTC ou taxi en 2026 : livre des recettes en micro, réel simplifié jusqu’à ${S.reel_simplifie_services_max.toLocaleString('fr-FR')} €, frais déductibles, compte dédié après ${S.compte_dedie_ca.toLocaleString('fr-FR')} €.`,
    h1: 'Charges et comptabilité d’un chauffeur VTC ou taxi',
    intro: 'Ce que vous devez noter, garder et déclarer dépend d’abord du régime : forfait micro ou frais réels.',
    resume: `Les obligations comptables d’un chauffeur VTC ou taxi dépendent de son régime. En micro-entreprise, le prestataire de services tient un livre des recettes qui indique, au jour le jour, le montant, l’origine et le mode de paiement de chaque recette, avec les références des pièces ; le registre des achats ne lui est pas demandé (service-public, fiche F36018). Il déclare son chiffre d’affaires chaque mois ou chaque trimestre, conserve ses justificatifs ${S.conservation_ans} ans et ouvre un compte bancaire dédié si son chiffre d’affaires dépasse ${S.compte_dedie_ca.toLocaleString('fr-FR')} € deux années de suite (F23266). Ses charges ne se déduisent pas : l’impôt applique un abattement forfaitaire de ${Math.round(M.abattement_bic_services * 100)} % au chiffre d’affaires. Au régime réel simplifié, ouvert jusqu’à ${S.reel_simplifie_services_max.toLocaleString('fr-FR')} € de chiffre d’affaires de services, le chauffeur tient une comptabilité complète, dépose la liasse n° 2031 et ses annexes, et déduit ses frais réels : véhicule, carburant, assurance, entretien, commissions de plateforme.`,
    faqs: [
      { q: 'Quels documents un VTC en micro-entreprise doit-il tenir ?', a: `Un livre des recettes, tenu dans l’ordre chronologique, qui distingue les règlements en espèces des autres et indique l’identité du client, le montant, la date, le mode de paiement et les pièces justificatives. Service-public précise que le registre des achats ne concerne que la vente de marchandises et la fourniture de logement : un chauffeur n’en a pas besoin. Les justificatifs se gardent ${S.conservation_ans} ans.` },
      { q: 'Un chauffeur VTC doit-il ouvrir un compte bancaire professionnel ?', a: `Pas dès le premier jour en micro-entreprise. Service-public indique qu’un compte bancaire dédié à l’activité devient obligatoire quand le chiffre d’affaires annuel dépasse ${S.compte_dedie_ca.toLocaleString('fr-FR')} € pendant ${S.compte_dedie_annees} années consécutives. Il peut s’agir d’un simple second compte de particulier, utilisé uniquement pour l’activité. Une société, elle, a forcément son propre compte.` },
      { q: 'Quels frais un chauffeur VTC au réel peut-il déduire ?', a: 'Au régime réel, le résultat imposable est le chiffre d’affaires diminué des charges engagées pour l’activité. Service-public cite les frais généraux de toute nature et les rémunérations correspondant à un travail effectif. Pour un chauffeur, cela recouvre la location ou le financement du véhicule, le carburant, l’assurance, l’entretien, les commissions de plateforme, le téléphone et les frais de comptable, sur justificatif.' },
      { q: 'Que risque un micro-entrepreneur qui oublie de déclarer son chiffre d’affaires ?', a: `Une pénalité de ${S.penalite_declaration_micro.toFixed(2).replace('.', ',')} € par déclaration manquante, selon service-public. La déclaration est mensuelle ou trimestrielle, au choix, et elle est due même quand le chiffre d’affaires est nul. Les cotisations sont calculées sur ce chiffre déclaré : ${(M.taux_bic_services * 100).toFixed(1).replace('.', ',')} % pour une activité de services artisanale en 2026, plus la contribution à la formation professionnelle.` },
      { q: 'Un chauffeur de taxi doit-il remettre une note au client ?', a: `Oui, dès ${TX.note_obligatoire_des} € TTC, et à la demande du client en dessous, selon service-public. Le chauffeur garde un double de la note pendant ${TX.note_conservation_ans} ans. Ces notes alimentent directement le livre des recettes ou la comptabilité : une course réglée en espèces sans note est la première source d’écart lors d’un contrôle.` },
    ],
    body: (h) => `
<h2>Deux logiques : le forfait ou les frais réels</h2>
<p>Un chauffeur à son compte ne tient pas la même comptabilité selon qu’il est en micro-entreprise ou au régime réel. En micro, l’administration ne regarde pas les dépenses : elle applique un abattement forfaitaire de ${h.pct(M.abattement_bic_services, 0)} au chiffre d’affaires pour l’impôt, et l’Urssaf prélève un pourcentage des recettes. Au réel, chaque dépense justifiée réduit le bénéfice, et donc l’impôt et les cotisations : c’est plus de travail, mais c’est le seul moyen de faire compter des frais lourds.</p>
<p>Le mini-simulateur en haut de page compare les deux bases imposables à partir de votre chiffre d’affaires et de vos frais réels. Pour les cotisations sociales et la TVA, qui suivent d’autres règles, le comparateur de la page ${h.a('tva-vtc-taxi', 'TVA VTC et taxi')} va plus loin.</p>

<h2>En micro-entreprise : le livre des recettes</h2>
<p>Pour un prestataire de services, une seule pièce est obligatoire : le livre des recettes. Selon la ${h.src('spRegistresMicro', 'fiche F36018 de service-public')}, il présente le détail des recettes dans l’ordre chronologique, distingue les règlements en espèces des autres, et indique pour chaque recette l’identité du client, le montant, la date, la forme du paiement et les références des pièces justificatives. Le registre des achats, lui, n’est demandé qu’aux activités de vente de marchandises et de fourniture de logement.</p>
${h.table(['Obligation', 'Règle', 'Source'], [
  ['Livre des recettes', 'chronologique, client, montant, date, mode de paiement, pièce', 'F36018'],
  ['Registre des achats', 'non exigé pour une activité de services', 'F36018'],
  ['Déclaration du chiffre d’affaires', 'chaque mois ou chaque trimestre, même à zéro', 'F23266'],
  ['Pénalité par déclaration manquante', h.eur(S.penalite_declaration_micro, 2), 'F23266'],
  ['Compte bancaire dédié', `au-delà de ${h.eur(S.compte_dedie_ca)} de chiffre d’affaires ${S.compte_dedie_annees} années de suite`, 'F23266'],
  ['Conservation des pièces', `${S.conservation_ans} ans après la clôture de l’exercice`, 'F23266'],
], 'Sources : service-public, fiches F36018 (vérifiée le 21 février 2026) et F23266 (vérifiée le 7 septembre 2026)')}
<p>La ${h.src('spComptaMicro', 'fiche F23266')} signale aussi la réforme de la facture électronique : le micro-entrepreneur doit pouvoir recevoir des factures électroniques depuis le ${h.date(S.efacture_reception)}, et devra en émettre à partir du ${h.date(S.efacture_emission)}. Pour un VTC qui facture des entreprises, hôtels ou agences, c’est un changement d’outil à prévoir dès maintenant.</p>

<h2>Au réel : une comptabilité complète</h2>
<p>Le régime réel s’impose au-delà du seuil de la micro-entreprise, ${h.eur(M.seuil_services)} de chiffre d’affaires de services en 2026, et peut être choisi en dessous. Pour les prestations de services, le régime réel simplifié s’applique jusqu’à ${h.eur(S.reel_simplifie_services_max)} de chiffre d’affaires ; au-delà, c’est le réel normal (${h.src('spEi', 'fiche F37396')}). Selon la ${h.src('spBicReel', 'fiche F32919')}, l’entreprise au réel simplifié dépose chaque année la déclaration n° 2031 et ses annexes n° 2033-A à 2033-G ; au réel normal, la n° 2031 avec les tableaux n° 2050 à 2053, 2059-F et 2059-G. On ne peut pas revenir à un régime moins exigeant par simple option.</p>
<p>Concrètement, un chauffeur au réel enregistre chaque recette et chaque dépense, garde toutes les factures, suit les amortissements de son véhicule s’il l’achète, et arrête des comptes annuels. La plupart confient la tenue ou au moins la révision à un expert-comptable ; ses honoraires sont eux-mêmes une charge de l’activité.</p>

<h2>Les charges d’un chauffeur au réel</h2>
<p>Le résultat imposable est le chiffre d’affaires diminué des charges. La fiche F32919 vise les frais généraux de toute nature et les rémunérations qui correspondent à un travail effectif. Pour un VTC ou un taxi, les postes habituels sont les suivants, chacun sur justificatif :</p>
<ul>
<li><strong>le véhicule</strong> : loyers de location ou de location longue durée, intérêts d’emprunt, ou amortissement si le véhicule est acheté ;</li>
<li><strong>le carburant ou la recharge</strong>, les péages et le stationnement payés pendant les courses ;</li>
<li><strong>l’assurance</strong> de transport de personnes et la responsabilité civile professionnelle ;</li>
<li><strong>l’entretien</strong>, les pneus, le nettoyage du véhicule ;</li>
<li><strong>les commissions de plateforme</strong> ou de centrale de réservation, quand votre chiffre d’affaires est le prix payé par le client ;</li>
<li><strong>les frais propres au métier</strong> : renouvellement de la carte, stage de formation continue, inscription au registre, signalétique, location de licence pour un taxi locataire ;</li>
<li><strong>les frais de gestion</strong> : téléphone et forfait, logiciel de facturation, comptable, banque.</li>
</ul>
<p>Le point délicat est l’usage mixte. Un véhicule ou un téléphone qui sert aussi en dehors de l’activité ne se déduit que pour sa part professionnelle : un relevé de kilométrage ou un agenda des courses permet de la justifier.</p>

<h2>La commission de plateforme : charge ou chiffre d’affaires en moins</h2>
<p>Un VTC de plateforme peut voir son activité de deux façons : soit son chiffre d’affaires est le prix payé par le client et la commission est une charge, soit il ne déclare que ce que la plateforme lui reverse. Le choix change le niveau du chiffre d’affaires, donc le seuil de la micro-entreprise, celui de la franchise de TVA et le montant des cotisations micro. Il dépend du contrat de la plateforme et de la façon dont elle facture. Le ${h.a('revenu-net-chauffeur', 'simulateur de revenu net')} propose les deux bases ; en cas de doute, posez la question par écrit à votre comptable ou au service des impôts des entreprises.</p>

<h2>Le cas du taxi : la note client</h2>
<p>Le taxi a une obligation de plus. Selon la ${h.src('spTarifsTaxi', 'fiche F22127 de service-public')}, le chauffeur remet une note au client pour toute course d’au moins ${h.eur(TX.note_obligatoire_des)} TTC, et à sa demande en dessous, et il en garde un double pendant ${TX.note_conservation_ans} ans. Ces doubles sont la colonne vertébrale du livre des recettes : chaque course y trouve sa pièce justificative, y compris celles réglées en espèces.</p>

<h2>Une routine qui tient en une heure par semaine</h2>
<ol>
<li>Chaque jour : noter les courses hors plateforme et garder les notes ou factures.</li>
<li>Chaque semaine : rapprocher les relevés de plateforme et le compte bancaire du livre des recettes.</li>
<li>Chaque mois : classer les factures de carburant, d’entretien, d’assurance et de véhicule.</li>
<li>Chaque mois ou trimestre : déclarer le chiffre d’affaires en micro, ou transmettre les pièces au comptable au réel.</li>
<li>Chaque année : vérifier le chiffre d’affaires face aux seuils, et refaire le calcul micro contre réel.</li>
</ol>
<p>Le choix du cadre juridique lui-même, micro, entreprise individuelle, EURL ou SASU, est traité dans la page ${h.a('statut-vtc', 'statut VTC')}. Pour mesurer ce que les charges laissent au bout du mois, voir aussi les pages ${h.a('salaire-chauffeur-vtc', 'salaire d’un chauffeur VTC')} et ${h.a('salaire-taxi', 'salaire d’un taxi')}.</p>
`,
  },
  en: {
    slug: 'vtc-taxi-costs-bookkeeping',
    nav: 'Costs and bookkeeping',
    card: 'Takings ledger, simplified real regime, deductible costs and fare receipts: a driver’s bookkeeping.',
    title: 'VTC and Taxi Bookkeeping France 2026: Costs and Duties',
    description: `VTC and taxi bookkeeping in France, 2026: takings ledger as a micro-entrepreneur, real regime up to €${S.reel_simplifie_services_max.toLocaleString('en-GB')}, deductible costs, business account above €${S.compte_dedie_ca.toLocaleString('en-GB')}.`,
    h1: 'Costs and bookkeeping for VTC and taxi drivers in France',
    intro: 'What you must record, keep and declare depends first on your tax regime: the micro flat rate or actual costs.',
    resume: `A French VTC or taxi driver’s bookkeeping duties depend on the tax regime. As a micro-entrepreneur providing a service, you keep a takings ledger (livre des recettes) showing, day by day, the amount, source and payment method of each receipt with references to the supporting documents; no purchases register is required (service-public, page F36018). You declare turnover monthly or quarterly, keep records for ${S.conservation_ans} years and open a dedicated bank account once turnover tops €${S.compte_dedie_ca.toLocaleString('en-GB')} two years running (page F23266). Costs are not deducted: income tax applies a flat ${Math.round(M.abattement_bic_services * 100)}% allowance to turnover. Under the simplified real regime, open up to €${S.reel_simplifie_services_max.toLocaleString('en-GB')} of service turnover, you keep full accounts, file tax return 2031 with its schedules and deduct actual costs: vehicle, fuel, insurance, servicing and platform commission. Taxi drivers also issue receipts to passengers.`,
    faqs: [
      { q: 'What records must a micro-entrepreneur VTC driver keep?', a: `A takings ledger in date order that separates cash from other payments and shows the client, amount, date, payment method and supporting document for each receipt. Service-public explains that the purchases register applies only to selling goods or providing accommodation, so a driver does not need one. Supporting documents are kept for ${S.conservation_ans} years.` },
      { q: 'Do I need a separate business bank account as a VTC driver?', a: `Not from day one as a micro-entrepreneur. Service-public says a dedicated account becomes compulsory once annual turnover exceeds €${S.compte_dedie_ca.toLocaleString('en-GB')} for ${S.compte_dedie_annees} consecutive years. It can be an ordinary second personal account used only for the business. A company must have its own account in any case.` },
      { q: 'Which costs can a VTC driver deduct on the real regime?', a: 'On the real regime, taxable profit is turnover minus the costs incurred for the business. Service-public mentions general expenses of all kinds and pay for work actually done. For a driver that covers renting or financing the car, fuel, insurance, servicing, platform commission, phone and accountant’s fees, each backed by an invoice.' },
      { q: 'What happens if a micro-entrepreneur misses a turnover declaration?', a: `A penalty of €${S.penalite_declaration_micro.toFixed(2)} per missing declaration, according to service-public. You choose monthly or quarterly filing, and a declaration is due even when turnover is zero. Contributions are worked out on the declared figure: ${(M.taux_bic_services * 100).toFixed(1)}% for a craft service activity in 2026, plus the vocational training levy.` },
      { q: 'Must a taxi driver give passengers a receipt?', a: `Yes, for any fare of €${TX.note_obligatoire_des} or more including VAT, and on request below that, according to service-public. The driver keeps a copy for ${TX.note_conservation_ans} years. Those copies feed straight into the takings ledger or the accounts; cash fares with no receipt are the first source of gaps in a tax inspection.` },
    ],
    body: (h) => `
<h2>Two approaches: flat rate or actual costs</h2>
<p>A self-employed driver does not keep the same books as a micro-entrepreneur as on the real regime. Under the micro scheme the tax office ignores spending: it applies a ${h.pct(M.abattement_bic_services, 0)} flat allowance to turnover for income tax, and Urssaf, the social contributions collector, takes a percentage of takings. On the real regime every documented cost reduces profit, and so tax and contributions. It is more work, but it is the only way heavy costs count.</p>
<p>The calculator at the top of the page compares the two taxable bases from your turnover and actual costs. For social contributions and VAT, which follow other rules, the comparison on the ${h.a('tva-vtc-taxi', 'VAT for VTC and taxi drivers')} page goes further.</p>

<h2>As a micro-entrepreneur: the takings ledger</h2>
<p>For a service provider, one record is compulsory: the takings ledger. According to ${h.src('spRegistresMicro', 'service-public page F36018')}, it lists receipts in date order, separates cash from other payments, and shows for each one the client, amount, date, method of payment and references of the supporting documents. The purchases register is required only for selling goods or providing accommodation.</p>
${h.table(['Duty', 'Rule', 'Source'], [
  ['Takings ledger', 'date order, client, amount, date, payment method, document', 'F36018'],
  ['Purchases register', 'not required for a service business', 'F36018'],
  ['Turnover declaration', 'monthly or quarterly, even when zero', 'F23266'],
  ['Penalty per missed declaration', h.eur(S.penalite_declaration_micro, 2), 'F23266'],
  ['Dedicated bank account', `once turnover exceeds ${h.eur(S.compte_dedie_ca)} for ${S.compte_dedie_annees} years running`, 'F23266'],
  ['Keeping records', `${S.conservation_ans} years after the year end`, 'F23266'],
], 'Sources: service-public, pages F36018 (checked 21 February 2026) and F23266 (checked 7 September 2026)')}
<p>${h.src('spComptaMicro', 'Page F23266')} also flags the e-invoicing reform: micro-entrepreneurs must be able to receive electronic invoices since ${h.date(S.efacture_reception)} and will have to issue them from ${h.date(S.efacture_emission)}. For a driver who bills companies, hotels or agencies, that means choosing an invoicing tool now.</p>

<h2>On the real regime: full accounts</h2>
<p>The real regime applies above the micro threshold, ${h.eur(M.seuil_services)} of service turnover in 2026, and can be chosen below it. For services, the simplified real regime runs up to ${h.eur(S.reel_simplifie_services_max)} of turnover, with the standard real regime above (${h.src('spEi', 'page F37396')}). According to ${h.src('spBicReel', 'page F32919')}, a business on the simplified regime files return no. 2031 and schedules 2033-A to 2033-G each year; on the standard regime, form 2031 with tables 2050 to 2053, 2059-F and 2059-G. You cannot move back to a lighter regime simply by opting.</p>
<p>In practice, a driver on the real regime records every receipt and expense, keeps every invoice, tracks depreciation on a car they own, and closes annual accounts. Most hand the bookkeeping, or at least the review, to a chartered accountant (expert-comptable), whose fees are themselves a business cost. Accounts and returns are in French, so a bilingual accountant can be worth the search.</p>

<h2>A driver’s costs on the real regime</h2>
<p>Taxable profit is turnover minus costs. Page F32919 refers to general expenses of all kinds and pay matching work actually done. For a VTC or taxi driver the usual items, each backed by an invoice, are:</p>
<ul>
<li><strong>the vehicle</strong>: rental or long-term lease payments, loan interest, or depreciation if you buy it;</li>
<li><strong>fuel or charging</strong>, plus tolls and parking paid during jobs;</li>
<li><strong>insurance</strong> for carrying passengers and professional liability;</li>
<li><strong>servicing</strong>, tyres and cleaning;</li>
<li><strong>platform or booking-service commission</strong>, where your turnover is the price the passenger paid;</li>
<li><strong>trade-specific costs</strong>: card renewal, the continuing training course, register fees, vehicle markings, and licence rental for a taxi tenant;</li>
<li><strong>running costs</strong>: phone plan, invoicing software, accountant, bank charges.</li>
</ul>
<p>The tricky part is mixed use. A car or phone also used privately is deductible only for its business share; a mileage log or a record of jobs backs that share up.</p>

<h2>Platform commission: a cost or lower turnover</h2>
<p>A platform VTC driver can look at the business in two ways: turnover is the fare the passenger paid and commission is a cost, or turnover is only what the platform pays out. The choice changes turnover, and therefore the micro threshold, the VAT exemption threshold and micro contributions. It depends on the platform’s contract and how it invoices. The ${h.a('revenu-net-chauffeur', 'net income calculator')} offers both bases; if in doubt, ask your accountant or the business tax office in writing.</p>

<h2>Taxis: passenger receipts</h2>
<p>Taxi drivers have one more duty. According to ${h.src('spTarifsTaxi', 'service-public page F22127')}, the driver issues a receipt for any fare of at least ${h.eur(TX.note_obligatoire_des)} including VAT, and on request below that, and keeps a copy for ${TX.note_conservation_ans} years. Those copies are the backbone of the takings ledger: each fare has its supporting document, cash fares included.</p>

<h2>A routine that takes an hour a week</h2>
<ol>
<li>Daily: note off-platform jobs and keep receipts or invoices.</li>
<li>Weekly: match platform statements and the bank account against the ledger.</li>
<li>Monthly: file fuel, servicing, insurance and vehicle invoices.</li>
<li>Monthly or quarterly: declare turnover as a micro-entrepreneur, or send documents to the accountant on the real regime.</li>
<li>Yearly: check turnover against the thresholds and rerun the micro versus real comparison.</li>
</ol>
<p>Choosing the legal structure itself, micro, sole trader, EURL or SASU, is covered on the ${h.a('statut-vtc', 'VTC business structure')} page. To see what costs leave at the end of the month, see also ${h.a('salaire-chauffeur-vtc', 'VTC driver earnings')} and ${h.a('salaire-taxi', 'taxi driver pay')}.</p>
`,
  },
});
