import { defineGuide } from '../../lib/guide-types';
import { P } from '../../lib/engine/params';
import { formatMoney } from '../../lib/format';

const A = P.acces;
const AS = P.assurance;
const fe = (n: number, l: 'fr' | 'en') => formatMoney(n, 0, l);

export default defineGuide({
  id: 'assurance-vtc',
  group: 'vtc',
  order: 80,
  mini: 'assuranceVtc',
  related: ['registre-vtc', 'devenir-chauffeur-vtc', 'location-voiture-vtc', 'voiture-vtc', 'revenu-net-chauffeur'],
  sources: ['ctL3120', 'ctR3122', 'spVtc', 'spAssuranceAuto', 'spAssurancePro', 'registreAide', 'uberConditions'],
  fr: {
    slug: 'assurance-vtc',
    nav: 'Assurance VTC',
    card: 'Les deux garanties exigées, les textes, l’amende et le coût réel par heure.',
    title: 'Assurance VTC 2026 : RC circulation, RC pro et obligations',
    description: `Assurance VTC 2026 : responsabilité civile du véhicule et RC professionnelle (article L3120-4), attestation exigée au registre, amende jusqu’à ${fe(A.amende_sans_assurance, 'fr')}.`,
    h1: 'Assurance VTC : ce que la loi impose, et ce que cela coûte',
    intro: 'Deux garanties, deux textes différents, et une attestation que le registre réclame avant toute course.',
    resume: `Un chauffeur VTC doit être couvert par deux garanties distinctes. La première est l’assurance de responsabilité civile du véhicule, obligatoire pour toute voiture qui circule selon les articles L324-1 et L324-2 du code de la route ; elle doit être souscrite pour un usage de transport de personnes à titre onéreux, ce que les plateformes vérifient sur l’attestation. La seconde est la responsabilité civile professionnelle : l’article L3120-4 du code des transports oblige toute personne qui transporte des passagers contre paiement dans une voiture de moins de dix places à pouvoir en justifier à tout moment, et l’article R3122-1 fait de son attestation une pièce du dossier d’inscription au registre des VTC. Rouler sans assurance est un délit puni d’une amende de ${fe(A.amende_sans_assurance, 'fr')} selon service-public. Aucun barème public ne fixe les primes : le mini-simulateur part de vos devis pour les ramener à l’heure de travail.`,
    faqs: [
      { q: 'Mon assurance auto personnelle suffit-elle pour faire du VTC ?', a: 'Non. Un contrat souscrit pour un usage privé ou trajet-travail ne prévoit pas le transport de passagers payants, et les plateformes demandent une attestation d’assurance « à titre onéreux » au moment de l’inscription. Il faut aussi une responsabilité civile professionnelle, exigée par l’article L3120-4 du code des transports et réclamée par le registre des VTC. Déclarez à l’assureur l’usage réel du véhicule avant la première course.' },
      { q: 'RC exploitation, RC circulation : quelle différence pour un chauffeur VTC ?', a: 'La RC circulation couvre les dommages causés par la voiture qui roule : c’est l’assurance auto obligatoire des articles L324-1 et L324-2 du code de la route. La RC exploitation, ou professionnelle, couvre les dommages causés dans l’exercice du métier en dehors de la conduite elle-même. Uber écrit sur sa page de conditions que les deux sont obligatoires ; le code des transports impose la seconde en toutes lettres.' },
      { q: `Que risque un VTC contrôlé sans assurance en 2026 ?`, a: `Le défaut d’assurance est un délit puni de ${fe(A.amende_sans_assurance, 'fr')} d’amende. Service-public mentionne aussi des peines complémentaires : suspension du permis jusqu’à ${AS.suspension_permis_max_ans} ans, annulation, immobilisation ou confiscation du véhicule, travail d’intérêt général. Dans certains cas, la procédure se règle par une amende forfaitaire de ${fe(AS.amende_forfaitaire_sans_assurance, 'fr')}. Pour un chauffeur VTC, perdre le permis signifie aussi perdre le droit d’exercer.` },
      { q: 'Combien coûte une assurance VTC par an ?', a: 'Aucune source publique ne publie de tarif de référence : chaque assureur fixe sa prime selon le véhicule, le lieu d’exercice, l’ancienneté du permis et le bonus. Nous ne donnons donc pas de chiffre. Demandez au moins deux devis pour la voiture, en usage transport à titre onéreux, et un pour la responsabilité civile professionnelle, puis entrez-les dans le mini-simulateur pour voir leur poids par heure de travail.' },
      { q: 'Un chauffeur VTC salarié doit-il payer sa propre assurance ?', a: 'En principe non. L’article L3120-4 vise la personne qui fournit la prestation de transport, donc l’exploitant inscrit au registre : quand une société vous emploie, c’est elle qui assure la voiture et son activité. Heetch, par exemple, ne demande aucun document de véhicule à un chauffeur employé. Vérifiez néanmoins votre contrat de travail : il doit préciser qui assure le véhicule que vous conduisez.' },
    ],
    body: (h) => `
<h2>Deux garanties, deux textes</h2>
<p>On parle souvent de « l’assurance VTC » au singulier. En réalité, deux obligations se superposent, et elles ne viennent pas du même code.</p>
<p>La première est commune à tous les automobilistes : un véhicule qui circule doit être couvert au minimum par une garantie de responsabilité civile, l’assurance dite « au tiers ». Elle indemnise les victimes des dommages causés par la voiture. Service-public la présente sur sa fiche ${h.src('spAssuranceAuto', 'assurance auto obligatoire')}, en renvoyant aux articles L324-1 et L324-2 du code de la route. Pour un VTC, la particularité tient à l’usage déclaré : la voiture transporte des clients qui paient. Le contrat doit le prévoir.</p>
<p>La seconde est propre au transport de personnes. L’${h.src('ctL3120', 'article L3120-4 du code des transports')} dispose que les personnes qui transportent des passagers à titre onéreux dans un véhicule de moins de dix places doivent être en mesure de justifier à tout moment d’un contrat couvrant leur responsabilité civile professionnelle. Le texte s’applique aux taxis comme aux VTC. Service-public le répète sur sa fiche ${h.src('spVtc', 'devenir chauffeur de VTC')} : il faut assurer l’entreprise, pas seulement la voiture.</p>
${h.table(['Garantie', 'Ce qu’elle couvre', 'Texte', 'Qui la demande'], [
  ['Responsabilité civile du véhicule', 'dommages causés par la voiture en circulation', 'code de la route, L324-1 et L324-2', 'la loi, les plateformes (attestation à titre onéreux)'],
  ['Responsabilité civile professionnelle', 'dommages causés dans l’exercice de l’activité de transport', 'code des transports, L3120-4', 'la loi, le registre des VTC (R3122-1)'],
], 'Les deux obligations d’assurance d’un exploitant VTC')}

<h2>L’attestation, pièce du registre</h2>
<p>Sans attestation, pas d’inscription. L’${h.src('ctR3122', 'article R3122-1')} énumère les pièces du dossier déposé au registre des exploitants de VTC, et l’attestation d’assurance couvrant la responsabilité civile professionnelle en fait partie. Le ${h.src('registreAide', 'site du registre')} rappelle la même exigence. Ce document doit donc être prêt avant même de demander l’inscription, c’est-à-dire avant la première course : on ne peut pas « s’assurer plus tard ».</p>
<p>L’attestation suit la vie de l’entreprise. Un changement d’assureur, de véhicule ou d’adresse se déclare dans le compte du registre dans les ${A.changement_registre_jours} jours, comme l’explique la page sur le ${h.a('registre-vtc', 'registre des VTC')}. Une attestation expirée laissée dans le dossier n’annule pas l’inscription du jour au lendemain, mais elle ne protège plus personne.</p>

<h2>Ce que les plateformes réclament</h2>
<p>Les applications ajoutent leurs propres contrôles documentaires. Ils ne créent pas d’obligation légale nouvelle, mais ils conditionnent l’accès au compte. Au 4 octobre 2026 :</p>
<ul>
<li>la ${h.src('uberConditions', 'page de conditions d’Uber')} indique que l’assurance RC exploitation et l’assurance RC circulation sont toutes deux obligatoires, et place « assurer son activité et son véhicule » parmi les étapes avant l’inscription au registre ;</li>
<li>le ${h.src('boltDocuments', 'centre d’aide de Bolt')} demande l’attestation de responsabilité civile professionnelle, la carte verte du véhicule et l’attestation d’assurance de transport à titre onéreux ;</li>
<li>le ${h.src('heetchInscription', 'centre d’aide de Heetch')} réclame la RC professionnelle en cours de validité, le mémo d’assurance et l’attestation d’assurance à titre onéreux, sauf pour un chauffeur employé.</li>
</ul>
<p>Le vocabulaire varie d’une plateforme à l’autre, le fond reste le même : un contrat auto qui mentionne le transport payant de passagers, et une responsabilité civile pour l’activité. Ces exigences sont celles que les plateformes publient ; elles peuvent changer, et c’est l’application qui fait foi le jour de votre inscription.</p>

<h2>Rouler sans être assuré : ce que dit le texte</h2>
<p>Le défaut d’assurance du véhicule est un délit. Service-public indique une amende de ${h.eur(A.amende_sans_assurance)}, avec des peines complémentaires possibles : suspension du permis jusqu’à ${AS.suspension_permis_max_ans} ans, annulation avec interdiction de le repasser, immobilisation ou confiscation du véhicule, travail d’intérêt général ou jours-amende. Dans certains cas, une amende forfaitaire de ${h.eur(AS.amende_forfaitaire_sans_assurance)} éteint l’action publique.</p>
<p>Pour un chauffeur, la sanction pénale n’est pas le seul danger. Sans assurance, l’indemnisation d’un passager blessé retombe sur l’exploitant. Et un permis suspendu bloque l’activité, puisque la carte professionnelle suppose un permis valide : l’assurance est, littéralement, une condition d’exercice.</p>

<h2>Ce que nous ne publions pas, et pourquoi</h2>
<p>Vous ne trouverez ici aucun « prix moyen de l’assurance VTC ». Aucune administration ni aucun organisme public ne publie de barème : les primes dépendent de l’assureur, du véhicule, de la ville, de l’ancienneté du permis, des sinistres passés et des garanties choisies (bris de glace, vol, perte d’exploitation). Un chiffre unique serait faux pour presque tout le monde.</p>
<p>Le mini-simulateur fait l’inverse : il part de vos devis. Entrez la prime annuelle du véhicule et celle de la responsabilité civile professionnelle, puis vos heures. Il affiche le coût par mois et par heure travaillée, et le nombre de mois de primes qu’égale l’amende maximale. Reportez ensuite le montant mensuel dans le ${h.a('revenu-net-chauffeur', 'simulateur de revenu net')} : c’est là que l’on voit si une prime élevée rend un véhicule trop cher.</p>

<h2>Cas particuliers</h2>
<h3>Voiture louée</h3>
<p>Quand la voiture est louée à un professionnel, l’assurance du véhicule peut être comprise dans le contrat de location. Demandez l’attestation au loueur, avec la mention du transport de personnes à titre onéreux : c’est elle que les plateformes vérifient. La responsabilité civile professionnelle, elle, reste à votre nom, puisqu’elle couvre votre activité. La page ${h.a('location-voiture-vtc', 'location de voiture VTC')} détaille les autres conséquences d’une location, dont la garantie financière.</p>
<h3>Chauffeur salarié</h3>
<p>L’obligation de l’article L3120-4 pèse sur celui qui fournit la prestation, donc sur l’exploitant. Un chauffeur employé par une société inscrite au registre n’a pas à présenter sa propre assurance de véhicule ; Heetch, par exemple, ne demande aucun document de véhicule dans ce cas.</p>
<h3>Taxi</h3>
<p>Le même article s’applique aux taxis. Service-public demande au futur taxi d’assurer son véhicule comme véhicule professionnel et de prendre une responsabilité civile professionnelle, que tous les assureurs peuvent proposer. La fiche ${h.src('spAssurancePro', 'assurances de l’entrepreneur')} décrit aussi la multirisque professionnelle, qui peut regrouper plusieurs garanties dans un seul contrat.</p>

<h2>Avant de signer un contrat</h2>
<ol>
<li>Déclarez l’usage exact : transport de personnes à titre onéreux, pas usage privé ni trajet-travail.</li>
<li>Vérifiez que l’attestation porte bien cette mention, et que la RC professionnelle est un document distinct ou clairement identifié.</li>
<li>Comparez les franchises et l’éventuelle garantie de perte d’exploitation : une voiture immobilisée trois semaines, ce sont trois semaines sans recettes.</li>
<li>Gardez les attestations à jour dans le compte du registre et dans chaque application.</li>
</ol>
<p>Le véhicule lui-même doit répondre aux critères de l’arrêté du 26 mars 2015 : le ${h.a('vehicule-vtc', 'vérificateur de conformité')} les passe en revue, et le guide pour ${h.a('voiture-vtc', 'choisir sa voiture VTC')} y ajoute le coût au kilomètre.</p>
`,
  },
  en: {
    slug: 'vtc-insurance',
    nav: 'VTC insurance',
    card: 'The two covers the law requires, the texts, the fine and the hourly cost.',
    title: 'VTC Insurance France 2026: Motor and Professional Cover',
    description: `VTC insurance in France, 2026: motor cover for paid passengers plus professional liability (article L3120-4), proof needed for the register, fine up to ${fe(A.amende_sans_assurance, 'en')}.`,
    h1: 'Insurance for VTC drivers in France: the legal minimum and its cost',
    intro: 'If you drive paying passengers in France, two separate policies are required, and the register wants proof before your first fare.',
    resume: `Anyone running a VTC (licensed private-hire car) in France needs two distinct covers. The first is motor third-party liability, compulsory for every car on the road under articles L324-1 and L324-2 of the Highway Code, taken out for the specific use of carrying passengers for payment; ride-hailing apps check that wording on the certificate. The second is professional liability (responsabilité civile professionnelle): article L3120-4 of the Transport Code says anyone carrying paying passengers in a vehicle with fewer than ten seats must be able to prove such a contract at any time, and article R3122-1 makes the certificate part of the application to the VTC register. Driving uninsured is a criminal offence carrying a fine of ${fe(A.amende_sans_assurance, 'en')}, according to service-public, the government information site. No public scale sets premiums, so the calculator starts from your own quotes and turns them into a cost per working hour.`,
    faqs: [
      { q: 'Will my existing UK or French private car policy cover VTC work?', a: 'No. A policy written for private or commuting use does not cover carrying paying passengers, and the apps ask for a certificate stating paid passenger transport (à titre onéreux) when you sign up. You also need professional liability cover, required by article L3120-4 of the Transport Code and checked by the VTC register. Tell the insurer exactly how the car will be used before your first fare.' },
      { q: 'What do “RC circulation” and “RC exploitation” mean on a French quote?', a: 'RC circulation is motor liability: damage caused by the car while it is being driven, the compulsory cover under articles L324-1 and L324-2 of the Highway Code. RC exploitation, or professional liability, covers damage caused while carrying on the business outside the driving itself. Uber’s requirements page states that both are compulsory; the Transport Code spells out the second in so many words.' },
      { q: 'What is the penalty for a VTC caught without insurance?', a: `Driving uninsured is a criminal offence with a fine of ${fe(A.amende_sans_assurance, 'en')}. Service-public also lists additional penalties: licence suspension for up to ${AS.suspension_permis_max_ans} years, cancellation, seizure or confiscation of the car, community service. In some cases the matter is settled with a fixed fine of ${fe(AS.amende_forfaitaire_sans_assurance, 'en')}. For a driver, losing the licence also means losing the right to work.` },
      { q: 'Is there an average price for VTC insurance in France?', a: 'Not one we can source. No public body publishes a reference premium: each insurer prices by vehicle, city, years of driving, claims history and chosen extras. Rather than quote a misleading average, we suggest getting at least two quotes for the car, written for paid passenger use, and one for professional liability, then entering them in the calculator above to see their weight per working hour.' },
      { q: 'If a VTC company employs me, do I need my own policy?', a: 'Normally not. Article L3120-4 targets whoever provides the transport service, which means the operator listed on the register: when a company employs you, it insures the car and the business. Heetch, for instance, asks an employed driver for no vehicle documents at all. Your employment contract should still say who insures the car you drive; ask if it does not.' },
    ],
    body: (h) => `
<h2>One phrase, two obligations</h2>
<p>People say “VTC insurance” as if it were a single product. Under French law it is two obligations stacked on top of each other, and they come from different codes.</p>
<p>The first applies to every motorist: a car on the road must carry at least third-party liability, known in France as assurance au tiers, which compensates victims for damage the car causes. Service-public covers it on its page about ${h.src('spAssuranceAuto', 'compulsory car insurance')}, citing articles L324-1 and L324-2 of the Highway Code. What changes for a VTC is the declared use. Your passengers pay, and the contract has to say so.</p>
<p>The second is specific to carrying passengers. ${h.src('ctL3120', 'Article L3120-4 of the Transport Code')} requires anyone who carries passengers for payment in a vehicle with fewer than ten seats to be able to prove, at any time, a contract covering their professional liability. Taxis and VTCs are both concerned. Service-public repeats it on its ${h.src('spVtc', 'guide to becoming a VTC driver')}: you insure the business, not only the car.</p>
${h.table(['Cover', 'What it pays for', 'Legal basis', 'Who checks'], [
  ['Motor liability', 'damage caused by the car in traffic', 'Highway Code, L324-1 and L324-2', 'the law; apps (paid-passenger certificate)'],
  ['Professional liability', 'damage caused while running the transport business', 'Transport Code, L3120-4', 'the law; the VTC register (R3122-1)'],
], 'The two insurance duties of a VTC operator')}

<h2>The certificate the register asks for</h2>
<p>No certificate, no registration. ${h.src('ctR3122', 'Article R3122-1')} lists what goes into the file for the register of VTC operators, and proof of professional liability insurance is one of the items. The ${h.src('registreAide', 'register’s own help page')} says the same. So the policy has to be in place before you even apply, which means before any paid work. There is no “insure it later” option.</p>
<p>Once registered, keep the file current. A new insurer, a new car or a new address must be updated in your register account within ${A.changement_registre_jours} days, as explained on our page about the ${h.a('registre-vtc', 'VTC register')}. An expired certificate sitting in your file does not erase your registration overnight, but it protects nobody.</p>

<h2>What the apps want to see</h2>
<p>Ride-hailing platforms run their own document checks. These are not extra legal duties, but your account will not open without them. As read on 4 October 2026:</p>
<ul>
<li>${h.src('uberConditions', 'Uber’s requirements page')} says both RC exploitation and RC circulation are compulsory, and lists “insure your business and your vehicle” among the steps before joining the register;</li>
<li>${h.src('boltDocuments', 'Bolt’s help centre')} asks for the professional liability certificate, the car’s green card and a certificate of insurance for paid passenger transport;</li>
<li>${h.src('heetchInscription', 'Heetch’s help centre')} asks for valid professional liability cover, the insurance memo and the paid-passenger certificate, except from employed drivers.</li>
</ul>
<p>The words differ, the substance does not: a motor policy that names paid passenger transport, plus liability cover for the business. These are the platforms’ own published requirements; they may change, and the app is the reference on the day you sign up.</p>

<h2>Caught uninsured</h2>
<p>Driving an uninsured car is a criminal offence. Service-public quotes a fine of ${h.eur(A.amende_sans_assurance)}, with possible extra penalties: licence suspension for up to ${AS.suspension_permis_max_ans} years, cancellation with a ban on retaking the test, immobilisation or confiscation of the car, community service or day-fines. In some cases a fixed fine of ${h.eur(AS.amende_forfaitaire_sans_assurance)} closes the case.</p>
<p>The fine is not the worst of it. Without cover, compensating an injured passenger falls on you. And a suspended licence ends your working life for the duration, since the professional card assumes a valid licence. Insurance is, quite literally, a condition of being allowed to work.</p>

<h2>Why we give no average premium</h2>
<p>You will not find a “typical VTC insurance price” on this page. No ministry or public body publishes one. Premiums depend on the insurer, the car, the city, how long you have held a licence, your claims record and the extras you pick, such as glass, theft or loss-of-earnings cover. Newcomers to France also face the question of whether a foreign no-claims record is recognised, which varies by insurer. A single figure would be wrong for nearly everyone.</p>
<p>The calculator works the other way round. Enter the annual premium for the car and for professional liability, then your weekly hours. It shows the monthly cost, the cost per working hour and how many months of premiums the maximum fine represents. Carry the monthly figure into the ${h.a('revenu-net-chauffeur', 'net income calculator')} to see whether an expensive premium makes a given car uneconomic.</p>

<h2>Special situations</h2>
<h3>A hired or leased car</h3>
<p>When you rent the car from a professional, motor cover may be included in the rental. Ask the rental firm for a certificate that mentions paid passenger transport, because that is what the apps check. Professional liability stays in your own name, since it covers your business. Our page on ${h.a('location-voiture-vtc', 'renting or leasing a VTC car')} covers the other consequences, including the financial guarantee.</p>
<h3>Employed drivers</h3>
<p>The L3120-4 duty falls on whoever provides the transport, so on the operator. A driver employed by a registered company does not present a personal motor policy; Heetch, for example, asks for no vehicle documents in that case.</p>
<h3>Taxi drivers</h3>
<p>The same article applies to taxis. Service-public tells future taxi drivers to insure the car as a business vehicle and to take out professional liability cover, which any insurer may offer. Its page on ${h.src('spAssurancePro', 'business insurance')} also describes the multi-risk business policy, which can bundle several covers into one contract.</p>

<h2>A short checklist before you sign</h2>
<ol>
<li>Declare the real use: paid passenger transport, not private or commuting use.</li>
<li>Check the certificate carries that wording, and that professional liability is a separate or clearly labelled document.</li>
<li>Compare excesses and any loss-of-earnings cover: three weeks off the road means three weeks without fares.</li>
<li>Keep certificates current in your register account and in every app.</li>
</ol>
<p>The car itself must meet the order of 26 March 2015: the ${h.a('vehicule-vtc', 'vehicle checker')} goes through each criterion, and our guide to ${h.a('voiture-vtc', 'choosing a VTC car')} adds the cost per kilometre.</p>
`,
  },
});
