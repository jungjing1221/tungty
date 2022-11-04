import React, { useState } from 'react';
import { Input, Button } from '@rneui/themed';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';
import { OpenSans_500Medium, } from '@expo-google-fonts/open-sans';
import { collection, addDoc, doc, getDocs, onSnapshot } from "firebase/firestore";
import { db } from '../firebase/firebase-config';


const Register = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  let [fontsLoaded] = useFonts({
    Inter_900Black, OpenSans_500Medium
  });

  if (!fontsLoaded) {
    return null;
  }

  const signup = async () => {
    // const user = "jame";

    console.log(name, username, password)
    let validUsername = true

    const userSnapshot = await getDocs(collection(db, "users"));
    userSnapshot.forEach((doc) => {
      console.log(doc.data().username);
      if (doc.data().username == username) {
        validUsername = false
      }
    });
    if (password == confirmpassword) {
      if (validUsername) {
        var CryptoJS = require("crypto-js");
        // Encrypt
        var cipherpassword = CryptoJS.AES.encrypt(password, 'tungty').toString();

        // Decrypt
        // var bytes  = CryptoJS.AES.decrypt(cipherpassword, 'tungty');
        // var originalText = bytes.toString(CryptoJS.enc.Utf8);

        // console.log(cipherpassword,originalText);
        try {
          const docRef = await addDoc(collection(db, "users"), {
            name: name,
            username:username,
            password:cipherpassword,
            party:[]
          });
          console.log("Document written with ID: ", docRef.id);
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      }
      else {
        console.log("ชื่อผู้ใช้นี้ถูกใช้ไปแล้ว")
      }
    }
    else {
      console.log("รหัสผ่านไม่ตรงกัน")
    }

  }
  //   const unsub = onSnapshot(doc(db, "users","GZGW8GA7Y9MCbDEpdcu3" ), (doc) => {
  //     console.log(doc.data());
  // });

  return (
    <View style={styles.container}>
      <Text style={{ fontFamily: 'Inter_900Black', fontSize: 40, color: '#FDC319' }}>REGISTER</Text>
      <View style={{ marginTop: 25 }}>
        <Text style={styles.fontEngInputHeader}>Name</Text>
        <Input style={styles.fontEngInput} onChangeText={text => setName(text)} />
      </View>
      <View style={{ marginTop: 20 }}>
        <Text style={styles.fontEngInputHeader}>Username</Text>
        <Input style={styles.fontEngInput} onChangeText={text => setUsername(text)} />
      </View>
      <View style={{ marginTop: 20 }}>
        <Text style={styles.fontEngInputHeader}>Password</Text>
        <Input style={styles.fontEngInput} onChangeText={text => setPassword(text)} />
      </View>
      <View style={{ marginTop: 20 }}>
        <Text style={styles.fontEngInputHeader}>Confirm Password</Text>
        <Input style={styles.fontEngInput} onChangeText={text => setConfirmPassword(text)} />
      </View>
      <Button style={{ marginTop: 40 }} title="SIGN UP" titleStyle={styles.fontEng} buttonStyle={styles.buttonStyle} onPress={signup}></Button>
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
    color: '#4542C1',
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

export default Register