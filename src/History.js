import React from 'react';
import {StyleSheet, View, Dimensions, Text, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Card, CardItem} from 'native-base';

const {height} = Dimensions.get('screen');

class Configurations extends React.Component {
  state = {
    billings: [],
    user: this.props.navigation.state.params.user,
  };

  componentDidMount() {
    this.getBillings();
  }
  getBillings = async () => {
    try {
      const value = await AsyncStorage.getItem('billings');
      if (value !== null) {
        let ar = JSON.parse(value);
        ar.map((v) => {
          if (v.userId === this.state.user.id) {
            this.setState({billings: [...this.state.billings, v]}, () => {});
          }
        });
      }
    } catch (e) {}
  };
  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={{marginTop: 100}}>
          <Text onPress={() => this.props.navigation.pop()} style={styles.back}>
            Back
          </Text>
          <Text style={styles.history}>History</Text>
        </View>
        <Card>
          <View style={{marginTop: 10}}>
            <View style={{padding: 10}}>
              <CardItem header bordered>
                <Text style={styles.headings}>Consumer Information:</Text>
              </CardItem>
            </View>

            <View>
              <View style={styles.mutualmargins}>
                <Text style={styles.headingnames}>Consumer Name:</Text>
                <Text style={styles.headingvalues}>{this.state.user.name}</Text>
              </View>
              <View style={styles.mutualmargins}>
                <Text style={styles.headingnames}>Consumer Username:</Text>
                <Text style={styles.headingvalues}>
                  {this.state.user.username}
                </Text>
              </View>
              <View style={styles.mutualmargins}>
                <Text style={styles.headingnames}>Consumer Email:</Text>
                <Text style={styles.headingvalues}>
                  {this.state.user.email}
                </Text>
                <View style={styles.mutualmargins}></View>

                <Text style={styles.headingnames}>Consumer Phone:</Text>
                <Text style={styles.headingvalues}>
                  {this.state.user.phone}
                </Text>
              </View>
            </View>
          </View>
        </Card>
        <Card>
          <Text style={styles.headings}>Consumer Billing History:</Text>

          {this.state.billings.map((val, ind) => {
            return (
              <View style={{marginTop: 20}}>
                <View style={styles.mutualmargins}>
                  <Text style={styles.headings}>
                    Billing Date: (Record {ind + 1})
                  </Text>
                  <Text style={{fontSize: 20, color: 'gray'}}>
                    {new Date(val.date).toLocaleString()}
                  </Text>
                </View>

                <View>
                  <View style={styles.mutualmargins}>
                    <Text style={styles.headingnames}>Readings:</Text>
                    <Text style={styles.headingvalues}>{val.reading}</Text>
                  </View>
                  <View style={styles.mutualmargins}>
                    <Text style={styles.headingnames}>Service Number:</Text>
                    <Text style={styles.headingvalues}>
                      {val.serviceNumber}
                    </Text>
                  </View>

                  <View style={styles.mutualmargins}>
                    <Text style={styles.headingnames}>Total Cost:</Text>
                    <Text style={styles.headingvalues}>{val.total}</Text>
                    <View style={styles.mutualmargins}></View>
                  </View>
                  <View style={styles.mutualmargins}>
                    <Text style={styles.headingnames}>Cost Breakdown:</Text>
                    {val.breakdown.map((v, i) => {
                      return (
                        <View key={i} style={styles.mutualmargins}>
                          <Text style={styles.headingvalues}>
                            {v.units} x {v.price}
                          </Text>
                        </View>
                      );
                    })}
                  </View>
                </View>
              </View>
            );
          })}
        </Card>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: height,
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  headingnames: {
    fontSize: 18,
    color: 'gray',
    fontWeight: 'bold',
  },
  headingvalues: {
    fontSize: 18,
    color: 'gray',
  },
  back: {
    position: 'absolute',
    top: -10,
    color: 'gray',
    fontWeight: 'bold',
  },
  history: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'gray',
  },
  headings: {
    fontSize: 20,
    color: 'gray',
    fontWeight: 'bold',
  },
  mutualmargins: {
    margin: 10,
  },
});

export default Configurations;
