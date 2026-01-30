/**
 * Schema.org JSON-LD: WebSite + SearchAction, SoftwareApplication, FAQPage.
 */

const BASE = 'https://wordunscrambler.cc';

export interface SchemaWebSite {
  '@context': string;
  '@type': 'WebSite';
  name: string;
  url: string;
  description: string;
  potentialAction: {
    '@type': 'SearchAction';
    target: { '@type': 'EntryPoint'; urlTemplate: string };
    'query-input': string;
  };
}

export function getWebSiteSchema(): SchemaWebSite {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Word Unscrambler',
    url: BASE,
    description: 'Free word unscrambler & anagram solver for Wordle, Scrabble, Words with Friends.',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${BASE}/unscramble?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export interface SchemaSoftwareApplication {
  '@context': string;
  '@type': 'SoftwareApplication';
  name: string;
  applicationCategory: string;
  operatingSystem: string;
  url: string;
  description: string;
  offers: { '@type': string; price: string; priceCurrency: string };
}

export function getSoftwareApplicationSchema(): SchemaSoftwareApplication {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Word Unscrambler',
    applicationCategory: 'GameApplication',
    operatingSystem: 'Any',
    url: `${BASE}/unscramble`,
    description: 'Free word unscrambler: enter letters and find all valid words. For Wordle, Scrabble, Words with Friends.',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface SchemaFAQPage {
  '@context': string;
  '@type': 'FAQPage';
  mainEntity: Array<{
    '@type': 'Question';
    name: string;
    acceptedAnswer: { '@type': 'Answer'; text: string };
  }>;
}

export function getFAQPageSchema(faqs: FAQItem[]): SchemaFAQPage {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ question, answer }) => ({
      '@type': 'Question' as const,
      name: question,
      acceptedAnswer: { '@type': 'Answer' as const, text: answer },
    })),
  };
}
