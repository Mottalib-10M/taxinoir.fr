import { defineGuide } from '../../lib/guide-types';
import { P } from '../../lib/engine/params';

const A = P.acces;
const E = P.examen;

// Valeurs lues dans params-2026.json ; source : (bloc `examen`) : délais d’instruction garantis par la CMA.
// Source lue : règlement CMA de l’examen T3P, version de décembre 2024, articles III.3 et IV.1
// https://www.exament3p.fr/media/pdf/cma_reglement_examen_taxi.pdf
const CMA_INSTRUCTION_JOURS_OUVRES = P.examen.reglement.instruction_jours_ouvres;
const CMA_DELAI_GARANTI_MOIS = P.examen.reglement.garantie_mois;
const CMA_SESSIONS_AN = P.examen.reglement.sessions_par_an;

const epreuves = [...E.tronc_commun, ...E.vtc];
const fr = (n: number) => n.toLocaleString('fr-FR').replace(/\s/g, '\u00a0');
const en = (n: number) => n.toLocaleString('en-GB');

export default defineGuide({
  id: 'formation-vtc',
  group: 'vtc',
  order: 50,
  mini: 'formationVtc',
  miniHref: 'cout-acces-metier',
  related: ['examen-vtc', 'devenir-chauffeur-vtc', 'cout-acces-metier', 'carte-vtc', 'carte-vtc-equivalence', 'formation-taxi'],
  sources: ['spVtc', 'cmaReglement', 'cmaFaq', 'cmaT3p', 'arreteProgramme2024'],
  fr: {
    slug: 'formation-vtc',
    nav: 'Formation VTC',
    card: `Facultative, de ${A.formation_heures_min} à ${A.formation_heures_max} heures : ce qu’elle coûte, ce qu’elle doit couvrir, comment la financer.`,
    title: 'Formation VTC 2026 : durée, prix, CPF et centres agréés',
    description: `Formation VTC 2026 : facultative, de ${A.formation_heures_min} à ${A.formation_heures_max} h, de ${A.formation_cout_min} à ${fr(A.formation_cout_max)} € selon service-public, CPF possible, examen CMA à ${A.examen_complet} €. Ce qu’elle doit vraiment couvrir.`,
    h1: 'Formation VTC : ce qu’elle vaut, ce qu’elle coûte, comment s’en passer',
    intro: 'Aucun texte n’oblige à suivre une formation avant l’examen VTC, mais presque tous les candidats en suivent une.',
    resume: `La formation VTC n’est pas obligatoire : service-public la dit « fortement recommandée » pour réussir l’examen, et le règlement des chambres de métiers ouvre l’examen en candidature libre comme à la fin d’un parcours de formation. Elle dure de ${A.formation_heures_min} à ${A.formation_heures_max} heures environ et coûte de ${A.formation_cout_min} à ${fr(A.formation_cout_max)} € environ, selon le centre et le nombre d’heures. Elle peut se payer avec le compte personnel de formation (CPF), et France Travail peut aider à la financer. Les centres agréés sont listés par la chambre de métiers et de l’artisanat (CMA) ou la préfecture de votre département. Le contenu suit les épreuves : sept écrits (réglementation, gestion, sécurité routière, français, anglais, développement commercial, réglementation VTC) puis une épreuve pratique de conduite. L’inscription à l’examen se paie à part à la CMA, ${A.examen_complet} € en 2026. Un écrit raté oblige à tout repasser, une pratique ratée se repasse seule pour ${A.examen_admission_seule} €.`,
    faqs: [
      { q: 'La formation VTC est-elle obligatoire pour passer l’examen ?', a: 'Non. Service-public écrit que la formation est fortement recommandée mais pas obligatoire, et la FAQ des chambres de métiers dit la même chose. Le règlement de l’examen précise qu’il est ouvert en candidature libre ou à la fin d’un parcours de formation, quel que soit le niveau d’études. Seule la réussite à l’examen est exigée pour demander ensuite la carte professionnelle.' },
      { q: 'Combien d’heures dure une formation VTC ?', a: `Service-public donne une fourchette de ${A.formation_heures_min} à ${A.formation_heures_max} heures environ, variable selon le centre et le lieu. Aucun texte ne fixe de minimum, puisque la formation est facultative. Pour comparer deux offres, rapportez le prix au nombre d’heures réellement encadrées et vérifiez si les heures de conduite sur véhicule à double commande sont comprises.` },
      { q: 'Peut-on financer la formation VTC avec son CPF ?', a: 'Oui : service-public indique que le compte personnel de formation peut servir à payer la formation, et que France Travail peut accorder une aide au financement aux demandeurs d’emploi, sur conseil d’un agent. Vérifiez que la session choisie figure bien dans l’offre éligible avant de signer, et gardez en tête que l’inscription à l’examen se règle séparément auprès de la CMA.' },
      { q: 'Où trouver la liste des centres de formation VTC agréés ?', a: 'Service-public renvoie au site de la chambre de métiers et de l’artisanat de votre département, et la FAQ de la CMA au site de la préfecture. Les deux sources officielles publient donc la liste locale. Taxinoir ne recommande aucun centre : le choix se fait sur le nombre d’heures, le véhicule fourni pour la pratique et ce qui est compris dans le prix.' },
      { q: 'Peut-on se présenter à la pratique VTC sans passer par un centre ?', a: 'Oui, mais il faut venir avec un véhicule assuré, à jour du contrôle technique, à quatre portes, équipé de double commande et de doubles rétroviseurs, selon le règlement de la CMA. En cas de location, il faut le contrat au nom du candidat et l’attestation d’assurance du loueur. Les droits d’examen ne couvrent pas cette location.' },
      { q: 'Que coûte un échec quand on a déjà payé sa formation ?', a: `Tout dépend de l’épreuve ratée. Après un échec aux écrits, il faut se réinscrire à l’examen complet, ${A.examen_complet} € en 2026. Après un échec à la pratique, on garde l’admissibilité et l’on se réinscrit à la seule session d’admission, ${A.examen_admission_seule} €, avec ${E.pratique_tentatives_supplementaires} nouvelles tentatives possibles dans les ${E.pratique_delai_mois} mois qui suivent les résultats des écrits.` },
    ],
    body: (h) => `
<h2>Ce que disent les textes</h2>
<p>La fiche F31027 de service-public consacre une étape entière à la formation, et la formule est nette : elle est « fortement recommandée pour avoir une chance de réussir l’examen », mais elle n’est pas obligatoire. La FAQ de la CMA reprend la même position. Le règlement de l’examen, dans son article III.1, confirme que l’on peut s’inscrire en candidature libre. Personne ne vous demandera d’attestation de formation pour passer les écrits, ni pour la carte.</p>
<p>Il n’existe donc pas de programme réglementaire de la formation elle-même. Ce qui est réglementé, c’est le programme des épreuves, fixé par arrêté et modifié en dernier lieu par l’${h.src('arreteProgramme2024', 'arrêté du 20 mars 2024')}, qui a ajouté la prévention des discriminations et des violences sexistes et sexuelles. Un centre sérieux construit son cours sur ce programme, et c’est sur ce critère qu’il faut le juger.</p>
<p>Les candidats qui arrivent d’un autre métier de la conduite ne sont pas dispensés : depuis le 12 août 2026, l’expérience ne remplace plus l’examen, comme le détaille la page ${h.a('carte-vtc-equivalence', 'carte VTC par équivalence')}.</p>

<h2>Durée et prix : lire la fourchette officielle</h2>
<p>Service-public donne deux fourchettes, de ${A.formation_heures_min} à ${A.formation_heures_max} heures et de ${h.eur(A.formation_cout_min)} à ${h.eur(A.formation_cout_max)}. L’écart vient du format : une remise à niveau de quelques jours sur les écrits n’a rien à voir avec un parcours long qui inclut des heures de conduite, la mise à disposition d’un véhicule le jour de la pratique et parfois l’inscription à l’examen. Le paiement se fait en ligne ou sur place, selon le centre.</p>
${h.table(['Poste', 'Montant 2026', 'Payé à'], [
  ['Formation (facultative)', `${h.eur(A.formation_cout_min)} à ${h.eur(A.formation_cout_max)} environ`, 'le centre de formation'],
  ['Examen complet', h.eur(A.examen_complet), 'la CMA'],
  ['Session d’admission seule (après un échec à la pratique)', h.eur(A.examen_admission_seule), 'la CMA'],
  ['Location d’un véhicule à double commande', 'non compris dans les droits d’examen', 'le loueur ou le centre'],
], 'Sources : service-public F31027 (formation), CMA tarifs 2026, règlement de l’examen art. III.2')}
<p>Le mini-simulateur en haut de page ramène le prix d’une offre à son coût horaire et ajoute ce que coûterait un échec. C’est la comparaison la plus utile entre deux devis : un forfait bon marché avec peu d’heures encadrées revient souvent plus cher à l’heure qu’un parcours long.</p>

<h2>Payer avec le CPF ou une aide de France Travail</h2>
<p>Service-public cite deux leviers. Le premier est le compte personnel de formation, utilisable pour cette formation. Le second concerne les demandeurs d’emploi : France Travail peut accorder une aide au financement, et service-public renvoie vers sa page sur l’aide individuelle à la formation. Dans les deux cas, la décision appartient au financeur, pas au centre ; un centre qui promet une prise en charge « garantie » s’avance au-delà de ce qu’il maîtrise.</p>
<p>Service-public signale aussi que des plateformes de réservation proposent parfois des parcours « clés en main » avec formation et inscription à l’examen. Lisez ce qui est compris, et ce qui vous engage ensuite.</p>

<h2>Trouver un centre agréé</h2>
<p>La liste locale des organismes agréés est publiée par la CMA de votre département selon service-public, par la préfecture selon la FAQ de la CMA. Consultez les deux. Nous ne citons aucun centre et n’en recommandons aucun. La plupart proposent une partie des cours à distance, ce que service-public mentionne aussi.</p>
<p>Avant de signer, demandez par écrit le nombre d’heures en salle et en conduite, le modèle du véhicule fourni le jour de la pratique, le sort des frais d’examen et ce qui se passe si vous échouez : le centre vous reprend-il pour une nouvelle préparation, et à quel prix ?</p>

<h2>Ce que la formation doit couvrir : les épreuves</h2>
<p>L’admissibilité réunit sept écrits, composés de QCM (questions à choix multiples) et de QRC (questions à réponse courte). Une note sous ${E.tronc_commun[0].eliminatoire}/20 est éliminatoire, sauf en anglais où le seuil est ${E.tronc_commun[4].eliminatoire}/20, et il faut une moyenne pondérée d’au moins ${E.admissibilite_moyenne}/20.</p>
${h.table(['Épreuve', 'Questions', 'Durée', 'Coefficient'], epreuves.map((e) => [
  `${e.code} ${e.fr}`, `${e.qcm} QCM${e.qrc ? ` + ${e.qrc} QRC` : ''}`, `${e.minutes} min`, e.coef,
]), 'Source : règlement de l’examen des CMA, version de décembre 2024')}
<p>La pratique dure au plus ${E.pratique_duree_max_min} minutes, dont au moins ${E.pratique_conduite_min} minutes de conduite, après ${E.pratique_preparation_min} minutes de préparation du parcours. Elle est notée sur 20 : ${E.pratique_bareme_vtc.parcours} points pour la préparation du parcours, ${E.pratique_bareme_vtc.conduite} pour la conduite, ${E.pratique_bareme_vtc.client} pour la relation au client, ${E.pratique_bareme_vtc.facturation} pour la facturation. Il faut ${E.pratique_admis}/20. Une formation qui ne prévoit aucune mise en situation avec un examinateur fictif laisse de côté la moitié de la note. Le détail de chaque épreuve est sur la page ${h.a('examen-vtc', 'examen VTC')}.</p>

<h2>Se préparer seul : possible, avec deux obstacles</h2>
<p>Les écrits se préparent sans centre si l’on travaille méthodiquement le programme et les annales disponibles. Le premier obstacle est l’anglais et le français, notés à part : un candidat à l’aise au volant mais fragile à l’écrit perd vite des points sur ces deux épreuves.</p>
<p>Le second obstacle est matériel. Pour la pratique, le règlement exige un véhicule assuré, à jour du contrôle technique, à quatre portes, équipé de double commande et de doubles rétroviseurs. Il peut ne pas respecter les normes des voitures VTC. Si vous le louez, il faut le contrat de location à votre nom, ou la facture acquittée, et l’attestation d’assurance du loueur ; si un centre le fournit, il remet une attestation de mise à disposition. Les droits d’examen ne couvrent pas cette location.</p>
<p>Côté calendrier, la CMA étudie le dossier en ${CMA_INSTRUCTION_JOURS_OUVRES} jours ouvrés et garantit, une fois le dossier validé, le passage des épreuves et les résultats de la pratique dans un délai de ${CMA_DELAI_GARANTI_MOIS} mois. Le calendrier national prévoit ${CMA_SESSIONS_AN} sessions d’écrits par an, au moins une par trimestre dans chaque région.</p>

<h2>Ce que coûte un échec</h2>
<p>La règle de repassage change tout le calcul. Un échec aux écrits efface tout : il faut repayer l’examen complet, ${h.eur(A.examen_complet)}. Un échec à la pratique laisse l’admissibilité acquise : on s’inscrit à la seule session d’admission, ${h.eur(A.examen_admission_seule)}, avec ${E.pratique_tentatives_supplementaires} nouvelles tentatives dans les ${E.pratique_delai_mois} mois suivant la publication des résultats des écrits. Passé ce délai, retour à l’examen complet.</p>
<p>Le total, de la formation à la première course, avec la carte, le registre et la vignette, se calcule dans le ${h.a('cout-acces-metier', 'simulateur du coût d’accès au métier')}, et l’ordre des démarches est sur la page ${h.a('devenir-chauffeur-vtc', 'devenir chauffeur VTC')}.</p>
`,
  },
  en: {
    slug: 'vtc-training-course',
    nav: 'VTC training',
    card: `Optional, ${A.formation_heures_min} to ${A.formation_heures_max} hours: what it costs, what it should cover and how to pay for it.`,
    title: 'VTC Training Course France 2026: Hours, Price, Funding',
    description: `VTC training in France, 2026: optional, ${A.formation_heures_min} to ${A.formation_heures_max} hours, €${A.formation_cout_min} to €${en(A.formation_cout_max)} per service-public, CPF funding possible, €${A.examen_complet} CMA exam fee. What a course must cover.`,
    h1: 'VTC training in France: worth it, what it costs, and going it alone',
    intro: 'No rule forces you to take a course before the VTC exam, yet most candidates do.',
    resume: `In France you do not have to take a training course before the VTC (private-hire driver) exam. The government site service-public calls it “strongly recommended”, and the rules of the chambers of trades (CMA), which run the exam, accept independent candidates as well as those coming out of a course. Courses last roughly ${A.formation_heures_min} to ${A.formation_heures_max} hours and cost about €${A.formation_cout_min} to €${en(A.formation_cout_max)}, depending on the school and the hours included. You can pay with your personal training account (CPF, the state-funded training budget most workers build up), and job seekers can ask France Travail, the public employment service, for funding help. Approved schools are listed by the CMA or the prefecture of your département. A good course follows the exam: seven written papers, including English and French, then a practical driving test. The exam fee is separate, €${A.examen_complet} in 2026. Fail a written paper and you resit everything; fail the practical and you resit it alone for €${A.examen_admission_seule}.`,
    faqs: [
      { q: 'Do I have to attend a training school before sitting the VTC exam?', a: 'No. Service-public says training is strongly recommended but not compulsory, and the CMA’s own FAQ agrees. The exam rules state that it is open to independent candidates and to those finishing a course, whatever their level of education. The only requirement for the professional card is passing the exam itself, not proof of attendance anywhere.' },
      { q: 'How many hours does a typical VTC course last?', a: `Service-public gives a range of about ${A.formation_heures_min} to ${A.formation_heures_max} hours, depending on the school and the area. No rule sets a minimum, since training is optional. To compare offers, divide the price by the hours actually taught and check whether driving practice in a dual-control car is part of the package.` },
      { q: 'Can my CPF training account pay for a VTC course?', a: 'Yes. Service-public states that the compte personnel de formation (CPF) can be used for this training, and that job seekers can ask France Travail for financial help. Make sure the exact session is eligible before signing anything. The exam fee itself is paid separately to the chamber of trades and is not part of the school’s price unless the contract says so.' },
      { q: 'Where can I find an approved VTC school near me?', a: 'Service-public points to the website of the chamber of trades (CMA) in your département, while the CMA’s FAQ points to the prefecture website. Both official sources publish the local list. We do not recommend any school; choose on taught hours, the car supplied for the practical test and what the price includes.' },
      { q: 'Can I take the practical test with my own car, without a school?', a: 'Only if the car meets the CMA rules: insured, roadworthiness test up to date, four doors, dual controls and dual mirrors inside and out. It does not have to meet VTC vehicle standards. If you rent one, bring the rental contract in your name and the renter’s insurance certificate. The exam fee does not cover that rental.' },
      { q: 'If I fail after paying for a course, what does the resit cost?', a: `It depends which part you fail. Fail the written stage and you must register for the full exam again, €${A.examen_complet} in 2026. Fail the practical and you keep your written pass: you book the practical session only, €${A.examen_admission_seule}, with ${E.pratique_tentatives_supplementaires} further attempts allowed within ${E.pratique_delai_mois} months of the written results.` },
    ],
    body: (h) => `
<h2>Optional on paper, common in practice</h2>
<p>Service-public’s page on becoming a VTC driver (F31027) gives training its own step and is blunt about it: a course is “strongly recommended” if you want a real chance of passing, but it is not a legal requirement. The chamber of trades says the same in its FAQ, and article III.1 of the exam rules confirms that independent candidates are welcome. Nobody will ask for a training certificate at the exam or when you apply for the card.</p>
<p>That also means the course itself has no official syllabus. What the law does fix is the content of the exam, set by ministerial order and last changed by the ${h.src('arreteProgramme2024', 'order of 20 March 2024')}, which added the prevention of discrimination and sexual or sexist violence. Judge a school by how closely it sticks to that list.</p>
<p>Experience behind the wheel elsewhere, in France or abroad, no longer replaces the exam since 12 August 2026. The ${h.a('carte-vtc-equivalence', 'page on the VTC card by equivalence')} explains what changed.</p>

<h2>Reading the official price and hours ranges</h2>
<p>The two ranges on service-public, ${A.formation_heures_min} to ${A.formation_heures_max} hours and ${h.eur(A.formation_cout_min)} to ${h.eur(A.formation_cout_max)}, cover very different products. At the low end you find a few days of revision for the written papers. At the top sits a long programme with driving lessons, a dual-control car on test day and sometimes the exam registration. Schools take payment online or on site.</p>
${h.table(['Item', '2026 amount', 'Paid to'], [
  ['Training course (optional)', `about ${h.eur(A.formation_cout_min)} to ${h.eur(A.formation_cout_max)}`, 'the school'],
  ['Full exam', h.eur(A.examen_complet), 'the CMA'],
  ['Practical session only (after failing the practical)', h.eur(A.examen_admission_seule), 'the CMA'],
  ['Hire of a dual-control car', 'not included in the exam fee', 'the hire firm or school'],
], 'Sources: service-public F31027 (training), CMA 2026 fees, exam rules art. III.2')}
<p>The calculator above turns any quote into a price per hour and adds what a failed attempt would cost on top. That is the fairest way to compare two schools: a cheap package with few taught hours often works out dearer per hour than a longer one.</p>

<h2>Funding: CPF and France Travail</h2>
<p>Two routes are named by service-public. Most people who have worked in France have a CPF balance, spendable on this course. If you are registered as a job seeker, France Travail may contribute, and service-public links to its individual training grant. Either way the funder decides, not the school, so be wary of any “guaranteed” funding promise.</p>
<p>Service-public also notes that some ride-hailing platforms offer “turnkey” packages bundling training and exam registration. Read what is included, and what you commit to afterwards.</p>

<h2>Finding an approved school</h2>
<p>Service-public sends you to the CMA of your département for the list of approved schools, while the CMA FAQ sends you to the prefecture. Check both. We name no school and endorse none. Many teach part of the course online, which service-public mentions too.</p>
<p>Get the details in writing before you pay: classroom hours, driving hours, which car you will use on test day, who pays the exam fee, and what happens if you fail. Will the school take you back for another round, and at what price?</p>

<h2>What a course should cover</h2>
<p>The written stage has seven papers mixing multiple-choice questions (QCM) and short-answer questions (QRC). Scoring under ${E.tronc_commun[0].eliminatoire}/20 on any paper fails you outright, except English, where the cut-off is ${E.tronc_commun[4].eliminatoire}/20, and you need a weighted average of at least ${E.admissibilite_moyenne}/20. Bear in mind the French paper if French is not your first language.</p>
${h.table(['Paper', 'Questions', 'Time', 'Weight'], epreuves.map((e) => [
  `${e.code} ${e.en}`, `${e.qcm} QCM${e.qrc ? ` + ${e.qrc} QRC` : ''}`, `${e.minutes} min`, e.coef,
]), 'Source: CMA exam rules, December 2024 version')}
<p>The practical lasts up to ${E.pratique_duree_max_min} minutes, with at least ${E.pratique_conduite_min} minutes at the wheel after ${E.pratique_preparation_min} minutes planning the route. Out of 20, route planning earns ${E.pratique_bareme_vtc.parcours}, driving ${E.pratique_bareme_vtc.conduite}, looking after the passenger ${E.pratique_bareme_vtc.client} and billing ${E.pratique_bareme_vtc.facturation}; the pass mark is ${E.pratique_admis}. A course with no mock test in front of a pretend examiner skips half of that. Each paper is broken down on the ${h.a('examen-vtc', 'VTC exam')} page.</p>

<h2>Preparing on your own</h2>
<p>Self-study works for the written stage if you are disciplined with the syllabus and past papers. The weak spot for many is the language pair: English is scored separately and French carries a weight of two, so fluency at the wheel does not make up for a shaky written French.</p>
<p>The real hurdle is the car. Under the CMA rules you must turn up in an insured vehicle with a valid roadworthiness test, four doors, dual controls and dual mirrors. It need not meet VTC vehicle standards. A hired car needs a rental contract or paid invoice in your name plus the renter’s insurance certificate; a school supplying the car hands you a certificate saying so. The exam fee does not cover any of this.</p>
<p>On timing, the CMA checks your file within ${CMA_INSTRUCTION_JOURS_OUVRES} working days and, once it is accepted, guarantees you can sit the papers and get your practical result within ${CMA_DELAI_GARANTI_MOIS} months. There are ${CMA_SESSIONS_AN} national written sessions a year, with at least one per quarter in every region.</p>

<h2>The price of failing</h2>
<p>How resits work matters more than the headline fee. Failing the written stage wipes the slate: you pay for the full exam again, ${h.eur(A.examen_complet)}. Failing the practical keeps your written pass, so you only book the practical session at ${h.eur(A.examen_admission_seule)}, with ${E.pratique_tentatives_supplementaires} more attempts within ${E.pratique_delai_mois} months of the written results. Miss that window and you start from scratch.</p>
<p>For the full bill from course to first fare, including card, register and sticker, use the ${h.a('cout-acces-metier', 'start-up cost calculator')}. The order of every step is set out in the guide to ${h.a('devenir-chauffeur-vtc', 'becoming a VTC driver')}.</p>
`,
  },
});
