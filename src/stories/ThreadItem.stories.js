import React from 'react';
import ThreadInput from '../components/ThreadInput';

const stories = {
  title: 'ThreadInput',
  component: ThreadInput,
};

export default stories;

function TemplateStory(args) {
  return <ThreadInput {...args} />;
}

const LightMode = TemplateStory.bind({});
LightMode.args = {
  addThread: () => { },
  type: 'light',
};

const DarkMode = TemplateStory.bind({});
DarkMode.args = {
  addThread: () => { },
  type: 'dark',
};

export { LightMode, DarkMode };
