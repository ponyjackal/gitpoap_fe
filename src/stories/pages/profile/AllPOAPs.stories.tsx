import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { AllPOAPs } from '../../../components/profile//AllPOAPs';
import { rawPOAPs } from '../../data';

export default {
  title: 'Profile/AllPOAPs',
  component: AllPOAPs,
} as ComponentMeta<typeof AllPOAPs>;

const Template: ComponentStory<typeof AllPOAPs> = (args) => {
  return <AllPOAPs {...args} />;
};

export const Default = Template.bind({});
Default.args = { poaps: rawPOAPs };