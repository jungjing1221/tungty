import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, StatusBar, FlatList, TouchableOpacity, TextInput, Image, ImageBackground } from 'react-native';
import { Layout, Tab, TabView, Text, Input, Button, Card } from '@ui-kitten/components';
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';
import { OpenSans_500Medium, } from '@expo-google-fonts/open-sans';
import { Kanit_400Regular } from '@expo-google-fonts/kanit';
import { collection, addDoc, doc, getDoc, onSnapshot, setDoc, updateDoc, arrayUnion, Timestamp, toDate } from "firebase/firestore";
import { db } from '../firebase/firebase-config';
import Searchbar from '../assets/component/searchbar';


const Chat = ({ navigation, route }) => {
    const { partyID } = route.params;
    const [text, setText] = React.useState('');
    const [data, setData] = useState([])

    useEffect(() => {
        const fetchChat = async () => {
            let user
            const username = localStorage.getItem("Username")
            const ref = doc(db, "users", username);
            const snap = await getDoc(ref);
            if (snap.exists()) {
                user = snap.data()
            } else {
                window.alert("มึงไม่มี USER")
            }
            console.log(partyID)
            const chatref = doc(db, "chats", partyID);
            const chat = await onSnapshot(chatref, (chatList) => {
                if (chatList) {
                    let msgList
                    console.log(chatList.data().msg[0])
                    msgList = chatList.data().msg
                    msgList.forEach(msg => {
                        console.log(msg)
                        if (msg.sender == username) {
                            msg.state = "user"
                        }
                        else {
                            msg.state = "other"
                        }
                        msg.time = (msg.time.toDate()).toString().slice(16, 21) + ", " + (msg.time.toDate()).toString().slice(8, 10) + " " + (msg.time.toDate()).toString().slice(4, 7)
                    });

                    setData(msgList)
                }
            });

        }
        fetchChat()
    }, [])

    const send = async () => {
        console.log(text)
        let user
        const username = localStorage.getItem("Username")
        const ref = doc(db, "users", username);
        const snap = await getDoc(ref);
        if (snap.exists()) {
            user = snap.data()
        } else {
            window.alert("มึงไม่มี USER")
        }
        await updateDoc(doc(db, "chats", partyID), {
            msg: arrayUnion({
                text: text,
                sender: username,
                time: Timestamp.now()
            })
        })
        setText("")
    }

    let [fontsLoaded] = useFonts({
        Inter_900Black, OpenSans_500Medium, Kanit_400Regular

    });

    if (!fontsLoaded) {
        return null;
    }

    return (

        <View style={[styles.MainContainer, { backgroundColor: 'white' }]}>
            <ScrollView style={styles.scrollView} >
                <View style={styles.tabContainer}>
                    <View style={[styles.containerCardparty]}>
                        <FlatList
                            data={data}
                            renderItem={({ item }) =>
                                <View style={[styles.containerCardparty, { marginTop: '10px' }]}>
                                    <View style={[styles.row, { padding: '10px' }]}>
                                        <View>
                                            <ImageBackground source={require('../assets/circlebg.png')} style={{ width: '40px', height: '40px', justifyContent: 'center', alignItems: 'center', }}>
                                                <Image source={require('../assets/foodparty_icon.png')} style={{ width: 25, height: 25, }} />
                                            </ImageBackground>
                                        </View>

                                        <View style={[{ alignContent: 'center', justifyContent: 'center', paddingLeft: '10px' }]}>
                                            <Text style={{ fontWeight: 'bold' }}>{item.sender} <Text style={{ color: 'gray', fontSize: '10px' }}>{item.time}</Text> </Text>
                                        </View>
                                    </View>

                                    {item.state === 'user' ?
                                        <View style={[styles.card, { width: 'fit-content', backgroundColor: '#4542C1' }]}>
                                            <Text style={[styles.fontTh, { color: '#ffffff', fontSize: '20px', fontWeight: 'bold' }]}>{item.text}</Text>
                                        </View>
                                        :
                                        <View style={[styles.card, { width: 'fit-content', }]}>
                                            <Text style={[styles.fontTh, { color: '#4542C1', fontSize: '20px', fontWeight: 'bold' }]}>{item.text}</Text>
                                        </View>}

                                </View>}
                            keyExtractor={(item) => item.id}
                        />

                        {/* Search Results Container */}

                        <View></View>
                    </View >
                </View>


        </ScrollView>
        <View style={ [styles.bottomView,]} >
        <View style={{ width: '100%', position: 'absolute', bottom: '0', backgroundColor:'#FDC319', padding:'10px'}}>
                <View style={[styles.searchContainer, { width: '100%' , paddingLeft:'10px'}]}>
                    <Input
                        // placeholder="Search"
                        style={styles.textInput}
                        onChangeText={text => setText(text)}
                    />
                    <View style={{ justifyContent: 'center', padding:'5px'}}>
                        <View style={{backgroundColor:'#4542C1', borderRadius: '20px', width: '50px', height:' 40px', alignItems: 'center', justifyContent:'center', }}>
                            <Text onPress={send} style={{color: 'white'}}>SENT</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
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
    card: {
        padding: 10,
        backgroundColor: '#D9D9D9',
        borderRadius: "10px",
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
    }, textInput: {
        // backgroundColor: 'green',
        flex: 1,
        color: 'white',
        width: '100%',
        height: '100%',
        // backgroundColor: '#yellow',
        borderColor: 'transparent',
        borderRadius: '30px',
    },
    container: {
        alignItems: 'center',
        // height: '80%', 
        width: '90%',
        backgroundColor: 'black',
    },
    textInput: {
        // backgroundColor: 'green',
        flex: 1,
        color: 'white',
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        borderColor: 'transparent',
        borderRadius: '30px',
    },
    vwSearch: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        backgroundColor: '#4542C1',
        borderRadius: '30px',
    },
    icSearch: {
        height: 18, width: 18,
    },
    searchContainer:
    {
        height: 40,
        width: '100%',
        flexDirection: 'row',
        // borderRadius: '30px', 
    },
    // container: {
    //     alignItems: 'center',
    //     // height: '80%', 
    //     width: '80%' ,
    //     backgroundColor: 'white',
    // },
    bottomView: {
        width: '100%',
        height: 50,
        borderColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        //   position: 'absolute',
        bottom: 0
    },
    textStyle: {
        color: '#fff',
        fontSize: 22
    }
    ,
    MainContainer:
    {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
        // paddingTop: ( Platform.OS === 'ios' ) ? 20 : 0
    },
});

export default Chat