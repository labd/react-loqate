import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { fetch } from 'cross-fetch';
import React from 'react';
import { afterAll, afterEach, beforeAll, expect, it, vi } from 'vitest';
import ErrorBoundary from './__tests__/ErrorBoundary';
import { selection } from './__tests__/__fixtures__/selection';
import { server } from './__tests__/server';
import { errorHandler } from './__tests__/serverHandlers';
import AddressSearch from './index';
import Loqate from './utils/Loqate';

global.fetch = fetch;

console.error = vi.fn();
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

it('renders default', async () => {
  const { baseElement } = render(
    <AddressSearch locale="en-GB" apiKey="1234" onSelect={() => {}} />
  );

  const input = screen.getByRole('textbox');
  expect(input).toBeDefined();
  fireEvent.change(input, { target: { value: 'a' } });
  await screen.findByRole('list');

  expect(baseElement).toMatchSnapshot();
});

it('calls the onSelect function and closes the suggestion list after selecting an item', async () => {
  const onSelectFn = vi.fn();

  render(
    <AddressSearch
      locale="en-GB"
      apiKey="1234"
      onSelect={onSelectFn}
      limit={10}
    />
  );

  const input = screen.getByRole('textbox');
  fireEvent.change(input, { target: { value: 'a' } });

  const list = await screen.findByRole('list');
  expect(list.childNodes).toHaveLength(10);
  expect(list.hidden).toBe(false);

  fireEvent.click(list.firstChild as Element);

  await waitFor(() => {
    expect(onSelectFn.mock.calls.length).toBe(1);
    expect(onSelectFn).toHaveBeenCalledWith(selection.Items[0]);
  });

  expect(list.childNodes).toHaveLength(0);
  expect(list.hidden).toBe(true);
});

it('allows for alternative url', async () => {
  const { baseElement } = render(
    <AddressSearch
      locale="en-GB"
      apiKey="1234"
      apiUrl="https://foo.bar"
      onSelect={vi.fn()}
    />
  );

  const input = screen.getByRole('textbox');
  fireEvent.change(input, { target: { value: 'a' } });
  await screen.findByRole('list');

  expect(baseElement).toMatchSnapshot();
});

it('renders with custom classes', async () => {
  render(
    <AddressSearch
      locale="en-GB"
      apiKey="some-key"
      onSelect={vi.fn()}
      limit={5}
      inline
      classes={{
        input: 'input-class',
        list: 'list-class',
        listItem: 'list-item-class',
      }}
    />
  );

  const input = screen.getByRole('textbox');
  fireEvent.change(input, { target: { value: 'a' } });

  expect(input).toHaveClass('input-class');

  const list = await screen.findByRole('list');
  expect(list).toHaveClass('list-class');

  const firstListItem = await screen.getAllByRole('listitem')[0];
  expect(firstListItem).toHaveClass('list-item-class');
});

it('renders with custom components', async () => {
  const { baseElement } = render(
    <AddressSearch
      locale="en-GB"
      apiKey="1234"
      onSelect={vi.fn()}
      components={{
        Input: (props) => <input {...props} data-testid="custom-input" />,
        List: (props) => <ul {...props} data-testid="custom-list" />,
        ListItem: (props) => <li {...props} data-testid="custom-list-item" />,
      }}
    />
  );

  const input = screen.getByRole('textbox');
  fireEvent.change(input, { target: { value: 'a' } });
  await screen.findByRole('list');

  expect(baseElement).toMatchSnapshot();
});

it('renders with portal results', async () => {
  render(
    <div data-testid="react-loqate">
      <AddressSearch
        locale="en-GB"
        apiKey="some-key"
        onSelect={vi.fn()}
        limit={5}
      />
    </div>
  );

  const input = screen.getByRole('textbox');
  fireEvent.change(input, { target: { value: 'a' } });

  const list = await screen.findByRole('list');
  expect(list).toBeDefined();
  expect(list.childNodes).toHaveLength(10);

  const wrapper = screen.getByTestId('react-loqate');
  expect(wrapper).toMatchSnapshot();
  expect(wrapper).not.toContainElement(list);
});

it('renders with inline results', async () => {
  const onSelectFn = vi.fn();

  render(
    <div data-testid="react-loqate">
      <AddressSearch
        locale="en-GB"
        apiKey="some-key"
        onSelect={onSelectFn}
        limit={5}
        inline
      />
    </div>
  );

  const input = screen.getByRole('textbox');
  fireEvent.change(input, { target: { value: 'a' } });

  const list = await screen.findByRole('list');
  expect(list).toBeDefined();
  expect(list.childNodes).toHaveLength(10);

  const wrapper = screen.getByTestId('react-loqate');
  expect(wrapper).toMatchSnapshot();
  expect(wrapper).toContainElement(list);
});

