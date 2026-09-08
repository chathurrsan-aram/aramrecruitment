import initiatives from '@/data/initiatives';
import InitiativeDetail from '@/components/initiatives/InitiativeDetail';

export function generateStaticParams() {
  return initiatives.map((initiative) => ({
    slug: initiative.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const initiative = initiatives.find((i) => i.slug === slug);
  if (!initiative) return { title: 'Initiative not found' };
  return { title: initiative.title, description: initiative.summary };
}

export default async function InitiativeDetailPage({ params }) {
  const { slug } = await params;
  const initiative = initiatives.find((i) => i.slug === slug);

  return <InitiativeDetail initiative={initiative || null} />;
}
