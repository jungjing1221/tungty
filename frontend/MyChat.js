import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, StatusBar, FlatList, TouchableOpacity, TextInput, Image, ImageBackground } from 'react-native';
import { Layout, Tab, TabView, Text, Input, Button, Card } from '@ui-kitten/components';
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';
import { OpenSans_500Medium, } from '@expo-google-fonts/open-sans';
import { Kanit_400Regular } from '@expo-google-fonts/kanit';
import BottomNavigtor from '../navigation/BottomNavigator';
import { party } from '../assets/Party';
import { collection, deleteDoc, doc, getDoc, updateDoc, setDoc, getDocs } from "firebase/firestore";
import { db } from '../firebase/firebase-config';


import Searchbar from '../assets/component/searchbar';

const MyChat = ({ navigation }) => {

    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [data, setData] = useState([
        { id: 1, name: "เราพวกผองชาวสจล.ไปหาข้าวกิน", description: "เป็นปาร์ตี้ปลุกความขยันในตัวคุณหากคุณเคยประสบปัญหาการลืมตั้งนาฬิกาปลุก ทำให้ไปเข้าเรียนสายบ่อยครั้ง" },
        { id: 2, name: "ไปเรียนคณะกันชาวไอที", description: "เป็นปาร์ตี้ปลุกความขยันในตัวคุณหากคุณเคยประสบปัญหาการลืมตั้งนาฬิกาปลุก ทำให้ไปเข้าเรียนสายบ่อยครั้ง" },
        { id: 3, name: "ไปเตะบอลกัน", description: "เป็นปาร์ตี้ปลุกความขยันในตัวคุณหากคุณเคยประสบปัญหาการลืมตั้งนาฬิกาปลุก ทำให้ไปเข้าเรียนสายบ่อยครั้ง" },
        { id: 4, name: "ไปตลาดหอในกัน", description: "เป็นปาร์ตี้ปลุกความขยันในตัวคุณหากคุณเคยประสบปัญหาการลืมตั้งนาฬิกาปลุก ทำให้ไปเข้าเรียนสายบ่อยครั้ง" },
        { id: 5, name: "เล่นเกมกันเพื่อนๆ", description: "เป็นปาร์ตี้ปลุกความขยันในตัวคุณหากคุณเคยประสบปัญหาการลืมตั้งนาฬิกาปลุก ทำให้ไปเข้าเรียนสายบ่อยครั้ง" },
    ])
    const [lastmsgList, setLastmsgList] =  useState([
        {text:"de",sender:"p"},
        {text:"de",sender:"p"}
    ])

    useEffect(() => {
        //FETCH PUBLIC PARTY DATA
        const fetchAllparty = () => {
            let partyPromise = party()
            partyPromise.then(async (value) => {
                let user
                const username = localStorage.getItem("Username")
                const ref = doc(db, "users", username);
                const snap = await getDoc(ref);
                if (snap.exists()) {
                    user = snap.data()
                } else {
                    window.alert("มึงไม่มี USER")
                }

                let myParty = value.filter(party => user.party.includes(party.partyName))
                let partyNameList =[]
                myParty.forEach((party)=>{
                    console.log(party.partyName)
                    partyNameList.push(party.partyName)
                })
                console.log(partyNameList)
                let chatList = []
                const chatListsnap = await getDocs(collection(db, "chats"));
                chatListsnap.forEach((doc) => {
                    console.log(partyNameList.includes("ไปนอนริมทะเลโง่ๆ"))
                    if(partyNameList.includes(doc.data().party)){
                        chatList.push(doc.data())
                        
                    }
                });
                console.log(chatList)
                chatList.forEach((chat)=>{
                    if(chat.msg[chat.msg.length-1])
                    chat.msg = chat.msg[chat.msg.length-1].text
                    else chat.msg = "ยังไม่มีข้อความในห้องสนทนานี้"
                    console.log(chat.msg)
                })
                setData(chatList);

        }).catch(err => {
            console.log(err);
        });
}
fetchAllparty()
    }, [])

let [fontsLoaded] = useFonts({
    Inter_900Black, OpenSans_500Medium, Kanit_400Regular

});

if (!fontsLoaded) {
    return null;
}

return (
    <View style={[styles.MainContainer, { backgroundColor: 'white' }]}>
        <ScrollView style={styles.scrollView}>
            <View style={styles.tabContainer}>
                <Searchbar></Searchbar>
                <View style={[styles.containerCardparty]}>
                    {data.map((item, index) =>
                        <TouchableOpacity key={index} style={[{ paddingBottom: '10px', paddingTop: '10px' }]} onPress={() => { navigation.navigate("Chat", { partyID: item.party }); }}>
                            <View style={[styles.row, styles.card,]}>
                                <View style={[styles.column3, { padding: 5 }]}>
                                    <ImageBackground source={require('../assets/circlebg.png')} style={{ width: '80px', height: '80px', justifyContent: 'center', alignItems: 'center', }}>
                                        <Image source={require('../assets/foodparty_icon.png')} style={{ width: 50, height: 50, }} />
                                    </ImageBackground>
                                </View>
                                <View style={[styles.column9, { paddingLeft: '10px' }]}>
                                    <Text style={[styles.fontTh, { color: '#4542C1', fontSize: '20px', fontWeight: 'bold' }]}>{item.party}</Text>
                                    <Text style={[styles.fontTh, { color: '#4542C1', fontSize: '15px', fontWeight: 'bold' }]}>{item.msg}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </ScrollView>
        <View style={styles.bottomView} >
            <BottomNavigtor navigation={navigation} />
        </View>
    </View>



    // </TabView>
);
};

const styles = StyleSheet.create({
    tabView: {
        backgroundColor: 'white',
        flex: 1,

    },
    tabContainer: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingTop: '20px'

    },
    tabBar: {
        backgroundColor: 'white',
    },
    fontEng: {
        fontFamily: 'Kanit_400Regular',
        fontSize: 14,
    },
    fontEngInputHeader: {
        fontFamily: 'Kanit_400Regular',
        fontSize: 14,
        color: '#ffffff',
    },
    fontEngInput: {
        fontFamily: 'Kanit_400Regular',
        borderRadius: '30px',
        width: 280,
        backgroundColor: 'transparent',
    },
    fontTh: {
        fontFamily: 'Kanit_400Regular',
    },
    buttonStyle: {
        backgroundColor: '#4542C1',
        borderColor: 'transparent',
        borderWidth: 0,
        borderRadius: "9000px",
        width: 240,
        color: 'red'
    },
    // containsFilter: {
    //   display: 'flex',
    //   flexDirection: 'column'
    // },
    containerFilter: {
        alignItems: 'center',
        // height: '100%', width: '100%' ,
        backgroundColor: 'white',
        flexDirection: 'row',
    },
    vwSearch: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        backgroundColor: '#4542C1',
        borderRadius: '30px',
    },
    searchContainer:
    {
        height: 40,
        width: '100%',
        backgroundColor: '#4542C1',
        // borderRadius: '30px', 
    },
    card: {
        padding: 10,
        backgroundColor: '#FFF9E5',
        borderRadius: "30px",
        borderColor: "transparent",
    },
    containerCardparty: {
        width: '90%',

    },
    row: {
        flexWrap: "wrap",
        display: "flex",
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%',
        height: '10'
    },
    column3: {
        width: "25%"
    },
    column9: {
        width: "75%"
    },
    MainContainer:
    {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
        // paddingTop: ( Platform.OS === 'ios' ) ? 20 : 0
    },
    bottomView: {

        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0
    },
});

export default MyChat