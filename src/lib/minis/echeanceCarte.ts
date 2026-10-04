import { calendrier } from '../engine/acces';
import { T, moisAnnee, moisOptions, type L } from './_kit';
export default (l: L) => ({
  title: T(l, 'Quand faire votre stage de formation continue ?', 'When must you take your continuing training course?'),
  cta: T(l, 'Calendrier complet', 'Full calendar'),
  inputs: [
    { id: 'y', label: T(l, 'Année de délivrance de la carte', 'Year the card was issued'), def: 2022, options: Array.from({ length: 11 }, (_, k) => 2016 + k).map((y) => ({ value: String(y), label: String(y) })) },
    { id: 'm', label: T(l, 'Mois de délivrance', 'Month issued'), def: 3, options: moisOptions(l) },
  ],
  run: ({ y, m }: Record<string, number>) => {
    const yy = Math.min(2100, Math.max(1990, Math.round(y || 2022)));
    const iso = `${yy}-${String(m || 1).padStart(2, '0')}-01`;
    const c = calendrier({ metier: 'vtc', carte: iso });
    const f = c.find((e) => e.id === 'formation')!.date, fin = c.find((e) => e.id === 'fin_carte')!.date;
    return { head: [T(l, 'Stage de 14 heures à faire avant', 'Take the 14-hour course before'), moisAnnee(f, l)],
      rows: [[T(l, 'Fin de validité de la carte', 'Card expiry'), moisAnnee(fin, l)], [T(l, 'Délai conseillé par service-public', 'Lead time advised by service-public'), T(l, '3 mois avant la fin', '3 months before expiry')]] as [string, string][] };
  },
});
