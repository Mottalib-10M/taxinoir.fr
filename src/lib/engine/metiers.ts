/**
 * Autres métiers de la conduite : chauffeur poids lourd salarié, livreur indépendant, coût d'accès
 * au taxi par la formation. Fonctions pures sur les paramètres 2026.
 *
 * - Salaire poids lourd : barème « M » de l'accord du 11 octobre 2023 (transport routier de
 *   marchandises), taux horaire majoré de l'ancienneté, jamais sous le Smic horaire ; heures au-delà
 *   de 35 h payées avec la majoration saisie (code des transports, D3312-46 : « conformément aux
 *   usages ou aux conventions ou accords collectifs »).
 * - Brut → net d'un salarié non cadre : part salariale Urssaf (secteur privé, 1er janvier 2026) et
 *   Agirc-Arrco 2026. Vérifié sur le Smic : 1 867,02 € brut → 1 477,93 € net (service-public F2300).
 *   Non modélisés, et dit sur les pages : complémentaire santé et prévoyance d'entreprise, réduction
 *   de cotisations sur heures supplémentaires (CSS, L241-17), régime d'Alsace-Moselle, impôt.
 * - Livreur indépendant : micro-entreprise, prestations de services commerciales (BIC), contribution
 *   à la formation professionnelle des commerçants (Urssaf).
 */
import { P } from './params';
import { coutAcces } from './acces';

const pos = (x: number) => (Number.isFinite(x) ? Math.max(0, x) : 0);

/* ───────────────────────── Brut → net d'un salarié ───────────────────────── */

export interface NetSalarie { brut: number; vieillesse: number; retraiteCompl: number; csgCrds: number; total: number; net: number }

/** Cotisations salariales mensuelles d'un salarié non cadre du secteur privé (hors mutuelle et prévoyance). */
export function netSalarie(brutMensuel: number): NetSalarie {
  const S = P.salarie, b = pos(brutMensuel);
  const t1 = Math.min(b, S.pmss), t2 = Math.max(0, Math.min(b, 8 * S.pmss) - S.pmss);
  const vieillesse = t1 * S.vieillesse_plafonnee + b * S.vieillesse_deplafonnee;
  const retraiteCompl = t1 * (S.agirc_t1 + S.ceg_t1) + t2 * (S.agirc_t2 + S.ceg_t2) + (b > S.pmss ? (t1 + t2) * S.cet : 0);
  const csgCrds = b * S.csg_assiette * (S.csg_deductible + S.csg_non_deductible + S.crds);
  const total = vieillesse + retraiteCompl + csgCrds;
  return { brut: b, vieillesse, retraiteCompl, csgCrds, total, net: b - total };
}

/* ───────────────────────── Chauffeur poids lourd ───────────────────────── */

export interface SalaireTrmInput {
  /** Indice dans `grille_trm.taux`. */
  coef: number;
  /** Années d'ancienneté dans l'entreprise. */
  anciennete: number;
  /** Heures de temps de service par semaine. */
  heuresSemaine: number;
  /** Majoration appliquée aux heures à partir de la 36e (fraction, 0,25 = 25 %). */
  majoration: number;
}
export interface SalaireTrm {
  code: string; tauxGrille: number; tauxApplique: number; smicApplique: boolean; majAnciennete: number;
  heuresMois: number; heuresMajoreesMois: number; base: number; majorees: number; brut: number; net: NetSalarie;
}

/** Taux horaire garanti par la grille (ancienneté comprise), puis plancher du Smic horaire. */
export function tauxTrm(coef: number, anciennete: number) {
  const G = P.grille_trm, taux = G.taux as Array<[string, number]>;
  const [code, base] = taux[Math.min(taux.length - 1, Math.max(0, Math.round(pos(coef))))];
  const maj = (G.anciennete as Array<[number, number]>).filter(([a]) => pos(anciennete) >= a).pop()![1];
  const tauxGrille = base * (1 + maj);
  const smic = P.ambulancier.smic_horaire;
  return { code, tauxGrille, tauxApplique: Math.max(tauxGrille, smic), smicApplique: tauxGrille < smic, majAnciennete: maj };
}

/** Brut et net mensuels minimaux d'un conducteur de poids lourd salarié. */
export function salaireTrm(i: SalaireTrmInput): SalaireTrm {
  const G = P.grille_trm;
  const t = tauxTrm(i.coef, i.anciennete);
  const h = Math.min(pos(i.heuresSemaine), 7 * 24);
  const heuresMois = G.heures_mois * h / 35;
  const heuresMajoreesMois = G.heures_mois * Math.max(0, h - 35) / 35;
  const base = t.tauxApplique * (heuresMois - heuresMajoreesMois);
  const majorees = t.tauxApplique * (1 + pos(i.majoration)) * heuresMajoreesMois;
  const brut = base + majorees;
  return { ...t, heuresMois, heuresMajoreesMois, base, majorees, brut, net: netSalarie(brut) };
}

/* ───────────────────────── Livreur indépendant ───────────────────────── */

export interface LivreurInput { caMois: number; fraisMois: number; acre?: boolean }
export interface Livreur { ca: number; cotisations: number; cfp: number; frais: number; net: number; tauxCotisation: number; seuilDepasse: boolean; franchiseTvaDepassee: boolean }

/** Revenu net mensuel d'un livreur micro-entrepreneur : chiffre d'affaires encaissé moins cotisations
 *  (prestations de services commerciales BIC), contribution à la formation des commerçants et frais réels. */
export function revenuLivreur(i: LivreurInput): Livreur {
  const ca = pos(i.caMois), frais = pos(i.fraisMois);
  const tauxCotisation = i.acre ? P.micro.taux_acre_debut_des_juillet : P.micro.taux_bic_services;
  const cotisations = ca * tauxCotisation;
  const cfp = ca * P.livreur.cfp_commercant;
  return {
    ca, cotisations, cfp, frais, tauxCotisation,
    net: ca - cotisations - cfp - frais,
    seuilDepasse: ca * 12 > P.micro.seuil_services,
    franchiseTvaDepassee: ca * 12 > P.tva.franchise_services,
  };
}

/** Capacité financière à justifier pour une entreprise de transport léger (métropole). */
export function capaciteFinanciereLegere(vehicules: number): number {
  const n = Math.max(0, Math.round(pos(vehicules)));
  return n === 0 ? 0 : P.livreur.capfin_premier_vehicule + (n - 1) * P.livreur.capfin_vehicule_suivant;
}

/* ───────────────────────── Taxi : coût d'accès par la formation ───────────────────────── */

export interface FormationTaxiInput { formation: number; psc1: number; medecin: number; mobiliteVtc?: boolean }

/** Coût jusqu'à la carte de taxi : formation, PSC1 et médecin saisis, droits d'examen CMA et carte
 *  réglementés. Un candidat admissible au VTC passe l'examen « mobilité » au lieu de l'examen complet. */
export function coutFormationTaxi(i: FormationTaxiInput) {
  const A = P.acces;
  const r = coutAcces({ metier: 'taxi', formation: pos(i.formation), medecin: pos(i.medecin), psc1: pos(i.psc1), demarrage: 0 });
  const examen = i.mobiliteVtc ? A.examen_mobilite : A.examen_complet;
  const ecart = A.examen_complet - examen;
  return {
    examen,
    carte: A.carte_pro_environ,
    reglementes: r.reglementes - ecart,
    prives: r.prives,
    total: r.total - ecart,
    siEchecPratique: r.total - ecart + A.examen_admission_seule,
    siEchecEcrit: r.total - ecart + examen,
  };
}
