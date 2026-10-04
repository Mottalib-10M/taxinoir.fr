/** Calendrier de renouvellement : carte VTC ou taxi, stage de formation continue, registre des VTC.
 *  Moteur : lib/engine/acces.ts > calendrier. Date du jour appliquée après le premier rendu (§17.5). */
import { useEffect, useMemo, useState } from 'react';
import SelectField from '../ui/SelectField';
import { calendrier, joursEntre } from '../../lib/engine/acces';
import { P } from '../../lib/engine/params';
import { displayDate, formatNumber } from '../../lib/format';
import { readParams, str, updateURL } from '../../lib/url-state';

declare const __BUILD_DAY__: string;
type L = 'fr' | 'en';
const MOIS = { fr: ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'], en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'] };
const TX = {
  fr: { metier: 'Carte professionnelle', vtc: 'Carte VTC', taxi: 'Carte taxi', jc: 'Jour de délivrance', mc: 'Mois de délivrance', yc: 'Année de délivrance', jr: 'Jour d’inscription au registre', mr: 'Mois d’inscription au registre', yr: 'Année d’inscription au registre', head: 'Prochaine échéance', formation: 'Stage de formation continue de {h} heures, au plus tard', fin_carte: 'Fin de validité de la carte', registre: 'Renouvellement de l’inscription au registre', dans: 'dans {n} jours', passe: 'dépassé de {n} jours', aujourdhui: 'aujourd’hui', note: 'Carte valable {v} ans ; stage de {h} heures à suivre avant la demande de renouvellement, au plus tard {m} mois avant la fin (service-public). Pour un taxi, la licence (ADS) se renouvelle de droit, sans démarche.' },
  en: { metier: 'Driver card', vtc: 'VTC card', taxi: 'Taxi card', jc: 'Day issued', mc: 'Month issued', yc: 'Year issued', jr: 'Day registered', mr: 'Month registered', yr: 'Year registered', head: 'Next deadline', formation: '{h}-hour continuing training course, at the latest', fin_carte: 'Card expiry', registre: 'Register renewal', dans: 'in {n} days', passe: '{n} days overdue', aujourdhui: 'today', note: 'The card is valid for {v} years; the {h}-hour course must be done before applying to renew, at the latest {m} months before expiry (service-public). For a taxi, the licence (ADS) renews automatically.' },
};

export default function RenewalCalendar({ lang = 'fr' }: { lang?: L }) {
  const t = TX[lang]; const A = P.acces;
  const fill = (s: string, nn = 0) => s.replace('{h}', String(A.formation_continue_heures)).replace('{v}', String(A.carte_validite_ans)).replace('{m}', String(A.formation_continue_avant_mois)).replace('{n}', formatNumber(nn, 0, lang));
  const by = Number(__BUILD_DAY__.slice(0, 4));
  const [today, setToday] = useState(__BUILD_DAY__);
  const [metier, setMetier] = useState<'vtc' | 'taxi'>('vtc');
  const [c, setC] = useState({ y: String(by - 4), m: '3', d: '15' });
  const [r, setR] = useState({ y: String(by - 4), m: '5', d: '2' });
  useEffect(() => { setToday(new Date().toISOString().slice(0, 10)); const u = readParams(window.location.search); if (![...u.keys()].length) return;
    setMetier(str(u, 'me', 'vtc') === 'taxi' ? 'taxi' : 'vtc'); setC({ y: str(u, 'cy', String(by - 4)), m: str(u, 'cm', '3'), d: str(u, 'cd', '15') }); setR({ y: str(u, 'ry', String(by - 4)), m: str(u, 'rm', '5'), d: str(u, 'rd', '2') }); }, []);
  useEffect(() => { updateURL({ me: metier, cy: c.y, cm: c.m, cd: c.d, ry: r.y, rm: r.m, rd: r.d }); }, [metier, c, r]);
  const iso = (o: { y: string; m: string; d: string }) => { const y = Number(o.y), m = Number(o.m); const last = new Date(Date.UTC(y, m, 0)).getUTCDate(); return `${y}-${String(m).padStart(2, '0')}-${String(Math.min(Number(o.d), last)).padStart(2, '0')}`; };
  const ech = useMemo(() => calendrier({ metier, carte: iso(c), registre: metier === 'vtc' ? iso(r) : undefined }), [metier, c, r]);
  const next = ech.find((e) => e.date >= today) ?? ech[ech.length - 1];
  const years = Array.from({ length: 12 }, (_, k) => by - k);
  const days = Array.from({ length: 31 }, (_, k) => ({ value: String(k + 1), label: String(k + 1) }));
  const rel = (d: string) => { const n = joursEntre(today, d); return n === 0 ? t.aujourdhui : n > 0 ? fill(t.dans, n) : fill(t.passe, -n); };
  const lab = (id: string) => fill(t[id as 'formation']);
  const row = (o: typeof c, set: (x: typeof c) => void, k: 'c' | 'r') => (
    <div className="grid grid-cols-3 gap-x-4 gap-y-4">
      <SelectField id={`rc-${k}d`} label={k === 'c' ? t.jc : t.jr} value={o.d} onChange={(x) => set({ ...o, d: x })} options={days} />
      <SelectField id={`rc-${k}m`} label={k === 'c' ? t.mc : t.mr} value={o.m} onChange={(x) => set({ ...o, m: x })} options={MOIS[lang].map((m, i) => ({ value: String(i + 1), label: m }))} />
      <SelectField id={`rc-${k}y`} label={k === 'c' ? t.yc : t.yr} value={o.y} onChange={(x) => set({ ...o, y: x })} options={years.map((y) => ({ value: String(y), label: String(y) }))} />
    </div>
  );
  return (
    <div className="rechner not-prose rounded-xl border border-navy-200 bg-white p-4 sm:p-6" data-chrome>
      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] lg:items-start lg:gap-6">
      <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
        <div className="grid gap-x-4 gap-y-4 sm:grid-cols-2"><SelectField id="rc-me" label={t.metier} value={metier} onChange={(x) => setMetier(x as 'vtc' | 'taxi')} options={[{ value: 'vtc', label: t.vtc }, { value: 'taxi', label: t.taxi }]} /></div>
        {row(c, setC, 'c')}
        {metier === 'vtc' && row(r, setR, 'r')}
      </form>
      <div aria-live="polite" className="mt-6 lg:mt-0 lg:sticky lg:top-20 rounded-xl border border-navy-200 bg-amber-50/60 p-4 sm:p-5">
        <p className="text-sm font-medium text-navy-700">{t.head} · {lab(next.id)}</p>
        <p className="tabular-nums mt-1 text-3xl font-bold text-navy-900">{displayDate(next.date, lang === 'fr' ? 'fr-FR' : 'en-GB')}</p>
        <p className="mt-1 text-navy-700">{rel(next.date)}</p>
        <table className="mt-4 w-full text-sm"><tbody className="divide-y divide-navy-200">
          {ech.map((e) => <tr key={e.id}><td className="py-1.5 pr-3 text-navy-700">{lab(e.id)}</td><td className="tabular-nums py-1.5 text-right text-navy-900">{displayDate(e.date, lang === 'fr' ? 'fr-FR' : 'en-GB')}</td><td className="py-1.5 pl-3 text-right text-navy-600">{rel(e.date)}</td></tr>)}
        </tbody></table>
        <p className="mt-3 text-sm text-navy-700">{fill(t.note)}</p>
      </div>
    </div>
    </div>
  );
}
