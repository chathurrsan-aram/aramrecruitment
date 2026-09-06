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

// Centralised public IDs - update these to match your Cloudinary dashboard
export const videos = {
  heroMain: cloudinaryVideo('aram-final-compressed_zawdjl'),
  researchHero: cloudinaryVideo('Untitled_osyu5s'),
};
