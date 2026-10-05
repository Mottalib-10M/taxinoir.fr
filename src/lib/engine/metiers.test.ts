import { describe, expect, it } from 'vitest';
import { P } from './params';
import { netSalarie, tauxTrm, salaireTrm, revenuLivreur, capaciteFinanciereLegere, coutFormationTaxi } from './metiers';

describe('paramètres lus le 5 octobre 2026', () => {
  it('barème M de l’accord du 11 octobre 2023 et correspondance des groupes (avenant n° 72)', () => {
    expect(P.grille_trm.taux).toEqual([['110M-120M', 12.09], ['128M', 12.12], ['138M', 12.14], ['150M', 12.43]]);
    expect(P.grille_trm.groupes.find(([g]) => g === '3 bis')![1]).toBe('118M');
    expect(P.grille_trm.groupes.find(([g]) => g === '7')![1]).toBe('150M');
    expect(P.grille_trm.anciennete.at(-1)).toEqual([15, 0.08]);
  });
  it('code de la route, code des transports, capacité financière légère', () => {
    expect(P.poids_lourd.age_c).toBe(21);
    expect(P.poids_lourd.age_c1).toBe(18);
    expect(P.poids_lourd.heures_grand_routier).toBe(43);
    expect(P.poids_lourd.heures_autres_roulants).toBe(39);
    expect(P.livreur.capfin_premier_vehicule).toBe(1800);
    expect(P.livreur.capfin_vehicule_suivant).toBe(900);
    expect(P.livreur.age_permis_b).toBe(17);
  });
});

describe('brut → net d’un salarié non cadre', () => {
  it('retrouve le Smic net publié par service-public (1 477,93 €)', () => {
    const r = netSalarie(P.salarie.smic_brut_mensuel);
    expect(r.net).toBeCloseTo(P.salarie.smic_net_mensuel, 1);
  });
  it('taux global de 20,84 % sous le plafond, nul pour un brut vide', () => {
    expect(netSalarie(2000).total / 2000).toBeCloseTo(0.208403, 5);
    expect(netSalarie(NaN).net).toBe(0);
  });
  it('au-dessus du plafond, la tranche 2 et la CET s’ajoutent', () => {
    const t1 = 4005, t2 = 995;
    const attendu = t1 * 0.069 + 5000 * 0.004 + t1 * (0.0315 + 0.0086) + t2 * (0.0864 + 0.0108) + 5000 * 0.0014 + 5000 * 0.9825 * 0.097;
    expect(netSalarie(5000).total).toBeCloseTo(attendu, 6);
  });
});

describe('salaire d’un chauffeur poids lourd', () => {
  it('le Smic s’applique quand la grille est en dessous', () => {
    const t = tauxTrm(0, 0);
    expect(t.tauxGrille).toBeCloseTo(12.09, 6);
    expect(t.smicApplique).toBe(true);
    expect(t.tauxApplique).toBe(P.ambulancier.smic_horaire);
  });
  it('150 M après 15 ans : 12,43 × 1,08', () => {
    const t = tauxTrm(3, 15);
    expect(t.tauxGrille).toBeCloseTo(13.4244, 4);
    expect(t.smicApplique).toBe(false);
  });
  it('35 h : brut = taux × 151,67 ; 43 h : 8 heures hebdomadaires majorées', () => {
    expect(salaireTrm({ coef: 3, anciennete: 15, heuresSemaine: 35, majoration: 0.25 }).brut).toBeCloseTo(13.4244 * 151.67, 4);
    const r = salaireTrm({ coef: 3, anciennete: 0, heuresSemaine: 43, majoration: 0.25 });
    expect(r.heuresMajoreesMois).toBeCloseTo(151.67 * 8 / 35, 6);
    expect(r.brut).toBeCloseTo(12.43 * 151.67 + 12.43 * 1.25 * 151.67 * 8 / 35, 4);
  });
});

describe('livreur indépendant', () => {
  it('cotisations BIC services 21,2 %, formation 0,1 %, frais déduits', () => {
    const r = revenuLivreur({ caMois: 3000, fraisMois: 900 });
    expect(r.cotisations).toBeCloseTo(636, 6);
    expect(r.cfp).toBeCloseTo(3, 6);
    expect(r.net).toBeCloseTo(3000 - 636 - 3 - 900, 6);
    expect(r.seuilDepasse).toBe(false);
    expect(r.franchiseTvaDepassee).toBe(false);
  });
  it('Acre et seuils', () => {
    expect(revenuLivreur({ caMois: 1000, fraisMois: 0, acre: true }).tauxCotisation).toBe(0.159);
    expect(revenuLivreur({ caMois: 7000, fraisMois: 0 }).seuilDepasse).toBe(true);
    expect(revenuLivreur({ caMois: 3500, fraisMois: 0 }).franchiseTvaDepassee).toBe(true);
  });
  it('capacité financière : 1 800 € puis 900 € par véhicule', () => {
    expect(capaciteFinanciereLegere(1)).toBe(1800);
    expect(capaciteFinanciereLegere(3)).toBe(3600);
    expect(capaciteFinanciereLegere(0)).toBe(0);
  });
});

describe('coût d’accès au taxi par la formation', () => {
  it('examen complet + carte réglementés, le reste saisi', () => {
    const r = coutFormationTaxi({ formation: 1500, psc1: 60, medecin: 50 });
    expect(r.reglementes).toBe(P.acces.examen_complet + P.acces.carte_pro_environ);
    expect(r.prives).toBe(1610);
    expect(r.total).toBe(1610 + 241 + 60);
    expect(r.siEchecPratique - r.total).toBe(P.acces.examen_admission_seule);
  });
  it('venir du VTC : examen « mobilité »', () => {
    const r = coutFormationTaxi({ formation: 0, psc1: 0, medecin: 0, mobiliteVtc: true });
    expect(r.examen).toBe(P.acces.examen_mobilite);
    expect(r.total).toBe(P.acces.examen_mobilite + P.acces.carte_pro_environ);
  });
});
