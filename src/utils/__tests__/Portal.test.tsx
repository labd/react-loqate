import { render, screen } from '@testing-library/react';
import React, { type ReactPortal, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { beforeEach, expect, it, vi } from 'vitest';
import Portal from '../Portal';

vi.mock('react-dom', async () => {
  const actual = await vi.importActual('react-dom');
  return {
    ...actual,
    createPortal: vi.fn(
      (children: React.ReactNode): ReactPortal => children as ReactPortal
    ),
  };
});

const mockCreatePortal = vi.mocked(createPortal);

beforeEach(() => {
  mockCreatePortal.mockClear();
  mockCreatePortal.mockImplementation(
    (children: React.ReactNode): ReactPortal => children as ReactPortal
  );
});

it('renders children directly when disablePortal is true', () => {
  render(
    <div data-testid="parent">
      <Portal disablePortal>
        <div data-testid="child">Portal content</div>
      </Portal>
    </div>
  );

  const parent = screen.getByTestId('parent');
  const child = screen.getByTestId('child');

  expect(child).toBeInTheDocument();
  expect(parent).toContainElement(child);
  expect(mockCreatePortal).not.toHaveBeenCalled();
});

it('calls createPortal when disablePortal is false', async () => {
  render(
    <div data-testid="parent">
      <Portal disablePortal={false}>
        <div data-testid="child">Portal content</div>
      </Portal>
    </div>
  );

  await screen.findByTestId('child');

  expect(mockCreatePortal).toHaveBeenCalledTimes(1);
  expect(mockCreatePortal).toHaveBeenCalledWith(
    expect.anything(),
    document.body
  );
});

it('calls createPortal with default behavior (disablePortal undefined)', async () => {
  render(
    <div data-testid="parent">
      <Portal>
        <div data-testid="child">Portal content</div>
      </Portal>
    </div>
  );

  await screen.findByTestId('child');

  expect(mockCreatePortal).toHaveBeenCalledTimes(1);
  expect(mockCreatePortal).toHaveBeenCalledWith(
    expect.anything(),
    document.body
  );
});

it('uses custom container when provided', async () => {
  const customContainer = document.createElement('div');
  customContainer.setAttribute('data-testid', 'custom-container');
  document.body.appendChild(customContainer);

  render(
    <Portal container={customContainer}>
      <div data-testid="child">Portal content</div>
    </Portal>
  );

  await screen.findByTestId('child');

  expect(mockCreatePortal).toHaveBeenCalledTimes(1);
  expect(mockCreatePortal).toHaveBeenCalledWith(
    expect.anything(),
    customContainer
  );

  document.body.removeChild(customContainer);
});

it('handles mounting state properly', async () => {
  const TestComponent = () => {
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
      // Simulate the mounting behavior to test the mounted state logic
      const timer = setTimeout(() => setShowContent(true), 10);
      return () => clearTimeout(timer);
    }, []);

    return (
      <Portal>
        {showContent && <div data-testid="child">Portal content</div>}
      </Portal>
    );
  };

  render(<TestComponent />);

  expect(screen.queryByTestId('child')).not.toBeInTheDocument();

  await screen.findByTestId('child');
  expect(mockCreatePortal).toHaveBeenCalled();
});

it('returns null when container is null', () => {
  render(
    <Portal container={null}>
      <div data-testid="child">Portal content</div>
    </Portal>
  );

  expect(screen.queryByTestId('child')).not.toBeInTheDocument();
  expect(mockCreatePortal).not.toHaveBeenCalled();
});

it('handles complex children correctly', async () => {
  render(
    <Portal>
      <div data-testid="complex-child">
        <h1>Title</h1>
        <p>Paragraph</p>
        <button type="button">Button</button>
      </div>
    </Portal>
  );

  await screen.findByTestId('complex-child');

  const complexChild = screen.getByTestId('complex-child');
  expect(complexChild).toBeInTheDocument();
  expect(screen.getByText('Title')).toBeInTheDocument();
  expect(screen.getByText('Paragraph')).toBeInTheDocument();
  expect(screen.getByText('Button')).toBeInTheDocument();

  expect(mockCreatePortal).toHaveBeenCalledTimes(1);
});

it('handles multiple portals independently', async () => {
  render(
    <div>
      <Portal>
        <div data-testid="portal1">Portal 1</div>
      </Portal>
      <Portal disablePortal>
        <div data-testid="portal2">Portal 2</div>
      </Portal>
    </div>
  );

  await screen.findByTestId('portal1');
  expect(screen.getByTestId('portal2')).toBeInTheDocument();

  expect(mockCreatePortal).toHaveBeenCalledTimes(1);
});

it('waits for mounting before creating portal', async () => {
  const TestComponent = () => {
    const [showPortal, setShowPortal] = useState(false);

    return (
      <div>
        <button type="button" onClick={() => setShowPortal(true)}>
          Show Portal
        </button>
        {showPortal && (
          <Portal>
            <div data-testid="delayed-child">Delayed Portal content</div>
          </Portal>
        )}
      </div>
    );
  };

  render(<TestComponent />);

  expect(mockCreatePortal).not.toHaveBeenCalled();
  expect(screen.queryByTestId('delayed-child')).not.toBeInTheDocument();

  screen.getByText('Show Portal').click();

  await screen.findByTestId('delayed-child');

  expect(mockCreatePortal).toHaveBeenCalledTimes(1);
});
