import AllCaseTable from "../components/allCaseTable";
import { useAuth } from "../context/authContext.jsx";

function App() {
  const { user } = useAuth();

  return (
    <>
      <h1>Home Page</h1>
      <p>Welcome, {user ? user.email : "Guest"}!</p>

      <AllCaseTable />
    </>
  );
}

export default App;