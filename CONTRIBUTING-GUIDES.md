# Ajouter un guide à taxinoir.fr

Notice pour les agents qui prolongent le site (étape B). À lire en entier avant d'écrire une ligne, avec `~/Documents/GitHub/RECETTE-SITE.md` : §0, §2.3, §3, §6, §7, §9.3, §11, §17.4, §21, §26.

## Principe

Un guide = **un fichier** `src/content/guides/<id>.ts`. Il porte tout, dans les deux langues :

- l'URL française et l'URL anglaise ;
- les titres, la description, le H1, le chapeau, le bloc citable ;
- la FAQ ;
- le corps ;
- les sources ;
- le mini-simulateur ;
- les pages liées.

Le cœur du site le lit seul : routes (`src/i18n/routes.ts`), menus et pied de page (`src/i18n/nav.ts`), sitemap, hreflang réciproque, schémas `Article`, `WebPage`, `FAQPage` et `BreadcrumbList`, cartes « pages associées ». **Ne modifiez aucun fichier du cœur pour ajouter un guide.**

Si le guide a besoin d'un mini-simulateur qui n'existe pas encore, ajoutez **un second fichier** : `src/lib/minis/<kind>.ts`. Il est chargé automatiquement.

Une page outil (formulaire complet) suit le même format dans `src/content/outils/`, avec `tool:` au lieu de `mini:`. Elle demande en plus un composant React dans `src/components/calc/`, branché dans `src/components/ContentPage.astro` : c'est une modification du cœur, à réserver aux vrais outils.

## Étapes

1. **Vérifier la demande.** La requête doit figurer dans `~/Documents/GitHub/reports/volumes-2026-10-04/fr-taxinoir-metier-exact.txt`, ou avoir été mesurée au Keyword Planner (RECETTE §2.0). Un sujet sans requête ne se crée pas (§3).
2. **Vérifier que le sujet n'est pas déjà traité** : `ls src/content/guides src/content/outils`. Taxinoir est le site du **chauffeur**. Les prix de course et « taxi + ville » côté client appartiennent à taxineo.fr : on ne les traite pas ici.
3. **Lire les sources primaires**, et seulement elles :
   - Légifrance (code des transports, arrêtés, conventions collectives) ;
   - service-public.gouv.fr, et sa partie Entreprendre ;
   - exament3p.fr (CMA) ;
   - Urssaf et autoentrepreneur.urssaf.fr ;
   - impots.gouv et BOFiP ;
   - Ameli ;
   - le registre des VTC ;
   - la préfecture de police.

   Un blog, un centre de formation ou un comparateur n'est pas une source.
4. **Ajouter les nouvelles sources** dans `src/data/params-2026.json`, sous `sources` : une clé, une `url` en https, un libellé `fr` et un libellé `en` qui nomment le texte exactement (article, date). Toute nouvelle **valeur** réglementaire (montant, durée, seuil) va dans un bloc du même fichier, jamais en dur dans le texte (§17.4, point 7).
5. **Copier la structure** d'un guide existant (`carte-vtc.ts` est le modèle), **jamais ses phrases**. Changer `id` (= nom du fichier), `group`, `order`, `mini`, `related`, `sources`, puis tout le texte.
6. **Valider la fiche seule** : `PAGE_FILES=<id> npx vitest run tests/pages.test.ts`.
7. **Passer tous les contrôles** (plus bas), puis faire un commit local en français, dernière ligne `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`. Pas de push.

## Les champs

| Champ | Contenu |
|---|---|
| `id` | Égal au nom du fichier. Sert aux liens internes : `h.a('carte-vtc', 'texte')`. |
| `group` | `vtc`, `taxi`, `ambulance`, `revenus` ou `outils`. Fixe la colonne du menu et du pied de page. |
| `order` | Place dans le groupe, par pas de 10 (petit = en haut). |
| `mini` | Nom d'un fichier de `src/lib/minis/`. Le mini-simulateur est placé après le bloc citable et avant le premier H2 (§9.3). |
| `miniHref` | Facultatif : la page vers laquelle renvoie son bouton. Par défaut, le simulateur de revenu net. |
| `related` | 3 à 6 identifiants de pages existantes, voisines du sujet. |
| `sources` | 2 clés de `params-2026.json > sources` au moins : elles s'affichent en fin de page. |
| `fr`, `en` | Le texte, champ par champ, détaillé ci-dessous. |

### Le texte