it('can click away', async () => {
  render(
    <AddressSearch
      locale="en-GB"
      apiKey="some-key"
      onSelect={vi.fn()}
      limit={5}
      inline
    />
  );

  const input = screen.getByRole('textbox');
  fireEvent.change(input, { target: { value: 'a' } });
  const list = await screen.findByRole('list');

  expect(list.childNodes).toHaveLength(10);
  expect(list.hidden).toBe(false);

  fireEvent.click(input);
  expect(list.childNodes).toHaveLength(0);
  expect(list.hidden).toBe(true);
});

it('can inline click away', async () => {
  render(
    <AddressSearch
      locale="en-GB"
      apiKey="some-key"
      onSelect={vi.fn()}
      limit={5}
      inline
    />
  );

  const input = screen.getByRole('textbox');
  fireEvent.change(input, { target: { value: 'a' } });
  const list = await screen.findByRole('list');

  expect(list.childNodes).toHaveLength(10);
  expect(list.hidden).toBe(false);

  fireEvent.click(input);

  expect(list.childNodes).toHaveLength(0);
  expect(list.hidden).toBe(true);
});

it('uses escape to clear the input suggestions list', async () => {
  render(
    <AddressSearch
      locale="en-GB"
      apiKey="some-key"
      onSelect={vi.fn()}
      limit={5}
      inline
    />
  );

  const input = screen.getByRole('textbox');
  fireEvent.change(input, { target: { value: 'a' } });
  const list = await screen.findByRole('list');

  expect(list.childNodes).toHaveLength(10);
  expect(list.hidden).toBe(false);

  fireEvent.keyDown(input, { key: 'Escape', code: 'Escape' });

  expect(list.childNodes).toHaveLength(0);
  expect(list.hidden).toBe(true);
});

it('uses tab to set focus on the first list item', async () => {
  render(
    <AddressSearch
      locale="en-GB"
      apiKey="some-key"
      onSelect={vi.fn()}
      limit={5}
      inline
    />
  );

  const input = screen.getByRole('textbox');

  input.focus();
  fireEvent.change(input, { target: { value: 'a' } });

  await waitFor(() => {
    expect(input).toHaveFocus();
  });
  userEvent.tab();

  const firstListItem = await screen.getAllByRole('listitem')[0];
  await waitFor(() => {
    expect(firstListItem).toHaveFocus();
  });
});

it('uses the arrow keys to cycle through the list items', async () => {
  render(
    <AddressSearch
      locale="en-GB"
      apiKey="some-key"
      onSelect={vi.fn()}
      limit={5}
      inline
    />
  );

  const input = screen.getByRole('textbox');
  input.focus();
  fireEvent.change(input, { target: { value: 'a' } });
  const listItems = await screen.findAllByRole('listitem');

  userEvent.tab();
  await waitFor(() => {
    expect(listItems[0]).toHaveFocus();
  });

  userEvent.keyboard('{arrowDown}');
  await waitFor(() => {
    expect(listItems[1]).toHaveFocus();
  });

  userEvent.keyboard('{arrowUp}');
  await waitFor(() => {
    expect(listItems[0]).toHaveFocus();
  });

  // check out of bounds up, have to go back down to make sure you dont have false positive
  userEvent.keyboard('{arrowUp}');
  userEvent.keyboard('{arrowDown}');
  await waitFor(() => {
    expect(listItems[1]).toHaveFocus();
  });

  // check out of bounds down, have to go back up to make sure you dont have false positive
  const lastIndex = listItems.length - 1;
  listItems[lastIndex].focus();
  await waitFor(() => {
    expect(listItems[lastIndex]).toHaveFocus();
  });
  userEvent.keyboard('{arrowDown}');
  userEvent.keyboard('{arrowUp}');
  await waitFor(() => {
    expect(listItems[lastIndex - 1]).toHaveFocus();
  });
});

it('lets its errors be caught by an ErrorBoundary', async () => {
  server.use(errorHandler);

  const { baseElement } = render(
    <ErrorBoundary>
      <AddressSearch locale="en-GB" apiKey="1234" onSelect={vi.fn()} />
    </ErrorBoundary>
  );

  const input = screen.getByRole('textbox');

  fireEvent.change(input, { target: { value: 'a' } });

  const errorNotification = await screen.findByTestId('error-notification');

  await waitFor(() => {
    expect(errorNotification).toBeDefined();
  });

  expect(baseElement).toMatchSnapshot();
});

it('accepts origin and bias options', async () => {
  const findSpy = vi.spyOn(Loqate.prototype, 'find');

  render(
    <AddressSearch
      locale="en-GB"
      apiKey="some-key"
      onSelect={vi.fn()}
      limit={5}
      inline
      bias={true}
      origin="GB"
    />
  );

  const input = screen.getByRole('textbox');
  input.focus();
  fireEvent.change(input, { target: { value: 'a' } });

  expect(findSpy).toHaveBeenCalledWith({
    bias: true,
    containerId: undefined,
    countries: undefined,
    language: 'en',
    limit: 5,
    origin: 'GB',
    text: 'a',
  });
});
