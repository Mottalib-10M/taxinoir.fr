#!/usr/bin/env python3
"""Régénère public/llms.txt depuis le build (RECETTE §21). Usage : npm run build && python3 scripts/build-llms.py && npm run build"""
import glob, html, os, re
SITE = 'https://taxinoir.fr'
rows = {'fr': [], 'en': []}
for f in sorted(glob.glob('dist/*/**/index.html', recursive=True)):
    d = open(f, encoding='utf-8').read()
    if 'noindex' in d[:3000] or '/embed/' in f: continue
    path = '/' + os.path.relpath(os.path.dirname(f), 'dist').replace(os.sep, '/') + '/'
    lang = path.split('/')[1]
    if lang not in rows: continue
    t = html.unescape(re.search(r'<title>(.*?)</title>', d, re.S).group(1))
    m = re.search(r'name="description" content="(.*?)"', d, re.S)
    rows[lang].append((path, t, html.unescape(m.group(1)) if m else ''))
out = ['# TaxiNoir', '', '> Guides et simulateurs pour devenir chauffeur de taxi, de VTC ou ambulancier en France, et calculer son revenu net. Édité par Radif Partners, site indépendant : aucune administration, plateforme, centrale ni centre de formation derrière. Chaque règle cite son texte officiel (code des transports, arrêtés, CMA, Urssaf, service-public) ; les valeurs 2026 vivent dans un fichier de paramètres daté et testé.', '',
       'Les revenus affichés sont des estimations calculées à partir des hypothèses du visiteur et des taux officiels, jamais des promesses. Tous les calculs se font dans le navigateur.', '']
for lang, titre in (('fr', '## Pages en français'), ('en', '## Pages in English')):
    out.append(titre); out.append('')
    for p, t, d in rows[lang]: out.append(f'- [{t}]({SITE}{p}): {d}')
    out.append('')
open('public/llms.txt', 'w', encoding='utf-8').write('\n'.join(out))
print('llms.txt :', sum(len(v) for v in rows.values()), 'pages')
