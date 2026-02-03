import { ASSET_PATHS } from './assets-version';

const BASE = 'https://wordunscrambler.cc';

export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${BASE}/#organization`,
    name: 'Word Unscrambler',
    url: BASE,
    logo: `${BASE}${ASSET_PATHS.ogImage}`,
    description: 'Free word unscrambler & anagram solver for Wordle, Scrabble, Words with Friends.',
    sameAs: [],
  };
}

export function getWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Word Unscrambler',
    url: BASE,
    description: 'Free word unscrambler & anagram solver for Wordle, Scrabble, Words with Friends.',
    inLanguage: 'en-US',
    publisher: { '@id': `${BASE}/#organization` },
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: `${BASE}/unscramble?q={search_term_string}` },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function getSoftwareApplicationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Word Unscrambler',
    applicationCategory: 'GameApplication',
    operatingSystem: 'Any',
    url: `${BASE}/unscramble`,
    description: 'Free word unscrambler: enter letters and find all valid words.',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };
}

export function getFAQPageSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  };
}
