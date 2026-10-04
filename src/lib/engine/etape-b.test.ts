import { describe, expect, it } from 'vitest';
import { P } from './params';
import { coutAssurance, comparerFinancement, coutKm, coutSignaletique } from './vehicule';
import { courseConventionnee, activiteTerritoire, recettesPourNet, artisanMicroOuReel, soldeEspeces } from './exploitation';

describe('paramètres de l’étape B, lus sur les sources', () => {
  it('convention-cadre taxi (arrêté du 29 juillet 2025) et charte Cnam de juin 2026', () => {
    expect(P.cpam.forfait_prise_en_charge).toBe(13);
    expect(P.cpam.km_inclus).toBe(4);
    expect(P.cpam.forfait_grande_ville).toBe(15);
    expect(P.cpam.tarif_km_exemples['33']).toBe(1.07);
    expect(P.cpam.tarif_km_exemples['06']).toBe(1.27);
    expect(P.cpam.ads_exploitation_ans).toBe(3);
    expect(P.cpam.tarifs_depuis).toBe('2025-11-01');
    expect(P.cpam.activite_majoritaire).toBe(0.5);
    expect(P.cpam.grandes_villes).toHaveLength(12);
  });
  it('assurance, location-gérance, signalétique, plateformes', () => {
    expect(P.acces.amende_sans_assurance).toBe(3750);
    expect(P.assurance.amende_forfaitaire_sans_assurance).toBe(500);
    expect(P.gerance.publication_jours).toBe(15);
    expect(P.signaletique.version_vigueur).toBe('2025-08-02');
    expect(P.plateformes_publiees.heetch_dette_suspension).toBe(70);
  });
});

describe('assurance', () => {
  it('additionne les deux primes et les ramène au mois et à l’heure', () => {
    const r = coutAssurance({ primeVehiculeAn: 2400, primeProAn: 600, heuresSemaine: 50, semaines: 46 });
    expect(r.annuel).toBe(3000);
    expect(r.mensuel).toBe(250);
    expect(r.parHeure).toBeCloseTo(3000 / 2300, 6);
    expect(r.moisEgalAmende).toBeCloseTo(15, 6);
  });
  it('résiste aux saisies vides', () => {
    const r = coutAssurance({ primeVehiculeAn: NaN, primeProAn: -5, heuresSemaine: 0, semaines: 0 });
    expect(r.annuel).toBe(0); expect(r.parHeure).toBe(0); expect(r.moisEgalAmende).toBe(0);
  });
});

describe('financement du véhicule', () => {
  it('crédit sans intérêt : coût mensuel = (prix − revente) / durée', () => {
    const r = comparerFinancement({ prix: 36000, apport: 0, tauxAnnuel: 0, mois: 48, revente: 12000, loyer: 600 });
    expect(r.mensualite).toBeCloseTo(750, 6);
    expect(r.creditParMois).toBeCloseTo(500, 6);
    expect(r.locationParMois).toBe(600);
    expect(r.ecartParMois).toBeCloseTo(100, 6);
    expect(r.garantieDue).toBe(false);
  });
  it('location de 6 mois ou moins : garantie financière due', () => {
    const r = comparerFinancement({ prix: 30000, apport: 0, tauxAnnuel: 0.05, mois: 6, revente: 0, loyer: 900 });
    expect(r.garantieDue).toBe(true);
    expect(r.garantie).toBe(1500);
  });
  it('les intérêts sont positifs avec un taux', () => {
    const r = comparerFinancement({ prix: 30000, apport: 5000, tauxAnnuel: 0.06, mois: 60, revente: 8000, loyer: 550, premierLoyer: 3000 });
    expect(r.interets).toBeGreaterThan(0);
    expect(r.locationParMois).toBeCloseTo((3000 + 550 * 60) / 60, 6);
  });
});

