import {collection, addDoc, getDocs, onSnapshot, query, setDoc, doc} from "firebase/firestore";
import {db} from "../private/firebase.jsx";

// Add a new document to the "Cases" collection (haven't tested yet, may need adjustments)
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

// Read all documents from the "Cases" collection
export const readCasesRecord = async () => {
    const querySnapshot = await getDocs(collection(db, "Cases"));
    let records = [];
    querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
        records.push({ id: doc.id, ...doc.data() });
    });
    return records;
}

export const subscribeToUsersCollection = (callback) =>{
    const q = query(collection(db, "Users"));
    return onSnapshot(q, (querySnapshot) => {
        const users = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));
        console.log(users);
        callback(users);
    });
}

export const createNewUserRecord = async (userId, userData) => {
    try {
        await setDoc(doc(db, "Users", userId), userData);
        console.log("User record created successfully for userId:", userId);
    } catch (error) {
        console.error("Error creating user record:", error);
    }
}

export const readAllEmployees = async () =>{
    const querySnapshot = await getDocs(collection(db, "Users"));
    let employees = [];
    querySnapshot.forEach((doc) => {
        employees.push({ id: doc.id, ...doc.data() });
    });
    return employees;
}


//todo: update and delete functions for Cases collection can be added here, query filter function based on requirements