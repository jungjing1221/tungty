import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';
import { OpenSans_500Medium, } from '@expo-google-fonts/open-sans';
import { collection, deleteDoc, doc, getDoc, updateDoc, setDoc,getDocs } from "firebase/firestore";
import { db } from '../firebase/firebase-config';
import { Radio, RadioGroup, IndexPath, Layout, Select, SelectItem, Input, Datepicker, Button } from '@ui-kitten/components';
import images from '../assets/images';
import { party } from '../assets/Party';


const EditParty = ({ route, navigation }) => {
    const { partyID } = route.params;
    const [partyName, setPartyName] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(new IndexPath(0));
    const [about, setAbout] = useState('');
    const [selectedPrivate, setSelectedPrivate] = useState(0);
    const [date, setDate] = React.useState(new Date());
    const [RandomNumber] = useState(Math.floor(Math.random() * 5) + 1);
    const [partyData, setPartyData] = useState()
    const [EditingParty, setEditingParty] = useState()

    useEffect(() => {
        const fetchAllparty = () => {
            let partyPromise = party()
            let typelist =  [
                'อาหาร',
                'ท่องเที่ยว',
                'พักผ่อน',
                'เรียน/ทำงาน',
                'อื่น ๆ'
            ];
            partyPromise.then(async (value) => {
                let targetparty = value.filter(party => party.partyName == partyID)
                setPartyData(value)
                setPartyName(targetparty[0].partyName)
                setAbout(targetparty[0].about)
                setSelectedPrivate(targetparty[0].selectedPrivate)
                setEditingParty(targetparty[0])
                // console.log(typelist.indexOf(targetparty[0].type))
                // setSelectedIndex(1)
            }).catch(err => {
              console.log(err);
            });
            
        }
        fetchAllparty()
    }, [])

    const data = [
        'อาหาร',
        'ท่องเที่ยว',
        'พักผ่อน',
        'เรียน/ทำงาน',
        'อื่น ๆ'
    ];
    const displayValue = data[selectedIndex.row];

    let [fontsLoaded] = useFonts({
        Inter_900Black, OpenSans_500Medium
    });
    

    if (!fontsLoaded) {
        return null;
    }
    const save = async () => {
        const username = localStorage.getItem("Username")
        const ref = doc(db, "users", username);
        const snap = await getDoc(ref);
        if (snap.exists()) {
            console.log(snap.data().party);
            let user = snap.data()
            user.party.push("test")
            console.log(user.party);
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
        console.log(partyName, about, selectedPrivate, date)
        try {
            const partyref = await updateDoc(doc(db, "parties",partyID), {
                about: about,
                selectedPrivate: selectedPrivate,
                date: date,
                type: displayValue,
            });
        } catch (e) {
            console.error("Error adding document: ", e);
        }
        navigation.navigate("PartyInfo",{partyID:partyName});
    }

    const delParty =async()=>{
        //DEL PARTY FROM LIST
        let leftParty = partyData.filter(party => party.partyName!= partyID)
        console.log(leftParty)
        // leftParty.forEach( async(party)=>{
        //     const docRef = await setDoc(doc(db, "parties",party.partyName), {
        //         ...party
        //     });
        // })
        await deleteDoc(doc(db, "parties", partyID));


        let alluser = []
        const userSnapshot = await getDocs(collection(db, "users"));
        console.log(userSnapshot)
        userSnapshot.forEach((user) => {
            console.log(user.data().username)
            alluser.push(user.data())
        });

        //DEL PARTY FROM ALL USER
        alluser.forEach( async(user)=>{
            for( var i = 0; i < user.party.length; i++){ 
                if ( user.party[i] == partyID) { 
                    user.party.splice(i, 1); 
                    console.log("del",i)
                    console.log(user.party)
                }
            }
            const docRef = await setDoc(doc(db, "users",user.username), {
                ...user
            });
        })
        console.log(alluser)
        navigation.navigate("FindParty");
    }
    return (
        <View style={styles.container}>
            <Image
                style={{ width: 100, height: 100 }}
                source={images["image" + RandomNumber]}
            />

            <View style={styles.row}>
                <Text style={styles.fontEngInputHeader}>Party Type : </Text>
                <View style={styles.container}>
                    <Layout style={styles.container} level='1'>
                        <Select
                            style={{ width: "240px" }}
                            value={displayValue}
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
                <Input style={styles.fontEngInput} value={partyName} onChangeText={text => setPartyName(text)} />
            </View>
            <View style={styles.row}>
                <Text style={styles.fontEngInputHeader}>About :</Text>
                <Input style={[styles.fontEngInput, styles.fontTh, styles.textarea]} value={about} onChangeText={text => setAbout(text)} multiline='true' numberOfLines="4" />
            </View>
            <View style={styles.row}>
                <Text style={styles.fontEngInputHeader}>Date : </Text>
                <Layout style={{ marginTop: 10 }} level='1'>
                    <Datepicker
                        date={date}
                        style={{ borderRadius: '30px' }}
                        onSelect={nextDate => setDate(nextDate)}
                    />
                </Layout>
            </View>
            <RadioGroup
                selectedIndex={selectedPrivate}
                style={[styles.row, { marginTop: '20' }]}
                onChange={index => setSelectedPrivate(index)}>
                <Radio>Public</Radio>
                <Radio>Private</Radio>
            </RadioGroup>
            <View style={styles.row}>
                <Button style={[styles.fontEng, styles.buttonStyle, { margin: 10 }]} onPress={save}>{evaProps => <Text {...evaProps} style={{ color: "#4542C1", fontFamily: 'Kanit_400Regular', }}>SAVE</Text>}</Button>
                <Button style={[styles.fontEng, styles.buttonStyle2, { margin: 10 }]} onPress={delParty}>{evaProps => <Text {...evaProps} style={{ color: "#4542C1", fontFamily: 'Kanit_400Regular', }}>DELETE PARTY</Text>}</Button>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
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
        marginTop: 3
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
        borderRadius: '30px',
        alignSelf: 'stretch',
        width: "240px",
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
        width: 150
    },
    buttonStyle2: {
        backgroundColor: '#E21E1E',
        borderColor: 'transparent',
        borderWidth: 0,
        borderRadius: "9000px",
        width: 150
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
    textBlack: {
        color: "black !important"
    }
});

export default EditParty