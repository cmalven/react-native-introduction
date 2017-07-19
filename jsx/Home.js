import React from 'react';
import { StyleSheet, Text, Button, Alert, View } from 'react-native';

export default class Home extends React.Component {
  _handleButtonPress = () => {
    Alert.alert(
      'Button pressed!',
      'Nice work pressing that button!',
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Click the button below:</Text>
        <Button
          title="Press Me Now!"
          onPress={this._handleButtonPress}
        />
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
