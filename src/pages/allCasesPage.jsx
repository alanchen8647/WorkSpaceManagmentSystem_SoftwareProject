import AllCaseTable from "../components/allCaseTable";
import { useAuth } from "../context/authContext.jsx";

function App() {
  const { user } = useAuth();

  return (
    <>
      <div className="py-10">
        <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight">
          All Cases Page
        </h1>
        <AllCaseTable />
      </div>
    </>
  );
}

export default App;
