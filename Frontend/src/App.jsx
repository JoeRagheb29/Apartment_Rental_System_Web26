import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/shared/Navbar";
import Footer from "./components/shared/Footer";
import LoadingScreen from "./components/Ui/loading/LoadingScreen";
import Home from "./pages/Home";
import Apartments from "./pages/Apartments";
import ApartmentDetails from "./pages/ApartmentDetails";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import PrivateRoute from "./Auth/PrivateRoute";
import AuthContext from "./contexts/AuthContext";
import { useContext } from "react";

function App() {
  const { isLoggedIn, loading } = useContext(AuthContext);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        <main className="grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/apartments" element={<Apartments />} />
            <Route path="/apartments/:id" element={<ApartmentDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<PrivateRoute isAuthenticated={isLoggedIn} />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;