'use client';

import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';

import { cn } from '@/lib/utils';
import { ActionTooltip } from '@/components/shared/action-tooltip';

type Props = {
  id: string;
  imageUrl: string;
  name: string;
};

export function NavigationItem({ id, imageUrl, name }: Props) {
  const params = useParams();
  const router = useRouter();

  const onClick = () => {
    router.push(`/servers/${id}`);
  };

  return (
    <ActionTooltip side='right' align='center' label={name}>
      <button
        type='button'
        onClick={onClick}
        className='group relative flex items-center'
      >
        <span className='sr-only'>select server button</span>
        <div
          className={cn(
            'absolute left-0 w-[4px] rounded-r-full bg-primary transition-all',
            params.serverId !== id && 'group-hover:h-[20px]',
            params.serverId === id ? 'h-[36px]' : 'h-[8px]'
          )}
        />
        <div>
          <Image
            src={imageUrl}
            alt='Channel'
            width='0'
            height='0'
            sizes='100vw'
            className={cn(
              'group mx-3 flex size-[48px] overflow-hidden rounded-[24px] object-cover transition-all group-hover:rounded-[16px]',
              params.serverId === id &&
                'rounded-[16px] bg-primary/10 text-primary'
            )}
            quality={100}
          />
        </div>
      </button>
    </ActionTooltip>
  );
}
