import { Suspense } from 'react';
import PackagesContent from './PackagesContent';

export default function PackagesPage() {
  return (
    <Suspense fallback={<div className="text-center py-20">Loading packages...</div>}>
      <PackagesContent />
    </Suspense>
  );
}