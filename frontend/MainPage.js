import React from 'react';
import { Input, Button } from '@rneui/themed';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';
import { OpenSans_500Medium, } from '@expo-google-fonts/open-sans';

const Main_Page = () => {
  let [fontsLoaded] = useFonts({
    Inter_900Black, OpenSans_500Medium
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={{ fontFamily: 'Inter_900Black', fontSize: 70, color: '#FDC319' }}>TungTY</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4542C1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fontEng: {
    fontFamily: 'Inter_900Black',
    fontSize: 14,
    color:'#4542C1',
  },
  fontEngInputHeader: {
    fontFamily: 'Inter_900Black',
    fontSize: 14,
    color: '#ffffff',
  },
  fontEngInput: {
    fontFamily: 'Inter_900Black',
    fontSize: 14,
    color: '#000000',
    backgroundColor: '#FFFFFF',
    borderRadius: '30px',
    width: 280
  },
  fontTh: {
    fontFamily: 'OpenSans_500Medium',
    fontSize: 14,
  },
  buttonStyle: {
    backgroundColor: '#FDC319',
    borderColor: 'transparent',
    borderWidth: 0,
    borderRadius: "9000px",
    width: 240
  }
});

export default Main_Page