import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Input, Button, Text } from '@ui-kitten/components';
import { useFonts, Kanit_400Regular } from '@expo-google-fonts/kanit';
import { collection, addDoc, doc, getDocs, onSnapshot } from "firebase/firestore";
import { db } from '../firebase/firebase-config';


const Login = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  let [fontsLoaded] = useFonts({
    Kanit_400Regular
  });

  if (!fontsLoaded) {
    return null;
  }
  var user
  const login = async()=>{
    var passwordText
    var CryptoJS = require("crypto-js");
    
    const userSnapshot = await getDocs(collection(db, "users"));
    userSnapshot.forEach((doc) => {
      console.log(doc.data().username);
      if (doc.data().username == username) {
        var decryptpassword  = CryptoJS.AES.decrypt(doc.data().password, 'tungty');
        passwordText = decryptpassword.toString(CryptoJS.enc.Utf8);
        user = doc.data()
        console.log(passwordText)
        return;
      }});
      
      if(passwordText==password){
          console.log(user.username)
          setToken();
          //add codeไปหน้าหลัก
      }
      else{
        console.log("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง")
      }
  }
  
  const setToken = async()=>{
    var token = Math.random().toString(36);
    localStorage.setItem("token",token);
    localStorage.setItem("Username",user.username);
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
      {/* <Button style = {{marginTop:10}} title="SIGN IN" titleStyle={styles.fontEng} buttonStyle={styles.buttonStyle} onPress={login}></Button>
      <View style = {{marginTop:10}}>
        <Text style={styles.fontTh}>ยังไม่มีสมาชิก</Text>
        <Text onPress={ () => { navigation.navigate("Register");}} style={styles.fontTh} color="#4542C1">สมัครสมาชิกใหม่?</Text>
        <View styles={{backgroundColor:'#FFFFFF'}}> */}
        
      <Button style={[styles.fontEng, styles.buttonStyle, { margin: 10 }]} onPress={login}>{evaProps => <Text {...evaProps} style={{ color: "#4542C1", fontFamily: 'Kanit_400Regular', }}>Sign In</Text>}</Button>
      <View style={{ marginTop: 10 }}>
        <Text onPress={ () => { navigation.navigate("CreateNewParty");}} styles={styles.fontEng}>ยังไม่มีสมาชิก</Text>
        <Text onPress={ () => { navigation.navigate("Register");}} style={styles.fontTh} color="#4542C1">สมัครสมาชิกใหม่?</Text>
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
  fontTh: {
    fontFamily: 'OpenSans_500Medium',
    fontSize: 14,
    color: "#ffffff"
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