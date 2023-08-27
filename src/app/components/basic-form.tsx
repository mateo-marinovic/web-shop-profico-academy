"use client";
import useInput from "../hooks/use-input";

const isNotEmpty = (value: string) => value.trim() !== "";

interface Props {
  value: string;
  isValid: boolean;
  hasError: boolean;
  valueInputChangeHandler: () => string;
  inputBlurHandler: () => boolean;
  reset: () => string;
}

function BasicForm() {
  const {
    value: nameValue,
    isValid: nameIsValid,
    hasError: nameHasError,
    valueInputChangeHandler: nameOnChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: nameReset,
  } = useInput(isNotEmpty);
  const {
    value: surnameValue,
    isValid: surnameIsValid,
    hasError: surnameHasError,
    valueInputChangeHandler: surnameOnChangeHandler,
    inputBlurHandler: surnameBlurHandler,
    reset: surnameReset,
  } = useInput(isNotEmpty);
  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueInputChangeHandler: emailOnChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: emailReset,
  } = useInput(isNotEmpty);

  let formIsValid = false;
  if (nameIsValid && surnameIsValid && emailIsValid) {
    formIsValid = true;
  }

  const formSubmissionHandler = (event: React.FormEvent) => {
    event.preventDefault();

    console.log(nameValue);
    console.log(surnameValue);
    console.log(emailValue);
    nameReset();
    surnameReset();
    emailReset();
  };

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className="bg-black">
        <div className="">
          <label htmlFor="name">First Name</label>
          <input
            type="text"
            id="name"
            value={nameValue}
            onChange={nameOnChangeHandler}
            onBlur={nameBlurHandler}
          />
          {nameHasError && <p>This field is required!</p>}
        </div>
        <div className="">
          <label htmlFor="last name">Last Name</label>
          <input
            type="text"
            id="last name"
            value={surnameValue}
            onChange={surnameOnChangeHandler}
            onBlur={surnameBlurHandler}
          />
          {surnameHasError && <p>This field is required!</p>}
        </div>
        <div className="">
          <label htmlFor="name">E-Mail Address</label>
          <input
            type="text"
            id="name"
            value={emailValue}
            onChange={emailOnChangeHandler}
            onBlur={emailBlurHandler}
          />
          {emailHasError && <p>This field is required!</p>}
        </div>
        <div className="">
          <button disabled={!formIsValid}>Submit</button>
        </div>
      </div>
    </form>
  );
}

export default BasicForm;
