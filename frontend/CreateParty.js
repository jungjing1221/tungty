import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';
import { OpenSans_500Medium, } from '@expo-google-fonts/open-sans';
import { collection, addDoc, doc, getDocs, onSnapshot } from "firebase/firestore";
import { db } from '../firebase/firebase-config';
import { Radio, RadioGroup, IndexPath, Layout, Select, SelectItem, Input } from '@ui-kitten/components';


const CreateNewParty = () => {
    const [partyName, setPartyName] = useState('');
    const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const [about, setAbout] = useState('');
    const [selectedPrivate, setSelectedPrivate] = React.useState(0);
    let [fontsLoaded] = useFonts({
        Inter_900Black, OpenSans_500Medium
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <Text style={styles.fontEngInputHeader}>Party Type : </Text>
                <View style={styles.container}>
                    <Layout style={styles.container} level='1'>
                        <Select
                            selectedIndex={selectedIndex}
                            onSelect={index => setSelectedIndex(index)}>
                            <SelectItem title='อาหาร' />
                            <SelectItem title='ท่องเที่ยว' />
                            <SelectItem title='พักผ่อน' />
                            <SelectItem title='เรียน/ทำงาน' />
                            <SelectItem title='อื่น ๆ' />
                        </Select>
                    </Layout>

                </View>
            </View>
            <View style={styles.row}>
                <Text style={styles.fontEngInputHeader}>Party Name :</Text>
                <Input style={styles.fontEngInput} onChangeText={text => setPartyName(text)} />
            </View>
            <View style={styles.row}>
                <Text style={styles.fontEngInputHeader}>About :</Text>
                <Input style={[styles.fontEngInput, styles.fontTh, { height: 190, }]} onChangeText={text => setAbout(text)} multiline='true' />
            </View>
            <React.Fragment>
                <RadioGroup
                    selectedPrivate={selectedPrivate}
                    onChange={index => setSelectedPrivate(index)}>
                    <Radio><Text category='p2' style={{ color:'black' }}>Public</Text></Radio>
                    <Radio><Text category='p2' style={{ color:'black' }}>Private</Text></Radio>
                </RadioGroup>

            </React.Fragment>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    },
    fontEng: {
        fontFamily: 'Inter_900Black',
        fontSize: 14,
        color: '#4542C1',
    },
    fontEngInputHeader: {
        fontFamily: 'Inter_900Black',
        fontSize: 14,
        color: '#4542C1',
        marginTop: 10
    },
    row: {
        flexDirection: "row",
        flexWrap: "wrap",
        display: "flex",
    },
    fontEngInput: {
        fontFamily: 'Inter_900Black',
        fontSize: 14,
        color: '#000000',
        backgroundColor: '#D9D9D9',
        borderRadius: '30px',
        alignSelf: 'stretch',
        width: "auto !important",
        padding: 10,
        marginRight: 10,
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
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        fontFamily: 'OpenSans_500Medium',
        fontSize: 14,
        color: '#000000',
        backgroundColor: '#D9D9D9',
        borderRadius: '30px',
        alignSelf: 'stretch',
        width: 280,
        padding: 20,
        marginRight: 10,
    },
    selectedTextStyle: {
        fontSize: 16,
        fontFamily: 'OpenSans_500Medium'
    },
    textareaContainer: {
        height: 180,
        padding: 5,
        backgroundColor: '#F5FCFF',
    },
    textarea: {
        fontFamily: 'Inter_900Black',
        fontSize: 14,
        color: '#000000',
        borderRadius: '30px',
        textAlignVertical: 'top',  // hack android
        fontSize: 14,
        color: '#333',
    },
});

export default CreateNewParty