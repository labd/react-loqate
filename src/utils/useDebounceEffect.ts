import { useCallback, useEffect } from 'react';

function useDebounceEffect(
  effect: () => void,
  delay: number | undefined,
  deps: string[]
) {
  const callback = useCallback(effect, deps);

  useEffect(() => {
    if (!delay) {
      callback();
      return;
    }

    const handler = setTimeout(() => {
      callback();
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [callback, delay]);
}

export default useDebounceEffect;
