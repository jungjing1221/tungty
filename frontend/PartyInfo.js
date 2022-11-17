import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Input, Button, Text, Divider, Icon } from '@ui-kitten/components';
import { useFonts, Kanit_400Regular } from '@expo-google-fonts/kanit';
import { collection, addDoc, doc, getDocs, onSnapshot } from "firebase/firestore";
import { db } from '../firebase/firebase-config';
import images from '../assets/images';


const PartyInfo = ({ navigation }) => {
    let [fontsLoaded] = useFonts({
        Kanit_400Regular
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <View style={styles.container}>
            <Text style={{ fontFamily: 'Kanit_400Regular', fontSize: 20, color: '#FDC319' }}>4 SEPTEMBER 2022 08:30</Text>
            <Image
                style={{ width: 100, height: 100, marginTop: 45 }}
                source={images.image1}
            />
            <View style={styles.row}>
            <Icon
                style={[styles.icon, {marginTop:10}]}
                fill='#8F9BB3'
                name='person-outline'/><Text style={{fontFamily: 'Kanit_400Regular', color:'grey', fontSize: 18, marginTop: 10}}>10</Text>
                </View>
            <View style={{ marginTop: 10 }}>
                <Divider style={styles.bgWhite} />
                <Text style={styles.fontEngInputHeader}>ตื่นไปคณะด้วยกันไหมผองเพื่อนชาวไอที...</Text>
                <Divider style={styles.bgWhite} />
                <View>
                    <Text style={{fontFamily: 'Kanit_400Regular', marginTop:10}}>เป็นปาร์ตี้ปลุกความขยันในตัวคุณหากคุณเคยประสบปัญหาการลืมตั้งนาฬิกาปลุก ทำให้ไป เข้าเรียนสายบ่อยครั้ง อย่าลังเลที่จะเข้าร่วม กลุ่มของเรา มาตื่นไปเรียนวิชาที่เรารักไป...</Text>
                </View>
            </View>

            <Button style={[styles.fontEng, styles.buttonStyle, { margin: 15 }]} onPress={"chat"}>{evaProps => <Text {...evaProps} style={{ color: "#ffffff", fontFamily: 'Kanit_400Regular', }}>Chat</Text>}</Button>
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
        fontSize: 18,
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