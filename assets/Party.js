import { collection, addDoc, doc, getDocs, onSnapshot } from "firebase/firestore";
import { db } from '../firebase/firebase-config';

export const party = async()=>{
    let partyList = []
    const partySnapshot = await getDocs(collection(db, "parties"));
    partySnapshot.forEach((doc) => {
      partyList.push(doc.data())
    });
    return partyList;
}
