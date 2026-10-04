import type { Locale } from './routes';
const fr = {
  updatedOn: 'Mis à jour le', editorialPolicy: 'Charte éditoriale', contactLabel: 'Contact', reviewedBy: 'Vérifié par',
  skipToContent: 'Aller au contenu', mainNav: 'Navigation principale', breadcrumbLabel: 'Fil d’Ariane', breadcrumbHome: 'Accueil', menuOpen: 'Ouvrir le menu',
  faqTitle: 'Questions fréquentes', relatedCalculators: 'Pages et simulateurs associés', sourcesTitle: 'Sources', writtenBy: 'Rédigé par',
  asOf: 'Textes et barèmes', lastUpdated: 'vérifiés le', footerValidated: 'Sources : code des transports, CMA, Urssaf, service-public', footerBrowser: '100 % dans votre navigateur · aucune donnée transmise · gratuit',
  footerDisclaimer: 'Site indépendant, édité par Radif Partners. Il n’est affilié à aucune administration, plateforme de réservation, centrale de taxis ni centre de formation ; les marques citées appartiennent à leurs propriétaires. Les revenus affichés sont des estimations calculées à partir de vos hypothèses et des taux officiels, jamais une promesse. Aucune donnée vendue, aucune mise en relation.', footerPopular: '', notFound: 'Cette page n’existe pas.',
  readMore: 'Lire la suite',
};
const en: typeof fr = {
  updatedOn: 'Updated on', editorialPolicy: 'Editorial policy', contactLabel: 'Contact', reviewedBy: 'Checked by',
  skipToContent: 'Skip to content', mainNav: 'Main navigation', breadcrumbLabel: 'Breadcrumb', breadcrumbHome: 'Home', menuOpen: 'Open menu',
  faqTitle: 'Frequently asked questions', relatedCalculators: 'Related pages and calculators', sourcesTitle: 'Sources', writtenBy: 'Written by',
  asOf: 'Rules and rates', lastUpdated: 'checked on', footerValidated: 'Sources: Transport Code, CMA, Urssaf, service-public', footerBrowser: '100% in your browser · no data sent · free',
  footerDisclaimer: 'Independent site published by Radif Partners. It is not affiliated with any government body, ride-hailing platform, taxi dispatcher or training centre; brand names belong to their owners. Earnings shown are estimates computed from your own assumptions and official rates, never a promise; this site does not replace advice from an accountant or the authorities. No data sold, no referrals.', footerPopular: '', notFound: 'This page does not exist.',
  readMore: 'Read more',
};
export function t(lang: Locale) { return lang === 'en' ? en : fr; }
