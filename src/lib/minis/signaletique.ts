import { coutSignaletique } from '../engine/vehicule';
import { T, eur, num, type L } from './_kit';
export default (l: L) => ({
  title: T(l, 'Vos commandes de signalétique VTC sur cinq ans', 'Your VTC sticker orders over five years'),
  cta: T(l, 'Calendrier de renouvellement', 'Renewal calendar'),
  inputs: [
    { id: 'v', label: T(l, 'Véhicules déclarés au registre', 'Vehicles declared on the register'), def: 1, max: 50 },
    { id: 'c', label: T(l, 'Changements de véhicule prévus', 'Vehicle changes you expect'), def: 1, max: 50 },
  ],
  run: ({ v, c }: Record<string, number>) => {
    const x = coutSignaletique({ vehicules: v, changements: c });
    return { head: [T(l, 'Signalétique à commander, environ', 'Stickers to order, approx.'), eur(x.total, l)],
      rows: [[T(l, 'Commandes', 'Orders'), num(x.commandes, l)], [T(l, 'Prix indiqué par commande', 'Stated price per order'), T(l, `environ ${eur(x.unitaire, l)}`, `about ${eur(x.unitaire, l)}`)], [T(l, 'Vignette temporaire, au plus', 'Temporary sticker, at most'), T(l, `${x.temporaireJours} jours`, `${x.temporaireJours} days`)]] as [string, string][],
      note: T(l, `Une commande par véhicule validé au registre, plus une à chaque changement de voiture. La signalétique cesse d’être valable au plus tard à la fin de l’inscription, soit ${x.dureeMaxAns} ans.`, `One order per vehicle approved on the register, plus one each time you change cars. Stickers stop being valid at the latest when the register entry ends, after ${x.dureeMaxAns} years.`) };
  },
});
