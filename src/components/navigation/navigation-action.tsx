'use client';

import { Plus } from 'lucide-react';

import { useModal } from '@/hooks/use-modal-store';
import { ActionTooltip } from '@/components/shared/action-tooltip';

export const NavigationAction = () => {
  const onOpen = useModal((state) => state.onOpen);

  return (
    <div>
      <ActionTooltip side='right' align='center' label='Add a server'>
        <button
          type='button'
          onClick={() => onOpen('createServer')}
          className='group flex items-center'
        >
          <span className='sr-only'>add server button</span>
          <span className='mx-3 flex size-[48px] items-center justify-center overflow-hidden rounded-[24px] bg-background transition-all group-hover:rounded-[16px] group-hover:bg-emerald-500 dark:bg-neutral-700'>
            <Plus className='size-[25px] text-emerald-500 transition group-hover:text-white' />
          </span>
        </button>
      </ActionTooltip>
    </div>
  );
};
