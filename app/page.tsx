'use client';
import { Button } from '@/core/components';

const Home = () => {
  const testAction = () => {
    // eslint-disable-next-line no-console
    console.log('Clicked');
  };
  return (
    <div>
      <h1>Hello World</h1>
      <Button onClick={testAction}>Click me</Button>
    </div>
  );
};

export default Home;
