import AllCaseTable from "../components/allCaseTable";
import { useAuth } from "../context/authContext.jsx";

export default function AllCasesPage() {
  const { user } = useAuth();

  return (
    <div>
      <h1>All Cases</h1>
      {/* Render the list of all cases here */}
      <AllCaseTable />
    </div>
  );
}
