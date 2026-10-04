/** TVA d'un taxi ou d'un VTC et comparateur micro-entreprise / réel. Moteur : lib/engine/revenu.ts. */
import { useEffect, useMemo, useState } from 'react';
import NumberField from '../ui/NumberField';
import SelectField from '../ui/SelectField';
import { revenuNet, regimeTva, DEFAULTS, type Metier } from '../../lib/engine/revenu';
import { P } from '../../lib/engine/params';
import { formatMoney, formatPercent } from '../../lib/format';
import { readParams, num, str, updateURL } from '../../lib/url-state';

type L = 'fr' | 'en';
const TX = {
  fr: { metier: 'Activité', m_vtc_plateforme: 'VTC avec une plateforme', m_vtc_propre: 'VTC, clientèle propre', m_taxi: 'Taxi', ca: 'Chiffre d’affaires annuel (prix payés par les clients)', frais: 'Frais de l’activité par mois', fraisHelp: 'Véhicule, carburant, assurance, entretien, téléphone, comptable…', commission: 'Commission de la plateforme', opt: 'TVA', auto: 'Selon le chiffre d’affaires', option: 'Option pour la TVA', head: 'TVA à reverser sur l’année', regime: 'Régime de TVA', franchise: 'franchise en base', tolerance: 'franchise cette année, TVA l’an prochain', assujetti: 'redevable de la TVA', seuils: 'Seuils 2026', marge: 'Marge avant le seuil de franchise', cmp: 'Revenu net selon le statut, par an', micro: 'Micro-entreprise', reel: 'Entreprise individuelle au réel', cotis: 'Cotisations', net: 'Net avant impôt', ecart: 'Statut le plus favorable dans ce cas', note: 'Au réel, les frais sont déduits du bénéfice avant cotisations ; en micro, ils ne réduisent pas les cotisations, calculées sur le chiffre d’affaires. Les frais saisis sont TTC en franchise et hors taxe si vous êtes redevable de la TVA.' },
  en: { metier: 'Activity', m_vtc_plateforme: 'VTC with a platform', m_vtc_propre: 'VTC, own clients', m_taxi: 'Taxi', ca: 'Annual turnover (fares paid by riders)', frais: 'Running costs per month', fraisHelp: 'Vehicle, fuel, insurance, servicing, phone, accountant…', commission: 'Platform commission', opt: 'VAT', auto: 'Based on turnover', option: 'Opt into VAT', head: 'VAT to pay over for the year', regime: 'VAT status', franchise: 'small-business exemption', tolerance: 'exempt this year, VAT next year', assujetti: 'liable for VAT', seuils: '2026 thresholds', marge: 'Headroom below the exemption threshold', cmp: 'Net income by status, per year', micro: 'Micro-enterprise', reel: 'Sole trader, real profit', cotis: 'Contributions', net: 'Net before income tax', ecart: 'Better status in this case', note: 'Under real profit, costs are deducted before contributions; under micro, they do not reduce contributions, which are charged on turnover. Enter costs including VAT if exempt, excluding VAT if you are liable.' },
};
const METIERS: Metier[] = ['vtc_plateforme', 'vtc_propre', 'taxi'];

