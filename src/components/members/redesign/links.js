/** Destinations outside the V3–V5 previews that every version links to. */
export const links = {
  research: '/research',
  team: '/about',
  join: '/join',
  signIn: '/members/login',
  signOut: '/members/logout',
};

export const shareLinks = caption => [
  { label: 'WhatsApp', href: `https://wa.me/?text=${encodeURIComponent(caption)}` },
  { label: 'Instagram', href: 'https://www.instagram.com/aram.initiative/' },
  { label: 'LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://www.aram.org.uk/join')}` },
];
