import { useState, useEffect } from "react";
import { useAuth } from "../context/authContext.jsx";
import { useNavigate } from "react-router-dom";

import { readCasesRecord } from "../firebaseFunction/cloudDatabase";
import TimeCard from "../components/TimeCard.jsx";
import { get } from "firebase/database";
import MyCaseTable from "../components/myCaseTable.jsx";
import CreateCase from "../components/createcase.jsx";

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
      <button onClick={handlebutton}>Create Case</button>
      <CreateCase open={isOpen} setIsOpen={setIsOpen} />
      <TimeCard getCurrentUser={user} />
      <MyCaseTable />
    </>
  );
}

export default App;
