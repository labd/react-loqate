import type { Meta, StoryObj } from '@storybook/react';
import React, { forwardRef, useState } from 'react';
import AddressSearch, { type Address, type Item } from '..';

const meta: Meta = {
  title: 'Custom Components',
  component: AddressSearch,
};

export default meta;

type Story = StoryObj<typeof AddressSearch>;

const CustomInput = forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
  ({ value, onChange, ...rest }, ref) => {
    return (
      <input
        ref={ref}
        value={value || ''}
        onChange={onChange}
        style={{
          padding: '12px 16px',
          border: '2px solid #3b82f6',
          borderRadius: '8px',
          fontSize: '16px',
          width: '100%',
          outline: 'none',
        }}
        placeholder="Enter your address"
        {...rest}
      />
    );
  }
);

const CustomList = forwardRef<HTMLUListElement, React.ComponentProps<'ul'>>(
  (props, ref) => {
    return (
      <ul
        ref={ref}
        {...props}
        style={{
          ...props.style,
          backgroundColor: '#f8fafc',
          border: '2px solid #3b82f6',
          borderRadius: '8px',
          listStyle: 'none',
          margin: 0,
          padding: 0,
        }}
      />
    );
  }
);

const CustomListItem = forwardRef<
  HTMLLIElement,
  React.ComponentProps<'li'> & { suggestion: Item; value?: string }
>((props, ref) => {
  const {
    suggestion,
    onClick,
    onKeyDown,
    onMouseEnter,
    onMouseLeave,
    style,
    ...rest
  } = props;
  return (
    <li
      ref={ref}
      {...rest}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.(e as unknown as React.MouseEvent<HTMLLIElement>);
        }
        onKeyDown?.(e);
      }}
      style={{
        padding: '12px 16px',
        borderBottom: '1px solid #e2e8f0',
        cursor: 'pointer',
        backgroundColor: 'white',
        ...style,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = '#eff6ff';
        onMouseEnter?.(e);
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'white';
        onMouseLeave?.(e);
      }}
    >
      {suggestion.Text} {suggestion.Description}
    </li>
  );
});

const Template = (props: React.ComponentProps<typeof AddressSearch>) => {
  const [result, setResult] = useState<Address>();

  return (
    <>
      <AddressSearch {...props} onSelect={setResult} />
      <pre>{JSON.stringify(result, null, 2)}</pre>
    </>
  );
};

export const CustomComponents: Story = {
  args: {
    // @ts-expect-error: env does exist
    // We need to prefix with STORYBOOK, otherwise Storybook will ignore the variable
    apiKey: import.meta.env.STORYBOOK_API_KEY ?? '',
    countries: ['US', 'GB'],
    locale: 'en_US',
    inline: true,
    components: {
      Input: CustomInput,
      List: CustomList,
      ListItem: CustomListItem,
    },
  },
  render: Template,
};
