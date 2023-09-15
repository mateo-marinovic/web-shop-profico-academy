"use client";
import { useCallback, useState } from "react";

function ItemCounter() {
  const [count, setCount] = useState(0);

  const decrementCount = useCallback(() => {
    setCount(count - 1);
  }, [count]);

  const incrementCount = useCallback(() => {
    setCount(count + 1);
  }, [count]);

  const disable = count <= 0;

  return (
    <>
      <div className="flex h-[45px] w-[440px] flex-row items-center justify-center justify-evenly border-2">
        <button
          disabled={disable}
          onClick={decrementCount}
        >
          -
        </button>
        <span>{count}</span>
        <button onClick={incrementCount}>+</button>
      </div>
    </>
  );
}

export default ItemCounter;
