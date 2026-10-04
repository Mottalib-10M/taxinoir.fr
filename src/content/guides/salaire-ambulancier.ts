import { defineGuide } from '../../lib/guide-types';
import { P } from '../../lib/engine/params';
import { tauxHoraireAmbulancier, brutAmbulancier, type NiveauAmbulancier } from '../../lib/engine/acces';
import { formatMoney, formatDecimal } from '../../lib/format';

const A = P.ambulancier;
const NIV: NiveauAmbulancier[] = [1, 2, 3];
const H = A.duree_legale_mensuelle_h;
/** Hypothèse d'illustration du tableau (comme le mini-simulateur) : deux dimanches ou jours fériés travaillés dans le mois. */
const DIM = 2;
const fr = (n: number, d = 2) => formatMoney(n, d, 'fr');
const en = (n: number, d = 2) => formatMoney(n, d, 'en');
const t = NIV.map((n) => tauxHoraireAmbulancier(n));
const sous = t.filter((x) => x.smicApplique).length;
const smicMois = A.smic_horaire * H;
const ecart3 = A.taux_horaire_niveau3 - A.smic_horaire;
// Valeurs lues dans params-2026.json ; source : (bloc `ambulancier`) : seuil de revalorisation automatique du Smic en cours d'année,
// lu sur https://www.service-public.gouv.fr/particuliers/vosdroits/F2300 (vérifié le 1er juin 2026).
const SMIC_SEUIL_INFLATION = P.ambulancier.smic_seuil_inflation;

