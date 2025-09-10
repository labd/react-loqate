import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { expect, it, vi } from 'vitest';
import ClickAwayListener from './ClickAwayListener';

it('calls onClickAway when clicking outside the component', () => {
  const onClickAway = vi.fn();

  render(
    <div>
      <ClickAwayListener onClickAway={onClickAway}>
        <div data-testid="inside">Inside content</div>
      </ClickAwayListener>
      <div data-testid="outside">Outside content</div>
    </div>
  );

  const inside = screen.getByTestId('inside');
  const outside = screen.getByTestId('outside');

  fireEvent.click(inside);
  expect(onClickAway).not.toHaveBeenCalled();

  fireEvent.click(outside);
  expect(onClickAway).toHaveBeenCalledTimes(1);
});

it('does not call onClickAway when clicking inside the component', () => {
  const onClickAway = vi.fn();

  render(
    <div>
      <ClickAwayListener onClickAway={onClickAway}>
        <div data-testid="container">
          <button data-testid="button">Click me</button>
          <span data-testid="span">Some text</span>
        </div>
      </ClickAwayListener>
    </div>
  );

  const container = screen.getByTestId('container');
  const button = screen.getByTestId('button');
  const span = screen.getByTestId('span');

  fireEvent.click(container);
  expect(onClickAway).not.toHaveBeenCalled();

  fireEvent.click(button);
  expect(onClickAway).not.toHaveBeenCalled();

  fireEvent.click(span);
  expect(onClickAway).not.toHaveBeenCalled();
});

it('works with mousedown events', () => {
  const onClickAway = vi.fn();

  render(
    <div>
      <ClickAwayListener onClickAway={onClickAway}>
        <div data-testid="inside">Inside content</div>
      </ClickAwayListener>
      <div data-testid="outside">Outside content</div>
    </div>
  );

  const inside = screen.getByTestId('inside');
  const outside = screen.getByTestId('outside');

  fireEvent.mouseDown(inside);
  expect(onClickAway).not.toHaveBeenCalled();

  fireEvent.mouseDown(outside);
  expect(onClickAway).toHaveBeenCalledTimes(1);
});

it('works with touch events', () => {
  const onClickAway = vi.fn();

  render(
    <div>
      <ClickAwayListener onClickAway={onClickAway}>
        <div data-testid="inside">Inside content</div>
      </ClickAwayListener>
      <div data-testid="outside">Outside content</div>
    </div>
  );

  const inside = screen.getByTestId('inside');
  const outside = screen.getByTestId('outside');

  fireEvent.touchStart(inside);
  expect(onClickAway).not.toHaveBeenCalled();

  fireEvent.touchStart(outside);
  expect(onClickAway).toHaveBeenCalledTimes(1);
});

it('properly clones children with ref', () => {
  const onClickAway = vi.fn();

  render(
    <ClickAwayListener onClickAway={onClickAway}>
      <div data-testid="content" className="test-class">
        Content
      </div>
    </ClickAwayListener>
  );

  const content = screen.getByTestId('content');
  expect(content).toBeInTheDocument();
  expect(content).toHaveClass('test-class');
  expect(content).toHaveTextContent('Content');
});

it('handles multiple click away listeners independently', () => {
  const onClickAway1 = vi.fn();
  const onClickAway2 = vi.fn();

  render(
    <div>
      <ClickAwayListener onClickAway={onClickAway1}>
        <div data-testid="inside1">Inside 1</div>
      </ClickAwayListener>
      <ClickAwayListener onClickAway={onClickAway2}>
        <div data-testid="inside2">Inside 2</div>
      </ClickAwayListener>
      <div data-testid="outside">Outside</div>
    </div>
  );

  const inside1 = screen.getByTestId('inside1');
  const inside2 = screen.getByTestId('inside2');
  const outside = screen.getByTestId('outside');

  fireEvent.click(inside1);
  expect(onClickAway1).not.toHaveBeenCalled();
  expect(onClickAway2).toHaveBeenCalledTimes(1);

  onClickAway1.mockClear();
  onClickAway2.mockClear();

  fireEvent.click(inside2);
  expect(onClickAway1).toHaveBeenCalledTimes(1);
  expect(onClickAway2).not.toHaveBeenCalled();

  onClickAway1.mockClear();
  onClickAway2.mockClear();

  fireEvent.click(outside);
  expect(onClickAway1).toHaveBeenCalledTimes(1);
  expect(onClickAway2).toHaveBeenCalledTimes(1);
});

it('cleans up event listeners on unmount', () => {
  const onClickAway = vi.fn();
  const addEventListenerSpy = vi.spyOn(document, 'addEventListener');
  const removeEventListenerSpy = vi.spyOn(document, 'removeEventListener');

  const { unmount } = render(
    <ClickAwayListener onClickAway={onClickAway}>
      <div data-testid="content">Content</div>
    </ClickAwayListener>
  );

  expect(addEventListenerSpy).toHaveBeenCalledWith(
    'click',
    expect.any(Function),
    true
  );
  expect(addEventListenerSpy).toHaveBeenCalledWith(
    'mousedown',
    expect.any(Function),
    true
  );
  expect(addEventListenerSpy).toHaveBeenCalledWith(
    'touchstart',
    expect.any(Function),
    true
  );

  unmount();

  expect(removeEventListenerSpy).toHaveBeenCalledWith(
    'click',
    expect.any(Function),
    true
  );
  expect(removeEventListenerSpy).toHaveBeenCalledWith(
    'mousedown',
    expect.any(Function),
    true
  );
  expect(removeEventListenerSpy).toHaveBeenCalledWith(
    'touchstart',
    expect.any(Function),
    true
  );

  addEventListenerSpy.mockRestore();
  removeEventListenerSpy.mockRestore();
});
