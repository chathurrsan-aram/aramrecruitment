import initiatives from '@/data/initiatives';
import InitiativeDetail from '@/components/initiatives/InitiativeDetail';

export function generateStaticParams() {
  return initiatives.map((initiative) => ({
    slug: initiative.slug,
  }));
}

export default async function InitiativeDetailPage({ params }) {
  const { slug } = await params;
  const initiative = initiatives.find((i) => i.slug === slug);

  return <InitiativeDetail initiative={initiative || null} />;
}
