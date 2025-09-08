import React, {
  type ReactNode,
  type ReactPortal,
  useEffect,
  useState,
} from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  children: ReactNode;
  container?: Element | null;
  disablePortal?: boolean;
}

export default function Portal({
  children,
  container = document.body,
  disablePortal = false,
}: PortalProps): React.ReactElement | ReactPortal | null {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (disablePortal) {
    return <>{children}</>;
  }

  if (!mounted || !container || children == null) {
    return null;
  }

  return createPortal(children, container);
}
