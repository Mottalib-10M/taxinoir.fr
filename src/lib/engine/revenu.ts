/**
 * Revenu net d'un chauffeur indépendant (taxi, VTC de plateforme, VTC à clientèle propre).
 *
 * Toutes les hypothèses d'activité (courses, prix, commission, frais) viennent du visiteur ; les règles
 * viennent des paramètres 2026 : seuils de franchise de TVA (F21746), TVA à 10 % sur le transport de
 * voyageurs (CGI art. 279 b quater), cotisations micro (Urssaf) ou au réel (barème 2026 des artisans).
 * Le « net » est un revenu avant impôt sur le revenu, sauf versement libératoire choisi.
 */
import { P } from './params';
import { microCotisations, tnsCotisations, type TnsResult } from './cotisations';

export type Metier = 'taxi' | 'vtc_plateforme' | 'vtc_propre';
export type Statut = 'micro' | 'reel';
export type BaseCa = 'client' | 'verse';

export interface RevenuInput {
  metier: Metier; statut: Statut;
  coursesSemaine: number; prixMoyen: number; semaines: number; heuresSemaine: number;
  /** Chiffre d'affaires annuel saisi directement ; s'il est positif, il remplace courses × prix. */
  caAnnuel?: number;
  /** Commission de la plateforme, en fraction du prix payé par le client (VTC de plateforme). */
  commission?: number;
  /** Ce que le chauffeur déclare : le prix payé par le client, ou ce que la plateforme lui reverse. */
  baseCa?: BaseCa;
  carburantMois: number; vehiculeMois: number; assuranceMois: number; entretienMois: number;
  licenceMois?: number; autresMois: number;
  /** Option pour la TVA alors que la franchise s'appliquerait. */
  optionTva?: boolean; acre?: boolean; versementLiberatoire?: boolean;
}

export type RegimeTva = 'franchise' | 'tolerance' | 'assujetti';

export interface RevenuResult {
  caClient: number; caDeclareTtc: number; caHt: number; tva: number; regimeTva: RegimeTva;
  commission: number; charges: { carburant: number; vehicule: number; assurance: number; entretien: number; licence: number; autres: number; total: number };
  cotisations: number; cotisationsSociales: number; cfp: number; impotLiberatoire: number; tns?: TnsResult;
  netAnnuel: number; netMensuel: number; netHoraire: number; heuresAn: number;
  /** Ce qui revient au chauffeur par course après commission (VTC de plateforme). */
  netParCourse: number; sousRevenuMinCourse: boolean; depasseSeuilMicro: boolean;
}

/** Régime de TVA d'une année selon le chiffre d'affaires de services (seuils 2026, F21746). */
export function regimeTva(ca: number, option = false): RegimeTva {
  if (option || ca > P.tva.franchise_services_majore) return 'assujetti';
  if (ca > P.tva.franchise_services) return 'tolerance';
  return 'franchise';
}

export function revenuNet(i: RevenuInput): RevenuResult {
  const pos = (x: number | undefined) => Math.max(0, x ?? 0);
  const semaines = Math.min(pos(i.semaines), 52);
  const caClient = pos(i.caAnnuel) > 0 ? pos(i.caAnnuel) : pos(i.coursesSemaine) * pos(i.prixMoyen) * semaines;
  const plateforme = i.metier === 'vtc_plateforme';
  const taux = plateforme ? Math.min(pos(i.commission), 1) : 0;
  const commissionTotale = caClient * taux;
  const base: BaseCa = plateforme ? (i.baseCa ?? 'client') : 'client';
  const caDeclareTtc = base === 'client' ? caClient : caClient - commissionTotale;
  const regime = regimeTva(caDeclareTtc, i.optionTva);
  const caHt = regime === 'assujetti' ? caDeclareTtc / (1 + P.tva.taux_transport) : caDeclareTtc;
  const tva = caDeclareTtc - caHt;
  // La commission est une charge seulement si le chauffeur déclare le prix payé par le client.
  const commission = base === 'client' ? commissionTotale : 0;
  const m = (x: number | undefined) => pos(x) * 12;
  const charges = { carburant: m(i.carburantMois), vehicule: m(i.vehiculeMois), assurance: m(i.assuranceMois), entretien: m(i.entretienMois), licence: i.metier === 'taxi' ? m(i.licenceMois) : 0, autres: m(i.autresMois), total: 0 };
  charges.total = charges.carburant + charges.vehicule + charges.assurance + charges.entretien + charges.licence + charges.autres;

  let cotisations: number, cotisationsSociales: number, cfp: number, impotLiberatoire = 0, tns: TnsResult | undefined;
  if (i.statut === 'micro') {
    const c = microCotisations(caHt, { acre: i.acre, versementLiberatoire: i.versementLiberatoire });
    cotisationsSociales = c.sociales; cfp = c.cfp; impotLiberatoire = c.impot; cotisations = c.sociales + c.cfp;
  } else {
    tns = tnsCotisations(caHt - commission - charges.total);
    cotisations = tns.total; cotisationsSociales = tns.total - tns.cfp; cfp = tns.cfp;
  }
  const netAnnuel = caHt - commission - charges.total - cotisations - impotLiberatoire;
  const heuresAn = pos(i.heuresSemaine) * semaines;
  const nbCourses = pos(i.coursesSemaine) * semaines;
  const netParCourse = plateforme && nbCourses > 0 ? (caClient - commissionTotale) / nbCourses : 0;
  return {
    caClient, caDeclareTtc, caHt, tva, regimeTva: regime, commission, charges,
    cotisations, cotisationsSociales, cfp, impotLiberatoire, tns,
    netAnnuel, netMensuel: netAnnuel / 12, netHoraire: heuresAn > 0 ? netAnnuel / heuresAn : 0, heuresAn,
    netParCourse, sousRevenuMinCourse: plateforme && nbCourses > 0 && netParCourse < P.plateformes.revenu_min_course,
    depasseSeuilMicro: i.statut === 'micro' && caHt > P.micro.seuil_services,
  };
}

/** Valeurs par défaut du simulateur : des hypothèses d'exemple, toutes modifiables par le visiteur. */
export const DEFAULTS: Record<Metier, RevenuInput> = {
  vtc_plateforme: { metier: 'vtc_plateforme', statut: 'micro', coursesSemaine: 70, prixMoyen: 20, semaines: 46, heuresSemaine: 50, commission: 0.25, baseCa: 'client', carburantMois: 450, vehiculeMois: 550, assuranceMois: 200, entretienMois: 80, licenceMois: 0, autresMois: 80 },
  vtc_propre: { metier: 'vtc_propre', statut: 'micro', coursesSemaine: 35, prixMoyen: 45, semaines: 46, heuresSemaine: 45, commission: 0, carburantMois: 400, vehiculeMois: 650, assuranceMois: 200, entretienMois: 80, licenceMois: 0, autresMois: 150 },
  taxi: { metier: 'taxi', statut: 'micro', coursesSemaine: 60, prixMoyen: 25, semaines: 46, heuresSemaine: 50, commission: 0, carburantMois: 450, vehiculeMois: 500, assuranceMois: 250, entretienMois: 90, licenceMois: 0, autresMois: 150 },
};
