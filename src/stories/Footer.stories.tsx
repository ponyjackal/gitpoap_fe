import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Footer } from '../components/Footer';

export default {
  title: 'Layout/Footer',
  component: Footer,
} as ComponentMeta<typeof Footer>;

const Template: ComponentStory<typeof Footer> = () => {
  return <Footer />;
};

export const Default = Template.bind({});
Default.args = {};
