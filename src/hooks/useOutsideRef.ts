import { BaseSyntheticEvent, useEffect, useRef, useState } from "react";

export function useOutsideRef<T extends Element>(initialOpen = false) {
  const [open, setOpen] = useState(initialOpen);

  const ref = useRef<T>(null);

  useEffect(() => {
    const handleClick = (event: BaseSyntheticEvent | MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [open, ref]);

  return {
    ref,
    open,
    setOpen,
  };
}
