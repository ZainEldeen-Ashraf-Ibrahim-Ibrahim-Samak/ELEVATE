/**
 * Central registry of image assets bundled with the app (public/).
 * The original design photos exceeded the design-export size cap, so the
 * brand poster artwork from the same project is used in their place.
 * To restore photos, drop the originals into public/uploads and remap here.
 */
export const images = {
  wordmark: '/assets/elevate-wordmark.png',
  posterMetal: '/uploads/1c327b3b-055c-439c-850c-d1854c5455f3.jpeg',
  posterMarkWhite: '/uploads/17312e5d-cb77-4961-b23c-f7f5b2d1514b.jpeg',
  posterMarkBlack: '/uploads/101601e3-219a-452c-9719-dada494b92c5.jpeg',
  posterWordWhite: '/uploads/79911fe3-4267-4bca-a927-de18cc19e80b.jpeg',
  posterWordBlack: '/uploads/243e7263-2bc4-4802-9014-38a1888e6cde.jpeg',
} as const;