export default defineGuide({
  id: 'salaire-ambulancier',
  group: 'ambulance',
  order: 30,
  mini: 'salaireAmbulancier',
  miniHref: 'devenir-ambulancier',
  related: ['devenir-ambulancier', 'formation-ambulancier', 'salaire-taxi', 'salaire-chauffeur-vtc', 'revenu-net-chauffeur'],
  sources: ['avenantAmbulanciers', 'spSmic', 'arreteDea'],
  fr: {
    slug: 'salaire-ambulancier',
    nav: 'Salaire ambulancier',
    card: 'La grille conventionnelle face au Smic, le brut mensuel par niveau et ce qui s’y ajoute.',
    title: 'Salaire ambulancier 2026 : grille, Smic et brut par niveau',
    description: `Salaire d’ambulancier 2026 : grille de l’avenant n° 8, niveaux 1 et 2 sous le Smic de ${fr(A.smic_horaire)} de l’heure, niveau 3 à ${fr(A.taux_horaire_niveau3)}, brut mensuel calculé par niveau.`,
    h1: 'Salaire d’un ambulancier salarié : la grille et le Smic',
    intro: 'La grille des ambulanciers a pris du retard sur le salaire minimum : pour deux niveaux sur trois, c’est la loi qui fixe le plancher, pas l’accord de branche.',
    resume: `Dans les entreprises de transport sanitaire, le salaire minimum des ambulanciers vient de l’avenant n° 8 du 6 mai 2025 à l’accord du 16 février 2004, étendu et applicable depuis le 1er juin 2025. Il fixe trois taux horaires garantis à l’embauche : ${fr(A.taux_horaire_niveau1)} au niveau 1, ${fr(A.taux_horaire_niveau2)} au niveau 2 et ${fr(A.taux_horaire_niveau3)} au niveau 3, et une indemnité de ${fr(A.indemnite_dimanche_ferie)} pour le travail des dimanches et jours fériés. Or le Smic horaire brut vaut ${fr(A.smic_horaire)} en 2026 selon service-public, et aucun salarié ne peut être payé en dessous. Les niveaux 1 et 2 sont donc relevés au Smic, soit environ ${fr(smicMois, 0)} brut pour ${formatDecimal(H, 2, 'fr')} heures par mois ; le niveau 3 dépasse le Smic de ${fr(ecart3)} de l’heure, soit environ ${fr(brutAmbulancier(3, H, 0).brut, 0)} brut. L’avenant ne dit pas quel emploi relève de quel niveau. Ces montants sont des planchers : heures supplémentaires, ancienneté et primes s’ajoutent selon votre contrat.`,
    faqs: [
      { q: 'Combien gagne un ambulancier débutant en 2026 ?', a: `Au minimum le Smic, soit ${fr(A.smic_horaire)} brut de l’heure et environ ${fr(smicMois, 0)} brut pour un temps plein de ${formatDecimal(H, 2, 'fr')} heures. Si l’employeur vous classe au niveau 3 de la grille, le taux garanti à l’embauche est de ${fr(A.taux_horaire_niveau3)}. S’ajoutent l’indemnité des dimanches et jours fériés travaillés, les heures supplémentaires majorées et les primes prévues par l’entreprise, que le site ne peut pas chiffrer.` },
      { q: 'Pourquoi la grille des ambulanciers est-elle inférieure au Smic ?', a: `L’avenant n° 8 a fixé ses taux en mai 2025 pour une application au 1er juin 2025. Le Smic, revalorisé chaque 1er janvier et parfois en cours d’année, est passé depuis au-dessus des niveaux 1 et 2. Service-public rappelle la règle : quand le minimum conventionnel est inférieur au Smic, l’employeur verse un complément pour l’atteindre. La grille ne prive donc personne du Smic.` },
      { q: 'Quel niveau de la grille correspond à l’ambulancier diplômé d’État ?', a: 'L’avenant n° 8 ne le dit pas : il nomme « ambulancier niveau 1 », « niveau 2 » et « niveau 3 » sans associer ces niveaux à un diplôme ou à un emploi. Nous ne l’inventons donc pas. Votre niveau doit figurer sur votre contrat de travail et sur vos bulletins de paie ; s’il manque, demandez-le par écrit à l’employeur avant de signer.' },
      { q: 'Combien rapporte un dimanche travaillé pour un ambulancier ?', a: `L’avenant fixe à ${fr(A.indemnite_dimanche_ferie)} le montant des indemnités pour travail des dimanches et jours fériés des personnels ambulanciers, depuis le 1er juin 2025. L’article lu ne précise pas l’unité de calcul ; le simulateur compte ce montant une fois par dimanche ou jour férié travaillé. Comparez avec la ligne correspondante de votre bulletin de paie.` },
      { q: 'Les heures supplémentaires comptent-elles pour atteindre le Smic ?', a: 'Non. Selon service-public, les majorations pour heures supplémentaires, les primes d’ancienneté ou d’assiduité, les primes de participation et d’intéressement et les remboursements de frais ne sont pas pris en compte pour vérifier que le Smic est respecté. Le salaire de base, les avantages en nature et les primes liées à la productivité, eux, le sont.' },
    ],
    body: (h) => `
<h2>La grille de l’avenant n° 8</h2>
<p>Les ambulanciers des entreprises privées de transport sanitaire relèvent de la convention collective nationale des transports routiers. Leurs rémunérations minimales sont fixées par l’accord du 16 février 2004, revu par avenants. L’avenant n° 8, signé le 6 mai 2025 et étendu par arrêté du 22 juillet 2025, s’applique depuis le ${h.date(A.grille_date)} à toutes les entreprises de la branche. Il a remplacé l’avenant n° 7 de 2023.</p>
${h.table(['Niveau', 'Taux garanti à l’embauche', 'Smic horaire 2026', 'Taux à payer au minimum'], NIV.map((n, i) => [
  `Ambulancier niveau ${n}`, h.eur(t[i].conventionnel, 2), h.eur(A.smic_horaire, 2), h.eur(t[i].applique, 2) + (t[i].smicApplique ? ' (Smic)' : ''),
]), 'Sources : avenant n° 8 du 6 mai 2025, article 1er ; service-public, fiche F2300')}
<p>L’écart entre les niveaux 1 et 2 n’est que d’un centime, et tous deux sont sous le salaire minimum. Seul le niveau 3 le dépasse, de ${h.eur(ecart3, 2)} de l’heure.</p>

<h2>Pourquoi c’est le Smic qui s’applique</h2>
<p>Le Smic est le salaire horaire en dessous duquel aucun salarié majeur ne peut être payé, quelle que soit la forme de sa rémunération. Service-public est explicite sur le cas d’une grille dépassée : si le minimum conventionnel est inférieur au Smic, l’employeur verse un complément pour l’atteindre ; s’il est supérieur, c’est la convention qui s’applique. Pour ${sous} niveaux sur ${NIV.length}, le chiffre de la grille n’a donc plus d’effet pratique en 2026.</p>
<p>Le Smic est revalorisé chaque 1er janvier, et automatiquement en cours d’année si les prix augmentent d’au moins ${h.pct(SMIC_SEUIL_INFLATION, 0)} depuis la dernière revalorisation. Une grille fixée en mai 2025 prend mécaniquement du retard tant qu’aucun nouvel avenant n’est signé : vérifiez chaque année le taux de votre bulletin.</p>

<h2>Le brut mensuel, niveau par niveau</h2>
<p>Le tableau applique le moteur du site à un temps plein de ${h.num(H, 2)} heures par mois, la durée légale mensuelle, d’abord sans dimanche, puis avec ${DIM} dimanches ou jours fériés travaillés.</p>
${h.table(['Niveau', 'Taux appliqué', 'Brut mensuel', `Avec ${DIM} dimanches ou fériés`], NIV.map((n) => {
  const b0 = brutAmbulancier(n, H, 0), b2 = brutAmbulancier(n, H, DIM);
  return [`Niveau ${n}`, h.eur(b0.applique, 2), h.eur(b0.brut, 0), h.eur(b2.brut, 0)];
}), 'Calcul taxinoir.fr : taux horaire appliqué × heures, plus l’indemnité de l’avenant par jour concerné')}
<p>Ces montants sont bruts. Le net dépend des cotisations salariales et de votre situation, et le site ne les recalcule pas ici. Le mini-simulateur en haut de page reprend le même calcul avec vos heures payées et votre nombre de dimanches.</p>

<h2>Le niveau de chaque emploi : le texte se tait</h2>
<p>L’avenant nomme trois niveaux d’ambulancier, sans dire lequel correspond à l’auxiliaire, au titulaire du diplôme d’État ou à un poste d’encadrement. Faute de texte, nous n’associons aucun emploi à aucun niveau. Le niveau qui vous est attribué doit apparaître sur le contrat et sur chaque bulletin de paie : c’est lui qui détermine votre plancher. La différence entre l’auxiliaire et le diplômé d’État, en termes de missions, est expliquée sur la page ${h.a('devenir-ambulancier', 'devenir ambulancier')}.</p>

<h2>Vérifier votre bulletin de paie</h2>
<p>Trois lignes suffisent pour savoir si le plancher est respecté. D’abord le niveau : il doit être écrit, et c’est lui qui donne le taux de la grille. Ensuite le taux horaire de base : en 2026, il ne peut pas être inférieur à ${h.eur(A.smic_horaire, 2)}, quel que soit le niveau, puisque les primes d’ancienneté et les majorations d’heures supplémentaires ne comptent pas pour atteindre le Smic. Enfin la ligne des dimanches et jours fériés : rapprochez le nombre de jours travaillés du montant versé. En cas d’écart, la première démarche est une demande écrite à l’employeur, en citant l’avenant n° 8 et la fiche F2300 de service-public. Un employeur qui paie sous le Smic s’expose à une amende, rappelle cette fiche.</p>

<h2>Ce que le calcul laisse de côté</h2>
<ul>
<li><strong>Les heures supplémentaires</strong> et leurs majorations : elles s’ajoutent au brut mais ne servent pas à vérifier le respect du Smic, selon service-public.</li>
<li><strong>L’ancienneté</strong> : les primes d’ancienneté sont exclues du calcul du Smic et ne figurent pas dans l’article de l’avenant que nous avons lu.</li>
<li><strong>Les primes et indemnités de l’entreprise</strong> : repas, astreintes ou primes propres à l’employeur dépendent d’autres textes ou du contrat.</li>
<li><strong>Le décompte du temps de travail</strong> : les règles propres aux ambulanciers, dont l’amplitude des journées, ne sont pas dans l’article lu. L’avenant renvoie à l’accord-cadre du 4 mai 2000 modifié ; la page ne chiffre pas ces règles.</li>
<li><strong>L’unité de l’indemnité de dimanche</strong> : l’avenant donne le montant, ${h.eur(A.indemnite_dimanche_ferie, 2)}, sans que l’article lu précise s’il s’agit d’un montant par journée. Le simulateur fait cette hypothèse.</li>
</ul>

<h2>Salarié en ambulance ou chauffeur à son compte</h2>
<p>L’ambulancier est presque toujours salarié : son revenu suit une grille, un contrat et un bulletin. Le chauffeur de taxi ou de VTC travaille souvent à son compte, et son revenu dépend de son chiffre d’affaires et de ses charges. Les deux ne se comparent pas ligne à ligne. Pour un ordre de grandeur côté indépendant, le ${h.a('revenu-net-chauffeur', 'simulateur de revenu net')} part de vos propres hypothèses, et les pages ${h.a('salaire-taxi', 'salaire d’un chauffeur de taxi')} et ${h.a('salaire-chauffeur-vtc', 'salaire d’un chauffeur VTC')} détaillent leurs logiques. Avant d’entrer dans le métier, la page ${h.a('formation-ambulancier', 'formation d’ambulancier')} indique ce que le diplôme demande.</p>
`,
  },
  en: {
    slug: 'ambulance-driver-salary',
    nav: 'Ambulance worker pay',
    card: 'The pay scale against the minimum wage, monthly gross by level, and what comes on top.',
    title: 'Ambulance Driver Salary France 2026: Pay Scale and Smic',
    description: `Ambulance driver salary in France, 2026: levels 1 and 2 of the 2025 scale sit below the ${en(A.smic_horaire)} hourly Smic, level 3 pays ${en(A.taux_horaire_niveau3)}; monthly gross worked out.`,
    h1: 'What ambulance workers are paid in France',
    intro: 'The ambulance pay scale has fallen behind the legal minimum wage, so for most entry levels the law, not the scale, sets your floor.',
    resume: `Ambulance staff in private patient-transport firms are paid under a sector pay agreement: amendment no. 8 of 6 May 2025 to the agreement of 16 February 2004, extended to the whole sector and in force since 1 June 2025. It sets guaranteed hourly rates at hiring of ${en(A.taux_horaire_niveau1)} at level 1, ${en(A.taux_horaire_niveau2)} at level 2 and ${en(A.taux_horaire_niveau3)} at level 3, plus an allowance of ${en(A.indemnite_dimanche_ferie)} for Sunday and bank holiday work. The Smic (salaire minimum interprofessionnel de croissance, France’s statutory minimum wage) is ${en(A.smic_horaire)} gross an hour in 2026, according to service-public.fr, and no adult employee may be paid less. So levels 1 and 2 are lifted to the Smic, about ${en(smicMois, 0)} gross for a full month of ${H} hours, while level 3 comes to about ${en(brutAmbulancier(3, H, 0).brut, 0)}. The amendment does not say which job belongs to which level. These are floors: overtime, seniority and bonuses come on top.`,
    faqs: [
      { q: 'What will I earn in my first ambulance job in France?', a: `At least the Smic: ${en(A.smic_horaire)} gross an hour, roughly ${en(smicMois, 0)} gross a month full time. If your employer places you at level 3, the guaranteed starting rate is ${en(A.taux_horaire_niveau3)}. Sunday and bank holiday allowances, paid overtime and any company bonuses come on top. Gross pay is before employee social contributions, so your take-home amount will be lower.` },
      { q: 'Can an ambulance company legally pay the scale rate if it is below the Smic?', a: 'No. Service-public explains that when the minimum in a collective agreement is lower than the Smic, the employer must top pay up to the Smic. The scale rate only matters when it is higher. In 2026 that is the case for level 3 alone, which is why the hourly rate on your payslip should never show less than the Smic.' },
      { q: 'Which pay level is a qualified ambulancier (DEA holder) on?', a: 'The amendment does not say. It lists “ambulance level 1”, “level 2” and “level 3” without linking them to a diploma or job title, so we will not guess. Your level should appear on your employment contract and payslips. If it is missing, ask the employer to confirm it in writing, because it sets your minimum hourly rate.' },
      { q: 'How is the Sunday allowance for ambulance staff calculated?', a: `Since 1 June 2025 the amendment has set the allowance for Sunday and bank holiday work by ambulance staff at ${en(A.indemnite_dimanche_ferie)}. The article we read does not state the unit, so our calculator applies it once for each Sunday or bank holiday worked. Check the matching line on your payslip to see how your employer applies it.` },
      { q: 'Does overtime count towards the minimum wage check?', a: 'No. Service-public lists what is left out when checking that pay reaches the Smic: overtime premiums, seniority and attendance bonuses, profit-sharing and expense refunds. Basic pay, benefits in kind and productivity bonuses do count. In practice, your basic hourly rate on its own has to reach the Smic.' },
    ],
    body: (h) => `
<h2>The scale as written</h2>
<p>If you work for a private ambulance firm, your contract falls under the national road transport collective agreement (a convention collective is a sector-wide deal between unions and employers that sets minimum terms). Ambulance pay floors sit in a separate agreement of 16 February 2004, updated every few years. The current version, amendment no. 8, was signed on 6 May 2025, extended by ministerial order on 22 July 2025 so that it binds every firm in the sector, and has applied since ${h.date(A.grille_date)}. It replaced amendment no. 7 of 2023.</p>
${h.table(['Level', 'Scale rate at hiring', '2026 hourly Smic', 'Minimum you must be paid'], NIV.map((n, i) => [
  `Ambulance level ${n}`, h.eur(t[i].conventionnel, 2), h.eur(A.smic_horaire, 2), h.eur(t[i].applique, 2) + (t[i].smicApplique ? ' (Smic)' : ''),
]), 'Sources: amendment no. 8 of 6 May 2025, article 1; service-public.fr, page F2300')}
<p>Levels 1 and 2 are just one cent apart and both sit under the minimum wage. Only level 3 clears it, by ${h.eur(ecart3, 2)} an hour.</p>

<h2>The minimum wage always wins</h2>
<p>The Smic is a legal hourly floor for every adult employee, however the pay is structured. Service-public is clear about outdated scales: below the Smic, the employer adds a top-up; above it, the agreement applies. For ${sous} of the ${NIV.length} levels, the printed scale has no practical effect in 2026.</p>
<p>The Smic goes up every 1 January, and automatically during the year if prices rise by ${h.pct(SMIC_SEUIL_INFLATION, 0)} or more since the last increase. A scale fixed in May 2025 therefore drifts further behind until a new amendment is signed. Check the hourly rate on your payslip each January.</p>

<h2>Monthly gross for each level</h2>
<p>Below, the site’s calculator is applied to a full-time month of ${h.num(H, 2)} hours (35 hours a week, France’s legal working week), first with no Sunday work, then with ${DIM} Sundays or bank holidays.</p>
${h.table(['Level', 'Rate applied', 'Gross per month', `With ${DIM} Sundays or holidays`], NIV.map((n) => {
  const b0 = brutAmbulancier(n, H, 0), b2 = brutAmbulancier(n, H, DIM);
  return [`Level ${n}`, h.eur(b0.applique, 2), h.eur(b0.brut, 0), h.eur(b2.brut, 0)];
}), 'taxinoir.fr calculation: hourly rate applied × hours, plus the amendment allowance per day concerned')}
<p>All figures are gross, before employee social contributions; this page does not work out take-home pay. The calculator at the top lets you change paid hours and the number of Sundays.</p>

<h2>Which job sits at which level? Nobody says</h2>
<p>The amendment names three ambulance levels and stops there. It does not tie them to the assistant job, the State diploma or a supervisory role, and we have found no text that does, so we make no link. What matters is the level written on your contract and payslip. For what the assistant and the qualified ambulancier actually do, see ${h.a('devenir-ambulancier', 'how to become an ambulance worker')}.</p>

<h2>Reading your payslip</h2>
<p>A French payslip (bulletin de paie) is long, but you only need three things to check your floor. Look for your level, which should be printed near your job title. Then find the basic hourly rate: in 2026 it must be at least ${h.eur(A.smic_horaire, 2)}, whatever the level, because seniority bonuses and overtime premiums cannot be used to reach the Smic. Last, match the Sunday and bank holiday line against the days you actually worked. If something looks wrong, put a written question to your employer and refer to amendment no. 8 and service-public page F2300, which also notes that paying below the Smic can lead to a fine for the employer.</p>

<h2>Not included in these figures</h2>
<ul>
<li><strong>Overtime</strong>: paid on top, but ignored when checking the Smic, per service-public.</li>
<li><strong>Seniority</strong>: not in the article of the amendment we read, and excluded from the Smic check.</li>
<li><strong>Company extras</strong>: meal allowances, on-call pay or employer bonuses depend on other texts or on your contract.</li>
<li><strong>Working-time rules</strong>: ambulance-specific rules, including the length of the working day (amplitude), are not in the article we read. The amendment refers to the framework agreement of 4 May 2000 as amended; we do not put figures on those rules.</li>
<li><strong>Allowance unit</strong>: the ${h.eur(A.indemnite_dimanche_ferie, 2)} Sunday and holiday allowance is counted per day by our calculator, an assumption the article we read neither confirms nor rules out.</li>
</ul>

<h2>Employee in an ambulance, or self-employed driver?</h2>
<p>Ambulance staff are nearly always employees with a scale, a contract and a payslip. Taxi and VTC drivers are often self-employed, so their income is turnover minus costs and social contributions, which makes a straight comparison misleading. If you are weighing both options, the ${h.a('revenu-net-chauffeur', 'net income calculator')} works from your own figures, and ${h.a('salaire-taxi', 'taxi driver earnings')} and ${h.a('salaire-chauffeur-vtc', 'VTC driver earnings')} explain how each works. To check what the diploma involves first, read ${h.a('formation-ambulancier', 'ambulance training (DEA)')}.</p>
`,
  },
});
