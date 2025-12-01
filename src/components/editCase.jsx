import Box from "@mui/material/Box";
import { useState } from "react";
import Modal from "@mui/material/Modal";
import { editCaseRecord } from "../firebaseFunction/cloudDatabase";
import ModalForm from "./modalform.jsx";

export default function EditCase({ open, setIsOpen, caseDataProp }) {
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

  function timestampToInputValue(ts) {
    if (!ts || !ts.seconds) return "";

    const date = new Date(ts.seconds * 1000);

    // Convert to yyyy-MM-ddTHH:mm format
    return date.toISOString().slice(0, 16);
  }

  const [caseData, setCaseData] = useState({
    name: caseDataProp.name || "",
    caseType: caseDataProp.caseType || "Single",
    hasDependent: caseDataProp.hasDependent || false,
    startDate: timestampToInputValue(caseDataProp.startDate),
    endDate: timestampToInputValue(caseDataProp.endDate),
    fee: caseDataProp.fee || 0,
    employee: caseDataProp.employee || "",
    notes: caseDataProp.notes || [],
    paymentStatus: caseDataProp.paymentStatus || false,
    caseStatus: caseDataProp.caseStatus || "Not Started",
    pin: caseDataProp.pin || {},
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCaseData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await editCaseRecord(caseDataProp.id, caseData);
      alert("Case Updated Successfully");
      setIsOpen(false);
    } catch (err) {
      alert("Failed to edit case");
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
            Edit Case
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
