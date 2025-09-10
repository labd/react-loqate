import { renderHook, waitFor } from '@testing-library/react';
import { expect, it, vi } from 'vitest';
import useDebounceEffect from './useDebounceEffect';

it('should debounce the effect', async () => {
  const effectFn = vi.fn();
  const delay = 10;

  const { rerender } = renderHook(
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
