import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { AuthContextProvider } from "./context/AuthContext";
import { MovieContext } from "./context/MovieContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Account from "./pages/Account";
import ProtectedRoute from "./components/ProtectedRoute";
import Detail from "./pages/Detail";
import { useState } from "react";
import Searchpage from "./pages/Searchpage";
import Footer from "./components/Footer";

function App() {
  const [idMovie, setidMovie] = useState("")

  return (
    <>
    <AuthContextProvider>
      <Navbar />
      <MovieContext.Provider value={{idMovie, setidMovie}}>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/detail/:detailID" element={<Detail />} />
        <Route path="/account" element={<ProtectedRoute><Account /></ProtectedRoute>}/>
        <Route path="/search" element={<Searchpage />} />
      </Routes>
      </MovieContext.Provider>
      <Footer />
    </AuthContextProvider>
    </>
  );
}

export default App;
