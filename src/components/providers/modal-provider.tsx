'use client';

import { useEffect, useState } from 'react';

import { CreateServerModal } from '@/components/modals/create-server-modal';
import { EditServerModal } from '@/components/modals/edit-server-modal';
import { InviteModal } from '@/components/modals/invite-modal';

export function ModalProvider() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <CreateServerModal />
      <InviteModal />
      <EditServerModal />
    </>
  );
}
