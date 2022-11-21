import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Input, Button, Text, Divider, Icon } from '@ui-kitten/components';
import { useFonts, Kanit_400Regular } from '@expo-google-fonts/kanit';
import { collection, addDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from '../firebase/firebase-config';
import { party } from '../assets/Party';
import images from '../assets/images';


const PartyInfo = ({ route, navigation }) => {
    const { partyID } = route.params;
    const [joinStatus, setJoinStatus] = React.useState(0);
    const [user, setUser] = React.useState();
    const [data, setData] = useState([])
    console.log(partyID)
    useEffect(() => {
        const checkparty = async() => {
            let loginUser;
            const username = localStorage.getItem("Username")
            const ref = doc(db, "users", username);
            const snap = await getDoc(ref);
            if (snap.exists()) {
                loginUser = snap.data()
                setUser(snap.data())
            } else {
                window.alert("เข้าสู่ระบบก่อนใช้งาน")
            }
            setJoinStatus(loginUser.party.includes(partyID))
        }
        checkparty()
    }, [])

    const joinParty = async () => {
        // const ref = doc(db, "users", username);
        //     const snap = await getDoc(ref);
        //     if (snap.exists()) {
        //         let user = snap.data()
        //     } else {
        //         window.alert("เข้าสู่ระบบก่อนใช้งาน")
        //     }
        console.log(partyID,user)
        user.party.push(partyID)
        
    
    
        //ADD PARTY TO USER
        const docRef = await setDoc(doc(db, "users", user.username), {
          ...user
        });
        setJoinStatus(true)
      }
      const chatRoom = async()=>{
        navigation.navigate("MyChat")
      }

    let [fontsLoaded] = useFonts({
        Kanit_400Regular
    });
    if (!fontsLoaded) {
        return null;
    }


    return (
        <View style={styles.container}>
            <Text style={{ fontFamily: 'Kanit_400Regular', fontSize: 15, color: '#FDC319' }}>4 SEPTEMBER 2022 08:30</Text>
            <Image
                style={{ width: 100, height: 100, marginTop: 45 }}
                source={images.image1}
            />
            <View style={styles.row}>
                <Icon
                    style={styles.icon}
                    fill='#8F9BB3'
                    name='person-outline' /><Text style={{ fontFamily: 'Kanit_400Regular', color: 'grey', fontSize: 18 }}>10</Text>
            </View>
            <View style={{ marginTop: 10 }}>
                <Divider style={styles.bgWhite} />
                <Text style={styles.fontEngInputHeader}>ตื่นไปคณะด้วยกันไหมผองเพื่อนชาวไอที...</Text>
                <Divider style={styles.bgWhite} />
                <View>
                    <Text style={{ fontFamily: 'Kanit_400Regular', marginTop: 10 }}>เป็นปาร์ตี้ปลุกความขยันในตัวคุณหากคุณเคยประสบปัญหาการลืมตั้งนาฬิกาปลุก ทำให้ไป เข้าเรียนสายบ่อยครั้ง อย่าลังเลที่จะเข้าร่วม กลุ่มของเรา มาตื่นไปเรียนวิชาที่เรารักไป...</Text>
                </View>
            </View>
            <View>
                {(() => {
                if (joinStatus){
                    return (
                        <Button style={[styles.fontEng, styles.buttonStyle, { margin: 15 }]} onPress={chatRoom}>{evaProps => <Text {...evaProps} style={{ color: "#ffffff", fontFamily: 'Kanit_400Regular', }}>Chat</Text>}</Button>
                    )
                }
                else{
                    return (
                        <Button style={[styles.fontEng, styles.buttonStyle, { margin: 15 }]} onPress={joinParty}>{evaProps => <Text {...evaProps} style={{ color: "#ffffff", fontFamily: 'Kanit_400Regular', }}>Join</Text>}</Button>
                    )
                }
                })()}
                
            </View>
            
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        fontFamily: 'Kanit_400Regular',
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 50,
        width: "100%"
    },
    fontEng: {
        fontFamily: 'Kanit_400Regular',
        fontSize: 16,
        color: '#4542C1',
    },
    fontEngInputHeader: {
        fontFamily: 'Kanit_400Regular',
        fontSize: 20,
        color: '#FDC319',
        margin: 10
    },
    fontEngInput: {
        fontFamily: 'Kanit_400Regular',
        fontSize: 14,
        color: '#000000',
        borderRadius: '30px',
        padding: 10,
        marginRight: 10,
    },
    row: {
        flexDirection: "row",
        flexWrap: "wrap",
        display: "flex",
    },
    fontTh: {
        fontFamily: 'OpenSans_500Medium',
        fontSize: 14,
        color: "#ffffff"
    },
    buttonStyle: {
        backgroundColor: '#4542C1',
        borderColor: 'transparent',
        borderWidth: 0,
        borderRadius: "9000px",
        width: 240
    },
    textarea: {
        fontFamily: 'Inter_900Black',
        fontSize: 14,
        color: '#000000',
        borderRadius: '30px',
        textAlignVertical: 'top',  // hack android
        fontSize: 14,
        color: '#333',
        width: 300
    },
    bgWhite: {
        backgroundColor: "grey"
    },
    icon: {
        width: 32,
        height: 32,
    },
});

export default PartyInfo