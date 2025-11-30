import { useState, useEffect } from "react";
import { MyCaseTable } from "./Table.jsx";
import { readCasesRecord } from "../firebaseFunction/cloudDatabase";
import CaseSearchBar from "./CaseSearchBar";
import SortDropDown from "./SortDropDown.jsx";

function AllCasesPage() {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("nameAsc");

  useEffect(() => {
    const fetchCases = async () => {
      try {
        setLoading(true);
        const records = await readCasesRecord();
        setCases(records);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching cases:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCases();
  }, []);

  return (
    <div className="min-h-screen bg-black-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-4">
          <div className="flex justify-start mb-2">
            <CaseSearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </div>
          <div className="mb-4">
            <div className="flex justify-start mb-2">
              <SortDropDown 
                sortOption={sortOption} 
                setSortOption={setSortOption}
              />
            </div>
          </div>
        </div>
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
            cases={cases}
            searchQuery={searchQuery}
            sortOption={sortOption}
          />
        )}
      </div>
    </div>
  );
}

export default AllCasesPage;
