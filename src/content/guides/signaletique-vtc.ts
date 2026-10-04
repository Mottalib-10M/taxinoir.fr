import { defineGuide } from '../../lib/guide-types';
import { P } from '../../lib/engine/params';
import { displayDate } from '../../lib/format';

const A = P.acces;
const S = P.signaletique;
const dfr = (iso: string) => displayDate(iso, 'fr-FR');
const den = (iso: string) => displayDate(iso, 'en-GB');

export default defineGuide({
  id: 'signaletique-vtc',
  group: 'vtc',
  order: 110,
  mini: 'signaletique',
  miniHref: 'calendrier-renouvellement',
  related: ['registre-vtc', 'carte-vtc', 'location-voiture-vtc', 'voiture-vtc', 'devenir-chauffeur-vtc'],
  sources: ['arreteSignaletique', 'arreteSignaletique2025', 'spVtc', 'registreAide'],
  fr: {
    slug: 'signaletique-vtc',
    nav: 'Signalétique VTC',
    card: 'Macaron rouge, vignette temporaire, emplacement, validité : le texte en vigueur.',
    title: 'Signalétique VTC 2026 : macaron rouge, pose et validité',
    description: `Signalétique VTC 2026 : deux vignettes rouges à l’avant et à l’arrière, environ ${A.vignette_environ} €, version temporaire de ${A.vignette_temporaire_jours} jours, pose inamovible depuis juillet 2025.`,
    h1: 'La signalétique VTC : vignettes, macaron temporaire et règles de pose',
    intro: 'Un arrêté de 2017, retouché en 2025, dit tout : qui la fabrique, où elle se colle, quand elle cesse de valoir.',
    resume: `La signalétique des voitures de transport avec chauffeur est fixée par l’arrêté du 6 avril 2017, dans sa version en vigueur depuis le ${dfr(S.version_vigueur)}. Elle se compose de deux vignettes autocollantes rouges, fabriquées par l’Imprimerie nationale et commandées depuis le compte de l’exploitant au registre des VTC, pour environ ${A.vignette_environ} € selon service-public. L’une se colle en bas à gauche du pare-brise avant, l’autre en bas à droite de la lunette arrière. Depuis l’arrêté du 24 juillet 2025, elles doivent être collées de manière inamovible, sans pouvoir être décollées sans être détruites. Chaque vignette porte le numéro d’inscription de l’exploitant, l’immatriculation du véhicule, un code-barres en deux dimensions et un numéro de référence. En attendant les vignettes définitives, une signalétique temporaire imprimée sur papier vaut ${A.vignette_temporaire_jours} jours au plus. La signalétique cesse d’être valable quand la voiture n’est plus conforme ou quand l’inscription au registre expire.`,
    faqs: [
      { q: 'Où coller le macaron VTC sur la voiture ?', a: 'L’article 4 de l’arrêté du 6 avril 2017 fixe deux emplacements : dans l’angle inférieur gauche du pare-brise avant, côté conducteur, et dans l’angle inférieur droit de la lunette arrière. La signalétique temporaire, imprimée sur papier, se place en bas à gauche du pare-brise avant. Aucun autre emplacement n’est prévu par le texte, même pour une voiture dont la lunette arrière est teintée.' },
      { q: 'Combien de temps la vignette VTC temporaire est-elle valable ?', a: `Service-public indique une durée maximale de ${A.vignette_temporaire_jours} jours ; le site du registre parle d’un document au format PDF valable un mois, envoyé par courriel dès le paiement. Elle sert à rouler en attendant la livraison des vignettes définitives, ou après une mise à jour de votre inscription. Passé ce délai, sans vignette définitive collée, la voiture n’est plus signalée.` },
      { q: 'Que change l’arrêté du 24 juillet 2025 pour la vignette VTC ?', a: `Une seule chose, mais visible : au premier alinéa de l’article 4 de l’arrêté de 2017, le mot « apposées » a été remplacé par « collées de manière inamovible sans détruire les vignettes ». Publié au Journal officiel le ${dfr(S.arrete_2025_jo)}, le texte impose donc une pose définitive. Une vignette qu’on retire et recolle d’une voiture à l’autre n’est plus conforme.` },
      { q: 'Faut-il une nouvelle vignette VTC après un changement de voiture ?', a: `Oui. Chaque signalétique est délivrée pour un véhicule validé dans le registre et porte son numéro d’immatriculation. Une nouvelle voiture appelle donc une mise à jour du compte dans les ${A.changement_registre_jours} jours et une nouvelle commande, environ ${A.vignette_environ} €. L’ancienne signalétique cesse d’être valable pour la voiture qui ne remplit plus les conditions ou qui ne figure plus dans votre inscription.` },
      { q: 'Une moto VTC a-t-elle la même vignette qu’une voiture ?', a: 'Non. Service-public distingue la vignette rouge des voitures de transport avec chauffeur et la vignette bleue des véhicules motorisés à deux ou trois roues (VMDTR), les motos-taxis. Les deux se commandent depuis le compte du registre. Les critères du véhicule diffèrent aussi : puissance et âge propres aux deux-roues, détaillés sur la fiche de service-public consacrée au métier.' },
    ],
    body: (h) => `
<h2>Le texte de référence</h2>
<p>Tout tient dans un arrêté de sept articles et une annexe : l’${h.src('arreteSignaletique', 'arrêté du 6 avril 2017 relatif à la signalétique des voitures de transport avec chauffeur')}. Sa version en vigueur date du ${h.date(S.version_vigueur)}, après une seule retouche, l’${h.src('arreteSignaletique2025', 'arrêté du 24 juillet 2025')}, publié au Journal officiel le ${h.date(S.arrete_2025_jo)}. Ce qui suit reprend ces deux textes article par article, complétés par la fiche ${h.src('spVtc', 'service-public F31027')} pour le prix et la couleur.</p>

<h2>Ce qu’est la signalétique</h2>
<p>L’article 1er définit la signalétique comme des vignettes conformes au modèle figurant en annexe, produites par l’Imprimerie nationale. Il en existe deux formes :</p>
<ul>
<li>la <strong>signalétique permanente</strong> : deux vignettes autocollantes, rouges pour une voiture selon service-public ;</li>
<li>la <strong>signalétique temporaire</strong> : un document imprimé sur papier libre à partir d’un modèle électronique.</li>
</ul>
<p>L’annexe décrit les quatre informations propres à chaque véhicule portées sur la vignette, au nombre de ${S.annexe_champs} :</p>
${h.table(['Information', 'Rôle'], [
  ['Numéro d’inscription de l’exploitant au registre', 'relier la voiture à l’entreprise autorisée'],
  ['Numéro d’immatriculation du véhicule', 'empêcher le transfert d’une voiture à l’autre'],
  ['Code-barres en deux dimensions', 'permettre un contrôle rapide par lecture'],
  ['Numéro de référence', 'identifier la vignette elle-même'],
], 'Annexe de l’arrêté du 6 avril 2017')}
<p>C’est ce qui distingue la vignette d’un simple logo : elle est nominative pour un exploitant et un véhicule. Un macaron « VTC » acheté dans le commerce n’a aucune valeur.</p>

<h2>Commande et délivrance</h2>
<p>L’article 2 lie la signalétique au registre : la vignette permanente est délivrée pour chaque véhicule validé dans l’inscription de l’exploitant. On la commande donc depuis le compte du ${h.src('registreAide', 'registre des VTC')}, rubrique de commande des macarons, une fois l’inscription acceptée. Service-public en indique le coût : environ ${h.eur(A.vignette_environ)}.</p>
<p>La signalétique temporaire est délivrée immédiatement après le paiement, pour couvrir l’attente des vignettes définitives ou une mise à jour de l’inscription, comme l’ajout d’une voiture. Le site du registre l’envoie par courriel au format PDF ; on l’imprime et on la place derrière le pare-brise.</p>

<h2>Où et comment la coller</h2>
<p>L’article 4 fixe les emplacements, sans alternative :</p>
<ul>
<li>une vignette dans l’angle inférieur gauche du pare-brise avant ;</li>
<li>une vignette dans l’angle inférieur droit de la lunette arrière ;</li>
<li>la signalétique temporaire, en bas à gauche du pare-brise avant.</li>
</ul>
<p>Depuis le ${h.date(S.version_vigueur)}, les deux vignettes permanentes doivent être « collées de manière inamovible sans détruire les vignettes ». L’arrêté du 24 juillet 2025 n’a changé que ces mots, mais ils ferment une pratique : poser la vignette de façon amovible pour la retirer en dehors des heures de travail ou la passer d’une voiture à l’autre. La carte professionnelle, elle, reste un document distinct, posé sur le pare-brise pendant l’activité et retirable ensuite, comme l’explique la page ${h.a('carte-vtc', 'carte VTC')}.</p>

<h2>Quand la vignette cesse de valoir</h2>
<p>L’article 3 prévoit trois fins de validité pour la signalétique permanente :</p>
<ol>
<li>le véhicule ne remplit plus les conditions techniques, par exemple une voiture thermique qui atteint ses sept ans ;</li>
<li>l’inscription de l’exploitant au registre arrive à son terme, au plus tard après ${A.registre_validite_ans} ans ;</li>
<li>l’autorisation temporaire d’utilisation du véhicule prend fin.</li>
</ol>
<p>La signalétique temporaire, elle, ne vaut que ${A.vignette_temporaire_jours} jours au plus selon service-public. Le mini-simulateur compte les commandes à prévoir sur la durée d’une inscription : une par voiture déclarée, plus une à chaque changement de véhicule.</p>

<h2>Changer de voiture, renouveler l’inscription</h2>
<p>Parce qu’elle porte l’immatriculation, la vignette ne suit jamais le chauffeur : elle reste attachée à la voiture. Un changement de véhicule se déclare dans le compte du registre dans les ${A.changement_registre_jours} jours, puis appelle une nouvelle commande. C’est un coût récurrent à intégrer quand on loue des voitures pour de courtes durées : la page ${h.a('location-voiture-vtc', 'location de voiture VTC')} l’intègre à la comparaison des formules.</p>
<p>Au renouvellement de l’inscription, tous les ${A.registre_validite_ans} ans, la signalétique liée à l’ancienne inscription cesse aussi de valoir : prévoyez la commande dans le calendrier du ${h.a('registre-vtc', 'registre')}. Le ${h.a('calendrier-renouvellement', 'calendrier de renouvellement')} donne les dates à partir de votre inscription.</p>

<h2>Moto-taxi : la vignette bleue</h2>
<p>Les véhicules motorisés à deux ou trois roues, les VMDTR, relèvent du même registre mais d’une vignette bleue selon service-public. Les critères du véhicule sont propres aux deux-roues ; ils figurent sur la même fiche de service-public.</p>

<h2>Ce que la signalétique ne remplace pas</h2>
<p>La vignette prouve que la voiture appartient à une entreprise inscrite. Elle ne dispense ni de la carte professionnelle du conducteur, ni de la réservation préalable de chaque course, ni de l’assurance de l’activité. Le ${h.a('devenir-chauffeur-vtc', 'parcours pour devenir VTC')} replace ces obligations dans l’ordre.</p>
`,
  },
  en: {
    slug: 'vtc-sticker',
    nav: 'VTC sticker',
    card: 'Red sticker, temporary sticker, placement, validity: the order in force.',
    title: 'VTC Sticker France 2026: Red Macaron, Placement, Validity',
    description: `VTC sticker in France, 2026: two red stickers front and rear, about €${A.vignette_environ}, a ${A.vignette_temporaire_jours}-day temporary version, permanent fixing required since the order of 24 July 2025.`,
    h1: 'The VTC sticker: permanent markings, temporary sticker and where they go',
    intro: 'A 2017 order, lightly amended in 2025, covers it all: who prints it, where it goes and when it stops counting.',
    resume: `Markings for VTC (licensed private-hire) cars in France are governed by the order of 6 April 2017, in the version in force since ${den(S.version_vigueur)}. They consist of two red self-adhesive stickers, printed by the Imprimerie nationale (the state printing works) and ordered from the operator’s account on the VTC register, for about €${A.vignette_environ} according to service-public. One goes in the bottom left corner of the windscreen, the other in the bottom right corner of the rear window. Since the order of 24 July 2025, they must be stuck on permanently, so that they cannot come off without being destroyed. Each sticker shows the operator’s register number, the car’s registration number, a two-dimensional barcode and a reference number. While waiting for the permanent stickers, a temporary paper version is valid for ${A.vignette_temporaire_jours} days at most. The markings stop being valid when the car no longer complies or the register entry expires.`,
    faqs: [
      { q: 'Where exactly does the VTC sticker go on a left-hand-drive car?', a: 'Article 4 of the order of 6 April 2017 sets two places: the bottom left corner of the front windscreen, on the driver’s side in a French car, and the bottom right corner of the rear window. The temporary paper version goes bottom left on the windscreen. The order provides no other position, so a right-hand-drive car brought from the UK still takes the sticker on the left.' },
      { q: 'How long does the temporary VTC sticker last?', a: `Service-public gives a maximum of ${A.vignette_temporaire_jours} days; the register site describes a PDF valid for one month, emailed as soon as you pay. It covers you while the permanent stickers are posted, or after an update to your registration such as adding a car. Once it lapses without permanent stickers fitted, the car is no longer marked.` },
      { q: 'What did the July 2025 order change about VTC stickers?', a: `One thing, but a visible one. In the first paragraph of article 4 of the 2017 order, the word “apposées” (placed) was replaced by “stuck on permanently without destroying the stickers”. Published in the Official Journal on ${den(S.arrete_2025_jo)}, it requires fixed placement. A sticker peeled off and moved from car to car no longer complies.` },
      { q: 'Do I need new stickers if I switch to a different car?', a: `Yes. Each set is issued for a car approved on the register and carries its registration number. A new car means updating your account within ${A.changement_registre_jours} days and placing a new order, about €${A.vignette_environ}. The old markings stop counting for a car that no longer meets the rules or is no longer listed under your registration.` },
      { q: 'Is the sticker for a motorbike taxi the same colour?', a: 'No. Service-public distinguishes the red sticker for VTC cars from the blue sticker for two- and three-wheeled motor vehicles (VMDTR), the French term for motorbike taxis. Both are ordered from the register account. The vehicle rules differ too, with power and age limits specific to two-wheelers set out on service-public’s page about the trade.' },
    ],
    body: (h) => `
<h2>The governing text</h2>
<p>Everything sits in an order of seven articles plus an annex: the ${h.src('arreteSignaletique', 'order of 6 April 2017 on VTC vehicle markings')}. The current version dates from ${h.date(S.version_vigueur)}, after a single amendment, the ${h.src('arreteSignaletique2025', 'order of 24 July 2025')}, published in the Official Journal on ${h.date(S.arrete_2025_jo)}. What follows goes through both texts article by article, with service-public’s page ${h.src('spVtc', 'F31027')} for price and colour.</p>

<h2>What counts as markings</h2>
<p>Article 1 defines the markings as stickers matching the model in the annex, produced by the Imprimerie nationale. They come in two forms:</p>
<ul>
<li><strong>permanent markings</strong>: two self-adhesive stickers, red for a car according to service-public;</li>
<li><strong>temporary markings</strong>: a document printed on plain paper from an electronic template.</li>
</ul>
<p>The annex lists the ${S.annexe_champs} vehicle-specific items printed on each sticker:</p>
${h.table(['Item', 'Purpose'], [
  ['Operator’s register number', 'links the car to an authorised business'],
  ['Vehicle registration number', 'stops the sticker moving between cars'],
  ['Two-dimensional barcode', 'allows a quick scan at a roadside check'],
  ['Reference number', 'identifies the sticker itself'],
], 'Annex to the order of 6 April 2017')}
<p>That is what separates the official sticker from a logo. It is personal to one operator and one car, and a “VTC” badge bought online has no legal value at all.</p>

<h2>Ordering and delivery</h2>
<p>Article 2 ties the markings to the register: permanent stickers are issued for each car approved under the operator’s entry. You order them from your account on the ${h.src('registreAide', 'VTC register')}, in the sticker-ordering section, once your registration is accepted. Service-public puts the cost at about ${h.eur(A.vignette_environ)}.</p>
<p>Temporary markings are issued straight after payment, to bridge the wait for permanent stickers or an update to your registration such as adding a car. The register site emails them as a PDF; print it and place it behind the windscreen. The site works in French only, so keep a translation tool handy the first time.</p>

<h2>Where and how to stick them</h2>
<p>Article 4 fixes the positions with no alternative:</p>
<ul>
<li>one sticker in the bottom left corner of the front windscreen;</li>
<li>one in the bottom right corner of the rear window;</li>
<li>the temporary version, bottom left on the windscreen.</li>
</ul>
<p>Since ${h.date(S.version_vigueur)}, both permanent stickers must be “stuck on permanently without destroying the stickers”. The 2025 order changed only those words, yet they end a habit: fitting the sticker removably so it could come off after hours or move to another car. The professional card is a separate document, displayed on the windscreen while working and removable afterwards, as explained on our ${h.a('carte-vtc', 'VTC card')} page.</p>

<h2>When the sticker stops counting</h2>
<p>Article 3 gives three end points for permanent markings:</p>
<ol>
<li>the car no longer meets the technical requirements, for example a petrol car reaching seven years old;</li>
<li>the operator’s register entry expires, after ${A.registre_validite_ans} years at most;</li>
<li>the temporary authorisation to use the car comes to an end.</li>
</ol>
<p>Temporary markings last ${A.vignette_temporaire_jours} days at most, according to service-public. The calculator counts how many orders to expect over one registration period: one per declared car, plus one for each change of car.</p>

<h2>New car, renewed registration</h2>
<p>Because it carries the registration number, the sticker never follows the driver; it stays with the car. A change of car is declared in your register account within ${A.changement_registre_jours} days, followed by a new order. That is a recurring cost worth counting if you rent cars for short periods, and our page on ${h.a('location-voiture-vtc', 'renting a VTC car')} builds it into the comparison.</p>
<p>When the registration is renewed, every ${A.registre_validite_ans} years, markings tied to the old entry also lapse, so plan the order into your ${h.a('registre-vtc', 'register')} timetable. The ${h.a('calendrier-renouvellement', 'renewal calendar')} gives the dates from your registration.</p>

<h2>Motorbike taxis: the blue sticker</h2>
<p>Two- and three-wheeled motor vehicles, VMDTR in French, use the same register but a blue sticker according to service-public. The vehicle rules are specific to two-wheelers and appear on the same service-public page.</p>

<h2>What the sticker does not replace</h2>
<p>The sticker shows that the car belongs to a registered business. It does not stand in for the driver’s professional card, the advance booking every ride requires, or the business’s insurance. Our ${h.a('devenir-chauffeur-vtc', 'route to becoming a VTC driver')} puts those duties in order.</p>
`,
  },
});
