/**
 * Coût d'accès au métier, véhicule conforme, calendrier de renouvellement, licence de taxi et
 * salaire d'ambulancier : fonctions pures sur les paramètres 2026.
 *
 * Règle de vérité : un frais réglementé ou publié par l'administration vient des paramètres et
 * porte sa source ; tout prix privé (formation, médecin, véhicule, devis d'institut) est une
 * saisie du visiteur, jamais une valeur du site.
 */
import { P } from './params';

/* ───────────────────────── Coût d'accès ───────────────────────── */

export type MetierAcces = 'vtc' | 'taxi' | 'ambulancier';
export interface AccesInput {
  metier: MetierAcces;
  formation: number; medecin: number; psc1?: number;
  /** VTC : le véhicule n'est ni à vous ni loué plus de 6 mois → garantie financière par véhicule. */
  garantieFinanciere?: boolean;
  /** Dépenses de démarrage déclarées par le visiteur : apport ou premier loyer du véhicule, assurance, équipements. */
  demarrage: number;
  /** Taxi : prix d'achat de la licence (0 si gratuite ou louée). */
  licence?: number;
}
export interface Ligne { id: string; montant: number; regle: boolean }
export interface AccesResult { lignes: Ligne[]; reglementes: number; prives: number; total: number }

export function coutAcces(i: AccesInput): AccesResult {
  const A = P.acces, pos = (x?: number) => Math.max(0, x ?? 0);
  const lignes: Ligne[] = [];
  const add = (id: string, montant: number, regle: boolean) => { if (montant > 0 || regle) lignes.push({ id, montant, regle }); };
  if (i.metier === 'ambulancier') {
    add('formation', pos(i.formation), false);
    add('medecin', pos(i.medecin), false);
    add('demarrage', pos(i.demarrage), false);
  } else {
    add('formation', pos(i.formation), false);
    add('examen', A.examen_complet, true);
    add('medecin', pos(i.medecin), false);
    add('carte', A.carte_pro_environ, true);
    if (i.metier === 'vtc') {
      add('registre', A.registre_inscription, true);
      add('vignette', A.vignette_environ, true);
      if (i.garantieFinanciere) add('garantie', A.garantie_financiere_par_vehicule, true);
    } else {
      add('psc1', pos(i.psc1), false);
      add('licence', pos(i.licence), false);
    }
    add('demarrage', pos(i.demarrage), false);
  }
  const reglementes = lignes.filter((l) => l.regle).reduce((s, l) => s + l.montant, 0);
  const prives = lignes.filter((l) => !l.regle).reduce((s, l) => s + l.montant, 0);
  return { lignes, reglementes, prives, total: reglementes + prives };
}

/* ───────────────────────── Véhicule VTC conforme ───────────────────────── */

export type Motorisation = 'thermique' | 'hybride' | 'electrique';
export interface VehiculeInput { motorisation: Motorisation; ageMois: number; portes: number; longueur: number; largeur: number; puissanceKw: number; places: number; collection?: boolean }
export type Statut = 'ok' | 'ko' | 'exempte';
export interface Critere { id: 'places' | 'age' | 'portes' | 'longueur' | 'largeur' | 'puissance'; statut: Statut; valeur: number; seuil: number }

/** Critères de l'arrêté du 26 mars 2015 (âge, portes, dimensions, puissance), dont les véhicules
 *  hybrides et électriques sont exemptés (art. 2), et nombre de places (service-public F31027). */
export function verifierVehicule(v: VehiculeInput): { criteres: Critere[]; conforme: boolean } {
  const V = P.vehicule_vtc;
  const exempt = v.motorisation !== 'thermique';
  const c = (id: Critere['id'], ok: boolean, valeur: number, seuil: number, exemptable = true): Critere =>
    ({ id, statut: exemptable && exempt ? 'exempte' : ok ? 'ok' : 'ko', valeur, seuil });
  const criteres = [
    c('places', v.places >= V.places_min && v.places <= V.places_max, v.places, V.places_max, false),
    c('age', v.collection === true || v.ageMois < V.age_max_ans * 12, v.ageMois, V.age_max_ans * 12),
    c('portes', v.portes >= V.portes_min, v.portes, V.portes_min),
    c('longueur', v.longueur >= V.longueur_min_m, v.longueur, V.longueur_min_m),
    c('largeur', v.largeur >= V.largeur_min_m, v.largeur, V.largeur_min_m),
    c('puissance', v.puissanceKw >= V.puissance_min_kw, v.puissanceKw, V.puissance_min_kw),
  ];
  return { criteres, conforme: criteres.every((x) => x.statut !== 'ko') };
}

/** Âge en mois révolus entre une première immatriculation (année, mois 1-12) et une date ISO. */
export function ageEnMois(annee: number, mois: number, aujourdhui: string): number {
  const [y, m] = aujourdhui.split('-').map(Number);
  return Math.max(0, (y - annee) * 12 + (m - mois));
}

/** Date limite d'utilisation en VTC d'un véhicule thermique : moins de 7 ans après la 1re immatriculation. */
export function finUsageVtc(annee: number, mois: number): { annee: number; mois: number } {
  return { annee: annee + P.vehicule_vtc.age_max_ans, mois };
}

