import { useState, useEffect } from "react";
import { useAuth } from "../context/authContext.jsx";
import { useNavigate } from "react-router-dom";

import { readCasesRecord } from "../firebaseFunction/cloudDatabase";
import TimeCard from "../components/TimeCard.jsx";
import { get } from "firebase/database";
import MyCaseTable from "../components/myCaseTable.jsx";

function App() {
  const { user } = useAuth();

  return (
    <>
      <h1>Home Page</h1>
      <p>Welcome, {user ? user.email : "Guest"}!</p>

      <TimeCard getCurrentUser={user} />
      <MyCaseTable />
    </>
  );
}

export default App;