export default function VatTool({ lang = 'fr' }: { lang?: L }) {
  const t = TX[lang]; const $ = (x: number) => formatMoney(x, 0, lang);
  const [metier, setMetier] = useState<Metier>('vtc_propre');
  const [ca, setCa] = useState(45000);
  const [frais, setFrais] = useState(1100);
  const [commission, setCommission] = useState(25);
  const [opt, setOpt] = useState('0');
  useEffect(() => { const u = readParams(window.location.search); if (![...u.keys()].length) return;
    const m = str(u, 'm', 'vtc_propre'); setMetier((METIERS.includes(m as Metier) ? m : 'vtc_propre') as Metier);
    setCa(num(u, 'ca', 45000)); setFrais(num(u, 'fr', 1100)); setCommission(num(u, 'k', 25)); setOpt(str(u, 'o', '0')); }, []);
  useEffect(() => { updateURL({ m: metier, ca, fr: frais, k: commission, o: opt }); }, [metier, ca, frais, commission, opt]);
  const run = (statut: 'micro' | 'reel') => revenuNet({ ...DEFAULTS[metier], statut, caAnnuel: ca, commission: commission / 100, carburantMois: 0, vehiculeMois: 0, assuranceMois: 0, entretienMois: 0, licenceMois: 0, autresMois: frais, optionTva: opt === '1' });
  const mi = useMemo(() => run('micro'), [metier, ca, frais, commission, opt]);
  const re = useMemo(() => run('reel'), [metier, ca, frais, commission, opt]);
  const reg = regimeTva(mi.caDeclareTtc, opt === '1');
  const ecart = re.netAnnuel - mi.netAnnuel;
  return (
    <div className="rechner not-prose rounded-xl border border-navy-200 bg-white p-4 sm:p-6" data-chrome>
      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] lg:items-start lg:gap-6">
      <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
        <div className="grid gap-x-4 gap-y-4 sm:grid-cols-2">
          <SelectField id="tv-m" label={t.metier} value={metier} onChange={(x) => setMetier(x as Metier)} options={METIERS.map((m) => ({ value: m, label: t[`m_${m}` as const] }))} />
          <SelectField id="tv-o" label={t.opt} value={opt} onChange={setOpt} options={[{ value: '0', label: t.auto }, { value: '1', label: t.option }]} />
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-4">
          <NumberField id="tv-ca" label={t.ca} value={ca} onChange={setCa} unit="€" max={2000000} lang={lang} />
          <NumberField id="tv-fr" label={t.frais} value={frais} onChange={setFrais} unit="€" max={50000} help={t.fraisHelp} lang={lang} />
        </div>
        {metier === 'vtc_plateforme' && <div className="grid grid-cols-2 gap-x-4 gap-y-4"><NumberField id="tv-k" label={t.commission} value={commission} onChange={setCommission} unit="%" max={60} decimals={1} lang={lang} /></div>}
      </form>
      <div aria-live="polite" className="mt-6 lg:mt-0 lg:sticky lg:top-20 rounded-xl border border-navy-200 bg-amber-50/60 p-4 sm:p-5">
        <p className="text-sm font-medium text-navy-700">{t.head}</p>
        <p className="tabular-nums mt-1 text-4xl font-bold text-navy-900">{$(mi.tva)}</p>
        <table className="mt-4 w-full text-sm"><tbody className="divide-y divide-navy-200">
          <tr><td className="py-1.5 pr-3 text-navy-700">{t.regime}</td><td className="py-1.5 text-right text-navy-900">{t[reg]}</td></tr>
          <tr><td className="py-1.5 pr-3 text-navy-700">{t.seuils}</td><td className="tabular-nums py-1.5 text-right text-navy-900">{$(P.tva.franchise_services)} · {$(P.tva.franchise_services_majore)}</td></tr>
          <tr><td className="py-1.5 pr-3 text-navy-700">{t.marge}</td><td className="tabular-nums py-1.5 text-right text-navy-900">{$(Math.max(0, P.tva.franchise_services - mi.caDeclareTtc))}</td></tr>
        </tbody></table>
        <p className="mt-5 text-sm font-semibold text-navy-900">{t.cmp}</p>
        <div className="mt-2 overflow-x-auto"><table className="w-full text-sm">
          <thead><tr><th scope="col" className="py-1.5 text-left font-medium text-navy-700"></th><th scope="col" className="py-1.5 text-right font-medium text-navy-700">{t.micro}</th><th scope="col" className="py-1.5 text-right font-medium text-navy-700">{t.reel}</th></tr></thead>
          <tbody className="divide-y divide-navy-200">
            <tr><td className="py-1.5 pr-3 text-navy-700">{t.cotis}</td><td className="tabular-nums py-1.5 text-right">{$(mi.cotisations)}</td><td className="tabular-nums py-1.5 text-right">{$(re.cotisations)}</td></tr>
            <tr className="font-semibold"><td className="py-1.5 pr-3 text-navy-800">{t.net}</td><td className="tabular-nums py-1.5 text-right">{$(mi.netAnnuel)}</td><td className="tabular-nums py-1.5 text-right">{$(re.netAnnuel)}</td></tr>
          </tbody></table></div>
        <p className="tabular-nums mt-2 text-sm text-navy-800">{t.ecart} : {ecart >= 0 ? t.reel : t.micro}, + {$(Math.abs(ecart))} ({formatPercent(mi.netAnnuel ? Math.abs(ecart) / Math.abs(mi.netAnnuel) : 0, 1, lang)})</p>
        <p className="mt-3 text-sm text-navy-700">{t.note}</p>
      </div>
    </div>
    </div>
  );
}
