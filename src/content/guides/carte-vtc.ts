import { defineGuide } from '../../lib/guide-types';
import { P } from '../../lib/engine/params';

const A = P.acces;

export default defineGuide({
  id: 'carte-vtc',
  group: 'vtc',
  order: 30,
  mini: 'carteVtc',
  miniHref: 'calendrier-renouvellement',
  related: ['devenir-chauffeur-vtc', 'examen-vtc', 'registre-vtc', 'calendrier-renouvellement', 'formation-continue-vtc-taxi', 'cout-acces-metier'],
  sources: ['spVtc', 'cmaT3p', 'arreteCarteVtc', 'decretEquivalence', 'ctL3120'],
  fr: {
    slug: 'carte-vtc',
    nav: 'Carte VTC',
    card: 'Demande, pièces, coût, validité et contrôle de la carte.',
    title: `Carte VTC 2026 : demande, pièces, coût et validité ${A.carte_validite_ans} ans`,
    description: `Carte VTC 2026 : demande en ligne après l’examen, pièces à fournir, environ ${A.carte_pro_environ} € à l’Imprimerie nationale, ${A.carte_validite_ans} ans de validité, stage de ${A.formation_continue_heures} h pour renouveler.`,
    h1: 'Carte professionnelle VTC : la demander, la garder, la renouveler',
    intro: 'La carte est le dernier verrou avant le registre : sans elle, aucune inscription et aucune course.',
    resume: `La carte professionnelle VTC se demande en ligne, sur le site Démarches simplifiées, dès que la chambre de métiers et de l’artisanat vous a envoyé l’attestation de réussite à l’examen. Depuis le 12 août 2026, l’examen est la seule porte d’entrée : l’accès par l’expérience professionnelle a été supprimé par le décret n° 2026-764 du 5 août 2026, sauf pour les demandes déposées avant cette date. Le dossier réunit une pièce d’identité, le permis de conduire hors période probatoire, un justificatif de domicile de moins de trois mois, une photo, une signature, l’avis favorable d’un médecin agréé daté de moins de ${A.certificat_medical_validite_ans} ans et l’attestation de la CMA. Après la demande, l’Imprimerie nationale vous écrit pour le paiement, environ ${A.carte_pro_environ} €. La carte vaut ${A.carte_validite_ans} ans sur tout le territoire, se pose sur le pare-brise de façon lisible de l’extérieur et se renouvelle après un stage de ${A.formation_continue_heures} heures.`,
    faqs: [
      { q: 'Combien coûte la carte VTC en 2026 ?', a: `Environ ${A.carte_pro_environ} €, payés à l’Imprimerie nationale qui fabrique la carte : vous recevez un courriel de paiement après le dépôt de la demande. Le même tarif s’applique à chaque renouvellement et à chaque nouvelle demande après une perte ou un vol. Ce montant ne comprend ni l’examen (${A.examen_complet} € en 2026 auprès des CMA), ni l’inscription au registre des VTC (${A.registre_inscription} €), ni la visite chez le médecin agréé.` },
      { q: 'Puis-je encore obtenir la carte VTC par équivalence ?', a: 'Non, pas pour une demande déposée depuis le 12 août 2026. Le décret n° 2026-764 du 5 août 2026 a supprimé l’accès par la reconnaissance de l’expérience professionnelle ; la démarche correspondante est close sur Démarches simplifiées. Une demande déposée avant cette date reste examinée selon les anciennes règles. Pour toute nouvelle demande, il faut réussir l’examen organisé par les chambres de métiers.' },
      { q: 'La carte VTC est-elle valable dans toute la France ?', a: 'Oui. Contrairement à la carte de taxi, limitée au département de l’examen sauf mobilité, la carte VTC permet d’exercer sur tout le territoire national. En cas de déménagement, vous n’avez pas besoin de nouvelle carte, mais vous devez déclarer votre nouvelle adresse dans votre compte du registre des VTC : l’article R3122-1 du code des transports impose de signaler tout changement sous ${A.changement_registre_jours} jours francs.' },
      { q: 'Que risque un chauffeur qui roule avec une carte périmée ?', a: `Service-public indique une amende de ${A.amende_carte_invalide} € pour la détention d’une carte professionnelle non valide. Les clients et les plateformes peuvent vérifier la validité de chaque carte en ligne, puisque tous les titulaires sont inscrits d’office au service de contrôle Cerbère. Une carte expirée bloque aussi le renouvellement de l’inscription au registre, qui suit la carte tous les cinq ans.` },
      { q: 'Faut-il refaire la visite médicale pour renouveler la carte VTC ?', a: `Service-public ne mentionne pour le renouvellement que le stage de formation continue de ${A.formation_continue_heures} heures et son attestation, puis la demande en ligne et le paiement d’environ ${A.carte_pro_environ} €. Pour une première demande, l’avis du médecin agréé doit dater de moins de ${A.certificat_medical_validite_ans} ans. Vérifiez la liste exacte des pièces affichée sur le formulaire de renouvellement le jour où vous le remplissez.` },
    ],
    body: (h) => `
<h2>Qui peut demander la carte</h2>
<p>Quatre conditions, toutes vérifiées par la préfecture au moment de la demande. Le permis B doit être détenu depuis ${A.permis_anciennete_ans} ans, ou ${A.permis_conduite_accompagnee_ans} ans après une conduite accompagnée, et la période probatoire doit être terminée. Le bulletin n° 2 du casier judiciaire ne doit porter aucune des condamnations énumérées par l’article R3120-8 du code des transports : un délit routier qui a coûté la moitié des points du permis, une conduite sans permis ou malgré une annulation, ou une peine criminelle, ou correctionnelle d’au moins six mois de prison, pour vol, escroquerie, violences, agression sexuelle, trafic d’armes, extorsion ou stupéfiants.</p>
<p>Il faut ensuite un avis médical favorable, rendu par un médecin agréé par la préfecture sur le formulaire cerfa n° 14880, et non par votre médecin traitant. Enfin, il faut l’attestation de réussite à l’examen délivrée par la chambre de métiers et de l’artisanat (CMA). C’est ce dernier point qui a changé en 2026 : la voie de l’expérience professionnelle n’existe plus pour les demandes nouvelles, comme l’explique la page ${h.a('carte-vtc-equivalence', 'carte VTC par équivalence')}.</p>

<h2>La demande, étape par étape</h2>
<p>Tout se fait en ligne, sur le formulaire « carte professionnelle de conducteur de VTC par examen » de Démarches simplifiées. Rien ne se dépose au guichet. Les pièces demandées par la CMA dans sa notice d’octobre 2025 sont les suivantes :</p>
<ul>
<li>une pièce d’identité en cours de validité ;</li>
<li>le permis de conduire en cours de validité ;</li>
<li>un justificatif de domicile, ou une attestation d’hébergement, de moins de trois mois ;</li>
<li>une photo d’identité et une signature ;</li>
<li>le certificat médical cerfa n° 14880 établi depuis moins de ${A.certificat_medical_validite_ans} ans par un médecin agréé ;</li>
<li>l’attestation d’aptitude professionnelle remise par la CMA après l’examen.</li>
</ul>
<p>Le dossier est instruit par la préfecture de votre domicile, ou par la préfecture de police si vous habitez Paris. Une fois la demande acceptée, l’Imprimerie nationale vous envoie un courriel pour payer la fabrication, environ ${h.eur(A.carte_pro_environ)}. Aucun texte consulté ne fixe de délai de délivrance : comptez avec le calendrier de votre préfecture plutôt qu’avec une promesse de centre de formation.</p>
<p>Aucun délai n’oblige à demander la carte juste après l’examen, mais attendre ne sert à rien : tant qu’elle n’est pas arrivée, vous ne pouvez ni vous inscrire au ${h.a('registre-vtc', 'registre des VTC')}, ni commander la vignette, ni accepter la moindre réservation.</p>

<h2>Ce que la carte vous impose au volant</h2>
<p>La carte se place sur le pare-brise, de façon visible depuis l’extérieur, pendant toute l’activité. Vous pouvez la retirer quand vous ne travaillez pas. Elle est valable sur tout le territoire, ce qui distingue le VTC du taxi, dont la carte est attachée au département de l’examen.</p>
<p>Chaque titulaire figure d’office sur le service de contrôle des cartes, appelé Cerbère : un client, une plateforme ou un agent peut vérifier en quelques secondes qu’une carte est valide. Rouler avec une carte qui ne l’est plus expose à une amende de ${h.eur(A.amende_carte_invalide)} selon service-public, et l’autorité administrative peut aussi donner un avertissement, suspendre ou retirer la carte d’un conducteur qui enfreint la réglementation de la profession.</p>
<p>En cas de perte ou de vol, il n’y a pas de duplicata : on refait une demande complète, au même tarif. Gardez une copie numérique de toutes les pièces du premier dossier, elles resserviront.</p>

<h2>Carte, registre et vignette : trois choses différentes</h2>
<p>On les confond souvent, parce qu’elles s’enchaînent dans les mêmes semaines. La carte est attachée à la personne : elle prouve que le conducteur a le droit d’exercer. L’inscription au registre est attachée à l’entreprise qui exploite le véhicule, même quand cette entreprise est vous-même en micro-entreprise : elle coûte ${h.eur(A.registre_inscription)} et se renouvelle tous les ${A.registre_validite_ans} ans. La vignette rouge, enfin, est attachée au véhicule : environ ${h.eur(A.vignette_environ)}, commandée depuis le compte du registre, collée à l’avant et à l’arrière.</p>
${h.table(['Élément', 'Attaché à', 'Coût indiqué', 'Durée'], [
  ['Carte professionnelle', 'la personne', `environ ${h.eur(A.carte_pro_environ)}`, `${A.carte_validite_ans} ans`],
  ['Inscription au registre', 'l’entreprise', h.eur(A.registre_inscription), `${A.registre_validite_ans} ans`],
  ['Vignette VTC', 'le véhicule', `environ ${h.eur(A.vignette_environ)}`, 'tant que le véhicule est exploité'],
], 'Source : service-public, fiche F31027 vérifiée le 12 août 2026')}

<h2>Renouveler la carte tous les cinq ans</h2>
<p>La carte expire au bout de ${A.carte_validite_ans} ans. Pour la renouveler, il faut d’abord suivre un stage de formation continue de ${A.formation_continue_heures} heures, sur deux jours, dans un centre agréé ; service-public recommande de s’y prendre ${A.formation_continue_avant_mois} mois avant la fin de validité. Avec l’attestation du stage, on dépose la demande de renouvellement en ligne et l’on paie à nouveau environ ${h.eur(A.carte_pro_environ)}. Le mini-simulateur ci-dessus additionne ces renouvellements sur toute une carrière, et le ${h.a('calendrier-renouvellement', 'calendrier de renouvellement')} donne les dates exactes à partir de la date de délivrance.</p>
<p>La nouvelle carte entraîne une nouvelle inscription au registre : service-public demande de refaire l’inscription dès réception de la nouvelle carte. Le détail du stage, de son contenu et de son prix est sur la page ${h.a('formation-continue-vtc-taxi', 'formation continue et renouvellement')}.</p>

<h2>Les trois erreurs qui retardent un dossier</h2>
<p>La première est un certificat médical trop ancien : il doit dater de moins de ${A.certificat_medical_validite_ans} ans le jour de la demande, ce qui piège ceux qui ont passé la visite avant de s’inscrire à l’examen et ont dû le repasser. La deuxième est un justificatif de domicile de plus de trois mois. La troisième est une photo ou un scan illisible : le formulaire accepte les fichiers, l’instructeur non. Avant d’envoyer, relisez chaque pièce comme le ferait un agent de préfecture pressé.</p>
<p>Une fois la carte en main, l’ordre des démarches suivantes est donné par le ${h.a('devenir-chauffeur-vtc', 'parcours complet pour devenir VTC')}, et le ${h.a('cout-acces-metier', 'simulateur de coût d’accès')} vous dit ce que l’ensemble aura coûté avant la première course.</p>
`,
  },
  en: {
    slug: 'vtc-driver-card',
    nav: 'VTC driver card',
    card: 'Applying, documents, cost, validity and checks.',
    title: 'VTC Driver Card France 2026: Apply, Documents, Cost',
    description: `VTC driver card in France, 2026: online application after the exam, documents, about €${A.carte_pro_environ} to the Imprimerie nationale, ${A.carte_validite_ans}-year validity, ${A.formation_continue_heures}-hour renewal course.`,
    h1: 'The VTC driver card: getting it, keeping it, renewing it',
    intro: 'The card is the last lock before the register: without it, no registration and no bookings.',
    resume: `In France, the professional VTC card (the private-hire driver’s licence) is requested online, on the government’s Démarches simplifiées site, as soon as the chamber of trades (CMA) has sent you your exam pass certificate. Since 12 August 2026 the exam is the only way in: Decree no. 2026-764 of 5 August 2026 abolished access through work experience, except for applications filed before that date. The file holds an identity document, a driving licence past its probationary period, proof of address under three months old, a photo, a signature, a favourable opinion from a prefecture-approved doctor dated within ${A.certificat_medical_validite_ans} years, and the CMA certificate. After you apply, the Imprimerie nationale emails you to pay for the card, about €${A.carte_pro_environ}. The card is valid for ${A.carte_validite_ans} years anywhere in France, must be displayed on the windscreen and is renewed after a ${A.formation_continue_heures}-hour course.`,
    faqs: [
      { q: 'How much does the VTC card cost in 2026?', a: `About €${A.carte_pro_environ}, paid to the Imprimerie nationale, which prints the card; you get a payment email after filing the application. The same fee applies to each renewal and to any new application after loss or theft. It does not include the exam (€${A.examen_complet} in 2026 with the CMAs), the VTC register entry (€${A.registre_inscription}) or the approved doctor’s fee.` },
      { q: 'I drove professionally abroad. Can I still get the card without the exam?', a: 'Not through work experience any more. Decree no. 2026-764 of 5 August 2026 ended recognition of professional experience for VTC drivers from 12 August 2026, and the online procedure for it is closed. Applications filed before that date follow the old rules. Anyone applying now must pass the French exam run by the chambers of trades, which includes an English paper and a French paper.' },
      { q: 'Can I work anywhere in France with a VTC card?', a: 'Yes. Unlike a taxi card, which is tied to the département where the exam was taken unless you complete the mobility course, the VTC card covers the whole country. If you move, you keep the same card but must update your address in your VTC register account: article R3122-1 of the Transport Code requires any change to be reported within ${A.changement_registre_jours} clear days.' },
      { q: 'What happens if my card has expired and I keep driving?', a: `Service-public lists a €${A.amende_carte_invalide} fine for holding an invalid professional card. Riders and platforms can check any card online, because every holder is automatically listed on the Cerbère card-checking service. An expired card also blocks the renewal of your register entry, which follows the card every five years, so plan the renewal months ahead.` },
      { q: 'Do I need a medical check-up again to renew a VTC card?', a: `For renewal, service-public only mentions the ${A.formation_continue_heures}-hour continuing training course and its certificate, then the online application and the fee of about €${A.carte_pro_environ}. For a first application, the approved doctor’s opinion must be under ${A.certificat_medical_validite_ans} years old. Check the exact list of documents shown on the renewal form on the day you fill it in.` },
    ],
    body: (h) => `
<h2>Who can apply</h2>
<p>There are four conditions, all checked by the prefecture when you apply. You need a category B licence held for ${A.permis_anciennete_ans} years, or ${A.permis_conduite_accompagnee_ans} years after accompanied driving, with the probationary period over. A foreign licence must first be exchanged for a French one where the exchange rules require it. Your criminal record extract (bulletin no. 2) must show none of the convictions listed in article R3120-8 of the Transport Code: a driving offence that cost half the licence points, driving without a licence or while banned, or a criminal sentence, or a prison sentence of at least six months, for theft, fraud, violence, sexual assault, arms trafficking, extortion or drugs.</p>
<p>You also need a favourable medical opinion from a doctor approved by the prefecture, on form cerfa no. 14880, not from your own GP, and the pass certificate issued by the chamber of trades (CMA) after the exam. That last point changed in 2026: the work-experience route no longer exists for new applications, as explained on the page about the ${h.a('carte-vtc-equivalence', 'VTC card by equivalence')}.</p>

<h2>The application, step by step</h2>
<p>Everything happens online, on the “VTC driver card by exam” form on Démarches simplifiées, which is in French only. Nothing is handed in at a counter. The CMA’s October 2025 notice lists these documents:</p>
<ul>
<li>a valid identity document (ID card, passport or residence permit);</li>
<li>a valid driving licence;</li>
<li>proof of address, or a letter from the person hosting you, under three months old;</li>
<li>an ID photo and a signature;</li>
<li>medical certificate cerfa no. 14880, issued within ${A.certificat_medical_validite_ans} years by an approved doctor;</li>
<li>the professional aptitude certificate from the CMA.</li>
</ul>
<p>The file is handled by the prefecture where you live, or by the Préfecture de police if you live in Paris. Once it is accepted, the Imprimerie nationale emails you to pay for production, about ${h.eur(A.carte_pro_environ)}. None of the official texts we read sets a processing time, so rely on your prefecture’s actual workload rather than on a training centre’s promise.</p>
<p>Nothing forces you to apply straight after the exam, but waiting gains you nothing: until the card arrives you cannot join the ${h.a('registre-vtc', 'VTC register')}, order the sticker or accept a single booking.</p>

<h2>What the card requires at the wheel</h2>
<p>The card goes on the windscreen, readable from outside, whenever you are working; you may remove it when you are not. It is valid nationwide, which is the main practical difference from a taxi card, tied to the département of the exam.</p>
<p>Every holder is automatically listed on the card-checking service known as Cerbère, so a rider, a platform or an inspector can confirm in seconds that a card is valid. Driving with an invalid card exposes you to a ${h.eur(A.amende_carte_invalide)} fine according to service-public, and the authorities can also issue a warning, suspend or withdraw the card of a driver who breaks the profession’s rules.</p>
<p>There is no duplicate after loss or theft: you file a full new application and pay the same fee. Keep digital copies of every document from your first file.</p>

<h2>Card, register and sticker are three different things</h2>
<p>Newcomers mix them up because they come within the same few weeks. The card belongs to the person and proves the driver may work. The register entry belongs to the business running the vehicle, even when that business is you as a micro-entrepreneur; it costs ${h.eur(A.registre_inscription)} and is renewed every ${A.registre_validite_ans} years. The red sticker belongs to the vehicle: about ${h.eur(A.vignette_environ)}, ordered from your register account, stuck at the front and back.</p>
${h.table(['Item', 'Belongs to', 'Stated cost', 'Duration'], [
  ['Driver card', 'the person', `about ${h.eur(A.carte_pro_environ)}`, `${A.carte_validite_ans} years`],
  ['Register entry', 'the business', h.eur(A.registre_inscription), `${A.registre_validite_ans} years`],
  ['VTC sticker', 'the vehicle', `about ${h.eur(A.vignette_environ)}`, 'while the vehicle is in service'],
], 'Source: service-public, page F31027 checked on 12 August 2026')}

<h2>Renewing every five years</h2>
<p>The card expires after ${A.carte_validite_ans} years. To renew it, you first take a ${A.formation_continue_heures}-hour continuing training course over two days at an approved centre; service-public advises doing so ${A.formation_continue_avant_mois} months before expiry. With the course certificate, you apply online and pay about ${h.eur(A.carte_pro_environ)} again. The calculator above adds up those renewals over a career, and the ${h.a('calendrier-renouvellement', 'renewal calendar')} gives the exact dates from your issue date.</p>
<p>A new card means a new register entry: service-public asks you to re-register as soon as the new card arrives. The course itself, its content and its price are covered on the ${h.a('formation-continue-vtc-taxi', 'continuing training and renewal')} page.</p>

<h2>Three mistakes that hold up a file</h2>
<p>The first is an old medical certificate: it must be under ${A.certificat_medical_validite_ans} years old on the day you apply, which catches people who saw the doctor before booking the exam and had to go back. The second is proof of address older than three months, a common trap for newcomers to France who still use a lease signed on arrival. The third is a blurred photo or scan: the form accepts the file, the case officer does not. Before sending, read each document the way a busy prefecture clerk would.</p>
<p>Once the card is in hand, the order of the next steps is set out in the ${h.a('devenir-chauffeur-vtc', 'full guide to becoming a VTC driver')}, and the ${h.a('cout-acces-metier', 'start-up cost calculator')} shows what the whole process will have cost before your first fare.</p>
`,
  },
});
