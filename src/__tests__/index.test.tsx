import React, { forwardRef, OlHTMLAttributes, Ref } from 'react';
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

  test('with custom classes', async () => {
    const { getByTestId, findByTestId } = render(
      <AddressSearch
        locale="en_GB"
        apiKey="some-key"
        onSelect={jest.fn()}
        limit={5}
        inline
        classes={{
          input: 'input-class',
          list: 'list-class',
          listItem: 'list-item-class',
        }}
      />
    );

    const input = getByTestId('react-loqate-input');
    expect(input).toHaveClass('input-class');

    act(() => {
      fireEvent.change(input, { target: { value: 'a' } });
    });

    await waitFor(() => {
      expect(input).toHaveValue('a');
    });
    const list = await findByTestId('react-loqate-list');
    expect(list).toHaveClass('list-class');

    const firstListItem = await screen.findByTestId(
      'react-loqate-list-item-GB|RM|A|21415581'
    );
    expect(firstListItem).toHaveClass('list-item-class');
  });

  test('with custom components', async () => {
    const { baseElement, getByTestId, findByTestId } = render(
      <AddressSearch
        locale="en_GB"
        apiKey="1234"
        onSelect={jest.fn()}
        components={{
          Input: props => <input {...props} data-testid="custom-input" />,
          List: forwardRef(
            (
              props: OlHTMLAttributes<HTMLUListElement>,
              ref: Ref<HTMLUListElement>
            ): JSX.Element => {
              return <ul {...props} data-testid="custom-list" ref={ref} />;
            }
          ),
          ListItem: props => <li {...props} data-testid="custom-list-item" />,
        }}
      />
    );

    const input = getByTestId('custom-input');

    expect(baseElement).toMatchSnapshot();
    expect(input).toBeDefined();

    act(() => {
      fireEvent.change(input, { target: { value: 'a' } });
    });

    await waitFor(() => {
      expect(input).toHaveValue('a');
    });

    const list = await findByTestId('custom-list');
    expect(list).toBeDefined();

    const listItems = await screen.findAllByTestId('custom-list-item');
    const firstListItem = listItems[0];
    expect(firstListItem).toBeDefined();
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