| Champ | Règle |
|---|---|
| `slug` | Minuscules et tirets, dans la langue de la page. Ni année, ni nombre de trois chiffres : `check-seo` prendrait la page pour une page « par montant ». Évitez aussi les mots `inscription`, `conditions`, `contact`, `legal`, `method`, `cookie` : ils font passer la page pour une page de service. |
| `nav` | Libellé court, pour le menu et le fil d'Ariane. |
| `card` | Une phrase, pour les cartes « pages associées ». |
| `title` | 50 à 60 caractères, avec l'année. Le terme-clé en tête : jamais le pays, un mot d'outil (Simulateur, Calculateur, Calculator), une question ni une rubrique en premier (§11). |
| `description` | 150 à 160 caractères, avec l'année et un fait chiffré tiré des paramètres. Compter avec le test. |
| `h1` | Sans année. |
| `intro` | Une phrase. |
| `resume` | **UN** paragraphe d'au moins 120 mots, citable seul, avec les chiffres et la règle (§21). C'est la réponse à la requête. |
| `faqs` | 4 à 8 questions réelles, réponses de 40 à 90 mots avec le chiffre, la condition et la source (§7). Une question n'existe qu'une fois sur tout le site, toutes langues comprises : le test le vérifie. |
| `body` | Fonction `(h) => \`…\`` qui renvoie du HTML : `h2`, `h3`, `p`, `ul`, `ol`, et `h.table(...)` pour les tableaux. Au moins 1 100 mots avec le bloc citable et la FAQ ; une page pilier (devenir VTC, devenir taxi) en vise 2 000. |

### Les outils du corps (`h`)

| Outil | Rôle |
|---|---|
| `h.a(id, texte)` | Lien interne. Un identifiant inconnu fait échouer le test. |
| `h.eur(n)`, `h.num(n)`, `h.pct(x)` | Nombres au format de la langue : `1 234 €` en français, `€1,234` en anglais. |
| `h.date(iso)` | Date en toutes lettres. |
| `h.table(entêtes, lignes, légende)` | Tableau de style journal. |
| `h.src(clé, texte)` | Lien vers un texte officiel du fichier de paramètres. |
| `h.P` | Les paramètres. Toute valeur réglementaire s'écrit `${A.examen_complet}`, jamais « 241 ». |

`<!--mini:<kind>-->` dans le corps insère un mini-simulateur de plus : une page longue peut en porter plusieurs (§9.3).

### Le mini-simulateur (`src/lib/minis/<kind>.ts`)

