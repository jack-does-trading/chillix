import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import SearchResults from './components/SearchResults';
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import Footer from "./components/Footer.jsx";
import TitlePage from "./pages/TitlePage.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function ProtectedRoute({ children }) {
  const { auth } = useContext(AuthContext);
  return auth?.accessToken ? children : <Navigate to="/login" />;
}

function Layout() {
  const location = useLocation();
  const hideNavbarAndFooter = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <>
      <ScrollToTop />
      {!hideNavbarAndFooter && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/title/:id" element={<ProtectedRoute><TitlePage /></ProtectedRoute>} />
        <Route path="/search" element={<SearchResults />} />
      </Routes>
      {!hideNavbarAndFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Layout />
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
