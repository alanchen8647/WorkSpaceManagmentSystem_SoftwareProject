import Box from "@mui/material/Box";
import { useState } from "react";
import Modal from "@mui/material/Modal";
import { Button } from "@headlessui/react";

function AssignCase({ label, value }) {
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

  const [empAssign, setempAssign] = useState(caseDataProp.employee);

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
            Assign Case
          </h2>

          <Button
            type="button"
            onClick={() => setIsOpen(false)}
            className="px-5 py-2.5 font-medium rounded-lg text-sm
                           bg-gray-200 hover:bg-gray-300 
                           text-gray-800 shadow-sm 
                           transition-all duration-200 pt-2.5 mt-6"
          >
            Close
          </Button>
        </Box>
      </Modal>
    </>
  );
}
