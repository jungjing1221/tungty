import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Input, Button, Text, Divider, Icon } from '@ui-kitten/components';
import { useFonts, Kanit_400Regular } from '@expo-google-fonts/kanit';
import { collection, addDoc, doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from '../firebase/firebase-config';
import images from '../assets/images';
import { async } from '@firebase/util';


const ProfileInfo = ({ navigation }) => {
    const [user, setUser] = useState('')

    useEffect(() => {
        //FETCH PUBLIC PARTY DATA
        const fetchUser = async () => {
            let user
            const username = localStorage.getItem("Username")
            const ref = doc(db, "users", username);
            const snap = await getDoc(ref);
            if (snap.exists()) {
                user = snap.data()
            } else {
                window.alert("มึงไม่มี USER")
            }
            setUser(user)

        }
        fetchUser()
    }, [])

    let [fontsLoaded] = useFonts({
        Kanit_400Regular
    });

    if (!fontsLoaded) {
        return null;
    }


    return (
        <View style={styles.container}>
            <Image
                style={{ width: 230, height: 230, marginTop: 45 }}
                source={images.image1}
            />
            <View style={{ marginTop: 10 }}>
                <Text style={[styles.fontEngInputHeader, { textAlign: 'center' }]}>{user.name}</Text>
                <Divider style={styles.bgWhite} />
                <View>
                    <Text style={{ fontFamily: 'Kanit_400Regular', marginTop: 10, fontSize: 20, color: '#4542C1' }}>{user.aboutMe}</Text>
                </View>
            </View>
            {/* <Button style={[styles.fontEng, styles.buttonStyle, { margin: 10 }]} onPress={() => navigation.navigate("EditProfile")}>{evaProps => <Text {...evaProps} style={{ color: "#4542C1", fontFamily: 'Kanit_400Regular', }}>Edit About Me</Text>}</Button> */}
            <Button style={[styles.fontEng, styles.buttonStyle, { margin: 30 }]} onPress={() => { navigation.navigate("Login"); }}>{evaProps => <Text {...evaProps} style={{ color: "#4542C1", fontFamily: 'Kanit_400Regular', fontSize: 20 }}>SIGN OUT</Text>}</Button>
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
        fontSize: 20,
        color: '#4542C1',
    },
    fontEngInputHeader: {
        fontFamily: 'Kanit_400Regular',
        fontSize: 30,
        color: '#FDC319',
        margin: 10
    },
    fontEngInput: {
        fontFamily: 'Kanit_400Regular',
        fontSize: 14,
        color: '#000000',
        borderRadius: '30px',
        padding: 11,
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
        backgroundColor: '#D9D9D9',
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
        width: 35,
        height: 35,
    },
});

export default ProfileInfo