/* ───────────────────────── Calendrier de renouvellement ───────────────────────── */

export interface Echeance { id: 'fin_carte' | 'formation' | 'registre' | 'certificat'; date: string }
const addMonths = (iso: string, n: number) => {
  const [y, m, d] = iso.split('-').map(Number);
  const t = new Date(Date.UTC(y, m - 1 + n, 1));
  const last = new Date(Date.UTC(t.getUTCFullYear(), t.getUTCMonth() + 1, 0)).getUTCDate();
  return new Date(Date.UTC(t.getUTCFullYear(), t.getUTCMonth(), Math.min(d, last))).toISOString().slice(0, 10);
};
export { addMonths };

/** Échéances d'un chauffeur à partir de la date de délivrance de sa carte (et de son inscription au
 *  registre pour un VTC) : carte valable 5 ans, stage de 14 heures à faire au plus tard 3 mois avant. */
export function calendrier(o: { metier: 'vtc' | 'taxi'; carte: string; registre?: string }): Echeance[] {
  const A = P.acces;
  const fin = addMonths(o.carte, A.carte_validite_ans * 12);
  const out: Echeance[] = [
    { id: 'formation', date: addMonths(fin, -A.formation_continue_avant_mois) },
    { id: 'fin_carte', date: fin },
  ];
  if (o.metier === 'vtc' && o.registre) out.push({ id: 'registre', date: addMonths(o.registre, A.registre_validite_ans * 12) });
  return out.sort((a, b) => a.date.localeCompare(b.date));
}

/** Nombre de jours entre deux dates ISO (positif si `b` est après `a`). */
export function joursEntre(a: string, b: string): number {
  return Math.round((Date.parse(`${b}T00:00:00Z`) - Date.parse(`${a}T00:00:00Z`)) / 86_400_000);
}

/* ───────────────────────── Licence de taxi (ADS) ───────────────────────── */

/** Mensualité d'un prêt amortissable (taux annuel en fraction, durée en années). */
export function mensualite(capital: number, tauxAnnuel: number, annees: number): number {
  const n = Math.round(Math.max(0, annees) * 12);
  if (capital <= 0 || n === 0) return 0;
  const r = Math.max(0, tauxAnnuel) / 12;
  return r === 0 ? capital / n : (capital * r) / (1 - (1 + r) ** -n);
}

/** Achat financé contre location : coût mensuel, coût total des intérêts et nombre d'années de loyer
 *  qui égalent le prix d'achat (sans tenir compte d'une revente, que l'on ne peut pas prévoir). */
export function achatOuLocation(o: { prix: number; apport: number; taux: number; annees: number; loyer: number }) {
  const capital = Math.max(0, o.prix - Math.max(0, o.apport));
  const m = mensualite(capital, o.taux, o.annees);
  const interets = m * Math.round(o.annees * 12) - capital;
  const anneesLoyer = o.loyer > 0 ? o.prix / (o.loyer * 12) : 0;
  return { capital, mensualite: m, interets, ecartMensuel: m - o.loyer, anneesLoyer };
}

/* ───────────────────────── Salaire d'ambulancier ───────────────────────── */

export type NiveauAmbulancier = 1 | 2 | 3;
/** Taux horaire garanti à l'embauche (avenant n° 8 du 6 mai 2025), relevé au Smic quand il est inférieur. */
export function tauxHoraireAmbulancier(niveau: NiveauAmbulancier): { conventionnel: number; applique: number; smicApplique: boolean } {
  const A = P.ambulancier;
  const conventionnel = niveau === 1 ? A.taux_horaire_niveau1 : niveau === 2 ? A.taux_horaire_niveau2 : A.taux_horaire_niveau3;
  const applique = Math.max(conventionnel, A.smic_horaire);
  return { conventionnel, applique, smicApplique: applique > conventionnel };
}

/** Brut mensuel minimal pour un nombre d'heures payées et de dimanches ou jours fériés travaillés.
 *  Ne compte ni heures supplémentaires majorées, ni ancienneté, ni primes d'entreprise. */
export function brutAmbulancier(niveau: NiveauAmbulancier, heures: number, dimanches: number) {
  const t = tauxHoraireAmbulancier(niveau);
  const base = t.applique * Math.max(0, heures);
  const indemnites = Math.max(0, dimanches) * P.ambulancier.indemnite_dimanche_ferie;
  return { ...t, base, indemnites, brut: base + indemnites };
}

/* ───────────────────────── Examen T3P ───────────────────────── */

export type Epreuve = { code: string; coef: number; eliminatoire: number };
/** Moyenne pondérée de l'admissibilité et motif d'échec éventuel (règlement CMA, art. II). */
export function moyenneAdmissibilite(epreuves: Epreuve[], notes: number[]) {
  let s = 0, c = 0; const eliminees: string[] = [];
  epreuves.forEach((e, k) => { const n = Math.min(20, Math.max(0, notes[k] ?? 0)); s += n * e.coef; c += e.coef; if (n < e.eliminatoire) eliminees.push(e.code); });
  const moyenne = c ? Math.round((s / c) * 100) / 100 : 0;
  return { moyenne, eliminees, admissible: moyenne >= P.examen.admissibilite_moyenne && eliminees.length === 0 };
}
