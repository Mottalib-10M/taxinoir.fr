/** Configuration centrale du site (générée par new-site.py). */
export const SITE_URL = "https://taxinoir.fr";
export const SITE_NAMES: Record<string, string> = {"fr": "TaxiNoir", "en": "TaxiNoir"};
export const LANG_TAGS: Record<string, string> = {"fr": "fr-FR", "en": "en-FR"};
export const OG_LOCALES: Record<string, string> = {"fr": "fr_FR", "en": "en_GB"};
/** Une locale par langue (RECETTE §4) : « 1 234 € » en français, « €1,234 » en anglais. */
export const LOCALE_BY_LANG: Record<string, string> = { fr: 'fr-FR', en: 'en-GB' };
export const LOCALE_TAG = 'fr-FR';
export const CURRENCY = 'EUR';
export const YEAR = 2026;
/** Année de création du site — signal d'ancienneté (RECETTE §8.0). */
export const SITE_FOUNDED = '2026';
export const LAST_UPDATED = '2026-10-04';
export const AUTHOR_NAME = 'Radif Partners';
export const AUTHOR_ROLE: Record<string, string> = {"fr": "Éditeur de guides et de simulateurs pour les chauffeurs · taxi, VTC, ambulance", "en": "Publisher of guides and calculators for drivers · taxi, ride-hailing (VTC), ambulance"};
export const AUTHOR_DESC: Record<string, string> = {"fr": "Radif Partners édite des guides pratiques et des simulateurs pour les métiers du transport de personnes, avec les textes officiels (code des transports, préfectures, chambres de métiers, URSSAF) cités et datés sur chaque page.", "en": "Radif Partners publishes practical guides and calculators for passenger-transport drivers in France, citing and dating the official texts (Transport Code, prefectures, chambers of trades, URSSAF) on every page."};
/** Sujets sur lesquels l'editeur est competent (schema.org knowsAbout). Ce sont les
 *  themes reellement traites par le site, pas une liste de mots-cles : un sujet
 *  declare ici sans page qui le couvre est une declaration fausse. */
export const KNOWS_ABOUT: Record<string, string[]> = {"fr": ["Accès à la profession de chauffeur VTC", "Examen T3P taxi et VTC", "Carte professionnelle et registre des VTC", "Autorisation de stationnement (licence de taxi)", "Diplôme d'État d'ambulancier", "Micro-entreprise et cotisations des indépendants", "TVA du transport de personnes", "Revenu net des chauffeurs indépendants"], "en": ["Becoming a VTC (private-hire) driver in France", "T3P taxi and VTC exam", "Driver card and VTC register", "Taxi licence (ADS)", "French State ambulance diploma (DEA)", "Micro-enterprise and self-employed contributions", "VAT on passenger transport", "Net income of self-employed drivers"]};
export const CONTACT_EMAIL = "contact@taxinoir.fr";
export const THEME_COLOR = '#111827';
export const LOGO_SYMBOL = 'TX';
export const BING_VERIFY_CODE = '';
export const GOOGLE_VERIFY_CODE = '';
/** Régime de consentement. 'none' = choix de l'éditeur : aucun bandeau, la mesure
 *  d'audience se charge à l'ouverture de la page et n'est décrite que dans les pages
 *  cookies et confidentialité. */
export const CONSENT_MODE: 'opt-in' | 'notice' | 'none' = 'none';
export const GA4_ID = 'G-TEF1YHQ9X0';
/** Projet Microsoft Clarity (compte amradif). */
export const CLARITY_ID = 'ysy2luztw0';
export const INDEXNOW_KEY = '4f8b2c6e1a9d47b3a5e0c7d2f6b1e938';

/* ------------------------------------------------------------------------- *
 * IDENTITÉ LÉGALE — À COMPLÉTER AVANT LA MISE EN LIGNE
 * Ces champs alimentent la mention légale du pays, la politique de confidentialité,
 * la page contact et le schema Organization. Un champ vide s'affiche en jaune
 * sur le site. Contrôle : `npm run check:legal`.
 * ------------------------------------------------------------------------- */
export interface LegalHosting { name: string; address: string; phone: string; url: string }
export interface LegalIdentity {
  entityName: string; legalForm: string; street: string; postalCode: string; city: string;
  country: string; phone: string; registerLabel: string; registerNumber: string;
  vatLabel: string; vatNumber: string; jurisdiction: string;
  supervisoryAuthority: string; supervisoryAuthorityUrl: string; hosting: LegalHosting;
}
export const LEGAL: LegalIdentity = {
  entityName: 'Radif Partners',  // éditeur de tous les sites du portefeuille (RECETTE §8)
  legalForm: '',  // vide : publication à titre personnel, pas de société
  street: '49 rue du Ressort',
  postalCode: '63000',
  city: 'Clermont-Ferrand',
  country: "France",
  phone: '',                 // ligne de contact publiée
  registerLabel: "SIREN",
  registerNumber: '',
  vatLabel: "TVA",
  vatNumber: '',             // laisser vide si non assujetti
  jurisdiction: "France",
  supervisoryAuthority: "Commission nationale de l'informatique et des libertés (CNIL)",
  supervisoryAuthorityUrl: "https://www.cnil.fr",
  hosting: { name: 'GitHub, Inc. (GitHub Pages)', address: '88 Colin P Kelly Jr Street, San Francisco, CA 94107, United States', phone: '', url: 'https://pages.github.com' },
};

/** Champs sans lesquels le site ne doit pas être mis en ligne. */
export const LEGAL_REQUIRED: Array<keyof LegalIdentity> = ['entityName', 'street', 'postalCode', 'city'];

/** Profils publics de l'auteur (schema.org sameAs). Laisser vide si aucun. */
export const AUTHOR_SAME_AS: string[] = [];

/** Rythme de revue éditoriale annoncé sur le site, en mois. */
export const REVIEW_CYCLE_MONTHS = 12;
