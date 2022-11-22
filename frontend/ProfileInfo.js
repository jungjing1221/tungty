import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Input, Button, Text, Divider, Icon } from '@ui-kitten/components';
import { useFonts, Kanit_400Regular } from '@expo-google-fonts/kanit';
import { collection, addDoc, doc, getDocs, onSnapshot } from "firebase/firestore";
import { db } from '../firebase/firebase-config';
import images from '../assets/images';


const ProfileInfo = ({ navigation }) => {
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
                <Text style={[styles.fontEngInputHeader, {textAlign: 'center'}]}>สมสีส้ม</Text>
                <Divider style={styles.bgWhite} />
                <View>
                    <Text style={{fontFamily: 'Kanit_400Regular', marginTop:10, fontSize:20, color: '#4542C1'}}>เรียนที่คณะเทคโนโลยีสารสนเทศสจล. ปี3 รุ่น 18 ชอบเล่นเกมมาก ชอบเล่นบาสมากชวนเล่นได้ค่ะ ขี้เซามาก ตื่นสาย หาตี้โทรปลุก ไปคณะค่ะ</Text>
                </View>
            </View>

            <Button style={[styles.fontEng, styles.buttonStyle, { margin: 30 }]} onPress={"singout"}>{evaProps => <Text {...evaProps} style={{ color: "#4542C1", fontFamily: 'Kanit_400Regular', fontSize:20}}>SIGN OUT</Text>}</Button>
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