
import type { Meta, StoryObj } from '@storybook/react-vite';
import { userEvent, waitFor, waitForElementToBeRemoved, within } from 'storybook/test';

import { Provider } from 'react-redux';

import InboxScreen from './InboxScreen';
import { http, HttpResponse } from 'msw';

import store from '../lib/store';
import { MockedState } from './TaskList.stories';

const meta = {
  component: InboxScreen,
  title: 'InboxScreen',
  decorators: [(story) => <Provider store={store}>{story()}</Provider>],
  tags: ['autodocs'],
} satisfies Meta<typeof InboxScreen>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
 parameters: {
   msw: {
     handlers: [
       http.get('https://jsonplaceholder.typicode.com/todos?userId=1', () => {
         return HttpResponse.json(MockedState.tasks);
       }),
     ],
   },
 },

play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
   // Waits for the component to transition from the loading state
const loading = await canvas.findByTestId('loading');
    await waitForElementToBeRemoved(loading);   // Waits for the component to be updated based on the store
   await waitFor(async () => {
     // Simulates pinning the first task
     const pinButton1 = await canvas.findByLabelText('pinTask-1');
      await userEvent.click(pinButton1);
     // Simulates pinning the third task
     const pinButton3 = await canvas.findByLabelText('pinTask-3');
      await userEvent.click(pinButton3);
   },{timeout:2000});
 },
};


export const Error: Story = {
 parameters: {
   msw: {
     handlers: [
       http.get('https://jsonplaceholder.typicode.com/todos?userId=1', () => {
         return new HttpResponse(null, {
           status: 403,
         });
       }),
     ],
   },
 },
};