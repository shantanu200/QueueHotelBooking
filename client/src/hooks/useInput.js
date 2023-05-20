import { useState } from "react";

export function useInput(initalValue) {
  const [value, setValue] = useState(initalValue);
  const [error, setError] = useState(false);

  const handleChange = (event) => {
    let nValue = event.target.value;

    if (nValue.length <= 0) {
      setError(true);
    } else {
      setValue(nValue);
      setError(false);
    }
  };

  return [value, handleChange, error];
}