describe('coût au kilomètre', () => {
  it('additionne dépréciation, énergie, assurance et entretien', () => {
    const r = coutKm({ prix: 40000, revente: 10000, annees: 5, kmAn: 60000, energie100: 6, assuranceAn: 2400, entretienAn: 1200 });
    expect(r.depreciation).toBe(6000);
    expect(r.energie).toBe(3600);
    expect(r.total).toBe(13200);
    expect(r.parKm).toBeCloseTo(0.22, 6);
    expect(r.depasseAgeThermique).toBe(false);
  });
  it('signale une détention de 7 ans ou plus', () => {
    expect(coutKm({ prix: 1, revente: 0, annees: 7, kmAn: 1, energie100: 0, assuranceAn: 0, entretienAn: 0 }).depasseAgeThermique).toBe(true);
  });
});

describe('signalétique', () => {
  it('une commande par véhicule et par changement', () => {
    const r = coutSignaletique({ vehicules: 2, changements: 1 });
    expect(r.commandes).toBe(3);
    expect(r.total).toBe(3 * P.acces.vignette_environ);
  });
});

describe('course conventionnée', () => {
  it('forfait de 13 € pour 4 km, puis tarif du département', () => {
    const r = courseConventionnee({ km: 24, tarifKm: 1.1, grandeVille: false });
    expect(r.kmFactures).toBe(20);
    expect(r.total).toBeCloseTo(13 + 22, 6);
  });
  it('trajet court en grande ville', () => {
    const r = courseConventionnee({ km: 3, tarifKm: 1.27, grandeVille: true });
    expect(r.distance).toBe(0);
    expect(r.total).toBe(13 + 15);
  });
  it('activité majoritaire : plus de 50 % des trajets, exemple de la charte', () => {
    expect(activiteTerritoire({ trajetsTerritoire: 70, trajetsTotal: 100 }).atteint).toBe(true);
    expect(activiteTerritoire({ trajetsTerritoire: 50, trajetsTotal: 100 }).atteint).toBe(false);
    expect(activiteTerritoire({ trajetsTerritoire: 0, trajetsTotal: 0 }).taux).toBe(0);
  });
});

describe('location-gérance', () => {
  it('trouve les recettes qui donnent le net visé', () => {
    const r = recettesPourNet({ loyerMois: 3500, netCible: 2000, statut: 'reel' });
    expect(Number.isFinite(r.semaine)).toBe(true);
    expect(r.resultat.netMensuel).toBeGreaterThanOrEqual(1999.9);
    expect(r.resultat.netMensuel).toBeLessThan(2001);
  });
  it('un loyer plus élevé demande plus de recettes', () => {
    const a = recettesPourNet({ loyerMois: 2000, netCible: 1800, statut: 'reel' }).semaine;
    const b = recettesPourNet({ loyerMois: 3500, netCible: 1800, statut: 'reel' }).semaine;
    expect(b).toBeGreaterThan(a);
  });
});

describe('artisan taxi', () => {
  it('le réel l’emporte quand les frais sont lourds', () => {
    const r = artisanMicroOuReel({ recettesAn: 60000, fraisAn: 40000 });
    expect(r.meilleur).toBe('reel');
    expect(r.depasseSeuil).toBe(false);
  });
  it('signale le dépassement du seuil micro', () => {
    expect(artisanMicroOuReel({ recettesAn: 90000, fraisAn: 20000 }).depasseSeuil).toBe(true);
  });
});

describe('courses en espèces', () => {
  it('la commission des courses en espèces se déduit du solde', () => {
    const r = soldeEspeces({ coursesSemaine: 50, prixMoyen: 20, partEspeces: 0.5, commission: 0.2 });
    expect(r.ca).toBe(1000);
    expect(r.creditCarte).toBe(400);
    expect(r.commissionEspeces).toBe(100);
    expect(r.solde).toBe(300);
    expect(r.enDette).toBe(false);
  });
  it('tout en espèces : dette égale à la commission', () => {
    const r = soldeEspeces({ coursesSemaine: 40, prixMoyen: 20, partEspeces: 1, commission: 0.2 });
    expect(r.solde).toBe(-160);
    expect(r.depasseSeuil).toBe(true);
  });
});
