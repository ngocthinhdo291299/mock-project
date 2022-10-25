import { useEffect } from "react";

function useCloseSroll() {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
}
export default useCloseSroll;
