import React from 'react';
import {
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import axios from 'axios';
import {Icon, View} from 'native-base';

const {height, width} = Dimensions.get('screen');

class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
  }

  componentDidMount() {
    axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        this.setState({users: response.data});
      })
      .catch((error) => {});
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{width: width}}>
          <Text
            onPress={() => this.props.navigation.pop()}
            style={{
              position: 'absolute',
              top: 105,
              color: 'gray',
              fontWeight: 'bold',
              textAlign: 'left',
            }}>
            Back
          </Text>
        </View>
        <View style={{marginTop: 100}}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: 'bold',
              textAlign: 'center',
              color: 'gray',
            }}>
            User List
          </Text>
        </View>

        <Text
          style={{
            color: 'gray',
            fontSize: 16,
            fontWeight: 'bold',
            textAlign: 'center',
            margin: 20,
            marginTop: 20,
          }}>
          Please select a user to start the billing process
        </Text>

        <FlatList
          data={this.state.users}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                this.props.navigation.navigate('Billing', {user: item})
              }>
              <View style={styles.picntext}>
                <Image
                  style={styles.img}
                  source={require('../assets/profile.jpg')}
                />
                <Text style={styles.text}>{item.name}</Text>
              </View>
              <Icon name="arrow-forward" style={styles.icon} />
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 14,
    color: 'gray',
    fontWeight: 'bold',
  },
  button: {
    width: width,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
  },
  picntext: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  img: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },
  text: {
    fontSize: 16,
    color: 'gray',
    marginLeft: 5,
  },
});

export default UserList;
