import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function Dashboard() {
  const redirectURLToLinkedIn = 'localhost:8000/external_app/authorize'
  return (
    <div className="flex min-h-screen items-center justify-center">
      Dashboard screen
      <Link href={redirectURLToLinkedIn}>
        <Button type='secondary'>
          connect LinkedIn account
        </Button>
      </Link>
    </div>
  );
}
export default Dashboard;
