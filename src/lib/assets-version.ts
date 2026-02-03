/**
 * Logo / favicon version for cache busting on Vercel and CDNs.
 * When you replace logo or favicon files:
 * 1. Bump ASSETS_VERSION (e.g. to 'v3').
 * 2. Add new files: public/icon-v3.svg, public/apple-icon-v3.png (and favicon-v3.ico if used).
 * 3. Update public/manifest.json to use the new versioned paths.
 * This ensures browsers and CDNs fetch the new assets instead of cached old ones.
 */
export const ASSETS_VERSION = 'v2';

export const ASSET_PATHS = {
  icon: `/icon-${ASSETS_VERSION}.svg`,
  appleTouchIcon: `/apple-icon-${ASSETS_VERSION}.png`,
  /** Use for og:image and Organization logo */
  ogImage: `/apple-icon-${ASSETS_VERSION}.png`,
} as const;
