"use client";
import { useState } from "react";

const useInput = (validateValue: (value: string) => boolean) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const valueInputChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEnteredValue(event.target.value);
  };

  const inputBlurHandler = () => {
    setIsTouched(true);
  };

  const reset = () => {
    setEnteredValue("");
    setIsTouched(false);
  };

  const inputValueIsValid = validateValue(enteredValue);

  const enteredValueIsValid = enteredValue.trim() !== "";
  const hasError = !enteredValueIsValid && isTouched;
  return {
    value: enteredValue,
    isValid: inputValueIsValid,
    hasError,
    valueInputChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;
