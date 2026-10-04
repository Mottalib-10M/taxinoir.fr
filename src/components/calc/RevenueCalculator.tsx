/**
 * Simulateur de revenu net du chauffeur (taxi, VTC de plateforme, VTC à clientèle propre).
 * Moteur : lib/engine/revenu.ts. Premier rendu = valeurs par défaut (RECETTE §17.5), puis le lien
 * partagé est appliqué dans useEffect.
 */
import { useEffect, useMemo, useState } from 'react';
import NumberField from '../ui/NumberField';
import SelectField from '../ui/SelectField';
import Toggle from '../ui/Toggle';
import StackedBar from '../ui/StackedBar';
import { revenuNet, DEFAULTS, type Metier, type Statut, type BaseCa } from '../../lib/engine/revenu';
import { P } from '../../lib/engine/params';
import { formatMoney, formatPercent } from '../../lib/format';
import { readParams, num, str, updateURL } from '../../lib/url-state';

type L = 'fr' | 'en';
const TX = {
  fr: { metier: 'Activité', m_vtc_plateforme: 'VTC avec une plateforme', m_vtc_propre: 'VTC, clientèle propre', m_taxi: 'Taxi', statut: 'Statut', micro: 'Micro', reel: 'Au réel', courses: 'Courses par semaine', prix: 'Prix moyen payé par le client', heures: 'Heures travaillées par semaine', semaines: 'Semaines travaillées par an', commission: 'Commission de la plateforme', commissionHelp: 'Hypothèse : mettez le taux de votre relevé de plateforme.', adv: 'Frais, TVA et options', carburant: 'Carburant ou recharge', vehicule: 'Véhicule : crédit, LLD ou location', assurance: 'Assurance', entretien: 'Entretien, pneus, contrôle technique', licence: 'Licence : loyer ou mensualité', autres: 'Autres frais (téléphone, comptable, péages, lavage)', parMois: '€/mois', caDirect: 'Ou chiffre d’affaires annuel (remplace courses × prix)', baseCa: 'Chiffre d’affaires déclaré', base_client: 'Prix payé par les clients', base_verse: 'Montant versé par la plateforme', baseHelp: 'Ce qu’il faut déclarer dépend de la façon dont la plateforme facture : vérifiez-le avec l’Urssaf ou votre comptable.', optTva: 'TVA', tvaAuto: 'Selon le chiffre d’affaires', tvaOpt: 'Option pour la TVA', acre: 'Acre (début dès le 1er juillet 2026)', vl: 'Versement libératoire de l’impôt', non: 'Non', oui: 'Oui',
    head: 'Revenu net estimé par mois', headSub: 'avant impôt sur le revenu', horaire: 'par heure travaillée', an: 'Par an', ca: 'Chiffre d’affaires encaissé', tva: 'TVA à reverser ({tx})', comm: 'Commission de la plateforme', charges: 'Frais du véhicule et de l’activité', cotis: 'Cotisations sociales et formation', impot: 'Impôt (versement libératoire)', net: 'Revenu net', regime_franchise: 'Franchise de TVA : aucun montant à reverser.', regime_tolerance: 'Entre les deux seuils de franchise : pas de TVA cette année, TVA l’an prochain si le chiffre d’affaires reste au-dessus de {f}.', regime_assujetti: 'Chiffre d’affaires au-dessus du seuil de franchise (ou option) : vos prix contiennent {tx} de TVA.', seuilMicro: 'Chiffre d’affaires au-dessus du plafond de la micro-entreprise ({s} en 2026) : le régime cesse après deux années de dépassement.', sousGarantie: 'Après commission, une course vous rapporte moins que le revenu minimal de {g} garanti par l’accord de branche des plateformes.', parCourse: 'Net par course après commission', copy: 'Copier le résultat', copied: 'Copié', share: 'Lien de partage', print: 'Imprimer', hyp: 'Hypothèses retenues', hypText: 'Micro : {m} de cotisations ({a} avec l’Acre) et {c} de formation professionnelle sur le chiffre d’affaires hors TVA. Au réel : barème 2026 des artisans sur le bénéfice abattu de {ab}. Non compris : impôt sur le revenu (sauf versement libératoire), taxe de chambre de métiers, cotisation foncière des entreprises.', method: 'Méthode et limites', aria: 'Répartition du chiffre d’affaires' },
  en: { metier: 'Activity', m_vtc_plateforme: 'VTC with a platform', m_vtc_propre: 'VTC, own clients', m_taxi: 'Taxi', statut: 'Status', micro: 'Micro', reel: 'Real profit', courses: 'Rides per week', prix: 'Average fare paid by the rider', heures: 'Hours worked per week', semaines: 'Weeks worked per year', commission: 'Platform commission', commissionHelp: 'Assumption: enter the rate on your platform statement.', adv: 'Costs, VAT and options', carburant: 'Fuel or charging', vehicule: 'Vehicle: loan, lease or rental', assurance: 'Insurance', entretien: 'Servicing, tyres, roadworthiness test', licence: 'Licence: rent or loan repayment', autres: 'Other costs (phone, accountant, tolls, cleaning)', parMois: '€/month', caDirect: 'Or annual takings (replaces rides × fare)', baseCa: 'Turnover declared', base_client: 'Price paid by riders', base_verse: 'Amount paid out by the platform', baseHelp: 'What to declare depends on how the platform invoices: check with Urssaf or your accountant.', optTva: 'VAT', tvaAuto: 'Based on turnover', tvaOpt: 'Opt into VAT', acre: 'Acre (business started from 1 July 2026)', vl: 'Flat-rate income tax option', non: 'No', oui: 'Yes',
    head: 'Estimated net income per month', headSub: 'before income tax', horaire: 'per hour worked', an: 'Per year', ca: 'Takings collected', tva: 'VAT to pay over ({tx})', comm: 'Platform commission', charges: 'Vehicle and running costs', cotis: 'Social contributions and training levy', impot: 'Tax (flat-rate option)', net: 'Net income', regime_franchise: 'VAT exemption: nothing to pay over.', regime_tolerance: 'Between the two exemption thresholds: no VAT this year, VAT next year if turnover stays above {f}.', regime_assujetti: 'Turnover above the exemption threshold (or opted in): your fares include {tx} VAT.', seuilMicro: 'Turnover above the micro-enterprise ceiling ({s} in 2026): the scheme ends after two years over it.', sousGarantie: 'After commission, a ride earns you less than the {g} minimum guaranteed by the platform sector agreement.', parCourse: 'Net per ride after commission', copy: 'Copy result', copied: 'Copied', share: 'Share link', print: 'Print', hyp: 'Assumptions used', hypText: 'Micro: {m} contributions ({a} with Acre) and {c} training levy on turnover excluding VAT. Real profit: 2026 craft-worker scale on profit less the {ab} allowance. Not included: income tax (unless flat-rate option), chamber of trades levy, local business tax (CFE).', method: 'Method and limits', aria: 'How your takings are split' },
};
const METIERS: Metier[] = ['vtc_plateforme', 'vtc_propre', 'taxi'];

