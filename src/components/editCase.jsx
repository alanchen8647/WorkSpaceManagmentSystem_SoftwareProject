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
  const dateObj = caseDataProp.startDate.toDate();
  const formattedDate = `${dateObj.getFullYear()}-${(dateObj.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${dateObj.getDate().toString().padStart(2, "0")}`;

  const [caseData, setCaseData] = useState({
    name: caseDataProp.name || "",
    startDate: formattedDate,
    fee: caseDataProp.fee || 0,
    employee: caseDataProp.employee || "",
    labels: caseDataProp.labels || [],
    paymentStatus: caseDataProp.paymentStatus || false,
    caseType: caseDataProp.caseType || "Single",
    caseStatus: caseDataProp.caseStatus || "N",
    cashCollected: caseDataProp.cashCollected || 0,
    electronicPayment: caseDataProp.electronicPayment || 0,
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

    const confirmed = window.confirm("Are you sure you want to submit?");
    if (!confirmed) return;

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
            setIsOpen={setIsOpen}
          />
        </Box>
      </Modal>
    </>
  );
}
