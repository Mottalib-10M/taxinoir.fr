/** Vérificateur de véhicule VTC : critères de l'arrêté du 26 mars 2015 et nombre de places.
 *  Âge calculé au premier rendu avec le jour du build, puis avec la date du jour (RECETTE §17.5). */
import { useEffect, useMemo, useState } from 'react';
import NumberField from '../ui/NumberField';
import SelectField from '../ui/SelectField';
import { verifierVehicule, ageEnMois, finUsageVtc, type Motorisation } from '../../lib/engine/acces';
import { P } from '../../lib/engine/params';
import { formatNumber } from '../../lib/format';
import { readParams, num, str, updateURL } from '../../lib/url-state';

declare const __BUILD_DAY__: string;
type L = 'fr' | 'en';
const MOIS = { fr: ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'], en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'] };
const TX = {
  fr: { mot: 'Motorisation', thermique: 'Essence ou diesel', hybride: 'Hybride', electrique: 'Électrique', annee: 'Année de 1re immatriculation', mois: 'Mois de 1re immatriculation', portes: 'Nombre de portes', places: 'Places, conducteur compris', longueur: 'Longueur hors tout', largeur: 'Largeur hors tout', kw: 'Puissance nette (carte grise, case P.2)', collection: 'Véhicule de collection ?', non: 'Non', oui: 'Oui', ok: 'Conforme', ko: 'Non conforme', exempte: 'Exempté (hybride ou électrique)', head_ok: 'Le véhicule remplit les critères vérifiables ici', head_ko: 'Le véhicule ne remplit pas tous les critères', c_places: 'Places', c_age: 'Âge', c_portes: 'Portes', c_longueur: 'Longueur', c_largeur: 'Largeur', c_puissance: 'Puissance', seuil: 'exigé', mois_u: 'mois', fin: 'Plus utilisable en VTC à partir de', finHelp: 'Un véhicule thermique doit avoir moins de 7 ans.', note: 'Critères lus dans l’arrêté du 26 mars 2015 (version en vigueur depuis le 6 décembre 2023) et sur service-public. Le contrôle technique annuel, l’assurance et la signalétique ne sont pas vérifiés ici.' },
  en: { mot: 'Powertrain', thermique: 'Petrol or diesel', hybride: 'Hybrid', electrique: 'Electric', annee: 'Year first registered', mois: 'Month first registered', portes: 'Number of doors', places: 'Seats, driver included', longueur: 'Overall length', largeur: 'Overall width', kw: 'Net power (registration document, box P.2)', collection: 'Classic (collection) vehicle?', non: 'No', oui: 'Yes', ok: 'Compliant', ko: 'Not compliant', exempte: 'Exempt (hybrid or electric)', head_ok: 'The vehicle meets the criteria checked here', head_ko: 'The vehicle does not meet every criterion', c_places: 'Seats', c_age: 'Age', c_portes: 'Doors', c_longueur: 'Length', c_largeur: 'Width', c_puissance: 'Power', seuil: 'required', mois_u: 'months', fin: 'No longer usable as a VTC from', finHelp: 'A petrol or diesel car must be under 7 years old.', note: 'Criteria read in the order of 26 March 2015 (version in force since 6 December 2023) and on service-public. The yearly roadworthiness test, insurance and markings are not checked here.' },
};

