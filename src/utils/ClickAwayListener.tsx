import { cloneElement, type ReactElement, useEffect, useRef } from 'react';

interface ClickAwayListenerProps {
  children: ReactElement;
  onClickAway: () => void;
}

export default function ClickAwayListener({
  children,
  onClickAway,
}: ClickAwayListenerProps) {
  const nodeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleClickAway = (event: Event) => {
      const target = event.target as Node;

      if (nodeRef.current && !nodeRef.current.contains(target)) {
        onClickAway();
      }
    };

    document.addEventListener('click', handleClickAway, true);
    document.addEventListener('mousedown', handleClickAway, true);
    document.addEventListener('touchstart', handleClickAway, true);

    return () => {
      document.removeEventListener('click', handleClickAway, true);
      document.removeEventListener('mousedown', handleClickAway, true);
      document.removeEventListener('touchstart', handleClickAway, true);
    };
  }, [onClickAway]);

  return cloneElement(children, { ref: nodeRef });
}
