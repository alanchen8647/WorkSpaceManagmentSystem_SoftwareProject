import {collection, addDoc, getDocs} from "firebase/firestore";
import {db} from "../private/firebase.jsx";

export const addCasesRecord = async (clientData) => {
    try {
        const docRef = await addDoc(collection(db, "Cases"), {
            ...clientData
        });
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
};

export const readCasesRecord = async () => {
    const querySnapshot = await getDocs(collection(db, "Cases"));
    let records = [];
    querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
        records.push({ id: doc.id, ...doc.data() });
    });
    return records;
}


