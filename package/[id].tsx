// pages/package/[id].tsx
import PackageDetailPage, { packagesData } from '@/app/components/PackageDetailPage';
import { useRouter } from 'next/router';


export default function PackageRoute() {
  const router = useRouter();
  const { id } = router.query;
  if (!id || typeof id !== 'string' || !packagesData[id]) {
    return <div>Package not found</div>;
  }
  return <PackageDetailPage packageId={id as keyof typeof packagesData} />;
}