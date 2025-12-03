import Box from "@mui/material/Box";
import { useState } from "react";
import Modal from "@mui/material/Modal";
import { editCaseRecord } from "../firebaseFunction/cloudDatabase";
import ModalForm from "./modalform.jsx";

function DetailItem({ label, value }) {
  return (
    <div className="flex flex-col bg-gray-50 p-4 rounded-md border border-gray-200 shadow-sm">
      <span className="text-sm font-medium text-gray-500">{label}</span>
      <span className="text-lg font-semibold text-gray-800 mt-1">{value}</span>
    </div>
  );
}

export default function CaseDetails({ open, setIsOpen, caseDataProp }) {
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
            Case Details
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <DetailItem label="Name" value={caseData.name} />
            <DetailItem label="Start Date" value={caseData.startDate} />
            <DetailItem label="Fee" value={`$${caseData.fee}`} />
            <DetailItem label="Employee" value={caseData.employee} />
            <DetailItem label="Labels" value={caseData.labels.join(", ")} />
            <DetailItem label="Case Type" value={caseData.caseType} />
            <DetailItem
              label="Payment Status"
              value={caseData.paymentStatus ? "Paid" : "Unpaid"}
            />
            <DetailItem label="Case Status" value={caseData.caseStatus} />
            <DetailItem label="Cash Collected" value={caseData.cashCollected} />
            <DetailItem
              label="Electronic Payment"
              value={caseData.electronicPayment}
            />
          </div>
        </Box>
      </Modal>
    </>
  );
}
