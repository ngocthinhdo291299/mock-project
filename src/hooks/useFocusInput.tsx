import { useEffect } from "react";

function useFocusInput(inputRef: any) {
  useEffect(() => {
    inputRef.current.focus();
  }, [inputRef]);
}

export default useFocusInput;
