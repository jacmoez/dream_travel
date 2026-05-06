import { packagesData } from '../../data/packages';
import PackageDetailPage from '../../components/PackageDetailPage';

export default async function PackageRoute({
  params,
}: {
  params: { id: string } | Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  if (!id || !packagesData[id]) {
    return (
      <div className="text-center py-20 text-red-600">
        Package not found. ID: {id}
      </div>
    );
  }

  return <PackageDetailPage packageId={id as keyof typeof packagesData} />;
}

