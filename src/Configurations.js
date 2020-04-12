import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
} from 'react-native';
import {Button, Form, Item, Input, Label, View} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
const {width} = Dimensions.get('screen');

class Configurations extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rStart: 0,
      rEnd: 100,
      unitCost: 0,
      array: [],
      localStorageData: [],
      index: null,
      isTrue: false,
    };
  }

  componentDidMount() {
    this.getData();
  }

  storeData = () => {
    if (this.state.localStorageData.length > 0) {
      if (
        this.state.rStart >
        this.state.localStorageData[this.state.localStorageData.length - 1].rEnd
      ) {
        if (this.state.rEnd < this.state.rStart) {
          alert('Range End never be less that Start range');
        } else {
          let obj = {
            rStart: this.state.rStart,
            rEnd: this.state.rEnd,
            unitCost: this.state.unitCost,
          };

          this.setState(
            {array: [...this.state.localStorageData, obj]},
            async () => {
              try {
                await AsyncStorage.setItem(
                  'configurations',
                  JSON.stringify(this.state.array),
                );
                this.getData();
              } catch (e) {
                console.log(e);
              }
            },
          );
        }
      } else {
        alert('The range already has unit value');
      }
    } else {
      if (this.state.rStart > 1) {
        alert('Please start the initial range from 1');
      } else {
        let obj = {
          rStart: this.state.rStart,
          rEnd: this.state.rEnd,
          unitCost: this.state.unitCost,
        };

        this.setState(
          {array: [...this.state.localStorageData, obj]},
          async () => {
            try {
              await AsyncStorage.setItem(
                'configurations',
                JSON.stringify(this.state.array),
              );
              this.getData();
            } catch (e) {
              console.log(e);
            }
          },
        );
      }
    }
  };

  getData = async () => {
    try {
      const value = await AsyncStorage.getItem('configurations');
      if (value !== null) {
        this.setState({localStorageData: JSON.parse(value)}, () => {});
      }
    } catch (e) {}
  };

  onChange = (key, val) => {
    this.setState({[key]: Number(val)});
  };

  removeRange = () => {
    this.setState({localStorageData: []}, async () => {
      try {
        await AsyncStorage.setItem(
          'configurations',
          JSON.stringify(this.state.localStorageData),
        );
        this.getData();
      } catch (e) {
        console.log(e);
      }
    });
  };

  updateRange = async () => {
    let obj = {
      rStart: this.state.rStart,
      rEnd: this.state.rEnd,
      unitCost: this.state.unitCost,
    };

    try {
      this.state.localStorageData[this.state.index] = obj;
      await AsyncStorage.setItem(
        'configurations',
        JSON.stringify(this.state.localStorageData),
      );

      alert('Updated Successfully');
      this.setState({
        rStart: this.state.rStart,
        rEnd: this.state.rEnd,
        unitCost: this.state.unitCost,
        index: null,
        isTrue: false,
      });
      this.getData();
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    return (
      <ScrollView style={{backgroundColor: 'white'}}>
        <View style={{width: width}}>
          <Text
            onPress={() => this.props.navigation.pop()}
            style={{
              position: 'absolute',
              top: 85,
              color: 'gray',
              fontWeight: 'bold',
              textAlign: 'left',
            }}>
            Back
          </Text>
        </View>

        <View style={{marginTop: 100, backgroundColor: 'white'}}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: 'bold',
              textAlign: 'center',
              color: 'gray',
            }}>
            Configurations
          </Text>
        </View>

        <Image
          style={{height: 200, height: 200, resizeMode: 'contain'}}
          source={require('../assets/companylogo.png')}
        />

        <SafeAreaView>
          <View
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <Form>
              <Item stackedLabel>
                <Label>range start</Label>
                <Input
                  onChangeText={(text) => this.onChange('rStart', text)}
                  keyboardType="numeric"
                  value={this.state.rStart}
                  value={`${this.state.rStart}`}
                />
              </Item>
              <Item stackedLabel last>
                <Label>range end</Label>
                <Input
                  onChangeText={(text) => this.onChange('rEnd', text)}
                  keyboardType="numeric"
                  value={`${this.state.rEnd}`}
                />
              </Item>

              <Item stackedLabel last>
                <Label>unit cost</Label>
                <Input
                  onChangeText={(text) => this.onChange('unitCost', text)}
                  keyboardType="numeric"
                  value={`${this.state.unitCost}`}
                />
              </Item>
            </Form>

            {this.state.isTrue ? (
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                }}>
                <Button
                  block
                  success
                  style={{padding: 10, width: 150}}
                  onPress={() => this.setState({isTrue: false})}>
                  <Text style={{color: 'white'}}>Cancel</Text>
                </Button>
                <Button
                  block
                  primary
                  style={{padding: 10, width: 150}}
                  onPress={() => this.updateRange()}>
                  <Text style={{color: 'white'}}>Update Range</Text>
                </Button>
              </View>
            ) : (
              <Button block success onPress={() => this.storeData()}>
                <Text style={{color: 'white'}}>Add</Text>
              </Button>
            )}
          </View>

          <ScrollView>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text style={styles.headingconfigured}>Configured Ranges</Text>

              <TouchableOpacity onPress={() => this.removeRange()}>
                <Text
                  style={{color: 'red', fontWeight: 'bold', marginRight: 10}}>
                  CLEAR
                </Text>
              </TouchableOpacity>
            </View>

            <FlatList
              data={this.state.localStorageData}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  style={styles.button}
                  onPress={
                    () => {
                      this.setState({
                        rStart: item.rStart,
                        rEnd: item.rEnd,
                        unitCost: item.unitCost,
                        index: index,
                        isTrue: true,
                      });
                    }
                    // this.props.navigation.navigate('Billing', {user: item})
                  }>
                  <View style={styles.picntext}>
                    <View style={styles.text}>
                      <Text style={styles.heading}>Range Start: </Text>
                      <Text style={styles.text}>{item.rStart} units</Text>
                    </View>
                    <View style={styles.text}>
                      <Text style={styles.heading}>Range End: </Text>
                      <Text style={styles.text}>{item.rEnd} units</Text>
                    </View>
                  </View>
                  <View style={{margin: 20}}>
                    <View style={styles.text}>
                      <Text style={styles.heading}>Unit Cost</Text>

                      <Text>{item.unitCost}/unit</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.id}
            />
          </ScrollView>
        </SafeAreaView>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: 'white',
  },

  picntext: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  text: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    width: width,
    display: 'flex',
    flexDirection: 'column',
    padding: 15,
    borderWidth: 1,
    borderTopColor: 'gray',
    borderBottomColor: 'gray',
  },
  heading: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  headingconfigured: {
    fontSize: 18,
    marginTop: 25,
    marginBottom: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'gray',
  },
});

export default Configurations;
