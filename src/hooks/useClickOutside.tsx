import React, { useEffect } from "react";

function useClickOutside(ref: any, callback: () => void) {
  useEffect(() => {
    window.addEventListener("mousedown", (event: any) => {
      if (Array.isArray(ref)) {
        for (let i = 0; i < ref.length; i++) {
          if (ref[i].current && ref[i].current.contains(event.target)) return;
        }
        callback();
        return;
      }
      if (!ref.current.contains(event.target)) {
        callback();
      }
    });
  }, [ref.current, ref, callback]);
}
export default useClickOutside;
