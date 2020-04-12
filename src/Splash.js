import React from 'react';
import {StyleSheet, View, Dimensions, Image, ActivityIndicator} from 'react-native';
const {height} = Dimensions.get('screen');

class Configurations extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require('../assets/companylogo.png')}
          style={{height: 200, height:200, resizeMode:"contain"}}
        />
        <ActivityIndicator/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container:{
        height:height,
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center"
    }
});

export default Configurations;
