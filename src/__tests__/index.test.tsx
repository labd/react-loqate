import React from 'react';
import { server } from './server';
import AddressSearch from '../index';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { selection } from './__fixtures__/selection';
import '@testing-library/jest-dom/extend-expect';

describe('Component: AddressSearch', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test('basic functionality', async () => {
    let result: any = undefined;
    const mockedOnSelect = jest.fn(address => {
      result = address;
    });

    render(
      <AddressSearch
        locale="en_GB"
        apiKey="1234"
        onSelect={mockedOnSelect}
        limit={10}
      />
    );

    expect(screen.getByTestId('default-input')).toBeDefined();

    const input = screen.getByTestId('default-input');
    fireEvent.change(input, { target: { value: 'a' } });

    await waitFor(() => {
      const input = screen.getByTestId('default-input');
      expect(input).toHaveValue('a');
    });

    expect(screen.findByTestId('default-list')).toBeDefined();

    const list = await screen.findByTestId('default-list');
    expect(list.childNodes).toHaveLength(10);

    const firstListItem = screen.getByTestId(
      'default-list-item-GB|RM|A|21415581'
    );
    fireEvent.click(firstListItem);

    await waitFor(() => {
      expect(mockedOnSelect.mock.calls.length).toBe(1);
      expect(result).toEqual(selection.Items[0]);
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

    const wrapper = getByTestId('loqate-address-search');

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
          Input: props => <input data-testid="custom-input" {...props} />,
        }}
      />
    );

    const wrapper = getByTestId('custom-input');

    expect(baseElement).toMatchSnapshot();
    expect(wrapper).toBeDefined();
  });
});
