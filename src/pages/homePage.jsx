import { useState, useEffect } from "react";
import { useAuth } from "../context/authContext.jsx";
import { useNavigate } from "react-router-dom";
import { Button } from "@headlessui/react";
import { readCasesRecord } from "../firebaseFunction/cloudDatabase";
import TimeCard from "../components/TimeCard.jsx";
import { get } from "firebase/database";
import MyCaseTable from "../components/myCaseTable.jsx";
import CreateCase from "../components/createCase.jsx";

function App() {
  const { user } = useAuth();

  const [isOpen, setIsOpen] = useState(false);

  const handlebutton = () => {
    setIsOpen(true);
  };

  return (
    <>
      <h1>Home Page</h1>
      <p>Welcome, {user ? user.email : "Guest"}!</p>
      <CreateCase open={isOpen} setIsOpen={setIsOpen} />
      <div className="flex items-center justify-between mb-4">
        <TimeCard getCurrentUser={user} />
        <Button
          onClick={handlebutton}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Create Case
        </Button>
      </div>

      <MyCaseTable />
    </>
  );
}

export default App;
