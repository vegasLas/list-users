import React from 'react';
import './App.css';
import store from './redux/redux-store';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Home from './pages/Home';


function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Provider store={store}>
        <Home />
      </Provider >
    </BrowserRouter >
  )

}
export default App;
