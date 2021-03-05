import * as React from 'react'
import { Provider } from "react-redux";
import store from "./store/store";
import Layout from './layout/index'


class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Layout />
      </Provider>
    );
  }
}

export default App;
