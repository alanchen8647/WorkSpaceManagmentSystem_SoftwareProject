import Box from "@mui/material/Box";
import { useState } from "react";
import Modal from "@mui/material/Modal";
import { addCasesRecord } from "../firebaseFunction/cloudDatabase";
import ModalForm from "./modalform.jsx";
import { useEffect } from "react";
import { listenToAuthChanges } from "../firebaseFunction/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../private/firebase.jsx";

export default function CreateCase({ open, setIsOpen }) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 9,
  };

  const [username, setUsername] = useState(null);

  useEffect(() => {
    const unsubscribe = listenToAuthChanges(async (user) => {
      try {
        if (user) {
          const userDocRef = doc(db, "Users", user.uid);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            setUsername(userData.userName);
          } else {
            console.log("No such user document!");
          }
        } else {
          setUsername(null);
        }
      } catch (error) {
        console.error("Error loading user document:", error);
      }
    });

    return () => unsubscribe();
  }, []);

  const [caseData, setCaseData] = useState({
    name: "",
    startDate: "",
    fee: 0,
    employee: "",
    labels: [],
    caseType: "Single",
    paymentStatus: false,
    caseStatus: "N",
    cashCollected: 0,
    electronicPayment: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCaseData((prev) => ({
      ...prev,
      [name]: name === "fee" ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    try {
      const finalCaseData = {
        ...caseData,
        employee: username || caseData.employee,
        cashCollected: caseData.cashCollected ? caseData.cashCollected : null,
        electronicPayment: caseData.electronicPayment
          ? caseData.electronicPayment
          : null,
      };

      addCasesRecord(finalCaseData);
      alert("Case Created");
      setCaseData({
        name: "",
        startDate: "",
        fee: 0,
        employee: username || "",
        labels: [],
        paymentStatus: false,
        caseStatus: "",
        cashCollected: 0,
        electronicPayment: 0,
      });
      alert("Case Created Successfully");
    } catch (err) {
      alert("Failed to create case");
    }
  };

  return (
    <>
      <Modal
        open={open}
        onClose={() => setIsOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h2 className="text-lg font-bold mb-4 align-center justify-center">
            Create New Case
          </h2>
          <ModalForm
            handleSubmit={handleSubmit}
            caseData={caseData}
            setCaseData={setCaseData}
            handleChange={handleChange}
            setIsOpen={setIsOpen}
          />
        </Box>
      </Modal>
    </>
  );
}
