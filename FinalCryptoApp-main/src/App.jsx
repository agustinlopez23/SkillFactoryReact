import "./App.css";
import Layout from "antd/lib/layout/layout";
import { Route, Routes } from "react-router-dom";
import {
  HomePage,
  Cryptocurrencies,
  CryptoDetails,
  News,
  Exchanges,
  Register,
  Login,
  Recovery,
  Profile,
} from "./main/pages";

import { Footer } from "./components/Footer";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { useSelector } from "react-redux";
import { NavBar2 } from "./components/NavBar2";

const App = () => {
  const { status } = useSelector((state) => state.auth);

  return (
    <div className="app">
      <div className="navbar">
        <NavBar2 />
      </div>
      <div className="main">
        <Layout>
          <div className="routes">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/recovery" element={<Recovery />} />
              <Route element={<ProtectedRoute status={status} />}>
                <Route
                  path="/cryptocurrencies"
                  element={<Cryptocurrencies />}
                />
                <Route path="/exchanges" element={<Exchanges />} />
                <Route path="/crypto/:id" element={<CryptoDetails />} />
                <Route path="/news" element={<News />} />
                <Route path="/profile" element={<Profile />} />
              </Route>
            </Routes>
          </div>
        </Layout>

        <div className="footer">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default App;
