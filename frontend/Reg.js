import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts, Kanit_400Regular } from '@expo-google-fonts/kanit';
import { collection, addDoc, doc, getDocs, onSnapshot } from "firebase/firestore";
import { db } from '../firebase/firebase-config';
import { Input, Button} from '@ui-kitten/components';


const Register = () => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  let [fontsLoaded] = useFonts({
    Kanit_400Regular
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
      <Text style={{ fontFamily: 'Kanit_400Regular', fontSize: 40, color: '#FDC319' }}>REGISTER</Text>
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
        <Input secureTextEntry={true}  style={styles.fontEngInput} onChangeText={text => setPassword(text)} />
      </View>
      <View style={{ marginTop: 20 }}>
        <Text style={styles.fontEngInputHeader}>Confirm Password</Text>
        <Input secureTextEntry={true}  style={styles.fontEngInput} onChangeText={text => setConfirmPassword(text)} />
      </View>
      <Button style={[styles.fontEng, styles.buttonStyle, { margin: 10 }]} onPress={signup}>{evaProps => <Text {...evaProps} style={{ color: "#4542C1", fontFamily: 'Kanit_400Regular', }}>Sign Up</Text>}</Button>
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
    backgroundColor: '#FFFFFF',
    borderRadius: '30px',
    width: 280
  },
  fontTh: {
    fontFamily: 'Kanit_400Regular',
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