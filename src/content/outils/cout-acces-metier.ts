import { defineGuide } from '../../lib/guide-types';
import { P } from '../../lib/engine/params';

const A = P.acces;
const fixeVtc = A.examen_complet + A.carte_pro_environ + A.registre_inscription + A.vignette_environ;

export default defineGuide({
  id: 'cout-acces-metier',
  group: 'outils',
  order: 20,
  tool: 'acces',
  related: ['devenir-chauffeur-vtc', 'devenir-taxi', 'formation-ambulancier', 'formation-vtc', 'licence-taxi', 'revenu-net-chauffeur'],
  sources: ['spVtc', 'spTaxi', 'cmaT3p', 'registreAide', 'arreteDea'],
  fr: {
    slug: 'cout-devenir-chauffeur',
    nav: 'Coût pour devenir chauffeur',
    card: 'Frais réglementés et dépenses de démarrage, VTC, taxi ou ambulancier.',
    title: 'Coût pour devenir chauffeur VTC ou taxi en 2026 : le calcul',
    description: `Coût 2026 pour devenir chauffeur VTC, taxi ou ambulancier : examen ${A.examen_complet} €, carte, registre ${A.registre_inscription} €, vignette, plus votre formation et vos frais de démarrage.`,
    h1: 'Ce que coûte l’entrée dans le métier, avant la première course',
    intro: 'Les frais fixés par l’administration d’un côté, vos devis de l’autre : le total, sans centre de formation à vendre.',
    resume: `Devenir chauffeur VTC coûte au minimum ${fixeVtc.toLocaleString('fr-FR')} € de frais réglementés en 2026 : ${A.examen_complet} € pour l’examen complet organisé par les chambres de métiers, environ ${A.carte_pro_environ} € pour la carte professionnelle, ${A.registre_inscription} € pour l’inscription au registre des VTC et environ ${A.vignette_environ} € pour la vignette. Pour un taxi, le registre et la vignette disparaissent, mais s’ajoutent la formation aux premiers secours et, surtout, la licence, gratuite après des années d’attente, louée ou achetée. Un ambulancier ne passe pas l’examen T3P : son coût est celui du diplôme d’État, fixé par chaque institut. Tout le reste dépend de vous et figure ici comme une saisie : le devis de formation (de ${A.formation_cout_min.toLocaleString('fr-FR')} à ${A.formation_cout_max.toLocaleString('fr-FR')} € selon service-public pour le taxi ou le VTC), le médecin agréé, l’apport sur le véhicule et la première prime d’assurance. Le simulateur sépare les deux colonnes pour que vous sachiez ce qui est négociable.`,
    faqs: [
      { q: 'Quel est le minimum incompressible pour devenir VTC ?', a: `${fixeVtc.toLocaleString('fr-FR')} € de frais publiés en 2026 : examen ${A.examen_complet} €, carte environ ${A.carte_pro_environ} €, registre ${A.registre_inscription} €, vignette environ ${A.vignette_environ} €. S’y ajoutent la visite chez un médecin agréé, dont le tarif n’est pas repris ici, l’assurance responsabilité civile professionnelle et le véhicule. La formation n’est pas obligatoire : un candidat qui se prépare seul ne paie que ces frais réglementés.` },
      { q: `La garantie financière de ${A.garantie_financiere_par_vehicule.toLocaleString('fr-FR')} € est-elle une dépense ?`, a: `C’est un engagement plus qu’une dépense : pour chaque véhicule qui n’est ni à vous ni loué plus de ${A.location_longue_mois} mois, le registre exige une garantie de ${A.garantie_financiere_par_vehicule.toLocaleString('fr-FR')} €, apportée par un établissement financier qui se porte caution. Son coût réel est celui que facture cet établissement. Propriétaire du véhicule ou en location longue durée, vous en êtes dispensé.` },
      { q: 'Peut-on financer la formation de chauffeur avec le CPF ?', a: 'Oui, service-public indique que le compte personnel de formation peut servir pour une formation taxi ou VTC, et que France Travail peut aider un demandeur d’emploi à la financer. Le montant pris en charge dépend de vos droits et de la formation choisie. Saisissez dans le simulateur le prix restant à votre charge plutôt que le prix catalogue.' },
    ],
    body: (h) => `
<h2>Les deux colonnes du calcul</h2>
<p>La première colonne rassemble les frais que vous ne pouvez pas négocier, lus sur les sites officiels : l’examen T3P, ${h.eur(A.examen_complet)} en 2026 selon le guide des CMA (${h.eur(A.examen_complet_2025)} en 2025), la carte professionnelle, environ ${h.eur(A.carte_pro_environ)}, et pour un VTC l’inscription au registre (${h.eur(A.registre_inscription)}) et la vignette (environ ${h.eur(A.vignette_environ)}). La seconde colonne contient tout ce qui varie d’une personne à l’autre : formation, médecin, PSC1 pour le taxi, licence, véhicule, assurance. Le site ne fixe aucun de ces montants.</p>
${h.table(['Frais', 'VTC', 'Taxi', 'Ambulancier'], [
  ['Examen T3P (CMA)', h.eur(A.examen_complet), h.eur(A.examen_complet), 'non'],
  ['Carte professionnelle', `≈ ${h.eur(A.carte_pro_environ)}`, `≈ ${h.eur(A.carte_pro_environ)}`, 'non'],
  ['Registre des VTC', h.eur(A.registre_inscription), 'non', 'non'],
  ['Vignette', `≈ ${h.eur(A.vignette_environ)}`, 'non', 'non'],
  ['Formation', 'facultative, votre devis', 'facultative, votre devis', 'diplôme d’État, devis de l’institut'],
  ['Licence', 'non', 'gratuite, louée ou achetée', 'non'],
], 'Frais publiés par service-public et les CMA, relevés le 4 octobre 2026')}

<h2>Si vous ratez une épreuve</h2>
<p>Un échec à l’écrit oblige à repayer l’examen complet. Un échec à la pratique laisse deux nouvelles tentatives dans l’année qui suit les résultats de l’écrit, à ${h.eur(A.examen_admission_seule)} l’inscription. Le détail des épreuves est dans les pages ${h.a('examen-vtc', 'examen VTC')} et ${h.a('examen-taxi', 'examen taxi')}.</p>

<h2>Le cas de la licence de taxi</h2>
<p>La licence peut tout changer : gratuite en mairie après une longue liste d’attente, louée environ ${h.eur(P.taxi.ads_loyer_paris_mois_environ)} par mois à Paris, ou achetée entre ${h.eur(P.taxi.ads_prix_min)} et ${h.eur(P.taxi.ads_prix_max)} selon service-public. La page ${h.a('licence-taxi', 'licence de taxi')} compare l’achat à crédit et la location ; le loyer se reporte ensuite dans le ${h.a('revenu-net-chauffeur', 'simulateur de revenu net')}.</p>

<h2>Ce que ce calcul ne contient pas</h2>
<p>Il ne compte ni le temps de préparation, ni les mois sans revenu avant la première course, ni la création de l’entreprise, gratuite sur le guichet unique mais parfois accompagnée de frais de conseil. Il ne recommande aucun centre de formation, aucun assureur et aucun loueur.</p>
`,
  },
  en: {
    slug: 'cost-to-become-a-driver',
    nav: 'Cost to become a driver',
    card: 'Regulated fees and start-up spending, VTC, taxi or ambulance.',
    title: 'Cost to Become a VTC or Taxi Driver France 2026: Breakdown',
    description: `What it costs in 2026 to become a VTC, taxi or ambulance driver in France: €${A.examen_complet} exam, card, €${A.registre_inscription} register entry, sticker, plus your training and start-up costs.`,
    h1: 'What getting into the job costs before your first fare',
    intro: 'Fees set by the authorities on one side, your own quotes on the other: the total, with no training centre to sell.',
    resume: `Becoming a VTC driver (licensed private hire) in France costs at least €${fixeVtc.toLocaleString('en-GB')} in regulated fees in 2026: €${A.examen_complet} for the full exam run by the chambers of trades (CMA), about €${A.carte_pro_environ} for the professional card, €${A.registre_inscription} for the VTC register and about €${A.vignette_environ} for the windscreen sticker. A taxi driver skips the register and sticker but needs a first-aid certificate and, above all, a licence, which is free after years on a waiting list, rented or bought. An ambulance worker does not sit the T3P exam: the cost is the State diploma, priced by each training institute. Everything else depends on you and is entered as your own figure: the training quote (€${A.formation_cout_min.toLocaleString('en-GB')} to €${A.formation_cout_max.toLocaleString('en-GB')} for taxi or VTC, according to service-public), the approved doctor, the vehicle deposit and the first insurance premium. The calculator keeps the two columns apart so you can see what is negotiable.`,
    faqs: [
      { q: 'What is the bare minimum to become a VTC driver?', a: `€${fixeVtc.toLocaleString('en-GB')} of published fees in 2026: exam €${A.examen_complet}, card about €${A.carte_pro_environ}, register €${A.registre_inscription}, sticker about €${A.vignette_environ}. On top come the approved doctor’s check-up, whose fee we do not quote, professional liability insurance and the vehicle. Training is optional, so a candidate who studies alone pays only these regulated fees.` },
      { q: `Is the €${A.garantie_financiere_par_vehicule.toLocaleString('en-GB')} financial guarantee money I lose?`, a: `It is a commitment rather than a cost: for each vehicle you neither own nor lease for more than ${A.location_longue_mois} months, the register requires a €${A.garantie_financiere_par_vehicule.toLocaleString('en-GB')} guarantee from a financial institution acting as guarantor. What you actually pay is that institution’s fee. If you own the car or lease it long term, no guarantee is needed.` },
      { q: 'Can my CPF training account pay for driver training?', a: 'Yes. Service-public says the personal training account (CPF) can be used for taxi or VTC training, and that France Travail, the public employment service, can help jobseekers fund it. How much is covered depends on your rights and the course. Enter what you will actually pay into the calculator, not the catalogue price.' },
    ],
    body: (h) => `
<h2>Two columns, kept apart</h2>
<p>The first column holds the fees you cannot negotiate, read on official sites: the T3P exam at ${h.eur(A.examen_complet)} in 2026 according to the CMA guide (${h.eur(A.examen_complet_2025)} in 2025), the professional card at about ${h.eur(A.carte_pro_environ)}, and for a VTC the register entry (${h.eur(A.registre_inscription)}) and the sticker (about ${h.eur(A.vignette_environ)}). The second column holds whatever varies from one person to the next: training, doctor, first-aid course for taxis, licence, vehicle, insurance. The site sets none of those amounts.</p>
${h.table(['Fee', 'VTC', 'Taxi', 'Ambulance'], [
  ['T3P exam (CMA)', h.eur(A.examen_complet), h.eur(A.examen_complet), 'no'],
  ['Professional card', `≈ ${h.eur(A.carte_pro_environ)}`, `≈ ${h.eur(A.carte_pro_environ)}`, 'no'],
  ['VTC register', h.eur(A.registre_inscription), 'no', 'no'],
  ['Sticker', `≈ ${h.eur(A.vignette_environ)}`, 'no', 'no'],
  ['Training', 'optional, your quote', 'optional, your quote', 'State diploma, institute quote'],
  ['Licence', 'no', 'free, rented or bought', 'no'],
], 'Fees published by service-public and the CMAs, read on 4 October 2026')}

<h2>If you fail a paper</h2>
<p>Failing the written part means paying for the full exam again. Failing the practical test leaves two more attempts within a year of the written results, at ${h.eur(A.examen_admission_seule)} each. The papers are described on the ${h.a('examen-vtc', 'VTC exam')} and ${h.a('examen-taxi', 'taxi exam')} pages.</p>

<h2>The taxi licence question</h2>
<p>The licence can change everything: free from the town hall after a long waiting list, rented for about ${h.eur(P.taxi.ads_loyer_paris_mois_environ)} a month in Paris, or bought for ${h.eur(P.taxi.ads_prix_min)} to ${h.eur(P.taxi.ads_prix_max)} according to service-public. The ${h.a('licence-taxi', 'taxi licence')} page compares buying on credit with renting; the rent then goes into the ${h.a('revenu-net-chauffeur', 'net income calculator')}.</p>

<h2>What this calculation leaves out</h2>
<p>It does not count study time, the months without income before your first fare, or setting up the business, which is free on the government’s one-stop portal but sometimes comes with advisory fees. It recommends no training centre, insurer or rental company.</p>
`,
  },
});
