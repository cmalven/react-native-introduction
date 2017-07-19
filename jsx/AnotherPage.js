import React from 'react';
import { StyleSheet, Text, Image, View } from 'react-native';

export default class AnotherPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'Loading Name',
      location: 'Loading Location',
      imageSrc: 'https://placeimg.com/200/200/any/grayscale'
    };
  }

  async _fetchUser() {
    let url = 'https://api.github.com/users/cmalven';
    let data = await fetch(url);
    return data.json();
  }

  componentDidMount() {
    this._fetchUser().then((data) => {
      this.setState((prevState, props) => {
        return {
          name: data.name,
          location: data.location,
          imageSrc: data.avatar_url
        };
      });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={{ width: 200, height: 200 }}
          source={{ uri: this.state.imageSrc }}
        />
        <Text style={styles.name}>{ this.state.name }</Text>
        <Text style={styles.location}>{ this.state.location }</Text>
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

  name: {
    fontSize: 32,
    marginTop: 50
  },

  location: {
    marginTop: 15
  }
});
