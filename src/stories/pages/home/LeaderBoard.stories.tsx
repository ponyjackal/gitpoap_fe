import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { LeaderBoard } from '../../../components/home/LeaderBoard';

export default {
  title: 'Home/LeaderBoard',
  component: LeaderBoard,
} as ComponentMeta<typeof LeaderBoard>;

const Template: ComponentStory<typeof LeaderBoard> = () => {
  return <LeaderBoard />;
};

export const Default = Template.bind({});
