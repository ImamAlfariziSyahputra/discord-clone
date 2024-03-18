'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Check, Copy, RefreshCw } from 'lucide-react';

import { useModal } from '@/hooks/use-modal-store';
import { useOrigin } from '@/hooks/use-origin';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function InviteModal() {
  const onOpen = useModal((state) => state.onOpen);
  const isOpen = useModal((state) => state.isOpen);
  const onClose = useModal((state) => state.onClose);
  const type = useModal((state) => state.type);
  const data = useModal((state) => state.data);
  let copyStateTimeout: NodeJS.Timeout;

  const origin = useOrigin();

  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isModalOpen = isOpen && type === 'invite';
  const { server } = data;
  const inviteUrl = `${origin}/invite/${server?.inviteCode}`;

  const onCopy = () => {
    navigator.clipboard.writeText(inviteUrl);
    setCopied(true);

    copyStateTimeout = setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  const onNew = async () => {
    try {
      setIsLoading(true);
      const res = await axios.patch(`/api/servers/${server?.id}/invite-code`);

      onOpen('invite', { server: res.data });
    } catch (err) {
      console.log('err =>', err);
    } finally {
      setIsLoading(false);
    }
  };

  //! clearing Timeout
  useEffect(() => {
    return () => {
      clearTimeout(copyStateTimeout);
    };
  }, []);

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className='overflow-hidden bg-white p-0 text-black'>
        <DialogHeader className='px-6 pt-8'>
          <DialogTitle className='text-center text-2xl font-bold'>
            Invite Friends
          </DialogTitle>
        </DialogHeader>
        <div className='p-6'>
          <Label className='text-xs font-bold uppercase text-zinc-500 dark:text-secondary/70'>
            Server invite link
          </Label>
          <div className='mt-2 flex items-center gap-x-2'>
            <Input
              value={inviteUrl}
              disabled={isLoading}
              className='focus-visible:ring-offset -0 border-0 bg-zinc-300/50 text-black focus-visible:ring-0'
            />
            <Button size='icon' onClick={onCopy} disabled={isLoading}>
              {copied ? (
                <Check className='size-4' />
              ) : (
                <Copy className='size-4' />
              )}
            </Button>
          </div>
          <Button
            variant='link'
            size='sm'
            onClick={onNew}
            disabled={isLoading}
            className='mt-4 text-xs text-zinc-500'
          >
            Generate a new link <RefreshCw className='ml-2 size-4' />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
