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
import PrivateRoute from "./components/privateRoute";

const Layout = styled.div`
  display: flex;
  flex-direction: row;
  width: 100vw;
  height: calc(100vh - 64px); 
  overflow: hidden; 
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
          <Layout className="h-screen mt-24">
            <div className="hidden md:block ">
              <NavBar />
            </div>
            <div className="w-full h-full">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/contactUs" element={<ContactUs />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/registration" element={<Register />} />
                <Route path="/recover" element={<Recover />} />

                <Route path="/newMortgage" element={<PrivateRoute><NewMortgage /></PrivateRoute>} />
                <Route path="/checkBestMortgage" element={<PrivateRoute><CheckBestMortgage /></PrivateRoute>} />
                <Route path="/normalMortgage" element={<PrivateRoute><NormalMortgage /></PrivateRoute>} />
                <Route path="/upTo100kLoan" element={<PrivateRoute><UpTo100kLoan /></PrivateRoute>} />
                <Route path="/oneLoan" element={<PrivateRoute><OneLoan /></PrivateRoute>} />
                <Route path="/fewLoans" element={<PrivateRoute><FewLoans /></PrivateRoute>} />
                <Route path="/over100kLoan" element={<PrivateRoute><Over100kLoan /></PrivateRoute>} />
                <Route path="/changePassword" element={<PrivateRoute><ChangePass /></PrivateRoute>} />
              </Routes>
            </div>
          </Layout>
        </AuthProvider>
      </Router>
    </Wrapper>
  );
};

export default App;