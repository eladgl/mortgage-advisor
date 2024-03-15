import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import {
  ContactUs,
  Over100kLoan,
  FewLoans,
  OneLoan,
  UpTo100kLoan,
  NormalMortgage,
  CheckBestMortgage,
  NewMortgage,
  HomePage,
  Register,
  Recover,
  LoginPage,
  ChangePass,
} from "./pages";
import NavBar from "./components/navBar";
import styled from "styled-components";
import "./index.css";
import TopNavBar from "./components/topNavBar";
import { AuthProvider } from "./context/AuthContext";

const Layout = styled.div`
  display: flex;
  flex-direction: row;
  width: 100vw;
  height: 100vh;
`;

const Wrapper = styled.div`
  background-image: linear-gradient(161deg, #265ca5, #0e346b);
`;

const App = () => {
  return (
    <Wrapper>
      <Router>
        <AuthProvider>
          <TopNavBar />
          <Layout className="h-screen ">
            <div className="hidden md:block ">
              <NavBar />
            </div>
            <div className="w-full h-full">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/newMortgage" element={<NewMortgage />} />
                <Route
                  path="/checkBestMortgage"
                  element={<CheckBestMortgage />}
                />
                <Route path="/normalMortgage" element={<NormalMortgage />} />
                <Route path="/upTo100kLoan" element={<UpTo100kLoan />} />
                <Route path="/oneLoan" element={<OneLoan />} />
                <Route path="/fewLoans" element={<FewLoans />} />
                <Route path="/over100kLoan" element={<Over100kLoan />} />
                <Route path="/contactUs" element={<ContactUs />} />
                <Route path="/registration" element={<Register />} />
                <Route path="/recover" element={<Recover />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/changePassword" element={<ChangePass />} />
              </Routes>
            </div>
          </Layout>
        </AuthProvider>
      </Router>
    </Wrapper>
  );
};

export default App;
