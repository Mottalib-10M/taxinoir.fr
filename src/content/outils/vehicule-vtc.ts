import { defineGuide } from '../../lib/guide-types';
import { P } from '../../lib/engine/params';

const V = P.vehicule_vtc;

export default defineGuide({
  id: 'vehicule-vtc',
  group: 'outils',
  order: 40,
  tool: 'vehicule',
  related: ['devenir-chauffeur-vtc', 'registre-vtc', 'carte-vtc', 'revenu-net-chauffeur', 'cout-acces-metier'],
  sources: ['arreteVehicule', 'spVtc', 'ctL3120', 'arreteSignaletique', 'registreAide'],
  fr: {
    slug: 'vehicule-vtc-conforme',
    nav: 'Véhicule VTC conforme',
    card: 'Âge, dimensions, puissance, portes et places : le contrôle critère par critère.',
    title: 'Véhicule VTC conforme 2026 : âge, dimensions, puissance',
    description: `Véhicule VTC en 2026 : moins de ${V.age_max_ans} ans, ${V.portes_min} portes, ${V.longueur_min_m.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} m sur ${V.largeur_min_m.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} m, ${V.puissance_min_kw} kW, sauf hybride ou électrique. Vérifiez votre propre voiture, critère par critère.`,
    h1: 'Votre voiture peut-elle rouler en VTC ? Le contrôle des critères',
    intro: 'Cinq critères dans un arrêté de 2015, une exemption pour les hybrides et les électriques, et un nombre de places.',
    resume: `Une voiture de transport avec chauffeur doit avoir moins de ${V.age_max_ans} ans, sauf véhicule de collection, compter au moins ${V.portes_min} portes, mesurer au moins ${V.longueur_min_m.toLocaleString('fr-FR')} mètres de long et ${V.largeur_min_m.toLocaleString('fr-FR')} mètre de large, et disposer d’un moteur d’au moins ${V.puissance_min_kw} kilowatts de puissance nette. Ces cinq critères viennent de l’article 1er de l’arrêté du 26 mars 2015, dans sa version en vigueur depuis le 6 décembre 2023. Son article 2 en exempte entièrement les véhicules hybrides et électriques : une citadine électrique courte et peu puissante peut donc être exploitée en VTC, alors qu’une berline diesel de huit ans ne le peut plus. Service-public ajoute que la voiture compte entre ${V.places_min} et ${V.places_max} places, conducteur compris. Le vérificateur reprend uniquement ces critères, lus dans le texte, et calcule la date à laquelle un véhicule thermique cessera d’être utilisable.`,
    faqs: [
      { q: 'Une voiture hybride doit-elle respecter la longueur minimale pour faire du VTC ?', a: `Non. L’article 2 de l’arrêté du 26 mars 2015 écarte les véhicules hybrides et électriques de l’ensemble de l’article 1er : âge, nombre de portes, longueur de ${V.longueur_min_m.toLocaleString('fr-FR')} m, largeur de ${V.largeur_min_m.toLocaleString('fr-FR')} m et puissance de ${V.puissance_min_kw} kW. Restent les obligations communes : nombre de places, contrôle technique annuel, assurance professionnelle et signalétique VTC.` },
      { q: 'Où trouver la puissance nette en kilowatts de ma voiture ?', a: `Sur le certificat d’immatriculation, à la rubrique P.2, qui indique la puissance nette maximale en kilowatts. Ne la confondez pas avec la puissance fiscale en chevaux (rubrique P.6), qui sert au calcul de la taxe et n’a rien à voir avec le seuil de ${V.puissance_min_kw} kW fixé par l’arrêté pour les véhicules thermiques.` },
      { q: 'Que se passe-t-il quand ma voiture thermique atteint sept ans ?', a: `Elle ne remplit plus la condition d’âge de l’arrêté, qui exige un véhicule de moins de ${V.age_max_ans} ans : il faut la remplacer pour continuer, ou passer à un hybride ou à un électrique, exemptés de cette limite. Le registre rappelle que la signalétique n’est plus valide lorsque le véhicule déclaré cesse d’être conforme : la vignette suit la voiture, pas le conducteur.` },
    ],
    body: (h) => `
<h2>Les critères, tels que le texte les écrit</h2>
${h.table(['Critère', 'Exigence', 'Hybride ou électrique', 'Texte'], [
  ['Âge', `moins de ${V.age_max_ans} ans`, 'exempté', 'arrêté du 26 mars 2015, art. 1er'],
  ['Portes', `au moins ${V.portes_min}`, 'exempté', 'art. 1er'],
  ['Longueur hors tout', `au moins ${h.num(V.longueur_min_m, 2)} m`, 'exempté', 'art. 1er'],
  ['Largeur hors tout', `au moins ${h.num(V.largeur_min_m, 2)} m`, 'exempté', 'art. 1er'],
  ['Puissance nette', `au moins ${V.puissance_min_kw} kW`, 'exempté', 'art. 1er'],
  ['Places', `${V.places_min} à ${V.places_max}, conducteur compris`, 'applicable', 'service-public, F31027'],
], 'Exemption : article 2 de l’arrêté')}
<p>Le texte complet est sur Légifrance : ${h.src('arreteVehicule')}. Le vérificateur ne retient aucun autre critère : pas de couleur imposée, pas de gamme de modèle, pas de liste de marques. Une affirmation de ce type, lue ailleurs, n’a pas de base dans ce texte.</p>

<h2>Le calcul de l’âge</h2>
<p>L’âge se compte depuis la première immatriculation, en mois révolus : une voiture immatriculée en mars d’une année ne remplit plus la condition à partir de mars, sept ans plus tard. Le vérificateur affiche ce mois pour un véhicule thermique, ce qui permet de prévoir la durée d’un crédit ou d’une location longue durée sans dépasser la date limite. Il calcule à partir de la date du jour de votre navigateur.</p>

<h2>Ce qui reste obligatoire pour tous</h2>
<p>La voiture passe un contrôle technique chaque année, à votre initiative, sans convocation. Elle porte la vignette VTC commandée sur le ${h.a('registre-vtc', 'registre')}, à l’avant et à l’arrière, et aucun dispositif lumineux extérieur, réservé aux taxis. Elle est couverte par une assurance responsabilité civile professionnelle. Pour une moto ou un trois-roues (VMDTR), les seuils sont différents : ${V.vmdtr_puissance_min_kw} kW et moins de ${V.vmdtr_age_max_ans} ans selon service-public.</p>

<h2>Choisir avec le budget en tête</h2>
<p>Le vérificateur dit si une voiture est admise, pas si elle est rentable. Le coût mensuel du crédit ou de la location, le carburant ou la recharge et l’assurance se reportent dans le ${h.a('revenu-net-chauffeur', 'simulateur de revenu net')}, qui montre ce qu’ils laissent par heure de travail.</p>
`,
  },
  en: {
    slug: 'vtc-vehicle-requirements',
    nav: 'VTC vehicle check',
    card: 'Age, size, power, doors and seats: checked one by one.',
    title: 'VTC Vehicle Requirements France 2026: Age, Size, Power',
    description: `VTC car rules in France, 2026: under ${V.age_max_ans} years old, ${V.portes_min} doors, ${V.longueur_min_m.toLocaleString('en-GB', { minimumFractionDigits: 2 })} m by ${V.largeur_min_m.toLocaleString('en-GB', { minimumFractionDigits: 2 })} m, ${V.puissance_min_kw} kW, unless hybrid or electric. Check your own car against each rule here.`,
    h1: 'Can your car work as a VTC? Checking each requirement',
    intro: 'Five criteria in a 2015 order, an exemption for hybrids and electric cars, and a seat count.',
    resume: `In France, a VTC (licensed private-hire car) must be under ${V.age_max_ans} years old unless it is a classic, have at least ${V.portes_min} doors, measure at least ${V.longueur_min_m.toLocaleString('en-GB')} metres long and ${V.largeur_min_m.toLocaleString('en-GB')} metres wide, and have an engine of at least ${V.puissance_min_kw} kilowatts net power. These five criteria come from article 1 of the order of 26 March 2015, in the version in force since 6 December 2023. Article 2 exempts hybrid and electric vehicles from all of them, so a short, low-powered electric hatchback may be used as a VTC while an eight-year-old diesel saloon may not. Service-public adds that the car must seat between ${V.places_min} and ${V.places_max} people, driver included. The checker uses only those criteria, read in the text itself, and works out the month a petrol or diesel car stops qualifying.`,
    faqs: [
      { q: 'Does a hybrid car need to meet the minimum length to work as a VTC?', a: `No. Article 2 of the order of 26 March 2015 exempts hybrid and electric vehicles from the whole of article 1: age, number of doors, ${V.longueur_min_m.toLocaleString('en-GB')} m length, ${V.largeur_min_m.toLocaleString('en-GB')} m width and ${V.puissance_min_kw} kW power. The common duties still apply: seat count, yearly roadworthiness test, professional insurance and VTC markings.` },
      { q: 'Where do I find my car’s net power in kilowatts?', a: `On the French registration document (carte grise), in box P.2, which shows maximum net power in kilowatts. Do not confuse it with fiscal horsepower in box P.6, which is used for tax and has nothing to do with the ${V.puissance_min_kw} kW threshold the order sets for petrol and diesel cars.` },
      { q: 'What happens when my petrol or diesel car turns seven?', a: `It no longer meets the age rule, which requires a vehicle under ${V.age_max_ans} years old: you must replace it to keep working, or switch to a hybrid or electric car, which are exempt. The register points out that the VTC markings stop being valid once the declared vehicle no longer complies, because the sticker belongs to the car, not the driver.` },
    ],
    body: (h) => `
<h2>The criteria, as the text sets them</h2>
${h.table(['Criterion', 'Requirement', 'Hybrid or electric', 'Text'], [
  ['Age', `under ${V.age_max_ans} years`, 'exempt', 'order of 26 March 2015, art. 1'],
  ['Doors', `at least ${V.portes_min}`, 'exempt', 'art. 1'],
  ['Overall length', `at least ${h.num(V.longueur_min_m, 2)} m`, 'exempt', 'art. 1'],
  ['Overall width', `at least ${h.num(V.largeur_min_m, 2)} m`, 'exempt', 'art. 1'],
  ['Net power', `at least ${V.puissance_min_kw} kW`, 'exempt', 'art. 1'],
  ['Seats', `${V.places_min} to ${V.places_max}, driver included`, 'applies', 'service-public, F31027'],
], 'Exemption: article 2 of the order')}
<p>The full text is on Légifrance: ${h.src('arreteVehicule')}. The checker applies nothing else: no required colour, no model class, no brand list. Any such claim you read elsewhere has no basis in this text.</p>

<h2>Working out the age</h2>
<p>Age runs from first registration, in completed months: a car first registered in March stops qualifying in March seven years later. For a petrol or diesel car, the checker shows that month, which helps you match a loan or lease to the time the car can still be used. It counts from today’s date in your browser.</p>

<h2>What applies to every vehicle</h2>
<p>The car has a roadworthiness test (contrôle technique) every year, on your own initiative, with no reminder. It carries the VTC sticker ordered from the ${h.a('registre-vtc', 'register')}, front and back, and no roof light, which is reserved for taxis. It is covered by professional liability insurance. Motorbikes and three-wheelers (VMDTR) have different thresholds: ${V.vmdtr_puissance_min_kw} kW and under ${V.vmdtr_age_max_ans} years according to service-public.</p>

<h2>Choosing with the budget in mind</h2>
<p>The checker tells you whether a car is allowed, not whether it pays. Monthly loan or lease costs, fuel or charging and insurance go into the ${h.a('revenu-net-chauffeur', 'net income calculator')}, which shows what is left per hour worked.</p>
`,
  },
});
