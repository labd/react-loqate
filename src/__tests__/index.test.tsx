import React from 'react';
import { server } from './server';
import AddressSearch from '../index';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { selection } from './__fixtures__/selection';

describe('Component: AddressSearch', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test('basic functionality', async () => {
    const onSelectFn = jest.fn();

    const { getByTestId, findByTestId } = render(
      <AddressSearch
        locale="en_GB"
        apiKey="1234"
        onSelect={onSelectFn}
        limit={10}
      />
    );

    const input = getByTestId('react-loqate-input');

    expect(input).toBeDefined();

    act(() => {
      fireEvent.change(input, { target: { value: 'a' } });
    });

    await waitFor(() => {
      expect(input).toHaveValue('a');
    });

    const list = await findByTestId('react-loqate-list');

    await waitFor(() => {
      expect(list).toBeDefined();
      expect(list.childNodes).toHaveLength(10);
    });

    const firstListItem = await screen.findByTestId(
      'react-loqate-list-item-GB|RM|A|21415581'
    );

    act(() => {
      fireEvent.click(firstListItem);
    });

    await waitFor(() => {
      expect(onSelectFn.mock.calls.length).toBe(1);
      expect(onSelectFn).toHaveBeenCalledWith(selection.Items[0]);
    });
  });

  test('render default', async () => {
    const component = render(
      <AddressSearch locale="en_GB" apiKey="1234" onSelect={jest.fn()} />
    );

    expect(component.baseElement).toMatchSnapshot();
  });

  test('with classname', async () => {
    const { baseElement, getByTestId } = render(
      <AddressSearch
        locale="en_GB"
        apiKey="1234"
        onSelect={jest.fn()}
        className="some-classname"
      />
    );

    const wrapper = getByTestId('react-loqate');

    expect(wrapper.className).toBe('some-classname');
    expect(baseElement).toMatchSnapshot();
  });

  test('with custom input component', async () => {
    const { baseElement, getByTestId } = render(
      <AddressSearch
        locale="en_GB"
        apiKey="1234"
        onSelect={jest.fn()}
        components={{
          Input: props => <input {...props} data-testid="custom-input" />,
        }}
      />
    );

    const wrapper = getByTestId('custom-input');

    expect(baseElement).toMatchSnapshot();
    expect(wrapper).toBeDefined();
  });

  test('with portal results', async () => {
    const { getByTestId, findByTestId } = render(
      <AddressSearch
        locale="en_GB"
        apiKey="some-key"
        onSelect={jest.fn()}
        limit={5}
      />
    );

    const input = getByTestId('react-loqate-input');

    expect(input).toBeDefined();

    act(() => {
      fireEvent.change(input, { target: { value: 'a' } });
    });

    await waitFor(() => {
      expect(input).toHaveValue('a');
    });

    const list = await findByTestId('react-loqate-list');

    await waitFor(() => {
      expect(list).toBeDefined();
      expect(list.childNodes).toHaveLength(10);
    });

    const wrapper = getByTestId('react-loqate');

    expect(wrapper).toMatchSnapshot();
    expect(wrapper).not.toContainElement(list);
  });

  test('with inline results', async () => {
    const onSelectFn = jest.fn();

    const { getByTestId, findByTestId } = render(
      <AddressSearch
        locale="en_GB"
        apiKey="some-key"
        onSelect={onSelectFn}
        limit={5}
        inline
      />
    );

    const input = getByTestId('react-loqate-input');

    expect(input).toBeDefined();

    act(() => {
      fireEvent.change(input, { target: { value: 'a' } });
    });

    await waitFor(() => {
      expect(input).toHaveValue('a');
    });

    const list = await findByTestId('react-loqate-list');

    await waitFor(() => {
      expect(list).toBeDefined();
      expect(list.childNodes).toHaveLength(10);
    });

    const firstListItem = await screen.findByTestId(
      'react-loqate-list-item-GB|RM|A|21415581'
    );

    act(() => {
      fireEvent.click(firstListItem);
    });

    const wrapper = getByTestId('react-loqate');

    expect(wrapper).toMatchSnapshot();
    expect(wrapper).toContainElement(list);

    await waitFor(() => {
      expect(onSelectFn.mock.calls.length).toBe(1);
      expect(onSelectFn).toHaveBeenCalledWith(selection.Items[0]);
    });
  });

  test('click away listener', async () => {
    const { getByTestId, findByTestId } = render(
      <AddressSearch
        locale="en_GB"
        apiKey="some-key"
        onSelect={jest.fn()}
        limit={5}
        inline
      />
    );

    const input = getByTestId('react-loqate-input');

    expect(input).toBeDefined();

    act(() => {
      fireEvent.change(input, { target: { value: 'a' } });
    });

    await waitFor(() => {
      expect(input).toHaveValue('a');
    });

    const list = await findByTestId('react-loqate-list');

    await waitFor(() => {
      expect(list).toBeDefined();
      expect(list.childNodes).toHaveLength(10);
    });

    act(() => {
      fireEvent.click(input);
    });

    await waitFor(() => {
      expect(list.childNodes).toHaveLength(0);
      expect(list.hidden).toBe(true);
    });
  });

  test('inline click away listener', async () => {
    const { getByTestId, findByTestId } = render(
      <AddressSearch
        locale="en_GB"
        apiKey="some-key"
        onSelect={jest.fn()}
        limit={5}
        inline
      />
    );

    const input = getByTestId('react-loqate-input');

    expect(input).toBeDefined();

    act(() => {
      fireEvent.change(input, { target: { value: 'a' } });
    });

    await waitFor(() => {
      expect(input).toHaveValue('a');
    });

    const list = await findByTestId('react-loqate-list');

    await waitFor(() => {
      expect(list).toBeDefined();
      expect(list.childNodes).toHaveLength(10);
    });

    act(() => {
      fireEvent.click(input);
    });

    await waitFor(() => {
      expect(list.childNodes).toHaveLength(0);
      expect(list.hidden).toBe(true);
    });
  });
});
