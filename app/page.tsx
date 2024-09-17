'use client';
import useCounter from '@/core/stores/counter';
import { Button } from '@/core/components';

const Home = () => {
  const { count, increment } = useCounter();

  return (
    <div>
      <h1>Hello World</h1>
      <Button onClick={increment}>{count}</Button>
    </div>
  );
};

export default Home;
