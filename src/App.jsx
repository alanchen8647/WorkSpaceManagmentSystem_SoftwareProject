import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import Laryout from './Laryout.jsx'


function App() {

  return (
    <>
      <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route element={<Laryout />}>
              <Route path="/" element={<HomePage />} />
            </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
