import {
  collection,
  addDoc,
  getDocs,
  Timestamp,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../private/firebase.jsx";

// Add a new document to the "Cases" collection (haven't tested yet, may need adjustments)
export const addCasesRecord = async (clientData) => {
  try {
    const docRef = await addDoc(collection(db, "Cases"), {
      ...clientData,
      startDate: clientData.startDate
        ? Timestamp.fromDate(new Date(clientData.startDate))
        : null,

      endDate: clientData.endDate
        ? Timestamp.fromDate(new Date(clientData.endDate))
        : null,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

//Edit a document in the "Cases" collection

export const editCaseRecord = async (caseId, updatedData) => {
  try {
    const caseRef = doc(db, "Cases", caseId);
    await updateDoc(caseRef, {
      ...updatedData,
      startDate: updatedData.startDate
        ? Timestamp.fromDate(new Date(updatedData.startDate))
        : null,

      endDate: updatedData.endDate
        ? Timestamp.fromDate(new Date(updatedData.endDate))
        : null,
    });
    console.log("Document updated with ID: ", caseId);
  } catch (e) {
    console.error("Error updating document: ", e);
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
};

//todo: update and delete functions for Cases collection can be added here, query filter function based on requirements
//
