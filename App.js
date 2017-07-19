import React from 'react';
import { NavigatorIOS } from 'react-native';
import Home from './jsx/Home';

export default class App extends React.Component {
  render() {
    return (
      <NavigatorIOS
        initialRoute={{
          component: Home,
          title: 'Home',
        }}
        style={{ flex: 1 }}
      />
    );
  }
}