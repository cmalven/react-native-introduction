import React from 'react';
import { StyleSheet, Text, Button, View } from 'react-native';
import AnotherPage from './AnotherPage';

export default class Home extends React.Component {
  _handleNextPress(route) {
    this.props.navigator.push(route);
  }

  render() {
    const anotherPageRoute = {
      component: AnotherPage,
      title: 'Another Page'
    };

    return (
      <View style={styles.container}>
        <Text>Current Page: { this.props.route.title }</Text>
        <Button title="Go to Another Page" onPress={() => this._handleNextPress(anotherPageRoute)} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
