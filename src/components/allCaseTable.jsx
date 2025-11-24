import { useState, useEffect } from 'react';
import { MyCaseTable } from './Table.jsx';
import { readCasesRecord } from '../firebaseFunction/cloudDatabase';

function AllCasesPage() {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCases = async () => {
      try {
        setLoading(true);
        const records = await readCasesRecord();
        setCases(records);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching cases:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCases();
  }, []);

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
          <MyCaseTable cases={cases} />
        )}
      </div>
    </div>
  );
}

export default AllCasesPage;