/** Coût d'accès au métier (VTC, taxi, ambulancier). Moteur : lib/engine/acces.ts > coutAcces. */
import { useEffect, useMemo, useState } from 'react';
import NumberField from '../ui/NumberField';
import SelectField from '../ui/SelectField';
import { coutAcces, type MetierAcces } from '../../lib/engine/acces';
import { P } from '../../lib/engine/params';
import { formatMoney } from '../../lib/format';
import { readParams, num, str, updateURL } from '../../lib/url-state';

type L = 'fr' | 'en';
const TX = {
  fr: { metier: 'Métier visé', vtc: 'Chauffeur VTC', taxi: 'Chauffeur de taxi', ambulancier: 'Ambulancier (DEA)', formation: 'Formation (prix du devis)', formationHelp: 'Service-public : de {min} à {max} pour une formation taxi ou VTC.', formationAmb: 'Formation au diplôme d’État (devis de l’institut)', medecin: 'Visite chez le médecin agréé', medecinHelp: 'Tarif annoncé par le médecin : saisissez le vôtre.', psc1: 'Formation PSC1 (premiers secours)', licence: 'Achat de la licence (0 si gratuite ou louée)', demarrage: 'Démarrage : apport ou 1er loyer du véhicule, assurance, équipements', garantie: 'Véhicule ni à vous ni loué plus de 6 mois ?', non: 'Non', oui: 'Oui', head: 'Coût total avant de commencer', regl: 'dont frais réglementés', priv: 'dont vos montants', l_formation: 'Formation', l_examen: 'Examen T3P complet (tarif 2026 des CMA)', l_medecin: 'Médecin agréé', l_carte: 'Carte professionnelle (environ)', l_registre: 'Inscription au registre des VTC', l_vignette: 'Vignette VTC (environ)', l_garantie: 'Garantie financière, par véhicule', l_psc1: 'PSC1', l_licence: 'Licence (ADS)', l_demarrage: 'Démarrage', regle: 'réglementé', saisi: 'votre montant', note: 'Les frais réglementés viennent de service-public et des CMA ; tout le reste est ce que vous saisissez. La licence peut aussi être demandée gratuitement en mairie (liste d’attente) ou louée.' },
  en: { metier: 'Target job', vtc: 'VTC driver', taxi: 'Taxi driver', ambulancier: 'Ambulance worker (DEA)', formation: 'Training (quoted price)', formationHelp: 'Service-public: {min} to {max} for taxi or VTC training.', formationAmb: 'State diploma training (institute quote)', medecin: 'Approved doctor’s check-up', medecinHelp: 'Fee quoted by the doctor: enter yours.', psc1: 'PSC1 first-aid course', licence: 'Licence purchase (0 if free or rented)', demarrage: 'Start-up: vehicle deposit or first rent, insurance, equipment', garantie: 'Vehicle neither owned nor leased over 6 months?', non: 'No', oui: 'Yes', head: 'Total cost before you start', regl: 'of which regulated fees', priv: 'of which your own figures', l_formation: 'Training', l_examen: 'Full T3P exam (CMA 2026 fee)', l_medecin: 'Approved doctor', l_carte: 'Driver card (approx.)', l_registre: 'VTC register entry', l_vignette: 'VTC sticker (approx.)', l_garantie: 'Financial guarantee, per vehicle', l_psc1: 'PSC1', l_licence: 'Licence (ADS)', l_demarrage: 'Start-up', regle: 'regulated', saisi: 'your figure', note: 'Regulated fees come from service-public and the CMAs; everything else is what you enter. A licence can also be requested free from the town hall (waiting list) or rented.' },
};

