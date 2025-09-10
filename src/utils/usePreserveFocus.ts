import { useLayoutEffect, useRef, useState } from 'react';

function usePreserveFocus<T extends HTMLElement = HTMLElement>(): {
  elementRef: React.RefObject<T>;
  preserveFocus: () => void;
} {
  const elementRef = useRef<T>(null);
  const [shouldRestoreFocus, setShouldRestoreFocus] = useState(false);

  const preserveFocus = () => {
    if (elementRef.current && document.activeElement === elementRef.current) {
      setShouldRestoreFocus(true);
    }
  };

  useLayoutEffect(() => {
    if (shouldRestoreFocus && elementRef.current) {
      // Use a microtask to ensure this runs after any DOM updates
      Promise.resolve().then(() => {
        if (elementRef.current) {
          elementRef.current.focus();
        }
      });
      setShouldRestoreFocus(false);
    }
  });

  return {
    elementRef,
    preserveFocus,
  };
}

export default usePreserveFocus;
