import { defineGuide } from '../../lib/guide-types';
import { P } from '../../lib/engine/params';

const A = P.acces;
const E = P.examen;

// Valeurs lues dans params-2026.json ; source : (bloc `acces`) : ancienne condition d’expérience, abrogée le 12 août 2026.
// Source lue : règlement CMA de l’examen T3P, version de décembre 2024, note de bas de page des épreuves VTC
// https://www.exament3p.fr/media/pdf/cma_reglement_examen_taxi.pdf
// et décret n° 2026-764 du 5 août 2026 (abrogation des articles R3122-11 et R3123-2 du code des transports)
// https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000054658967
const ANCIENNE_EXPERIENCE_ANS = P.acces.ancienne_experience_ans;
const ANCIENNE_PERIODE_ANS = P.acces.ancienne_periode_ans;
const DECRET_DATE = P.acces.decret_equivalence_date;
const DECRET_JO = P.acces.decret_equivalence_jo;

const specVtc = E.vtc;

export default defineGuide({
  id: 'carte-vtc-equivalence',
  group: 'vtc',
  order: 60,
  mini: 'passerelle',
  miniHref: 'cout-acces-metier',
  related: ['carte-vtc', 'examen-vtc', 'formation-vtc', 'examen-taxi', 'devenir-chauffeur-vtc'],
  sources: ['decretEquivalence', 'dsEquivalence', 'spVtc', 'cmaReglement', 'cmaFaq', 'cmaT3p'],
  fr: {
    slug: 'carte-vtc-equivalence',
    nav: 'Carte VTC par équivalence',
    card: 'L’accès par l’expérience est fermé depuis le 12 août 2026 : ce qui reste ouvert.',
    title: 'Carte VTC par équivalence 2026 : fermée depuis le 12 août',
    description: `Carte VTC par équivalence en 2026 : l’accès par l’expérience est fermé depuis le 12 août (décret n° 2026-764). Restent l’examen à ${A.examen_complet} € ou la mobilité à ${A.examen_mobilite} €.`,
    h1: 'Carte VTC par équivalence : la voie est fermée, voici ce qui reste',
    intro: 'Beaucoup de pages décrivent encore l’équivalence comme une option : elle n’existe plus pour une demande nouvelle.',
    resume: `Depuis le 12 août 2026, il n’est plus possible d’obtenir la carte professionnelle de VTC par équivalence, c’est-à-dire en faisant valoir une expérience de chauffeur au lieu de passer l’examen. Le décret n° 2026-764 du 5 août 2026, publié au Journal officiel du 11 août, a abrogé l’article R3122-11 du code des transports qui organisait cette voie, et la démarche en ligne est close sur Démarches simplifiées. Son article 2 protège les dossiers déposés avant l’entrée en vigueur : ils restent jugés selon l’ancienne règle, qui demandait au moins ${ANCIENNE_EXPERIENCE_ANS} an d’expérience de chauffeur professionnel de personnes au cours des ${ANCIENNE_PERIODE_ANS} dernières années. Pour toute nouvelle demande, il reste deux chemins : l’examen complet des chambres de métiers, ${A.examen_complet} € en 2026, ou la mobilité professionnelle pour un candidat déjà admissible à l’examen de taxi ou de VMDTR depuis moins de ${E.mobilite_validite_ans} ans, qui ne passe que les deux épreuves écrites propres au VTC et la pratique, pour ${A.examen_mobilite} €.`,
    faqs: [
      { q: 'Mon dossier d’équivalence VTC était déposé avant le 12 août 2026 : que devient-il ?', a: 'Il continue d’être instruit selon les règles en vigueur au jour du dépôt. L’article 2 du décret n° 2026-764 du 5 août 2026 prévoit que les demandes de carte professionnelle déposées avant son entrée en vigueur restent soumises aux dispositions applicables à cette date. Gardez la preuve de dépôt sur Démarches simplifiées : c’est elle qui date votre demande.' },
      { q: 'Quelle expérience fallait-il pour l’équivalence VTC avant la réforme ?', a: `Le règlement de l’examen publié par les chambres de métiers en décembre 2024 indiquait au moins ${ANCIENNE_EXPERIENCE_ANS} an d’expérience dans les fonctions de chauffeur professionnel de personnes au cours des ${ANCIENNE_PERIODE_ANS} dernières années. Cette condition, fixée par l’article R3122-11 du code des transports, a été abrogée par le décret du 5 août 2026. Elle ne vaut plus que pour les dossiers déposés avant le 12 août 2026.` },
      { q: 'Un chauffeur de taxi peut-il devenir VTC sans repasser tout l’examen ?', a: `Oui, s’il a été déclaré admissible aux écrits de l’examen de taxi depuis moins de ${E.mobilite_validite_ans} ans, comptés depuis la publication de ses résultats. Il s’inscrit alors en mobilité professionnelle, ${A.examen_mobilite} € en 2026, ne passe que les deux épreuves écrites propres au VTC et doit réussir la pratique. Au-delà de ${E.mobilite_validite_ans} ans, c’est l’examen complet.` },
      { q: 'Ma carte VTC obtenue autrefois par équivalence reste-t-elle valable ?', a: 'Le décret du 5 août 2026 supprime une voie d’accès et ne contient aucune disposition retirant les cartes déjà délivrées. La carte se renouvelle comme les autres, tous les cinq ans, après le stage de formation continue. Le règlement de la CMA précise une limite : son titulaire n’ayant pas passé les écrits communs, il ne peut pas utiliser la mobilité professionnelle vers le taxi.' },
      { q: 'Un ancien ambulancier ou conducteur de bus est-il dispensé d’épreuves VTC ?', a: 'Non. Depuis le 12 août 2026, l’expérience de conduite professionnelle ne dispense plus de l’examen, quelle que soit la profession d’origine. Le règlement des chambres de métiers ne prévoit qu’un allègement : la mobilité professionnelle, réservée aux candidats déjà admissibles à l’examen de taxi ou de VMDTR depuis moins de trois ans. Les autres passent les sept écrits et la pratique.' },
    ],
    body: (h) => `
<h2>Ce que le décret du 5 août 2026 a changé</h2>
<p>Le ${h.src('decretEquivalence', 'décret n° 2026-764')} est daté du ${h.date(DECRET_DATE)} et a paru au Journal officiel du ${h.date(DECRET_JO)}. Il est entré en vigueur le lendemain, le ${h.date(A.equivalence_fin)} à zéro heure. Son article 1er abroge deux articles du code des transports : le R3122-11, qui ouvrait la carte de VTC aux personnes justifiant d’une expérience professionnelle, et le R3123-2, son équivalent pour les conducteurs de deux ou trois-roues (VMDTR). Il retire aussi les renvois à ces articles dans les R3120-6 et R3120-8-1.</p>
<p>Dans la foulée, le formulaire « carte professionnelle de conducteur de VTC par équivalence » a été fermé sur Démarches simplifiées, avec un message qui cite le décret. Service-public a mis à jour sa fiche le 12 août 2026 : l’examen y est décrit comme « l’unique voie d’accès ».</p>
<p>Le taxi n’est pas visé : le titre comme les articles du décret ne concernent que les conducteurs de VTC et de VMDTR, les deux professions qui avaient gardé une porte d’entrée par l’expérience. Service-public, dans sa fiche sur le métier de taxi, ne décrit aucune voie de ce type.</p>

<h2>L’ancienne règle, pour lire les annonces encore en ligne</h2>
<p>Jusqu’au 11 août 2026, un candidat pouvait demander la carte sans examen s’il prouvait au moins ${ANCIENNE_EXPERIENCE_ANS} an d’expérience dans les fonctions de chauffeur professionnel de personnes au cours des ${ANCIENNE_PERIODE_ANS} années précédant sa demande. C’est la formule qu’on lit encore dans la note de bas de page du règlement de l’examen publié par les chambres de métiers en décembre 2024, et sur de nombreux sites qui n’ont pas été mis à jour.</p>
<p>Cette règle est abrogée. Une page qui la présente comme une option, ou qui renvoie vers le formulaire d’équivalence, décrit le droit d’avant le 12 août 2026. Trois indices permettent de repérer une information périmée : l’absence de toute mention du décret n° 2026-764, un lien vers la démarche « par équivalence » de Démarches simplifiées, et une date de mise à jour antérieure à août 2026.</p>

<h2>Les dossiers déposés avant le 12 août</h2>
<p>L’article 2 du décret règle la transition en une phrase : les demandes de carte professionnelle déposées avant son entrée en vigueur restent soumises aux dispositions applicables à la date du dépôt. Un dossier complet envoyé le 11 août 2026 est donc examiné selon l’ancienne règle, même si la préfecture le traite des semaines plus tard. Service-public le dit à sa façon : les demandes effectuées avant cette date ne sont pas soumises à l’obligation d’examen.</p>
<p>Si votre dossier était en cours, conservez l’accusé de dépôt de Démarches simplifiées et tous les échanges avec la préfecture. En cas de refus, c’est cette date qui permettra de discuter le fondement juridique de la décision.</p>

<h2>Si vous détenez déjà une carte obtenue par équivalence</h2>
<p>Le décret ne contient aucune disposition sur les cartes déjà délivrées : il ferme une voie d’accès, il ne retire pas de titres. La carte se renouvelle comme toutes les cartes VTC, tous les ${A.carte_validite_ans} ans, après un stage de ${A.formation_continue_heures} heures décrit sur la page ${h.a('formation-continue-vtc-taxi', 'formation continue et renouvellement')}.</p>
<p>Le règlement de la CMA, article III.4, pose en revanche une limite durable. Le titulaire d’une carte VTC ou VMDTR obtenue par équivalence ne peut pas bénéficier de la mobilité professionnelle vers les autres professions, parce qu’il n’a jamais validé les écrits communs. S’il veut devenir taxi un jour, il passe l’${h.a('examen-taxi', 'examen de taxi')} complet.</p>

<h2>Ce qui reste ouvert : deux chemins vers la carte</h2>
${h.table(['Chemin', 'Pour qui', 'Épreuves', 'Inscription 2026'], [
  ['Examen complet', 'tout candidat', '7 écrits + pratique', h.eur(A.examen_complet)],
  ['Mobilité professionnelle', `admissible taxi ou VMDTR depuis moins de ${E.mobilite_validite_ans} ans`, '2 écrits VTC + pratique', h.eur(A.examen_mobilite)],
  ['Équivalence par l’expérience', 'dossiers déposés avant le 12 août 2026 seulement', 'aucune', 'démarche close'],
], 'Sources : décret n° 2026-764, règlement de l’examen des CMA art. III.4, tarifs CMA 2026')}
<p>L’examen complet est la voie commune. Les sept épreuves écrites et la pratique sont détaillées sur la page ${h.a('examen-vtc', 'examen VTC')}, et la question de suivre ou non une préparation sur la page ${h.a('formation-vtc', 'formation VTC')}.</p>
<p>La mobilité professionnelle est le seul allègement qui subsiste. Elle concerne le candidat reconnu admissible aux écrits complets de l’examen de taxi ou de VMDTR. Pendant ${E.mobilite_validite_ans} ans à compter de la notification de ses résultats, il peut se présenter aux seules épreuves spécifiques du VTC :</p>
<ul>
${specVtc.map((e) => `<li>${e.code} ${e.fr} : ${e.qcm} QCM et ${e.qrc} QRC en ${e.minutes} minutes, coefficient ${e.coef} ;</li>`).join('\n')}
</ul>
<p>Il est admissible avec une moyenne d’au moins ${E.admissibilite_moyenne}/20 sur ces deux épreuves pondérées, sans note éliminatoire, puis il passe la pratique. Le relevé de notes d’admissibilité de moins de ${E.mobilite_validite_ans} ans fait partie des pièces d’inscription. Le mini-simulateur en haut de page vérifie si votre délai court encore et ce que vous économisez.</p>

<h2>Expérience de chauffeur : ce qu’elle vaut encore</h2>
<p>Pour la carte, plus rien : ni des années de taxi à l’étranger, ni un passé d’ambulancier, de conducteur de bus ou de chauffeur salarié ne dispensent d’une épreuve. Pour l’examen, en revanche, cette expérience compte. La pratique note la préparation du parcours, la conduite, l’accueil du client et la facturation, quatre gestes qu’un professionnel maîtrise déjà. Les écrits de gestion, de réglementation et de langues demandent, eux, un travail que l’expérience ne remplace pas.</p>
<p>Une fois la carte en main, la suite se lit sur la page ${h.a('carte-vtc', 'carte VTC')} pour la demande, puis dans le ${h.a('cout-acces-metier', 'simulateur du coût d’accès')} pour le budget complet.</p>
`,
  },
  en: {
    slug: 'vtc-card-equivalence',
    nav: 'VTC card by equivalence',
    card: 'The work-experience route closed on 12 August 2026: what is still open.',
    title: 'VTC Card by Equivalence 2026: Closed Since 12 August',
    description: `VTC card by equivalence in France, 2026: the work-experience route ended on 12 August (Decree 2026-764). What remains: the €${A.examen_complet} exam or the €${A.examen_mobilite} mobility route.`,
    h1: 'The VTC card by equivalence: the route is closed, here is what remains',
    intro: 'Plenty of websites still present equivalence as an option. For any new application, it is gone.',
    resume: `Since 12 August 2026, you can no longer get a French VTC (private-hire) driver card “by equivalence”, the old route that let experienced drivers skip the exam. Decree no. 2026-764 of 5 August 2026, published in the Journal officiel (France’s official gazette) on 11 August, repealed article R3122-11 of the Transport Code, which set up that route, and the online form on Démarches simplifiées is closed. Article 2 of the decree protects files submitted before it took effect: they are still judged under the old rule, which asked for at least ${ANCIENNE_EXPERIENCE_ANS} year as a professional passenger driver within the previous ${ANCIENNE_PERIODE_ANS} years. Everyone else has two options. The first is the full exam run by the chambers of trades (CMA), €${A.examen_complet} in 2026. The second, called professional mobility, is for people who passed the written stage of the taxi or motorbike-taxi (VMDTR) exam less than ${E.mobilite_validite_ans} years ago: they sit only the two VTC-specific papers and the practical test, for €${A.examen_mobilite}.`,
    faqs: [
      { q: 'I applied by equivalence before 12 August 2026. Is my file still valid?', a: 'Yes. Article 2 of Decree no. 2026-764 says applications for a professional card filed before the decree came into force remain governed by the rules in place on the filing date. Your file is assessed under the old experience rule even if the prefecture deals with it later. Keep the Démarches simplifiées filing receipt, because it proves the date.' },
      { q: 'How much driving experience did the old equivalence route require?', a: `The chambers of trades’ exam rules of December 2024 described it as at least ${ANCIENNE_EXPERIENCE_ANS} year working as a professional passenger driver within the last ${ANCIENNE_PERIODE_ANS} years. That condition, set by article R3122-11 of the Transport Code, was repealed by the decree of 5 August 2026 and now only matters for files submitted before 12 August 2026.` },
      { q: 'I passed the taxi written exam recently. Can I switch to VTC cheaply?', a: `Yes, if your taxi written results were published less than ${E.mobilite_validite_ans} years ago. You register for professional mobility, €${A.examen_mobilite} in 2026, sit just the two VTC-specific written papers, then the practical test. After ${E.mobilite_validite_ans} years that shortcut lapses and you have to take the full exam like any other candidate.` },
      { q: 'Does a VTC card I got by equivalence years ago still count?', a: 'Nothing in the decree of 5 August 2026 withdraws cards already issued; it only closes the route for new applicants. Your card is renewed like any other, every five years after the continuing training course. One limit does apply under the CMA rules: since you never passed the common written papers, you cannot use professional mobility to become a taxi driver.' },
      { q: 'I drove buses or ambulances for years. Do I get any exemption?', a: 'No. Since 12 August 2026, professional driving experience exempts nobody from the exam, whatever the previous job. The only reduction left in the chambers of trades’ rules is professional mobility, which is reserved for people who passed the written stage of the taxi or VMDTR exam within the last three years. Everyone else sits all seven papers and the practical.' },
    ],
    body: (h) => `
<h2>What the decree of 5 August 2026 did</h2>
<p>${h.src('decretEquivalence', 'Decree no. 2026-764')} is dated ${h.date(DECRET_DATE)} and was published on ${h.date(DECRET_JO)}. It took effect the following day, ${h.date(A.equivalence_fin)}, at midnight. Article 1 repeals two provisions of the Transport Code (code des transports): R3122-11, which opened the VTC card to people with professional driving experience, and R3123-2, its twin for motorbike and trike drivers (VMDTR). It also strips the cross-references to them from articles R3120-6 and R3120-8-1.</p>
<p>The online form for the card “by equivalence” on Démarches simplifiées, the government’s forms portal, was shut at the same time, with a notice quoting the decree. Service-public updated its VTC page on 12 August 2026 and now calls the exam “the only way in”.</p>
<p>Taxi drivers are not covered. Both the title and the articles of the decree deal only with VTC and VMDTR drivers, the two trades that still let experience stand in for the exam, and service-public’s taxi page describes no such route.</p>

<h2>The old rule, so you can spot outdated advice</h2>
<p>Up to 11 August 2026, you could apply for the card without sitting the exam if you proved at least ${ANCIENNE_EXPERIENCE_ANS} year as a professional passenger driver during the ${ANCIENNE_PERIODE_ANS} years before applying. That wording still appears in a footnote of the chambers of trades’ exam rules dated December 2024, and on many websites that have not caught up.</p>
<p>Treat it as history. A page offering equivalence as a live option, or linking to the equivalence form, describes the law before 12 August 2026. Three warning signs give it away: no mention of Decree 2026-764, a link to the “par équivalence” procedure, and a last-updated date earlier than August 2026. Ask anyone selling you an “equivalence file” which text they are relying on.</p>

<h2>Files submitted before 12 August</h2>
<p>Article 2 of the decree handles the changeover in a single sentence: applications filed before it came into force remain subject to the rules in force on the filing date. A complete file sent on 11 August 2026 is therefore assessed under the old rule, even if the prefecture opens it weeks later. Service-public puts it another way: applications made before that date are not caught by the exam requirement.</p>
<p>If you were mid-application, hold on to the Démarches simplifiées receipt and every message from the prefecture. Should you be turned down, that date is what lets you challenge the legal basis of the refusal.</p>

<h2>Already holding a card obtained by equivalence</h2>
<p>The decree says nothing about cards already issued: it closes an entry route and withdraws no one’s licence. Your card is renewed like any other VTC card, every ${A.carte_validite_ans} years, after the ${A.formation_continue_heures}-hour course covered on the ${h.a('formation-continue-vtc-taxi', 'continuing training and renewal')} page.</p>
<p>There is one lasting catch, in article III.4 of the CMA rules. Holders of a VTC or VMDTR card obtained by equivalence cannot use professional mobility to move into another trade, since they never passed the common written papers. To drive a taxi later, they sit the full ${h.a('examen-taxi', 'taxi exam')}.</p>

<h2>The two routes still open</h2>
${h.table(['Route', 'Who it is for', 'Papers', '2026 fee'], [
  ['Full exam', 'any candidate', '7 written papers + practical', h.eur(A.examen_complet)],
  ['Professional mobility', `passed the taxi or VMDTR written stage under ${E.mobilite_validite_ans} years ago`, '2 VTC papers + practical', h.eur(A.examen_mobilite)],
  ['Equivalence by experience', 'files submitted before 12 August 2026 only', 'none', 'closed'],
], 'Sources: Decree 2026-764, CMA exam rules art. III.4, CMA 2026 fees')}
<p>The full exam is the standard path. Its seven written papers and the practical test are broken down on the ${h.a('examen-vtc', 'VTC exam')} page, and whether to pay for a prep course is discussed on the ${h.a('formation-vtc', 'VTC training')} page.</p>
<p>Professional mobility is the only reduction that survives. It applies to anyone declared admissible after the full written stage of the taxi or VMDTR exam. For ${E.mobilite_validite_ans} years from the notification of those results, they may sit just the VTC-specific papers:</p>
<ul>
${specVtc.map((e) => `<li>${e.code} ${e.en}: ${e.qcm} multiple-choice and ${e.qrc} short-answer questions in ${e.minutes} minutes, weight ${e.coef};</li>`).join('\n')}
</ul>
<p>You pass this stage with a weighted average of ${E.admissibilite_moyenne}/20 or more across the two, with no paper below the elimination mark, and then take the practical. Your written results sheet, under ${E.mobilite_validite_ans} years old, is one of the documents needed to register. The calculator above tells you whether your window is still open and how much you save.</p>

<h2>What years of driving still buy you</h2>
<p>Towards the card itself, nothing: taxi work abroad, ambulance shifts, bus routes or salaried chauffeuring exempt you from no paper at all. Towards passing the exam, quite a lot. The practical marks route planning, driving, looking after the passenger and billing, all things a seasoned driver already does well. The written papers on business management, regulations and languages are another matter, and experience does not replace study there.</p>
<p>Once you hold the card, the ${h.a('carte-vtc', 'VTC card')} page explains the application, and the ${h.a('cout-acces-metier', 'start-up cost calculator')} adds up the whole budget.</p>
`,
  },
});
