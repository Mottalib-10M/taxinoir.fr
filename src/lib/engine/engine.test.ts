import { describe, expect, it } from 'vitest';
import { P } from './params';
import { microCotisations, tnsCotisations, assietteTns } from './cotisations';
import { revenuNet, regimeTva, DEFAULTS } from './revenu';
import { coutAcces, verifierVehicule, calendrier, ageEnMois, mensualite, achatOuLocation, tauxHoraireAmbulancier, brutAmbulancier, moyenneAdmissibilite, addMonths } from './acces';

describe('paramètres 2026', () => {
  it('portent une date de lecture et des sources https', () => {
    expect(P.retrieved_at).toMatch(/^2026-\d\d-\d\d$/);
    for (const s of Object.values(P.sources)) expect(s.url).toMatch(/^https:\/\//);
    expect(Object.keys(P.sources).length).toBeGreaterThanOrEqual(10);
  });
  it('reprennent les valeurs officielles relues le 2026-10-04', () => {
    expect(P.acces.examen_complet).toBe(241);           // CMA, tarifs 2026
    expect(P.acces.registre_inscription).toBe(170);     // service-public F31027
    expect(P.micro.taux_bic_services).toBe(0.212);      // Urssaf
    expect(P.micro.seuil_services).toBe(83600);         // Urssaf, seuil 2026
    expect(P.tva.taux_transport).toBe(0.1);             // CGI art. 279 b quater
    expect(P.tva.franchise_services).toBe(37500);       // F21746
    expect(P.tns.pass).toBe(48060);                      // Pass 2026
    expect(P.vehicule_vtc.puissance_min_kw).toBe(84);   // arrêté du 26 mars 2015
    expect(P.ambulancier.dea_heures).toBe(P.ambulancier.dea_heures_institut + P.ambulancier.dea_heures_stage);
  });
});

describe('micro-entreprise', () => {
  it('21,2 % + 0,3 % de formation professionnelle sur le chiffre d’affaires', () => {
    const c = microCotisations(50000);
    expect(c.sociales).toBeCloseTo(10600, 6);
    expect(c.cfp).toBeCloseTo(150, 6);
    expect(c.impot).toBe(0);
  });
  it('Acre (début dès le 1er juillet 2026) à 15,9 % et versement libératoire à 1,7 %', () => {
    const c = microCotisations(30000, { acre: true, versementLiberatoire: true });
    expect(c.sociales).toBeCloseTo(4770, 6);
    expect(c.impot).toBeCloseTo(510, 6);
  });
  it('chiffre d’affaires nul ou négatif : rien à payer', () => {
    expect(microCotisations(0).total).toBe(0);
    expect(microCotisations(-100).total).toBe(0);
  });
});

describe('indépendant au réel, barème 2026', () => {
  it('assiette : revenu moins 26 %, abattement borné à 1,76 % et 130 % du Pass', () => {
    expect(assietteTns(40000).abattement).toBeCloseTo(10400, 6);
    expect(assietteTns(2000).abattement).toBeCloseTo(0.0176 * 48060, 6);
    expect(assietteTns(400000).abattement).toBeCloseTo(1.3 * 48060, 6);
  });
  it('revenu nul : cotisations minimales publiées par l’Urssaf (96 €, 967 €, 72 €, CFP 139 €)', () => {
    const t = tnsCotisations(0);
    expect(Math.round(t.ij)).toBe(96);
    expect(Math.round(t.retraiteBase)).toBe(967);
    expect(Math.round(t.invalidite)).toBe(72);
    expect(t.cfp).toBe(139);
    expect(t.maladie + t.af + t.csgCrds).toBe(0);
  });
  it('plafonds publiés : indemnités journalières 1 202 €, invalidité-décès 625 €', () => {
    const t = tnsCotisations(1_000_000);
    expect(Math.round(t.ij)).toBe(1202);
    expect(Math.round(t.invalidite)).toBe(625);
  });
  it('revenu de 40 000 € : calcul détaillé à la main', () => {
    const t = tnsCotisations(40000);
    expect(t.assiette).toBeCloseTo(29600, 6);
    const tauxMaladie = 0.04 + ((29600 / 48060 - 0.6) / 0.5) * 0.025;
    expect(t.maladie).toBeCloseTo(29600 * tauxMaladie, 4);
    expect(t.retraiteBase).toBeCloseTo(29600 * 0.1787 + 29600 * 0.0072, 4);
    expect(t.retraiteCompl).toBeCloseTo(29600 * 0.081, 4);
    expect(t.af).toBe(0);
    expect(t.csgCrds).toBeCloseTo(29600 * 0.097, 4);
    expect(t.total).toBeGreaterThan(12600);
    expect(t.total).toBeLessThan(12700);
  });
  it('allocations familiales : 0 sous 110 % du Pass, 3,1 % au-delà de 140 %', () => {
    const a = (r: number) => tnsCotisations(r);
    expect(a(1.1 * 48060 / 0.74).af).toBeCloseTo(0, 6);
    const haut = a(2 * 48060);
    expect(haut.af / haut.assiette).toBeCloseTo(0.031, 6);
  });
  it('cotisations croissantes avec le revenu', () => {
    let prev = 0;
    for (let r = 0; r <= 200000; r += 5000) { const t = tnsCotisations(r).total; expect(t).toBeGreaterThanOrEqual(prev - 1e-9); prev = t; }
  });
});

describe('TVA', () => {
  it('franchise jusqu’à 37 500 €, tolérance jusqu’à 41 250 €, TVA au-delà ou sur option', () => {
    expect(regimeTva(37500)).toBe('franchise');
    expect(regimeTva(37501)).toBe('tolerance');
    expect(regimeTva(41250)).toBe('tolerance');
    expect(regimeTva(41251)).toBe('assujetti');
    expect(regimeTva(10000, true)).toBe('assujetti');
  });
  it('assujetti : le prix payé contient 10 % de TVA', () => {
    const r = revenuNet({ ...DEFAULTS.vtc_propre, caAnnuel: 55000 });
    expect(r.regimeTva).toBe('assujetti');
    expect(r.caHt).toBeCloseTo(50000, 6);
    expect(r.tva).toBeCloseTo(5000, 6);
  });
});

describe('revenu net', () => {
  const base = { ...DEFAULTS.vtc_propre, caAnnuel: 30000, carburantMois: 0, vehiculeMois: 0, assuranceMois: 0, entretienMois: 0, autresMois: 0, heuresSemaine: 40, semaines: 40 };
  it('micro sans frais : chiffre d’affaires moins 21,5 %', () => {
    const r = revenuNet(base);
    expect(r.regimeTva).toBe('franchise');
    expect(r.netAnnuel).toBeCloseTo(30000 * (1 - 0.212 - 0.003), 6);
    expect(r.netHoraire).toBeCloseTo(r.netAnnuel / 1600, 6);
  });
  it('les frais mensuels sont annualisés et déduits', () => {
    const r = revenuNet({ ...base, carburantMois: 100 });
    expect(r.charges.total).toBe(1200);
    expect(r.netAnnuel).toBeCloseTo(30000 * 0.785 - 1200, 6);
  });
  it('plateforme : commission sur le prix payé, déduite seulement si ce prix est déclaré', () => {
    const p = { ...DEFAULTS.vtc_plateforme, caAnnuel: 0, coursesSemaine: 10, prixMoyen: 20, semaines: 10, commission: 0.25, carburantMois: 0, vehiculeMois: 0, assuranceMois: 0, entretienMois: 0, autresMois: 0 };
    const client = revenuNet({ ...p, baseCa: 'client' });
    const verse = revenuNet({ ...p, baseCa: 'verse' });
    expect(client.caClient).toBe(2000);
    expect(client.commission).toBe(500);
    expect(verse.caHt).toBe(1500);
    expect(verse.commission).toBe(0);
    expect(verse.netAnnuel).toBeGreaterThan(client.netAnnuel); // moins de cotisations sur une base plus faible
    expect(client.netParCourse).toBe(15);
  });
  it('signale une course nette sous le revenu minimal de 9 €', () => {
    const r = revenuNet({ ...DEFAULTS.vtc_plateforme, prixMoyen: 11, commission: 0.25 });
    expect(r.sousRevenuMinCourse).toBe(true);
  });
  it('la licence louée ne compte que pour un taxi', () => {
    const vtc = revenuNet({ ...base, licenceMois: 1000 });
    const taxi = revenuNet({ ...base, metier: 'taxi', licenceMois: 1000 });
    expect(vtc.charges.licence).toBe(0);
    expect(taxi.charges.licence).toBe(12000);
  });
  it('au réel : les cotisations portent sur le bénéfice', () => {
    const r = revenuNet({ ...base, statut: 'reel', carburantMois: 500 });
    expect(r.tns?.revenu).toBeCloseTo(30000 - 6000, 6);
    expect(r.netAnnuel).toBeCloseTo(24000 - (r.tns?.total ?? 0), 6);
  });
  it('signale un dépassement du seuil de la micro-entreprise', () => {
    expect(revenuNet({ ...base, caAnnuel: 100000 }).depasseSeuilMicro).toBe(true);
  });
  it('aucune entrée ne produit NaN, même vide', () => {
    const r = revenuNet({ metier: 'vtc_plateforme', statut: 'reel', coursesSemaine: 0, prixMoyen: 0, semaines: 0, heuresSemaine: 0, carburantMois: 0, vehiculeMois: 0, assuranceMois: 0, entretienMois: 0, autresMois: 0 });
    for (const v of [r.netAnnuel, r.netHoraire, r.netParCourse, r.cotisations]) expect(Number.isFinite(v)).toBe(true);
  });
  it('les valeurs par défaut donnent un résultat non nul pour chaque métier', () => {
    for (const d of Object.values(DEFAULTS)) expect(revenuNet(d).netMensuel).not.toBe(0);
  });
});

describe('coût d’accès', () => {
  it('VTC : examen, carte, registre et vignette sont des frais réglementés', () => {
    const r = coutAcces({ metier: 'vtc', formation: 1000, medecin: 50, demarrage: 0 });
    expect(r.reglementes).toBe(241 + 60 + 170 + 35);
    expect(r.prives).toBe(1050);
  });
  it('VTC : garantie financière de 1 500 € si le véhicule n’est ni possédé ni loué longtemps', () => {
    const r = coutAcces({ metier: 'vtc', formation: 0, medecin: 0, demarrage: 0, garantieFinanciere: true });
    expect(r.lignes.find((l) => l.id === 'garantie')?.montant).toBe(1500);
  });
  it('taxi : pas de registre VTC, licence et PSC1 saisis', () => {
    const r = coutAcces({ metier: 'taxi', formation: 0, medecin: 0, psc1: 60, licence: 100000, demarrage: 0 });
    expect(r.lignes.some((l) => l.id === 'registre')).toBe(false);
    expect(r.total).toBe(241 + 60 + 60 + 100000);
  });
  it('ambulancier : aucun frais T3P', () => {
    const r = coutAcces({ metier: 'ambulancier', formation: 5000, medecin: 0, demarrage: 0 });
    expect(r.reglementes).toBe(0);
    expect(r.total).toBe(5000);
  });
});

describe('véhicule VTC', () => {
  const ok = { motorisation: 'thermique' as const, ageMois: 24, portes: 4, longueur: 4.6, largeur: 1.8, puissanceKw: 110, places: 5 };
  it('un véhicule thermique conforme passe', () => expect(verifierVehicule(ok).conforme).toBe(true));
  it('7 ans révolus : refusé ; 6 ans et 11 mois : accepté', () => {
    expect(verifierVehicule({ ...ok, ageMois: 84 }).conforme).toBe(false);
    expect(verifierVehicule({ ...ok, ageMois: 83 }).conforme).toBe(true);
  });
  it('seuils exacts : 4,50 m, 1,70 m et 84 kW passent, juste en dessous non', () => {
    expect(verifierVehicule({ ...ok, longueur: 4.5, largeur: 1.7, puissanceKw: 84 }).conforme).toBe(true);
    expect(verifierVehicule({ ...ok, longueur: 4.49 }).conforme).toBe(false);
    expect(verifierVehicule({ ...ok, puissanceKw: 83 }).conforme).toBe(false);
  });
  it('hybride ou électrique : exempté des critères de l’arrêté, pas du nombre de places', () => {
    const r = verifierVehicule({ ...ok, motorisation: 'hybride', ageMois: 120, longueur: 4, puissanceKw: 60, places: 5 });
    expect(r.conforme).toBe(true);
    expect(verifierVehicule({ ...ok, motorisation: 'electrique', places: 10 }).conforme).toBe(false);
  });
  it('âge en mois révolus', () => expect(ageEnMois(2020, 3, '2026-10-04')).toBe(79));
});

describe('calendrier', () => {
  it('carte VTC du 15 mars 2022 : fin le 15 mars 2027, stage avant le 15 décembre 2026', () => {
    const c = calendrier({ metier: 'vtc', carte: '2022-03-15', registre: '2022-05-02' });
    expect(c.find((e) => e.id === 'fin_carte')?.date).toBe('2027-03-15');
    expect(c.find((e) => e.id === 'formation')?.date).toBe('2026-12-15');
    expect(c.find((e) => e.id === 'registre')?.date).toBe('2027-05-02');
  });
  it('31 du mois : ramené au dernier jour', () => expect(addMonths('2026-05-31', -3)).toBe('2026-02-28'));
});

describe('licence de taxi', () => {
  it('mensualité d’un prêt : 100 000 € à 4 % sur 10 ans', () => expect(mensualite(100000, 0.04, 10)).toBeCloseTo(1012.45, 2));
  it('taux nul : capital divisé par le nombre de mois', () => expect(mensualite(12000, 0, 1)).toBe(1000));
  it('achat contre location', () => {
    const r = achatOuLocation({ prix: 190000, apport: 40000, taux: 0.045, annees: 10, loyer: 3500 });
    expect(r.capital).toBe(150000);
    expect(r.anneesLoyer).toBeCloseTo(190000 / 42000, 6);
  });
});

describe('ambulancier', () => {
  it('niveaux 1 et 2 sous le Smic 2026 : le Smic s’applique', () => {
    expect(tauxHoraireAmbulancier(1)).toMatchObject({ applique: 12.31, smicApplique: true });
    expect(tauxHoraireAmbulancier(3)).toMatchObject({ applique: 12.79, smicApplique: false });
  });
  it('brut : heures × taux + indemnités de dimanche', () => {
    const b = brutAmbulancier(3, 151.67, 2);
    expect(b.brut).toBeCloseTo(151.67 * 12.79 + 2 * 23.9, 6);
  });
});

describe('examen T3P', () => {
  const ep = [...P.examen.tronc_commun, ...P.examen.vtc];
  it('moyenne pondérée et note éliminatoire', () => {
    const r = moyenneAdmissibilite(ep, [12, 12, 12, 12, 12, 12, 12]);
    expect(r).toMatchObject({ moyenne: 12, admissible: true });
    const e = moyenneAdmissibilite(ep, [18, 18, 18, 18, 3, 18, 18]);
    expect(e.admissible).toBe(false);
    expect(e.eliminees).toEqual(['E']);
  });
  it('sept épreuves, coefficients 17 au total pour le VTC', () => {
    expect(ep.length).toBe(7);
    expect(ep.reduce((s, e) => s + e.coef, 0)).toBe(17);
  });
});
