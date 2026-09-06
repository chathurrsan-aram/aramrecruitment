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
  home: '/images/Git_hero.mp4',
  // TODO: replace with the research page's own clip once it is added to
  // public/images; until then the research hero reuses the home clip.
  research: '/images/Git_hero.mp4',
};

// Centralised public IDs - update these to match your Cloudinary dashboard
export const videos = {
  heroMain: cloudinaryVideo('aram-final-compressed_zawdjl'),
  researchHero: cloudinaryVideo('Untitled_osyu5s'),
};
