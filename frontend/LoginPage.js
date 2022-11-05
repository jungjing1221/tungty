import React,{ useState } from 'react';
import { Input, Button } from '@rneui/themed';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';
import { OpenSans_500Medium, } from '@expo-google-fonts/open-sans';
import { collection, addDoc, doc, getDocs, onSnapshot } from "firebase/firestore";
import { db } from '../firebase/firebase-config';


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  let [fontsLoaded] = useFonts({
    Inter_900Black, OpenSans_500Medium
  });

  if (!fontsLoaded) {
    return null;
  }

  const login = async()=>{
    var CryptoJS = require("crypto-js");
    const userSnapshot = await getDocs(collection(db, "users"));
    userSnapshot.forEach((doc) => {
      console.log(doc.data().username);
      if (doc.data().username == username) {
        var decryptpassword  = CryptoJS.AES.decrypt(doc.data().password, 'tungty');
        var passwordText = decryptpassword.toString(CryptoJS.enc.Utf8);
        console.log(passwordText)
        return;
      }});
    // var bytes  = CryptoJS.AES.decrypt(cipherpassword, 'tungty');
    // var originalText = bytes.toString(CryptoJS.enc.Utf8);
  }
  return (
    <View style={styles.container}>
      <Text style={{ fontFamily: 'Inter_900Black', fontSize: 70, color: '#FDC319' }}>TungTY</Text>
      <View style = {{marginTop:25}}>
        <Text style={styles.fontEngInputHeader}>Username</Text>
        <Input style={styles.fontEngInput} onChangeText={text => setUsername(text)}/>
      </View>
      <View style = {{marginTop:10}}>
        <Text style={styles.fontEngInputHeader}>Password</Text>
        <Input secureTextEntry={true} style={styles.fontEngInput} onChangeText={text => setPassword(text)}/>
      </View>
      <Button style = {{marginTop:10}} title="SIGN IN" titleStyle={styles.fontEng} buttonStyle={styles.buttonStyle} onPress={login}></Button>
      <View style = {{marginTop:10}}>
        <Text style={styles.fontTh}>ยังไม่มีสมาชิก</Text>
        <Text style={styles.fontTh}>สมาชิกใหม่?</Text>
        <View styles={{backgroundColor:'#FFFFFF'}}>

        </View>
      </View>
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

export default Login