import { redirect } from 'next/navigation';
import { UserButton } from '@clerk/nextjs';

import { currentProfile } from '@/lib/current-profile';
import { db } from '@/lib/db';
import { ModeToggle } from '@/components/shared/mode-toggle';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { NavigationAction } from './navigation-action';
import { NavigationItem } from './navigation-item';

export async function NavigationSidebar() {
  const profile = await currentProfile();

  if (!profile) return redirect('/');

  const servers = await db.server.findMany({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <div className='flex size-full flex-col items-center space-y-4 py-3 text-primary dark:bg-[#1E1F22]'>
      <NavigationAction />
      <Separator className='mx-auto h-[2px] w-10 rounded-md bg-zinc-300 dark:bg-zinc-700' />
      <ScrollArea className='w-full flex-1'>
        {servers.map((server) => (
          <div key={server.id} className='mb-4'>
            <NavigationItem
              id={server.id}
              name={server.name}
              imageUrl={server.imageUrl}
            />
          </div>
        ))}
      </ScrollArea>
      <div className='mt-auto flex flex-col items-center gap-y-4 pb-3'>
        <ModeToggle />
        <UserButton
          afterSignOutUrl='/'
          appearance={{
            elements: {
              avatarBox: 'size-[48px]',
            },
          }}
        />
      </div>
    </div>
  );
}
