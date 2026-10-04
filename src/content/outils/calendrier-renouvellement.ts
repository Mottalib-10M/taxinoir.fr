import { defineGuide } from '../../lib/guide-types';
import { P } from '../../lib/engine/params';

const A = P.acces;

export default defineGuide({
  id: 'calendrier-renouvellement',
  group: 'outils',
  order: 50,
  tool: 'calendrier',
  related: ['formation-continue-vtc-taxi', 'carte-vtc', 'registre-vtc', 'devenir-taxi', 'licence-taxi'],
  sources: ['spVtc', 'spTaxi', 'arreteFormationContinue', 'ctL3122_3', 'registreAide'],
  fr: {
    slug: 'calendrier-renouvellement-carte',
    nav: 'Calendrier de renouvellement',
    card: `Fin de la carte, stage de ${A.formation_continue_heures} heures et registre : vos dates.`,
    title: 'Renouvellement carte VTC et taxi 2026 : calendrier des dates',
    description: `Renouvellement de la carte VTC ou taxi en 2026 : validité ${A.carte_validite_ans} ans, stage de ${A.formation_continue_heures} h au plus tard ${A.formation_continue_avant_mois} mois avant, registre VTC tous les ${A.registre_validite_ans} ans. Vos dates exactes.`,
    h1: 'Renouvellement de la carte VTC ou taxi : toutes vos échéances',
    intro: 'Trois dates à ne pas laisser passer, calculées à partir de celles qui figurent sur vos documents.',
    resume: `La carte professionnelle de conducteur, VTC comme taxi, est valable ${A.carte_validite_ans} ans. Pour la renouveler, il faut avoir suivi un stage de formation continue de ${A.formation_continue_heures} heures, sur deux jours, dans un centre agréé, puis déposer la demande en ligne et payer à nouveau environ ${A.carte_pro_environ} € ; service-public demande d’engager la démarche ${A.formation_continue_avant_mois} mois avant la fin de validité. Un exploitant de VTC doit en plus renouveler son inscription au registre tous les ${A.registre_validite_ans} ans, comme le prévoit l’article L3122-3 du code des transports, et la refaire dès réception d’une nouvelle carte. Côté taxi, la licence (l’autorisation de stationnement) se renouvelle de droit, sans démarche, et seule une licence gratuite délivrée depuis octobre 2014 a une durée de validité propre. Le calendrier ci-dessus part de la date de délivrance de votre carte et de votre inscription, et affiche le nombre de jours qu’il vous reste.`,
    faqs: [
      { q: 'Quelle marge garder entre le stage et la fin de validité de ma carte ?', a: `Service-public indique que la démarche doit être engagée ${A.formation_continue_avant_mois} mois avant la fin de validité de la carte. Le stage dure ${A.formation_continue_heures} heures, sur deux jours, dans un centre agréé ; son attestation est indispensable pour demander la nouvelle carte. Les places se remplissent vite dans certains départements : réservez le stage dès que la date limite apparaît dans le calendrier.` },
      { q: 'La date de renouvellement du registre VTC est-elle la même que celle de la carte ?', a: `Pas forcément : l’inscription au registre court ${A.registre_validite_ans} ans à partir de sa propre date, qui suit en général de quelques semaines celle de la carte. Service-public demande de refaire l’inscription dès que vous recevez une nouvelle carte. Le calendrier affiche les deux échéances séparément pour éviter qu’une carte neuve cohabite avec une inscription expirée.` },
      { q: 'Faut-il renouveler sa licence de taxi tous les cinq ans ?', a: `Non pour la plupart des licences : service-public indique que l’autorisation de stationnement est renouvelée de droit, sans démarche. Seules les licences obtenues gratuitement après le 1er octobre 2014 sont valables ${P.taxi.ads_gratuite_validite_ans} ans, renouvelables sur demande faite ${P.taxi.ads_renouvellement_avant_mois} mois avant la fin. La carte professionnelle du conducteur, elle, suit le cycle de cinq ans.` },
    ],
    body: (h) => `
<h2>Les échéances calculées</h2>
${h.table(['Échéance', 'Règle', 'Source'], [
  ['Fin de validité de la carte', `${A.carte_validite_ans} ans après la délivrance`, 'service-public, F31027 et F21907'],
  ['Stage de formation continue', `${A.formation_continue_heures} heures, au plus tard ${A.formation_continue_avant_mois} mois avant la fin`, 'arrêté du 11 août 2017, service-public'],
  ['Registre des VTC', `${A.registre_validite_ans} ans après l’inscription, et après chaque nouvelle carte`, 'code des transports, art. L3122-3'],
], 'Le calcul retient le même quantième du mois, ramené au dernier jour quand il n’existe pas')}

<h2>Pourquoi ces dates comptent</h2>
<p>Une carte expirée vaut une carte non valide, avec l’amende de ${h.eur(A.amende_carte_invalide)} indiquée par service-public, et elle se voit immédiatement sur le service de contrôle en ligne que consultent les plateformes. Un registre expiré interrompt l’exploitation du véhicule : depuis le 27 juin 2026, exercer sans inscription valide expose à des sanctions pénales lourdes, détaillées sur la page ${h.a('registre-vtc', 'registre des VTC')}.</p>

<h2>Pour un taxi qui change de département</h2>
<p>La mobilité vers un autre département passe aussi par un stage, de ${P.taxi.mobilite_heures} heures (${P.taxi.mobilite_heures_paris} heures à Paris), puis par une nouvelle carte qui mentionne les départements autorisés, dans la limite de ${P.taxi.mobilite_max_departements}. Ce stage ne remplace pas la formation continue du renouvellement : ce sont deux démarches distinctes, décrites sur la page ${h.a('formation-continue-vtc-taxi', 'formation continue et renouvellement')}.</p>

<h2>Limites</h2>
<p>Le calendrier ne connaît pas les délais d’instruction de votre préfecture et ne remplace pas la date imprimée sur votre carte : en cas d’écart, la carte fait foi. Il ne traite pas les cartes de moto-taxi (VMDTR), qui suivent pourtant le même cycle de renouvellement.</p>
`,
  },
  en: {
    slug: 'driver-card-renewal-dates',
    nav: 'Renewal calendar',
    card: 'Card expiry, the 14-hour course and the register: your dates.',
    title: 'VTC and Taxi Card Renewal France 2026: Your Deadlines',
    description: `Renewing a VTC or taxi card in France, 2026: valid ${A.carte_validite_ans} years, ${A.formation_continue_heures}-hour course at the latest ${A.formation_continue_avant_mois} months before, VTC register every ${A.registre_validite_ans} years. Your exact dates.`,
    h1: 'Renewing a VTC or taxi card: every deadline in one place',
    intro: 'Three dates not to miss, worked out from the ones printed on your documents.',
    resume: `The French professional driver card, for VTC (private hire) and taxi alike, is valid for ${A.carte_validite_ans} years. To renew it you must first complete a ${A.formation_continue_heures}-hour continuing training course over two days at an approved centre, then apply online and pay about €${A.carte_pro_environ} again; service-public asks drivers to start ${A.formation_continue_avant_mois} months before the card expires. A VTC operator must also renew their register entry every ${A.registre_validite_ans} years under article L3122-3 of the Transport Code, and re-register as soon as a new card arrives. For taxis, the licence (autorisation de stationnement, or ADS) renews automatically, and only a free licence issued since October 2014 has its own term. The calendar above starts from the issue dates of your card and register entry and shows how many days you have left.`,
    faqs: [
      { q: 'How much margin should I leave between the course and my card’s expiry date?', a: `Service-public says the process must start ${A.formation_continue_avant_mois} months before the card expires. The course lasts ${A.formation_continue_heures} hours over two days at an approved centre, and its certificate is required to apply for the new card. Places fill up quickly in some départements, so book as soon as the deadline shows in the calendar.` },
      { q: 'Does my VTC register entry expire on the same day as my card?', a: `Not necessarily: the register entry runs for ${A.registre_validite_ans} years from its own date, which usually comes a few weeks after the card’s. Service-public asks you to re-register as soon as you receive a new card. The calendar lists both deadlines separately, so a new card never sits alongside an expired register entry.` },
      { q: 'Do I have to renew a taxi licence every five years?', a: `Not for most licences: service-public says the licence (ADS) renews automatically, with nothing to do. Only licences obtained free of charge after 1 October 2014 are valid for ${P.taxi.ads_gratuite_validite_ans} years, renewable on request ${P.taxi.ads_renouvellement_avant_mois} months before expiry. The driver’s professional card, on the other hand, follows the five-year cycle.` },
    ],
    body: (h) => `
<h2>The deadlines worked out</h2>
${h.table(['Deadline', 'Rule', 'Source'], [
  ['Card expiry', `${A.carte_validite_ans} years after issue`, 'service-public, F31027 and F21907'],
  ['Continuing training course', `${A.formation_continue_heures} hours, at the latest ${A.formation_continue_avant_mois} months before expiry`, 'order of 11 August 2017, service-public'],
  ['VTC register', `${A.registre_validite_ans} years after registration, and after each new card`, 'Transport Code, art. L3122-3'],
], 'Same day of the month, moved to the last day when it does not exist')}

<h2>Why these dates matter</h2>
<p>An expired card counts as an invalid card, with the ${h.eur(A.amende_carte_invalide)} fine service-public mentions, and it shows up at once on the online checking service that platforms consult. An expired register entry stops the vehicle from working: since 27 June 2026, operating without a valid entry carries heavy criminal penalties, set out on the ${h.a('registre-vtc', 'VTC register')} page.</p>

<h2>For a taxi driver moving département</h2>
<p>Working in another département also requires a course, of ${P.taxi.mobilite_heures} hours (${P.taxi.mobilite_heures_paris} hours in Paris), then a new card listing the authorised départements, up to ${P.taxi.mobilite_max_departements}. That course does not replace the renewal training: they are two separate steps, both covered on the ${h.a('formation-continue-vtc-taxi', 'continuing training and renewal')} page.</p>

<h2>Limits</h2>
<p>The calendar does not know your prefecture’s processing times and does not override the date printed on your card: if they differ, the card prevails. It does not cover motorbike-taxi (VMDTR) cards, which follow the same renewal cycle.</p>
`,
  },
});
