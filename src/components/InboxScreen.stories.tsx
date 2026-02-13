
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
                // http.get(    'https://jsonplaceholder.typicode.com/todos?userId=1', () => {
                //     return HttpResponse.json(MockedState.tasks);
                // }),
                

                ////
           http.get('https://jsonplaceholder.typicode.com/todos', ({ request }) => {
  // 1. Creamos un objeto URL a partir de la petición
  const url = new URL(request.url);

  // 2. Obtenemos el parámetro 'userId'
  const userId = url.searchParams.get('userId');

  // 3. (Opcional) Lógica basada en el parámetro
  if (userId === '1') {
    return HttpResponse.json(MockedState.tasks);
  }

  // Si no es el ID esperado o no te importa filtrar, solo retorna los datos
  return HttpResponse.json(MockedState.tasks);
}),


                /////
            ],
        },
    },

  play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        
         await waitForElementToBeRemoved(await canvas.findByTestId('loading'));

         await waitFor(async () => {
             const pin1 = await canvas.findByLabelText('pinTask-1');
            await userEvent.click(pin1);
            
            const pin3 = await canvas.findByLabelText('pinTask-3');
            await userEvent.click(pin3);
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