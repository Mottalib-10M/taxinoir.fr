/**
 * Véhicule du chauffeur : assurance, financement (achat, LLD, LOA), coût au kilomètre, signalétique VTC.
 * Fonctions pures. Règle de vérité : primes d'assurance, loyers, prix de véhicule, revente et énergie
 * sont des SAISIES du visiteur (aucun barème public ne les fixe) ; seuls les frais et seuils réglementés
 * viennent des paramètres 2026 (amende, garantie financière, durée de location, vignette).
 */
import { P } from './params';
import { mensualite } from './acces';

const pos = (x: number | undefined) => Math.max(0, Number.isFinite(x) ? (x as number) : 0);

/* ───────────────────────── Assurance ───────────────────────── */

/** Coût des deux contrats d'un chauffeur (responsabilité civile circulation du véhicule et
 *  responsabilité civile professionnelle, art. L3120-4 du code des transports), d'après les devis. */
export function coutAssurance(o: { primeVehiculeAn: number; primeProAn: number; heuresSemaine: number; semaines: number }) {
  const annuel = pos(o.primeVehiculeAn) + pos(o.primeProAn);
  const heures = pos(o.heuresSemaine) * Math.min(pos(o.semaines), 52);
  return {
    annuel,
    mensuel: annuel / 12,
    parHeure: heures > 0 ? annuel / heures : 0,
    /** Amende encourue pour défaut d'assurance (service-public F2628 et F31027). */
    amende: P.acces.amende_sans_assurance,
    /** Nombre de mois de primes qu'égale l'amende maximale. */
    moisEgalAmende: annuel > 0 ? P.acces.amende_sans_assurance / (annuel / 12) : 0,
  };
}

/* ───────────────────────── Financement du véhicule ───────────────────────── */

export interface FinancementInput {
  prix: number; apport: number; tauxAnnuel: number; mois: number;
  /** Valeur de revente estimée au terme (saisie). */
  revente: number;
  /** Loyer mensuel d'une location longue durée ou d'une LOA (devis). */
  loyer: number;
  /** Premier loyer majoré éventuel (devis). */
  premierLoyer?: number;
}

/** Achat à crédit contre location, ramenés à un coût mensuel sur la même durée. Le crédit compte
 *  l'apport et les mensualités, moins la revente ; la location compte le premier loyer et les loyers.
 *  Indique aussi si une garantie financière de 1 500 € est due au registre (véhicule ni possédé ni loué
 *  plus de 6 mois, service-public F31027). */
export function comparerFinancement(i: FinancementInput) {
  const mois = Math.max(1, Math.round(pos(i.mois)));
  const apport = Math.min(pos(i.apport), pos(i.prix));
  const capital = pos(i.prix) - apport;
  const m = mensualite(capital, pos(i.tauxAnnuel), mois / 12);
  const interets = m * mois - capital;
  const coutCredit = apport + m * mois - pos(i.revente);
  const coutLocation = pos(i.premierLoyer) + pos(i.loyer) * mois;
  return {
    mensualite: m, interets,
    creditParMois: coutCredit / mois,
    locationParMois: coutLocation / mois,
    ecartParMois: coutLocation / mois - coutCredit / mois,
    garantieDue: mois <= P.acces.location_longue_mois,
    garantie: P.acces.garantie_financiere_par_vehicule,
  };
}

/* ───────────────────────── Coût au kilomètre ───────────────────────── */

export interface CoutKmInput {
  prix: number; revente: number; annees: number; kmAn: number;
  /** Énergie pour 100 km, en euros (carburant ou recharge, saisie). */
  energie100: number;
  assuranceAn: number; entretienAn: number;
}

/** Coût complet au kilomètre : perte de valeur (prix − revente) étalée sur la durée de détention,
 *  énergie, assurance et entretien. Signale une durée de détention qui dépasse la limite d'âge
 *  d'un VTC thermique (moins de 7 ans, arrêté du 26 mars 2015). */
export function coutKm(i: CoutKmInput) {
  const annees = Math.max(0.5, pos(i.annees));
  const km = pos(i.kmAn);
  const depreciation = Math.max(0, pos(i.prix) - pos(i.revente)) / annees;
  const energie = (pos(i.energie100) * km) / 100;
  const total = depreciation + energie + pos(i.assuranceAn) + pos(i.entretienAn);
  return {
    depreciation, energie, total,
    parKm: km > 0 ? total / km : 0,
    parMois: total / 12,
    depasseAgeThermique: annees >= P.vehicule_vtc.age_max_ans,
  };
}

/* ───────────────────────── Signalétique VTC ───────────────────────── */

/** Commandes de signalétique sur la durée d'une inscription au registre (5 ans) : une par véhicule
 *  déclaré, plus une à chaque changement de véhicule (arrêté du 6 avril 2017, art. 2 et 3). */
export function coutSignaletique(o: { vehicules: number; changements: number }) {
  const commandes = Math.round(pos(o.vehicules)) + Math.round(pos(o.changements));
  return {
    commandes,
    total: commandes * P.acces.vignette_environ,
    unitaire: P.acces.vignette_environ,
    temporaireJours: P.acces.vignette_temporaire_jours,
    dureeMaxAns: P.acces.registre_validite_ans,
  };
}
