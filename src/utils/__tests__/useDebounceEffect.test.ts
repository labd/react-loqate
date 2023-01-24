import { renderHook } from '@testing-library/react-hooks';
import useDebounceEffect from '../useDebounceEffect';
import { describe, vi, it, expect } from 'vitest';

describe('useDebounceEffect', () => {
  it('should debounce the effect', async () => {
    const effectFn = vi.fn();
    const delay = 100;

    const { rerender, waitFor } = renderHook(
      ({ value }) => useDebounceEffect(effectFn, delay, [value]),
      {
        initialProps: {
          value: 'initial',
        },
      }
    );

    rerender({ value: '#1' });
    rerender({ value: '#2' });
    rerender({ value: '#3' });

    await waitFor(() => {
      expect(effectFn).toHaveBeenCalledTimes(1);
    });
  });
});
