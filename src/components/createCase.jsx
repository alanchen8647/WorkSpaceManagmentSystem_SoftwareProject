import Box from "@mui/material/Box";
import { useState } from "react";
import Modal from "@mui/material/Modal";
import { addCasesRecord } from "../firebaseFunction/cloudDatabase";
import ModalForm from "./modalform.jsx";

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

  const [caseData, setCaseData] = useState({
    name: "",
    caseType: "Single",
    hasDependent: false,
    startDate: "",
    endDate: "",
    fee: 0,
    employee: "",
    notes: [],
    paymentStatus: false,
    caseStatus: "Not Started",
    pin: {},
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCaseData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      addCasesRecord(caseData);
      alert("Case Created");
      setCaseData({
        name: "",
        caseType: "",
        hasDependent: false,
        startDate: "",
        endDate: "",
        fee: 0,
        employee: "",
        notes: [],
        paymentStatus: false,
        caseStatus: "",
        pin: {},
      });
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
          />
        </Box>
      </Modal>
    </>
  );
}