export default function RevenueCalculator({ lang = 'fr', methodHref }: { lang?: L; methodHref?: string }) {
  const $ = (x: number, d = 0) => formatMoney(x, d, lang);
  const pc = (x: number) => formatPercent(x, 1, lang);
  const fill = (x: string) => x.replace('{f}', $(P.tva.franchise_services)).replace('{s}', $(P.micro.seuil_services)).replace('{g}', $(P.plateformes.revenu_min_course)).replace('{tx}', formatPercent(P.tva.taux_transport, 0, lang))
    .replace('{m}', pc(P.micro.taux_bic_services)).replace('{a}', pc(P.micro.taux_acre_debut_des_juillet)).replace('{c}', pc(P.micro.cfp_artisan)).replace('{ab}', formatPercent(P.tns.abattement_taux, 0, lang));
  const t = Object.fromEntries(Object.entries(TX[lang]).map(([k, v]) => [k, fill(v)])) as typeof TX['fr'];
  const sp = new URLSearchParams();
  const [metier, setMetier] = useState<Metier>((str(sp, 'm', 'vtc_plateforme') as Metier));
  const d0 = DEFAULTS[metier];
  const [statut, setStatut] = useState<Statut>('micro');
  const [courses, setCourses] = useState(d0.coursesSemaine);
  const [prix, setPrix] = useState(d0.prixMoyen);
  const [heures, setHeures] = useState(d0.heuresSemaine);
  const [semaines, setSemaines] = useState(d0.semaines);
  const [commission, setCommission] = useState((d0.commission ?? 0) * 100);
  const [carburant, setCarburant] = useState(d0.carburantMois);
  const [vehicule, setVehicule] = useState(d0.vehiculeMois);
  const [assurance, setAssurance] = useState(d0.assuranceMois);
  const [entretien, setEntretien] = useState(d0.entretienMois);
  const [licence, setLicence] = useState(d0.licenceMois ?? 0);
  const [autres, setAutres] = useState(d0.autresMois);
  const [caAnnuel, setCaAnnuel] = useState(0);
  const [baseCa, setBaseCa] = useState<BaseCa>('client');
  const [optTva, setOptTva] = useState('0');
  const [acre, setAcre] = useState('0');
  const [vl, setVl] = useState('0');
  const [copied, setCopied] = useState(false);

  const applyDefaults = (m: Metier) => {
    const d = DEFAULTS[m];
    setCourses(d.coursesSemaine); setPrix(d.prixMoyen); setHeures(d.heuresSemaine); setSemaines(d.semaines); setCommission((d.commission ?? 0) * 100);
    setCarburant(d.carburantMois); setVehicule(d.vehiculeMois); setAssurance(d.assuranceMois); setEntretien(d.entretienMois); setLicence(d.licenceMois ?? 0); setAutres(d.autresMois);
  };
  useEffect(() => {
    const u = readParams(window.location.search);
    if (![...u.keys()].length) return;
    const m = (METIERS.includes(str(u, 'm', 'vtc_plateforme') as Metier) ? str(u, 'm', 'vtc_plateforme') : 'vtc_plateforme') as Metier;
    const d = DEFAULTS[m];
    setMetier(m); setStatut(str(u, 's', 'micro') === 'reel' ? 'reel' : 'micro');
    setCourses(num(u, 'c', d.coursesSemaine)); setPrix(num(u, 'p', d.prixMoyen)); setHeures(num(u, 'h', d.heuresSemaine)); setSemaines(num(u, 'w', d.semaines)); setCommission(num(u, 'k', (d.commission ?? 0) * 100));
    setCarburant(num(u, 'f', d.carburantMois)); setVehicule(num(u, 'v', d.vehiculeMois)); setAssurance(num(u, 'a', d.assuranceMois)); setEntretien(num(u, 'e', d.entretienMois)); setLicence(num(u, 'li', d.licenceMois ?? 0)); setAutres(num(u, 'o', d.autresMois));
    setCaAnnuel(num(u, 'ca', 0)); setBaseCa(str(u, 'b', 'client') === 'verse' ? 'verse' : 'client'); setOptTva(str(u, 'tv', '0')); setAcre(str(u, 'ac', '0')); setVl(str(u, 'vl', '0'));
  }, []);

  const r = useMemo(() => revenuNet({ metier, statut, coursesSemaine: courses, prixMoyen: prix, semaines, heuresSemaine: heures, caAnnuel, commission: commission / 100, baseCa, carburantMois: carburant, vehiculeMois: vehicule, assuranceMois: assurance, entretienMois: entretien, licenceMois: licence, autresMois: autres, optionTva: optTva === '1', acre: acre === '1', versementLiberatoire: vl === '1' }),
    [metier, statut, courses, prix, semaines, heures, caAnnuel, commission, baseCa, carburant, vehicule, assurance, entretien, licence, autres, optTva, acre, vl]);

  useEffect(() => { updateURL({ m: metier, s: statut, c: courses, p: prix, h: heures, w: semaines, k: commission, f: carburant, v: vehicule, a: assurance, e: entretien, li: licence, o: autres, ca: caAnnuel || undefined, b: baseCa, tv: optTva, ac: acre, vl }); },
    [metier, statut, courses, prix, heures, semaines, commission, carburant, vehicule, assurance, entretien, licence, autres, caAnnuel, baseCa, optTva, acre, vl]);

  const plateforme = metier === 'vtc_plateforme';
  const total = Math.max(r.caClient, 1);
  const net = Math.max(0, r.netAnnuel);
  const segs = [
    { label: t.net, value: net, color: '#111827' },
    { label: t.cotis, value: r.cotisations + r.impotLiberatoire, color: '#64748b' },
    { label: t.charges, value: r.charges.total, color: '#cbd5e1' },
    ...(plateforme ? [{ label: t.comm, value: r.commission + (baseCa === 'verse' ? r.caClient - r.caDeclareTtc : 0), color: '#f59e0b' }] : []),
    { label: t.tva, value: r.tva, color: '#fde68a' },
  ];
  const rows: Array<[string, string]> = [
    [t.ca, $(r.caClient)],
    ...(r.tva > 0 ? [[t.tva, `− ${$(r.tva)}`] as [string, string]] : []),
    ...(plateforme ? [[t.comm, `− ${$(r.commission + (baseCa === 'verse' ? r.caClient - r.caDeclareTtc : 0))}`] as [string, string]] : []),
    [t.charges, `− ${$(r.charges.total)}`],
    [t.cotis, `− ${$(r.cotisations)}`],
    ...(r.impotLiberatoire > 0 ? [[t.impot, `− ${$(r.impotLiberatoire)}`] as [string, string]] : []),
    [t.net, $(r.netAnnuel)],
  ];
  const copy = () => { const txt = `${t.head} : ${$(r.netMensuel)} (${$(r.netHoraire, 2)} ${t.horaire}) · ${window.location.href}`; navigator.clipboard?.writeText(txt).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1500); }); };

  return (
    <div className="rechner not-prose rounded-xl border border-navy-200 bg-white p-4 sm:p-6" data-chrome>
      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] lg:items-start lg:gap-6">
      <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
        <div className="grid gap-x-4 gap-y-4 sm:grid-cols-2">
          <SelectField id="rv-m" label={t.metier} value={metier} onChange={(x) => { const m = x as Metier; setMetier(m); applyDefaults(m); }} options={METIERS.map((m) => ({ value: m, label: t[`m_${m}` as const] }))} />
          <Toggle id="rv-s" label={t.statut} value={statut} onChange={(x) => setStatut(x as Statut)} options={[{ value: 'micro', label: t.micro }, { value: 'reel', label: t.reel }]} />
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-4">
          <NumberField id="rv-c" label={t.courses} value={courses} onChange={setCourses} max={500} lang={lang} />
          <NumberField id="rv-p" label={t.prix} value={prix} onChange={setPrix} unit="€" max={2000} decimals={2} lang={lang} />
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-4">
          <NumberField id="rv-h" label={t.heures} value={heures} onChange={setHeures} unit="h" max={100} lang={lang} />
          <NumberField id="rv-w" label={t.semaines} value={semaines} onChange={setSemaines} max={52} lang={lang} />
        </div>
        {plateforme && <div className="grid grid-cols-2 gap-x-4 gap-y-4"><NumberField id="rv-k" label={t.commission} value={commission} onChange={setCommission} unit="%" max={60} decimals={1} help={t.commissionHelp} lang={lang} /></div>}
        <details className="rounded-lg border border-navy-200 p-4">
          <summary className="cursor-pointer text-sm font-semibold text-navy-900">{t.adv}</summary>
          <div className="mt-4 space-y-4">
            <div className="grid grid-cols-2 gap-x-4 gap-y-4">
              <NumberField id="rv-f" label={t.carburant} value={carburant} onChange={setCarburant} unit={t.parMois} max={10000} lang={lang} />
              <NumberField id="rv-v" label={t.vehicule} value={vehicule} onChange={setVehicule} unit={t.parMois} max={20000} lang={lang} />
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-4">
              <NumberField id="rv-a" label={t.assurance} value={assurance} onChange={setAssurance} unit={t.parMois} max={10000} lang={lang} />
              <NumberField id="rv-e" label={t.entretien} value={entretien} onChange={setEntretien} unit={t.parMois} max={10000} lang={lang} />
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-4">
              <NumberField id="rv-o" label={t.autres} value={autres} onChange={setAutres} unit={t.parMois} max={20000} lang={lang} />
              {metier === 'taxi' ? <NumberField id="rv-li" label={t.licence} value={licence} onChange={setLicence} unit={t.parMois} max={20000} lang={lang} /> : <NumberField id="rv-ca" label={t.caDirect} value={caAnnuel} onChange={setCaAnnuel} unit="€" max={2000000} lang={lang} />}
            </div>
            {metier === 'taxi' && <div className="grid grid-cols-2 gap-x-4 gap-y-4"><NumberField id="rv-ca2" label={t.caDirect} value={caAnnuel} onChange={setCaAnnuel} unit="€" max={2000000} lang={lang} /></div>}
            {plateforme && <div className="grid gap-x-4 gap-y-4 sm:grid-cols-2"><SelectField id="rv-b" label={t.baseCa} value={baseCa} onChange={(x) => setBaseCa(x as BaseCa)} options={[{ value: 'client', label: t.base_client }, { value: 'verse', label: t.base_verse }]} help={t.baseHelp} /></div>}
            <div className="grid gap-x-4 gap-y-4 sm:grid-cols-3">
              <SelectField id="rv-tv" label={t.optTva} value={optTva} onChange={setOptTva} options={[{ value: '0', label: t.tvaAuto }, { value: '1', label: t.tvaOpt }]} />
              {statut === 'micro' && <SelectField id="rv-ac" label={t.acre} value={acre} onChange={setAcre} options={[{ value: '0', label: t.non }, { value: '1', label: t.oui }]} />}
              {statut === 'micro' && <SelectField id="rv-vl" label={t.vl} value={vl} onChange={setVl} options={[{ value: '0', label: t.non }, { value: '1', label: t.oui }]} />}
            </div>
          </div>
        </details>
      </form>

      <div aria-live="polite" className="mt-6 lg:mt-0 lg:sticky lg:top-20 rounded-xl border border-navy-200 bg-amber-50/60 p-4 sm:p-5">
        <p className="text-sm font-medium text-navy-700">{t.head} <span className="text-navy-600">({t.headSub})</span></p>
        <p className="tabular-nums mt-1 text-4xl font-bold text-navy-900">{$(r.netMensuel)}</p>
        <p className="tabular-nums mt-1 text-navy-700">{$(r.netHoraire, 2)} {t.horaire} · {t.an} : {$(r.netAnnuel)}</p>
        <div className="mt-4"><StackedBar segments={segs} total={total} ariaPrefix={t.aria} /></div>
        <table className="mt-4 w-full text-sm"><tbody className="divide-y divide-navy-200">
          {rows.map(([l, x], i) => <tr key={l} className={i === rows.length - 1 ? 'font-semibold' : ''}><td className="py-1.5 pr-3 text-navy-700">{l}</td><td className="tabular-nums py-1.5 text-right text-navy-900">{x}</td></tr>)}
          {plateforme && r.netParCourse > 0 && <tr><td className="py-1.5 pr-3 text-navy-700">{t.parCourse}</td><td className="tabular-nums py-1.5 text-right text-navy-900">{$(r.netParCourse, 2)}</td></tr>}
        </tbody></table>
        <ul className="mt-3 space-y-1 text-sm text-navy-700">
          <li>{t[`regime_${r.regimeTva}` as const]}</li>
          {r.depasseSeuilMicro && <li className="font-medium text-amber-800">{t.seuilMicro}</li>}
          {r.sousRevenuMinCourse && <li className="font-medium text-amber-800">{t.sousGarantie}</li>}
        </ul>
        <details className="mt-3 text-sm text-navy-700"><summary className="cursor-pointer font-medium">{t.hyp}</summary><p className="mt-2">{t.hypText} {methodHref && <a href={methodHref} className="underline">{t.method}</a>}</p></details>
        <div className="mt-4 flex flex-wrap gap-2 text-sm no-print">
          <button type="button" onClick={copy} className="rounded-lg border border-navy-300 bg-white px-3 py-2 font-medium text-navy-800 hover:bg-navy-50">{copied ? t.copied : t.copy}</button>
          <button type="button" onClick={() => navigator.clipboard?.writeText(window.location.href)} className="rounded-lg border border-navy-300 bg-white px-3 py-2 font-medium text-navy-800 hover:bg-navy-50">{t.share}</button>
          <button type="button" onClick={() => window.print()} className="rounded-lg border border-navy-300 bg-white px-3 py-2 font-medium text-navy-800 hover:bg-navy-50">{t.print}</button>
        </div>
      </div>
    </div>
    </div>
  );
}

