import { act, render, waitFor } from '@testing-library/react';
import React, { useState } from 'react';
import { describe, expect, it, vi } from 'vitest';
import usePreserveFocus from './usePreserveFocus';

describe('usePreserveFocus', () => {
  it('calls focus() asynchronously via Promise.resolve when element is focused', async () => {
    const mockFocus = vi.fn();

    function TestComponent() {
      const [count, setCount] = useState(0);
      const { elementRef, preserveFocus } =
        usePreserveFocus<HTMLInputElement>();

      React.useLayoutEffect(() => {
        if (elementRef.current) {
          elementRef.current.focus = mockFocus;
          Object.defineProperty(document, 'activeElement', {
            value: elementRef.current,
            writable: true,
            configurable: true,
          });
        }
      });

      const handleClick = () => {
        preserveFocus();
        setCount(count + 1);
      };

      return (
        <div>
          <input ref={elementRef} data-testid="test-input" />
          <button
            type="button"
            onClick={handleClick}
            data-testid="trigger-action"
          >
            Count: {count}
          </button>
        </div>
      );
    }

    const { getByTestId } = render(<TestComponent />);
    const button = getByTestId('trigger-action');

    act(() => {
      button.click();
    });

    await waitFor(() => {
      expect(mockFocus).toHaveBeenCalledTimes(1);
    });
  });
});
