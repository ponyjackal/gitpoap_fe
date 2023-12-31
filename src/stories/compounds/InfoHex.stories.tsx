import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { InfoHexBase } from '../../components/shared/elements/InfoHexBase';
import { InfoHexMetric } from '../../components/home/InfoHexMetric';
import { InfoHexSummary } from '../../components/gitpoap/InfoHexSummary';
import { People } from '../../components/shared/elements/icons/People';
import { rem } from 'polished';

export default {
  title: 'Compounds/InfoHex',
  component: InfoHexBase,
  argTypes: {},
} as ComponentMeta<typeof InfoHexBase>;

const Template: ComponentStory<typeof InfoHexBase> = (args) => {
  return <InfoHexBase {...args}></InfoHexBase>;
};

export const Base = Template.bind({});
Base.args = {};

export const Metrics: ComponentStory<typeof InfoHexMetric> = (args) => {
  return (
    <InfoHexMetric
      {...args}
      value={Number('17545').toLocaleString()}
      unit={'contributors'}
      icon={<People style={{ height: rem(70), width: rem(70) }} />}
    />
  );
};

export const Summary: ComponentStory<typeof InfoHexBase> = (args) => {
  return (
    <InfoHexSummary
      {...args}
      bio="Recovering physicist turned programmer. Soccer aficionado."
      twitterHandle="nd_certora"
      githubHandle="nd_certora"
      gitpoapId={10}
      numGitPOAPs={12}
      address="0x0"
      ensAvatarUrl={null}
      ensName="nd_certora.eth"
    />
  );
};
