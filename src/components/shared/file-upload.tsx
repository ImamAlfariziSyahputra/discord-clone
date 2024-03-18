'use client';

import '@uploadthing/react/styles.css';

import Image from 'next/image';
import { UploadThingRoutes } from '@/app/api/uploadthing/core';
import { X } from 'lucide-react';

import { UploadDropzone } from '@/lib/upload-thing';

type Props = {
  onChange: (url?: string) => void;
  value: string;
  endpoint: UploadThingRoutes;
};

export function FileUpload({ onChange, value, endpoint }: Props) {
  const fileType = value.split('.').pop();

  if (value && fileType !== 'pdf') {
    return (
      <div className='relative'>
        <Image
          src={value}
          alt='Upload'
          width='0'
          height='0'
          sizes='100vw'
          className='size-20 rounded-full object-cover'
          quality={100}
        />
        <button
          type='button'
          onClick={() => onChange('')}
          className='absolute right-0 top-0 rounded-full bg-rose-500 p-1 text-white shadow-sm'
        >
          <span className='sr-only'>clear image button</span>
          <X className='size-4' />
        </button>
      </div>
    );
  }

  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0]?.url);
      }}
      onUploadError={(err) => console.error(err)}
    />
  );
}
