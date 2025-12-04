import { useState, useEffect } from "react";
import { MyCaseTable } from "./Table.jsx";
import { readCasesRecord } from "../firebaseFunction/cloudDatabase";
import { Pagination } from "@mui/material";

function AllCasesPage() {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery] = useState("");
  const [sortOption] = useState("startDateDesc");
  const [currentPage, setCurrentPage] = useState(1);
  const casesPerPage = 10;

  useEffect(() => {
    const fetchCases = async () => {
      try {
        setLoading(true);
        const records = await readCasesRecord();
        setCases(records);
        setCurrentPage(1);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching cases:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCases();
  }, []);

  const indexOfLastCase = currentPage * casesPerPage;
  const indexOfFirstCase = indexOfLastCase - casesPerPage;
  const currentCases = cases.slice(indexOfFirstCase, indexOfLastCase);
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  }

  return (
    <div className="min-h-screen bg-black-100 p-8">
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
          <div className='min-h-screen bg-white p-6 rounded-lg shadow-md'>
            <MyCaseTable
              cases={currentCases}
              searchQuery={searchQuery}
              sortOption={sortOption}
            />
            <div className="flex justify-center mt-6">
              <Pagination
                count={Math.ceil(cases.length / casesPerPage)}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"z
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AllCasesPage;
