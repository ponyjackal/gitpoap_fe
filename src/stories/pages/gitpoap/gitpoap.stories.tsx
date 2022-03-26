import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Layout } from '../../../components/Layout';
import GitPOAP from '../../../pages/gitpoaps/[id]';

export default {
  title: 'Pages/GitPOAP',
  component: GitPOAP,
} as ComponentMeta<typeof GitPOAP>;

const Template: ComponentStory<typeof GitPOAP> = () => {
  return (
    <Layout>
      <GitPOAP />
    </Layout>
  );
};

export const Default = Template.bind({});
Default.args = {};