- Un ou deux champs, le chiffre du sujet en grand, deux à quatre lignes de détail.
- Il appelle le moteur (`src/lib/engine/`), jamais un calcul refait à côté.
- Tout libellé existe en français et en anglais : `T(l, 'fr', 'en')`.
- Une hypothèse privée (prix d'une formation, d'un médecin, d'un véhicule) est une **saisie** de l'utilisateur, présentée comme telle.
- Ne pas mettre d'année dans un `NumberField` : il l'afficherait « 2 026 ». Utiliser `options`.
- `_kit.ts` fournit `T`, `eur`, `pct`, `num`, `moisAnnee` et `moisOptions`.

## La règle de vérité (non négociable)

- **Chaque règle cite son texte** : article du code des transports, arrêté, décret, fiche service-public, page de la CMA ou de l'Urssaf. **Un point incertain ne se publie pas.** On écrit ce que dit le texte, ou on se tait.
- **Plateformes** (Uber, Bolt, Heetch, G7…) :
  - uniquement ce qu'elles publient elles-mêmes, ou ce qu'en dit une source publique (presse nationale, rapport officiel), cité et daté ;
  - aucune allégation négative non sourcée, aucun dénigrement ;
  - le pied de page porte déjà la mention « site indépendant, non affilié, marques à leurs propriétaires ». Sur une page consacrée à une plateforme, la redire dans le corps : informations indicatives, à vérifier auprès de la plateforme.
- **Revenus** : toujours « estimation du simulateur à partir de vos hypothèses et des taux officiels », jamais une promesse. Un revenu moyen par région ne se publie qu'avec une donnée publique sourcée (Insee, Dares, rapport officiel).
- **Aucun lead, aucun centre de formation, aucun assureur, aucun loueur mis en avant** : pas de nom de centre, pas de lien d'affiliation, pas de publicité tant que l'éditeur ne l'a pas décidée.
- **Faits déjà établis au 2026-10-04**, dans `params-2026.json`. Les plus piégeux :
  - l'accès au métier de VTC par l'expérience est fermé depuis le **12 août 2026** (décret n° 2026-764) ;
  - la loi en vigueur depuis le **27 juin 2026** a renforcé les sanctions et impose de déclarer au registre les conducteurs et les plaques ;
  - le service le.taxi est suspendu depuis le **12 juin 2026** ;
  - la grille des ambulanciers (avenant n° 8 du 6 mai 2025) donne des taux d'embauche **inférieurs au Smic 2026** pour les niveaux 1 et 2 : c'est le Smic qui s'applique. Le texte ne dit pas quel emploi correspond à quel niveau : ne pas l'inventer.

## Ton et langue

- **Français** : voix humaine, phrases de longueur variable, le chiffre d'abord.
- **Anglais** : pour un anglophone qui vit en France et veut devenir chauffeur, pas une traduction mot à mot. Les termes français sont expliqués à leur première apparition : carte professionnelle, préfecture, CMA, micro-entrepreneur, Urssaf. Les montants restent en euros.
- **Interdits** :
  - le tiret cadratin (« — ») ;
  - « il est important de noter », « plongeons », « que vous soyez… ou… » ;
  - « de plus / en outre / par ailleurs » en enfilade, les triplets systématiques, les conclusions qui résument, les émojis.
- **Unicité** (§6) :
  - `check-unique` compare toutes les pages, chiffres neutralisés, avec un seuil de 30 % ;
  - écrivez ce qui n'appartient qu'au sujet (une démarche, un texte, un cas limite), avec un vocabulaire propre ;
  - ne reprenez aucune tournure d'une autre page, y compris d'une langue à l'autre : l'anglais n'est pas la traduction du français.

## Contrôles à passer (tous à 0)

```bash
cd ~/Documents/GitHub/a-publier/Mottalib-10M/taxinoir.fr
export NODE_PATH=$(npm root -g):$PWD/node_modules
npm run build                         # inclut typo-nbsp et check-snippets (bloquant)
npx vitest run
python3 scripts/check-seo.py .
python3 scripts/check-trame.py .
python3 scripts/check-unique.py dist
python3 scripts/check-simulateurs.py .
python3 scripts/check-hreflang.py .
python3 scripts/check-anglais.py .
python3 scripts/check-liens.py .
node scripts/check-contraste.mjs dist
node scripts/check-saisie.mjs dist --max=60
node scripts/check-nombres.mjs dist
node scripts/check-legal.mjs .
node scripts/check-sources.mjs .
node scripts/typo-nbsp.mjs dist --check
node scripts/check-layout.mjs dist > /tmp/layout-taxinoir.log 2>&1 &   # long : en arrière-plan
```

Les scripts de `scripts/` sont des copies de `~/Documents/GitHub/_trame/_template/scripts/`. Si la trame est plus récente, recopiez-les avant de lancer les contrôles.

Pour arrêter un serveur, passez par son port (`lsof -ti tcp:<port> | xargs kill`), jamais `pkill -f` avec un motif court.

**Limites connues** :
- **`check-sources.mjs`** lance ses requêtes en parallèle. Légifrance répond 403 aux robots, et sante.gouv.fr est derrière un contrôle anti-robot. Revérifier en série dans un navigateur ou avec WebFetch avant de conclure qu'un lien est mort.
  - Au 2026-10-04 : 45 sources, 0 morte, 24 Légifrance en 403 (relues avec WebFetch), 3 Urssaf « injoignables » en parallèle mais en 200 en série (la page des taux répond parfois 500, puis 200 au deuxième essai).
- **Le chapeau replié** (`components/Clamp.astro`) coupe après la première phrase : ponctuation, espace, majuscule. Ne commencez pas la deuxième phrase par un chiffre si vous voulez que la coupe tombe là.
- **La racine `/`** redirige vers `/fr/` : elle est contrôlée comme page de redirection, pas comme pilier.

## Ce qui reste à faire (étape B)

Une liste de départ, à confirmer sur les volumes :

- **véhicule** : assurance VTC, location de voiture VTC, voiture VTC (choix, coût au kilomètre), signalétique ;
- **plateformes** : devenir chauffeur Uber, Bolt ou Heetch, d'après leurs conditions publiées ;
- **taxi** : taxi conventionné CPAM ; location de licence, gérance, taxi locataire, artisan taxi ;
- **autres métiers** : VSL ; capacité de transport de personnes, licence de transport ; chauffeur de bus ;
- **gestion** : statuts (micro, SASU), TVA, charges, comptabilité, rentabilité ;
- **positionnement** : VTC premium et chauffeur privé de luxe (clientèle, prix) ; taxi ou VTC ;
- **revenus par grande région**, seulement avec des données publiques sourcées.

**La SASU n'est pas simulée.** Le simulateur de revenu couvre la micro-entreprise et l'entreprise individuelle au réel (EURL à l'IR comprise). Pour l'ajouter, il faudrait sourcer les cotisations de l'assimilé salarié (taux AT, Agirc-Arrco, application des taux réduits aux mandataires) et la fiscalité des dividendes 2026. C'est une évolution du moteur : `src/lib/engine/cotisations.ts`, avec ses tests.

## Ce qu'on ne fait pas

- Pas de dépôt GitHub, pas de push ni de DNS sans validation de l'éditeur.
- Ne toucher ni à `_trame` ni à la RECETTE : les suggestions vont dans le compte rendu.
- Aucune identité personnelle : l'éditeur est Radif Partners.
