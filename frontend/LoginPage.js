import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Input, Button, Text } from '@ui-kitten/components';
import { useFonts, Kanit_400Regular } from '@expo-google-fonts/kanit';
import { collection, addDoc, doc, getDocs, onSnapshot } from "firebase/firestore";
import { db } from '../firebase/firebase-config';



const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  let [fontsLoaded] = useFonts({
    Kanit_400Regular
  });

  if (!fontsLoaded) {
    return null;
  }

  const login = async () => {
    var CryptoJS = require("crypto-js");
    const userSnapshot = await getDocs(collection(db, "users"));
    userSnapshot.forEach((doc) => {
      console.log(doc.data().username);
      if (doc.data().username == username) {
        var decryptpassword = CryptoJS.AES.decrypt(doc.data().password, 'tungty');
        var passwordText = decryptpassword.toString(CryptoJS.enc.Utf8);
        console.log(passwordText)
        return;
      }
    });
    // var bytes  = CryptoJS.AES.decrypt(cipherpassword, 'tungty');
    // var originalText = bytes.toString(CryptoJS.enc.Utf8);
  }
  return (
    <View style={styles.container}>
      <Text style={{ fontFamily: 'Kanit_400Regular', fontSize: 70, color: '#FDC319' }}>TungTY</Text>
      <View style={{ marginTop: 25 }}>
        <Text style={styles.fontEngInputHeader}>Username</Text>
        <Input style={[styles.fontEng, styles.fontEngInput]} onChangeText={text => setUsername(text)} />
      </View>
      <View style={{ marginTop: 10 }}>
        <Text style={styles.fontEngInputHeader}>Password</Text>
        <Input secureTextEntry={true} style={styles.fontEngInput} onChangeText={text => setPassword(text)} />
      </View>
      <Button style={[styles.fontEng, styles.buttonStyle, { margin: 10 }]} onPress={login}>{evaProps => <Text {...evaProps} style={{ color: "#4542C1", fontFamily: 'Kanit_400Regular', }}>Sign In</Text>}</Button>
      <View style={{ marginTop: 10 }}>
        <Text styles={styles.fontEng}>ยังไม่มีสมาชิก</Text>
        <Text>สมาชิกใหม่?</Text>
        <View styles={{ backgroundColor: '#FFFFFF' }}>

        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: 'Kanit_400Regular',
    backgroundColor: '#4542C1',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 50,
    width: "100%"
  },
  fontEng: {
    fontFamily: 'Kanit_400Regular',
    fontSize: 14,
    color: '#4542C1',
  },
  fontEngInputHeader: {
    fontFamily: 'Kanit_400Regular',
    fontSize: 14,
    color: '#ffffff',
  },
  fontEngInput: {
    fontFamily: 'Kanit_400Regular',
    fontSize: 14,
    color: '#000000',
    borderRadius: '30px',
    padding: 10,
    marginRight: 10,
  },
  buttonStyle: {
    backgroundColor: '#FDC319',
    borderColor: 'transparent',
    borderWidth: 0,
    borderRadius: "9000px",
    width: 240
  }
});

export default Login