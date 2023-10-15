"use client";
import { useCallback, useState } from "react";

type ItemCounterProps = {
  numberOfItems: number;
  setNumberOfITems: (value: number) => void;
};

function ItemCounter(props: ItemCounterProps) {
  const { setNumberOfITems, numberOfItems } = props;

  const decrementCount = useCallback(() => {
    setNumberOfITems(numberOfItems - 1);
  }, [numberOfItems]);

  const incrementCount = useCallback(() => {
    setNumberOfITems(numberOfItems + 1);
  }, [numberOfItems]);

  const disable = numberOfItems <= 0;

  return (
    <div className="flex h-[45px] w-full flex-row items-center justify-center justify-evenly border-2">
      <button
        disabled={disable}
        onClick={decrementCount}
      >
        -
      </button>
      <span>{numberOfItems}</span>
      <button onClick={incrementCount}>+</button>
    </div>
  );
}

export default ItemCounter;
