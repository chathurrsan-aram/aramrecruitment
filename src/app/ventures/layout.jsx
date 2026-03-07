import VenturesProviders from '@/components/ventures/ventures-providers';

export const metadata = {
  title: 'Aram Ventures | Diaspora Venture Intelligence',
  description: 'Connecting UK diaspora capital with vetted, high-potential ventures across Tamil Sri Lanka.',
};

export default function VenturesLayout({ children }) {
  return <VenturesProviders>{children}</VenturesProviders>;
}
