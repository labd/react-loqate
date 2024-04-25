import { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import AddressSearch, { Address, Props } from '..';

const meta: Meta = {
  title: 'Loqate Address Search',
  component: AddressSearch,
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
    },
  },
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

type Story = StoryObj<typeof AddressSearch>;

const Template = (props: Props) => {
  const [result, setResult] = useState<Address>();

  return (
    <>
      <AddressSearch {...props} onSelect={setResult} inline={true} />
      <pre>{JSON.stringify(result, null, 2)}</pre>
    </>
  );
};

export const Default: Story = {
  args: {
    // @ts-expect-error: env does exist
    // We need to prefix with STORYBOOK, otherwise Storybook will ignore the variable
    apiKey: import.meta.env.STORYBOOK_API_KEY ?? '',
    countries: ['US', 'GB'],
    locale: 'en_US',
  },
  render: Template,
};
