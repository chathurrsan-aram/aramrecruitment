const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dhzuwjkkz';

/**
 * Build an optimised Cloudinary video URL.
 * @param {string} publicId - The video's public ID in Cloudinary
 * @param {string} [transforms='q_auto,f_auto'] - Cloudinary transformation string
 * @returns {string} Full Cloudinary delivery URL
 */
export function cloudinaryVideo(publicId, transforms = 'q_auto,f_auto') {
  return `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/${transforms}/${publicId}`;
}

// Hero clips are served from this repo (public/images) rather than from
// Cloudinary: the Cloudinary video renditions started returning broken
// output (frozen frame / black) even though the URLs had worked earlier.
export const heroVideos = {
  // TODO: replace with the long Aram film once a web-encoded copy is added
  // to public/images (see hero-home.mp4 in the README).
  home: '/images/Git_hero.mp4',
  // Upcountry drone loop. The untransformed Cloudinary original streams
  // fine; the q_auto/f_auto renditions do not, so it is requested as-is.
  research: `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/Untitled_osyu5s.mp4`,
  // Played only if the research clip above fails to load.
  researchFallback: '/images/Git_hero.mp4',
};

// Centralised public IDs - update these to match your Cloudinary dashboard
export const videos = {
  heroMain: cloudinaryVideo('aram-final-compressed_zawdjl'),
  researchHero: cloudinaryVideo('Untitled_osyu5s'),
};
