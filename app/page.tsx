'use client';

import { Button } from '@components/ui';

export default function Home() {
  return (
    <>
      <Button onClick={() => alert('Hello')}>
        <span className='text-zinc-100'>Hello</span>
      </Button>
    </>
  );
}
