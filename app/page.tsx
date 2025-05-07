'use client';

import { Button } from 'components';

export default function Home() {
  return (
    <div>
      <h1 className='text-red-500'>Hello</h1>
      <Button onClick={() => alert('Hello')}>
        <p>Button 1</p>
      </Button>
    </div>
  );
}
