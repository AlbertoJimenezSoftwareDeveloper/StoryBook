import InboxScreen from './Components/InboxScreen';
import './index.css';
import store from './lib/store';

import { Provider } from 'react-redux';
 
function App() {
  return (
    //Component from redux
    <Provider store={store}>
      <InboxScreen />
    </Provider>
  );
}

export default App;
