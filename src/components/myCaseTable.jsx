import { useState, useEffect, use } from 'react';
import { MyCaseTable } from './Table.jsx';
import { readCasesRecord } from '../firebaseFunction/cloudDatabase';
import {db} from "../private/firebase.jsx";
import { listenToAuthChanges } from '../firebaseFunction/auth';
import { doc, getDoc } from 'firebase/firestore';

function AllCasesPage() {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOption] = useState("startDateDesc");
  const [searchQuery] = useState("");
  const [username, setUsername] = useState(null);
  const [filteredCases, setFilteredCases] = useState([]);

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

  useEffect(() => {
    const fetchCases = async () => {
      try {
        setLoading(true); 
        const records = await readCasesRecord();
        setCases(records);

        // wait for listener to set username
        const userSpecificCases = records.filter(caseItem => 
          caseItem.employee === username
        );
        setFilteredCases(userSpecificCases);
        
      } catch (err) {
        setError(err.message);
        console.error('Error fetching cases:', err);
      } finally {
        setLoading(false);
      } 
    };

    fetchCases();
  }, [username]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            <p className="mt-4 text-gray-600">Loading cases...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12 text-red-600">
            <p>Error loading cases: {error}</p>
          </div>
        ) : (
          <MyCaseTable 
            cases={filteredCases}
            searchQuery={searchQuery}
            sortOption={sortOption}
            hide_columns={{
              employee: true,
            }}
          />
        )}
      </div>
    </div>
  );
}

export default AllCasesPage;