import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react';
import AddressSearch, { Address, Props } from '../src';

const meta: Meta = {
  title: 'Welcome',
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

const Template: Story<Props> = props => {
  const [result, setResult] = useState<Address>();

  return (
    <>
      <AddressSearch {...props} onSelect={setResult} />
      <pre>{JSON.stringify(result, null, 2)}</pre>
    </>
  );
};

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});

Default.args = {
  // We need to prefix with STORYBOOK, otherwise Storybook will ignore the variable
  apiKey: process.env.STORYBOOK_API_KEY ?? '',
  countries: ['US', 'GB'],
  locale: 'en_US',
};
