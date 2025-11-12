import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/homePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import Layout from "./Layout.jsx";
import { AuthProvider } from "./context/authContext.jsx";

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route element={<Layout />}>
              {/* Add your page route here follow similar format with HomePage route */}
              <Route path="/" element={<HomePage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
