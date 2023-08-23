import React from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
const Loader = () => {
  
  return (
    <View style={styles.container}>
      <ActivityIndicator
        animating = {true}
        size="large"
        color="#cccccc"
        />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: '50%',
  },
});

export default Loader;