export default function AccessCost({ lang = 'fr' }: { lang?: L }) {
  const t = TX[lang]; const $ = (x: number) => formatMoney(x, 0, lang);
  const [metier, setMetier] = useState<MetierAcces>('vtc');
  const [formation, setFormation] = useState(1500);
  const [medecin, setMedecin] = useState(50);
  const [psc1, setPsc1] = useState(60);
  const [licence, setLicence] = useState(0);
  const [demarrage, setDemarrage] = useState(2000);
  const [garantie, setGarantie] = useState('0');
  useEffect(() => { const u = readParams(window.location.search); if (![...u.keys()].length) return;
    const m = str(u, 'm', 'vtc'); setMetier((['vtc', 'taxi', 'ambulancier'].includes(m) ? m : 'vtc') as MetierAcces);
    setFormation(num(u, 'f', 1500)); setMedecin(num(u, 'md', 50)); setPsc1(num(u, 'ps', 60)); setLicence(num(u, 'li', 0)); setDemarrage(num(u, 'd', 2000)); setGarantie(str(u, 'g', '0')); }, []);
  useEffect(() => { updateURL({ m: metier, f: formation, md: medecin, ps: psc1, li: licence, d: demarrage, g: garantie }); }, [metier, formation, medecin, psc1, licence, demarrage, garantie]);
  const r = useMemo(() => coutAcces({ metier, formation, medecin, psc1, licence, demarrage, garantieFinanciere: garantie === '1' }), [metier, formation, medecin, psc1, licence, demarrage, garantie]);
  const help = t.formationHelp.replace('{min}', $(P.acces.formation_cout_min)).replace('{max}', $(P.acces.formation_cout_max));
  return (
    <div className="rechner not-prose rounded-xl border border-navy-200 bg-white p-4 sm:p-6" data-chrome>
      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] lg:items-start lg:gap-6">
      <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
        <div className="grid gap-x-4 gap-y-4 sm:grid-cols-2">
          <SelectField id="ac-m" label={t.metier} value={metier} onChange={(x) => setMetier(x as MetierAcces)} options={(['vtc', 'taxi', 'ambulancier'] as const).map((m) => ({ value: m, label: t[m] }))} />
          {metier === 'vtc' && <SelectField id="ac-g" label={t.garantie} value={garantie} onChange={setGarantie} options={[{ value: '0', label: t.non }, { value: '1', label: t.oui }]} />}
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-4">
          <NumberField id="ac-f" label={metier === 'ambulancier' ? t.formationAmb : t.formation} value={formation} onChange={setFormation} unit="€" max={50000} help={metier === 'ambulancier' ? undefined : help} lang={lang} />
          <NumberField id="ac-md" label={t.medecin} value={medecin} onChange={setMedecin} unit="€" max={2000} help={t.medecinHelp} lang={lang} />
        </div>
        {metier === 'taxi' && <div className="grid grid-cols-2 gap-x-4 gap-y-4">
          <NumberField id="ac-ps" label={t.psc1} value={psc1} onChange={setPsc1} unit="€" max={2000} lang={lang} />
          <NumberField id="ac-li" label={t.licence} value={licence} onChange={setLicence} unit="€" max={2000000} lang={lang} />
        </div>}
        <div className="grid grid-cols-2 gap-x-4 gap-y-4"><NumberField id="ac-d" label={t.demarrage} value={demarrage} onChange={setDemarrage} unit="€" max={500000} lang={lang} /></div>
      </form>
      <div aria-live="polite" className="mt-6 lg:mt-0 lg:sticky lg:top-20 rounded-xl border border-navy-200 bg-amber-50/60 p-4 sm:p-5">
        <p className="text-sm font-medium text-navy-700">{t.head}</p>
        <p className="tabular-nums mt-1 text-4xl font-bold text-navy-900">{$(r.total)}</p>
        <p className="tabular-nums mt-1 text-navy-700">{t.regl} : {$(r.reglementes)} · {t.priv} : {$(r.prives)}</p>
        <table className="mt-4 w-full text-sm"><tbody className="divide-y divide-navy-200">
          {r.lignes.map((l) => <tr key={l.id}><td className="py-1.5 pr-3 text-navy-700">{t[`l_${l.id}` as keyof typeof t]} <span className="text-xs text-navy-600">({l.regle ? t.regle : t.saisi})</span></td><td className="tabular-nums py-1.5 text-right text-navy-900">{$(l.montant)}</td></tr>)}
        </tbody></table>
        <p className="mt-3 text-sm text-navy-700">{t.note}</p>
      </div>
    </div>
    </div>
  );
}
