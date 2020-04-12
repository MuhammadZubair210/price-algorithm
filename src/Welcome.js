import React from 'react';
import {StyleSheet, View, Dimensions, Image, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
const {height} = Dimensions.get('screen');

class Configurations extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={{marginTop: 100}}>
          <Image
            source={require('../assets/companylogo.png')}
            style={{height: 200, height: 200, resizeMode: 'contain'}}
          />

          <Text style={styles.welcome}>Welcome to "Company Name"</Text>
          <Text style={styles.tagline}>
            You can configure billing ranges and list the users here..
          </Text>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('UserList')}
              style={styles.pic}>
              <View>
                <Image
                  style={{width: 100, height: 100}}
                  source={require('../assets/list.png')}
                />
              </View>

              <Text style={styles.label}>LIST</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Configurations')}
              style={styles.pic}>
              <View>
                <Image
                  style={{width: 100, height: 100}}
                  source={require('../assets/configure1.png')}
                />
              </View>

              <Text style={styles.label}>CONFIG</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: height,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  label: {
    color: 'gray',
    fontSize: 20,
    textAlign: 'center',
    margin: 50,
  },
  welcome: {
    color: 'gray',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 50,
  },
  tagline: {
    color: 'gray',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 20,
    marginTop: 0,
  },
  pic: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Configurations;