export default function VehicleChecker({ lang = 'fr' }: { lang?: L }) {
  const t = TX[lang]; const n = (x: number, d = 0) => formatNumber(x, d, lang);
  const [today, setToday] = useState(__BUILD_DAY__);
  const buildYear = Number(__BUILD_DAY__.slice(0, 4));
  const [mot, setMot] = useState<Motorisation>('thermique');
  const [annee, setAnnee] = useState(String(buildYear - 3));
  const [mois, setMois] = useState('1');
  const [portes, setPortes] = useState(5);
  const [places, setPlaces] = useState(5);
  const [longueur, setLongueur] = useState(4.7);
  const [largeur, setLargeur] = useState(1.85);
  const [kw, setKw] = useState(100);
  const [collection, setCollection] = useState('0');
  useEffect(() => { setToday(new Date().toISOString().slice(0, 10)); const u = readParams(window.location.search); if (![...u.keys()].length) return;
    const m = str(u, 'mo', 'thermique'); setMot((['thermique', 'hybride', 'electrique'].includes(m) ? m : 'thermique') as Motorisation);
    setAnnee(str(u, 'y', String(buildYear - 3))); setMois(str(u, 'mm', '1')); setPortes(num(u, 'po', 5)); setPlaces(num(u, 'pl', 5)); setLongueur(num(u, 'lo', 4.7)); setLargeur(num(u, 'la', 1.85)); setKw(num(u, 'kw', 100)); setCollection(str(u, 'co', '0')); }, []);
  useEffect(() => { updateURL({ mo: mot, y: annee, mm: mois, po: portes, pl: places, lo: longueur, la: largeur, kw, co: collection }); }, [mot, annee, mois, portes, places, longueur, largeur, kw, collection]);
  const age = ageEnMois(Number(annee), Number(mois), today);
  const r = useMemo(() => verifierVehicule({ motorisation: mot, ageMois: age, portes, places, longueur, largeur, puissanceKw: kw, collection: collection === '1' }), [mot, age, portes, places, longueur, largeur, kw, collection]);
  const fin = finUsageVtc(Number(annee), Number(mois));
  const years = Array.from({ length: 16 }, (_, k) => buildYear - k);
  const V = P.vehicule_vtc;
  const fmt = (id: string, v: number) => id === 'age' ? `${n(v)} ${t.mois_u}` : id === 'longueur' || id === 'largeur' ? `${n(v, 2)} m` : id === 'puissance' ? `${n(v)} kW` : n(v);
  const seuil = (id: string) => id === 'places' ? `${V.places_min}–${V.places_max}` : id === 'age' ? `< ${V.age_max_ans * 12} ${t.mois_u}` : id === 'portes' ? `≥ ${V.portes_min}` : id === 'longueur' ? `≥ ${n(V.longueur_min_m, 2)} m` : id === 'largeur' ? `≥ ${n(V.largeur_min_m, 2)} m` : `≥ ${V.puissance_min_kw} kW`;
  return (
    <div className="rechner not-prose rounded-xl border border-navy-200 bg-white p-4 sm:p-6" data-chrome>
      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] lg:items-start lg:gap-6">
      <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
        <div className="grid gap-x-4 gap-y-4 sm:grid-cols-3">
          <SelectField id="vh-mo" label={t.mot} value={mot} onChange={(x) => setMot(x as Motorisation)} options={(['thermique', 'hybride', 'electrique'] as const).map((m) => ({ value: m, label: t[m] }))} />
          <SelectField id="vh-y" label={t.annee} value={annee} onChange={setAnnee} options={years.map((y) => ({ value: String(y), label: String(y) }))} />
          <SelectField id="vh-mm" label={t.mois} value={mois} onChange={setMois} options={MOIS[lang].map((m, i) => ({ value: String(i + 1), label: m }))} />
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-4">
          <NumberField id="vh-lo" label={t.longueur} value={longueur} onChange={setLongueur} unit="m" max={10} decimals={2} lang={lang} />
          <NumberField id="vh-la" label={t.largeur} value={largeur} onChange={setLargeur} unit="m" max={5} decimals={2} lang={lang} />
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-4">
          <NumberField id="vh-kw" label={t.kw} value={kw} onChange={setKw} unit="kW" max={1000} lang={lang} />
          <NumberField id="vh-po" label={t.portes} value={portes} onChange={setPortes} max={10} lang={lang} />
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-4">
          <NumberField id="vh-pl" label={t.places} value={places} onChange={setPlaces} max={20} lang={lang} />
          <SelectField id="vh-co" label={t.collection} value={collection} onChange={setCollection} options={[{ value: '0', label: t.non }, { value: '1', label: t.oui }]} />
        </div>
      </form>
      <div aria-live="polite" className="mt-6 lg:mt-0 lg:sticky lg:top-20 rounded-xl border border-navy-200 bg-amber-50/60 p-4 sm:p-5">
        <p className={`text-2xl font-bold ${r.conforme ? 'text-green-800' : 'text-red-800'}`}>{r.conforme ? t.head_ok : t.head_ko}</p>
        <table className="mt-4 w-full text-sm"><tbody className="divide-y divide-navy-200">
          {r.criteres.map((c) => <tr key={c.id}><td className="py-1.5 pr-3 text-navy-700">{t[`c_${c.id}` as keyof typeof t]}</td><td className="tabular-nums py-1.5 text-right text-navy-900">{fmt(c.id, c.valeur)} <span className="text-xs text-navy-600">({t.seuil} {seuil(c.id)})</span></td><td className={`py-1.5 pl-3 text-right font-medium ${c.statut === 'ko' ? 'text-red-800' : 'text-green-800'}`}>{t[c.statut]}</td></tr>)}
        </tbody></table>
        {mot === 'thermique' && collection !== '1' && <p className="mt-3 text-sm text-navy-800">{t.fin} : {MOIS[lang][fin.mois - 1]} {fin.annee}. {t.finHelp}</p>}
        <p className="mt-3 text-sm text-navy-700">{t.note}</p>
      </div>
    </div>
    </div>
  );
}
