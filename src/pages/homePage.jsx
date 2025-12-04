import { useState, useEffect } from "react";
import { useAuth } from "../context/authContext.jsx";
import { Button } from "@headlessui/react";
import TimeCard from "../components/TimeCard.jsx";
import MyCaseTable from "../components/myCaseTable.jsx";
import CreateCase from "../components/createCase.jsx";
import { listenToAuthChanges } from "../firebaseFunction/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../private/firebase.jsx";

function App() {
  const { user } = useAuth();

  const [isOpen, setIsOpen] = useState(false);

  const handlebutton = () => {
    setIsOpen(true);
  };

  const [username, setUsername] = useState(null);

  useEffect(() => {
    const unsubscribe = listenToAuthChanges(async (user) => {
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
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <div className="py-10">
        <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight">
          Welcome Back, {user ? username : "Guest"}!
        </h1>

        <p className="text-xl text-gray-600 mt-3 max-w-2xl mx-auto text-center">
          Here’s your dashboard overview. Manage cases, track payments, and stay
          on top of your workflow.
        </p>
      </div>

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
