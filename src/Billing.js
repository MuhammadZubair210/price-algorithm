import React from 'react';
import {StyleSheet, Dimensions, Image} from 'react-native';
import {Item, Input, View, Label, Text, Button, Icon} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';

const {height, width} = Dimensions.get('screen');

class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      localStorageData: [],
      total: 0,
      reading: 0,
      serviceNumber: 0,
      billings: [],
      user: this.props.navigation.state.params.user,
      isTrue: false,
    };
  }

  generate = async () => {
    if (`${this.state.serviceNumber}`.length === 8) {
      try {
        const value = await AsyncStorage.getItem('configurations');
        if (value !== null) {
          this.setState({localStorageData: JSON.parse(value)}, () => {
            let total = 0;
            let breakdown = [];
            for (var j = 0; j < this.state.localStorageData.length; j++) {
              if (this.state.reading >= this.state.localStorageData[j].rEnd) {
                let sub =
                  this.state.localStorageData[j].rEnd +
                  1 -
                  this.state.localStorageData[j].rStart;

                let t = sub * this.state.localStorageData[j].unitCost;

                total = total + t;
                breakdown.push({
                  units: sub,
                  price: this.state.localStorageData[j].unitCost,
                });

                this.setState({total: total});
              } else {
                let sub =
                  this.state.localStorageData[j].rEnd +
                  1 -
                  this.state.localStorageData[j].rStart;

                let t =
                  (this.state.reading +
                    1 -
                    this.state.localStorageData[j].rStart) *
                  this.state.localStorageData[j].unitCost;

                total = total + t;
                breakdown.push({
                  units: sub,
                  price: this.state.localStorageData[j].unitCost,
                });

                this.setState({total: total});
                break;
              }
            }

            this.setState({});

            // setTimeout(() => {
            this.storeData(total, breakdown);
            // }, 3000);
          });
        }
      } catch (e) {}
    } else {
      alert('service number should be 8 in length');
    }
  };

  getBillings = async () => {
    try {
      const value = await AsyncStorage.getItem('billings');
      if (value !== null) {
        this.setState({billings: JSON.parse(value)}, () => {
          this.setState({isTrue: true});
          setTimeout(() => {
            this.setState({isTrue: false});
          }, 3000);
        });
      }
    } catch (e) {}
  };

  storeData = async (total, breakdown) => {
    let obj = {
      reading: this.state.reading,
      serviceNumber: this.state.serviceNumber,
      total: total,
      breakdown: breakdown,
      date: new Date().getTime(),
      userId: this.state.user.id,
    };
    try {
      this.state.billings.push(obj);
      await AsyncStorage.setItem(
        'billings',
        JSON.stringify(this.state.billings),
      );
      this.getBillings();
    } catch (e) {}
  };

  clear = async (total, breakdown) => {
    try {
      this.state.billings = [];
      await AsyncStorage.setItem(
        'billings',
        JSON.stringify(this.state.billings),
      );
      this.getBillings();
    } catch (e) {}
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{margin: 100, marginBottom: 30}}></View>
        <View>
          <Image
            style={{height: 200, height: 200, resizeMode: 'contain'}}
            source={require('../assets/companylogo.png')}
          />
        </View>
        <View style={styles.inputparent}>
          <View style={styles.inputs}>
            <Label style={{color: 'gray', marginTop: 20, marginBottom: 10}}>
              Current Meter Reading
            </Label>
            <Item regular>
              <Input
                style={{color: 'gray'}}
                onChangeText={(text) => this.setState({reading: Number(text)})}
                placeholder="Write Current Meter..."
                keyboardType="numeric"
                placeholderTextColor="gray"
              />
            </Item>
          </View>
          <View style={styles.inputs}>
            <Label style={{color: 'gray', marginTop: 40, marginBottom: 10}}>
              Service Number
            </Label>
            <Item regular>
              <Input
                style={{color: 'gray'}}
                onChangeText={(text) =>
                  this.setState({serviceNumber: Number(text)})
                }
                placeholder="Write Service Number here..."
                keyboardType="numeric"
                placeholderTextColor="gray"
              />
            </Item>
          </View>
          <View style={{width: width - 20, margin: 10, marginTop: 50}}>
            {this.state.isTrue ? (
              <Text style={styles.message}>
                Bill has been generated please check your billing history to get
                the details of generated bill
              </Text>
            ) : (
              <Button block onPress={() => this.generate()}>
                <Text>Generate Bill</Text>
              </Button>
            )}
          </View>
        </View>
        <View style={{width: width - 20, margin: 10, marginTop: 50}}>
          <Button
            style={{backgroundColor: 'red'}}
            block
            onPress={() =>
              this.props.navigation.navigate('History', {user: this.state.user})
            }>
            <Text>Billing History</Text>
          </Button>
        </View>

        <View style={{width: width - 20, margin: 10, marginTop: 50}}>
          <Button
            style={{backgroundColor: 'green'}}
            block
            onPress={() => this.props.navigation.pop()}>
            <Text>Back</Text>
          </Button>
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
  inputparent: {
    width: width,
    height: height / 2 - 200,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  inputs: {
    width: width - 20,
    marginLeft: 10,
    marginRight: 10,
  },
  message: {
    textAlign: 'center',
    color: 'blue',
  },
});

export default UserList;
