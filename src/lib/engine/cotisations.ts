/**
 * Cotisations sociales 2026 d'un chauffeur indépendant (taxi, VTC), fonctions pures.
 *
 * - Micro-entreprise, activité de services artisanale (BIC) : un pourcentage du chiffre d'affaires
 *   (Urssaf, autoentrepreneur.urssaf.fr ; service-public F36232), plus la contribution à la formation
 *   professionnelle des artisans et, sur option, le versement libératoire de l'impôt.
 * - Entreprise individuelle au réel ou EURL à l'impôt sur le revenu : barème 2026 des artisans
 *   (Urssaf, taux mis à jour le 27/02/2026) appliqué à l'assiette réformée : revenu professionnel
 *   diminué d'un abattement de 26 %, borné entre 1,76 % et 130 % du Pass (décret n° 2024-688,
 *   art. D. 136-5 CSS ; Urssaf, page « réforme de l'assiette sociale »).
 *
 * Non modélisé, et dit sur les pages : la taxe pour frais de chambre de métiers, l'exonération Acre
 * des indépendants au réel, la régularisation N+1, les cotisations de la SASU (assimilé salarié).
 */
import { P } from './params';

export interface MicroOpts { acre?: boolean; versementLiberatoire?: boolean }
export interface MicroResult { taux: number; sociales: number; cfp: number; impot: number; total: number }

/** Cotisations d'un micro-entrepreneur sur un chiffre d'affaires annuel (encaissé, hors TVA). */
export function microCotisations(ca: number, o: MicroOpts = {}): MicroResult {
  const base = Math.max(0, ca);
  const taux = o.acre ? P.micro.taux_acre_debut_des_juillet : P.micro.taux_bic_services;
  const sociales = base * taux;
  const cfp = base * P.micro.cfp_artisan;
  const impot = o.versementLiberatoire ? base * P.micro.versement_liberatoire_bic_services : 0;
  return { taux, sociales, cfp, impot, total: sociales + cfp + impot };
}

/** Taux progressif : interpolation linéaire entre les bornes du barème (en fraction du Pass). */
function tauxProgressif(grille: number[][], r: number, pass: number): number {
  const x = r / pass;
  if (x <= grille[0][0]) return grille[0][1];
  for (let i = 1; i < grille.length; i++) {
    const [x0, t0] = grille[i - 1], [x1, t1] = grille[i];
    if (x <= x1) return t0 + ((x - x0) / (x1 - x0)) * (t1 - t0);
  }
  return grille[grille.length - 1][1];
}

/** Assiette sociale 2026 : revenu professionnel moins un abattement de 26 % borné. */
export function assietteTns(revenu: number): { assiette: number; abattement: number } {
  const T = P.tns;
  if (revenu <= 0) return { assiette: 0, abattement: 0 };
  const abattement = Math.min(Math.max(revenu * T.abattement_taux, T.abattement_min_pass * T.pass), T.abattement_max_pass * T.pass);
  return { assiette: Math.max(0, revenu - abattement), abattement };
}

export interface TnsResult {
  revenu: number; assiette: number; abattement: number;
  maladie: number; ij: number; retraiteBase: number; retraiteCompl: number; invalidite: number;
  af: number; csgCrds: number; cfp: number; total: number;
}

/** Cotisations annuelles d'un artisan au réel (EI, EURL à l'IR), à partir du revenu professionnel
 *  (recettes hors TVA moins charges, cotisations non déduites). Minimums de cotisation inclus. */
export function tnsCotisations(revenu: number): TnsResult {
  const T = P.tns, pass = T.pass;
  const { assiette: a, abattement } = assietteTns(revenu);
  // Maladie-maternité : taux progressif sur toute l'assiette, puis 6,50 % au-delà de 3 Pass.
  let maladie: number;
  if (a <= 3 * pass) maladie = a * tauxProgressif(T.maladie, a, pass);
  else maladie = 3 * pass * T.maladie[T.maladie.length - 1][1] + (a - 3 * pass) * T.maladie_au_dela_3_pass;
  const ij = Math.min(Math.max(a, T.ij_base_min_pass * pass), T.ij_plafond_pass * pass) * T.ij_taux;
  const retraiteBase = Math.max(Math.min(a, pass), T.retraite_base_assiette_min) * T.retraite_base_plafonnee
    + Math.min(a, 5 * pass) * T.retraite_base_deplafonnee;
  const retraiteCompl = Math.min(a, pass) * T.retraite_compl_t1
    + Math.max(0, Math.min(a, T.retraite_compl_plafond_pass * pass) - pass) * T.retraite_compl_t2;
  const invalidite = Math.min(Math.max(a, T.invalidite_base_min_pass * pass), T.invalidite_plafond_pass * pass) * T.invalidite_taux;
  const af = a * tauxProgressif([[0, 0], ...T.af], a, pass);
  const csgCrds = a * T.csg_crds;
  const cfp = T.cfp_artisan_forfait;
  const total = maladie + ij + retraiteBase + retraiteCompl + invalidite + af + csgCrds + cfp;
  return { revenu, assiette: a, abattement, maladie, ij, retraiteBase, retraiteCompl, invalidite, af, csgCrds, cfp, total };
}
